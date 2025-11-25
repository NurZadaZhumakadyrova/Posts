import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { IUser } from '@/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserAvatarProps {
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

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getBackgroundColor = (name: string): string => {
  const colors = [
    'bg-gray-900',
    'bg-gray-800',
    'bg-gray-700',
    'bg-slate-900',
    'bg-slate-800',
    'bg-zinc-900',
    'bg-neutral-900',
    'bg-black',
  ];

  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  className,
}) => {
  const initialsName = getInitials(user.name);
  const bgColor = getBackgroundColor(user.name);
  const navigate = useNavigate();

  return (
    <Avatar
      className={`${sizeClasses[size]} ${className}`}
      onClick={() => navigate(`/users/${user.id}`)}
    >
      <AvatarImage
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=1f2937,374151,4b5563&textColor=ffffff`}
        alt={user.name}
      />
      <AvatarFallback
        className={`${bgColor} text-white font-semibold ${textSizeClasses[size]}`}
      >
        {initialsName}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
