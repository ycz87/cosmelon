import sharp from 'sharp';
import { mkdir } from 'fs/promises';

const src = './watermelon-logo-transparent.png';

await mkdir('./resources', { recursive: true });

// Generate 1024x1024 icon
await sharp(src)
  .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('./resources/icon.png');

console.log('✅ resources/icon.png (1024x1024)');

// Generate 2732x2732 splash with green background + centered logo
const logoBuffer = await sharp(src)
  .resize(600, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 2732,
    height: 2732,
    channels: 4,
    background: { r: 34, g: 197, b: 94, alpha: 1 } // #22c55e
  }
})
  .composite([{ input: logoBuffer, gravity: 'centre' }])
  .png()
  .toFile('./resources/splash.png');

console.log('✅ resources/splash.png (2732x2732)');

// Also generate icon-only version for dark splash
await sharp({
  create: {
    width: 2732,
    height: 2732,
    channels: 4,
    background: { r: 12, g: 12, b: 15, alpha: 1 } // #0c0c0f dark theme
  }
})
  .composite([{ input: logoBuffer, gravity: 'centre' }])
  .png()
  .toFile('./resources/splash-dark.png');

console.log('✅ resources/splash-dark.png (2732x2732)');
