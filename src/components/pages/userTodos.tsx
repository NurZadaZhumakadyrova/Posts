import { Spinner } from '@/components/ui/spinner.tsx';
import { usePosts } from '@/useContext';
import { useEffect, useState } from 'react';
import type { ITodo } from '@/types.ts';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import UserTodoCard from '@/components/carts/userTodoCard.tsx';

const UserTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { getUserTodos, loading } = usePosts();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodos = async () => {
      if (id) {
        const data = await getUserTodos(Number(id));
        setTodos(data);
      }
    };
    void fetchTodos();
  }, [getUserTodos, id]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white" />
          <p className="text-white/60">Loading user todos...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-5 flex items-center justify-between">
            <h3 className=" text-white text-3xl font-light tracking-wide">
              My todos
            </h3>
            <Button
              // onClick={() => setIsModal(true)}
              variant="outline"
              className="bg-transparent text-white cursor-pointer ml-2"
            >
              Add new todo
            </Button>
          </div>
          {todos.length === 0 ? (
            <p className="text-white/60 text-center py-8">No todos found</p>
          ) : (
            todos.map((todo) => <UserTodoCard key={todo.id} todo={todo} />)
          )}
        </div>
      )}
    </>
  );
};

export default UserTodos;
