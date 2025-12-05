import { createFileRoute } from '@tanstack/react-router';
import UserPost from '@/pages/userPost.tsx';

export const Route = createFileRoute('/users/$userId/posts/$postId')({
  component: UserPost,
});