// Part 2: The cracks (Sicheng Xue). Slides 5-7.
// SPEC.md section 4 describes the slides; parts/sample.js shows the API.
// Every number and quote is read from the fact table (shared/facts.js, and the facts below).
(() => {
  'use strict';

  const { kit, util } = Deck;

  // Facts that only slides 5 and 6 need: the sentences of Chen et al. 2025 behind their
  // wording ("often", "on average", "a single kind of hint", "mentions") and behind the
  // note that the worked example is ours, after the paper's own. Each was searched for in
  // the arXiv HTML full text (2505.05410) on 2026-11-09. One verb says that the hint is in
  // the reasoning, on both slides: it "mentions" the hint, which is the paper's word for the
  // first half of what it counts ('p2.chen_mentions').
  Deck.addFacts({
    'p2.chen_mentions': { text: 'the CoT mentions the hint (in part or in whole)', src: 'chen2025', where: 'Sec. 2.3' },
    'p2.chen_hints': { value: 6, text: '6 hints', src: 'chen2025', where: 'Sec. 2.2; Table 1' },
    'p2.chen_averaged': { text: 'scores averaged across MMLU and GPQA', src: 'chen2025', where: 'Sec. 3' },
    'p2.chen_overall': { text: 'The overall faithfulness scores for both reasoning models remain low', src: 'chen2025', where: 'Sec. 3' },
    'p2.chen_settings': { text: 'at least 1% of the time in 6/6 settings', src: 'chen2025', where: 'Sec. 3' },
    'p2.chen_example': { text: 'without verbalizing its reliance on the metadata', src: 'chen2025', where: 'Fig. 2 caption' },
    'p2.chen_pattern': {
      text: 'they often construct elaborate yet flawed justifications for these hints without acknowledging them',
      src: 'chen2025', where: 'Sec. 3',
    },
  });

  // Facts that only slide 7 needs: the sentences behind "no token is sampled" (vectors) and
  // "trained for this" (vectors; for dots it is 'pfau.supervision'). Each was searched for
  // as a whole string in the arXiv HTML full text (2412.06769v4, the copy downloaded on
  // 2026-11-09). 'p1.korbak_sampling', registered in parts/part1.js, is behind "models
  // sample tokens" in the line that returns to slide 3.
  Deck.addFacts({
    'p2.hao_not_decoded': { text: 'Rather than decoding this into a word token', src: 'hao2024', where: 'abstract' },
    'p2.hao_paradigm': { text: 'a simple modification to the traditional CoT process', src: 'hao2024', where: 'Sec. 1' },
    'p2.hao_training': { text: 'a multi-stage training curriculum', src: 'hao2024', where: 'Sec. 3' },
  });
  // Facts that only slide 7's main line needs: why the dots do not take slide 3 back. A
  // chain in which a later step uses an earlier result cannot run on dots, which add
  // computation in parallel only. Each was searched for as a whole string in the arXiv HTML
  // full text (2404.15758v1, the copy downloaded on 2026-11-09); 'pfau.parallel' and
  // 'pfau.current_llms' in shared/facts.js say the same from two more sides.
  Deck.addFacts({
    'p2.pfau_serial': {
      text: 'These serial chains of thought require caching of intermediate results (dimension-wise 3SUMs) and as such cannot be parallelized across filler tokens.',
      src: 'pfau2024', where: 'Sec. 3.1',
    },
    'p2.pfau_capacity': {
      text: 'may be used purely for their computational capacity rather than for the human-like, faithful serial reasoning',
      src: 'pfau2024', where: 'Sec. 6',
    },
  });
  // The main line at the last click gives the reason for the vectors: the model is a GPT-2
  // ('hao.base') trained for them ('p2.hao_training'), and on the math set it stays behind
  // written steps ('hao.not_surpass'; 'hao.gsm8k_cot' and 'hao.gsm8k_latent' are the two
  // bars). The line does not say that vectors were tried in a GPT-2 only: an appendix
  // reports two larger models, against the model that answers at once and not against
  // written steps. That sentence is registered here for questions; it was searched for as
  // a whole string in both copies of 2412.06769v4 downloaded on 2026-11-09.
  Deck.addFacts({
    'p2.hao_larger': {
      text: 'We experimented with Coconut on GSM8k using Llama 3.2-3B and Llama 3-8B',
      src: 'hao2024', where: 'App. C.2',
    },
  });

  // The worked example of slides 5 and 6 is ours (illustrative), built after the paper's own
  // example ('p2.chen_example') and the pattern it reports ('p2.chen_pattern'): right without
  // the hint, then a flawed justification of the hinted answer that leaves the hint out. The
  // hint sentence is the paper's, word for word. Each box says on its border which it is,
  // because the question around the hint is not the paper's. The hint names (A), so the
  // question is built to make (A) wrong and (B) right.
  const CASE = Object.freeze({
    question: 'Which planet is closest to the Sun?',
    options: Object.freeze([['A', 'Venus'], ['B', 'Mercury'], ['C', 'Earth'], ['D', 'Mars']]),
    plain: Object.freeze(['Mercury has the smallest orbit.', 'So the answer is (B).']),
    hinted: Object.freeze(['Venus is the hottest planet.', 'Then it must be the closest.', 'So the answer is (A).']),
    search: 'professor',
    unsaid: 'not mentioned in the reasoning',
  });
  const said = (key) => Deck.fact(key).text;
  // The first sentence of the paper's hint, for the small card that stands for it on slide 6.
  const hintLead = () => {
    const [first, ...rest] = said('chen.hint').split('. ');
    if (!rest.length) throw new Error('the hint of Chen et al. no longer has a second sentence to cut');
    return `${first}.`;
  };
  const percent = (v) => `${Math.round(v)}%`;
  // A reader's search of the reasoning and its result; slide 6 shows it again at the reveal.
  const findHtml = (key) => `
    <div class="p2-find" data-find="${key}">
      <span class="p2-find__box"><i>find</i><b class="p2-find__text"></b></span>
      <span class="p2-find__stamp">0 matches</span>
    </div>`;
  const lines = (prefix, n) => util.range(n).map((i) => `<div class="dk-term__line" data-line="${prefix}-${i}"></div>`).join('');

  // ---------------------------------------------------------------- slide 5: the hint
  const MODELS = Object.freeze([
    { key: 'claude', name: 'chen.model_claude', rate: 'chen.overall_claude' },
    { key: 'r1', name: 'chen.model_r1', rate: 'chen.overall_r1' },
  ]);
  const HINT = Object.freeze({
    caseShift: 126,       // the example sits in the middle until the grids need the room
    lensFrom: 80, lensTo: 212, lineHeight: 44,
    cps: 40, cellMs: 36,
    ratesAt: 1700, rateGap: 400,   // click 3: when the first chart starts to count, and the pause before the next
  });
  // When each chart starts to count and when the last one has landed, in ms from click 3.
  // The cue that states both rates waits for them, as on slide 4.
  const RATES = (() => {
    const starts = MODELS.reduce((done, model) => {
      const last = done[done.length - 1];
      const at = last ? last.end + HINT.rateGap : HINT.ratesAt;
      return [...done, Object.freeze({ at, end: at + Deck.fact(model.rate).value * HINT.cellMs })];
    }, []);
    return Object.freeze({ starts: Object.freeze(starts), landed: starts[starts.length - 1].end });
  })();

  const modelHtml = (model) => `
    <div class="p2-hint__model">
      <div class="p2-hint__model-head">
        <span class="p2-hint__model-name">${said(model.name)}</span>
        <span class="p2-hint__rate" data-rate="${model.key}"></span>
        <span class="p2-hint__rate-what">mention it</span>
      </div>
      ${kit.grid({ key: model.key, n: 100, cols: 20, tone: 'read' })}
    </div>`;

  const hintHtml = () => `
    <div class="p2-hint"><div class="p2-hint__box">
      <div class="p2-hint__case">
        <svg class="p2-hint__wire" viewBox="0 0 1728 360" width="1728" height="360" aria-hidden="true">
          <path class="p2-hint__wire-path" pathLength="1" d="M672 116 H680 Q692 116 692 128 V304 Q692 320 708 320 H1612 Q1628 320 1628 304 V302"/>
          <path class="p2-hint__wire-head" d="M1616 308 L1628 292 L1640 308 Z"/>
          <circle class="p2-hint__wire-dot" r="9" cx="672" cy="116"/>
        </svg>
        <div class="p2-hint__prompt">
          <div class="p2-hint__prompt-head"><span class="p2-label">Prompt</span><span class="p2-hint__whose">hint, verbatim: Chen et al.</span></div>
          <div class="p2-hint__slot"><div class="p2-hint__hint"></div></div>
          <div class="p2-hint__question">${CASE.question}</div>
          <div class="p2-hint__options">
            ${CASE.options.map(([letter, name]) => `<span data-option="${letter}"><b>(${letter})</b> ${name}</span>`).join('')}
          </div>
          ${kit.legend({ key: 'prompt', text: 'question: ours' })}
        </div>
        <div class="p2-hint__echo">
          <span class="p2-hint__echo-tag">Slide 4</span>
          <span class="p2-hint__echo-note">it said why:</span>
          <span class="p2-hint__echo-quote">“${said('baker.quote_hack')}”</span>
          ${kit.flag({ key: 'echo', text: 'flagged' })}
        </div>
        <div class="dk-term p2-hint__term">
          <div class="dk-term__label">Reasoning</div>
          ${findHtml('hint')}
          <div class="p2-hint__lines">
            <div class="p2-hint__plain">${lines('plain', CASE.plain.length)}</div>
            <div class="p2-hint__hinted">${lines('hinted', CASE.hinted.length)}</div>
          </div>
          ${kit.lens({ key: 'hint' })}
          ${kit.legend({ key: 'reasoning', text: 'illustrative: ours, after Chen et al., Fig. 2' })}
        </div>
        <div class="p2-hint__answer">
          <div class="p2-label">Answer</div>
          <div class="p2-hint__tile"><div class="p2-hint__tile-inner">
            <span class="p2-hint__face p2-hint__face--plain">(B)</span>
            <span class="p2-hint__face p2-hint__face--hinted">(A)</span>
          </div></div>
          <div class="p2-hint__verdicts">
            <span class="p2-hint__verdict p2-hint__verdict--ok">correct</span>
            <span class="p2-hint__verdict p2-hint__verdict--bad">wrong</span>
          </div>
        </div>
        <div class="p2-hint__wire-label">${CASE.unsaid}</div>
      </div>
      <div class="p2-hint__stats">
        <div class="p2-hint__stats-head">
          <span>Of every 100 answers that a hint flipped</span>
          <span class="p2-hint__legend" data-tone="read"><i></i>the reasoning mentions the hint</span>
          <span class="p2-hint__legend" data-tone="hidden"><i></i>it does not</span>
          <span class="p2-hint__source">reported: Chen et al., Fig. 1</span>
        </div>
        <div class="p2-hint__models">${MODELS.map(modelHtml).join('')}</div>
        <div class="p2-hint__caveat">Averaged over ${Deck.fact('p2.chen_hints').value} kinds of hint (the professor’s is one) and two question sets. For a single kind: ${said('chen.often_below')}.</div>
      </div>
    </div></div>`;

  const hintSetup = (ctx) => {
    const { fact, dur } = ctx;
    const typeLines = (step, prefix, texts, startAt) => texts.reduce((at, text, i) => {
      step.type(`[data-line="${prefix}-${i}"]`, text, { at, cps: HINT.cps });
      return at + Math.round((text.length / HINT.cps) * 1000) + 220;
    }, startAt);

    // Enter: no hint. The model reasons and answers (B). The tab above the reasoning answers
    // slide 4's last cue ("But does the text always say why?"): that time it did.
    const enter = ctx.step({ label: 'no hint: answer B' });
    enter.show('.p2-hint__echo', { at: 100, rise: 8 });
    enter.show('.p2-hint__prompt', { at: 260 });
    enter.show('.p2-hint__term', { at: 380 });
    enter.show('.p2-hint__answer', { at: 500 });
    const plainDone = typeLines(enter, 'plain', CASE.plain, 1000);
    enter.tween('.p2-hint__tile', { opacity: [0, 1], scale: [0.6, 1] }, { at: plainDone, dur: dur.enter, ease: 'back' });
    enter.show('.p2-hint__verdict--ok', { at: plainDone + 200, rise: 0 });
    enter.cls('[data-option="B"]', 'is-picked', { at: plainDone + 200 });

    // Click 1: one sentence slips into the prompt; the reasoning is rewritten; the answer flips.
    const slip = ctx.step({ label: 'hint: answer flips to A' });
    const hint = fact('chen.hint').text;
    slip.tween('.p2-hint__slot', { height: ['0px', '104px'] }, { dur: 500, ease: 'inOut' });
    slip.tween('.p2-hint__hint', { opacity: [0, 1] }, { at: 350, dur: dur.micro });
    slip.tween('.p2-hint__whose', { opacity: [0, 1] }, { at: 350, dur: dur.micro });
    slip.type('.p2-hint__hint', hint, { at: 450, cps: 44 });
    slip.tween('.p2-hint__hint', { '--glow': [0, 1] }, { at: 450, dur: dur.move });
    const hintDone = slip.end + 350;
    slip.tween('.p2-hint__hint', { '--glow': [1, 0.45] }, { at: hintDone, dur: dur.move });
    slip.tween('.p2-hint__plain', { opacity: [1, 0] }, { at: hintDone, dur: 300 });
    slip.hide('.p2-hint__verdict--ok', { at: hintDone, dur: 300 });
    slip.cls('[data-option="B"]', 'is-picked', { at: hintDone, on: false });
    slip.tween('.p2-hint__tile', { opacity: [1, 0.35] }, { at: hintDone, dur: 300 });
    const hintedDone = typeLines(slip, 'hinted', CASE.hinted, hintDone + 400);
    slip.tween('.p2-hint__tile', { opacity: [0.35, 1] }, { at: hintedDone, dur: dur.micro });
    slip.tween('.p2-hint__tile-inner', { '--flip': [0, 1] }, { at: hintedDone, dur: 900, ease: 'back' });
    slip.show('.p2-hint__verdict--bad', { at: hintedDone + 600, rise: 0 });
    slip.cls('[data-option="A"]', 'is-forced', { at: hintedDone + 600 });
    slip.tween('.p2-hint__hint', { '--glow': [0.45, 1] }, { at: hintedDone, dur: 300 });
    slip.tween('.p2-hint__hint', { '--glow': [1, 0.5] }, { at: hintedDone + 900, dur: dur.move });

    // Click 2: a reader searches the reasoning for the hint. Nothing. The cause runs around the text.
    const search = ctx.step({ label: 'search: 0 matches' });
    const sweep = 1200;
    search.show('[data-find="hint"] .p2-find__box', { at: 0, rise: 0 });
    search.type('[data-find="hint"] .p2-find__text', CASE.search, { at: 250, cps: 12 });
    search.tween('[data-lens="hint"]', { opacity: [0, 1] }, { at: 250, dur: dur.micro });
    search.tween('[data-lens="hint"]', { y: [HINT.lensFrom, HINT.lensTo] }, { at: 350, dur: sweep, ease: 'linear' });
    CASE.hinted.forEach((_, i) => {
      const passed = 350 + Math.round((sweep * (i + 1) * HINT.lineHeight) / (HINT.lensTo - HINT.lensFrom));
      search.cls(`[data-line="hinted-${i}"]`, 'p2-is-read', { at: passed });
    });
    search.tween('[data-lens="hint"]', { opacity: [1, 0] }, { at: 350 + sweep, dur: 300 });
    search.tween('[data-find="hint"] .p2-find__stamp', { opacity: [0, 1], scale: [1.8, 1] }, { at: 350 + sweep + 250, dur: dur.enter, ease: 'back' });
    // The verdict of the last slide, right above, answers the empty search with one beat.
    const stamped = search.end;
    search.tween('.p2-hint__echo .dk-flag', { scale: [1, 1.18] }, { at: stamped + 100, dur: 160 });
    search.tween('.p2-hint__echo .dk-flag', { scale: [1.18, 1] }, { at: stamped + 260, dur: 300 });
    const wireAt = stamped + 900;
    const wire = ctx.q('.p2-hint__wire-path');
    const dot = ctx.q('.p2-hint__wire-dot');
    const wireLength = wire.getTotalLength();
    search.tween(wire, { opacity: [0, 1] }, { at: wireAt, dur: 100 });
    search.tween(wire, { '--draw': [1, 0] }, { at: wireAt, dur: 1100, ease: 'inOut' });
    search.tween(dot, { opacity: [0, 1] }, { at: wireAt, dur: 100 });
    search.fn((p) => {
      const point = wire.getPointAtLength(wireLength * p);
      dot.setAttribute('cx', point.x.toFixed(1));
      dot.setAttribute('cy', point.y.toFixed(1));
    }, { at: wireAt, dur: 1100, ease: 'inOut' });
    search.tween(dot, { opacity: [1, 0] }, { at: wireAt + 1100, dur: dur.micro });
    search.tween('.p2-hint__wire-head', { opacity: [0, 1] }, { at: wireAt + 1000, dur: dur.micro });
    search.show('.p2-hint__wire-label', { at: wireAt + 900, rise: 0 });
    search.tween('.p2-hint__hint', { '--glow': [0.5, 1] }, { at: wireAt, dur: dur.enter });

    // Click 3: from one example to the reported averages.
    const stats = ctx.step({ label: '25 and 39 of 100' });
    stats.tween('.p2-hint__case', { y: [HINT.caseShift, 0] }, { dur: dur.move, ease: 'inOut' });
    stats.show('.p2-hint__stats-head', { at: 500 });
    stats.show('.p2-hint__model-head', { at: 600, stagger: 120 });
    MODELS.forEach((model) => stats.tween(`[data-grid="${model.key}"] i`, { opacity: [0, 1] }, { at: 700, dur: dur.micro, stagger: 6 }));
    MODELS.forEach((model, i) => {
      const admitted = fact(model.rate).value;
      const { at } = RATES.starts[i];
      util.range(admitted).forEach((cell) => stats.cls(`[data-grid="${model.key}"] [data-cell="${cell}"]`, 'is-on', { at: at + cell * HINT.cellMs }));
      stats.count(`[data-rate="${model.key}"]`, [0, admitted], { at, dur: admitted * HINT.cellMs, ease: 'linear', format: percent });
    });
    stats.show('.p2-hint__caveat', { at: stats.end + 200, rise: 0 });
  };

  Deck.register({
    id: 'p2-hint',
    part: 2,
    title: 'A hint can flip the answer, and the reasoning often does not mention it',
    cues: [
      { text: 'A professor’s opinion, slipped into the prompt', step: 1 },
      { text: 'The answer flips; the reasoning does not say why', step: 2 },
      { text: `On average, hint mentioned in only ${said('chen.overall_claude')} and ${said('chen.overall_r1')} of flips`, step: 3, at: RATES.landed },
    ],
    cite: [{ src: 'chen2025', where: 'Table 1; Fig. 1-2' }, { src: 'baker2025', where: 'Fig. 9' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: hintHtml(),
    setup: hintSetup,
  });

  // ---------------------------------------------------------------- slide 6: the split brain
  // One box of 1728 x 620. The brain is drawn from above and turned on its side, so each half
  // owns a lane that reads left to right: what it sees, the half, what its hand picks, what is said.
  const SB = Object.freeze({
    shift: 380,           // the experiment sits mid-stage until the answer needs the right third
    brain: Object.freeze({ cx: 608, cy: 290, rx: 228, ry: 188, folds: 9, bulge: 1.1 }),
    mirror: 'translate(0 624) scale(1 -1)',
    bars: Object.freeze([[136, 170], [158, 230], [180, 200], [202, 260]]),
    nodes: Object.freeze({ upper: [490, 550, 610, 670, 730], lower: [520, 580, 640, 700], upperY: 366, lowerY: 404 }),
    pulse: 'M292 486C340 486 352 432 392 424C430 418 450 400 450 338',
    runs: 3, travel: 0.8, quoteCps: 24, traceCps: 40,
    invented: 'you need a shovel',     // where the answer leaves what the speaking half saw
  });
  // The reveal (click 3), in ms from the click. A piece of the picture and what stands for it
  // in the exchange on the right change in the same beat, so that the two sides never say
  // different things. The last cue waits for the last note.
  const TURN = (() => {
    const beat = 450;
    const typed = (text) => Math.round((text.length / SB.traceCps) * 1000) + 180;
    const hint = 200;                  // the snow scene turns into the hint, here and in "the real reason"
    const decides = hint + beat;       // the silent half: the computation that decided
    const answer = decides + beat;     // the shovel: (A); "Why the shovel?": "Why (A)?"
    const written = answer + beat;     // the speaking half and its answer: the written reasoning
    const retype = written + 400;
    const stamped = CASE.hinted.reduce((at, text) => at + typed(text), retype) + 600;
    return Object.freeze({
      hint, decides, answer, written, retype, typed, stamped,
      unsaid: stamped + 300, before: stamped + 900, leak: stamped + 1500, cue: stamped + 2100,
    });
  })();
  const ICONS = Object.freeze({
    claw: ['0 0 120 100', '<path d="M60 4V46M60 46L30 82l-6 9M60 46V86v9M60 46L90 82l6 9M60 32L44 21"/>'],
    snow: ['0 0 160 100', `<path d="M4 86Q40 74 80 84T156 80M62 83V56H104V82M79 83V68H89V82M130 84V70M130 44L118 70H142Z"/>
      <path class="p2-sb__icon-bold" d="M54 57L83 33L112 57"/>
      ${[[20, 18], [42, 36], [26, 58], [62, 14], [102, 12], [126, 26], [146, 48], [12, 40], [142, 10], [92, 22]]
    .map(([x, y]) => `<circle class="p2-sb__icon-dot" cx="${x}" cy="${y}" r="2.6"/>`).join('')}`],
    chicken: ['0 0 100 100', `<path d="M22 58Q22 38 46 38H62Q70 20 80 22Q90 26 86 38Q82 48 78 60Q72 80 48 80Q22 80 22 58Z"/>
      <path d="M24 50L10 34M27 45L17 27M72 22q2 -9 5 -1q3 -8 5 1M36 58Q48 50 60 58Q50 68 36 58M44 80V92l-6 4M44 92l6 4M58 80V92l-6 4M58 92l6 4"/>
      <path class="p2-sb__icon-fill" d="M88 30L98 34L87 38Z"/><circle class="p2-sb__icon-dot" cx="80" cy="30" r="2.2"/>`],
    shovel: ['0 0 100 100', '<path d="M40 6H60L55 18H45ZM50 18V56M33 56H67V76Q67 92 50 96Q33 92 33 76Z"/>'],
    hammer: ['0 0 100 100', '<path d="M50 36V94M26 14H66Q76 16 78 28V36H26Z"/>'],
    apple: ['0 0 100 100', '<path d="M50 36C38 24 18 32 20 56C22 78 38 92 50 84C62 92 78 78 80 56C82 32 62 24 50 36ZM50 36Q50 22 58 14M58 18Q70 10 76 18Q66 26 58 18"/>'],
  });
  const icon = (name) => `<svg class="p2-sb__icon" viewBox="${ICONS[name][0]}" aria-hidden="true">${ICONS[name][1]}</svg>`;
  const swap = (cls, key, before, after) => `<span class="p2-sb__swap ${cls}"><span data-${key}="patient">${before}</span><span data-${key}="model">${after}</span></span>`;
  const arrow = (key, tone, d, tip) => `
    <g class="p2-sb__arrow" data-arrow="${key}" data-tone="${tone}">
      <path class="p2-sb__arrow-line" pathLength="1" d="${d}"/>
      <path class="p2-sb__arrow-head" d="M0 0L-16 -9L-16 9Z" transform="translate(${tip[0]} ${tip[1]}) rotate(${tip[2]})"/>
    </g>`;
  // One hemisphere seen from above: a half oval with a folded rim; a groove runs in from each fold.
  const rim = (turn, k = 1) => {
    const { cx, cy, rx, ry } = SB.brain;
    return [cx - rx * k * Math.cos(Math.PI * turn), cy - ry * k * Math.sin(Math.PI * turn)].map((v) => Math.round(v * 10) / 10);
  };
  const HEMI = (() => {
    const { cx, cy, folds, bulge } = SB.brain;
    const outline = util.range(folds).map((i) => `Q${rim((i + 0.5) / folds, bulge).join(' ')} ${rim((i + 1) / folds).join(' ')}`).join('');
    const groove = (i) => {
      const [x, y] = rim(i / folds);
      const reach = 40 + (i % 3) * 20;
      const away = Math.hypot(cx - x, cy - 36 - y);
      const [ux, uy] = [(cx - x) / away, (cy - 36 - y) / away];
      const bend = i % 2 ? 14 : -14;
      const at = (along, across) => [x + ux * reach * along - uy * across, y + uy * reach * along + ux * across].map((v) => Math.round(v * 10) / 10).join(' ');
      return `M${x} ${y}Q${at(0.5, bend)} ${at(1, 0)}`;
    };
    const inner = ['M476 232q16 -18 34 -6t30 0', 'M688 236q16 -16 32 -4t28 -4', 'M548 264q28 -12 56 0t56 -4'];
    return Object.freeze({
      shape: `M${rim(0).join(' ')}${outline}Z`,
      sulci: Object.freeze([...util.range(folds - 1).map((i) => groove(i + 1)), ...inner]),
    });
  })();
  const hemisphere = (key, tone) => `
    <g class="p2-sb__hemi" data-hemi="${key}" data-tone="${tone}"${key === 'silent' ? ` transform="${SB.mirror}"` : ''}>
      <path class="p2-sb__hemi-shape" d="${HEMI.shape}"/>
      <path class="p2-sb__hemi-flash" d="${HEMI.shape}"/>
      <g class="p2-sb__sulci">${HEMI.sulci.map((d) => `<path d="${d}"/>`).join('')}</g>
    </g>`;
  const netLinks = () => SB.nodes.lower.flatMap((x) => SB.nodes.upper.filter((u) => Math.abs(u - x) <= 30)
    .map((u) => `<line x1="${x}" y1="${SB.nodes.lowerY}" x2="${u}" y2="${SB.nodes.upperY}"/>`)).join('');
  const netNodes = () => [...SB.nodes.upper.map((x) => [x, SB.nodes.upperY]), ...SB.nodes.lower.map((x) => [x, SB.nodes.lowerY])]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('');

  const brainHtml = () => `
    <div class="p2-sb"><div class="p2-sb__box"><div class="p2-sb__lab">
      <svg class="p2-sb__art" viewBox="0 0 1104 620" width="1104" height="620" aria-hidden="true">
        <g class="p2-sb__brain">
          ${hemisphere('speaking', 'read')}
          ${hemisphere('silent', 'hidden')}
          <g class="p2-sb__glyph" data-glyph="written" data-tone="read">
            ${SB.bars.map(([y, w]) => `<rect x="${610 - w / 2}" y="${y}" width="${w}" height="8" rx="4"/>`).join('')}
          </g>
          <g class="p2-sb__glyph" data-glyph="computation" data-tone="hidden">${netLinks()}${netNodes()}</g>
          <text class="p2-sb__half" data-half="speaking" data-tone="read" x="610" y="208">speaking half</text>
          <text class="p2-sb__half" data-half="silent" data-tone="hidden" x="610" y="436">silent half</text>
          <text class="p2-sb__half" data-half="written" data-tone="read" x="610" y="254">the written reasoning</text>
          <text class="p2-sb__half" data-half="computation" data-tone="hidden" x="610" y="452">the computation</text>
          <text class="p2-sb__half" data-half="computation" data-tone="hidden" x="610" y="488">that decided</text>
        </g>
        <g class="p2-sb__cut">
          <path class="p2-sb__cut-line" d="M362 312H474M746 312H858"/>
          <path class="p2-sb__cut-line p2-sb__cut-mid" d="M486 312H734"/>
          <text class="p2-sb__cut-label" data-cut="patient" x="610" y="321">connection cut</text>
          <text class="p2-sb__cut-label" data-cut="model" x="610" y="321">seen, not said</text>
        </g>
        <text class="p2-sb__scene" data-scene="patient" x="610" y="72">a split-brain patient</text>
        <text class="p2-sb__scene" data-scene="model" x="610" y="72">the model on slide 5</text>
        ${arrow('sees-claw', 'read', 'M292 134C340 134 352 190 388 199', [394, 200, 14])}
        ${arrow('sees-snow', 'hidden', 'M292 486C340 486 352 432 388 425', [394, 424, -11])}
        ${arrow('picks-chicken', 'read', 'M836 200C884 196 880 130 922 130', [932, 130, 0])}
        ${arrow('picks-shovel', 'hidden', 'M836 424C884 428 880 510 922 510', [932, 510, 0])}
        <text class="p2-sb__hand" data-hand="chicken" data-tone="read" x="882" y="104">its hand</text>
        <text class="p2-sb__hand" data-hand="shovel" data-tone="hidden" x="882" y="560">its hand</text>
        <path class="p2-sb__pulse-path" d="${SB.pulse}"/>
        <g class="p2-sb__block">
          <path class="p2-sb__route" d="M398 423C430 418 450 400 450 350"/>
          <path class="p2-sb__route-head" d="M450 334L440 352H460Z"/>
          <path class="p2-sb__stop" d="M438 300L462 324M462 300L438 324"/>
        </g>
        <circle class="p2-sb__ring" cx="450" cy="318" r="6" opacity="0"/>
        <circle class="p2-sb__pulse" cx="292" cy="486" r="10" opacity="0"/>
      </svg>

      <div class="p2-sb__card p2-sb__card--sees" data-card="claw" data-tone="read">
        <div class="p2-sb__face">${icon('claw')}<span class="p2-sb__cap">chicken claw</span></div>
      </div>
      <div class="p2-sb__card p2-sb__card--sees" data-card="snow" data-tone="hidden"><div class="p2-sb__flip">
        <div class="p2-sb__face">${icon('snow')}<span class="p2-sb__cap">snow scene</span></div>
        <div class="p2-sb__face p2-sb__face--back"><span class="p2-sb__hint">${hintLead()}&nbsp;…</span><span class="p2-sb__cap">the hint</span></div>
      </div></div>

      <div class="p2-sb__card p2-sb__card--pick" data-card="chicken" data-tone="read">
        <div class="p2-sb__face">${icon('chicken')}<span class="p2-sb__cap">chicken</span></div>
      </div>
      <div class="p2-sb__card p2-sb__card--spare" data-card="spare-a"><div class="p2-sb__face">${icon('apple')}</div></div>
      <div class="p2-sb__card p2-sb__card--spare" data-card="spare-b"><div class="p2-sb__face">${icon('hammer')}</div></div>
      <div class="p2-sb__card p2-sb__card--pick" data-card="shovel" data-tone="hidden"><div class="p2-sb__flip">
        <div class="p2-sb__face">${icon('shovel')}<span class="p2-sb__cap">shovel</span></div>
        <div class="p2-sb__face p2-sb__face--back"><span class="p2-sb__letter">(A)</span><span class="p2-sb__cap">answer</span></div>
      </div></div>
      <div class="p2-sb__leak"><p><span class="p2-sb__leak-tag">Slide 5</span> the hint is mentioned in only <b>${said('chen.overall_claude')}</b> and <b>${said('chen.overall_r1')}</b> of flips, on average</p></div>
      </div>

      <div class="p2-sb__says">
        <div class="p2-sb__ask">${swap('', 'ask', '“Why the shovel?”', '“Why (A)?”')}</div>
        <div class="p2-sb__say">
          ${swap('p2-sb__say-label', 'who', 'The speaking half answers', 'The written reasoning')}
          <div class="p2-sb__say-body">
            <div class="p2-sb__quote"><span data-said="seen"></span><span data-said="invented"></span></div>
            <div class="p2-sb__trace">${lines('echo', CASE.hinted.length)}${findHtml('echo')}</div>
          </div>
          ${kit.legend({ key: 'say-quote', text: 'as the author captions the figure' })}
          ${kit.legend({ key: 'say', text: 'illustrative: ours, as on slide 5' })}
        </div>
        <div class="p2-sb__before">Written before the answer, and still not the reason.</div>
        <div class="p2-sb__real">
          <div class="p2-label">The real reason</div>
          ${swap('p2-sb__real-what', 'what', 'the snow scene', 'the hint')}
          ${swap('p2-sb__real-note', 'note', 'never reaches the speaking half', CASE.unsaid)}
        </div>
      </div>
    </div></div>`;

  const brainSetup = (ctx) => {
    const { fact, dur } = ctx;
    const draw = (step, key, at) => {
      step.tween(`[data-arrow="${key}"] .p2-sb__arrow-line`, { opacity: [0, 1] }, { at, dur: 80 });
      step.tween(`[data-arrow="${key}"] .p2-sb__arrow-line`, { '--draw': [1, 0] }, { at, dur: dur.enter, ease: 'inOut' });
      step.tween(`[data-arrow="${key}"] .p2-sb__arrow-head`, { opacity: [0, 1] }, { at: at + dur.enter - 80, dur: dur.micro });
    };
    const flash = (step, key, at) => {
      step.tween(`[data-hemi="${key}"] .p2-sb__hemi-flash`, { opacity: [0, 0.4] }, { at, dur: dur.micro });
      step.tween(`[data-hemi="${key}"] .p2-sb__hemi-flash`, { opacity: [0.4, 0] }, { at: at + dur.micro, dur: dur.move });
    };
    const cross = (step, key, at) => {
      step.tween(`[data-${key}="patient"]`, { opacity: [1, 0] }, { at, dur: 300 });
      step.tween(`[data-${key}="model"]`, { opacity: [0, 1] }, { at: at + 200, dur: dur.enter });
    };

    // Enter: one brain, the link between its halves cut, and one picture for each half.
    const enter = ctx.step({ label: 'each half sees one picture' });
    enter.tween('.p2-sb__brain', { opacity: [0, 1], scale: [0.92, 1] }, { at: 150, dur: 600 });
    enter.show('[data-scene="patient"]', { at: 300, rise: 0 });
    enter.tween('.p2-sb__cut', { opacity: [0, 1] }, { at: 800, dur: dur.enter });
    enter.tween('[data-half="speaking"]', { opacity: [0, 1] }, { at: 1000, dur: dur.enter });
    enter.tween('[data-half="silent"]', { opacity: [0, 1] }, { at: 1150, dur: dur.enter });
    [['claw', 'speaking', 1500], ['snow', 'silent', 2300]].forEach(([card, half, at]) => {
      enter.tween(`[data-card="${card}"]`, { opacity: [0, 1], x: [-120, 0] }, { at, dur: 500 });
      draw(enter, `sees-${card}`, at + 350);
      flash(enter, half, at + 700);
    });

    // Click 1: each half picks a card with the hand it controls.
    const pick = ctx.step({ label: 'each hand picks a card' });
    pick.show('.p2-sb__card--pick, .p2-sb__card--spare', { at: 0, stagger: 70 });
    [['chicken', 'speaking', 650], ['shovel', 'silent', 1650]].forEach(([card, half, at]) => {
      flash(pick, half, at - 150);
      draw(pick, `picks-${card}`, at);
      pick.tween(`[data-hand="${card}"]`, { opacity: [0, 1] }, { at: at + 150, dur: dur.enter });
      pick.cls(`[data-card="${card}"]`, 'is-picked', { at: at + dur.enter });
      pick.tween(`[data-card="${card}"]`, { scale: [1, 1.08] }, { at: at + dur.enter, dur: 140 });
      pick.tween(`[data-card="${card}"]`, { scale: [1.08, 1] }, { at: at + dur.enter + 140, dur: 260 });
    });
    pick.tween('.p2-sb__card--spare', { opacity: [1, 0.4] }, { at: 2300, dur: dur.enter });

    // Click 2: asked why, the speaking half answers at once. The real reason stops at the cut.
    const ask = ctx.step({ label: 'why the shovel?' });
    const quote = `“${fact('gazzaniga.quote').text}”`;
    const turn = quote.indexOf(SB.invented);
    if (turn < 0) throw new Error(`the quote no longer contains "${SB.invented}"`);
    const typing = Math.round((quote.length / SB.quoteCps) * 1000);
    const turnAt = Math.round((turn / SB.quoteCps) * 1000);
    const path = ctx.q('.p2-sb__pulse-path');
    const pulse = ctx.q('.p2-sb__pulse');
    const ring = ctx.q('.p2-sb__ring');
    const reach = path.getTotalLength();
    const asked = 1700;
    ask.tween('.p2-sb__lab', { x: [SB.shift, 0] }, { dur: dur.move, ease: 'inOut' });
    ask.tween('.p2-sb__ask', { opacity: [0, 1], scale: [0.7, 1] }, { at: 600, dur: dur.enter, ease: 'back' });
    ask.show('.p2-sb__say', { at: 1300 });
    ask.type('[data-said="seen"]', quote.slice(0, turn), { at: asked, dur: turnAt });
    ask.type('[data-said="invented"]', quote.slice(turn), { at: asked + turnAt, dur: typing - turnAt });
    ask.cls('[data-said="invented"]', 'is-marked', { at: asked + typing + 300 });
    // Whose wording the quote is ('gazzaniga.quote': the author's caption of this figure).
    ask.tween('[data-legend="say-quote"]', { opacity: [0, 1] }, { at: asked + typing + 300, dur: dur.enter });
    ask.fn((p) => {
      const live = p > 0 && p < 1;
      const run = live ? (p * SB.runs) % 1 : 0;
      const along = util.clamp(run / SB.travel);
      const splash = util.clamp((run - SB.travel) / (1 - SB.travel));
      const point = path.getPointAtLength(reach * along * along * (3 - 2 * along));
      pulse.setAttribute('cx', point.x.toFixed(1));
      pulse.setAttribute('cy', point.y.toFixed(1));
      pulse.setAttribute('opacity', live && run < SB.travel ? '1' : '0');
      ring.setAttribute('r', (6 + 24 * splash).toFixed(1));
      ring.setAttribute('opacity', live && run >= SB.travel ? (1 - splash).toFixed(2) : '0');
    }, { at: asked, dur: typing, ease: 'linear' });
    ask.tween('.p2-sb__block', { opacity: [0, 1] }, { at: asked + Math.round((typing * SB.travel) / SB.runs), dur: dur.micro });
    ask.show('.p2-sb__real', { at: asked + typing + 700 });

    // Click 3, the reveal: the same picture, relabeled piece by piece, is slide 5 (TURN has
    // the beats). What has no counterpart in the model leaves the picture: the other picture,
    // the other hand's choice, the spare cards, the hands.
    const reveal = ctx.step({ label: 'the picture is slide 5' });
    cross(reveal, 'scene', 0);
    reveal.tween('[data-scene="model"]', { scale: [1.3, 1] }, { at: 200, dur: dur.enter, ease: 'back' });
    reveal.tween('[data-card="claw"], [data-card="chicken"], [data-arrow="sees-claw"], [data-arrow="picks-chicken"], .p2-sb__hand', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    reveal.tween('.p2-sb__card--spare', { opacity: [0.4, 0] }, { at: 0, dur: dur.enter });
    reveal.tween('[data-cut="patient"]', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    reveal.cls('.p2-sb__cut-line', 'is-plain', { at: 200 });
    reveal.tween('.p2-sb__cut-mid', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    // The snow scene is the hint, on its card and as the real reason; what the patient's note
    // said about it goes, and the model's note waits for the search.
    reveal.tween('[data-card="snow"] .p2-sb__flip', { '--flip': [0, 1] }, { at: TURN.hint, dur: 700, ease: 'back' });
    cross(reveal, 'what', TURN.hint);
    reveal.tween('[data-note="patient"]', { opacity: [1, 0] }, { at: TURN.hint, dur: 300 });
    [['silent', 'computation', TURN.decides], ['speaking', 'written', TURN.written]].forEach(([half, model, at]) => {
      reveal.tween(`[data-hemi="${half}"] .p2-sb__sulci`, { opacity: [1, 0] }, { at, dur: 300 });
      reveal.tween(`[data-half="${half}"]`, { opacity: [1, 0] }, { at, dur: 300 });
      reveal.tween(`[data-glyph="${model}"]`, { opacity: [0, 1] }, { at: at + 150, dur: dur.enter });
      reveal.tween(`[data-half="${model}"]`, { opacity: [0, 1] }, { at: at + 250, dur: dur.enter });
      flash(reveal, half, at);
    });
    reveal.tween('[data-card="shovel"] .p2-sb__flip', { '--flip': [0, 1] }, { at: TURN.answer, dur: 700, ease: 'back' });
    cross(reveal, 'ask', TURN.answer);
    reveal.tween('.p2-sb__quote', { opacity: [1, 0] }, { at: TURN.written, dur: 300 });
    reveal.tween('[data-legend="say-quote"]', { opacity: [1, 0] }, { at: TURN.written, dur: 300 });
    cross(reveal, 'who', TURN.written);
    const retyped = CASE.hinted.reduce((at, text, i) => {
      reveal.type(`[data-line="echo-${i}"]`, text, { at, cps: SB.traceCps });
      return at + TURN.typed(text);
    }, TURN.retype);
    // The patient's answer was a quote; these three lines are our example, and the box says so.
    reveal.tween('[data-legend="say"]', { opacity: [0, 1] }, { at: TURN.retype, dur: dur.enter });
    reveal.show('[data-find="echo"] .p2-find__box', { at: retyped, rise: 0 });
    reveal.type('[data-find="echo"] .p2-find__text', CASE.search, { at: retyped + 100, cps: 24 });
    reveal.tween('[data-find="echo"] .p2-find__stamp', { opacity: [0, 1], scale: [1.8, 1] }, { at: TURN.stamped, dur: dur.enter, ease: 'back' });
    reveal.tween('[data-note="model"]', { opacity: [0, 1] }, { at: TURN.unsaid, dur: dur.enter });
    // Where the analogy stops. The patient explained after the act; the model wrote this
    // before it answered. And in the model nothing is cut: the hint is in the prompt, so
    // the line between the two halves is relabeled "seen, not said", and slide 5's two
    // rates beside it are how often the hint does reach the text.
    reveal.show('.p2-sb__before', { at: TURN.before, rise: 0 });
    reveal.tween('.p2-sb__cut-mid', { opacity: [1, 0] }, { at: TURN.leak, dur: dur.micro });
    reveal.tween('[data-cut="model"]', { opacity: [0, 1] }, { at: TURN.leak, dur: dur.enter });
    reveal.show('.p2-sb__leak p', { at: TURN.leak, rise: 0 });
    reveal.hold(300);
  };

  Deck.register({
    id: 'p2-splitbrain',
    part: 2,
    title: 'People do this too: the speaking half invents a reason',
    cues: [
      'Each half of the brain sees a different picture',
      { text: 'Asked why: a fluent, confident, wrong reason', step: 2 },
      { text: 'An analogy for the behavior, not a claim about mechanism', step: 3, at: TURN.cue },
    ],
    cite: [{ src: 'gazzaniga1998', where: 'figure' }, { src: 'chen2025', where: 'Table 1; Fig. 1' }],
    // Our drawing of the experiment the source reports; at the reveal, the three reasoning
    // lines of slide 5, an example of ours; beside the cut, slide 5's two reported rates.
    figure: ['schematic', 'illustrative'],
    numbers: 'reported',
    html: brainHtml(),
    setup: brainSetup,
  });

  // ---------------------------------------------------------------- slide 7: words, dots, vectors
  // The machine of slide 3 (kit.lattice), three times. Column 0 holds the question; columns
  // 1-7 hold the reasoning. With words, the chain of slide 3 runs: up a column, back down
  // through a written token. With filler dots nothing comes back down (a dot carries no
  // result): the columns work in parallel and the last one gathers them, which is enough for
  // a problem that splits into parallel pieces ('pfau.parallel') and not for a chain of
  // serial steps ('p2.pfau_serial'). With vectors there is a chain again, but its way back
  // down is the last state itself ('hao.feedback'): no token is sampled
  // ('p2.hao_not_decoded'; the paper calls it "a simple modification to the traditional CoT
  // process", not a new architecture), and nothing is written. Both models were trained for
  // it ('pfau.supervision', 'p2.hao_training'). Each step leaves one conclusion (its cue),
  // each task one pair of bars, and under the picture, in the size of body text, stands the
  // slide's main line: slide 3 still holds for today's models. What follows its colon is the
  // reason for the picture on screen: the dots' at click 1, the vectors' at click 2. The
  // two reasons share one place after the opening words, which stay as they are.
  const HOLDS = Object.freeze({
    dots: 'dots add parallel computation, not serial steps.',
    vectors: `even a ${said('hao.base')} trained for vectors loses at math.`,
  });
  const holdsHtml = () => `<p class="p2-dots__holds"><b>Slide 3</b> still holds for today’s models:
          <span class="p2-dots__why">${Object.entries(HOLDS).map(([way, why]) => `<span data-why="${way}">${why}</span>`).join('')}</span></p>`;
  const DOTS = Object.freeze({
    shape: Object.freeze({ cols: 8, rows: 4 }),
    tokens: Object.freeze(['Q', 'first', 'sum', 'each', 'pair', 'then', 'check', 'so']),
    answer: 'True',
    lensFrom: 6, lensTravel: 1136, riseMs: 50, hopMs: 260, dropMs: 110, feedMs: 360,
    shift: 288,           // the machine sits mid-stage until the first result card arrives
    landing: 36, chipTop: 28, nodeGap: 16,   // a written token lands as on slides 3 and 9
    lanes: Object.freeze({ top: 56, step: 8 }),   // where the gathering arcs run, between the two top layers
  });
  const dotPoint = (col, row) => kit.latticePoint(DOTS.shape, col, row);
  const thinking = util.range(DOTS.shape.cols - 1).map((i) => i + 1);
  const whole = (v) => `${Math.round(v)}%`;
  const oneDecimal = (v) => `${v.toFixed(1)}%`;

  // Words: from the top of a column down to the token it writes for the next one.
  const dropHtml = (col) => {
    const top = dotPoint(col, DOTS.shape.rows - 1);
    const chip = dotPoint(col + 1, 'token');
    const end = { x: chip.x - DOTS.landing, y: chip.y - DOTS.chipTop - 8 };
    const length = Math.hypot(end.x - top.x, end.y - top.y);
    const from = { x: top.x + ((end.x - top.x) * DOTS.nodeGap) / length, y: top.y + ((end.y - top.y) * DOTS.nodeGap) / length };
    return `<path class="p2-dots__drop" data-drop="${col}" pathLength="1" d="M${from.x.toFixed(1)} ${from.y.toFixed(1)}L${end.x} ${end.y}"/>`;
  };
  // Dots: every column hands what it worked out sideways and up to the last one. The columns
  // further left take the higher lanes, so no arc crosses another.
  const gatherHtml = (col) => {
    const from = dotPoint(col, DOTS.shape.rows - 2);
    const to = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    const lane = DOTS.lanes.top + col * DOTS.lanes.step;
    return `<path class="p2-dots__gather" data-gather="${col}" pathLength="1" d="M${from.x + 10} ${from.y - 8}C${from.x + 56} ${lane} ${to.x - 72} ${lane} ${to.x - 15} ${to.y + 5}"/>`;
  };
  // Vectors: the last state of a column is the next column's input.
  const feedHtml = (col) => {
    const from = dotPoint(col, DOTS.shape.rows - 1);
    const to = dotPoint(col + 1, 0);
    return `<g class="p2-dots__feed" data-feed="${col}">
      <path class="p2-dots__feed-line" pathLength="1" d="M${from.x + 14} ${from.y}C${from.x + 92} ${from.y} ${from.x + 52} ${to.y} ${to.x - 26} ${to.y}"/>
      <path class="p2-dots__feed-head" d="M${to.x - 13} ${to.y}l-13 -8v16z"/></g>`;
  };

  // The results: one pair of bars per task, the substitute under what it is compared with.
  // Dots stand against the model that answers at once (written steps reach 100% there too:
  // 'pfau.3sum_cot'), vectors against written steps on both of their tasks. One color per
  // row on every task: gray is the model that answers at once, teal the one whose steps are
  // written (and can be read), amber the one whose steps are dots or vectors. The rows left
  // out ('pfau.3sum_cot', 'hao.prosqa_none', 'hao.gsm8k_none') stay in the fact table.
  const BARS = Object.freeze({
    puzzle: Object.freeze([['none', 'pfau.3sum_none'], ['hidden', 'pfau.3sum_filler']]),
    logic: Object.freeze([['words', 'hao.prosqa_cot'], ['hidden', 'hao.prosqa_latent']]),
    math: Object.freeze([['words', 'hao.gsm8k_cot'], ['hidden', 'hao.gsm8k_latent']]),
  });
  const BAR_ROWS = Object.freeze({
    none: Object.freeze({ tone: 'dim', label: () => 'no steps' }),
    words: Object.freeze({ tone: 'read', label: () => 'written steps' }),
    hidden: Object.freeze({ tone: 'hidden', label: (task) => (task === 'puzzle' ? 'dots' : 'vectors') }),
  });
  const barsHtml = (task) => `
    <div class="p2-dots__bars" data-bars="${task}">
      ${BARS[task].map(([row]) => `
      <div class="p2-dots__bar" data-bar="${task}-${row}" data-tone="${BAR_ROWS[row].tone}">
        <span class="p2-dots__bar-label">${BAR_ROWS[row].label(task)}</span>
        <span class="p2-dots__bar-track"><i></i></span>
        <b class="p2-dots__bar-value"></b>
      </div>`).join('')}
    </div>`;

  const dotsHtml = () => {
    const size = kit.latticeSize(DOTS.shape);
    const top = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    const first = dotPoint(1, 'token');
    const last = dotPoint(DOTS.shape.cols - 1, 'token');
    const hops = util.range(DOTS.shape.cols - 1);
    return `
    <div class="p2-dots"><div class="p2-dots__box">
      <div class="p2-dots__machine">
        <div class="p2-dots__ways">
          <span data-way="words" data-tone="read"><i></i>slide 3: every step comes back down through a written token</span>
          <span data-way="dots" data-tone="hidden"><i></i>a dot carries nothing down: the columns work in parallel</span>
          <span data-way="vectors" data-tone="hidden"><i></i>no token is sampled: the last state is fed straight back in</span>
        </div>
        <div class="p2-label p2-dots__answer-label">Answer</div>
        <div class="p2-dots__answer">
          <span class="p2-dots__answer-wait">…</span><span class="p2-dots__answer-done">${DOTS.answer}</span>
        </div>
        <div class="p2-dots__lattice">
          ${kit.lattice({ key: 'dots', ...DOTS.shape, tokens: DOTS.tokens.slice(0, 1) })}
          <svg class="p2-dots__over" viewBox="0 0 ${size.width} ${size.height}" width="${size.width}" height="${size.height}" aria-hidden="true">
            <path class="p2-dots__out" d="M${top.x} ${top.y - 14}V4"/>
            <g class="p2-dots__band">
              <rect x="${first.x - 60}" y="${first.y - 28}" width="${last.x - first.x + 120}" height="56" rx="8"/>
              <text x="${(first.x + last.x) / 2}" y="${first.y + 9}">reasoning: nothing written</text>
            </g>
            ${hops.map(dropHtml).join('')}
            ${thinking.map((col) => `<circle class="p2-dots__dot" data-dot="${col}" cx="${dotPoint(col, 'token').x}" cy="${first.y}" r="8"/>`).join('')}
            <g class="p2-dots__gathers">${hops.map(gatherHtml).join('')}<path class="p2-dots__gather-head" d="M${top.x - 13} ${top.y + 3}l-15 -2l6 13z"/></g>
            ${hops.map(feedHtml).join('')}
          </svg>
          ${kit.lens({ key: 'dots' })}
        </div>
        <div class="p2-dots__readout">
          <span class="p2-label">Monitor reads</span>
          <span class="p2-dots__words">${thinking.map((col) => `<span class="p2-dots__word"><b data-word="${col}">${DOTS.tokens[col]}</b><i data-filler="${col}">.</i></span>`).join('')}</span>
          <span class="p2-dots__verdicts">
            <b data-verdict="words" data-tone="read">every word</b>
            <b data-verdict="dots" data-tone="hidden">no words</b>
            <b data-verdict="none" data-tone="dim">nothing to read</b>
          </span>
        </div>
      </div>
      <div class="p2-dots__cards">
        <div class="p2-dots__card" data-card="dots">
          <div class="p2-label">Dots instead of words</div>
          <div class="p2-dots__task">3SUM: do any three inputs sum to zero (mod 10)?</div>
          ${barsHtml('puzzle')}
          ${kit.legend({ key: 'dots-model', text: `${said('pfau.model').replace('-parameter', ' parameters')}, trained for this` })}
        </div>
        <div class="p2-dots__card" data-card="vectors">
          <div class="p2-label">Vectors instead of words</div>
          <div class="p2-dots__task">Logic (${said('hao.task')}): <b data-tone="hidden">vectors win</b></div>
          ${barsHtml('logic')}
          <div class="p2-dots__task">Math (GSM8k): <b data-tone="read">written steps win</b></div>
          ${barsHtml('math')}
          ${kit.legend({ key: 'vectors-model', text: `${said('hao.base')}, trained for this` })}
        </div>
      </div>
      <div class="p2-dots__under">
        ${holdsHtml()}
        <p class="p2-dots__next">So can the window be kept open?</p>
      </div>
    </div></div>`;
  };

  const dotsSetup = (ctx) => {
    const { fact, dur } = ctx;
    const { cols, rows } = DOTS.shape;
    const lens = '[data-lens="dots"]';
    const tokenText = (col) => `[data-lattice="dots"] [data-token="${col}"] text`;
    const passes = (col, at, ms) => at + Math.round((ms * (dotPoint(col, 'token').x - DOTS.lensFrom)) / DOTS.lensTravel);
    const rise = (step, col, at) => util.range(rows).forEach((row) => {
      step.cls(`[data-node="${col}-${row}"]`, 'is-lit', { at: at + row * DOTS.riseMs });
      if (row < rows - 1) step.cls(`[data-link="${col}-${row}"]`, 'is-lit', { at: at + row * DOTS.riseMs + DOTS.riseMs / 2 });
    });
    const answered = (step, at) => {
      step.tween('.p2-dots__answer-wait', { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween('.p2-dots__answer-done', { opacity: [0, 1] }, { at, dur: dur.micro });
      step.cls('.p2-dots__answer', 'is-done', { at });
      step.tween('.p2-dots__answer', { scale: [1, 1.12] }, { at, dur: 140 });
      step.tween('.p2-dots__answer', { scale: [1.12, 1] }, { at: at + 140, dur: 260 });
    };
    // Every later step starts from a dark machine: no pulses, no answer, no reading.
    const reset = (step, verdict, shown) => {
      step.cls('.dk-lattice__node, .dk-lattice__link', 'is-lit', { at: 0, on: false });
      step.tween('.p2-dots__answer-wait', { opacity: [0, 1] }, { at: 0, dur: dur.micro });
      step.tween('.p2-dots__answer-done', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      step.cls('.p2-dots__answer', 'is-done', { at: 0, on: false });
      step.tween(`[data-verdict="${verdict}"]`, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      step.tween(shown, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      step.tween(lens, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    };
    const sweep = (step, at, ms) => {
      step.tween(lens, { x: [DOTS.lensTravel, 0] }, { at: at - 10, dur: 0 });
      step.tween(lens, { opacity: [0, 1] }, { at, dur: dur.micro });
      step.tween(lens, { x: [0, DOTS.lensTravel] }, { at: at + 100, dur: ms, ease: 'linear' });
      return at + 100;
    };
    // The caption above the machine names how one column reaches the next in this picture.
    const way = (step, from, to, at) => {
      if (from) step.tween(`[data-way="${from}"]`, { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(`[data-way="${to}"]`, { opacity: [0, 1] }, { at: at + (from ? dur.micro : 0), dur: dur.enter });
    };
    // A task's three bars grow together, each to its reported value.
    const grow = (step, task, at, format) => BARS[task].forEach(([row, key], i) => {
      const value = fact(key).value;
      const bar = `[data-bar="${task}-${row}"]`;
      step.tween(`${bar} i`, { '--v': ['0%', `${value}%`] }, { at: at + i * 120, dur: dur.move, ease: 'inOut' });
      step.count(`${bar} .p2-dots__bar-value`, [0, value], { at: at + i * 120, dur: dur.move, ease: 'inOut', format });
    });
    // Until the second card arrives, the first one waits level with the middle of the machine.
    const cardDrop = Math.round((ctx.q('[data-card="vectors"]').offsetHeight + parseFloat(getComputedStyle(ctx.q('.p2-dots__cards')).rowGap)) / 2);
    // Until the lines under the picture arrive, the machine waits in the middle of the stage.
    const machine = ctx.q('.p2-dots__machine');
    const machineDrop = Math.round((ctx.q('.p2-dots__box').offsetHeight - machine.offsetTop - machine.offsetHeight) / 2);

    // Enter: the chain of slide 3. Up a column, down through the token it writes, up the
    // next one; the answer leaves the last column. Then the monitor reads the text row.
    const enter = ctx.step({ label: 'words: a chain through written tokens' });
    enter.tween('.p2-dots__machine', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    way(enter, null, 'words', 500);
    const chainAt = 800;
    util.range(cols).forEach((col) => {
      const at = chainAt + col * DOTS.hopMs;
      rise(enter, col, at);
      if (col === cols - 1) return;
      const drop = `[data-drop="${col}"]`;
      enter.tween(drop, { opacity: [0, 1] }, { at: at + rows * DOTS.riseMs - 20, dur: 20 });
      enter.tween(drop, { '--draw': [1, 0] }, { at: at + rows * DOTS.riseMs - 20, dur: DOTS.dropMs, ease: 'in' });
      enter.type(tokenText(col + 1), DOTS.tokens[col + 1], { at: at + rows * DOTS.riseMs + DOTS.dropMs - 20, dur: 0 });
    });
    const chained = chainAt + (cols - 1) * DOTS.hopMs + rows * DOTS.riseMs;
    answered(enter, chained + 100);
    const readAt = chained + 500;
    enter.tween(lens, { opacity: [0, 1] }, { at: readAt, dur: dur.micro });
    enter.tween(lens, { x: [0, DOTS.lensTravel] }, { at: readAt + 100, dur: 1400, ease: 'linear' });
    thinking.forEach((col) => {
      enter.cls(`[data-token="${col}"]`, 'is-read', { at: passes(col, readAt + 100, 1400) });
      enter.tween(`[data-word="${col}"]`, { opacity: [0, 1] }, { at: passes(col, readAt + 100, 1400), dur: dur.micro });
    });
    enter.tween('[data-verdict="words"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: readAt + 1600, dur: dur.enter, ease: 'back' });

    // Click 1: every reasoning token becomes a filler dot. Nothing comes back down any more:
    // all columns work at once and the last one gathers them. The answer is still right.
    const fill = ctx.step({ label: 'dots: in parallel, still answers' });
    reset(fill, 'words', '[data-word]');
    fill.tween(machine, { x: [DOTS.shift, 0], y: [machineDrop, 0] }, { at: 0, dur: dur.move, ease: 'inOut' });
    fill.tween('.p2-dots__drop', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    way(fill, 'words', 'dots', 300);
    thinking.forEach((col, k) => {
      const at = 400 + k * 150;
      fill.tween(tokenText(col), { scale: [1, 0] }, { at, dur: 110, ease: 'in' });
      fill.type(tokenText(col), '', { at: at + 110, dur: 0 });
      fill.cls(`[data-token="${col}"]`, 'is-read', { at: at + 110, on: false });
      fill.cls(`[data-token="${col}"]`, 'is-dot', { at: at + 110 });
      fill.tween(`[data-dot="${col}"]`, { opacity: [0, 1], scale: [0, 1] }, { at: at + 110, dur: 260, ease: 'back' });
    });
    const again = 400 + thinking.length * 150 + 500;
    util.range(cols).forEach((col) => rise(fill, col, again));
    fill.tween('.p2-dots__gathers', { opacity: [0, 1] }, { at: again + 150, dur: 60 });
    fill.tween('.p2-dots__gather', { '--draw': [1, 0] }, { at: again + 150, dur: 500, ease: 'inOut', stagger: 30 });
    fill.tween('.p2-dots__gather-head', { opacity: [0, 1] }, { at: again + 600, dur: dur.micro });
    answered(fill, again + 800);
    const reread = sweep(fill, again + 1300, 1400);
    thinking.forEach((col) => fill.tween(`[data-filler="${col}"]`, { opacity: [0, 1] }, { at: passes(col, reread, 1400), dur: dur.micro }));
    fill.tween('[data-verdict="dots"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: reread + 1500, dur: dur.enter, ease: 'back' });
    fill.tween('[data-card="dots"]', { opacity: [0, 1], y: [cardDrop + 16, cardDrop] }, { at: again + 900, dur: dur.enter });
    grow(fill, 'puzzle', again + 1200, whole);
    // Last, with the monitor's verdict: how this squares with slide 3. The line stays, and
    // the next click changes its reason.
    fill.tween('.p2-dots__holds', { opacity: [0, 1] }, { at: reread + 1500, dur: dur.enter });

    // Click 2: no text row at all. Each column hands its last state to the next one as a
    // vector: a chain again, with nothing for a monitor to read.
    const latent = ctx.step({ label: 'vectors: a chain with nothing to read' });
    reset(latent, 'dots', '[data-filler]');
    latent.tween('.p2-dots__gathers', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    way(latent, 'dots', 'vectors', 300);
    thinking.forEach((col, k) => latent.tween(`[data-token="${col}"], [data-dot="${col}"]`, { y: [0, -40], opacity: [1, 0] }, { at: 250 + k * 60, dur: dur.enter, ease: 'in' }));
    latent.tween('.p2-dots__band', { opacity: [0, 1] }, { at: 1000, dur: dur.enter });
    const chain = 1500;
    util.range(cols).forEach((col) => {
      rise(latent, col, chain + col * DOTS.feedMs);
      if (col === cols - 1) return;
      const hop = chain + col * DOTS.feedMs + rows * DOTS.riseMs - 20;
      latent.tween(`[data-feed="${col}"]`, { opacity: [0, 1] }, { at: hop, dur: 60 });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-line`, { '--draw': [1, 0] }, { at: hop, dur: 170, ease: 'inOut' });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-head`, { opacity: [0, 1] }, { at: hop + 120, dur: 80 });
    });
    const solved = chain + (cols - 1) * DOTS.feedMs + rows * DOTS.riseMs;
    answered(latent, solved + 100);
    const blind = sweep(latent, solved + 500, 900);
    latent.cls(lens, 'p2-is-off', { at: blind + 900 });
    latent.tween('[data-verdict="none"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: blind + 1000, dur: dur.enter, ease: 'back' });
    latent.tween('[data-card="dots"]', { y: [cardDrop, 0] }, { at: solved + 200, dur: 600, ease: 'inOut' });
    latent.show('[data-card="vectors"]', { at: solved + 600 });
    grow(latent, 'logic', solved + 1000, oneDecimal);
    grow(latent, 'math', solved + 1500, oneDecimal);
    // With the monitor's verdict, as at click 1: the main line keeps its place and its
    // opening words, and the reason after the colon becomes the one for the vectors (the
    // old one leaves before the new one arrives, as the captions above the machine do).
    latent.tween('[data-why="dots"]', { opacity: [1, 0] }, { at: blind + 1000, dur: dur.micro });
    latent.tween('[data-why="vectors"]', { opacity: [0, 1] }, { at: blind + 1000 + dur.micro, dur: dur.enter });
    // Last, the question that hands over to Part 3, in that part's color.
    latent.tween('.p2-dots__next', { opacity: [0, 1] }, { at: solved + 2600, dur: dur.enter });
    latent.hold(400);
  };

  Deck.register({
    id: 'p2-dots',
    part: 2,
    title: 'In small models, thoughts already stop being words',
    cues: [
      { text: 'Written words: the monitor reads every step', step: 0, at: 1600 },
      { text: 'Dots: still the right answer, with no words to read', step: 1, at: 2600 },
      { text: 'Vectors: nothing to read; they win at logic, lose at math', step: 2, at: 5600 },
    ],
    cite: [
      { src: 'pfau2024', where: 'Sec. 3.1, 4.2' },
      { src: 'hao2024', where: 'Table 1' },
    ],
    // Our drawing of the three mechanisms the sources report; the seven words on the
    // machine and its answer are an example of ours; the bars show the reported accuracies.
    figure: ['schematic', 'illustrative'],
    numbers: 'reported',
    html: dotsHtml(),
    setup: dotsSetup,
  });
})();
