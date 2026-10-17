import manifest from '../data/images.generated.json';
import type { ImageMeta } from '../types';

const images = manifest as Record<string, ImageMeta>;
const BASE = `${import.meta.env.BASE_URL}images/`;

export function getImage(slug: string): ImageMeta | undefined {
  return images[slug];
}

export function imageSrc(slug: string, width: number): string {
  return `${BASE}${slug}-${width}.webp`;
}

export function srcSet(slug: string): string {
  const meta = images[slug];
  if (!meta) return '';
  return meta.widths.map((w) => `${imageSrc(slug, w)} ${w}w`).join(', ');
}

export function largestSrc(slug: string): string {
  const meta = images[slug];
  return meta ? imageSrc(slug, meta.widths[meta.widths.length - 1]) : '';
}
