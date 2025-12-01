import React, { type PropsWithChildren, useCallback, useState } from 'react';
import { TodoContext } from '@/useContexts/useContextTodos.ts';
import {
  addNewTodo,
  deleteOneTodo,
  editTodo,
  getAllTodos,
} from '@/api/todoRequests.ts';
import type { ApiTodo, ITodo } from '@/types/todoTypes.ts';

const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getUserTodos = useCallback(async (userId: number) => {
    setLoading(true);
    const data = await getAllTodos(userId);
    setLoading(false);
    return data ? data.data : [];
  }, []);

  const addTodo = useCallback(async (newTodo: ApiTodo) => {
    setLoading(true);
    await addNewTodo({ ...newTodo });
    setLoading(false);
  }, []);

  const updateTodo = useCallback(async (todo: ITodo) => {
    setLoading(true);
    await editTodo({ ...todo });
    setLoading(false);
  }, []);

  const deleteTodo = useCallback(async (todoId: number) => {
    setLoading(true);
    await deleteOneTodo(todoId);
    setLoading(false);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        getUserTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        loading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
