import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { isEmailValid } from '../../src/utils/validateEmail';
import type { TextContent } from '../types';

export function useContactForm(texts: TextContent | null) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState<{
    message: string;
    isError: boolean;
    field?: 'name' | 'email' | 'message' | 'general';
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const hcaptchaRef = useRef<HCaptcha | null>(null);
  const pendingSubmission = useRef(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isDisposableEmail = (email: string): boolean => {
    return !isEmailValid(email);
  };

  const submitFormWithToken = async (tokenToUse: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hcaptchaToken: tokenToUse }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({ message: texts?.contactForm.success || 'Success!', isError: false });
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(true);
        setToken(null);
      } else {
        setFeedback({ message: data.message || texts?.contactForm.error, isError: true });
      }
    } catch {
      setFeedback({ message: texts?.contactForm.error || 'Something went wrong.', isError: true });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!texts) return;

    const { name, email, message } = formData;

    if (!name) {
      setFeedback({ message: texts.contactForm.errorName || 'Name is required.', isError: true, field: 'name' });
      return;
    }

    if (!email) {
      setFeedback({ message: texts.contactForm.errorEmail || 'Email is required.', isError: true, field: 'email' });
      return;
    }

    if (!isValidEmail(email)) {
      setFeedback({ message: texts.contactForm.invalidFormat || 'Invalid email format.', isError: true, field: 'email' });
      return;
    }

    if (isDisposableEmail(email)) {
      setFeedback({ message: texts.contactForm.disposableEmail || 'Disposable or blocked email.', isError: true, field: 'email' });
      return;
    }

    if (!message) {
      setFeedback({ message: texts.contactForm.errorMessage || 'Message is required.', isError: true, field: 'message' });
      return;
    }

    if (!token) {
      pendingSubmission.current = true;
      hcaptchaRef.current?.execute();
      return;
    }

    submitFormWithToken(token);
  };

  const handleCaptchaVerify = (newToken: string) => {
    setToken(newToken);
    if (pendingSubmission.current) {
      submitFormWithToken(newToken);
      pendingSubmission.current = false;
    }
  };

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 3500);
    return () => clearTimeout(timeout);
  }, [feedback]);

  useEffect(() => {
    if (!feedback || !texts?.contactForm) return;

    const updatedMessage = feedback.isError
      ? texts.contactForm.error
      : texts.contactForm.success;

    if (updatedMessage) {
      setFeedback((prev) => prev ? { ...prev, message: updatedMessage } : null);
    }
  }, [texts]);

  return {
    formData,
    feedback,
    submitted,
    token,
    hcaptchaRef,
    handleChange,
    handleSubmit,
    handleCaptchaVerify,
  };
}