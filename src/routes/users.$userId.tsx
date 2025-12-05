import { createFileRoute } from '@tanstack/react-router';
import UserLayout from '@/components/layouts/userLayout.tsx';

export const Route = createFileRoute('/users/$userId')({
  component: UserLayout,
});