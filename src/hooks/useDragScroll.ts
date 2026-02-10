/**
 * useDragScroll — PC drag-to-scroll with inertia
 *
 * Enables mouse-drag scrolling on the page (like mobile touch scrolling).
 * Attaches to `window` level events so it works globally.
 *
 * Safety: ignores drags that start on interactive elements (button, input,
 * select, textarea, a, label, [role=button], [role=slider]) or inside
 * elements with `data-no-drag-scroll` attribute, so normal UI interactions
 * are not affected.
 *
 * v0.5.2: Initial implementation with momentum/inertia scrolling.
 */
import { useEffect, useRef } from 'react';

/** Elements that should not trigger drag-scroll */
const INTERACTIVE_TAGS = new Set([
  'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A', 'LABEL',
]);

function isInteractive(el: EventTarget | null): boolean {
  if (!el || !(el instanceof HTMLElement)) return false;
  let node: HTMLElement | null = el;
  while (node) {
    if (INTERACTIVE_TAGS.has(node.tagName)) return true;
    const role = node.getAttribute('role');
    if (role === 'button' || role === 'slider') return true;
    if (node.hasAttribute('data-no-drag-scroll')) return true;
    // Stop at body
    if (node === document.body) break;
    node = node.parentElement;
  }
  return false;
}

export function useDragScroll(): void {
  const dragging = useRef(false);
  const startY = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      // Only left button, skip interactive elements
      if (e.button !== 0) return;
      if (isInteractive(e.target)) return;

      dragging.current = true;
      startY.current = e.clientY;
      lastY.current = e.clientY;
      lastTime.current = Date.now();
      velocity.current = 0;
      cancelAnimationFrame(rafId.current);

      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;

      const now = Date.now();
      const dy = lastY.current - e.clientY;
      const dt = now - lastTime.current;

      if (dt > 0) {
        // Exponential moving average for smooth velocity
        velocity.current = 0.8 * (dy / dt) + 0.2 * velocity.current;
      }

      window.scrollBy(0, dy);
      lastY.current = e.clientY;
      lastTime.current = now;
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;

      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // Inertia scroll
      let v = velocity.current * 16; // px per frame (~16ms)
      const friction = 0.95;
      const minV = 0.5;

      const tick = () => {
        if (Math.abs(v) < minV) return;
        window.scrollBy(0, v);
        v *= friction;
        rafId.current = requestAnimationFrame(tick);
      };

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);
}
