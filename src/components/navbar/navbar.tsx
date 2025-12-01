import { Link, useNavigate } from 'react-router-dom';
import MainAvatar from '@/components/avatar/mainAvatar.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import MainLinks from '@/components/navbar/mainLinks.tsx';
import UserIconDrop from '@/components/buttonGroup/buttonGroup.tsx';
import Logo from '@/assets/logo-post.svg';


const Navbar = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
      <div className="max-w-[1366px] mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[220px]"/>
        </Link>
        {/*<Link*/}
        {/*  to="/"*/}
        {/*  className="group relative flex items-center gap-3 px-3 py-2 mr-7"*/}
        {/*>*/}
        {/*  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />*/}
        {/*  <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 group-hover:scale-110 transition-transform duration-300">*/}
        {/*    <MessageSquare*/}
        {/*      className="size-7 text-transparent bg-clip-text"*/}
        {/*      style={{*/}
        {/*        background:*/}
        {/*          'linear-gradient(135deg, #60A5FA 0%, #C084FC 50%, #F472B6 100%)',*/}
        {/*        WebkitBackgroundClip: 'text',*/}
        {/*        WebkitTextFillColor: 'transparent',*/}
        {/*        filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.5))',*/}
        {/*      }}*/}
        {/*      strokeWidth={2.5}*/}
        {/*      stroke="url(#logoGradient)"*/}
        {/*    />*/}
        {/*    <svg width="0" height="0">*/}
        {/*      <defs>*/}
        {/*        <linearGradient*/}
        {/*          id="logoGradient"*/}
        {/*          x1="0%"*/}
        {/*          y1="0%"*/}
        {/*          x2="100%"*/}
        {/*          y2="100%"*/}
        {/*        >*/}
        {/*          <stop offset="0%" stopColor="#60A5FA" />*/}
        {/*          <stop offset="50%" stopColor="#C084FC" />*/}
        {/*          <stop offset="100%" stopColor="#F472B6" />*/}
        {/*        </linearGradient>*/}
        {/*      </defs>*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*  <div className="relative z-10">*/}
        {/*    <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 group-hover:from-blue-100 group-hover:via-purple-100 group-hover:to-pink-100 transition-all duration-300">*/}
        {/*      POST*/}
        {/*    </h1>*/}
        {/*    <p className="text-[9px] font-semibold tracking-widest text-white/50 uppercase -mt-1">*/}
        {/*      Share & Connect*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*  <Sparkles className="absolute -top-1 -right-1 size-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />*/}
        {/*</Link>*/}



        {user && <div className="hidden sm:block w-[50%]">
          <MainLinks/>
        </div>}

        {user && (
          <div className="hidden sm:flex items-center gap-4 ml-7">
            <div
              className="sm:flex items-center gap-3 cursor-pointer"
              onClick={() => navigate(`/users/${user.id}`)}
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
