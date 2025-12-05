import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '@/app/api/postRequests.ts';

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId),
  });
};