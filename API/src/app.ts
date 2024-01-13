import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import { Response } from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

export const prisma = new PrismaClient();

app.use('/api', router);

const PORT: number = 3000;

try {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
} catch (err) {
  console.log('Internal Server Error');
} finally {
  prisma.$disconnect();
}
