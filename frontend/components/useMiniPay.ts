"use client";

import { useEffect, useState } from "react";
import { useConnect, useAccount } from "wagmi";

/**
 * Detect MiniPay environment and auto-connect the injected wallet.
 *
 * MiniPay injects `window.ethereum` with `isMiniPay = true`. When detected,
 * the user has no manual connect step — the wallet is already available.
 *
 * @returns `isMiniPay` — true when running inside the MiniPay wallet browser.
 */
export function useMiniPay(): { isMiniPay: boolean } {
  const [isMiniPay, setIsMiniPay] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const ethereum = (window as Window & { ethereum?: { isMiniPay?: boolean } }).ethereum;
    if (!ethereum?.isMiniPay) return;

    setIsMiniPay(true);

    // Auto-connect injected wallet — MiniPay already approved the dapp.
    if (!isConnected) {
      const injected = connectors[0];
      if (injected) connect({ connector: injected });
    }
  }, [connect, connectors, isConnected]);

  return { isMiniPay };
}
