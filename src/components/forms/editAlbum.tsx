import React, { useState } from 'react';
import { Label } from '@/components/ui/label.tsx';
import { Send, Type } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { IAlbum } from '@/types/albumTypes.ts';

interface Props {
  editAlbumFunction: (album: IAlbum) => void;
  album: IAlbum;
  closeEditForm: () => void;
  isEditLoading: boolean;
}

const EditAlbum:React.FC<Props> = ({ editAlbumFunction, album, isEditLoading, closeEditForm }) => {
  const [editAlbumForm, setEditAlbumForm] = useState<IAlbum>(album);

  const onChangeFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditAlbumForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAlbumFunction(editAlbumForm);
  };
  return (
    <div className="w-full">
      <form onSubmit={handleCommentSubmit} className="space-y-2">
        <div className="space-y-2 w-[100%]">
          <Label
            htmlFor="name"
            className="text-white/90 flex items-center gap-2"
          >
            <Type className="size-4 text-purple-300"/>
            Title
          </Label>
          <Input
            id="name"
            type="text"
            name="title"
            value={editAlbumForm.title}
            onChange={onChangeFormData}
            placeholder="Title"
            required
            className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 w-[100%]"
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