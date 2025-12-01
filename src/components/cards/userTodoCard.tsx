import React, { useState } from 'react';
import { CheckCircle2, Circle, Pencil, SendHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useTodoContext } from '@/useContexts/useContextTodos.ts';
import { useParams } from 'react-router-dom';
import type { ITodo } from '@/types/todoTypes.ts';

interface Props {
  todo: ITodo;
  deleteTodo: (todoId: number) => void;
  deleteLoading: boolean;
  editTodo: (todo: ITodo) => void;
  editLoading: boolean;
}

const UserTodoCard: React.FC<Props> = ({
  todo,
  deleteTodo,
  deleteLoading,
  editTodo,
  editLoading,
}) => {
  const [formData, setFormData] = useState<ITodo>(todo);
  const [edit, setEdit] = useState<boolean>(false);
  const { updateTodo, getUserTodos } = useTodoContext();
  const { userId } = useParams();

  const changeTaskCompleted = async (todo: ITodo) => {
    todo.completed = !todo.completed;
    await updateTodo({ ...todo });
    if (userId) {
      await getUserTodos(Number(userId));
    }
  };

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(formData);
    setTimeout(() => {
      setEdit(false);
      setFormData({
        title: '',
        completed: todo.completed,
        id: todo.id,
        userId: todo.userId,
      });
    }, 1500);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 p-3 transition-all duration-300">
      <div
        className={`absolute inset-0 transition-all duration-300 pointer-events-none ${
          todo.completed
            ? 'bg-gradient-to-br from-green-500/[0.05] via-teal-500/[0.05] to-green-500/[0.05]'
            : 'bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/[0.03] group-hover:via-purple-500/[0.03] group-hover:to-pink-500/[0.03]'
        }`}
      />

      {edit ? (
        <form
          onSubmit={handelSubmit}
          className="relative flex items-center justify-between gap-3"
        >
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handelChange}
            placeholder="Enter an engaging title..."
            required
            className="w-[90%] bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
          />
          <div className="ml-2 flex">
            <Button
              disabled={editLoading}
              variant="outline"
              size="icon"
              type="submit"
              className="size-7 mr-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              {editLoading ? (
                <Spinner className="size-4" />
              ) : (
                <SendHorizontal className="size-4" />
              )}
            </Button>
            <Button
              onClick={() => setEdit(false)}
              variant="outline"
              size="icon"
              type="button"
              className="size-7 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              <X className="size-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="relative flex items-center justify-between gap-3">
          <div className="shrink-0 mt-0.5">
            {todo.completed ? (
              <CheckCircle2
                onClick={() => changeTaskCompleted(todo)}
                className="size-5 text-green-400"
                strokeWidth={2.5}
              />
            ) : (
              <Circle
                onClick={() => changeTaskCompleted(todo)}
                className="size-5 text-white/30 group-hover:text-purple-400 transition-colors"
                strokeWidth={2}
              />
            )}
          </div>
          <p
            className={`flex-1 transition-all ${
              todo.completed
                ? 'line-through text-white/60'
                : 'text-white/90 group-hover:text-white'
            }`}
          >
            {todo.title}
          </p>
          <div className="opacity-0 group-hover:opacity-100 ml-1">
            <Button
              onClick={() => setEdit(true)}
              variant="outline"
              size="icon"
              type="button"
              className="size-7 mr-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              onClick={() => deleteTodo(todo.id)}
              disabled={deleteLoading}
              variant="outline"
              size="icon"
              type="button"
              className="size-7 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              {deleteLoading ? (
                <Spinner className="size-4" />
              ) : (
                <X className="size-4" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTodoCard;
