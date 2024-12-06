import React, { useState } from 'react';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import AddStudent from './components/AddStudent';
import AddCourse from './components/AddCourse';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [isSignUp, setIsSignUp] = useState(false); // Track form type (login or signup)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state on successful login
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true); // Update state on successful signup
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between login and signup form
  };

  return (
    <div className="App">
      <h1>Student-Course Application</h1>

      {isLoggedIn ? (
        // Main application view
        <div>
          <StudentList />
          <AddStudent onStudentAdded={() => {}} />
          <CourseList />
          <AddCourse onCourseAdded={() => {}} />
        </div>
      ) : (
        // Show login or signup based on the state
        <div>
          {isSignUp ? (
            <SignupForm onSignupSuccess={handleSignupSuccess} toggleForm={toggleForm} />
          ) : (
            <LoginForm onLoginSuccess={handleLoginSuccess} toggleForm={toggleForm} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;


