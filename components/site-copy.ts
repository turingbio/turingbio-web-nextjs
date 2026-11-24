import content from '@/i18n-ko-en.json';

export type Locale = keyof typeof content.labels;
export const siteLabels = content.labels;

export function getCopy(section: string, locale: Locale, preserveLineBreaks = false) {
  return content.rows.filter(row => row.section === section).map(row => {
    const text = row[locale].trim();
    return preserveLineBreaks ? text : text.replace(/\s*\n\s*/g, ' ');
  });
}
