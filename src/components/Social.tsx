import { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/Social.module.css';
import homeStyles from '../styles/Home.module.css';
import type { SocialItem, IconMap } from '../types';

interface Props {
  title: string;
  items: SocialItem[];
  iconMap: IconMap;
}

function normalizeHref(url: string, iconKey?: string) {
  const trimmed = url.trim();
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:')) {
    return trimmed;
  }
  if (trimmed.includes('@') || iconKey === 'Gmail') {
    return `mailto:${trimmed}`;
  }
  return `https://${trimmed}`;
}

export default function Social({ title, items, iconMap }: Props) {
  const { theme } = useTheme();

  return (
    <section className={`${homeStyles.cardAtributes} ${theme === 'light' ? styles.socialSectionLight : styles.socialSectionDark}`}>
      <h2 className={styles.socialTitle}>{title}</h2>
      <div className={styles.socialLinks}>
        {items.map((item) => {
          const iconKey = (item.icon ?? item.label) as keyof typeof iconMap;
          const IconComponent = iconMap[iconKey];
          const href = normalizeHref(item.url, String(iconKey));

          return (
            <a
              key={`${item.label}-${item.url}`}
              href={href}
              className={`${styles.socialLink} ${theme === 'light' ? styles.socialLinkLight : styles.socialLinkDark}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              title={item.label}
            >
              <div className={`${styles.iconWrapper} ${theme === 'light' ? styles.light : styles.dark}`}>
                {IconComponent && <IconComponent theme={theme} size={24} />}
              </div>
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
