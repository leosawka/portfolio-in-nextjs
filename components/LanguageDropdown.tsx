import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import styles from '../styles/LanguageDropdown.module.css';

const options: { code: 'en' | 'es'; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '/flags/English_language.svg' },
  { code: 'es', label: 'Español', flag: '/flags/Spanish_language.svg' },
];

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleSelect = (code: 'en' | 'es') => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setOpen(!open)} className={styles.dropdownButton}>
        <img
          src={options.find((opt) => opt.code === language)?.flag}
          alt={language}
          className={styles.flag}
        />
        {options.find((opt) => opt.code === language)?.label}
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((opt) => (
            <div key={opt.code} className={styles.item} onClick={() => handleSelect(opt.code)}>
              <img src={opt.flag} alt={opt.label} className={styles.flag} />
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
