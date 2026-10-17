import type { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'grama',
    title: 'Grama sintética',
    summary: 'Para quintais, áreas de lazer, espaços comerciais e campos esportivos. O material é escolhido para o uso de cada espaço.',
    items: ['Jardins e quintais', 'Áreas de lazer', 'Projetos comerciais', 'Campos e quadras'],
    messageLabel: 'grama sintética',
    images: [
      {
        slug: 'residencial-garagem',
        alt: 'Faixa de grama sintética junto à garagem de uma casa.',
      },
      {
        slug: 'campo-listrado',
        alt: 'Campo de grama sintética com faixas em dois tons de verde.',
      },
    ],
  },
  {
    id: 'estrutura',
    title: 'Estrutura para o esporte',
    summary: 'Tudo o que um campo precisa em volta do gramado para ser usado de dia e de noite.',
    items: ['Alambrados e cercamentos', 'Telas e redes de proteção', 'Iluminação'],
    messageLabel: 'alambrados, redes e iluminação',
    images: [
      {
        slug: 'rede-protecao-azul',
        alt: 'Redes de proteção azuis em estrutura metálica.',
      },
      {
        slug: 'campo-iluminacao-noturna',
        alt: 'Campo de grama sintética iluminado por refletores à noite.',
      },
    ],
  },
  {
    id: 'completo',
    title: 'Projeto completo',
    summary: 'Do material à instalação, com pisos e outros elementos combinados conforme o que cada cliente precisa.',
    items: ['Fornecimento do material', 'Instalação', 'Pisos e complementos', 'Atendimento em todo o Brasil'],
    messageLabel: 'um projeto completo',
    images: [
      {
        slug: 'execucao-residencial-placas',
        alt: 'Instalação em área residencial, com grama sintética entre placas de piso.',
      },
    ],
  },
];
