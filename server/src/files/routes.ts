import * as path from 'path';
import * as fs from 'fs-extra';
import { Router } from 'express';
import * as multer from 'multer';
import * as slug from 'slugg';
import config from '../common/config';
import { authenticate } from '../users/middleware';
import * as sharp from 'sharp';

fs.mkdirpSync(config.DK_UPLOAD_DIR);
const upload = multer({ dest: config.DK_UPLOAD_DIR });

const router = Router();

router.get('/*', async (req, res) => {
  try {
    const pathname = req.params[0];

    const width = parseInt(req.query.w || 0) || null;
    const height = parseInt(req.query.h || 0) || null;

    const fileDir = path.dirname(pathname);
    const cacheDir = path.join(config.DK_CACHE_DIR, fileDir);
    fs.mkdirpSync(cacheDir);

    const ext = path.extname(pathname);
    let fileName = path.basename(pathname, ext);
    if (width > 0 || height > 0) {
      fileName += '-';
    }
    if (width > 0) {
      fileName += width;
    }
    if (height > 0) {
      fileName += 'x' + height;
    }
    fileName += ext;

    const cacheFile = path.join(cacheDir, fileName);

    if (!fs.existsSync(cacheFile)) {
      await sharp(path.join(config.DK_CONTENT_DIR, pathname))
        .resize(width, height)
        .max()
        .withoutEnlargement()
        .toFile(cacheFile);
    }

    res.sendFile(cacheFile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post('/*', authenticate, upload.array('files'), async (req, res) => {
  const pathname = req.params[0];
  const fileNames = [];

  for (let file of req.files as Express.Multer.File[]) {
    const tokens = file.originalname.split('.');
    const name = slug(tokens[0]);
    const ext = slug(tokens[1]);
    const fileName = `${name}.${ext}`;
    await fs.move(file.path, path.join(config.DK_CONTENT_DIR, pathname, fileName), { overwrite: true });
    fileNames.push(fileName);
  }

  res.json(fileNames);
});

export default router;
