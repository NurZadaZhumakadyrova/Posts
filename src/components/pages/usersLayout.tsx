import React from 'react';
import { Outlet } from 'react-router-dom';

const UsersLayout: React.FC = () => {
  return (
    <section className="min-h-screen pt-8 pb-16 px-8 [@media(min-width:600px)]:px-4 md:px-8 w-full">
      <Outlet />
    </section>
  );
};

export default UsersLayout;
