import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Mail, MessageSquare, Users } from 'lucide-react';
import { mainUserNavLinks } from '@/utils/glogalConst.ts';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 mt-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/90 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-purple-500/[0.02] to-pink-500/[0.02]" />

      <div className="relative max-w-[1366px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare
                  className="size-6"
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
              <div>
                <h3 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  POST
                </h3>
                <p className="text-[8px] font-semibold tracking-widest text-white/50 uppercase -mt-1">
                  Share & Connect
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              fugiat quaerat vitae.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <FileText className="size-5 text-blue-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="size-1 rounded-full bg-blue-400 group-hover:bg-purple-400 transition-colors" />
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/users"
                  className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="size-1 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors" />
                  All Users
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <Users className="size-5 text-purple-400" />
              Community
            </h4>
            <ul className="space-y-2">
              {mainUserNavLinks.slice(1).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="size-1 rounded-full bg-purple-400 group-hover:bg-pink-400 transition-colors"/>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg flex items-center gap-2">
              <Mail className="size-5 text-pink-400" />
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all group"
              >
                <Github className="size-5 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/60 group-hover:text-white transition-colors text-sm">
                  GitHub
                </span>
              </a>
              <a
                href="mailto:contact@post.app"
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all group"
              >
                <Mail className="size-5 text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/60 group-hover:text-white transition-colors text-sm">
                  Email Us
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm text-center">
            © {currentYear} POST & COMMENTS
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </footer>
  );
};

export default Footer;
