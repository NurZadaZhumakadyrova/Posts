import { createFileRoute } from '@tanstack/react-router';
import UsersLayout from '@/components/layouts/usersLayout.tsx';

export const Route = createFileRoute('/users')({
  component: UsersLayout,
});


