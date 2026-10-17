import { getImage, largestSrc } from '../lib/images';
import { SmartImage } from '../components/SmartImage';

const DETAILS = [
  {
    slug: 'detalhe-marca-penalti',
    alt: 'Marca do pênalti feita com fibras brancas no meio do gramado verde.',
    caption: 'Marca do pênalti em fibra branca',
  },
  {
    slug: 'material-base-fibra',
    alt: 'Rolo de grama sintética visto de lado, mostrando a base escura e as fibras verdes.',
    caption: 'A base e as fibras do rolo',
  },
  {
    slug: 'detalhe-fibras',
    alt: 'Fibras verdes do gramado em primeiro plano, com fibras brancas da marcação.',
    caption: 'Encontro do gramado com a marcação',
  },
  {
    slug: 'material-fibra-verde',
    alt: 'Fibras de grama sintética vistas bem de perto.',
    caption: 'Fibras do gramado',
  },
];

export function CloseUp() {
  const poster = getImage('video-poster') ? largestSrc('video-poster') : undefined;
  return (
    <section aria-labelledby="perto-titulo" className="gutter py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div>
          <h2 id="perto-titulo" className="heading text-[clamp(2.1rem,4.5vw,3.4rem)]">
            De perto
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg text-grafite-2">
            Linhas retas, emendas discretas e marcação no lugar certo. É o que faz um campo parecer pronto.
          </p>
          <figure className="mt-10 max-w-[340px]">
            <video
              controls
              muted
              playsInline
              preload="none"
              poster={poster}
              width={478}
              height={850}
              className="block aspect-[9/16] w-full rounded-[4px] bg-noite object-cover"
              aria-label="Vídeo panorâmico de um campo de futebol de grama sintética concluído"
            >
              <source src={`${import.meta.env.BASE_URL}media/campo-panoramica.mp4`} type="video/mp4" />
              Seu navegador não reproduz vídeos. Veja mais projetos no Instagram.
            </video>
            <figcaption className="mt-3 text-[0.9375rem] text-grafite-2">Panorâmica de um campo concluído, 13 segundos, sem som.</figcaption>
          </figure>
        </div>

        <ul className="grid grid-cols-2 gap-3 self-start sm:gap-5">
          {DETAILS.map((d, i) => (
            <li key={d.slug} className={i % 2 === 1 ? 'sm:translate-y-12' : ''}>
              <figure>
                <SmartImage
                  slug={d.slug}
                  alt={d.alt}
                  fit="cover"
                  sizes="(min-width: 1024px) 380px, 50vw"
                  className="aspect-[4/5] rounded-[4px]"
                />
                <figcaption className="mt-2.5 text-[0.9375rem] leading-snug">{d.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
