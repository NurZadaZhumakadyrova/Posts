import baseURL from '@/api/baseURL.ts';
import type { ApiAlbum, IAlbum, IPhoto } from '@/types/albumTypes.ts';

export const getAllAlbums = async (userId: number) => {
  try {
    return (await baseURL.get<IAlbum[]>(`/users/${userId}/albums`)) || [];
  } catch (e) {
    console.log(e);
  }
};

export const getOneUserAlbum = async (albumId: number) => {
  try {
    return (await baseURL.get<IAlbum>(`/albums/${albumId}`)) || null;
  } catch (e) {
    console.log(e);
  }
};

export const getOneAlbumPhotos = async (userId: number) => {
  try {
    return (await baseURL.get<IPhoto[]>(`/albums/${userId}/photos`)) || [];
  } catch (e) {
    console.log(e);
  }
};

export const addNewAlbum = async (newAlbum: ApiAlbum) => {
  try {
    return (await baseURL.post<ApiAlbum>('/albums', { ...newAlbum }));
  } catch (e) {
    console.log(e);
  }
};

export const editAlbum = async (album: IAlbum) => {
  try {
    return (await baseURL.put<IAlbum>(`/albums/${album.id}`, { ...album }));
  } catch (e) {
    console.log(e);
  }
};

export const deleteOneAlbum = async (albumId: number) => {
  try {
    return (await baseURL.delete<IAlbum>(`/albums/${albumId}`));
  } catch (e) {
    console.log(e);
  }
};