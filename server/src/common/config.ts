import * as path from 'path';

interface Config {
    DK_PORT: number;
    DK_ENCRYPTION_KEY: string;
    DK_ENCRYPT_DATA: boolean;
    DK_JWT_SECRET: string;
    DK_USERS_DIR: string;
    DK_CONTENT_DIR: string;
    DK_CONTENT_TYPES_DIR: string;
    DK_UPLOAD_DIR: string;
    DK_CACHE_DIR: string;
}

function _parseBoolean(value: any) {
    const _value = (value as any || 'false').toLowerCase();
    return _value === 'true' || _value === '1';
}

function _parseInt(value: any) {
    return parseInt(value);
}

const config: Config = require('dotenv').config().parsed;
config.DK_ENCRYPT_DATA = _parseBoolean(config.DK_ENCRYPT_DATA);
config.DK_USERS_DIR = path.join(process.cwd(), config.DK_USERS_DIR);
config.DK_CONTENT_DIR = path.join(process.cwd(), config.DK_CONTENT_DIR);
config.DK_CONTENT_TYPES_DIR = path.join(process.cwd(), config.DK_CONTENT_TYPES_DIR);
config.DK_UPLOAD_DIR = path.join(process.cwd(), config.DK_UPLOAD_DIR);
config.DK_PORT = _parseInt(config.DK_PORT);

export default config;
