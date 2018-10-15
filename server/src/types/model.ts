import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import { readJson } from '../common/io';

fs.mkdirpSync(config.DK_CONTENT_TYPES_DIR);

export interface ContentType {}

export async function getById(id: string): Promise<ContentType> {
  const file = path.join(config.DK_CONTENT_TYPES_DIR, `${id}.json`);
  const contentType: ContentType = await readJson(file);
  return contentType;
}
