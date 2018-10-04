import { Router } from 'express';
import config from '../common/config';
import { encrypt, sha1, comparePass, jwtSign } from 'crypto-buddy';
import { Session } from './model';
import { authenticate } from './middleware';
import * as model from '../users/model';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.getByUsername(username);

    if (user != null && comparePass(password, user.passHash)) {
      const session: Session = {
        id: encrypt(username, config.DK_ENCRYPTION_KEY),
      };
      const sessionToken = jwtSign(session, config.DK_JWT_SECRET, '4h');
      res.send(sessionToken);
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/set-username', authenticate, async (req, res) => {
  const user = req['user'];
  const { newUsername } = req.body;
  await model.setUsername(user.username, newUsername);
  res.sendStatus(200);
});

router.post('/set-password', authenticate, async (req, res) => {
  const user = req['user'];
  const { newPassword } = req.body;
  await model.setPassword(user.username, newPassword);
  res.sendStatus(200);
});

export default router;
