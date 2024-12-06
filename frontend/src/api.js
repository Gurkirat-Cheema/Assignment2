import axios from 'axios';

const API_URL = 'http://localhost:5001'; // Ensure the base URL matches your backend

// Student-related APIs
export const getAllStudents = () => axios.get(`${API_URL}/api/students`);
export const getStudentById = (id) => axios.get(`${API_URL}/api/students/${id}`);
export const filterStudents = (filters) => axios.post(`${API_URL}/api/students/filter`, filters);
export const addStudent = (student) => axios.post(`${API_URL}/api/students`, student);
export const updateStudent = (id, student) => axios.put(`${API_URL}/api/students/${id}`, student);
export const deleteStudent = (id) => axios.delete(`${API_URL}/api/students/${id}`);

// Course-related APIs
export const getAllCourses = () => axios.get(`${API_URL}/api/courses`);
export const filterCourses = (filters) => axios.post(`${API_URL}/api/courses/filter`, filters);
export const addCourse = (course) => axios.post(`${API_URL}/api/courses`, course);
export const updateCourse = (id, course) => axios.put(`${API_URL}/api/courses/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_URL}/api/courses/${id}`);

// Authentication-related APIs
export const loginUser = (email, password) => axios.post(`${API_URL}/login`, { email, password });
export const registerUser = (username, email, password) => axios.post(`${API_URL}/register`, { username, email, password });

export default axios;
