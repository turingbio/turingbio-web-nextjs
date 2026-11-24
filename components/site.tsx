import Image from 'next/image';
import content from '@/i18n-ko-en.json';
import Header from './header';
import CompanySections, { SiteFooter } from './company-sections';
import SignalField from './signal-field';
import Entrance from './entrance';
import styles from './site.module.css';

type Locale = 'ko' | 'en';

const clean = (value: string) => value.replace(/\s*\n\s*/g, ' ').trim();
const credentialLabels = ['GROUP', 'VENTURE', 'AI PATENT', 'CERTIFICATION', 'GLOBAL R&D'];
const trustLabels = ['MINIMIZE', 'ACCESS CONTROL', 'PSEUDONYMIZE', 'GROUNDED AI'];

function Pairs({ entries, labels }: { entries: string[]; labels?: string[] }) {
  return entries.filter((_, index) => index % 2 === 0).map((title, index) => (
    <article key={title}>
      {labels && <p className={styles.credentialLabel}>{labels[index]}</p>}
      <h3>{title}</h3><p>{entries[index * 2 + 1]}</p>
    </article>
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
  const ko = locale === 'ko';
  const read = (section: string, withLineBreaks = false) => content.rows.filter(row => row.section === section)
    .map(row => withLineBreaks && ko ? row.ko.trim() : clean(row[locale]));
  const hero = read('Hero', true);
  const crm = read('CRM', true);
  const rag = read('RAG', true);
  const trust = read('Trust', true);

  return (
    <>
      <Header locale={locale} labels={read('Header')} />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={styles.heroCopy}>
            {ko && <p className={styles.heroEyebrow}>AI TRANSFORMATION PARTNER</p>}
            <h1 id="hero-title">{ko ? <>
              <strong>고객 데이터</strong>와 <strong>생성형 AI</strong>로,<br />기업의 <strong>AX</strong>를 완성합니다.
            </> : <>{hero[0]}<br /><span>{hero[1]}</span></>}</h1>
            <p>{hero[2]}</p>
          </div>
          {ko && <SignalField hero className={styles.heroSignals} />}
          <ul className={styles.signatures} aria-label={locale === 'ko' ? '핵심 기술' : 'Core technologies'}>
            <li>CUSTOMER DATA PLATFORM</li><li>GENERATIVE AI · RAG</li><li>PREDICTIVE ANALYTICS</li><li>CUSTOMER OPERATIONS</li>
          </ul>
        </section>
        <section className={styles.credentials} aria-label={locale === 'ko' ? '주요 이력' : 'Credentials'}>
          <div className="container"><Pairs entries={read('Credentials')} labels={credentialLabels} /></div>
        </section>
        <section id="crm" className={styles.crm} aria-labelledby="crm-title">
          <div className="container">
            <SectionHeading id="crm" label={ko ? 'CRM  /  CUSTOMER DATA PLATFORM' : 'CUSTOMER DATA · CRM'} title={crm[0]} description={crm[1]} />
            <div className={styles.diagram}>
              {ko && <SignalField className={styles.diagramSignals} />}
              <div className={`${styles.endpoints} ${styles.inputs}`}><Pairs entries={crm.slice(2, 8)} /></div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.hub}>
                <h3>{crm[8]}</h3>
                <Pairs entries={crm.slice(9, 15)} />
              </div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={`${styles.endpoints} ${styles.outputs}`}><Pairs entries={crm.slice(15, 21)} /></div>
            </div>
            <div className={styles.three}><Pairs entries={crm.slice(21)} /></div>
          </div>
        </section>
        <section id="rag" className={styles.rag} aria-labelledby="rag-title">
          <div className="container">
            <SectionHeading id="rag" label={ko ? 'GENERATIVE AI  /  RAG' : 'GENERATIVE AI · RAG'} title={rag[0]} description={rag[1]} />
            <Entrance className={styles.ragPanel}>
              <div>{ko && <p className={styles.ragPanelLabel}>KNOWLEDGE ENGINE</p>}<h3>{rag[2]}</h3><ul>{content.rows.filter(row => row.section === 'RAG')[3][locale].split('\n').map(item => <li key={item}>{item}</li>)}</ul>{ko && <p className={styles.ragPanelSequence} aria-hidden="true">{'01  →  02  →  03'}</p>}</div>
              <div className={styles.ragArt}><Image src="/images/rag-neural.webp" alt="" fill sizes="(max-width: 767px) 100vw, 60vw" /></div>
            </Entrance>
            <Entrance className={`${styles.three} ${styles.stages}`}><Pairs entries={rag.slice(4)} /></Entrance>
          </div>
        </section>
        <section className={styles.trust} aria-labelledby="trust-title">
          <div className="container">
            <SectionHeading id="trust" label={ko ? 'TRUST & SECURITY' : 'DATA SECURITY PRINCIPLES'} title={trust[0]} description={trust[1]} />
            <div className={styles.trustGrid}>
              {trustLabels.map((label, index) => (
                <article key={label}>
                  {ko && <div className={styles.trustMeta} aria-hidden="true">
                    <span>{`0${index + 1}`}</span><span>{label}</span>
                  </div>}
                  <h3>{trust[2 + index * 2]}</h3>
                  <p>{trust[3 + index * 2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <CompanySections locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
