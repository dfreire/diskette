import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

fs.mkdirpSync(config.DK_USERS_DIR);

export interface User {
    email: string;
    passHash: string;
}

export interface Session {
    id: string;
}

export async function create(email: string, password: string) {
    const user: User = {
        email,
        passHash: hashPass(password),
    };

    await save(user);
}

export async function setEmail(currentEmail: string, newEmail: string) {
    const user: User = await getByEmail(currentEmail);
    user.email = newEmail;
    await save(user);

    const oldFile = path.join(config.DK_USERS_DIR, `${sha1(currentEmail)}.json`);
    await fs.remove(oldFile);
}

export async function setPassword(currentEmail: string, newPassword: string) {
    const user: User = await getByEmail(currentEmail);
    user.passHash = hashPass(newPassword);
    await save(user);
}

export async function getByEmail(email: string): Promise<User> {
    return getByEmailSha1(sha1(email));
}

export async function getByEmailSha1(emailSha1: String): Promise<User> {
    try {
        const file = path.join(config.DK_USERS_DIR, `${emailSha1}.json`);
        const user: User = await readJson(file);
        return user;
    } catch (err) {
        return undefined;
    }

}

async function save(user: User) {
    const file = path.join(config.DK_USERS_DIR, `${sha1(user.email)}.json`);
    await outputJson(file, user);
}
