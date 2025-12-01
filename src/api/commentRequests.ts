import baseURL from '@/api/baseURL.ts';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';

export const getAllComments = async (postId: number) => {
  try {
    return (await baseURL.get<IComment[]>(`/posts/${postId}/comments`)) || [];
  } catch (e) {
    console.log(e);
  }
};

export const addNewComment = async (postId: number, newComment: ApiComment) => {
  try {
    await baseURL.post<ApiComment>(`/posts/${postId}/comments`, {
      ...newComment,
    });
  } catch (e) {
    console.log(e);
  }
};

export const editComment = async (comment: IComment) => {
  try {
    await baseURL.put(`comments/${comment.id}`, { ...comment });
  } catch (e) {
    console.log(e);
  }
};

export const deleteOneComment = async (commentId: number) => {
  try {
    await baseURL.delete(`/comments/${commentId}`);
  } catch (e) {
    console.log(e);
  }
};
