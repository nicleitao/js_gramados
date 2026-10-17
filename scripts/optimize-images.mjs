// Gera versões WebP otimizadas das fotos e dos logos.
// Uso: npm run images
// Entrada: assets-src/photos/*.jpg e assets-src/brand/*.png
// Saída:   public/images/<slug>-<largura>.webp, public/brand/*, src/data/images.generated.json
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const photosIn = path.join(root, 'assets-src/photos');
const brandIn = path.join(root, 'assets-src/brand');
const photosOut = path.join(root, 'public/images');
const brandOut = path.join(root, 'public/brand');
const WIDTHS = [480, 800, 1280];

await mkdir(photosOut, { recursive: true });
await mkdir(brandOut, { recursive: true });

const manifest = {};
for (const file of (await readdir(photosIn)).filter((f) => f.endsWith('.jpg')).sort()) {
  const slug = file.replace(/\.jpg$/, '');
  const img = sharp(path.join(photosIn, file)).rotate();
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  widths.push(Math.min(width, 1280));
  const unique = [...new Set(widths)];
  for (const w of unique) {
    await sharp(path.join(photosIn, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(photosOut, `${slug}-${w}.webp`));
  }
  // cor média, usada como fundo enquanto a foto carrega
  const { dominant } = await sharp(path.join(photosIn, file)).stats();
  const hex = '#' + [dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, '0')).join('');
  manifest[slug] = { width, height, widths: unique, color: hex };
}
await writeFile(path.join(root, 'src/data/images.generated.json'), JSON.stringify(manifest, null, 2) + '\n');

// Logos
await sharp(path.join(brandIn, 'logo-horizontal.png')).resize({ height: 96 }).webp({ quality: 90 }).toFile(path.join(brandOut, 'logo-horizontal.webp'));
await sharp(path.join(brandIn, 'logo-horizontal.png')).resize({ height: 96 }).png().toFile(path.join(brandOut, 'logo-horizontal.png'));
await sharp(path.join(brandIn, 'logo-full.png')).resize({ width: 520 }).webp({ quality: 90 }).toFile(path.join(brandOut, 'logo-full.webp'));

// Favicons: símbolo JS sobre o fundo escuro da marca
const BG = { r: 11, g: 32, b: 21, alpha: 1 };
async function icon(size, name) {
  const pad = Math.round(size * 0.12);
  const mark = await sharp(path.join(brandIn, 'logo-mark.png'))
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'inside' })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(root, 'public', name));
}
await icon(32, 'favicon-32.png');
await icon(180, 'apple-touch-icon.png');
await icon(512, 'icon-512.png');

// Imagem de compartilhamento (Open Graph) 1200x630: foto real + logo
const ogLogo = await sharp(path.join(brandIn, 'logo-full.png')).resize({ width: 420 }).toBuffer();
const ogPhoto = await sharp(path.join(photosIn, 'arena-redes-estrutura.jpg')).resize(700, 630, { fit: 'cover' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: BG } })
  .composite([
    { input: ogPhoto, left: 500, top: 0 },
    { input: ogLogo, left: 40, top: 160 },
  ])
  .jpeg({ quality: 82 })
  .toFile(path.join(root, 'public/og-image.jpg'));

console.log(`Fotos: ${Object.keys(manifest).length} · logos, favicons e og-image gerados.`);
