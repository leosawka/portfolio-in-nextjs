import type { NextApiRequest, NextApiResponse } from 'next';
import { en } from '../../../src/utils/texts/en';
import { es } from '../../../src/utils/texts/es';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang = 'en' } = req.query;
  const data = lang === 'es' ? es : en;
  res.status(200).json(data);
}
