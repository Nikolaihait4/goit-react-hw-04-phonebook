import React, { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactFilter } from 'components/ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const stringifieContacts = localStorage.getItem(CONTACTS_KEY);
    const parcedContacts = JSON.parse(stringifieContacts) ?? [];
    this.setState({ contacts: parcedContacts });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const stringifieContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem(CONTACTS_KEY, stringifieContacts);
    }
  }

  handleAddContact = contactData => {
    const { contacts } = this.state;
    const { name } = contactData;

    if (contacts.some(contact => contact.name === name)) {
      alert(`Contact ${name} already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contactData,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

    return (
      <div className={css.appsection}>
        <h1 className={css.apptitle}>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2 className={css.appcontactstitle}>Contacts</h2>
        <ContactFilter
          filter={filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
