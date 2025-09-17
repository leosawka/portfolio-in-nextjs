import { useState } from 'react';
import styles from '../styles/Courses.module.css';
import { useTheme } from '../contexts/ThemeContext';
import type { Course, CoursesHeads, ModalContent, CoursesProviderInfo } from '../types';

interface Props {
  title: string;
  coursesLabels: CoursesHeads;
  courses: Course[];
  viewMore: string;
  viewLess: string;
  onOpenDetails?: (content: ModalContent) => void;
  detailsLabel?: string;
  providersMap?: Record<string, CoursesProviderInfo>;
  whatIsPrefix?: string;
}

const VISIBLE_COUNT = 3;

export default function Courses({
  title, coursesLabels, courses, viewMore, viewLess,
  onOpenDetails, detailsLabel = 'details', providersMap, whatIsPrefix = 'What is',
}: Props) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const visibleCourses = expanded ? courses : courses.slice(0, VISIBLE_COUNT);
  const toggleExpanded = () => setExpanded(prev => !prev);

  const openProviderDetails = (course: Course) => {
    if (!onOpenDetails || !course.provider) return;

    const provider = course.provider;
    const info = providersMap?.[provider];
    const url = info?.url || course.providerUrl;


    const rawLogo = info?.logo ?? course.logo;
    const logo = typeof rawLogo === 'string' ? rawLogo : undefined;

    onOpenDetails({
      title: `${whatIsPrefix} ${provider}?`,
      body: (
        <div style={{ display: 'grid', gap: 12 }}>
          {logo && (
            <img
              src={logo}
              alt={provider}
              className={styles.modalLogo}
              style={{ display: 'block' }}
              loading="lazy"
              decoding="async"
            />
          )}
          <p style={{ marginTop: 0, whiteSpace: "pre-line" }}>
            {info?.about || `Descripción breve de ${provider}. (Agregá 'coursesProviders["${provider}"].about' en tus textos para i18n.)`}
          </p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{ justifySelf: 'start', padding: '.5rem .75rem', border: '1px solid rgba(255,255,255,.2)', borderRadius: 8 }}
            >
              Ir al sitio oficial
            </a>
          )}
        </div>
      )
    });
  };

  return (
    <section
      className={`${styles.coursesTile} ${theme === 'light' ? styles.coursesTileShadowLight : styles.coursesTileShadowDark}`}
    >
      <h2 className={styles.skillsTitle}>{title}</h2>
      <div className={styles.card}>
        {visibleCourses.map((course, id) => {
          if (!course || typeof course !== 'object') return null;
          const { title: text, description, date, certificateId, logo, provider } = course;

          return (
            <div
              key={id}
              className={`${styles.courses} ${theme === 'light' ? styles.coursesShadowLight : styles.coursesShadowDark}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              <div style={{ display: "flex" }}>
                {logo && <img className={styles.logo} src={logo} alt={text} />}
                <div className={styles.content}>
                  <span><strong>{text}</strong></span>
                  {description && <div><span>{description}</span></div>}
                  {date && <div><strong>{coursesLabels.date}:</strong> <span>{date}</span></div>}
                  {certificateId && (
                    <div>
                      <div>
                        <strong>{coursesLabels.ID}:</strong> <span>{certificateId}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {onOpenDetails && provider && (
                <div style={{ marginTop: 8 }}>
                  <button
                    className={theme === 'light' ? styles.coursesHoverDark: styles.coursesHover}
                    onClick={() => openProviderDetails(course)}
                    aria-label={`${whatIsPrefix} ${provider}?`}
                    title={`${whatIsPrefix} ${provider}?`}
                  >
                    {whatIsPrefix} {provider}?
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {(courses.length > VISIBLE_COUNT || expanded) && (
          <button onClick={toggleExpanded} className={styles.toggleButton}>
            {expanded ? viewLess : viewMore}
          </button>
        )}
      </div>
    </section>
  );
}
