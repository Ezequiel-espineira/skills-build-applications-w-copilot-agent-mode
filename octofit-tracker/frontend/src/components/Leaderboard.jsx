import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../lib/api.js';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = buildApiUrl('leaderboard');

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setRows(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, [apiUrl]);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <p className="hint">Define VITE_CODESPACE_NAME in .env.local for Codespaces API URLs.</p>
      <pre className="endpoint">{apiUrl}</pre>
      <ol>
        {rows.map((row) => (
          <li key={row._id || row.user?._id || `${row.user?.username}-${row.score}`}>
            <strong>{row.user?.username || 'Unknown'}</strong> — {row.score} pts
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
