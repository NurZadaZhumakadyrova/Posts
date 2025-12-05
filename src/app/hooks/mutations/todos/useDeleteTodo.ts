import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneTodo } from '@/app/api/todoRequests.ts';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todoId: number) => deleteOneTodo(todoId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
