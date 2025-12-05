import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiAlbum } from '@/types/albumTypes.ts';
import { addNewAlbum } from '@/app/api/albumRequests.ts';

export const useAddAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAlbum: ApiAlbum) => addNewAlbum({ ...newAlbum }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
    },
  });
};
