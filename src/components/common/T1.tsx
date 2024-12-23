import React, {ReactNode} from 'react';

interface T1Props{
  children: ReactNode;
  align:'left'|'center';
  className?:string;
}

const T1: React.FC<T1Props> = ({children, align, className}) => {
  const alignment = `text-${align}`;
  return (
    <div>
        <h2 className={`font-extrabold text-[2.75vw] ${alignment} mt-16 mb-12 ${className} sm:text-4xl`}>
            {children}
        </h2>
    </div>
  );
};

export default T1;