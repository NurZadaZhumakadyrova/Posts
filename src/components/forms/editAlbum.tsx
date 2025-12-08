import React from 'react';
import { Label } from '@/components/ui/label.tsx';
import { Send, Type } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { IAlbum } from '@/types/albumTypes.ts';
import { useForm } from 'react-hook-form';
import FormErrorAlert from '@/components/alert/formErrorAlert.tsx';

interface Props {
  editAlbumFunction: (album: IAlbum) => void;
  album: IAlbum;
  closeEditForm: () => void;
  isEditLoading: boolean;
}

const EditAlbum:React.FC<Props> = ({ editAlbumFunction, album, isEditLoading, closeEditForm }) => {
  const { register, handleSubmit, formState: { errors }, clearErrors,  } = useForm<IAlbum>({
    defaultValues: { ...album },
  });

  const albumSubmit = (data: IAlbum) => {
    editAlbumFunction({ ...data });

    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(albumSubmit)} className="space-y-2">
        <div className="space-y-2 w-[100%]">
          <Label
            htmlFor="name"
            className="text-white/90 flex items-center gap-2"
          >
            <Type className="size-4 text-purple-300"/>
            Title
          </Label>
          <Input
            type="text"
            { ...register('title', { required: 'Title is a required field!' }) }
            placeholder="Title"
            className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 w-[100%]"
          />
        </div>
        {errors.title && <FormErrorAlert
          title={errors.title.message ?? ''}
          message='Please fill in this field'
        />}
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
              <Spinner className="mr-2"/>
            ) : (
              <Send className="mr-1 size-4"/>
            )}
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAlbum;