import * as path from 'path';

interface Config {
  DK_PORT: number;
  DK_API_KEY: string;
  DK_ENCRYPTION_KEY: string;
  DK_ENCRYPT_DATA: boolean;
  DK_JWT_SECRET: string;
  DK_DATA_DIR: string;

  DK_UI_DIR: string;
  DK_USERS_DIR: string;
  DK_CACHE_DIR: string;
  DK_UPLOAD_DIR: string;
  DK_QUERIES_DIR: string;
  DK_CONTENT_DIR: string;
  DK_CONTENT_TYPES_DIR: string;
}

function _parseBoolean(value: any) {
  const _value = ((value as any) || 'false').toLowerCase();
  return _value === 'true' || _value === '1';
}

function _parseInt(value: any) {
  return parseInt(value);
}

const config: Config = require('dotenv').config().parsed;
config.DK_PORT = _parseInt(config.DK_PORT);
config.DK_ENCRYPT_DATA = _parseBoolean(config.DK_ENCRYPT_DATA);
config.DK_UI_DIR = path.join(config.DK_DATA_DIR, 'ui');
config.DK_USERS_DIR = path.join(config.DK_DATA_DIR, 'users');
config.DK_CACHE_DIR = path.join(config.DK_DATA_DIR, 'cache');
config.DK_UPLOAD_DIR = path.join(config.DK_DATA_DIR, 'upload');
config.DK_QUERIES_DIR = path.join(config.DK_DATA_DIR, 'queries');
config.DK_CONTENT_DIR = path.join(config.DK_DATA_DIR, 'content');
config.DK_CONTENT_TYPES_DIR = path.join(config.DK_DATA_DIR, 'types');

export default config;
