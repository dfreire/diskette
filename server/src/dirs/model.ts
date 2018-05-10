import * as path from 'path';
import * as fs from 'fs-extra';
import { encrypt, hashPass, sha1 } from 'crypto-buddy';
import config from '../common/config';
import { readJson, outputJson } from '../common/io';

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

export async function create(location: string, name: string) {
    await fs.mkdirp(path.join(config.DK_CONTENT_DIR, location, name));
}

export async function update(location: string, names: { from: string, to: string }[]) {
    for (let n of names) {
        await fs.move(
            path.join(config.DK_CONTENT_DIR, location, n.from),
            path.join(config.DK_CONTENT_DIR, location, n.to),
        );
    }
}

export async function remove(location: string, name: string) {
    await fs.remove(path.join(config.DK_CONTENT_DIR, location, name));
}
