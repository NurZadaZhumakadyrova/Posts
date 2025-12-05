import { createFileRoute } from '@tanstack/react-router';
import AllPosts from '@/pages/allPosts';

export const Route = createFileRoute( '/')({
  component : AllPosts,
});