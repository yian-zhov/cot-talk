#!/usr/bin/env node
// Renders the deck to PNG files in headless Chromium. Deterministic: every shot is taken
// after window.__deck.seek*, so the same commit shows the same state at the same time.
//
//   node tools/capture.mjs --out DIR                      every slide, end of every step
//   node tools/capture.mjs --out DIR --slides 4,8-10      only those slides (number, range, or id)
//   node tools/capture.mjs --out DIR --frames 8           also frames of slide 8 across its timeline
//   node tools/capture.mjs --out DIR --frames p1-hack --interval 100 --no-steps
//   options: --sample (include parts/sample.js)  --theme light  --reduced  --width 1920
//            --lint (fail on findings)  --url http://host/sub/path/index.html
//            --fonts arial|verdana|dejavu (force other font stacks, to find layouts that only
//            hold with the macOS faces; a set that is not installed is an error)
//            --browser PATH (a Chromium binary; default: the one Playwright has, else a cached one)
import path from 'node:path';
import fs from 'node:fs/promises';
import { DECK_DIR, deckUrl, ensureDir, launchBrowser, loadPlaywright, openDeck, pad, parseArgs, selectSlides } from './lib.mjs';
import { lintPartFiles } from './lint-files.mjs';

const ARGS = Object.freeze({
  out: 'value', slides: 'value', frames: 'value', interval: 'value', width: 'value', theme: 'value', url: 'value',
  browser: 'value', fonts: 'value',
  sample: 'flag', reduced: 'flag', lint: 'flag', 'no-steps': 'flag',
});

const shoot = async (page, file) => {
  await page.screenshot({ path: file, type: 'png' });
  return file;
};

const captureSteps = async (page, slide, dir, lint) => {
  const shots = [];
  const findings = [];
  for (let step = 0; step < slide.steps.length; step += 1) {
    await page.evaluate(([i, s]) => window.__deck.seekStep(i, s), [slide.index, step]);
    const file = path.join(dir, `s${pad(slide.index + 1, 2)}-${slide.id}-step${step}.png`);
    shots.push({ slide: slide.id, step, label: slide.steps[step].label, file: await shoot(page, file) });
    if (lint) findings.push(...(await page.evaluate(() => window.__deck.lint())).map((f) => ({ ...f, step })));
  }
  return { shots, findings };
};

const captureFrames = async (page, slide, dir, interval) => {
  await ensureDir(dir);
  const times = [...Array.from({ length: Math.floor(slide.total / interval) + 1 }, (_, i) => i * interval), slide.total]
    .filter((t, i, all) => all.indexOf(t) === i);
  const shots = [];
  for (const t of times) {
    await page.evaluate(([i, at]) => window.__deck.seek(i, at), [slide.index, t]);
    shots.push({ slide: slide.id, t, file: await shoot(page, path.join(dir, `t${pad(Math.round(t), 6)}.png`)) });
  }
  return shots;
};

const uniqueFindings = (findings) => {
  const seen = new Set();
  return findings.filter((f) => {
    const key = `${f.slide}|${f.rule}|${f.detail}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const main = async () => {
  const args = parseArgs(process.argv.slice(2), ARGS);
  if (!args.out) throw new Error('usage: node tools/capture.mjs --out DIR [--slides ...] [--frames ...] (see the header of this file)');
  const out = path.resolve(args.out);
  const interval = Number(args.interval ?? 200);
  if (!(interval > 0)) throw new Error('--interval must be a positive number of milliseconds');
  const browser = await launchBrowser(loadPlaywright(), args.browser);
  try {
    const url = deckUrl(args.url, { capture: true, sample: args.sample, reduced: args.reduced, theme: args.theme });
    const { page, problems } = await openDeck(browser, url, { width: Number(args.width ?? 1920), fonts: args.fonts });
    const slides = await page.evaluate(() => window.__deck.info());
    const stepDir = path.join(out, 'steps');
    await ensureDir(stepDir);

    const stepRuns = [];
    if (!args['no-steps']) {
      for (const index of selectSlides(args.slides, slides)) stepRuns.push(await captureSteps(page, slides[index], stepDir, args.lint));
    }
    const frameShots = [];
    if (args.frames) {
      for (const index of selectSlides(args.frames, slides)) {
        const slide = slides[index];
        frameShots.push(...await captureFrames(page, slide, path.join(out, 'frames', `s${pad(index + 1, 2)}-${slide.id}`), interval));
      }
    }

    const deckErrors = await page.evaluate(() => window.__deck.errors());
    const findings = args.lint
      ? uniqueFindings([...stepRuns.flatMap((r) => r.findings), ...(await lintPartFiles(DECK_DIR))])
      : [];
    const manifest = {
      url, fonts: args.fonts ?? 'default', generated: new Date().toISOString(), slides,
      steps: stepRuns.flatMap((r) => r.shots), frames: frameShots, findings, errors: [...deckErrors, ...problems],
    };
    await fs.writeFile(path.join(out, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

    console.log(`slides: ${slides.length}  step shots: ${manifest.steps.length}  frames: ${frameShots.length}`);
    console.log(`output: ${out}`);
    slides.forEach((s) => console.log(`  ${pad(s.index + 1, 2)} ${s.id.padEnd(16)} steps ${s.steps.length}  ${Math.round(s.total)} ms  ${s.title}`));
    manifest.errors.forEach((e) => console.error(`ERROR ${e}`));
    findings.forEach((f) => console.error(`LINT ${f.slide} [${f.rule}] ${f.detail}`));
    if (args.lint) console.log(`lint findings: ${findings.length}`);
    return manifest.errors.length || findings.length ? 1 : 0;
  } finally {
    await browser.close();
  }
};

main().then((code) => { process.exitCode = code; }).catch((error) => {
  console.error(`capture failed: ${error.message}`);
  process.exitCode = 2;
});
