import React, { type PropsWithChildren } from 'react';
import Navbar from '@/components/navbar/navbar.tsx';
import Footer from '@/components/footer/footer.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-[1366px] mx-auto flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
