import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../store/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import Button from '@/components/builder.io/Button';
import Header from '@/components/builder.io/Header';
import InputField from '@/components/builder.io/InputField';
import LoginLink from '@/components/builder.io/LoginLink';

interface FormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { error: registerError }] = useRegisterMutation();

  // For password confirmation validation
  // const password = watch('password');
  const inputFields = [
    { label: 'Email', type: 'email', name: 'email' as const },
    { label: 'Username', type: 'text', name: 'username' as const },
    { label: 'Password', type: 'password', name: 'password' as const },
    { label: 'Confirm Password', type: 'password', name: 'confirmPassword' as const },
  ];


  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
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

  const moveToLogin = () => {
    navigate('/login');
  }

  return (
    <div className="flex overflow-hidden flex-col h-screen bg-primary-container">
      <Header />
      <div className="flex overflow-hidden flex-col flex-1 justify-center items-center w-full text-base tracking-wide max-md:max-w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex overflow-hidden flex-col justify-center px-5 py-2.5 max-w-full w-[623px]">
          <h2 className="text-2xl tracking-normal leading-none text-primary">
            Become a part of something bigger!
          </h2>
          {inputFields.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              type={field.type}
              register={register}
              name={field.name}
              error={errors[field.name]}
            />
          ))}
          <Button text="Register" />
          <LoginLink onClick={moveToLogin} />
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;