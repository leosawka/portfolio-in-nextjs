import { useState } from 'react';
import styles from '../styles/Courses.module.css';
import { useTheme } from '../contexts/ThemeContext';
import type { Course, CoursesHeads } from '../types';

interface Props {
  title: string;
  coursesLabels: CoursesHeads;
  courses: Course[];
  viewMore: string;
  viewLess: string;
}

const VISIBLE_COUNT = 3;

export default function Courses({ title, coursesLabels, courses, viewMore, viewLess }: Props) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const visibleCourses = expanded ? courses : courses.slice(0, VISIBLE_COUNT);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <section
      className={`${styles.coursesTile} ${theme === 'light' ? styles.coursesTileShadowLight : styles.coursesTileShadowDark}`}
    >
      <h2 className={styles.skillsTitle}>{title}</h2>
      <div className={styles.card}>
        {visibleCourses.map((course, id) => {
          if (!course || typeof course !== 'object') return null;

          const { title, description, date, certificateId, logo } = course;

          return (
            <div
              key={id}
              className={`${styles.courses} ${theme === 'light' ? styles.coursesShadowLight : styles.coursesShadowDark}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {logo && (
                <img
                  className={styles.logo}
                  src={logo}
                  alt={title}
                />
              )}
              <div className={styles.content}>
                <span><strong>{title}</strong></span>
                {description && <div><span>{description}</span></div>}
                {date && <div><strong>{coursesLabels.date}:</strong><span>{date}</span></div>}
                {certificateId && <div className={certificateId}><strong>{coursesLabels.ID}:</strong> <span>{certificateId}</span></div>}
              </div>
            </div>
          );
        })}
        {(courses.length > VISIBLE_COUNT || expanded) && (
          <button
            onClick={toggleExpanded}
            className={styles.toggleButton}
          >
            {expanded ? viewLess : viewMore}
          </button>
        )}
      </div>
    </section>
  );
}
