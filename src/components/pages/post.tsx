import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ApiComment, IComment, IPost } from '@/types.ts';
import { usePostContext } from '@/useContext.ts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDown, ChevronUp, MessageCircle, Send } from 'lucide-react';
import CommentForm from '@/components/forms/commentForm.tsx';
import CommentCard from '@/components/cards/commentCard.tsx';
import { getAuthorName, getInitials } from '@/globalConstans.ts';
import AlertGlobal from '@/components/alert/alert.tsx';

const Post = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [addCommentLoading, setAddCommentLoading] = useState<boolean>(false);
  const [isAddCommentAlert, setIsAddCommentAlert] = useState<boolean>(false);
  const [isEditCommentAlert, setIsEditCommentAlert] = useState<boolean>(false);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const { getPost, getComments, users, addComment, updateComment } = usePostContext();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setPost(null);
      setComments([]);
      if (postId) {
        const data = await getPost(Number(postId));
        if (data) {
          const postComments = await getComments(data.id);
          setComments(postComments);
        }
        setPost(data);
      }
      setLoading(false);
    };
    void fetchPost();
  }, [getComments, getPost, postId]);

  const commentFunction = async (comment: ApiComment) => {
    if (postId) {
      setAddCommentLoading(true);
      comment.postId = Number(postId);
      await addComment(Number(postId), comment);
      setAddCommentLoading(false);
      setIsAddCommentAlert(true);
      setTimeout(() => {
        setIsAddCommentAlert(false);
      }, 3500);
    }
  };

  const editCommentPost = async (editComment: IComment) => {
    if (postId) {
      setIsEditLoading(true);
      await updateComment({ ...editComment });
      setIsEditLoading(false);
      setIsEditCommentAlert(true);
      setTimeout(() => {
        setIsEditCommentAlert(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Spinner className="size-12 text-white mx-auto" />
          <p className="text-white/60 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
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
  }

  return (
    post && (
      <>
        {isEditCommentAlert && <AlertGlobal editComment />}
        {isAddCommentAlert && <AlertGlobal addComment />}
        <div className="max-w-[1366px]">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="size-12 border-2 border-white/30">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                      {getInitials(getAuthorName(users, post))}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {getAuthorName(users, post)}
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
                <div className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10 flex-wrap">
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 hover:border-purple-400/40 transition-all duration-300 group [@media(max-width:482px)]:w-full"
                  >
                    <MessageCircle className="size-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
                    <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                      {comments.length}{' '}
                      {comments.length === 1 ? 'Comment' : 'Comments'}
                    </span>
                    {showComments ? (
                      <ChevronUp className="size-4 text-white/70" />
                    ) : (
                      <ChevronDown className="size-4 text-white/70" />
                    )}
                  </button>

                  <button
                    onClick={() => setShowCommentForm(!showCommentForm)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg transition-all duration-300 [@media(max-width:482px)]:w-full"
                  >
                    <Send className="size-4 text-white" />
                    <span className="text-white font-medium">Add Comment</span>
                    {showCommentForm ? (
                      <ChevronUp className="size-4 text-white" />
                    ) : (
                      <ChevronDown className="size-4 text-white" />
                    )}
                  </button>
                </div>
                {showCommentForm && (
                  <CommentForm
                    commentFunction={commentFunction}
                    loading={addCommentLoading}
                    closeForm={() => setShowCommentForm(false)}
                  />
                )}

                {showComments && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    {comments.length === 0 ? (
                      <div className="text-center py-12">
                        <MessageCircle className="size-12 text-white/30 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">
                          No comments yet
                        </h3>
                        <p className="text-white/60 text-sm">
                          Be the first to share your thoughts on this post!
                        </p>
                      </div>
                    ) : (
                      [...comments]
                        .reverse()
                        .map((comment, index) => (
                          <CommentCard
                            editCommentPost={editCommentPost}
                            isEditLoading={isEditLoading}
                            key={comment.id}
                            comment={comment}
                            index={index}
                          />
                        ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Post;
