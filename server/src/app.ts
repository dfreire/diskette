import * as http from 'http';
import * as express from 'express';
import config from './common/config';
import uiRouter from './ui/routes';
import usersRouter from './users/routes';
import contentRouter from './content/routes';
import dirsRouter from './dirs/routes';
import typesRouter from './types/routes';
import filesRouter from './files/routes';
import queriesRouter from './queries/routes';

const app = express();
app.use(express.json());
app.use('/api/ui', uiRouter);
app.use('/api/users', usersRouter);
app.use('/api/content', contentRouter);
app.use('/api/dirs', dirsRouter);
app.use('/api/types', typesRouter);
app.use('/api/files', filesRouter);
app.use('/api/query', queriesRouter);

const server = http.createServer(app);
server.listen(config.DK_PORT);
server.on('error', error => console.error(error));
server.on('listening', () => console.log('Listening on port', config.DK_PORT));
