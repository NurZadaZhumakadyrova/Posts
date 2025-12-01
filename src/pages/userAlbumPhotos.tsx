import { useEffect, useState } from 'react';
import type { IAlbum, IPhoto } from '@/types/albumTypes.ts';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyAlbumImages from '@/components/empties/emptyAlbumImages.tsx';
import { useAlbumContext } from '@/useContexts/useContextAlbums.ts';
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
import { getRandom } from '@/utils/getRandom.ts';

const UserAlbumPhotos = () => {
  const [images, setImages] = useState<IPhoto[]>([]);
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const navigate = useNavigate();
  const { getAlbumPhotos, getUserAlbum } = useAlbumContext();
  const { idAlbum, userId } = useParams();
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

  useEffect(() => {
    const fetchImages = async () => {
      if (idAlbum) {
        const dataAlbumPhotos = await getAlbumPhotos(Number(idAlbum));
        const dataAlbum = await getUserAlbum(Number(idAlbum));
        setImages(dataAlbumPhotos);
        setAlbum(dataAlbum);
      }
    };
    void fetchImages();
  }, [getAlbumPhotos, getUserAlbum, idAlbum]);

  if (images.length === 0) {
    return (
      <EmptyAlbumImages
        emptyFunction={() => navigate(`/users/${userId}/albums`)}
      />
    );
  }

  images.map((image) => {
    image.url = getRandom(photos);
  });

  return (
    album && (
      <div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight capitalize text-center">
            {album.title}
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 my-5">
          {images.map((photo) => (
            <AlbumImageCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    )
  );
};

export default UserAlbumPhotos;
