import { INSTAGRAM_URL, MESSAGES, WHATSAPP_DISPLAY } from '../config/site';
import { PitchLines } from '../components/PitchLines';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Icon } from '../components/Icon';

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="on-dark gutter relative overflow-hidden bg-noite py-24 text-off sm:py-32">
      <PitchLines className="pointer-events-none absolute top-1/2 -right-56 w-[720px] -translate-y-1/2 text-off/[0.07] sm:-right-24" />
      <div className="wrap relative">
        <h2 id="contato-titulo" className="display max-w-[14ch] text-[clamp(2.5rem,6.5vw,4.5rem)]">
          Conte o que você precisa.
        </h2>
        <p className="mt-6 max-w-[48ch] text-lg text-nevoa sm:text-xl">
          Mande fotos do espaço, medidas aproximadas ou referências do que você imagina. A conversa acontece direto pelo
          WhatsApp.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppButton message={MESSAGES.quote} size="lg">
            Fale conosco no WhatsApp
          </WhatsAppButton>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-[6px] px-7 font-semibold text-off ring-1 ring-inset ring-off/35 transition-colors hover:bg-off/5 hover:ring-off"
          >
            <Icon name="instagram" />
            Ver o Instagram
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
        <p className="mt-6 text-[0.9375rem] text-nevoa">
          Número comercial <span className="font-semibold whitespace-nowrap text-off select-all">{WHATSAPP_DISPLAY}</span>
        </p>
      </div>
    </section>
  );
}
