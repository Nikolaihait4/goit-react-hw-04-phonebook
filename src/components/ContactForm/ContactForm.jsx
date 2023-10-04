import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddContact(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.formsection}>
        <label className={css.formitem}>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
            className={css.forminput}
          />
        </label>
        <label className={css.formitem}>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
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
  }
}
