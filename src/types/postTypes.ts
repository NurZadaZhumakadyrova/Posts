export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type ApiPost = Omit<IPost, 'id'>;
