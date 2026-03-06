import type { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  bottomNav?: ReactNode;
}

export default function PhoneMockup({ children, bottomNav }: PhoneMockupProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="relative">
        {/* iPhone frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl p-3">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

          {/* Screen */}
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10 flex items-center justify-between px-6 pt-2">
              <span className="text-xs font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-3"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-label="Battery"
                  role="img"
                >
                  <path
                    d="M1 5.5C1 3.567 2.567 2 4.5 2h7C13.433 2 15 3.567 15 5.5v1c0 1.933-1.567 3.5-3.5 3.5h-7C2.567 10 1 8.433 1 6.5v-1z"
                    fill="currentColor"
                  />
                  <path
                    d="M15.5 4.5v3c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Scrollable content — bottom inset accounts for bottom nav if present */}
            <div
              className="absolute top-11 left-0 right-0 overflow-y-auto"
              style={{ bottom: bottomNav ? "56px" : "0px" }}
            >
              {children}
            </div>

            {/* Fixed bottom navigation bar — sits above the scroll area */}
            {bottomNav && (
              <div className="absolute bottom-0 left-0 right-0 z-20">
                {bottomNav}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
