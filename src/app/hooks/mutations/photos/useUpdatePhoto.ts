import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IPhoto } from '@/types/photoTypes.ts';
import { editPhoto } from '@/app/api/photoRequests.ts';

export const useUpdatePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (photo: IPhoto) => editPhoto({ ...photo }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
};
