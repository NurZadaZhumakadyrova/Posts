import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/app/api/postRequests.ts';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
  });
};