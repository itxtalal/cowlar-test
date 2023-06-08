import React from 'react';
import Footer from '../components/Footer';

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-bridge bg-cover bg-fixed brightness-50"></div>
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
};

export default RootLayout;
