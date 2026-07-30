import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const items = await Activity.find().populate('user').lean();
  res.json(items);
});

router.post('/', async (req, res) => {
  try {
    const created = await Activity.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
