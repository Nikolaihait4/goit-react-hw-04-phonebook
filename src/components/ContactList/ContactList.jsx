import React from 'react';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contactlistsection}>
    {contacts.map(contact => (
      <li key={contact.id} className={css.contactlistitem}>
        {contact.name}: {contact.number}
        <button
          className={css.deletebutton}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
