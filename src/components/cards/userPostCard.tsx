import React from 'react';
import type { IPost } from '@/types.ts';
import { useNavigate } from 'react-router-dom';
import { ChevronsRight, FileText } from 'lucide-react';

interface Props {
  post: IPost;
}

const UserPostCard: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 p-4 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`posts/${post.id}`)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/[0.05] group-hover:via-purple-500/[0.05] group-hover:to-pink-500/[0.05] transition-all duration-300 pointer-events-none" />
      <div className="relative">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 shrink-0">
            <FileText className="size-4 text-blue-300" />
          </div>
          <h3 className="text-white text-lg font-semibold capitalize flex-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
            {post.title}
          </h3>
        </div>
        <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-3 group-hover:text-white/80 transition-colors">
          {post.body}
        </p>
        <div className="flex items-center gap-2 text-white/50 group-hover:text-purple-400 transition-colors text-sm">
          <span className="font-medium">View post</span>
          <ChevronsRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
