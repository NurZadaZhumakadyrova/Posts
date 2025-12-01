import React from 'react';
import { Outlet } from 'react-router-dom';

const UsersLayout: React.FC = () => {
  return (
    <section className="min-h-screen pt-4 pb-8 px-4 [@media(min-width:640px)]:pt-8 [@media(min-width:640px)]:pb-16 [@media(min-width:640px)]:px-8 w-full">
      <Outlet />
    </section>
  );
};

export default UsersLayout;
