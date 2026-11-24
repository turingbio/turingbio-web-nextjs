import Image from 'next/image';
import Link from 'next/link';
import { getCopy, siteLabels, type Locale } from './site-copy';
import Entrance from './entrance';
import ProjectHelix from './project-helix';
import styles from './company-sections.module.css';

const links = ['crm', 'company', 'project', 'capabilities'];

function SectionHeading({ id, eyebrow, title, body, reveal = true }: {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  reveal?: boolean;
}) {
  return (
    <div className={styles.sectionHeading} data-reveal={reveal ? '' : undefined}>
      <div>
        <p className={styles.eyebrow} hidden={!eyebrow}>{eyebrow}</p>
        <h2 id={id} tabIndex={-1}>{title}</h2>
      </div>
      {body && <p>{body}</p>}
    </div>
  );
}

function Company({ locale }: { locale: Locale }) {
  const [title, body, ...disciplines] = getCopy('Company', locale, true);
  const name = siteLabels[locale].companyName;
  return (
    <section id="company" className={styles.company} aria-labelledby="company-title">
      <div className={`container ${styles.companyInner}`}>
        <div className={styles.companyCopy}>
          <SectionHeading id="company-title" eyebrow="" title={title} />
          <p>{body.startsWith(name) ? <><strong>{name}</strong>{body.slice(name.length)}</> : body}</p>
          <ul className={styles.disciplines}>
            {disciplines.map(label => <li key={label} data-reveal="">{label}</li>)}
          </ul>
        </div>
        <div className={styles.companyArt} aria-hidden="true" data-reveal="">
          {['default', 'evidence', 'privacy'].map(state => (
            <Image key={state} src={`/images/company-visual-${state}.webp`} alt="" fill sizes="(max-width: 760px) 100vw, 46vw" />
          ))}
        </div>
      </div>
    </section>
  );
}

