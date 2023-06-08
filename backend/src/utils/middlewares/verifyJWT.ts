import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { User } from '@prisma/client';
import config from '../../config/app';

interface AuthPayload {
  email: string;
  id: number;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token provided', status: 'ERROR' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey) as AuthPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid Token', status: 'ERROR' });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token', status: 'ERROR' });
  }
};

export default verifyJWT;
