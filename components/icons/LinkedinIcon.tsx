interface IconProps {
  theme: 'light' | 'dark';
  size?: number;
}

export const LinkedinIcon = ({ theme, size = 32 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 72 72"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="LinkedIn"
    role="img"
    style={{
      filter:
        theme === 'dark'
          ? 'drop-shadow(2px 2px 2px #000)'
          : 'drop-shadow(2px 2px 2px #ccc)',
    }}
  >
    <rect width="72" height="72" rx="8" fill={theme === 'dark' ? '#fff' : '#3A3A3A'} />
    <path
      d="M62 62H51.32V43.8c0-4.99-1.9-7.78-5.85-7.78-4.3 0-6.54 2.9-6.54 7.78V62H28.63V27.33h10.26v4.67c0 0 3.1-5.73 10.47-5.73 7.35 0 12.6 4.49 12.6 13.78V62ZM16.35 22.79C12.84 22.79 10 19.93 10 16.4c0-3.53 2.84-6.4 6.35-6.4s6.35 2.87 6.35 6.4c0 3.53-2.84 6.39-6.35 6.39ZM11.03 62h10.74V27.33H11.03V62Z"
      fill={theme === 'dark' ? '#3A3A3A' : '#fff'}
    />
  </svg>
);
