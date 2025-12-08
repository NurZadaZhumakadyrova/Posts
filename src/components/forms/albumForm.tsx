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
import { Send, Type } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { ApiAlbum } from '@/types/albumTypes.ts';
import { Input } from '@/components/ui/input.tsx';
import { useForm } from 'react-hook-form';
import FormErrorAlert from '@/components/alert/formErrorAlert.tsx';

interface Props {
  openModal: boolean;
  onOpenChange: () => void;
  loading: boolean;
  albumFunction: (album: ApiAlbum) => void;
}

const initialState: ApiAlbum = {
  userId: 0,
  title: '',
};

const AlbumForm:React.FC<Props> = ({ openModal,  onOpenChange, albumFunction, loading }) => {
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm<ApiAlbum>({
    defaultValues: { ...initialState },
  });

  const albumSubmit = (data: ApiAlbum) => {
    albumFunction({ ...data });

    if (Object.keys(errors).length > 0) {
      clearErrors();
    }

    reset({ ...initialState });
  };

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />

          <form onSubmit={handleSubmit(albumSubmit)} className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  Create New Album
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/60 text-sm">
                Fill in the details to create a new album.
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
                  { ...register( 'title', { required: 'Task is a required field!' }) }
                  placeholder="Enter an album title..."
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>
              {errors.title && <FormErrorAlert
                title={errors.title.message ?? ''}
                message='Please fill in this field'
              />}
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumForm;