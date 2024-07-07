import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Announcements.css';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/announcements')
      .then(response => {
        setAnnouncements(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
        setError('Error fetching announcements. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="service">
      <h2>Announcements</h2>
      <ul>
        {announcements.map((announcement, index) => (
          <li key={index}>{announcement.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Announcements;
