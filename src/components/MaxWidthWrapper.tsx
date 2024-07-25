import React, { ReactNode } from 'react';

type MaxWidthWrapperProps = {
  className?: string;
  children: ReactNode;
};

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;