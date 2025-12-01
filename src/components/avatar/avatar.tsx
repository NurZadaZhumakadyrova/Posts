import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import React from 'react';
import { getColor } from '@/utils/getColor.ts';
import { getInitials } from '@/utils/getUserInitials.ts';
import type { IUser } from '@/types/userTypes.ts';

interface Props {
  user: IUser;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: boolean;
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

const UserAvatar: React.FC<Props> = ({
  user,
  size = 'lg',
  className,
  text,
}) => {
  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src="" alt={user.name} />
      <AvatarFallback
        className={`text-white font-semibold ${text ? 'text-3xl' : textSizeClasses[size]} bg-gradient-to-br ${getColor(user.email)}`}
      >
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
