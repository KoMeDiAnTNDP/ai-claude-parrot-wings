import React from 'react';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <div className="flex overflow-hidden flex-col mt-5 w-full text-sm font-medium tracking-normal leading-none text-center max-md:max-w-full">
      <button type="submit" className="flex overflow-hidden flex-col justify-center w-full text-black whitespace-nowrap bg-slate-500 min-h-[40px] rounded-[100px] max-md:max-w-full">
        <div className="flex-1 gap-2 self-stretch px-6 py-2.5 size-full text-zinc-100 max-md:px-5 max-md:max-w-full">
          {text}
        </div>
      </button>
    </div>
  );
};

export default Button;