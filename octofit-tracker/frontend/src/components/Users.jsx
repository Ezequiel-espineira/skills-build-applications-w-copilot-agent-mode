import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeApiResponse } from '../lib/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = buildApiUrl('users/');

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, [apiUrl]);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <p className="hint">Define VITE_CODESPACE_NAME in .env.local for Codespaces API URLs.</p>
      <pre className="endpoint">{apiUrl}</pre>
      <ul>
        {users.map((user) => (
          <li key={user._id || user.email}>
            <strong>{user.username}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
