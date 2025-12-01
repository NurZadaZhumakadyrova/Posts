import React, { type PropsWithChildren, useCallback, useState } from 'react';
import { AlbumsContext } from '@/useContexts/useContextAlbums.ts';
import {
  getAllAlbums,
  getOneAlbumPhotos,
  getOneUserAlbum,
} from '@/api/albumRequests.ts';

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

  return (
    <AlbumsContext.Provider
      value={{
        getUserAlbums,
        getUserAlbum,
        getAlbumPhotos,
        loading,
      }}
    >
      {children}
    </AlbumsContext.Provider>
  );
};

export default AlbumsProvider;
