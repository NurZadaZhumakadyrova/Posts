import React from 'react';
import type { IPost } from '@/types.ts';
import PostCard from '@/components/cards/postCard.tsx';

interface Props {
  posts: IPost[];
}

const AllPosts: React.FC<Props> = ({ posts }) => {
  return (
    <section className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mx-3 mb-12">
          <div className="relative">
            <h1 className="ml-0 text-center sm:text-left text-white text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
              All Posts
            </h1>
            <div className="absolute -bottom-3 left-0 sm:left-0 right-0 sm:right-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
            <p className="mt-5 text-white/60 text-lg font-light">
              Discover amazing content from our community
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
