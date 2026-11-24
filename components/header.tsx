'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './site.module.css';

const anchors = ['crm', 'company', 'project', 'capabilities'];

export default function Header({ locale, labels, navigationLabel, openLabel, closeLabel }: {
  locale: 'ko' | 'en'; labels: string[]; navigationLabel: string; openLabel: string; closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      document.getElementById('menu-toggle')?.focus();
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled}>
      <div className={styles.headerInner}>
        <a href={`/${locale}/`} aria-label="TuringBio">
          <Image src="/images/turingbio-logo.webp" alt="TuringBio" width={676} height={132} preload />
        </a>
        <div className={styles.controls}>
          {(['ko', 'en'] as const).map(language => (
            <a key={language} href={`/${language}/`} hrefLang={language} lang={language}
              aria-current={language === locale ? 'page' : undefined}
              onClick={event => {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || !location.hash) return;
                event.preventDefault();
                location.assign(event.currentTarget.href + location.hash);
              }}>{language.toUpperCase()}</a>
          ))}
          <button type="button" id="menu-toggle" aria-expanded={open} aria-controls="primary-nav"
            aria-label={open ? closeLabel : openLabel}
            className={styles.toggle} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
        <nav id="primary-nav" aria-label={navigationLabel} data-open={open}>
          {anchors.map((anchor, index) => <a key={anchor} href={`#${anchor}`} onClick={() => {
            if (!open) return;
            setOpen(false);
            requestAnimationFrame(() => document.getElementById(`${anchor}-title`)?.focus({ preventScroll: true }));
          }}>{labels[index]}</a>)}
        </nav>
      </div>
    </header>
  );
}
