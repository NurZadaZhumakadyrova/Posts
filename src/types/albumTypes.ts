export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export type ApiAlbum = Omit<IAlbum, 'id'>;

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

