import { useEffect, useState } from 'react';
import { blendColors } from '../src/utils/blendColors';

// export function useBackgroundBlend(theme: 'light' | 'dark') {
//   const [isReady, setIsReady] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const scrollPercent = Math.min(scrollTop / docHeight, 1);

//       const lightStart = '#ffffff';
//       const lightEnd = '#d0eaff';
//       const darkStart = '#111111';
//       const darkEnd = '#222244';

//       const [start, end] = theme === 'light'
//         ? [lightStart, lightEnd]
//         : [darkStart, darkEnd];

//       const blended = blendColors(start, end, scrollPercent);
//       const invertedBlended = blendColors(start, end, 1 -scrollPercent);

//       document.body.style.backgroundColor = blended;

//       document.documentElement.style.setProperty('--bg-blend', blended);
//       document.documentElement.style.setProperty('--bg-blend-inverted', invertedBlended);
//     };

//     handleScroll();
//     setIsReady(true);

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [theme]);

//   return isReady;
// }
export function useBackgroundBlend(theme: 'light' | 'dark') {
  const [isReady, setIsReady] = useState(false);
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

      const inverseBlended = blendColors(
        theme === 'light' ? lightEnd : darkEnd,
        theme === 'light' ? lightStart : darkStart,
        scrollPercent
      );

      const root = document.documentElement;
      root.style.setProperty('--bg-blend', blended);
      root.style.setProperty('--bg-blend-inverted', inverseBlended);
    };

    handleScroll();
    setIsReady(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);
  return isReady;
}
