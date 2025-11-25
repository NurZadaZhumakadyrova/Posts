import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import PostsContextProvider from '@/contexts/PostsContextProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <PostsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PostsContextProvider>,
);
