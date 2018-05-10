import { Router } from 'express';
import * as multer from 'multer';
import { authenticate } from '../users/middleware';
import * as model from './model';
import config from '../common/config';

const router = Router();

router.get('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const content = await model.list(location);
        res.json(content);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const name = req.body;
        await model.create(location, name);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const names = req.body;
        await model.update(location, names);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete('/', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const name = req.body;
        await model.remove(location, name);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

export default router;
