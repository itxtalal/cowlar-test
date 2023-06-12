import toast from 'react-hot-toast';
import axios from '../config/axios';
import { AxiosError } from 'axios';

export const getTestUser = async () => {
  try {
    const res = await axios.get('/user/test');
    if (res.status === 201 || res.data.status === 'SUCCESS') {
      toast.success('Test User Created');
      return {
        name: res.data.user.name,
        email: res.data.user.email,
        password: res.data.user.password,
        token: res.data.token,
      };
    }
  } catch (error) {
    console.log(error);
    toast.error('Operation Failed');
  }

  return null;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post('/user', data);
    if (res.status === 201 || res.data.status === 'SUCCESS') {
      toast.success('User Created');
      return {
        name: res.data.user.name,
        email: res.data.user.email,
        password: res.data.user.password,
        token: res.data.token,
      };
    }
  } catch (error) {
    console.log(error);
    toast.error('Operation Failed');
  }
  return null;
};

export const verifyUser = async (token: string) => {
  try {
    const response = await axios.get('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.user;
    } else {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post('/user/login', {
      email,
      password,
    });
    if (res.status === 200 || res.data.success === true) {
      toast.success('User Logged In');
      return {
        user: res.data.user,
        token: res.data.token,
      };
    }
  } catch (error: any) {
    console.log('Login error', error);
    toast.error(error?.response?.data?.message || 'Login Failed');
  }
  return null;
};
