import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { Mail, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import EditCommentForm from '@/components/forms/editCommentForm.tsx';
import type { IComment } from '@/types/commentTypes.ts';
import { getColor, getInitials } from '@/utils';

interface Props {
  comment: IComment;
  index: number;
  editCommentPost: (editCommit: IComment) => void;
  isEditLoading: boolean;
  userPost: boolean;
}

const CommentCard: React.FC<Props> = ({
  comment,
  index,
  editCommentPost,
  isEditLoading,
  userPost,
}) => {
  const [isEditComment, setIsEditComment] = useState<boolean>(false);

  useEffect(() => {
    const closeForm = () => {
      if (isEditLoading) {
        setTimeout(() => {
          setIsEditComment(false);
        }, 1000);
      }
    };
    void closeForm();
  }, [isEditLoading]);

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
      style={{
        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${getColor(comment.email).replace('from-', '#').replace(' to-', ', #')})`,
                filter: 'blur(8px)',
              }}
            />
            <Avatar
              className={`size-10 border-2 border-white/20 bg-gradient-to-br ${getColor(comment.email)} relative`}
            >
              <AvatarFallback className="text-white font-semibold bg-transparent text-sm">
                {getInitials(comment.email)}
              </AvatarFallback>
            </Avatar>
          </div>
          {(isEditComment) ? (
            <EditCommentForm
              closeEditForm={() => setIsEditComment(false)}
              comment={comment}
              isEditLoading={isEditLoading}
              editCommentPost={editCommentPost}
            />
          ) : (
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h4 className="hyphens-auto pr-6 text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                    {comment.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="size-3 text-white/40" />
                    <span className="text-xs text-white/50 truncate">
                      {comment.email}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-white/80 group-hover:text-white/90 leading-relaxed mt-2 text-sm transition-colors">
                {comment.body}
              </p>
            </div>
          )}
        </div>
        {userPost ? null :
          <Button
            onClick={() => setIsEditComment(true)}
            variant="outline"
            size="icon"
            type="button"
            className={`absolute top-2 right-2 size-7 rounded-full border-none bg-white/5 hover:bg-white-500/20 text-white/50 hover:text-white-400 transition-all opacity-0 group-hover:opacity-100 ${isEditComment ? 'hidden' : ''}`}
          >
            <Pencil className="size-3.5" />
          </Button> 
        }
      </div>
    </div>
  );
};

export default CommentCard;
