import { useState } from 'react';
import EmptyAlbumImages from '@/components/empties/emptyAlbumImages.tsx';
import image1 from '@/assets/1.jpg';
import image2 from '@/assets/2.jpg';
import image3 from '@/assets/3.jpg';
import image4 from '@/assets/4.jpg';
import image5 from '@/assets/5.jpg';
import image6 from '@/assets/6.jpg';
import image7 from '@/assets/7.jpg';
import image8 from '@/assets/8.jpg';
import image9 from '@/assets/9.jpg';
import image10 from '@/assets/10.jpg';
import image11 from '@/assets/11.jpg';
import image12 from '@/assets/12.jpg';
import image13 from '@/assets/13.jpg';
import image14 from '@/assets/14.jpg';
import image15 from '@/assets/15.jpg';
import AlbumImageCard from '@/components/cards/albumImageCard.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { FolderPlus } from 'lucide-react';
import PhotoForm from '@/components/forms/photoForm.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { getRandom } from '@/utils';
import { useAddPhoto, useAlbum, usePhotos } from '@/app/hooks';
import { useNavigate, useParams } from '@tanstack/react-router';
import type { ApiPhoto } from '@/types/photoTypes.ts';
import AlertGlobal from '@/components/alert/alert.tsx';
import ErrorAlert from '@/components/alert/errorAlert.tsx';

const UserAlbumPhotos = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isAddPhotoAlert, setIsAddPhotoAlert] = useState<boolean>(false);
  const [isErrorAlert, setIsErrorAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userId, albumId } = useParams({ from: '/users/$userId/albums/$albumId' });
  const { data: album } = useAlbum(Number(albumId));
  const { data: images, isPending: loading } = usePhotos(Number(albumId));
  const addPhotoMutation = useAddPhoto();
  const photos = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
  ];

  if (images && images.length === 0) {
    return (
      <EmptyAlbumImages
        emptyFunction={() => navigate({ to: `/users/${userId}/albums` })}
      />
    );
  }

  if (images) {
    images.map((image) => {
      image.url = getRandom(photos);
    });
  }

  const photoFunction = (newPhoto: ApiPhoto) => {
    newPhoto.albumId = Number(albumId);
    addPhotoMutation.mutate(newPhoto, {
      onSuccess: () => {
        setIsModal(false);
        setTimeout(() => {
          setIsAddPhotoAlert(true);
        }, 500);
        setTimeout(() => {
          setIsAddPhotoAlert(false);
        }, 3500);
      },
      onError: () => {
        setIsModal(false);
        setTimeout(() => {
          setIsErrorAlert(true);
        }, 500);
        setTimeout(() => {
          setIsErrorAlert(false);
        }, 3500);
      },
    });
  };

  return album && (
    <>
      {isAddPhotoAlert && <AlertGlobal type='addPhoto' />}
      {isErrorAlert && <ErrorAlert message="Failed to add photo. Please try again." type="addPhoto" />}
      {isModal && <PhotoForm openModal={isModal} onOpenChange={() => setIsModal(false)} loading={addPhotoMutation.isPending} photoFunction={photoFunction}/>}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Spinner className="size-8 text-white"/>
          <p className="text-white/60">Loading user album #{album.id} photos...</p>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {Number(userId) === 1 && (
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsModal(true)}
                  variant="outline"
                  className="bg-transparent text-white cursor-pointer [@media(max-width:480px)]:hidden"
                >
                  Add photo
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
                      <FolderPlus className="size-5"/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="">
                    <p>Add photo</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight capitalize text-center">
                {album.title}
              </h1>
              <div className="flex justify-center py-3">
                <div className="h-1 w-[30%] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"/>
              </div>
            </div>
          </div>
          <div
            className=" grid grid-cols-1 sm:grid-cols-2 [@media(min-width:730px)_and_(max-width:1024px)]:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-5">
            {images && images.map((photo) => (
              <AlbumImageCard key={photo.id} photo={photo} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserAlbumPhotos;
