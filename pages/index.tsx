import { useRef, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { HackerRankIcon } from '../components/icons/HackerRankIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { GithubIcon } from '../components/icons/GithubIcon';
import { PlatziIcon } from '../components/icons/PlatziIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { isEmailValid } from '../src/utils/validateEmail';
import { GmailIcon } from '../components/icons/GmailIcon';
import WorkExperience from '../components/WorkExperience';
import { blendColors } from '../src/utils/blendColors';
import { useTheme } from '../contexts/ThemeContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Skills from '../components/Skills';
import Social from '../components/Social';
import About from '../components/About';
import { FC } from 'react';

const iconMap: Record<string, FC<{ theme: 'light' | 'dark'; size?: number }>> = {
  Github: GithubIcon,
  Gmail: GmailIcon,
  Linkedin: LinkedinIcon,
  Telegram: TelegramIcon,
  HackerRank: HackerRankIcon,
  Platzi: PlatziIcon
};

interface SocialItem {
  label: string;
  url: string;
  icon: string;
}

interface WorkContent {
  iconImage: string;
  from: string;
  to: string;
  jobtitle: string;
  company: string;
  highlights: string[];
  tecnologies: string[];
}

interface TechStack {
  labels: string[];
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  testing: string[];
  ai: string[];
  tools: string[];
  softskills: string[];
  languagesSpoken: string[];
}

interface WorkHeads {
  from: string;
  to: string;
  position: string;
  company: string;
  highlights: string;
  technologies: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface TextContent {
  greeting: string;
  about: string;
  skills: string;
  workExperienceTitle: string;
  workLabels: WorkHeads;
  workExperience: WorkContent[];
  stack: TechStack;
  projectsTitle: string;
  projects: Project[];
  socialTitle: string;
  social: SocialItem[];
  contactTitle: string;
  contactForm: {
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
  };
}

export default function Home() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [texts, setTexts] = useState<TextContent | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean;field?: 'name' | 'email' | 'message' | 'general';} | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const hcaptchaRef = useRef<HCaptcha | null>(null);

  type StackCategoryKey = Exclude<keyof TechStack, 'labels'>;

  const pendingSubmission = useRef(false);

  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;


  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 3500);
    return () => clearTimeout(timeout);
  }, [feedback]);


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

      document.body.style.backgroundColor = blended;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isDisposableEmail = (email: string): boolean => {
  return !isEmailValid(email);
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

  useEffect(() => {
    fetch(`/api/texts?lang=${language}`)
      .then((res) => res.json())
      .then(setTexts);
  }, [language]);

  useEffect(() => {
    if (!feedback || !texts?.contactForm) return;

    const updatedMessage = feedback.isError
      ? texts.contactForm.error
      : texts.contactForm.success;

    if (updatedMessage) {
      setFeedback({ ...feedback, message: updatedMessage });
    }
  }, [texts]);

  const handleCaptchaVerify = (newToken: string) => {
  setToken(newToken);
  if (pendingSubmission.current) {
    submitFormWithToken(newToken);
    pendingSubmission.current = false;
  }
};


  if (!texts) return <p>Loading...</p>;

  return (
    <>
      <About greeting={texts.greeting} about={texts.about} />
      <WorkExperience title={texts.workExperienceTitle} workLabels={texts.workLabels} workExperience={texts.workExperience}/>
      <Skills title={texts.skills} stack={texts.stack} />
      <Projects title={texts.projectsTitle} projects={texts.projects} />
      <Contact
        contactTitle={texts.contactTitle}
        contactForm={texts.contactForm}
        formData={formData}
        submitted={submitted}
        token={token}
        feedback={feedback}
        hcaptchaRef={hcaptchaRef}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onVerify={handleCaptchaVerify}
      />
      <Social title={texts.socialTitle} items={texts.social} iconMap={iconMap} />
    </>
  );
}
