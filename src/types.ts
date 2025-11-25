export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type ApiPost = Omit<IPost, 'id'>;

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type ApiComment = Omit<IComment, 'id'>;

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type ApiTodo = Omit<ITodo, 'id'>;

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
