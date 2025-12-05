import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IComment } from '@/types/commentTypes.ts';
import { editComment } from '@/app/api/commentRequests.ts';

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: IComment)=> editComment({ ... comment }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};