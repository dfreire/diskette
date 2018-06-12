import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

fs.mkdirpSync(config.DK_CONTENT_TYPES_DIR);

export interface ContentType {
}

export async function list(): Promise<string[]> {
    const dir = path.join(config.DK_CONTENT_TYPES_DIR);

    const list = [];

    fs.readdirSync(dir).forEach(file => {
        fs.statSync(path.join(dir, file)).isFile() && file.endsWith('.json') && list.push(file);
    });

    return list
        .map(t => t.split('.json')[0])
        .sort((a, b) => a.localeCompare(b));
}

export async function getById(id: string): Promise<ContentType> {
    const file = path.join(config.DK_CONTENT_TYPES_DIR, `${id}.json`);
    const contentType: ContentType = await readJson(file);
    return contentType;
}
