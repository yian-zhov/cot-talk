#!/usr/bin/env node
// Checks core/tokens.css for projection legibility: in both themes every text color reaches
// WCAG 4.5:1 on every surface, every font size is at least 24px, and sizes and spacing sit on
// the 4px grid. Prints the table; exit code 1 on any violation.
//
//   node tools/contrast.mjs
import path from 'node:path';
import fs from 'node:fs/promises';
import { DECK_DIR } from './lib.mjs';

const MIN_RATIO = 4.5;
const MIN_FONT_PX = 24;
const GRID_PX = 4;
const TEXT_ROLES = Object.freeze(['text', 'dim', 'faint', 'read', 'hidden', 'alarm', 'ok', 'open']);
const SURFACES = Object.freeze(['bg', 'surface', 'surface-2']);
const INVERTED = Object.freeze([['bg', 'read']]);   // text token on a filled chip

const declarations = (block) => Object.fromEntries(
  Array.from(block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)).map((m) => [m[1], m[2].trim()]),
);

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const main = async () => {
  const css = (await fs.readFile(path.join(DECK_DIR, 'core', 'tokens.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  const base = declarations(/:root\s*\{([\s\S]*?)\}/.exec(css)[1]);
  const light = { ...base, ...declarations(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\}/.exec(css)[1]) };
  const problems = [];

  [['dark', base], ['light', light]].forEach(([theme, tokens]) => {
    const pairs = [...TEXT_ROLES.flatMap((fg) => SURFACES.map((bg) => [fg, bg])), ...INVERTED];
    console.log(`\n${theme} theme: contrast of text color on surface (minimum ${MIN_RATIO})`);
    pairs.forEach(([fg, bg]) => {
      const value = ratio(tokens[`--c-${fg}`], tokens[`--c-${bg}`]);
      const ok = value >= MIN_RATIO;
      console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${fg.padEnd(7)} on ${bg.padEnd(10)} ${value.toFixed(2)}`);
      if (!ok) problems.push(`${theme}: --c-${fg} on --c-${bg} is ${value.toFixed(2)}:1`);
    });
  });

  console.log('\nsizes (px): font sizes >= 24, everything on the 4px grid');
  Object.entries(base).filter(([name]) => /^--(fs|lh|sp)-/.test(name)).forEach(([name, value]) => {
    const px = parseFloat(value);
    const small = name.startsWith('--fs-') && px < MIN_FONT_PX;
    const offGrid = px % GRID_PX !== 0;
    if (small) problems.push(`${name} is ${px}px, below ${MIN_FONT_PX}px`);
    if (offGrid) problems.push(`${name} is ${px}px, off the ${GRID_PX}px grid`);
    console.log(`  ${small || offGrid ? 'FAIL' : 'ok  '} ${name.padEnd(8)} ${px}`);
  });

  problems.forEach((p) => console.error(`FAIL ${p}`));
  console.log(`\ncontrast: ${problems.length} problem(s)`);
  return problems.length ? 1 : 0;
};

main().then((code) => { process.exitCode = code; }).catch((error) => {
  console.error(`contrast failed to run: ${error.message}`);
  process.exitCode = 2;
});
