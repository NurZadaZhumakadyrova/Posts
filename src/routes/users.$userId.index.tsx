import { createFileRoute } from '@tanstack/react-router';
import UserPosts from '@/pages/userPosts.tsx';

export const Route = createFileRoute('/users/$userId/')({
  component: UserPosts,
});
