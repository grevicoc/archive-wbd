import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import requestRouter from './routes/request';
import authRouter from './routes/auth';
import resepRouter from './routes/resep';
import bahanbakuRouter from './routes/bahanBaku';
import verifyToken from './middleware/authJwt';

dotenv.config();

const port = process.env.SERVER_PORT;

// setting pake port React
const corsOptions = {
  origin: 'http://localhost:5001',
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRouter);

app.use('/resep', resepRouter);

app.use('/bahanbaku', bahanbakuRouter);

// verify token example 1
app.use('/test/token/1', verifyToken);

app.get('/test/token/1', (req, res) => {
  res.send('Okay');
});

// verify token example 2
app.get('/test/token/2', verifyToken, (req, res) => {
  res.send('Okey');
});

app.use('/request', requestRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
