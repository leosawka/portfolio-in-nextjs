import { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/Social.module.css';
import homeStyles from '../styles/Home.module.css';

interface SocialItem {
  label: string;
  url: string;
  icon: string;
}

interface Props {
  title: string;
  items: SocialItem[];
  iconMap: Record<string, FC<{ theme: 'light' | 'dark'; size?: number }>>;
}

export default function Social({ title, items, iconMap }: Props) {
  const { theme } = useTheme();

  return (
    <section className={`${homeStyles.cardAtributes} ${theme === 'light' ? styles.socialSectionLight : styles.socialSectionDark}`}>
      <h2 className={styles.socialTitle}>{title}</h2>
      <div className={styles.socialLinks}>
        {items.map((item) => {
          const IconComponent = iconMap[item.label];
          return (
            <a
              key={item.label}
              href={item.url}
              className={`${styles.socialLink} ${theme === 'light' ? styles.socialLinkLight : styles.socialLinkDark}`}
              target="_blank"
              rel="noopener noreferrer"
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
