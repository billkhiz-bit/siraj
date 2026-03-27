"use client";

import { useRef, useCallback } from "react";

/**
 * A tooltip overlay that stays visible when the user's mouse moves onto it,
 * preventing the flicker caused by the 3D scene clearing the hover state.
 *
 * Wrap the tooltip content with this. When the mouse enters the tooltip,
 * it calls `onLock()` to keep the hovered item active. When it leaves,
 * `onUnlock()` clears it after a brief delay.
 */
export function StickyTooltip({
  children,
  onLock,
  onUnlock,
  className,
}: {
  children: React.ReactNode;
  onLock: () => void;
  onUnlock: () => void;
  className?: string;
}) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onLock();
  }, [onLock]);

  const handleLeave = useCallback(() => {
    timerRef.current = setTimeout(onUnlock, 200);
  }, [onUnlock]);

  return (
    <div
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
