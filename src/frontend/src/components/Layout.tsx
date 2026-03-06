import { Outlet, useRouterState } from "@tanstack/react-router";
import Header from "./Header";

export default function Layout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Splash and Login pages are full-screen — no header/footer wrapper
  const isFullScreen = currentPath === "/" || currentPath === "/login";

  if (isFullScreen) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-6 mt-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Kollect Lite. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with <span className="text-red-500">♥</span> using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-dark hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
