import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';

export default function LoginPrompt() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-dark flex items-center justify-center mx-auto mb-4">
          <img src="/assets/generated/kollect-logo.dim_64x64.png" alt="Kollect Lite" className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kollect Lite</h1>
        <p className="text-gray-600 mb-6">Debt Collection Portal</p>
        <p className="text-sm text-gray-500 mb-6">Please log in to access your cases</p>
        <Button onClick={login} disabled={isLoggingIn} className="w-full bg-teal-dark hover:bg-teal-darker">
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </div>
  );
}
