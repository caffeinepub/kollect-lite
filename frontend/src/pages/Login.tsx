import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    navigate({ to: '/tasks' });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <PhoneMockup>
        <div className="min-h-full login-gradient flex flex-col items-center justify-center px-5 py-10">
          {/* Logo + Wordmark */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-full border-2 border-brand-teal flex items-center justify-center bg-white/70">
              <svg width="24" height="24" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="22" x2="16" y2="22" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" />
                <line x1="28" y1="22" x2="40" y2="22" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="4" x2="22" y2="16" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" />
                <line x1="22" y1="28" x2="22" y2="40" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 14 L10 10 L14 10" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M30 10 L34 10 L34 14" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M10 30 L10 34 L14 34" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M34 30 L34 34 L30 34" stroke="#1E6FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="22" cy="22" r="2.5" fill="#1E6FBF" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="text-brand-dark">Kollect </span>
              <span className="text-brand-teal">Lite</span>
            </span>
          </div>

          {/* Login Card */}
          <div className="w-full bg-white rounded-2xl shadow-login px-6 py-7">
            <h2 className="text-2xl font-bold text-brand-dark mb-1">Welcome back</h2>
            <p className="text-brand-muted text-xs mb-6">Sign in to continue your recovery journey</p>

            {/* Error message */}
            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                {error}
              </div>
            )}

            {/* Email field */}
            <div className="mb-3.5">
              <label className="block text-xs font-medium text-brand-dark mb-1.5">
                Email or Username
              </label>
              <input
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-brand-dark placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-colors"
              />
            </div>

            {/* Password field */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-brand-dark mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl border border-gray-200 bg-gray-50 text-brand-dark placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-teal transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    rememberMe ? 'bg-brand-teal border-brand-teal' : 'bg-white border-gray-300'
                  }`}
                >
                  {rememberMe && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs text-brand-muted">Remember me</span>
              </label>
              <button
                type="button"
                className="text-xs text-brand-teal font-medium hover:underline"
                onClick={() => {/* no-op for UI preview */}}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-brand-teal text-white font-bold text-sm tracking-wide hover:bg-brand-teal-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Log In
              <span className="text-base leading-none">→</span>
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-[10px] text-brand-muted flex items-center gap-1">
            Built with <span className="text-red-400">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </PhoneMockup>
    </div>
  );
}
