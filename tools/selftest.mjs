#!/usr/bin/env node
// Checks the engine's promises by driving the real deck in headless Chromium:
// offline from file://, deterministic seek, navigation = seek, correct state after going back,
// replay, reduced motion, #N and ?t= addressing, keyboard and click, and hosting under a sub-path.
// It also checks the deck's one exact callback: slide 8 opens on the terminal slide 4 ends on,
// and the footer tags: which `figure` and `numbers` a registration may give, that a footer
// shows them in the order given, and that the sources slide explains the tags in use only.
//
//   node tools/selftest.mjs [--out DIR] [--sample] [--browser PATH]
// "Equal" means equal fingerprints (window.__deck.fingerprint: slide DOM, chrome, canvas pixels);
// screenshots of equal states can differ by a few anti-aliased corner pixels between pages.
// Exit code 1 if any check fails; with --out, mismatching states are written there.
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { DECK_DIR, deckUrl, ensureDir, launchBrowser, loadPlaywright, openDeck, parseArgs } from './lib.mjs';

const TYPES = Object.freeze({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' });
const SUB_PATH = '/some/nested/path/';

const serve = (dir, prefix) => new Promise((resolve) => {
  const server = http.createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
    const file = path.join(dir, pathname.slice(prefix.length) || 'index.html');
    if (!pathname.startsWith(prefix) || !file.startsWith(dir)) { res.writeHead(404).end(); return; }
    try {
      const body = await fs.readFile(file);
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' }).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  server.listen(0, '127.0.0.1', () => resolve(server));
});

// A monitored trace (kit.trace) as the audience sees it at the end of a step: where it sits on
// the stage, what every line says and how it is toned and marked, the frame, the verdict and
// the provenance note on its border.
const CALLBACK = Object.freeze({ from: 'p1-hack', to: 'p3-twist' });
const traceState = (page, index, step) => page.evaluate(async ([i, s]) => {
  await window.__deck.seekStep(i, s);
  const root = document.getElementById('dk-root').getBoundingClientRect();
  const el = document.querySelectorAll('.dk-slide')[i].querySelector(`[data-trace="${window.Deck.motifs.hackTrace.key}"]`);
  if (!el) return `no shared trace on slide ${i + 1}`;
  const box = (node) => {
    const r = node.getBoundingClientRect();
    return [r.left - root.left, r.top - root.top, r.width, r.height].map((v) => Math.round(v * 10) / 10).join(' ');
  };
  const look = (node) => {
    const c = getComputedStyle(node);
    return { text: node.textContent, classes: Array.from(node.classList).sort().join(' '), box: box(node), color: c.color, font: `${c.fontWeight} ${c.fontSize} ${c.fontFamily}`, opacity: c.opacity };
  };
  const mark = (line) => {
    const c = getComputedStyle(line, '::before');
    return { opacity: c.opacity, color: c.backgroundColor, shape: c.clipPath };
  };
  return JSON.stringify({
    box: box(el),
    alarm: el.classList.contains('is-alarm'),
    frame: getComputedStyle(el.querySelector('.dk-term')).borderColor,
    label: look(el.querySelector('.dk-term__label')),
    lines: Array.from(el.querySelectorAll('.dk-term__line')).map((line) => ({ key: line.dataset.line, ...look(line), mark: mark(line) })),
    who: look(el.querySelector('.dk-trace__who')),
    verdict: look(el.querySelector('.dk-trace__status .dk-flag')),
    lens: getComputedStyle(el.querySelector(':scope > .dk-lens')).opacity,
    note: look(el.querySelector(':scope > .dk-legend')),
  }, null, 1);
}, [index, step]);

// The footer tags. The names are the ones on screen (core/deck.js: FIGURES and NUMBERS, the
// `tag` of each kind), typed again here so that a renamed or dropped tag fails this file.
// `figure` is one key or a list of keys: not empty, no key twice; the footer shows the tags
// in the order given, then the numbers tag; `numbers` needs at least one figure of ours.
const TAG_CASES = Object.freeze([
  { name: 'no figure', chips: [] },
  { name: 'one key as a string (the form every slide used before lists)', figure: 'schematic', chips: ['Schematic'] },
  { name: 'a string with numbers', figure: 'illustrative', numbers: 'reported', chips: ['Illustrative', 'Reported numbers'] },
  { name: 'a list of one', figure: ['data'], chips: ['Reported data'] },
  { name: 'a list of two, in the order given', figure: ['illustrative', 'schematic'], chips: ['Illustrative', 'Schematic'] },
  { name: 'the same two the other way round', figure: ['schematic', 'illustrative'], chips: ['Schematic', 'Illustrative'] },
  { name: 'two kinds and numbers', figure: ['schematic', 'illustrative'], numbers: 'reported', chips: ['Schematic', 'Illustrative', 'Reported numbers'] },
  { name: 'numbers with one figure of ours in the list', figure: ['data', 'schematic'], numbers: 'reported', chips: ['Reported data', 'Schematic', 'Reported numbers'] },
  { name: 'an empty list', figure: [], rejects: 'empty list' },
  { name: 'a key twice', figure: ['schematic', 'schematic'], rejects: 'twice' },
  { name: 'an unknown key', figure: 'photo', rejects: 'figure must be one of' },
  { name: 'an unknown key in a list', figure: ['schematic', 'photo'], rejects: 'figure must be one of' },
  { name: 'a name every object inherits', figure: 'toString', rejects: 'figure must be one of' },
  { name: 'a list inside a list', figure: [['schematic']], rejects: 'figure must be one of' },
  { name: 'an empty string', figure: '', rejects: 'figure must be one of' },
  { name: 'numbers with a data figure', figure: 'data', numbers: 'reported', rejects: 'numbers goes with' },
  { name: 'numbers with a list that holds no figure of ours', figure: ['data'], numbers: 'reported', rejects: 'numbers goes with' },
  { name: 'numbers without a figure', numbers: 'reported', rejects: 'numbers goes with' },
  { name: 'unknown numbers', figure: 'schematic', numbers: 'estimated', rejects: 'numbers must be one of' },
]);
// What the sources slide has to explain for a given set of slides, in the legend's order.
const LEGEND_CASES = Object.freeze([
  { name: 'a tag carried only inside a list is in use', slides: [{ figure: ['data', 'illustrative'] }], legend: ['Reported data', 'Illustrative'] },
  { name: 'a tag no slide carries is left out', slides: [{ figure: 'illustrative', numbers: 'reported' }, { figure: ['schematic'] }], legend: ['Reported numbers', 'Schematic', 'Illustrative'] },
  { name: 'no slide carries a tag', slides: [{}], legend: [] },
]);

// Registers one probe slide per case in a page of its own (a rejected registration puts the
// error bar on that page) and reads the chips off the footer the engine builds for it. A
// probe that the engine accepts and then cannot build is reported as `broke`, so that one
// defect fails its own check and the rest of the run still reports.
const probeTags = (page) => page.evaluate(([cases, legends]) => {
  const D = window.Deck;
  const chipsOf = (section) => Array.from(section.querySelectorAll('.dk-foot .dk-figure-tag')).map((el) => el.textContent);
  const tried = cases.map((c, i) => {
    const id = `probe-${i}`;
    const input = { id, part: 0, title: 'Probe', cues: [], cite: [] };
    if ('figure' in c) input.figure = c.figure;
    if ('numbers' in c) input.numbers = c.numbers;
    try {
      D.register(input);
    } catch (error) {
      return { name: c.name, rejected: error.message };
    }
    try {
      const built = D.mount(D.slides.find((slide) => slide.id === id), document.createElement('div'));
      return { name: c.name, chips: chipsOf(built.section) };
    } catch (error) {
      return { name: c.name, broke: `accepted, then failed to build: ${error.message}` };
    }
  });
  // The registry keeps its own copy of a list: changing the caller's array changes nothing.
  const copy = (() => {
    const mine = ['schematic'];
    try {
      D.register({ id: 'probe-copy', part: 0, title: 'Probe', cues: [], cite: [], figure: mine });
    } catch (error) {
      return { broke: error.message };
    }
    mine.push('illustrative');
    const kept = D.slides.find((slide) => slide.id === 'probe-copy').figure;
    return { length: kept.length, frozen: Object.isFrozen(kept) };
  })();
  const legendOf = (slides) => {
    try {
      return D.tagsInUse(slides).map((t) => t.tag);
    } catch (error) {
      return [`failed: ${error.message}`];
    }
  };
  return { tried, copy, legends: legends.map((c) => ({ name: c.name, legend: legendOf(c.slides) })) };
}, [TAG_CASES, LEGEND_CASES]);

// The real deck: what each registration asks for (read with this file's own reading of
// `figure`, not the engine's), the chips in each footer, and the legend of the sources slide.
const footerTags = (page) => page.evaluate(() => {
  const D = window.Deck;
  const listed = (v) => (v === null || v === undefined ? [] : Array.isArray(v) ? v : [v]);
  const named = (field, value) => (D.figureTags.find((t) => t.field === field && t.value === value) ?? { tag: `no tag for ${field}: ${value}` }).tag;
  const sections = Array.from(document.querySelectorAll('.dk-slide'));
  return {
    slides: D.slides.map((def, i) => ({
      id: def.id,
      asked: [...listed(def.figure).map((v) => named('figure', v)), ...listed(def.numbers).map((v) => named('numbers', v))],
      shown: Array.from(sections[i].querySelectorAll('.dk-foot .dk-figure-tag')).map((el) => el.textContent),
    })),
    order: D.figureTags.map((t) => t.tag),
    legend: Array.from(document.querySelectorAll('[data-slide="sources"] .dk-tags__list li')).map((li) => ({
      tag: li.querySelector('.dk-figure-tag').textContent, means: li.querySelector('.dk-tags__means').textContent.trim(),
    })),
  };
});

const main = async () => {
  const args = parseArgs(process.argv.slice(2), { out: 'value', browser: 'value', sample: 'flag' });
  const results = [];
  const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); };
  const browser = await launchBrowser(loadPlaywright(), args.browser);
  const query = { capture: true, sample: args.sample };
  let mismatches = 0;

  const same = async (name, a, b) => {
    const ok = a === b;
    if (!ok && args.out) {
      mismatches += 1;
      await ensureDir(args.out);
      const stem = path.join(args.out, `mismatch-${mismatches}-${name.replace(/[^a-z0-9]+/gi, '-')}`);
      await fs.writeFile(`${stem}-expected.txt`, a);
      await fs.writeFile(`${stem}-actual.txt`, b);
    }
    check(name, ok, ok ? '' : 'states differ');
  };

  try {
    // 1. Offline: loads from file:// and asks for nothing outside it.
    const local = await openDeck(browser, deckUrl(null, query));
    const { page } = local;
    const foreign = local.requests.filter((u) => !u.startsWith('file://') && !u.startsWith('data:'));
    check('offline: every request is file:// or data:', foreign.length === 0, foreign.join(', '));
    check('no script or console errors on load', local.problems.length === 0, local.problems.join(' | '));
    check('no registration errors', (await page.evaluate(() => window.__deck.errors())).length === 0);

    const slides = await page.evaluate(() => window.__deck.info());
    const shot = () => page.evaluate(() => window.__deck.fingerprint());
    const seekEnd = async (i, s) => { await page.evaluate(([a, b]) => window.__deck.seekStep(a, b), [i, s]); return shot(); };
    const walkTo = async (i, s) => {
      await page.evaluate(([a, b]) => {
        window.__deck.go(a);
        for (let k = 0; k < b; k += 1) window.__deck.next();
        window.__deck.finish();
        return window.__deck.settled();
      }, [i, s]);
      return shot();
    };
    const act = async (fn) => { await page.evaluate(fn); return shot(); };

    // 2-5. For every step of every slide: seek twice, walk there, come back from the next state, replay.
    for (const slide of slides) {
      const last = slide.steps.length - 1;
      for (let s = 0; s <= last; s += 1) {
        const tag = `${slide.id} step ${s}`;
        const reference = await seekEnd(slide.index, s);
        await same(`seek is deterministic: ${tag}`, reference, await seekEnd(slide.index, s));
        await same(`navigating forward equals seek: ${tag}`, reference, await walkTo(slide.index, s));
        const hasNext = s < last || slide.index < slides.length - 1;
        if (hasNext) {
          await walkTo(slide.index, s);
          const back = await act(() => { window.__deck.next(); window.__deck.prev(); return window.__deck.settled(); });
          await same(`going back restores the state: ${tag}`, reference, back);
        }
      }
      const replayed = await act(() => { window.__deck.replay(); window.__deck.finish(); return window.__deck.settled(); });
      await same(`replay returns to step 0: ${slide.id}`, await seekEnd(slide.index, 0), replayed);
    }

    // 6. Mid-animation frames are a function of time only.
    const longest = [...slides].sort((a, b) => b.total - a.total)[0];
    const at = Math.round(longest.total * 0.37);
    const frame = async () => { await page.evaluate(([i, t]) => window.__deck.seek(i, t), [longest.index, at]); return shot(); };
    await same(`mid-timeline frame is deterministic: ${longest.id} at ${at} ms`, await frame(), await frame());
    const midReference = await frame();
    const endReference = await seekEnd(longest.index, longest.steps.length - 1);

    // 6b. The callback: slide 8 opens on the terminal exactly as slide 4 left it.
    const ends = slides.find((slide) => slide.id === CALLBACK.from);
    const opens = slides.find((slide) => slide.id === CALLBACK.to);
    check(`the callback slides exist: ${CALLBACK.from}, ${CALLBACK.to}`, Boolean(ends && opens));
    if (ends && opens) {
      const left = await traceState(page, ends.index, ends.steps.length - 1);
      const back = await traceState(page, opens.index, 0);
      check(`${CALLBACK.from} ends on a read and flagged trace`, /"alarm": true/.test(left) && /is-flagged/.test(left), left.slice(0, 80));
      check(`${CALLBACK.from} ends with a provenance note on the terminal's border`, /"note": \{\s*"text": "[^"]+/.test(left) && !/"note": \{[^}]*"opacity": "0"/.test(left), left.slice(-260));
      await same(`${CALLBACK.to} opens on the terminal ${CALLBACK.from} ends on (text, tones, marks, verdict, note, place)`, left, back);
    }

    // 6c. Footer tags: every footer shows what its registration asks for, in that order,
    // and the sources slide explains the tags in use and no other.
    const sameList = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const tags = await footerTags(page);
    const offFooters = tags.slides.filter((slide) => !sameList(slide.asked, slide.shown));
    check('every footer shows the tags its slide registers, in that order', offFooters.length === 0,
      offFooters.map((slide) => `${slide.id}: asked ${slide.asked.join(' + ') || 'none'}, shown ${slide.shown.join(' + ') || 'none'}`).join(' | '));
    const inUse = tags.order.filter((tag) => tags.slides.some((slide) => slide.shown.includes(tag)));
    check('the sources slide explains the tags in use, in its own order, and no other', sameList(tags.legend.map((row) => row.tag), inUse),
      `legend ${tags.legend.map((row) => row.tag).join(', ') || 'none'}; in use ${inUse.join(', ') || 'none'}`);
    check('every tag in the legend comes with what it means', tags.legend.every((row) => row.means.length > 0));

    // 7. Keyboard and click.
    await page.evaluate(() => window.__deck.go(0));
    await page.keyboard.press('ArrowRight');
    const afterKey = await page.evaluate(() => window.__deck.position());
    check('ArrowRight advances', afterKey.index + afterKey.step > 0, JSON.stringify(afterKey));
    await page.keyboard.press('ArrowLeft');
    check('ArrowLeft goes back', (await page.evaluate(() => window.__deck.position())).index === 0);
    await page.keyboard.type('3');
    await page.keyboard.press('Enter');
    check('typing 3 then Enter jumps to slide 3', (await page.evaluate(() => window.__deck.position())).index === 2);
    await page.mouse.click(1700, 500);
    check('click on the right advances', (await page.evaluate(() => window.__deck.position())).index + (await page.evaluate(() => window.__deck.position())).step > 2);
    await local.context.close();

    // 7b. The `figure` and `numbers` fields of a registration, on probe slides in a page of
    // their own: which forms are accepted, which are rejected, and what the footer then shows.
    const lab = await openDeck(browser, deckUrl(null, query));
    const probes = await probeTags(lab.page);
    await lab.context.close();
    TAG_CASES.forEach((c, i) => {
      const got = probes.tried[i];
      const footer = () => `footer ${got.chips.join(' + ') || 'none'}`;
      if (c.rejects) {
        check(`figure tags, rejected: ${c.name}`, typeof got.rejected === 'string' && got.rejected.includes(c.rejects),
          got.rejected ?? got.broke ?? `accepted, ${footer()}`);
      } else {
        check(`figure tags, accepted: ${c.name}`, Array.isArray(got.chips) && sameList(got.chips, c.chips),
          got.rejected ?? got.broke ?? `${footer()}, expected ${c.chips.join(' + ') || 'none'}`);
      }
    });
    check('figure tags: the registry keeps its own frozen copy of a list', probes.copy.length === 1 && probes.copy.frozen, JSON.stringify(probes.copy));
    LEGEND_CASES.forEach((c, i) => {
      check(`tag legend: ${c.name}`, sameList(probes.legends[i].legend, c.legend), `got ${probes.legends[i].legend.join(', ') || 'none'}`);
    });

    // 8. Addressing: #N opens slide N; ?t= shows that instant.
    const hashed = await openDeck(browser, deckUrl(null, query, '#3'));
    check('#3 opens slide 3', (await hashed.page.evaluate(() => window.__deck.position())).index === 2);
    await hashed.context.close();
    const timed = await openDeck(browser, deckUrl(null, { ...query, t: at }, `#${longest.index + 1}`));
    await timed.page.evaluate(() => window.__deck.settled());
    await same(`?t=${at} equals seek`, midReference, await timed.page.evaluate(() => window.__deck.fingerprint()));
    await timed.context.close();

    // 9. Reduced motion: a step lands on its end state with no clock.
    const calm = await openDeck(browser, deckUrl(null, query), { reducedMotion: 'reduce' });
    await calm.page.evaluate(([i, n]) => {
      window.__deck.go(i);
      for (let k = 0; k < n; k += 1) window.__deck.next();
      return window.__deck.settled();
    }, [longest.index, longest.steps.length - 1]);
    await same(`reduced motion shows the end state at once: ${longest.id}`, endReference, await calm.page.evaluate(() => window.__deck.fingerprint()));
    await calm.context.close();

    // 10. Static hosting under a sub-path: relative URLs only.
    const server = await serve(DECK_DIR, SUB_PATH);
    try {
      const base = `http://127.0.0.1:${server.address().port}${SUB_PATH}index.html`;
      const hosted = await openDeck(browser, deckUrl(base, query));
      const outside = hosted.requests.filter((u) => !u.startsWith(`http://127.0.0.1:${server.address().port}${SUB_PATH}`) && !u.startsWith('data:'));
      check('hosted under a sub-path: every request stays inside it', outside.length === 0, outside.join(', '));
      check('hosted under a sub-path: no failed request or error', hosted.problems.length === 0, hosted.problems.join(' | '));
      check('hosted under a sub-path: same slide count', (await hosted.page.evaluate(() => window.__deck.info())).length === slides.length);
      await hosted.context.close();
    } finally {
      server.close();
    }
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.ok);
  failed.forEach((r) => console.error(`FAIL ${r.name}${r.detail ? `: ${r.detail}` : ''}`));
  console.log(`selftest: ${results.length - failed.length} passed, ${failed.length} failed`);
  return failed.length ? 1 : 0;
};

main().then((code) => { process.exitCode = code; }).catch((error) => {
  console.error(`selftest failed to run: ${error.message}`);
  process.exitCode = 2;
});
