import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

fs.mkdirpSync(config.DK_CONTENT_TYPES_DIR);

export interface ContentType {
}

export async function createOrUpdate(id: string, contentType: ContentType) {
    await save(id, contentType);
}

export async function remove(id: string) {
    await fs.remove(path.join(config.DK_CONTENT_TYPES_DIR, `${id}.json`));
}

export async function getById(id: string): Promise<ContentType> {
    const file = path.join(config.DK_CONTENT_TYPES_DIR, `${id}.json`);
    const contentType: ContentType = await readJson(file);
    return contentType;
}

async function save(id: string, contentType: ContentType) {
    const file = path.join(config.DK_CONTENT_TYPES_DIR, `${id}.json`);
    await outputJson(file, contentType);
}
