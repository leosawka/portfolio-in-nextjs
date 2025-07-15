import { checkRateLimit } from '@/utils/rateLimiter';
import { isEmailValid } from '@/utils/validateEmail';
import { NextApiRequest, NextApiResponse } from 'next';
import { texts } from '@/utils/textsData';

const detectLang = (req: NextApiRequest): 'es' | 'en' => {
  const acceptLang = req.headers['accept-language'] || '';
  return acceptLang.toString().toLowerCase().startsWith('es') ? 'es' : 'en';
};

const getErrorTexts = (lang: 'es' | 'en') => {
  return texts[lang].contactForm.errors;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = detectLang(req);
  const t = getErrorTexts(lang);


  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

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

  const hcaptchaSecret = process.env.HCAPTCHA_SECRET;
  console.log("HCAPTCHA_SECRET:", !!process.env.HCAPTCHA_SECRET);

  if (!hcaptchaToken) {
    return res.status(400).json({ message: t.captchaMissing });
  }

  try {
    console.log("[Contacto] Recibido token:", hcaptchaToken);
    const hcaptchaRes = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `response=${hcaptchaToken}&secret=${hcaptchaSecret}`,
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
  console.log("TELEGRAM_BOT_TOKEN:", !!process.env.TELEGRAM_BOT_TOKEN);
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
console.log("TELEGRAM_CHAT_ID:", !!process.env.TELEGRAM_CHAT_ID);

  const text = `*Nuevo mensaje de contacto*\nNombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${encodeURIComponent(text)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Telegram] API response:', errorData);
      throw new Error('Telegram API error');
    }

    return res.status(200).json({ message: texts[lang].contactForm.success });
  } catch (error) {
    console.error('[Telegram] Error:', error);
    return res.status(500).json({ message: t.telegramFail });
  }
}
