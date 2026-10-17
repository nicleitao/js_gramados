import { useCallback, useMemo, useState } from 'react';
import { CATEGORY_LABELS, PROJECTS } from '../data/projects';
import type { ProjectCategory } from '../types';
import { MESSAGES } from '../config/site';
import { SmartImage } from '../components/SmartImage';
import { Lightbox } from '../components/Lightbox';
import { Icon } from '../components/Icon';
import { WhatsAppButton } from '../components/WhatsAppButton';

type Filter = 'todos' | ProjectCategory;

// Só exibe filtros de categorias que têm projetos
const CATEGORIES = (Object.keys(CATEGORY_LABELS) as ProjectCategory[]).filter((c) => PROJECTS.some((p) => p.category === c));

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter !== 'todos') return PROJECTS.filter((p) => p.category === filter);
    if (showAll) return [...PROJECTS.filter((p) => p.featured), ...PROJECTS.filter((p) => !p.featured)];
    return PROJECTS.filter((p) => p.featured);
  }, [filter, showAll]);

  const hiddenCount = filter === 'todos' && !showAll ? PROJECTS.length - filtered.length : 0;
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="gutter bg-areia py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <h2 id="projetos-titulo" className="heading text-[clamp(2.1rem,4.5vw,3.4rem)]">
            Projetos entregues
          </h2>
          <p className="max-w-[46ch] text-lg text-grafite-2 lg:justify-self-end">
            Fotos reais de obras da JS Gramados. Toque em uma foto para ampliar.
          </p>
        </div>

        <div className="-mx-1 mt-10 overflow-x-auto px-1 pb-2" role="group" aria-label="Filtrar projetos por tipo">
          <div className="flex w-max gap-2">
            {(['todos', ...CATEGORIES] as Filter[]).map((key) => {
              const count = key === 'todos' ? PROJECTS.length : PROJECTS.filter((p) => p.category === key).length;
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(key);
                    setShowAll(false);
                  }}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-[6px] px-4 text-[0.9375rem] font-semibold whitespace-nowrap transition-colors ${
                    active ? 'bg-noite text-off' : 'bg-off text-grafite ring-1 ring-inset ring-linha hover:ring-grafite-2'
                  }`}
                >
                  {key === 'todos' ? 'Todos' : CATEGORY_LABELS[key]}
                  <span className={`tabular-nums ${active ? 'text-lima' : 'text-grafite-2'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          Mostrando {filtered.length} de {PROJECTS.length} projetos
        </p>

        {/* Colunas em alvenaria: cada foto mantém a proporção original, sem cortes */}
        <ul className="mt-8 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {filtered.map((project, i) => (
            <li key={project.id} className="mb-3 break-inside-avoid sm:mb-5">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full text-left"
                aria-label={`${project.title}, ${CATEGORY_LABELS[project.category]}. Ampliar foto`}
              >
                <span className="relative block overflow-hidden rounded-[4px]">
                  <SmartImage
                    slug={project.image}
                    alt={project.alt}
                    sizes="(min-width: 1024px) 400px, 50vw"
                    className="transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute top-2 right-2 inline-flex size-9 items-center justify-center rounded-[4px] bg-noite/75 text-off opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Icon name="expand" className="size-[18px]" />
                  </span>
                </span>
                <span className="mt-2.5 block">
                  <span className="block text-[0.9375rem] leading-snug font-semibold sm:text-base">{project.title}</span>
                  <span className="mt-0.5 block text-sm text-grafite-2">{CATEGORY_LABELS[project.category]}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-8 border-t border-linha pt-10 sm:flex-row sm:items-center sm:justify-between">
          {hiddenCount > 0 ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-12 items-center rounded-[6px] px-5 font-semibold ring-1 ring-inset ring-grafite/40 hover:bg-off hover:ring-grafite"
            >
              Mostrar mais {hiddenCount} projetos
            </button>
          ) : (
            <span />
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-grafite-2">Viu algo parecido com o que você precisa?</p>
            <WhatsAppButton message={MESSAGES.quote} variant="solid">
              Fale conosco
            </WhatsAppButton>
          </div>
        </div>
      </div>

      <Lightbox projects={filtered} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
    </section>
  );
}
