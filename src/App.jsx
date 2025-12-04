import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from './services/studentService';

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // list, add, edit, details
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      alert("Failed to load students. Make sure JSON Server is running.");
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setView('add');
    setSelectedStudent(null);
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setView('edit');
  };

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setView('details');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        alert("Student deleted successfully.");
        loadStudents(); // Auto-reload
      } catch (error) {
        alert("Failed to delete student");
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (view === 'add') {
        await createStudent(formData);
        alert("Student added successfully.");
      } else if (view === 'edit') {
        await updateStudent(selectedStudent.id, formData);
        alert("Student updated successfully.");
      }
      setView('list');
      loadStudents(); // Auto-reload
    } catch (error) {
      alert("Failed to save student");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setView('list');
    setSelectedStudent(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Result Management</h1>
      </header>
      <main className="app-content">
        {view === 'list' && (
          <StudentList
            students={students}
            onLoad={loadStudents}
            onAdd={handleAddClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onView={handleViewClick}
          />
        )}
        {(view === 'add' || view === 'edit') && (
          <StudentForm
            initialData={selectedStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
        {view === 'details' && (
          <StudentDetails
            student={selectedStudent}
            onBack={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

export default App;
