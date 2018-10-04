import { Router } from 'express';
import { authenticate } from '../users/middleware';
import * as model from './model';

const router = Router();

router.get('/*', authenticate, async (req, res) => {
  try {
    const location = req.params[0];
    const list = await model.list(location);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/*', authenticate, async (req, res) => {
  try {
    const location = req.params[0];
    const { friendlyName, contentType } = req.body;
    await model.create(location, friendlyName, contentType);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put('/*', authenticate, async (req, res) => {
  try {
    const location = req.params[0];
    const { oldName, newName } = req.body;
    await model.update(location, oldName, newName);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/*', authenticate, async (req, res) => {
  try {
    const location = req.params[0];
    await model.remove(location);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
