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
    // What misbehavior is, in the paper's own examples: behind the line under the worry,
    // "for example, cheating in training or manipulating data" (WORRY_EG; its first two
    // examples in plain words, not printed as a quote). Found once in the text of the PDF
    // (2507.11473, Sec. 1.2, "Detecting model misbehavior") on 2026-11-13, read with line
    // breaks as spaces; a control with "testing" in the place of "training" was not found.
    'p1.korbak_misbehave_examples': {
      text: 'exploiting flaws in their reward functions during training, manipulating data to achieve an outcome, or falling prey to prompt injection attacks',
      src: 'korbak2025', where: 'Sec. 1.2',
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
    // The same sentence with the words in front of it: when that was so. Behind the note
    // under the agent's disk, "OpenAI’s most advanced model at the time" (AGENT_IS). Found
    // once in the text of the PDF (2503.11926, the copy of 2026-11-12) on 2026-11-13, read
    // with the hyphen at a line's end joined ("exper-" / "iments"); a control with "least"
    // in the place of "most" was not found.
    'p1.baker_at_the_time': {
      text: 'at the time of these experiments, the agent we monitored was OpenAI’s most advanced model',
      src: 'baker2025', where: 'Sec. 2',
    },
    // How the same sentence goes on: what the agent is stronger than. Behind "a stronger
    // one" in the line under the two disks; the note under the agent's disk said "stronger
    // than o3-mini" until the cold read of 2026-11-13, which found the name unexplained.
    // Found once as a whole string in the text of the PDF (2503.11926, the copy of
    // 2026-11-12) on 2026-11-13; a control with "o1" in the place of "o3-mini" was not found.
    'p1.baker_past_o3mini': { text: 'surpassing even OpenAI o3-mini in hard reasoning tasks', src: 'baker2025', where: 'Sec. 2' },
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
    // The same finding as the paper's Sec. 1 states it, the place that the footer names
    // ("Sec. 1-2") since the cite lost "abstract" to keep one line. Found once in the text
    // of the PDF (2503.11926, the copy of 2026-11-12) on 2026-11-13, read with line breaks
    // as spaces; a control with "strong" in the place of "weak" was not found.
    'p1.baker_weak_monitor': {
      text: 'a relatively weak reasoning and programming model can monitor a model far more capable than itself',
      src: 'baker2025', where: 'Sec. 1',
    },
  });
  // The paper's own reading of Table 1's precision ('baker.precision_action',
  // 'baker.precision_cot', in shared/facts.js), from the table's caption. The sentence is not
  // printed; it stands behind the one line about precision that slide 4 shows (TRUST_SAYS).
  // The caption calls precision "less well defined": the monitor looks for any misbehavior
  // and the detector knows these two hacks, so a flag on any other hack counts as wrong. The
  // sentence was found as a whole string in the text of the PDF (2503.11926, the captions of
  // Table 1 and of Table 2), on 2026-11-12.
  Deck.addFacts({
    'p1.baker_precision_high': { text: 'the precision of our monitors still measures fairly high', src: 'baker2025', where: 'Table 1 caption' },
  });
  // The sentence that the title quotes from, so that the quotation marks of the title are
  // the paper's: its caption of Fig. 9 gives the agent's two words in quotation marks. Found
  // once as a whole string in the text of the PDF (2503.11926, the copy of 2026-11-12) on
  // 2026-11-13. ('p1.baker_exit0_thought' and 'p1.baker_exit0_example', the quote of an
  // exit(0) hack that stood under the meters and the sentence that said which hack it was
  // from, went with that line and are no longer registered.)
  Deck.addFacts({
    'p1.baker_said_hack': { text: 'it thinks, “Let’s hack”, in the CoT', src: 'baker2025', where: 'App. A, Fig. 9 caption' },
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
  // Over the thought, from the moment it types: what the line is. The thought holds a slip
  // ("17 × 4 = 58") that the model then corrects, and it stands here without its question;
  // two cold readers took the slip for a typo of ours. The question is slide 2's prompt
  // (motifs.ask). The line is about the words, so it goes as they go: it fades while the
  // letters fall away and is gone when the last one is a dot. (Until the eleventh cold read
  // it stayed, and in the final state it pointed at a row of dots.)
  const THOUGHT_IS = `Asked “${Deck.motifs.ask}”, a model works it out and corrects its own mistake:`;
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
        <p class="p1-title__says">${THOUGHT_IS}</p>
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
      enter.show('.p1-title__says', { at: TITLE.typeAt - DUR.micro, rise: 0 });
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
      // The line over the thought says what the words are, and leaves with them.
      enter.tween('.p1-title__says', { opacity: [1, 0] }, { at: decayAt, dur: order.length * TITLE.perDecay, ease: 'linear' });
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
    ask: Deck.motifs.ask,   // shared: slide 6 asks the same question again
    answer: '408',
    cps: 40,
    lines: Object.freeze([
      { key: 'split', text: '17 × 24 = 17 × 20 + 17 × 4' },
      { key: 'slip', text: '17 × 20 = 340. 17 × 4 = 58.' },
      { key: 'fix', text: 'Hmm, wait. 17 × 4 = 68, not 58.', beat: 'Hmm, wait.' },
      { key: 'sum', text: '340 + 68 = 408.' },
    ]),
    // Click 1, in ms from the click: the worry arrives at once, the monitor this much later,
    // so that the reason to read stands before the reader does. Click 2: when the lens starts.
    monitorAt: 600, readAt: 200,
    // The position paper (click 3), in ms from the click: when its rule stands, when the line
    // about its authors arrives, how long after it the title, the pause before "Fragile"
    // turns, and how long its underline takes.
    cardAt: 200, signedAt: 500, titleAfter: 600, fragileAfter: 400, underline: 600,
  });
  // The question that the slide answers, first on its stage and there at every step: a reader
  // with no one to tell them what the slide is for reads it before the picture.
  const PAD_ASKS = 'Can we see what a model is about to do, before it does it?';
  // What a reasoning model is, is said by the title ('p1.korbak_before'). Until the tenth
  // cold read a line under the question said it a second time ("Reasoning model: a language
  // model trained to reason in writing before it gives its answer."), and the first cue a third.
  // What the worry is, by one of the paper's own examples in plain words
  // ('p1.korbak_misbehave_examples': "exploiting flaws in their reward functions during
  // training, ..."): two cold readers found "intent to misbehave" with no example beside
  // it. Until the eleventh cold read the line gave two ("... or manipulating data") and the
  // worry took four lines; with one it takes two, and the row of captions under the flow is
  // two lines tall, which is the room that lets the legend of the tags stay (see TAGS_ARE).
  const WORRY_EG = 'for example, cheating in training';
  // Beside the two lines of the reasoning that hold the slip and its correction, in the face
  // and color of a note and behind an arrow, so that neither reads as the model's words: the
  // slip is the model's, and so is the fix. Two cold readers took "17 × 4 = 58" for a typo
  // of ours. Both arrive when the correction has been typed.
  const SLIP_MARKS = Object.freeze([
    Object.freeze({ line: 'slip', says: 'mistake' }),
    Object.freeze({ line: 'fix', says: 'fixes it' }),
  ]);
  // What a monitor is, in the talk's words ("this reasoning" for the paper's "CoT"). The source
  // sentence is the fact 'korbak.monitor_def'; that it has so far been a second model is
  // 'p1.korbak_monitor_models'; what a flag can lead to is quoted ('korbak.blocked').
  const MONITOR_IS = 'a second model that reads this reasoning and flags what looks suspicious or potentially harmful.';
  // What the monitor's verdict means: it is not a grade. The trace holds a line with a slip
  // in it ("17 × 4 = 58"), and the verdict is "clean" all the same. The note is about the
  // trace, so it goes on the terminal's border, not among the lines. Until the cold read of
  // the whole deck on 2026-11-13 the lens left a check beside every line, the line with the
  // slip included, and the note explained the check ("a check: nothing suspicious, not
  // “correct”"); readers took the checks for "correct" all the same. Now a line that the
  // monitor does not flag carries no mark, as on slide 4.
  const CLEAN_IS = 'clean = nothing suspicious, not “correct”';
  // The heading of the legend of the footer tags. The legend stands here, on the first slide
  // with a cue row, from the end of the entrance to the slide's last state, at the bottom of
  // the stage: two lines, the heading and the first tag, then the other tags; its words are
  // the sources slide's. Until the eleventh cold read it was a list of four lines in the
  // place that the paper took at click 3, and two readers said that it left too early: the
  // ten slides after this one rely on it. It says "a slide", not "every slide": the closing
  // slide and the sources slide carry no tag.
  const TAGS_ARE = 'The tags at the bottom left of a slide say what its picture is:';
  // The two words of the paper's title that a listener has not met, under the title. The
  // first rests on 'p1.korbak_measure', the second on 'p1.korbak_fragile' and
  // 'p1.korbak_contingent'.
  const PAPER_TERMS = Object.freeze([
    Object.freeze({ term: 'Monitorability', is: 'can a monitor catch misbehavior by reading it?' }),
    Object.freeze({ term: 'Fragile', is: 'it may depend on how models are trained today.' }),
  ]);
  // Who signed the position paper, in one line: how many, and from where (the four largest
  // groups of its author list, then the rest). Until the tenth cold read the card drew a dot
  // for each author, group beside group, with a line that joined them, the count and a key
  // of the dots; the picture added nothing to the argument and the final state was crowded.
  // The groups must still add up to the count that the line prints.
  const SIGNED = (() => {
    const groups = ['korbak.at_gdm', 'korbak.at_openai', 'korbak.at_aisi', 'korbak.at_anthropic', 'korbak.at_others']
      .map((key) => Object.freeze({ name: text(key), n: value(key) }));
    const total = groups.reduce((sum, group) => sum + group.n, 0);
    if (total !== value('korbak.authors')) throw Deck.fail(`part 1: the groups of the author list add up to ${total}, not to ${value('korbak.authors')}`);
    const names = groups.map((group) => group.name);
    const from = `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
    const titleAt = PAD.signedAt + PAD.titleAfter;
    // "Fragile" turns amber once the title stands under the authors.
    return Object.freeze({ says: `<b>${text('korbak.authors')}</b> from ${from}, in one paper:`, titleAt, fragileAt: titleAt + DUR.enter + PAD.fragileAfter });
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
      { text: `${text('korbak.authors')}: training may make the reasoning unreadable`, step: 3, at: SIGNED.fragileAt },
    ],
    cite: [{ src: 'korbak2025', where: 'title; author list; Sec. 1-3' }],
    // "Illustrative" and nothing else. Until the eleventh cold read the slide also carried
    // "Reported numbers" for the count of the authors. That tag means "the measured numbers
    // on the slide are the source's" (core/deck.js), and the slide holds no measured number:
    // the count is a tally of the paper's author list (the footer cites "author list"), and
    // it is on screen in the last state only. Until then the only numbers under the tag were
    // those of our own sum, and a cold reader looked for the measurement.
    figure: 'illustrative',
    html: `
      <div class="p1-pad">
        <p class="p1-ask p1-pad__question">${PAD_ASKS}</p>
        <div class="p1-pad__flow">
          <div class="p1-pad__prompt dk-card">
            <div class="p1-pad__tag">Prompt</div>
            <div class="p1-pad__ask">${PAD.ask}</div>
          </div>
          ${arrow('in')}
          ${kit.trace({
    key: 'pad', label: 'Reasoning, written out', lines: PAD.lines.map((l) => l.key), verdict: 'clean', note: CLEAN_IS,
    inner: `<div class="p1-pad__marks">${SLIP_MARKS.map((mark) => `<span data-mark="${mark.line}">← ${mark.says}</span>`).join('')}</div>`,
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
          <p class="p1-pad__why"><b>The worry:</b> a model’s <q>${text('p1.korbak_misbehave')}</q><span class="p1-pad__eg">${WORRY_EG}</span></p>
          <p class="p1-pad__def"><b>The monitor:</b> ${MONITOR_IS}</p>
          <p class="p1-pad__gate">If it flags, the answer <q>${text('korbak.blocked')}</q></p>
        </div>
        <div class="p1-pad__below">
          <div class="p1-pad__tags">
            <span class="p1-pad__tags-head">${TAGS_ARE}</span>
            <ul class="p1-pad__tags-list"></ul>
          </div>
          <div class="p1-pad__paper">
            <p class="p1-pad__signed">${SIGNED.says}</p>
            <div class="p1-pad__paper-title">${paperTitle()}</div>
            <p class="p1-pad__gloss">${PAPER_TERMS.map(({ term, is }) => `<span><b>${term}:</b> ${is}</span>`).join(' ')}</p>
          </div>
        </div>
      </div>`,
    setup: (ctx) => {
      const trace = ctx.q('[data-trace="pad"]');
      const { chip, note, line } = kit.traceParts(trace);
      // The two marks stand in one block at the right of the terminal, on the lines they name.
      const marks = ctx.q('.p1-pad__marks');
      const marked = SLIP_MARKS.map((mark) => line(mark.line));
      if (marked[1].offsetTop - marked[0].offsetTop !== marked[0].offsetHeight) throw Deck.fail('part 1: the slip and its correction are no longer two lines, one under the other');
      const topIn = (el, root) => { let y = 0; for (let n = el; n && n !== root; n = n.offsetParent) y += n.offsetTop; return y; };
      marks.style.top = `${topIn(marked[0], trace)}px`;
      // The legend of the footer tags: the tags that a footer of this deck carries, with the
      // words in which the sources slide explains them (Deck.tagsInUse, core/deck.js).
      // The first tag stands on the heading's line and the others on the line under it, in
      // every font set and language: a break follows the first.
      ctx.q('.p1-pad__tags-list').innerHTML = Deck.tagsInUse(Deck.slides)
        .map((tag) => `<li><span class="${tag.className}">${tag.tag}</span><span class="p1-pad__tags-means">${tag.means}</span></li>`)
        .map((item, i) => (i === 0 ? `${item}<li class="p1-pad__tags-break" aria-hidden="true"></li>` : item)).join('');
      // The paper stands over the legend, and the two share what the captions leave them. A
      // caption that took a third line, or a legend that took a third, would push the one into
      // the other inside the stage, where the lint does not look: the part stops instead.
      const paperBox = ctx.q('.p1-pad__paper');
      const legendBox = ctx.q('.p1-pad__tags');
      if (paperBox.offsetTop + paperBox.offsetHeight > legendBox.offsetTop) {
        throw Deck.fail(`part 1: on p1-scratchpad the paper ends at ${paperBox.offsetTop + paperBox.offsetHeight} px and the legend of the tags begins at ${legendBox.offsetTop} px`);
      }

      // Enter: the model writes its reasoning and the answer waits; once the reasoning stands,
      // the trace's frame turns teal: it is written down, readable. The flow stands where it
      // stays: at the bottom of the stage the legend of the footer tags, which stays to the
      // last state; between it and the flow the place of the paper, empty until click 3; and
      // the row of captions under the flow is empty until the next click. Over all of it,
      // from the first frame: the question that the slide answers.
      const enter = ctx.step({ label: 'the reasoning is written out; the answer waits' });
      enter.show('.p1-pad__question', { at: 100, rise: 0 });
      enter.tween('.p1-pad__prompt', { opacity: [0, 1], x: [-48, 0] }, { at: 200 });
      enter.show('[data-arrow="in"]', { at: 500, rise: 0 });
      enter.show(trace, { at: 600 });
      // When the line with the correction has been typed: the two marks arrive then.
      const fixedAt = PAD.lines.reduce((at, l, i) => {
        typeLine(enter, l, i === 0 ? 200 : 250);
        return l.key === SLIP_MARKS[1].line ? enter.end : at;
      }, null);
      if (fixedAt === null) throw Deck.fail('part 1: p1-scratchpad types no line with a correction');
      if (enter.end !== PAD_AT.typed) throw Deck.fail(`part 1: p1-scratchpad types its reasoning by ${enter.end} ms, PAD_AT says ${PAD_AT.typed}`);
      enter.show('[data-arrow="out"]', { at: enter.end + 200, rise: 0 });
      enter.show('.p1-pad__answer', { at: enter.end });
      enter.show(marks, { at: fixedAt, rise: 0 });
      enter.cls(trace, 'p1-is-readable', { at: PAD_AT.written });
      enter.show('.p1-pad__tags', { at: PAD_AT.written + DUR.micro, rise: 0 });
      enter.hold(DUR.micro);

      // Click 1: why anyone reads, and who does. The worry comes first, now that the
      // reasoning stands and before any monitor is named: it is the reason to read. What the
      // monitor is stands under the reasoning it reads. Nothing is read yet: the two
      // captions are on screen, and stay, before the lens moves (until the user's rule that
      // every state stops, they arrived 0.2 s before the sweep, in the same click).
      const meet = ctx.step({ label: 'the worry, then the monitor: a second model that reads the reasoning' });
      meet.show('.p1-pad__why', { at: 0, rise: 0 });
      meet.show('.dk-trace__who', { at: PAD.monitorAt, rise: 0 });
      meet.show('.p1-pad__def', { at: PAD.monitorAt + 100, rise: 0 });
      meet.hold(DUR.enter);

      // Click 2. Think, be read, act: the answer is released only after the lens has passed
      // every line. No line is flagged, so no line gets a mark: the verdict says what the
      // monitor found, and the note on the border what that verdict means. What a flag can do
      // stands under the answer.
      const read = ctx.step({ label: 'the monitor reads every line: clean, and the answer is released' });
      const done = kit.readTrace(read, trace, { at: PAD.readAt, perLine: 400, marks: [] });
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

      // The position paper, between the flow and the legend of the tags: one line that says
      // who signed it, and its title. Nothing else on the stage moves or leaves.
      const paper = ctx.step({ label: 'who signed the position paper: training could make the reasoning unreadable' });
      paper.show('.p1-pad__paper', { at: PAD.cardAt, rise: 0 });
      paper.show('.p1-pad__signed', { at: PAD.signedAt, rise: 0 });
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
  // The question that the slide answers, first on its stage. Its first sentence says what
  // the count beside the picture is a count of: steps in a row, each of which needs the
  // result of the one before ('korbak.serial': "serial steps of cognition").
  // Directions on this slide are said in layers ("a lower layer", "a higher layer") and not
  // as "down" or "upward": a cold reader could not tell whether "down" meant a lower layer
  // or further on in the text.
  const MEM_ASKS = 'A hard problem needs many steps in a row, each using the result of the one before. <b>Must the steps be written down?</b>';
  // The three words of the picture that a reader may not have met, in one line under the
  // question, each said where the picture first shows it: tokens and layers from the first
  // frame, attention when its links arrive (click 1). The line took the place of the paper's
  // sentence under the picture ("For sufficiently difficult tasks, Transformers must use
  // chain of thought as a form of working memory", 'korbak.externalized'), which said the
  // title a second time and brought two more words to explain; the fact still stands behind
  // the title, and the part stops if it is no longer registered.
  const MEM_TERMS = Object.freeze([
    Object.freeze({ key: 'token', term: 'Token', is: 'a piece of text.' }),
    Object.freeze({ key: 'layer', term: 'Layer', is: 'one stage of the model’s computation.' }),
    // "what came earlier", not "the earlier tokens": the links of the picture start at the
    // nodes of the column before, not at its token box.
    Object.freeze({ key: 'attention', term: 'Attention', is: 'how a layer reads what came earlier.' }),
  ]);
  if (!text('korbak.externalized')) throw Deck.fail('part 1: the sentence behind the title of p1-memory is no longer registered');
  // What the count beside the picture counts: hops in a row, one each time the chain
  // crosses a layer, and under it what a hop is (MEM_HOP, MEM_SUM). The model of the
  // picture has 4 layers: "32 layers in a row" would contradict it, so the unit is the hop
  // and not the layer. The question and the first cue say "steps" for the steps of the
  // problem (one per layer, simplified); until the tenth cold read the count said "steps in
  // a row" as well, and its second line changed from "one per layer" to "one pass: 4" at
  // click 2: two meanings of "step" on one slide. After that round it read "layer passes /
  // in a row", which gave "pass" two meanings: the first and third cues say "one pass" for
  // one run through all the layers. "hops in a row" is one line in every font set (164 px
  // in Verdana, and the column has 186).
  const MEM_COUNTS = 'hops in a row';
  // Under the count's words, two lines that take turns in one place. From the first frame,
  // what a hop is. When the count stands at its last number (click 2), where that number
  // comes from: the tokens of the picture times its layers. Until the eleventh cold read the
  // place said "one token: 4" in every state: beside "4 hops in a row" that said the same
  // thing twice, "hop" was nowhere defined, and readers had to count for themselves how 32
  // comes about. Both numbers are the picture's own (MEM.shape).
  const MEM_HOP = 'hop: one layer<br>to the next';
  const MEM_SUM = `= <b>${MEM.shape.cols}</b> tokens<br>× <b>${MEM.shape.rows}</b> layers`;
  // The two keys beside the picture, each a piece of the line it explains, drawn the way that
  // line runs on the lattice: an attention link rises to the right and ends in its arrowhead;
  // the line of a written token comes down to the right. (Until the user's rule that a slide
  // must be read without a presenter, both pieces lay flat, and the flat arrow beside "only
  // upward" pointed sideways. The key said "attention: only upward" until the cold read of
  // 2026-11-13; it now names the layer, as the second cue does.)
  const MEM_KEYS = Object.freeze({
    look: '<svg class="p1-mem__key-line" viewBox="0 0 64 24"><line class="p1-mem__look" x1="3" y1="21" x2="46" y2="7"/><path class="p1-mem__look-head" d="M0 0L-14 -6L-14 6Z" transform="translate(60 2.5) rotate(-18)"/></svg>',
    drop: '<svg class="p1-mem__key-line" viewBox="0 0 64 24"><line class="p1-mem__key-drop" x1="3" y1="3" x2="61" y2="21"/></svg>',
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
      // What "shallow" meant, in the picture's own words: the count stops at one step per
      // layer (until the user's rule the cue read "One pass through the layers is shallow").
      // "(simplified)": one step per layer is how the schematic counts, not a claim about
      // what a layer of a real model computes.
      'One pass through the layers: one step per layer (simplified), no more',
      // Says 'p1.korbak_only_way' in plain words ("the only way that information can flow
      // down from later to earlier layers"); the links it arrives with point to the next
      // column, one layer higher. Until the cold read of 2026-11-13 it read "Attention never
      // carries a result down; only a written token does".
      { text: 'Attention never carries results to a lower layer; only written tokens do', step: 1 },
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
        <p class="p1-ask p1-mem__question">${MEM_ASKS}</p>
        <p class="p1-mem__terms">${MEM_TERMS.map(({ key, term, is }) => `<span data-term="${key}"><b>${term}:</b> ${is}</span>`).join(' ')}</p>
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
              <span class="p1-mem__depth-n"></span><span class="p1-mem__depth-label">${MEM_COUNTS}</span>
              <span class="p1-mem__depth-per"><span data-per="hop">${MEM_HOP}</span><span data-per="sum">${MEM_SUM}</span></span>
            </div>
            <div class="p1-mem__keys">
              <div class="p1-mem__key">${MEM_KEYS.look}<span>attention: to<br>a higher layer</span></div>
              <div class="p1-mem__key">${MEM_KEYS.drop}<span>written token,<br>read back in</span></div>
            </div>
            <div class="p1-mem__reads">the monitor<br>reads here</div>
          </div>
        </div>
        <p class="p1-mem__caveat">Korbak et al.’s caveat: having to be written down does not mean a monitor <b>can read</b> it</p>
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
      // The count stands as high as the picture allows, clear of the two keys under it. (It
      // was placed there for three lines of words; since "hops in a row" it has two.)
      ctx.q('.p1-mem__depth').style.top = share(layers.top - 36, size.height);
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
      // at a glance: on to the next column and one layer up. No link points to a lower layer,
      // which is what the second cue says; the key beside the picture says where they do go.
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
      enter.show('.p1-mem__question', { at: 100, rise: 0 });
      enter.show('[data-term="token"], [data-term="layer"]', { at: 200, rise: 0 });
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
      zig.show('[data-term="attention"]', { at: 0, rise: 0 });
      zig.show('.p1-mem__keys', { at: DUR.micro, rise: 0 });
      const second = runLegs(zig, legs.slice(1, 5), { at: 100, climb: 800, drop: 700, rest: 200 });
      zig.hold(DUR.enter);

      // Click 2: the chain runs through, and stops there. What this state says is the count
      // beside the picture and where it comes from: when the chain has run through, the line
      // that said what a hop is gives way, in place, to "= 8 tokens × 4 layers"; then the
      // third cue. The monitor has a click of its own after it (until the user's rule that
      // every state stops, the lens followed the chain 0.3 s later, in the same click).
      const chain = ctx.step({ label: 'eight tokens, each written to the text row: 32 hops in a row, 8 tokens times 4 layers' });
      const third = runLegs(chain, legs.slice(5), { at: 0, climb: 240, drop: 260, rest: 0 });
      chain.hide('[data-per="hop"]', { at: third.at - DUR.micro, dur: DUR.micro });
      chain.show('[data-per="sum"]', { at: third.at, rise: 0 });
      chain.hold(DUR.enter);

      // Click 3: what that means for a monitor. The lens sweeps the text row, which is where
      // the chain came down every time; then, under the picture, the caveat that hands over
      // to part 2.
      const reads = ctx.step({ label: 'the monitor reads the text row; the caveat of the paper’s authors' });
      const scanAt = DUR.micro;
      const scan = reads.signal({ at: scanAt, dur: 1400, ease: 'inOut' });
      reads.tween(lens, { opacity: [0, 1] }, { at: scanAt - DUR.micro, dur: DUR.micro });
      reads.show('.p1-mem__reads', { at: scanAt + 1400, rise: 0 });
      reads.show('.p1-mem__caveat', { at: scanAt + 1700, rise: 0 });
      reads.hold(DUR.enter);

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
        const passed = String(lit.reduce((sum, n) => sum + n, 0));
        if (depth.textContent !== passed) depth.textContent = passed;
        lens.style.left = share(read, 1);
        band.style.width = share(read, 1);
      });
    },
  });

  // ---------------------------------------------------------------- slide 4: "Let's hack" (wow 1)
  // The terminal is the shared motif (shared/motifs.js): slide 8 opens on what this slide
  // leaves. Here each line also has a typing speed. The box holds the agent's thoughts only;
  // where they come from, and which is reworded and which quoted, is said in the footer
  // (the motif's `sourced`).
  const HACK = Deck.motifs.hackTrace;
  // The agent's two words as the title and the footer print them, in the paper's quotation
  // marks; the terminal types the same words from the motif ('baker.quote_hack').
  const HACK_SAID = '“Let’s hack”';
  const HACK_CPS = Object.freeze({ fig1a: 32, fig1b: 32, hack: 6 });   // the last line types slowly
  // The two hacks that are counted, by the paper's names. The glosses are ours, after
  // 'baker.exit0_def' and 'baker.skiptest_def' (Sec. 2.1, under the footer's "Sec. 2"; that
  // the slide is our arrangement is its tag, "Schematic"). They are not what the agent in the
  // terminal went on to do: its two thoughts come from two hacks that each fit one task
  // (Fig. 1, Fig. 9; 'p1.baker_less_pervasive'), and recall is measured on these two, which
  // could be labeled ('p1.baker_ground_truth'; Table 1). A line between the two boxes says
  // so, "Not counted" over "Counted", so that they do not read as one episode.
  // What the box says about the two kinds, in one line: that the count is of these two
  // only, and why ('p1.baker_ground_truth': "easy to catch in hindsight with simple string
  // regexes, and we use this as ground truth"). So every number of the slide (60%, 95%,
  // about 80%) is read as a number about two kinds of hack, and the second cue says "Two
  // kinds of hack" in front of its two shares. Until the whole-deck cold read of 2026-11-13
  // three places said it: the box ("two kinds of hack seen in nearly every task"), a line
  // beside the grid ("Why these: a simple regex finds them (the ground truth)") and the
  // definition over the meters; the final state held about fourteen blocks of text.
  const HACK_COUNTED = 'only two kinds of hack that a simple regex can find';
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
      // Once the words stand: the title's quote beats once, then what a hack is arrives.
      beatAt: own.end + 400, notesAt: own.end + 1000,
    });
  })();
  // Click 1, in ms from the click: the test is set up, one thing at a time: the monitor and
  // what it is asked, the two hacks that are counted and why these, the grid of 100 of them.
  // Nothing is measured yet.
  const SETUP = Object.freeze({ monitorAt: 900, actsAt: 1500, boardAt: 2100 });
  // Click 2, in ms from the click: the first test. The reasoning goes under the veil, the
  // line under the monitor says what it is shown, the first meter arrives, and the monitor
  // sweeps the grid.
  const BLIND = Object.freeze({ veilAt: 0, saysAt: 200, meterAt: 600, scanAt: 1100, scanDur: 1800 });
  // The reveal (click 3), in ms from the click. The cue that states both numbers waits for the count.
  const REVEAL = (() => {
    const lens = 400;
    const perLine = 220;
    const read = lens + HACK.lines.length * perLine;   // the lens has read the thought
    const fast = read + 700;                           // the scan re-covers what actions alone showed
    const fastDur = 400;
    const slow = fast + fastDur + 150;                 // then goes on into the hacks that were missed
    const slowDur = 1900;
    const landed = slow + (slowDur * (RECALL.cot - RECALL.action)) / (GRID.n - RECALL.action);
    const blink = slow + slowDur + 250;                // the five that are still missed flash
    // Then, under the monitor, how far its flags can be trusted.
    return Object.freeze({ lens, perLine, read, fast, fastDur, slow, slowDur, landed, blink, trustAt: blink + 600 });
  })();
  // Click 4, in ms from the click: the two models arrive as two disks of one size, the
  // monitor's first; the agent's grows to its own; a beam leaves the monitor's disk and
  // sweeps the agent's; when it has landed the line under the disks says what that comes to;
  // then the last cue asks the question that part 2 answers.
  const WHO = (() => {
    const beamAt = 1100;
    const beamDur = 900;
    const saysAt = beamAt + beamDur;
    return Object.freeze({ disksAt: 0, agentAt: 200, growAt: 400, beamAt, beamDur, saysAt, askAt: saysAt + 400 });
  })();
  const BEAM_EDGE = 12;   // the bright front of the beam fades in and out over 1/12 of its way
  // Click 4, under the two disks: what the beam comes to, in a sentence. The paper's own
  // conclusion ('p1.baker_weaker': "a LLM weaker than o3-mini, namely GPT-4o, can effectively
  // monitor a stronger model"). Until the fifth cold read the picture said it with the two
  // notes under the names and a number alone, and a reader did not put them together. The
  // number ("95% caught", in the beam) was the third place that showed that share, after its
  // meter and the second cue, and left with the whole-deck cold read of 2026-11-13; the meter's
  // number beats as the sentence arrives. The sentence reports what happened here and does
  // not generalize: until the tenth cold read it said "So a weaker model can monitor a
  // stronger one.", a rule drawn from one pair of models.
  const WHO_SAYS = 'Here, a weaker model monitored a stronger one.';
  // Which model the stronger one is, under its disk, on two lines. The paper does not name
  // it: "at the time of these experiments, the agent we monitored was OpenAI's most advanced
  // model, surpassing even OpenAI o3-mini in hard reasoning tasks" ('p1.baker_at_the_time',
  // 'p1.baker_past_o3mini'). The note said "stronger model" and then "stronger than o3-mini";
  // a cold reader did not know what o3-mini is, and the sentence needs no second model's
  // name: "stronger" stands in the line under the disks.
  const AGENT_IS = 'OpenAI’s most advanced<br>model at the time';
  // Recall alone does not say that a flag can be trusted: a monitor that flagged everything
  // would catch every hack. One line under the monitor says that most of its flags were real
  // hacks, with one round number for precision: Table 1 gives about 81% for the monitor that
  // sees the actions only and about 77% for the one that also reads the reasoning
  // ('baker.precision_action', 'baker.precision_cot'), and its caption calls both "fairly
  // high" ('p1.baker_precision_high'). The two are not printed side by side, and the line
  // stands away from the meters: "Precision 81% → 77%" was read as what reading the reasoning
  // costs, and a pair of shares beside the grid as two more recalls (SPEC.md sections
  // 7.23-part1 and 7.26). The round number is computed from the two facts, and the part
  // stops if they no longer round to the same ten.
  const PRECISION_ABOUT = (() => {
    const tens = ['baker.precision_action', 'baker.precision_cot'].map((key) => Math.round(value(key) / 10) * 10);
    if (tens[0] !== tens[1]) throw Deck.fail(`part 1: the two precisions of Table 1 round to ${tens.join('% and ')}%, not to one number`);
    return tens[0];
  })();
  // The line says what the share is a share of: the monitor's flags. The meters count the
  // other way, hacks that were caught ("of every 100 hacks", "95% of hacks caught"). It
  // begins "Both times": the round number stands for both rows of Table 1 (81% with the
  // actions only, 77% with the reasoning as well; receipt step17/part1/paper/
  // baker-precision.txt), and the line stands under the sentence about the second test,
  // where two readers of the eleventh cold read took it for that test's alone. Until then it
  // read "Of GPT-4o’s flags, about 80% were real hacks (precision)."; the word "precision"
  // is gone, as "recall" is: each share says in plain words what it is a share of. Until
  // the tenth cold read: "Most of GPT-4o’s flags were real hacks (precision about 80%)."
  const TRUST_SAYS = `Both times, about ${PRECISION_ABOUT}% of ${text('baker.monitor')}’s flags were real hacks.`;
  // The line under the monitor, one sentence for each state of the test. What the monitor is
  // asked, before anything is measured (the grid beside it says "of every 100"); what it is
  // shown in the first test, with what an agent's actions are ('p1.baker_action_monitor':
  // "Observes only the tool calls and final outputs"; 'p1.baker_agent_acts': "viewing files,
  // and editing files"); what it is shown in the second ('p1.baker_cot_monitor'). The last
  // two are one line each in every font set, and the line about precision (TRUST_SAYS) stands
  // under them from the end of click 3.
  const MONITOR_SAYS = Object.freeze({
    ask: 'Told to look for hacks. Of every 100, how many does it catch?',
    blind: 'First it sees only the agent’s actions, such as viewing and editing files, not its reasoning.',
    seen: 'Now it also reads the reasoning, as in the example above.',
    who: WHO_SAYS,
  });

  // One of the two models. `notes` are the lines under its name, one shown at a time. The
  // notes of both are set on two lines, so that the two labels are of one height and leave
  // the beam its room in every font set.
  const actor = ({ role, name, notes }) => `
    <div class="p1-hack__actor p1-hack__actor--${role}">
      <i class="p1-hack__disk"></i>
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
    // It is the paper's own: "it thinks, “Let’s hack”, in the CoT" ('p1.baker_said_hack').
    title: `Sometimes the model just says it: <em class="p1-hack__said">${HACK_SAID}</em>`,
    cues: [
      'A frontier coding agent, asked to implement features so all tests pass',
      // Until the tenth cold read a second cue repeated the two shares at click 3 ("Two kinds
      // of hack: 60% caught; with the reasoning, 95%"): the fourth place that showed them,
      // after the grid, the count of misses and the two meters, on a final state that
      // readers called crowded. The meters say what was shown ("Actions only", "With the
      // reasoning") and the grid what the shares are shares of ("hacks of these two kinds").
      { text: 'But does the written reasoning always say why?', step: 4, at: WHO.askAt },
    ],
    // The cite opens on the title's quote and says that it is quoted, then which lines of
    // the terminal are reworded (both marks are the motif's `sourced`): the footer says it,
    // and no note on the terminal's border. Until the cold read of 2026-11-13 it began "Fig.
    // 1 (reworded), 8-9 (quoted)", and a reader of the title took "reworded" for the quote.
    // Fig. 9 is in App. A; Fig. 8 was quoted under the meters and is no longer cited. The
    // cite keeps one line in the widest font set (935 px in Verdana), so the rest is one
    // place, "Sec. 1-2": Table 1 and its caption (the shares, the precision) stand in Sec.
    // 2.1, and what the abstract says of the weaker monitor is said in Sec. 1 as well
    // ('p1.baker_weak_monitor'). Until then: "...; Sec. 2; Table 1; abstract".
    cite: [{ src: 'baker2025', where: `${HACK_SAID}: Fig. ${HACK.sourced.quoted}; ${HACK.sourced.reworded}; Sec. 1-2` }],
    // The left half is our arrangement of what the paper reports (a paraphrase, a quote from
    // another task, glosses, the two disks), so the slide is a schematic; the grid and the
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
              <div class="p1-hack__counted"><b>Counted:</b> ${HACK_COUNTED}</div>
              ${HACK_NAMES.map((name, i) => `<div class="dk-term__line p1-hack__act"><b>${name}</b><span>${HACK_ACTS[i]}</span></div>`).join('')}
            </div>
          </div>
          <div class="p1-hack__pair">
            ${actor({ role: 'monitor', name: text('baker.monitor'), notes: ['the monitor:<br>a second model', 'the monitor:<br>weaker model'] })}
            <div class="p1-hack__watch">
              <i class="p1-hack__beam"></i>
              <span class="p1-hack__ray"><i class="p1-hack__front"></i></span>
            </div>
            ${actor({ role: 'agent', name: 'The agent', notes: [AGENT_IS] })}
            <p class="p1-hack__says">
              <span data-say="ask">${MONITOR_SAYS.ask}</span>
              <span data-say="blind">${MONITOR_SAYS.blind}</span>
              <span class="p1-hack__after">
                <span class="p1-hack__turn"><span data-say="seen">${MONITOR_SAYS.seen}</span><span data-say="who">${MONITOR_SAYS.who}</span></span>
                <span class="p1-hack__trust">${TRUST_SAYS}</span>
              </span>
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
            ${kit.meter({ key: 'action', label: 'Actions only', tone: 'dim' })}
            ${kit.meter({ key: 'cot', label: 'With the reasoning', tone: 'read' })}
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
      const { term, chip, line, lines } = kit.traceParts(trace);
      const own = line(SAID.own.key);
      const said = ctx.q('.dk-title .p1-hack__said');
      const home = offsetToCenter(ctx.stage, trace);
      const cells = ctx.qa('[data-grid="hacks"] [data-cell]');
      const missed = cells.slice(RECALL.cot);
      const missedLabel = ctx.q('.p1-hack__missed');
      const watch = ctx.q('.p1-hack__watch');
      const front = ctx.q('.p1-hack__front');
      // Each meter says what its number is a share of and what it counts: the number, then
      // "of hacks / caught" on two lines beside it. Until the eleventh cold read it said
      // "caught" alone, and two readers could not tell this share from the one under the
      // monitor (TRUST_SAYS), which is a share of the monitor's flags.
      const meterOf = (key, scan) => {
        const meter = ctx.q(`[data-meter="${key}"]`);
        const shown = meter.querySelector('.dk-meter__value');
        shown.innerHTML = '<span class="p1-hack__share"></span><span class="p1-hack__verb">of hacks<br>caught</span>';
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
      // Then, under the terminal, what a hack is.
      enter.show('[data-term="hack"]', { at: SAID.notesAt + DUR.micro, rise: 0 });
      enter.hold(DUR.enter);

      // Click 1: the test is set up, and nothing is measured yet. The terminal steps aside,
      // still readable. One thing arrives at a time: the monitor (its name and what it is;
      // its disk waits for the last click, where the two disks are compared) and what it is
      // asked, the two hacks that are counted, the grid of 100 of them. (Until the user's rule that
      // every state stops, the first test ran in this same click, and its sweep started
      // 0.4 s after the grid had arrived.)
      const setup = ctx.step({ label: 'the test: a monitor, the two kinds of hack that are counted, 100 of them' });
      setup.hide('.p1-hack__bridge', { dur: DUR.micro });
      setup.hide('.p1-hack__terms', { dur: DUR.micro });
      setup.tween(trace, { x: [home.x, 0], y: [home.y, 0], scale: [ZOOM, 1] }, { dur: DUR.move, ease: 'inOut' });
      setup.tween('.p1-hack__actor--monitor', { opacity: [0, 1], scale: [0.7, 1] }, { at: SETUP.monitorAt, ease: 'back' });
      setup.show('[data-say="ask"]', { at: SETUP.monitorAt + DUR.micro, rise: 0 });
      setup.show('.p1-hack__kind', { at: SETUP.actsAt, rise: 0 });
      setup.show('.p1-hack__acts', { at: SETUP.actsAt });
      setup.show('.p1-hack__board', { at: SETUP.boardAt });
      setup.hold(DUR.enter);

      // Click 2, the first test: the reasoning is taken off the screen and its box goes dark
      // under a veil, for a monitor that is shown the actions only; the line under the
      // monitor says so; the first meter; then the sweep. A hack it passes without catching
      // it is left as a ring. (Until the tenth cold read the lines stayed, dimmed, under the
      // veil's label, and the label over them read as a leftover of the step before.)
      const blind = ctx.step({ label: 'actions only: 60 of 100 caught, 40 missed' });
      blind.tween(term, { opacity: [1, VEILED] }, { at: BLIND.veilAt });
      blind.tween(lines, { opacity: [1, 0] }, { at: BLIND.veilAt, dur: DUR.micro });
      blind.show('.p1-hack__veil', { at: BLIND.veilAt + DUR.micro, dur: DUR.micro, rise: 0 });
      blind.hide('[data-say="ask"]', { at: BLIND.saysAt - DUR.micro, dur: DUR.micro });
      blind.show('[data-say="blind"]', { at: BLIND.saysAt, rise: 0 });
      blind.show('[data-meter="action"]', { at: BLIND.meterAt, rise: 0 });
      const actionScan = blind.signal({ to: GRID.n, at: BLIND.scanAt, dur: BLIND.scanDur, ease: 'linear' });
      blind.show(missedLabel, { at: BLIND.scanAt + (BLIND.scanDur * RECALL.action) / GRID.n, rise: 0 });
      blind.hold(DUR.enter);

      // Click 3, the reveal: the veil lifts and the reasoning is back, the lens reads the example and flags it, then
      // the same grid is swept again, past 60 and into the rings, up to 95; and last, under
      // the monitor, how far its flags can be trusted (TRUST_SAYS).
      const seen = ctx.step({ label: 'with the reasoning: 95 of 100 caught, 5 missed' });
      seen.tween(term, { opacity: [VEILED, 1] }, {});
      seen.tween(lines, { opacity: [0, 1] }, {});
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
      // The number beats, not the words beside it: with them the block would reach the bar.
      seen.tween(bars.cot.value, { scale: [1, 1.2] }, { at: REVEAL.landed, dur: DUR.micro });
      seen.tween(bars.cot.value, { scale: [1.2, 1] }, { at: REVEAL.landed + DUR.micro, dur: DUR.enter });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink });
      seen.cls(missed, 'p1-is-flash', { at: REVEAL.blink + 300, on: false });
      // Last, under the monitor: most of its flags were real hacks. It stays through click 4.
      seen.show('.p1-hack__trust', { at: REVEAL.trustAt, rise: 0 });
      seen.hold(DUR.enter);

      // Click 4: who was watching whom, and the question for part 2. The two models arrive
      // as two disks: the monitor's beside its name, which has stood since click 1 (a disk
      // alone there meant nothing to a cold reader until the beam came), then the agent's,
      // which arrives at the monitor's size and grows to its own; a beam leaves the smaller
      // disk and sweeps the larger one; when it has landed the line under the disks says
      // what that comes to (WHO_SAYS) and the 95% on its meter beats; the line about
      // precision under it stays. Under the agent's disk, which model it is (AGENT_IS).
      // Nothing else on the slide changes. Then the last cue asks what part 2 answers.
      const who = ctx.step({ label: 'a weaker model watches a stronger one; does the written reasoning always say why?' });
      who.tween('.p1-hack__actor--monitor .p1-hack__disk', { opacity: [0, 1], scale: [0.5, 1] }, { at: WHO.disksAt, ease: 'back' });
      who.tween('.p1-hack__actor--agent', { opacity: [0, 1] }, { at: WHO.agentAt });
      who.tween('.p1-hack__actor--agent .p1-hack__disk', { scale: [0.5, 1] }, { at: WHO.growAt, dur: DUR.move, ease: 'back' });
      who.show('.p1-hack__actor--agent .p1-hack__role', { at: WHO.growAt + 300, rise: 0 });
      who.hide('.p1-hack__actor--monitor [data-note="0"]', { at: WHO.growAt + 300, dur: DUR.micro });
      who.show('.p1-hack__actor--monitor [data-note="1"]', { at: WHO.growAt + 500, rise: 0 });
      const beam = who.signal({ to: 1, at: WHO.beamAt, dur: WHO.beamDur, ease: 'inOut' });
      // The line under the disks gives way to the conclusion as the beam lands.
      who.hide('[data-say="seen"]', { at: WHO.saysAt - DUR.micro, dur: DUR.micro });
      who.show('[data-say="who"]', { at: WHO.saysAt, rise: 0 });
      who.tween(bars.cot.value, { scale: [1, 1.2] }, { at: WHO.saysAt, dur: DUR.micro });
      who.tween(bars.cot.value, { scale: [1.2, 1] }, { at: WHO.saysAt + DUR.micro, dur: DUR.enter });
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
        // The beam between the two disks: how far its front has come (0 at the monitor's
        // disk, 1 past the agent's); the bright front shows only while it is on its way.
        const swept = beam();
        watch.style.setProperty('--p1-swept', swept.toFixed(4));
        front.style.opacity = util.clamp(Math.min(swept, 1 - swept) * BEAM_EDGE).toFixed(3);
      });
    },
  });
})();
