import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '@/components/site';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const ko = locale === 'ko';
  const title = ko ? '튜링바이오' : 'TuringBio';
  const description = ko
    ? '튜링바이오의 CRM과 생성형 AI 사업을 소개합니다.'
    : 'Explore TuringBio’s work in CRM and generative AI.';
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
      images: [{ url: '/images/turing-logo.png', alt: 'TuringBio' }],
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
