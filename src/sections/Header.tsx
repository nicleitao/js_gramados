import { useEffect, useRef, useState } from 'react';
import { BRAND, INSTAGRAM_URL, MESSAGES } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';
import { Icon } from '../components/Icon';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Esc fecha o menu; o foco volta ao botão
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // fecha o menu móvel se a tela crescer para o layout desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="on-dark sticky top-0 z-40 bg-noite text-off" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="gutter">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="flex shrink-0 items-center py-2" aria-label={`${BRAND.name}, ir para o início`}>
            <picture>
              <source srcSet={`${import.meta.env.BASE_URL}brand/logo-horizontal.webp`} type="image/webp" />
              <img
                src={`${import.meta.env.BASE_URL}brand/logo-horizontal.png`}
                alt=""
                width={406}
                height={96}
                className="h-8 w-auto sm:h-9"
              />
            </picture>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.9375rem]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="py-2 text-nevoa underline-offset-[6px] transition-colors hover:text-off hover:underline hover:decoration-lima"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-11 items-center justify-center rounded-[6px] text-nevoa transition-colors hover:text-off sm:inline-flex"
              aria-label="Instagram da JS Gramados (abre em nova aba)"
            >
              <Icon name="instagram" className="size-[22px]" />
            </a>
            <span className="hidden sm:block">
              <WhatsAppButton message={MESSAGES.general} className="!min-h-11">
                Fale conosco
              </WhatsAppButton>
            </span>
            <a
              href={whatsappUrl(MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-[6px] bg-lima text-noite sm:hidden"
              aria-label="Fale conosco pelo WhatsApp (abre em nova aba)"
            >
              <Icon name="whatsapp" className="size-[22px]" />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[6px] text-off lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="menu-movel"
        ref={panel}
        hidden={!open}
        className="gutter border-t border-off/10 bg-noite pb-6 lg:hidden"
      >
        <nav aria-label="Menu móvel" className="wrap">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-off/10">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="heading flex min-h-14 items-center text-2xl text-off"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppButton message={MESSAGES.general} size="lg">
              Fale conosco
            </WhatsAppButton>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] text-off ring-1 ring-inset ring-off/30"
            >
              <Icon name="instagram" />
              Ver projetos no Instagram
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
