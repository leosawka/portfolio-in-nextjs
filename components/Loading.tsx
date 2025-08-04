import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/Loading.module.css';

export default function Loading() {
  const [percentage, setPercentage] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const shadowStyle =
    theme === 'light'
      ? '8px 8px 4px 1px rgba(14, 18, 49, 0.493)'
      : '8px 8px 4px 1px rgba(155, 155, 155, 0.493)';

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderBox} style={{ boxShadow: shadowStyle }}>
        <span className={styles.loaderText}>{percentage}%</span>
      </div>
    </div>
  );
}
