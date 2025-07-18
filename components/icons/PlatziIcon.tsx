import styles from './PlatziIcon.module.css';

interface IconProps {
  theme: 'light' | 'dark';
  size?: number;
}

export const PlatziIcon = ({ theme, size = 32 }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 25 25"
    role="img"
    aria-label="Platzi"
    className={theme === 'dark' ? styles.iconDark : styles.iconLight}
  >
    <path d="M10.64 1.127L2.487 9.282a3.842 3.842 0 000 5.436l8.155 8.155a3.842 3.842 0 005.436 0l2.719-2.718-2.719-2.718-2.718 2.718L5.204 12l8.155-8.155 5.437 5.437-5.437 5.436 2.718 2.719L21.514 12a3.842 3.842 0 000-5.437l-5.448-5.436a3.828 3.828 0 00-5.425 0Z"/>
  </svg>
);
