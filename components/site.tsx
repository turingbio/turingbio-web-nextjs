import Image from 'next/image';
import { getCopy, siteLabels, type Locale } from './site-copy';
import Header from './header';
import CompanySections, { SiteFooter } from './company-sections';
import SignalField from './signal-field';
import Entrance from './entrance';
import Reveal from './reveal';
import styles from './site.module.css';

const credentialLabels = ['GROUP', 'VENTURE', 'AI PATENT', 'CERTIFICATION', 'GLOBAL R&D'];
const trustLabels = ['MINIMIZE', 'ACCESS CONTROL', 'PSEUDONYMIZE', 'GROUNDED AI'];

function Pairs({ entries, labels, reveal }: { entries: string[]; labels?: string[]; reveal?: boolean }) {
  return entries.filter((_, index) => index % 2 === 0).map((title, index) => (
    <article key={title} data-reveal={reveal ? '' : undefined}>
      {labels && <p className={styles.credentialLabel}>{labels[index]}</p>}
      <h3>{title}</h3><p>{entries[index * 2 + 1]}</p>
    </article>
  ));
}

function SectionHeading({ id, label, title, description }: {
  id: string; label: string; title: string; description: string;
}) {
  return (
    <div className={styles.sectionHeading} data-reveal="">
      <div><p className={styles.kicker}>{label}</p><h2 id={id + '-title'} tabIndex={-1}>{title}</h2></div>
      <p>{description}</p>
    </div>
  );
}

export default function Site({ locale }: { locale: Locale }) {
  const labels = siteLabels[locale];
  const read = (section: string, preserveLineBreaks = false) => getCopy(section, locale, preserveLineBreaks);
  const emphasize = (line: string) => {
    const pattern = new RegExp('(' + labels.heroEmphasis.join('|') + ')', 'g');
    return line.split(pattern).map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
    );
  };
  const hero = read('Hero', true);
  const crm = read('CRM', true);
  const rag = read('RAG', true);
  const trust = read('Trust', true);

  return (
    <>
      <Header locale={locale} labels={read('Header')} navigationLabel={labels.mainNav} openLabel={labels.menuOpen} closeLabel={labels.menuClose} />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>AI TRANSFORMATION PARTNER</p>
            <h1 id="hero-title">{emphasize(hero[0])}<br />{emphasize(hero[1])}</h1>
            <p>{hero[2]}</p>
          </div>
          <SignalField hero className={styles.heroSignals} />
          <ul className={styles.signatures} aria-label={labels.technologies}>
            <li>CUSTOMER DATA PLATFORM</li><li>GENERATIVE AI · RAG</li><li>PREDICTIVE ANALYTICS</li><li>CUSTOMER OPERATIONS</li>
          </ul>
        </section>
        <section className={styles.credentials} aria-label={labels.credentials}>
          <div className="container"><Pairs entries={read('Credentials')} labels={credentialLabels} reveal /></div>
        </section>
        <section id="crm" className={styles.crm} aria-labelledby="crm-title">
          <div className="container">
            <SectionHeading id="crm" label="CRM  /  CUSTOMER DATA PLATFORM" title={crm[0]} description={crm[1]} />
            <div className={styles.diagram}>
              <SignalField className={styles.diagramSignals} />
              <div className={`${styles.endpoints} ${styles.inputs}`} data-reveal=""><Pairs entries={crm.slice(2, 8)} /></div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={styles.hub} data-reveal="">
                <h3>{crm[8]}</h3>
                <Pairs entries={crm.slice(9, 15)} />
              </div>
              <div className={styles.connector} aria-hidden="true" />
              <div className={`${styles.endpoints} ${styles.outputs}`} data-reveal=""><Pairs entries={crm.slice(15, 21)} /></div>
            </div>
            <div className={styles.three}><Pairs entries={crm.slice(21)} reveal /></div>
          </div>
        </section>
        <section id="rag" className={styles.rag} aria-labelledby="rag-title">
          <div className="container">
            <SectionHeading id="rag" label="GENERATIVE AI  /  RAG" title={rag[0]} description={rag[1]} />
            <Entrance className={styles.ragPanel}>
              <div><p className={styles.ragPanelLabel}>KNOWLEDGE ENGINE</p><h3>{rag[2]}</h3><ul>{rag[3].split('\n').map(item => <li key={item}>{item}</li>)}</ul><p className={styles.ragPanelSequence} aria-hidden="true">{'01  →  02  →  03'}</p></div>
              <div className={styles.ragArt}><Image src="/images/rag-neural.webp" alt="" fill sizes="(max-width: 767px) 100vw, 60vw" /></div>
            </Entrance>
            <Entrance className={`${styles.three} ${styles.stages}`}><Pairs entries={rag.slice(4)} /></Entrance>
          </div>
        </section>
        <section className={styles.trust} aria-labelledby="trust-title">
          <div className="container">
            <SectionHeading id="trust" label="TRUST & SECURITY" title={trust[0]} description={trust[1]} />
            <div className={styles.trustGrid}>
              {trustLabels.map((label, index) => (
                <article key={label} data-reveal="">
                  <div className={styles.trustMeta} aria-hidden="true">
                    <span>{`0${index + 1}`}</span><span>{label}</span>
                  </div>
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
      <Reveal />
    </>
  );
}
