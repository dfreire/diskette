import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import * as slug from 'slugg';
import { save } from '../content/model';

fs.mkdirpSync(config.DK_CONTENT_DIR);

export async function list(location: string): Promise<string[]> {
  const dir = path.join(config.DK_CONTENT_DIR, location);

  const list = [];

  fs.readdirSync(dir).forEach(subDir => {
    fs.statSync(path.join(dir, subDir)).isDirectory() && list.push(subDir);
  });

  list.sort((a, b) => {
    const a1 = parseInt(a.split('-')[0]);
    const b1 = parseInt(b.split('-')[0]);
    return a1 - b1;
  });

  return list;
}

export async function create(location: string, friendlyName: string, contentType: string) {
  const dirs = await list(location);
  const name = slug(`${dirs.length}_${friendlyName}`);
  await fs.mkdirp(path.join(config.DK_CONTENT_DIR, location, name));
  await save(path.join(location, name), { type: contentType, fields: {} });
}

export async function update(location: string, oldName: string, newName: string) {
  const oldPos = parseInt(oldName.split('-')[0]);
  const newPos = parseInt(newName.split('-')[0]);

  if (oldPos === newPos) {
    await fs.move(path.join(config.DK_CONTENT_DIR, location, oldName), path.join(config.DK_CONTENT_DIR, location, newName));
  } else {
    const dirs = await list(location);
    dirs.splice(oldPos, 1);
    dirs.splice(newPos, 0, oldName);
    await sortAndRenameDirs(location, dirs);
  }
}

export async function remove(location: string) {
  const tokens = location.split('/');
  const name = tokens.pop();
  const _location = tokens.join('/');

  await fs.remove(path.join(config.DK_CONTENT_DIR, _location, name));

  const dirs = await list(_location);
  await sortAndRenameDirs(_location, dirs);
}

async function sortAndRenameDirs(location, dirs: string[]) {
  for (let i = 0; i < dirs.length; i++) {
    const existentName = dirs[i];
    const newName = [`${i}`, ...existentName.split('-').slice(1)].join('-');

    if (existentName !== newName) {
      await fs.move(path.join(config.DK_CONTENT_DIR, location, existentName), path.join(config.DK_CONTENT_DIR, location, newName));
    }
  }
}
