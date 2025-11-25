import { createContext, useContext } from 'react';
import type {
  ApiComment,
  ApiPost, ApiTodo,
  IAlbum,
  IComment,
  IPhoto,
  IPost,
  ITodo,
  IUser,
} from '@/types.ts';

interface PostsContextType {
  users: IUser[];
  posts: IPost[];
  getPost: (id: number) => Promise<IPost | null>;
  getUserPosts: (userId: number) => Promise<IPost[]>;
  addPost: (newPost: ApiPost) => Promise<void>;
  updatePost: (id: number, post: ApiPost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  getComments: (id: number) => Promise<IComment[]>;
  addComment: (idPost: number, newComment: ApiComment) => Promise<void>;
  updateComment: (comment: IComment) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  getUserAlbums: (userId: number) => Promise<IAlbum[]>;
  getUserPhotos: (userId: number) => Promise<IPhoto[]>;
  getUserTodos: (userId: number) => Promise<ITodo[]>;
  addTodo: (todo:ApiTodo) => Promise<void>;
  updateTodo: (todo:ITodo) => Promise<void>;
  deleteTodo: (todoId: number) => Promise<void>;
  loading: boolean;
}

export const PostsContext = createContext<PostsContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within PostsProvider!');
  }
  return context;
};
