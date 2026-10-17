import type { ReactNode } from 'react';
import { whatsappUrl } from '../lib/whatsapp';
import { Icon } from './Icon';

type Variant = 'lime' | 'solid' | 'ghost-light';

const VARIANTS: Record<Variant, string> = {
  // sobre fundo escuro
  lime: 'bg-lima text-noite hover:bg-lima-claro',
  // sobre fundo claro
  solid: 'bg-noite text-off hover:bg-verde',
  'ghost-light': 'text-off ring-1 ring-inset ring-off/35 hover:ring-off hover:bg-off/5',
};

interface Props {
  message: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

/** Link para o WhatsApp com aparência de botão e mensagem pré-preenchida. */
export function WhatsAppButton({ message, children, variant = 'lime', size = 'md', className = '', showIcon = true }: Props) {
  const sizing = size === 'lg' ? 'min-h-14 px-7 text-[1.0625rem]' : 'min-h-12 px-5 text-base';
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-[6px] font-semibold transition-colors duration-150 ${sizing} ${VARIANTS[variant]} ${className}`}
    >
      {showIcon && <Icon name="whatsapp" className="size-5 shrink-0" />}
      <span>{children}</span>
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
