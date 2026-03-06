import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import CaseDetail from "./pages/CaseDetail";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import TaskQueue from "./pages/TaskQueue";

// Splash route (no layout wrapper — full screen)
const rootRoute = createRootRoute({
  component: Layout,
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Splash,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tasks",
  component: TaskQueue,
});

const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case/$caseId",
  component: CaseDetail,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  loginRoute,
  tasksRoute,
  caseDetailRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
