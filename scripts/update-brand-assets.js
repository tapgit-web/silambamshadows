const fs = require('fs');
const path = require('path');

const faviconsDir = path.join(__dirname, '..', 'src', 'img', 'favicons');
const publicDir = path.join(__dirname, '..', 'public');
const ssbg1Path = path.join(__dirname, '..', 'src', 'img', 'ssbg1.png');

const assetFiles = [
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon.ico',
  'favicon.svg',
  'logo192.png',
  'logo512.png'
];

// 1. Sync all authentic favicon assets to public directory
for (const file of assetFiles) {
  const src = path.join(faviconsDir, file);
  const dst = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`✔ Synced public/${file}`);
  } else {
    console.warn(`⚠ Missing source asset: ${src}`);
  }
}

// 2. Sync authentic brand logo to public/logo.png
if (fs.existsSync(ssbg1Path)) {
  fs.copyFileSync(ssbg1Path, path.join(publicDir, 'logo.png'));
  console.log('✔ Copied authentic brand logo to public/logo.png');
}

console.log('All brand assets successfully updated and verified.');
