import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import LayoutWithHCaptchaScript from '../components/LayoutWithHCaptchaScript';
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

