import { Spinner } from '@/components/ui/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import type { IAlbum } from '@/types.ts';
import { usePosts } from '@/useContext.ts';
import { useParams } from 'react-router-dom';
import UserAlbumCard from '@/components/carts/userAlbumCard.tsx';

const UserAlbums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const { getUserAlbums, loading } = usePosts();
  const { id } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      if (id) {
        const data = await getUserAlbums(Number(id));
        setAlbums(data);
      }
    };
    void fetchAlbums();
  }, [getUserAlbums, id]);

  return (
    <>
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
            <Button
              // onClick={() => setIsModal(true)}
              variant="outline"
              className="bg-transparent text-white cursor-pointer ml-2"
            >
              Add new album
            </Button>
          </div>
          {albums.length === 0 ? (
            <p className="text-white/60 text-center py-8">No todos found</p>
          ) : (
            albums.map((album) => (
              <UserAlbumCard key={album.id} album={album} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default UserAlbums;
