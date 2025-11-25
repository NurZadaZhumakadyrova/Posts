import { Mail, MessageCircle, Send, Sparkles, Type } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { ApiComment } from '@/types.ts';
import React, { useState } from 'react';

interface Props {
  commentFunction: (comment: ApiComment) => void;
  loading: boolean;
  closeForm: () => void;
}

const initialState: ApiComment = {
  postId: 0,
  name: '',
  email: '',
  body: '',
};

const CommentForm: React.FC<Props> = ({
  commentFunction,
  loading,
  closeForm,
}) => {
  const [formData, setFormData] = useState(initialState);

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentFunction(formData);
    setFormData(initialState);
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="size-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Share Your Thoughts</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
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
              value={formData.name}
              onChange={onChangeFormData}
              placeholder="Title"
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-white/90 flex items-center gap-2"
            >
              <Mail className="size-4 text-purple-300" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChangeFormData}
              placeholder="your@email.com"
              required
              className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400"
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
            value={formData.body}
            onChange={onChangeFormData}
            placeholder="Write your comment here..."
            required
            rows={4}
            className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button
            onClick={closeForm}
            type="button"
            variant="outline"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
          >
            {loading ? (
              <Spinner className="mr-2" />
            ) : (
              <Send className="mr-2 size-4" />
            )}
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
