"use client";

import { useMiniPay } from "./useMiniPay";

/**
 * Shows a contextual banner when the app is opened inside MiniPay,
 * confirming the wallet is active and the user is ready to play.
 */
export function MiniPayBanner() {
  const { isMiniPay } = useMiniPay();
  if (!isMiniPay) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300 border-b border-emerald-500/20"
    >
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
      Running in MiniPay — wallet connected automatically.
    </div>
  );
}
