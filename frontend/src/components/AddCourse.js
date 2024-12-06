import React, { useState } from 'react';
import { addCourse } from '../api';

const AddCourse = ({ onCourseAdded }) => {
  const [course, setCourse] = useState({ name: '', department: '', isOpen: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCourse(course);
    onCourseAdded();
    setCourse({ name: '', department: '', isOpen: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        value={course.department}
        onChange={(e) => setCourse({ ...course, department: e.target.value })}
      />
      <label>
        <input
          type="checkbox"
          checked={course.isOpen}
          onChange={(e) => setCourse({ ...course, isOpen: e.target.checked })}
        />
        Is Open
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;