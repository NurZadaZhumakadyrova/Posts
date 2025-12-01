import baseURL from '@/api/baseURL.ts';
import type { IAlbum, IPhoto } from '@/types/albumTypes.ts';

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
