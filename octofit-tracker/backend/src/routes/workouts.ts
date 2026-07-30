import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Workout.find().lean();
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const created = await Workout.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
