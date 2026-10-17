import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const NUMBER = '558896665501';

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

test('links de WhatsApp e Instagram corretos e seguros', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  const wa = page.locator('a[href*="wa.me"]');
  expect(await wa.count()).toBeGreaterThan(8);
  for (const href of await wa.evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href))) {
    const url = new URL(href);
    expect(url.host).toBe('wa.me');
    expect(url.pathname).toBe(`/${NUMBER}`);
    const text = url.searchParams.get('text') ?? '';
    expect(text).toMatch(/^Olá!/); // acentos decodificam corretamente
    expect(text).toContain('JS Gramados');
  }
  const ig = await page.locator('a[href*="instagram.com"]').evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));
  expect(ig.length).toBeGreaterThan(2);
  ig.forEach((h) => expect(h).toBe('https://www.instagram.com/js_gramados/'));
  for (const rel of await page.locator('a[target="_blank"]').evaluateAll((els) => els.map((e) => e.getAttribute('rel')))) {
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  }
  expect(errors).toEqual([]);
});

test('filtros do portfólio mostram a quantidade anunciada', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#projetos');
  const filters = section.getByRole('group', { name: 'Filtrar projetos por tipo' }).getByRole('button');
  const n = await filters.count();
  expect(n).toBeGreaterThan(2);
  for (let i = 1; i < n; i++) {
    const btn = filters.nth(i);
    await btn.click();
    await expect(btn).toHaveAttribute('aria-pressed', 'true');
    const expected = Number(await btn.locator('span').innerText());
    await expect(section.locator('ul.columns-2 > li')).toHaveCount(expected);
  }
  await filters.first().click();
  const total = Number(await filters.first().locator('span').innerText());
  await section.getByRole('button', { name: /Mostrar mais/ }).click();
  await expect(section.locator('ul.columns-2 > li')).toHaveCount(total);
});

test('visualização ampliada abre, navega e fecha pelo teclado', async ({ page }) => {
  await page.goto('/#projetos');
  await page.locator('#projetos ul.columns-2 > li button').first().click();
  const dialog = page.locator('dialog[open]');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/^1 de/)).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByText(/^2 de/)).toBeVisible();
  const wa = await dialog.locator('a[href*="wa.me"]').getAttribute('href');
  expect(decodeURIComponent(wa!)).toContain('Vi o projeto');
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});

test('menu móvel abre, fecha com Esc e com clique no link', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 740 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Abrir menu' });
  await toggle.click();
  const menu = page.locator('#menu-movel');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await menu.getByRole('link', { name: 'Projetos', exact: true }).click();
  await expect(menu).toBeHidden();
});

for (const width of [360, 768, 1024, 1440]) {
  test(`sem rolagem horizontal em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(width);
  });
}

test('imagem ausente mostra bloco neutro sem quebrar a página', async ({ page }) => {
  await page.route('**/images/campo-grande-porte-*.webp', (r) => r.fulfill({ status: 404, body: '' }));
  await page.goto('/#projetos');
  await page.locator('#projetos').scrollIntoViewIfNeeded();
  await expect(page.locator('#projetos [role="img"]').first()).toBeVisible();
});

test('fotos não são distorcidas', async ({ page }) => {
  await page.goto('/#projetos');
  const bad = await page.locator('#projetos ul.columns-2 img').evaluateAll((imgs) =>
    (imgs as HTMLImageElement[])
      .filter((i) => i.complete && i.naturalWidth)
      .filter((i) => Math.abs(i.clientWidth / i.clientHeight - i.naturalWidth / i.naturalHeight) > 0.02)
      .map((i) => i.src),
  );
  expect(bad).toEqual([]);
});

test('acessibilidade: sem violações sérias (axe, WCAG 2.2 AA)', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([]);
});

test('metadados e hierarquia de títulos', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/JS Gramados/);
  await expect(page.locator('h1')).toHaveCount(1);
  expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
  expect(await page.locator('meta[property="og:image"]').getAttribute('content')).toBeTruthy();
});

test('navegação por teclado: link de pular e foco visível', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});
