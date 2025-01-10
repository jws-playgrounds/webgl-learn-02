import { config } from 'dotenv';
import { rimraf } from 'rimraf';

config();

const astroJsPath = `dist${process.env.PUBLIC_SITE_PATH}assets/js/chunks/astro.js`;

console.log(`Removing: ${astroJsPath}`);  // パスを出力して確認

rimraf(astroJsPath,{ glob: false }, (err) => {
  if (err) {
    console.error('Error removing astro.js:', err);
  } else {
    console.log('astro.js removed successfully.');
  }
});
