import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, register, name, error }) => {
  const id = `${name}Input`;

  return (
    <div className="flex flex-col mt-5 w-full text-primary whitespace-nowrap rounded min-h-[56px] max-md:max-w-full">
      <div className="flex flex-col flex-1 w-full rounded border border-solid border-primary max-md:max-w-full">
        <div className="flex flex-1 gap-1 items-start py-1 pl-4 rounded size-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink justify-center py-3 w-full basis-0 min-h-[48px] min-w-[240px] max-md:max-w-full">
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
              {...register(name, { required: `${label} is required` })}
              type={type}
              id={id}
              placeholder={label}
              aria-label={label}
              aria-invalid={error ? "true" : "false"}
              className="flex-1 shrink self-stretch w-full max-md:max-w-full bg-transparent text-primary"
            />
          </div>
        </div>
      </div>
      {error && <span role="alert" className="text-red-500 text-sm mt-1">{error.message}</span>}
    </div>
  );
};

export default InputField;