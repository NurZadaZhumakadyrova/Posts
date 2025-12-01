import { MessageCircle } from 'lucide-react';

const EmptyPost = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl py-10 sm:py-14 px-6 sm:px-12 rounded-3xl text-center space-y-6 bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl">
        <MessageCircle className="size-20 sm:size-24 text-white/30 mx-auto" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Post not found
        </h2>
        <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
          The post you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    </div>
  );
};

export default EmptyPost;
