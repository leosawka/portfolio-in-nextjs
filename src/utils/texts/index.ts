import { es } from './es';
import { en } from './en';
import type { Language } from './shared';
import type { TextContent } from '../../types';

export function getTexts(lang: string): TextContent {
  const key = (lang || '').toLowerCase() as Language | string;
  switch (key) {
    case 'es':
    case 'es-ar':
    case 'es-la':
      return es;
    case 'en':
    case 'en-us':
    case 'en-gb':
      return en;
    default:
      return en;
  }
}
