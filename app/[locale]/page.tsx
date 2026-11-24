import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '@/components/site';
import { siteLabels } from '@/components/site-copy';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'ko' && locale !== 'en') notFound();
  const { siteTitle: title, siteDescription: description } = siteLabels[locale];
  const ko = locale === 'ko';
  const url = `/${locale}/`;

  return {
    metadataBase: new URL('https://www.turingbio.com'),
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ko: '/ko/', en: '/en/', 'x-default': '/ko/' },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'TuringBio',
      images: [{ url: '/images/turingbio-logo.webp', alt: 'TuringBio' }],
      locale: ko ? 'ko_KR' : 'en_US',
      alternateLocale: ko ? 'en_US' : 'ko_KR',
    },
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (locale !== 'ko' && locale !== 'en') notFound();

  return <Site locale={locale} />;
}
