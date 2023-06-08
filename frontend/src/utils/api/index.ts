import axios from '../../config/axios';

export const verifyToken = async (token: string) => {
  try {
    const response = await axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) return response.data.user;
    else {
      console.log('asdqweASSSSSSSSS');

      throw new Error('Token verification failed');
    }
  } catch (error) {
    console.log('asdad');
    return null;
  }
};
