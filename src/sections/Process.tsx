import { MESSAGES } from '../config/site';
import { WhatsAppButton } from '../components/WhatsAppButton';

const STEPS = [
  {
    title: 'Conte o que você precisa',
    text: 'Fale conosco pelo WhatsApp e envie fotos do espaço, medidas aproximadas ou referências do que imagina.',
  },
  {
    title: 'Definimos a solução',
    text: 'Conversamos sobre o tipo de grama e os complementos que fazem sentido para o uso do espaço.',
  },
  {
    title: 'Fornecimento e instalação',
    text: 'A JS Gramados fornece o material e faz a instalação, em qualquer região do Brasil.',
  },
];

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="processo-titulo" className="gutter border-t border-linha py-20 sm:py-28">
      <div className="wrap">
        <h2 id="processo-titulo" className="heading max-w-[18ch] text-[clamp(2.1rem,4.5vw,3.4rem)]">
          Como funciona o orçamento
        </h2>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative border-t-2 border-grafite pt-6">
              <span className="display block text-[3.5rem] leading-none text-verde tabular-nums" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="heading mt-5 text-[1.375rem]">
                <span className="sr-only">Passo {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-[36ch] text-grafite-2">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <WhatsAppButton message={MESSAGES.quote} variant="solid" size="lg">
            Começar pelo WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
