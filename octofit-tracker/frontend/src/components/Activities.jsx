import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../lib/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = buildApiUrl('activities');

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, [apiUrl]);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <p className="hint">Define VITE_CODESPACE_NAME in .env.local for Codespaces API URLs.</p>
      <pre className="endpoint">{apiUrl}</pre>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id || `${activity.type}-${activity.date}`}>
            <strong>{activity.type}</strong> — {activity.durationMinutes} min — {activity.calories} cal
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
