import * as path from 'path';
import * as fs from 'fs-extra';
import { Router } from 'express';
import config from '../common/config';

fs.mkdirpSync(config.DK_UI_DIR);

const router = Router();

router.get('/messages.json', async (req, res) => {
    res.sendFile(path.join(config.DK_UI_DIR, 'messages.json'));
});

export default router;
