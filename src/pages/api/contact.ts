import { checkRateLimit } from '@/utils/rateLimiter';
import { isEmailValid } from '@/utils/validateEmail';
import type { NextApiRequest, NextApiResponse } from 'next';

import { es } from '../../../src/utils/texts/es';
import { en } from '../../../src/utils/texts/en';

type Lang = 'es' | 'en';
const getTexts = (lang: Lang) => (lang === 'en' ? en : es);

const resolveLang = (req: NextApiRequest): Lang => {
  const fromBody = typeof req.body?.lang === 'string' ? req.body.lang : undefined;
  const fromQuery = typeof req.query?.lang === 'string' ? req.query.lang : undefined;
  const acceptLang = (req.headers['accept-language'] || '').toString().toLowerCase();
  const raw = (fromBody || fromQuery || (acceptLang.startsWith('es') ? 'es' : 'en')).toLowerCase();
  return raw === 'en' ? 'en' : 'es';
};

const getErrorTexts = (t: any) => ({
  missingFields: t.contactForm.error,
  invalidEmail: t.contactForm.invalidFormat,
  disposableEmail: t.contactForm.disposableEmail,
  rateLimit: t.contactForm.error,
  captchaMissing: t.contactForm.error,
  captchaFail: t.contactForm.error,
  telegramFail: t.contactForm.error,
});

const escapeMd = (s: string) =>
  String(s).replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, '\\$1');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const lang = resolveLang(req);
  const locale = getTexts(lang);
  const t = getErrorTexts(locale);

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (!checkRateLimit(String(ip))) {
    return res.status(429).json({ message: t.rateLimit });
  }

  const { name, email, message, hcaptchaToken } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: t.missingFields });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ message: t.invalidEmail });
  }

  if (!hcaptchaToken) {
    return res.status(400).json({ message: t.captchaMissing });
  }

  if (!process.env.HCAPTCHA_SECRET) {
    console.error('[hCaptcha] Missing HCAPTCHA_SECRET');
    return res.status(500).json({ message: t.captchaFail });
  }

  try {
    const body = new URLSearchParams({
      response: String(hcaptchaToken),
      secret: String(process.env.HCAPTCHA_SECRET),
    }).toString();

    const hcaptchaRes = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    const hcaptchaData = await hcaptchaRes.json();

    if (!hcaptchaData.success) {
      console.error('[hCaptcha] Invalid token:', hcaptchaData);
      return res.status(403).json({ message: t.captchaFail });
    }
  } catch (error) {
    console.error('[hCaptcha] Error:', error);
    return res.status(500).json({ message: t.captchaFail });
  }

  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (!telegramBotToken || !telegramChatId) {
    console.error('[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return res.status(500).json({ message: t.telegramFail });
  }

  const text = [
    `*${escapeMd('Nuevo mensaje de contacto')}*`,
    `Nombre: ${escapeMd(name)}`,
    `Email: ${escapeMd(email)}`,
    `Mensaje:\n${escapeMd(message)}`
  ].join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[Telegram] API response:', errorData);
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ message: locale.contactForm.success });
  } catch (error) {
    console.error('[Telegram] Error:', error);
    return res.status(500).json({ message: t.telegramFail });
  }
}
