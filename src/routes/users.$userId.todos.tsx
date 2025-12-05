import { createFileRoute } from '@tanstack/react-router';
import UserTodos from '@/pages/userTodos.tsx';

export const Route = createFileRoute('/users/$userId/todos')({
  component: UserTodos,
});
