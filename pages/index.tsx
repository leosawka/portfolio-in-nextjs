import type { TextContent, Project, TechStack, WorkContent, WorkHeads, SocialItem, IconMap } from '../types/index';
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
import { useContactForm } from '../hooks/useContactForm';
import { blendColors } from '../src/utils/blendColors';
import { useTheme } from '../contexts/ThemeContext';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Skills from '../components/Skills';
import Social from '../components/Social';
import About from '../components/About';

const iconMap: IconMap = {
  Github: GithubIcon,
  Gmail: GmailIcon,
  Linkedin: LinkedinIcon,
  Telegram: TelegramIcon,
  HackerRank: HackerRankIcon,
  Platzi: PlatziIcon
};


export default function Home() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [texts, setTexts] = useState<TextContent | null>(null);
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;

  const {
    formData,
    feedback,
    submitted,
    token,
    hcaptchaRef,
    handleChange,
    handleSubmit,
    handleCaptchaVerify
  } = useContactForm(texts);

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

  useEffect(() => {
    fetch(`/api/texts?lang=${language}`)
      .then((res) => res.json())
      .then(setTexts);
  }, [language]);

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
