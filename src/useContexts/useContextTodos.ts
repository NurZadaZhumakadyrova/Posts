import { createContext, useContext } from 'react';
import type { ApiTodo, ITodo } from '@/types/todoTypes.ts';

interface PostsContextType {
  getUserTodos: (userId: number) => Promise<ITodo[]>;
  addTodo: (todo: ApiTodo) => Promise<void>;
  updateTodo: (todo: ITodo) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  loading: boolean;
}

export const TodoContext = createContext<PostsContextType | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodosProvider!');
  }
  return context;
};
