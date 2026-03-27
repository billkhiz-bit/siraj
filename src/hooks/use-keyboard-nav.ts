"use client";

import { useEffect, useRef } from "react";

export interface KeyboardNavOptions<T> {
  items: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onConfirm?: (item: T) => void;
  onEscape?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  enabled?: boolean;
}

/**
 * Keyboard navigation hook for 3D data views.
 *
 * - Left/Right arrows: cycle through items
 * - Up/Down arrows: zoom in/out
 * - Enter: confirm/drill into selected item
 * - Escape: deselect
 */
export function useKeyboardNav<T>({
  items,
  selectedIndex,
  onSelect,
  onConfirm,
  onEscape,
  onZoomIn,
  onZoomOut,
  enabled = true,
}: KeyboardNavOptions<T>) {
  const optionsRef = useRef({
    items,
    selectedIndex,
    onSelect,
    onConfirm,
    onEscape,
    onZoomIn,
    onZoomOut,
  });

  useEffect(() => {
    optionsRef.current = {
      items,
      selectedIndex,
      onSelect,
      onConfirm,
      onEscape,
      onZoomIn,
      onZoomOut,
    };
  });

  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      const {
        items,
        selectedIndex,
        onSelect,
        onConfirm,
        onEscape,
        onZoomIn,
        onZoomOut,
      } = optionsRef.current;

      // Don't capture if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowRight": {
          e.preventDefault();
          const next = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
          onSelect(next);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const prev = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
          onSelect(prev);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          onZoomIn?.();
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          onZoomOut?.();
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < items.length) {
            onConfirm?.(items[selectedIndex]);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          onEscape?.();
          break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);
}
