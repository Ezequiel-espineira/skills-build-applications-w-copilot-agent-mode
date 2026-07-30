import express from 'express';
import dotenv from 'dotenv';
import db from './config/database.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on port ${PORT}`);
});
