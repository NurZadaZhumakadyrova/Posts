import baseURL from '@/api/baseURL.ts';
import type { ApiTodo, ITodo } from '@/types/todoTypes.ts';

export const getAllTodos = async (userId: number) => {
  try {
    return (await baseURL.get<ITodo[]>(`/users/${userId}/todos`)) || [];
  } catch (e) {
    console.log(e);
  }
};

export const addNewTodo = async (newTodo: ApiTodo) => {
  try {
    await baseURL.post<ApiTodo>('/todos', {
      ...newTodo,
    });
  } catch (e) {
    console.log(e);
  }
};

export const editTodo = async (todo: ITodo) => {
  try {
    await baseURL.put(`/todos/${todo.id}`, { ...todo });
  } catch (e) {
    console.log(e);
  }
};

export const deleteOneTodo = async (todoId: number) => {
  try {
    await baseURL.delete(`/todos/${todoId}`);
  } catch (e) {
    console.log(e);
  }
};
