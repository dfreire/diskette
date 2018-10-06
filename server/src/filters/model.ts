import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import { readJson } from '../common/io';

fs.mkdirpSync(config.DK_QUERIES_DIR);

type Doc = { [key: string]: any };

interface Fns {
  filter: { (doc: Doc, _path: string): boolean };
  map: { (doc: Doc, _path: string): Doc };
  compare: { (a: Doc, b: Doc): number };
}

export async function filter(name: string): Promise<string[]> {
  const fns: Fns = require(path.join(config.DK_QUERIES_DIR, name));
  const results = [];

  async function readDir(dir: string) {
    const names = fs.readdirSync(dir);
    for (let name of names) {
      const _path = path.join(dir, name);
      const stat = fs.statSync(_path);
      if (stat.isDirectory()) {
        await readDir(_path);
      } else if (stat.isFile() && name.endsWith('.json')) {
        const doc = await readJson(_path);
        if (fns.filter(doc, _path)) {
          results.push(fns.map(doc, _path));
        }
      }
    }
  }

  await readDir(config.DK_CONTENT_DIR);
  return results.sort(fns.compare);
}
