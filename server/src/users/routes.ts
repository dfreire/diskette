import { Router } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';
import { encrypt, sha1, comparePass, jwtSign } from 'crypto-buddy';
import { Session } from './model';
import { authenticate } from './middleware';
import * as model from '../users/model';

const router = Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await model.getByEmail(email);

        if (user != null && comparePass(password, user.passHash)) {
            const session: Session = {
                id: encrypt(sha1(email), config.DK_ENCRYPTION_KEY),
            };
            const sessionToken = jwtSign(session, config.DK_JWT_SECRET, '1h');
            res.send(sessionToken);
        } else {
            return res.send(401);
        }
    } catch (err) {
        console.error(err);
        res.send(500);
    }
});

router.post('/set-email', authenticate, async (req, res) => {
    const user = req.user;
    const { newEmail } = req.body;
    await model.setEmail(user.email, newEmail);
    res.sendStatus(200);
});

router.post('/set-password', authenticate, async (req, res) => {
    const user = req.user;
    const { newPassword } = req.body;
    await model.setPassword(user.email, newPassword);
    res.sendStatus(200);
});

export default router;
