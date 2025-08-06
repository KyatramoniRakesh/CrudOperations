import React from 'react';
import './CSS/FormData.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const FormData = () => {

    const navigat = useNavigate();

    const [formData, setformdata] = useState({
        name: '',
        email: '',
        number: '',
    });

    const [records, setRecords] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);

    const [editIndex, setEditIndex] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');

    const [errors, setErrors] = useState({});

    const [searchName, setSearchName] = useState('');



    useEffect(() => {
        const saved = localStorage.getItem('form-records');
        if (saved) {
            try {
                setRecords(JSON.parse(saved));
            } catch (err) {
                console.error("Error parsing JSON from localStorage:", err);
            }
        }
        setIsLoaded(true);
    }, []);


    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('form-records', JSON.stringify(records));
        }
    }, [records, isLoaded]);




    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        if (editIndex !== null) {
            const updatedRecords = [...records];
            updatedRecords[editIndex] = formData;
            setRecords(updatedRecords);
            setEditIndex(null);
            setSuccessMessage('✅ Record updated successfully!');

        } else {

            setRecords([...records, formData]);
            setSuccessMessage('✅ Record added successfully!');
        }


        setformdata({ name: '', email: '', number: '' })

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

    };


    // to  EDIT
    const handleEdit = (index) => {
        const confirmEdit = window.alert("Do you want to Update this Record?")
        if (!confirm) return;


        setformdata(records[index]);
        setEditIndex(index);
    };

    // to cancel edit
    const cancelEdit = () => {
        setformdata({ name: '', email: '', number: '' });
        setEditIndex(null);
    };

    // to DELETE
    const handleDelete = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (!confirmDelete) return;

        const updatedRecords = records.filter((_, i) => i !== index);
        setRecords(updatedRecords);
    };

    // TO SEARCH
    const searchFilter = records.filter(record => {
        const nameMatch = record.name.toLowerCase().includes(searchName.toLowerCase());
        const emailMatch = record.email.toLowerCase().includes(searchName.toLowerCase());
        return nameMatch || emailMatch;
    });



    // For Form Validations 
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.number.trim()) {
            newErrors.number = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.number)) {
            newErrors.number = "Phone number must be 10 digits";
        }

        return newErrors;
    };


    return (
        <div>
            <div className="form-container">

                <h2 className="form-title">
                    {editIndex !== null ? "✏️ Edit Contact" : " Contact Form"}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </h2>

                {editIndex !== null && (
                    <div className="edit-mode">
                        <p className="edit-indicator">You're editing record #{editIndex + 1}</p>
                        <button className="cancel-edit-btn" onClick={cancelEdit}>Cancel Edit</button>
                    </div>
                )}



                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" value={formData.name} placeholder="Enter your name"
                            onChange={(e) => setformdata({ ...formData, name: e.target.value })} />


                    </div>{errors.name && <p className="error">{errors.name}</p>}

                    <div className="form-group">
                        <label htmlFor="mail">Email:</label>
                        <input id="mail" type="email" value={formData.email} placeholder="Enter your email"
                            onChange={(e) => setformdata({ ...formData, email: e.target.value })} />


                    </div> {errors.email && <p className="error">{errors.email}</p>}

                    <div className="form-group">
                        <label htmlFor="number">Number:</label>
                        <input id="number" type="tel" value={formData.number} placeholder="Enter your number"
                            onChange={(e) => setformdata({ ...formData, number: e.target.value })} />


                    </div>{errors.number && <p className="error">{errors.number}</p>}

                    <button type="submit" className="submit-btn">
                        {editIndex !== null ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
            <button onClick={() => navigate('/table')} className="view-records-btn">
                📋 View All Records
            </button>

            {/* TABLE TO SHOW DATA */}

            {searchFilter.length > 0 ? (
                <div className='table-wrapper'>
                    <h3>Submitted Records</h3>

                    <input
                        type="text"
                        placeholder='Search by Name or Email'
                        value={searchName}
                        className='search-input'
                        onChange={(e) => setSearchName(e.target.value)}
                    />

                    <table className="record-table">
                        <thead>
                            <tr>
                                <th>SR. No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchFilter.map((record, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{record.name}</td>
                                    <td>{record.email}</td>
                                    <td>{record.number}</td>
                                    <td className='btns'>
                                        <button id='edit' onClick={() => handleEdit(index)}>Edit</button>
                                        <button id='del' onClick={() => handleDelete(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='table-wrapper'>
                    <h3>Submitted Records</h3>

                    <input
                        type="text"
                        placeholder='Search by Name or Email'
                        value={searchName}
                        className='search-input'
                        onChange={(e) => setSearchName(e.target.value)}
                    />

                    <table className="record-table">
                        <thead>
                            <tr>
                                <th>SR. No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                                    No matching user found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}




        </div>

    );
};

export default FormData;
