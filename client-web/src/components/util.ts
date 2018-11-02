import { isURL } from 'validator';

export const isLink = (s?: string) => {
  if (s != null) {
    return (
      isURL(s) || s.startsWith('http://localhost') || s.startsWith('https://localhost') || s.startsWith('/api/files')
    );
  }
  return false;
};
