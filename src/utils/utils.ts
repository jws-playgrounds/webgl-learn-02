/* eslint-disable */
export const getEnv = (varName: string): string => {
  return import.meta.env[varName];
};
/* eslint-enable */

export const isWp = process.env.IS_WP === 'true';

export const isImg = process.env.IS_IMG === 'true';

export const sitePath = isWp
  ? getEnv('PUBLIC_WP_PATH')
  : isImg
    ? `${getEnv('PUBLIC_IMAGE_URL')}${getEnv('PUBLIC_SITE_PATH')}`
    : getEnv('PUBLIC_SITE_PATH');

export const headImageUrl = isWp
  ? `${getEnv('PUBLIC_SITE_URL')}${getEnv('PUBLIC_WP_PATH')}/${getEnv(
      'PUBLIC_IMAGE_PATH',
    )}`
  : isImg
    ? `${getEnv('PUBLIC_IMAGE_URL')}/${getEnv('PUBLIC_IMAGE_PATH')}`
    : `${getEnv('PUBLIC_SITE_URL')}/${getEnv('PUBLIC_IMAGE_PATH')}`;

export const splitAndJoinSrc = (source: string) => {
  const parts = source.split('/');
  const path = parts.slice(0, -1).join('/');
  const filename = parts[parts.length - 1]; // ファイル名の拡張子を保持
  // パスが空ではない場合のみ、末尾にスラッシュを追加
  const fullPath = path ? `${path}/` : '';
  return { path: fullPath, filename };
};
