import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { FormEvent, ChangeEvent } from 'react';
import styles from '../styles/Home.module.css';
import projectStyles from '../styles/Projects.module.css';
import socialStyles from '../styles/Social.module.css';
import contactStyles from '../styles/Contact.module.css';


interface SocialItem {
  label: string;
  url: string;
  icon: string;
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
    }
}

export default function Home() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [texts, setTexts] = useState<TextContent | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (!texts) return;

  const { name, email, message } = formData;
  if (!name || !email || !message) {
    setFeedback(texts.contactForm.error);
    return;
  }

  setFeedback(texts.contactForm.success);
  setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    fetch(`/api/texts?lang=${language}`)
      .then((res) => res.json())
      .then(setTexts);
  }, [language]);

  if (!texts) return <p>Loading...</p>;

  return (
    <>
        <section className={styles.aboutSection}>
            <img src={'https://media.licdn.com/dms/image/v2/D4D03AQHZT1Nq5ncR5Q/profile-displayphoto-shrink_800_800/B4DZOceIYUHgAc-/0/1733496965288?e=1757548800&v=beta&t=ntug2Y_Vfocs_FcRNV1-Z0X9-y6vkeWfNYACXLlvSPo'} 
                alt='profile image' 
            />
            <div>
                <h1 className={styles.aboutTitle}>{texts.greeting}</h1>
                <p className={styles.aboutText}>{texts.about}</p>
            </div>
        </section>
        <section className={styles.skillsSection}>
            <h2 className={styles.skillsTitle}>{texts.skills}</h2>
            <div className={styles.badges}>
                {texts.stack.map((tech) => (
                <span key={tech} className={styles.badge}>
                    {tech}
                </span>
                ))}
            </div>
        </section>
        <section className={projectStyles.projectsSection}>
        <h2 className={projectStyles.projectsTitle}>{texts.projectsTitle}</h2>
        <div className={projectStyles.projectsGrid}>
            {texts?.projects?.map((project) => (
            <div key={project.title} className={projectStyles.projectCard}>
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
        </section>
        <section className={socialStyles.socialSection}>
        <h2 className={socialStyles.socialTitle}>{texts.socialTitle}</h2>
        <div className={socialStyles.socialLinks}>
            {texts.social.map((item) => (
            <a
                key={item.label}
                href={item.url}
                className={socialStyles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>{item.icon}</span> {item.label}
            </a>
            ))}
        </div>
        </section>
        <section className={contactStyles.contactSection}>
        <h2 className={contactStyles.contactTitle}>{texts.contactTitle}</h2>
        <form className={contactStyles.contactForm} onSubmit={handleSubmit}>
            <input
            name="name"
            className={contactStyles.input}
            placeholder={texts.contactForm.name}
            value={formData.name}
            onChange={handleChange}
            />
            <input
            name="email"
            className={contactStyles.input}
            placeholder={texts.contactForm.email}
            value={formData.email}
            onChange={handleChange}
            />
            <textarea
            name="message"
            className={contactStyles.textarea}
            placeholder={texts.contactForm.message}
            rows={5}
            value={formData.message}
            onChange={handleChange}
            />
            <button type="submit" className={contactStyles.button}>{texts.contactForm.send}</button>
        </form>
        {feedback && (
            <p className={feedback === texts.contactForm.success ? contactStyles.success : contactStyles.error}>
            {feedback}
            </p>
        )}
        </section>
    </>
  );
}
