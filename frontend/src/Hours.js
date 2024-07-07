import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hours.css';

function Hours() {
  const [hours, setHours] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/hours')
      .then(response => {
        setHours(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching hours of operation. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hours-container">
      <h1 className="hours-header">Working hours</h1>
      <table className="hours-table">
        <tbody>
          {Object.entries(hours).map(([day, time]) => (
            <tr key={day}>
              <td>{day}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hours;
