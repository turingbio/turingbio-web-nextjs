import Image from 'next/image';
import content from '@/i18n-ko-en.json';
import styles from './company-sections.module.css';

type Locale = 'ko' | 'en';

const links = ['crm', 'company', 'project', 'capabilities'];

function getCopy(section: string, locale: Locale) {
  return content.rows
    .filter(row => row.section === section)
    .map(row => row[locale].replace(/\s*\n\s*/g, ' '));
}

function SectionHeading({ id, eyebrow, title, body }: {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} tabIndex={-1}>{title}</h2>
      </div>
      {body && <p>{body}</p>}
    </div>
  );
}

function Company({ locale }: { locale: Locale }) {
  const [title, body, ...disciplines] = getCopy('Company', locale);
  return (
    <section id="company" className={styles.company} aria-labelledby="company-title">
      <div className={`container ${styles.companyInner}`}>
        <div className={styles.companyCopy}>
          <SectionHeading id="company-title" eyebrow="ABOUT TURINGBIO" title={title} />
          <p>{body}</p>
          <ul className={styles.disciplines}>
            {disciplines.map(label => <li key={label}>{label}</li>)}
          </ul>
        </div>
        <div className={styles.companyArt} aria-hidden="true">
          <Image src="/images/company-glass.webp" alt="" width={1400} height={933} sizes="(max-width: 760px) 100vw, 46vw" />
          <Image src="/images/rag-neural.webp" alt="" width={768} height={512} sizes="(max-width: 760px) 100vw, 46vw" />
        </div>
      </div>
    </section>
  );
}

function Origin({ locale }: { locale: Locale }) {
  const origin = getCopy('Origin', locale);
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
            <article className={styles.product} key={title}>
              <span className={styles.cardIndex}>0{index + 1} / MEDICAL AI</span>
              <h3>{title}</h3>
              {subtitle && <p className={styles.productSubtitle}>{subtitle}</p>}
              <p>{body}</p>
              <ul className={styles.tags}>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function History({ locale }: { locale: Locale }) {
  const history = getCopy('History', locale);
  const milestones = [
    { date: '2024.07', title: history[2], description: history[3] },
    { date: '2024.09', title: history[4], description: history[5] },
    {
      date: '2024.11',
      title: locale === 'ko' ? 'SaMD GMP 인증' : 'SaMD GMP certification',
    },
    { date: '2025.02', title: history[6] },
    { date: '2026.07', title: history[7], description: history[8] },
  ];
  return (
    <section className={`${styles.section} ${styles.history}`} aria-labelledby="history-title">
      <div className="container">
        <SectionHeading id="history-title" eyebrow="HISTORY" title={history[0]} body={history[1]} />
        <ol className={styles.milestones}>
          {milestones.map(({ date, title, description }) => (
            <li key={date}>
              <time dateTime={date.replace('.', '-')}>{date}</time>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Method({ locale }: { locale: Locale }) {
  const method = getCopy('Method', locale);
  return (
    <section className={styles.section} aria-labelledby="method-title">
      <div className="container">
        <SectionHeading id="method-title" eyebrow="HOW WE WORK" title={method[0]} body={method[1]} />
        <ol className={styles.steps}>
          {[2, 4, 6, 8].map((index, step) => (
            <li key={index}>
              <span className={styles.stepNumber}>0{step + 1}</span>
              <h3>{method[index]}</h3>
              <p>{method[index + 1]}</p>
            </li>
          ))}
        </ol>
        <ul className={styles.areas}>
          {method.slice(10).map(label => <li key={label}>{label}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Project({ locale }: { locale: Locale }) {
  const title = locale === 'ko' ? '글로벌 K-뷰티 브랜드의 CRM·AX 프로젝트.' : 'CRM and AX in global K-beauty.';
  const body = locale === 'ko'
    ? 'K-뷰티 브랜드의 고객 데이터를 연결하고 고객 경험 개선을 추진하는 프로젝트입니다.'
    : 'An initiative to connect customer data and improve the customer experience for a K-beauty brand.';
  return (
    <section id="project" className={`${styles.section} ${styles.project}`} aria-labelledby="project-title">
      <div className="container">
        <SectionHeading id="project-title" eyebrow="IN PROGRESS  /  K-BEAUTY" title={title} body={body} />
        <div className={styles.projectSignal} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
      </div>
    </section>
  );
}

function Capabilities({ locale }: { locale: Locale }) {
  const capabilities = getCopy('Capabilities', locale);
  const previews = ['data', 'prediction', 'operations'];
  return (
    <section id="capabilities" className={`${styles.section} ${styles.capabilities}`} aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading id="capabilities-title" eyebrow="WHAT WE BUILD NEXT" title={capabilities[0]} />
        <ol className={styles.capabilityRows}>
          {previews.map((image, index) => (
            <li key={image}>
              <span className={styles.rowIndex}>0{index + 1}</span>
              <h3>{capabilities[index * 2 + 1]}</h3>
              <p>{capabilities[index * 2 + 2]}</p>
              <Image alt="" src={`/images/company-${image}.webp`} width={480} height={480} className={styles.preview} />
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
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div>
            <a href={`/${locale}/`} aria-label="TuringBio">
              <Image src="/images/turing-logo.png" alt="TuringBio" width={680} height={140} />
            </a>
            <p className={styles.eyebrow}>AI TRANSFORMATION PARTNER</p>
          </div>
          <nav aria-label={locale === 'ko' ? '하단 메뉴' : 'Footer menu'}>
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
              <div><dt>{footer[7]}</dt><dd><a href="tel:+82316077560">{footer[8]}</a></dd></div>
              <div><dt>{footer[9]}</dt><dd><a href="mailto:info@turingbio.com">info@turingbio.com</a></dd></div>
            </dl>
          </div>
        </div>
        <p className={styles.copyright}>© 2026 TuringBio, Inc. All rights reserved.</p>
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
