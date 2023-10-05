import React, { useState, useEffect } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const CONTACTS_KEY = 'contacts';
const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(CONTACTS_KEY);
  return JSON.parse(savedContacts) ?? [];
};

export function App() {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contactData => {
    const { name } = contactData;
    if (contacts.some(contact => contact.name === name)) {
      alert(`Contact ${name} already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contactData,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(
    contact =>
      typeof contact.name === 'string' &&
      contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={css.appsection}>
      <h1 className={css.apptitle}>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      <h2 className={css.appcontactstitle}>Contacts</h2>
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
