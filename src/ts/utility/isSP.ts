export default function isSP(): boolean {
  const breakPoint = 768;
  const width = window.innerWidth;
  return width < breakPoint;
}
