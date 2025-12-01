import React, { type PropsWithChildren, useCallback, useEffect, useState, } from 'react';
import { PostsContext } from '@/useContexts/useContextPosts.ts';
import { addNewPost, deleteOnePost, editPost, getAllPosts, getOnePost, getOneUserPosts, } from '@/api/postRequests.ts';
import type { ApiPost, IPost } from '@/types/postTypes.ts';

const PostsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const data = await getAllPosts();
      if (data) setPosts(data.data);
      setLoading(false);
    };
    void getPosts();
  }, []);

  const getPosts = useCallback(async () => {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data ? data.data : []);
    setLoading(false);
  }, []);

  const getPost = useCallback(async (id: number) => {
    setLoading(true);
    const data = await getOnePost(id);
    setLoading(false);
    return data ? data.data : null;
  }, []);

  const addPost = useCallback(async (newPost: ApiPost) => {
    setLoading(true);
    await addNewPost({ ...newPost });
    setLoading(false);
  }, []);

  const updatePost = useCallback(async (id: number, post: ApiPost) => {
    setLoading(true);
    await editPost(id, { ...post });
    setLoading(false);
  }, []);

  const deletePost = useCallback(async (id: number) => {
    setLoading(true);
    await deleteOnePost(id);
    setLoading(false);
  }, []);

  const getUserPosts = useCallback(async (userId: number) => {
    setLoading(true);
    const data = await getOneUserPosts(userId);
    setLoading(false);
    return data ? data.data : [];
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        getPosts,
        getUserPosts,
        getPost,
        addPost,
        updatePost,
        deletePost,
        loading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
