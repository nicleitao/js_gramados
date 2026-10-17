import { useState } from 'react';
import { getImage, srcSet, largestSrc } from '../lib/images';

interface Props {
  slug: string;
  alt: string;
  /** atributo sizes do srcset */
  sizes: string;
  className?: string;
  /** imagens da primeira dobra: carregamento imediato */
  priority?: boolean;
  /** 'cover' só quando o corte não esconde o projeto */
  fit?: 'cover' | 'contain' | 'natural';
  focus?: string;
}

/**
 * Imagem responsiva com dimensões reais (evita saltos de layout),
 * carregamento tardio e um bloco neutro caso o arquivo esteja ausente.
 */
export function SmartImage({ slug, alt, sizes, className = '', priority = false, fit = 'natural', focus }: Props) {
  const meta = getImage(slug);
  const [failed, setFailed] = useState(false);

  if (!meta || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-areia text-sm text-grafite-2 ${className}`}
        style={{ aspectRatio: meta ? `${meta.width} / ${meta.height}` : '4 / 3' }}
      >
        <span aria-hidden="true">Imagem indisponível</span>
      </div>
    );
  }

  const fitClass = fit === 'cover' ? 'object-cover' : fit === 'contain' ? 'object-contain' : 'h-auto';
  return (
    <img
      src={largestSrc(slug)}
      srcSet={srcSet(slug)}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setFailed(true)}
      className={`block w-full ${fitClass} ${className}`}
      style={{ backgroundColor: meta.color, objectPosition: focus }}
    />
  );
}
