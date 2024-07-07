import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contacts.css';

function Contacts() {
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/contacts')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setError('Error fetching contacts. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="service">
      <h2>Contact Details</h2>
      <ul>
        <li><strong>Address:</strong> {contacts.address}</li>
        <li><strong>Phone:</strong> {contacts.phone}</li>
        <li><strong>Email:</strong> {contacts.email}</li>
      </ul>
    </div>
  );
}

export default Contacts;
