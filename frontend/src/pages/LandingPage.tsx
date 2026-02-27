import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { 
  FolderOpen, 
  Activity, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FolderOpen,
    title: 'Case Management',
    description: 'Organize and track all your collection cases in one streamlined dashboard. Prioritize by DPD, status, and outstanding balance.',
  },
  {
    icon: Activity,
    title: 'Activity Tracking',
    description: 'Log every interaction, call outcome, and promise-to-pay commitment with a full timestamped audit trail.',
  },
  {
    icon: FileText,
    title: 'Document Handling',
    description: 'Attach, preview, and manage supporting documents directly within each case for faster resolution.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access',
    description: 'Secure, identity-verified access ensures only authorized agents can view and act on sensitive case data.',
  },
];

export default function LandingPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-charcoal text-charcoal-foreground flex flex-col">
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center shadow-teal">
            <img
              src="/assets/generated/kollect-logo.dim_64x64.png"
              alt="Kollect Lite"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Kollect Lite</span>
        </div>
        <Button
          onClick={login}
          disabled={isLoggingIn}
          variant="outline"
          size="sm"
          className="border-teal/40 text-teal hover:bg-teal/10 hover:border-teal hover:text-teal-light transition-all duration-200 font-medium"
        >
          {isLoggingIn ? 'Signing in…' : 'Sign In'}
        </Button>
      </nav>

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1440x900.png')" }}
        />
        <div className="absolute inset-0 bg-charcoal/80" />

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Logo mark */}
          <div className="w-20 h-20 rounded-2xl bg-teal/15 border border-teal/30 flex items-center justify-center mx-auto mb-8 shadow-teal-lg">
            <img
              src="/assets/generated/kollect-lite-logo.dim_256x256.png"
              alt="Kollect Lite"
              className="w-14 h-14 object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 border border-teal/25 text-teal-light text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            Debt Collection Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Collections,{' '}
            <span className="text-teal">simplified.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
            Manage cases, track activities, and close accounts faster — all in one secure, lightweight portal built for modern collection teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="lg"
              className="bg-teal hover:bg-teal-light text-charcoal font-bold px-8 py-3 rounded-xl shadow-teal-lg transition-all duration-200 hover:scale-105 active:scale-100 gap-2 text-base"
            >
              {isLoggingIn ? (
                <>
                  <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
            <p className="text-slate-400 text-sm">
              Secured by Internet Identity
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-charcoal-surface py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Everything you need to collect
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Purpose-built tools that keep your team focused on what matters — closing cases.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-charcoal-card border border-white/6 rounded-2xl p-6 hover:border-teal/40 hover:bg-teal/5 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-teal/15 border border-teal/25 flex items-center justify-center mb-5 group-hover:bg-teal/25 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-teal" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2 tracking-tight">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-charcoal py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-teal/8 border border-teal/20 rounded-3xl px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-slate-400 mb-8 text-base">
              Sign in securely with Internet Identity and access your case queue instantly.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              size="lg"
              className="bg-teal hover:bg-teal-light text-charcoal font-bold px-8 rounded-xl shadow-teal-lg transition-all duration-200 hover:scale-105 active:scale-100 gap-2"
            >
              {isLoggingIn ? 'Signing in…' : 'Sign In Now'}
              {!isLoggingIn && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-surface border-t border-white/6 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-teal/15 flex items-center justify-center">
              <img
                src="/assets/generated/kollect-logo.dim_64x64.png"
                alt="Kollect Lite"
                className="w-4 h-4 object-contain"
              />
            </div>
            <span>© {new Date().getFullYear()} Kollect Lite. All rights reserved.</span>
          </div>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-teal fill-teal" />{' '}
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
      </footer>
    </div>
  );
}
