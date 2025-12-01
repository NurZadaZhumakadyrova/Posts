import AlbumsProvider from '@/providers/AlbumsProvider.tsx';
import { Outlet } from 'react-router-dom';

const AlbumsLayout = () => {
  return (
    <AlbumsProvider>
      <Outlet />
    </AlbumsProvider>
  );
};

export default AlbumsLayout;
