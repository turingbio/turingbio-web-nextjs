'use client';

import { useEffect } from 'react';

// Signal fields stretch with preserveAspectRatio="none" so the dots stay on the stretched lines.
// This counter-scales each dot horizontally so circles keep their shape.
export default function SignalAspect() {
  useEffect(() => {
    const fields = Array.from(document.querySelectorAll<SVGSVGElement>('svg[data-signal-field]'));
    const update = () => {
      for (const svg of fields) {
        const box = svg.viewBox.baseVal;
        const { width, height } = svg.getBoundingClientRect();
        if (!width || !height || !box.width || !box.height) continue;
        svg.style.setProperty('--signal-sx', String((height / box.height) / (width / box.width)));
      }
    };
    update();
    const observer = new ResizeObserver(update);
    fields.forEach(svg => observer.observe(svg));
    return () => observer.disconnect();
  }, []);

  return null;
}
