import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiPhoto } from '@/types/photoTypes.ts';
import { addNewPhoto } from '@/app/api/photoRequests.ts';

export const useAddPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPhoto: ApiPhoto) => addNewPhoto({ ...newPhoto }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
};
