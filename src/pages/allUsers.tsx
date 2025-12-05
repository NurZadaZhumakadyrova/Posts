import UserCard from '@/components/cards/userCard.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import Loading from '@/components/loading/loading.tsx';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';

const AllUsers = () => {
  const { users, getUsers, loading } = useUserContext();

  if (!loading && users.length === 0) {
    return (
      <EmptyBlock
        title="No Users"
        text="You're all caught up. New user will appear here."
        type="user"
        getFunction={async () => await getUsers()}
      />
    );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="ml-0 mb-12 sm:ml-16">
            <div className="relative inline-block">
              <h1 className="text-center sm:text-left text-white text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                All Users
              </h1>
              <p className="mt-5 text-white/60 text-lg font-light text-center sm:text-left mb-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className="w-full absolute -bottom-3 left-0 sm:left-0 right-0 sm:right-auto h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;
