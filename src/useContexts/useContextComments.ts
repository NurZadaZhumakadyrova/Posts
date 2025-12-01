import { createContext, useContext } from 'react';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';

interface CommentsContextType {
  getComments: (idPost: number) => Promise<IComment[]>;
  addComment: (idPost: number, newComment: ApiComment) => Promise<void>;
  updateComment: (comment: IComment) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
  loading: boolean;
}

export const CommentsContext = createContext<CommentsContextType | null>(null);

export const useCommentContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useCommentsContext must be used within CommentsProvider!');
  }
  return context;
};
