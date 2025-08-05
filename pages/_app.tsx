import LayoutWithHCaptchaScript from '../components/LayoutWithHCaptchaScript';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { initializeBlend } from '../src/utils/initializeBlend';
import { ThemeProvider } from '../contexts/ThemeContext';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import '../styles/globals.css';

function HCaptchaScript() {
  const { language } = useLanguage();

  return (
    <Script
      id="hcaptcha-script"
      src={`https://js.hcaptcha.com/1/api.js?hl=${language}`}
      strategy="beforeInteractive"
      async
      defer
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const theme = stored === 'dark' ? 'dark' : 'light';
    initializeBlend(theme);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LayoutWithHCaptchaScript>
          <Component {...pageProps} />
        </LayoutWithHCaptchaScript>
      </LanguageProvider>
    </ThemeProvider>
  );
}

