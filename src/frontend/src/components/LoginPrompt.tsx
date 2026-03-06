import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPrompt() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-teal-pill border-2 border-teal-pill-border flex items-center justify-center mb-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kollect Lite logo"
          role="img"
        >
          <line
            x1="4"
            y1="22"
            x2="16"
            y2="22"
            stroke="#1E6FBF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="28"
            y1="22"
            x2="40"
            y2="22"
            stroke="#1E6FBF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="22"
            y1="4"
            x2="22"
            y2="16"
            stroke="#1E6FBF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="22"
            y1="28"
            x2="22"
            y2="40"
            stroke="#1E6FBF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="22" cy="22" r="2.5" fill="#1E6FBF" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-brand-dark mb-2">
        Sign in to continue
      </h2>
      <p className="text-sm text-brand-muted mb-6 max-w-[260px]">
        Access your collection queue and manage cases securely.
      </p>
      <button
        type="button"
        onClick={login}
        disabled={isLoggingIn}
        className="px-8 py-3 rounded-xl bg-brand-teal text-white font-bold text-sm hover:bg-brand-teal-hover active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {isLoggingIn ? "Signing in..." : "Sign In"}
      </button>
    </div>
  );
}
