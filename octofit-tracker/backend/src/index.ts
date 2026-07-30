import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/database.ts';

import usersRouter from './routes/users.ts';
import teamsRouter from './routes/teams.ts';
import activitiesRouter from './routes/activities.ts';
import workoutsRouter from './routes/workouts.ts';
import leaderboardRouter from './routes/leaderboard.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);

// Build Codespaces-aware base URL when available
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// Allow CORS for frontend and Codespaces preview URL
const allowedOrigins = [baseUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({ origin: (origin, cb) => cb(null, true) }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT, baseUrl });
});

// Expose runtime API configuration for the frontend
app.get('/api/config', (_req, res) => {
  res.json({ baseUrl, port: PORT });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
