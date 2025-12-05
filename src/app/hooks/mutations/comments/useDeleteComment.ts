import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneComment } from '@/app/api/commentRequests.ts';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number)=> deleteOneComment(commentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};