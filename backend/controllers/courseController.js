const courses = require('../data/courseData');

exports.getAllCourses = (req, res) => {
  res.json(courses);
};

exports.filterCourses = (req, res) => {
  const { id, name, department, isOpen } = req.body;
  let filteredCourses = [...courses];

  if (id) filteredCourses = filteredCourses.filter(c => c.id === parseInt(id));
  if (name) filteredCourses = filteredCourses.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  if (department) filteredCourses = filteredCourses.filter(c => c.department === department);
  if (isOpen !== undefined) filteredCourses = filteredCourses.filter(c => c.isOpen === isOpen);

  res.json(filteredCourses);
};

exports.addCourse = (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    ...req.body
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
};

exports.updateCourse = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: 'Course not found' });
  
  Object.assign(course, req.body);
  res.json(course);
};

exports.deleteCourse = (req, res) => {
  const index = courses.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Course not found' });
  
  courses.splice(index, 1);
  res.json({ message: 'Course deleted successfully' });
};