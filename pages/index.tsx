import { useRef, useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { blendColors } from '../src/utils/blendColors';
import styles from '../styles/Home.module.css';
import socialStyles from '../styles/Social.module.css';
import projectStyles from '../styles/Projects.module.css';
import contactStyles from '../styles/Contact.module.css';
import { GithubIcon } from '../components/icons/GithubIcon';
import { GmailIcon } from '../components/icons/GmailIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { TelegramIcon } from '../components/icons/TelegramIcon';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import techColors from '../src/utils/techColors';

import { FC } from 'react';

const iconMap: Record<string, FC<{ theme: 'light' | 'dark'; size?: number }>> = {
  Github: GithubIcon,
  Gmail: GmailIcon,
  Linkedin: LinkedinIcon,
  Telegram: TelegramIcon,
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
  stack: string[];
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
  };
}

export default function Home() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [texts, setTexts] = useState<TextContent | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [indexOffset, setIndexOffset] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const hcaptchaRef = useRef<HCaptcha | null>(null);

  const pendingSubmission = useRef(false);

  const scrollBy = 300;
  const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;


  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollBy, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    if (!texts) return;
    const repeated = [...texts.projects, ...texts.projects, ...texts.projects];
    setVisibleProjects(repeated);
    setIndexOffset(texts.projects.length);

    requestAnimationFrame(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = texts.projects.length * (300 + 32);
      }
    });
  }, [texts]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || !texts) return;

    const handleScroll = () => {
      const cardWidth = 300 + 32;
      const leftThreshold = cardWidth;
      const rightThreshold = el.scrollWidth - el.clientWidth - cardWidth;

      if (el.scrollLeft < leftThreshold) {
        setVisibleProjects(prev => {
          const newProjects = [...texts.projects, ...prev];
          setIndexOffset(offset => offset + texts.projects.length);
          requestAnimationFrame(() => {
            if (carouselRef.current) {
              carouselRef.current.scrollLeft += texts.projects.length * cardWidth;
            }
          });
          return newProjects;
        });
      } else if (el.scrollLeft > rightThreshold) {
        setVisibleProjects(prev => {
          const newProjects = [...prev, ...texts.projects];
          return newProjects;
        });
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [texts]);

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
    console.log("🟢 Enviando datos al backend:", { ...formData, hcaptchaToken: tokenToUse });
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
    console.log("🔴 Error inesperado al enviar mensaje.");
    setFeedback({ message: texts?.contactForm.error || 'Something went wrong.', isError: true });
  }
};

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!texts) return;

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setFeedback({ message: texts.contactForm.error, isError: true });
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
      <section className={`${styles.aboutSection} ${styles.cardAtributes} ${theme === 'light' ? styles.aboutLight : styles.aboutDark}`}>
        <img className={`${theme === 'light' ? styles.aboutSectionCardImgLight : styles.aboutSectionCardImgDark}`} src={'https://media.licdn.com/dms/image/v2/D4D03AQHZT1Nq5ncR5Q/profile-displayphoto-shrink_800_800/B4DZOceIYUHgAc-/0/1733496965288?e=1757548800&v=beta&t=ntug2Y_Vfocs_FcRNV1-Z0X9-y6vkeWfNYACXLlvSPo'}
          alt='profile image'
        />
        <div>
          <h1 className={styles.aboutTitle}>{texts.greeting}</h1>
          <p className={styles.aboutText}>{texts.about}</p>
        </div>
      </section>
      <section className={`${styles.cardAtributes} ${theme === 'light' ? styles.skillsSectionLight : styles.skillsSectionDark}`}>
        <h2 className={styles.skillsTitle}>{texts.workExperienceTitle}</h2>
        <div className={styles.experienceCard}>
          {texts.workExperience.map((exp, id) => (
            <div key={id} className={`${styles.experienceCardElement} ${theme === 'light' ? styles.experienceCardLight : styles.experienceCardDark}`} style={{ whiteSpace: 'pre-line' }}>
              {texts.workLabels.from} {exp.from} {texts.workLabels.to} {exp.to} <br />
              <div>
                <strong>{texts.workLabels.company}:</strong> {exp.company} — <strong>{texts.workLabels.position}:</strong> {exp.jobtitle}
              </div>
              <strong>{texts.workLabels.highlights}:</strong>
              {exp.highlights.map((highlight) => `• ${highlight}`).join('\n')}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                <div style={{ marginTop: '1rem' }}>
                  <strong>{texts.workLabels.technologies}:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {exp.tecnologies.map((tech, i) => {
                      const bg = techColors[tech] || techColors.default;
                      const color = ['#f0db4f', '#fcd535', '#ffff99'].includes(bg) ? '#000' : '#fff';
                      return (
                        <div
                          key={i}
                          style={{
                            backgroundColor: bg,
                            color,
                            padding: '.25rem .75rem',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          {tech}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.cardAtributes} ${theme === 'light' ? styles.skillsSectionLight : styles.skillsSectionDark}`}>
        <h2 className={styles.skillsTitle}>{texts.skills}</h2>
        <div className={styles.badges}>
          {texts.stack.map((tech) => (
            <span key={tech} className={styles.badge}>
              {tech}
            </span>
          ))}
        </div>
      </section>
      <section className={`${styles.cardAtributes} ${theme === 'light' ? projectStyles.projectsSectionLight : projectStyles.projectsSectionDark}`}>
        <h2 className={projectStyles.projectsTitle}>{texts.projectsTitle}</h2>
        <div className={projectStyles.projectsGridWrapper}>
          <button className={`${projectStyles.carouselButton} ${projectStyles.carouselButtonLeft}`} onClick={scrollLeft}>
            ‹
          </button>
          <div
            className={projectStyles.projectsGrid}
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {visibleProjects.map((project, index) => (
              <div key={`${project.title}-${index}`} className={projectStyles.projectCard}>
                <img src={project.image} alt={project.title} className={projectStyles.projectImage} />
                <div className={projectStyles.projectContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className={`${projectStyles.carouselButton} ${projectStyles.carouselButtonRight}`} onClick={scrollRight}>
            ›
          </button>
        </div>
      </section>
      <section className={`${styles.cardAtributes} ${theme === 'light' ? contactStyles.contactLight : contactStyles.contactDark}`}>
        <h2 className={contactStyles.contactTitle}>{texts.contactTitle}</h2>
        <form className={`${contactStyles.form}`} onSubmit={handleSubmit}>
          <input
            name="name"
            className={contactStyles.input}
            placeholder={texts.contactForm.name}
            value={formData.name}
            onChange={handleChange}
            disabled={submitted}
          />
          <input
            name="email"
            className={contactStyles.input}
            placeholder={texts.contactForm.email}
            value={formData.email}
            onChange={handleChange}
            disabled={submitted}
          />
          <textarea
            name="message"
            className={contactStyles.textarea}
            placeholder={texts.contactForm.message}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            disabled={submitted}
          />
          <div className={contactStyles.captchaWrapper}>
            <HCaptcha
              sitekey={sitekey}
              size='normal'
              onVerify={handleCaptchaVerify}
              ref={hcaptchaRef}
            />
          </div>
          <button type="submit" className={contactStyles.button} disabled={!token || submitted}>{texts.contactForm.send}</button>
        </form>
        {feedback && (
          <p style={{ color: feedback.isError ? 'red' : 'limegreen' }}>
            {feedback.message}
          </p>
        )}
      </section>
      <section className={`${socialStyles.socialSection} ${styles.cardAtributes} ${theme === 'light' ? socialStyles.socialSectionLight : socialStyles.socialSectionDark}`}>
        <h2 className={socialStyles.socialTitle}>{texts.socialTitle}</h2>
        <div className={socialStyles.socialLinks}>
          {texts.social.map((item) => {
            const IconComponent = iconMap[item.label];
            return (
              <a
                key={item.label}
                href={item.url}
                className={`${socialStyles.socialLink} ${theme === 'light' ? socialStyles.socialLinkLight : socialStyles.socialLinkDark}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`${socialStyles.iconWrapper} ${theme === 'light' ? socialStyles.light : socialStyles.dark}`}
                >
                  {IconComponent && <IconComponent theme={theme} size={24} />}
                </div>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
