import { useQuery } from '@tanstack/react-query';
import { getAllTodos } from '@/app/api/todoRequests.ts';

export const useTodos = (userId: number) => {
  return useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getAllTodos(userId),
  });
};