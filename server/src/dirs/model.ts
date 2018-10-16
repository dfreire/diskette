import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import * as slug from 'slugg';
import { readJson } from '../common/io';
import { getByLocation, save } from '../content/model';
import { Content } from '../content/model';

fs.mkdirpSync(config.DK_CONTENT_DIR);

export async function list(location: string): Promise<{ name: string; type: string }[]> {
  const dir = path.join(config.DK_CONTENT_DIR, location);

  const list = [];

  for (let subDir of fs.readdirSync(dir)) {
    const subDirPath = path.join(dir, subDir);
    const stat = fs.statSync(subDirPath);
    if (stat.isDirectory()) {
      const doc: any = await readJson(path.join(subDirPath, 'index.json'));
      list.push({
        name: subDir,
        type: doc.type,
      });
    }
  }

  list.sort((a, b) => {
    const a1 = parseInt(a.name.split('-')[0]);
    const b1 = parseInt(b.name.split('-')[0]);
    return a1 - b1;
  });

  return list;
}

async function getDirNames(location: string): Promise<string[]> {
  const dir = path.join(config.DK_CONTENT_DIR, location);

  const dirNames = [];

  for (let subDir of fs.readdirSync(dir)) {
    const subDirPath = path.join(dir, subDir);
    const stat = fs.statSync(subDirPath);
    if (stat.isDirectory()) {
      dirNames.push(subDir);
    }
  }

  dirNames.sort((a, b) => {
    const a1 = parseInt(a.split('-')[0]);
    const b1 = parseInt(b.split('-')[0]);
    return a1 - b1;
  });

  return dirNames;
}

export async function create(location: string, friendlyName: string, contentType: string) {
  const dirs = await getDirNames(location);
  const name = slug(`${dirs.length}_${friendlyName}`);
  await fs.mkdirp(path.join(config.DK_CONTENT_DIR, location, name));
  await save(path.join(location, name), { type: contentType, fields: {} });
}

export async function update(location: string, oldName: string, newName: string, contentType?: string) {
  if (contentType != null) {
    const doc = (await getByLocation(path.join(location, oldName))) as Content;
    await save(path.join(location, oldName), { ...doc, type: contentType });
  }

  const oldPos = parseInt(oldName.split('-')[0]);
  const newPos = parseInt(newName.split('-')[0]);

  if (oldPos === newPos) {
    await fs.move(path.join(config.DK_CONTENT_DIR, location, oldName), path.join(config.DK_CONTENT_DIR, location, newName));
  } else {
    const dirs = await getDirNames(location);
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

  const dirs = await getDirNames(_location);
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
