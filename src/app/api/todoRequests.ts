import baseURL from '@/app/api/baseURL.ts';
import type { ApiTodo, ITodo } from '@/types/todoTypes.ts';

export const getAllTodos = async (userId: number) => {
  const data = await baseURL.get<ITodo[]>(`/users/${userId}/todos`);
  return data.data || [];
};

export const addNewTodo = async (newTodo: ApiTodo) => {
  return  await baseURL.post<ApiTodo>('/todos', { ...newTodo });
};

export const editTodo = async (todo: ITodo) => {
  return await baseURL.put(`/todos/${todo.id}`, { ...todo });
};

export const deleteOneTodo = async (todoId: number) => {
  return await baseURL.delete(`/todos/${todoId}`);
};
