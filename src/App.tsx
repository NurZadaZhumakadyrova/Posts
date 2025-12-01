import './App.css';
import Layout from '@/components/layouts/layout.tsx';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '@/pages/allPosts.tsx';
import NotFound from '@/pages/notFound.tsx';
import UsersLayout from '@/components/layouts/usersLayout.tsx';
import User from '@/pages/user.tsx';
import AllUsers from '@/pages/allUsers.tsx';
import UserPosts from '@/pages/userPosts.tsx';
import UserAlbums from '@/pages/userAlbums.tsx';
import UserPost from '@/pages/userPost.tsx';
import Post from '@/pages/post.tsx';
import UserAlbumPhotos from '@/pages/userAlbumPhotos.tsx';
import TodosLayout from '@/components/layouts/todosLayout.tsx';
import AlbumsLayout from '@/components/layouts/albumsLayout.tsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/users" element={<UsersLayout />}>
          <Route path="" element={<AllUsers />} />
          <Route path=":userId" element={<User />}>
            <Route path="" element={<UserPosts />} />
            <Route path="posts/:idPost" element={<UserPost />} />
            <Route path="todos" element={<TodosLayout />} />
            <Route path="albums" element={<AlbumsLayout />}>
              <Route path="" element={<UserAlbums />} />
              <Route path=":idAlbum" element={<UserAlbumPhotos />} />
            </Route>
          </Route>
        </Route>
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
