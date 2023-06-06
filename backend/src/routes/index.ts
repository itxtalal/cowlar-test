import express from 'express';
import { helloWord, notFound } from '../controllers';
import userRoutes from './user';
import todoRoutes from './todo';

const app = express.Router();

app.get('/', helloWord);

app.use('/api/v1/user', userRoutes);

app.use('/api/v1/todo', todoRoutes);

app.use(notFound);

export default app;
