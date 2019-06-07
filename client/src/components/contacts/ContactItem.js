import React, { useContext } from "react";
import { FaEnvelopeOpen, FaPhone } from "react-icons/fa";
import ContactContext from "../../context/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    contactContext.deleteContact(id);
    contactContext.clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {""}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <FaEnvelopeOpen /> {email}
          </li>
        )}
        {phone && (
          <li>
            <FaPhone /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => contactContext.setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;
