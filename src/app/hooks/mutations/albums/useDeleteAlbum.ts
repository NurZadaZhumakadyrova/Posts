import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOneAlbum } from '@/app/api/albumRequests.ts';

export const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (albumId: number) => deleteOneAlbum(albumId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['albums'] });
    },
  });
};
