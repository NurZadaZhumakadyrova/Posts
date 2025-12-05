import React, { useEffect, useState } from 'react';
import type { IAlbum } from '@/types/albumTypes.ts';
import { Folder, Image, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import EditAlbum from '@/components/forms/editAlbum.tsx';
import AlertGlobal from '@/components/alert/alert.tsx';
import ConfirmModal from '@/components/modal/confirmModal.tsx';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useDeleteAlbum } from '@/app/hooks';

interface Props {
  album: IAlbum;
  editLoading: boolean;
  editAlbumFunction: (album: IAlbum) => void;
}

const UserAlbumCard: React.FC<Props> = ({ album, editLoading, editAlbumFunction }) => {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isDeleteAlbumAlert, setIsDeleteAlbumAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isEditForm, setIsEditForm] = useState<boolean>(false);
  const { userId } = useParams({ from: '/users/$userId' });
  const { mutate: deleteAlbumMutation, isPending: deleteAlbumLoading } = useDeleteAlbum();

  useEffect(() => {
    const closeForm = () => setIsEditForm(false);
    if (editLoading) setTimeout(closeForm, 1000);
  }, [editLoading]);

  const deleteAlbumFunction = async () => {
    deleteAlbumMutation(album.id, {
      onSuccess: () => {
        setIsDeleteModal(false);
        setTimeout(() => {
          setIsDeleteAlbumAlert(true);
        }, 1000);

        setTimeout(() => {
          setIsDeleteAlbumAlert(false);
        }, 3000);
      },
    });
  };

  return (
    <>
      {isDeleteAlbumAlert && <AlertGlobal type='deleteAlbum'/>}
      {isDeleteModal &&
        <ConfirmModal
          open={isDeleteModal}
          onOpenChange={() => setIsDeleteModal(false)}
          deleteFunctions={() => deleteAlbumFunction()}
          type={'album'}
          albumLoading={deleteAlbumLoading}
        />}
      <div
        className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/30 p-4 transition-all duration-300 cursor-pointer">
        <div
          className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-yellow-500/[0.05] group-hover:via-orange-500/[0.05] group-hover:to-yellow-500/[0.05] transition-all duration-300 pointer-events-none"/>
        <div className="relative">
          {isEditForm ? (
            <EditAlbum album={album} editAlbumFunction={editAlbumFunction} isEditLoading={editLoading} closeEditForm={() => setIsEditForm(false)}/>
          ) : (
            <div className="flex items-start gap-3 mb-2" onClick={() => navigate({ to: `/users/${userId}/albums/${album.id}` })}>
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 shrink-0">
                <Folder className="size-4 text-yellow-300"/>
              </div>
              <div className="flex-1">
                <h3
                  className="text-white text-base font-semibold capitalize group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-200 group-hover:to-orange-200 transition-all mr-15 line-clamp-1">
                  {album.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <Image className="size-3 text-white/40"/>
                  <p className="text-white/60 text-xs">Album #{album.id}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!isEditForm && (Number(userId) === 1) && (
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 ml-1">
            <Button
              onClick={() => setIsEditForm(true)}
              variant="outline"
              size="icon"
              type="button"
              className="size-7 mr-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              <Pencil className="size-4"/>
            </Button>
            <Button
              onClick={() => setIsDeleteModal(true)}
              variant="outline"
              size="icon"
              type="button"
              className="size-7 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
            >
              <X className="size-4"/>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAlbumCard;
