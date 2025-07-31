import styles from '../styles/Home.module.css';
import { useTheme } from '../contexts/ThemeContext';
import techColors from '../src/utils/techColors';

interface TechStack {
  labels: string[];
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  testing: string[];
  ai: string[];
  tools: string[];
  softskills: string[];
  languagesSpoken: string[];
}

interface Props {
  title: string;
  stack: TechStack;
}

export default function Skills({ title, stack }: Props) {
  const { theme } = useTheme();
  const categories = Object.keys(stack).filter(key => key !== 'labels') as (keyof TechStack)[];

  return (
    <section className={`${styles.cardAtributes} ${theme === 'light' ? styles.skillsSectionLight : styles.skillsSectionDark}`}>
      <h2 className={styles.skillsTitle}>{title}</h2>
      {stack.labels.map((label, index) => {
        const categoryKey = categories[index];
        const skills = stack[categoryKey];

        return (
          <div key={categoryKey} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{label}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((tech, i) => {
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
        );
      })}
    </section>
  );
}