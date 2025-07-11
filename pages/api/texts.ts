import type { NextApiRequest, NextApiResponse } from 'next';
import { texts, Language } from '@/utils/textsData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;
  const language = (lang === 'es' ? 'es' : 'en') as Language;

  res.status(200).json(texts[language]);
}
