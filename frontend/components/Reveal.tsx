"use client";

import { type ReactNode } from "react";
import { useInView } from "./useInView";

/** Fades + slides its children up as they scroll into view — used on CELO landing sections. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
      aria-hidden={!inView}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
