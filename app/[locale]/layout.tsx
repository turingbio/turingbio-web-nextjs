import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'ko' && locale !== 'en') notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
