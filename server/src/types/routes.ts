import { Router } from 'express';
import { authenticate } from '../users/middleware';
import * as model from './model';

const router = Router();

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

router.post('/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const { contentType } = req.body;
        await model.createOrUpdate(id, contentType);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete('/', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        await model.remove(id);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default router;
