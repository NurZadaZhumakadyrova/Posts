import React, {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type {
  ApiComment,
  ApiPost,
  IAlbum,
  IComment,
  IPhoto,
  IPost,
  ITodo,
  IUser,
} from '@/types.ts';
import axiosAPI from '@/axiosAPI.ts';
import { PostsContext } from '@/useContext';

const PostsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const dataPosts = await axiosAPI.get<IPost[]>('/posts');
        const dataUsers = await axiosAPI.get<IUser[]>('/users');
        setPosts(dataPosts.data || []);
        setUsers(dataUsers.data || []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };

    void fetchPosts();
  }, []);

  const getPost = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<IPost>(`/posts/${id}`);
      setLoading(false);
      return data.data || null;
    } catch (e) {
      console.log(e);
      setLoading(false);
      return null;
    }
  }, []);

  const addPost = useCallback(async (newPost: ApiPost) => {
    setLoading(true);
    try {
      await axiosAPI.post<ApiPost>('/posts', { ...newPost });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (id: number, post: ApiPost) => {
    setLoading(true);
    try {
      await axiosAPI.put(`/posts/${id}`, { ...post });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const deletePost = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await axiosAPI.delete(`/posts/${id}`);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const getUserPosts = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<IPost[]>(`/users/${userId}/posts`);
      setLoading(false);
      return data.data || [];
    } catch (e) {
      setLoading(false);
      console.log(e);
      return [];
    }
  }, []);

  const getComments = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<IComment[]>(`/posts/${id}/comments`);
      setLoading(false);
      return data.data || [];
    } catch (e) {
      setLoading(false);
      console.log(e);
      return [];
    }
  }, []);

  const getUserTodos = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<ITodo[]>(`/users/${userId}/todos`);
      setLoading(false);
      return data.data || [];
    } catch (e) {
      setLoading(false);
      console.log(e);
      return [];
    }
  }, []);

  const getUserAlbums = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<IAlbum[]>(`/users/${userId}/albums`);
      setLoading(false);
      return data.data || [];
    } catch (e) {
      setLoading(false);
      console.log(e);
      return [];
    }
  }, []);

  const getUserPhotos = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const data = await axiosAPI.get<IPhoto[]>(`/albums/${userId}/photos`);
      setLoading(false);
      return data.data || [];
    } catch (e) {
      setLoading(false);
      console.log(e);
      return [];
    }
  }, []);

  const addComment = useCallback(
    async (postId: number, newComment: ApiComment) => {
      setLoading(true);
      try {
        await axiosAPI.post<ApiComment>(`/posts/${postId}/comments`, {
          ...newComment,
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    },
    [],
  );

  const updateComment = useCallback(async (comment: IComment) => {
    setLoading(true);
    try {
      await axiosAPI.put(`comments/${comment.id}`, { ...comment });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await axiosAPI.delete(`/comments/${id}`);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{
        users,
        posts,
        getUserPosts,
        getUserAlbums,
        getUserPhotos,
        getUserTodos,
        getPost,
        addPost,
        updatePost,
        deletePost,
        getComments,
        addComment,
        updateComment,
        deleteComment,
        loading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
