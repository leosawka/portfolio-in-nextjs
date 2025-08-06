import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { useTheme } from '../contexts/ThemeContext';
import type { Course } from '../types';

interface Props {
  title: string;
  courses: Course[];
  viewMore: string;
  viewLess: string;
}

const VISIBLE_COUNT = 3;

export default function Courses({ title, courses, viewMore, viewLess }: Props) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const visibleCourses = expanded ? courses : courses.slice(0, VISIBLE_COUNT);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <section
      className={`${styles.cardAtributes} ${
        theme === 'light' ? styles.skillsSectionLight : styles.skillsSectionDark
      }`}
    >
      <h2 className={styles.skillsTitle}>{title}</h2>
      <div className={styles.experienceCard}>
        {visibleCourses.map((course, id) => {
          if (!course || typeof course !== 'object') return null;

          const { title, description, date, certificateId, logo } = course;

          return (
            <div
              key={id}
              className={`${styles.experienceCardElement} ${
                theme === 'light' ? styles.experienceCardLight : styles.experienceCardDark
              }`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {logo && (
                <img
                  src={logo}
                  alt={title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                    marginBottom: '1rem',
                  }}
                />
              )}
              <div>
                <strong>{title}</strong>
                {description && <div>{description}</div>}
                {date && <div><strong>Date:</strong> {date}</div>}
                {certificateId && <div><strong>ID:</strong> {certificateId}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {courses.length > VISIBLE_COUNT && (
        <button
          onClick={toggleExpanded}
          style={{ all: 'unset', cursor: 'pointer', marginTop: '1rem' }}
        >
          {expanded ? viewLess : viewMore}
        </button>
      )}
    </section>
  );
}
