import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiTodo } from '@/types/todoTypes.ts';
import { addNewTodo } from '@/app/api/todoRequests.ts';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTodo: ApiTodo) => addNewTodo({ ...newTodo }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
