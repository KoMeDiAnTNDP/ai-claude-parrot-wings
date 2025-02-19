import React from 'react';

interface LoginLinkProps {
  onClick: () => void;
}

const LoginLink: React.FC<LoginLinkProps> = ({ onClick }) => {
  return (
    <div className="flex overflow-hidden flex-col justify-center self-center mt-5 max-w-full text-primary min-h-[40px] rounded-[100px]">
      <button
        type="button"
        onClick={onClick}
        className="flex-1 gap-2 self-stretch px-3 py-2.5 size-full text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Already have an account?
      </button>
    </div>
  );
};

export default LoginLink;