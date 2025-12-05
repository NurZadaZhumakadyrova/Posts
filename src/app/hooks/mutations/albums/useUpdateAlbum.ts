import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IAlbum } from '@/types/albumTypes.ts';
import { editAlbum } from '@/app/api/albumRequests.ts';

export const useUpdateAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (album: IAlbum) => editAlbum({ ...album }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
    },
  });
};
