const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('./config/passport');
const User = require('./models/User'); 
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const session = require('express-session');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Login route
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);  // Log the error
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) {
        console.error(err);  // Log any login error
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      return res.status(200).json({ success: true, message: 'Login successful' });
    });
  })(req, res, next);
});


// API routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

