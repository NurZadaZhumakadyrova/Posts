import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import React from 'react';
import { mainUserNavLinks } from '@/utils/glogalConst.ts';
import { useNavigate } from 'react-router-dom';
import type { IUser } from '@/types/userTypes.ts';

interface Props {
  user: IUser;
}

const UserIconDrop: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col gap-8">
          <Button variant="outline" size="icon" className="rounded-full">
            <div className="flex items-center -space-x-4 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <MainAvatar user={user} size="sm" className="bg-transparent" />
            </div>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gradient-to-br from-purple-800/90 to-pink-500/90 mr-7 mt-1 p-2 right-3">
        <DropdownMenuLabel>
          <p className="text-white font-bold italic">{user.name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mainUserNavLinks.map((link, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={false}
            className="text-white font-semibold pl-2 cursor-pointer"
            onClick={() => navigate(link.href)}
          >
            {link.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserIconDrop;
