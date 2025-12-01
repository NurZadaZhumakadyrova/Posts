import { Spinner } from '@/components/ui/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import type { ApiAlbum, IAlbum } from '@/types/albumTypes.ts';
import { useParams } from 'react-router-dom';
import UserAlbumCard from '@/components/cards/userAlbumCard.tsx';
import { Tooltip, TooltipContent, TooltipTrigger, } from '@/components/ui/tooltip.tsx';
import { FolderPlus } from 'lucide-react';
import { useAlbumContext } from '@/useContexts/useContextAlbums.ts';
import EmptyBlock from '@/components/empties/emptyBlock.tsx';
import AlbumForm from '@/components/forms/albumForm.tsx';
import AlertGlobal from '@/components/alert/alert.tsx';

const UserAlbums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [isAddAlbumAlert, setIsAddAlbumAlert] = useState<boolean>(false);
  const [isEditAlbumAlert, setIsEditAlbumAlert] = useState<boolean>(false);
  const { getUserAlbums, addAlbum, updateAlbum } = useAlbumContext();
  const { userId } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      if (userId) {
        const data = await getUserAlbums(Number(userId));
        setAlbums(data);
      }
      setLoading(false);
    };
    void fetchAlbums();

  }, [getUserAlbums, userId]);
  const addNewAlbum = async (newAlbum: ApiAlbum) => {
    setAddLoading(true);
    newAlbum.userId = Number(userId);
    await addAlbum({ ...newAlbum });
    await getUserAlbums(Number(userId));
    setAddLoading(false);
    setIsModal(false);
    setTimeout(() => {
      setIsAddAlbumAlert(true);
    }, 1000);
  };

  const editAlbumFunction = async (album: IAlbum) => {
    await updateAlbum({ ...album });
    setEditLoading(true);
    await getUserAlbums(Number(userId));
    setTimeout(() => {
      setIsEditAlbumAlert(true);
      setEditLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const closeAlert = () => {
      if (isAddAlbumAlert || isEditAlbumAlert) {
        setTimeout(() => {
          setIsAddAlbumAlert(false);
          setIsEditAlbumAlert(false);
        }, 3000);
      }
    };
    void closeAlert();
  }, [isAddAlbumAlert, isEditAlbumAlert]);


  if (!loading && albums.length === 0) {
    return (
      <EmptyBlock
        title="No Albums"
        text="You're all caught up. New albums will appear here."
        type="album"
      />
    );
  }

  return (
    <>
      {isEditAlbumAlert && <AlertGlobal type='editAlbum'/>}
      {isAddAlbumAlert && <AlertGlobal type='addAlbum'/>}
      {isModal && <AlbumForm openModal={isModal} onOpenChange={() => setIsModal(false)} albumFunction={addNewAlbum} loading={addLoading}/>}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white" />
          <p className="text-white/60">Loading user albums...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-5 flex items-center justify-between">
            <h3 className=" text-white text-3xl font-light tracking-wide">
              My albums
            </h3>
            <div>
              <Button
                onClick={() => setIsModal(true)}
                variant="outline"
                className="bg-transparent text-white cursor-pointer ml-2 [@media(max-width:480px)]:hidden"
              >
                Add new album
              </Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsModal(true)}
                    variant="outline"
                    size="icon"
                    type="button"
                    className="[@media(min-width:481px)]:hidden size-9 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 text-white hover:text-white border-white/20 hover:border-purple-400/40 transition-all"
                  >
                    <FolderPlus className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="">
                  <p>Add new album</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {albums.map((album) => (
            <UserAlbumCard key={album.id} album={album} editAlbumFunction={editAlbumFunction} editLoading={editLoading}/>
          ))}
        </div>
      )}
    </>
  );
};

export default UserAlbums;
