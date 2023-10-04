import React from 'react';
import css from './ContactFilter.module.css';

export const ContactFilter = ({ filter, handleFilterChange }) => (
  <input
    type="text"
    placeholder="Search contacts"
    value={filter}
    onChange={handleFilterChange}
    className={css.filtrsection}
  />
);
