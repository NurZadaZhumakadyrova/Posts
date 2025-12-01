import { createContext, useContext } from 'react';
import type { ApiPost, IPost } from '@/types/postTypes.ts';

interface PostsContextType {
  posts: IPost[];
  getPosts: () => Promise<void>;
  getPost: (id: number) => Promise<IPost | null>;
  getUserPosts: (userId: number) => Promise<IPost[]>;
  addPost: (newPost: ApiPost) => Promise<void>;
  updatePost: (id: number, post: ApiPost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  loading: boolean;
}

export const PostsContext = createContext<PostsContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePostContext must be used within PostsProvider!');
  }
  return context;
};
