import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOnePost } from '@/app/api/postRequests.ts';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number)=> deleteOnePost(postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      void queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    }
  });
};