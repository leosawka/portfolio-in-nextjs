import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  greeting: string;
  about: string;
}

export default function About({ greeting, about }: Props) {
  const { theme } = useTheme();

  return (
    <section className={`${styles.aboutSection} ${styles.cardAtributes} ${theme === 'light' ? styles.aboutLight : styles.aboutDark}`}>
      <img
        className={theme === 'light' ? styles.aboutSectionCardImgLight : styles.aboutSectionCardImgDark}
        src="/profile/profile.jpg"
        alt="profile image"
      />
      <div>
        <h1 className={styles.aboutTitle}>{greeting}</h1>
        <p className={styles.aboutText}>{about}</p>
      </div>
    </section>
  );
}