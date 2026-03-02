import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate({ to: '/login' });
  };

  return (
    <header className="bg-forest-dark border-b border-forest-medium shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-teal-ring flex items-center justify-center bg-white/10">
              <svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="22" x2="16" y2="22" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" />
                <line x1="28" y1="22" x2="40" y2="22" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="4" x2="22" y2="16" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="28" x2="22" y2="40" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 14 L10 10 L14 10" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M30 10 L34 10 L34 14" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M10 30 L10 34 L14 34" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M34 30 L34 34 L30 34" stroke="#3B8FE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="22" cy="22" r="2.5" fill="#3B8FE8" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Kollect <span className="text-teal-ring">Lite</span>
            </span>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="text-blue-200 hover:text-white hover:bg-white/10 gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
