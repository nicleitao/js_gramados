import { BRAND, INSTAGRAM_HANDLE, INSTAGRAM_URL, MESSAGES, WHATSAPP_DISPLAY } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';
import { NAV_LINKS } from './Header';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="rodape" className="on-dark gutter bg-noite-3 pt-16 pb-28 text-nevoa sm:pb-16">
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)]">
        <div>
          <img
            src={`${import.meta.env.BASE_URL}brand/logo-full.webp`}
            alt={BRAND.name}
            width={520}
            height={323}
            loading="lazy"
            className="h-auto w-44"
          />
          <p className="mt-5 max-w-[34ch] text-[0.9375rem]">
            Grama sintética, alambrados, telas, redes e iluminação. Fornecimento e instalação em todo o Brasil.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-sm font-semibold text-off">Navegação</h2>
          <ul className="mt-3 flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-10 items-center hover:text-off">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-off">Contato</h2>
          <ul className="mt-3 flex flex-col">
            <li>
              <a
                href={whatsappUrl(MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center hover:text-off"
              >
                WhatsApp {WHATSAPP_DISPLAY}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-off">
                Instagram {INSTAGRAM_HANDLE}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-14 border-t border-off/10 pt-6 text-sm">
        © {year} {BRAND.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
