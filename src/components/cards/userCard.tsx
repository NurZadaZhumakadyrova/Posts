import React from 'react';
import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../avatar/avatar';
import type { IUser } from '@/types/userTypes';

interface Props {
  user: IUser;
}

const UserCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${user.id}`)}
      className="group relative flex flex-col rounded-3xl border border-white/20 p-6 text-white cursor-pointer hover:scale-[1.02] transition-all duration-500 bg-gradient-to-br from-black/70 via-black/80 to-black/70 hover:from-black/60 hover:via-black/70 hover:to-black/60 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-black/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/[0.03] group-hover:via-purple-500/[0.03] group-hover:to-pink-500/[0.03] transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl border border-transparent opacity-0 group-hover:opacity-100 group-hover:border-purple-500/30 transition-all duration-500" />
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-5">
          <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300"
              style={{ filter: 'blur(12px)' }}
            />
            {user.id === 1 ? (
              <MainAvatar user={user} size="lg" className="relative" />
            ) : (
              <UserAvatar user={user} />
            )}
          </div>
          <h3 className="font-bold text-xl text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-200 group-hover:to-pink-200 transition-all duration-300">
            {user.name}
          </h3>
          <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
            @{user.username}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white/90 p-2 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all">
            <Mail className="size-4 shrink-0 text-indigo-400" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white/90 p-2 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all">
            <Phone className="size-4 shrink-0 text-purple-400" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white/90 p-2 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all">
            <Globe className="size-4 shrink-0 text-pink-400" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-pink-300 transition-colors truncate"
            >
              {user.website}
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/80 group-hover:text-white/90 p-2 rounded-lg bg-white/0 group-hover:bg-white/5 transition-all">
            <MapPin className="size-4 shrink-0 text-blue-400" />
            <span className="truncate">{user.address.city}</span>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
          <p className="text-xs text-white/50 uppercase tracking-wide mb-2 group-hover:text-white/70 transition-colors">
            Company
          </p>
          <p className="font-semibold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all">
            {user.company.name}
          </p>
          <p className="text-xs text-white/60 italic mt-2 group-hover:text-white/75 leading-relaxed transition-colors">
            "{user.company.catchPhrase}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
