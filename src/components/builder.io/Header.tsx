import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-7 justify-center items-center py-4 w-full text-3xl tracking-normal leading-none text-center text-black bg-slate-500 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/bdc401b369f649a1a90b125bd4b38b30/f48ad07e8e69546b4598dab8b144cba1ffac330849bb5491a1849f69a071e384?apiKey=bdc401b369f649a1a90b125bd4b38b30&"
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px]"
        alt="Parrot Wings logo"
      />
      <div className="self-stretch my-auto text-zinc-100">Parrot Wings</div>
    </header>
  );
};

export default Header;