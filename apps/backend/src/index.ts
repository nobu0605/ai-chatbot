import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import chatRouter from './routes/chat';
import { env } from './config/env';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', chatRouter);

// Basic error handler to avoid leaking stack traces in responses
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = Number(env.port) || 3001;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