function Origin({ locale }: { locale: Locale }) {
  const origin = getCopy('Origin', locale, true);
  const products = [
    { title: origin[2], subtitle: '', body: origin[3], tags: origin.slice(4, 6) },
    { title: origin[6], subtitle: origin[7], body: origin[8], tags: origin.slice(9, 11) },
    { title: origin[11], subtitle: origin[12], body: origin[13], tags: origin.slice(14, 16) },
  ];
  return (
    <section className={styles.section} aria-labelledby="origin-title">
      <div className="container">
        <SectionHeading id="origin-title" eyebrow="ORIGIN TECHNOLOGY" title={origin[0]} body={origin[1]} />
        <div className={styles.products}>
          {products.map(({ title, subtitle, body, tags }, index) => (
            <article className={styles.product} key={title} data-reveal="">
              <span className={styles.cardIndex}>{['DIGITAL THERAPEUTICS', 'COUNSELING PLATFORM', 'CONVERSATIONAL AI'][index]}</span>
              <h3>{index === 0 ? 'DTx' : title}</h3>
              {(index === 0 || subtitle) && <p className={styles.productSubtitle}>{index === 0 ? title : subtitle}</p>}
              <p className={styles.productBody}>{body}</p>
              <ul className={styles.tags}>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function History({ locale }: { locale: Locale }) {
  const history = getCopy('History', locale, true);
  const milestones = [
    { date: '2024.07', title: history[2], description: history[3] },
    { date: '2024.09', title: history[4], description: history[5] },
    {
      date: '2024.11',
      title: siteLabels[locale].gmpTitle,
      description: siteLabels[locale].gmpDescription,
    },
    {
      date: '2025.02',
      title: siteLabels[locale].researchTitle,
      description: history[6],
    },
    { date: '2026.07', title: history[7], description: history[8] },
  ];
  return (
    <section className={`${styles.section} ${styles.history}`} aria-labelledby="history-title">
      <div className="container">
        <Entrance className={styles.historyHeading}>
          <SectionHeading id="history-title" eyebrow="HISTORY" title={history[0]} body={history[1]} reveal={false} />
        </Entrance>
        <Entrance className={styles.historyTimeline}>
          <ol className={styles.milestones}>
            {milestones.map(({ date, title, description }) => (
              <li key={date}>
                <time dateTime={date.replace('.', '-')}>{date}</time>
                <h3>{title}</h3>
                {description && <p>{description}</p>}
              </li>
            ))}
          </ol>
        </Entrance>
      </div>
    </section>
  );
}

function Method({ locale }: { locale: Locale }) {
  const method = getCopy('Method', locale, true);
  return (
    <section className={styles.section} aria-labelledby="method-title">
      <div className="container">
        <SectionHeading id="method-title" eyebrow="HOW WE WORK" title={method[0]} body={method[1]} />
        <ol className={styles.steps}>
          {[2, 4, 6, 8].map((index, step) => (
            <li key={index} data-reveal="">
              <div className={styles.stepNumber}>0{step + 1}</div>
              <span className={styles.stepLabel} lang="en">{['DISCOVER', 'DESIGN', 'BUILD', 'OPERATE'][step]}</span>
              <h3>{method[index]}</h3>
              <p>{method[index + 1]}</p>
            </li>
          ))}
        </ol>
        <div className={styles.areaStrip} data-reveal="">
          <span className={styles.stepLabel} lang="en">BUSINESS AREAS</span>
          <ul className={styles.areas}>
            {method.slice(10).map(label => <li key={label}>{label}<span aria-hidden="true">→</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Project({ locale }: { locale: Locale }) {
  const [title, body] = getCopy('Project', locale, true);
  return (
    <section id="project" className={`${styles.section} ${styles.project}`} aria-labelledby="project-title">
      <Entrance className={`container ${styles.projectEntrance}`}>
        <SectionHeading id="project-title" eyebrow="FLAGSHIP PROJECT  /  K-BEAUTY AX" title={title} body={body} reveal={false} />
      </Entrance>
      <ProjectHelix />
    </section>
  );
}

function Capabilities({ locale }: { locale: Locale }) {
  const capabilities = getCopy('Capabilities', locale, true);
  const previews = ['company-visual-evidence', 'capability-visual-prediction', 'company-visual-privacy'];
  return (
    <section id="capabilities" className={`${styles.section} ${styles.capabilities}`} aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading id="capabilities-title" eyebrow="WHAT WE BUILD NEXT" title={capabilities[0]} />
        <ol className={styles.capabilityRows}>
          {previews.map((image, index) => (
            <li key={image} data-reveal="">
              <span className={styles.rowIndex}>0{index + 1}</span>
              <h3>{capabilities[index * 2 + 1]}</h3>
              <p>{capabilities[index * 2 + 2]}</p>
              <Image alt="" src={`/images/${image}.webp`} width={230} height={172} className={styles.preview} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const footer = getCopy('Footer', locale);
  const labels = getCopy('Header', locale);
  const hoursStart = footer[8].lastIndexOf(' (');
  const phone = hoursStart < 0 ? footer[8] : footer[8].slice(0, hoursStart);
  const hours = hoursStart < 0 ? '' : footer[8].slice(hoursStart);
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <a href={`/${locale}/`} aria-label="TuringBio">
              <Image src="/images/turingbio-logo.webp" alt="TuringBio" width={676} height={132} />
            </a>
            <p className={styles.eyebrow}>AI TRANSFORMATION PARTNER</p>
          </div>
          <nav aria-label={siteLabels[locale].footerNav}>
            <h2>MENU</h2>
            <ul>{links.map((id, index) => <li key={id}><a href={`#${id}`}>{labels[index]}</a></li>)}</ul>
          </nav>
          <div className={styles.footerInfo}>
            <h2>COMPANY</h2>
            <dl>
              <div><dt>{footer[0]}</dt><dd>{footer[1]}</dd></div>
              <div><dt>{footer[2]}</dt><dd>{footer[3]}</dd></div>
              <div><dt>{footer[4]}</dt><dd>344-87-01744</dd></div>
              <div><dt>{footer[5]}</dt><dd>{footer[6]}</dd></div>
              <div><dt>{footer[7]}</dt><dd><a href="tel:+82316077560">{phone}</a>{hours}</dd></div>
              <div><dt>{footer[9]}</dt><dd><a href="mailto:info@turingbio.com">info@turingbio.com</a></dd></div>
            </dl>
          </div>
        </div>
        <div className={styles.footerBase}>
          <p>© 2026 TuringBio, Inc. All rights reserved.</p>
          <nav aria-label={siteLabels[locale].languageNav}>
            <Link href="/ko/" hrefLang="ko" lang="ko" aria-current={locale === 'ko' ? 'page' : undefined}>한국어</Link>
            <span aria-hidden="true">/</span>
            <Link href="/en/" hrefLang="en" lang="en" aria-current={locale === 'en' ? 'page' : undefined}>English</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default function CompanySections({ locale }: { locale: Locale }) {
  return (
    <>
      <Company locale={locale} />
      <Origin locale={locale} />
      <History locale={locale} />
      <Method locale={locale} />
      <Project locale={locale} />
      <Capabilities locale={locale} />
    </>
  );
}
