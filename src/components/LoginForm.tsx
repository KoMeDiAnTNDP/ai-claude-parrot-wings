import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../store/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setToken(result.id_token));
      navigate('/home');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Spread Your Wings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Not registered yet?{' '}
          <a href="/register" className="text-purple-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};