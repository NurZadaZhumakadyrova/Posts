import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import PostsProvider from '@/providers/PostsProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from '@/providers/UserProvider.tsx';
import CommentsProvider from '@/providers/CommentsProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <PostsProvider>
    <UserProvider>
      <CommentsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CommentsProvider>
    </UserProvider>
  </PostsProvider>,
);
