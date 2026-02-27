import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from './ui/button';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPrompt() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Card */}
        <div className="bg-charcoal-card border border-white/8 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-teal/15 border border-teal/30 flex items-center justify-center mb-5 shadow-teal-lg">
              <img
                src="/assets/generated/kollect-lite-logo.dim_256x256.png"
                alt="Kollect Lite"
                className="w-14 h-14 object-contain"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              Kollect Lite
            </h1>
            <p className="text-slate-400 text-sm text-center leading-relaxed">
              Debt Collection Portal
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/6 mb-8" />

          {/* Welcome text */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">Welcome back</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sign in to access your case queue and manage collections.
            </p>
          </div>

          {/* Login button */}
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full bg-teal hover:bg-teal-light text-charcoal font-bold py-3 rounded-xl shadow-teal-lg transition-all duration-200 hover:scale-[1.02] active:scale-100 gap-2 text-sm"
          >
            {isLoggingIn ? (
              <>
                <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign In with Internet Identity
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-5 text-slate-500 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-teal/70" />
            <span>Secured by Internet Identity</span>
          </div>
        </div>

        {/* Footer attribution */}
        <p className="text-center text-slate-600 text-xs mt-6 flex items-center justify-center gap-1">
          Built with{' '}
          <span className="text-teal text-xs">♥</span>{' '}
          using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:text-teal-light transition-colors font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
