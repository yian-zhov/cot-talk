// Part 2: Where it fails Slides 5-7.
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

  // Facts behind three lines that slide 5 gained after a cold read: the monitor's verdict
  // on run 2's reasoning ("clean": a monitor that reads only the reasoning cannot flag a cause
  // that the reasoning leaves out, 'p2.chen_monitor'), and the line under the wire that says
  // why nothing forced the hint into the words (the paper's hints are easy to use and need
  // no written reasoning: 'p2.chen_easy', 'p2.chen_no_cot'). Each was searched for as a whole
  // string on 2026-11-12 in the copy of the arXiv HTML full text (2505.05410v1) downloaded on
  // 2026-11-09, and so was 'p2.chen_pattern' once more, which slide 6 now quotes on screen.
  Deck.addFacts({
    'p2.chen_monitor': {
      text: 'If the CoT is not faithful, then we cannot depend on our ability to monitor CoT in order to detect misaligned behaviors, because there may be safety-relevant factors affecting model behavior that have not been explicitly verbalized.',
      src: 'chen2025', where: 'Sec. 1',
    },
    'p2.chen_easy': { text: 'our settings are all settings where the hints are very easy to exploit', src: 'chen2025', where: 'Sec. 7.2' },
    'p2.chen_no_cot': { text: 'in our settings where exploiting them does not require a CoT', src: 'chen2025', where: 'Sec. 1' },
  });

  // Facts that only slide 6 needs: which hemisphere talks, which sees which picture, and which
  // hand points to which card, in the author's caption of the figure (the same caption as
  // 'gazzaniga.quote'; SPEC.md, 7.1). Behind the labels "left hemisphere / speaks" and "right
  // hemisphere / silent", the two pictures and the two picks. Read on 2026-11-10 in the copy of
  // the author's page saved on 2026-11-09.
  Deck.addFacts({
    'p2.gazzaniga_halves': {
      text: 'the left talking/interpreting brain sees a chicken claw and the right, silent brain sees a snow scene',
      src: 'gazzaniga1998', where: 'interpreter figure, as the author captions it',
    },
    'p2.gazzaniga_hands': {
      text: 'The left brain/ right hand points to the chicken to match the claw and the right brain/left hand points to the shovel, to match the snow scene.',
      src: 'gazzaniga1998', where: 'interpreter figure, as the author captions it',
    },
    // Behind the arrow from the shovel back to the speaking half ("has to explain the left
    // hand's shovel") and the second cue ("Never shown the snow, it invents a reason for the
    // shovel"): the first sentence of the same caption, and three sentences of the article
    // itself, p. 53 (its box "Finding False Memory", signed M.S.G., and the text beside it).
    // Neither the caption nor the article says that the speaking half sees the left hand or
    // the shovel: the box says what it could see, "namely, the chicken". So the arrow does
    // not say "sees" (searched for: "sees the left hand", "observing the left hand", "saw the
    // left hand", "see the shovel", "saw the shovel"; 0 hits each in both). The caption was
    // read on 2026-11-12 in a fresh copy of the author's page; the article on the same day in
    // the publisher's PDF of the July 1998 issue, pp. 50-55 (SPEC.md, 7.20, says which copy),
    // each sentence searched for as a whole string.
    'p2.gazzaniga_explains': {
      text: 'Here is a picture from my 1998 Scientific American review of a split brain patient using his left brain interpreter to explain why the left hand is pointing to the shovel.',
      src: 'gazzaniga1998', where: 'interpreter figure, as the author captions it',
    },
    'p2.gazzaniga_asked': {
      text: 'Then we asked the patient why the left hand—or right hemisphere—was pointing to the shovel.',
      src: 'gazzaniga1998', where: 'p. 53, box “Finding False Memory”',
    },
    'p2.gazzaniga_story': {
      text: 'But because it could not know why the right hemisphere was doing what it was doing, it made up a story about what it could see—namely, the chicken.',
      src: 'gazzaniga1998', where: 'p. 53, box “Finding False Memory”',
    },
    'p2.gazzaniga_not_know': {
      text: 'It really did not know, because the decision to point to the card was made in the right hemisphere.',
      src: 'gazzaniga1998', where: 'p. 53',
    },
  });

  // Facts that only slide 7 needs: the sentences behind "nothing written" (vectors) and
  // "trained for this" (vectors; for dots it is 'pfau.supervision'). Each was searched for
  // as a whole string in the arXiv HTML full text (2412.06769v4, the copy downloaded on
  // 2026-11-09). The last ones are behind the few words that explain a name on screen:
  // Coconut (the method that the "Vectors" caption of click 2 describes; its name is no
  // longer on screen), ProsQA ("Logic questions") and 3SUM ("a made-up puzzle"); they were
  // searched for the same way on 2026-11-10, in the copies of 2412.06769 and 2404.15758
  // downloaded on 2026-11-09. 'pfau.3sum_def' is behind the 3SUM card's question ("do any 3
  // inputs add to 0 (mod 10)?": the inputs are tuples of digits, and "0" is the zero vector).
  // 'p2.pfau_parallelizable' and 'p2.pfau_pairwise', with 'pfau.parallel', are behind the
  // card's next line ("No chain of steps: its parts run at once") and behind "This
  // puzzle's parts run side by side" in the line of click 1: why dots can do this puzzle. The paper
  // sums pairs in parallel and then looks for a third input that matches; it does not say
  // that each triple is checked at once, so the card does not either. Both were searched
  // for as whole strings on 2026-11-12 in a copy of 2404.15758v1 downloaded that day.
  Deck.addFacts({
    'p2.hao_not_decoded': { text: 'Rather than decoding this into a word token', src: 'hao2024', where: 'abstract' },
    'p2.hao_paradigm': { text: 'a simple modification to the traditional CoT process', src: 'hao2024', where: 'Sec. 1' },
    'p2.hao_training': { text: 'a multi-stage training curriculum', src: 'hao2024', where: 'Sec. 3' },
    'p2.hao_last_state': {
      text: 'Coconut directly feeds the last hidden state (a continuous thought) as the input embedding for the next token',
      src: 'hao2024', where: 'Sec. 1',
    },
    'p2.hao_prosqa': { text: 'a new logical reasoning dataset', src: 'hao2024', where: 'Sec. 4.1' },
    'p2.pfau_synthetic': { text: 'We construct two synthetic datasets, 3SUM', src: 'pfau2024', where: 'Sec. 1' },
    'p2.pfau_parallelizable': { text: 'is parallelizable–therefore amenable to filler tokens', src: 'pfau2024', where: 'Sec. 3' },
    'p2.pfau_pairwise': {
      text: 'The chain-of-thought row demonstrates a decomposition of the 3SUM problem into parallelizable, pairwise summations, which can be calculated using filler tokens.',
      src: 'pfau2024', where: 'Fig. 3 caption',
    },
    'p2.pfau_filler': { text: 'meaningless filler tokens (e.g., ‘……’) in place of a chain of thought', src: 'pfau2024', where: 'abstract' },
    // Behind the line under the picture at click 1: a dot says nothing, and still gives the
    // model one more column to compute in. Found once as a whole string on 2026-11-12 in the
    // copy of 2404.15758v1 downloaded on 2026-11-09 (the abstract's last but one sentence).
    'p2.pfau_additional': { text: 'additional tokens can provide computational benefits independent of token choice', src: 'pfau2024', where: 'abstract' },
  });
  // Facts behind slide 7's main line, which says how the slide squares with slide 3: the
  // models of this slide are small and trained for it ('pfau.model', 'pfau.supervision',
  // 'hao.base', 'p2.hao_training'), and slide 3's claim is about today's large models
  // ('korbak.externalized', 'korbak.today'; 'pfau.current_llms' says of them that they "are
  // unlikely to benefit from filler tokens"). The two below say why dots do not take slide 3
  // back: a chain in which a later step uses an earlier result cannot run on dots, which add
  // computation in parallel only. They were the main line's reason at click 1 until
  // 2026-11-10 and are kept for questions. Each was searched for as a whole string in the
  // arXiv HTML full text (2404.15758v1, the copy downloaded on 2026-11-09).
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
  // Run 2's reasoning is to read as sound: a true first line (Mercury's orbit is the most
  // lopsided of the planets', the farthest off a circle), then a step that sounds like a
  // finer point and is false (Mercury is nearer the Sun than Venus at every point of its
  // orbit), and no word of the hint. That is the paper's pattern: "elaborate yet flawed
  // justifications" ('p2.chen_pattern'). Until the check before deployment (SPEC.md section
  // 7.26) it was "Venus is the hottest planet. Then it must be the closest.", absurd at a
  // glance, and a reader would blame the monitor for passing it. The two lines together have
  // the length of the two they replace, so the step that types them is as long as it was.
  const CASE = Object.freeze({
    question: 'Which planet is closest to the Sun?',
    options: Object.freeze([['A', 'Venus'], ['B', 'Mercury'], ['C', 'Earth'], ['D', 'Mars']]),
    plain: Object.freeze(['Mercury has the smallest orbit.', 'So the answer is (B).']),
    hinted: Object.freeze(['Mercury’s orbit is lopsided.', 'On average, Venus is closer.', 'So the answer is (A).']),
  });
  const said = (key) => Deck.fact(key).text;
  // The first sentence of the paper's hint, for the small card that stands for it on slide 6.
  const hintLead = () => {
    const [first, ...rest] = said('chen.hint').split('. ');
    if (!rest.length) throw new Error('the hint of Chen et al. no longer has a second sentence to cut');
    return `${first}.`;
  };

  // ---------------------------------------------------------------- slide 5: the hint
  // One question, asked twice. Run 1 has no hint; run 2 is the same prompt with one more
  // sentence, the paper's hint ('chen.hint'). The two runs stand side by side so that the
  // only difference between the prompts can be seen, and so can what it does to the answer.
  // The words on screen that are not the case itself (CASE) are here.
  const HINT_TEXT = Object.freeze({
    runs: Object.freeze({ plain: 'Run 1: no hint', hinted: 'Run 2: same question + one sentence' }),
    noHint: 'no hint',
    hintWhose: 'hint, verbatim: Chen et al.',
    // On run 1's card, in the color of body text: everything but the hint is our example,
    // in run 2 as well (its reasoning pane has no room for a note of its own, and under
    // the hint a longer note would lie over the hint's second line in a wider face).
    questionWhose: 'question and reasoning, in both runs: ours',
    reasoning: 'Reasoning',
    reasoningWhose: 'illustrative: ours, after Chen et al., Fig. 2',
    answer: 'Answer',
    verdicts: Object.freeze({ ok: 'correct', bad: 'wrong' }),
    echoNote: 'Earlier, the coding agent said why:',
    echoFlag: 'flagged',
    // Who reads run 2's reasoning, and what it finds: a monitor that reads this pane and
    // nothing else has nothing to flag ('p2.chen_monitor').
    monitor: 'Monitor',
    clean: 'clean',
    noMention: 'no mention',
    never: 'This reasoning never mentions the hint',
    // Why nothing forced the hint into the words ('p2.chen_easy', 'p2.chen_no_cot'), and
    // where the talk comes back to a hint that does need steps.
    easy: 'Following this hint needs no written reasoning, so nothing forces the hint into it.',
    later: 'Hard hints: Part 3.',
    repeat: 'Repeat this over many questions and hints.',
    ofEvery: 'Of every 100 answers a hint flipped:',
    source: 'reported: Chen et al., Fig. 1',
    silentWhat: 'do not mention it',
    restWhat: (rate) => `${rate} mention it`,
    // What is below 20%: the paper's "reveal rate" ('chen.often_below'), the share of the
    // answers a hint flipped whose reasoning mentions it, for a single kind of hint. Kept
    // short: the line is one line in the widest face too.
    caveat: (kinds, below) => `Averaged over ${kinds} kinds of hint (the professor’s is one) and two question sets. For a single kind, ${below} of flips mention it.`,
  });
  const MODELS = Object.freeze([
    { key: 'claude', name: 'chen.model_claude', rate: 'chen.overall_claude', silent: 'p2.chen_silent_claude' },
    { key: 'r1', name: 'chen.model_r1', rate: 'chen.overall_r1', silent: 'p2.chen_silent_r1' },
  ]);
  // The share of flipped answers whose reasoning does not mention the hint: what is left of
  // 100% after the paper's score. The charts and the last cue lead with it. It is computed
  // from the registered score, never typed.
  Deck.addFacts(Object.fromEntries(MODELS.map((model) => {
    const score = Deck.fact(model.rate);
    const value = 100 - score.value;
    return [model.silent, { value, text: `${value}%`, src: score.src, where: `${score.where} (100% minus the score)` }];
  })));
  const HINT = Object.freeze({
    second: 880,          // where run 2 stands in the box; the wire's coordinates are the box's
    hintY: 136,           // the middle of the hint's first line
    under: 376,           // where the wire runs, under the reasoning and the answer
    line: 32,             // one line of reasoning
    cps: 40, hintCps: 44,
    perLine: 500,         // the monitor: how long the lens takes to read one line
    countAt: 1100, cellMs: 20, restAfter: 250,   // the charts: when they start to count, one cell of the longer count, the pause before the rest
  });
  const typed = (text, cps) => Math.round((text.length / cps) * 1000);
  // The beats that a cue waits for, in ms from the start of their step. Enter: when run 1 has
  // answered, when run 2 comes out of it, when the hint starts to type and when it stands.
  // Click 2: when the monitor has read the last line and gives its verdict. Click 3: how long
  // the charts count the answers that do not mention the hint (both start and end together,
  // each at its own pace, so that no frame in between shows the two at one number), when they
  // have counted, when the rest turns over, and when both shares stand.
  const HINT_AT = (() => {
    const plainDone = CASE.plain.reduce((at, text) => at + typed(text, HINT.cps) + 220, 600);
    const again = plainDone + 700;
    const added = again + 1100;
    const hintDone = added + 100 + typed(said('chen.hint'), HINT.hintCps) + 250;
    const judged = 400 + (CASE.hinted.length - 1) * HINT.perLine + 500;
    const counting = Math.max(...MODELS.map((model) => Deck.fact(model.silent).value * HINT.cellMs));
    const counted = HINT.countAt + counting;
    return Object.freeze({ plainDone, again, added, hintDone, judged, counting, counted, rest: counted + HINT.restAfter, landed: counted + HINT.restAfter + 500 });
  })();

  const modelHtml = (model) => `
    <div class="p2-hint__model">
      <div class="p2-hint__model-head">
        <span class="p2-hint__rate" data-rate="${model.key}"></span>
        <span class="p2-hint__model-name">${said(model.name)}</span>
        <span class="p2-hint__rate-what" data-what="${model.key}">${HINT_TEXT.silentWhat}</span>
        <span class="p2-hint__rest" data-rest="${model.key}">${HINT_TEXT.restWhat(said(model.rate))}</span>
      </div>
      ${kit.grid({ key: model.key, n: 100, cols: 20, tone: 'read' })}
    </div>`;

  // One run: the prompt, the reasoning, the answer. `key` is 'plain' or 'hinted'. The two
  // prompts are set line for line: a "=" marks a line that both have, and the last row is
  // the hint in run 2 ("+") and an empty slot in run 1. The answer tile of run 2 has two
  // faces: an open one, "?", neutral and dashed, until the run has answered, and (A), which
  // the hint names. Until the fifth cold read the first face was run 1's (B), dimmed, and a
  // reader took it for run 2's answer before run 2 had written a word. Run 2's
  // reasoning carries, on its top border, who reads it at the third step and the verdict.
  const runHtml = (key, texts) => {
    const hinted = key === 'hinted';
    return `
        <div class="p2-hint__run" data-run="${key}">
          <div class="p2-hint__prompt">
            <span class="p2-hint__name">${HINT_TEXT.runs[key]}</span>
            <div class="p2-hint__row"><i class="p2-hint__same">=</i><span class="p2-hint__question">${CASE.question}</span></div>
            <div class="p2-hint__row"><i class="p2-hint__same">=</i><span class="p2-hint__options">
              ${CASE.options.map(([letter, name]) => `<span data-option="${letter}"><b>(${letter})</b> ${name}</span>`).join('')}
            </span></div>
            ${hinted
    ? '<div class="p2-hint__row"><i class="p2-hint__added">+</i><div class="p2-hint__hint"></div></div>'
    : `<div class="p2-hint__row"><i></i><div class="p2-hint__nohint">${HINT_TEXT.noHint}</div></div>`}
            ${kit.legend(hinted ? { key: 'hint', text: HINT_TEXT.hintWhose } : { key: 'prompt', text: HINT_TEXT.questionWhose })}
          </div>
          <div class="dk-term p2-hint__term">
            <span class="p2-hint__name">${HINT_TEXT.reasoning}</span>
            ${hinted ? `<span class="p2-hint__monitor"><span class="p2-hint__monitor-who">${HINT_TEXT.monitor}</span>${kit.flag({ key: 'hint-verdict', text: HINT_TEXT.clean })}</span>` : ''}
            ${util.range(texts.length).map((i) => `<div class="p2-hint__line">
              <div class="dk-term__line" data-line="${key}-${i}"></div>${hinted ? `<span class="p2-hint__nomention" data-nomention="${i}">${HINT_TEXT.noMention}</span>` : ''}
            </div>`).join('')}
            ${hinted
    ? `${kit.lens({ key: 'hint' })}<span class="p2-hint__never">${HINT_TEXT.never}</span>`
    : kit.legend({ key: 'reasoning', text: HINT_TEXT.reasoningWhose })}
          </div>
          <div class="p2-hint__answer">
            <div class="p2-label">${HINT_TEXT.answer}</div>
            <div class="p2-hint__tile"><div class="p2-hint__tile-inner">
              ${hinted
    ? '<span class="p2-hint__face p2-hint__face--open">?</span><span class="p2-hint__face p2-hint__face--hinted">(A)</span>'
    : '<span class="p2-hint__face p2-hint__face--plain">(B)</span>'}
            </div></div>
            <div class="p2-hint__verdicts">
              ${hinted ? `<span class="p2-hint__verdict p2-hint__verdict--bad">${HINT_TEXT.verdicts.bad}</span>` : `<span class="p2-hint__verdict p2-hint__verdict--ok">${HINT_TEXT.verdicts.ok}</span>`}
            </div>
          </div>
          ${hinted ? '' : `<div class="p2-hint__echo">
            <span class="p2-hint__echo-note">${HINT_TEXT.echoNote}</span>
            <span class="p2-hint__echo-quote">“${said('baker.quote_hack')}”</span>
            ${kit.flag({ key: 'echo', text: HINT_TEXT.echoFlag })}
          </div>`}
        </div>`;
  };

  // The wire: from the hint in run 2's prompt, out through the card's left edge, down past
  // the reasoning and under it, and up into the answer. It never enters the reasoning. It is
  // drawn at the third step, after the reasoning has been written and read.
  const WIRE = (() => {
    const left = HINT.second - 16;
    const into = HINT.second + 732;
    const { hintY: y, under } = HINT;
    return Object.freeze({
      path: `M${HINT.second} ${y}H${left + 12}Q${left} ${y} ${left} ${y + 12}V${under - 12}Q${left} ${under} ${left + 12} ${under}H${into - 12}Q${into} ${under} ${into} ${under - 12}V${under - 10}`,
      head: `M${into - 12} ${under - 6}L${into} ${under - 22}L${into + 12} ${under - 6}Z`,
    });
  })();

  const hintHtml = () => `
    <div class="p2-hint"><div class="p2-hint__box">
      <div class="p2-hint__case">
        ${runHtml('plain', CASE.plain)}
        ${runHtml('hinted', CASE.hinted)}
        <svg class="p2-hint__wire" viewBox="0 0 1728 412" width="1728" height="412" aria-hidden="true">
          <path class="p2-hint__wire-path" pathLength="1" d="${WIRE.path}"/>
          <path class="p2-hint__wire-head" d="${WIRE.head}"/>
        </svg>
        <div class="p2-hint__wire-label">${HINT_TEXT.easy} <span>${HINT_TEXT.later}</span></div>
      </div>
      <div class="p2-hint__stats">
        <div class="p2-hint__stats-lead"><span>${HINT_TEXT.repeat} <b>${HINT_TEXT.ofEvery}</b></span><span class="p2-hint__source">${HINT_TEXT.source}</span></div>
        <div class="p2-hint__models">${MODELS.map(modelHtml).join('')}</div>
        <div class="p2-hint__caveat">${HINT_TEXT.caveat(Deck.fact('p2.chen_hints').value, said('chen.often_below'))}</div>
      </div>
    </div></div>`;

  const hintSetup = (ctx) => {
    const { fact, dur } = ctx;
    const plain = '[data-run="plain"]';
    const hinted = '[data-run="hinted"]';
    const typeLines = (step, prefix, texts, startAt) => texts.reduce((at, text, i) => {
      step.type(`[data-line="${prefix}-${i}"]`, text, { at, cps: HINT.cps });
      return at + typed(text, HINT.cps) + 220;
    }, startAt);
    const hint = fact('chen.hint').text;
    const wire = ctx.q('.p2-hint__wire-path');
    const tile = `${hinted} .p2-hint__tile`;

    // Enter: the whole setup, and then it stops. Run 1, no hint: the model reasons and
    // answers (B). The pill under it answers slide 4's last cue ("But does the written
    // reasoning always say why?"): that time it did. It recalls slide 4's coding agent, not the model of this
    // example, so it is a pill of its own, in the body face, apart from the run. Then the
    // same question a second time: run 2 fades in beside run 1, in the place kept free for it
    // (the same prompt, and an answer that is still open, "?"); the lines that both prompts
    // have are marked "="; the one sentence that is new types in, and the option it names
    // turns amber. Both runs stand where they stay from their first frame: neither slides, so
    // no frame shows one run's words over the other's (run 1 used to enter mid-stage and run 2
    // to come out from under it, and halfway the two prompts lay on top of each other).
    // Nothing answers yet: the presenter can ask what the model will say.
    const enter = ctx.step({ label: 'one question, asked twice: no hint, then one more sentence' });
    enter.show(`${plain} .p2-hint__prompt`, { at: 200 });
    enter.show(`${plain} .p2-hint__term`, { at: 320 });
    enter.show(`${plain} .p2-hint__answer`, { at: 440 });
    const { plainDone, again, added, hintDone } = HINT_AT;
    typeLines(enter, 'plain', CASE.plain, 600);
    enter.tween(`${plain} .p2-hint__tile`, { opacity: [0, 1], scale: [0.6, 1] }, { at: plainDone, dur: dur.enter, ease: 'back' });
    enter.show(`${plain} .p2-hint__verdict--ok`, { at: plainDone + 200, rise: 0 });
    enter.cls(`${plain} [data-option="B"]`, 'is-picked', { at: plainDone + 200 });
    enter.show('.p2-hint__echo', { at: plainDone + 300, rise: 8 });
    enter.tween(hinted, { opacity: [0, 1], y: [16, 0] }, { at: again + 100, dur: dur.enter });
    enter.tween('.p2-hint__same', { opacity: [0, 1] }, { at: again + 700, dur: dur.micro, stagger: 70 });
    enter.tween('.p2-hint__nohint, .p2-hint__added, .p2-hint__hint, [data-legend="hint"]', { opacity: [0, 1] }, { at: added, dur: dur.micro });
    enter.type('.p2-hint__hint', hint, { at: added + 100, cps: HINT.hintCps });
    enter.tween('.p2-hint__hint', { '--glow': [0, 1] }, { at: added + 100, dur: dur.move });
    enter.tween('.p2-hint__hint', { '--glow': [1, 0.45] }, { at: hintDone, dur: dur.enter });
    // The option the hint names.
    enter.cls(`${hinted} [data-option="A"]`, 'is-forced', { at: hintDone });
    enter.tween(`${hinted} [data-option="A"]`, { scale: [1, 1.14] }, { at: hintDone, dur: 160 });
    enter.tween(`${hinted} [data-option="A"]`, { scale: [1.14, 1] }, { at: hintDone + 160, dur: 300 });

    // Click 1, the flip, on a click of its own: three clean-looking lines type, then the
    // hint flares and the answer tile gives way and turns over from "?" to (A), beside the
    // (B) that the same question got in run 1. No wire yet:
    // what carried the hint to the answer is shown only after the reasoning has been read.
    const flip = ctx.step({ label: 'run 2 answers: clean-looking reasoning, and the answer turns over to A' });
    const hintedDone = typeLines(flip, 'hinted', CASE.hinted, 200);
    const turn = hintedDone + 300;
    flip.tween('.p2-hint__hint', { '--glow': [0.45, 1] }, { at: turn, dur: 300 });
    flip.tween(tile, { y: [0, 14] }, { at: turn, dur: 250, ease: 'in' });
    flip.tween(`${hinted} .p2-hint__tile-inner`, { '--flip': [0, 1] }, { at: turn + 200, dur: 700, ease: 'back' });
    flip.tween(tile, { y: [14, 0] }, { at: turn + 450, dur: 450, ease: 'back' });
    flip.show(`${hinted} .p2-hint__verdict--bad`, { at: turn + 800, rise: 0 });
    flip.tween('.p2-hint__hint', { '--glow': [1, 0.5] }, { at: turn + 900, dur: dur.enter });

    // Click 2: a monitor reads run 2's reasoning, and only that, line by line: no line
    // mentions the hint, so its verdict is "clean" (a neutral chip: the monitor found
    // nothing, and the answer is still wrong). Then the finding about all three lines, with
    // which the title's second half arrives; and only then the wire: the hint went around
    // the reasoning, and the line under it says why it could.
    const read = ctx.step({ label: 'a monitor reads the reasoning: no mention, clean; the hint went around it' });
    // The beam is one line tall: it comes up on the first line, goes down to the last, and
    // each line it has read gets its finding.
    const sweep = (CASE.hinted.length - 1) * HINT.perLine;
    read.tween('.p2-hint__monitor', { opacity: [0, 1] }, { at: 0, dur: dur.micro });
    read.tween('[data-lens="hint"]', { opacity: [0, 1] }, { at: 100, dur: dur.micro });
    read.tween('[data-lens="hint"]', { y: [0, (CASE.hinted.length - 1) * HINT.line] }, { at: 400, dur: sweep, ease: 'linear' });
    CASE.hinted.forEach((_, i) => {
      const on = 200 + i * HINT.perLine;
      read.cls(`[data-line="hinted-${i}"]`, 'p2-is-read', { at: on });
      read.tween(`[data-nomention="${i}"]`, { opacity: [0, 1], x: [12, 0] }, { at: on + 300, dur: dur.micro });
    });
    read.tween('[data-lens="hint"]', { opacity: [1, 0] }, { at: 400 + sweep + 300, dur: 300 });
    const { judged } = HINT_AT;
    read.tween('[data-flag="hint-verdict"]', { opacity: [0, 1], scale: [1.25, 1] }, { at: judged, dur: dur.enter, ease: 'back' });
    const summed = judged + 500;
    read.tween('.p2-hint__never', { opacity: [0, 1], scale: [1.5, 1] }, { at: summed, dur: dur.enter, ease: 'back' });
    read.tween('.dk-title .p2-late', { opacity: [0, 1] }, { at: summed + 200, dur: dur.move });
    const wireAt = summed + 700;
    read.tween('.p2-hint__hint', { '--glow': [0.5, 1] }, { at: wireAt, dur: dur.enter });
    read.tween(wire, { opacity: [0, 1] }, { at: wireAt, dur: 100 });
    read.tween(wire, { '--draw': [1, 0] }, { at: wireAt, dur: 1000, ease: 'inOut' });
    read.tween('.p2-hint__wire', { '--taut': [0, 1] }, { at: wireAt, dur: dur.micro });
    read.tween('.p2-hint__wire-head', { opacity: [0, 1] }, { at: wireAt + 900, dur: dur.micro });
    // The answer takes the hit as the wire arrives.
    read.tween(tile, { scale: [1, 1.1] }, { at: wireAt + 1000, dur: 140 });
    read.tween(tile, { scale: [1.1, 1] }, { at: wireAt + 1140, dur: 260 });
    read.tween('.p2-hint__wire', { '--taut': [1, 0.3] }, { at: wireAt + 1400, dur: dur.enter });
    read.tween('.p2-hint__hint', { '--glow': [1, 0.5] }, { at: wireAt + 1400, dur: dur.enter });
    read.show('.p2-hint__wire-label', { at: wireAt + 1100, rise: 0 });

    // Click 3: from one example to the reported averages. The example stays where it is: the
    // room under it was kept free, and the pill that recalled the last slide gives it up.
    // Both charts fill the cells of the answers that do NOT mention the hint, the surprising
    // share, at once; then the rest turns teal, with the paper's score beside it. A share and
    // what it is a share of appear only when its cells have all been filled, at the paper's
    // number: no frame prints a percentage that the paper does not report (the number used to
    // count up with the cells, and a frame halfway read "42% do not mention it").
    const stats = ctx.step({ label: 'over many questions: 75 and 61 of 100 do not mention the hint' });
    stats.tween('.p2-hint__echo', { opacity: [1, 0] }, { dur: 300 });
    stats.show('.p2-hint__stats-lead', { at: 300 });
    stats.show('.p2-hint__model-head', { at: 700, stagger: 120 });
    MODELS.forEach((model) => stats.tween(`[data-grid="${model.key}"] i`, { opacity: [0, 1] }, { at: 700, dur: dur.micro, stagger: 3 }));
    MODELS.forEach((model) => {
      const silent = fact(model.silent).value;
      const cell = (i) => `[data-grid="${model.key}"] [data-cell="${i}"]`;
      const perCell = HINT_AT.counting / silent;
      util.range(silent).forEach((i) => stats.cls(cell(i), 'p2-is-silent', { at: HINT.countAt + Math.round(i * perCell) }));
      stats.type(`[data-rate="${model.key}"]`, fact(model.silent).text, { at: 0, dur: 0 });
      stats.tween(`[data-rate="${model.key}"], [data-what="${model.key}"]`, { opacity: [0, 1] }, { at: HINT_AT.counted - dur.micro, dur: dur.micro });
      util.range(100 - silent).forEach((i) => stats.cls(cell(silent + i), 'is-on', { at: HINT_AT.rest + i * 8 }));
      stats.tween(`[data-rest="${model.key}"]`, { opacity: [0, 1] }, { at: HINT_AT.rest + 100, dur: dur.enter });
    });
    stats.show('.p2-hint__caveat', { at: HINT_AT.landed + 100, rise: 0 });
  };

  Deck.register({
    id: 'p2-hint',
    part: 2,
    // The second half of the title is the reveal of this slide: it arrives at click 2, with
    // the finding that the reasoning never mentions the hint (hintSetup).
    title: 'A hint can flip the answer, <span class="p2-late">and the reasoning often does not mention it</span>',
    cues: [
      { text: 'A professor’s opinion, slipped into the prompt', step: 0, at: HINT_AT.added },
      { text: 'A monitor reading only this reasoning sees nothing wrong', step: 2, at: HINT_AT.judged },
      { text: `In ${said('p2.chen_silent_claude')} and ${said('p2.chen_silent_r1')} of flips, the reasoning never mentions the hint`, step: 3, at: HINT_AT.landed },
    ],
    cite: [{ src: 'chen2025', where: 'Table 1; Fig. 1-2; Sec. 7.2' }, { src: 'baker2025', where: 'Fig. 9' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: hintHtml(),
    setup: hintSetup,
  });

  // ---------------------------------------------------------------- slide 6: the split brain
  // One box of 1728 x 620: what is said on the left (600px), the experiment on the right
  // (1104px), so that the speaking half, which is the left one, stands next to what it says.
  // Both stand where they stay from the first frame: the box for what is said is there, dim
  // and empty, before anything is said, so nothing moves aside to make room for it.
  // The brain is drawn from above, front up: the left hemisphere on the left, the right one
  // on the right. Which half speaks, which half sees which picture and which hand points to
  // which card is the author's caption ('p2.gazzaniga_halves', 'p2.gazzaniga_hands'): the
  // left one talks, sees the chicken claw and points with the right hand to the chicken; the
  // right one is silent, sees the snow scene and points with the left hand to the shovel.
  // Each side is the other half's, and the slide shows that as one chain per half, walked
  // once by a pulse of light in the color of the half in charge: from its picture across the
  // midline in front of the brain into the half on the other side, which lights up, and on
  // from that half across the midline behind the brain to the hand on the other side, which
  // points to a card ("points", as the caption says; nobody picks a card up). The silent
  // half's chain runs first (snow scene, right half, left hand, shovel), then the speaking
  // half's; the two chains cross as an X in front and as an X behind. The caption names the
  // hands; the visual fields, the crossing in front and what the cut is are textbook
  // anatomy, ours and not the caption's (SPEC.md, 4.2). The cut runs along the midline
  // inside the brain only, labeled on it. At click 1 a pulse from the silent half tries to
  // cross it and stops on it, and the question goes to the speaking half, with one more
  // arrow from the shovel back to it: it has to explain the left hand's choice
  // ('p2.gazzaniga_asked', 'p2.gazzaniga_explains') and could not know the reason for it
  // ('p2.gazzaniga_story'): it never saw the snow scene. Click 2 is its answer. At the
  // reveal the picture is relabeled in place as the hinted model, under a label that calls
  // it an analogy and not a mechanism. No card moves: the snow scene becomes the hint where
  // it stands, the shovel becomes (A), and the silent half's two ways stay, so the way from
  // the hint to the answer still passes by the written reasoning, as the wire of the hint
  // slide does. The two halves give way to one frame with two columns and no wall between
  // them (one model: what it wrote, and the computation that decided), and where the cut
  // was labeled the frame says that nothing is cut. Then a pulse walks the way once more:
  // from the hint into the column that decides and on to the answer. The patient's side of
  // the picture that has no counterpart goes: the other picture and card, the hands, the
  // question (a model is not asked afterwards: it writes its reasoning before it answers).
  const SB_TEXT = Object.freeze({
    scene: Object.freeze({ patient: 'a split-brain patient, seen from above', model: 'by analogy, not mechanism: the hinted model' }),
    // [text, class, dy] per line, inside a hemisphere or a panel; `y` is the first line's baseline.
    halves: Object.freeze({
      speaking: Object.freeze({ y: 314, lines: [['left', 'p2-sb__half-main'], ['hemisphere', 'p2-sb__half-sub', 30], ['speaks', 'p2-sb__half-role', 40]] }),
      silent: Object.freeze({ y: 314, lines: [['right', 'p2-sb__half-main'], ['hemisphere', 'p2-sb__half-sub', 30], ['silent', 'p2-sb__half-role', 40]] }),
      written: Object.freeze({ y: 336, lines: [['the written', 'p2-sb__half-sub'], ['reasoning', 'p2-sb__half-sub', 32]] }),
      computation: Object.freeze({ y: 320, lines: [['the', 'p2-sb__half-sub'], ['computation', 'p2-sb__half-sub', 32], ['that decided', 'p2-sb__half-sub', 32]] }),
    }),
    cut: 'connection cut',
    // At the reveal, where the cut was labeled: the model is one network, and nothing in it
    // keeps the hint from the written reasoning.
    whole: 'one model · no cut',
    crosses: 'crosses over',
    hands: Object.freeze({ chicken: 'right hand', shovel: 'left hand' }),
    explain: Object.freeze(['has to explain', 'the left hand’s shovel']),
    cards: Object.freeze({
      claw: Object.freeze(['chicken claw', 'right visual field']),
      snow: Object.freeze(['snow scene', 'left visual field']),
      chicken: 'chicken', shovel: 'shovel', hint: 'the hint', answer: 'answer',
    }),
    // At the reveal, in the box where the patient's answer stood: that models do give such
    // reasons is the paper's finding, in its words ('p2.chen_pattern'), after a lead-in of
    // ours that names when. The box says on its border whose words they are.
    findingLead: 'Given a wrong hint, models',
    findingWhose: 'verbatim: Chen et al., Sec. 3',
    ask: '“Why the shovel?”',
    who: Object.freeze({ patient: 'What the speaking half says', model: 'The written reasoning' }),
    wait: '…',
    quoteWhose: 'the answer, in Gazzaniga’s caption',
    // The one claim about order that is true of the model: its reasoning is written before
    // the answer (the patient explained afterwards), and the cause is still not in it.
    before: 'Written before the answer, yet the cause is left out.',
    real: 'The real reason',
    what: Object.freeze({ patient: 'the snow scene', model: 'the hint' }),
    // What is true of each: the patient's speaking half never got the snow scene; the model
    // has the hint in its prompt, the hint decides the answer, and the written reasoning
    // argues for that answer without mentioning the hint ('p2.chen_pattern': "justifications
    // for these hints without acknowledging them"). The note does not say that the hint left
    // the reasoning as it was: the box above it quotes the paper on reasoning that was built
    // to justify the hinted answer.
    note: Object.freeze({ patient: 'never reaches the speaking half', model: 'decided the answer; never mentioned' }),
  });
  // The paper's sentence without its subject, which the lead-in on screen gives.
  const chenPattern = () => {
    const text = said('p2.chen_pattern');
    if (!text.startsWith('they ')) throw new Error('the sentence of Chen et al. about flawed justifications no longer starts with "they"');
    return text.slice('they '.length);
  };
  const SB = Object.freeze({
    // A hemisphere is drawn as a dome (flat side down) and turned so that its flat side lies
    // along the cut: `place` puts the dome's center at (cut -/+ gap, midY).
    brain: Object.freeze({ cx: 608, cy: 290, rx: 228, ry: 214, folds: 9, bulge: 1.1 }),
    cut: 552, gap: 8, midY: 334, scale: 0.84,
    // The two crossings on the midline: in front of the brain (the pictures' ways) and
    // behind it (the hands' ways).
    front: 112, back: 552,
    // At the reveal the two halves give way to one frame in their place, with a column
    // where each half stood and the midline as a thin divider: a model has no hemispheres,
    // and it is one network. `x` is the frame's left edge; a column is half of `w`.
    frame: Object.freeze({ x: 352, y: 168, w: 400, h: 332, r: 24 }),
    bars: Object.freeze([[218, 80], [238, 112], [258, 96], [278, 124]]),
    // The network sits in the upper part of the right column, as the bars of text do in the
    // left one.
    nodes: Object.freeze({ upper: [604, 636, 668, 700], lower: [620, 652, 684], upperY: 226, lowerY: 262 }),
    // The four ways, each from its start to the tip of its arrow: a picture's way crosses the
    // midline at `front`, a hand's way at `back`. `tip` is where the arrowhead sits and how
    // it is turned.
    ways: Object.freeze({
      'sees-snow': Object.freeze({ tone: 'hidden', d: 'M288 72C380 72 452 72 552 112C592 128 616 150 632 176', tip: [634, 180, 58] }),
      'sees-claw': Object.freeze({ tone: 'read', d: 'M816 72C724 72 652 72 552 112C512 128 488 150 472 176', tip: [470, 180, 122] }),
      'picks-shovel': Object.freeze({ tone: 'hidden', d: 'M636 488C612 520 588 536 552 552C508 572 468 592 420 592H352', tip: [344, 592, 180] }),
      'picks-chicken': Object.freeze({ tone: 'read', d: 'M468 488C492 520 516 536 552 552C596 572 636 592 684 592H752', tip: [760, 592, 0] }),
    }),
    // Click 1: from the silent half toward the speaking one, as far as the cut.
    blocked: Object.freeze({ y: 244, d: 'M660 196C676 220 640 240 572 244', tip: [566, 244, 180] }),
    pulse: 0.14,          // how much of a way the pulse of light covers (a way's length is 1)
    quoteCps: 30,
    invented: 'you need a shovel',     // where the answer leaves what the speaking half saw
    // Click 1: the question goes to the speaking half, and so does what it has to explain,
    // the left hand's shovel ('p2.gazzaniga_asked'); it never saw the snow scene. The arrow
    // from the shovel runs up to the left hemisphere; its label stands above the cards.
    asks: Object.freeze({ d: 'M304 256C336 256 352 266 378 284', tip: [384, 288, 34] }),
    explain: Object.freeze({
      d: 'M176 462C200 424 300 404 380 398', tip: [388, 397, -6],
      label: Object.freeze({ x: 8, y: 344, dy: 30 }),
    }),
    // At the reveal the hand is gone: the way to the shovel goes on to the card itself, which
    // is the answer now.
    reaches: Object.freeze({ d: 'M352 592H274', tip: [264, 592, 180] }),
    // A pointing hand, drawn pointing left with its fingertip at (0, 0).
    hand: 'M36 -7H7a7 7 0 0 0 0 14H32M32 -7H54q10 0 10 10V22q0 10 -10 10H42q-10 0 -10 -10V7M32 14H46M32 23H44M64 2H78V28H64',
  });
  const place = (side) => {
    const x = SB.cut + side * SB.gap;
    const { cx, cy } = SB.brain;
    // Turned a quarter, the dome's top points left; the right hemisphere is its mirror image.
    return `translate(${x} ${SB.midY}) scale(${-side * SB.scale} ${SB.scale}) rotate(-90) translate(${-cx} ${-cy})`;
  };
  // The labels: the patient's in the middle of each half (which hemisphere, what it does),
  // the model's in the middle of each column.
  const LABEL_X = Object.freeze({
    speaking: 462, silent: 642,
    written: SB.frame.x + SB.frame.w / 4, computation: SB.frame.x + (SB.frame.w * 3) / 4,
  });
  const labelLines = (x, lines) => lines.map(([text, cls, dy], i) => `<tspan class="${cls}" x="${x}"${i ? ` dy="${dy}"` : ''}>${text}</tspan>`).join('');
  const halfLabel = (key, tone) => `<text class="p2-sb__half" data-half="${key}" data-tone="${tone}" x="${LABEL_X[key]}" y="${SB_TEXT.halves[key].y}">${labelLines(LABEL_X[key], SB_TEXT.halves[key].lines)}</text>`;
  // The model at the reveal: one frame, a tinted column on each side of the midline (the
  // outer corners rounded with the frame), a thin divider that is not a wall, and on the
  // column that decides a flash for the moment the pulse reaches it.
  const modelFrame = () => {
    const { x, y, w, h, r } = SB.frame;
    const written = `M${x + r} ${y}H${SB.cut}V${y + h}H${x + r}a${r} ${r} 0 0 1 ${-r} ${-r}V${y + r}a${r} ${r} 0 0 1 ${r} ${-r}Z`;
    const computation = `M${SB.cut} ${y}H${x + w - r}a${r} ${r} 0 0 1 ${r} ${r}V${y + h - r}a${r} ${r} 0 0 1 ${-r} ${r}H${SB.cut}Z`;
    return `
          <g class="p2-sb__model">
            <path class="p2-sb__column" data-tone="read" d="${written}"/>
            <path class="p2-sb__column" data-tone="hidden" d="${computation}"/>
            <path class="p2-sb__column-flash" data-tone="hidden" d="${computation}"/>
            <path class="p2-sb__divide" d="M${SB.cut} ${y + 20}V${y + h - 20}"/>
            <rect class="p2-sb__frame" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/>
          </g>`;
  };
  // How lit a half is: off, the flash when a pulse reaches or leaves it, and what it keeps.
  const SB_LIT = Object.freeze({ off: 0, flash: 0.55, on: 0.16 });
  // How dim the box for what is said is while nothing has been asked.
  const SB_WAITS = 0.45;
  // How long a pulse takes for a way, for the short way to the cut, and for a way at the reveal.
  const SB_PACE = Object.freeze({ way: 800, blocked: 500, reveal: 600 });
  // The beats that a cue or the title waits for, in ms from the start of their step. Enter:
  // when the first chain starts. Click 2: when the answer has typed and its invented half is
  // marked. Click 3, the reveal: first everything is relabeled at once and in place, so that
  // no frame shows a piece of the patient's under the model's label; then a pulse leaves the
  // hint, reaches the column that decides and goes on to the answer; then the one line
  // about the order in which a model writes.
  const SB_AT = (() => {
    const quote = said('gazzaniga.quote').length + 2;
    const says = 300;
    const marked = says + Math.round((quote / SB.quoteCps) * 1000) + 300;
    const pulse = 700;
    const decided = pulse + SB_PACE.reveal;
    const answered = decided + 100 + SB_PACE.reveal;
    return Object.freeze({ chain: 1700, says, marked, pulse, decided, answered, before: answered + 300 });
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
  // A way: its line, the pulse of light that walks it once (a bright stretch of the line
  // itself, not a dot beside it), and its arrowhead.
  const arrow = (key, tone, d, tip) => `
    <g class="p2-sb__arrow" data-arrow="${key}" data-tone="${tone}">
      <path class="p2-sb__arrow-line" pathLength="1" d="${d}"/>
      <path class="p2-sb__comet" pathLength="1" stroke-dasharray="${SB.pulse} 2" d="${d}"/>
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
  const hemisphere = (key, tone, side) => `
    <g class="p2-sb__hemi" data-hemi="${key}" data-tone="${tone}" transform="${place(side)}">
      <path class="p2-sb__hemi-shape" d="${HEMI.shape}"/>
      <path class="p2-sb__hemi-flash" d="${HEMI.shape}"/>
      <g class="p2-sb__sulci">${HEMI.sulci.map((d) => `<path d="${d}"/>`).join('')}</g>
    </g>`;
  const netLinks = () => SB.nodes.lower.flatMap((x) => SB.nodes.upper.filter((u) => Math.abs(u - x) <= 30)
    .map((u) => `<line x1="${x}" y1="${SB.nodes.lowerY}" x2="${u}" y2="${SB.nodes.upperY}"/>`)).join('');
  const netNodes = () => [...SB.nodes.upper.map((x) => [x, SB.nodes.upperY]), ...SB.nodes.lower.map((x) => [x, SB.nodes.lowerY])]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`).join('');
  const way = (key) => arrow(key, SB.ways[key].tone, SB.ways[key].d, SB.ways[key].tip);
  // The flash where a pulse crosses the midline.
  const flashRing = (key, y) => `<circle class="p2-sb__flash" data-flash="${key}" cx="${SB.cut}" cy="${y}" r="6" opacity="0"/>`;
  // The hand that a way ends in. `turn` mirrors it: the left hand points left, the right one right.
  const hand = (card, tone, x, y, turn) => `
    <g class="p2-sb__hand" data-hand="${card}" data-tone="${tone}">
      <g transform="translate(${x} ${y}) scale(${turn} 1)"><path class="p2-sb__hand-shape" d="${SB.hand}"/></g>
      <text class="p2-sb__hand-name" x="${x + turn * 54}" y="${y - 40}">${SB_TEXT.hands[card]}</text>
    </g>`;
  // The way that the cut stops: what is left of it (dashed, with its head at the cut) and the
  // pulse that runs into the cut.
  const blockedWay = () => {
    const { d, tip } = SB.blocked;
    return `
        <g class="p2-sb__block" data-tone="hidden">
          <path class="p2-sb__route" d="${d}"/>
          <path class="p2-sb__route-head" d="M0 0L-14 -8L-14 8Z" transform="translate(${tip[0]} ${tip[1]}) rotate(${tip[2]})"/>
        </g>
        <path class="p2-sb__comet" data-comet="blocked" data-tone="hidden" pathLength="1" stroke-dasharray="${SB.pulse} 2" d="${d}"/>`;
  };
  // A card that becomes another at the reveal: two faces in one place, cross-faded (a card
  // that turned over showed its text mirrored on the way).
  const twoFaces = (front, back) => `
        <div class="p2-sb__face p2-sb__face--front">${front}</div>
        <div class="p2-sb__face p2-sb__face--back">${back}</div>`;

  const brainHtml = () => `
    <div class="p2-sb"><div class="p2-sb__box">
      <div class="p2-sb__says">
        <div class="p2-sb__say">
          ${swap('p2-sb__say-label', 'who', SB_TEXT.who.patient, SB_TEXT.who.model)}
          <div class="p2-sb__say-body">
            <div class="p2-sb__wait">${SB_TEXT.wait}</div>
            <div class="p2-sb__quote"><span data-said="seen"></span><span data-said="invented"></span></div>
            <div class="p2-sb__finding"><span class="p2-sb__finding-lead">${SB_TEXT.findingLead}</span> “${chenPattern()}”</div>
          </div>
          ${kit.legend({ key: 'say-quote', text: SB_TEXT.quoteWhose })}
          ${kit.legend({ key: 'say', text: SB_TEXT.findingWhose })}
        </div>
        <div class="p2-sb__before">${SB_TEXT.before}</div>
        <div class="p2-sb__real">
          <div class="p2-label">${SB_TEXT.real}</div>
          ${swap('p2-sb__real-what', 'what', SB_TEXT.what.patient, SB_TEXT.what.model)}
          ${swap('p2-sb__real-note', 'note', SB_TEXT.note.patient, SB_TEXT.note.model)}
        </div>
      </div>

      <div class="p2-sb__lab">
      <svg class="p2-sb__art" viewBox="0 0 1104 620" width="1104" height="620" aria-hidden="true">
        <g class="p2-sb__brain">
          ${hemisphere('speaking', 'read', -1)}
          ${hemisphere('silent', 'hidden', 1)}
          ${modelFrame()}
          <g class="p2-sb__glyph" data-glyph="written" data-tone="read">
            ${SB.bars.map(([y, w]) => `<rect x="${LABEL_X.written - w / 2}" y="${y}" width="${w}" height="8" rx="4"/>`).join('')}
          </g>
          <g class="p2-sb__glyph" data-glyph="computation" data-tone="hidden">${netLinks()}${netNodes()}</g>
          ${halfLabel('speaking', 'read')}
          ${halfLabel('silent', 'hidden')}
          ${halfLabel('written', 'read')}
          ${halfLabel('computation', 'hidden')}
        </g>
        <g class="p2-sb__cut">
          <path class="p2-sb__cut-line" d="M${SB.cut} 160V508"/>
          <rect class="p2-sb__cut-pill" x="${SB.cut - 128}" y="436" width="256" height="40" rx="20"/>
          <text class="p2-sb__cut-label" x="${SB.cut}" y="465">${SB_TEXT.cut}</text>
        </g>
        <g class="p2-sb__whole">
          <rect class="p2-sb__whole-pill" x="${SB.cut - 168}" y="436" width="336" height="40" rx="20"/>
          <text class="p2-sb__whole-label" x="${SB.cut}" y="465">${SB_TEXT.whole}</text>
        </g>
        <text class="p2-sb__scene" data-scene="patient" x="0" y="24">${SB_TEXT.scene.patient}</text>
        <text class="p2-sb__scene" data-scene="model" x="0" y="24">${SB_TEXT.scene.model}</text>
        ${Object.keys(SB.ways).map(way).join('')}
        ${arrow('asks', 'dim', SB.asks.d, SB.asks.tip)}
        ${arrow('explains-shovel', 'read', SB.explain.d, SB.explain.tip)}
        ${arrow('reaches-answer', 'hidden', SB.reaches.d, SB.reaches.tip)}
        ${hand('chicken', 'read', 846, 592, -1)}
        ${hand('shovel', 'hidden', 258, 592, 1)}
        <text class="p2-sb__crosses" x="${SB.cut + 64}" y="${SB.front + 10}">${SB_TEXT.crosses}</text>
        <text class="p2-sb__explain" data-tone="read" x="${SB.explain.label.x}" y="${SB.explain.label.y}"><tspan x="${SB.explain.label.x}">${SB_TEXT.explain[0]}</tspan><tspan x="${SB.explain.label.x}" dy="${SB.explain.label.dy}">${SB_TEXT.explain[1]}</tspan></text>
        ${blockedWay()}
        <path class="p2-sb__stop" d="M${SB.cut - 12} ${SB.blocked.y - 12}L${SB.cut + 12} ${SB.blocked.y + 12}M${SB.cut + 12} ${SB.blocked.y - 12}L${SB.cut - 12} ${SB.blocked.y + 12}"/>
        <circle class="p2-sb__ring" cx="${SB.cut}" cy="${SB.blocked.y}" r="6" opacity="0"/>
        ${flashRing('front', SB.front)}
        ${flashRing('back', SB.back)}
      </svg>

      <div class="p2-sb__card p2-sb__card--sees" data-card="claw" data-tone="read">
        <div class="p2-sb__face">${icon('claw')}<span class="p2-sb__cap">${SB_TEXT.cards.claw[0]}</span><span class="p2-sb__field">${SB_TEXT.cards.claw[1]}</span></div>
      </div>
      <div class="p2-sb__card p2-sb__card--sees" data-card="snow" data-tone="hidden">${twoFaces(
    `${icon('snow')}<span class="p2-sb__cap">${SB_TEXT.cards.snow[0]}</span><span class="p2-sb__field">${SB_TEXT.cards.snow[1]}</span>`,
    `<span class="p2-sb__hint">${hintLead()}&nbsp;…</span><span class="p2-sb__cap">${SB_TEXT.cards.hint}</span>`,
  )}
      </div>

      <div class="p2-sb__card p2-sb__card--pick" data-card="chicken" data-tone="read">
        <div class="p2-sb__face">${icon('chicken')}<span class="p2-sb__cap">${SB_TEXT.cards.chicken}</span></div>
      </div>
      <div class="p2-sb__card p2-sb__card--spare" data-card="spare-a"><div class="p2-sb__face">${icon('apple')}</div></div>
      <div class="p2-sb__card p2-sb__card--spare" data-card="spare-b"><div class="p2-sb__face">${icon('hammer')}</div></div>
      <div class="p2-sb__card p2-sb__card--pick" data-card="shovel" data-tone="hidden">${twoFaces(
    `${icon('shovel')}<span class="p2-sb__cap">${SB_TEXT.cards.shovel}</span>`,
    `<span class="p2-sb__letter">(A)</span><span class="p2-sb__cap">${SB_TEXT.cards.answer}</span>`,
  )}
      </div>
      <div class="p2-sb__ask">${SB_TEXT.ask}</div>
      </div>
    </div></div>`;

  const brainSetup = (ctx) => {
    const { fact, dur } = ctx;
    const ease = Deck.timeline.EASE.inOut;
    const line = (key) => ctx.q(`[data-arrow="${key}"] .p2-sb__arrow-line`);
    const draw = (step, key, at) => {
      step.tween(line(key), { opacity: [0, 1] }, { at, dur: 80 });
      step.tween(line(key), { '--draw': [1, 0] }, { at, dur: dur.enter, ease: 'inOut' });
      step.tween(`[data-arrow="${key}"] .p2-sb__arrow-head`, { opacity: [0, 1] }, { at: at + dur.enter - 80, dur: dur.micro });
    };
    // A pulse of light runs along a way once.
    const run = (step, comet, at, ms, how = 'inOut') => {
      step.tween(comet, { opacity: [0, 1] }, { at, dur: 60 });
      step.tween(comet, { 'stroke-dashoffset': [SB.pulse, SB.pulse - 1] }, { at, dur: ms, ease: how });
      step.tween(comet, { opacity: [1, 0] }, { at: at + ms - 100, dur: 100 });
    };
    // A pulse walks a way once and draws it behind itself. Returns when it arrives.
    const walk = (step, key, at, ms) => {
      step.tween(line(key), { opacity: [0, 1] }, { at, dur: 80 });
      step.tween(line(key), { '--draw': [1, 0] }, { at, dur: ms, ease: 'inOut' });
      run(step, `[data-arrow="${key}"] .p2-sb__comet`, at, ms);
      step.tween(`[data-arrow="${key}"] .p2-sb__arrow-head`, { opacity: [0, 1] }, { at: at + ms - 80, dur: dur.micro });
      return at + ms;
    };
    // When a pulse that left at `at` is on the midline: where its way crosses the cut, and
    // when the easing has brought it that far.
    const crossesAt = (key, at, ms) => {
      const path = line(key);
      const length = path.getTotalLength();
      const samples = util.range(201).map((i) => i / 200);
      const nearest = (list, distance) => list.reduce((best, v) => (distance(v) < distance(best) ? v : best), list[0]);
      const along = nearest(samples, (f) => Math.abs(path.getPointAtLength(length * f).x - SB.cut));
      return at + Math.round(ms * nearest(samples, (t) => Math.abs(ease(t) - along)));
    };
    const flashAt = (step, key, at) => {
      step.tween(`[data-flash="${key}"]`, { opacity: [0, 1] }, { at: at - 60, dur: 60 });
      step.tween(`[data-flash="${key}"]`, { 'attr:r': [6, 34] }, { at: at - 60, dur: 520 });
      step.tween(`[data-flash="${key}"]`, { opacity: [1, 0] }, { at: at + 60, dur: 400 });
    };
    // A half lights up in its own color and stays a little lit: it has the picture now.
    const light = (step, key, at, from = SB_LIT.off) => {
      step.tween(`[data-hemi="${key}"] .p2-sb__hemi-flash`, { opacity: [from, SB_LIT.flash] }, { at, dur: dur.micro });
      step.tween(`[data-hemi="${key}"] .p2-sb__hemi-flash`, { opacity: [SB_LIT.flash, SB_LIT.on] }, { at: at + dur.micro, dur: dur.move });
    };
    const cross = (step, key, at) => {
      step.tween(`[data-${key}="patient"]`, { opacity: [1, 0] }, { at, dur: 300 });
      step.tween(`[data-${key}="model"]`, { opacity: [0, 1] }, { at: at + 200, dur: dur.enter });
    };

    // Enter: one brain, the link between its halves cut; the two pictures and the cards to
    // point to. Then one chain per half, the silent one's first: a pulse carries its picture
    // across the midline in front of the brain into the half on the other side, which lights
    // up, and goes on from that half across the midline behind the brain to the hand on the
    // other side, which goes out to its card. The first crossing is named, once. On the
    // left the box for what the speaking half says is there from the start, dim and empty:
    // its place is taken, so the experiment never has to move over for it.
    const enter = ctx.step({ label: 'each half sees the other side’s picture and points with the other side’s hand' });
    enter.tween('.p2-sb__say', { opacity: [0, SB_WAITS] }, { at: 150, dur: 600 });
    enter.tween('.p2-sb__brain', { opacity: [0, 1], scale: [0.92, 1] }, { at: 150, dur: 600 });
    enter.show('[data-scene="patient"]', { at: 300, rise: 0 });
    enter.tween('.p2-sb__cut', { opacity: [0, 1] }, { at: 650, dur: dur.enter });
    enter.tween('[data-half="speaking"]', { opacity: [0, 1] }, { at: 750, dur: dur.enter });
    enter.tween('[data-half="silent"]', { opacity: [0, 1] }, { at: 850, dur: dur.enter });
    enter.tween('[data-card="snow"]', { opacity: [0, 1], x: [-120, 0] }, { at: 900, dur: 500 });
    enter.tween('[data-card="claw"]', { opacity: [0, 1], x: [120, 0] }, { at: 1000, dur: 500 });
    enter.show('.p2-sb__card--pick, .p2-sb__card--spare', { at: 1100, stagger: 60 });
    const chain = (picture, pick, half, at) => {
      const seen = walk(enter, `sees-${picture}`, at, SB_PACE.way);
      flashAt(enter, 'front', crossesAt(`sees-${picture}`, at, SB_PACE.way));
      light(enter, half, seen - 100);
      const leaves = seen + 150;
      const reached = walk(enter, `picks-${pick}`, leaves, SB_PACE.way);
      flashAt(enter, 'back', crossesAt(`picks-${pick}`, leaves, SB_PACE.way));
      enter.tween(`[data-hand="${pick}"]`, { opacity: [0, 1] }, { at: reached - 300, dur: dur.micro });
      enter.tween(`[data-hand="${pick}"] .p2-sb__hand-shape`, { x: [0, -10] }, { at: reached, dur: 180, ease: 'in' });
      enter.tween(`[data-hand="${pick}"] .p2-sb__hand-shape`, { x: [-10, -4] }, { at: reached + 180, dur: 320 });
      enter.cls(`[data-card="${pick}"]`, 'is-picked', { at: reached + 160 });
      enter.tween(`[data-card="${pick}"]`, { scale: [1, 1.1] }, { at: reached + 160, dur: 140 });
      enter.tween(`[data-card="${pick}"]`, { scale: [1.1, 1] }, { at: reached + 300, dur: 300 });
      return reached;
    };
    const shovelAt = chain('snow', 'shovel', 'silent', SB_AT.chain);
    const chickenAt = chain('claw', 'chicken', 'speaking', shovelAt + 200);
    enter.tween('.p2-sb__crosses', { opacity: [0, 1] }, { at: crossesAt('sees-snow', SB_AT.chain, SB_PACE.way), dur: dur.enter });
    enter.tween('.p2-sb__card--spare', { opacity: [1, 0.4] }, { at: chickenAt + 400, dur: dur.enter });

    // Click 1, no answer yet, and nothing moves. What the silent half has cannot cross to
    // the other half: a pulse leaves it and stops on the cut. Then the question, to the half
    // that speaks, and what it has to explain, the left hand's shovel
    // ('p2.gazzaniga_asked'). The box on the left wakes and waits; the answer comes with the
    // next click.
    const ask = ctx.step({ label: 'the cut, and the question to the half that speaks' });
    const tries = 200;
    const hit = tries + SB_PACE.blocked;
    light(ask, 'silent', tries - 200, SB_LIT.on);
    run(ask, '[data-comet="blocked"]', tries, SB_PACE.blocked, 'in');
    ask.tween('.p2-sb__block', { opacity: [0, 1] }, { at: hit - 100, dur: dur.enter });
    ask.tween('.p2-sb__ring', { opacity: [0, 1] }, { at: hit - 40, dur: 40 });
    ask.tween('.p2-sb__ring', { 'attr:r': [6, 36] }, { at: hit - 40, dur: 500 });
    ask.tween('.p2-sb__ring', { opacity: [1, 0] }, { at: hit + 60, dur: 400 });
    ask.tween('.p2-sb__stop', { opacity: [0, 1] }, { at: hit, dur: 80 });
    ask.tween('.p2-sb__stop', { scale: [1, 1.5] }, { at: hit, dur: 120 });
    ask.tween('.p2-sb__stop', { scale: [1.5, 1] }, { at: hit + 120, dur: 300 });
    ask.tween('.p2-sb__cut-pill, .p2-sb__cut-label', { scale: [1, 1.08] }, { at: hit, dur: 120 });
    ask.tween('.p2-sb__cut-pill, .p2-sb__cut-label', { scale: [1.08, 1] }, { at: hit + 120, dur: 300 });
    const asked = hit + 400;
    ask.tween('.p2-sb__ask', { opacity: [0, 1], scale: [0.7, 1] }, { at: asked, dur: dur.enter, ease: 'back' });
    const heard = walk(ask, 'asks', asked + 300, 400);
    light(ask, 'speaking', heard - 100, SB_LIT.on);
    draw(ask, 'explains-shovel', heard + 150);
    ask.tween('.p2-sb__explain', { opacity: [0, 1] }, { at: heard + 250, dur: dur.enter });
    ask.tween('.p2-sb__say', { opacity: [SB_WAITS, 1] }, { at: heard + 500, dur: dur.enter });
    ask.tween('.p2-sb__wait', { opacity: [0, 1] }, { at: heard + 700, dur: dur.enter });

    // Click 2: the speaking half answers at once. The half of its answer that it made up is
    // marked, the box says on its border whose wording the quote is ('gazzaniga.quote': the
    // author's caption of this figure), and the title's second half arrives with the mark.
    // Under the answer, in words, what the pulse on the cut showed: the real reason.
    const answer = ctx.step({ label: 'why the shovel? the speaking half invents a reason' });
    const quote = `“${fact('gazzaniga.quote').text}”`;
    const turn = quote.indexOf(SB.invented);
    if (turn < 0) throw new Error(`the quote no longer contains "${SB.invented}"`);
    const typing = Math.round((quote.length / SB.quoteCps) * 1000);
    const turnAt = Math.round((turn / SB.quoteCps) * 1000);
    answer.tween('.p2-sb__wait', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    answer.type('[data-said="seen"]', quote.slice(0, turn), { at: SB_AT.says, dur: turnAt });
    answer.type('[data-said="invented"]', quote.slice(turn), { at: SB_AT.says + turnAt, dur: typing - turnAt });
    answer.cls('[data-said="invented"]', 'is-marked', { at: SB_AT.marked });
    answer.tween('[data-legend="say-quote"]', { opacity: [0, 1] }, { at: SB_AT.marked, dur: dur.enter });
    answer.tween('.dk-title .p2-late', { opacity: [0, 1] }, { at: SB_AT.marked, dur: dur.move });
    answer.show('.p2-sb__real', { at: SB_AT.marked + 700 });

    // Click 3, the reveal: the same picture, relabeled in place, is the hinted model (SB_AT
    // has the beats). In the first beat everything that is only the patient's goes, on both
    // sides at once: the other picture and the other hand's choice with their ways, the spare
    // cards, the hands, the crossing's name, the question and its arrow, the arrow from the
    // shovel, the stopped way, the cut and its label, and on the left the quote. In the same
    // beat every piece that has a counterpart turns into it, where it stands: the snow scene
    // into the hint, the shovel into (A), the two halves into one frame with a column each
    // (the written reasoning, the computation that decided), the cut's label into "one
    // model, no cut", the patient's answer into what Chen et al. report of models, the
    // patient's note into the model's. So the label "by analogy" never stands over a piece
    // of the patient's, and no card moves: the silent half's two ways stay and are the
    // hint's way now, past the written reasoning. The cards change face by cross-fading.
    const reveal = ctx.step({ label: 'by analogy, not mechanism: relabeled in place, the picture is the hinted model' });
    cross(reveal, 'scene', 0);
    reveal.tween('[data-scene="model"]', { scale: [1.15, 1] }, { at: 200, dur: dur.enter, ease: 'back' });
    reveal.tween('[data-card="claw"], [data-card="chicken"], [data-arrow="sees-claw"], [data-arrow="picks-chicken"], [data-arrow="explains-shovel"], [data-arrow="asks"], .p2-sb__ask, .p2-sb__explain, .p2-sb__hand, .p2-sb__crosses, .p2-sb__block, .p2-sb__stop, .p2-sb__cut', { opacity: [1, 0] }, { at: 0, dur: 300 });
    reveal.tween('[data-arrow="picks-shovel"] .p2-sb__arrow-head', { opacity: [1, 0] }, { at: 0, dur: 300 });
    reveal.tween('.p2-sb__card--spare', { opacity: [0.4, 0] }, { at: 0, dur: 300 });
    reveal.tween('.p2-sb__quote, [data-legend="say-quote"]', { opacity: [1, 0] }, { at: 0, dur: 300 });
    ['who', 'what', 'note'].forEach((key) => cross(reveal, key, 0));
    reveal.tween('[data-hemi], [data-half="speaking"], [data-half="silent"]', { opacity: [1, 0] }, { at: 0, dur: 300 });
    reveal.tween('.p2-sb__model, .p2-sb__whole, [data-glyph], [data-half="written"], [data-half="computation"]', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    reveal.tween('.p2-sb__finding, [data-legend="say"]', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    ['snow', 'shovel'].forEach((card) => {
      reveal.tween(`[data-card="${card}"] .p2-sb__face--front`, { opacity: [1, 0] }, { at: 0, dur: 300 });
      reveal.tween(`[data-card="${card}"] .p2-sb__face--back`, { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    });
    draw(reveal, 'reaches-answer', 200);
    // Second beat: the pulse of the entrance walks once more, and now it is the hint's. From
    // the hint into the column that decides, which lights up, and on to the answer, which
    // takes it: past the written reasoning both times.
    const { pulse, decided, answered } = SB_AT;
    reveal.tween('[data-card="snow"]', { scale: [1, 1.06] }, { at: pulse - 100, dur: 140 });
    reveal.tween('[data-card="snow"]', { scale: [1.06, 1] }, { at: pulse + 40, dur: 300 });
    run(reveal, '[data-arrow="sees-snow"] .p2-sb__comet', pulse, SB_PACE.reveal);
    reveal.tween('.p2-sb__column-flash', { opacity: [SB_LIT.off, SB_LIT.flash] }, { at: decided - 100, dur: dur.micro });
    reveal.tween('.p2-sb__column-flash', { opacity: [SB_LIT.flash, SB_LIT.on] }, { at: decided + 100, dur: dur.move });
    run(reveal, '[data-arrow="picks-shovel"] .p2-sb__comet', decided + 100, SB_PACE.reveal);
    reveal.tween('[data-card="shovel"]', { scale: [1, 1.1] }, { at: answered, dur: 140 });
    reveal.tween('[data-card="shovel"]', { scale: [1.1, 1] }, { at: answered + 140, dur: 300 });
    // Last, the one line about order, which is where the analogy stops: the patient explained
    // after the act; a model writes its reasoning before it answers, and the cause is still
    // not in it.
    reveal.show('.p2-sb__before', { at: SB_AT.before, rise: 0 });
    reveal.hold(300);
  };

  Deck.register({
    id: 'p2-splitbrain',
    part: 2,
    // The title says from the start that this is an analogy, and from whom; its second half
    // is the reveal of the patient's answer and arrives with it, at click 2 (brainSetup).
    title: 'An analogy from a split-brain patient: <span class="p2-late">the speaking half invents a reason</span>',
    cues: [
      // What each half does, and what the hands are asked to do: "to match" is the caption's
      // ('p2.gazzaniga_hands').
      'Each half sees one picture and points to a matching card',
      // Why it invents one: it "could not know why the right hemisphere was doing what it was
      // doing" ('p2.gazzaniga_story'). The source does not say that it sees the shovel.
      { text: 'Never shown the snow, it invents a reason for the shovel', step: 2, at: SB_AT.marked },
      // With the first beat of the reveal, when the picture's label says the same.
      { text: 'An analogy for the behavior, not a claim about mechanism', step: 3, at: 200 },
    ],
    cite: [{ src: 'gazzaniga1998', where: 'figure' }, { src: 'chen2025', where: 'Table 1; Sec. 3' }],
    // Our drawing of the experiment the source reports and, at the reveal, of the pattern
    // that Chen et al. report. Nothing on it is an example we wrote any more (the three
    // reasoning lines of slide 5 are gone; the hint and the quote are the paper's), and no
    // measured number is on this slide.
    figure: 'schematic',
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
  // process", not a new architecture), and nothing is written: this is Coconut
  // ('p2.hao_last_state'), which the caption of click 2 describes in plain words (its
  // "internal numbers" are the last hidden state) without the name. With dots the text row is
  // not empty, it holds the dots, so their caption says "no reasoning written" and keeps
  // "nothing written" for the vectors. Both models were trained for it ('pfau.supervision',
  // 'p2.hao_training'). The machine and the result cards stand where they stay from the
  // first frame: nothing moves aside to make room. Before each run the answer is open ("?"),
  // and it lands only when the run is over. The first card is the puzzle that the machine
  // works on, and it fills row by row, top to bottom: written reasoning at the entrance;
  // then, while the dots' answer is still open, the baseline (the model that answers at
  // once, near chance), with a mark at that level across the bars; then the dots, whose bar
  // runs through the mark as the answer lands. Under the picture one line at a time, in one
  // place: first the way from the last two slides to this one; from the end of click 1 why
  // dots are enough for this puzzle (a dot says nothing and still is one more column to
  // compute in, 'p2.pfau_additional'; the puzzle's parts run side by side,
  // 'p2.pfau_parallelizable', and one column gathers them, 'p2.pfau_serial'; so no result
  // has to come back down through a written token); from the end of click 2 the
  // slide's main line: how the title squares with slide 3. The title is about small models
  // trained for it; slide 3 is about today's large models, which still need written
  // reasoning for hard problems ('korbak.externalized', 'korbak.today'); a model built to
  // pass its numbers on might not ('korbak.latent', which cites Hao et al.; 'korbak.future'),
  // and that is why slide 2 called monitoring fragile. The last click is Part 2's
  // conclusion, on a panel of its own over the dimmed picture.
  const whyHtml = () => `<p class="p2-dots__why-dots">A dot says nothing, but it is <b>one more column to compute in</b>.
          This puzzle’s parts run side by side and one column gathers them, so no result has to come back down through a written token.</p>`;
  const holdsHtml = () => `<p class="p2-dots__holds">These are small models trained for it. Today’s large models still
          <b>need written reasoning</b> for hard problems; a model built to pass numbers on might not.
          That is what makes monitoring <i>fragile</i>.</p>`;
  const DOTS = Object.freeze({
    shape: Object.freeze({ cols: 8, rows: 4 }),
    tokens: Object.freeze(['Q', 'first', 'sum', 'each', 'pair', 'then', 'check', 'so']),
    answer: 'True',
    lensFrom: 6, lensTravel: 1136, riseMs: 50, hopMs: 260, dropMs: 110, feedMs: 300,
    landing: 36, chipTop: 28, nodeGap: 16,   // a written token lands as on slides 3 and 9
    lanes: Object.freeze({ top: 56, step: 8 }),   // where the gathering arcs run, between the two top layers
  });
  const dotPoint = (col, row) => kit.latticePoint(DOTS.shape, col, row);
  const thinking = util.range(DOTS.shape.cols - 1).map((i) => i + 1);
  // The beats that a cue waits for, in ms from the start of their step. Click 1: when the
  // last word has turned into a dot and the answer is open (the baseline lands here), when
  // the columns run, when the answer lands (and with it the dots' number). Click 2: when the chain of vectors starts, when its answer lands, and when
  // the monitor has found nothing to read.
  const DOTS_AT = (() => {
    const { cols, rows } = DOTS.shape;
    const open = 400 + thinking.length * 130 + 200;
    const again = open + 1000;   // the baseline lands in between and is read before the columns run
    const chain = 1300;
    const fed = chain + (cols - 1) * DOTS.feedMs + rows * DOTS.riseMs + 100;
    return Object.freeze({ open, again, solved: again + 800, chain, fed, read: fed + 1150 });
  })();

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

  // The results: how often the answer is right ('accuracy' in both papers). One color per
  // row on every task: teal is the model whose reasoning is written (and can be read), amber
  // the one whose steps are dots or vectors, gray the model that answers at once. The puzzle
  // shows all three, as bars, in the order in which the slide reaches them: written
  // reasoning (100% too: 'pfau.3sum_cot'); the baseline, no reasoning at all, which is near
  // chance there ('pfau.chance'); and the dots. A mark at the baseline's level runs across
  // the three bars, named above them, so that "near chance" stands at the level it
  // describes and the dots' bar is seen to pass it. The paper calls 66% "near-random" and
  // gives no chance rate for 3SUM (its one baseline number is the majority class of 2SUM,
  // 63%, Table 1, another task), so the slide prints none: while the baseline is the news,
  // from the moment the mark arrives to the end of click 1, a note under the card says whose
  // word "near-random" is and that the paper states no chance rate (CHANCE_NOTE), so that
  // nobody reads the mark against 50%. Each of the two other tasks shows one
  // pair, what the vectors are compared with and the vectors. The rows left out
  // ('hao.prosqa_none', 'hao.gsm8k_none') stay in the fact table.
  const BARS = Object.freeze({
    puzzle: Object.freeze([['words', 'pfau.3sum_cot'], ['none', 'pfau.3sum_none'], ['hidden', 'pfau.3sum_filler']]),
    logic: Object.freeze([['words', 'hao.prosqa_cot'], ['hidden', 'hao.prosqa_latent']]),
    math: Object.freeze([['words', 'hao.gsm8k_cot'], ['hidden', 'hao.gsm8k_latent']]),
  });
  // Under the puzzle's card during click 1, in the place that the vectors' card takes at
  // click 2. The paper's sentence is "The no-filler models achieve near-random accuracy at
  // 66%" (Sec. 4.2); the text of 2404.15758 was searched for "random", "chance", "majority",
  // "baseline", "imbalance" and "50%", and nothing in it says what chance is on 3SUM.
  const chanceNoteHtml = () => `<p class="p2-dots__chance-note">The dashed line, ${said('pfau.3sum_none')}:
          <b>“${said('pfau.chance')}”</b> is the paper’s word (${Deck.fact('pfau.chance').where}).
          It gives no chance rate for this puzzle.</p>`;
  const BAR_ROWS = Object.freeze({
    none: Object.freeze({ tone: 'dim', label: () => 'no reasoning' }),
    words: Object.freeze({ tone: 'read', label: () => 'written reasoning' }),
    hidden: Object.freeze({ tone: 'hidden', label: (task) => (task === 'puzzle' ? 'dots' : 'vectors') }),
  });
  const barsHtml = (task) => `
    <div class="p2-dots__bars" data-bars="${task}" style="--chance:${Deck.fact('pfau.3sum_none').value}">
      <i class="p2-dots__chance-mark"></i>
      ${BARS[task].map(([row, key]) => `
      <div class="p2-dots__bar" data-bar="${task}-${row}" data-tone="${BAR_ROWS[row].tone}">
        <span class="p2-dots__bar-label">${BAR_ROWS[row].label(task)}</span>
        <span class="p2-dots__bar-track"><i></i></span>
        <b class="p2-dots__bar-value">${said(key)}</b>
      </div>`).join('')}
    </div>`;
  // A pair side by side: each side its name, its number and a short bar; the higher one is marked.
  const duelHtml = (task) => {
    const best = Math.max(...BARS[task].map(([, key]) => Deck.fact(key).value));
    return `
    <div class="p2-dots__duel" data-duel="${task}">
      ${BARS[task].map(([row, key]) => `<span class="p2-dots__side${Deck.fact(key).value === best ? ' is-best' : ''}" data-side="${task}-${row}" data-tone="${BAR_ROWS[row].tone}">
        <span>${BAR_ROWS[row].label(task)} <b>${said(key)}</b></span><i style="--n:${Deck.fact(key).value}"></i>
      </span>`).join('')}
    </div>`;
  };
  // Part 2 in one sentence, a clause for each of its slides, and beside each clause what
  // that slide showed.
  // The second clause shows the paper's own words for it, a part of the sentence that
  // slide 6 quotes ('p2.chen_pattern'), and not a line of our example.
  const SUM_QUOTE = 'elaborate yet flawed justifications';
  if (!said('p2.chen_pattern').includes(SUM_QUOTE)) throw new Error(`the sentence of Chen et al. no longer contains "${SUM_QUOTE}"`);
  const SUM = Object.freeze({
    lead: 'Written reasoning can',
    lines: Object.freeze([
      ['leave out the real cause,', 'the professor’s hint'],
      ['give a reason that is not the real one,', `Chen et al.: “${SUM_QUOTE}”`],
      ['or, in models trained for it, disappear.', 'small models: dots, then vectors'],
    ]),
  });

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
          <span data-way="words" data-tone="read"><i></i>Written reasoning: each step is written, then read back in</span>
          <span data-way="dots" data-tone="hidden"><i></i>Dots: no reasoning written; all columns work at once, one gathers</span>
          <span data-way="vectors" data-tone="hidden"><i></i>Vectors (another model, other tasks): internal numbers go back in</span>
        </div>
        <div class="p2-label p2-dots__answer-label">Answer</div>
        <div class="p2-dots__answer">
          <span class="p2-dots__answer-wait">?</span><span class="p2-dots__answer-done">${DOTS.answer}<i class="p2-dots__check"></i></span><span class="p2-dots__answer-other">an answer</span>
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
            <b data-verdict="words" data-tone="read">all of it</b>
            <b data-verdict="dots" data-tone="hidden">only dots</b>
            <b data-verdict="none" data-tone="dim">nothing to read</b>
          </span>
        </div>
      </div>
      <div class="p2-dots__cards">
        <div class="p2-dots__card" data-card="puzzle">
          <div class="p2-label">A made-up puzzle (3SUM)</div>
          <div class="p2-dots__task">Do any 3 inputs add to&nbsp;0 (mod&nbsp;10)?</div>
          <div class="p2-dots__why">No chain of steps: its parts run at once</div>
          <div class="p2-dots__metric" style="--chance:${Deck.fact('pfau.3sum_none').value}"><span>Answers right</span><span class="p2-dots__chance-name">“${said('pfau.chance')}” (${Deck.fact('pfau.chance').where})</span></div>
          ${barsHtml('puzzle')}
          ${kit.legend({ key: 'dots-model', text: `${said('pfau.model').replace('-parameter', ' parameters')}, trained for this` })}
        </div>
        <div class="p2-dots__card" data-card="vectors">
          <div class="p2-label">Vectors, nothing written</div>
          <div class="p2-dots__task" data-task="logic">Logic questions (${said('hao.task')}): <b data-tone="hidden">vectors win</b></div>
          ${duelHtml('logic')}
          <div class="p2-dots__task" data-task="math">School math (GSM8k): <b data-tone="hidden">vectors lose</b></div>
          ${duelHtml('math')}
          ${kit.legend({ key: 'vectors-model', text: `${said('hao.base')}, trained for this` })}
        </div>
        ${chanceNoteHtml()}
      </div>
      <div class="p2-dots__under">
        <p class="p2-dots__bridge">So far the written reasoning was there, and left the real reason out. Now: no written reasoning at all.</p>
        ${whyHtml()}
        ${holdsHtml()}
      </div>
      <div class="p2-dots__sum">
        <p class="p2-dots__sum-lead">${SUM.lead}</p>
        ${SUM.lines.map(([clause, shown], i) => `<p class="p2-dots__sum-line" data-sum="${i}"><b>${clause}</b><span>${shown}</span></p>`).join('')}
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
    // The answer lands: it was open until the run was over. With words and with dots it is
    // the puzzle's answer, right, in green. With vectors the box says only that an answer
    // comes out: the vectors' numbers are from two other tasks and another model (the second
    // card), and the source reports no vectors on this puzzle, so no "True" stands there.
    const answered = (step, at, shown = '.p2-dots__answer-done') => {
      step.tween('.p2-dots__answer-wait', { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(shown, { opacity: [0, 1] }, { at, dur: dur.micro });
      if (shown === '.p2-dots__answer-done') step.cls('.p2-dots__answer', 'is-done', { at });
      step.tween('.p2-dots__answer', { scale: [1, 1.16] }, { at, dur: 140 });
      step.tween('.p2-dots__answer', { scale: [1.16, 1] }, { at: at + 140, dur: 260 });
    };
    // Every later step starts from a dark machine: no pulses, the answer open, no reading.
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
    // A result lands on the puzzle's card: its row appears, the bar runs out, and the number
    // it reports arrives as the bar does (no frame shows the number over a bar that is still
    // short). The number does not count up, and it grows by so little as it lands that it
    // stays clear of the row above.
    const land = (step, row, at) => {
      const [, key] = BARS.puzzle.find(([name]) => name === row);
      const bar = `[data-bar="puzzle-${row}"]`;
      step.tween(bar, { opacity: [0, 1] }, { at, dur: dur.micro });
      step.tween(`${bar} i`, { '--v': ['0%', `${fact(key).value}%`] }, { at, dur: dur.enter });
      step.tween(`${bar} .p2-dots__bar-value`, { opacity: [0, 1] }, { at: at + dur.enter - 150, dur: dur.micro });
      step.tween(`${bar} .p2-dots__bar-value`, { scale: [1.12, 1] }, { at: at + dur.enter - 150, dur: 300 });
      return at + dur.enter;
    };
    // The pairs on the vectors' card, both tasks at once: in each, what the vectors are
    // compared with, then the vectors.
    const duels = (step, at) => Object.keys(BARS).filter((task) => task !== 'puzzle').forEach((task) => {
      step.tween(`[data-task="${task}"]`, { opacity: [0, 1] }, { at, dur: dur.micro });
      BARS[task].forEach(([row], i) => step.tween(`[data-side="${task}-${row}"]`, { opacity: [0, 1], y: [8, 0] }, { at: at + 150 + i * 150, dur: dur.micro }));
    });
    // The line under the picture gives its place to the next one.
    const under = (step, from, to, at) => {
      step.tween(from, { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(to, { opacity: [0, 1] }, { at: at + dur.micro, dur: dur.enter });
    };

    // Enter: the way here from the last two slides, under the picture; and the chain of slide
    // 3. Up a column, down through the token it writes, up the next one; the answer leaves
    // the last column, and the puzzle's card takes its first row. Then the monitor reads the
    // text row.
    const enter = ctx.step({ label: 'words: a chain through written tokens' });
    enter.tween('.p2-dots__machine', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    enter.show('.p2-dots__bridge', { at: 300, rise: 0 });
    enter.show('[data-card="puzzle"]', { at: 400 });
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
    land(enter, 'words', chained + 400);
    const readAt = chained + 900;
    enter.tween(lens, { opacity: [0, 1] }, { at: readAt, dur: dur.micro });
    enter.tween(lens, { x: [0, DOTS.lensTravel] }, { at: readAt + 100, dur: 1200, ease: 'linear' });
    thinking.forEach((col) => {
      enter.cls(`[data-token="${col}"]`, 'is-read', { at: passes(col, readAt + 100, 1200) });
      enter.tween(`[data-word="${col}"]`, { opacity: [0, 1] }, { at: passes(col, readAt + 100, 1200), dur: dur.micro });
    });
    enter.tween('[data-verdict="words"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: readAt + 1400, dur: dur.enter, ease: 'back' });

    // Click 1: every reasoning token becomes a filler dot, and the answer is open again:
    // one beat in which nobody knows whether it will still be right. In that beat the
    // baseline lands on the card: with no reasoning at all the answers are near chance, and a
    // mark at that level runs across the bars, with a note under the card that says whose
    // word "near-random" is. Then all columns work at once and the last one
    // gathers them; the answer lands, right, and at that moment the dots' bar runs through
    // the mark to its number. Only then the monitor reads the text row: dots. Last, under the
    // picture, why dots are enough here.
    const fill = ctx.step({ label: 'dots: no words, and still the right answer' });
    reset(fill, 'words', '[data-word]');
    fill.tween('.p2-dots__drop', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    way(fill, 'words', 'dots', 300);
    thinking.forEach((col, k) => {
      const at = 400 + k * 130;
      fill.tween(tokenText(col), { scale: [1, 0] }, { at, dur: 110, ease: 'in' });
      fill.type(tokenText(col), '', { at: at + 110, dur: 0 });
      fill.cls(`[data-token="${col}"]`, 'is-read', { at: at + 110, on: false });
      fill.cls(`[data-token="${col}"]`, 'is-dot', { at: at + 110 });
      fill.tween(`[data-dot="${col}"]`, { opacity: [0, 1], scale: [0, 1] }, { at: at + 110, dur: 260, ease: 'back' });
    });
    fill.tween('.p2-dots__answer', { scale: [1, 1.16] }, { at: DOTS_AT.open, dur: 160 });
    fill.tween('.p2-dots__answer', { scale: [1.16, 1] }, { at: DOTS_AT.open + 160, dur: 300 });
    util.range(cols).forEach((col) => rise(fill, col, DOTS_AT.again));
    fill.tween('.p2-dots__gathers', { opacity: [0, 1] }, { at: DOTS_AT.again + 150, dur: 60 });
    fill.tween('.p2-dots__gather', { '--draw': [1, 0] }, { at: DOTS_AT.again + 150, dur: 500, ease: 'inOut', stagger: 30 });
    fill.tween('.p2-dots__gather-head', { opacity: [0, 1] }, { at: DOTS_AT.again + 600, dur: dur.micro });
    const baseline = land(fill, 'none', DOTS_AT.open + 100);
    fill.tween('.p2-dots__chance-mark, .p2-dots__chance-name', { opacity: [0, 1] }, { at: baseline - 100, dur: dur.enter });
    // Whose word "near-random" is, under the card, for as long as the baseline is the news.
    fill.tween('.p2-dots__chance-note', { opacity: [0, 1] }, { at: baseline - 100, dur: dur.enter });
    answered(fill, DOTS_AT.solved);
    land(fill, 'hidden', DOTS_AT.solved);
    const reread = sweep(fill, DOTS_AT.solved + 600, 700);
    thinking.forEach((col) => fill.tween(`[data-filler="${col}"]`, { opacity: [0, 1] }, { at: passes(col, reread, 700), dur: dur.micro }));
    fill.tween('[data-verdict="dots"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: reread + 800, dur: dur.enter, ease: 'back' });
    // Last, with the monitor's verdict: why dots are enough for this puzzle, in the place of
    // the line that led here.
    under(fill, '.p2-dots__bridge', '.p2-dots__why-dots', reread + 600);

    // Click 2: no text row at all, and the answer open once more. Each column hands its last
    // state to the next one as a vector: a chain again, with nothing for a monitor to read.
    // Then the second card, both pairs at once: the vectors win one and lose one. With it,
    // under the picture, the slide's main line: how this squares with slide 3, and why it
    // makes monitoring fragile. The line stays through the last click.
    const latent = ctx.step({ label: 'vectors: a chain with nothing written to read' });
    reset(latent, 'dots', '[data-filler]');
    latent.tween('.p2-dots__chance-note', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    latent.tween('.p2-dots__gathers', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    way(latent, 'dots', 'vectors', 300);
    thinking.forEach((col, k) => latent.tween(`[data-token="${col}"], [data-dot="${col}"]`, { y: [0, -40], opacity: [1, 0] }, { at: 250 + k * 60, dur: dur.enter, ease: 'in' }));
    latent.tween('.p2-dots__band', { opacity: [0, 1] }, { at: 900, dur: dur.enter });
    util.range(cols).forEach((col) => {
      rise(latent, col, DOTS_AT.chain + col * DOTS.feedMs);
      if (col === cols - 1) return;
      const hop = DOTS_AT.chain + col * DOTS.feedMs + rows * DOTS.riseMs - 20;
      latent.tween(`[data-feed="${col}"]`, { opacity: [0, 1] }, { at: hop, dur: 60 });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-line`, { '--draw': [1, 0] }, { at: hop, dur: 170, ease: 'inOut' });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-head`, { opacity: [0, 1] }, { at: hop + 120, dur: 80 });
    });
    answered(latent, DOTS_AT.fed, '.p2-dots__answer-other');
    const blind = sweep(latent, DOTS_AT.fed + 300, 700);
    latent.cls(lens, 'p2-is-off', { at: blind + 700 });
    latent.tween('[data-verdict="none"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: DOTS_AT.read, dur: dur.enter, ease: 'back' });
    latent.show('[data-card="vectors"]', { at: DOTS_AT.read + 100 });
    // The puzzle's card steps back as the vectors' card arrives: its three bars are not the
    // vectors' result.
    latent.tween('[data-card="puzzle"]', { opacity: [1, 0.5] }, { at: DOTS_AT.read + 100, dur: dur.enter });
    duels(latent, DOTS_AT.read + 300);
    under(latent, '.p2-dots__why-dots', '.p2-dots__holds', DOTS_AT.read + 200);

    // Click 3: the sentence that closes Part 2, on a beat of its own: the picture steps back
    // and the three ways written reasoning fails that the part has shown come one by one,
    // each with what its slide showed (the hint left out; a reason that was not the real one,
    // in the paper's words; the written reasoning gone after training). It sums up the part;
    // it does not argue from the main line. The panel covers the machine and the cards. What
    // would show around it goes: the main line under it, and the note of the second card,
    // which hangs below that card's border. The cues, which belong to the clicks before, step
    // back.
    const sum = ctx.step({ label: 'Part 2 in one sentence: three ways written reasoning fails' });
    sum.tween('.p2-dots__machine', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__cards', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__under', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    sum.tween('[data-legend="vectors-model"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    sum.tween('.dk-cues', { opacity: [1, 0.3] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__sum', { opacity: [0, 1], scale: [0.96, 1] }, { at: 200, dur: dur.enter });
    SUM.lines.forEach((_, i) => sum.tween(`[data-sum="${i}"] > *`, { opacity: [0, 1], x: [-16, 0] }, { at: 700 + i * 450, dur: dur.enter }));
    sum.hold(300);
  };

  Deck.register({
    id: 'p2-dots',
    part: 2,
    // The title says what the two papers show; the main line under the picture says why
    // that leaves slide 3 standing: these models are small and trained for it, slide 3 is
    // about today's large models.
    title: 'Small models can learn to reason without words',
    cues: [
      { text: 'Written reasoning: the monitor reads every step', step: 0, at: 1600 },
      { text: 'Dots: still the right answer, with no reasoning to read', step: 1, at: DOTS_AT.solved },
      { text: 'Vectors: nothing to read; they win at logic, lose at math', step: 2, at: DOTS_AT.read },
    ],
    // The footer has room for two sources beside its three tags (a third is cut off, and the
    // lint fails on that). The two that are not in it are named where they are used: the
    // closing panel names Chen et al. beside the words it quotes (slide 6 cites the place,
    // Sec. 3), and the main line recalls slides 2 and 3, which cite Korbak et al.
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
