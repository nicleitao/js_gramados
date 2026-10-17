import { WHATSAPP_NUMBER } from '../config/site';

/** Monta o link wa.me com a mensagem codificada (acentos, espaços e aspas). */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
