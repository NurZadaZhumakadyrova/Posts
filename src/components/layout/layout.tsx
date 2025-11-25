import React, { type PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="max-w-[1366px] mx-auto flex-1 w-full">{children}</main>
  );
};

export default Layout;
