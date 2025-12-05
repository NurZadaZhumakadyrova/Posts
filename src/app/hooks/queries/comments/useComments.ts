import { useQuery } from '@tanstack/react-query';
import { getAllComments } from '@/app/api/commentRequests.ts';

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getAllComments(postId),
  });
};