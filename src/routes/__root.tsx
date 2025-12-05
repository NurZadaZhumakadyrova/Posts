import Layout from '@/components/layouts/layout';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import NotFound from '@/pages/notFound.tsx';

const RootComponent = () => {
  return (
    <Layout>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools
        position="bottom-right" />}
    </Layout>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});


