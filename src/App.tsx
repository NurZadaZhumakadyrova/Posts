import './App.css';
import Layout from '@/components/layout/layout.tsx';
import Navbar from '@/components/navbar/navbar.tsx';
import Footer from '@/components/footer/footer.tsx';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '@/components/pages/allPosts.tsx';
import { usePostContext } from '@/useContext.ts';
import NotFound from '@/components/pages/notFound.tsx';
import UsersLayout from '@/components/pages/usersLayout.tsx';
import User from '@/components/pages/user.tsx';
import AllUsers from '@/components/pages/allUsers.tsx';
import UserPosts from '@/components/pages/userPosts.tsx';
import UserTodos from '@/components/pages/userTodos.tsx';
import UserAlbums from '@/components/pages/userAlbums.tsx';
import UserPost from '@/components/pages/userPost.tsx';
import Post from '@/components/pages/post.tsx';

const App = () => {
  const { posts } = usePostContext();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<AllPosts posts={posts} />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/users" element={<UsersLayout />}>
            <Route path="" element={<AllUsers />} />
            <Route path=":id" element={<User />}>
              <Route path="" element={<UserPosts />} />
              <Route path="posts/:idPost" element={<UserPost />} />
              <Route path="todos" element={<UserTodos />} />
              <Route path="albums" element={<UserAlbums />} />
            </Route>
          </Route>
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
};

export default App;
