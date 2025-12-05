import { useQuery } from '@tanstack/react-query';
import { getAllAlbums } from '@/app/api/albumRequests.ts';

export const useAlbums = (userId: number) => {
  return useQuery({
    queryKey: ['albums', userId],
    queryFn: () => getAllAlbums(userId),
  });
};