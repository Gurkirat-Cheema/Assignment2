import React, { useState } from 'react';
import { addStudent } from '../api';

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({ name: '', department: '', semester: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(student);
    onStudentAdded();
    setStudent({ name: '', department: '', semester: 1 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        value={student.department}
        onChange={(e) => setStudent({ ...student, department: e.target.value })}
      />
      <input
        type="number"
        placeholder="Semester"
        value={student.semester}
        onChange={(e) => setStudent({ ...student, semester: parseInt(e.target.value) })}
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default AddStudent;