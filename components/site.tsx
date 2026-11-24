import Image from 'next/image';
import content from '@/i18n-ko-en.json';
import Header from './header';
import CompanySections, { SiteFooter } from './company-sections';
import styles from './site.module.css';

type Locale = 'ko' | 'en';

const clean = (value: string) => value.replace(/\s*\n\s*/g, ' ').trim();

function Pairs({ entries }: { entries: string[] }) {
  return entries.filter((_, index) => index % 2 === 0).map((title, index) => (
    <article key={title}><h3>{title}</h3><p>{entries[index * 2 + 1]}</p></article>
  ));
}

function SectionHeading({ id, label, title, description }: {
  id: string; label: string; title: string; description: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div><p className={styles.kicker}>{label}</p><h2 id={id + '-title'} tabIndex={-1}>{title}</h2></div>
      <p>{description}</p>
    </div>
  );
}

export default function Site({ locale }: { locale: Locale }) {
  const read = (section: string) => content.rows.filter(row => row.section === section).map(row => clean(row[locale]));
  const hero = read('Hero');
  const crm = read('CRM');
  const rag = read('RAG');
  const trust = read('Trust');

  return (
    <>
      <Header locale={locale} labels={read('Header')} />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <h1 id="hero-title">{hero[0]}<br /><span>{hero[1]}</span></h1>
            <p>{hero[2]}</p>
          </div>
          <div className={styles.signal} aria-hidden="true"><i /><i /><i /></div>
          <ul className={styles.signatures} aria-label={locale === 'ko' ? '핵심 기술' : 'Core technologies'}>
            <li>CUSTOMER DATA PLATFORM</li><li>GENERATIVE AI · RAG</li><li>PREDICTIVE ANALYTICS</li><li>CUSTOMER OPERATIONS</li>
          </ul>
        </section>
        <section className={styles.credentials} aria-label={locale === 'ko' ? '주요 이력' : 'Credentials'}>
          <div className="container"><Pairs entries={read('Credentials')} /></div>
        </section>
        <section id="crm" className={styles.crm} aria-labelledby="crm-title">
          <div className="container">
            <SectionHeading id="crm" label="CUSTOMER DATA · CRM" title={crm[0]} description={crm[1]} />
            <div className={styles.diagram}>
              <div className={styles.endpoints}><Pairs entries={crm.slice(2, 8)} /></div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.hub}>
                <h3>{crm[8]}</h3>
                <Pairs entries={crm.slice(9, 15)} />
              </div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.endpoints}><Pairs entries={crm.slice(15, 21)} /></div>
            </div>
            <div className={styles.three}><Pairs entries={crm.slice(21)} /></div>
          </div>
        </section>
        <section id="rag" className={styles.rag} aria-labelledby="rag-title">
          <div className="container">
            <SectionHeading id="rag" label="GENERATIVE AI · RAG" title={rag[0]} description={rag[1]} />
            <div className={styles.ragPanel}>
              <div><h3>{rag[2]}</h3><ul>{content.rows.filter(row => row.section === 'RAG')[3][locale].split('\n').map(item => <li key={item}>{item}</li>)}</ul></div>
              <div className={styles.ragArt}><Image src="/images/rag-neural.webp" alt="" fill sizes="(max-width: 767px) 100vw, 60vw" /></div>
            </div>
            <div className={`${styles.three} ${styles.stages}`}><Pairs entries={rag.slice(4)} /></div>
          </div>
        </section>
        <section className={styles.trust} aria-labelledby="trust-title">
          <div className="container">
            <SectionHeading id="trust" label="DATA SECURITY PRINCIPLES" title={trust[0]} description={trust[1]} />
            <div className={styles.trustGrid}><Pairs entries={trust.slice(2)} /></div>
          </div>
        </section>
        <CompanySections locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
