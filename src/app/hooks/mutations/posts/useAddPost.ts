import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewPost } from '@/app/api/postRequests.ts';
import type { ApiPost } from '@/types/postTypes.ts';

export const useAddNewPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: ApiPost) => addNewPost({ ...newPost }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      void queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });
};
