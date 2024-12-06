const students = require('../data/studentData');

exports.getAllStudents = (req, res) => {
  res.json(students);
};

exports.getStudentById = (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

exports.filterStudents = (req, res) => {
  const { id, name, department, enrolledCourse, completedCourse } = req.body;
  let filteredStudents = [...students];

  if (id) filteredStudents = filteredStudents.filter(s => s.id === parseInt(id));
  if (name) filteredStudents = filteredStudents.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
  if (department) filteredStudents = filteredStudents.filter(s => s.department === department);
  if (enrolledCourse) filteredStudents = filteredStudents.filter(s => s.enrolledCourses.includes(enrolledCourse));
  if (completedCourse) filteredStudents = filteredStudents.filter(s => s.completedCourses.includes(completedCourse));

  res.json(filteredStudents);
};

exports.addStudent = (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  
  Object.assign(student, req.body);
  res.json(student);
};

exports.deleteStudent = (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  
  students.splice(index, 1);
  res.json({ message: 'Student deleted successfully' });
};