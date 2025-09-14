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
  detailsLabel?: string; // si querés mantener tu botón “ver todo”
  /** NUEVO: mapa i18n de providers */
  providersMap?: Record<string, CoursesProviderInfo>;
}

const VISIBLE_COUNT = 3;

export default function Courses({
  title, coursesLabels, courses, viewMore, viewLess,
  onOpenDetails, detailsLabel = 'details', providersMap
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
    const logo = info?.logo || course.logo;

    onOpenDetails({
      title: `¿Qué es ${provider}?`,
      body: (
        <div style={{ display: 'grid', gap: 12 }}>
          {logo && (
            <img
              src={logo}
              alt={provider}
              style={{ width: 120, height: 'auto', borderRadius: 8, justifySelf: 'start' }}
            />
          )}
          <p style={{ marginTop: 0 }}>
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
          const { title: t, description, date, certificateId, logo, provider } = course;

          return (
            <div
              key={id}
              className={`${styles.courses} ${theme === 'light' ? styles.coursesShadowLight : styles.coursesShadowDark}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {logo && <img className={styles.logo} src={logo} alt={t} />}
              <div className={styles.content}>
                <span><strong>{t}</strong></span>
                {description && <div><span>{description}</span></div>}
                {date && <div><strong>{coursesLabels.date}:</strong> <span>{date}</span></div>}
                {certificateId && (
                  <div>
                    <strong>{coursesLabels.ID}:</strong> <span>{certificateId}</span>
                  </div>
                )}

                {/* Botón por curso si hay provider */}
                {onOpenDetails && provider && (
                  <div style={{ marginTop: 8 }}>
                    <button
                      className={styles.toggleButton}
                      onClick={() => openProviderDetails(course)}
                      aria-label={`¿Qué es ${provider}?`}
                      title={`¿Qué es ${provider}?`}
                    >
                      ¿Qué es {provider}?
                    </button>
                  </div>
                )}
              </div>
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
