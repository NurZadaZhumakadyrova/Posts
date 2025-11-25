import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import type { ApiPost } from '@/types.ts';
import { Spinner } from '@/components/ui/spinner.tsx';
import { FileEdit, Send, Sparkles, Type, FileText } from 'lucide-react';

interface Props {
  openModal: boolean;
  onOpenChange: (open: boolean) => void;
  postFunction: (userPost: ApiPost) => void;
  loading?: boolean;
  editPost?: ApiPost;
  isEdit?: boolean;
}

const initialState: ApiPost = {
  title: '',
  body: '',
  userId: 0,
};

const PostFormModal: React.FC<Props> = ({
  openModal,
  editPost = initialState,
  postFunction,
  loading,
  onOpenChange,
  isEdit,
}) => {
  const [formData, setFormData] = useState<ApiPost>(editPost);

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postFunction({ ...formData });

    if (!isEdit) {
      setFormData(initialState);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/20">
                  {isEdit ? (
                    <FileEdit className="size-6 text-purple-300" />
                  ) : (
                    <Sparkles className="size-6 text-purple-300" />
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  {isEdit ? 'Edit Post' : 'Create New Post'}
                </DialogTitle>
              </div>

              <DialogDescription className="text-white/60 text-sm">
                {isEdit
                  ? 'Make changes to your post below.'
                  : 'Fill in the details to create a new post.'}
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <Type className="size-4 text-purple-300" />
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handelChange}
                  placeholder="Enter an engaging title..."
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="body"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <FileText className="size-4 text-pink-300" />
                  Content
                </Label>
                <Textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handelChange}
                  placeholder="Share your thoughts and ideas..."
                  required
                  rows={8}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t border-white/10 flex gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
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
                {isEdit ? 'Save Changes' : 'Create Post'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormModal;
