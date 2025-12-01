import React from 'react';
import type { IPhoto } from '@/types/albumTypes.ts';

interface Props {
  photo: IPhoto;
}

const AlbumImageCard: React.FC<Props> = ({ photo }) => {
  return (
    <div
      className={`group relative flex flex-col rounded-3xl border border-white/20 p-5 text-white cursor-pointer hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-black/70 via-black/80 to-black/70 hover:from-black/60 hover:via-black/70 hover:to-black/60 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-black/40`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/[0.03] group-hover:via-purple-500/[0.03] group-hover:to-pink-500/[0.03] transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl border border-transparent opacity-0 group-hover:opacity-100 group-hover:border-purple-500/30 transition-all duration-500" />
      <div className="relative z-10 flex flex-col cursor-pointer">
        <p className="text-justify hyphens-auto line-clamp-1 text-white/80 group-hover:text-white/90  transition-colors duration-300 mb-1">
          {photo.title}
        </p>
        <div className="flex items-center justify-between border-t border-white/10">
          <img className="rounded-sm mt-3" src={photo.url} alt={photo.title} />
        </div>
      </div>
    </div>
  );
};

export default AlbumImageCard;
