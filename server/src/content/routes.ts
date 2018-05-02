import { Router } from 'express';
import * as multer from 'multer';
import * as slug from 'slugg';
import { authenticate } from '../users/middleware';
import * as model from './model';
import config from '../common/config';

const router = Router();

router.get('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const content = await model.getByLocation(location);
        res.json(content);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/*', authenticate, async (req, res) => {
    try {
        const location = req.params[0];
        const { content } = req.body;
        await model.createOrUpdate(location, content);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.delete('/', authenticate, async (req, res) => {
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
