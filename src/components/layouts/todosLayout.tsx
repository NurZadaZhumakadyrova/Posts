import TodoProvider from '@/providers/TodosProvider.tsx';
import UserTodos from '@/pages/userTodos.tsx';

const TodosLayout = () => {
  return (
    <TodoProvider>
      <UserTodos />
    </TodoProvider>
  );
};

export default TodosLayout;
