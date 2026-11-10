// Static checks on the part files, so three authors working in parallel cannot collide
// or break determinism: selector and keyframe prefixes, token-only colors, no clocks,
// no randomness, no network in parts/partN.{css,js}.
import path from 'node:path';
import fs from 'node:fs/promises';

const PARTS = Object.freeze([1, 2, 3]);
const KEYFRAME_STOP = /^(from|to|[\d.]+%)(\s*,\s*(from|to|[\d.]+%))*$/;
const FORBIDDEN_JS = Object.freeze([
  [/\bsetTimeout\b|\bsetInterval\b|\brequestAnimationFrame\b/, 'own clock (animate through ctx.step so the slide can seek)'],
  [/\bDate\.now\b|\bperformance\.now\b|\bnew Date\b/, 'wall-clock time (state must depend on the timeline only)'],
  [/\bMath\.random\b/, 'Math.random (use ctx.util.rng(seed) or ctx.util.shuffled)'],
  [/\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(|^\s*import\s/m, 'network or module loading (the deck runs from file://)'],
  [/https?:\/\//, 'absolute URL (no CDN, no remote asset; cite by arXiv id)'],
  [/\bDeck\.configure\b/, 'Deck.configure (titles and speakers live in shared/meta.js)'],
]);

const lintCss = (n, css) => {
  const body = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const prefix = `.p${n}-`;
  const scoped = [prefix, `[data-part="${n}"]`, `[data-slide="p${n}-`];
  const finding = (rule, detail) => ({ slide: `parts/part${n}.css`, rule, detail });
  const preludes = Array.from(body.matchAll(/([^{}]+)\{/g)).map((m) => m[1].trim()).filter(Boolean);
  const selectorFindings = preludes.flatMap((prelude) => {
    if (prelude.startsWith('@keyframes')) {
      const name = prelude.replace('@keyframes', '').trim();
      return name.startsWith(`p${n}-`) ? [] : [finding('css-prefix', `@keyframes ${name} must start with p${n}-`)];
    }
    if (prelude.startsWith('@') || KEYFRAME_STOP.test(prelude)) return [];
    return prelude.split(',').map((s) => s.trim())
      .filter((selector) => !scoped.some((start) => selector.startsWith(start)))
      .map((selector) => finding('css-prefix', `selector "${selector}" must start with ${prefix}`));
  });
  const colors = Array.from(body.matchAll(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g))
    .map((m) => finding('css-color', `hard-coded color "${m[0]}"; use a --c-* token (color-mix is fine)`));
  return [...selectorFindings, ...colors];
};

const lintJs = (n, js) => FORBIDDEN_JS
  .filter(([pattern]) => pattern.test(js))
  .map(([, why]) => ({ slide: `parts/part${n}.js`, rule: 'js-forbidden', detail: why }));

export const lintPartFiles = async (deckDir) => {
  const perPart = await Promise.all(PARTS.map(async (n) => {
    const css = await fs.readFile(path.join(deckDir, 'parts', `part${n}.css`), 'utf8');
    const js = await fs.readFile(path.join(deckDir, 'parts', `part${n}.js`), 'utf8');
    return [...lintCss(n, css), ...lintJs(n, js)];
  }));
  return perPart.flat();
};
