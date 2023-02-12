import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {SigninDto} from '../../../../api/openapi';
import {useLoginUserMutation} from '../../../../api/authApi';
import {useAppDispatch} from '../../../hooks';
import {LOG_IN} from '../../../../features/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik<SigninDto>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => handleLogin(values)
  })

  const [remember, setRemember] = useState<boolean>(false);
  const [loginUser, {data: loginData, isSuccess: isLoginSuccess, isError: isLoginError, error: loginError}] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const handleLogin = async (credentials: SigninDto) => {
    await loginUser(credentials);
  }

  useEffect(() => {
    if(isLoginSuccess) {
      dispatch(LOG_IN({token: loginData.token, user: loginData.user}))
      navigate('/');
    }
  }, [isLoginSuccess])
  
  return (
    <section className="bg-gray-50 dark:bg-primary h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                  email</label>
                <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email}
                       className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                       block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="name@domain.com" required />
              </div>
              <div>
                <label htmlFor="password"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" onChange={formik.handleChange} value={formik.values.password}
                       className="bg-blue-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" onChange={(e) => setRemember(e.target.checked)} checked={remember}
                           className="w-4 h-4 accent-primary border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary hover:underline dark:text-primary">Forgot password?</a>
              </div>
              <button type="submit"
                      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                      bg-primary dark:bg-primary text-white dark:text-white
                      hover:bg-primary-400 hover:dark:bg-primary-400
                      focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-800">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a href="#" className="font-medium text-primary hover:underline dark:text-primary"> Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
