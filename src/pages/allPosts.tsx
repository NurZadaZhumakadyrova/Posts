import PostCard from '@/components/cards/postCard.tsx';
import { usePostContext } from '@/useContexts/useContextPosts.ts';
import Loading from '@/components/loading/loading.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';

const AllPosts = () => {
  const { posts, getPosts, loading } = usePostContext();
  const { users, getUsers } = useUserContext();

  if (!loading && posts.length === 0) {
    return (
      <EmptyBlock
        title="No Posts"
        text="You're all caught up. New posts will appear here."
        type="post"
        getFunction={async () => await getPosts()}
      />
    );
  }

  if (!loading && users.length === 0) {
    return (
      <EmptyBlock
        title="No User"
        text="We were unable to find information about user. Please refresh the page!"
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
        <section className="min-h-screen py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mx-3 mb-12">
              <div className="relative">
                <h1 className="ml-0 text-center sm:text-left text-white text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  All Posts
                </h1>
                <p className="mt-5 text-white/60 text-lg font-light text-center sm:text-left mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, quas.
                </p>
                <div className="absolute -bottom-3 left-0 sm:left-0 right-0 sm:right-auto h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} users={users} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllPosts;
