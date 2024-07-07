import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [contacts, setContacts] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsResponse = await axios.get('http://127.0.0.1:5000/contacts');
        const announcementsResponse = await axios.get('http://127.0.0.1:5000/announcements');
        
        setContacts(contactsResponse.data);
        setAnnouncements(announcementsResponse.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="home-container">
      <h1 className="home-header">Library Management System</h1>

      <section className="contacts-section">
        <h2>Contact Details</h2>
        <p><strong>Address:</strong> {contacts.address}</p>
        <p><strong>Phone:</strong> {contacts.phone}</p>
        <p><strong>Email:</strong> {contacts.email}</p>
      </section>

      <section className="announcements-section">
        <h2>Updates and Announcements</h2>
        <ul>
          {announcements.map((item, index) => (
            <li key={index}>{item.message}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home;
