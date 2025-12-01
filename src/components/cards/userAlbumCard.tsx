import React from 'react';
import type { IAlbum } from '@/types/albumTypes.ts';
import { Folder, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  album: IAlbum;
}

const UserAlbumCard: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/30 p-4 transition-all duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-yellow-500/[0.05] group-hover:via-orange-500/[0.05] group-hover:to-yellow-500/[0.05] transition-all duration-300 pointer-events-none" />
      <div className="relative" onClick={() => navigate(`${album.id}`)}>
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 shrink-0">
            <Folder className="size-4 text-yellow-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-white text-base font-semibold capitalize group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-200 group-hover:to-orange-200 transition-all">
              {album.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Image className="size-3 text-white/40" />
              <p className="text-white/60 text-xs">Album #{album.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAlbumCard;
