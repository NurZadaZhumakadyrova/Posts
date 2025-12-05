import { useQuery } from '@tanstack/react-query';
import { getOneAlbumPhotos } from '@/app/api/photoRequests.ts';

export const usePhotos = (albumId: number) => {
  return useQuery({
    queryKey: ['photos', albumId],
    queryFn: () => getOneAlbumPhotos(albumId),
  });
};