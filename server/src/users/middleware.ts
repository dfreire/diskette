import { Bearer } from 'permit';
import config from '../common/config';
import { decrypt, jwtVerify } from 'crypto-buddy';
import * as usersModel from '../users/model';
import { Session } from './model';

const permit = new Bearer();

export async function authenticate(req, res, next) {
	try {
		// header "Authorization: Bearer token"
		const token = permit.check(req);
		
		if (token === config.DK_API_KEY) {
			next();
			
		} else {
			const session = jwtVerify<Session>(token, config.DK_JWT_SECRET);
			const emailSha1 = decrypt(session.id, config.DK_ENCRYPTION_KEY);
			req.user = await usersModel.getByEmailSha1(emailSha1);
			next();
		}
	} catch (err) {
		permit.fail(res);
		res.sendStatus(401);
	}
}
