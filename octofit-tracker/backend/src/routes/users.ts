import { Router } from 'express';
import User from '../models/user.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
