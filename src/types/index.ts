export type ProjectCategory = 'esportivo' | 'residencial' | 'redes' | 'execucao';

export interface ImageMeta {
  width: number;
  height: number;
  widths: number[];
  color: string;
}

export interface Project {
  id: string;
  /** slug do arquivo em public/images (sem largura e extensão) */
  image: string;
  title: string;
  category: ProjectCategory;
  /** texto alternativo: descreve o que a foto mostra */
  alt: string;
  description: string;
  /** aparece na seleção inicial de "Todos" */
  featured?: boolean;
  /** ponto focal para cortes (CSS object-position) */
  focus?: string;
}

export interface Service {
  id: string;
  title: string;
  summary: string;
  items: string[];
  /** como o serviço aparece na mensagem de WhatsApp */
  messageLabel: string;
  images: { slug: string; alt: string; focus?: string }[];
}
