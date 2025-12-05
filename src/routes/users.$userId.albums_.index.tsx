import { createFileRoute } from '@tanstack/react-router';
import UserAlbums from '@/pages/userAlbums.tsx';

export const Route = createFileRoute('/users/$userId/albums_/')({
  component: UserAlbums,
});