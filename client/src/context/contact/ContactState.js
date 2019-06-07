import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "bob",
        email: "bob@email.com",
        phone: "222-222-2222",
        type: "personal"
      },
      {
        id: 2,
        name: "sara",
        email: "sara@email.com",
        phone: "222-222-2222",
        type: "professional"
      },
      {
        id: 3,
        name: "kevin",
        email: "kevin@email.com",
        phone: "222-222-2222",
        type: "personal"
      }
    ],
    currentContact: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add contact
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({
      type: ADD_CONTACT,
      contact
    });
  };

  // delete contact
  const deleteContact = id => {
    dispatch({
      type: DELETE_CONTACT,
      id
    });
  };

  // set current contact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      contact
    });
  };

  // clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT
    });
  };

  // update contact
  const updateContact = contact => {
    dispatch({
      type: UPDATE_CONTACT,
      contact
    });
  };

  // filter contacts
  const filterContacts = text => {
    dispatch({
      type: FILTER_CONTACTS,
      text
    });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filtered: state.filtered,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
