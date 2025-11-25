import UserCard from '@/components/carts/userCard.tsx';
import { usePosts } from '@/useContext.ts';

const AllUsers = () => {
  const { users } = usePosts();
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="ml-0 mb-12 sm:ml-16">
        <div className="relative inline-block">
          <h1 className="text-center sm:text-left text-white text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            All Users
          </h1>
          <div className="absolute -bottom-3 left-0 sm:left-0 right-0 sm:right-auto h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
        <p className="mt-5 text-white/60 text-lg font-light text-center sm:text-left">
          Connect with talented people from around the world
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
