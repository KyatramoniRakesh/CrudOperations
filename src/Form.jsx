import React, { useState } from 'react';
import './CSS/Form.css';

const Form = () => {

  const [formData, setFormData] = useState({
    fname: '',
    lname:'',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [records, setRecords] = useState([]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.fname && formData.lname && formData.email && formData.message) {
      setRecords((prev) => [...prev, formData]); 
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="form-container">
      <form className="fancy-form" onSubmit={handleSubmit}>
        <h2> Enter Details </h2>

        
        <input
          type="text"
          name="fname"
          placeholder=" First Name"
          value={formData.fname}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lname"
          placeholder=" Last Name"
          value={formData.lname}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        

        <button type="submit">Send Message</button>

        {submitted && <p className="success-msg">Thanks for reaching out! 🎉</p>}
      </form>

      
      
    </div>
  );
};

export default Form;
