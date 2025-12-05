import baseURL from '@/app/api/baseURL.ts';
import type { ApiPhoto, IPhoto } from '@/types/photoTypes.ts';

export const getOneAlbumPhotos = async (userId: number) => {
  const data = await baseURL.get<IPhoto[]>(`/albums/${userId}/photos`);
  return data.data || [];
};

export const getOnePhoto = async (photoId: number) => {
  const data = await baseURL.get<IPhoto>(`/photos/${photoId}`);
  return data.data || null;
};

export const addNewPhoto = async (newPhoto: ApiPhoto) => {
  return await baseURL.post<ApiPhoto>('/photos', { ...newPhoto });
};

export const editPhoto = async (photo: IPhoto) => {
  return await baseURL.put<IPhoto>(`/photos/${photo.id}`, { ...photo });
};

export const deleteOnePhoto = async (photoId: number) => {
  return await baseURL.delete<IPhoto>(`/photos/${photoId}`);
};