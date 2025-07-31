import { useEffect } from 'react';
import { blendColors } from '../src/utils/blendColors';

export function useBackgroundBlend(theme: 'light' | 'dark') {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1);

      const lightStart = '#ffffff';
      const lightEnd = '#d0eaff';
      const darkStart = '#111111';
      const darkEnd = '#222244';

      const blended = blendColors(
        theme === 'light' ? lightStart : darkStart,
        theme === 'light' ? lightEnd : darkEnd,
        scrollPercent
      );

      document.body.style.backgroundColor = blended;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);
}
