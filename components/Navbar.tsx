import styles from '../styles/Navbar.module.css';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <nav className={styles.navbar}>
        <div className={styles.left}>
            <h1>Portfolio</h1>
        </div>
        <div id={styles.toolbar}>
            <div className={styles.right}>
                <button onClick={toggleTheme} id={styles.darkmode}>
                    <img
                        src={theme === 'light' ? '/moon.svg' : '/sun.svg'}
                        alt={theme === 'light' ? 'Dark mode' : 'Light mode'}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
            <LanguageDropdown />
        </div>
    </nav>
  );
}
