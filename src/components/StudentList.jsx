import React from 'react';

const StudentList = ({ students, onLoad, onAdd, onEdit, onDelete, onView }) => {
    return (
        <div className="student-list-container">
            <div className="header-actions">
                <h2>Student List</h2>
                <div className="buttons-group">
                    <button className="btn primary" onClick={onLoad}>Load Students</button>
                    <button className="btn success" onClick={onAdd}>Add Student</button>
                </div>
            </div>

            {students.length === 0 ? (
                <div className="empty-state">
                    <p>No students loaded or list is empty.</p>
                    <p>Click "Load Students" to fetch data.</p>
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Section</th>
                                <th>Marks</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.section}</td>
                                    <td>{student.marks}</td>
                                    <td>{student.grade}</td>
                                    <td className="actions-cell">
                                        <button className="btn info small" onClick={() => onView(student)}>View</button>
                                        <button className="btn warning small" onClick={() => onEdit(student)}>Edit</button>
                                        <button className="btn danger small" onClick={() => onDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentList;
