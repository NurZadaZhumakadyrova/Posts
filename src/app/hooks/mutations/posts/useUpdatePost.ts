import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IPost } from '@/types/postTypes.ts';
import { editPost } from '@/app/api/postRequests.ts';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IPost)=> editPost({ ... post }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      void queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    }
  });
};