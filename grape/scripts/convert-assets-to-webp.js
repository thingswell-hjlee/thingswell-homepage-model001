const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.resolve(__dirname, '../src/assets');

function isImageFile(filename) {
  return /\.(png|jpe?g|jpg)$/i.test(filename);
}

async function convertFile(filePath) {
  const ext = path.extname(filePath);
  const outPath = filePath.replace(ext, '.webp');
  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(outPath);
    console.log('Converted:', filePath, '->', outPath);
  } catch (err) {
    console.error('Failed:', filePath, err.message);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && isImageFile(entry.name)) {
      convertFile(fullPath);
    }
  }
}

console.log('Starting conversion in', SRC_DIR);
walkDir(SRC_DIR);



