import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';
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

export async function update(location: string, changes: { oldFriendlyName: string, newFriendlyName: string }[]) {
    for (let n of changes) {
        await fs.move(
            path.join(config.DK_CONTENT_DIR, location, n.oldFriendlyName),
            path.join(config.DK_CONTENT_DIR, location, n.newFriendlyName),
        );
    }
}

export async function remove(location: string, name: string) {
    await fs.remove(path.join(config.DK_CONTENT_DIR, location, name));
}
