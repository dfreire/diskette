import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import { readJson } from '../common/io';

fs.mkdirpSync(config.DK_QUERIES_DIR);

interface Item {
  absolutePath: string;
  relativePath: string;
}

type Result = { [key: string]: any }[];

type ReadJsonFn = { (file: string): Promise<object> };

type HandlerFn = { (items: Item[], params: object, readJson: ReadJsonFn): Promise<Result> };

export async function query(name: string): Promise<Result> {
  const handle: HandlerFn = require(path.join(config.DK_QUERIES_DIR, name));

  const items: Item[] = [];

  async function readDir(dir: string) {
    const names = fs.readdirSync(dir);
    for (let name of names) {
      const absolutePath = path.join(dir, name);
      const stat = fs.statSync(absolutePath);
      if (stat.isDirectory()) {
        await readDir(absolutePath);
      } else if (stat.isFile() && name.endsWith('.json')) {
        const relativePath = path.relative(config.DK_CONTENT_DIR, absolutePath);
        items.push({ absolutePath, relativePath });
      }
    }
  }

  await readDir(config.DK_CONTENT_DIR);
  const result = await handle(items, {}, readJson);
  return result;
}
