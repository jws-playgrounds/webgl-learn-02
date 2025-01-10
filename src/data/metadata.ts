import { getEnv, headImageUrl, sitePath } from '@utils/utils';

const assetsPath = getEnv('PUBLIC_IMAGE_PATH');

// const genUrl = (id) => {
//   return `/${import.meta.env.PUBLIC_SITE_URL}${import.meta.env.PUBLIC_SITE_PATH}${id}/`;
// };

// const genHeadUrl = (id) => {
//   return `${import.meta.env.PUBLIC_SITE_URL}${import.meta.env.PUBLIC_SITE_PATH}${id}/`;
// };

const metadata = {
  global: {
    og_type: 'website',
    favicon: `${sitePath}${assetsPath}favicon.webp`,
    og_image: `${sitePath}${assetsPath}ogp.webp`,
  },
  top: {
    lang: 'ja',
    title: ' | JWS Playgrounds',
    description:
      'フロントエンドアニメーションの作品集。リアルタイムで動作するデモとコードサンプルを通じて、実装の詳細をご紹介します。',
    url: `${getEnv('PUBLIC_SITE_PATH')}/`,
    head_url: `${getEnv('PUBLIC_SITE_URL')}${getEnv('PUBLIC_SITE_PATH')}`,
  },
};

export default metadata;
