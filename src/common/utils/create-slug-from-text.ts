import { generateRandomSufix } from './generate-random-sufix';
import { slugify } from './slugify';

export const createSlugFromText = (text: string) => {
  return `${slugify(text)}-${generateRandomSufix()}`;
};
