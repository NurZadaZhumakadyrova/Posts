import { useEffect, useState } from 'react';
import type { ApiPost, IPost } from '@/types.ts';
import { usePostContext } from '@/useContext.ts';
import { useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner.tsx';
import UserPostCard from '@/components/cards/userPostCard.tsx';
import { Button } from '@/components/ui/button.tsx';
import PostFormModal from '@/components/forms/postFormModal.tsx';
import AlertGlobal from '@/components/alert/alert.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { MessageCirclePlus } from 'lucide-react';

const UserPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const { getUserPosts, addPost, loading } = usePostContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      if (id) {
        const data = await getUserPosts(Number(id));
        setPosts(data);
        setLoadingPosts(false);
      }
    };
    void fetchPosts();
  }, [id, getUserPosts]);

  const addNewPost = async (post: ApiPost) => {
    post.userId = Number(id);
    await addPost(post);
    setTimeout(() => {
      setIsAlert(true);
    }, 1000);
    closeModal();
  };

  const closeModal = () => {
    setIsModal(false);
    setTimeout(() => {
      setIsAlert(false);
    }, 3500);
  };

  return (
    <>
      {isAlert && <AlertGlobal isNewPost />}
      {isModal && (
        <PostFormModal
          openModal={isModal}
          postFunction={addNewPost}
          onOpenChange={() => setIsModal(false)}
          loading={loading}
        />
      )}
      {loadingPosts ? (
        <div className="w-full flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white" />
          <p className="text-white/60">Loading user posts...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-5 flex items-center justify-between">
            <h3 className=" text-white text-3xl font-light tracking-wide">
              My posts
            </h3>
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
                    <MessageCirclePlus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="">
                  <p>Add new post</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {posts.length === 0 ? (
            <p className="text-white/60 text-center py-8">No posts found</p>
          ) : (
            posts.map((post) => <UserPostCard key={post.id} post={post} />)
          )}
        </div>
      )}
    </>
  );
};

export default UserPosts;
