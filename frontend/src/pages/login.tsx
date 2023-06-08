import { SubmitHandler, useForm } from 'react-hook-form';

import axios from '../config/axios';
import { Link, useNavigate } from 'react-router-dom';
import RootLayout from '../Layout';
import Button from '../components/Button';
import { useState } from 'react';
import Loading from '../components/Loading';
import useAuthVerification from '../hooks/useAuthVerification';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { pageLoading } = useAuthVerification();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  console.count('Login.tsx');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    axios
      .post('/user/login', data)
      .then((res) => {
        // console.log('res', res);
        if (res.status === 200 || res.data.success === true) {
          setLoading(false);
          localStorage.setItem('COWLAR_TOKEN', res.data.token);
          navigate('/');
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log('err', err);
        setError(err.response.data.message);
      });
  };

  if (pageLoading)
    return (
      <RootLayout>
        <div className="w-screen h-screen flex items-center justify-center">
          <Loading />
          <p className="mx-2">Loading ...</p>
        </div>
      </RootLayout>
    );

  return (
    <RootLayout>
      <div className="custom-bg-gradient flex min-h-screen items-center justify-center px-4">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: true })}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
                />
              </div>

              <div className="text-sm text-red-500">{error && error}</div>

              <div className="flex items-center justify-center">
                <Button
                  isLoading={loading}
                  text="Log in"
                  loadingText="Loggin in ..."
                />
              </div>

              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{' '}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Login;
