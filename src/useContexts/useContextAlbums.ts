import { createContext, useContext } from 'react';
import type { IAlbum, IPhoto } from '@/types/albumTypes.ts';

interface PostsContextType {
  getUserAlbums: (userId: number) => Promise<IAlbum[]>;
  getUserAlbum: (albumId: number) => Promise<IAlbum | null>;
  getAlbumPhotos: (userId: number) => Promise<IPhoto[]>;
  loading: boolean;
}

export const AlbumsContext = createContext<PostsContextType | null>(null);

export const useAlbumContext = () => {
  const context = useContext(AlbumsContext);
  if (!context) {
    throw new Error('useAlbumContext must be used within AlbumsProvider!');
  }
  return context;
};
