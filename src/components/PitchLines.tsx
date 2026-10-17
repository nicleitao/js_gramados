interface Props {
  className?: string;
  /** desenha as linhas no carregamento (respeita movimento reduzido) */
  animate?: boolean;
}

/** Meio-campo em traço fino: linha central, círculo e marca central. Puramente decorativo. */
export function PitchLines({ className = '', animate = false }: Props) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${animate ? 'chalk-draw' : ''} ${className}`}
    >
      <line x1="300" y1="0" x2="300" y2="600" stroke="currentColor" strokeWidth="2" />
      <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="2" />
      <circle cx="300" cy="300" r="5" fill="currentColor" />
      <path d="M0 40 H560 V560 H0" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
