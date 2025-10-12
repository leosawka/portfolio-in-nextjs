import { ReactNode, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Layout from './Layout';

const LayoutWithHCaptchaScript = ({ children }: { children: ReactNode }) => {
    const { language } = useLanguage();

    useEffect(() => {
        const scriptId = 'hcaptcha-script';
        document.getElementById(scriptId)?.remove();
        delete (window as any).hcaptcha;
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://js.hcaptcha.com/1/api.js?hl=${language}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }, [language]);


    return <Layout>{children}</Layout>;
};

export default LayoutWithHCaptchaScript;
