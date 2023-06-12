import { verifyUser } from '../../api/user';

export const verifyToken = async (token: string) => {
  const user = await verifyUser(token);
  if (user) {
    console.log('Token verification succeeded:', user);
    return user;
  } else {
    console.log('Token verification failed');
    return null;
  }
};
