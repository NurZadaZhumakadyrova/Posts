import { useEffect, useState } from 'react';
import { MessageSquare, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import UserPostCommentCard from '@/components/cards/userPostCommentCard.tsx';
import PostFormModal from '@/components/forms/postFormModal.tsx';
import AlertGlobal from '@/components/alert/alertGlobal.tsx';
import ConfirmModal from '@/components/modal/confirmModal.tsx';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';
import EmptyComments from '@/components/empties/emptyComments.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { ApiPost, IPost } from '@/types/postTypes.ts';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import { useComments, useDeleteComment, useDeletePost, useOnePost, useUpdatePost } from '@/app/hooks';
import ErrorAlert from '@/components/alert/errorAlert.tsx';
import { useNavigate, useParams } from '@tanstack/react-router';

const UserPost = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [isUpdateErrorAlert, setIsUpdateErrorAlert] = useState<boolean>(false);
  const [isDeleteErrorAlert, setIsDeleteErrorAlert] = useState<boolean>(false);
  const [isDeleteCommentAlert, setIsDeleteCommentAlert] =
    useState<boolean>(false);
  const [isDeleteCommentError, setIsDeleteCommentError] =
    useState<boolean>(false);
  const { postId } = useParams({ from: '/users/$userId/posts/$postId' });
  const { user } = useUserContext();
  const { data: post, isPending: loading } = useOnePost(Number(postId));
  const { data:comments } = useComments(Number(postId));
  const { mutate: updatePost, isPending: updatePostLoading, error: updatingError } = useUpdatePost();
  const { mutate: deletePost, isPending: deletePostLoading, error: deleteError } = useDeletePost();
  const { mutate: deleteComment, error: deleteCommentError } = useDeleteComment();
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(null);
  const navigate = useNavigate();

  const editThePost = (editPost: ApiPost) => {
    if (postId) {
      updatePost({ ...editPost, id: Number(postId) }, {
        onSuccess: () => {
          setIsModal(false);
          setIsAlert(true);
        },
        onError: () => {
          setIsModal(false);
          setIsUpdateErrorAlert(true);
        }
      });
    }
  };

  const deleteThePost = () => {
    if (postId && post) {
      deletePost(Number(postId), {
        onSuccess: () => {
          setIsDeleteModal(false);
          setIsDeleteAlert(true);
          setTimeout(() => {
            void navigate({ to: `/users/${post.userId}` });
          }, 3500);
        },
        onError: () => {
          setIsDeleteModal(false);
          setIsDeleteErrorAlert(true);
        }
      });
    }
  };

  const deletePostComment = (id: number) => {
    setDeletingCommentId(id);
    deleteComment(id, {
      onSuccess: () => {
        setDeletingCommentId(null);
        setIsDeleteCommentAlert(true);
      },
      onError: () => {
        setDeletingCommentId(null);
        setIsDeleteCommentError(true);
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      if (isAlert) {
        setIsAlert(false);
      }

      if (isDeleteAlert) {
        setIsDeleteAlert(false);
      }

      if (isDeleteCommentAlert) {
        setIsDeleteCommentAlert(false);
      }

      if (isUpdateErrorAlert) {
        setIsUpdateErrorAlert(false);
      }

      if (isDeleteErrorAlert) {
        setIsDeleteErrorAlert(false);
      }

      if (isDeleteCommentError) {
        setIsDeleteCommentError(false);
      }
    }, 3500);
  }, [isAlert, isDeleteAlert, isDeleteCommentAlert, isDeleteCommentError, isDeleteErrorAlert, isUpdateErrorAlert]);

  if (!loading && !post) {
    return (
      <EmptyBlock
        title="No Post"
        text="You're all caught up. Your post will appear here."
        type="userPost"
      />
    );
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 gap-3">
        <Spinner className="size-8 text-white" />
        <p className="text-white/60">Loading user posts...</p>
      </div>
    );
  }

  return (
    post && (
      <>
        {(isDeleteCommentAlert && deleteCommentError === null) && <AlertGlobal type="deleteComment" />}
        {(isDeleteCommentError && deleteCommentError) && <ErrorAlert error={deleteCommentError.message} type="editPost" />}
        {(isDeleteAlert && deleteError === null) && <AlertGlobal type="deletePost" />}
        {(isDeleteErrorAlert && deleteError) && <ErrorAlert error={deleteError.message} type="deletePost" />}
        {isDeleteModal && (
          <ConfirmModal
            open={isDeleteModal}
            onOpenChange={() => setIsDeleteModal(false)}
            deleteFunctions={() => deleteThePost()}
            postLoading={deletePostLoading}
            type={'post'}
          />
        )}
        {(isAlert && updatingError === null) && <AlertGlobal type="editPost" />}
        {(isUpdateErrorAlert && updatingError) && <ErrorAlert error={updatingError.message} type="editPost" />}
        {isModal && (
          <PostFormModal
            editPost={post}
            openModal={isModal}
            onOpenChange={() => setIsModal(false)}
            postFunction={editThePost}
            loading={updatePostLoading}
            isEdit
          />
        )}
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />
            <div className="relative p-6 md:p-8">
              {(user && user.id === 1) && post.userId === 1 ? (
                <div className="flex justify-end gap-2 mb-4">
                  <Button
                    onClick={() => setIsModal(true)}
                    variant="outline"
                    size="icon"
                    type="button"
                    className="bg-white/5 border-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <SquarePen className="size-4"/>
                  </Button>
                  <Button
                    onClick={() => setIsDeleteModal(true)}
                    variant="outline"
                    size="icon"
                    type="button"
                    className="bg-white/5 border-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-red-500/20 hover:to-orange-500/20 hover:border-red-400/40 transition-all duration-300"
                  >
                    <Trash2 className="size-4"/>
                  </Button>
                </div>
              ) : null}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight capitalize text-center">
                  {post.title}
                </h1>
                <div className="flex justify-center">
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"/>
                </div>
                <p className="text-white/80 text-lg leading-relaxed text-center italic">
                  "{post.body}"
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-xl p-6">
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-pink-500/[0.02] to-purple-500/[0.02]"/>
            <div className="relative">
              {!loading && (comments && comments.length === 0) ? (
                <EmptyComments
                  emptyFunction={() => navigate({ to: `/users/${post?.userId}` })}
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <MessageSquare className="size-5 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200">
                      Comments ({comments && comments.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {comments && comments.map((comment, index) => (
                      <div
                        key={comment.id}
                        style={{
                          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                        }}
                      >
                        <UserPostCommentCard
                          comment={comment}
                          deleteComment={deletePostComment}
                          isDeleteCommentLoading={
                            deletingCommentId === comment.id
                          }
                          post={post as IPost}
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
