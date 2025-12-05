import baseURL from '@/app/api/baseURL.ts';
import type { ApiAlbum, IAlbum } from '@/types/albumTypes.ts';

export const getAllAlbums = async (userId: number) => {
  const data = await baseURL.get<IAlbum[]>(`/users/${userId}/albums`);
  return data.data || [];
};

export const getOneAlbum = async (albumId: number) => {
  const data = await baseURL.get<IAlbum>(`/albums/${albumId}`);
  return data.data || null;
};

export const addNewAlbum = async (newAlbum: ApiAlbum) => {
  return await baseURL.post<ApiAlbum>('/albums', { ...newAlbum });
};

export const editAlbum = async (album: IAlbum) => {
  return await baseURL.put<IAlbum>(`/albums/${album.id}`, { ...album });
};

export const deleteOneAlbum = async (albumId: number) => {
  return await baseURL.delete<IAlbum>(`/albums/${albumId}`);
};