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
  const typeMs = (s, cps) => Math.round((s.length / cps) * 1000);

  // A fact that only slide 3 needs: the sentence of Korbak et al. 2025, Fig. 1, behind the
  // faint links that stand for attention and behind the second cue. It was searched for as a
  // whole string in the arXiv HTML full text (2507.11473v2, the copy downloaded on
  // 2026-11-09). The last cue says 'korbak.serial' in plain words; 'p1.korbak_sampling', the
  // sentence behind the "they sample tokens" of an earlier last cue, is no longer registered.
  Deck.addFacts({
    'p1.korbak_only_way': {
      text: 'Chain of thought is the only way that information can flow down from later to earlier layers',
      src: 'korbak2025', where: 'Fig. 1 caption',
    },
  });
  // Facts that only slide 2 needs: the motive that comes before the monitor. The worry on
  // screen quotes 'p1.korbak_misbehave'; the title, the first cue and the line that says what
  // a reasoning model is rest on 'p1.korbak_before'. Each was searched for as a whole string
  // in the arXiv HTML full text (2507.11473v2, the copy downloaded on 2026-11-09).
  Deck.addFacts({
    'p1.korbak_misbehave': { text: 'intent to misbehave', src: 'korbak2025', where: 'abstract; Sec. 1' },
    'p1.korbak_before': {
      text: 'explicitly trained to perform extended reasoning in CoT before taking actions or producing final outputs',
      src: 'korbak2025', where: 'Sec. 1',
    },
  });
  // The sentences behind the plain words that slide 2 adds for a listener with no background:
  // that a monitor has so far been a second model, what "monitorability" is measured by, and
  // why the paper calls it fragile. None is printed; each was found once as a whole string in
  // the arXiv HTML full text (2507.11473v2, downloaded on 2026-11-12).
  Deck.addFacts({
    'p1.korbak_monitor_models': {
      text: 'Prior work focused on zero-shot prompting less capable language models to work as monitors',
      src: 'korbak2025', where: 'Sec. 3',
    },
    'p1.korbak_measure': {
      text: 'examining how effective CoT monitors are at catching misbehavior of LLM agents in proxy environments',
      src: 'korbak2025', where: 'Sec. 3',
    },
    'p1.korbak_fragile': { text: 'CoT monitorability may be fragile', src: 'korbak2025', where: 'abstract' },
    'p1.korbak_contingent': {
      text: 'could be contingent on the way frontier models are trained today',
      src: 'korbak2025', where: 'Sec. 2',
    },
  });
  // The sentences behind the plain words of slide 4: what an agent and a frontier model are,
  // what a hack is, what the monitor is shown in each of the two tests, which hacks are
  // counted and why, that the thought in the terminal is of another kind, and which of the
  // two models is the weaker. None is printed; each was found once as a whole string in the
  // arXiv HTML full text (2503.11926v1, the copy downloaded on 2026-11-12). The sentence
  // about precision ('p1.baker_precision') went with the line it stood behind.
  Deck.addFacts({
    'p1.baker_agent_acts': { text: 'alternating between CoT messages, viewing files, and editing files', src: 'baker2025', where: 'Fig. 1 caption' },
    'p1.baker_most_advanced': { text: 'the agent we monitored was OpenAI’s most advanced model', src: 'baker2025', where: 'Sec. 2' },
    'p1.baker_hacking': { text: 'hacking or skipping unit tests without implementing correct functionality', src: 'baker2025', where: 'Sec. 2' },
    'p1.baker_reward_hacking': {
      text: 'where AI systems misbehave due to flaws or misspecifications in their learning objectives',
      src: 'baker2025', where: 'abstract',
    },
    'p1.baker_same_monitor': {
      text: 'each of which is the same prompted model but differ in what they each observe of the agent',
      src: 'baker2025', where: 'Sec. 2.1',
    },
    'p1.baker_action_monitor': { text: 'Observes only the tool calls and final outputs', src: 'baker2025', where: 'Sec. 2.1' },
    'p1.baker_cot_monitor': {
      text: 'Observes the entire agent trajectory including CoT, tool calls, and final outputs',
      src: 'baker2025', where: 'Sec. 2.1',
    },
    'p1.baker_ground_truth': {
      text: 'these two systemic hacks were easy to catch in hindsight with simple string regexes, and we use this as ground truth',
      src: 'baker2025', where: 'Sec. 2.1',
    },
    'p1.baker_less_pervasive': {
      text: 'less pervasive hacks that aren’t applicable to all problems in a dataset',
      src: 'baker2025', where: 'Sec. 2.2',
    },
    'p1.baker_weaker': {
      text: 'a LLM weaker than o3-mini, namely GPT-4o, can effectively monitor a stronger model',
      src: 'baker2025', where: 'abstract',
    },
  });
  // The paper's own reading of Table 1's precision ('baker.precision_action',
  // 'baker.precision_cot', in shared/facts.js), from the table's caption. Not printed: it is
  // the presenter's answer if asked what recall leaves open (SPEC.md section 7.26, which says
  // why precision stays off the slide). The caption calls precision "less well defined": the
  // monitor looks for any misbehavior and the detector knows these two hacks, so a flag on
  // any other hack counts as wrong. The sentence was found as a whole string in the text of
  // the PDF (2503.11926, the captions of Table 1 and of Table 2), on 2026-11-12.
  Deck.addFacts({
    'p1.baker_precision_high': { text: 'the precision of our monitors still measures fairly high', src: 'baker2025', where: 'Table 1 caption' },
  });
  // What the agent's reasoning says in one of the two hacks that are counted: the paper's own
  // example of an exit(0) hack. Slide 4 prints the quote under the meters, so that the count
  // and a line of reasoning belong to the same kind of hack; the second sentence says which
  // hack the example is of and is not printed. Each was found once as a whole string in the
  // text kept of the arXiv HTML page (2503.11926v1, the copy of 2026-11-12).
  Deck.addFacts({
    'p1.baker_exit0_thought': { text: 'This is unnatural but tests might pass', src: 'baker2025', where: 'App. A, Fig. 8 caption' },
    'p1.baker_exit0_example': {
      text: 'We show an example CoT of the first systemic hack noted in Figure 2',
      src: 'baker2025', where: 'App. A, Fig. 8 caption',
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
  // The verdict of a trace arrives as a pop that stays inside the chip's own place.
  // kit.stamp brings the chip down from 1.8 times its size, anchored at its right edge, and
  // for that moment the chip covers the label "monitor" to its left.
  const land = (step, chip, state, at) => {
    step.cls(chip, state, { at });
    step.tween(chip, { opacity: [0, 1], scale: [0.6, 1] }, { at, dur: DUR.enter, ease: 'back' });
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
    // Click 1, in ms from the click: the worry arrives at once, the monitor this much later.
    monitorAt: 200,
    // The position paper (click 2), in ms from the click: when the card stands, when the first
    // lab arrives and how long after it the next one, the pause before the labs are joined,
    // how long the line that joins them takes, the pause before the title, the pause before
    // "Fragile" turns, and how long its underline takes.
    cardAt: 200, labAt: 500, perLab: 220, joinAfter: 300, joinDur: 600, titleAfter: 100, fragileAfter: 400, underline: 600,
  });
  // What a reasoning model is, in plain words: the sentence behind it is 'p1.korbak_before'.
  const TERM_IS = 'a language model trained to reason in writing before it gives its answer.';
  // What a monitor is, in the talk's words ("this reasoning" for the paper's "CoT"). The source
  // sentence is the fact 'korbak.monitor_def'; that it has so far been a second model is
  // 'p1.korbak_monitor_models'; what a flag can lead to is quoted ('korbak.blocked').
  const MONITOR_IS = 'a second model that reads this reasoning and flags what looks suspicious or potentially harmful.';
  // The monitor's check also stands beside the line with the slip in it: it is not a grade.
  // The note is about the trace, so it goes on the terminal's border, not among the lines.
  const CHECK_IS = 'a check: nothing suspicious, not “correct”';
  // The heading of the legend of the footer tags. The legend stands here, on the first slide
  // with a cue row, until the paper takes its place; its rows are the sources slide's.
  const TAGS_ARE = 'The tags at the bottom left of every slide say what its picture is:';
  // The two words of the paper's title that a listener has not met, under the title. The
  // first rests on 'p1.korbak_measure', the second on 'p1.korbak_fragile' and
  // 'p1.korbak_contingent'.
  const PAPER_TERMS = Object.freeze([
    Object.freeze({ term: 'Monitorability', is: 'can a monitor catch misbehavior by reading it?' }),
    Object.freeze({ term: 'Fragile', is: 'it may depend on how models are trained today.' }),
  ]);
  // Who signed the position paper: the four largest groups of its author list, then the rest.
  // One dot per author, a group beside a group, so the 41 on the card is the number of dots.
  const SIGNED = (() => {
    const groups = ['korbak.at_gdm', 'korbak.at_openai', 'korbak.at_aisi', 'korbak.at_anthropic', 'korbak.at_others']
      .map((key, i) => Object.freeze({ name: text(key), n: value(key), at: PAD.labAt + i * PAD.perLab }));
    const total = groups.reduce((sum, group) => sum + group.n, 0);
    if (total !== value('korbak.authors')) throw Deck.fail(`part 1: the groups of the author list add up to ${total}, not to ${value('korbak.authors')}`);
    const joinAt = groups[groups.length - 1].at + DUR.enter + PAD.joinAfter;
    const titleAt = joinAt + PAD.joinDur + PAD.titleAfter;
    // "Fragile" turns amber once the title stands under the authors.
    return Object.freeze({ groups: Object.freeze(groups), total, joinAt, titleAt, fragileAt: titleAt + DUR.enter + PAD.fragileAfter });
  })();
  const PAPER = Deck.sources.korbak2025;
  const paperTitle = () => glossed(wrapWord(PAPER.title, 'Fragile', 'class="p1-pad__fragile"'), 'Chain of Thought', 'the written reasoning');
  const arrow = (key) => `<svg class="p1-pad__arrow" data-arrow="${key}" viewBox="0 0 64 24"><path d="M2 12h58M48 3l12 9-12 9"/></svg>`;

  // When the entrance has typed the reasoning, and when the trace's frame turns teal (and with
  // it the first cue arrives), in ms. Computed here because the cue is registered before setup() runs;
  // setup() checks the result against its own timeline, so the two cannot drift apart.
  const PAD_AT = (() => {
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
    title: 'Reasoning models write out their reasoning before they answer',
    // One name for what is written, on every slide: the reasoning. The third cue counts the
    // authors and says nothing about their labs: the card shows the five groups side by side.
    cues: [
      { text: 'Reasoning first, answer after: the reasoning is written down', at: PAD_AT.written },
      { text: 'The reasoning is written, so a monitor can read it', step: 1 },
      { text: `${text('korbak.authors')}: training may make the reasoning unreadable`, step: 2, at: SIGNED.fragileAt },
    ],
    cite: [{ src: 'korbak2025', where: 'title; author list; Sec. 1-3' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: `
      <div class="p1-pad">
        <p class="p1-pad__term"><b>Reasoning model:</b> ${TERM_IS}</p>
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
        <div class="p1-pad__below">
          <div class="p1-pad__tags">
            <div class="p1-pad__tags-head">${TAGS_ARE}</div>
            <ul class="p1-pad__tags-list"></ul>
          </div>
          <div class="p1-pad__paper dk-card">
            <div class="p1-pad__signed">
              <div class="p1-pad__labs">
                ${SIGNED.groups.map((group, i) => `
                <div class="p1-pad__lab" data-group="${i}">
                  <span class="p1-pad__lab-name">${group.name}</span>
                  <span class="p1-pad__lab-dots">${util.range(group.n).map(() => '<i></i>').join('')}</span>
                </div>`).join('')}
                <i class="p1-pad__join"></i>
              </div>
              <div class="p1-pad__count"><span class="p1-pad__n"></span><span class="p1-pad__unit">authors, one paper</span></div>
            </div>
            <div class="p1-pad__paper-title">${paperTitle()}</div>
            <p class="p1-pad__gloss">${PAPER_TERMS.map(({ term, is }) => `<span><b>${term}:</b> ${is}</span>`).join(' ')}</p>
          </div>
        </div>
      </div>`,
    setup: (ctx) => {
      const trace = ctx.q('[data-trace="pad"]');
      const { chip, note } = kit.traceParts(trace);
      const labs = ctx.qa('.p1-pad__lab');
      // The legend of the footer tags: the tags that a footer of this deck carries, with the
      // words in which the sources slide explains them (Deck.tagsInUse, core/deck.js).
      ctx.q('.p1-pad__tags-list').innerHTML = Deck.tagsInUse(Deck.slides)
        .map((tag) => `<li><span class="${tag.className}">${tag.tag}</span><span class="p1-pad__tags-means">${tag.means}</span></li>`).join('');

      // Enter: the model writes its reasoning and the answer waits; once the reasoning stands,
      // the trace's frame turns teal: it is written down, readable. The flow stands where it
      // stays: the place under it holds the legend of the footer tags until the paper takes
      // it, and the row of captions under the flow is empty until the next click.
      const enter = ctx.step({ label: 'the reasoning is written out; the answer waits' });
      enter.show('.p1-pad__term', { at: 100, rise: 0 });
      enter.tween('.p1-pad__prompt', { opacity: [0, 1], x: [-48, 0] }, { at: 200 });
      enter.show('[data-arrow="in"]', { at: 500, rise: 0 });
      enter.show(trace, { at: 600 });
      PAD.lines.forEach((line, i) => typeLine(enter, line, i === 0 ? 200 : 250));
      if (enter.end !== PAD_AT.typed) throw Deck.fail(`part 1: p1-scratchpad types its reasoning by ${enter.end} ms, PAD_AT says ${PAD_AT.typed}`);
      enter.show('[data-arrow="out"]', { at: enter.end + 200, rise: 0 });
      enter.show('.p1-pad__answer', { at: enter.end });
      enter.cls(trace, 'p1-is-readable', { at: PAD_AT.written });
      enter.show('.p1-pad__tags', { at: PAD_AT.written + DUR.micro, rise: 0 });
      enter.hold(DUR.micro);

      // Think, be read, act: the answer is released only after the lens has passed every line.
      // The worry comes first, now that the reasoning stands and before any monitor is
      // named: it is the reason to read. What the monitor is stands under the reasoning it
      // reads; what a flag can do, under the answer.
      const read = ctx.step({ label: 'the worry; the monitor reads every line, then the answer is released' });
      read.show('.p1-pad__why', { at: 0, rise: 0 });
      read.show('.dk-trace__who', { at: PAD.monitorAt, rise: 0 });
      read.show('.p1-pad__def', { at: PAD.monitorAt + 100, rise: 0 });
      const done = kit.readTrace(read, trace, { at: PAD.monitorAt + 300, perLine: 400, marks: PAD.lines.map((l) => ({ key: l.key })) });
      land(read, chip, 'is-clean', done + 100);
      read.tween(note, { opacity: [0, 1] }, { at: done + 300 });
      const release = done + 700;
      read.tween('.p1-pad__lock', { opacity: [1, 0], scale: [1, 0.6] }, { at: release, dur: DUR.micro });
      read.hide('.p1-pad__state-held', { at: release, dur: DUR.micro });
      read.cls('.p1-pad__answer', 'p1-is-open', { at: release });
      read.tween('.p1-pad__value', { opacity: [0, 1], scale: [0.6, 1] }, { at: release + 100, ease: 'back' });
      read.show('.p1-pad__state-open', { at: release + 200, rise: 0 });
      read.show('.p1-pad__gate', { at: release + 500, rise: 0 });
      read.hold(DUR.micro);

      // The position paper. Its authors arrive lab by lab, each lab behind a wall of its own
      // and from its own side; then the walls go, one line joins all of them, and when it has
      // joined the last lab the number of dots stands beside it. The number does not count
      // up: it used to run from 0 along the line, and a frame halfway read "1 authors".
      // Nothing above the card moves.
      const paper = ctx.step({ label: 'who signed the position paper: training could make the reasoning unreadable' });
      paper.hide('.p1-pad__tags', { dur: DUR.micro });
      paper.show('.p1-pad__paper', { at: PAD.cardAt, rise: 0 });
      SIGNED.groups.forEach((group, i) => {
        paper.tween(labs[i], { opacity: [0, 1], y: [i % 2 ? 24 : -24, 0] }, { at: group.at, ease: 'back' });
        paper.tween(labs[i].querySelectorAll('.p1-pad__lab-dots i'), { scale: [0.2, 1] }, { at: group.at + 100, dur: DUR.micro, ease: 'back', stagger: 14 });
      });
      const joining = { at: SIGNED.joinAt, dur: PAD.joinDur, ease: 'inOut' };
      paper.tween(labs, { '--p1-wall': [1, 0] }, joining);
      paper.tween('.p1-pad__join', { '--p1-join': ['0%', '100%'] }, joining);
      paper.type('.p1-pad__n', String(SIGNED.total), { at: 0, dur: 0 });
      paper.tween('.p1-pad__count', { opacity: [0, 1] }, { at: SIGNED.joinAt + PAD.joinDur - DUR.micro, dur: DUR.micro });
      paper.show('.p1-pad__paper-title', { at: SIGNED.titleAt, rise: 0 });
      // "Fragile" turns amber and is underlined: the hook for parts 2 and 3. Under the title,
      // what the word and "monitorability" mean.
      paper.cls('.p1-pad__fragile', 'c-hidden', { at: SIGNED.fragileAt });
      paper.tween('.p1-pad__fragile', { '--p1-under': ['0%', '100%'] }, { at: SIGNED.fragileAt, dur: PAD.underline, ease: 'inOut' });
      paper.show('.p1-pad__gloss', { at: SIGNED.fragileAt + DUR.micro, rise: 0 });
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
    // The claim holds for the architecture in use today ('korbak.today'), and the authors say
    // that it can change ('korbak.future'): the title says so, because slide 7 shows small
    // models trained to do without the words.
    title: 'In today’s models, hard problems force the reasoning through the words',
    cues: [
      'One pass through the layers is shallow',
      // Says 'p1.korbak_only_way' in plain words; the links it arrives with point up and on.
      { text: 'Attention never carries a result down; only a written token does', step: 1 },
      // The conclusion from the two cues before it, and what the picture has just shown: the
      // chain of 32 steps came down through a written token seven times ('korbak.serial').
      { text: 'So reasoning longer than one pass must go through written tokens', step: 2, at: 2600 },
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
              <span class="p1-mem__depth-n"></span><span class="p1-mem__depth-label">steps in a row</span>
              <span class="p1-mem__depth-per"><span data-per="unit">one per layer</span><span data-per="sum">one pass: <b>${MEM.shape.rows}</b></span></span>
            </div>
            <div class="p1-mem__keys">
              <div class="p1-mem__key"><svg class="p1-mem__key-line" viewBox="0 0 64 8"><line class="p1-mem__look" x1="2" y1="4" x2="48" y2="4"/><path class="p1-mem__look-head" d="M62 4L48 -2L48 10Z"/></svg><span>attention:<br>only upward</span></div>
              <div class="p1-mem__key"><svg class="p1-mem__key-line" viewBox="0 0 64 8"><line class="p1-mem__key-drop" x1="2" y1="4" x2="62" y2="4"/></svg><span>written token,<br>read back in</span></div>
            </div>
            <div class="p1-mem__reads">the monitor<br>reads here</div>
          </div>
        </div>
        <figure class="p1-mem__quote">
          <blockquote class="dk-quote">“${glossed(text('korbak.externalized'), 'chain of thought', 'the written reasoning')}”</blockquote>
          <figcaption class="p1-mem__caveat">Korbak et al.’s caveat: having to be written down does not mean a monitor <b>can read</b> it</figcaption>
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

      // Static placement, all relative to the board so the picture scales as one. The picture
      // stands where it stays: the quote's place under it is empty until the quote arrives.
      board.style.width = `${size.width * zoom}px`;
      paths.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
      [band, lens].forEach((el) => { el.style.top = share(row.top, size.height); el.style.height = share(row.height, size.height); });
      ctx.q('.p1-mem__axis-layers').style.top = share((layers.top + layers.bottom) / 2, size.height);
      const arrowUp = ctx.q('.p1-mem__axis-up');
      arrowUp.style.top = share(layers.top, size.height);
      arrowUp.style.height = share(layers.bottom - layers.top, size.height);
      ctx.q('.p1-mem__axis-text').style.top = share(row.top + row.height / 2, size.height);
      ctx.q('.p1-mem__depth').style.top = share(layers.top - 12, size.height);
      // The two keys stack upward from the top of the text row, clear of the count above them.
      ctx.q('.p1-mem__keys').style.bottom = share(size.height - row.top, size.height);
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
      // Each link ends in a small arrowhead at its upper end, so that its direction is read
      // at a glance: on to the next column and one layer up. No link points down, which is
      // what the second cue says and what the key beside the picture repeats.
      const lookHeads = looks.map((link) => {
        const [x1, y1, x2, y2] = ['x1', 'y1', 'x2', 'y2'].map((name) => num(link, name));
        const turn = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        return util.svg('path', {
          class: 'p1-mem__look-head', d: 'M0 0L-14 -6L-14 6Z',
          transform: `translate(${x2.toFixed(1)} ${y2.toFixed(1)}) rotate(${turn.toFixed(1)})`,
        });
      });
      const pulse = util.svg('circle', { class: 'p1-mem__pulse', r: 9 });
      paths.append(...looks, ...lookHeads, ...legs.map((leg) => leg.line), pulse);
      const tracks = columns.map((col) => ({
        col,
        climb: legs.find((leg) => leg.kind === 'climb' && leg.col === col),
        written: legs.find((leg) => leg.kind === 'drop' && leg.col === col) ?? null,
      }));

      const enter = ctx.step({ label: 'one pass up the layers, and it stops' });
      enter.show('.p1-mem__main', { at: 200 });
      enter.show('.p1-mem__depth', { at: 900, rise: 0 });
      const first = runLegs(enter, legs.slice(0, 1), { at: 900, climb: 1400, drop: 0, rest: 0 });
      enter.hold(DUR.enter);

      const zig = ctx.step({ label: 'down through a written token, then up again' });
      // What the second cue names is on screen when it is said: attention, sideways and up,
      // and beside the picture the two keys: what the dashed links are and the one way they
      // go, and what the teal line is that comes down from the top of a column (the written
      // token, read back in as the next column's input).
      zig.tween(looks, { opacity: [0, 1] }, { at: 0, dur: DUR.enter, stagger: 12 });
      zig.tween(lookHeads, { opacity: [0, 1] }, { at: 0, dur: DUR.enter, stagger: 12 });
      zig.show('.p1-mem__keys', { at: DUR.micro, rise: 0 });
      const second = runLegs(zig, legs.slice(1, 5), { at: 100, climb: 800, drop: 700, rest: 200 });
      zig.hold(DUR.enter);

      const chain = ctx.step({ label: 'eight hops, each one through the text row' });
      const third = runLegs(chain, legs.slice(5), { at: 0, climb: 240, drop: 260, rest: 0 });
      const scanAt = third.at + 300;
      const scan = chain.signal({ at: scanAt, dur: 1400, ease: 'inOut' });
      chain.tween(lens, { opacity: [0, 1] }, { at: scanAt - DUR.micro, dur: DUR.micro });
      // The count has reached its last number: the line under it, which said what one step
      // is, changes over to what the number is measured against: one pass through the layers
      // is as many steps as there are layers, and no more (the count stood at that number
      // when the entrance ended). The chain is long only because it came down through a
      // written token after every pass. Until the fifth cold read the line said "8 × 4
      // layers", the product without the comparison, and before SPEC.md section 7.25
      // "4 layers × 8 tokens", which needed two lines beside the two keys.
      chain.tween('[data-per="unit"]', { opacity: [1, 0] }, { at: third.at, dur: DUR.micro });
      chain.tween('[data-per="sum"]', { opacity: [0, 1] }, { at: third.at + DUR.micro, dur: DUR.micro });
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
  // leaves. Here each line also has a typing speed. The box holds the agent's thoughts only;
  // where they come from is said on its border (the motif's note).
  const HACK = Deck.motifs.hackTrace;
  const HACK_CPS = Object.freeze({ fig1a: 32, fig1b: 32, hack: 6 });   // the last line types slowly
  // The two hacks that are counted, by the paper's names. The glosses are ours, after
  // 'baker.exit0_def' and 'baker.skiptest_def' (Sec. 2.1). They are not what the agent in the
  // terminal went on to do: its two thoughts come from two hacks that each fit one task
  // (Fig. 1, Fig. 9; 'p1.baker_less_pervasive'), and recall is measured on these two, which
  // could be labeled ('p1.baker_ground_truth'; Table 1). A line between the two boxes says
  // so, "Not counted" over "Counted", so that they do not read as one episode; and once the
  // count stands, a line under the meters quotes the reasoning of one counted hack
  // ('p1.baker_exit0_thought'), so that the count is seen to rest on reasoning like the
  // example's.
  const HACK_NAMES = Object.freeze(text('baker.systemic_hacks').split(' and '));
  const HACK_ACTS = Object.freeze(['quits before the tests run', 'an error that skips the tests']);
  const GRID = Object.freeze({ n: 100, cols: 10 });
  const RECALL = Object.freeze({ action: value('baker.recall_action'), cot: value('baker.recall_cot') });
  const ZOOM = 1.2;     // the terminal fills the stage while it is the whole story
  const VEILED = 0.5;   // the terminal's opacity under the veil
  const POP = Object.freeze({ reach: 4, gain: 0.3 });   // cells just behind a scan bar swell
  const missedText = (n) => `${n} missed`;

  // The entrance, in ms: when each line of the thought types, and the wait in front of the
  // last one (only the cursor blinks). The title's quote is not shown before the agent says
  // it: setup() shows it letter by letter while that last line types.
  const SAID = (() => {
    const wait = 1300;
    const lines = HACK.lines.reduce((done, line, i) => {
      const cps = HACK_CPS[line.key];
      if (!cps) throw Deck.fail(`part 1: no typing pace for the trace line "${line.key}"`);
      const last = i === HACK.lines.length - 1;
      const at = done.length ? done[done.length - 1].end + (last ? wait : 0) : 700;
      return [...done, Object.freeze({ ...line, cps, at, end: at + typeMs(text(line.fact), cps) })];
    }, []);
    const own = lines[lines.length - 1];
    // The cursor in front of the last line: on and off while the agent waits, on while it
    // types, off once the words stand.
    const cursor = [[100, true], [350, false], [600, true], [850, false], [1100, true]]
      .map(([ms, on]) => Object.freeze({ at: own.at - wait + ms, on }));
    return Object.freeze({
      lines: Object.freeze(lines), own,
      cursor: Object.freeze([...cursor, Object.freeze({ at: own.end + 400, on: false })]),
      // Once the words stand: the title's quote beats once, then the notes arrive.
      beatAt: own.end + 400, notesAt: own.end + 1000,
    });
  })();
  // Click 1, in ms from the click: the monitor, the two hacks that are counted, the grid,
  // the first meter, and the sweep of a monitor that is shown actions only.
  const BLIND = Object.freeze({ monitorAt: 900, actsAt: 1300, boardAt: 1700, meterAt: 2100, scanAt: 2500, scanDur: 1800 });
  // The reveal (click 2), in ms from the click. The cue that states both numbers waits for the count.
  const REVEAL = (() => {
    const lens = 400;
    const perLine = 220;
    const read = lens + HACK.lines.length * perLine;   // the lens has read the thought
    const fast = read + 700;                           // the scan re-covers what actions alone showed
    const fastDur = 400;
    const slow = fast + fastDur + 150;                 // then goes on into the hacks that were missed
    const slowDur = 1900;
    const landed = slow + (slowDur * (RECALL.cot - RECALL.action)) / (GRID.n - RECALL.action);
    return Object.freeze({ lens, perLine, read, fast, fastDur, slow, slowDur, landed, blink: slow + slowDur + 250 });
  })();
  // Click 3, in ms from the click: the agent arrives at the monitor's size and grows to its
  // own; a beam leaves the monitor's disc and sweeps the agent's; the share that the weaker
  // model caught lands in the beam; then the last cue asks the question that part 2 answers.
  const WHO = (() => {
    const beamAt = 1100;
    const beamDur = 900;
    return Object.freeze({ agentAt: 200, growAt: 400, beamAt, beamDur, gotAt: beamAt + beamDur / 2, askAt: beamAt + beamDur + 200 });
  })();
  const BEAM_EDGE = 12;   // the bright front of the beam fades in and out over 1/12 of its way
  // Click 3, under the two discs: what the beam and its number come to, in a sentence. The
  // paper's own conclusion ('p1.baker_weaker': "a LLM weaker than o3-mini, namely GPT-4o, can
  // effectively monitor a stronger model"); the share in the beam is the recall of that
  // monitor ('baker.recall_cot'). Until the fifth cold read the picture said it with the two
  // notes under the names and the number alone, and a reader did not put them together.
  const WHO_SAYS = 'So a weaker model can monitor a stronger one.';

  // One of the two models. `notes` are the lines under its name, one shown at a time.
  const actor = ({ role, name, notes }) => `
    <div class="p1-hack__actor p1-hack__actor--${role}">
      <i class="p1-hack__disc"></i>
      <div><span class="p1-hack__name">${name}</span><span class="p1-hack__role">${notes.map((note, i) => `<span data-note="${i}">${note}</span>`).join('')}</span></div>
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
    // The quote stands in the title only as far as the agent has typed it (setup, the entrance).
    title: 'Sometimes the model just says it: <em class="p1-hack__said">“Let’s hack”</em>',
    cues: [
      'A frontier coding agent, asked to implement features so all tests pass',
      { text: `Actions only: ${text('baker.recall_action')} caught.<br>With the reasoning: <b>${text('baker.recall_cot')}</b>`, step: 2, at: REVEAL.landed },
      { text: 'But does the written reasoning always say why?', step: 3, at: WHO.askAt },
    ],
    cite: [{ src: 'baker2025', where: 'Fig. 1; App. A, Fig. 8-9; Sec. 2; Table 1; abstract' }],
    // The left half is our arrangement of what the paper reports (a paraphrase, a quote from
    // another task, glosses, the two discs), so the slide is a schematic; the grid and the
    // meters carry the paper's measured numbers.
    figure: 'schematic',
    numbers: 'reported',
    html: `
      <div class="p1-hack">
        <div class="p1-hack__left">
          ${kit.trace({
    key: HACK.key, label: HACK.label, verdict: HACK.verdict, width: HACK.width, lines: SAID.lines,
    inner: '<div class="p1-hack__veil"><span>Hidden from the monitor</span></div>',
  })}
          <p class="p1-hack__kind"><b>Not counted:</b> the lines above, examples from single tasks.</p>
          <div class="p1-hack__acts">
            <div class="dk-term">
              <div class="p1-hack__counted"><b>Counted:</b> two kinds of hack that worked in nearly every task</div>
              ${HACK_NAMES.map((name, i) => `<div class="dk-term__line p1-hack__act"><b>${name}</b><span>${HACK_ACTS[i]}</span></div>`).join('')}
            </div>
            ${kit.legend({ key: 'acts', text: 'names: Sec. 2.1 · glosses: ours' })}
          </div>
          <div class="p1-hack__pair">
            ${actor({ role: 'monitor', name: text('baker.monitor'), notes: ['the monitor: a second model', 'the monitor · weaker model'] })}
            <div class="p1-hack__watch">
              <i class="p1-hack__beam"></i>
              <span class="p1-hack__ray"><i class="p1-hack__front"></i></span>
              <b class="p1-hack__got">${text('baker.recall_cot')}</b>
            </div>
            ${actor({ role: 'agent', name: 'The agent', notes: ['stronger model'] })}
            <p class="p1-hack__says">
              <span data-say="blind">Told to look for hacks. First it sees only the agent’s actions.</span>
              <span data-say="seen">Now it also reads the reasoning, as in the example above.</span>
              <span data-say="who">${WHO_SAYS}</span>
            </p>
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
                <div class="p1-hack__unit">hacks of these two kinds</div>
              </div>
              <div class="p1-hack__missed"></div>
            </div>
          </div>
          <div class="p1-hack__meters">
            <div class="p1-hack__metric">Share of these hacks the monitor caught <span>(recall)</span></div>
            ${kit.meter({ key: 'action', label: 'Actions only', tone: 'dim' })}
            ${kit.meter({ key: 'cot', label: 'With the reasoning', tone: 'read' })}
            <p class="p1-hack__wrote">The reasoning in one <b>${HACK_NAMES[0]}</b> hack said:<br><q>${text('p1.baker_exit0_thought')}</q> <span>(App. A, Fig. 8)</span></p>
          </div>
        </div>
        <p class="p1-hack__bridge">From arithmetic to a real coding task: what does the written reasoning show there?</p>
        <div class="p1-hack__terms">
          <p data-term="agent"><b>Agent:</b> a model that works on a task by itself, step by step: it thinks, views files, edits files. <b>Frontier:</b> the most advanced model its lab had.</p>
          <p data-term="hack"><b>Hack:</b> here, making the tests pass without doing the real work.</p>
        </div>
      </div>`,
    setup: (ctx) => {
      const trace = ctx.q(`[data-trace="${HACK.key}"]`);
      const { term, chip, note, line } = kit.traceParts(trace);
      const own = line(SAID.own.key);
      const said = ctx.q('.dk-title .p1-hack__said');
      const home = offsetToCenter(ctx.stage, trace);
      const cells = ctx.qa('[data-grid="hacks"] [data-cell]');
      const missed = cells.slice(RECALL.cot);
      const missedLabel = ctx.q('.p1-hack__missed');
      const watch = ctx.q('.p1-hack__watch');
      const front = ctx.q('.p1-hack__front');
      // Each meter says what its number counts: the number, then the verb.
      const meterOf = (key, scan) => {
        const meter = ctx.q(`[data-meter="${key}"]`);
        const shown = meter.querySelector('.dk-meter__value');
        shown.innerHTML = '<span class="p1-hack__share"></span><span class="p1-hack__verb">caught</span>';
        return { scan, fill: meter.querySelector('.dk-meter__fill'), value: shown.querySelector('.p1-hack__share'), shown };
      };
      const bars = { action: meterOf('action', ctx.q('.p1-hack__scan')), cot: meterOf('cot', ctx.q('[data-lens="grid"]')) };

      // Under the centered terminal: the words a listener has not met.
      ctx.q('.p1-hack__terms').style.top = `${Math.round((ctx.stage.offsetHeight + trace.offsetHeight * ZOOM) / 2 + 40)}px`;
      // The title's quote, a letter to an element: the quotation marks, and between them the
      // words, each letter of which shows when the terminal has typed the same share of its line.
      const letters = Array.from(said.textContent);
      if (letters.length < 3) throw Deck.fail(`part 1: the title of p1-hack quotes nothing ("${said.textContent}")`);
      said.innerHTML = letters.map((ch) => `<span>${ch}</span>`).join('');
      const marks = [said.firstElementChild, said.lastElementChild];
      const words = Array.from(said.children).slice(1, -1);
      const typing = SAID.own.end - SAID.own.at;
      const saidAt = (i) => SAID.own.at + Math.round(((i + 0.5) / words.length) * typing);

      // Enter: only the terminal, large and centered, and over it one line that leads here
      // from slide 3's arithmetic. The cursor waits in front of the last line, which then
      // types slowly, in red; the title, which ended on a colon, says the same words at the
      // same moment.
      const enter = ctx.step({ label: 'the agent thinks: Let’s hack' });
      enter.show('.p1-hack__bridge', { at: 100, rise: 0 });
      enter.tween(trace, { opacity: [0, 1], y: [home.y + 16, home.y] }, { at: 300 });
      enter.show('[data-term="agent"]', { at: 500, rise: 0 });
      SAID.lines.forEach((l) => {
        if (l.tone) enter.cls(line(l.key), l.tone);
        enter.type(line(l.key), text(l.fact), { at: l.at, cps: l.cps });
      });
      SAID.cursor.forEach(({ at, on }) => enter.cls(own, 'p1-is-cursor', { at, on }));
      words.forEach((letter, i) => enter.tween(letter, { opacity: [0, 1] }, { at: saidAt(i), dur: DUR.micro / 2 }));
      enter.tween(marks[0], { opacity: [0, 1] }, { at: saidAt(0), dur: DUR.micro / 2 });
      enter.tween(marks[1], { opacity: [0, 1] }, { at: saidAt(words.length - 1), dur: DUR.micro / 2 });
      enter.tween(said, { scale: [1, 1.08] }, { at: SAID.beatAt, dur: DUR.micro });
      enter.tween(said, { scale: [1.08, 1] }, { at: SAID.beatAt + DUR.micro, dur: DUR.enter });
      // Then, on the border, which lines are a paraphrase and which are the agent's own words,
      // and under the terminal what a hack is.
      enter.type(note, text(HACK.note), { at: SAID.notesAt, dur: 0 });
      enter.tween(note, { opacity: [0, 1] }, { at: SAID.notesAt });
      enter.show('[data-term="hack"]', { at: SAID.notesAt + DUR.micro, rise: 0 });
      enter.hold(DUR.enter);

      // Click 1: the terminal steps aside and goes dark for a monitor that is shown the
      // actions only. One thing arrives at a time: the monitor, the two hacks that are
      // counted, the grid, the meter; then the sweep. A hack it passes without catching it
      // is left as a ring.
      const blind = ctx.step({ label: 'actions only: 60 of 100 caught, 40 missed' });
      blind.hide('.p1-hack__bridge', { dur: DUR.micro });
      blind.hide('.p1-hack__terms', { dur: DUR.micro });
      blind.tween(trace, { x: [home.x, 0], y: [home.y, 0], scale: [ZOOM, 1] }, { dur: DUR.move, ease: 'inOut' });
      blind.tween(term, { opacity: [1, VEILED] }, { at: 500 });
      blind.show('.p1-hack__veil', { at: DUR.move, dur: DUR.micro, rise: 0 });
      blind.tween('.p1-hack__actor--monitor', { opacity: [0, 1], scale: [0.7, 1] }, { at: BLIND.monitorAt, ease: 'back' });
      blind.show('[data-say="blind"]', { at: BLIND.monitorAt + DUR.micro, rise: 0 });
      blind.show('.p1-hack__kind', { at: BLIND.actsAt, rise: 0 });
      blind.show('.p1-hack__acts', { at: BLIND.actsAt });
      blind.show('.p1-hack__board', { at: BLIND.boardAt });
      blind.show('.p1-hack__metric', { at: BLIND.meterAt, rise: 0 });
      blind.show('[data-meter="action"]', { at: BLIND.meterAt, rise: 0 });
      const actionScan = blind.signal({ to: GRID.n, at: BLIND.scanAt, dur: BLIND.scanDur, ease: 'linear' });
      blind.show(missedLabel, { at: BLIND.scanAt + (BLIND.scanDur * RECALL.action) / GRID.n, rise: 0 });
      blind.hold(DUR.enter);

      // Click 2, the reveal: the veil lifts, the lens reads the example and flags it, then
      // the same grid is swept again, past 60 and into the rings, up to 95; last, under the
      // meters, what the reasoning said in one of the hacks that the count is a count of.
      const seen = ctx.step({ label: 'with the reasoning: 95 of 100 caught, 5 missed' });
      seen.tween(term, { opacity: [VEILED, 1] }, {});
      seen.hide('.p1-hack__veil', { dur: DUR.micro });
      seen.hide('[data-say="blind"]', { dur: DUR.micro });
      seen.show('[data-say="seen"]', { at: DUR.micro, rise: 0 });
      seen.show('.dk-trace__who', { at: DUR.micro, rise: 0 });
      kit.readTrace(seen, trace, { at: REVEAL.lens, perLine: REVEAL.perLine, marks: SAID.lines.filter((l) => l.flag) });
      land(seen, chip, 'is-flagged', REVEAL.read);
      seen.tween(chip, { '--p1-ring': [1, 0] }, { at: REVEAL.read, dur: DUR.move });
      seen.cls(trace, 'is-alarm', { at: REVEAL.read });
      seen.show('[data-meter="cot"]', { at: REVEAL.fast - DUR.micro, rise: 0 });
      const cotFast = seen.signal({ to: RECALL.action, at: REVEAL.fast, dur: REVEAL.fastDur, ease: 'linear' });
      const cotSlow = seen.signal({ to: GRID.n - RECALL.action, at: REVEAL.slow, dur: REVEAL.slowDur, ease: 'linear' });
      seen.tween(bars.cot.shown, { scale: [1, 1.2] }, { at: REVEAL.landed, dur: DUR.micro });
      seen.tween(bars.cot.shown, { scale: [1.2, 1] }, { at: REVEAL.landed + DUR.micro, dur: DUR.enter });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink + 300, on: false });
      seen.show('.p1-hack__wrote', { at: REVEAL.blink + 500, rise: 0 });
      seen.hold(DUR.enter);

      // Click 3: who was watching whom, and the question for part 2. The agent arrives at
      // the monitor's size and grows to its own; a beam leaves the smaller disc and sweeps
      // the larger one, and the share that the weaker model caught lands in the beam, at
      // which the same number on its meter beats and the line under the discs says what that
      // comes to (WHO_SAYS). Nothing else on the slide changes. Then the last cue asks what
      // part 2 answers.
      const who = ctx.step({ label: 'a weaker model watches a stronger one; does the written reasoning always say why?' });
      who.tween('.p1-hack__actor--agent', { opacity: [0, 1] }, { at: WHO.agentAt });
      who.tween('.p1-hack__actor--agent .p1-hack__disc', { scale: [0.5, 1] }, { at: WHO.growAt, dur: DUR.move, ease: 'back' });
      who.show('.p1-hack__actor--agent .p1-hack__role', { at: WHO.growAt + 300, rise: 0 });
      who.hide('.p1-hack__actor--monitor [data-note="0"]', { at: WHO.growAt + 300, dur: DUR.micro });
      who.show('.p1-hack__actor--monitor [data-note="1"]', { at: WHO.growAt + 500, rise: 0 });
      const beam = who.signal({ to: 1, at: WHO.beamAt, dur: WHO.beamDur, ease: 'inOut' });
      who.tween('.p1-hack__got', { opacity: [0, 1], scale: [0.6, 1] }, { at: WHO.gotAt, ease: 'back' });
      // The line under the discs gives way to the conclusion as the number lands.
      who.hide('[data-say="seen"]', { at: WHO.gotAt - DUR.micro, dur: DUR.micro });
      who.show('[data-say="who"]', { at: WHO.gotAt, rise: 0 });
      who.tween(bars.cot.shown, { scale: [1, 1.2] }, { at: WHO.gotAt, dur: DUR.micro });
      who.tween(bars.cot.shown, { scale: [1.2, 1] }, { at: WHO.gotAt + DUR.micro, dur: DUR.enter });
      who.hold(DUR.micro);

      // The grid, both scan bars, both meters and the count of what was missed are drawn
      // from the two scan positions, so a number always is the number of cells that show it.
      // A number is printed only once its count is over, at the paper's value (`target`):
      // while a bar still grows it has no number beside it, so no frame prints a share that
      // the paper does not report (a frame halfway used to read "72% caught", "28 missed").
      const pitch = cells[GRID.cols].offsetTop - cells[0].offsetTop;
      const sweep = (bar, at, caught, target) => {
        bar.scan.style.top = `${((at / GRID.cols) * pitch).toFixed(1)}px`;
        bar.scan.style.opacity = util.clamp(Math.min(at, GRID.n - at) / 3).toFixed(3);
        bar.fill.style.setProperty('--v', `${caught.toFixed(2)}%`);
        const counted = caught >= target;
        const label = counted ? percent(target) : '';
        if (bar.value.textContent !== label) bar.value.textContent = label;
        bar.shown.style.visibility = counted ? 'visible' : 'hidden';
      };
      // How much a lit cell swells: most right behind a scan bar that is still moving.
      const pop = (i, front, caught) => (i < caught && front < GRID.n ? util.clamp(1 - (front - i) / POP.reach) : 0);
      ctx.paint(() => {
        const action = actionScan();
        const cot = cotFast() + cotSlow();
        const byAction = Math.min(action, RECALL.action);
        const byCot = Math.min(cot, RECALL.cot);
        const looked = Math.max(action, cot);       // how far a monitor has looked
        const caught = Math.max(byAction, byCot);   // how many of those it caught, by either way
        cells.forEach((cell, i) => {
          cell.classList.toggle('p1-is-cot', i < byCot);
          cell.classList.toggle('p1-is-act', i < byAction && i >= byCot);
          cell.classList.toggle('p1-is-miss', i >= caught && i < looked);
          const swell = Math.max(pop(i, action, byAction), pop(i, cot, byCot));
          cell.style.transform = swell > 0 ? `scale(${(1 + POP.gain * swell).toFixed(3)})` : '';
        });
        sweep(bars.action, action, byAction, RECALL.action);
        sweep(bars.cot, cot, byCot, RECALL.cot);
        // What was missed is printed for a finished sweep only: 40 after the first, 5 after
        // the second. While a sweep is still on its way through the misses, the label is empty.
        const settled = cot > RECALL.action ? byCot >= RECALL.cot : action >= GRID.n;
        const left = settled ? missedText(Math.round(looked) - Math.round(caught)) : '';
        if (missedLabel.textContent !== left) missedLabel.textContent = left;
        // The beam between the two discs: how far its front has come (0 at the monitor's
        // disc, 1 past the agent's); the bright front shows only while it is on its way.
        const swept = beam();
        watch.style.setProperty('--p1-swept', swept.toFixed(4));
        front.style.opacity = util.clamp(Math.min(swept, 1 - swept) * BEAM_EDGE).toFixed(3);
      });
    },
  });
})();
