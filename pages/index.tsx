import type { TextContent, Project, TechStack, WorkContent, WorkHeads, SocialItem, IconMap } from '../types/index';
import { useRef, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { HackerRankIcon } from '../components/icons/HackerRankIcon';
import { useBackgroundBlend } from '../hooks/useBackgroundBlend';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import { GithubIcon } from '../components/icons/GithubIcon';
import { PlatziIcon } from '../components/icons/PlatziIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { GmailIcon } from '../components/icons/GmailIcon';
import WorkExperience from '../components/WorkExperience';
import { useContactForm } from '../hooks/useContactForm';
import { useTheme } from '../contexts/ThemeContext';
import Projects from '../components/Projects';
import Loading from '../components/Loading';
import Contact from '../components/Contact';
import Courses from '../components/Courses';
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
  const isReady = useBackgroundBlend(theme);

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
    fetch(`/api/texts?lang=${language}`)
      .then((res) => res.json())
      .then(setTexts);
  }, [language]);

  if (!isReady || !texts) return <Loading />;

  return (
    <>
      <About greeting={texts.greeting} about={texts.about} />
      <WorkExperience title={texts.workExperienceTitle} workLabels={texts.workLabels} workExperience={texts.workExperience}/>
      <Skills title={texts.skills} stack={texts.stack} />
      <Projects title={texts.projectsTitle} projects={texts.projects} />
      <Courses
        title={texts.coursesTitle}
        courses={texts.courses}
        viewMore={texts.viewMore}
        viewLess={texts.viewLess}
      />
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
