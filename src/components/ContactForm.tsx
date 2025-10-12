import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [token, setToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<any>(null);
  const { language } = useLanguage();
  const [ready, setReady] = useState(false);

  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY;
  if (!sitekey) {
    console.error('HCaptcha sitekey is not defined.');
    return null;
  }

  // Reiniciar estado cada vez que cambia el idioma
  useEffect(() => {
    setReady(false);
    const interval = setInterval(() => {
      if ((window as any).hcaptcha) {
        clearInterval(interval);
        setReady(true);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please verify you're human.");
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, hcaptchaToken: token }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Error del backend:', data);
      hcaptchaRef.current?.resetCaptcha();
      setToken(null);
      return;
    }

    alert(data.message);
    hcaptchaRef.current?.resetCaptcha();
    setToken(null);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Your email" value={form.email} onChange={handleChange} />
      <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} />

      {ready && (
        <HCaptcha
          key={`hcaptcha-${language}`}
          sitekey={sitekey}
          languageOverride={language}
          onVerify={(token) => setToken(token)}
          ref={hcaptchaRef}
        />
      )}

      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
