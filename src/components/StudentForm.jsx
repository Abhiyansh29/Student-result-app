import React, { useState } from 'react';

const StudentForm = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialData || {
        name: '',
        section: '',
        marks: '',
        grade: ''
    });

    const calculateGrade = (marks) => {
        const m = parseFloat(marks);
        if (isNaN(m)) return '';
        if (m >= 90) return 'A+';
        if (m >= 80) return 'A';
        if (m >= 70) return 'B';
        if (m >= 60) return 'C';
        if (m >= 50) return 'D';
        return 'F';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation Logic
        if (name === 'marks') {
            // Only allow numbers between 0 and 100
            if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
                const grade = calculateGrade(value);
                setFormData({
                    ...formData,
                    marks: value,
                    grade: grade
                });
            }
        } else if (name === 'name') {
            // Only allow alphabets and spaces
            if (/^[a-zA-Z\s]*$/.test(value)) {
                setFormData({
                    ...formData,
                    [name]: value
                });
            }
        } else if (name === 'section') {
            // Only allow alphanumeric, max length 3, convert to uppercase
            if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 3) {
                setFormData({
                    ...formData,
                    [name]: value.toUpperCase()
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2>{initialData ? 'Edit Student' : 'Add New Student'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter student name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section</label>
                        <input
                            id="section"
                            type="text"
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            placeholder="Enter section (e.g. A, B)"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="marks">Marks</label>
                        <input
                            id="marks"
                            type="number"
                            name="marks"
                            value={formData.marks}
                            onChange={handleChange}
                            placeholder="Enter marks"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="grade">Grade</label>
                        <input
                            id="grade"
                            type="text"
                            name="grade"
                            value={formData.grade}
                            readOnly
                            placeholder="Auto-calculated"
                            className="readonly-input"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn success">Save Student</button>
                        <button type="button" className="btn secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
