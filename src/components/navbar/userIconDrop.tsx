import { Button } from '@/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import React from 'react';
import type { IUser } from '@/types/userTypes.ts';
import { getIcon, mainUserNavLinks } from '@/utils';
import { useNavigate } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

interface Props {
  user: IUser;
}

const UserIconDrop: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative rounded-full h-14 w-14 p-0 bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <MainAvatar user={user} size="md" className="relative" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 mt-2 p-0 border-0 shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-black/95 via-black/98 to-black/95 border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-purple-500/[0.05] to-pink-500/[0.05]" />

          <div className="relative">
            <DropdownMenuLabel className="p-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-30" />
                  <MainAvatar user={user} size="md" className="relative border-2 border-white/20" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{user.name}</p>
                  <p className="text-white/60 text-xs">{user.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10 my-1" />
            <div className="p-1">
              {mainUserNavLinks.map((link, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={false}
                  className="group text-white font-medium px-3 py-2.5 cursor-pointer rounded-lg hover:bg-gradient-to-r hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all duration-200 focus:bg-transparent"
                  onClick={() => navigate({ to: link.href })}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-white/70 group-hover:text-white transition-colors">
                      {getIcon(link.label)}
                    </span>
                    <span className="flex-1">{link.label}</span>
                    <ChevronRight className="size-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserIconDrop;
