import React from 'react';

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-bridge min-h-screen bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-75" />
      <div className="brightness-100">{children}</div>
    </div>
  );
};

export default RootLayout;
