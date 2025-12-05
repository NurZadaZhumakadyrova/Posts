import baseURL from '@/app/api/baseURL.ts';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';

export const getAllComments = async (postId: number) => {
  const data =  await baseURL.get<IComment[]>(`/posts/${postId}/comments`);
  return data.data || [];
};

export const addNewComment = async (newComment: ApiComment) => {
  return  await baseURL.post<ApiComment>('/comments', { ...newComment });
};

export const editComment = async (comment: IComment) => {
  return await baseURL.put(`comments/${comment.id}`, { ...comment });
};

export const deleteOneComment = async (commentId: number) => {
  return await baseURL.delete(`/comments/${commentId}`);
};
