import { useNavigate } from '@tanstack/react-router';
import { LogOut, User } from 'lucide-react';

export default function TaskQueueHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate({ to: '/login' });
  };

  return (
    <div className="bg-header-deep relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -right-8 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-6 w-44 h-44 rounded-full bg-white/[0.03]" />
      </div>

      {/* Main header content */}
      <div className="relative px-5 pt-6 pb-5 flex items-stretch justify-between gap-4">
        {/* LEFT: Brand block */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-black tracking-tight text-white uppercase leading-none">
              KOLLECT
            </span>
            <span className="text-[26px] font-black tracking-tight text-header-accent uppercase leading-none">
              LITE
            </span>
          </div>
          <p className="text-[10px] text-header-muted font-medium tracking-[0.14em] uppercase mt-1.5">
            Recovery. One Tap Away.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-white/15 self-stretch mx-1" />

        {/* RIGHT: User info + logout */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* User avatar circle */}
          <div className="w-10 h-10 rounded-full bg-header-accent/20 border border-header-accent/40 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-header-accent" />
          </div>

          {/* Name + ID */}
          <div className="flex flex-col items-start min-w-0">
            <span className="text-[14px] font-bold text-white leading-tight truncate">
              John Doe
            </span>
            <span className="text-[10px] text-header-muted font-mono leading-tight tracking-wide">
              USR-12345
            </span>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-1 flex items-center gap-1.5 px-2.5 py-2 rounded-md bg-white/10 hover:bg-white/20 active:bg-white/25 transition-colors border border-white/10 flex-shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5 text-header-muted" />
            <span className="text-[10px] text-header-muted font-medium">Out</span>
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-[2px] bg-gradient-to-r from-header-accent/60 via-header-accent/30 to-transparent" />
    </div>
  );
}
