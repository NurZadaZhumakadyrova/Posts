import React, { type PropsWithChildren, useCallback, useState } from 'react';
import { CommentsContext } from '@/useContexts/useContextComments.ts';
import {
  addNewComment,
  deleteOneComment,
  editComment,
  getAllComments,
} from '@/api/commentRequests.ts';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';

const CommentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getComments = useCallback(async (postId: number) => {
    setLoading(true);
    const data = await getAllComments(postId);
    setLoading(false);
    return data ? data.data : [];
  }, []);

  const addComment = useCallback(
    async (postId: number, newComment: ApiComment) => {
      setLoading(true);
      await addNewComment(postId, { ...newComment });
      setLoading(false);
    },
    [],
  );

  const updateComment = useCallback(async (comment: IComment) => {
    setLoading(true);
    await editComment({ ...comment });
    setLoading(false);
  }, []);

  const deleteComment = useCallback(async (commentId: number) => {
    setLoading(true);
    await deleteOneComment(commentId);
    setLoading(false);
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        getComments,
        addComment,
        updateComment,
        deleteComment,
        loading,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
