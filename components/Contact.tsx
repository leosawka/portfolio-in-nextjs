import { useRef, FormEvent, ChangeEvent } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import contactStyles from '../styles/Contact.module.css';
import { useTheme } from '../contexts/ThemeContext';
import homeStyles from '../styles/Home.module.css';
import Toast from './Toast';

interface ContactFormLabels {
  name: string;
  email: string;
  message: string;
  send: string;
  success: string;
  error: string;
  invalidFormat: string;
  disposableEmail: string;
  errorName: string;
  errorEmail: string;
  errorMessage: string;
}

interface Props {
  contactTitle: string;
  contactForm: ContactFormLabels;
  formData: { name: string; email: string; message: string };
  submitted: boolean;
  token: string | null;
  feedback: { message: string; isError: boolean; field?: 'name' | 'email' | 'message' | 'general' } | null;
  hcaptchaRef: React.RefObject<HCaptcha | null>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onVerify: (token: string) => void;
}

export default function Contact({
  contactTitle,
  contactForm,
  formData,
  submitted,
  token,
  feedback,
  hcaptchaRef,
  onChange,
  onSubmit,
  onVerify
}: Props) {
  const { theme } = useTheme();
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;

  return (
    <section className={`${homeStyles.cardAtributes} ${theme === 'light' ? contactStyles.contactLight : contactStyles.contactDark}`}>
      <h2 className={contactStyles.contactTitle}>{contactTitle}</h2>
      <form
        className={`${contactStyles.form} ${theme === 'light' ? contactStyles.formLight : contactStyles.formDark}`}
        onSubmit={onSubmit}
      >
        <input
          name="name"
          className={contactStyles.input}
          placeholder={contactForm.name}
          value={formData.name}
          onChange={onChange}
          disabled={submitted}
        />
        <input
          name="email"
          className={contactStyles.input}
          placeholder={contactForm.email}
          value={formData.email}
          onChange={onChange}
          disabled={submitted}
        />
        <textarea
          name="message"
          className={contactStyles.textarea}
          placeholder={contactForm.message}
          rows={5}
          value={formData.message}
          onChange={onChange}
          disabled={submitted}
        />
        <div className={contactStyles.captchaWrapper}>
          <HCaptcha
            sitekey={sitekey}
            size="normal"
            onVerify={onVerify}
            ref={hcaptchaRef}
          />
        </div>
        <button type="submit" className={contactStyles.button} disabled={!token || submitted}>
          {contactForm.send}
        </button>
      </form>
      {feedback && (
        <div style={{ position: 'relative', width: '100%', height: '0px' }}>
          <Toast message={feedback.message} isError={feedback.isError} />
        </div>
      )}
    </section>
  );
}
