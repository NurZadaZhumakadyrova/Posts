import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import MainLinks from '@/components/navbar/mainLinks.tsx';
import UserIconDrop from '@/components/navbar/userIconDrop.tsx';
import Logo from '@/assets/logo-post.svg';
import { Link, useNavigate } from '@tanstack/react-router';

const Navbar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-[1366px] mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[220px]"/>
        </Link>
        {user && <div className="hidden sm:block w-[50%]">
          <MainLinks/>
        </div>}

        {user && (
          <div className="hidden sm:flex items-center gap-4 ml-7">
            <div
              className="sm:flex items-center gap-3 cursor-pointer"
              onClick={() => navigate({ to:`/users/${user.id}` })}
            >
              <div className="flex items-center -space-x-4 p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <MainAvatar user={user} size="md" />
              </div>
              <div className="[@media(max-width:910px)]:hidden">
                <p className="text-white/80 font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200">
                  {user.name}
                </p>
                <p className="text-indigo-300 text-sm ">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        <div className="sm:hidden mr-3">
          {user && <UserIconDrop user={user} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
