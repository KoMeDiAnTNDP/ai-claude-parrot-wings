import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { error: registerError }] = useRegisterMutation();

  // For password confirmation validation
  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const result = await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      }).unwrap();
      
      dispatch(setToken(result.id_token));
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 mr-2 text-purple-600"
              fill="currentColor"
            >
              <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.736 4 21.276 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z" />
            </svg>
            <span className="text-2xl font-semibold text-purple-600">
              Parrot Wings
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <div className="space-y-6">
          <h2 className="text-xl text-center font-semibold text-gray-700">
            Become a part of something bigger!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-lg bg-white border 
                  ${errors.email ? 'border-red-500' : 'border-purple-200'} 
                  focus:outline-none focus:border-purple-400`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <input
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                type="text"
                placeholder="Username"
                className={`w-full px-4 py-3 rounded-lg bg-white border 
                  ${errors.username ? 'border-red-500' : 'border-purple-200'} 
                  focus:outline-none focus:border-purple-400`}
                disabled={isSubmitting}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type="password"
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg bg-white border 
                  ${errors.password ? 'border-red-500' : 'border-purple-200'} 
                  focus:outline-none focus:border-purple-400`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                type="password"
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 rounded-lg bg-white border 
                  ${errors.confirmPassword ? 'border-red-500' : 'border-purple-200'} 
                  focus:outline-none focus:border-purple-400`}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Error Alert */}
            {registerError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {('data' in registerError) 
                    ? registerError.data?.message 
                    : 'Registration failed. Please try again.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 bg-purple-600 text-white rounded-lg 
                hover:bg-purple-700 transition duration-200
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link 
              to="/login" 
              className="text-purple-600 hover:underline"
              tabIndex={isSubmitting ? -1 : 0}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;