import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import PhoneMockup from "../components/PhoneMockup";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/tasks" });
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <PhoneMockup>
        <div className="min-h-full bg-splash-bg flex flex-col items-center justify-center px-6 py-12">
          {/* Animated crosshair logo */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer ring - slow pulse */}
            <div className="absolute w-40 h-40 rounded-full border border-teal-ring opacity-60 animate-ring-pulse" />
            {/* Middle ring */}
            <div className="absolute w-28 h-28 rounded-full border border-teal-ring opacity-80 animate-ring-pulse-delay" />
            {/* Inner circle with crosshair */}
            <div className="relative w-20 h-20 rounded-full border-2 border-teal-ring flex items-center justify-center bg-white/40 animate-crosshair-spin">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Kollect Lite crosshair logo"
                role="img"
              >
                <line
                  x1="4"
                  y1="22"
                  x2="16"
                  y2="22"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="28"
                  y1="22"
                  x2="40"
                  y2="22"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="4"
                  x2="22"
                  y2="16"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <line
                  x1="22"
                  y1="28"
                  x2="22"
                  y2="40"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M10 14 L10 10 L14 10"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M30 10 L34 10 L34 14"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M10 30 L10 34 L14 34"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M34 30 L34 34 L30 34"
                  stroke="#1E6FBF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="22" cy="22" r="2.5" fill="#1E6FBF" />
              </svg>
            </div>
          </div>

          {/* App name */}
          <div className="text-center mb-3">
            <h1 className="text-5xl font-black tracking-tight leading-none">
              <span className="text-brand-dark">Kollect </span>
              <span className="text-brand-teal">Lite</span>
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-base text-brand-muted font-normal tracking-wide mb-10">
            Recovery. One Tap Away.
          </p>

          {/* Feature pills */}
          <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-xl bg-teal-pill text-brand-teal text-xs font-semibold tracking-widest uppercase border border-teal-pill-border">
              Light
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-teal-pill-mid text-brand-teal text-xs font-bold tracking-widest uppercase border border-teal-pill-border">
              Convenient
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-teal-pill text-brand-teal text-xs font-semibold tracking-widest uppercase border border-teal-pill-border">
              Secure
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-12">
            <div className="w-8 h-1 rounded-full bg-brand-teal animate-progress-bar" />
            <div className="w-4 h-1 rounded-full bg-teal-pill-border" />
          </div>
        </div>
      </PhoneMockup>
    </div>
  );
}
