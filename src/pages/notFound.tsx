import { Link } from '@tanstack/react-router';
import { Home, SearchX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />

          <div className="relative p-8 md:p-12 text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <SearchX className="relative size-24 md:size-32 text-white/80" strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                404
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Page Not Found
              </h2>
              <p className="text-lg text-white/60 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-lg transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Home className="size-5 text-white group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Back to Home</span>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-white/40">
                Error Code: 404 • Page Not Found
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
