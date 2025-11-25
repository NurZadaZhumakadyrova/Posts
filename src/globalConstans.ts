import type { IPost, IUser } from '@/types.ts';

export const getAuthorName = (users: IUser[], post: IPost) => {
  const user = users.find((person) => person.id === post.userId);
  return user?.name || 'Anonymous';
};

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getAvatarColor = (email: string) => {
  const colors = [
    'from-blue-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-rose-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-cyan-500',
  ];
  const index = email.charCodeAt(0) % colors.length;
  return colors[index];
};
