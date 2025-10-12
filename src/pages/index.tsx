import type { TextContent, IconMap, ModalContent } from '../types/index';
import { useEffect, useState } from 'react';
import Head from "next/head";
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
import Modal from '../components/modal/Modal';
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
  const isReady = useBackgroundBlend(theme);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openCoursesModal = (content: ModalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

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

  if (!texts) return <Loading />;

  const pageTitle =
    language === 'es'
      ? 'Inicio — Jairo L. Olivera'
      : 'Home — Jairo L. Olivera';

  const pageDescription =
    language === 'es'
      ? 'Proyectos destacados, experiencia y contacto.'
      : 'Featured projects, experience, and contact.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/LS.svg" />
      </Head>
      <About greeting={texts.greeting} about={texts.about} />
      <WorkExperience
        title={texts.workExperienceTitle}
        workLabels={texts.workLabels}
        workExperience={texts.workExperience}
      />
      <Skills title={texts.skills} stack={texts.stack} />
      <Projects title={texts.projectsTitle} projects={texts.projects} />
      <Courses
        title={texts.coursesTitle}
        coursesLabels={texts.coursesLabels}
        courses={texts.courses}
        viewMore={texts.viewMore}
        viewLess={texts.viewLess}
        onOpenDetails={openCoursesModal}
        detailsLabel={"Ver todos"}
        providersMap={texts.coursesProviders}
        whatIsPrefix={language === 'es' ? '¿Qué es' : 'What is'}
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
      <Modal isOpen={modalOpen} title={modalContent?.title} onClose={closeModal}>
        {modalContent?.body}
      </Modal>
    </>
  );
}