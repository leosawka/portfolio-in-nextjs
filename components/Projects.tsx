import { useRef, useEffect, useState } from 'react';
import projectStyles from '../styles/Projects.module.css';
import { useTheme } from '../contexts/ThemeContext';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Props {
  title: string;
  projects: Project[];
}

export default function Projects({ title, projects }: Props) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [indexOffset, setIndexOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollBy = 300;

  useEffect(() => {
    const repeated = [...projects, ...projects, ...projects];
    setVisibleProjects(repeated);
    setIndexOffset(projects.length);

    requestAnimationFrame(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft = projects.length * (300 + 32);
      }
    });
  }, [projects]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = 300 + 32;
      const leftThreshold = cardWidth;
      const rightThreshold = el.scrollWidth - el.clientWidth - cardWidth;

      if (el.scrollLeft < leftThreshold) {
        setVisibleProjects(prev => {
          const newProjects = [...projects, ...prev];
          setIndexOffset(offset => offset + projects.length);
          requestAnimationFrame(() => {
            if (carouselRef.current) {
              carouselRef.current.scrollLeft += projects.length * cardWidth;
            }
          });
          return newProjects;
        });
      } else if (el.scrollLeft > rightThreshold) {
        setVisibleProjects(prev => [...prev, ...projects]);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [projects]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollBy({ left: scrollBy, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className={`${projectStyles.projectsSection} ${theme === 'light' ? projectStyles.projectsSectionLight : projectStyles.projectsSectionDark}`}>
      <h2 className={projectStyles.projectsTitle}>{title}</h2>
      <div className={projectStyles.projectsGridWrapper}>
        <div className={`${projectStyles.fadeLeft} ${theme === 'light' ? projectStyles.fadeLeftLight : ''}`} />
        <div className={`${projectStyles.fadeRight} ${theme === 'light' ? projectStyles.fadeRightLight : ''}`} />
        
        <button className={`${projectStyles.carouselButton} ${projectStyles.carouselButtonLeft}`} onClick={() => carouselRef.current?.scrollBy({ left: -scrollBy, behavior: 'smooth' })}>
          ‹
        </button>

        <div
          className={projectStyles.projectsGrid}
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {visibleProjects.map((project, index) => (
            <div key={`${project.title}-${index}`} className={`${projectStyles.projectCard} ${theme === 'light' ? projectStyles.projectCardLight : projectStyles.projectCardDark}`}>
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

        <button className={`${projectStyles.carouselButton} ${projectStyles.carouselButtonRight}`} onClick={() => carouselRef.current?.scrollBy({ left: scrollBy, behavior: 'smooth' })}>
          ›
        </button>
      </div>
    </section>
  );
}
