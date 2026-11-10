// Kit sheet for part authors: every shared building block of core/kit.js on one slide.
// Not part of the talk. It registers only when the URL has ?sample (capture: --sample).
(() => {
  'use strict';
  if (!Deck.flags.sample) return;

  const { kit } = Deck;
  const TOKENS = Object.freeze(['K', '=', '10', '.', '.', '.']);
  const DECAY = 'kit.decay: letters, then dots';

  Deck.register({
    id: 'kit-sheet',
    part: 0,
    kicker: 'Kit sheet · not in the talk',
    title: 'Shared building blocks: use these so the parts look like one deck',
    cues: ['kit.trace (a kit.term the monitor reads), kit.flag, kit.meter', 'kit.grid, kit.lens, kit.decay', 'kit.lattice: the same machine on slides 3, 7, 9'],
    cite: [],
    figure: 'illustrative',
    html: `
      <div class="ks-wrap">
        <div class="ks-col">
          ${kit.trace({ key: 'sheet', label: 'kit.trace', lines: ['a', 'b'], verdict: 'flagged' })}
          <div>${kit.flag({ key: 'hot', text: 'flagged' })} ${kit.flag({ key: 'calm', text: 'clean' })}
            <span class="dk-chip" data-tone="open">dk-chip</span></div>
          ${kit.meter({ key: 'm', label: 'kit.meter', tone: 'read' })}
          ${kit.grid({ key: 'g', n: 30, cols: 15, tone: 'hidden' })}
          ${kit.decay({ key: 'sheet', text: DECAY })}
        </div>
        <div class="ks-col ks-col--lattice">
          ${kit.lattice({ key: 'l', cols: 6, rows: 4, tokens: TOKENS })}
          ${kit.lens({ key: 'scan' })}
        </div>
      </div>`,
    setup: (ctx) => {
      const enter = ctx.step({ label: 'all blocks' });
      enter.type('[data-line="a"]', 'a typed line of reasoning', { at: 200 });
      enter.type('[data-line="b"]', 'a hot line', { at: enter.end });
      enter.cls('[data-line="b"]', 'is-hot');
      // The monitor reads the trace: a check on the first line, a pointer on the flagged one.
      const trace = ctx.q('[data-trace="sheet"]');
      enter.show('.dk-trace__who', { at: enter.end, rise: 0 });
      const read = kit.readTrace(enter, trace, { at: enter.end + 200, perLine: 300, marks: [{ key: 'a' }, { key: 'b', flag: true }] });
      kit.stamp(enter, kit.traceParts(trace).chip, 'is-flagged', read);
      enter.cls(trace, 'is-alarm', { at: read });
      // The second half of the decay line has fallen into dots.
      const half = Math.floor(ctx.qa('.dk-decay__glyph').length / 2);
      enter.tween(ctx.qa('.dk-decay__glyph').slice(half), { opacity: [1, 0] }, { at: 600, stagger: 40 });
      enter.tween(ctx.qa('.dk-decay__dot').slice(0, half), { opacity: [0, 0] }, { dur: 0 });
      enter.tween(ctx.qa('.dk-decay__dot').slice(half), { opacity: [0, 1] }, { at: 700, stagger: 40 });
      enter.cls('[data-flag="hot"]', 'is-flagged', { at: enter.end });
      enter.cls('[data-flag="calm"]', 'is-clean', { at: enter.end });
      enter.tween('[data-meter="m"] .dk-meter__fill', { '--v': ['0%', '72%'] }, { at: 400, dur: ctx.dur.move });
      enter.count('[data-meter="m"] .dk-meter__value', [0, 72], { at: 400, dur: ctx.dur.move, format: (v) => `${Math.round(v)}%` });
      ctx.util.shuffled(ctx.util.range(30), 7).slice(0, 12)
        .forEach((cell, i) => enter.cls(`[data-grid="g"] [data-cell="${cell}"]`, 'is-on', { at: 600 + i * 60 }));
      // One pass up a column, then down through a written token and up the next column.
      [0, 1, 2, 3].forEach((row, i) => enter.cls(`[data-node="0-${row}"]`, 'is-lit', { at: 800 + i * 150 }));
      enter.cls('[data-token="1"]', 'is-read', { at: 1500 });
      [0, 1, 2, 3].forEach((row, i) => enter.cls(`[data-node="1-${row}"]`, 'is-lit', { at: 1650 + i * 150 }));
      [3, 4, 5].forEach((col) => enter.cls(`[data-token="${col}"]`, 'is-dot', { at: 1500 }));
      enter.tween('[data-lens="scan"]', { x: [0, kit.latticeSize({ cols: 6 }).width - 8] }, { at: 800, dur: ctx.dur.reveal, ease: 'inOut' });
    },
  });
})();
