import express from 'express';
import { helloWord, notFound } from '../controllers';

const app = express.Router();

app.get('/', helloWord);

app.use(notFound);

export default app;
