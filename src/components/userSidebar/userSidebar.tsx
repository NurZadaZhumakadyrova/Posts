import { useState } from 'react';
import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import UserAvatar from '@/components/avatar/avatar.tsx';
import {
  Briefcase,
  Building2,
  ChevronDown,
  Globe,
  Images,
  ListTodo,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone, RefreshCcwIcon,
  User as UserIcon,
} from 'lucide-react';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import { Button } from '@/components/ui/button.tsx';
import { getUser } from '@/utils';
import { useNavigate, useParams } from '@tanstack/react-router';

interface IUserAccordion {
  contact: boolean;
  address: boolean;
  company: boolean;
  posts: boolean;
}

const UserSidebar = () => {
  const { users, getUsers } = useUserContext();
  const navigate = useNavigate();
  const { userId } = useParams({ from: '/users/$userId' });
  const [openSections, setOpenSections] = useState<IUserAccordion>({
    contact: false,
    address: false,
    company: false,
    posts: false,
  });
  const user = getUser(users, { userId: Number(userId) });

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto text-center py-16">
        <h1 className="text-white text-4xl font-light mb-4">User not found</h1>
        <Button
          onClick={async () => await getUsers()}
          variant="outline"
          className="bg-transparent text-white"
        >
          <RefreshCcwIcon />
          Refresh
        </Button>
      </div>
    );
  }

  const toggleSection = (
    section: 'contact' | 'address' | 'company' | 'posts',
  ) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    user && (
      <div className="[@media(min-width:730px)]:w-[320px] [@media(min-width:730px)]:flex-shrink-0 space-y-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 p-4 [@media(min-width:640px)]:p-6 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />

          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-40 blur-xl" />
              <div className="relative ring-2 ring-white/30 rounded-full p-1">
                {user.id === 1 ? (
                  <MainAvatar user={user} size="lg" className="size-20" />
                ) : (
                  <UserAvatar user={user} size="lg" text className="size-20" />
                )}
              </div>
            </div>

            <h1 className="text-white text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">
              {user.name}
            </h1>
            <p className="text-white/60 text-base mb-4">@{user.username}</p>

            <div className="flex flex-col gap-2 w-full">
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 text-white text-sm">
                <UserIcon className="inline-block size-4 mr-2 text-indigo-400" />
                ID: {user.id}
              </div>
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 text-white text-sm truncate">
                <Building2 className="inline-block size-4 mr-2 text-purple-400" />
                {user.company.name}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 p-2 [@media(min-width:640px)]:p-3 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02]" />
          <div className="relative border-b border-white/10 pb-3 mb-3">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200 mb-3"
              onClick={() => toggleSection('contact')}
            >
              <Mail className="size-4 text-blue-400" />
              <span className="flex-1">Contact</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${openSections.contact ? 'rotate-180' : ''}`}
              />
            </h3>

            <div
              className={`space-y-2 text-sm overflow-hidden transition-all duration-300 ${openSections.contact ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all">
                <Mail className="size-4 text-blue-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${user.email}`}
                  className="text-white/80 hover:text-white transition-colors break-all"
                >
                  {user.email}
                </a>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all">
                <Phone className="size-4 text-purple-400 mt-0.5 shrink-0" />
                <a
                  href={`tel:${user.phone}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {user.phone}
                </a>
              </div>

              <div className="flex items-start gap-2 p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all">
                <Globe className="size-4 text-pink-400 mt-0.5 shrink-0" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors break-all"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <div className="relative border-b border-white/10 pb-3 mb-3">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-200 hover:to-pink-200 mb-3"
              onClick={() => toggleSection('address')}
            >
              <MapPin className="size-4 text-purple-400" />
              <span className="flex-1">Address</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${openSections.address ? 'rotate-180' : ''}`}
              />
            </h3>
            <div
              className={`space-y-2 text-sm overflow-hidden transition-all duration-300 ${openSections.address ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all">
                <p className="text-white font-medium">{user.address.city}</p>
                <p className="text-white/70 text-sm mt-0.5">
                  {user.address.street}
                </p>
                <p className="text-white/60 text-sm">{user.address.zipcode}</p>
              </div>

              <div className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all text-sm">
                <p className="text-white/50 uppercase tracking-wide text-xs mb-1">
                  Coordinates
                </p>
                <div className="flex gap-3">
                  <span className="text-white/80">
                    Lat: {user.address.geo.lat}
                  </span>
                  <span className="text-white/80">
                    Lng: {user.address.geo.lng}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white/10 pb-3 mb-3">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-200 hover:to-orange-200 mb-3"
              onClick={() => toggleSection('company')}
            >
              <Briefcase className="size-4 text-pink-400" />
              <span className="flex-1">Company</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${openSections.company ? 'rotate-180' : ''}`}
              />
            </h3>

            <div
              className={`space-y-2 text-sm overflow-hidden transition-all duration-300 ${openSections.company ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-orange-500/10 transition-all">
                <p className="text-white/50 uppercase tracking-wide text-xs mb-1">
                  Name
                </p>
                <p className="text-white font-semibold">{user.company.name}</p>
              </div>

              <div className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-orange-500/10 transition-all">
                <p className="text-white/50 uppercase tracking-wide text-xs mb-1">
                  Slogan
                </p>
                <p className="text-white/80 italic text-sm">
                  "{user.company.catchPhrase}"
                </p>
              </div>

              <div className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-orange-500/10 transition-all">
                <p className="text-white/50 uppercase tracking-wide text-xs mb-1">
                  Business
                </p>
                <p className="text-white/80">{user.company.bs}</p>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white/10 pb-3 mb-3">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-200 hover:to-cyan-200 mb-3"
              onClick={() => toggleSection('posts')}
            >
              <MessageCircleMore className="size-4 text-cyan-400" />
              <span className="flex-1">Posts</span>
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${openSections.posts ? 'rotate-180' : ''}`}
              />
            </h3>

            <div
              className={`space-y-2 text-sm overflow-hidden transition-all duration-300 ${openSections.posts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div
                onClick={() => navigate({
                  to:'/'
                })}
                className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all"
              >
                <p className="text-white font-semibold">📄 All posts</p>
              </div>
              <div
                onClick={() => navigate({ to:`/users/${userId}/posts` })}
                className="cursor-pointer p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all"
              >
                <p className="text-white font-semibold">✍️ {Number(userId) === 1 ? 'My posts' : 'User posts'}</p>
              </div>
            </div>
          </div>
          <div className="relative border-b border-white/10 pb-3 mb-3">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-200 hover:to-teal-200 mb-3"
              onClick={() => navigate({ to:`/users/${userId}/todos` })}
            >
              <ListTodo className="size-4 text-green-400" />
              <span className="flex-1">Todos</span>
            </h3>
          </div>
          <div className="relative">
            <h3
              className="relative text-white text-base font-semibold flex items-center gap-2 cursor-pointer select-none transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-200 hover:to-orange-200 mb-3"
              onClick={() => navigate({ to:`/users/${userId}/albums` })}
            >
              <Images className="size-4 text-yellow-400" />
              <span className="flex-1">Albums</span>
            </h3>
          </div>
        </div>
      </div>
    )
  );
};

export default UserSidebar;
