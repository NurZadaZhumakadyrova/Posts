import { createFileRoute } from '@tanstack/react-router';
import UserAlbumPhotos from '@/pages/userAlbumPhotos.tsx';

export const Route = createFileRoute('/users/$userId/albums/$albumId')({
  component: UserAlbumPhotos,
});
