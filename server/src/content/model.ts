import * as path from 'path';
import * as fs from 'fs-extra';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

fs.mkdirpSync(config.DK_CONTENT_DIR);

export interface Content {
    type: string;
    fields: object;
}

export async function createOrUpdate(location: string, content: Content) {
    await save(location, content);
}

export async function remove(location: string) {
    await fs.remove(path.join(config.DK_CONTENT_DIR, location));
}

export async function getByLocation(location: string): Promise<Content> {
    const dir = path.join(config.DK_CONTENT_DIR, location);
    const content: Content = await readJson(path.join(dir, 'index.json'));
    return content;
}

export async function save(location: string, content: Content) {
    const dir = path.join(config.DK_CONTENT_DIR, location);
    await fs.mkdirp(dir);

    const file = path.join(dir, 'index.json');
    await outputJson(file, content);
}
