import React from 'react';
import type { IComment } from '@/types.ts';
import { Mail, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { getAvatarColor, getInitials } from '@/globalConstans.ts';
import { Spinner } from '@/components/ui/spinner.tsx';

interface Props {
  comment: IComment;
  deleteComment: (id: number) => void;
  isDeleteCommentLoading: boolean;
}

const UserPostCommentCard: React.FC<Props> = ({
  comment,
  deleteComment,
  isDeleteCommentLoading,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 p-4 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/[0.03] group-hover:via-pink-500/[0.03] group-hover:to-purple-500/[0.03] transition-all duration-300 pointer-events-none" />
      <div className="relative flex gap-4">
        <div className="relative flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${getAvatarColor(comment.email).replace('from-', '#').replace(' to-', ', #')})`,
              filter: 'blur(8px)',
            }}
          />
          <Avatar
            className={`size-10 border-2 border-white/20 bg-gradient-to-br ${getAvatarColor(comment.email)} relative`}
          >
            <AvatarFallback className="text-white font-semibold bg-transparent text-sm">
              {getInitials(comment.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="hyphens-auto pr-6 text-white font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
              {comment.name}
            </h4>
          </div>

          <div className="flex items-center gap-1.5 mb-2">
            <Mail className="size-3 text-white/40" />
            <span className="text-xs text-white/50 truncate">
              {comment.email}
            </span>
          </div>

          <p className="text-white/80 group-hover:text-white/90 text-sm leading-relaxed transition-colors">
            {comment.body}
          </p>
        </div>
      </div>
      <Button
        disabled={isDeleteCommentLoading}
        onClick={() => deleteComment(comment.id)}
        variant="outline"
        size="icon"
        type="button"
        className="absolute top-2 right-2 size-7 rounded-full border-none bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
      >
        {isDeleteCommentLoading ? (
          <Spinner className="size-3.5" />
        ) : (
          <X className="size-3.5" />
        )}
      </Button>
    </div>
  );
};

export default UserPostCommentCard;
