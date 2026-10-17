import { BRAND, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../config/site';
import { SmartImage } from '../components/SmartImage';
import { Icon } from '../components/Icon';

const DELIVERS = [
  'Fornecimento do material',
  'Instalação da grama sintética',
  'Alambrados, telas e redes',
  'Iluminação de campos',
  'Pisos e complementos',
  'Atendimento em todo o Brasil',
];

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="gutter bg-areia py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <figure className="lg:sticky lg:top-24 lg:self-start">
          <SmartImage
            slug="execucao-preparo-base"
            alt="Dois trabalhadores preparando e nivelando a base de terra de um campo antes da instalação da grama sintética."
            sizes="(min-width: 1024px) 600px, 100vw"
            className="rounded-[4px]"
          />
          <figcaption className="mt-3 text-[0.9375rem] text-grafite-2">Preparação da base, antes da grama.</figcaption>
        </figure>

        <div>
          <h2 id="sobre-titulo" className="heading text-[clamp(2.1rem,4.5vw,3.4rem)]">
            Sobre a <span className="whitespace-nowrap">JS Gramados</span>
          </h2>
          <div className="mt-6 flex max-w-[58ch] flex-col gap-4 text-lg text-grafite-2">
            <p>
              A JS Gramados executa projetos de grama sintética do começo ao fim. Fornecemos o material, fazemos a instalação e
              cuidamos do que fica em volta do gramado, como alambrados, telas, redes e iluminação.
            </p>
            <p>
              Atendemos casas, empresas e espaços esportivos em todo o Brasil. Cada projeto parte do que o cliente precisa: um
              quintal, uma área de lazer ou um campo pronto para jogar.
            </p>
          </div>

          <h3 className="mt-12 text-base font-semibold">O que entregamos</h3>
          <ul className="mt-4 grid border-t border-linha sm:grid-cols-2 sm:gap-x-8">
            {DELIVERS.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-linha py-3.5">
                <span className="size-2 shrink-0 rounded-full bg-verde" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <p className="display mt-14 text-[clamp(1.9rem,3.6vw,2.6rem)] text-verde">{BRAND.tagline}.</p>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2.5 font-semibold underline decoration-grafite/30 decoration-2 underline-offset-[6px] hover:decoration-grafite"
          >
            <Icon name="instagram" />
            Acompanhe obras recentes em {INSTAGRAM_HANDLE}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
