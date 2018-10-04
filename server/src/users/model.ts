import * as path from 'path';
import * as fs from 'fs-extra';
import { hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

fs.mkdirpSync(config.DK_USERS_DIR);

export interface User {
  username: string;
  passHash: string;
}

export interface Session {
  id: string;
}

export async function create(username: string, password: string) {
  const user: User = {
    username,
    passHash: hashPass(password),
  };

  await save(user);
}

export async function setUsername(currentUsername: string, newUsername: string) {
  const user: User = await getByUsername(currentUsername);
  user.username = newUsername;
  await save(user);

  const oldFile = path.join(config.DK_USERS_DIR, `${currentUsername}.json`);
  await fs.remove(oldFile);
}

export async function setPassword(currentUsername: string, newPassword: string) {
  const user: User = await getByUsername(currentUsername);
  user.passHash = hashPass(newPassword);
  await save(user);
}

export async function getByUsername(username: string): Promise<User> {
  try {
    const file = path.join(config.DK_USERS_DIR, `${username}.json`);
    const user: User = await readJson(file);
    return user;
  } catch (err) {
    return undefined;
  }
}

async function save(user: User) {
  const file = path.join(config.DK_USERS_DIR, `${user.username}.json`);
  await outputJson(file, user);
}
