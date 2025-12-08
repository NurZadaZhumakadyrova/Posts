import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { ChevronDown, ChevronUp, MessageCircle, Send } from 'lucide-react';
import CommentForm from '@/components/forms/commentForm.tsx';
import CommentCard from '@/components/cards/commentCard.tsx';
import AlertGlobal from '@/components/alert/alertGlobal.tsx';
import { useUserContext } from '@/useContexts/useContextUsers.ts';
import Loading from '@/components/loading/loading.tsx';
import EmptyPost from '@/components/empties/emptyPost.tsx';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';
import type { IUser } from '@/types/userTypes.ts';
import { getInitials, getUser } from '@/utils';
import { useComments, useOnePost, useAddNewComment, useUpdateComment } from '@/app/hooks';
import { useParams } from '@tanstack/react-router';

const Post = () => {
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [isAddCommentAlert, setIsAddCommentAlert] = useState<boolean>(false);
  const [isEditCommentAlert, setIsEditCommentAlert] = useState<boolean>(false);
  const { users } = useUserContext();
  const { postId } = useParams({ from: '/posts/$postId' });
  const { data: post, isPending: postLoading } = useOnePost(Number(postId));
  const { data: comments } = useComments(Number(postId));
  const user = post && (getUser(users, post) as IUser);

  const addCommentMutation = useAddNewComment();
  const updateCommentMutation = useUpdateComment();

  const commentFunction = (comment: ApiComment | IComment) => {
    if (postId) {
      if (showCommentForm) {
        comment.postId = Number(postId);
        addCommentMutation.mutate(comment as ApiComment, {
          onSuccess: () => {
            setIsAddCommentAlert(true);
            setShowCommentForm(false);
            setTimeout(() => {
              setIsAddCommentAlert(false);
            }, 3500);
          },
        });
      } else {
        updateCommentMutation.mutate(comment as IComment, {
          onSuccess: () => {
            setIsEditCommentAlert(true);
            setTimeout(() => {
              setIsEditCommentAlert(false);
            }, 3000);
          },
        });
      }
    }
  };

  if (!postLoading && !post) {
    return <EmptyPost />;
  }

  return (
    <>
      {isEditCommentAlert && <AlertGlobal type="editComment" />}
      {isAddCommentAlert && <AlertGlobal type="addComment" />}
      {postLoading ? <Loading/> : (
        <>
          {post ? (
            <div className="max-w-[1366px]">
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]"/>

                  <div className="relative p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <Avatar className="size-12 border-2 border-white/30">
                        <AvatarFallback
                          className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {user && getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          {user?.name}
                        </p>
                        <p className="text-white/60 text-sm">Post #{post.id}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-white leading-tight capitalize">
                        {post.title}
                      </h1>
                      <p className="text-md sm:text-xl text-white/80 leading-relaxed">
                        {post.body}
                      </p>
                    </div>
                    {comments && (
                      <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10 flex-wrap">
                        <button
                          onClick={() => setShowComments(!showComments)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 hover:border-purple-400/40 transition-all duration-300 group [@media(max-width:482px)]:w-full"
                        >
                          <MessageCircle
                            className="size-5 text-purple-300 group-hover:text-purple-200 transition-colors"/>
                          <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                            {comments.length}{' '}
                            {comments.length === 1 ? 'Comment' : 'Comments'}
                          </span>
                          {showComments ? (
                            <ChevronUp className="size-4 text-white/70"/>
                          ) : (
                            <ChevronDown className="size-4 text-white/70"/>
                          )}
                        </button>

                        {(user && user.id !== 1) && (
                          <button
                            onClick={() => setShowCommentForm(!showCommentForm)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg transition-all duration-300 [@media(max-width:482px)]:w-full"
                          >
                            <Send className="size-4 text-white"/>
                            <span className="text-white font-medium">Add Comment</span>
                            {showCommentForm ? (
                              <ChevronUp className="size-4 text-white"/>
                            ) : (
                              <ChevronDown className="size-4 text-white"/>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                    {showCommentForm && (
                      <CommentForm
                        commentFunction={commentFunction}
                        addLoading={addCommentMutation.isPending}
                        closeForm={() => setShowCommentForm(false)}
                      />
                    )}

                    {(showComments && comments) && (
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        {comments.length === 0 ? (
                          <div className="text-center py-12">
                            <MessageCircle className="size-12 text-white/30 mx-auto mb-4"/>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              No comments yet
                            </h3>
                            <p className="text-white/60 text-sm">
                              Be the first to share your thoughts on this post!
                            </p>
                          </div>
                        ) : (
                          comments.map((comment, index) => (
                            <CommentCard
                              isEditLoading={updateCommentMutation.isPending}
                              key={comment.id}
                              comment={comment}
                              index={index}
                              userPost={post.userId === 1}
                              commentFunction={commentFunction}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyPost/>
          )}
        </>
      )}
    </>
  );
};

export default Post;
