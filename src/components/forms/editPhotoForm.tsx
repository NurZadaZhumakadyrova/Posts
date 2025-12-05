import React, { useState } from 'react';
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
import { Image as ImageIcon, Link as LinkIcon, Paperclip, Save, Type } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import type { IPhoto } from '@/types/photoTypes.ts';

interface Props {
  openModal: boolean;
  onOpenChange: () => void;
  loading: boolean;
  photo: IPhoto;
  editPhotoFunction: (photo: IPhoto) => void;
}

const EditPhotoForm: React.FC<Props> = ({ openModal, onOpenChange, loading, photo, editPhotoFunction }) => {
  const [formData, setFormData] = useState<IPhoto>(photo);

  const handelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      url: fileUrl,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editPhotoFunction(formData);
  };

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] text-white overflow-hidden border-0 p-0">
        <div className="relative rounded-2xl bg-gradient-to-br from-black/70 via-black/80 to-black/70 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-purple-500/[0.03] to-pink-500/[0.03] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative">
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <DialogTitle
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  Edit Photo
                </DialogTitle>
              </div>
              <DialogDescription className="text-white/60 text-sm">
                Update the photo title.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 pb-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-white/90 flex items-center gap-2 font-medium">
                  <ImageIcon className="size-4 text-purple-300"/>
                  Current Image
                </Label>
                <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40 border border-white/20">
                  <img
                    src={formData.url}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <Type className="size-4 text-purple-300"/>
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handelChange}
                  placeholder="Enter photo title..."
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="url"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <Paperclip className="size-4 text-purple-300"/>
                  Image URL
                </Label>
                <Input
                  id="url"
                  name="url"
                  type="file"
                  onChange={handleFileChange}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="thumbnailUrl"
                  className="text-white/90 flex items-center gap-2 font-medium"
                >
                  <LinkIcon className="size-4 text-purple-300"/>
                  Thumbnail URL
                </Label>
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  type="text"
                  value={(formData.url).split('/').reverse()[0]}
                  onChange={handelChange}
                  placeholder="Enter thumbnail URL..."
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400 h-11"
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
                  <Spinner className="mr-2"/>
                ) : (
                  <Save className="mr-2 size-4"/>
                )}
                Update
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPhotoForm;
