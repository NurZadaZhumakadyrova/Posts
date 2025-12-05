import { useQuery } from '@tanstack/react-query';
import { getOneAlbum } from '@/app/api/albumRequests.ts';

export const useAlbum = (albumId: number) => {
  return useQuery({
    queryKey: ['album', albumId],
    queryFn: () => getOneAlbum(albumId),
  });
};