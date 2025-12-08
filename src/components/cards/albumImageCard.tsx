import React, { useState } from 'react';
import type { IPhoto } from '@/types/photoTypes.ts';
import { ImageIcon, Trash2, Pencil } from 'lucide-react';
import ConfirmModal from '@/components/modal/confirmModal.tsx';
import AlertGlobal from '@/components/alert/alertGlobal.tsx';
import EditPhotoForm from '@/components/forms/editPhotoForm.tsx';
import { useParams } from '@tanstack/react-router';
import { useUpdatePhoto, useDeletePhoto } from '@/app/hooks';

interface Props {
  photo: IPhoto;
}

const AlbumImageCard: React.FC<Props> = ({ photo }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteAlert, setIsDeleteAlert] = useState<boolean>(false);
  const [isEditAlert, setIsEditAlert] = useState<boolean>(false);
  const { userId } = useParams({ from: '/users/$userId' });
  const { mutate: deletePhotoMutation, isPending: deleteLoading } = useDeletePhoto();
  const { mutate: editPhotoMutation, isPending: editLoading } = useUpdatePhoto();

  const deletePhoto = async () => {
    deletePhotoMutation(photo.id, {
      onSuccess: () => {
        setTimeout(() => {
          setIsDeleteAlert(true);
          setIsModal(false);
        }, 1000);

        setTimeout(() => {
          setIsDeleteAlert(false);
        }, 3000);
      },
    });
  };

  const editPhoto = (updatedPhoto: IPhoto) => {
    editPhotoMutation(updatedPhoto, {
      onSuccess: () => {
        setIsEditModal(false);
        setTimeout(() => {
          setIsEditAlert(true);
        }, 500);
        setTimeout(() => {
          setIsEditAlert(false);
        }, 3500);
      },
    });
  };

  if (!photo) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/50">
        <ImageIcon className="size-16"/>
        <span className="text-sm">Image not found</span>
      </div>
    );
  }

  return photo && (
    <>
      {isDeleteAlert && <AlertGlobal type='deletePhoto'/>}
      {isEditAlert && <AlertGlobal type='editPhoto'/>}
      {isModal && <ConfirmModal open={isModal} onOpenChange={() => setIsModal(false)} type='photo' deleteFunctions={() => deletePhoto()} photoLoading={deleteLoading}/>}
      {isEditModal && <EditPhotoForm openModal={isEditModal} onOpenChange={() => setIsEditModal(false)} loading={editLoading} photo={photo} editPhotoFunction={editPhoto} />}
      <div
        className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
        <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover transition-all duration-300 "
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"/>
          {Number(userId) === 1 && (
            <div
              className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-5px] group-hover:translate-y-0">
              <button
                onClick={() => setIsEditModal(true)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all"
              >
                <Pencil
                  className="size-4 transition-all text-white"
                />
              </button>
              <button
                onClick={() => setIsModal(true)}
                className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all"
              >
                <Trash2 className="size-4 text-white"/>
              </button>
            </div>
          )}
          <div
            className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 capitalize leading-relaxed">
              {photo.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                  Photo #{photo.id}
                </div>
              </div>
              <div className="text-white/60 text-xs">
                Album {photo.albumId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumImageCard;
