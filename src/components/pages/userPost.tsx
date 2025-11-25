import { useEffect, useState } from 'react';
import type { ApiPost, IComment, IPost } from '@/types.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '@/useContext.ts';
import { ArrowLeft, MessageSquare, SquarePen, Trash2 } from 'lucide-react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty.tsx';
import { Button } from '@/components/ui/button.tsx';
import UserPostCommentCard from '@/components/carts/userPostCommentCard.tsx';
import PostFormModal from '@/components/forms/postFormModal.tsx';
import AlertGlobal from '@/components/alert/alert.tsx';
import DeleteConfirmModal from '@/components/modal/confirmDeleteModal.tsx';

const UserPost = () => {
  const [post, setPost] = useState<IPost | ApiPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [isDeleteCommentAlert, setIsDeleteCommentAlert] =
    useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);
  const {
    getPost,
    getComments,
    updatePost,
    deletePost,
    loading,
    deleteComment,
  } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const userPost = await getPost(Number(id));
        if (userPost) {
          const postComments = await getComments(Number(userPost.id));
          setComments(postComments);
        }
        setPost(userPost);
      }
    };
    void fetchPost();
  }, [id, getPost, getComments]);

  const editThePost = async (editPost: ApiPost) => {
    if (id) {
      await updatePost(Number(id), editPost);
      setTimeout(() => {
        setIsAlert(true);
      }, 1000);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModal(false);
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  };

  const deleteThePost = async (post: IPost) => {
    await deletePost(post.id);
    setTimeout(() => {
      setIsDeleteAlert(true);
    }, 1000);
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    setIsDeleteModal(false);
    setTimeout(() => {
      setIsDeleteAlert(false);
    }, 3000);
  };

  const deletePostComment = async (id: number) => {
    setDeletingCommentId(id);
    await deleteComment(id);
    setTimeout(() => {
      setDeletingCommentId(null);
      setIsDeleteCommentAlert(true);
    }, 1000);
    setTimeout(() => {
      setIsDeleteCommentAlert(false);
    }, 3000);
  };

  const noComments = (
    <Empty className="bg-white/10">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-black/30">
          <MessageSquare className="text-white/50" />
        </EmptyMedia>
        <EmptyTitle className="text-white/80">No Comments Yet!</EmptyTitle>
        <EmptyDescription className="text-white/70">
          You have no comments on this post yet.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          size="lg"
          className="bg-black/30"
          onClick={() => navigate(`/users/${post?.userId}`)}
        >
          <ArrowLeft />
          All my posts
        </Button>
      </EmptyContent>
    </Empty>
  );

  return (
    post && (
      <>
        {isDeleteCommentAlert && <AlertGlobal deleteComment />}
        {isDeleteAlert && <AlertGlobal deletePost />}
        {isDeleteModal && (
          <DeleteConfirmModal
            open={isDeleteModal}
            onOpenChange={() => setIsDeleteModal(false)}
            deleteThePost={() => deleteThePost(post as IPost)}
            loading={loading}
          />
        )}
        {isAlert && <AlertGlobal editPost />}
        {isModal && (
          <PostFormModal
            editPost={post}
            openModal={isModal}
            onOpenChange={() => setIsModal(false)}
            postFunction={editThePost}
            loading={loading}
            isEdit
          />
        )}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />
            <div className="relative p-6 md:p-8">
              <div className="flex justify-end gap-2 mb-4">
                <Button
                  onClick={() => setIsModal(true)}
                  variant="outline"
                  size="icon"
                  type="button"
                  className="bg-white/5 border-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                >
                  <SquarePen className="size-4" />
                </Button>
                <Button
                  onClick={() => setIsDeleteModal(true)}
                  variant="outline"
                  size="icon"
                  type="button"
                  className="bg-white/5 border-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:border-red-400/40 transition-all duration-300"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight capitalize text-center">
                  {post.title}
                </h1>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
                </div>
                <p className="text-white/80 text-lg leading-relaxed text-center italic">
                  "{post.body}"
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-xl p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-pink-500/[0.02] to-purple-500/[0.02]" />
            <div className="relative">
              {comments.length === 0 ? (
                noComments
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <MessageSquare className="size-5 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
                      Comments ({comments.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {comments.map((comment, index) => (
                      <div
                        key={comment.id}
                        style={{
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                        }}
                      >
                        <UserPostCommentCard
                          comment={comment}
                          deleteComment={deletePostComment}
                          isDeleteCommentLoading={deletingCommentId === comment.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default UserPost;
