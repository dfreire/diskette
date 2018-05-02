import { Bearer } from 'permit';
import * as jwt from 'jsonwebtoken';
import config from '../common/config';
import { decrypt, jwtVerify } from 'crypto-buddy';
import * as usersModel from '../users/model';
import { Session } from './model';

const permit = new Bearer();

export async function authenticate(req, res, next) {
	try {
		const sessionToken = permit.check(req); // header "Authorization: Bearer token"
		const session = jwtVerify<Session>(sessionToken, config.DK_JWT_SECRET);
		const emailSha1 = decrypt(session.id, config.DK_ENCRYPTION_KEY);
		req.user = await usersModel.getByEmailSha1(emailSha1);
		next();
	} catch (err) {
		permit.fail(res);
		res.sendStatus(401);
	}
}
