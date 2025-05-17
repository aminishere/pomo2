import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SessionHistory() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sessions')
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Session History</h2>
      <ul className="space-y-2">
        {sessions.map((session, idx) => (
          <li key={idx} className="border p-4 rounded-md bg-base-100 shadow-md">
            <p><strong>Type:</strong> {session.sessionType}</p>
            <p><strong>Duration:</strong> {session.duration} mins</p>
            <p><strong>Completed:</strong> {new Date(session.completedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionHistory;
