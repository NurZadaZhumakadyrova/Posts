import { createFileRoute } from '@tanstack/react-router';
import AllUsers from '@/pages/allUsers.tsx';

export const Route = createFileRoute('/users/')({
  component: AllUsers,
});
