import type { IPost, IUser } from '@/types';
import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '@/useContext.ts';
import { ChevronsRight, User as UserIcon } from 'lucide-react';

interface Props {
  post: IPost;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { users } = usePosts();
  const navigate = useNavigate();
  const user = users.find((person) => person.id === post.userId) as IUser;

  return (
    <div className="group relative flex flex-col rounded-3xl border border-white/20 p-5 text-white cursor-pointer hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-black/70 via-black/80 to-black/70 hover:from-black/60 hover:via-black/70 hover:to-black/60 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-black/40">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/[0.03] group-hover:via-purple-500/[0.03] group-hover:to-pink-500/[0.03] transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl border border-transparent opacity-0 group-hover:opacity-100 group-hover:border-purple-500/30 transition-all duration-500" />
      <div
        className="relative z-10 flex flex-col h-full cursor-pointer"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        <h5 className="font-bold text-center mb-4 text-lg capitalize leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
          {post.title}
        </h5>
        <p className="text-justify hyphens-auto flex-grow line-clamp-4 text-white/80 group-hover:text-white/90 leading-relaxed transition-colors duration-300 mb-4">
          {post.body}
        </p>
        <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-white/10">
          <Button
            variant="link"
            className="p-0 h-auto hover:no-underline group/author flex-1 min-w-0"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${user.id}`);
            }}
          >
            <div className="flex items-center gap-2 min-w-0 w-full">
              <UserIcon className="size-4 text-white/50 group-hover/author:text-purple-400 transition-colors flex-shrink-0" />
              <span className="text-xs text-white/60 group-hover/author:text-white/90 transition-colors truncate">
                {user.name}
              </span>
            </div>
          </Button>

          <div className="flex items-center gap-1 text-white/50 group-hover:text-purple-400 transition-colors flex-shrink-0">
            <span className="text-xs font-medium">View</span>
            <ChevronsRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
