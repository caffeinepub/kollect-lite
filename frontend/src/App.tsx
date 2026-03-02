import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import TaskQueue from './pages/TaskQueue';
import CaseDetail from './pages/CaseDetail';
import Splash from './pages/Splash';
import Login from './pages/Login';

// Splash route (no layout wrapper — full screen)
const rootRoute = createRootRoute({
  component: Layout,
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Splash,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: TaskQueue,
});

const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/case/$caseId',
  component: CaseDetail,
});

const routeTree = rootRoute.addChildren([splashRoute, loginRoute, tasksRoute, caseDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
