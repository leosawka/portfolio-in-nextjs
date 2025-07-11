declare module 'react-hcaptcha' {
  import * as React from 'react';

  export interface HCaptchaProps {
    sitekey: string;
    onVerify: (token: string) => void;
    onExpire?: () => void;
    onError?: (err: any) => void;
    theme?: 'light' | 'dark';
    size?: 'normal' | 'compact' | 'invisible';
    tabindex?: number;
    languageOverride?: string;
    id?: string;
  }

  const HCaptcha: React.ForwardRefExoticComponent<
    HCaptchaProps & React.RefAttributes<any>
  >;

  export default HCaptcha;
}
