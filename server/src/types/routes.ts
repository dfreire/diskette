import { Router } from 'express';
import { authenticate } from '../users/middleware';
import * as model from './model';

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const list = await model.list();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const contentType = await model.getById(id);
    res.json(contentType);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
