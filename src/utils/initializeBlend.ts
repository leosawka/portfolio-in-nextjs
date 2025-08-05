import { blendColors } from './blendColors';

export function initializeBlend(theme: 'light' | 'dark') {
  const lightStart = '#ffffff';
  const lightEnd = '#d0eaff';
  const darkStart = '#111111';
  const darkEnd = '#222244';

  const [start, end] = theme === 'light' ? [lightStart, lightEnd] : [darkStart, darkEnd];

  const blended = blendColors(start, end, 0);
  const invertedBlended = blendColors(start, end, 1);

  const root = document.documentElement;
  root.style.setProperty('--bg-blend', blended);
  root.style.setProperty('--bg-blend-inverted', invertedBlended);
  document.body.style.backgroundColor = blended;
}
