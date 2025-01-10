import { getEnv, sitePath, splitAndJoinSrc } from '@utils/utils';

export default function bgi(src: string, sp?: boolean): string {
  const assetsPath = getEnv('PUBLIC_IMAGE_PATH');
  const { path: pcPath, filename: pcFilename } = splitAndJoinSrc(src);

  const pcSrc = `${sitePath}${assetsPath}${pcPath}${pcFilename}`;
  const spSrc = sp ? `${sitePath}${assetsPath}${pcPath}sp/${pcFilename}` : null;

  const pcImagePath = `--pcbg: url('${pcSrc}.webp');`;
  const spImagePath = sp ? `--spbg: url('${spSrc}.webp');` : '';

  const bgi = `${pcImagePath}${spImagePath}`;
  return bgi;
}
