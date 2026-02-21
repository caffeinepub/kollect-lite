import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-dark flex items-center justify-center">
              <img src="/assets/generated/kollect-logo.dim_64x64.png" alt="Kollect Lite" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kollect Lite</h1>
              <p className="text-sm text-gray-600">Debt Collection Portal</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
