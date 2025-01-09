import express from 'express';
import { v1Router } from '../routes';
import { errorMiddleware } from '../middleware/error-middleware';
import cors from 'cors';

export const web = express();
web.use(express.json());
web.use(cors());
web.use('/api', v1Router);
web.use(errorMiddleware);
