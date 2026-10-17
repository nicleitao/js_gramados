// Fonte única dos dados de contato e das mensagens de WhatsApp.
// Para trocar o número, altere apenas WHATSAPP_NUMBER.

export const WHATSAPP_NUMBER = '558896665501';
export const WHATSAPP_DISPLAY = '+55 88 9666-5501';
export const INSTAGRAM_URL = 'https://www.instagram.com/js_gramados/';
export const INSTAGRAM_HANDLE = '@js_gramados';

export const BRAND = {
  name: 'JS Gramados',
  tagline: 'Mais verde para o seu espaço',
} as const;

export const MESSAGES = {
  general:
    'Olá! Conheci a JS Gramados pelo site e tenho interesse nos serviços. Gostaria de conversar sobre um projeto.',
  quote:
    'Olá! Conheci a JS Gramados pelo site e tenho interesse em um orçamento. Posso enviar fotos e medidas do espaço.',
  service: (service: string) =>
    `Olá! Conheci a JS Gramados pelo site e tenho interesse em ${service}. Gostaria de conversar sobre um projeto.`,
  project: (title: string) =>
    `Olá! Vi o projeto "${title}" no site da JS Gramados e tenho interesse em uma solução semelhante.`,
} as const;
