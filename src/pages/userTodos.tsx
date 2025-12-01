import { Spinner } from '@/components/ui/spinner.tsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import UserTodoCard from '@/components/cards/userTodoCard.tsx';
import TodoForm from '@/components/forms/todoForm.tsx';
import AlertGlobal from '@/components/alert/alert.tsx';
import { SquarePlus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { useTodoContext } from '@/useContexts/useContextTodos.ts';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';
import type { ApiTodo, ITodo } from '@/types/todoTypes.ts';

const UserTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const [isAddTaskAlert, setIsAddTaskAlert] = useState(false);
  const [isDeleteTaskAlert, setIsDeleteTaskAlert] = useState(false);
  const [isEditTaskAlert, setIsEditTaskAlert] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { getUserTodos, loading, addTodo, deleteTodo, updateTodo } =
    useTodoContext();
  const { userId } = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      setInitialLoading(true);
      if (userId) {
        const data = await getUserTodos(Number(userId));
        setTodos(data);
      }
      setInitialLoading(false);
    };
    void fetchTodos();
  }, [getUserTodos, userId]);

  const todoFunction = async (newTask: ApiTodo) => {
    if (userId) {
      newTask.userId = Number(userId);
      await addTodo({ ...newTask });
      await getUserTodos(Number(userId));
      setIsAddTask(false);
      setTimeout(() => {
        setIsAddTaskAlert(true);
      }, 1000);
    }
  };

  useEffect(() => {
    const closeAlert = () => {
      if (isAddTaskAlert || isDeleteTaskAlert || isEditTaskAlert) {
        setTimeout(() => {
          setIsAddTaskAlert(false);
          setIsDeleteTaskAlert(false);
          setIsEditTaskAlert(false);
        }, 3000);
      }
    };
    void closeAlert();
  }, [isAddTaskAlert, isDeleteTaskAlert, isEditTaskAlert]);

  const deleteTheTodo = async (todoId: number) => {
    setDeletingTodoId(todoId);
    await deleteTodo(todoId);
    if (userId) {
      await getUserTodos(Number(userId));
    }
    setTimeout(() => {
      setIsDeleteTaskAlert(true);
      setDeletingTodoId(null);
    }, 1000);
  };

  const editTodo = async (todo: ITodo) => {
    await updateTodo({ ...todo });
    if (userId) {
      await getUserTodos(Number(userId));
    }
    setEditingTodoId(todo.id);
    setTimeout(() => {
      setEditingTodoId(null);
      setIsEditTaskAlert(true);
    }, 1000);
  };

  if (!loading && todos.length === 0) {
    return (
      <EmptyBlock
        title="No Todos"
        text="You're all caught up. New tasks will appear here."
        type="todo"
      />
    );
  }

  return (
    <>
      {isEditTaskAlert && <AlertGlobal type="editTask" />}
      {isDeleteTaskAlert && <AlertGlobal type="deleteTask" />}
      {isAddTaskAlert && <AlertGlobal type="addTask" />}
      {isAddTask && (
        <TodoForm
          openModal={isAddTask}
          todoFunction={todoFunction}
          onOpenChange={() => setIsAddTask(false)}
          loading={loading}
        />
      )}
      {initialLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white" />
          <p className="text-white/60">Loading user todos...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-5 flex items-center justify-between gap-2">
            <h3 className="text-white text-3xl font-light tracking-wide">
              My todos
            </h3>
            <div>
              <Button
                onClick={() => setIsAddTask(true)}
                variant="outline"
                className="bg-transparent text-white cursor-pointer [@media(max-width:480px)]:hidden"
              >
                Add new task
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsAddTask(true)}
                    variant="outline"
                    size="icon"
                    type="button"
                    className="[@media(min-width:481px)]:hidden size-9 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
                  >
                    <SquarePlus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="">
                  <p>Add new task</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {todos.map((todo) => (
            <UserTodoCard
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTheTodo}
              deleteLoading={deletingTodoId === todo.id}
              editTodo={editTodo}
              editLoading={editingTodoId === todo.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserTodos;
