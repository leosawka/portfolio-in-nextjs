interface IconProps {
  theme: 'light' | 'dark';
  size?: number;
}

export const GmailIcon = ({ theme, size = 32 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="52 42 88 66"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Gmail"
    role="img"
    style={{
      filter:
        theme === 'dark'
          ? 'drop-shadow(2px 2px 2px #000)'
          : 'drop-shadow(2px 2px 2px #ccc)',
    }}
  >
    {/* <path fill="#525554" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
    <path fill="#444843" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
    <path fill="#FbFcF4" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
    <path fill="#BAB3B5" d="M72 74V48l24 18 24-18v26L96 92" />
    <path fill="#15121f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" /> */}
    <path fill={theme === 'dark' ? '#525554' : '#525554'} d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
    <path fill={theme === 'dark' ? '#343813' : '#444843'} d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
    <path fill={theme === 'dark' ? '#CBCCC4' : '#FbFcF4'} d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
    <path fill={theme === 'dark' ? '#8A8385' : '#BAB3B5'} d="M72 74V48l24 18 24-18v26L96 92" />
    <path fill={theme === 'dark' ? '#000' : '#15121f'} d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
  </svg>
);
