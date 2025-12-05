import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiComment } from '@/types/commentTypes.ts';
import { addNewComment } from '@/app/api/commentRequests.ts';

export const useAddNewComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment: ApiComment)=> addNewComment({ ... newComment }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};