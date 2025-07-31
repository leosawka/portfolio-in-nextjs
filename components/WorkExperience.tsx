import styles from '../styles/Home.module.css';
import { useTheme } from '../contexts/ThemeContext';
import techColors from '../src/utils/techColors';

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

interface Props {
  title: string;
  workLabels: WorkHeads;
  workExperience: WorkContent[];
}

export default function WorkExperience({ title, workLabels, workExperience }: Props) {
  const { theme } = useTheme();

  return (
    <section className={`${styles.cardAtributes} ${theme === 'light' ? styles.skillsSectionLight : styles.skillsSectionDark}`}>
      <h2 className={styles.skillsTitle}>{title}</h2>
      <div className={styles.experienceCard}>
        {workExperience.map((exp, id) => (
          <div
            key={id}
            className={`${styles.experienceCardElement} ${theme === 'light' ? styles.experienceCardLight : styles.experienceCardDark}`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {workLabels.from} {exp.from} {workLabels.to} {exp.to} <br />
            <div>
              <strong>{workLabels.company}:</strong> {exp.company} — <strong>{workLabels.position}:</strong> {exp.jobtitle}
            </div>
            <strong>{workLabels.highlights}:</strong>
            {exp.highlights.map((highlight) => `• ${highlight}`).join('\n')}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <div style={{ marginTop: '1rem' }}>
                <strong>{workLabels.technologies}:</strong>
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
  );
}
