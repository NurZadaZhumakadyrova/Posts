import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import type { IUser } from '@/types/userTypes.ts';

interface Props {
  user: IUser;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const MainAvatar: React.FC<Props> = ({ user, size = 'md', className }) => {
  return (
    <Avatar className={`${sizeClasses[size]} ${className} cursor-pointer`}>
      <AvatarImage
        src="https://img.icons8.com/3d-fluent/100/user-2.png"
        alt={user.name}
      />
      <AvatarFallback
        className={`text-white font-semibold ${textSizeClasses[size]}`}
      >
        {user.name}
      </AvatarFallback>
    </Avatar>
  );
};

export default MainAvatar;
