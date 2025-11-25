import React, { useState } from 'react';
import { MessageCircle, Send, Type } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { IComment } from '@/types.ts';

interface Props {
  editCommentPost: (editCommit: IComment) => void;
  comment: IComment;
  closeEditForm: () => void;
  isEditLoading: boolean;
}

const EditCommentForm: React.FC<Props> = ({
  comment,
  editCommentPost,
  closeEditForm,
  isEditLoading,
}) => {
  const [editComment, setEditComment] = useState<IComment>(comment);

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editCommentPost(editComment);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2 w-[100%]">
            <Label
              htmlFor="name"
              className="text-white/90 flex items-center gap-2"
            >
              <Type className="size-4 text-purple-300" />
              Title
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={editComment.name}
              onChange={onChangeFormData}
              placeholder="Title"
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 w-[100%]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="body"
            className="text-white/90 flex items-center gap-2"
          >
            <MessageCircle className="size-4 text-purple-300" />
            Comment
          </Label>
          <Textarea
            id="body"
            name="body"
            value={editComment.body}
            onChange={onChangeFormData}
            placeholder="Write your comment here..."
            required
            rows={4}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button
            onClick={closeEditForm}
            type="button"
            variant="outline"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isEditLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
          >
            {isEditLoading ? (
              <Spinner className="mr-2" />
            ) : (
              <Send className="mr-1 size-4" />
            )}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCommentForm;
