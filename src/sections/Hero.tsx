import { MESSAGES, WHATSAPP_DISPLAY } from '../config/site';
import { getImage, imageSrc, srcSet } from '../lib/images';
import { PitchLines } from '../components/PitchLines';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppButton } from '../components/WhatsAppButton';

const DESKTOP = 'arena-redes-estrutura';
const MOBILE = 'campo-society-marcacao';

export function Hero() {
  const desk = getImage(DESKTOP);
  const mob = getImage(MOBILE);

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="on-dark relative overflow-hidden bg-noite text-off">
      <div className="lg:grid lg:min-h-[640px] lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)]">
        {/* Foto: no celular vem primeiro, recortada em 5:4; no desktop ocupa a coluna direita inteira */}
        <figure className="relative lg:order-2">
          <picture>
            <source media="(min-width: 1024px)" srcSet={srcSet(DESKTOP)} sizes="58vw" type="image/webp" />
            <source media="(min-width: 640px)" srcSet={srcSet(DESKTOP)} sizes="100vw" type="image/webp" />
            <img
              src={mob ? imageSrc(MOBILE, 480) : undefined}
              srcSet={srcSet(MOBILE)}
              sizes="100vw"
              width={desk?.width}
              height={desk?.height}
              alt="Campo esportivo de grama sintética com marcação branca, instalado pela JS Gramados."
              fetchPriority="high"
              decoding="sync"
              className="block aspect-[5/4] w-full object-cover object-[50%_62%] sm:aspect-[16/10] sm:object-center lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              style={{ backgroundColor: desk?.color }}
            />
          </picture>
          <figcaption className="absolute right-3 bottom-3 rounded-[4px] bg-noite/80 px-2.5 py-1 text-sm text-off lg:right-5 lg:bottom-5">
            Campo esportivo
          </figcaption>
        </figure>

        <div className="gutter relative lg:order-1 lg:flex lg:items-center lg:!pl-[max(20px,calc((100vw-1240px)/2+20px))]">
          <PitchLines
            animate
            className="pointer-events-none absolute -bottom-40 -left-48 hidden w-[620px] text-off/[0.07] lg:block"
          />
          <div className="relative w-full py-10 sm:py-14 lg:max-w-[540px] lg:py-20 lg:pr-12">
            <h1 id="hero-titulo" className="display text-[clamp(2.6rem,7.5vw,4.6rem)]">
              Do quintal à arena esportiva.
            </h1>
            <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-nevoa sm:text-xl">
              Grama sintética, alambrados, telas, redes e iluminação. Fornecemos o material e fazemos a instalação, em todo o Brasil.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={MESSAGES.quote} size="lg">
                Fale conosco
              </WhatsAppButton>
              <a
                href="#projetos"
                className="inline-flex min-h-14 items-center justify-center rounded-[6px] px-7 font-semibold text-off ring-1 ring-inset ring-off/35 transition-colors hover:bg-off/5 hover:ring-off"
              >
                Ver projetos
              </a>
            </div>
            <p className="mt-6 text-[0.9375rem] text-nevoa">
              WhatsApp <span className="font-semibold whitespace-nowrap text-off">{WHATSAPP_DISPLAY}</span>
            </p>

            {/* Prova de que o trabalho também é residencial, logo na primeira dobra */}
            <figure className="mt-10 hidden max-w-[300px] items-center gap-4 lg:flex">
              <SmartImage
                slug="residencial-canteiro-flores"
                alt="Área externa de uma casa com grama sintética e canteiro de flores vermelhas."
                sizes="96px"
                fit="cover"
                priority
                className="aspect-square !w-24 shrink-0 rounded-[4px]"
              />
              <figcaption className="text-[0.9375rem] leading-snug text-nevoa">
                Também em jardins, quintais e áreas de lazer.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
