import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Image as ImageIcon, Paperclip, Send, Type } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { ApiPhoto } from '@/types/photoTypes.ts';
import { useForm, useWatch } from 'react-hook-form';
import FormErrorAlert from '@/components/alert/formErrorAlert.tsx';

interface Props {
  openModal: boolean;
  onOpenChange: () => void;
  loading: boolean;
  photoFunction: (photo: ApiPhoto) => void;
}

const initialState = {
  albumId: 0,
  title: '',
  url: '',
  thumbnailUrl: '',
};

const PhotoForm:React.FC<Props> = ({ openModal, onOpenChange, loading, photoFunction }) => {
  const { handleSubmit, register, setValue, formState: { errors }, clearErrors, control } = useForm<ApiPhoto>({
    defaultValues: { ...initialState },
  });

  const url: string = useWatch({
    control,
    name: 'url',
  });

  const titleField: string = useWatch({
    control,
    name: 'title',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setValue('url', fileUrl);

    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  const photoSubmit = (data: ApiPhoto) => {
    photoFunction({ ...data });

    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />
          <form onSubmit={handleSubmit(photoSubmit)} className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <DialogTitle
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  Create New Photo
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/60 text-sm">
                Fill in the details to create a new photo.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-5 max-h-[50vh] overflow-y-auto">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <Type className="size-4 text-purple-300"/>
                  Title
                </Label>
                <Input
                  type="text"
                  { ...register('title', { required: 'Title is a required field!' }) }
                  placeholder="Enter photo title..."
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>
              {errors.title && <FormErrorAlert
                title={errors.title.message ?? ''}
                message='Please fill in this field'
              />}

              <div className="space-y-2">
                <Label
                  htmlFor="url"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <Paperclip className="size-4 text-purple-300"/>
                  Image URL
                </Label>
                <Input
                  type={url.trim().length > 0 ? 'text' : 'file'}
                  { ...register('url', { required: 'URL is a required field!' }) }
                  value={url.trim().length > 0 ? url.split('/').reverse()[0] : ''}
                  onChange={handleFileChange}
                  placeholder="Enter image URL..."
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>
              {errors.url && <FormErrorAlert
                title={errors.url.message ?? ''}
                message='Please fill in this field'
              />}
              {url.trim().length > 0 && (
                <div className="space-y-2">
                  <Label className="text-white/90 flex items-center gap-2 font-medium">
                    <ImageIcon className="size-4 text-purple-300"/>
                    Image Preview
                  </Label>
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40 border border-white/20">
                    <img
                      src={url}
                      alt={titleField || 'Preview'}
                      className="w-full h-full object-cover"/>
                  </div>
                </div>
              )}
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
                  <Spinner className="mr-2"/>
                ) : (
                  <Send className="mr-2 size-4"/>
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoForm;