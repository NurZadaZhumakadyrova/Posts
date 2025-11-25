import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '@/useContext.ts';
import UserAvatar from '@/components/avatar/avatar.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar.tsx';
import { MessageSquare, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { users } = usePosts();
  const navigate = useNavigate();
  const displayedUsers = users.slice(0, 5);

  return (
    <nav className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-[1366px] mx-auto flex items-center justify-between py-3 px-4">
        <Link
          to="/"
          className="group relative flex items-center gap-3 px-3 py-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
          <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <MessageSquare
              className="size-7 text-transparent bg-clip-text"
              style={{
                background:
                  'linear-gradient(135deg, #60A5FA 0%, #C084FC 50%, #F472B6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.5))',
              }}
              strokeWidth={2.5}
              stroke="url(#logoGradient)"
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 group-hover:from-blue-100 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-300">
              POST
            </h1>
            <p className="text-[9px] font-semibold tracking-widest text-white/50 uppercase -mt-1">
              Share & Connect
            </p>
          </div>
          <Sparkles className="absolute -top-1 -right-1 size-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center -space-x-4 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              {displayedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="relative ring-2 ring-black/50 rounded-full transition-all duration-300 hover:scale-[1.5] hover:!z-[100] hover:shadow-2xl hover:shadow-purple-500/50 hover:ring-2 hover:ring-purple-400 grayscale hover:grayscale-0 cursor-pointer"
                  style={{ zIndex: displayedUsers.length - index }}
                  title={user.name}
                  onClick={() => navigate(`/users/${user.id}`)}
                >
                  <UserAvatar user={user} size="md" />
                </div>
              ))}
            </div>

            {users.length > 5 && (
              <button
                onClick={() => navigate('/users')}
                className="relative group px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 hover:from-indigo-500/30 hover:via-purple-500/30 hover:to-pink-500/30 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <span className="relative z-10">
                  +{users.length - 5} more
                  <br />
                  <span className="text-xs text-white/60 group-hover:text-white/80">
                    View all
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </button>
            )}
          </div>

          {users.length > 0 && (
            <div
              onClick={() => navigate('/users')}
              className="block cursor-pointer sm:hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300" />
              <Avatar className="size-10 ring-2 ring-white/20 group-hover:ring-purple-400 transition-all duration-300">
                <AvatarImage
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2Vycy1yb3VuZC1pY29uIGx1Y2lkZS11c2Vycy1yb3VuZCI+PHBhdGggZD0iTTE4IDIxYTggOCAwIDAgMC0xNiAwIi8+PGNpcmNsZSBjeD0iMTAiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIyIDIwYzAtMy4zNy0yLTYuNS00LThhNSA1IDAgMCAwLS40NS04LjMiLz48L3N2Zz4="
                  className="grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
