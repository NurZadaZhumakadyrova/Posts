import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ITodo } from '@/types/todoTypes.ts';
import { editTodo } from '@/app/api/todoRequests.ts';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: ITodo) => editTodo({ ...todo }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
