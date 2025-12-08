import { Mail, MessageCircle, Send, Sparkles, Type } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import React from 'react';
import type { ApiComment, IComment } from '@/types/commentTypes.ts';
import { useForm } from 'react-hook-form';
import FormErrorAlert from '@/components/alert/formErrorAlert.tsx';

interface Props {
  commentFunction: (comment: ApiComment | IComment) => void;
  addLoading?: boolean;
  editLoading?: boolean;
  closeForm: () => void;
  isEdit?: boolean;
  comment?: IComment | ApiComment;
}

const initialState: ApiComment = {
  postId: 0,
  name: '',
  email: '',
  body: '',
};

const CommentForm: React.FC<Props> = ({
  commentFunction,
  addLoading,
  editLoading,
  closeForm,
  comment = initialState,
  isEdit
}) => {
  const { register, reset, handleSubmit, formState: { errors }, clearErrors } = useForm<ApiComment>({
    defaultValues: { ...comment },
  });

  const handleCommentSubmit = (data: ApiComment) => {
    commentFunction({ ...data });
    if (!isEdit) {
      reset({ ...initialState });
    }

    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  return (
    <div className={`${!isEdit && 'mt-6 pt-6 border-t border-white/10'}`}>
      <form onSubmit={handleSubmit(handleCommentSubmit)} className="space-y-4">
        {!isEdit && (
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="size-5 text-white"/>
            </div>
            <h3 className="text-xl font-bold text-white">Share Your Thoughts</h3>
          </div>
        )}
        <div className={`grid ${isEdit ? 'md:grid-cols-1' : 'md:grid-cols-2'}  gap-4`}>
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-white/90 flex items-center gap-2"
            >
              <Type className="size-4 text-purple-300"/>
              Title
            </Label>
            <Input
              type="text"
              {  ...register('name', { required: 'Comment title is a required field!' })}
              placeholder="Title"
              className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
          {errors.name && <FormErrorAlert
            title={errors.name.message ?? ''}
            message='Please fill in this field'
          />}
          {!isEdit && (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-white/90 flex items-center gap-2"
                >
                  <Mail className="size-4 text-purple-300"/>
                  Email
                </Label>
                <Input
                  type="email"
                  {...register('email', { required: 'Email is a required field!' })}
                  placeholder="your@email.com"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              {errors.email && <FormErrorAlert
                title={errors.email.message ?? ''}
                message="Please fill in this field"
              />}
            </>
          )}
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="body"
            className="text-white/90 flex items-center gap-2"
          >
            <MessageCircle className="size-4 text-purple-300"/>
            Comment
          </Label>
          <Textarea
            {...register('body', { required: 'Text of the comment is a required field!' })}
            placeholder="Write your comment here..."
            rows={4}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
          />
        </div>
        {errors.body && <FormErrorAlert
          title={errors.body.message ?? ''}
          message='Please fill in this field'
        />}
        <div className="flex gap-3 justify-end pt-2">
          <Button
            onClick={() => {
              closeForm();
              if (Object.keys(errors).length > 0) {
                clearErrors();
              }
            }}
            type="button"
            variant="outline"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={addLoading || editLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
          >
            {addLoading || editLoading ? (
              <Spinner className="mr-2" />
            ) : (
              <Send className="mr-2 size-4" />
            )}
            {!isEdit ? 'Add comment' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
