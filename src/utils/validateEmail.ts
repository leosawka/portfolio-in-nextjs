const blacklistedDomains = [
  'yopmail.com',
  'mailinator.com',
  'guerrillamail.com',
  '10minutemail.com',
  'temp-mail.org',
  'maildrop.cc',
  'fakeinbox.com',
  'dispostable.com',
  'mailnull.com',
  'getnada.com',
  'mailnesia.com',
  'throwawaymail.com',
  'trashmail.com',
  'mintemail.com',
  'mailarmy.com',
];

const isEmailFormatValid = (email: string): boolean => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isEmailValid = (email: string): boolean => {
  if (!isEmailFormatValid(email)) return false;

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  return !blacklistedDomains.includes(domain);
};
