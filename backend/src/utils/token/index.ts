import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import config from '../../config/app';

const signAccessToken = (user: User) =>
  signToken(user, config.secretKey, config.tokenExpire);

const signToken = (user: User, secret: string, expiresIn: string) => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      name: user.name,
    },
    secret,
    { expiresIn }
  );

  return token;
};

export { signAccessToken };
