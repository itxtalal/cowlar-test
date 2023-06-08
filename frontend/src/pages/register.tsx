import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import RootLayout from '../Layout';
import Button from '../components/Button';
import Loading from '../components/Loading';
import useAuthVerification from '../hooks/useAuthVerification';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { pageLoading } = useAuthVerification();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [showTestUser, setShowTestUser] = useState(false);
  const [testUser, setTestUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const getTestUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/user/test');
      if (res.status === 201 || res.data.status === 'SUCCESS') {
        setLoading(false);
        localStorage.setItem('COWLAR_TOKEN', res.data.token);
        setShowTestUser(true);
        setTestUser({
          name: res.data.user.name,
          email: res.data.user.email,
          password: res.data.user.password,
        });
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post('/user', data);
      if (res.status === 201 || res.data.status === 'SUCCESS') {
        setLoading(false);
        localStorage.setItem('COWLAR_TOKEN', res.data.token);
        navigate('/');
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
    }
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

  if (showTestUser)
    return (
      <RootLayout>
        <div className="custom-bg-gradient flex min-h-screen items-center justify-center px-4">
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Test Account Details
                </h1>

                <p className="text-sm m-1 text-orange-600 font-bold">
                  Please Note these down. <br />
                  You'll need these if you have to login again.
                </p>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mt-2 block text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  disabled
                  value={testUser.name}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm mb-2"
                />
                <label
                  htmlFor="email"
                  className="mt-2 block text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  disabled
                  value={testUser.email}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm mb-2"
                />
                <label
                  htmlFor="password"
                  className="mt-2 block text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  disabled
                  value={testUser.password}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm mb-2"
                />
              </div>

              <Link
                to="/"
                className="text-white my-2 font-medium rounded text-sm md:text-base lg:text-lg px-5 py-2.5 text-center flex items-center justify-center transition-all bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 focus:ring-4 focus:outline-none"
              >
                <p>Go to App</p>
              </Link>
            </div>
          </div>
        </div>
      </RootLayout>
    );

  return (
    <RootLayout>
      <div className="custom-bg-gradient flex min-h-screen items-center justify-center px-4">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: true, minLength: 3 })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  placeholder="John Doe"
                />

                {errors.name && (
                  <p className="text-sm text-red-500">
                    Name is required. Min length is 3 chars
                  </p>
                )}
              </div>
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
                  {...register('email', { required: true })}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                  placeholder="john@gmail.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">Email is required</p>
                )}
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
                  {...register('password', { required: true, minLength: 3 })}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    Password is required. Min length is 3 chars
                  </p>
                )}
              </div>

              <div className="text-sm text-red-500">{error && error}</div>

              <div className="flex items-center justify-center">
                <Button
                  isLoading={loading}
                  disabled={loading}
                  text="Register"
                  loadingText="Registering..."
                />
                <Button
                  isLoading={loading}
                  disabled={loading}
                  text="Get a Test Account"
                  loadingText="Registering..."
                  color
                  type="button"
                  onClick={getTestUser}
                />
              </div>

              <p className="text-sm font-light text-gray-500 ">
                Already have an account ?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Register;
