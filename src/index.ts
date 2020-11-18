import express, { json } from 'express';
import path from 'path';
import cors from 'cors';

import { router } from './movies-api';

const PORT = 3000;
const app = express();

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '/data')));
app.use(json());
app.use(router);

app.listen(PORT, () => {
    console.log('Server has been started');
});
