import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../lib/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = buildApiUrl('workouts');

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, [apiUrl]);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <p className="hint">Define VITE_CODESPACE_NAME in .env.local for Codespaces API URLs.</p>
      <pre className="endpoint">{apiUrl}</pre>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id || workout.name}>
            <strong>{workout.name}</strong> — {workout.durationMinutes ?? 'N/A'} min
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
