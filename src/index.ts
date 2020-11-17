import express from 'express';
import path from 'path';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '/data')));

app.listen(PORT, () => {
    console.log('Server has been started');
});
