// Shared visual building blocks, returned as HTML strings for a slide's `html`, and the
// timeline moves that belong to them. They carry the motifs that recur across parts (the
// trace a monitor reads, meter, unit grid, lattice, the line that decays into dots), so a
// callback in one part is the original of another. Styles: core/kit.css.
(() => {
  'use strict';

  const D = window.Deck;
  const DUR = D.timeline.DUR;

  const attrs = (map) => Object.entries(map)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => ` ${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join('');

  // A model's reasoning trace: a label, then one empty line per key for tl.type() to fill.
  // A line is a key, or { key, apart }: `apart` sets it off from the lines above it, for a
  // second example that is not the continuation of the first.
  const term = ({ id, label, lines }) => `
    <div class="dk-term"${attrs({ id })}>
      <div class="dk-term__label">${label}</div>
      ${lines.map((line) => (typeof line === 'string' ? { key: line } : line))
    .map((line) => `<div class="dk-term__line${line.apart ? ' is-apart' : ''}" data-line="${line.key}"></div>`).join('')}
    </div>`;

  // Where a box's content comes from, set on the box's bottom border (the box is positioned):
  // which part is a source's and which is ours. It sits on the frame, outside the content, so
  // that a note about a trace is never read as part of the trace.
  const legend = ({ key, text = '' }) => `<span class="dk-legend" data-legend="${key}">${text}</span>`;

  // A horizontal meter: animate the fill with tl.tween(fill, { '--v': ['0%', '95%'] })
  // and the number with tl.count(value, [0, 95], { format }).
  const meter = ({ key, label, tone }) => `
    <div class="dk-meter" data-meter="${key}"${attrs({ 'data-tone': tone })}>
      <span class="dk-meter__label">${label}</span>
      <span class="dk-meter__track"><i class="dk-meter__fill"></i></span>
      <span class="dk-meter__value"></span>
    </div>`;

  // A unit chart: n cells in `cols` columns; switch cells on with tl.cls(cell, 'is-on').
  const grid = ({ key, n, cols = 10, tone }) => `
    <div class="dk-grid" data-grid="${key}" style="--cols:${cols}"${attrs({ 'data-tone': tone })}>
      ${D.util.range(n).map((i) => `<i data-cell="${i}"></i>`).join('')}
    </div>`;

  // A verdict chip; switch state with tl.cls(flag, 'is-flagged') or 'is-clean'.
  const flag = ({ key, text }) => `<span class="dk-flag" data-flag="${key}">${text}</span>`;

  // The monitor: a scan bar. Place it with CSS, move it with tl.tween(lens, { x: [0, 800] }).
  const lens = ({ key }) => `<i class="dk-lens" data-lens="${key}"></i>`;

  // A trace that a monitor reads (slides 2, 4 and 8): kit.term, the monitor's verdict chip in
  // the top right corner, and its lens as a scan bar that travels down the lines. A line the
  // lens has passed gets a mark in its gutter: a check, or a pointer on a flagged line.
  // `width` (stage pixels) fixes the block's width; `note` is the text of the provenance
  // legend on its border (a slide may type it later); `inner` is extra markup inside the block.
  const trace = ({ key, label, lines, verdict, who = 'monitor', width, note = '', inner = '' }) => `
    <div class="dk-trace" data-trace="${key}"${attrs({ style: width ? `width:${width}px` : undefined })}>
      ${term({ label, lines })}
      <div class="dk-trace__status">
        <span class="dk-trace__who">${who}</span>${flag({ key: `${key}-verdict`, text: verdict })}
      </div>
      ${lens({ key: `${key}-lens` })}
      ${legend({ key: `${key}-note`, text: note })}
      ${inner}
    </div>`;

  // The elements of a mounted trace, for the moves below and for a slide's own tracks.
  const traceParts = (el) => Object.freeze({
    term: el.querySelector('.dk-term'),
    lines: Array.from(el.querySelectorAll('.dk-term__line')),
    line: (key) => el.querySelector(`[data-line="${key}"]`),
    who: el.querySelector('.dk-trace__who'),
    chip: el.querySelector('.dk-trace__status .dk-flag'),
    lens: el.querySelector(':scope > .dk-lens'),
    note: el.querySelector(':scope > .dk-legend'),
  });

  // The lens sweeps down the trace; each line in `marks` ({ key, flag }) gets its gutter mark
  // as the lens passes it. Returns the time at which the sweep ends.
  const readTrace = (step, el, { at, perLine, marks }) => {
    const { lines, line, lens: bar } = traceParts(el);
    const last = lines[lines.length - 1];
    const span = { top: lines[0].offsetTop, bottom: last.offsetTop + last.offsetHeight };
    const dur = lines.length * perLine;
    const passes = (row) => at + ((row.offsetTop + row.offsetHeight / 2 - span.top) / (span.bottom - span.top)) * dur;
    step.tween(bar, { opacity: [0, 1] }, { at: at - DUR.micro, dur: DUR.micro });
    step.tween(bar, { y: [span.top, span.bottom] }, { at, dur, ease: 'linear' });
    marks.forEach(({ key, flag: flagged }) => {
      const row = line(key);
      if (flagged) step.cls(row, 'is-flag', { at: passes(row) });
      step.tween(row, { '--dk-mark': [0, 1] }, { at: passes(row), dur: DUR.micro });
    });
    step.tween(bar, { opacity: [1, 0] }, { at: at + dur, dur: DUR.enter });
    return at + dur;
  };

  // The verdict lands like a stamp. `text` rewrites the chip, `clear` drops its earlier state.
  const stamp = (step, chip, state, at, { text, clear } = {}) => {
    if (clear) step.cls(chip, clear, { at, on: false });
    if (text !== undefined) step.type(chip, text, { at, dur: 0 });
    step.cls(chip, state, { at });
    step.tween(chip, { opacity: [0, 1], scale: [1.8, 1] }, { at, dur: DUR.enter });
  };

  // Shows a trace as a monitor left it, from the first frame of a step: every line typed and
  // toned, the gutter marks set, the verdict stamped, the provenance legend on its border.
  // Slide 8 opens on slide 4's end this way. A line without `text` (and tone) is filled by the
  // slide itself.
  const setTrace = (step, el, { lines, verdict, state, alarm = false, note }) => {
    const parts = traceParts(el);
    lines.forEach(({ key, text, tone, flag: flagged = false, mark = flagged }) => {
      const row = parts.line(key);
      if (text !== undefined) step.type(row, text, { dur: 0 });
      if (tone) step.cls(row, tone);
      if (flagged) step.cls(row, 'is-flag');
      if (mark) step.tween(row, { '--dk-mark': [1, 1] }, { dur: 0 });
    });
    step.tween(parts.who, { opacity: [1, 1] }, { dur: 0 });
    step.type(parts.chip, verdict, { dur: 0 });
    step.cls(parts.chip, state);
    step.tween(parts.chip, { opacity: [1, 1], scale: [1, 1] }, { dur: 0 });
    if (alarm) step.cls(el, 'is-alarm');
    if (note !== undefined) {
      step.type(parts.note, note, { dur: 0 });
      step.tween(parts.note, { opacity: [1, 1] }, { dur: 0 });
    }
  };

  // A line of text whose letters can fall away into dots and come back (slides 1 and 11): one
  // cell per character, so a letter and its dot share one place. A slide animates the
  // .dk-decay__glyph and .dk-decay__dot elements; spaces are plain spans.
  const decay = ({ key, text, label }) => `
    <div class="dk-decay" data-decay="${key}"${attrs({ role: label ? 'img' : undefined, 'aria-label': label })}>${Array.from(text).map((ch) => (ch === ' '
    ? '<span> </span>'
    : `<span class="dk-decay__cell"><span class="dk-decay__glyph">${ch}</span><i class="dk-decay__dot"></i></span>`)).join('')}</div>`;

  // The recurring picture of a transformer: token columns, layer rows, the text row below.
  // Slides 3, 7 and 9 all draw on this one lattice so the audience sees the same machine.
  // Geometry is in viewBox units; latticePoint gives the center of a node or of a token chip.
  const LATTICE = Object.freeze({ col: 144, row: 80, pad: 72, top: 40, node: 12, chipW: 120, chipH: 56, chipGap: 40 });
  const latticeSize = ({ cols, rows = 4 }) => ({
    width: LATTICE.pad * 2 + (cols - 1) * LATTICE.col,
    height: LATTICE.top + (rows - 1) * LATTICE.row + LATTICE.chipGap + LATTICE.chipH + LATTICE.node,
  });
  const latticePoint = ({ rows = 4 }, col, row) => ({
    x: LATTICE.pad + col * LATTICE.col,
    y: row === 'token'
      ? LATTICE.top + (rows - 1) * LATTICE.row + LATTICE.chipGap + LATTICE.chipH / 2
      : LATTICE.top + (rows - 1 - row) * LATTICE.row,
  });
  const lattice = ({ key, cols, rows = 4, tokens = [] }) => {
    const shape = { cols, rows };
    const size = latticeSize(shape);
    const columns = D.util.range(cols).map((c) => {
      const links = D.util.range(rows - 1).map((r) => {
        const a = latticePoint(shape, c, r);
        const b = latticePoint(shape, c, r + 1);
        return `<line class="dk-lattice__link" data-link="${c}-${r}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;
      }).join('');
      const nodes = D.util.range(rows).map((r) => {
        const p = latticePoint(shape, c, r);
        return `<circle class="dk-lattice__node" data-node="${c}-${r}" cx="${p.x}" cy="${p.y}" r="${LATTICE.node}"/>`;
      }).join('');
      const t = latticePoint(shape, c, 'token');
      const chip = `<g class="dk-lattice__token" data-token="${c}">
        <rect x="${t.x - LATTICE.chipW / 2}" y="${t.y - LATTICE.chipH / 2}" width="${LATTICE.chipW}" height="${LATTICE.chipH}" rx="8"/>
        <text x="${t.x}" y="${t.y + 10}">${tokens[c] ?? ''}</text></g>`;
      return `${links}${nodes}${chip}`;
    }).join('');
    return `<svg class="dk-lattice" data-lattice="${key}" viewBox="0 0 ${size.width} ${size.height}" width="${size.width}" height="${size.height}">${columns}</svg>`;
  };

  D.kit = Object.freeze({
    term, meter, grid, flag, lens, legend, lattice, latticePoint, latticeSize,
    trace, traceParts, readTrace, stamp, setTrace, decay,
  });
})();
