import express from 'express';
import { helloWord, notFound } from '../controllers';
import userRoutes from './user';

const app = express.Router();

app.get('/', helloWord);

app.use('/api/v1/user', userRoutes);

app.use(notFound);

export default app;
