// Shared helpers for the deck tools: argument parsing, Playwright lookup, opening the deck.
// No network: Playwright must already be installed (globally is fine); nothing is downloaded.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';

export const DECK_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const STAGE = Object.freeze({ width: 1920, height: 1080 });

// --name value pairs and bare --flags; unknown names are an error, not ignored.
export const parseArgs = (argv, spec) => {
  const out = Object.fromEntries(Object.entries(spec).map(([name, kind]) => [name, kind === 'flag' ? false : null]));
  for (let i = 0; i < argv.length; i += 1) {
    const name = argv[i].replace(/^--/, '');
    if (!argv[i].startsWith('--') || !(name in spec)) throw new Error(`unknown argument "${argv[i]}"; known: ${Object.keys(spec).map((k) => `--${k}`).join(' ')}`);
    if (spec[name] === 'flag') { out[name] = true; continue; }
    if (argv[i + 1] === undefined) throw new Error(`--${name} needs a value`);
    out[name] = argv[i + 1];
    i += 1;
  }
  return out;
};

// Playwright from the project, NODE_PATH, or the global prefix of the running node.
export const loadPlaywright = () => {
  const require = createRequire(import.meta.url);
  const globalRoot = path.resolve(path.dirname(process.execPath), '..', 'lib', 'node_modules');
  const roots = ['', ...(process.env.NODE_PATH ?? '').split(path.delimiter).filter(Boolean), globalRoot];
  for (const root of roots) {
    try {
      return require(root ? path.join(root, 'playwright') : 'playwright');
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') throw error;
    }
  }
  throw new Error(`Playwright not found (looked in local node_modules, NODE_PATH and ${globalRoot}). It must be installed already; this tool never downloads it.`);
};

const exists = (file) => fs.access(file).then(() => true, () => false);

const cachedShells = async () => {
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH
    ?? path.join(os.homedir(), process.platform === 'darwin' ? 'Library/Caches/ms-playwright' : '.cache/ms-playwright');
  if (!(await exists(cache))) return [];
  const dirs = (await fs.readdir(cache)).filter((name) => /^chromium_headless_shell-\d+$/.test(name));
  const found = await Promise.all(dirs.map(async (name) => {
    const files = await fs.readdir(path.join(cache, name), { recursive: true });
    const binary = files.find((f) => /(^|[\\/])chrome-headless-shell(\.exe)?$/.test(f));
    return binary ? { revision: Number(name.split('-')[1]), file: path.join(cache, name, binary) } : null;
  }));
  return found.filter(Boolean);
};

// Launches Chromium without downloading anything. Order: an explicit path (--browser or
// DECK_CHROMIUM), the build this Playwright expects, then the cached headless shell whose
// revision is closest to it. Which binary runs is always printed.
export const launchBrowser = async (playwright, explicit) => {
  const { chromium } = playwright;
  const wanted = explicit ?? process.env.DECK_CHROMIUM ?? null;
  if (wanted) {
    console.log(`browser: ${wanted} (explicit)`);
    return chromium.launch({ executablePath: wanted });
  }
  const expected = chromium.executablePath();
  if (await exists(expected)) {
    console.log(`browser: ${expected}`);
    return chromium.launch();
  }
  const revision = Number((/-(\d+)[\\/]/.exec(expected) ?? [])[1]);
  const shells = await cachedShells();
  if (!shells.length) {
    throw new Error(`No Chromium for Playwright. Expected ${expected}; no cached headless shell either. Pass --browser PATH (this tool never downloads a browser).`);
  }
  const pick = [...shells].sort((a, b) => Math.abs(a.revision - revision) - Math.abs(b.revision - revision) || b.revision - a.revision)[0];
  console.log(`browser: cached headless shell r${pick.revision} (this Playwright expects r${revision}, which is not installed)`);
  console.log(`         ${pick.file}`);
  return chromium.launch({ executablePath: pick.file });
};

export const deckUrl = (base, query, hash = '') => {
  const root = base ?? pathToFileURL(path.join(DECK_DIR, 'index.html')).href;
  const params = new URLSearchParams(Object.entries(query).filter(([, v]) => v !== null && v !== false).map(([k, v]) => [k, v === true ? '1' : String(v)]));
  const qs = params.toString();
  return `${root}${qs ? `?${qs}` : ''}${hash}`;
};

