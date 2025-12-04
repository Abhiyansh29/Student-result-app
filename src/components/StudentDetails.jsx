import React from 'react';

const StudentDetails = ({ student, onBack }) => {
    return (
        <div className="details-wrapper">
            <div className="details-card">
                <h2>Student Report Card</h2>
                <div className="details-content">
                    <div className="detail-item">
                        <span className="label">Name</span>
                        <span className="value">{student.name}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Section</span>
                        <span className="value">{student.section}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Marks</span>
                        <span className="value">{student.marks}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Grade</span>
                        <span className="value highlight">{student.grade}</span>
                    </div>
                </div>
                <div className="details-actions">
                    <button className="btn primary" onClick={onBack}>Back to List</button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;
