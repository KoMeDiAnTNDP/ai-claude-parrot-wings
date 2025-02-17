import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../store/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

export const RegisterForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = watch('password');

  const onSubmit = async (data: any) => {
    try {
      const result = await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      }).unwrap();
      dispatch(setToken(result.id_token));
      navigate('/home');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-100">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Become a part of something bigger!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <div>
            <input
              {...register('username', { required: true })}
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <div>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <div>
            <input
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === password || "Passwords do not match"
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-purple-50"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Register
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};