import styles from '../styles/Home.module.css';
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
        src="https://media.licdn.com/dms/image/v2/D4D03AQHZT1Nq5ncR5Q/profile-displayphoto-shrink_800_800/B4DZOceIYUHgAc-/0/1733496965288?e=1757548800&v=beta&t=ntug2Y_Vfocs_FcRNV1-Z0X9-y6vkeWfNYACXLlvSPo"
        alt="profile image"
      />
      <div>
        <h1 className={styles.aboutTitle}>{greeting}</h1>
        <p className={styles.aboutText}>{about}</p>
      </div>
    </section>
  );
}