'use client';

import { useEffect } from 'react';

// Adds data-entered to every [data-reveal] element as it scrolls into view.
// html[data-motion] gates the hidden start state, so the page stays readable
// when this never runs or when the reader asked for reduced motion.
export default function Reveal() {
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    document.documentElement.dataset.motion = '';

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const seen = new Map<Element, number>();
    for (const item of items) {
      const parent = item.parentElement;
      if (!parent) continue;
      const index = seen.get(parent) ?? 0;
      if (index) item.style.setProperty('--reveal-i', String(index));
      seen.set(parent, index + 1);
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.entered = '';
        observer.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return null;
}
