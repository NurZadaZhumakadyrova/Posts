import { useQuery } from '@tanstack/react-query';
import { getOnePost } from '@/app/api/postRequests.ts';

export const useOnePost = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getOnePost(postId),
  });
};