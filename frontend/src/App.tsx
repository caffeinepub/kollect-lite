import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import Layout from './components/Layout';
import TaskQueue from './pages/TaskQueue';
import CaseDetail from './pages/CaseDetail';
import LandingPage from './pages/LandingPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TaskQueue,
});

const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/case/$caseId',
  component: CaseDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, caseDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-teal/20 border-t-teal mx-auto" />
          <p className="text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <RouterProvider router={router} />;
}
