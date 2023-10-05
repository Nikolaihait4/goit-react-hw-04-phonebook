import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ handleAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact(formData);
    setFormData({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={css.formsection}>
      <label className={css.formitem}>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={css.forminput}
        />
      </label>
      <label className={css.formitem}>
        Number
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          pattern="[\+]?[\d\s\(\)-]+"
          title="Phone number must contain only digits, spaces, and the characters + ( ) -"
          required
          className={css.forminput}
        />
      </label>
      <button type="submit" className={css.formsubmit}>
        Add contact
      </button>
    </form>
  );
};
