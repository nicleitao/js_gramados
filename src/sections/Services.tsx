import { MESSAGES } from '../config/site';
import { SERVICES } from '../data/services';
import { whatsappUrl } from '../lib/whatsapp';
import { SmartImage } from '../components/SmartImage';

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="gutter py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
          <h2 id="servicos-titulo" className="heading text-[clamp(2.1rem,4.5vw,3.4rem)]">
            O gramado e tudo o que vem em volta dele.
          </h2>
          <p className="max-w-[52ch] text-lg text-grafite-2 lg:justify-self-end">
            Da grama de um quintal à estrutura de um campo, a JS Gramados cuida do projeto inteiro: fornece o material e faz a
            instalação.
          </p>
        </div>

        <ul className="mt-14 border-t border-linha sm:mt-20">
          {SERVICES.map((service, index) => (
            <li
              key={service.id}
              className="grid gap-8 border-b border-linha py-10 sm:py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <h3 className="heading text-[1.75rem] sm:text-[2rem]">{service.title}</h3>
                <p className="mt-4 max-w-[46ch] text-grafite-2">{service.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <li key={item} className="rounded-[4px] bg-areia px-3 py-1.5 text-[0.9375rem]">
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(MESSAGES.service(service.messageLabel))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 w-fit items-center font-semibold text-verde underline decoration-verde/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-verde"
                >
                  Pedir orçamento de {service.title.toLowerCase()}
                  <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>
                </a>
              </div>

              <div
                className={`grid gap-3 ${service.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                {service.images.map((img) => (
                  <SmartImage
                    key={img.slug}
                    slug={img.slug}
                    alt={img.alt}
                    fit="cover"
                    focus={img.focus}
                    sizes={service.images.length > 1 ? '(min-width: 1024px) 340px, 50vw' : '(min-width: 1024px) 700px, 100vw'}
                    className={`${service.images.length > 1 ? 'aspect-[4/5]' : 'aspect-[16/10]'} rounded-[4px]`}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
