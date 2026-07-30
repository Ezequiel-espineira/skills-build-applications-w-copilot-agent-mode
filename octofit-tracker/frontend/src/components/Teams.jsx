import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../lib/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = buildApiUrl('teams/');

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, [apiUrl]);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <p className="hint">Define VITE_CODESPACE_NAME in .env.local for Codespaces API URLs.</p>
      <pre className="endpoint">{apiUrl}</pre>
      <ul>
        {teams.map((team) => (
          <li key={team._id || team.name}>
            <strong>{team.name}</strong> — {team.members?.length || 0} members
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
