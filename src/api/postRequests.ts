import baseURL from '@/api/baseURL.ts';
import type { ApiPost, IPost } from '@/types/postTypes.ts';

export const getAllPosts = async () => {
  try {
    return (await baseURL.get<IPost[]>('/posts')) || [];
  } catch (e) {
    console.log(e);
  }
};

export const getOneUserPosts = async (userId: number) => {
  try {
    return (await baseURL.get<IPost[]>(`/users/${userId}/posts`)) || [];
  } catch (e) {
    console.log(e);
  }
};

export const getOnePost = async (id: number) => {
  try {
    return (await baseURL.get<IPost | null>(`/posts/${id}`)) || null;
  } catch (e) {
    console.log(e);
  }
};

export const addNewPost = async (newPost: ApiPost) => {
  try {
    await baseURL.post<ApiPost>('/posts', { ...newPost });
  } catch (e) {
    console.log(e);
  }
};

export const editPost = async (id: number, post: ApiPost) => {
  try {
    await baseURL.put(`/posts/${id}`, { ...post });
  } catch (e) {
    console.log(e);
  }
};

export const deleteOnePost = async (id: number) => {
  try {
    await baseURL.delete(`/posts/${id}`);
  } catch (e) {
    console.log(e);
  }
};