// Font sets for the robustness run (capture --fonts NAME). The tokens name macOS faces first,
// so on another machine the fallbacks decide every line break. A set forces the three stacks
// to faces with other metrics; a set whose faces are not installed fails instead of silently
// rendering the default faces again.
export const FONT_SETS = Object.freeze({
  arial: Object.freeze({ sans: 'Arial', serif: 'Georgia', mono: 'Courier New' }),       // the Windows-like tail of the stacks
  verdana: Object.freeze({ sans: 'Verdana', serif: 'Georgia', mono: 'Courier New' }),   // the widest common sans, close to DejaVu Sans
  dejavu: Object.freeze({ sans: 'DejaVu Sans', serif: 'DejaVu Serif', mono: 'DejaVu Sans Mono' }),   // a Linux desktop
});

const fontCss = (set) => `:root, :root[data-theme] { ${Object.entries(set)
  .map(([role, family]) => `--font-${role}: "${family}", ${role === 'mono' ? 'monospace' : role === 'serif' ? 'serif' : 'sans-serif'} !important;`).join(' ')} }`;

// Adds the override before any of the deck's scripts run: slides measure text when they mount.
const forceFonts = (context, set) => context.addInitScript((css) => {
  const apply = () => {
    const style = document.createElement('style');
    style.textContent = css;
    document.documentElement.append(style);
  };
  if (document.documentElement) { apply(); return; }
  new MutationObserver((_, observer) => {
    if (!document.documentElement) return;
    observer.disconnect();
    apply();
  }).observe(document, { childList: true });
}, fontCss(set));

// A face is installed if text set in it measures differently from both generic fallbacks.
const missingFonts = (page, set) => page.evaluate((families) => {
  const width = (font) => {
    const span = document.createElement('span');
    span.style.cssText = `position:absolute; visibility:hidden; white-space:nowrap; font: 72px ${font};`;
    span.textContent = 'mmmmiiiillllWWWW0123 The quick brown fox';
    document.body.append(span);
    const w = span.getBoundingClientRect().width;
    span.remove();
    return w;
  };
  return families.filter((family) => ['monospace', 'serif'].every((generic) => width(`"${family}", ${generic}`) === width(generic)));
}, Object.values(set));

// Opens the deck and waits until every slide is mounted. Script errors, console errors and
// requests that leave the deck's own origin are collected and returned for the caller to judge.
export const openDeck = async (browser, url, { width = STAGE.width, reducedMotion = 'no-preference', fonts = null } = {}) => {
  const height = Math.round((width * STAGE.height) / STAGE.width);
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion });
  const set = fonts ? FONT_SETS[fonts] : null;
  if (fonts && !set) throw new Error(`unknown font set "${fonts}"; known: ${Object.keys(FONT_SETS).join(', ')}`);
  if (set) await forceFonts(context, set);
  const page = await context.newPage();
  const problems = [];
  const requests = [];
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`));
  page.on('console', (msg) => { if (msg.type() === 'error') problems.push(`console: ${msg.text()}`); });
  page.on('requestfailed', (req) => problems.push(`request failed: ${req.url()}`));
  page.on('request', (req) => requests.push(req.url()));
  await page.goto(url);
  try {
    await page.waitForFunction(() => window.__deck && window.__deck.ready, null, { timeout: 15000 });
  } catch (error) {
    throw new Error(`deck did not start at ${url}\n${problems.join('\n') || error.message}`);
  }
  if (set) {
    const missing = await missingFonts(page, set);
    if (missing.length) throw new Error(`font set "${fonts}" cannot run here: not installed: ${missing.join(', ')}`);
    const applied = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--font-sans'));
    if (!applied.includes(set.sans)) throw new Error(`font set "${fonts}" was not applied (--font-sans is ${applied.trim()})`);
    console.log(`fonts: ${fonts} (sans ${set.sans}, serif ${set.serif}, mono ${set.mono})`);
  }
  return { context, page, problems, requests };
};

// "all", "3", "2-5", "p1-hack", or a comma list of those; returns zero-based indexes.
export const selectSlides = (text, slides) => {
  if (!text || text === 'all') return slides.map((s) => s.index);
  return text.split(',').flatMap((token) => {
    const range = /^(\d+)-(\d+)$/.exec(token);
    if (range) return Array.from({ length: Number(range[2]) - Number(range[1]) + 1 }, (_, i) => Number(range[1]) - 1 + i);
    if (/^\d+$/.test(token)) return [Number(token) - 1];
    const byId = slides.find((s) => s.id === token);
    if (!byId) throw new Error(`no slide "${token}"; ids: ${slides.map((s) => s.id).join(', ')}`);
    return [byId.index];
  }).map((index) => {
    if (index < 0 || index >= slides.length) throw new Error(`slide ${index + 1} is out of range (1-${slides.length})`);
    return index;
  });
};

export const pad = (n, width) => String(n).padStart(width, '0');
export const ensureDir = (dir) => fs.mkdir(dir, { recursive: true });
