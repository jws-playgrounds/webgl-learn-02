import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sassGlobImports from 'vite-plugin-sass-glob-import';

// const tsEntryPoints = (() => {
//   const __dirname = path.dirname(fileURLToPath(import.meta.url));
//   const dir = path.join(__dirname, 'src/ts/_entry');
//   const files = fs.readdirSync(dir);
//   const tsFiles = files.filter((file) => {
//     return path.extname(file) === '.ts';
//   });
//   const tsEntryPoints = tsFiles.map((file) => {
//     return path.basename(file, '.ts');
//   });
//   return tsEntryPoints;
// })();

const isWP = process.env.IS_WP === 'true';
const isImg = process.env.IS_IMG === 'true';

const env = loadEnv(import.meta.env.MODE, process.cwd(), '');

export default defineConfig({
  env: { IS_WP: isWP },
  site: `${env.PUBLIC_SITE_URL}${
    isWP ? env.PUBLIC_WP_PATH : env.PUBLIC_SITE_PATH
  }`,
  base: `${isWP ? env.PUBLIC_WP_PATH : env.PUBLIC_SITE_PATH}`,
  output: 'static',
  outDir: `./dist/${isWP ? env.PUBLIC_WP_PATH : env.PUBLIC_SITE_PATH}`,
  devToolbar: { enabled: false },
  build: {
    format: 'preserve',
    assets: 'assets',
    // assetsPrefix: '.',
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [sassGlobImports()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        }
      }
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // for (let ts of tsEntryPoints) {
            //   if (id.includes(`${ts}.ts`)) {
            //     return `${ts}`;
            //   }
            // }
            // if (id.includes('empty-middleware')) return 'empty-middleware';
            // if (id.includes('astrojs-manifest')) return '@astrojs-manifest';
            // if (id.includes('astro-renderers')) return '@astro-renderers';
            if (id.includes('astro')) return 'astro';
            if (id.includes('node_modules')) return 'vendor';
            return null;
          },
          entryFileNames: `assets/js/entry.js`,
          chunkFileNames: 'assets/js/chunks/[name].js',
          assetFileNames: `assets/css/main[extname]`,
        },
      },
    },
  },
});
