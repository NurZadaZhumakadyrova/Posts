export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export type ApiAlbum = Omit<IAlbum, 'id'>;

