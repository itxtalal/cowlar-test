import { Request, Response } from 'express';

const helloWord = (req: Request, res: Response) => {
  res.json({
    msg: 'Hello world',
    status: 'SUCCESS',
  });
};

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    msg: 'Not Found',
    status: 'FAILURE',
  });
};

export { helloWord, notFound };
