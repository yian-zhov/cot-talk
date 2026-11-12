// Part 1: Reading the reasoning Slides 1-4.
// SPEC.md section 3 describes each slide; parts/sample.js shows the registration API.
// Slide 8 (part 3) brings slide 4's terminal back: both draw kit.trace from the lines in
// shared/motifs.js (hackTrace), and every line is a fact. Slide 11 brings back the title
// slide's thought (motifs.thought) on kit.decay.
(() => {
  'use strict';

  const { kit, util } = Deck;
  const DUR = Deck.timeline.DUR;
  const text = (key) => Deck.fact(key).text;
  const value = (key) => Deck.fact(key).value;
  const percent = (v) => `${Math.round(v)}%`;
  const rowGap = (el) => parseFloat(getComputedStyle(el).rowGap);

  // Facts that only slide 3 needs: the two sentences of Korbak et al. 2025, Fig. 1, behind
  // "models that sample tokens" in its last cue and behind the faint links that stand for
  // attention. Both were searched for as whole strings in the arXiv HTML full text
  // (2507.11473v2, the copy downloaded on 2026-11-09).
  Deck.addFacts({
    'p1.korbak_sampling': { text: 'during autoregressive sampling', src: 'korbak2025', where: 'Fig. 1 caption' },
    'p1.korbak_only_way': {
      text: 'Chain of thought is the only way that information can flow down from later to earlier layers',
      src: 'korbak2025', where: 'Fig. 1 caption',
    },
  });
  // Facts that only slide 2 needs: the motive that comes before the monitor. The worry on
  // screen quotes 'p1.korbak_misbehave'; the title and the first cue rest on
  // 'p1.korbak_before'. Each was searched for as a whole string in the arXiv HTML full text
  // (2507.11473v2, the copy downloaded on 2026-11-09).
  Deck.addFacts({
    'p1.korbak_misbehave': { text: 'intent to misbehave', src: 'korbak2025', where: 'abstract; Sec. 1' },
    'p1.korbak_before': {
      text: 'explicitly trained to perform extended reasoning in CoT before taking actions or producing final outputs',
      src: 'korbak2025', where: 'Sec. 1',
    },
  });

  // A word of a shared string gets its own element; if the string changed, say so loudly.
  const wrapWord = (html, word, attrs) => {
    if (!html.includes(word)) Deck.fail(`part 1: "${word}" is no longer in "${html}"`);
    return html.replace(word, `<span ${attrs}>${word}</span>`);
  };
  // A term of a quote gets a gloss of ours behind it, in square brackets and in another
  // face, so that it does not read as the source's words.
  const glossed = (html, term, gloss) => {
    if (!html.includes(term)) Deck.fail(`part 1: "${term}" is no longer in "${html}"`);
    return html.replace(term, `${term} <span class="p1-gloss">[${gloss}]</span>`);
  };

  // ---------------------------------------------------------------- slide 1: title
  // One illustrative thought, the same arithmetic slide 2 types into its terminal.
  const THOUGHT = Deck.motifs.thought;
  const TITLE = Object.freeze({
    typeAt: 1900, perGlyph: 32, rest: 1400, perDecay: 64, seed: 7,
    // The idle wave along the dots: time to reach full depth, ms per radian, lag per dot, depth.
    wave: Object.freeze({ ramp: 1200, pace: 900, lag: 0.35, depth: 0.7 }),
  });

  // The one place that shows a real name. The three authors share the talk, so each name
  // carries the same mark. The slide has no line that explains the mark.
  const EQUAL_MARK = '*';
  const authors = () => Deck.meta.authors.map((name) => `
    <span class="p1-title__person">${name}<span class="p1-title__mark">${EQUAL_MARK}</span></span>`).join('');

  Deck.register({
    id: 'p1-title',
    part: 1,
    layout: 'bare',
    ambient: true,
    title: Deck.meta.title,
    cite: [],
    figure: 'illustrative',
    html: `
      <div class="p1-title">
        <div class="p1-title__course">${Deck.meta.course}</div>
        <h1 class="p1-title__name">${wrapWord(wrapWord(Deck.meta.title, 'Thoughts', 'data-tint="thoughts"'), 'Words', 'data-tint="words"')}</h1>
        <p class="p1-title__sub">${Deck.meta.subtitle}</p>
        ${kit.decay({ key: 'thought', text: THOUGHT, label: 'A line of reasoning that turns into dots' })}
        <div class="p1-title__who">${authors()}</div>
      </div>`,
    setup: (ctx) => {
      const glyphs = ctx.qa('.dk-decay__glyph');
      const dots = ctx.qa('.dk-decay__dot');
      const order = util.shuffled(util.range(glyphs.length), TITLE.seed);
      const typed = TITLE.typeAt + glyphs.length * TITLE.perGlyph;
      const decayAt = typed + TITLE.rest;

      const enter = ctx.step({ label: 'a thought types, then decays into dots' });
      enter.show('.p1-title__course', { at: 200 });
      enter.show('.p1-title__name', { at: 350, dur: DUR.move });
      enter.show('.p1-title__sub', { at: 800 });
      enter.show('.p1-title__person', { at: 1100, stagger: 140 });
      // The thought types in teal: what the model writes is what we can read.
      glyphs.forEach((glyph, i) => enter.tween(glyph, { opacity: [0, 1] }, { at: TITLE.typeAt + i * TITLE.perGlyph, dur: TITLE.perGlyph, ease: 'linear' }));
      enter.cls('[data-tint="words"]', 'c-read', { at: typed });
      // Then every letter falls away and leaves an amber dot: the thinking goes on, unread.
      order.forEach((k, rank) => {
        const at = decayAt + rank * TITLE.perDecay;
        enter.tween(glyphs[k], { opacity: [1, 0], y: [0, 12] }, { at, dur: DUR.enter, ease: 'in' });
        enter.tween(dots[k], { opacity: [0, 1], scale: [0.2, 1] }, { at: at + DUR.micro, dur: DUR.enter, ease: 'back' });
      });
      enter.cls('[data-tint="thoughts"]', 'c-hidden', { at: decayAt + (order.length * TITLE.perDecay) / 2 });
      enter.hold(DUR.enter);

      // After the step the dots keep breathing in a slow wave (state.idle is 0 in capture).
      ctx.paint(({ idle }) => {
        if (!idle) return;
        const { ramp, pace, lag, depth } = TITLE.wave;
        dots.forEach((dot, i) => {
          const dip = Math.sin(idle / pace - i * lag) ** 2;
          dot.style.opacity = (1 - depth * util.clamp(idle / ramp) * dip).toFixed(3);
        });
      });
    },
  });

  // ---------------------------------------------------------------- slide 2: thinking is written first
  const PAD = Object.freeze({
    ask: 'What is 17 × 24?',
    answer: '408',
    cps: 40,
    lines: Object.freeze([
      { key: 'split', text: '17 × 24 = 17 × 20 + 17 × 4' },
      { key: 'slip', text: '17 × 20 = 340. 17 × 4 = 58.' },
      { key: 'fix', text: 'Hmm, wait. 17 × 4 = 68, not 58.', beat: 'Hmm, wait.' },
      { key: 'sum', text: '340 + 68 = 408.' },
    ]),
    // The position paper (click 2): one dot per author, group by group, in ms from the click.
    cardAt: 600, signAt: 900, perAuthor: 28, groupGap: 120, fragileAfter: 500,
  });
  // What a monitor is, in the talk's words ("the reasoning" for the paper's "CoT"). The source
  // sentence is the fact 'korbak.monitor_def'; what a flag can lead to is quoted ('korbak.blocked').
  const MONITOR_IS = 'an automated system that reads the reasoning and flags what looks suspicious or potentially harmful.';
  // The monitor's check also stands beside the line with the slip in it: it is not a grade.
  // The note is about the trace, so it goes on the terminal's border, not among the lines.
  const CHECK_IS = 'a check: nothing suspicious, not “correct”';
  // Who signed the position paper: the four largest groups of its author list, then the rest.
  // One dot per author, so the 41 on the card is the number of dots.
  const SIGNED = (() => {
    const groups = ['korbak.at_gdm', 'korbak.at_openai', 'korbak.at_aisi', 'korbak.at_anthropic', 'korbak.at_others']
      .reduce((done, key) => {
        const last = done[done.length - 1];
        const at = last ? last.end + PAD.groupGap : PAD.signAt;
        const before = last ? last.total : 0;
        const n = value(key);
        return [...done, Object.freeze({ name: text(key), n, at, end: at + n * PAD.perAuthor, before, total: before + n })];
      }, []);
    const { total, end } = groups[groups.length - 1];
    if (total !== value('korbak.authors')) throw Deck.fail(`part 1: the groups of the author list add up to ${total}, not to ${value('korbak.authors')}`);
    // "Fragile" turns amber once every author is on the card.
    return Object.freeze({ groups: Object.freeze(groups), fragileAt: end + PAD.fragileAfter });
  })();
  const PAPER = Deck.sources.korbak2025;
  const paperTitle = () => {
    const [head, ...rest] = PAPER.title.split(': ');
    return `${head}:<br>${wrapWord(rest.join(': '), 'Fragile', 'class="p1-pad__fragile"')}`;
  };
  const arrow = (key) => `<svg class="p1-pad__arrow" data-arrow="${key}" viewBox="0 0 64 24"><path d="M2 12h58M48 3l12 9-12 9"/></svg>`;

  // When the entrance has typed the reasoning, and when the trace's frame turns teal (and with
  // it the first cue arrives), in ms. Computed here because the cue is registered before setup() runs;
  // setup() checks the result against its own timeline, so the two cannot drift apart.
  const PAD_AT = (() => {
    const typeMs = (s, cps) => Math.round((s.length / cps) * 1000);
    const traceIn = 600 + DUR.enter;
    const typed = PAD.lines.reduce((end, line, i) => {
      const at = end + (i === 0 ? 200 : 250);
      if (!line.beat) return at + typeMs(line.text, PAD.cps);
      const paused = at + typeMs(line.beat, PAD.cps / 2) + 500;
      return paused + Math.round(((line.text.length - line.beat.length) / PAD.cps) * 1000);
    }, traceIn);
    const answered = typed + 200 + DUR.enter + DUR.enter;
    return Object.freeze({ typed, written: answered + 200 });
  })();

  // A line types; a line with a beat stops after it, then goes on (the self-correction).
  const typeLine = (step, line, gap) => {
    const target = `[data-line="${line.key}"]`;
    if (!line.beat) { step.type(target, line.text, { at: step.end + gap, cps: PAD.cps }); return; }
    step.type(target, line.beat, { at: step.end + gap, cps: PAD.cps / 2 });
    const rest = line.text.length - line.beat.length;
    step.count(target, [line.beat.length, line.text.length], {
      at: step.end + 500, dur: Math.round((rest / PAD.cps) * 1000), ease: 'linear',
      format: (n) => line.text.slice(0, Math.round(n)),
    });
  };

  Deck.register({
    id: 'p1-scratchpad',
    part: 1,
    title: 'Reasoning models write their thinking before they answer',
    cues: [
      { text: 'Thinking first, answer after: the steps are written down', at: PAD_AT.written },
      { text: 'These thoughts are words, so a monitor can read them', step: 1 },
      { text: `${text('korbak.authors')} from rival labs: training may make thoughts unreadable`, step: 2, at: SIGNED.fragileAt },
    ],
    cite: [{ src: 'korbak2025', where: 'title; author list; Sec. 1' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: `
      <div class="p1-pad">
        <div class="p1-pad__flow">
          <div class="p1-pad__prompt dk-card">
            <div class="p1-pad__tag">Prompt</div>
            <div class="p1-pad__ask">${PAD.ask}</div>
          </div>
          ${arrow('in')}
          ${kit.trace({
    key: 'pad', label: 'Reasoning, written out', lines: PAD.lines.map((l) => l.key), verdict: 'clean', note: CHECK_IS,
  })}
          ${arrow('out')}
          <div class="p1-pad__answer dk-card">
            <div class="p1-pad__tag">Answer</div>
            <div class="p1-pad__slot">
              <svg class="p1-pad__lock" viewBox="0 0 48 48"><path d="M15 22v-7a9 9 0 0 1 18 0v7"/><rect x="9" y="22" width="30" height="20" rx="4"/></svg>
              <span class="p1-pad__value">${PAD.answer}</span>
            </div>
            <div class="p1-pad__state"><span class="p1-pad__state-held">held back</span><span class="p1-pad__state-open">released</span></div>
          </div>
          <p class="p1-pad__why"><b>The worry:</b> a model’s <q>${text('p1.korbak_misbehave')}</q></p>
          <p class="p1-pad__def"><b>The monitor:</b> ${MONITOR_IS}</p>
          <p class="p1-pad__gate">If it flags, the answer <q>${text('korbak.blocked')}</q></p>
        </div>
        <div class="p1-pad__paper dk-card">
          <div class="p1-pad__groups">
            ${SIGNED.groups.map((group, i) => `
              <span class="p1-pad__group-name" data-group="${i}">${group.name}</span>
              <span class="p1-pad__group-dots" data-group="${i}">${util.range(group.n).map(() => '<i></i>').join('')}</span>
              <span class="p1-pad__group-n" data-group="${i}"></span>`).join('')}
          </div>
          <div>
            <div class="p1-pad__count"><span class="p1-pad__n"></span><span class="p1-pad__unit">authors, one paper</span></div>
            <div class="p1-pad__paper-title">${paperTitle()}</div>
          </div>
        </div>
      </div>`,
    setup: (ctx) => {
      const trace = ctx.q('[data-trace="pad"]');
      const paperCard = ctx.q('.p1-pad__paper');
      // Until the paper arrives its slot is empty, so the flow sits lower, centered on the stage.
      const lift = Math.round((paperCard.offsetHeight + rowGap(ctx.q('.p1-pad'))) / 2);

      // Enter: the worry first, then the model writes its reasoning and the answer waits;
      // once the words stand, the trace's frame turns teal: the steps are written down, readable.
      const enter = ctx.step({ label: 'the worry; the reasoning is written out; the answer waits' });
      enter.show('.p1-pad__why', { at: 0, rise: 0 });
      enter.tween('.p1-pad__prompt', { opacity: [0, 1], x: [-48, 0] }, { at: 200 });
      enter.show('[data-arrow="in"]', { at: 500, rise: 0 });
      enter.show(trace, { at: 600 });
      PAD.lines.forEach((line, i) => typeLine(enter, line, i === 0 ? 200 : 250));
      if (enter.end !== PAD_AT.typed) throw Deck.fail(`part 1: p1-scratchpad types its reasoning by ${enter.end} ms, PAD_AT says ${PAD_AT.typed}`);
      enter.show('[data-arrow="out"]', { at: enter.end + 200, rise: 0 });
      enter.show('.p1-pad__answer', { at: enter.end });
      enter.cls(trace, 'p1-is-readable', { at: PAD_AT.written });
      enter.hold(DUR.micro);

      // Think, be read, act: the answer is released only after the lens has passed every line.
      // What the monitor is stands under the reasoning it reads; what a flag can do, under the answer.
      const read = ctx.step({ label: 'the monitor reads every line, then the answer is released' });
      read.show('.dk-trace__who', { at: 0, rise: 0 });
      read.show('.p1-pad__def', { at: 100, rise: 0 });
      const done = kit.readTrace(read, trace, { at: 300, perLine: 400, marks: PAD.lines.map((l) => ({ key: l.key })) });
      kit.stamp(read, kit.traceParts(trace).chip, 'is-clean', done + 100);
      read.tween(kit.traceParts(trace).note, { opacity: [0, 1] }, { at: done + 300 });
      const release = done + 700;
      read.tween('.p1-pad__lock', { opacity: [1, 0], scale: [1, 0.6] }, { at: release, dur: DUR.micro });
      read.hide('.p1-pad__state-held', { at: release, dur: DUR.micro });
      read.cls('.p1-pad__answer', 'p1-is-open', { at: release });
      read.tween('.p1-pad__value', { opacity: [0, 1], scale: [0.6, 1] }, { at: release + 100, ease: 'back' });
      read.show('.p1-pad__state-open', { at: release + 200, rise: 0 });
      read.show('.p1-pad__gate', { at: release + 500, rise: 0 });
      read.hold(DUR.micro);

      // The position paper: its authors arrive group by group, one dot each, and the count on
      // the card is the number of dots so far.
      const paper = ctx.step({ label: 'who signed the position paper: training could make the thoughts unreadable' });
      paper.tween('.p1-pad__flow', { y: [lift, 0] }, { dur: DUR.move, ease: 'inOut' });
      // The card waits until the flow and its two captions have moved out of its place.
      paper.show(paperCard, { at: PAD.cardAt });
      SIGNED.groups.forEach((group, i) => {
        const own = `[data-group="${i}"]`;
        const filling = { at: group.at, dur: group.n * PAD.perAuthor, ease: 'linear' };
        paper.tween(`.p1-pad__group-name${own}, .p1-pad__group-n${own}`, { opacity: [0, 1] }, { at: group.at - 100, dur: DUR.micro });
        paper.tween(`.p1-pad__group-dots${own} i`, { opacity: [0, 1], scale: [0.2, 1] }, { at: group.at, dur: DUR.micro, ease: 'back', stagger: PAD.perAuthor });
        paper.count(`.p1-pad__group-n${own}`, [0, group.n], filling);
        paper.count('.p1-pad__n', [group.before, group.total], filling);
      });
      // "Fragile" turns amber: the hook for parts 2 and 3.
      paper.cls('.p1-pad__fragile', 'c-hidden', { at: SIGNED.fragileAt });
      paper.tween('.p1-pad__fragile', { scale: [1, 1.3] }, { at: SIGNED.fragileAt, dur: DUR.micro });
      paper.tween('.p1-pad__fragile', { scale: [1.3, 1] }, { at: SIGNED.fragileAt + DUR.micro, dur: DUR.enter });
      paper.hold(DUR.micro);
    },
  });

  // ---------------------------------------------------------------- slide 3: the text row is the only way back down
  // A redrawing of Korbak et al., Fig. 1, on the shared lattice. The tokens are slide 2's sum.
  const MEM = Object.freeze({
    shape: Object.freeze({ cols: 8, rows: 4 }),
    tokens: Object.freeze(['17×24', '17×20', '=340', '17×4', '=68', '340', '+68', '=408']),
    zoom: 1.2,        // the lattice is drawn at 1.2 times the kit's size
    writeSpan: 80,    // a token is typed over the last 80 units of the drop that writes it
    landing: 40,      // a drop lands this far left of the chip's center, clear of the column above it
    fade: 16,         // the pulse fades over this distance where it enters and leaves a chip
    bandPad: 10,
    lookGap: 8,       // an attention link stops this far short of the two nodes it joins
  });

  // Each leg of the chain gets one signal; the head of the chain is the sum of all of them.
  const runLegs = (step, legs, { at, climb, drop, rest }) => legs.reduce((state, leg) => {
    const dur = leg.kind === 'climb' ? climb : drop;
    const get = step.signal({ to: leg.length, at: state.at, dur, ease: 'inOut' });
    return { at: state.at + dur + (leg.kind === 'drop' ? rest : 0), gets: [...state.gets, get] };
  }, { at, gets: [] });

  Deck.register({
    id: 'p1-memory',
    part: 1,
    title: 'Hard problems force the reasoning through the words',
    cues: [
      'One pass through the layers is shallow',
      { text: 'Attention looks sideways; only a written token goes back down', step: 1 },
      { text: 'On hard problems, today’s models must write: they sample tokens', step: 2, at: 2600 },
    ],
    cite: [{ src: 'korbak2025', where: 'Sec. 1.1, Fig. 1' }],
    // The lattice redraws the paper's Fig. 1; the tokens in its text row are slide 2's sum,
    // an example of ours.
    figure: ['schematic', 'illustrative'],
    html: `
      <div class="p1-mem">
        <div class="p1-mem__main">
          <div class="p1-mem__axis">
            <span class="p1-mem__axis-layers">layers</span>
            <i class="p1-mem__axis-up"></i>
            <span class="p1-mem__axis-text">text</span>
          </div>
          <div class="p1-mem__board">
            <i class="p1-mem__band"></i>
            ${kit.lattice({ key: 'mem', ...MEM.shape, tokens: MEM.tokens.slice(0, 1) })}
            <svg class="p1-mem__paths"></svg>
            ${kit.lens({ key: 'reader' })}
          </div>
          <div class="p1-mem__side">
            <div class="p1-mem__depth">
              <span class="p1-mem__depth-n"></span><span class="p1-mem__depth-label">serial steps</span>
              <span class="p1-mem__depth-of">${MEM.shape.rows} layers × ${MEM.shape.cols} tokens</span>
            </div>
            <div class="p1-mem__reads">the monitor<br>reads here</div>
          </div>
        </div>
        <figure class="p1-mem__quote">
          <blockquote class="dk-quote">“${glossed(text('korbak.externalized'), 'chain of thought', 'the written reasoning')}”</blockquote>
          <figcaption class="p1-mem__caveat">The authors’ caveat: having to be written down does not mean a monitor <b>can read</b> it</figcaption>
        </figure>
      </div>`,
    setup: (ctx) => {
      const { shape, tokens, zoom, writeSpan, landing, fade, bandPad, lookGap } = MEM;
      const size = kit.latticeSize(shape);
      const num = (el, name) => Number(el.getAttribute(name));
      const share = (v, whole) => `${((v / whole) * 100).toFixed(3)}%`;
      const board = ctx.q('.p1-mem__board');
      const paths = ctx.q('.p1-mem__paths');
      const lens = ctx.q('[data-lens="reader"]');
      const band = ctx.q('.p1-mem__band');
      const depth = ctx.q('.p1-mem__depth-n');

      // Geometry is read from the lattice the kit drew, in its viewBox units.
      const columns = util.range(shape.cols).map((c) => {
        const nodes = util.range(shape.rows).map((r) => ctx.q(`[data-node="${c}-${r}"]`));
        const chip = ctx.q(`[data-token="${c}"]`);
        const x = num(nodes[0], 'cx');
        return {
          c, nodes, chip, x, word: tokens[c],
          links: util.range(shape.rows - 1).map((r) => ctx.q(`[data-link="${c}-${r}"]`)),
          label: chip.querySelector('text'),
          entry: { x, y: num(chip.querySelector('rect'), 'y') },
          top: { x, y: num(nodes[shape.rows - 1], 'cy') },
          heights: nodes.map((node) => num(node, 'cy')),
        };
      });
      const chipBox = columns[0].chip.querySelector('rect');
      const row = { top: num(chipBox, 'y') - bandPad, height: num(chipBox, 'height') + 2 * bandPad };
      const layers = { top: columns[0].top.y, bottom: columns[0].heights[0] };

      // Static placement, all relative to the board so the picture scales as one.
      board.style.width = `${size.width * zoom}px`;
      paths.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
      [band, lens].forEach((el) => { el.style.top = share(row.top, size.height); el.style.height = share(row.height, size.height); });
      ctx.q('.p1-mem__axis-layers').style.top = share((layers.top + layers.bottom) / 2, size.height);
      const arrowUp = ctx.q('.p1-mem__axis-up');
      arrowUp.style.top = share(layers.top, size.height);
      arrowUp.style.height = share(layers.bottom - layers.top, size.height);
      // Until the quote arrives its slot is empty, so the picture sits lower, centered on the stage.
      const lift = Math.round((ctx.q('.p1-mem__quote').offsetHeight + rowGap(ctx.q('.p1-mem'))) / 2);
      ctx.q('.p1-mem__axis-text').style.top = share(row.top + row.height / 2, size.height);
      ctx.q('.p1-mem__depth').style.top = share(layers.top - 12, size.height);
      ctx.q('.p1-mem__reads').style.top = share(row.top + row.height / 2, size.height);

      // The chain: up a column (inside the model), then down to the next token (written text).
      const legs = columns.flatMap((col, c) => {
        const next = columns[c + 1];
        const climb = { kind: 'climb', col, from: col.entry, to: col.top };
        return next ? [climb, { kind: 'drop', col: next, from: col.top, to: { x: next.entry.x - landing, y: next.entry.y } }] : [climb];
      }).reduce((done, leg) => {
        const start = done.length ? done[done.length - 1].end : 0;
        const length = Math.hypot(leg.to.x - leg.from.x, leg.to.y - leg.from.y);
        const line = util.svg('line', {
          class: `p1-mem__leg p1-mem__leg--${leg.kind}`, x1: leg.from.x, y1: leg.from.y, x2: leg.to.x, y2: leg.to.y,
          'stroke-dasharray': `${length} ${length + 16}`,
        });
        return [...done, { ...leg, start, length, end: start + length, line }];
      }, []);
      // Attention, drawn faintly under the chain: a column can look at the one before it, one
      // layer further up. Sideways and up, never down ('p1.korbak_only_way'), which is why a
      // chain longer than the layers has to come back down through a written token.
      const looks = columns.slice(0, -1).flatMap((col, c) => util.range(shape.rows - 1).map((r) => {
        const from = { x: col.x, y: col.heights[r] };
        const to = { x: columns[c + 1].x, y: columns[c + 1].heights[r + 1] };
        const length = Math.hypot(to.x - from.x, to.y - from.y);
        const clear = (num(col.nodes[r], 'r') + lookGap) / length;
        return util.svg('line', {
          class: 'p1-mem__look',
          x1: util.lerp(from.x, to.x, clear), y1: util.lerp(from.y, to.y, clear),
          x2: util.lerp(to.x, from.x, clear), y2: util.lerp(to.y, from.y, clear),
        });
      }));
      const pulse = util.svg('circle', { class: 'p1-mem__pulse', r: 9 });
      paths.append(...looks, ...legs.map((leg) => leg.line), pulse);
      const tracks = columns.map((col) => ({
        col,
        climb: legs.find((leg) => leg.kind === 'climb' && leg.col === col),
        written: legs.find((leg) => leg.kind === 'drop' && leg.col === col) ?? null,
      }));

      const enter = ctx.step({ label: 'one pass up the layers, and it stops' });
      enter.tween('.p1-mem__main', { opacity: [0, 1], y: [lift + 16, lift] }, { at: 200 });
      enter.show('.p1-mem__depth', { at: 900, rise: 0 });
      const first = runLegs(enter, legs.slice(0, 1), { at: 900, climb: 1400, drop: 0, rest: 0 });
      enter.hold(DUR.enter);

      const zig = ctx.step({ label: 'down through a written token, then up again' });
      // What the second cue names is on screen when it is said: attention, sideways and up.
      zig.tween(looks, { opacity: [0, 1] }, { at: 0, dur: DUR.enter, stagger: 12 });
      const second = runLegs(zig, legs.slice(1, 5), { at: 100, climb: 800, drop: 700, rest: 200 });
      zig.hold(DUR.enter);

      const chain = ctx.step({ label: 'eight hops, each one through the text row' });
      chain.tween('.p1-mem__main', { y: [lift, 0] }, { dur: DUR.move, ease: 'inOut' });
      const third = runLegs(chain, legs.slice(5), { at: 0, climb: 240, drop: 260, rest: 0 });
      const scanAt = third.at + 300;
      const scan = chain.signal({ at: scanAt, dur: 1400, ease: 'inOut' });
      chain.tween(lens, { opacity: [0, 1] }, { at: scanAt - DUR.micro, dur: DUR.micro });
      chain.show('.p1-mem__depth-of', { at: third.at, rise: 0 });
      chain.show('.p1-mem__reads', { at: scanAt + 1400, rise: 0 });
      chain.show('.p1-mem__quote', { at: scanAt + 1700 });
      chain.show('.p1-mem__caveat', { at: scanAt + 2500, rise: 0 });
      chain.hold(DUR.enter);

      const gets = [...first.gets, ...second.gets, ...third.gets];
      const reached = (head, at) => head >= at - 0.01;

      ctx.paint(() => {
        const head = gets.reduce((sum, get) => sum + get(), 0);
        const read = scan();
        const active = legs.find((leg) => head <= leg.end) ?? legs[legs.length - 1];
        const along = util.clamp((head - active.start) / active.length);

        legs.forEach((leg) => {
          const drawn = util.clamp((head - leg.start) / leg.length);
          leg.line.style.strokeDashoffset = (leg.length * (1 - drawn)).toFixed(2);
        });
        pulse.setAttribute('cx', util.lerp(active.from.x, active.to.x, along).toFixed(2));
        pulse.setAttribute('cy', util.lerp(active.from.y, active.to.y, along).toFixed(2));
        const shown = active.kind === 'drop' ? (active.end - head) / fade : (active.start > 0 ? (head - active.start) / fade : 1);
        pulse.style.opacity = head > 0 ? util.clamp(shown).toFixed(3) : '0';
        pulse.classList.toggle('p1-is-text', active.kind === 'drop');

        const lit = tracks.map(({ col, climb, written }) => {
          const count = col.heights.filter((y) => reached(head, climb.start + (col.entry.y - y))).length;
          col.nodes.forEach((node, r) => node.classList.toggle('is-lit', r < count));
          col.links.forEach((link, r) => link.classList.toggle('is-lit', r + 1 < count));
          const typed = written
            ? Math.round(col.word.length * util.clamp((head - (written.end - writeSpan)) / writeSpan))
            : col.word.length;
          if (written && col.label.textContent !== col.word.slice(0, typed)) col.label.textContent = col.word.slice(0, typed);
          // The first chip holds the question: the model reads it and does not write it, so
          // it keeps its plain frame when the lens has passed (as the "Q" chip of slide 7).
          col.chip.classList.toggle('is-read', Boolean(written) && typed > 0);
          return count;
        });
        const steps = String(lit.reduce((sum, n) => sum + n, 0));
        if (depth.textContent !== steps) depth.textContent = steps;
        lens.style.left = share(read, 1);
        band.style.width = share(read, 1);
      });
    },
  });

  // ---------------------------------------------------------------- slide 4: "Let's hack" (wow 1)
  // The terminal is the shared motif (shared/motifs.js): slide 8 opens on what this slide
  // leaves. Here each line also has a typing speed and a pause before it. The box holds the
  // agent's thoughts only; where they come from is said on its border (the motif's note).
  const HACK = Deck.motifs.hackTrace;
  const HACK_PACE = Object.freeze({
    fig1a: { cps: 32, gap: 0 },
    fig1b: { cps: 32, gap: 0 },
    hack: { cps: 6, gap: 900 },   // the last line types slowly
  });
  // What the action monitor is shown: the two systemic hacks, by the paper's names. The
  // glosses are ours, after 'baker.exit0_def' and 'baker.skiptest_def' (Sec. 2.1). They are
  // not what the agent in the terminal went on to do: its two thoughts come from two
  // problem-specific hacks (Fig. 1, Fig. 9), and recall is measured on these two systemic
  // ones (Table 1). The pane's label says so, so that the two boxes do not read as one episode.
  const HACK_ACTS = Object.freeze(['leaves early, before the tests run', 'raises an exception that skips the tests']);
  const HACK_LINES = Object.freeze(HACK.lines.map((line) => {
    if (!HACK_PACE[line.key]) throw Deck.fail(`part 1: no typing pace for the trace line "${line.key}"`);
    return Object.freeze({ ...line, ...HACK_PACE[line.key] });
  }));
  const GRID = Object.freeze({ n: 100, cols: 10 });
  const RECALL = Object.freeze({ action: value('baker.recall_action'), cot: value('baker.recall_cot') });
  const ZOOM = 1.2;   // the terminal fills the stage while it is the whole story
  const VEILED = 0.5; // the terminal's opacity under the veil
  const POP = Object.freeze({ reach: 4, gain: 0.3 });   // cells just behind a scan bar swell

  // The reveal (click 2), in ms from the click. The cue that states both numbers waits for the count.
  const REVEAL = (() => {
    const perLine = 220;
    const read = 400 + HACK_LINES.length * perLine;   // the lens has read the thought
    const fast = read + 600;                          // the scan re-covers what actions alone showed
    const slow = fast + 400 + 150;                    // then goes on past it
    const slowDur = 1600;
    const landed = slow + (slowDur * (RECALL.cot - RECALL.action)) / (GRID.n - RECALL.action);
    return Object.freeze({ lens: 400, perLine, read, fast, fastDur: 400, slow, slowDur, landed, blink: slow + slowDur + 250 });
  })();

  const actor = ({ role, name, note }) => `
    <div class="p1-hack__actor p1-hack__actor--${role}">
      <i class="p1-hack__disc"></i>
      <div><span class="p1-hack__name">${name}</span><span class="p1-hack__role">${note}</span></div>
    </div>`;

  // How far an element's layout box is from the center of the stage, in stage pixels.
  const offsetToCenter = (stage, el) => {
    const s = stage.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const k = stage.offsetWidth / s.width;
    return {
      x: Math.round((s.left + s.width / 2 - (r.left + r.width / 2)) * k),
      y: Math.round((s.top + s.height / 2 - (r.top + r.height / 2)) * k),
    };
  };

  Deck.register({
    id: 'p1-hack',
    part: 1,
    title: 'Sometimes the model just says it: <em>“Let’s hack”</em>',
    cues: [
      'A frontier coding agent, asked to implement features so all tests pass',
      { text: `Actions only: ${text('baker.recall_action')} caught.<br>With thoughts: <b>${text('baker.recall_cot')}</b>`, step: 2, at: REVEAL.landed },
      { text: 'But does the text always say why?', step: 3, at: 600 },
    ],
    cite: [{ src: 'baker2025', where: 'Fig. 1; App. A, Fig. 9; Table 1; abstract' }],
    // The left half is our arrangement of what the paper reports (a paraphrase, a quote from
    // another task, glosses, the two discs), so the slide is a schematic; the grid and the
    // meters carry the paper's measured numbers.
    figure: 'schematic',
    numbers: 'reported',
    html: `
      <div class="p1-hack">
        <div class="p1-hack__left">
          ${kit.trace({
    key: HACK.key, label: HACK.label, verdict: HACK.verdict, width: HACK.width, lines: HACK_LINES,
    inner: '<div class="p1-hack__veil"><span>Hidden from the action monitor</span></div>',
  })}
          <div class="p1-hack__acts">
            <div class="dk-term">
              <div class="dk-term__label"><span class="p1-hack__other">Other episodes:</span> the two systemic hacks</div>
              ${text('baker.systemic_hacks').split(' and ').map((name, i) => `<div class="dk-term__line p1-hack__act"><b>${name}</b><span>${HACK_ACTS[i]}</span></div>`).join('')}
              <div class="p1-hack__sees">Actions like these are all that the action monitor sees.</div>
            </div>
            ${kit.legend({ key: 'acts', text: 'names: Sec. 2.1 · glosses: ours' })}
          </div>
          <div class="p1-hack__pair">
            ${actor({ role: 'monitor', name: text('baker.monitor'), note: 'the monitor · weaker model' })}
            <div class="p1-hack__watch"><span>watches</span><i class="p1-hack__gaze"></i></div>
            ${actor({ role: 'agent', name: 'Frontier agent', note: 'stronger model' })}
          </div>
        </div>
        <div class="p1-hack__right">
          <div class="p1-hack__board">
            <div class="p1-hack__gridbox">
              ${kit.grid({ key: 'hacks', n: GRID.n, cols: GRID.cols })}
              <i class="p1-hack__scan"></i>
              ${kit.lens({ key: 'grid' })}
            </div>
            <div class="p1-hack__legend">
              <div>
                <div class="p1-hack__unit">of every</div>
                <div class="p1-hack__total">${GRID.n}</div>
                <div class="p1-hack__unit">systemic hacks</div>
                <div class="p1-hack__means">systemic: they worked in nearly every training task</div>
              </div>
              <div class="p1-hack__missed">${GRID.n - RECALL.cot} missed</div>
            </div>
          </div>
          <div class="p1-hack__meters">
            ${kit.meter({ key: 'action', label: 'Actions only', tone: 'dim' })}
            ${kit.meter({ key: 'cot', label: 'With thoughts', tone: 'read' })}
            <p class="p1-hack__precision">Recall: ${text('baker.recall_action')} → ${text('baker.recall_cot')}. Precision: ${text('baker.precision_action')} → ${text('baker.precision_cot')}.</p>
          </div>
        </div>
      </div>`,
    setup: (ctx) => {
      const trace = ctx.q(`[data-trace="${HACK.key}"]`);
      const { term, chip, note } = kit.traceParts(trace);
      const home = offsetToCenter(ctx.stage, trace);
      const cells = ctx.qa('[data-grid="hacks"] [data-cell]');
      const missed = cells.slice(RECALL.cot);
      const bars = {
        action: { scan: ctx.q('.p1-hack__scan'), fill: ctx.q('[data-meter="action"] .dk-meter__fill'), value: ctx.q('[data-meter="action"] .dk-meter__value') },
        cot: { scan: ctx.q('[data-lens="grid"]'), fill: ctx.q('[data-meter="cot"] .dk-meter__fill'), value: ctx.q('[data-meter="cot"] .dk-meter__value') },
      };

      // Enter: only the terminal, large and centered. The last line types slowly, in red.
      const enter = ctx.step({ label: 'the agent thinks: Let’s hack' });
      enter.tween(trace, { opacity: [0, 1], y: [home.y + 16, home.y] }, { at: 300 });
      HACK_LINES.forEach((line) => {
        const target = `[data-line="${line.key}"]`;
        if (line.tone) enter.cls(target, line.tone);
        enter.type(target, text(line.fact), { at: Math.max(700, enter.end + line.gap), cps: line.cps });
      });
      // Then, on the border, which lines are a paraphrase and which are the agent's own words.
      const typed = enter.end;
      enter.type(note, text(HACK.note), { at: typed + 300, dur: 0 });
      enter.tween(note, { opacity: [0, 1] }, { at: typed + 300 });
      enter.hold(DUR.enter);

      // Click 1: the terminal steps aside and goes dark for a monitor that sees actions only.
      const blind = ctx.step({ label: 'actions only: 60 of 100 caught' });
      blind.tween(trace, { x: [home.x, 0], y: [home.y, 0], scale: [ZOOM, 1] }, { dur: DUR.move, ease: 'inOut' });
      blind.tween(term, { opacity: [1, VEILED] }, { at: 500 });
      blind.show('.p1-hack__veil', { at: 600, rise: 0 });
      blind.show('.p1-hack__acts', { at: 700 });
      blind.show('.p1-hack__board', { at: 500 });
      blind.show('[data-meter="action"]', { at: 900, rise: 0 });
      const actionScan = blind.signal({ to: GRID.n, at: 1300, dur: 1500, ease: 'linear' });
      blind.hold(DUR.enter);

      // Click 2, the reveal: the veil lifts, the lens reads the thought and flags it,
      // then the same grid is swept again, past 60 and up to 95.
      const seen = ctx.step({ label: 'with thoughts: 95 of 100 caught' });
      seen.tween(term, { opacity: [VEILED, 1] }, {});
      seen.hide('.p1-hack__veil', { dur: DUR.micro });
      seen.show('.dk-trace__who', { at: DUR.micro, rise: 0 });
      kit.readTrace(seen, trace, { at: REVEAL.lens, perLine: REVEAL.perLine, marks: HACK_LINES.filter((l) => l.flag) });
      kit.stamp(seen, chip, 'is-flagged', REVEAL.read);
      seen.cls(trace, 'is-alarm', { at: REVEAL.read });
      seen.show('[data-meter="cot"]', { at: REVEAL.fast - DUR.micro, rise: 0 });
      const cotFast = seen.signal({ to: RECALL.action, at: REVEAL.fast, dur: REVEAL.fastDur, ease: 'linear' });
      const cotSlow = seen.signal({ to: GRID.n - RECALL.action, at: REVEAL.slow, dur: REVEAL.slowDur, ease: 'linear' });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink + 300, on: false });
      seen.show('.p1-hack__missed', { at: REVEAL.blink + 300, rise: 0 });
      seen.show('.p1-hack__precision', { at: REVEAL.blink + 500, rise: 0 });
      seen.hold(DUR.enter);

      // Click 3: who was watching whom, and the question that hands over to part 2.
      const who = ctx.step({ label: 'a weaker model watches a stronger one' });
      who.tween('.p1-hack__actor--monitor', { opacity: [0, 1], scale: [0.7, 1] }, { ease: 'back' });
      who.tween('.p1-hack__watch', { opacity: [0, 1], x: [-24, 0] }, { at: 250 });
      who.tween('.p1-hack__actor--agent', { opacity: [0, 1], scale: [0.7, 1] }, { at: 500, ease: 'back' });
      who.hold(DUR.move);

      // The grid, both scan bars and both meters are drawn from the two scan positions,
      // so a meter always shows exactly the number of cells that are lit.
      const pitch = cells[GRID.cols].offsetTop - cells[0].offsetTop;
      const sweep = (bar, at, caught) => {
        bar.scan.style.top = `${((at / GRID.cols) * pitch).toFixed(1)}px`;
        bar.scan.style.opacity = util.clamp(Math.min(at, GRID.n - at) / 3).toFixed(3);
        bar.fill.style.setProperty('--v', `${caught.toFixed(2)}%`);
        const label = percent(Math.ceil(caught));
        if (bar.value.textContent !== label) bar.value.textContent = label;
      };
      // How much a lit cell swells: most right behind a scan bar that is still moving.
      const pop = (i, front, caught) => (i < caught && front < GRID.n ? util.clamp(1 - (front - i) / POP.reach) : 0);
      ctx.paint(() => {
        const action = actionScan();
        const cot = cotFast() + cotSlow();
        const byAction = Math.min(action, RECALL.action);
        const byCot = Math.min(cot, RECALL.cot);
        cells.forEach((cell, i) => {
          cell.classList.toggle('p1-is-cot', i < byCot);
          cell.classList.toggle('p1-is-act', i < byAction && i >= byCot);
          cell.classList.toggle('p1-is-miss', i >= RECALL.cot && cot >= GRID.n);
          const swell = Math.max(pop(i, action, byAction), pop(i, cot, byCot));
          cell.style.transform = swell > 0 ? `scale(${(1 + POP.gain * swell).toFixed(3)})` : '';
        });
        sweep(bars.action, action, byAction);
        sweep(bars.cot, cot, byCot);
      });
    },
  });
})();
