import { useEffect, useRef } from 'react';
import type { Project } from '../types';
import { CATEGORY_LABELS } from '../data/projects';
import { MESSAGES } from '../config/site';
import { SmartImage } from './SmartImage';
import { WhatsAppButton } from './WhatsAppButton';
import { Icon } from './Icon';

interface Props {
  projects: Project[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Visualização ampliada com <dialog> nativo: foco preso, Esc fecha, setas navegam. */
export function Lightbox({ projects, index, onClose, onNavigate }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const project = index !== null ? projects[index] : null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNavigate((index + 1) % projects.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + projects.length) % projects.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, projects.length, onNavigate]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="lightbox-titulo"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="on-dark m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-off backdrop:bg-noite-3/90"
    >
      {project && index !== null && (
        <div className="gutter flex h-full flex-col py-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.9375rem] text-nevoa" aria-live="polite">
              {index + 1} de {projects.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-[6px] bg-off/10 hover:bg-off/20"
              aria-label="Fechar visualização"
              autoFocus
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-3">
            <SmartImage
              key={project.id}
              slug={project.image}
              alt={project.alt}
              sizes="100vw"
              fit="contain"
              className="!h-full max-h-full !w-auto max-w-full !bg-transparent object-contain"
            />
          </div>

          <div className="mx-auto flex w-full max-w-[960px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-lima">{CATEGORY_LABELS[project.category]}</p>
              <h2 id="lightbox-titulo" className="heading mt-1 text-2xl">
                {project.title}
              </h2>
              <p className="mt-1 max-w-[60ch] text-nevoa">{project.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + projects.length) % projects.length)}
                className="inline-flex size-12 items-center justify-center rounded-[6px] ring-1 ring-inset ring-off/30 hover:bg-off/10"
                aria-label="Projeto anterior"
              >
                <Icon name="prev" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate((index + 1) % projects.length)}
                className="inline-flex size-12 items-center justify-center rounded-[6px] ring-1 ring-inset ring-off/30 hover:bg-off/10"
                aria-label="Próximo projeto"
              >
                <Icon name="next" className="size-6" />
              </button>
              <WhatsAppButton message={MESSAGES.project(project.title)} className="flex-1 sm:flex-none">
                Quero algo parecido
              </WhatsAppButton>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
