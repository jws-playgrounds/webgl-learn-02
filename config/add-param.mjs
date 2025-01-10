import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function transformHtml(filePath) {
  // 更新パラメータ作成
  const date = new Date();
  const param = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

  let html = fs.readFileSync(filePath, 'utf8');

  // CSSファイルにパラメータを追加 外部ファイルは除外
  html = html.replace(
    /(?=.*<link)(?=.*css)(?!.*https)(?!.*http).*$/gm,
    (match) => {
      // console.log('CSS Match:', match);
      return match.replace(/\.css/, `.css?${param}`);
    },
  );

  // JSファイルにパラメータを追加 外部ファイルは除外
  html = html.replace(
    /(?=.*<script)(?=.*js)(?!.*https)(?!.*http).*$/gm,
    (match) => {
      // console.log('JS Match:', match);
      return match.replace(/\.js/, `.js?${param}`);
    },
  );

  // 変更を保存
  fs.writeFileSync(filePath, html);
}

async function processDirectory(dirPath) {
  const files = await fs.promises.readdir(dirPath);

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const stats = await fs.promises.stat(filePath);

      if (stats.isDirectory()) {
        await processDirectory(filePath);
      } else if (path.extname(filePath) === '.html') {
        transformHtml(filePath);
      }
    }),
  );
}

const distPath = path.join(__dirname, '../dist');
processDirectory(distPath).catch((err) => {
  console.error(err);
  process.exit(1);
});
