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

  // Facts behind lines that slide 5 gained after a cold read: the monitor's verdict on run
  // 2's reasoning ("clean": a monitor that reads only the reasoning cannot flag a cause
  // that the reasoning leaves out, 'p2.chen_monitor'), and why nothing forces the hint into
  // the words (the paper's hints are easy to use and need no written reasoning:
  // 'p2.chen_easy', 'p2.chen_no_cot'). Until 2026-11-15 slide 5 said the second in a line
  // of its own, under a wire from the hint around the reasoning to the answer; the wire and
  // the line are gone (SPEC.md section 7.31: slide 5 shows what happened, slide 6 why), and
  // the two facts stay registered behind the lower lane of slide 6's first row: one run
  // through the layers is enough for (A) to light up inside the model while the page says
  // "nothing written yet" (a sentence under that row said it in words until SPEC.md section
  // 7.32, "one pass is enough to follow the hint: ... with nothing written"). Each was
  // searched for as a whole string on 2026-11-12 in the copy of the arXiv HTML full text
  // (2505.05410v1) downloaded on 2026-11-09, and so was 'p2.chen_pattern' once more: the
  // pattern that run 2's reasoning is built after. No slide prints it since slide 6 was
  // rebuilt (SPEC.md, 7.28).
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
  // in a row than one run through the layers holds ('p2.emmons_layers'), so the steps have
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
  // 'p2.pfau_parallelizable' and 'p2.pfau_pairwise', with 'pfau.parallel', are behind
  // "With dots, the columns work side by side." under the fourth model's card, and
  // 'p2.pfau_third' behind the line under the picture at the dots' click ("The arcs carry
  // each column's result to the last one.": the paper computes the sums of pairs in
  // parallel before it looks for a third input that matches; the paper
  // does not say that each triple is checked at once, and the slide does not either).
  // Until 2026-11-16 (SPEC.md section 7.36) all of it stood in that one line, which also
  // said why that is enough here, "This puzzle splits into independent
  // pieces ... each in one run" ("each in one pass" until 2026-11-15, SPEC.md section
  // 7.34): the pieces are the sums of pairs, and a dot computes
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
  // Facts behind the line over the two results of the model that feeds its state back,
  // "The same GPT-2, trained two ways:" (2026-11-16, SPEC.md section 7.35): every model of
  // the paper's experiments is the one base model ('hao.base'), and the row that the slide
  // calls "written reasoning" is that model trained on written reasoning chains, which it
  // then writes out before it answers. Each was found once as a whole string on 2026-11-16
  // in the arXiv HTML full text of 2412.06769v4, fetched that day (tags taken out, white
  // space joined), in which the four sentences of the same paper registered above were
  // found once each as well; a control with one word changed ("GPT-3", "a partial
  // reasoning chain") was not found.
  Deck.addFacts({
    'p2.hao_base_all': { text: 'We use a pre-trained GPT-2 model as the base model for all experiments.', src: 'hao2024', where: 'Sec. 4.1' },
    'p2.hao_cot_trained': {
      text: 'the model is trained with CoT data, and during inference, the model will generate a complete reasoning chain to solve the problem.',
      src: 'hao2024', where: 'Sec. 4.1',
    },
  });

  // The worked example of slides 5 and 6 is ours (illustrative; slide 6 replays slide 5's
  // second run), built after the paper's own example ('p2.chen_example') and the pattern it
  // reports ('p2.chen_pattern'): right without the hint, then a flawed justification of the
  // hinted answer that leaves the hint out. The hint sentence is the paper's, word for word.
  // The footer says which is which, because the question around the hint is not the
  // paper's: the tag "Illustrative" for the example, and the cite of Table 1 for the hint
  // (until SPEC.md section 7.29 each box said it on its border). SPEC.md section 7.39
  // weighed a word inside the panes and withdrew it under the ruling of section 7.29; the
  // speaker's line "Here's the kind of reasoning a model writes." says it. The hint names
  // (A), so the question is built to make (A) wrong and (B) right.
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
    // Beside the pill, on its row: what this slide is about to show, in the words the
    // speaker opens Part 2 with, so that they can be read off the screen (2026-11-16,
    // SPEC.md section 7.35). It stands apart from the pill, which is a callback: this line
    // looks ahead. It has the speaker's comma after "Next", not a colon: the self-test reads
    // "next:" on a slide as a hand-off to a presenter (tools/selftest.mjs, the check on who
    // is named where), and this line hands nothing off.
    next: 'Next, a case where the real reason never gets written.',
    // What a monitor would find in run 2's reasoning: one that reads this pane and nothing
    // else has nothing to flag ('p2.chen_monitor'). Worded as a supposition: the verdict
    // is ours, not a measured result ('p2.chen_checker').
    monitor: 'If monitored:',
    clean: 'clean',
    never: 'This reasoning never mentions the hint',
    // Why nothing forced the hint into the words is not said on this slide: until
    // 2026-11-15 a line under a wire from the hint to the answer said it ("Following this
    // hint needs no written reasoning, so nothing forces the hint into it."), and the next
    // slide, which says it with its own picture, then sounded like this one told twice.
    // Over the charts: what was repeated and on what ('p2.chen_two_models', 'p2.chen_hints'),
    // then what the charts count. The charts stand alone on the stage, so the first line
    // says in full what the example was one case of. Until the tenth cold read
    // (2026-11-13) it counted the kinds of hint, "6 kinds of hint (the professor’s is
    // one)", and the line under the charts named "two question sets": a reader asked for
    // the five other kinds, and the paper's names for them (sycophancy, consistency, visual
    // pattern, metadata, grader hacking, unethical information; Table 1) explain nothing
    // without an example each. The count and the sets are in the fact table.
    // Since 2026-11-16 the first line opens on "Now the real numbers:", the speaker's
    // words at this click (SPEC.md section 7.35); what follows the colon is as it was.
    repeat: 'Now the real numbers: the same test on two reasoning models, over many questions and several kinds of hint.',
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
    line: 32,             // one line of reasoning
    cps: 40, hintCps: 44,
    perLine: 500,         // the monitor: how long the lens takes to read one line
    countAt: 1100, cellMs: 20, restAfter: 250,   // the charts: when they start to count, one cell of the longer count, the pause before the rest
  });
  const typed = (text, cps) => Math.round((text.length / cps) * 1000);
  // The beats that a cue waits for, in ms from the start of their step. Enter: when run 1 has
  // answered. Click 1: when the hint starts to type and when it stands. Click 3: when the
  // monitor has read the last line and gives its verdict. Click 4: how long
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
          ${hinted ? '' : `<div class="p2-hint__after">
            <div class="p2-hint__echo">
              <span class="p2-hint__echo-note">${HINT_TEXT.echoNote}</span>
              <span class="p2-hint__echo-quote">“${said('baker.quote_hack')}”</span>
              ${kit.flag({ key: 'echo', text: HINT_TEXT.echoFlag })}
            </div>
            <span class="p2-hint__next">${HINT_TEXT.next}</span>
          </div>`}
        </div>`;
  };

  // Nothing on this slide draws how the hint reached the answer. Until 2026-11-15 a wire
  // did, on a click of its own: from the hint in run 2's prompt, out of the card, down past
  // the reasoning and under it, and up into the answer, with a line under it that said why
  // it could go around. Two cold reads found that it told the next slide's point before
  // that slide: this one now shows what happened, and the next one why (SPEC.md section
  // 7.31).
  const hintHtml = () => `
    <div class="p2-hint"><div class="p2-hint__box">
      <div class="p2-hint__case">
        ${runHtml('plain', CASE.plain)}
        ${runHtml('hinted', CASE.hinted)}
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
    const tile = `${hinted} .p2-hint__tile`;

    // Five steps, one state a step: a state that the presenter talks about stands until the
    // next click, and the two halves of a comparison are two clicks (SPEC.md section 7.30).
    // Six until 2026-11-15, when the click that drew a wire from the hint around the
    // reasoning to the answer left the slide (SPEC.md section 7.31).
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
    enter.show('.p2-hint__next', { at: plainDone + 900, rise: 8 });

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
    // (B) that the same question got in run 1. What carried the hint to the answer is not
    // drawn on this slide: the next one replays this run in the order in which it came about.
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
    // ends there, and it is the last state of the example: what happened, and what a
    // monitor would find. Why the reasoning could leave the hint out is the next slide's
    // (until 2026-11-15 a click of its own followed here, with a wire from the hint around
    // the reasoning to the answer and a line under it that said why; until SPEC.md section
    // 7.30 the wire followed in this click).
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

    // Click 4: from one example to the reported averages. The example leaves the stage,
    // the two runs, the verdict and the pill with it, and the charts take the whole box:
    // one thing to look at (until the ninth cold read the example stayed and the charts
    // stood under it, and the end state held both runs, the verdict, a wire from the hint
    // to the answer, two charts, the line about the averages and three cues).
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
      // When the hint stands: what the amber sentence is, and that it is not ours, in the
      // words the speaker says once the hint has been read out (2026-11-16, SPEC.md section
      // 7.35; until then "A professor’s opinion, slipped into the prompt", which came as the
      // hint started to type and was not said).
      { text: 'That’s the hint, from a real experiment: a professor’s opinion', step: 1, at: HINT_AT.hintDone },
      // "the reasoning", not "this reasoning": the cue stays when the example gives way to
      // the charts at click 4, and has to read without it (the eleventh cold read).
      { text: 'A monitor reading only the reasoning would see nothing wrong', step: 3, at: HINT_AT.judged },
      // The charts say which share is which model's; the cue says what both show. Until the
      // tenth cold read it repeated the two numbers without the models' names ("In 75% and
      // 61% of flips, ...").
      { text: 'Both models: in most flips, the reasoning never mentions the hint', step: 4, at: HINT_AT.landed },
    ],
    // Table 1 holds the hint, which the slide prints word for word; Fig. 2 is the paper's
    // own example, which ours follows; Fig. 1 has the two scores of the charts. The footer
    // names them, and no box carries a note on its border. Until 2026-11-15 the cite also
    // named Sec. 7.2, the place of 'p2.chen_easy', which stood behind the line under the
    // wire; it left with that line. A mark "(hint, quoted)" behind "Table 1", as slide 6's
    // footer has it, did not fit while Sec. 7.2 was named (34 px to spare in Verdana) and
    // was not added when it left.
    cite: [{ src: 'chen2025', where: 'Table 1; Fig. 1-2' }, { src: 'baker2025', where: 'Fig. 9' }],
    figure: 'illustrative',
    numbers: 'reported',
    html: hintHtml(),
    setup: hintSetup,
  });

  // ---------------------------------------------------------------- slide 6: the answer first
  // Why the reasoning of slide 5's second run does not mention the hint. Emmons et al. 2025
  // tell two roles of written reasoning apart, and the picture has one row for each.
  // A row has two lanes, one over the other, and a line between them that carries their
  // names, "on the page" (teal, pointing up) and "inside the model" (amber, pointing down).
  // The upper lane is the page: the flow of slide 2, left to right in the order in which a
  // model writes it, the prompt, the written reasoning, the answer. The lower lane is the
  // inside of the model, a band in the amber of what is not written. In it stands a stack
  // of layers (four, slide 3's count), and to its right the place where an answer can be
  // decided before a word is written. One run through the layers is drawn, not defined in
  // a sentence: the prompt goes down into the bottom layer, and a light goes up through
  // the stack once, layer by layer; beside it stands how often that happens and what it
  // is, on two lines, one over the way out of the stack and one under it: "one word at a
  // time" (with an arrow that points up), "one run through all the layers"
  // (PH_TEXT.pass). The deck's word for it was "one pass" until 2026-11-15 (SPEC.md
  // section 7.34: the user found it hard to follow); slide 3 still says "one pass".
  // (Until 2026-11-15 the row had no lanes: a capsule "can be
  // decided first" hung under the reasoning box and read as something on the page, one
  // pass was a sentence under it, and both answers said "written last" with nothing that
  // said where "first" was. SPEC.md section 7.32.)
  // Top row: the hinted run of slide 5 again (its question, hint, reasoning and answer). It
  // enters as slide 5 left it, the three lines written and the answer (A), wrong, so that
  // it is known at a glance; only the page is on the stage, and the step ends there. At the
  // first click the run is rewound, as a tape is: the answer turns back to "?", the three
  // lines are taken back from the last to the first, each from its end, the row's name
  // changes to "Replay: in time order", and a rewind mark stands between the two boxes
  // while it lasts. Then the line between the lanes is drawn and the inside of the model
  // opens under the row, and the run plays forward, slowly. The prompt goes down into the
  // model, the light goes up through the layers once, and at the end of that one run (A)
  // lights up inside: picked, and not a written token ('p2.emmons_posthoc': "an answer
  // the model has already computed internally"). On the page nothing is written yet, and
  // the written answer is still open.
  // At the next click the reasoning is written as a model writes it, line by line and left
  // to right, and each line is tied to the answer that is alight: a thread comes up from
  // it, across the line between the lanes, to the line of reasoning, which is typed toward
  // it, as if a magnet drew it. Last, (A) is written as the answer. Three labels carry the
  // order and tell picking from writing: "can be picked before word one" on (A) in the
  // lower lane, "written to reach it" on the reasoning, "written last" on the answer. The
  // first of them says "can", as the first cue does: what is in the lower lane is our
  // drawing of what the paper says can happen ("In some cases"), not something observed
  // in this run (the cold read of the whole deck at the end of SPEC.md section 7.30 took a
  // label without "can" for a fact). It read "can be decided inside" until 2026-11-15
  // (SPEC.md section 7.34) and then "picked before word one", without "can", which does
  // not fit the capsule on one line with "before word one"; both readers of the ninth cold
  // read of the speaker script (2026-11-16) found the capsule surer than the speaker and
  // the cue, so the label has two lines now and the capsule is 72px high (SPEC.md section
  // 7.36). A thread ends in an arrowhead at its line, so that it reads
  // from the answer to the reasoning. The click after that brings the paper's sentence,
  // which names it.
  // Bottom row, at the last two clicks, and not on the stage before them: a question that
  // needs its steps, a product of two four-digit numbers (an example of ours), with the
  // same two lanes. The same light goes up through the same stack, and no answer comes
  // out of it: the way from the top layer stops at a cross before an empty dashed capsule,
  // "no answer before word one", and beside the stack stands why, "too many steps for one
  // run" ('p2.emmons_layers', and slide 3's first cue: one step per layer, no more). The
  // light goes through every layer and is not stopped halfway: the run is whole, and it
  // is not enough. That is one click and one state. At the next click the light goes
  // through the upper lane, in the teal of what is written: each line is typed, and only
  // then does the answer land. Here the answer is worked out on the page, and written
  // last as in the top row. That is slide 3's rule again, and slide 9 tries it with a hint.
  // The click ends on what the two rows come to: the paper's sentence leaves, and in its
  // place between the rows a line comes up, "A monitor reading only the reasoning: in
  // both rows, reasoning first, answer last." (since the cold read of 2026-11-15, SPEC.md
  // section 7.33; reworded the same day after the seventh cold read of the speaker script,
  // and again in SPEC.md section 7.38: it said "A monitor sees only the page", and the
  // hint stands on the page).
  // Since the same cold read the stack of the top row is not alight once only: before
  // each line of the reasoning at click 2 a lighter pass goes up through it (`repass`),
  // and the label beside the stack says how the two go together ("one pass per word
  // written" from that cold read until SPEC.md section 7.34; now "one word at a time",
  // "one run through all the layers").
  const PH_TERM = 'post-hoc rationalization';
  const PH_TEXT = Object.freeze({
    // The name on a row's first box. The top row has two, in one place: `recalled` while
    // the run stands as slide 5 left it (the entrance), and `rows.easy` from the rewind
    // on, which says what the replay is: the same run, in the order in which it came
    // about.
    rows: Object.freeze({ easy: 'Replay: in time order', hard: 'Another question: it needs its steps' }),
    recalled: 'Replay: the hinted run',
    empty: 'nothing written yet',
    // The two lanes of a row, named on the line between them: what is written, over what
    // happens in the model and is not written. The same two names stand in both rows.
    sides: Object.freeze({ page: 'on the page', model: 'inside the model' }),
    // Left of the top row's stack, level with its upper bars: what the four bars are, in
    // one word and in the gray of a caption (SPEC.md section 7.39: a reader of the twelfth
    // cold read of the speaker script could not say what the bars were; "one run through
    // all the layers" stands at the stack's other side and does not point at them). The
    // speaker does not read it. The bottom row's stack is the same drawing and has none.
    layers: 'layers',
    // Beside a row's stack of layers: what the light that goes up through it is, and in
    // the bottom row why no answer comes out of it ('p2.emmons_layers',
    // 'p2.emmons_externalize'). The two answer each other. Until 2026-11-15 the top row
    // said it in a sentence under the row, "one pass is enough to follow the hint: a
    // single run through the model's layers, with nothing written"; the picture says it
    // now, and the page's own "nothing written yet".
    // The top row's label says how a run through the layers and a written word go
    // together: the model writes one word at a time, and for each word it runs once
    // through all its layers (slide 3's machine and slide 7's draw it, a column a token;
    // 'p2.hao_language_mode': "autoregressively generating the next token"). Two short
    // lines, which the speaker can read out as they stand: `word` over the way out of the
    // stack, with the arrow that points up, and `run` under it. It read "one pass through
    // the layers" until the cold read of 2026-11-15 (SPEC.md section 7.33: both readers
    // could say what one pass is, and neither could say from the screen that a pass is
    // what writes one word), and "one pass per word written" from then until the user
    // found "one pass" hard to follow (the same day, SPEC.md section 7.34). The wording
    // first asked for, in one line, "one word at a time: each word runs once through all the
    // layers", does not fit before the capsule in any font set (668 px wide in the
    // default faces, 381 px free beside the arrow), and neither does "each word runs once
    // through all the layers" on a line of its own (458 px in the default faces, 579 px
    // in Verdana, 403 px free).
    // `hard` takes up the noun of `run`: the same run, and it is not enough.
    pass: Object.freeze({
      easy: Object.freeze({ word: 'one word at a time', run: 'one run through all the layers' }),
      hard: 'too many steps for one run',
    }),
    // What came about where and when. In the lower lane, on the answer that lights up
    // inside the model, and on the empty capsule of the bottom row; then on the reasoning
    // and on the answer of each row. The answer is written last in both rows: the rows
    // differ in when it was there, which the lower lane shows: a lit capsule that holds
    // the answer in the top row, a dashed and empty one in the bottom row. The two
    // capsules end on the same three words, one above the other: with the hint in the
    // prompt from the start, (A) can be picked before the first word is written; the
    // product has no answer by then. (Until 2026-11-15 they read "can be decided inside"
    // and "cannot be decided inside", SPEC.md section 7.34. "Picked" is said of the top
    // row only: its question has options to pick from, the product has none.) `inside`
    // is two lines, one a line of the capsule: with "can" the label has 29 characters, and
    // the capsule holds 22 on a line (2026-11-16, SPEC.md section 7.36; until then
    // "picked before word one" on one line, which read as an observed fact).
    order: Object.freeze({
      inside: Object.freeze(['can be picked', 'before word one']),
      closed: 'no answer before word one',
      easy: Object.freeze({ reason: 'written to reach it', answer: 'written last' }),
      hard: Object.freeze({ reason: 'worked out in words', answer: 'written last' }),
    }),
    // The bottom row's question, of two numbers.
    ask: (a, b) => `What is ${a} × ${b}?`,
    // The paper's abbreviation in its sentence, and our words that stand in its place on
    // screen, in square brackets, the usual mark of words put into a quote: the registered
    // sentence keeps "the CoT", the screen does not print it (until 2026-11-13 it printed
    // both, "the CoT [the written reasoning]", and a speaker who reads the screen had to
    // skip the abbreviation). `term` is our gloss of the paper's name for this role of the
    // reasoning, in brackets behind it: a reader of the eleventh cold read (2026-11-13)
    // did not know the term. Since 2026-11-16 (SPEC.md section 7.36) the gloss is what the
    // sentence sets off, in amber, and the term stands in the face of the sentence: the
    // speaker says the gloss and not the term, and a listener saw the largest words of the
    // sentence and never heard them.
    // What the two rows come to, on screen from the end of the last click: a monitor is
    // shown only the reasoning, the middle box of each row's upper lane, and there the two
    // rows have the same form, a reasoning written first and an answer written last; what
    // tells them apart is under the line ('korbak.monitor_def': a monitor "reads the CoT"; 'p2.chen_monitor'; slide
    // 5's cue, "A monitor reading only the reasoning would see nothing wrong"). Until the
    // cold read of 2026-11-15 (SPEC.md section 7.33) only the speaker said it. One line,
    // between the rows, in the place that the paper's sentence leaves. The line names
    // what is the same on the page, the order: until the seventh cold read of the speaker
    // script (2026-11-15) it ended "both rows look the same.", and both readers set that
    // against the picture, in which the top row's answer is amber and "wrong" and the
    // bottom row's teal and "correct". Until SPEC.md section 7.38 it began "A monitor
    // sees only the page": a listener of the eleventh cold read of the speaker script set
    // that against the picture, in which the hint stands in the prompt, in the lane named
    // "on the page", so that a monitor that sees the page sees the hint. The line now
    // names what the monitor is shown in slide 5's words (its second cue: "A monitor
    // reading only the reasoning would see nothing wrong"): the reasoning box of each row.
    monitor: 'A monitor reading only the reasoning: in both rows, reasoning first, answer last.',
    // Under that line, from the same moment: what follows from it, the slide's last
    // sentence, which the speaker said from memory until 2026-11-16 (SPEC.md section 7.35).
    // It is said of the page alone ('p2.emmons_confabulate': the reason given "may or may
    // not be an accurate description of the steps it actually took").
    cannot: 'It can’t tell which reasoning did the work.',
    // In the same place between the rows, from the entrance until the paper's sentence
    // takes it at click 3: the question that the replay answers, in the words the speaker
    // opens the slide with (2026-11-16, SPEC.md section 7.35). It began "Same run." until
    // the thirteenth cold read: slide 5's reasoning is an example, not a run that was
    // observed (SPEC.md section 7.40).
    asks: 'Same example. Which came first, the answer or the reasoning?',
    // Beside the way on which the prompt goes down into the model, in the top row's lower
    // lane: why (A) can be picked before the first word, the first half of the speaker's
    // sentence; the first cue is its second half (2026-11-16, SPEC.md section 7.35).
    // 'chen.hint' is a sentence of the prompt, and the prompt is what the first run through
    // the layers is given.
    given: 'The hint is in the prompt from the start',
    cot: 'the CoT',
    gloss: 'the written reasoning',
    term: 'made up afterward',
    by: 'Emmons et al. 2025, Sec. 2',
  });
  // The paper's sentence as the screen prints it: our words in brackets in the place of
  // "the CoT", in the face of the sentence, of which they are the subject; the term in the
  // face of the sentence too, with our gloss behind it set off (upright, in amber: the
  // words that the speaker says). The term and its gloss keep to one line, so that the
  // gloss never starts a line away from the words it explains.
  const phQuote = () => {
    const text = said('p2.emmons_posthoc');
    if (!text.includes(PH_TEXT.cot) || !text.includes(PH_TERM)) throw new Error(`the sentence of Emmons et al. no longer contains "${PH_TEXT.cot}" and "${PH_TERM}"`);
    return text.replace(PH_TEXT.cot, `[${PH_TEXT.gloss}]`).replace(PH_TERM, `<span class="p2-ph__term">${PH_TERM} <span class="p2-gloss">[${PH_TEXT.term}]</span></span>`);
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
  // Where things stand, in the box of 1728 x 632 (parts/part2.css has the same numbers).
  // What is given from a row's top is the same in both rows.
  const PH = Object.freeze({
    tops: Object.freeze({ easy: 0, hard: 378 }),      // where a row starts in the box
    card: Object.freeze({ dy: 16, h: 120 }),          // the upper lane: a row's three boxes, under the names on their borders
    prompt: Object.freeze({ x: 0, w: 640 }),
    reason: Object.freeze({ x: 744, w: 576 }),
    answer: Object.freeze({ x: 1424, w: 304 }),
    enters: 596,                                      // where the prompt goes down into the model, out of the bottom edge of its box
    // The stack of layers in the lower lane: `top` is the middle of its top layer, from the
    // row's top; the layers are `pitch` apart. Four layers: slide 3's count for one pass.
    // The stack starts 104px right of the way down (`enters`), which leaves room for the
    // caption "layers" between the two (SPEC.md section 7.39; until then x 638, 212 wide,
    // with the same right edge).
    stack: Object.freeze({ x: 700, w: 150, top: 177, pitch: 22, layers: 4 }),
    // The capsule at the right end of the lower lane: the empty one of the row that needs
    // its steps (`y`, `h`), and the one of the answer that lights up inside the model, which
    // is `tall` high around the same middle (its label has two lines).
    inside: Object.freeze({ x: 1299, y: 187, w: 429, h: 48, tall: 72 }),
    trunk: 1346,                                      // where the threads rise from it, between the reasoning and the answer; "(A)" stands under it
    lands: 32,                                        // where the pulse from it comes up into the answer box, from that box's left edge
    line: Object.freeze({ first: 38, pitch: 32 }),    // the middle of the first line of reasoning, from the card's top, and from line to line (parts/part2.css)
    stops: 1264,                                      // where the way out of the stack stops in the row that needs its steps: short of the capsule
  });
  const phAt = (row, y) => PH.tops[row] + y;
  const phMid = (row) => phAt(row, PH.card.dy + PH.card.h / 2);
  const phBottom = (row) => phAt(row, PH.card.dy + PH.card.h);
  // The middle of a layer of a row's stack; layer 0 is the bottom one, where the prompt comes in.
  const phLayer = (row, i) => phAt(row, PH.stack.top + (PH.stack.layers - 1 - i) * PH.stack.pitch);
  const phTopLayer = (row) => phLayer(row, PH.stack.layers - 1);
  // The middle of the capsule at the right end of a row's lower lane (the same in both
  // rows), and the top edge of the taller capsule that holds the answer picked inside.
  const phDecided = (row) => phAt(row, PH.inside.y + PH.inside.h / 2);
  const phPickedTop = () => phDecided('easy') - PH.inside.tall / 2;
  // The way out of a row's stack: out of its top layer, down beside the stack to the height
  // of the capsule, and along the lane as far as `to`.
  const phOut = (row, to) => {
    const drop = phDecided(row) - phTopLayer(row);
    if (drop < 24) throw new Error('slide 6: the capsule in the lower lane must stand at least 24px under the top layer of the stack');
    return `M${PH.stack.x + PH.stack.w + 6} ${phTopLayer(row)}h4q12 0 12 12v${drop - 24}q0 12 12 12H${to}`;
  };
  // The ways that a pulse walks to its end, each with how much of it the pulse of light
  // covers (a way's length is 1) and, where it ends in an arrow, the tip and how it is
  // turned. In both rows: from the prompt down, across the line between the lanes, into
  // the bottom layer of the stack. Top row: out of the top layer to the answer inside the
  // model; from that answer one thread to each line of reasoning (up across the line
  // between the lanes, between the two boxes, and into the reasoning box at the line's
  // height; inside the box the thread is the line's own, parts/part2.css); and from it up
  // into the written answer, apart from the threads, so that no line of reasoning seems
  // to run on into the answer. Bottom row, in the upper lane: from the prompt into the
  // reasoning, and from it to the answer.
  const PH_WAYS = (() => {
    const gap = (from, to, y) => `M${from + 6} ${y}H${to - 22}`;
    const down = (row) => Object.freeze({
      tone: 'hidden', pulse: 0.3,
      d: `M${PH.enters} ${phBottom(row)}V${phLayer(row, 0) - 12}q0 12 12 12H${PH.stack.x - 22}`,
      tip: [PH.stack.x - 6, phLayer(row, 0), 0],
    });
    const up = PH.answer.x + PH.lands;
    const lineAt = (i) => phAt('easy', PH.card.dy + PH.line.first + i * PH.line.pitch);
    const pulls = Object.fromEntries(PH_LINES.easy.map((_, i) => [`pull-${i}`, Object.freeze({
      tone: 'hidden', pulse: 0.4, thin: true, d: `M${PH.trunk} ${phPickedTop()}V${lineAt(i) + 12}q0 -12 -12 -12H${PH.reason.x + PH.reason.w}`,
    })]));
    return Object.freeze({
      'in-easy': down('easy'),
      decides: Object.freeze({
        tone: 'hidden', pulse: 0.2,
        d: phOut('easy', PH.inside.x - 22),
        tip: [PH.inside.x - 6, phDecided('easy'), 0],
      }),
      ...pulls,
      says: Object.freeze({ tone: 'hidden', pulse: 0.5, d: `M${up} ${phPickedTop()}V${phBottom('easy') + 18}`, tip: [up, phBottom('easy') + 2, -90] }),
      'in-hard': down('hard'),
      into: Object.freeze({ tone: 'read', pulse: 0.5, d: gap(PH.prompt.x + PH.prompt.w, PH.reason.x, phMid('hard')), tip: [PH.reason.x - 6, phMid('hard'), 0] }),
      out: Object.freeze({ tone: 'read', pulse: 0.5, d: gap(PH.reason.x + PH.reason.w, PH.answer.x, phMid('hard')), tip: [PH.answer.x - 6, phMid('hard'), 0] }),
    });
  })();
  // The way out of the stack in the bottom row: as far as it gets, and the mark where it
  // stops.
  const PH_STUB = Object.freeze({ d: phOut('hard', PH.stops - 22), pulse: 0.3, x: PH.stops, y: phDecided('hard') });
  // How long a pulse takes from the prompt down into the stack; how long the light takes
  // from one layer to the next; how long a pulse takes from the top layer to the answer
  // inside, for a hop between two boxes and for the way that stops; how long a thread
  // takes from the answer inside to its line; how long a line takes to be typed, and the
  // pause before the next one in the bottom row (in the top row the next line's thread
  // fills the pause). A line takes a fixed time, not a time by its length, so that the
  // steps are as long in a translation.
  // `again` is the same hop from layer to layer in the lighter pass that goes before each
  // line of the top row's reasoning (click 2): the whole stack in 210 ms, a quarter of the
  // first pass. The first line waits for it (60 ms more than the step had before its
  // first thread); the passes of the two other lines run while the line above them is
  // still being typed.
  const PH_PACE = Object.freeze({ down: 500, layer: 280, again: 70, decides: 450, hop: 400, stub: 600, pull: 250, line: 650, between: 150 });
  // The rewind of the top row, at the first click: when the answer starts to turn back and
  // how long it takes; when the last line starts to be taken back (the answer is still
  // turning, so the rewind is one motion); how long a line takes to go, from its end, and
  // the pause before the line above it; how long the empty slot takes to come back; how
  // long the lower lane takes to open under the row; and the pause before the run plays
  // forward. A line goes in less than two thirds of the time it takes to be typed: a tape
  // runs back faster than it plays.
  const PH_REWIND = Object.freeze({ answerAt: 100, answer: 450, linesAt: 450, line: 380, between: 60, settle: 200, opens: 600, pause: 700 });   // pause: 0.3 s until SPEC.md section 7.38; the two lanes' names now arrive 0.5 s apart in it
  // How much of its light the answer inside the model keeps between two flashes, and a
  // layer once the light has gone through it.
  const PH_GLOWS = 0.35;
  const PH_PASSED = 0.5;
  // The lighter pass that goes before each line of the top row's reasoning: how brightly a
  // layer lights up in it (it comes from PH_PASSED and goes back to it), how much of the
  // bar of light shows, and how far the way out of the stack lights up toward the answer
  // inside. Each is well under the first pass, which is the one to be read.
  const PH_AGAIN = Object.freeze({ layer: 0.85, scan: 0.5, way: 0.5 });
  // The beats that a cue or the title waits for, in ms from the start of their step. Click
  // 1: when the lines start to be taken back, when the last of them is gone, when the row
  // is empty again and the lower lane starts to open, when the pulse leaves the prompt,
  // when the light starts up through the layers and when the answer lights up inside.
  // Click 2: how long the lighter pass before a line takes, when the first line starts to
  // be typed, when all three stand, and when (A) is written. Click 4: when the pulse leaves the prompt, when the light starts up through
  // the layers, and where the way out of them stops. Click 5: when the light enters the
  // reasoning, when the first line is typed, when the last one stands, and when the answer
  // lands.
  const PH_AT = (() => {
    const climbs = (PH.stack.layers - 1) * PH_PACE.layer + 160;   // from the bottom layer alight to the top one alight
    const unwinds = PH_REWIND.linesAt;
    const erased = unwinds + PH_LINES.easy.length * (PH_REWIND.line + PH_REWIND.between) - PH_REWIND.between;
    const rewound = erased + PH_REWIND.settle;
    const leaves = rewound + PH_REWIND.opens + PH_REWIND.pause;
    const passes = leaves + PH_PACE.down;
    const repasses = (PH.stack.layers - 1) * PH_PACE.again;   // the lighter pass before a line: from the bottom layer to the top one
    const writes = repasses + PH_PACE.pull;
    const fits = writes + PH_LINES.easy.length * (PH_PACE.line + PH_PACE.pull) - PH_PACE.pull;
    const tries = 700;
    const rises = tries + PH_PACE.down;
    const enters = 200;
    const types = enters + PH_PACE.hop;
    const written = types + PH_LINES.hard.length * (PH_PACE.line + PH_PACE.between);
    return Object.freeze({
      unwinds, erased, rewound, leaves, passes, decided: passes + climbs + PH_PACE.decides,
      repasses, writes, fits, said: fits + 250 + PH_PACE.hop,
      tries, rises, stops: rises + climbs + PH_PACE.stub,
      enters, types, written, answered: written + 100 + PH_PACE.hop,
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
  // The lower lane of a row, behind everything else: the band of what happens inside the
  // model, and on its top edge the line between the two lanes.
  const phModelHtml = (key) => `<div class="p2-ph__model" data-under="${key}"><i class="p2-ph__seam"></i></div>`;
  // One row. `key` is 'easy' (the hinted run) or 'hard' (the product).
  // Upper lane: the prompt, the written reasoning, the answer, each with its name on its
  // top border. The reasoning box holds a slot that says that nothing is written yet, and
  // one line per sentence, typed left to right. In the top row a line also has a caret
  // and, from the caret to the box's right edge, the end of the thread that ties it to the
  // answer inside the model: the thread fills what is left of the line, so it gets shorter
  // as the line is typed, in any font. The answer tile is slide 5's: an open face, "?",
  // and the answer behind it. On the top border of the reasoning and on the bottom border
  // of the answer, a chip says what happened there and when. The top row's first box has
  // two names in one place, of which one shows at a time (PH_TEXT.recalled, then
  // PH_TEXT.rows.easy), and between its reasoning and its answer a rewind mark, two
  // arrowheads that point back toward the prompt, which shows only while the run is
  // rewound.
  // On the line between the lanes: their two names, each with an arrowhead toward its lane.
  // Lower lane: the stack of layers, top layer first, and the light that goes up through
  // it; beside the stack what that is (top row: two lines, the first with an arrow that
  // points up, the second under the way out of the stack) or why no answer comes of it
  // (bottom row); and at the right end the capsule of the answer picked inside: lit and
  // holding the option in the top row, dashed and empty in the bottom row.
  const phRowHtml = (key) => {
    const easy = key === 'easy';
    const order = (what) => kit.flag({ key: `ph-${key}-${what}`, text: PH_TEXT.order[key][what] });
    const side = (which) => `<span class="p2-ph__side" data-side="${which}"><i></i>${PH_TEXT.sides[which]}</span>`;
    return `
      <div class="p2-ph__row" data-row="${key}" data-tone="${easy ? 'hidden' : 'read'}">
        <div class="p2-ph__prompt">
          ${easy ? `<span class="p2-hint__name" data-name="recalled">${PH_TEXT.recalled}</span>` : ''}
          <span class="p2-hint__name" data-name="${key}">${PH_TEXT.rows[key]}</span>
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
        ${easy ? '<span class="p2-ph__rewind" aria-hidden="true"><i></i><i></i></span>' : ''}
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
        <div class="p2-ph__sides">${side('page')}${side('model')}</div>
        <div class="p2-ph__stack">
          ${util.range(PH.stack.layers).map((i) => `<i data-layer="${PH.stack.layers - 1 - i}"></i>`).join('')}
          <b class="p2-ph__scan"></b>
          ${easy ? `<span class="p2-ph__layers">${PH_TEXT.layers}</span>` : ''}
        </div>
        ${easy ? `<span class="p2-ph__given">${PH_TEXT.given}</span>` : ''}
        <span class="p2-ph__pass">${easy
    ? `<i></i>${PH_TEXT.pass.easy.word}<span class="p2-ph__run">${PH_TEXT.pass.easy.run}</span>`
    : PH_TEXT.pass.hard}</span>
        <div class="p2-ph__inside" data-inside="${key}">${easy ? `<b>(${PH_PICK.letter})</b>` : ''}<span>${easy ? PH_TEXT.order.inside.join('<br>') : PH_TEXT.order.closed}</span></div>
      </div>`;
  };

  const phHtml = () => `
    <div class="p2-ph"><div class="p2-ph__box">
      ${phModelHtml('easy')}
      ${phModelHtml('hard')}
      <svg class="p2-ph__art" viewBox="0 0 1728 632" width="1728" height="632" aria-hidden="true">
        ${Object.keys(PH_WAYS).map(phWay).join('')}
        <g class="p2-ph__stub" data-tone="hidden">
          <path class="p2-ph__stub-route" d="${PH_STUB.d}"/>
          <path class="p2-ph__comet" pathLength="1" stroke-dasharray="${PH_STUB.pulse} 2" d="${PH_STUB.d}"/>
          <path class="p2-ph__stop" d="M${PH_STUB.x - 9} ${PH_STUB.y - 9}l18 18m0 -18l-18 18"/>
          <circle class="p2-ph__ring" cx="${PH_STUB.x}" cy="${PH_STUB.y}" r="6" opacity="0"/>
        </g>
      </svg>
      ${phRowHtml('easy')}
      <p class="p2-ph__said">“${phQuote()}” <span class="p2-ph__by">${PH_TEXT.by}</span></p>
      <p class="p2-ph__asks">${PH_TEXT.asks}</p>
      <p class="p2-ph__monitor"><span>${PH_TEXT.monitor}</span><b>${PH_TEXT.cannot}</b></p>
      ${phRowHtml('hard')}
    </div></div>`;

  const phSetup = (ctx) => {
    const { dur } = ctx;
    const row = (key) => `[data-row="${key}"]`;
    const way = (key) => `[data-way="${key}"]`;
    const model = (key) => `[data-under="${key}"]`;
    const layer = (key, i) => `${row(key)} [data-layer="${i}"]`;
    const inside = (key) => `[data-inside="${key}"]`;
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
    // One pass: a light goes up through a row's stack of layers once, from the bottom
    // layer to the top one. A bar of light travels up at an even pace, and each layer
    // lights up as the bar reaches it and keeps half of its light afterward: the pass has
    // been through it. Returns when the top layer is alight.
    const pass = (step, key, at) => {
      const scan = `${row(key)} .p2-ph__scan`;
      const climb = (PH.stack.layers - 1) * PH_PACE.layer;
      step.tween(scan, { opacity: [0, 1] }, { at, dur: 80 });
      step.tween(scan, { y: [0, -(PH.stack.layers - 1) * PH.stack.pitch] }, { at, dur: climb, ease: 'linear' });
      step.tween(scan, { opacity: [1, 0] }, { at: at + climb + 60, dur: dur.micro });
      util.range(PH.stack.layers).forEach((i) => {
        const lit = at + i * PH_PACE.layer;
        step.tween(layer(key, i), { '--lit': [0, 1] }, { at: lit, dur: 160 });
        step.tween(layer(key, i), { '--lit': [1, PH_PASSED] }, { at: lit + 400, dur: dur.move });
      });
      return at + climb + 160;
    };
    // One more pass, a lighter one: the light goes up through the top row's stack again,
    // quickly and at half strength, each layer lights up a little as it is reached and
    // falls back to the light it kept, and the way out of the stack lights up toward the
    // answer inside. It goes before each line of the reasoning at click 2: the pass of
    // click 1 is not the only one, the model makes a pass for every word it writes, and
    // each of them still ends at (A). A line stands for its words: one pass a line is
    // drawn, not one a word, so that the stack does not flicker. Returns when the top
    // layer is reached.
    const repass = (step, at) => {
      const scan = `${row('easy')} .p2-ph__scan`;
      const climb = (PH.stack.layers - 1) * PH_PACE.again;
      step.tween(scan, { y: [0, -(PH.stack.layers - 1) * PH.stack.pitch] }, { at, dur: climb, ease: 'linear' });
      step.tween(scan, { opacity: [0, PH_AGAIN.scan] }, { at, dur: 60 });
      step.tween(scan, { opacity: [PH_AGAIN.scan, 0] }, { at: at + climb, dur: 120 });
      util.range(PH.stack.layers).forEach((i) => {
        const lit = at + i * PH_PACE.again;
        step.tween(layer('easy', i), { '--lit': [PH_PASSED, PH_AGAIN.layer] }, { at: lit, dur: 80 });
        step.tween(layer('easy', i), { '--lit': [PH_AGAIN.layer, PH_PASSED] }, { at: lit + 120, dur: 300 });
      });
      step.tween(way('decides'), { '--taut': [0, PH_AGAIN.way] }, { at: at + climb, dur: 80 });
      step.tween(way('decides'), { '--taut': [PH_AGAIN.way, 0] }, { at: at + climb + 120, dur: 300 });
      return at + climb;
    };
    // The answer inside the model flashes and keeps a little of its light.
    const flash = (step, at) => {
      step.tween(inside('easy'), { '--lit': [PH_GLOWS, 1] }, { at, dur: 120 });
      step.tween(inside('easy'), { '--lit': [1, PH_GLOWS] }, { at: at + 200, dur: dur.enter });
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

    // Enter: the hinted run of the last slide, as that slide left it: its prompt, the three
    // lines of its reasoning, written, and its answer, (A), wrong, under the name "Replay:
    // the hinted run". Only the page is there: the lower lane of the row is not open yet.
    // Nothing moves and nothing is new: the step is there for the run to be known again
    // (the last slide ended on its charts), and it stops on it. The second question is not
    // shown yet: its place under this row is kept free, so nothing moves when its turn
    // comes (click 4). The lines and the answer need no track here: the first value of the
    // tracks that take them back at click 1 holds from the first frame.
    const enter = ctx.step({ label: 'the hinted run as the last slide left it: the reasoning written, the answer (A), wrong' });
    enter.show(`${row('easy')} .p2-ph__prompt`, { at: 150 });
    enter.show(`${row('easy')} .p2-ph__reason`, { at: 270 });
    enter.show(`${row('easy')} .p2-ph__answer`, { at: 390 });
    // Under the row, in the place between the two rows: the question that the replay
    // answers. It stays until the paper's sentence takes that place at click 3.
    enter.tween('.p2-ph__asks', { opacity: [0, 1] }, { at: 700, dur: dur.enter });

    // Click 1: the run is rewound, then replayed in the order in which it came about, with
    // the inside of the model in view. One motion and one state at its end: the rewind
    // says nothing by itself, it is the way from the run as written to the run as it
    // happened.
    // The rewind, about 1.9 s, undoes the run in the reverse of the order in which a model
    // writes it. A rewind mark comes up between the reasoning and the answer, two
    // arrowheads that point back toward the prompt, and gives a push to the left with each
    // thing that goes. The answer turns back from (A) to "?", and what it was worth
    // leaves. The three lines are taken back, the last one first, each from its end to its
    // start behind a plain caret (what is left of a line is always its beginning, never
    // its tail). The row's name changes to "Replay: in time order". When the last line is
    // gone the empty slot is back, "nothing written yet", and the mark leaves.
    // Then the row opens downward: the line between the lanes is drawn from the left, its
    // two names land on it, and under it the inside of the model comes up with its stack
    // of layers, dark.
    // Then, forward: the hint lights up, and a pulse of light goes from the prompt down
    // across the line into the bottom layer. The light goes up through the stack once,
    // layer by layer ("one word at a time" and "one run through all the layers" come up
    // beside it as it starts), leaves the top layer and reaches the right end of the lane,
    // where (A) lights up: picked, inside the model. On the page nothing has changed: the slot in the box says
    // that nothing is written yet, and the answer is still "?".
    const replay = ctx.step({ label: 'rewound, then replayed in time order: one run through the layers, and (A) lights up inside the model before a word is written' });
    const mark = '.p2-ph__rewind';
    const undone = PH_LINES.easy.map((_, i) => PH_AT.unwinds + (PH_LINES.easy.length - 1 - i) * (PH_REWIND.line + PH_REWIND.between));
    replay.cls(row('easy'), 'p2-is-rewinding', { at: 0 });
    replay.tween(mark, { opacity: [0, 1], scale: [1.4, 1] }, { at: 0, dur: dur.micro, ease: 'back' });
    [PH_REWIND.answerAt, ...undone].forEach((at) => {
      replay.tween(mark, { x: [0, -8] }, { at, dur: 120 });
      replay.tween(mark, { x: [-8, 0] }, { at: at + 120, dur: 220, ease: 'inOut' });
    });
    // One name gives way to the other in the same place: the first is all but gone when
    // the second starts to show, so no frame has two names to read.
    replay.tween('[data-name="recalled"]', { opacity: [1, 0] }, { at: 0, dur: 140 });
    replay.tween('[data-name="easy"]', { opacity: [0, 1] }, { at: 120, dur: dur.micro });
    replay.tween(`${row('easy')} .p2-ph__verdict`, { opacity: [1, 0] }, { at: PH_REWIND.answerAt, dur: dur.micro });
    replay.tween(`${row('easy')} .p2-hint__tile-inner`, { '--flip': [1, 0] }, { at: PH_REWIND.answerAt, dur: PH_REWIND.answer, ease: 'inOut' });
    PH_LINES.easy.forEach((text, i) => {
      const line = `[data-line="easy-${i}"]`;
      replay.tween(`${line} .p2-ph__caret`, { '--caret': [0, 1] }, { at: undone[i] - 60, dur: 60 });
      replay.count(`${line} .p2-ph__ink`, [text.length, 0], { at: undone[i], dur: PH_REWIND.line, ease: 'linear', format: (shown) => text.slice(0, Math.round(shown)) });
      replay.tween(`${line} .p2-ph__caret`, { '--caret': [1, 0] }, { at: undone[i] + PH_REWIND.line, dur: 60 });
    });
    replay.tween(`${row('easy')} .p2-ph__empty`, { opacity: [0, 1] }, { at: PH_AT.erased, dur: PH_REWIND.settle });
    replay.tween(mark, { opacity: [1, 0] }, { at: PH_AT.erased, dur: PH_REWIND.settle });
    replay.cls(row('easy'), 'p2-is-rewinding', { at: PH_AT.rewound, on: false });
    // The lower lane opens.
    replay.tween(model('easy'), { opacity: [0, 1] }, { at: PH_AT.rewound, dur: dur.enter });
    replay.tween(`${model('easy')} .p2-ph__seam`, { '--open': [0, 1] }, { at: PH_AT.rewound, dur: PH_REWIND.opens - 100, ease: 'inOut' });
    // The names of the two lanes arrive one after the other, the page's first and the
    // model's 0.5 s later, each with a pop: the picture points at its two lanes in turn
    // (SPEC.md section 7.38; 0.12 s apart until then, which read as one arrival, and two
    // cold reads asked for the lanes to be pointed at where they first appear).
    replay.tween(`${row('easy')} .p2-ph__side`, { opacity: [0, 1], scale: [0.6, 1] }, { at: PH_AT.rewound + 100, dur: dur.enter, ease: 'back', stagger: 500 });
    replay.tween(`${row('easy')} .p2-ph__stack`, { opacity: [0, 1] }, { at: PH_AT.rewound + 200, dur: dur.enter });
    // One pass, and the answer at its end.
    replay.tween('.p2-ph__hint', { '--glow': [0.3, 1] }, { at: PH_AT.leaves - 300, dur: 300 });
    // As the hint lights up: the note beside the way down, why the first run already has it.
    replay.tween('.p2-ph__given', { opacity: [0, 1] }, { at: PH_AT.leaves - 300, dur: dur.enter });
    walk(replay, 'in-easy', PH_AT.leaves, PH_PACE.down);
    replay.tween(`${row('easy')} .p2-ph__pass`, { opacity: [0, 1] }, { at: PH_AT.passes, dur: dur.micro });
    walk(replay, 'decides', pass(replay, 'easy', PH_AT.passes), PH_PACE.decides);
    replay.tween(inside('easy'), { opacity: [0, 1], scale: [0.85, 1] }, { at: PH_AT.decided - 60, dur: dur.enter, ease: 'back' });
    replay.tween(inside('easy'), { '--lit': [0, 1] }, { at: PH_AT.decided - 60, dur: 160 });
    replay.tween(inside('easy'), { '--lit': [1, PH_GLOWS] }, { at: PH_AT.decided + 400, dur: dur.move });
    replay.tween('.p2-ph__hint', { '--glow': [1, 0.45] }, { at: PH_AT.decided + 300, dur: dur.enter });
    replay.cls(`${row('easy')} .p2-ph__empty`, 'is-loud', { at: PH_AT.decided + 300 });
    replay.tween(`${row('easy')} .p2-ph__empty`, { scale: [1, 1.06] }, { at: PH_AT.decided + 300, dur: 140 });
    replay.tween(`${row('easy')} .p2-ph__empty`, { scale: [1.06, 1] }, { at: PH_AT.decided + 440, dur: 260 });
    replay.hold(300);

    // Click 2: now the reasoning is written, as a model writes it: top to bottom, left to
    // right. Before a line, the light goes up through the stack once more, lightly (see
    // `repass`: writing takes passes too, and they still end at (A)); the answer inside
    // flashes, and a thread comes from it, up across the
    // line between the lanes, between the two boxes and along the line's place to where
    // the line starts; the line is typed toward it and the thread gets shorter. When the
    // three lines stand, the reasoning gets its chip and the title its second half; then a
    // pulse goes from the answer inside up into the answer box, and (A) is written, last.
    // One state: the run's output in the order in which a model writes it, the reasoning
    // and then the answer.
    const write = ctx.step({ label: 'the reasoning is written line by line, each line drawn to the answer inside; then (A) is written' });
    write.tween(`${row('easy')} .p2-ph__empty`, { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    PH_LINES.easy.forEach((text, i) => {
      const at = PH_AT.writes + i * (PH_PACE.line + PH_PACE.pull);
      const line = `[data-line="easy-${i}"]`;
      flash(write, repass(write, at - PH_PACE.pull - PH_AT.repasses));
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

    // Click 3: the paper's name for it, in the paper's sentence, under the row. Our gloss
    // of its term, the words that the speaker says, lands with a pop (the term itself did
    // until 2026-11-16); the layers, the way out of them and the answer it led to light up
    // once more, from the bottom up, so that the eye goes from the name to what it names.
    const name = ctx.step({ label: 'the paper’s name for it: a post-hoc rationalization' });
    // The question that stood between the rows since the entrance leaves first: no frame
    // has it and the sentence to read.
    name.tween('.p2-ph__asks', { opacity: [1, 0] }, { at: 0, dur: 140 });
    name.show('.p2-ph__said', { at: 140, rise: 0 });
    name.tween('.p2-ph__said .p2-gloss', { scale: [1.2, 1] }, { at: 300, dur: dur.enter, ease: 'back' });
    util.range(PH.stack.layers).forEach((i) => {
      name.tween(layer('easy', i), { '--lit': [PH_PASSED, 1] }, { at: 500 + i * 60, dur: dur.micro });
      name.tween(layer('easy', i), { '--lit': [1, PH_PASSED] }, { at: 900 + i * 60, dur: dur.move });
    });
    name.tween(way('decides'), { '--taut': [0, 1] }, { at: 600, dur: dur.micro });
    name.tween(way('decides'), { '--taut': [1, 0] }, { at: 1000, dur: dur.move });
    name.tween(inside('easy'), { '--lit': [PH_GLOWS, 1] }, { at: 700, dur: dur.micro });
    name.tween(inside('easy'), { '--lit': [1, PH_GLOWS] }, { at: 1100, dur: dur.move });
    name.hold(200);

    // Click 4: the question that needs its steps arrives, with the same two lanes as the
    // row above: three boxes on the page, and the stack of layers inside the model. The
    // prompt goes down into the stack and the light goes up through every layer, as in
    // the row above; but the way out of the top layer stops at a cross, short of the place
    // where the row above has its answer: too many steps for one run (the reason comes up
    // beside the stack), and in that place an empty dashed capsule says what follows:
    // "no answer before word one". The step ends on that: nothing is decided inside, and on
    // the page the box is still empty (until SPEC.md section 7.30 the light went through
    // the box in the same click, 0.7 s later). The paper's sentence stays between the two
    // rows until the end of the next click: it is what the slide has for "the answer can be decided inside the model"
    // (after the tenth cold read it left as this row arrived, and both readers of the
    // eleventh missed it).
    const stuck = ctx.step({ label: 'a question that needs its steps: one run through the layers is not enough, nothing is decided inside' });
    stuck.tween(`${row('hard')}, ${model('hard')}`, { opacity: [0, 1] }, { at: 0, dur: dur.enter });
    walk(stuck, 'in-hard', PH_AT.tries, PH_PACE.down);
    const through = pass(stuck, 'hard', PH_AT.rises);
    stuck.tween('.p2-ph__stub-route', { opacity: [0, 1] }, { at: through + 150, dur: PH_PACE.stub - 150 });
    run(stuck, '.p2-ph__stub .p2-ph__comet', PH_STUB.pulse, through, PH_PACE.stub, 'out');
    stuck.tween('.p2-ph__ring', { opacity: [0, 1] }, { at: PH_AT.stops - 40, dur: 40 });
    stuck.tween('.p2-ph__ring', { 'attr:r': [6, 36] }, { at: PH_AT.stops - 40, dur: 500 });
    stuck.tween('.p2-ph__ring', { opacity: [1, 0] }, { at: PH_AT.stops + 60, dur: 400 });
    stuck.tween('.p2-ph__stop', { opacity: [0, 1] }, { at: PH_AT.stops, dur: 80 });
    stuck.tween('.p2-ph__stop', { scale: [1, 1.5] }, { at: PH_AT.stops, dur: 120 });
    stuck.tween('.p2-ph__stop', { scale: [1.5, 1] }, { at: PH_AT.stops + 120, dur: 300 });
    stuck.tween(`${row('hard')} .p2-ph__pass`, { opacity: [0, 1] }, { at: PH_AT.stops + 100, dur: dur.enter });
    stuck.tween(inside('hard'), { opacity: [0, 1], scale: [0.9, 1] }, { at: PH_AT.stops + 250, dur: dur.enter, ease: 'back' });
    stuck.hold(300);

    // Click 5: the light goes through the page. It enters the reasoning, each line is
    // typed and lights up, and only when the last one stands does the answer land. The
    // reasoning's chip says that the answer was worked out there, the answer's that it was
    // written last, as in the top row. No line under the row: the chip and the last cue
    // say it (until the tenth cold read a line under the row said it a third time).
    // When the answer has landed, the slide's point about the two rows takes the place of
    // the paper's sentence between the rows: the sentence leaves, and after a beat "A
    // monitor reading only the reasoning: in both rows, reasoning first, answer last."
    // (PH_TEXT.monitor) comes up there, in the teal of what a monitor reads, and 0.7 s
    // later what follows from it on a second line, "It can’t tell which reasoning did the
    // work." (PH_TEXT.cannot, since 2026-11-16). (The coordinator's ruling of 2026-11-15:
    // not in a lower lane, where everything is inside the model. SPEC.md section 7.33.)
    const need = ctx.step({ label: 'the light goes through the words on the page: the answer is worked out in them' });
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
    // Last, what the two rows come to: the paper's sentence leaves (it has been read since
    // click 3), and when it is gone the note on the monitor comes up in its place between
    // the rows: no frame has both to read. Since SPEC.md section 7.38 the note waits a
    // beat (0.8 s) after the answer box has settled, and its second line follows 0.7 s
    // after the first: the worked answer, then what a monitor makes of the two rows, then
    // what that comes to (until then both lines came with the answer, and a reader had
    // the sum, the answer and two new lines to take in at once).
    need.tween('.p2-ph__said', { opacity: [1, 0] }, { at: PH_AT.answered + 500, dur: dur.micro });
    need.tween('.p2-ph__monitor', { opacity: [0, 1] }, { at: PH_AT.answered + 1500, dur: dur.enter });
    need.tween('.p2-ph__monitor b', { opacity: [0, 1] }, { at: PH_AT.answered + 2200, dur: dur.enter });
    need.hold(300);
  };

  Deck.register({
    id: 'p2-posthoc',
    part: 2,
    // The first half stands from the first frame and is what the replay of click 1 shows; the
    // second half arrives when the reasoning has been written, at click 2 (phSetup), and the
    // comma with it: until then the title is a whole sentence, "Sometimes the answer can
    // come first" (it ended in the comma until the ninth cold read, and looked cut off).
    // Where "first" is, the picture says: in the lower lane, "inside the model". "Can"
    // since the thirteenth cold read: the replay is a sketch of what the paper says happens
    // in some cases, not a measurement of this example (SPEC.md section 7.40).
    title: 'Sometimes the answer can come first<span class="p2-late">, and the reasoning is written to fit it</span>',
    cues: [
      // When (A) lights up inside the model, under a box that is empty again: at click 1,
      // after the rewind. The entrance, the run as the last slide left it, brings no cue.
      // Since 2026-11-16 the first two cues are the speaker's own sentences, so that they can
      // be read off the screen (SPEC.md section 7.35). The first is the second half of the
      // sentence that the note beside the way down begins ("The hint is in the prompt from
      // the start"); it keeps "can", and says "pick", the capsule's verb. Until then: "The
      // hint can decide the answer before a word is written".
      { text: 'From the very first word, the model can already pick (A)', step: 1, at: PH_AT.decided },
      // When (A) has been written, last: what the three lines came to. Until 2026-11-16
      // "The reasoning is then written to reach that answer", as the first line started to
      // be typed; the title's second half and the chip on the reasoning say that. It opens on
      // "If it does," since the thirteenth cold read (until then "So the reasoning walks to
      // (A), and it never says why"): the replay is a sketch, and "it does" takes up the
      // first cue's "can already pick". Twelve words, a cue's most, so ", and it never" is
      // " and never" (SPEC.md section 7.40).
      { text: 'If it does, the reasoning walks to (A) and never says why', step: 2, at: PH_AT.said + 500 },
      // When the way out of the layers has stopped in the row that needs its steps. Said of
      // today's large models, in the words of slide 7's main line ("Today’s large models
      // still need written reasoning for hard problems"): until 2026-11-13 it read "today’s
      // models have no way around the words", which a listener set against slide 7's title,
      // "Small models can learn to reason without words".
      { text: 'Many steps: today’s large models still have to write them out', step: 4, at: PH_AT.stops },
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
  // writing its reasoning, and then a monitor has no reasoning to read. It is told on the
  // machine of slide 3 (kit.lattice): column 0 holds the question, columns 1-7 the
  // reasoning. Since 2026-11-16 (SPEC.md section 7.35) every column has a head over its
  // top node: a row of cells, the list of numbers that the last layer gives, and over it a
  // gate, where a word is picked from that list. The user had asked what written reasoning
  // and an internal state are, whether "a list of numbers" is a vector with no word matched
  // to it, and what this slide's puzzle has to do with the two slides before it. So the
  // slide opens on the way here and on one word of the usual way, and the four runs follow,
  // one a step, each named by what stands between the question and the answer.
  //   The usual way, one word: a column runs, its last layer gives a list of numbers, the
  //   gate picks a word, the word is written in the text row and read back into the next
  //   column ('p2.hao_language_mode'). Beside the machine: the way here from the last two
  //   slides ("So far ... Now: ..."), and a key with a row for each of the three things.
  //   Written reasoning: the whole chain, on the puzzle. Every gate picks a word, and a
  //   monitor reads every one.
  //   Answer at once: nothing is written between the question and the answer
  //   ('p2.pfau_immediate'), so the seven columns are not there: the word picked at the
  //   first column's gate is the answer. Its accuracy is then "near-random"
  //   ('p2.pfau_near_random'): this run is what the dots are measured against. The run on
  //   screen gets its answer wrong, an example of ours.
  //   Dots (Pfau et al.): a dot stands in the place of each word ('p2.pfau_filler',
  //   'p2.pfau_one_to_one'). No gate picks it and nothing comes back down (a dot carries
  //   no result): the columns work side by side and the last one gathers them, which is
  //   enough for a problem that splits into parallel pieces ('pfau.parallel',
  //   'p2.pfau_parallelizable') and not for a chain of serial steps ('p2.pfau_serial').
  //   Internal state (Hao et al.): a chain again, but the gates are skipped: each column's
  //   list of numbers goes straight into the bottom of the next column ('p2.hao_last_state',
  //   'p2.hao_latent_mode', 'hao.feedback'). No token is sampled ('p2.hao_not_decoded'),
  //   and nothing is written but the answer ('p2.hao_fully_latent', 'p2.hao_chain_removed',
  //   'p2.hao_language_mode'): only the last gate picks a word. The method is Coconut; its
  //   name is not on screen. The word "vector" is, once, in brackets behind "a list of
  //   numbers" (a cold reader of 2026-11-13 did not know what "vectors" were, so the
  //   picture says what one is, a list of numbers, and draws it as cells; the user asked
  //   for the word on 2026-11-16). The list travels in a pipe from the row of cells down
  //   into the next column, clear of the text row, with the same cells upright on it.
  //   Until the redesign after the ninth cold read (2026-11-13) it was an S-curve named
  //   "each output is the next input", which looked like slide 3's line for a written
  //   token.
  // Both models are small and were trained for it ('pfau.model', 'p2.pfau_scaled_down',
  // 'pfau.supervision'; 'hao.base', 'p2.hao_larger_models', 'p2.hao_training').
  // One block at a time stands beside the machine, in one place: the way here at the
  // entrance and, from click 1, the key of the usual way under it; the puzzle of Pfau et
  // al. while three runs play (its rows land one a step); then a card that says what the
  // model of Hao et al. does, in the rows of the first key, with three short lines under
  // it while that model runs (the usual way once more, and how its columns differ from
  // the dots'), and from the next click, in the place of those lines, a card with that
  // model's two tasks, one a step, under a line that says what their two rows are: one
  // base model, trained two ways ('p2.hao_base_all', 'p2.hao_cot_trained'). Under the
  // picture one line at a time, in one place: what a dot adds and what the arcs carry
  // ('p2.pfau_additional', 'p2.pfau_third'); nothing while the fourth model runs and its
  // first result lands; and, with its second, the slide's main line, how the title
  // squares with slide 3 and what that would mean for a monitor ('korbak.externalized',
  // 'korbak.today', 'korbak.latent', 'korbak.future'). The last click is Part 2's
  // conclusion, on a panel of its own over the picture.
  // Eleven steps, one state a step (nine from SPEC.md section 7.36 until section 7.38,
  // eight in section 7.35, seven before): the way here, one word of the usual way, the
  // four runs (the fourth over two steps: what the model does inside, then what it writes
  // and what a monitor finds), the two results of the fourth model, what they would mean
  // for a monitor (the main line), Part 2's conclusion.
  const DOTS_QUOTE = 'near-random';
  if (!said('p2.pfau_near_random').includes(`${DOTS_QUOTE} accuracy at ${said('pfau.3sum_none')}`)) throw new Error(`the sentence of Pfau et al. no longer says "${DOTS_QUOTE}" of ${said('pfau.3sum_none')}`);
  // The line over the fourth model's two results says that both rows of a task are one
  // base model: it holds only while the paper's sentence names the model of 'hao.base'.
  if (!said('p2.hao_base_all').includes(said('hao.base')) || !said('p2.hao_cot_trained').includes('trained with CoT data')) throw new Error('the sentences of Hao et al. no longer say that every model is one base model, trained with or without written reasoning');
  const DOTS_TEXT = Object.freeze({
    // Above the machine: what stands between the question and the answer in the run on
    // screen. The last one is the key to the column of cells in the picture.
    // The last says what the internal state is, in the words of the user's question
    // about it (2026-11-16, SPEC.md section 7.35: "is a list of numbers just a vector, with
    // no word matched to it?"): "(a vector)" is new, and "fed back in" went to the card
    // beside the machine, which says where the list goes.
    ways: Object.freeze({
      words: 'Written reasoning: each step is written, then read back in',
      none: 'Answer at once: nothing is written between question and answer',
      dots: 'Dots: a dot is written in place of each word',
      state: 'Internal state: a list of numbers (a vector), not a word',
    }),
    answer: 'Answer',
    // Over the first columns, under the run's caption: what a column of the machine is.
    // The run is the one that slide 6 draws as a light going up through its stack of
    // layers (its label there: "one word at a time", "one run through all the layers"): a
    // column here is that stack, one for each token, so a column is one word's run.
    // "Through the layers" is what is left of slide 3's first cue ("One pass through the
    // layers"): the note read "a column = one pass through the layers" until the user
    // found "one pass" hard to follow (2026-11-15, SPEC.md section 7.34). Until 2026-11-13
    // nothing on this slide said it, and the speaker had to; from then until the cold read
    // of 2026-11-15 (SPEC.md section 7.33) it read "a column is one pass", set along the
    // first column from the bottom up in gray, which a reader found hard to read and did
    // not connect with slide 6's layers.
    // Two wordings in one place since SPEC.md section 7.39, one at a time: `word` while
    // each column writes a word (the usual way and the run of written reasoning), `run`
    // from the dots' click on, where no column has a word of its own (a dot, or a list of
    // numbers that is never turned into a word): both readers of the twelfth cold read of
    // the speaker script set "one word's run" against columns that hold no word.
    column: Object.freeze({ word: 'a column = one word’s run through the layers', run: 'a column = one run through the layers' }),
    // The answer box of the run that feeds its internal state back: a note, in the face of
    // a note, on what this run writes, the answer and nothing else (the band under the
    // machine and the card say the same). No value: this model's numbers are from two
    // other tasks, and a reader of the eleventh cold read set the puzzle's "True" in the
    // box against them. Until 2026-11-13 the box read "in words", in the face of an
    // answer, and was read as the answer itself.
    worded: 'answer only',
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
    // Beside the machine before the puzzle: at the entrance the way here from the last
    // two slides, two sentences (until 2026-11-16 one line under the picture), and under
    // them, from click 1, the key of one step of the usual way, a row for each thing that
    // the machine draws over and under a column: the row of cells that the last layer
    // gives, the gate where a word is picked from it, the word in the text row. The rows
    // are short enough to be read out as they stand, and each arrives as the machine shows
    // its thing for the first time ('p2.hao_language_mode': "autoregressively generating
    // the next token"; 'p2.hao_not_decoded': "decoding this into a word token" is what the
    // gate stands for). `name` takes up the label beside slide 6's stack of layers, "one
    // word at a time". "The real cause" is the closing panel's word for it.
    bridge: Object.freeze({
      past: 'So far the written reasoning was there, and left the real cause out.',
      now: 'Now: no written reasoning at all.',
    }),
    usual: Object.freeze({
      name: 'Usually: one word at a time',
      numbers: 'the last layer gives <b>a list of numbers</b> <span>(a vector)</span>',
      pick: 'the model <i>picks a word</i>',
      written: 'the word is <i>written</i>, then read back in',
    }),
    // The cards of the run that feeds its state back: whose model, and what it does, in
    // the rows of the key of the usual way and with the same marks: the gate, skipped;
    // the row of cells, which goes back in as it is (in the amber of what happens inside);
    // and the one thing that is written (in the teal of what can be read). Under that, the
    // two tasks it was measured on, and over their numbers what the two rows of each are:
    // one base model, trained in two ways ('p2.hao_base_all', 'p2.hao_cot_trained',
    // 'p2.hao_training'). The second row says "the list": the caption over the machine
    // has just named it, "a list of numbers (a vector)", and with the longer wording the
    // row took three lines in the widest font set and the two cards no longer ended with
    // the machine. Until 2026-11-16 the first card was one sentence, "Trained to skip the
    // words: each step’s internal state goes straight back in as the next input. Only the
    // answer is written."
    // `name` gives the model its name and says that it was trained again, which the rows
    // under it spell out ('hao.base', 'p2.hao_base_all': "a pre-trained GPT-2 model as the
    // base model"; 'p2.hao_training'). Until SPEC.md section 7.36 it read "Hao et al.:
    // another model", and both readers of the ninth cold read of the speaker script set
    // "another model" against the next click's "The same GPT-2, trained two ways:". The
    // label is one line: it has room for 31 characters, and a second line would push the
    // two cards off the stage. `model`, the note on the card's border, no longer repeats
    // the name or the training ("a small model (GPT-2), trained for this" until then).
    // Since SPEC.md section 7.39 `name` reads "Small model: GPT-2, retrained" ("Hao et
    // al.: GPT-2, retrained" until then): no line of the card said that this model is
    // small once the note had left its border (section 7.38), and a listener of the
    // twelfth cold read of the speaker script took GPT-2 for a large model. The label has
    // no room for the authors and "small" together (43 characters of 31); the footer
    // cites Hao et al., and the speaker says no author's name.
    // `usually`, `dots` and `here` stand under the card while this model runs, and leave
    // when the card of its results takes their place: what the usual way was, in the gray
    // of a reminder (its key left the screen at click 2), and how this run's columns
    // differ from the dots' ('pfau.parallel', 'p2.pfau_parallelizable': side by side;
    // 'p2.hao_last_state': each last hidden state is the next input). Since SPEC.md
    // section 7.37 the two lines open on "With dots," and "Here," and read as sentences:
    // they were "Dots: ..." and "Here: ...", and the speaker reads them out as they stand
    // (a listener of the tenth cold read of the speaker script heard labels).
    // Since SPEC.md section 7.39 `here` goes on ", so each step builds on the last.":
    // what a chain can do and columns side by side cannot ('p2.pfau_serial': the dots do
    // not serve a chain of serial steps; 'p2.hao_last_state': each state is the next
    // input). Both readers of the twelfth cold read of the speaker script asked why the
    // difference matters. The line takes two lines under the card.
    // Since SPEC.md section 7.38: `asks`, under the card's name, says that this model's
    // questions are not the puzzle's and names the two kinds ('p2.hao_prosqa',
    // 'hao.gsm8k_kind'), and `within`, on the top border of the card of its results,
    // says how to read them: a listener of the eleventh cold read of the speaker script
    // set this card's 77.5% and 97.0% against the puzzle's two 100%. The second row ends
    // after "back in" ("..., not turned into a word" until then: the caption over the
    // machine says "not a word", the speaker did not read the rest, and the line gives
    // its room to `asks`). The note on the card's border, "a small model", is gone: the
    // label of the results' card stands in its place between the two cards, and the
    // title and the main line say "small".
    tasks: Object.freeze({
      name: (base) => `Small model: ${base}, retrained`,
      asks: '<b>New questions:</b> logic, school math',
      skips: 'skips “pick a word”',
      back: '<b>the list</b> goes straight back in',
      only: 'Only the answer is written.',
      within: 'Compare inside this box only',
      same: (base) => `The same ${base}, trained two ways:`,
      logic: (set) => `Logic questions (${set})`,
      math: 'School math (GSM8k)',
      usually: 'usually: numbers <span>→ pick a word</span> <span>→ read back in</span>',   // a line breaks before an arrow only
      dots: '<b>With dots,</b> the columns work side by side.',
      here: '<b>Here,</b> each column feeds the next, so each step builds on the last.',
    }),
  });
  // The line of the dots' click says what a dot adds and what the arcs in the picture are
  // ('p2.pfau_additional'; 'p2.pfau_one_layer', 'p2.pfau_third'). Until SPEC.md section
  // 7.36 (2026-11-16) its second sentence had 30 words and also said why that is enough
  // for this puzzle: "This puzzle splits into independent pieces: the columns work on them
  // side by side, each in one run, and the arcs carry the results to the last one." (the
  // tenth cold read, 2026-11-13, had the line name the arcs and took the reason out; both
  // readers of the eleventh then set the dots against slide 3, and the reason came back).
  // The speaker does not read that sentence, and it was too long to read beside the
  // picture; "side by side" now stands under the fourth model's card, one click on, where
  // the two runs are compared (DOTS_TEXT.tasks.dots). That the puzzle splits into
  // independent pieces ('p2.pfau_parallelizable', 'p2.pfau_pairwise') is on no screen
  // since then, and is kept for questions.
  const whyHtml = () => `<p class="p2-dots__why-dots">A dot says nothing, but it is <b>one more column to compute in</b>.
          The arcs carry each column’s result to the last one.</p>`;
  // The slide's main line, one sentence shorter since the eleventh cold read: the end
  // state of its click was read as too dense, and what the line went on to say ("That is
  // what makes monitoring fragile.") is the last clause of Part 2's conclusion, one click on.
  // Its last clause names its subject, "a large model built to reason without words": it
  // read "one built like this" until the cold read of 2026-11-15 (SPEC.md section 7.33), and a listener
  // could not tell what "one" stood for; and "a large model built like this" until SPEC.md
  // section 7.39, where a listener could not tell what "this" stood for: the clause takes
  // up the slide's title, "reason without words". The facts behind it are the same
  // ('korbak.latent', 'korbak.future').
  // Since SPEC.md section 7.37 (2026-11-16) it ends on what that would mean for a monitor,
  // "Then a monitor would have nothing to read.": the speaker said this sentence from
  // memory until the script was cut to fit a word count, and both readers of the tenth
  // cold read of the speaker script found that the slide then never said its consequence
  // for monitoring. It takes up the verdict of the fourth run ("no reasoning to read") and
  // the third cue ("nothing to read") for the large model of the clause before it
  // ('korbak.latent': such models "would thus lose the safety advantages that CoT
  // confers"); no fact was added. Its last three words are bold and kept on one line.
  // Since SPEC.md section 7.38 the line has a click of its own, after the second result,
  // and its last sentence stands in a frame in Part 2's amber, a size larger, and lands
  // a second after the rest: it is where the part's three slides come out.
  const holdsHtml = () => `<p class="p2-dots__holds">These are small models, trained for it. Today’s large models still
          <b>need written reasoning</b> for hard problems; a large model built to reason without words might not.
          <span class="p2-dots__then">Then a monitor would have <i>nothing to read</i>.</span></p>`;
  const DOTS = Object.freeze({
    shape: Object.freeze({ cols: 8, rows: 4 }),
    tokens: Object.freeze(['Q', 'first', 'sum', 'each', 'pair', 'then', 'check', 'so']),
    // What the dots' run writes in the place of each word: the period itself, as a written
    // token, in the face and the color of any token not yet read (the paper's filler token
    // is '.', 'p2.pfau_one_layer'). It is the same character in the token boxes, in the key
    // of the run's caption and in the monitor's readout. Until 2026-11-13 the boxes and
    // the key drew it as a filled amber circle, the mark of a node of the layers, and a
    // cold reader could not tell what is written from what is computed inside.
    dot: '.',
    answer: 'True',
    miss: 'False',   // what the run that answers at once says: the other of the puzzle's two answers
    // A hop of the chain takes longer than on slide 3 since 2026-11-16: the row of cells
    // and the gate light up between the column and the word it writes.
    lensFrom: 6, lensTravel: 1136, riseMs: 50, hopMs: 400, dropMs: 110, feedMs: 380,
    givesMs: 200, picksMs: 260, leavesMs: 320,   // in a hop, from its start: when the cells stand, when the gate picks (or is skipped), when the word (or the list) leaves
    landing: 36, chipTop: 28,   // a written token lands as on slides 3 and 9
    lanes: Object.freeze({ top: 56, step: 8 }),   // where the gathering arcs run, between the two top layers
    skip: -60,     // the run that answers at once: how high its way from the first gate to the answer box runs, above the gates (their tops are at -42) and under the box's label
    ghost: 0.15,   // what is left of a column that the run on screen does not have
    rest: 0.3,     // the machine at the entrance, before anything on it has been explained
    note: Object.freeze({ left: 12, up: 102 }),   // the note on what a column is: where it starts, left of the first column's middle, and how far above the top nodes' middle its own middle runs (over the gates)
    glyph: Object.freeze({ w: 24, h: 72, cell: Object.freeze({ w: 14, h: 11, pitch: 16 }), cells: 4 }),   // a list of numbers: a column of cells (lying on its side over a column of the machine and in a key)
    // The head of a column, over its top node (the lattice's y; the top nodes are at 40):
    // the middle of the row of cells that the last layer gives, and over it the gate where
    // a word is picked from them, with its width and height.
    head: Object.freeze({ cells: 8, gate: Object.freeze({ y: -27, w: 80, h: 30 }) }),
    answerBox: Object.freeze({ left: 980, bottom: -52 }),   // the answer box over the last column, in the lattice's coordinates (parts/part2.css: .p2-dots__answer, .p2-dots__lattice)
  });
  const dotPoint = (col, row) => kit.latticePoint(DOTS.shape, col, row);
  // Which cells the list of numbers over a column shows (how full each is). The pipe that
  // carries that list into the next column shows the same cells, and the keys beside the
  // machine and in the fourth run's caption show the first column's: one list, one look
  // (until SPEC.md section 7.38 the key and the pipes had cells of their own, and a cold
  // reader took the key's mark and the row over a column for two things).
  const cellsOf = (col) => col + 11;
  const thinking = util.range(DOTS.shape.cols - 1).map((i) => i + 1);
  // The beats that a cue or a later track waits for, in ms from the start of their step.
  // Click 1: when the first column runs, when its cells stand, when its gate picks, when
  // the word leaves the gate and when it is written. The three things are 3.8 s and 2.8 s
  // apart, each with a pause after it, so that the speaker can read a row of the key
  // before the next thing lights up (a second apart, inside the entrance, until SPEC.md
  // section 7.36: the three were over in 4.5 s, and the speaker talks through them for
  // half a minute). Click 2: when the chain goes on from the second
  // column, when its answer lands and when the monitor starts to read. Click 3: when the
  // question's column runs alone, and when its answer lands. Click 4: when the last dot
  // stands and the answer is open, when the columns run, when the answer lands (and with
  // it the dots' number). Click 5: when the chain of internal states starts. Click 6:
  // when the last gate picks, when its answer lands, and when the monitor has found no
  // reasoning to read. Clicks 7 and 8: when a task's heading arrives after the click, the
  // beat before the second number of the logic questions (the one that is higher than a
  // reader expects), and how long after its heading the second number of school math
  // stands (the cue of click 8 waits for that). Click 9: how long after the main line its
  // last sentence lands.
  const DOTS_AT = (() => {
    const { cols, rows } = DOTS.shape;
    const first = 1700;
    const gives = first + rows * DOTS.riseMs + 100;
    const picks = gives + 3800;
    const leaves = picks + 2800;
    const goes = 900;
    const chained = goes + (cols - 2) * DOTS.hopMs + DOTS.picksMs + 100;
    const alone = 1000;
    const open = 400 + thinking.length * 130 + 200;
    const again = open + 600;   // one beat with the answer open before the columns run
    const chain = 1500;
    const last = 500;
    const fed = last + 300;
    return Object.freeze({
      first, gives, picks, leaves, written: leaves + 400,
      goes, chained, reads: chained + 800,
      alone, missed: alone + DOTS.leavesMs + 500, open, again, solved: again + 800, chain, last, fed, read: fed + 1150,
    });
  })();
  const DOTS_SCORED = Object.freeze({ logic: 300, beat: 500, math: 200, lands: 200 + 400 + 100 + 400, then: 1000 });

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

  // A list of numbers as the picture draws it: a short column of cells, each cell one
  // number, more or less filled. No digit is printed: the numbers are not the paper's.
  const glyphHtml = (seed) => {
    const { w, h, cell, cells } = DOTS.glyph;
    const next = util.rng(seed);
    const top = -(cells * cell.pitch - (cell.pitch - cell.h)) / 2;
    return `<rect class="p2-dots__glyph-box" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="6"/>${util.range(cells).map((i) => `<rect class="p2-dots__glyph-cell" x="${-cell.w / 2}" y="${top + i * cell.pitch}" width="${cell.w}" height="${cell.h}" rx="2" style="opacity:${(0.2 + 0.8 * next()).toFixed(2)}"/>`).join('')}`;
  };
  // The gate where a word is picked from a list of numbers: a pill that holds a few bars,
  // one of them the tallest (the word that is picked), and a stroke across it for the run
  // that skips it. It stands for the step that the paper of the fourth run leaves out,
  // "decoding this into a word token" ('p2.hao_not_decoded'); the bars are a mark, not
  // data. --pick (0 to 1) lights it in the teal of what is written; --skip shows the stroke.
  const GATE_BARS = Object.freeze([8, 14, 20, 11, 6]);
  const gateHtml = () => {
    const { w, h } = DOTS.head.gate;
    const pitch = 10;
    const wide = 6;
    const left = -((GATE_BARS.length - 1) * pitch + wide) / 2;
    const tallest = Math.max(...GATE_BARS);
    return `<rect class="p2-dots__gate-box" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}"/>${GATE_BARS.map((bar, i) => `<rect class="p2-dots__gate-bar${bar === tallest ? ' p2-is-pick' : ''}" x="${left + i * pitch}" y="${h / 2 - 5 - bar}" width="${wide}" height="${bar}" rx="1"/>`).join('')}<path class="p2-dots__gate-skip" d="M${-w / 2 + 12} ${h / 2 - 2}L${w / 2 - 12} ${-h / 2 + 2}"/>`;
  };
  // The head of a column, over its top node: what the last layer gives, a list of numbers
  // (the row of cells), and over it the gate. The last column's gate leads up into the
  // answer box: whatever a run writes or does not write on the way, its answer is a word
  // picked there. --on (0 to 1) lights the cells and the way up to them in the amber of
  // what happens inside; --pick and --skip are the gate's (see gateHtml).
  const headHtml = (col) => {
    const top = dotPoint(col, DOTS.shape.rows - 1);
    const { cells, gate } = DOTS.head;
    const half = DOTS.glyph.w / 2;
    const last = col === DOTS.shape.cols - 1;
    return `<g class="p2-dots__head" data-head="${col}">
      <path class="p2-dots__stem" d="M${top.x} ${top.y - 12}V${cells + half}"/>
      <path class="p2-dots__stem p2-dots__stem--up" d="M${top.x} ${cells - half}V${gate.y + gate.h / 2}"/>
      ${last ? `<path class="p2-dots__out" d="M${top.x} ${gate.y - gate.h / 2}V${DOTS.answerBox.bottom}"/>` : ''}
      <g transform="translate(${top.x} ${cells}) rotate(-90)"><g class="p2-dots__cells">${glyphHtml(cellsOf(col))}</g></g>
      <g transform="translate(${top.x} ${gate.y})"><g class="p2-dots__gate" data-gate="${col}">${gateHtml()}</g></g>
    </g>`;
  };
  // Words: from a column's gate down to the token it writes for the next column.
  const dropHtml = (col) => {
    const { gate } = DOTS.head;
    const from = { x: dotPoint(col, 0).x + gate.w / 2 + 2, y: gate.y + 2 };
    const chip = dotPoint(col + 1, 'token');
    const end = { x: chip.x - DOTS.landing, y: chip.y - DOTS.chipTop - 8 };
    return `<path class="p2-dots__drop" data-drop="${col}" pathLength="1" d="M${from.x} ${from.y}L${end.x} ${end.y}"/>`;
  };
  // Words: from the token up into the bottom of its column, where it is read back in.
  const backHtml = (col) => {
    const node = dotPoint(col, 0);
    const chip = dotPoint(col, 'token');
    const top = node.y + 14;
    const foot = chip.y - DOTS.chipTop - 4;
    return `<path class="p2-dots__back" data-back="${col}" d="M${node.x - 2} ${foot}V${top + 9}h-5l7 -9l7 9h-5V${foot}z"/>`;
  };
  // Answer at once: from the first column's gate straight to the answer box, over the
  // gates of the columns that this run does not have. The word picked there is the answer.
  const skipHtml = () => {
    const { gate } = DOTS.head;
    const from = { x: dotPoint(0, 0).x + gate.w / 2, y: gate.y };
    const to = DOTS.answerBox.left;
    return `<path class="p2-dots__skip" pathLength="1" d="M${from.x} ${from.y}h8q10 0 10 -10V${DOTS.skip + 10}q0 -10 10 -10H${to - 18}"/>
            <path class="p2-dots__skip-head" d="M${to - 2} ${DOTS.skip}l-16 -9v18z"/>`;
  };
  // Dots: every column hands what it worked out sideways and up to the last one. The columns
  // further left take the higher lanes, so no arc crosses another.
  const gatherHtml = (col) => {
    const from = dotPoint(col, DOTS.shape.rows - 2);
    const to = dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1);
    const lane = DOTS.lanes.top + col * DOTS.lanes.step;
    return `<path class="p2-dots__gather" data-gather="${col}" pathLength="1" d="M${from.x + 10} ${from.y - 8}C${from.x + 56} ${lane} ${to.x - 72} ${lane} ${to.x - 15} ${to.y + 5}"/>`;
  };
  // Internal state: the list of numbers over a column is the next column's input. It
  // travels in a pipe that leaves the row of cells sideways, under the gate that it does
  // not go through, comes straight down between the two columns and enters the next one
  // at the bottom: no diagonal, so that it cannot be taken for the line of a written
  // token, and it stays clear of the text row. On the way down it carries the same cells,
  // upright.
  const feedHtml = (col) => {
    const top = dotPoint(col, DOTS.shape.rows - 1);
    const from = { x: top.x + DOTS.glyph.h / 2, y: DOTS.head.cells };
    const to = dotPoint(col + 1, 0);
    const mid = (top.x + to.x) / 2;
    return `<g class="p2-dots__feed" data-feed="${col}">
      <path class="p2-dots__feed-line" pathLength="1" d="M${from.x} ${from.y}H${mid - 16}q16 0 16 16V${to.y - 16}q0 16 16 16H${to.x - 26}"/>
      <path class="p2-dots__feed-head" d="M${to.x - 13} ${to.y}l-13 -8v16z"/>
      <g transform="translate(${mid} ${(top.y + to.y) / 2})"><g class="p2-dots__glyph">${glyphHtml(cellsOf(col))}</g></g></g>`;
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
    // Under the sentence, last (SPEC.md section 7.38): what the three ways have in common
    // for a monitor. It holds for each clause: the cause is left out of the reasoning
    // ('p2.chen_monitor'), the answer was decided before the reasoning was written
    // ('p2.emmons_confabulate'), or there is no reasoning to read ('korbak.latent').
    // "The real cause" is the first clause's word and the entrance's.
    then: 'Each time, a monitor cannot see the real cause.',
  });

  // What a column is, in one line that starts over the first column, between the run's
  // caption and the gates, in the face and the amber of the label beside slide 6's stack
  // of layers. The one way that passes there is the line of the run that answers at once,
  // from the first column's gate over the others to the answer box (click 3): the note is
  // not shown in that run (dotsSetup). Two notes in the one place, DOTS_TEXT.column: "one
  // word's run" until that run, "one run" from the dots' click on.
  const columnNoteHtml = () => {
    const top = dotPoint(0, DOTS.shape.rows - 1);
    return Object.keys(DOTS_TEXT.column).map((key) => `<text class="p2-dots__column-note" data-note="${key}" x="${top.x - DOTS.note.left}" y="${top.y - DOTS.note.up}">${DOTS_TEXT.column[key]}</text>`).join('');
  };
  // The marks of the two keys beside the machine, each drawn as the machine draws it: a
  // list of numbers (the row of cells), the gate (picking, or skipped), and a written word
  // (the first one that the machine writes).
  const KEY_MARKS = Object.freeze({
    numbers: `<svg class="p2-dots__key-state" viewBox="-38 -14 76 28" width="76" height="28" aria-hidden="true"><g transform="rotate(-90)">${glyphHtml(cellsOf(0))}</g></svg>`,
    pick: `<svg class="p2-dots__key-gate" viewBox="-42 -17 84 34" width="84" height="34" aria-hidden="true"><g class="p2-dots__gate" style="--pick:1">${gateHtml()}</g></svg>`,
    skips: `<svg class="p2-dots__key-gate" viewBox="-42 -17 84 34" width="84" height="34" aria-hidden="true"><g class="p2-dots__gate p2-is-skipped" style="--skip:1">${gateHtml()}</g></svg>`,
    written: `<span class="p2-dots__key-word">${DOTS.tokens[1]}</span>`,
  });
  const keyHtml = (key, mark, text) => `<div class="p2-dots__key" data-key="${key}"><span class="p2-dots__key-mark">${KEY_MARKS[mark]}</span><span>${text}</span></div>`;

  const dotsHtml = () => {
    const size = kit.latticeSize(DOTS.shape);
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
          <span data-way="dots" data-tone="hidden"><i class="p2-dots__key-dot">${DOTS.dot}</i>${DOTS_TEXT.ways.dots}</span>
          <span data-way="state" data-tone="hidden">${KEY_MARKS.numbers}${DOTS_TEXT.ways.state}</span>
        </div>
        <div class="p2-label p2-dots__answer-label">${DOTS_TEXT.answer}</div>
        <div class="p2-dots__answer">
          <span class="p2-dots__answer-wait">?</span><span class="p2-dots__answer-done">${DOTS.answer}<i class="p2-dots__check"></i></span><span class="p2-dots__answer-miss">${DOTS.miss}<i class="p2-dots__cross"></i></span><span class="p2-dots__answer-other">${DOTS_TEXT.worded}</span>
        </div>
        <div class="p2-dots__lattice">
          ${kit.lattice({ key: 'dots', ...DOTS.shape, tokens: DOTS.tokens.slice(0, 1) })}
          <svg class="p2-dots__over" viewBox="0 0 ${size.width} ${size.height}" width="${size.width}" height="${size.height}" aria-hidden="true">
            ${columnNoteHtml()}
            ${band('none')}
            ${band('state')}
            ${hops.map(dropHtml).join('')}
            ${thinking.map(backHtml).join('')}
            <g class="p2-dots__gathers">${hops.map(gatherHtml).join('')}<path class="p2-dots__gather-head" d="M${dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1).x - 13} ${dotPoint(DOTS.shape.cols - 1, DOTS.shape.rows - 1).y + 3}l-15 -2l6 13z"/></g>
            ${hops.map(feedHtml).join('')}
            ${util.range(DOTS.shape.cols).map(headHtml).join('')}
            ${skipHtml()}
          </svg>
          ${kit.lens({ key: 'dots' })}
        </div>
        <div class="p2-dots__readout">
          <span class="p2-label">${DOTS_TEXT.reads}</span>
          <span class="p2-dots__words">${thinking.map((col) => `<span class="p2-dots__word"><b data-word="${col}">${DOTS.tokens[col]}</b><i data-filler="${col}">${DOTS.dot}</i></span>`).join('')}</span>
          <span class="p2-dots__verdicts">
            <b data-verdict="words" data-tone="read">${DOTS_TEXT.verdicts.words}</b>
            <b data-verdict="dots" data-tone="hidden">${DOTS_TEXT.verdicts.dots}</b>
            <b data-verdict="state" data-tone="dim">${DOTS_TEXT.verdicts.state}</b>
          </span>
        </div>
      </div>
      <div class="p2-dots__cards">
        <div class="p2-dots__intro">
          <div class="p2-dots__bridge">
            <p data-bridge="past">${DOTS_TEXT.bridge.past}</p>
            <p data-bridge="now">${DOTS_TEXT.bridge.now}</p>
          </div>
          <div class="p2-dots__card" data-card="usual">
            <div class="p2-label">${DOTS_TEXT.usual.name}</div>
            ${keyHtml('numbers', 'numbers', DOTS_TEXT.usual.numbers)}
            ${keyHtml('pick', 'pick', DOTS_TEXT.usual.pick)}
            ${keyHtml('written', 'written', DOTS_TEXT.usual.written)}
          </div>
        </div>
        <div class="p2-dots__card" data-card="puzzle">
          <div class="p2-label">${DOTS_TEXT.puzzle.name}</div>
          <div class="p2-dots__task">${DOTS_TEXT.puzzle.ask}</div>
          <div class="p2-dots__metric">${DOTS_TEXT.metric}</div>
          ${barsHtml('puzzle')}
          ${kit.legend({ key: 'dots-model', text: DOTS_TEXT.puzzle.model })}
        </div>
        <div class="p2-dots__pair">
          <div class="p2-dots__card" data-card="state">
            <div class="p2-label">${DOTS_TEXT.tasks.name(said('hao.base'))}</div>
            <div class="p2-dots__asks">${DOTS_TEXT.tasks.asks}</div>
            ${keyHtml('skips', 'skips', DOTS_TEXT.tasks.skips)}
            ${keyHtml('back', 'numbers', DOTS_TEXT.tasks.back)}
            <div class="p2-dots__only" data-key="only">${DOTS_TEXT.tasks.only}</div>
          </div>
          <div class="p2-dots__card" data-card="scores">
            <span class="p2-dots__within">${DOTS_TEXT.tasks.within}</span>
            <div class="p2-dots__same">${DOTS_TEXT.tasks.same(said('hao.base'))}</div>
            <div class="p2-dots__metric">${DOTS_TEXT.metric}</div>
            <div class="p2-dots__task" data-task="logic">${DOTS_TEXT.tasks.logic(said('hao.task'))}</div>
            ${barsHtml('logic')}
            <div class="p2-dots__task" data-task="math">${DOTS_TEXT.tasks.math}</div>
            ${barsHtml('math')}
          </div>
          <div class="p2-dots__versus">
            <p data-versus="usually">${DOTS_TEXT.tasks.usually}</p>
            <p data-versus="dots">${DOTS_TEXT.tasks.dots}</p>
            <p data-versus="here">${DOTS_TEXT.tasks.here}</p>
          </div>
        </div>
      </div>
      <div class="p2-dots__under">
        ${whyHtml()}
        ${holdsHtml()}
      </div>
      <div class="p2-dots__sum">
        <p class="p2-dots__sum-name">${SUM.name}</p>
        <p class="p2-dots__sum-lead">${SUM.lead}</p>
        ${SUM.lines.map((clause, i) => `<p class="p2-dots__sum-line" data-sum="${i}">${clause}</p>`).join('')}
        <p class="p2-dots__sum-then">${SUM.then}</p>
      </div>
    </div></div>`;
  };

  const dotsSetup = (ctx) => {
    const { fact, dur } = ctx;
    const { cols, rows } = DOTS.shape;
    const lens = '[data-lens="dots"]';
    const tokenText = (col) => `[data-lattice="dots"] [data-token="${col}"] text`;
    const head = (col) => `[data-head="${col}"]`;
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
    // The head of a column. The last layer gives its list of numbers: the row of cells
    // over the column lights up. The gate picks a word from it, or the run skips the gate:
    // a stroke across it, and its frame dashed. `dark` takes a head back to where every
    // run starts; it is given what the run before left alight (`pick` or `skip`).
    const gives = (step, col, at) => {
      step.tween(head(col), { '--on': [0, 1] }, { at, dur: 120 });
      step.tween(`${head(col)} .p2-dots__cells`, { scale: [1, 1.18] }, { at, dur: 120 });
      step.tween(`${head(col)} .p2-dots__cells`, { scale: [1.18, 1] }, { at: at + 120, dur: 200 });
    };
    const picks = (step, col, at) => {
      step.tween(head(col), { '--pick': [0, 1] }, { at, dur: 120 });
      step.tween(`[data-gate="${col}"]`, { scale: [1, 1.18] }, { at, dur: 120 });
      step.tween(`[data-gate="${col}"]`, { scale: [1.18, 1] }, { at: at + 120, dur: 200 });
    };
    const skips = (step, col, at) => {
      step.cls(`[data-gate="${col}"]`, 'p2-is-skipped', { at });
      step.tween(head(col), { '--skip': [0, 1] }, { at, dur: 120 });
    };
    const dark = (step, col, was) => {
      step.tween(head(col), { '--on': [1, 0] }, { at: 0, dur: dur.micro });
      step.tween(head(col), { [`--${was}`]: [1, 0] }, { at: 0, dur: dur.micro });
    };
    // The answer lands: it was open until the run was over. With written reasoning and with
    // dots it is the puzzle's answer, right, in green ('done'). The run that answers at
    // once gives the other answer, wrong, in red and with a cross ('miss'): one run and
    // its answer, an example of ours, as the right answers of the two runs beside it are;
    // how often such a run is right, the card says in the paper's word. (Until the
    // eleventh cold read, 2026-11-13, the box held "34% wrong", a rate over the whole test
    // set in the box of one run.) The run that feeds its state back writes an answer and
    // nothing else ('other': "answer only", a note in the teal of what can be read, with
    // no check; the band under the machine says that nothing else is written,
    // 'p2.hao_language_mode'). Its numbers are from two other tasks and another model,
    // and the source reports no such run on the puzzle, so the box holds no value of the
    // puzzle's and does not say that an answer is right: how often it is, the next two
    // clicks say. What the box read before: "written" until the tenth cold read, in which
    // a reader looked for an answer in it; then the puzzle's "True", plain, which both
    // readers of the eleventh set against the two other tasks' numbers beside it; then
    // "in words", in the face of an answer, which was read as the answer (2026-11-13).
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
    // A column of the usual way hands on: its cells stand, its gate picks, and the word
    // leaves the gate for the text row, where it is written under the next column and read
    // back in. `at` is when the cells stand; the three follow at the paces given. Returns
    // when the word is written.
    const writes = (step, col, at, { picksAt = at + DOTS.picksMs - DOTS.givesMs, leavesAt = at + DOTS.leavesMs - DOTS.givesMs, dropMs = DOTS.dropMs } = {}) => {
      const drop = `[data-drop="${col}"]`;
      gives(step, col, at);
      picks(step, col, picksAt);
      step.tween(drop, { opacity: [0, 1] }, { at: leavesAt, dur: 20 });
      step.tween(drop, { '--draw': [1, 0] }, { at: leavesAt, dur: dropMs, ease: 'in' });
      step.type(tokenText(col + 1), DOTS.tokens[col + 1], { at: leavesAt + dropMs, dur: 0 });
      step.tween(`[data-back="${col + 1}"]`, { opacity: [0, 1] }, { at: leavesAt + dropMs, dur: dur.micro });
      return leavesAt + dropMs;
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
    // internal state's, after `beat` ms more. The higher of the two is set off when both
    // stand: its row takes a tint and a frame in its own color, and its number lands once
    // more, larger (SPEC.md section 7.38). On the logic questions that is the internal
    // state's, which a reader does not expect to beat written reasoning; on school math
    // it is written reasoning's, so the loss has the mark that the win has. The tint and
    // the frame stay, so the end state shows them with no motion. Returns when the second
    // number stands.
    const scored = (step, task, at, { beat = 0, top }) => {
      step.tween(`[data-task="${task}"]`, { opacity: [0, 1] }, { at, dur: dur.micro });
      const stands = land(step, task, 'state', land(step, task, 'words', at + 200) + 100 + beat);
      const bar = `[data-bar="${task}-${top}"]`;
      step.cls(bar, 'p2-is-top', { at: stands - 150 });
      step.tween(`${bar} .p2-dots__bar-value`, { scale: [1.4, 1] }, { at: stands - 150, dur: 500, ease: 'back' });
      return stands;
    };
    // A row of a key beside the machine arrives.
    const keyed = (step, key, at) => step.tween(`[data-key="${key}"]`, { opacity: [0, 1], x: [-12, 0] }, { at, dur: dur.enter });

    // Eleven steps since SPEC.md section 7.38 (nine in sections 7.36 and 7.37, eight in
    // section 7.35, seven until then): the way here has the entrance to itself, and the
    // usual way has a click of its own before the puzzle, so that what a written word is
    // can be read before any run is compared with another; the fourth run takes two
    // clicks, and so does the end, the second result and what the results would mean.
    // Enter: the way here. Beside the machine, in the place of the cards, the two sentences
    // that lead here from the last two slides; then the machine, dark and stepped back to
    // 0.3, under the caption of written reasoning. Nothing runs: the speaker reads the two
    // sentences and decides when the first word is written. The machine comes to full
    // strength at click 1 (section 7.38: at full strength its eight columns drew the eye
    // from the two sentences, and a reader tried to read a picture that nothing had
    // explained yet). (In section 7.35 the first column ran in this step, 2 s in, and its
    // three things were over 4.5 s in, while the speaker was still reading the two
    // sentences.)
    const enter = ctx.step({ label: 'the way here: so far the reasoning was written and left the real cause out; now, no written reasoning at all' });
    enter.tween('[data-bridge="past"]', { opacity: [0, 1] }, { at: 200, dur: dur.enter });
    enter.tween('[data-bridge="now"]', { opacity: [0, 1] }, { at: 700, dur: dur.enter });
    enter.tween('.p2-dots__machine', { opacity: [0, DOTS.rest] }, { at: 1200, dur: dur.enter });
    way(enter, null, 'words', 1400);
    enter.hold(300);

    // Click 1: one word of the usual way. The frame of the key comes up under the two
    // sentences; the machine's first column runs, and what happens over it plays slowly,
    // with a pause after each thing, while the key takes a row for each: the last layer
    // gives a list of numbers (the row of cells lights up); the gate picks a word (it
    // lights up in the teal of what is written); the word leaves the gate for the text
    // row, is written there and read back into the next column. The step ends on that one
    // word: no puzzle yet, no answer, no monitor. (Until 2026-11-16 the entrance ran the
    // whole chain with the puzzle's card beside it, and nothing on the slide said how a
    // word comes about.)
    const usual = ctx.step({ label: 'the usual way, one word: the last layer gives a list of numbers, a word is picked from it, written and read back in' });
    usual.tween('.p2-dots__machine', { opacity: [DOTS.rest, 1] }, { at: 0, dur: dur.enter });
    usual.show('[data-card="usual"]', { at: 100 });
    rise(usual, 0, DOTS_AT.first);
    writes(usual, 0, DOTS_AT.gives, { picksAt: DOTS_AT.picks, leavesAt: DOTS_AT.leaves, dropMs: DOTS_AT.written - DOTS_AT.leaves });
    keyed(usual, 'numbers', DOTS_AT.gives);
    keyed(usual, 'pick', DOTS_AT.picks);
    keyed(usual, 'written', DOTS_AT.leaves);
    usual.hold(300);

    // Click 2: the puzzle, and the whole chain of written reasoning. The two sentences and
    // the key leave, and the puzzle's card takes their place; the monitor's readout comes
    // up under the machine. The chain goes on from the second column as it began: up a
    // column, a list of numbers, a word picked and written, read back in, up the next
    // column. The last column's gate leads into the answer box, and the answer lands; the
    // card takes its first row. Then the monitor reads the text row: all of it.
    // No arc is drawn in this run: the dots' arcs arrive with the dots, at click 4, where
    // the line under the picture says what they are. (SPEC.md section 7.38 drew them faint
    // here, 0.4 s before the answer; both readers of the twelfth cold read of the speaker
    // script met them before anything had explained them, and section 7.39 took them back.)
    const chain = ctx.step({ label: 'written reasoning on the puzzle: a chain through written words, and the monitor reads every step' });
    chain.tween('.p2-dots__intro', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    chain.show('[data-card="puzzle"]', { at: 300 });
    chain.tween('.p2-dots__readout', { opacity: [0, 1] }, { at: 300, dur: dur.enter });
    thinking.forEach((col, k) => {
      const at = DOTS_AT.goes + k * DOTS.hopMs;
      rise(chain, col, at);
      if (col < cols - 1) { writes(chain, col, at + DOTS.givesMs); return; }
      gives(chain, col, at + DOTS.givesMs);
      picks(chain, col, at + DOTS.picksMs);
    });
    answered(chain, DOTS_AT.chained);
    land(chain, 'puzzle', 'words', DOTS_AT.chained + 300);
    chain.tween(lens, { opacity: [0, 1] }, { at: DOTS_AT.reads, dur: dur.micro });
    chain.tween(lens, { x: [0, DOTS.lensTravel] }, { at: DOTS_AT.reads + 100, dur: 1200, ease: 'linear' });
    thinking.forEach((col) => {
      chain.cls(`[data-token="${col}"]`, 'is-read', { at: passes(col, DOTS_AT.reads + 100, 1200) });
      chain.tween(`[data-word="${col}"]`, { opacity: [0, 1] }, { at: passes(col, DOTS_AT.reads + 100, 1200), dur: dur.micro });
    });
    chain.tween('[data-verdict="words"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: DOTS_AT.reads + 1400, dur: dur.enter, ease: 'back' });

    // Click 3: the same model made to answer at once. The seven columns of the reasoning,
    // their heads and their words go (what is left of them is a ghost: this run does not
    // have them), and a dashed band says that nothing is written in their place; the
    // monitor's readout steps back with them. The question's column runs alone, the word
    // picked at its gate is the answer, and it goes straight to the answer box, which
    // gives this run's answer, the wrong one; the card takes its second row, the paper's
    // word for how often such a run is right. One run and its result: one state. (Until
    // the redesign after the ninth cold read the machine did not move at this click and
    // the row was called "no reasoning": a reader could not tell it from the dots, which
    // are no reasoning either.)
    const base = ctx.step({ label: 'answer at once: nothing written in between, a wrong answer, and the paper calls this run’s accuracy near-random' });
    reset(base, { face: 'done', verdict: 'words', shown: '[data-word]' });
    util.range(cols).forEach((col) => dark(base, col, 'pick'));
    base.tween('.p2-dots__drop, .p2-dots__back', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    way(base, 'words', 'none', 200);
    thinking.forEach((col) => {
      base.tween(columnOf(col), { opacity: [1, DOTS.ghost] }, { at: 200, dur: dur.enter });
      base.tween(head(col), { opacity: [1, DOTS.ghost] }, { at: 200, dur: dur.enter });
      base.tween(`[data-token="${col}"]`, { opacity: [1, 0] }, { at: 200, dur: dur.enter });
    });
    // The note on what a column is gives its place to this run's line to the answer. It
    // does not come back in these words: from the next click on no column has a word.
    base.tween('.p2-dots__column-note[data-note="word"]', { opacity: [1, 0] }, { at: 200, dur: dur.micro });
    base.tween('.p2-dots__readout', { opacity: [1, 0.3] }, { at: 200, dur: dur.enter });
    base.tween('[data-band="none"]', { opacity: [0, 1] }, { at: 500, dur: dur.enter });
    rise(base, 0, DOTS_AT.alone);
    gives(base, 0, DOTS_AT.alone + DOTS.givesMs);
    picks(base, 0, DOTS_AT.alone + DOTS.picksMs);
    base.tween('.p2-dots__skip', { opacity: [0, 1] }, { at: DOTS_AT.alone + DOTS.leavesMs, dur: 60 });
    base.tween('.p2-dots__skip', { '--draw': [1, 0] }, { at: DOTS_AT.alone + DOTS.leavesMs, dur: 500, ease: 'inOut' });
    base.tween('.p2-dots__skip-head', { opacity: [0, 1] }, { at: DOTS_AT.missed - 80, dur: 80 });
    answered(base, DOTS_AT.missed, 'miss');
    const missed = land(base, 'puzzle', 'none', DOTS_AT.missed + 300);
    base.tween('.p2-dots__bar-note', { opacity: [0, 1] }, { at: missed + 100, dur: dur.enter });
    base.hold(200);

    // Click 4: the columns come back, their heads dark, and where each word stood there is
    // now a dot: the period, written in its token box as a word is (DOTS.dot), and not a
    // mark of its own. No gate picks it: the dots stand there whatever the columns work
    // out. The answer is open again: one beat in which nobody knows whether it will be
    // right. Then all columns work at once and the last one gathers them; its head lights
    // up, the answer lands, right, and at that moment the dots' bar runs out to its
    // number. Only then the monitor reads the text row: dots. Last, under the picture,
    // what a dot adds, why that is enough for this puzzle and what the arcs are. One run
    // of the machine and its verdict: one state.
    const fill = ctx.step({ label: 'dots in place of the words: still the right answer, and the monitor reads only dots' });
    reset(fill, { face: 'miss' });
    dark(fill, 0, 'pick');
    fill.tween('.p2-dots__skip, .p2-dots__skip-head', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    fill.tween('[data-band="none"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    fill.tween('.p2-dots__column-note[data-note="run"]', { opacity: [0, 1] }, { at: 300, dur: dur.enter });
    fill.tween('.p2-dots__readout', { opacity: [0.3, 1] }, { at: 300, dur: dur.enter });
    way(fill, 'none', 'dots', 200);
    thinking.forEach((col, k) => {
      const at = 400 + k * 130;
      fill.type(tokenText(col), '', { at: 0, dur: 0 });
      fill.cls(`[data-token="${col}"]`, 'is-read', { at: 0, on: false });
      fill.tween(columnOf(col), { opacity: [DOTS.ghost, 1] }, { at, dur: dur.micro });
      fill.tween(head(col), { opacity: [DOTS.ghost, 1] }, { at, dur: dur.micro });
      fill.tween(`[data-token="${col}"]`, { opacity: [0, 1] }, { at, dur: dur.micro });
      fill.type(tokenText(col), DOTS.dot, { at: at + 110, dur: 0 });
    });
    fill.tween('.p2-dots__answer', { scale: [1, 1.16] }, { at: DOTS_AT.open, dur: 160 });
    fill.tween('.p2-dots__answer', { scale: [1.16, 1] }, { at: DOTS_AT.open + 160, dur: 300 });
    util.range(cols).forEach((col) => rise(fill, col, DOTS_AT.again));
    fill.tween('.p2-dots__gathers', { opacity: [0, 1] }, { at: DOTS_AT.again + 150, dur: 60 });
    fill.tween('.p2-dots__gather', { '--draw': [1, 0] }, { at: DOTS_AT.again + 150, dur: 500, ease: 'inOut', stagger: 30 });
    fill.tween('.p2-dots__gather-head', { opacity: [0, 1] }, { at: DOTS_AT.again + 600, dur: dur.micro });
    gives(fill, cols - 1, DOTS_AT.solved - 160);
    picks(fill, cols - 1, DOTS_AT.solved - 100);
    answered(fill, DOTS_AT.solved);
    land(fill, 'puzzle', 'dots', DOTS_AT.solved);
    const reread = sweep(fill, DOTS_AT.solved + 600, 700);
    thinking.forEach((col) => fill.tween(`[data-filler="${col}"]`, { opacity: [0, 1] }, { at: passes(col, reread, 700), dur: dur.micro }));
    fill.tween('[data-verdict="dots"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: reread + 800, dur: dur.enter, ease: 'back' });
    // Last, with the monitor's verdict: what a dot adds, and what the arcs carry.
    fill.tween('.p2-dots__why-dots', { opacity: [0, 1] }, { at: reread + 800, dur: dur.enter });

    // Click 5: another model, and what it does inside. The puzzle's card leaves (this
    // run is not about the puzzle, and its three bars are not this run's result) and so
    // does the line about the dots; in the card's place a card arrives that names the
    // model, says that its questions are new ones (logic, school math) and says what the
    // model does, in the rows of the key of the usual way. The words of the text row lift
    // away. A chain runs again, and this time each column's list of numbers does not go
    // up into its gate: a stroke falls across the gate, and a pipe carries the list from
    // the row of cells sideways and down into the bottom of the next column, the same
    // cells upright on it. Under the card, in gray, what the usual way was (the gate that
    // this run skips left the screen with its key at click 2). The step ends when the
    // last column has run and its list of numbers stands: what an internal state is, and
    // nothing else. Until SPEC.md section 7.38 this click went on with what the next one
    // shows now, and a listener of the eleventh cold read of the speaker script counted
    // five new things in it.
    const latent = ctx.step({ label: 'another small model, other questions: it skips the gate and feeds each list of numbers straight back in, its internal state' });
    reset(latent, { face: 'done', verdict: 'dots', shown: '[data-filler]' });
    dark(latent, cols - 1, 'pick');
    latent.tween('[data-card="puzzle"]', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    latent.tween('.p2-dots__why-dots', { opacity: [1, 0] }, { at: 0, dur: dur.micro });
    latent.tween('.p2-dots__gathers', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    latent.show('[data-card="state"]', { at: 300 });
    way(latent, 'dots', 'state', 300);
    thinking.forEach((col, k) => latent.tween(`[data-token="${col}"]`, { y: [0, -40], opacity: [1, 0] }, { at: 250 + k * 60, dur: dur.enter, ease: 'in' }));
    util.range(cols).forEach((col) => {
      const at = DOTS_AT.chain + col * DOTS.feedMs;
      rise(latent, col, at);
      gives(latent, col, at + DOTS.givesMs);
      if (col === cols - 1) return;
      skips(latent, col, at + DOTS.picksMs);
      const hop = at + DOTS.picksMs;
      latent.tween(`[data-feed="${col}"]`, { opacity: [0, 1] }, { at: hop, dur: 60 });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-line`, { '--draw': [1, 0] }, { at: hop, dur: 170, ease: 'inOut' });
      latent.tween(`[data-feed="${col}"] .p2-dots__glyph`, { scale: [0.3, 1] }, { at: hop + 40, dur: 220, ease: 'back' });
      latent.tween(`[data-feed="${col}"] .p2-dots__feed-head`, { opacity: [0, 1] }, { at: hop + 120, dur: 80 });
    });
    keyed(latent, 'skips', DOTS_AT.chain + DOTS.picksMs);
    keyed(latent, 'back', DOTS_AT.chain + DOTS.picksMs + 400);
    latent.tween('[data-versus="usually"]', { opacity: [0, 1] }, { at: 700, dur: dur.enter });
    latent.hold(300);

    // Click 6: what that model writes, and what the monitor finds. A dashed band takes the
    // place of the text row: no reasoning is written, only the answer. The last column's
    // gate, the one gate that this run does not skip, picks a word: the answer box takes
    // its note, "answer only", with no check, and the card its last line. The lens sweeps
    // the band and goes gray, and the monitor's verdict is that there is no reasoning to
    // read. Then, under the card, how this run differs from the dots' run before it:
    // there the columns work side by side, here each column feeds the next. The step ends
    // there; this model's results are the next two clicks.
    const only = ctx.step({ label: 'only the answer is written, and the monitor has no reasoning to read; with dots the columns work side by side, here each feeds the next' });
    only.tween('[data-band="state"]', { opacity: [0, 1] }, { at: 0, dur: dur.enter });
    picks(only, cols - 1, DOTS_AT.last);
    answered(only, DOTS_AT.fed, 'other');
    only.tween('[data-key="only"]', { opacity: [0, 1] }, { at: DOTS_AT.fed, dur: dur.enter });
    const blind = sweep(only, DOTS_AT.fed + 300, 700);
    only.cls(lens, 'p2-is-off', { at: blind + 700 });
    only.tween('[data-verdict="state"]', { opacity: [0, 1], scale: [1.4, 1] }, { at: DOTS_AT.read, dur: dur.enter, ease: 'back' });
    only.tween('[data-versus="dots"]', { opacity: [0, 1] }, { at: DOTS_AT.read + 500, dur: dur.enter });
    only.tween('[data-versus="here"]', { opacity: [0, 1] }, { at: DOTS_AT.read + 900, dur: dur.enter });
    only.hold(300);

    // Click 7: this model's first result, on a card of its own under the one that says what
    // the model does. On the card's top border, how to read it: "Compare inside this box
    // only" (another model and other questions than the puzzle's). Over the numbers, what
    // their two rows are: one base model, trained in two ways. On the logic questions the
    // internal state gets more answers right than written reasoning does: its number
    // comes half a second after the first, and its row is set off. The three lines that
    // stood in the card's place leave first: no frame has them and the card.
    const logic = ctx.step({ label: 'its first result: the same model trained two ways, and on logic questions the internal state beats written reasoning' });
    logic.tween('.p2-dots__versus', { opacity: [1, 0] }, { at: 0, dur: 140 });
    logic.show('[data-card="scores"]', { at: 140 });
    scored(logic, 'logic', DOTS_SCORED.logic, { beat: DOTS_SCORED.beat, top: 'state' });
    logic.hold(200);

    // Click 8: its second result, on a click of its own (the other half of the comparison):
    // on school math it stays behind written reasoning, whose row is set off here. When
    // both numbers stand, the cue says what the two tasks show. The step ends there: the
    // numbers and what they add up to, and nothing under the picture yet.
    const math = ctx.step({ label: 'its second result: on school math it stays behind written reasoning; better at logic, worse at math' });
    scored(math, 'math', DOTS_SCORED.math, { top: 'words' });
    math.hold(300);

    // Click 9: what the results would mean, on a click of its own since SPEC.md section
    // 7.38 (until then the main line came 0.4 s after the cue of the click before, and a
    // listener of the eleventh cold read of the speaker script had the numbers, the cue
    // and the line to take in at once; this is not the two results in one click, which
    // section 7.37 tried and took back). The slide's main line arrives under the picture:
    // how the title squares with slide 3. A second later its last sentence lands in its
    // frame: what a large model built to reason without words would leave a monitor. It is where the
    // part comes out, and the step ends on it. The line stays until the last click takes
    // the picture away. (Until the tenth cold read, 2026-11-13, the line had a click of
    // its own as well, a step of half a second that held nothing else.)
    const holds = ctx.step({ label: 'what it would mean: these are small models trained for it, today’s large models still need written reasoning, and a large model built to reason without words would leave a monitor nothing to read' });
    holds.tween('.p2-dots__holds', { opacity: [0, 1] }, { at: 0, dur: dur.enter });
    holds.tween('.p2-dots__then', { opacity: [0, 1], scale: [1.12, 1] }, { at: DOTS_SCORED.then, dur: dur.enter, ease: 'back' });
    holds.hold(300);

    // Click 10: the sentence that closes Part 2, on a beat of its own: the picture steps back
    // and the three ways written reasoning fails that the part has shown come one by one,
    // a clause for each slide (the cause of the answer left out; reasoning written to fit
    // an answer already decided; the written reasoning gone after training). It sums up
    // the part; it does not argue from the main line. The panel covers
    // the machine and the cards. What would show around it goes: the main line under it.
    // The cues, which belong to the clicks before, step back, and so does the slide's
    // title: it is the title of this slide, and the panel under it sums up the whole part
    // (its name stands over the sentence). Last, under the sentence, one line that comes
    // back to the monitor (SPEC.md section 7.38): what the three ways come to for it.
    const sum = ctx.step({ label: 'Part 2 in one sentence: three ways written reasoning fails, and each time a monitor cannot see the real cause' });
    sum.tween('.p2-dots__machine', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__cards', { opacity: [1, 0.12] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__under', { opacity: [1, 0] }, { at: 0, dur: dur.enter });
    sum.tween('.dk-cues', { opacity: [1, 0.3] }, { at: 0, dur: dur.enter });
    sum.tween('.dk-title', { opacity: [1, 0.3] }, { at: 0, dur: dur.enter });
    sum.tween('.p2-dots__sum', { opacity: [0, 1], scale: [0.96, 1] }, { at: 200, dur: dur.enter });
    SUM.lines.forEach((_, i) => sum.tween(`[data-sum="${i}"]`, { opacity: [0, 1], x: [-16, 0] }, { at: 700 + i * 450, dur: dur.enter }));
    sum.tween('.p2-dots__sum-then', { opacity: [0, 1] }, { at: 700 + SUM.lines.length * 450 + 400, dur: dur.enter });
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
      // Since 2026-11-16 the cues are two steps later than they were: the entrance shows the
      // way here, click 1 one word of the usual way, and neither brings a cue (SPEC.md
      // sections 7.35 and 7.36).
      { text: 'Written reasoning: the monitor reads every step', step: 2, at: DOTS_AT.reads },
      { text: 'Dots: still the right answer, with no reasoning to read', step: 4, at: DOTS_AT.solved },
      // With the second result of the model that feeds its state back: the clicks before
      // it have shown that there is no reasoning to read, and that it wins at logic. The
      // main line under the picture has the next click (SPEC.md section 7.38; the fourth
      // run takes two clicks since then, so this cue is at click 8).
      { text: 'Reasoning kept inside: nothing to read; better at logic, worse at math', step: 8, at: DOTS_SCORED.math + DOTS_SCORED.lands },
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
