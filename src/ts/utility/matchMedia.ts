export const matchMedia = (mediaQuery: string): boolean => {
  return window.matchMedia(mediaQuery).matches;
};
