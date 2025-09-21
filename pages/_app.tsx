import LayoutWithHCaptchaScript from '../components/LayoutWithHCaptchaScript';
import { LanguageProvider } from '../contexts/LanguageContext';
import { initializeBlend } from '../src/utils/initializeBlend';
import { ThemeProvider } from '../contexts/ThemeContext';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const theme = stored === 'dark' ? 'dark' : 'light';
    initializeBlend(theme);
  }, []);

  const defaultTitle = 'Jairo L. Olivera — Portfolio';
  const defaultDescription =
    'Full-stack dev (React/TS, Java, SQL). Proyectos, experiencia y contacto.';

  return (
    <>
      <Head>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />

        <meta property="og:title" content={defaultTitle} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icons/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2563EB" />
        <meta name="msapplication-TileColor" content="#2563EB" />
        <meta name="theme-color" content="#2563EB" />
      </Head>

      <ThemeProvider>
        <LanguageProvider>
          <LayoutWithHCaptchaScript>
            <Component {...pageProps} />
          </LayoutWithHCaptchaScript>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
