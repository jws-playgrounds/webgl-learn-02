import { promises as fs } from 'fs';
import path from 'path';
import { mkdirp } from 'mkdirp';
import sharp from 'sharp';

const SEARCH_EXT_LIST = ['.jpg', '.jpeg', '.png'];

const searchFiles = async (dirPath, pubDirPath) => {
  const allDirents = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const dirent of allDirents) {
    if (dirent.isDirectory()) {
      const newDirPath = path.join(dirPath, dirent.name);
      const newPubPath = path.join(pubDirPath, dirent.name);
      const newFiles = await searchFiles(newDirPath, newPubPath);
      files.push(...newFiles);
    }
    if (
      dirent.isFile() &&
      SEARCH_EXT_LIST.includes(path.extname(dirent.name).toLowerCase())
    ) {
      files.push({
        dirName: path.join(dirPath),
        pubDirName: path.join(pubDirPath),
        fileName: dirent.name,
        ext: path.extname(dirent.name).toLowerCase(),
      });
      await mkdirp(path.join(pubDirPath));
    }
  }
  return files;
};

(async () => {
  const SEARCH_TARGET_DIR = './src/images';
  const PUBLIC_TARGET_DIR = './public/assets/images';
  const imageFileInfos = await searchFiles(
    SEARCH_TARGET_DIR,
    PUBLIC_TARGET_DIR,
  );

  const totalImages = imageFileInfos.length;
  console.log(`Found ${totalImages} images to process.`);

  const convertImage = async ({ dirName, pubDirName, fileName }) => {
    const webpOptions = {
      quality: 80,
      alphaQuality: 80,
      lossless: false,
      nearLossless: false,
      smartSubsample: true,
    };

    const avifOptions = {
      quality: 80, // AVIFの品質設定（0〜100）
      chromaSubsampling: '4:2:0', // チャーマサブサンプリング
      lossless: false,
      // その他のオプションは必要に応じて追加
    };

    // ディレクトリの存在を確認し、なければ作成
    await mkdirp(pubDirName);

    const inputPath = path.join(dirName, fileName);
    const baseName = path.parse(fileName).name;

    const sharpInstance = sharp(inputPath, {
      sequentialRead: true,
    });

    try {
      // WebP変換
      await sharpInstance
        .clone()
        .webp(webpOptions)
        .toFile(path.join(pubDirName, `${baseName}.webp`));
      console.log(`Converted to WebP: ${path.join(pubDirName, `${baseName}.webp`)}`);

      // AVIF変換
      await sharpInstance
        .clone()
        .avif(avifOptions)
        .toFile(path.join(pubDirName, `${baseName}.avif`));
      console.log(`Converted to AVIF: ${path.join(pubDirName, `${baseName}.avif`)}`);
    } catch (err) {
      console.error(`Error converting ${inputPath}: ${err}`);
    }
  };

  // 並列処理の制限を設ける（必要に応じて）
  const concurrency = 5;
  const queue = [...imageFileInfos];
  const promises = [];

  for (let i = 0; i < concurrency; i++) {
    const worker = async () => {
      while (queue.length > 0) {
        const fileInfo = queue.shift();
        if (fileInfo) {
          await convertImage(fileInfo);
        }
      }
    };
    promises.push(worker());
  }

  await Promise.all(promises);
  console.log('All images have been processed.');
})();
