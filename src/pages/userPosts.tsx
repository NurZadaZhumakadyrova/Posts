import { useEffect, useState } from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';
import UserPostCard from '@/components/cards/userPostCard.tsx';
import { Button } from '@/components/ui/button.tsx';
import PostFormModal from '@/components/forms/postFormModal.tsx';
import AlertGlobal from '@/components/alert/alertGlobal.tsx';
import { Tooltip, TooltipContent, TooltipTrigger, } from '@/components/ui/tooltip.tsx';
import { MessageCirclePlus } from 'lucide-react';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import { useAddNewPost, useUserPosts } from '@/app/hooks';
import type { ApiPost } from '@/types/postTypes.ts';
import ErrorAlert from '@/components/alert/errorAlert.tsx';
import { useParams } from '@tanstack/react-router';

const UserPosts = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isErrorAlert, setIsErrorAlert] = useState<boolean>(false);
  const { user } = useUserContext();
  const { userId } = useParams({ from: '/users/$userId' });
  const { data: posts, isPending: postsLoading } = useUserPosts(Number(userId));
  const { mutate, error, isPending } = useAddNewPost();

  const addNewPost = (post: ApiPost) => {
    post.userId = Number(userId);
    console.log(post);
    mutate({ ...post }, {
      onSuccess: () => {
        setIsModal(false);
        setIsAlert(true);
      },
      onError: () => {
        setIsModal(false);
        setIsErrorAlert(true);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (isAlert) {
        setIsAlert(false);
      }

      if (isErrorAlert) {
        setIsErrorAlert(false);
      }
    }, 3500);
  }, [isAlert, isErrorAlert]);

  if (!postsLoading && (posts && posts.length === 0)) {
    return (
      <EmptyBlock
        title="No Posts"
        text="You're all caught up. New posts will appear here"
        type="userPost"
      />
    );
  }

  return (
    <>
      {(isAlert && error === null) && <AlertGlobal type="isNewPost" />}
      {(error && isErrorAlert) && <ErrorAlert message={error.message} type="addPost" />}
      {isModal && (
        <PostFormModal
          openModal={isModal}
          postFunction={addNewPost}
          onOpenChange={() => setIsModal(false)}
          loading={isPending}
        />
      )}
      {postsLoading ? (
        <div className="w-full flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white" />
          <p className="text-white/60">Loading user posts...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-5 flex items-center justify-between">
            {(user && user.id === 1) && (Number(userId) === 1) ? (
              <h3 className=" text-white text-3xl font-light tracking-wide">
                My posts
              </h3>
            ) : (
              <h3 className=" text-white text-3xl font-light tracking-wide">
                {user?.name}'s all posts
              </h3>
            )}
            {(user && user.id === 1) && (Number(userId) === 1) ? (
              <div>
                <Button
                  onClick={() => setIsModal(true)}
                  variant="outline"
                  className="bg-transparent text-white cursor-pointer ml-2 [@media(max-width:480px)]:hidden"
                >
                  Add new post
                </Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setIsModal(true)}
                      variant="outline"
                      size="icon"
                      type="button"
                      className="[@media(min-width:481px)]:hidden size-9 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
                    >
                      <MessageCirclePlus className="size-5"/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/90 text-white">
                    <p>Add new post</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ) : null}
          </div>
          {posts && posts.length === 0 ? (
            <p className="text-white/60 text-center py-8">No posts found</p>
          ) : (
            posts && posts.map((post) => <UserPostCard key={post.id} post={post}/>)
          )}
        </div>
      )}
    </>
  );
};

export default UserPosts;
