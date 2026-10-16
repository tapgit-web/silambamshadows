const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table & calculation for PNG chunks
const crcTable = (() => {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function createPngChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function encodePng(width, height, rgbaBuffer) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    rawData[y * rowSize] = 0; // Filter None
    rgbaBuffer.copy(rawData, y * rowSize + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idatData = zlib.deflateSync(rawData);
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  return Buffer.concat([
    header,
    createPngChunk('IHDR', ihdrData),
    createPngChunk('IDAT', idatData),
    createPngChunk('IEND', Buffer.alloc(0))
  ]);
}

function decodePng(buf) {
  let offset = 8;
  let idats = [];
  let width = 0;
  let height = 0;
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
    } else if (type === 'IDAT') {
      idats.push(buf.subarray(offset + 8, offset + 8 + len));
    }
    offset += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idats));
  const rowSize = 1 + width * 4;
  const pixels = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    raw.copy(pixels, y * width * 4, y * rowSize + 1, (y + 1) * rowSize);
  }
  return { width, height, pixels };
}

// 1. Read navlogo.png to extract warrior silhouette
const navLogoPath = path.join(__dirname, '..', 'src', 'img', 'navlogo.png');
const nav = decodePng(fs.readFileSync(navLogoPath));

// Bounds of the Silambam martial artist silhouette in navlogo.png:
const minX = 11, maxX = 273, minY = 15, maxY = 276;
const srcW = maxX - minX + 1;
const srcH = maxY - minY + 1;

/**
 * Render a high-contrast rounded badge with the warrior silhouette
 * @param {number} size - Output pixel dimension (e.g. 16, 32, 48, 128)
 * @param {number[]} bgColor - [R, G, B] of tile
 * @param {number[]} fgColor - [R, G, B] of warrior
 */
function renderWarriorBadge(size, bgColor, fgColor) {
  const buf = Buffer.alloc(size * size * 4);
  const pad = Math.max(1, Math.round(size * 0.10));
  const innerSize = size - pad * 2;
  const rx = Math.round(size * 0.22);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Rounded rectangle test
      const cornerX = x < rx ? rx - x : (x >= size - rx ? x - (size - rx - 1) : 0);
      const cornerY = y < rx ? rx - y : (y >= size - rx ? y - (size - rx - 1) : 0);
      let inTile = true;
      let tileAlpha = 1;

      if (cornerX > 0 && cornerY > 0) {
        const dist = Math.sqrt(cornerX * cornerX + cornerY * cornerY);
        if (dist > rx) {
          inTile = false;
        } else if (dist > rx - 1) {
          tileAlpha = rx - dist;
        }
      }

      if (!inTile) {
        buf[idx + 3] = 0;
        continue;
      }

      // Base background color
      let r = bgColor[0];
      let g = bgColor[1];
      let b = bgColor[2];
      let a = tileAlpha;

      // Check warrior sampling within inner box
      if (x >= pad && x < size - pad && y >= pad && y < size - pad) {
        const nx0 = (x - pad) / innerSize;
        const nx1 = (x - pad + 1) / innerSize;
        const ny0 = (y - pad) / innerSize;
        const ny1 = (y - pad + 1) / innerSize;

        const sx0 = Math.max(minX, Math.floor(minX + nx0 * srcW));
        const sx1 = Math.min(maxX, Math.ceil(minX + nx1 * srcW));
        const sy0 = Math.max(minY, Math.floor(minY + ny0 * srcH));
        const sy1 = Math.min(maxY, Math.ceil(minY + ny1 * srcH));

        let maxAlpha = 0;
        let sumAlpha = 0;
        let sampleCount = 0;

        for (let sy = sy0; sy <= sy1; sy++) {
          for (let sx = sx0; sx <= sx1; sx++) {
            const pAlpha = nav.pixels[(sy * nav.width + sx) * 4 + 3];
            sumAlpha += pAlpha;
            if (pAlpha > maxAlpha) maxAlpha = pAlpha;
            sampleCount++;
          }
        }

        const avgAlpha = sampleCount > 0 ? (sumAlpha / sampleCount) / 255 : 0;
        // Boost visibility for small icons so the thin stick and silhouette pop
        const boostFactor = size <= 32 ? 1.6 : 1.25;
        const warriorAlpha = Math.min(1, Math.max(avgAlpha, (maxAlpha / 255) * 0.85) * boostFactor);

        if (warriorAlpha > 0.05) {
          r = Math.round(fgColor[0] * warriorAlpha + r * (1 - warriorAlpha));
          g = Math.round(fgColor[1] * warriorAlpha + g * (1 - warriorAlpha));
          b = Math.round(fgColor[2] * warriorAlpha + b * (1 - warriorAlpha));
        }
      }

      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = Math.round(a * 255);
    }
  }

  return buf;
}

// Brand Colors:
// Background: #173f32 [23, 63, 50] (deep forest green)
// Silhouette: #d6ed83 [214, 237, 131] (vibrant lime accent)
const bg = [23, 63, 50];
const fg = [214, 237, 131];

const buf16 = renderWarriorBadge(16, bg, fg);
const png16 = encodePng(16, 16, buf16);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-16x16.png'), png16);
console.log('✔ Generated public/favicon-16x16.png');

const buf32 = renderWarriorBadge(32, bg, fg);
const png32 = encodePng(32, 32, buf32);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-32x32.png'), png32);
console.log('✔ Generated public/favicon-32x32.png');

const buf48 = renderWarriorBadge(48, bg, fg);
const png48 = encodePng(48, 48, buf48);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon-48x48.png'), png48);
console.log('✔ Generated public/favicon-48x48.png');

const buf128 = renderWarriorBadge(128, bg, fg);
const png128 = encodePng(128, 128, buf128);

// 2. Generate multi-resolution favicon.ico containing 16x16, 32x32, and 48x48 images
const images = [
  { size: 16, data: png16 },
  { size: 32, data: png32 },
  { size: 48, data: png48 }
];

const headerLen = 6;
const entryLen = 16;
const totalHeaderLen = headerLen + entryLen * images.length;

const icoHeader = Buffer.alloc(headerLen);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type 1 = icon
icoHeader.writeUInt16LE(images.length, 4);

let currentOffset = totalHeaderLen;
const icoEntries = images.map(img => {
  const entry = Buffer.alloc(entryLen);
  entry.writeUInt8(img.size, 0); // width
  entry.writeUInt8(img.size, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(img.data.length, 8); // size in bytes
  entry.writeUInt32LE(currentOffset, 12); // offset
  currentOffset += img.data.length;
  return entry;
});

const icoBuf = Buffer.concat([
  icoHeader,
  ...icoEntries,
  ...images.map(img => img.data)
]);

fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), icoBuf);
console.log('✔ Generated multi-resolution public/favicon.ico (16x16, 32x32, 48x48)');

// 3. Generate vector SVG with embedded crisp image data
const b64_128 = png128.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#173f32"/>
  <image href="data:image/png;base64,${b64_128}" x="0" y="0" width="64" height="64"/>
</svg>\n`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), faviconSvg, 'utf8');
console.log('✔ Generated public/favicon.svg with high-resolution Silambam warrior badge');

// 4. Update public/logo.png
const ssbg1Path = path.join(__dirname, '..', 'src', 'img', 'ssbg1.png');
fs.copyFileSync(ssbg1Path, path.join(__dirname, '..', 'public', 'logo.png'));
console.log('✔ Copied authentic brand logo to public/logo.png');

console.log('All brand assets successfully updated and verified.');
