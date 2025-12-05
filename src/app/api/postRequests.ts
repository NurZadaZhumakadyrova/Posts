import baseURL from '@/app/api/baseURL.ts';
import type { ApiPost, IPost } from '@/types/postTypes.ts';

export const getAllPosts = async () => {
  const data = await baseURL.get<IPost[]>('/posts');
  return data.data || [];
};

export const getUserPosts = async (userId: number) => {
  const data = await baseURL.get<IPost[]>(`/users/${userId}/posts`);
  return data.data || [];
};

export const getOnePost = async (postId: number) => {
  const data = await baseURL.get<IPost>(`/posts/${postId}`);
  return data.data || null;
};

export const addNewPost = async (newPost: ApiPost) => {
  return await baseURL.post<ApiPost>('/posts', { ...newPost });
};

export const editPost = async (post: IPost) => {
  return await baseURL.put(`/posts/${post.id}`, { ...post });
};

export const deleteOnePost = async (postId: number) => {
  return await baseURL.delete(`/posts/${postId}`);
};
