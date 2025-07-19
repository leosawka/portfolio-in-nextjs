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
    viewBox="50% 50% 40 50"
    role="img"
    aria-label="Platzi"
    className={theme === 'dark' ? styles.iconDark : styles.iconLight}
  >
    {/* <path d="M229.3 109.6l-82.9-82.9c-9.6-9.6-25.2-9.6-34.8 0L26.7 112.3c-9.6 9.6-9.6 25.2 0 34.8l82.9 82.9c9.6 9.6 25.2 9.6 34.8 0l84.9-84.9c7.5-7.5 7.5-19.7 0-27.2zm-40.4 6.8l-74 74-48.1-48.1 74-74 48.1 48.1z" /> */}
    <path d="M10.64 1.127L2.487 9.282a3.842 3.842 0 000 5.436l8.155 8.155a3.842 3.842 0 005.436 0l2.719-2.718-2.719-2.718-2.718 2.718L5.204 12l8.155-8.155 5.437 5.437-5.437 5.436 2.718 2.719L21.514 12a3.842 3.842 0 000-5.437l-5.448-5.436a3.828 3.828 0 00-5.425 0Z"/>
  </svg>
);
