import { useEffect, useState } from 'react';
import { blendColors } from '../src/utils/blendColors';

export function useBackgroundBlend(theme: 'light' | 'dark') {
  useEffect(() => {
    const getColors = () => {
      return theme === 'light'
        ? ['#d0eaff', '#ffffff']
        : ['#111111', '#222244'];
    };

    const applyBlend = (percent: number) => {
      const [start, end] = getColors();
      const blended = blendColors(start, end, percent);
      const inverse = blendColors(end, start, percent);

      const root = document.documentElement;
      root.style.setProperty('--bg-blend', blended);
      root.style.setProperty('--bg-blend-inverted', inverse);
      document.body.style.backgroundColor = blended;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      applyBlend(scrollPercent);
    };

    applyBlend(0);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [theme]);
}
