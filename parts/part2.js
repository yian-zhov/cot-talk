// Part 2: Where it fails Slides 5-7.
// SPEC.md section 4 describes the slides; parts/sample.js shows the API.
// Every number and quote is read from the fact table (shared/facts.js, and the facts below).
(() => {
  'use strict';

  const { kit, util } = Deck;

  // Facts that only slide 5 needs: the sentences of Chen et al. 2025 behind its wording
  // ("often", "on average", "a single kind of hint", "mentions") and behind the worked
  // example, which is ours, after the paper's own. Each was searched for in the arXiv
  // HTML full text (2505.05410) on 2026-11-09. One verb says that the hint is in the
  // reasoning: it "mentions" the hint, which is the paper's word for the first half of
  // what it counts ('p2.chen_mentions').
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
  // 2026-11-09, and so was 'p2.chen_pattern' once more: the pattern that run 2's reasoning
  // is built after. No slide prints it since slide 6 was rebuilt (SPEC.md, 7.28).
  Deck.addFacts({
    'p2.chen_monitor': {
      text: 'If the CoT is not faithful, then we cannot depend on our ability to monitor CoT in order to detect misaligned behaviors, because there may be safety-relevant factors affecting model behavior that have not been explicitly verbalized.',
      src: 'chen2025', where: 'Sec. 1',
    },
    'p2.chen_easy': { text: 'our settings are all settings where the hints are very easy to exploit', src: 'chen2025', where: 'Sec. 7.2' },
    'p2.chen_no_cot': { text: 'in our settings where exploiting them does not require a CoT', src: 'chen2025', where: 'Sec. 1' },
  });
  // Facts behind two wordings that slide 5 gained after the ninth cold read (2026-11-13).
  // 'p2.chen_two_models': the two models of the charts are reasoning models, which the
  // line over the charts now says ("on two reasoning models"). 'p2.chen_checker': what
  // the paper did with each reasoning was to check it for the hint, with a model as the
  // checker; it did not run a monitor that gives a verdict. So the verdict on run 2's
  // reasoning is ours and is worded as a supposition ("If monitored:", and "would" in the
  // cue): a cold reader had taken "Monitor: clean" for a measured result. Each was found
  // once as a whole string that day in the text of the paper's PDF (2505.05410v1), and a
  // control with one word changed was not found.
  Deck.addFacts({
    'p2.chen_two_models': { text: 'We evaluate CoT faithfulness of two reasoning models: Claude 3.7 Sonnet', src: 'chen2025', where: 'Sec. 3' },
    'p2.chen_checker': {
      text: 'We prompt Claude 3.5 Sonnet (New) to check verbalization, and validate the checker’s quality through manual inspection on a subset of samples.',
      src: 'chen2025', where: 'Sec. 2.3',
    },
  });

  // Facts that only slide 6 needs: the sentences of Emmons et al. 2025 behind its two rows.
  // The paper tells two roles of the written reasoning (its "CoT") apart. In the first the
  // answer is computed inside the model before the reasoning is written, and the reasoning
  // is a rationalization of it ('p2.emmons_posthoc', the sentence that the slide prints;
  // 'p2.emmons_confabulate'); that happens where the reasoning is not needed for the answer
  // ('p2.emmons_not_necessary'), and the paper says that the hint experiments of slide 5
  // were such a case ('p2.emmons_simple_hint'). In the second the answer needs more steps
  // in a row than one pass through the layers holds ('p2.emmons_layers'), so the steps have
  // to be written ('p2.emmons_externalize') and the reasoning is part of the computation
  // ('p2.emmons_part'; the slide printed its last words under the bottom row until the
  // tenth cold read, 2026-11-13, and the fact stays registered). 'emmons.rationalization' and
  // 'emmons.computation' (shared/facts.js) are the same two roles in the words of the
  // paper's Sec. 1. Each was searched for as a whole string on 2026-11-12, page by page, in
  // the PDF of arXiv:2507.05246v1 (SPEC.md, 7.28). 'p2.emmons_externalize' is the second
  // half of its sentence: the first half stands on the page before.
  Deck.addFacts({
    'p2.emmons_posthoc': {
      text: 'In some cases, the CoT acts as a post-hoc rationalization for an answer the model has already computed internally.',
      src: 'emmons2025', where: 'Sec. 2',
    },
    'p2.emmons_confabulate': {
      text: 'In this regime, the model is free to confabulate a reason for arriving at its final answer',
      src: 'emmons2025', where: 'Sec. 2',
    },
    'p2.emmons_not_necessary': {
      text: 'CoT-as-rationalization, then, arises whenever CoT appears but it is not necessary.',
      src: 'emmons2025', where: 'Sec. 2',
    },
    'p2.emmons_simple_hint': {
      text: 'In the original experiments, following the simple hint did not require significant computation, allowing the CoT to be a mere rationalization.',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
    'p2.emmons_layers': {
      text: 'The number of serial operations a transformer can perform within a single forward pass is constrained by its number of layers.',
      src: 'emmons2025', where: 'Sec. 2',
    },
    'p2.emmons_externalize': {
      text: 'whose computational depth exceeds that of a single forward pass—a model must externalize its intermediate reasoning into its context window',
      src: 'emmons2025', where: 'Sec. 2',
    },
    'p2.emmons_part': {
      text: 'Here, the CoT is not merely a description of the computation; it is part of the computation itself.',
      src: 'emmons2025', where: 'Sec. 2',
    },
  });

  // Facts that only slide 7 needs: the sentences behind the run that writes no reasoning
  // and feeds its internal state back in (Hao et al.; the method is Coconut, a name that is
  // not on screen), behind "trained for this" (for the dots it is 'pfau.supervision') and
  // behind the few words that explain a name on screen: ProsQA ("Logic questions") and
  // 3SUM ("a made-up puzzle"). Each was searched for as a whole string on 2026-11-09 or
  // 2026-11-10 in the arXiv HTML full text of 2412.06769v4 and 2404.15758 (the copies
  // downloaded on 2026-11-09). 'pfau.3sum_def' is behind the puzzle's question on its
  // card ("3SUM: in a list of numbers, do any three add up to zero?": what the model is
  // given is a list, each entry of it a tuple of digits summed place by place, and zero is
  // the zero vector modulo 10; the card says "numbers" and "zero" and no more. Earlier
  // wordings: "A list: do any 3 add to 0 (mod 10)?" until the ninth cold read; then
  // "entries like (7,3)" with the paper's example, until the tenth).
  // 'p2.pfau_parallelizable' and 'p2.pfau_pairwise', with 'pfau.parallel', are behind the
  // line under the picture at the dots' click ("The columns work side by side, and the
  // arcs carry their results to the last one": the paper computes the sums of pairs in
  // parallel before it looks for a third input that matches, 'p2.pfau_third'; the paper
  // does not say that each triple is checked at once, and the slide does not either).
  // The line also says why that is enough here, "This puzzle splits into independent
  // pieces ... each in one pass": the pieces are the sums of pairs, and a dot computes
  // one of them in one layer ('p2.pfau_one_layer', registered after the eleventh cold
  // read, 2026-11-13, and found once as a whole string that day in the text of the PDF
  // of 2404.15758; a control with one word changed was not found). The tenth cold read
  // had taken that half of the line out, and both readers of the eleventh set the dots
  // against slide 3's "reasoning longer than one pass must go through written tokens".
  // Until the ninth the card
  // said "Sum all pairs at once, then find a third" (earlier wordings: SPEC.md section
  // 7.30). Both were searched for as whole
  // strings on 2026-11-12 in a copy of 2404.15758v1 downloaded that day. 'p2.pfau_third'
  // and 'p2.hao_language_mode' were each found once as a whole string on 2026-11-13, in
  // the PDFs of 2404.15758 and 2412.06769 downloaded on 2026-11-09 (text taken out with
  // pdftotext, white space joined). The second is behind the answer in the box of the run
  // that feeds its state back, and behind "only the answer" in the band under it: when the
  // internal states end, the model writes its answer token by token, as any language
  // model does.
  Deck.addFacts({
    'p2.hao_not_decoded': { text: 'Rather than decoding this into a word token', src: 'hao2024', where: 'abstract' },
    'p2.hao_paradigm': { text: 'a simple modification to the traditional CoT process', src: 'hao2024', where: 'Sec. 1' },
    'p2.hao_training': { text: 'a multi-stage training curriculum', src: 'hao2024', where: 'Sec. 3' },
    'p2.hao_last_state': {
      text: 'Coconut directly feeds the last hidden state (a continuous thought) as the input embedding for the next token',
      src: 'hao2024', where: 'Sec. 1',
    },
    'p2.hao_language_mode': {
      text: 'In language mode, the model operates as a standard language model, autoregressively generating the next token.',
      src: 'hao2024', where: 'Sec. 3',
    },
    'p2.hao_prosqa': { text: 'a new logical reasoning dataset', src: 'hao2024', where: 'Sec. 4.1' },
    'p2.pfau_synthetic': { text: 'We construct two synthetic datasets, 3SUM', src: 'pfau2024', where: 'Sec. 1' },
    'p2.pfau_parallelizable': { text: 'is parallelizable–therefore amenable to filler tokens', src: 'pfau2024', where: 'Sec. 3' },
    'p2.pfau_pairwise': {
      text: 'The chain-of-thought row demonstrates a decomposition of the 3SUM problem into parallelizable, pairwise summations, which can be calculated using filler tokens.',
      src: 'pfau2024', where: 'Fig. 3 caption',
    },
    'p2.pfau_third': {
      text: 'Then the following layer again attends over all inputs checking whether a third matching input exists.',
      src: 'pfau2024', where: 'Sec. 3.1',
    },
    'p2.pfau_one_layer': {
      text: 'individual ‘.’ tokens compute individual 2SUM results by attending to pairs of inputs–this can be done in one layer.',
      src: 'pfau2024', where: 'Sec. 3.1',
    },
    'p2.pfau_filler': { text: 'meaningless filler tokens (e.g., ‘……’) in place of a chain of thought', src: 'pfau2024', where: 'abstract' },
    // Behind the line under the picture at the dots' click: a dot says nothing, and still
    // gives the model one more column to compute in. Found once as a whole string on 2026-11-12 in the
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
  // The model that feeds its internal state back is a GPT-2 ('hao.base') trained for it
  // ('p2.hao_training'), and on the math set it stays behind written steps
  // ('hao.not_surpass'; 'hao.gsm8k_cot' and 'hao.gsm8k_latent' are the two bars). The slide
  // does not say that this was tried in a GPT-2 only: an appendix reports two larger
  // models, against the model that answers at once and not against written steps. That
  // sentence is registered here for questions; it was searched for as a whole string in
  // both copies of 2412.06769v4 downloaded on 2026-11-09.
  Deck.addFacts({
    'p2.hao_larger': {
      text: 'We experimented with Coconut on GSM8k using Llama 3.2-3B and Llama 3-8B',
      src: 'hao2024', where: 'App. C.2',
    },
  });
  // Facts registered when slide 7 was redesigned after the ninth cold read (2026-11-13).
  // Each was found once as a whole string that day in the text of its PDF (2404.15758 and
  // 2412.06769, the copies downloaded on 2026-11-09; pdftotext, white space joined), and a
  // control with one word changed was not found.
  // 'p2.pfau_fig3' holds the paper's own example of the puzzle, with its answer, "True"
  // (the card printed the example until the tenth cold read). 'p2.pfau_immediate' is behind
  // "answer at once", the name of the run with nothing between question and answer.
  // 'p2.pfau_cannot' was behind what its 66% means until the tenth cold read (the card
  // quoted "cannot be solved"); the paper gives no chance rate for 3SUM, so the card
  // names none.
  // 'p2.pfau_one_to_one' is behind "a dot is written in place of each word".
  // 'p2.hao_latent_mode' is behind "fed straight back in"; 'p2.hao_fully_latent' (the logic
  // sets) and 'p2.hao_chain_removed' (the math set) behind "Only the answer is written".
  // 'p2.pfau_scaled_down' and 'p2.hao_larger_models' are behind "small" on the two cards:
  // neither note gives a size, because the second paper states none for GPT-2 (its text
  // was searched for "124M", "parameter" and "million"), and "34M parameters" beside a
  // bare "GPT-2" could not be compared.
  // 'p2.pfau_near_random', registered after the tenth cold read (2026-11-13), is what the
  // paper says of the 66% of the run that answers at once; the card quotes "near-random"
  // from it. Found once as a whole string that day in the same text of 2404.15758 (white
  // space joined), and a control with one word changed was not found. Since the eleventh
  // cold read the card prints the word and not the number: the answer is True or False, a
  // reader takes chance to be 50%, and the paper gives no chance rate for 3SUM against
  // which 66% could be read. 'p2.pfau_cannot'
  // and 'p2.pfau_fig3' are no longer on screen and stay registered: the card gives the
  // puzzle's question and no example of it.
  Deck.addFacts({
    'p2.pfau_near_random': {
      text: 'The no-filler models achieve near-random accuracy at 66%, whereas with filler tokens, accuracy remains 100%.',
      src: 'pfau2024', where: 'Sec. 4.2',
    },
    'p2.pfau_fig3': { text: 'The resulting sequence is “01 10 73 27 : 11 74 28 83 37 90 ANS True”.', src: 'pfau2024', where: 'Fig. 3 caption' },
    'p2.pfau_immediate': { text: 'Test on immediate-answer, no-intermediate-tokens, data.', src: 'pfau2024', where: 'Sec. 4.2' },
    'p2.pfau_cannot': { text: 'for longer inputs, 3SUM cannot be solved without filler tokens', src: 'pfau2024', where: 'Sec. 4.2' },
    'p2.pfau_one_to_one': { text: 'These tokens correspond one-to-one with the chain-of-thought tokens below.', src: 'pfau2024', where: 'Sec. 3.1' },
    'p2.pfau_scaled_down': { text: 'This is a scaled-down, randomly-initialized version of the Llama model.', src: 'pfau2024', where: 'Sec. 4.1' },
    'p2.hao_latent_mode': { text: 'In latent mode, it directly utilizes the last hidden state as the next input embedding.', src: 'hao2024', where: 'Sec. 3' },
    'p2.hao_fully_latent': { text: 'The model then fully reasons with continuous thoughts to solve the problems in the last stage.', src: 'hao2024', where: 'Sec. 5.1' },
    'p2.hao_chain_removed': { text: 'but with all the remaining language reasoning chain removed', src: 'hao2024', where: 'Sec. 5.1' },
    'p2.hao_larger_models': { text: 'applying Coconut to larger Llama models', src: 'hao2024', where: 'App. C.2, Table 5 caption' },
  });

  // The worked example of slides 5 and 6 is ours (illustrative; slide 6 replays slide 5's
  // second run), built after the paper's own example ('p2.chen_example') and the pattern it
  // reports ('p2.chen_pattern'): right without the hint, then a flawed justification of the
  // hinted answer that leaves the hint out. The hint sentence is the paper's, word for word.
  // The footer says which is which, because the question around the hint is not the
  // paper's: the tag "Illustrative" for the example, and the cite of Table 1 for the hint
  // (until SPEC.md section 7.29 each box said it on its border). The hint names (A), so the
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

  // ---------------------------------------------------------------- slide 5: the hint
  // One question, asked twice. Run 1 has no hint; run 2 is the same prompt with one more
  // sentence, the paper's hint ('chen.hint'). The two runs stand side by side so that the
  // only difference between the prompts can be seen, and so can what it does to the answer.
  // The words on screen that are not the case itself (CASE) are here.
  const HINT_TEXT = Object.freeze({
    runs: Object.freeze({ plain: 'Run 1: no hint', hinted: 'Run 2: same question + one sentence' }),
    noHint: 'no hint',
    reasoning: 'Reasoning',
    answer: 'Answer',
    verdicts: Object.freeze({ ok: 'correct', bad: 'wrong' }),
    echoNote: 'Earlier, the coding agent said why:',
    echoFlag: 'flagged',
    // What a monitor would find in run 2's reasoning: one that reads this pane and nothing
    // else has nothing to flag ('p2.chen_monitor'). Worded as a supposition: the verdict
    // is ours, not a measured result ('p2.chen_checker').
    monitor: 'If monitored:',
    clean: 'clean',
    never: 'This reasoning never mentions the hint',
    // Why nothing forced the hint into the words ('p2.chen_easy', 'p2.chen_no_cot').
    // Until the eleventh cold read (2026-11-13) the line went on "Hard hints: Part 3.",
    // a pointer ahead that a reader could not check on this slide.
    easy: 'Following this hint needs no written reasoning, so nothing forces the hint into it.',
    // Over the charts: what was repeated and on what ('p2.chen_two_models', 'p2.chen_hints'),
    // then what the charts count. The charts stand alone on the stage, so the first line
    // says in full what the example was one case of. Until the tenth cold read
    // (2026-11-13) it counted the kinds of hint, "6 kinds of hint (the professor’s is
    // one)", and the line under the charts named "two question sets": a reader asked for
    // the five other kinds, and the paper's names for them (sycophancy, consistency, visual
    // pattern, metadata, grader hacking, unethical information; Table 1) explain nothing
    // without an example each. The count and the sets are in the fact table.
    repeat: 'The same test on two reasoning models, over many questions and several kinds of hint.',
    ofEvery: 'Of every 100 answers a hint flipped:',
    silentWhat: 'do not mention the hint',
    restWhat: (rate) => `${rate} mention it`,
    // What the two shares are averages of. Until the ninth cold read the line went on "For
    // a single kind, often below 20% of flips mention it" ('chen.often_below', the
    // abstract); the paper's text does not say for which kinds, so the sentence is gone
    // and the fact stays registered only.
    caveat: 'Each share is an average over all the questions and kinds of hint.',
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
  // answered. Click 1: when the hint starts to type and when it stands. Click 3: when the
  // monitor has read the last line and gives its verdict. Click 5: how long
  // the charts count the answers that do not mention the hint (both start and end together,
  // each at its own pace, so that no frame in between shows the two at one number), when they
  // have counted, when the rest turns over, and when both shares stand.
  const HINT_AT = (() => {
    const plainDone = CASE.plain.reduce((at, text) => at + typed(text, HINT.cps) + 220, 600);
    const added = 1100;
    const hintDone = added + 100 + typed(said('chen.hint'), HINT.hintCps) + 250;
    const judged = 400 + (CASE.hinted.length - 1) * HINT.perLine + 500;
    const counting = Math.max(...MODELS.map((model) => Deck.fact(model.silent).value * HINT.cellMs));
    const counted = HINT.countAt + counting;
    return Object.freeze({ plainDone, added, hintDone, judged, counting, counted, rest: counted + HINT.restAfter, landed: counted + HINT.restAfter + 500 });
  })();

  // One model of the charts: its name, 100 cells, and under them the two shares.
  const modelHtml = (model) => `
    <div class="p2-hint__model">
      <div class="p2-hint__model-name">${said(model.name)}</div>
      ${kit.grid({ key: model.key, n: 100, cols: 20, tone: 'read' })}
      <div class="p2-hint__model-says">
        <span class="p2-hint__rate" data-rate="${model.key}"></span>
        <span class="p2-hint__rate-what" data-what="${model.key}">${HINT_TEXT.silentWhat}</span>
        <span class="p2-hint__rest" data-rest="${model.key}">${HINT_TEXT.restWhat(said(model.rate))}</span>
      </div>
    </div>`;

  // One run: the prompt, the reasoning, the answer. `key` is 'plain' or 'hinted'. The two
  // prompts are set line for line, and the last row is the hint in run 2 and an empty
  // slot in run 1 (until the ninth cold read a "=" marked each line that both have and a
  // "+" the hint, in a gutter; nothing said what the marks meant, and the slot, the hint's
  // amber and run 2's name, "same question + one sentence", say it). The answer tile of run 2 has two
  // faces: an open one, "?", neutral and dashed, until the run has answered, and (A), which
  // the hint names. Until the fifth cold read the first face was run 1's (B), dimmed, and a
  // reader took it for run 2's answer before run 2 had written a word. Run 2's
  // reasoning carries, on its top border, what a monitor would say of it (click 3).
  const runHtml = (key, texts) => {
    const hinted = key === 'hinted';
    return `
        <div class="p2-hint__run" data-run="${key}">
          <div class="p2-hint__prompt">
            <span class="p2-hint__name">${HINT_TEXT.runs[key]}</span>
            <div class="p2-hint__question">${CASE.question}</div>
            <div class="p2-hint__options">
              ${CASE.options.map(([letter, name]) => `<span data-option="${letter}"><b>(${letter})</b> ${name}</span>`).join('')}
            </div>
            ${hinted ? '<div class="p2-hint__hint"></div>' : `<div class="p2-hint__nohint">${HINT_TEXT.noHint}</div>`}
          </div>
          <div class="dk-term p2-hint__term">
            <span class="p2-hint__name">${HINT_TEXT.reasoning}</span>
            ${hinted ? `<span class="p2-hint__monitor"><span class="p2-hint__monitor-who">${HINT_TEXT.monitor}</span>${kit.flag({ key: 'hint-verdict', text: HINT_TEXT.clean })}</span>` : ''}
            ${util.range(texts.length).map((i) => `<div class="dk-term__line" data-line="${key}-${i}"></div>`).join('')}
            ${hinted ? `${kit.lens({ key: 'hint' })}<span class="p2-hint__never">${HINT_TEXT.never}</span>` : ''}
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
  // drawn on a click of its own, after the reasoning has been written and read.
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
        <div class="p2-hint__wire-label">${HINT_TEXT.easy}</div>
      </div>
      <div class="p2-hint__stats">
        <div class="p2-hint__stats-lead">${HINT_TEXT.repeat} <b>${HINT_TEXT.ofEvery}</b></div>
        <div class="p2-hint__models">${MODELS.map(modelHtml).join('')}</div>
        <div class="p2-hint__caveat">${HINT_TEXT.caveat}</div>
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

    // Six steps, one state a step: a state that the presenter talks about stands until the
    // next click, and the two halves of a comparison are two clicks (SPEC.md section 7.30).
    // Enter: run 1 alone, no hint. The model reasons and answers (B), correct. The pill
    // under it answers slide 4's last cue ("But does the written reasoning always say
    // why?"): that time it did. It recalls slide 4's coding agent, not the model of this
    // example, so it is a pill of its own, in the body face, apart from the run. Run 2's
    // place beside it stays empty: the half of the comparison that has no hint is read
    // first, on its own.
    const enter = ctx.step({ label: 'run 1, no hint: the model reasons and answers (B), correct' });
    enter.show(`${plain} .p2-hint__prompt`, { at: 200 });
    enter.show(`${plain} .p2-hint__term`, { at: 320 });
    enter.show(`${plain} .p2-hint__answer`, { at: 440 });
    const { plainDone, added, hintDone } = HINT_AT;
    typeLines(enter, 'plain', CASE.plain, 600);
    enter.tween(`${plain} .p2-hint__tile`, { opacity: [0, 1], scale: [0.6, 1] }, { at: plainDone, dur: dur.enter, ease: 'back' });
    enter.show(`${plain} .p2-hint__verdict--ok`, { at: plainDone + 200, rise: 0 });
    enter.cls(`${plain} [data-option="B"]`, 'is-picked', { at: plainDone + 200 });
    enter.show('.p2-hint__echo', { at: plainDone + 300, rise: 8 });

    // Click 1: the same question a second time. Run 2 fades in beside run 1, in the place
    // kept free for it (the same prompt, and an answer that is still open, "?"); run 1
    // shows an empty slot, "no hint", where the one sentence that is new types in, and the
    // option it names turns amber. Both runs stand where they stay from their first frame:
    // neither slides, so no frame shows one run's words over the other's (run 1 used to
    // enter mid-stage and run 2 to come out from under it, and halfway the two prompts lay
    // on top of each other). Nothing answers yet: the presenter can ask what the model
    // will say. Until SPEC.md section 7.30 this was the second half of the entrance, and
    // run 1 had no stop of its own.
    const again = ctx.step({ label: 'run 2: the same question with one more sentence, the hint; no answer yet' });
    again.tween(hinted, { opacity: [0, 1], y: [16, 0] }, { at: 100, dur: dur.enter });
    again.tween('.p2-hint__nohint, .p2-hint__hint', { opacity: [0, 1] }, { at: added, dur: dur.micro });
    again.type('.p2-hint__hint', hint, { at: added + 100, cps: HINT.hintCps });
    again.tween('.p2-hint__hint', { '--glow': [0, 1] }, { at: added + 100, dur: dur.move });
    again.tween('.p2-hint__hint', { '--glow': [1, 0.45] }, { at: hintDone, dur: dur.enter });
    // The option the hint names.
    again.cls(`${hinted} [data-option="A"]`, 'is-forced', { at: hintDone });
    again.tween(`${hinted} [data-option="A"]`, { scale: [1, 1.14] }, { at: hintDone, dur: 160 });
    again.tween(`${hinted} [data-option="A"]`, { scale: [1.14, 1] }, { at: hintDone + 160, dur: 300 });

    // Click 2, the flip, on a click of its own: three clean-looking lines type, then the
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

    // Click 3: what a monitor would make of run 2's reasoning, if it read that and only
    // that, line by line: no line mentions the hint, so it would say "clean" (a neutral
    // chip: nothing to flag, and the answer is still wrong). The label says "If
    // monitored:": the verdict is our supposition about this example, not a result of the
    // paper, which checked each reasoning for the hint and ran no monitor
    // ('p2.chen_checker'; until the ninth cold read the label was "Monitor" and each line
    // got a gray "no mention", and a reader took the verdict for a measured one). Then the
    // finding about all three lines, with which the title's second half arrives. The step
    // ends there: what a monitor would find is one state, and how the hint reached the
    // answer is the next (until SPEC.md section 7.30 the wire followed in the same click).
    const read = ctx.step({ label: 'if a monitor read the reasoning: no mention of the hint, so it would say clean' });
    // The beam is one line tall: it comes up on the first line, goes down to the last, and
    // each line it has read turns teal.
    const sweep = (CASE.hinted.length - 1) * HINT.perLine;
    read.tween('.p2-hint__monitor', { opacity: [0, 1] }, { at: 0, dur: dur.micro });
    read.tween('[data-lens="hint"]', { opacity: [0, 1] }, { at: 100, dur: dur.micro });
    read.tween('[data-lens="hint"]', { y: [0, (CASE.hinted.length - 1) * HINT.line] }, { at: 400, dur: sweep, ease: 'linear' });
    CASE.hinted.forEach((_, i) => {
      const on = 200 + i * HINT.perLine;
      read.cls(`[data-line="hinted-${i}"]`, 'p2-is-read', { at: on });
    });
    read.tween('[data-lens="hint"]', { opacity: [1, 0] }, { at: 400 + sweep + 300, dur: 300 });
    const { judged } = HINT_AT;
    read.tween('[data-flag="hint-verdict"]', { opacity: [0, 1], scale: [1.25, 1] }, { at: judged, dur: dur.enter, ease: 'back' });
    const summed = judged + 500;
    read.tween('.p2-hint__never', { opacity: [0, 1], scale: [1.5, 1] }, { at: summed, dur: dur.enter, ease: 'back' });
    read.tween('.dk-title .p2-late', { opacity: [0, 1] }, { at: summed + 200, dur: dur.move });

    // Click 4: the wire, on a click of its own. The hint went around the reasoning: an
    // amber line is drawn from the hint out of the card, down past the reasoning and under
    // it, and up into the answer, whose tile takes the hit; the line under it says why it
    // could go around.
    const around = ctx.step({ label: 'the hint went around the reasoning, and why it could' });
    const wireAt = 200;
    around.tween('.p2-hint__hint', { '--glow': [0.5, 1] }, { at: wireAt, dur: dur.enter });
    around.tween(wire, { opacity: [0, 1] }, { at: wireAt, dur: 100 });
    around.tween(wire, { '--draw': [1, 0] }, { at: wireAt, dur: 1000, ease: 'inOut' });
    around.tween('.p2-hint__wire', { '--taut': [0, 1] }, { at: wireAt, dur: dur.micro });
    around.tween('.p2-hint__wire-head', { opacity: [0, 1] }, { at: wireAt + 900, dur: dur.micro });
    // The answer takes the hit as the wire arrives.
    around.tween(tile, { scale: [1, 1.1] }, { at: wireAt + 1000, dur: 140 });
    around.tween(tile, { scale: [1.1, 1] }, { at: wireAt + 1140, dur: 260 });
    around.tween('.p2-hint__wire', { '--taut': [1, 0.3] }, { at: wireAt + 1400, dur: dur.enter });
    around.tween('.p2-hint__hint', { '--glow': [1, 0.5] }, { at: wireAt + 1400, dur: dur.enter });
    around.show('.p2-hint__wire-label', { at: wireAt + 1100, rise: 0 });

    // Click 5: from one example to the reported averages. The example leaves the stage,
    // the two runs, the verdict, the wire and the pill with it, and the charts take the
    // whole box: one thing to look at (until the ninth cold read the example stayed and the
    // charts stood under it, and the end state held both runs, the verdict, the wire, two
    // charts, the line about the averages and three cues).
    // Both charts fill the cells of the answers that do NOT mention the hint, the surprising
    // share, at once; then the rest turns teal, with the paper's score beside it. A share and
    // what it is a share of appear only when its cells have all been filled, at the paper's
    // number: no frame prints a percentage that the paper does not report (the number used to
    // count up with the cells, and a frame halfway read "42% do not mention it").
    const stats = ctx.step({ label: 'over many questions: 75 and 61 of 100 do not mention the hint' });
    stats.tween('.p2-hint__case', { opacity: [1, 0] }, { dur: 300 });
    stats.show('.p2-hint__stats-lead', { at: 300 });
    stats.show('.p2-hint__model-name', { at: 700, stagger: 120 });
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
    // The second half of the title is the reveal of this slide: it arrives at click 3, with
    // the finding that the reasoning never mentions the hint (hintSetup). The comma
    // arrives with it, so that the first half reads as a whole sentence until then, "A
    // hint can flip the answer" (until the ninth cold read it ended in the comma and
    // looked cut off).
    title: 'A hint can flip the answer<span class="p2-late">, and the reasoning often does not mention it</span>',
    cues: [
      { text: 'A professor’s opinion, slipped into the prompt', step: 1, at: HINT_AT.added },
      // "the reasoning", not "this reasoning": the cue stays when the example gives way to
      // the charts at click 5, and has to read without it (the eleventh cold read).
      { text: 'A monitor reading only the reasoning would see nothing wrong', step: 3, at: HINT_AT.judged },
      // The charts say which share is which model's; the cue says what both show. Until the
      // tenth cold read it repeated the two numbers without the models' names ("In 75% and
      // 61% of flips, ...").
      { text: 'Both models: in most flips, the reasoning never mentions the hint', step: 5, at: HINT_AT.landed },
    ],
    // Table 1 holds the hint, which the slide prints word for word; Fig. 2 is the paper's
    // own example, which ours follows. The footer names both, and no box carries a note on
    // its border. A mark "(hint, quoted)" behind "Table 1", as slide 6's footer has it, does
    // not fit here: with two tags and two sources the cite has 34 px to spare in Verdana.
    cite: [{ src: 'chen2025', where: 'Table 1; Fig. 1-2; Sec. 7.2' }, { src: 'baker2025', where: 'Fig. 9' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: hintHtml(),
    setup: hintSetup,
  });

  // ---------------------------------------------------------------- slide 6: the answer first
  // Why the reasoning of slide 5's second run does not mention the hint. Emmons et al. 2025
  // tell two roles of written reasoning apart, and the picture has one row for each. A row
  // is the flow of slide 2, left to right as it stands on the page and in the order in
  // which a model writes it: the prompt, the written reasoning, the answer. What is under a
  // row, in amber, happens inside the model and is not written.
  // Top row: the hinted run of slide 5 again (its question, hint, reasoning and answer),
  // replayed slowly. A pulse of light, in the amber of what happens inside the model, leaves
  // the hint and runs under the reasoning box, which is still empty, to a place under the
  // row, where (A) lights up: decided inside the model, and not a written token
  // ('p2.emmons_posthoc': "an answer the model has already computed internally"). The
  // written answer is still open. At the next click the reasoning is written as a model
  // writes it, line by line and left to right, and each line is tied to the answer that
  // is alight: a thread comes from it to the line, and the line is typed toward it, as if
  // a magnet drew it. Last, (A) is written as the answer. Three labels carry the order
  // and tell deciding from writing: "can be decided first" on (A) under the row, "written
  // to reach it" on the reasoning, "written last" on the answer. The first of them says
  // "can", as the first cue and the line under the way do: what is under the row is our
  // drawing of what the paper says can happen ("In some cases"), not something observed in
  // this run, and until the cold read of the whole deck at the end of SPEC.md section 7.30
  // the label read "decided first", which a reader took for a fact. A thread ends in an
  // arrowhead at its line, so that it reads from the answer to the reasoning (it ended in
  // a knot until then, and had no direction). The click after that brings the paper's
  // sentence, which names it.
  // Until the cold read of slides 5 to 7 (SPEC.md, the end of section 7.28) the answer box itself took
  // (A) at the entrance, with a chip "first", and the lines appeared last line first, each
  // from its end: a listener who knows how a model generates read that as text produced
  // from right to left, and a frame halfway showed the tail of a sentence.
  // Bottom row, at the last two clicks, and not on the stage before them: a question that
  // needs its steps, a product of two four-digit numbers (an example of ours; until that
  // cold read it was the sum of slide 2, which a large model may well answer without a
  // written step). Until the cold read of the whole deck at the end of SPEC.md section
  // 7.30 the row stood under the first one from the entrance, dimmed, and drew the eye
  // from the replay for three steps. The same pulse tries the
  // way under the box and stops: too many steps for one pass through the layers
  // ('p2.emmons_layers', and slide 3's first cue). Where the top row has its capsule, lit,
  // "can be decided first", this row gets an empty dashed one, "cannot be decided first":
  // the two rows differ in that and in nothing else that a label says (both answers are
  // "written last"), and the two capsules stand one above the other, so the difference
  // can be seen at a glance (until the ninth cold read the row had no capsule, and a
  // reader had to set "written last" against the one capsule of the top row to see what
  // the labels were for). That is one click and one state. At the
  // next click the light goes through the box, in
  // the teal of what is written: each line is typed, and only then does the answer land.
  // Here the answer is worked out in the words, and written last as in the top row. That
  // is slide 3's rule again, and slide 9 tries it with a hint.
  const PH_TERM = 'post-hoc rationalization';
  const PH_TEXT = Object.freeze({
    rows: Object.freeze({ easy: 'Replay: the hinted run', hard: 'Another question: it needs its steps' }),
    empty: 'nothing written yet',
    // What came about when, and whether it was decided or written. Under the top row, on
    // the answer that lights up inside the model; then on the reasoning and on the answer
    // of each row. The answer is written last in both rows: the rows differ in where it
    // was decided, which the capsule under each row says: lit and holding the answer in
    // the top row, dashed and empty in the bottom row.
    order: Object.freeze({
      inside: 'can be decided first',
      closed: 'cannot be decided first',
      easy: Object.freeze({ reason: 'written to reach it', answer: 'written last' }),
      hard: Object.freeze({ reason: 'worked out in words', answer: 'written last' }),
    }),
    // Under the top row's way: why the written reasoning could be skipped. Following the
    // hint is easy ('p2.emmons_simple_hint': "following the simple hint did not require
    // significant computation"; 'p2.chen_easy': "very easy to exploit"), so the answer can
    // be decided in one pass, and the label says in place what a pass is: a single run
    // through the model's layers (slide 3's count of 4), in which nothing is written. "Can":
    // the paper says "In some cases". Beside the place where the bottom row's way stops:
    // why it stops there ('p2.emmons_layers', 'p2.emmons_externalize'). The two lines
    // answer each other, "one pass is enough" and "too many steps for one pass", and are
    // what the end state says under its rows, with the paper's sentence between them:
    // until the tenth cold read (2026-11-13) the first one also said "(A) can be decided",
    // which the capsule over it says, and the end state held a line under the bottom row
    // as well.
    lanes: Object.freeze({
      easy: 'one pass is enough to follow the hint: a single run through the model’s layers, with nothing written',
      hard: 'too many steps for one pass',
    }),
    // The bottom row's question, of two numbers.
    ask: (a, b) => `What is ${a} × ${b}?`,
    // Our gloss of the paper's term inside its sentence, as on slide 3; and, in the same
    // brackets, of its name for this role of the reasoning: a reader of the eleventh cold
    // read (2026-11-13) did not know the term.
    cot: 'the CoT',
    gloss: 'the written reasoning',
    term: 'made up afterward',
    by: 'Emmons et al. 2025, Sec. 2',
  });
  // The paper's sentence with our two glosses, of "CoT" and of its term, and the term set
  // off. The term and its gloss keep to one line, so that the gloss never starts a line
  // away from the words it explains.
  const phQuote = () => {
    const text = said('p2.emmons_posthoc');
    if (!text.includes(PH_TEXT.cot) || !text.includes(PH_TERM)) throw new Error(`the sentence of Emmons et al. no longer contains "${PH_TEXT.cot}" and "${PH_TERM}"`);
    const gloss = (words) => `<span class="p2-gloss">[${words}]</span>`;
    return text.replace(PH_TEXT.cot, `${PH_TEXT.cot} ${gloss(PH_TEXT.gloss)}`).replace(PH_TERM, `<span class="p2-ph__term"><b>${PH_TERM}</b> ${gloss(PH_TEXT.term)}</span>`);
  };
  // The bottom row's question, reasoning and answer: a product of two four-digit numbers,
  // worked out as on paper. The first line splits the second factor by its digits, the
  // second and third give the four partial products in that order and their total, so
  // every term can be traced to the digit it comes from (until the ninth cold read the
  // lines were the first partial product, the three others and the total, and nothing
  // said where the three others came from).
  // Every number is computed here from the two factors, so no line can be wrong.
  const PH_HARD = (() => {
    const a = 3847;
    const b = 6529;
    const show = (n) => n.toLocaleString('en-US');
    const places = [...String(b)].map((digit, i, all) => Number(digit) * 10 ** (all.length - 1 - i)).filter(Boolean);
    const parts = places.map((place) => a * place);
    if (parts.length !== 4 || parts.reduce((sum, n) => sum + n, 0) !== a * b) throw new Error('the product of slide 6 no longer has four partial products that add up to it');
    return Object.freeze({
      ask: PH_TEXT.ask(show(a), show(b)),
      lines: Object.freeze([
        `${show(a)} × (${places.map(show).join(' + ')})`,
        `= ${parts.slice(0, 2).map(show).join(' + ')}`,
        `+ ${parts.slice(2).map(show).join(' + ')} = ${show(a * b)}`,
      ]),
      answer: show(a * b),
    });
  })();
  const PH_LINES = Object.freeze({ easy: CASE.hinted, hard: PH_HARD.lines });
  // The option that the hint names, and what it stands for.
  const PH_PICK = Object.freeze({ letter: 'A', name: CASE.options.find(([letter]) => letter === 'A')[1] });
  const PH = Object.freeze({
    tops: Object.freeze({ easy: 0, hard: 380 }),      // where a row starts in the box
    card: Object.freeze({ dy: 16, h: 144 }),          // a row's three boxes, under the names on their borders
    prompt: Object.freeze({ x: 0, w: 640 }),
    reason: Object.freeze({ x: 744, w: 576 }),
    answer: Object.freeze({ x: 1424, w: 304 }),
    leaves: Object.freeze({ easy: 88, hard: 112 }),   // where the way under a row leaves the prompt, from the card's top (top row: the middle of the hint)
    under: Object.freeze({ easy: 40, hard: 28 }),     // how far under the boxes it runs
    inside: Object.freeze({ x: 984, w: 432, h: 48 }),   // the answer that lights up inside the model, under the top row at the end of its way
    trunk: 1372,                                      // where the threads rise from it, between the reasoning and the answer
    lands: 32,                                        // where the pulse from it comes up into the answer box, from that box's left edge
    line: Object.freeze({ first: 40, pitch: 36 }),    // the middle of the first line of reasoning, from the card's top, and from line to line (parts/part2.css)
    stops: 282,                                       // how far the way gets in the row that needs its steps, from the prompt's right edge: it stops short of the place where the top row has its capsule
  });
  const phMid = (row) => PH.tops[row] + PH.card.dy + PH.card.h / 2;
  const phBottom = (row) => PH.tops[row] + PH.card.dy + PH.card.h;
  const phLane = (row) => phBottom(row) + PH.under[row];
  // The way under a row: out of the prompt, down, and along under the boxes as far as `to`.
  const phUnder = (row, to) => {
    const x = PH.prompt.x + PH.prompt.w;
    const y = PH.tops[row] + PH.card.dy + PH.leaves[row];
    return `M${x} ${y}h12q12 0 12 12V${phLane(row) - 12}q0 12 12 12H${to}`;
  };
  // The ways that a pulse walks to its end, each with how much of it the pulse of light
  // covers (a way's length is 1) and, where it ends in an arrow, the tip and how it is
  // turned. Top row: from the hint under the reasoning to the answer inside the model;
  // from that answer one thread to each line of reasoning (up between the two boxes and
  // into the reasoning box at the line's height; inside the box the thread is the line's
  // own, parts/part2.css); and from its right end up into the written answer, apart from
  // the threads, so that no line of reasoning seems to run on into the answer. Bottom
  // row: from the prompt into the reasoning, and from it to the answer.
  const PH_WAYS = (() => {
    const gap = (from, to, y) => `M${from + 6} ${y}H${to - 22}`;
    const up = PH.answer.x + PH.lands;
    const rises = `M${PH.trunk} ${phLane('easy') - PH.inside.h / 2}`;
    const lineAt = (i) => PH.tops.easy + PH.card.dy + PH.line.first + i * PH.line.pitch;
    const pulls = Object.fromEntries(PH_LINES.easy.map((_, i) => [`pull-${i}`, Object.freeze({
      tone: 'hidden', pulse: 0.4, thin: true, d: `${rises}V${lineAt(i) + 12}q0 -12 -12 -12H${PH.reason.x + PH.reason.w}`,
    })]));
    return Object.freeze({
      around: Object.freeze({ tone: 'hidden', pulse: 0.12, d: phUnder('easy', PH.inside.x - 22), tip: [PH.inside.x - 6, phLane('easy'), 0] }),
      ...pulls,
      says: Object.freeze({ tone: 'hidden', pulse: 0.5, d: `M${PH.inside.x + PH.inside.w} ${phLane('easy')}H${up - 12}q12 0 12 -12V${phBottom('easy') + 18}`, tip: [up, phBottom('easy') + 2, -90] }),
      into: Object.freeze({ tone: 'read', pulse: 0.5, d: gap(PH.prompt.x + PH.prompt.w, PH.reason.x, phMid('hard')), tip: [PH.reason.x - 6, phMid('hard'), 0] }),
      out: Object.freeze({ tone: 'read', pulse: 0.5, d: gap(PH.reason.x + PH.reason.w, PH.answer.x, phMid('hard')), tip: [PH.answer.x - 6, phMid('hard'), 0] }),
    });
  })();
  // The way under the bottom row: as far as it gets, and the mark where it stops.
  const PH_STUB = (() => {
    const end = PH.prompt.x + PH.prompt.w + PH.stops;
    return Object.freeze({ d: phUnder('hard', end), pulse: 0.3, x: end + 28, y: phLane('hard') });
  })();
  // How long a pulse takes for the way under the row, for a hop between two boxes and for
  // the way that stops; how long a thread takes from the answer inside to its line; how
  // long a line takes to be typed, and the pause before the next one in the bottom row (in
  // the top row the next line's thread fills the pause). A line takes a fixed time, not a
  // time by its length, so that the steps are as long in a translation.
  const PH_PACE = Object.freeze({ around: 1300, hop: 400, stub: 700, pull: 250, line: 650, between: 150 });
  // How much of its light the answer inside the model keeps between two flashes.
  const PH_GLOWS = 0.35;
  // The beats that a cue or the title waits for, in ms from the start of their step. Enter:
  // when the pulse leaves the hint and when the answer lights up inside. Click 1: when the
  // first line starts to be typed, when all three stand, and when (A) is written. Click 3:
  // when the pulse tries the way under the row and where it stops. Click 4: when the light
  // enters the reasoning, when the first line is typed, when the last one stands, and when
  // the answer lands.
  const PH_AT = (() => {
    const leaves = 1000;
    const writes = 150 + PH_PACE.pull;
    const fits = writes + PH_LINES.easy.length * (PH_PACE.line + PH_PACE.pull) - PH_PACE.pull;
    const tries = 700;
    const stops = tries + PH_PACE.stub;
    const enters = 200;
    const types = enters + PH_PACE.hop;
    const written = types + PH_LINES.hard.length * (PH_PACE.line + PH_PACE.between);
    return Object.freeze({
      leaves, decided: leaves + PH_PACE.around,
      writes, fits, said: fits + 250 + PH_PACE.hop,
      tries, stops, enters, types, written, answered: written + 100 + PH_PACE.hop,
    });
  })();

  const phWay = (key) => {
    const { tone, pulse, d, tip, thin = false } = PH_WAYS[key];
    return `
        <g class="p2-ph__way${thin ? ' p2-ph__way--thin' : ''}" data-way="${key}" data-tone="${tone}">
          <path class="p2-ph__way-line" pathLength="1" d="${d}"/>
          <path class="p2-ph__comet" pathLength="1" stroke-dasharray="${pulse} 2" d="${d}"/>
          ${tip ? `<path class="p2-ph__way-head" d="M0 0L-16 -9L-16 9Z" transform="translate(${tip[0]} ${tip[1]}) rotate(${tip[2]})"/>` : ''}
        </g>`;
  };
  // One row: the prompt, the written reasoning, the answer, each with its name on its top
  // border. `key` is 'easy' (the hinted run) or 'hard' (the product). The reasoning box
  // holds a slot that says that nothing is written yet, and one line per sentence, typed
  // left to right. In the top row a line also has a caret and, from the caret to the
  // box's right edge, the end of the thread that ties it to the answer inside the model:
  // the thread fills what is left of the line, so it gets shorter as the line is typed, in
  // any font. The answer tile is slide 5's: an open face, "?", and the answer behind it.
  // On the top border of the reasoning and on the bottom border of the answer, a chip
  // says what happened there and when.
  const phRowHtml = (key) => {
    const easy = key === 'easy';
    const order = (what) => kit.flag({ key: `ph-${key}-${what}`, text: PH_TEXT.order[key][what] });
    return `
      <div class="p2-ph__row" data-row="${key}" data-tone="${easy ? 'hidden' : 'read'}">
        <div class="p2-ph__prompt">
          <span class="p2-hint__name">${PH_TEXT.rows[key]}</span>
          <div class="p2-ph__question">${easy ? CASE.question : PH_HARD.ask}</div>
          ${easy ? `<div class="p2-ph__hint">${said('chen.hint')}</div>` : ''}
        </div>
        <div class="dk-term p2-ph__reason">
          <span class="p2-hint__name">${HINT_TEXT.reasoning}</span>
          ${order('reason')}
          <span class="p2-ph__empty">${PH_TEXT.empty}</span>
          ${PH_LINES[key].map((_, i) => `<div class="p2-ph__line" data-line="${key}-${i}"><span class="p2-ph__ink"></span>${easy
    ? '<i class="p2-ph__caret"></i><i class="p2-ph__pull"></i>'
    : ''}</div>`).join('')}
        </div>
        <div class="p2-ph__answer">
          <span class="p2-hint__name">${HINT_TEXT.answer}</span>
          ${order('answer')}
          <div class="p2-hint__tile"><div class="p2-hint__tile-inner">
            <span class="p2-hint__face p2-hint__face--open">?</span>
            ${easy
    ? `<span class="p2-hint__face p2-hint__face--hinted">(${PH_PICK.letter})</span>`
    : `<span class="p2-hint__face p2-ph__face--right">${PH_HARD.answer}</span>`}
          </div></div>
          <div class="p2-ph__verdict">
            ${easy
    ? `<span class="p2-ph__picked">${PH_PICK.name}</span><span class="p2-hint__verdict p2-hint__verdict--bad">${HINT_TEXT.verdicts.bad}</span>`
    : `<span class="p2-hint__verdict p2-hint__verdict--ok">${HINT_TEXT.verdicts.ok}</span>`}
          </div>
        </div>
      </div>`;
  };

  const phHtml = () => `
    <div class="p2-ph"><div class="p2-ph__box">
      <svg class="p2-ph__art" viewBox="0 0 1728 624" width="1728" height="624" aria-hidden="true">
        ${Object.keys(PH_WAYS).map(phWay).join('')}
        <g class="p2-ph__stub" data-tone="hidden">
          <path class="p2-ph__stub-route" d="${PH_STUB.d}"/>
          <path class="p2-ph__comet" pathLength="1" stroke-dasharray="${PH_STUB.pulse} 2" d="${PH_STUB.d}"/>
          <path class="p2-ph__stop" d="M${PH_STUB.x - 12} ${PH_STUB.y - 12}l24 24m0 -24l-24 24"/>
          <circle class="p2-ph__ring" cx="${PH_STUB.x}" cy="${PH_STUB.y}" r="6" opacity="0"/>
        </g>
      </svg>
      ${phRowHtml('easy')}
      <div class="p2-ph__inside"><span>${PH_TEXT.order.inside}</span><b>(${PH_PICK.letter})</b></div>
      <p class="p2-ph__lane" data-lane="easy">${PH_TEXT.lanes.easy}</p>
      <p class="p2-ph__said">“${phQuote()}” <span class="p2-ph__by">${PH_TEXT.by}</span></p>
      ${phRowHtml('hard')}
      <p class="p2-ph__lane" data-lane="hard">${PH_TEXT.lanes.hard}</p>
      <div class="p2-ph__closed"><span>${PH_TEXT.order.closed}</span></div>
    </div></div>`;

  const phSetup = (ctx) => {
    const { dur } = ctx;
    const row = (key) => `[data-row="${key}"]`;
    const way = (key) => `[data-way="${key}"]`;
    // A pulse of light runs along a path once.
    const run = (step, comet, pulse, at, ms, how = 'inOut') => {
      step.tween(comet, { opacity: [0, 1] }, { at, dur: 60 });
      step.tween(comet, { 'stroke-dashoffset': [pulse, pulse - 1] }, { at, dur: ms, ease: how });
      step.tween(comet, { opacity: [1, 0] }, { at: at + ms - 100, dur: 100 });
    };
    // A pulse walks a way once and draws it behind itself. Returns when it arrives.
    const walk = (step, key, at, ms) => {
      step.tween(`${way(key)} .p2-ph__way-line`, { opacity: [0, 1] }, { at, dur: 80 });
      step.tween(`${way(key)} .p2-ph__way-line`, { '--draw': [1, 0] }, { at, dur: ms, ease: 'inOut' });
      run(step, `${way(key)} .p2-ph__comet`, PH_WAYS[key].pulse, at, ms);
      if (PH_WAYS[key].tip) step.tween(`${way(key)} .p2-ph__way-head`, { opacity: [0, 1] }, { at: at + ms - 80, dur: dur.micro });
      return at + ms;
    };
    // The answer inside the model flashes and keeps a little of its light.
    const flash = (step, at) => {
      step.tween('.p2-ph__inside', { '--lit': [PH_GLOWS, 1] }, { at, dur: 120 });
      step.tween('.p2-ph__inside', { '--lit': [1, PH_GLOWS] }, { at: at + 200, dur: dur.enter });
    };
    // The answer is written: its box lights up in the color of the light that reached it,
    // the tile turns over from "?" to the answer and takes the hit, and what the answer is
    // worth stands beside it.
    const lands = (step, key, at) => {
      step.tween(`${row(key)} .p2-ph__answer`, { '--hit': [0, 1] }, { at: at - 60, dur: 160 });
      step.tween(`${row(key)} .p2-ph__answer`, { '--hit': [1, 0.3] }, { at: at + 400, dur: dur.move });
      step.tween(`${row(key)} .p2-hint__tile-inner`, { '--flip': [0, 1] }, { at, dur: 600, ease: 'back' });
      step.tween(`${row(key)} .p2-hint__tile`, { scale: [1, 1.14] }, { at: at + 300, dur: 140 });
      step.tween(`${row(key)} .p2-hint__tile`, { scale: [1.14, 1] }, { at: at + 440, dur: 260 });
      step.show(`${row(key)} .p2-ph__verdict`, { at: at + 500, rise: 0 });
    };
    // A chip lands on its box's border.
    const placed = (step, key, what, at) => step.tween(`[data-flag="ph-${key}-${what}"]`, { opacity: [0, 1], scale: [1.5, 1] }, { at, dur: dur.enter, ease: 'back' });

    // Enter: the hinted run of the last slide, replayed slowly. Its prompt, an empty box for
    // the reasoning, an open answer. The second question is not shown yet: its place under
    // this row is kept free, so nothing moves when its turn comes (click 3). The hint
    // lights up, and a pulse of light runs from it under the
    // empty box to the place under the row where (A) lights up: decided, inside the model.
    // On the page nothing has changed: the slot in the box says that nothing is written
    // yet, and the answer is still "?". Under the way, why it could go like this. The
    // three boxes are slide 5's run under the name "Replay", and say nothing new: the pulse
    // is the first thing this slide says, so the entrance is one state.
    const enter = ctx.step({ label: 'replay of the hinted run: (A) lights up inside the model before a word is written' });
    enter.show(`${row('easy')} .p2-ph__prompt`, { at: 150 });
    enter.show(`${row('easy')} .p2-ph__reason`, { at: 270 });
    enter.show(`${row('easy')} .p2-ph__answer`, { at: 390 });
    enter.tween('.p2-ph__hint', { '--glow': [0.3, 1] }, { at: PH_AT.leaves - 300, dur: 300 });
    walk(enter, 'around', PH_AT.leaves, PH_PACE.around);
    enter.tween('.p2-ph__inside', { opacity: [0, 1], scale: [0.7, 1] }, { at: PH_AT.decided - 60, dur: dur.enter, ease: 'back' });
    enter.tween('.p2-ph__inside', { '--lit': [0, 1] }, { at: PH_AT.decided - 60, dur: 160 });
    enter.tween('.p2-ph__inside', { '--lit': [1, PH_GLOWS] }, { at: PH_AT.decided + 400, dur: dur.move });
    enter.tween('.p2-ph__hint', { '--glow': [1, 0.45] }, { at: PH_AT.decided + 300, dur: dur.enter });
    enter.cls(`${row('easy')} .p2-ph__empty`, 'is-loud', { at: PH_AT.decided + 300 });
    enter.tween(`${row('easy')} .p2-ph__empty`, { scale: [1, 1.06] }, { at: PH_AT.decided + 300, dur: 140 });
    enter.tween(`${row('easy')} .p2-ph__empty`, { scale: [1.06, 1] }, { at: PH_AT.decided + 440, dur: 260 });
    enter.show('[data-lane="easy"]', { at: PH_AT.decided + 700, rise: 0 });
    enter.hold(300);

    // Click 1: now the reasoning is written, as a model writes it: top to bottom, left to
    // right. Before a line, a thread comes from the answer inside the model, up between
    // the two boxes and along the line's place to where the line starts; the line is typed
    // toward it and the thread gets shorter. When the three lines stand, the reasoning
    // gets its chip and the title its second half; then a pulse goes from the answer
    // inside into the answer box, and (A) is written, last. One state: the run's output in
    // the order in which a model writes it, the reasoning and then the answer.
    const write = ctx.step({ label: 'the reasoning is written line by line, each line drawn to the answer inside; then (A) is written' });
    write.tween(`${row('easy')} .p2-ph__empty`, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    PH_LINES.easy.forEach((text, i) => {
      const at = PH_AT.writes + i * (PH_PACE.line + PH_PACE.pull);
      const line = `[data-line="easy-${i}"]`;
      flash(write, at - PH_PACE.pull);
      walk(write, `pull-${i}`, at - PH_PACE.pull, 150);
      write.tween(`${line} .p2-ph__pull`, { '--reach': [0, 1] }, { at: at - 100, dur: 100, ease: 'linear' });
      write.tween(`${line} .p2-ph__caret`, { '--caret': [0, 1] }, { at: at - 60, dur: 60 });
      write.type(`${line} .p2-ph__ink`, text, { at, dur: PH_PACE.line });
      write.tween(`${line} .p2-ph__caret`, { '--caret': [1, 0] }, { at: at + PH_PACE.line, dur: 120 });
    });
    placed(write, 'easy', 'reason', PH_AT.fits);
    write.tween('.dk-title .p2-late', { opacity: [0, 1] }, { at: PH_AT.fits, dur: dur.move });
    flash(write, PH_AT.said - PH_PACE.hop);
    walk(write, 'says', PH_AT.said - PH_PACE.hop, PH_PACE.hop);
    lands(write, 'easy', PH_AT.said);
    placed(write, 'easy', 'answer', PH_AT.said + 500);

    // Click 2: the paper's name for it, in the paper's sentence, under the row. Its term
    // lands with a pop; the way that the hint took and the answer it led to light up once
    // more, so that the eye goes from the name to what it names.
    const name = ctx.step({ label: 'the paper’s name for it: a post-hoc rationalization' });
    name.show('.p2-ph__said', { at: 100, rise: 0 });
    name.tween('.p2-ph__said b', { scale: [1.2, 1] }, { at: 300, dur: dur.enter, ease: 'back' });
    name.tween(way('around'), { '--taut': [0, 1] }, { at: 500, dur: dur.micro });
    name.tween(way('around'), { '--taut': [1, 0] }, { at: 900, dur: dur.move });
    name.tween('.p2-ph__inside', { '--lit': [PH_GLOWS, 1] }, { at: 500, dur: dur.micro });
    name.tween('.p2-ph__inside', { '--lit': [1, PH_GLOWS] }, { at: 900, dur: dur.move });
    name.hold(200);

    // Click 3: the question that needs its steps arrives, with the same three boxes as the
    // row above. The pulse tries the way under the
    // row once more and stops under the empty box: too many steps for one pass (the reason
    // stands where the way starts, under the question), and where the top row's capsule
    // is, an empty dashed one says what follows: "cannot be decided first". The step
    // ends on that: the way around the words is closed, and the box is still empty (until
    // SPEC.md section 7.30 the light went through the box in the same click, 0.7 s later).
    // The paper's sentence stays between the two rows until the end: it is what the slide
    // has for "the answer can be decided first" (after the tenth cold read it left as this
    // row arrived, and both readers of the eleventh missed it).
    const stuck = ctx.step({ label: 'a question that needs its steps: the way around the words stops' });
    stuck.tween(row('hard'), { opacity: [0, 1] }, { at: 0, dur: dur.enter });
    stuck.tween('.p2-ph__stub-route', { opacity: [0, 1] }, { at: PH_AT.tries + 150, dur: PH_PACE.stub - 150 });
    run(stuck, '.p2-ph__stub .p2-ph__comet', PH_STUB.pulse, PH_AT.tries, PH_PACE.stub, 'out');
    stuck.tween('.p2-ph__ring', { opacity: [0, 1] }, { at: PH_AT.stops - 40, dur: 40 });
    stuck.tween('.p2-ph__ring', { 'attr:r': [6, 36] }, { at: PH_AT.stops - 40, dur: 500 });
    stuck.tween('.p2-ph__ring', { opacity: [1, 0] }, { at: PH_AT.stops + 60, dur: 400 });
    stuck.tween('.p2-ph__stop', { opacity: [0, 1] }, { at: PH_AT.stops, dur: 80 });
    stuck.tween('.p2-ph__stop', { scale: [1, 1.5] }, { at: PH_AT.stops, dur: 120 });
    stuck.tween('.p2-ph__stop', { scale: [1.5, 1] }, { at: PH_AT.stops + 120, dur: 300 });
    stuck.show('[data-lane="hard"]', { at: PH_AT.stops + 100, rise: 0 });
    stuck.tween('.p2-ph__closed', { opacity: [0, 1], scale: [0.9, 1] }, { at: PH_AT.stops + 250, dur: dur.enter, ease: 'back' });
    stuck.hold(300);

    // Click 4: the light goes through the box. It enters the reasoning, each line is typed
    // and lights up, and only when the last one stands does the answer land. The
    // reasoning's chip says that the answer was worked out there, the answer's that it was
    // written last, as in the top row. No line under the row: the chip and the last cue
    // say it (until the tenth cold read a line under the row said it a third time).
    const need = ctx.step({ label: 'the light goes through the words: the answer is worked out in them' });
    need.tween(`${row('hard')} .p2-ph__empty`, { opacity: [1, 0] }, { at: PH_AT.enters, dur: dur.micro });
    walk(need, 'into', PH_AT.enters, PH_PACE.hop);
    need.cls(`${row('hard')} .p2-ph__reason`, 'is-lit', { at: PH_AT.types });
    PH_LINES.hard.forEach((text, i) => {
      const at = PH_AT.types + i * (PH_PACE.line + PH_PACE.between);
      need.type(`[data-line="hard-${i}"] .p2-ph__ink`, text, { at, dur: PH_PACE.line });
      need.tween(`[data-line="hard-${i}"]`, { '--glow': [1, 0] }, { at: at + PH_PACE.line, dur: dur.move });
    });
    placed(need, 'hard', 'reason', PH_AT.written);
    walk(need, 'out', PH_AT.written + 100, PH_PACE.hop);
    lands(need, 'hard', PH_AT.answered);
    placed(need, 'hard', 'answer', PH_AT.answered + 500);
    need.hold(300);
  };

  Deck.register({
    id: 'p2-posthoc',
    part: 2,
    // The first half stands from the first frame and is what the entrance shows; the second
    // half arrives when the reasoning has been written, at click 1 (phSetup), and the
    // comma with it: until then the title is a whole sentence, "Sometimes the answer comes
    // first" (it ended in the comma until the ninth cold read, and looked cut off).
    title: 'Sometimes the answer comes first<span class="p2-late">, and the reasoning is written to fit it</span>',
    cues: [
      // When (A) lights up inside the model, under a box that is still empty.
      { text: 'The hint can decide the answer before a word is written', step: 0, at: PH_AT.decided },
      // As the first line starts to be typed.
      { text: 'The reasoning is then written to reach that answer', step: 1, at: PH_AT.writes },
      // When the way under the row that needs its steps has stopped.
      { text: 'Many steps: today’s models have no way around the words', step: 3, at: PH_AT.stops },
    ],
    // Sec. 2 for the two roles of written reasoning and the paper's sentence; Sec. 3.1 for
    // the hint experiments as a case of the first role. Chen et al. for the hint itself,
    // printed word for word: the footer says so, and no box carries a note on its border.
    cite: [{ src: 'emmons2025', where: 'Sec. 2, 3.1' }, { src: 'chen2025', where: 'Table 1 (hint, quoted)' }],
    // Our drawing of the two roles that Emmons et al. describe; the question, the reasoning
    // and the product in its boxes are examples of ours (slide 5's run, a product of two
    // four-digit numbers). No measured number is on this slide.
    figure: ['schematic', 'illustrative'],
    html: phHtml(),
    setup: phSetup,
  });

  // ---------------------------------------------------------------- slide 7: reasoning without written words
  // What the slide has to get across: a small model can be trained to reason without
  // writing its reasoning, and then a monitor has no reasoning to read. It is told as four
  // runs of the machine of slide 3 (kit.lattice), one a step, each named by what stands
  // between the question and the answer. Column 0 holds the question; columns 1-7 hold
  // the reasoning.
  //   Written reasoning: the chain of slide 3, up a column and back down through a written
  //   token. A monitor reads every step.
  //   Answer at once: nothing is written between the question and the answer
  //   ('p2.pfau_immediate'), so the seven columns are not there. Its accuracy is then
  //   "near-random" ('p2.pfau_near_random'): this run is what the dots are measured against.
  //   The run on screen gets its answer wrong, an example of ours.
  //   Dots (Pfau et al.): a dot stands in the place of each word ('p2.pfau_filler',
  //   'p2.pfau_one_to_one'). Nothing comes back down (a dot carries no result): the columns
  //   work side by side and the last one gathers them, which is enough for a problem that
  //   splits into parallel pieces ('pfau.parallel', 'p2.pfau_parallelizable') and not for a
  //   chain of serial steps ('p2.pfau_serial').
  //   Internal state (Hao et al.): a chain again, but its way back down is the model's last
  //   hidden state itself ('p2.hao_last_state', 'p2.hao_latent_mode', 'hao.feedback'). No
  //   token is sampled ('p2.hao_not_decoded'), and nothing is written but the answer
  //   ('p2.hao_fully_latent', 'p2.hao_chain_removed', 'p2.hao_language_mode'). The method
  //   is Coconut; its name is not on screen, and neither is the word "vector": a cold
  //   reader did not know what the vectors were, so the caption says what is fed back, "a
  //   list of numbers, not a word", and the picture draws it as a short column of cells
  //   that travels in a pipe from the top of one column to the bottom of the next, clear
  //   of the text row. Until the redesign after the ninth cold read (2026-11-13) it was an
  //   S-curve named "each output is the next input", which looked like slide 3's line for
  //   a written token.
  // Both models are small and were trained for it ('pfau.model', 'p2.pfau_scaled_down',
  // 'pfau.supervision'; 'hao.base', 'p2.hao_larger_models', 'p2.hao_training').
  // One result card at a time stands beside the machine, in one place: the puzzle of Pfau
  // et al. while the first three runs play (its rows land one a step), then, when the
  // fourth run is over, the two tasks of Hao et al., one a step. The first card leaves
  // when the fourth run starts: that run is another model's, on other tasks (until that
  // redesign it stayed at half strength, and the end state held two cards). In its place
  // a small card arrives with the fourth run and says what that model does, and that only
  // its answer is written; that model's results get a card of their own under it, at the
  // next click. Under the picture one line at a time, in one place: the way
  // here from the last two slides; what a dot adds, why that is enough for this puzzle
  // and what the arcs carry ('p2.pfau_additional', 'p2.pfau_parallelizable',
  // 'p2.pfau_one_layer'); nothing while the fourth model runs
  // and its first result lands; and, with its second, the slide's main line, how the title squares with slide 3
  // ('korbak.externalized', 'korbak.today', 'korbak.latent', 'korbak.future'). The last
  // click is Part 2's conclusion, on a panel of its own over the picture.
  // Seven steps, one state a step: the four runs, the two results of the fourth model (the
  // main line arrives with the second), Part 2's conclusion.
  const DOTS_QUOTE = 'near-random';
  if (!said('p2.pfau_near_random').includes(`${DOTS_QUOTE} accuracy at ${said('pfau.3sum_none')}`)) throw new Error(`the sentence of Pfau et al. no longer says "${DOTS_QUOTE}" of ${said('pfau.3sum_none')}`);
  const DOTS_TEXT = Object.freeze({
    // Above the machine: what stands between the question and the answer in the run on
    // screen. The last one is the key to the column of cells in the picture.
    ways: Object.freeze({
      words: 'Written reasoning: each step is written, then read back in',
      none: 'Answer at once: nothing is written between question and answer',
      dots: 'Dots: a dot is written in place of each word',
      state: 'Internal state: a list of numbers, not a word, fed back in',
    }),
    answer: 'Answer',
    // The answer box of the run that feeds its internal state back: what the box holds is
    // in words, as the internal states are not. No value: this model's numbers are from
    // two other tasks, and a reader of the eleventh cold read set the puzzle's "True" in
    // the box against them.
    worded: 'in words',
    // In the place of the text row, where a run writes no reasoning.
    bands: Object.freeze({ none: 'nothing written in between', state: 'no reasoning is written: only the answer' }),
    reads: 'Monitor reads',
    verdicts: Object.freeze({ words: 'all of it', dots: 'only dots', state: 'no reasoning to read' }),
    rows: Object.freeze({ words: 'written reasoning', none: 'answer at once', dots: 'dots', state: 'internal state' }),
    metric: 'Answers right',
    // The first card: whose puzzle, the puzzle in one question with the form of its
    // answer, and in the row of the run that answers at once the paper's word for its
    // accuracy, with whose word it is under it. No number in that row and no chance rate:
    // the paper gives none for this puzzle. The question is 'pfau.3sum_def' said plainly: what the paper calls an input
    // is a tuple of digits, summed place by place, and zero is the zero vector modulo 10.
    // Until the tenth cold read (2026-11-13) the card showed the paper's example of that
    // (Fig. 3: "(1,0) + (7,3) + (2,7) = (10,10)", "keep only the last digits: (0,0)"),
    // which a reader had to stop and work out; what the slide needs of the puzzle is that
    // it is made up and that its answer is True or False ('p2.pfau_fig3': "ANS True").
    puzzle: Object.freeze({
      name: 'Pfau et al.: a made-up puzzle',
      ask: '3SUM: in a list of numbers, do any three add up to zero? The answer is True or False.',
      quoted: (quote) => `“${quote}”`,
      whose: 'the paper’s word',
      model: 'a small model, trained for this',
    }),
    // The cards of the fourth run: whose model, and what it does in one sentence (its
    // internal state in the amber of what happens inside, the one thing it writes in the
    // teal of what can be read); under that, the two tasks it was measured on.
    tasks: Object.freeze({
      name: 'Hao et al.: another model',
      how: 'Trained to skip the words: each step’s <b>internal state</b> goes straight back in as the next input. <i>Only the answer is written.</i>',
      logic: (set) => `Logic questions (${set})`,
      math: 'School math (GSM8k)',
      model: (base) => `a small model (${base}), trained for this`,
    }),
  });
  const bridgeHtml = () => '<p class="p2-dots__bridge">So far the written reasoning was there, and left the real reason out. Now: no written reasoning at all.</p>';
  // The line of the dots' click says what a dot adds, why that is enough for this puzzle,
  // and what the arcs in the picture are. Why it is enough: the puzzle splits into pieces
  // that do not need each other's results ('p2.pfau_parallelizable', 'p2.pfau_pairwise'),
  // and each piece fits in one pass ('p2.pfau_one_layer'), so more columns side by side
  // do it, and nothing here is "reasoning longer than one pass" (slide 3's third cue).
  // The tenth cold read (2026-11-13) had the line name the arcs and took the reason out;
  // both readers of the eleventh then set the dots against slide 3.
  const whyHtml = () => `<p class="p2-dots__why-dots">A dot says nothing, but it is <b>one more column to compute in</b>.
          This puzzle splits into independent pieces: the columns work on them side by side, each in one pass,
          and the arcs carry the results to the last one.</p>`;
  // The slide's main line, one sentence shorter since the eleventh cold read: the end
  // state of its click was read as too dense, and what the line went on to say ("That is
  // what makes monitoring fragile.") is the last clause of Part 2's conclusion, one click on.
  const holdsHtml = () => `<p class="p2-dots__holds">These are small models, trained for it. Today’s large models still
          <b>need written reasoning</b> for hard problems; one built like this might not.</p>`;
  const DOTS = Object.freeze({
    shape: Object.freeze({ cols: 8, rows: 4 }),
    tokens: Object.freeze(['Q', 'first', 'sum', 'each', 'pair', 'then', 'check', 'so']),
    answer: 'True',
    miss: 'False',   // what the run that answers at once says: the other of the puzzle's two answers
    lensFrom: 6, lensTravel: 1136, riseMs: 50, hopMs: 260, dropMs: 110, feedMs: 300,
    landing: 36, chipTop: 28, nodeGap: 16,   // a written token lands as on slides 3 and 9
    lanes: Object.freeze({ top: 56, step: 8 }),   // where the gathering arcs run, between the two top layers
    skip: 12,      // the run that answers at once: how high its way from the question to the answer runs, above the top nodes (at 40)
    ghost: 0.15,   // what is left of a column that the run on screen does not have
    glyph: Object.freeze({ w: 24, h: 72, cell: Object.freeze({ w: 14, h: 11, pitch: 16 }), cells: 4 }),   // the internal state: a column of cells
  });
  const dotPoint = (col, row) => kit.latticePoint(DOTS.shape, col, row);
  const thinking = util.range(DOTS.shape.cols - 1).map((i) => i + 1);
  // The beats that a cue or a later track waits for, in ms from the start of their step.
  // Click 1: when the question's column runs alone, and when its answer lands. Click 2:
  // when the last dot stands and the answer is open, when the columns run, when the answer
  // lands (and with it the dots' number). Click 3: when the chain of internal states
  // starts, when its answer lands, and when the monitor has found no reasoning to read.
  // Clicks 4 and 5: when a task's heading arrives after the click, and how long after it
  // the second of its two numbers stands (the cue of click 5 waits for that).
  const DOTS_AT = (() => {
    const { cols, rows } = DOTS.shape;
    const alone = 1000;
    const open = 400 + thinking.length * 130 + 200;
    const again = open + 600;   // one beat with the answer open before the columns run
    const chain = 1500;
    const fed = chain + (cols - 1) * DOTS.feedMs + rows * DOTS.riseMs + 100;
    return Object.freeze({ alone, missed: alone + rows * DOTS.riseMs + 500, open, again, solved: again + 800, chain, fed, read: fed + 1150 });
  })();
  const DOTS_SCORED = Object.freeze({ logic: 300, math: 200, lands: 200 + 400 + 100 + 400 });

  // What the run that answers at once gets wrong: what is left of 100% after its accuracy.
  // Computed from the registered number, never typed. On no screen since the eleventh cold
  // read (2026-11-13): the answer box of that run held it ("34% wrong"), a rate over the
  // whole test set in the box of one run. Kept for questions.
  Deck.addFacts({
    'p2.pfau_none_wrong': (() => {
      const right = Deck.fact('pfau.3sum_none');
      const value = 100 - right.value;
      return { value, text: `${value}%`, src: right.src, where: `${right.where} (100% minus the accuracy)` };
    })(),
  });

  // Words: from the top of a column down to the token it writes for the next one.
  const dropHtml = (col) => {
    const top = dotPoint(col, DOTS.shape.rows - 1);
    const chip = dotPoint(col + 1, 'token');
    const end = { x: chip.x - DOTS.landing, y: chip.y - DOTS.chipTop - 8 };
    const length = Math.hypot(end.x - top.x, end.y - top.y);
    const from = { x: top.x + ((end.x - top.x) * DOTS.nodeGap) / length, y: top.y + ((end.y - top.y) * DOTS.nodeGap) / length };
    return `<path class="p2-dots__drop" data-drop="${col}" pathLength="1" d="M${from.x.toFixed(1)} ${from.y.toFixed(1)}L${end.x} ${end.y}"/>`;
  };
  // Answer at once: from the top of the question's column straight to the answer, over
  // the columns that this run does not have.
  const skipHtml = () => {
    const from = dotPoint(0, DOTS.shape.rows - 1);
    const to = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    return `<path class="p2-dots__skip" pathLength="1" d="M${from.x} ${from.y - 14}V${DOTS.skip + 12}q0 -12 12 -12H${to.x - 12}q12 0 12 -8"/>`;
  };
  // Dots: every column hands what it worked out sideways and up to the last one. The columns
  // further left take the higher lanes, so no arc crosses another.
  const gatherHtml = (col) => {
    const from = dotPoint(col, DOTS.shape.rows - 2);
    const to = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    const lane = DOTS.lanes.top + col * DOTS.lanes.step;
    return `<path class="p2-dots__gather" data-gather="${col}" pathLength="1" d="M${from.x + 10} ${from.y - 8}C${from.x + 56} ${lane} ${to.x - 72} ${lane} ${to.x - 15} ${to.y + 5}"/>`;
  };
  // The internal state as the picture draws it: a short column of cells, each cell one
  // number, more or less filled. No digit is printed: the numbers are not the paper's.
  const glyphHtml = (seed) => {
    const { w, h, cell, cells } = DOTS.glyph;
    const next = util.rng(seed);
    const top = -(cells * cell.pitch - (cell.pitch - cell.h)) / 2;
    return `<rect class="p2-dots__glyph-box" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="6"/>${util.range(cells).map((i) => `<rect class="p2-dots__glyph-cell" x="${-cell.w / 2}" y="${top + i * cell.pitch}" width="${cell.w}" height="${cell.h}" rx="2" style="opacity:${(0.2 + 0.8 * next()).toFixed(2)}"/>`).join('')}`;
  };
  // Internal state: the last state of a column is the next column's input. It travels in
  // a pipe that leaves the top of its column sideways, comes straight down between the two
  // columns and enters the next one at the bottom: no diagonal, so that it cannot be taken
  // for slide 3's line into a written token, and it stays clear of the text row. On the
  // way down it carries the column of cells.
  const feedHtml = (col) => {
    const from = dotPoint(col, DOTS.shape.rows - 1);
    const to = dotPoint(col + 1, 0);
    const mid = (from.x + to.x) / 2;
    return `<g class="p2-dots__feed" data-feed="${col}">
      <path class="p2-dots__feed-line" pathLength="1" d="M${from.x + 14} ${from.y}H${mid - 16}q16 0 16 16V${to.y - 16}q0 16 16 16H${to.x - 26}"/>
      <path class="p2-dots__feed-head" d="M${to.x - 13} ${to.y}l-13 -8v16z"/>
      <g transform="translate(${mid} ${(from.y + to.y) / 2})"><g class="p2-dots__glyph">${glyphHtml(col + 1)}</g></g></g>`;
  };

  // The results: how often the answer is right ('accuracy' in both papers), a row a run:
  // a name, a bar and the number. One color per row on every task: teal is the model whose
  // reasoning is written (and can be read), gray the model that answers at once, amber the
  // one whose steps are dots or its own internal state. The puzzle shows three rows, in the
  // order in which the slide reaches them: written reasoning (100%, 'pfau.3sum_cot'), the
  // answer at once and the dots (100%, 'pfau.3sum_filler'). The row of the answer at once
  // has no bar and no number since the eleventh cold read (2026-11-13): it holds the
  // paper's word for that run's accuracy, “near-random”, and under it "the paper’s word".
  // The number is 66% ('pfau.3sum_none'), and both readers asked how two answers in three
  // can be near-random when a guess between True and False is right half the time; the
  // paper does not say, so the card does not print the number (the guard at DOTS_QUOTE
  // still holds the word to the sentence that has it).
  // What was tried for 66% before: the answer is True or False, and the paper gives no chance rate for
  // 3SUM (its one baseline number is the majority class of 2SUM, 63%, Table 1, another
  // task; the text of 2404.15758 was searched for "random", "chance", "majority",
  // "baseline", "imbalance" and "50%"). It calls 66% "near-random" ('p2.pfau_near_random':
  // "The no-filler models achieve near-random accuracy at 66%", Sec. 4.2). Until the
  // eleventh cold read the row had its bar and "66%", and under it "the paper:
  // “near-random”, close to guessing". Before that: a dashed mark at 66% across the three bars under that name, with a
  // note that the paper states no chance rate (a reader takes chance to be 50%, and the
  // two together set two cold readers against the number); then the bare 66%, which
  // could not be judged; then, until the tenth cold read (2026-11-13), "the paper:
  // “cannot be solved” this way (Sec. 4.2)" ('p2.pfau_cannot'), which a reader set
  // against 66% right: two answers in three read as "partly solved". Each of the two other tasks shows
  // one pair, what the internal state is compared with and the internal state. The rows
  // left out ('hao.prosqa_none', 'hao.gsm8k_none') stay in the fact table.
  const BARS = Object.freeze({
    puzzle: Object.freeze([['words', 'pfau.3sum_cot'], ['none', null], ['dots', 'pfau.3sum_filler']]),   // null: a row with the paper's word, no bar and no number
    logic: Object.freeze([['words', 'hao.prosqa_cot'], ['state', 'hao.prosqa_latent']]),
    math: Object.freeze([['words', 'hao.gsm8k_cot'], ['state', 'hao.gsm8k_latent']]),
  });
  const BAR_TONES = Object.freeze({ words: 'read', none: 'dim', dots: 'hidden', state: 'hidden' });
  const barHtml = (task, row, key) => (key
    ? `
      <div class="p2-dots__bar" data-bar="${task}-${row}" data-tone="${BAR_TONES[row]}">
        <span class="p2-dots__bar-label">${DOTS_TEXT.rows[row]}</span>
        <span class="p2-dots__bar-track"><i></i></span>
        <b class="p2-dots__bar-value">${said(key)}</b>
      </div>`
    : `
      <div class="p2-dots__bar p2-dots__bar--said" data-bar="${task}-${row}" data-tone="${BAR_TONES[row]}">
        <span class="p2-dots__bar-label">${DOTS_TEXT.rows[row]}</span>
        <b class="p2-dots__bar-value">${DOTS_TEXT.puzzle.quoted(DOTS_QUOTE)}</b>
      </div>
      <div class="p2-dots__bar-note">${DOTS_TEXT.puzzle.whose}</div>`);
  const barsHtml = (task) => `
    <div class="p2-dots__bars" data-bars="${task}">
      ${BARS[task].map(([row, key]) => barHtml(task, row, key)).join('')}
    </div>`;
  // Part 2 in one sentence, a clause for each of its slides (5, 6 and 7), and nothing
  // beside it. Each clause says in full what its slide showed, so that the sentence reads
  // alone: whose cause, which answer, trained for what. Until SPEC.md section 7.30 a second
  // column named what each slide had shown ("the professor's hint", the paper's term for
  // slide 6, "small models: dots, then vectors") in small type. `name` stands over the
  // sentence, inside the panel, and says what the panel is: it sums up the part, not this
  // slide, whose title ("Small models can learn to reason without words") is over it and
  // fits the last clause only (the cold read at the end of SPEC.md section 7.30). It is
  // not on the panel's border: in a wider font the panel starts at the top of the stage,
  // and a name on its border would leave the stage.
  const SUM = Object.freeze({
    name: 'Part 2 in one sentence',
    lead: 'Written reasoning can',
    lines: Object.freeze([
      'leave out the real cause of the answer,',
      'justify an answer that was already decided,',
      'or, in models trained to do without it, disappear.',
    ]),
  });

  const dotsHtml = () => {
    const size = kit.latticeSize(DOTS.shape);
    const top = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    const first = dotPoint(1, 'token');
    const last = dotPoint(DOTS.shape.cols - 1, 'token');
    const hops = util.range(DOTS.shape.cols - 1);
    const band = (key) => `<g class="p2-dots__band" data-band="${key}">
              <rect x="${first.x - 60}" y="${first.y - 28}" width="${last.x - first.x + 120}" height="56" rx="8"/>
              <text x="${(first.x + last.x) / 2}" y="${first.y + 9}">${DOTS_TEXT.bands[key]}</text>
            </g>`;
    return `
    <div class="p2-dots"><div class="p2-dots__box">
      <div class="p2-dots__machine">
        <div class="p2-dots__ways">
          <span data-way="words" data-tone="read"><i></i>${DOTS_TEXT.ways.words}</span>
          <span data-way="none" data-tone="dim"><i></i>${DOTS_TEXT.ways.none}</span>
          <span data-way="dots" data-tone="hidden"><i class="p2-dots__key-dot"></i>${DOTS_TEXT.ways.dots}</span>
          <span data-way="state" data-tone="hidden"><svg class="p2-dots__key-state" viewBox="-38 -14 76 28" width="76" height="28" aria-hidden="true"><g transform="rotate(-90)">${glyphHtml(1)}</g></svg>${DOTS_TEXT.ways.state}</span>
        </div>
        <div class="p2-label p2-dots__answer-label">${DOTS_TEXT.answer}</div>
        <div class="p2-dots__answer">
          <span class="p2-dots__answer-wait">?</span><span class="p2-dots__answer-done">${DOTS.answer}<i class="p2-dots__check"></i></span><span class="p2-dots__answer-miss">${DOTS.miss}<i class="p2-dots__cross"></i></span><span class="p2-dots__answer-other">${DOTS_TEXT.worded}</span>
        </div>
        <div class="p2-dots__lattice">
          ${kit.lattice({ key: 'dots', ...DOTS.shape, tokens: DOTS.tokens.slice(0, 1) })}
          <svg class="p2-dots__over" viewBox="0 0 ${size.width} ${size.height}" width="${size.width}" height="${size.height}" aria-hidden="true">
            <path class="p2-dots__out" d="M${top.x} ${top.y - 14}V4"/>
            ${skipHtml()}
            ${band('none')}
            ${band('state')}
            ${hops.map(dropHtml).join('')}
            ${thinking.map((col) => `<circle class="p2-dots__dot" data-dot="${col}" cx="${dotPoint(col, 'token').x}" cy="${first.y}" r="8"/>`).join('')}
            <g class="p2-dots__gathers">${hops.map(gatherHtml).join('')}<path class="p2-dots__gather-head" d="M${top.x - 13} ${top.y + 3}l-15 -2l6 13z"/></g>
            ${hops.map(feedHtml).join('')}
          </svg>
          ${kit.lens({ key: 'dots' })}
        </div>
        <div class="p2-dots__readout">
          <span class="p2-label">${DOTS_TEXT.reads}</span>
          <span class="p2-dots__words">${thinking.map((col) => `<span class="p2-dots__word"><b data-word="${col}">${DOTS.tokens[col]}</b><i data-filler="${col}">.</i></span>`).join('')}</span>
          <span class="p2-dots__verdicts">
            <b data-verdict="words" data-tone="read">${DOTS_TEXT.verdicts.words}</b>
            <b data-verdict="dots" data-tone="hidden">${DOTS_TEXT.verdicts.dots}</b>
            <b data-verdict="state" data-tone="dim">${DOTS_TEXT.verdicts.state}</b>
          </span>
        </div>
      </div>
      <div class="p2-dots__cards">
        <div class="p2-dots__card" data-card="puzzle">
          <div class="p2-label">${DOTS_TEXT.puzzle.name}</div>
          <div class="p2-dots__task">${DOTS_TEXT.puzzle.ask}</div>
          <div class="p2-dots__metric">${DOTS_TEXT.metric}</div>
          ${barsHtml('puzzle')}
          ${kit.legend({ key: 'dots-model', text: DOTS_TEXT.puzzle.model })}
        </div>
        <div class="p2-dots__pair">
          <div class="p2-dots__card" data-card="state">
            <div class="p2-label">${DOTS_TEXT.tasks.name}</div>
            <div class="p2-dots__how">${DOTS_TEXT.tasks.how}</div>
            ${kit.legend({ key: 'vectors-model', text: DOTS_TEXT.tasks.model(said('hao.base')) })}
          </div>
          <div class="p2-dots__card" data-card="scores">
            <div class="p2-dots__metric">${DOTS_TEXT.metric}</div>
            <div class="p2-dots__task" data-task="logic">${DOTS_TEXT.tasks.logic(said('hao.task'))}</div>
            ${barsHtml('logic')}
            <div class="p2-dots__task" data-task="math">${DOTS_TEXT.tasks.math}</div>
            ${barsHtml('math')}
          </div>
        </div>
      </div>
      <div class="p2-dots__under">
        ${bridgeHtml()}
        ${whyHtml()}
        ${holdsHtml()}
      </div>
      <div class="p2-dots__sum">
        <p class="p2-dots__sum-name">${SUM.name}</p>
        <p class="p2-dots__sum-lead">${SUM.lead}</p>
        ${SUM.lines.map((clause, i) => `<p class="p2-dots__sum-line" data-sum="${i}">${clause}</p>`).join('')}
      </div>
    </div></div>`;
  };

  const dotsSetup = (ctx) => {
    const { fact, dur } = ctx;
    const { cols, rows } = DOTS.shape;
    const lens = '[data-lens="dots"]';
    const tokenText = (col) => `[data-lattice="dots"] [data-token="${col}"] text`;
    // The nodes and links of one column.
    const columnOf = (col) => [
      ...util.range(rows).map((row) => `[data-node="${col}-${row}"]`),
      ...util.range(rows - 1).map((row) => `[data-link="${col}-${row}"]`),
    ].join(', ');
    const passes = (col, at, ms) => at + Math.round((ms * (dotPoint(col, 'token').x - DOTS.lensFrom)) / DOTS.lensTravel);
    const rise = (step, col, at) => util.range(rows).forEach((row) => {
      step.cls(`[data-node="${col}-${row}"]`, 'is-lit', { at: at + row * DOTS.riseMs });
      if (row < rows - 1) step.cls(`[data-link="${col}-${row}"]`, 'is-lit', { at: at + row * DOTS.riseMs + DOTS.riseMs / 2 });
    });
    // The answer lands: it was open until the run was over. With written reasoning and with
    // dots it is the puzzle's answer, right, in green ('done'). The run that answers at
    // once gives the other answer, wrong, in red and with a cross ('miss'): one run and
    // its answer, an example of ours, as the right answers of the two runs beside it are;
    // how often such a run is right, the card says in the paper's word. (Until the
    // eleventh cold read, 2026-11-13, the box held "34% wrong", a rate over the whole test
    // set in the box of one run.) The run that feeds its state back writes an answer and
    // nothing else ('other': "in words", in the teal of what can be read, with no check;
    // the band under the machine says that nothing else is written,
    // 'p2.hao_language_mode'). Its numbers are from two other tasks and another model,
    // and the source reports no such run on the puzzle, so the box holds no value of the
    // puzzle's and does not say that an answer is right: how often it is, the next two
    // clicks say. What the box read before: "written" until the tenth cold read, in which
    // a reader looked for an answer in it; then the puzzle's "True", plain, which both
    // readers of the eleventh set against the two other tasks' numbers beside it.
    const FACES = Object.freeze({ done: '.p2-dots__answer-done', miss: '.p2-dots__answer-miss', other: '.p2-dots__answer-other' });
    const answered = (step, at, face = 'done') => {
      step.tween('.p2-dots__answer-wait', { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(FACES[face], { opacity: [0, 1] }, { at, dur: dur.micro });
      if (face !== 'other') step.cls('.p2-dots__answer', `is-${face}`, { at });
      step.tween('.p2-dots__answer', { scale: [1, 1.16] }, { at, dur: 140 });
      step.tween('.p2-dots__answer', { scale: [1.16, 1] }, { at: at + 140, dur: 260 });
    };
    // Every later run starts from a dark machine: no pulses, the answer open, no reading.
    // `face` is the answer the last run left, `verdict` and `shown` what its monitor read.
    const reset = (step, { face, verdict, shown }) => {
      step.cls('.dk-lattice__node, .dk-lattice__link', 'is-lit', { at: 0, on: false });
      step.tween('.p2-dots__answer-wait', { opacity: [0, 1] }, { at: 0, dur: dur.micro });
      step.tween(FACES[face], { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      if (face !== 'other') step.cls('.p2-dots__answer', `is-${face}`, { at: 0, on: false });
      if (verdict) step.tween(`[data-verdict="${verdict}"]`, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      if (shown) step.tween(shown, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
      step.tween(lens, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    };
    const sweep = (step, at, ms) => {
      step.tween(lens, { x: [DOTS.lensTravel, 0] }, { at: at - 10, dur: 0 });
      step.tween(lens, { opacity: [0, 1] }, { at, dur: dur.micro });
      step.tween(lens, { x: [0, DOTS.lensTravel] }, { at: at + 100, dur: ms, ease: 'linear' });
      return at + 100;
    };
    // The caption above the machine names what stands between question and answer in this run.
    const way = (step, from, to, at) => {
      if (from) step.tween(`[data-way="${from}"]`, { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(`[data-way="${to}"]`, { opacity: [0, 1] }, { at: at + (from ? dur.micro : 0), dur: dur.enter });
    };
    // A result lands on a card: its row appears, the bar runs out, and the number it reports
    // arrives as the bar does (no frame shows the number over a bar that is still short).
    // The number does not count up, and it grows by so little as it lands that it stays
    // clear of the row above. A row without a bar (the paper's word in the place of a
    // number) lands the same way. Returns when the bar has run out.
    const land = (step, task, row, at) => {
      const [, key] = BARS[task].find(([name]) => name === row);
      const bar = `[data-bar="${task}-${row}"]`;
      step.tween(bar, { opacity: [0, 1] }, { at, dur: dur.micro });
      if (key) step.tween(`${bar} i`, { '--v': ['0%', `${fact(key).value}%`] }, { at, dur: dur.enter });
      step.tween(`${bar} .p2-dots__bar-value`, { opacity: [0, 1] }, { at: at + dur.enter - 150, dur: dur.micro });
      step.tween(`${bar} .p2-dots__bar-value`, { scale: [1.12, 1] }, { at: at + dur.enter - 150, dur: 300 });
      return at + dur.enter;
    };
    // One task of the fourth model: its heading, the number it is compared with, then the
    // internal state's. Returns when the second number stands.
    const scored = (step, task, at) => {
      step.tween(`[data-task="${task}"]`, { opacity: [0, 1] }, { at, dur: dur.micro });
      return land(step, task, 'state', land(step, task, 'words', at + 200) + 100);
    };
    // The line under the picture gives its place to the next one.
    const under = (step, from, to, at) => {
      step.tween(from, { opacity: [1, 0] }, { at, dur: dur.micro });
      step.tween(to, { opacity: [0, 1] }, { at: at + dur.micro, dur: dur.enter });
    };

    // Enter: the way here from the last two slides, under the picture; the puzzle's
    // question; and the chain of slide 3. Up a column, down through the token
    // it writes, up the next one; the answer leaves the last column, and the puzzle's card
    // takes its first row. Then the monitor reads the text row.
    const enter = ctx.step({ label: 'written reasoning: a chain through written tokens, and the monitor reads every step' });
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
    land(enter, 'puzzle', 'words', chained + 400);
    const readAt = chained + 900;
    enter.tween(lens, { opacity: [0, 1] }, { at: readAt, dur: dur.micro });
    enter.tween(lens, { x: [0, DOTS.lensTravel] }, { at: readAt + 100, dur: 1200, ease: 'linear' });
    thinking.forEach((col) => {
      enter.cls(`[data-token="${col}"]`, 'is-read', { at: passes(col, readAt + 100, 1200) });
      enter.tween(`[data-word="${col}"]`, { opacity: [0, 1] }, { at: passes(col, readAt + 100, 1200), dur: dur.micro });
    });
    enter.tween('[data-verdict="words"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: readAt + 1400, dur: dur.enter, ease: 'back' });

    // Click 1: the same model made to answer at once. The seven columns of the reasoning
    // and their words go (what is left of them is a ghost: this run does not have them),
    // and a dashed band says that nothing is written in their place; the monitor's readout
    // steps back with them. The question's column runs alone, its result goes straight to
    // the answer, and the answer box gives this run's answer, the wrong one; the card takes
    // its second row, the paper's word for how often such a run is right. One run and
    // its result: one state. (Until the redesign after the ninth cold read the machine did
    // not move at this click and the row was called "no reasoning": a reader could not
    // tell it from the dots, which are no reasoning either.)
    const base = ctx.step({ label: 'answer at once: nothing written in between, a wrong answer, and the paper calls this run’s accuracy near-random' });
    reset(base, { face: 'done', verdict: 'words', shown: '[data-word]' });
    base.tween('.p2-dots__drop', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    way(base, 'words', 'none', 200);
    thinking.forEach((col) => {
      base.tween(columnOf(col), { opacity: [1, DOTS.ghost] }, { at: 200, dur: dur.enter });
      base.tween(`[data-token="${col}"]`, { opacity: [1, 0] }, { at: 200, dur: dur.enter });
    });
    base.tween('.p2-dots__out', { opacity: [1, DOTS.ghost] }, { at: 200, dur: dur.enter });
    base.tween('.p2-dots__readout', { opacity: [1, 0.3] }, { at: 200, dur: dur.enter });
    base.tween('[data-band="none"]', { opacity: [0, 1] }, { at: 500, dur: dur.enter });
    rise(base, 0, DOTS_AT.alone);
    base.tween('.p2-dots__skip', { opacity: [0, 1] }, { at: DOTS_AT.alone + rows * DOTS.riseMs, dur: 60 });
    base.tween('.p2-dots__skip', { '--draw': [1, 0] }, { at: DOTS_AT.alone + rows * DOTS.riseMs, dur: 500, ease: 'inOut' });
    answered(base, DOTS_AT.missed, 'miss');
    const missed = land(base, 'puzzle', 'none', DOTS_AT.missed + 300);
    base.tween('.p2-dots__bar-note', { opacity: [0, 1] }, { at: missed + 100, dur: dur.enter });
    base.hold(200);

    // Click 2: the columns come back, and where each word stood there is now a dot. The
    // answer is open again: one beat in which nobody knows whether it will be right. Then
    // all columns work at once and the last one gathers them; the answer lands, right, and
    // at that moment the dots' bar runs out to its number, past the bar of the run that
    // answered at once. Only then the monitor reads the text row: dots. Last, under the
    // picture, what a dot adds, why that is enough for this puzzle and what the arcs are.
    // One run of the machine and its verdict: one state.
    const fill = ctx.step({ label: 'dots in place of the words: still the right answer, and the monitor reads only dots' });
    reset(fill, { face: 'miss' });
    fill.tween('.p2-dots__skip', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    fill.tween('[data-band="none"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    fill.tween('.p2-dots__out', { opacity: [DOTS.ghost, 1] }, { at: 300, dur: dur.enter });
    fill.tween('.p2-dots__readout', { opacity: [0.3, 1] }, { at: 300, dur: dur.enter });
    way(fill, 'none', 'dots', 200);
    thinking.forEach((col, k) => {
      const at = 400 + k * 130;
      fill.type(tokenText(col), '', { at: 0, dur: 0 });
      fill.cls(`[data-token="${col}"]`, 'is-read', { at: 0, on: false });
      fill.cls(`[data-token="${col}"]`, 'is-dot', { at: 0 });
      fill.tween(columnOf(col), { opacity: [DOTS.ghost, 1] }, { at, dur: dur.micro });
      fill.tween(`[data-token="${col}"]`, { opacity: [0, 1] }, { at, dur: dur.micro });
      fill.tween(`[data-dot="${col}"]`, { opacity: [0, 1], scale: [0, 1] }, { at: at + 110, dur: 260, ease: 'back' });
    });
    fill.tween('.p2-dots__answer', { scale: [1, 1.16] }, { at: DOTS_AT.open, dur: 160 });
    fill.tween('.p2-dots__answer', { scale: [1.16, 1] }, { at: DOTS_AT.open + 160, dur: 300 });
    util.range(cols).forEach((col) => rise(fill, col, DOTS_AT.again));
    fill.tween('.p2-dots__gathers', { opacity: [0, 1] }, { at: DOTS_AT.again + 150, dur: 60 });
    fill.tween('.p2-dots__gather', { '--draw': [1, 0] }, { at: DOTS_AT.again + 150, dur: 500, ease: 'inOut', stagger: 30 });
    fill.tween('.p2-dots__gather-head', { opacity: [0, 1] }, { at: DOTS_AT.again + 600, dur: dur.micro });
    answered(fill, DOTS_AT.solved);
    land(fill, 'puzzle', 'dots', DOTS_AT.solved);
    const reread = sweep(fill, DOTS_AT.solved + 600, 700);
    thinking.forEach((col) => fill.tween(`[data-filler="${col}"]`, { opacity: [0, 1] }, { at: passes(col, reread, 700), dur: dur.micro }));
    fill.tween('[data-verdict="dots"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: reread + 800, dur: dur.enter, ease: 'back' });
    // Last, with the monitor's verdict: what a dot adds, why this puzzle needs no more,
    // and what the arcs carry, in the place of the line that led here.
    under(fill, '.p2-dots__bridge', '.p2-dots__why-dots', reread + 600);

    // Click 3: another model, and what the monitor finds. The puzzle's card leaves (this
    // run is not about the puzzle, and its three bars are not this run's result) and so
    // does the line about the dots; in the card's place a small card arrives with one
    // sentence, what this model does, and no number. The text row lifts away: a dashed
    // band says that no reasoning is written, only the
    // answer. A chain runs again, and from the top of each column a pipe carries the
    // column's internal state, drawn as a column of cells, down into the bottom of the
    // next. The answer lands, "in words" and with no check; the lens sweeps the band and goes gray, and the
    // monitor's verdict is that there is no reasoning to read. The step ends on that
    // verdict; this model's results are the next two clicks.
    const latent = ctx.step({ label: 'another small model feeds its internal state back in: no reasoning is written, and the monitor has none to read' });
    reset(latent, { face: 'done', verdict: 'dots', shown: '[data-filler]' });
    latent.tween('[data-card="puzzle"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    latent.tween('.p2-dots__why-dots', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    latent.tween('.p2-dots__gathers', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    latent.show('[data-card="state"]', { at: 300 });
    way(latent, 'dots', 'state', 300);
    thinking.forEach((col, k) => latent.tween(`[data-token="${col}"], [data-dot="${col}"]`, { y: [0, -40], opacity: [1, 0] }, { at: 250 + k * 60, dur: dur.enter, ease: 'in' }));
    latent.tween('[data-band="state"]', { opacity: [0, 1] }, { at: 1000, dur: dur.enter });
    util.range(cols).forEach((col) => {
      rise(latent, col, DOTS_AT.chain + col * DOTS.feedMs);
      if (col === cols - 1) return;
      const hop = DOTS_AT.chain + col * DOTS.feedMs + rows * DOTS.riseMs - 20;
      latent.tween(`[data-feed="${col}"]`, { opacity: [0, 1] }, { at: hop, dur: 60 });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-line`, { '--draw': [1, 0] }, { at: hop, dur: 170, ease: 'inOut' });
      latent.tween(`[data-feed="${col}"] .p2-dots__glyph`, { scale: [0.3, 1] }, { at: hop + 40, dur: 220, ease: 'back' });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-head`, { opacity: [0, 1] }, { at: hop + 120, dur: 80 });
    });
    answered(latent, DOTS_AT.fed, 'other');
    const blind = sweep(latent, DOTS_AT.fed + 300, 700);
    latent.cls(lens, 'p2-is-off', { at: blind + 700 });
    latent.tween('[data-verdict="state"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: DOTS_AT.read, dur: dur.enter, ease: 'back' });

    // Click 4: this model's first result, on a card of its own under the one that says what
    // the model does: on the logic questions the internal state gets more answers right
    // than written reasoning does.
    const logic = ctx.step({ label: 'its first result: on logic questions it beats written reasoning' });
    logic.show('[data-card="scores"]', { at: 100 });
    scored(logic, 'logic', DOTS_SCORED.logic);
    logic.hold(200);

    // Click 5: its second result, on a click of its own (the other half of the comparison):
    // on school math it stays behind written reasoning. When both numbers stand, the cue
    // says what the two tasks show, and then the slide's main line arrives under the
    // picture: how the title squares with slide 3.
    // The line stays until the last click takes the picture away. (Until the tenth cold
    // read, 2026-11-13, the line had a click of its own, a step of half a second that
    // held nothing else, and the slide had eight steps.)
    const math = ctx.step({ label: 'its second result: on school math it stays behind written reasoning; small models trained for it, and today’s large models still need written reasoning' });
    scored(math, 'math', DOTS_SCORED.math);
    math.tween('.p2-dots__holds', { opacity: [0, 1] }, { at: DOTS_SCORED.math + DOTS_SCORED.lands + 400, dur: dur.enter });
    math.hold(300);

    // Click 6: the sentence that closes Part 2, on a beat of its own: the picture steps back
    // and the three ways written reasoning fails that the part has shown come one by one,
    // a clause for each slide (the cause of the answer left out; reasoning written to fit
    // an answer already decided; the written reasoning gone after training). It sums up
    // the part; it does not argue from the main line. The panel covers
    // the machine and the cards. What would show around it goes: the main line under it, and
    // the note of a card, which hangs below that card's border. The cues, which
    // belong to the clicks before, step back, and so does the slide's title: it is the
    // title of this slide, and the panel under it sums up the whole part
    // (its name stands over the sentence).
    const sum = ctx.step({ label: 'Part 2 in one sentence: three ways written reasoning fails' });
    sum.tween('.p2-dots__machine', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__cards', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__under', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    sum.tween('[data-legend="vectors-model"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    sum.tween('.dk-cues', { opacity: [1, 0.3] }, { at: 0, dur: dur.enter });
    sum.tween('.dk-title', { opacity: [1, 0.3] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__sum', { opacity: [0, 1], scale: [0.96, 1] }, { at: 200, dur: dur.enter });
    SUM.lines.forEach((_, i) => sum.tween(`[data-sum="${i}"]`, { opacity: [0, 1], x: [-16, 0] }, { at: 700 + i * 450, dur: dur.enter }));
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
      { text: 'Dots: still the right answer, with no reasoning to read', step: 2, at: DOTS_AT.solved },
      // With the second result of the model that feeds its state back: the clicks before
      // it have shown that there is no reasoning to read, and that it wins at logic. The
      // main line under the picture follows it in the same click.
      { text: 'Reasoning kept inside: nothing to read; better at logic, worse at math', step: 5, at: DOTS_SCORED.math + DOTS_SCORED.lands },
    ],
    // The footer has room for two sources beside its three tags (a third is cut off, and the
    // lint fails on that). It names the two whose numbers and mechanisms the picture shows.
    // The main line recalls slides 2 and 3, which cite Korbak et al.; the closing panel
    // repeats what slides 5 and 6 showed, in our words and with no quote, and those slides
    // cite Chen et al. and Emmons et al.
    cite: [
      { src: 'pfau2024', where: 'Fig. 3, Sec. 4.2' },
      { src: 'hao2024', where: 'Table 1' },
    ],
    // Our drawing of the mechanisms the sources report; the seven words on the machine are
    // an example of ours; the bars show the reported accuracies.
    figure: ['schematic', 'illustrative'],
    numbers: 'reported',
    html: dotsHtml(),
    setup: dotsSetup,
  });
})();
