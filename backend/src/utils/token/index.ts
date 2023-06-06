import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const signAccessToken = (user: User) =>
  signToken(
    user,
    process.env.SECRET_KEY as string,
    process.env.TOKEN_EXPIRE as string
  );

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
