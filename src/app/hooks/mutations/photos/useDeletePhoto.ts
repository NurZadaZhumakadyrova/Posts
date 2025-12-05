import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOnePhoto } from '@/app/api/photoRequests.ts';

export const useDeletePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photoId: number) => deleteOnePhoto(photoId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
};
