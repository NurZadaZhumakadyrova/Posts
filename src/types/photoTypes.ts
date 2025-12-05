export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type ApiPhoto = Omit<IPhoto, 'id'>;