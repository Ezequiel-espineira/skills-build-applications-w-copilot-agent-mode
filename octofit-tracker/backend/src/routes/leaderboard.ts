import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const rows = await Leaderboard.find().populate('user').sort({ score: -1 }).lean();
  res.json(rows);
});

router.post('/', async (req, res) => {
  try {
    const created = await Leaderboard.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
