import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '@/components/userSidebar/userSidebar.tsx';

const User: React.FC = () => {
  return (
    <div className="flex flex-col [@media(min-width:730px)]:flex-row gap-3 [@media(min-width:730px)]:gap-4 w-full">
      <UserSidebar />
      <div className="flex-1 min-w-0">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 p-4 [@media(min-width:640px)]:p-6 shadow-xl w-full h-full min-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02]" />
          <div className="relative w-full h-full flex flex-col">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
