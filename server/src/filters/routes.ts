import { Router } from 'express';
import { authenticate } from '../users/middleware';
import * as model from './model';

const router = Router();

router.get('/:name', authenticate, async (req, res) => {
  try {
    const name = req.params.name;
    const result = await model.filter(name);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
