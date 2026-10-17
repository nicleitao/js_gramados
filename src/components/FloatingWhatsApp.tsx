import { useEffect, useState } from 'react';
import { MESSAGES } from '../config/site';
import { whatsappUrl } from '../lib/whatsapp';
import { Icon } from './Icon';

/**
 * Botão flutuante discreto. Some quando o hero, a chamada final ou o rodapé
 * estão na tela, onde já existe um botão de WhatsApp visível.
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ids = ['inicio', 'contato', 'rodape'];
    const onScreen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target.id) : onScreen.delete(e.target.id)));
        setVisible(onScreen.size === 0);
      },
      { threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappUrl(MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp (abre em nova aba)"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed z-30 inline-flex size-14 items-center justify-center rounded-full bg-noite text-lima shadow-[0_6px_20px_rgb(11_32_21/0.35)] ring-2 ring-lima/60 transition-[opacity,transform] duration-200 hover:bg-noite-2 motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{
        right: 'max(20px, calc(env(safe-area-inset-right, 0px) + 16px))',
        bottom: 'max(20px, calc(env(safe-area-inset-bottom, 0px) + 16px))',
      }}
    >
      <Icon name="whatsapp" className="size-7" />
    </a>
  );
}
