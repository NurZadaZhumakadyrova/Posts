import React, { type PropsWithChildren, useCallback, useState } from 'react';
import { AlbumsContext } from '@/useContexts/useContextAlbums.ts';
import {
  addNewAlbum,
  deleteOneAlbum,
  editAlbum,
  getAllAlbums,
  getOneAlbumPhotos,
  getOneUserAlbum,
} from '@/api/albumRequests.ts';
import type { ApiAlbum, IAlbum } from '@/types/albumTypes.ts';

const AlbumsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getUserAlbums = useCallback(async (userId: number) => {
    setLoading(true);
    const data = await getAllAlbums(userId);
    setLoading(false);
    return data ? data.data : [];
  }, []);

  const getUserAlbum = useCallback(async (albumId: number) => {
    setLoading(true);
    const data = await getOneUserAlbum(albumId);
    setLoading(false);
    return data ? data.data : null;
  }, []);

  const getAlbumPhotos = useCallback(async (userId: number) => {
    setLoading(true);
    const data = await getOneAlbumPhotos(userId);
    setLoading(false);
    return data ? data.data : [];
  }, []);

  const addAlbum = useCallback(async (newAlbum: ApiAlbum) => {
    setLoading(true);
    await addNewAlbum({ ...newAlbum });
    setLoading(false);
  }, []);

  const updateAlbum = useCallback(async (album: IAlbum) => {
    setLoading(true);
    await editAlbum({ ...album });
    setLoading(false);
  }, []);

  const deleteAlbum = useCallback(async (albumId: number) => {
    setLoading(true);
    await deleteOneAlbum(albumId);
    setLoading(false);
  }, []);

  return (
    <AlbumsContext.Provider
      value={{
        getUserAlbums,
        getUserAlbum,
        getAlbumPhotos,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        loading,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
};

export default AlbumsProvider;
