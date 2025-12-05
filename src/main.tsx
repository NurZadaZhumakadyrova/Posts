import { createRoot } from 'react-dom/client';
import './index.css';
import UserProvider from '@/providers/UserProvider.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/queryClient.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </QueryClientProvider>
);
