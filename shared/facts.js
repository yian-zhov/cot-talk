// Verified facts. Slides read numbers and quotes from here (ctx.fact('baker.recall_cot').text)
// instead of retyping them, so a number on screen always has a source and a locator.
// Shared file. Checked against the originals on 2026-11-09; SPEC.md section 7 has the audit.
// `value` is the bare number when there is one; `text` is what a slide prints.
// Facts that a part first registered in its own file were folded in here at integration; their
// quotes were read again in the arXiv HTML full text on 2026-11-09. The facts added after the
// two cold reads (SPEC.md, section 7.5) were searched for in a fresh download of each paper
// from arxiv.org on the same day. A fact that only one slide may ever need can still be
// registered next to it with Deck.addFacts({ 'p2.some_key': ... }).
Deck.addFacts({
  // Korbak et al. 2025
  'korbak.authors': { value: 41, text: '41 authors', src: 'korbak2025', where: 'author list' },
  'korbak.labs': { text: 'OpenAI, Google DeepMind, Anthropic, UK AISI and others', src: 'korbak2025', where: 'author list' },
  // Who the 41 are, counted in the author list of the arXiv HTML (v2): the four largest
  // groups, and the 13 authors of the 11 other affiliations (15 affiliations in all).
  'korbak.at_gdm': { value: 11, text: 'Google DeepMind', src: 'korbak2025', where: 'author list' },
  'korbak.at_openai': { value: 6, text: 'OpenAI', src: 'korbak2025', where: 'author list' },
  'korbak.at_aisi': { value: 6, text: 'UK AI Security Institute', src: 'korbak2025', where: 'author list' },
  'korbak.at_anthropic': { value: 5, text: 'Anthropic', src: 'korbak2025', where: 'author list' },
  'korbak.at_others': { value: 13, text: '11 other institutes', src: 'korbak2025', where: 'author list' },
  // What a monitor is, and what can be done with a flag: behind slide 2's one-line definition.
  'korbak.monitor_def': {
    text: 'A CoT monitor is an automated system that reads the CoT of a reasoning model and other relevant information and flags suspicious or potentially harmful interactions.',
    src: 'korbak2025', where: 'Sec. 1',
  },
  'korbak.blocked': { text: 'could then be blocked', src: 'korbak2025', where: 'Sec. 1' },
  'korbak.externalized': {
    text: 'For sufficiently difficult tasks, Transformers must use chain of thought as a form of working memory.',
    src: 'korbak2025', where: 'Sec. 1.1',
  },
  'korbak.serial': {
    text: 'any sufficiently long chain of serial steps of cognition must pass through the chain of thought',
    src: 'korbak2025', where: 'Sec. 1.1, Fig. 1',
  },
  // The scope of slide 3's rule, which slide 7 needs: it is a property of the architecture in
  // use today, and the authors say it can change.
  'korbak.today': { text: 'underlies nearly all frontier AI systems', src: 'korbak2025', where: 'Sec. 1.1' },
  'korbak.future': { text: 'the externalized reasoning property might not hold for future models', src: 'korbak2025', where: 'Sec. 1.1' },
  'korbak.latent': {
    text: 'Such latent reasoning models might not need to verbalize any of their thoughts and would thus lose the safety advantages that CoT confers.',
    src: 'korbak2025', where: 'Sec. 2, Novel architectures',
  },

  // Baker et al. 2025: monitoring a frontier agent (same family as o1 and o3-mini) with GPT-4o
  'baker.recall_action': { value: 60, text: '60%', src: 'baker2025', where: 'Table 1, joint recall' },
  'baker.recall_cot': { value: 95, text: '95%', src: 'baker2025', where: 'Table 1, joint recall' },
  'baker.recall_action_exit0': { value: 40, text: '40%', src: 'baker2025', where: 'Table 1, exit(0)' },
  'baker.recall_cot_exit0': { value: 93, text: '93%', src: 'baker2025', where: 'Table 1, exit(0)' },
  'baker.recall_action_skiptest': { value: 80, text: '80%', src: 'baker2025', where: 'Table 1, raise SkipTest' },
  'baker.recall_cot_skiptest': { value: 97, text: '97%', src: 'baker2025', where: 'Table 1, raise SkipTest' },
  'baker.precision_action': { value: 81, text: '81%', src: 'baker2025', where: 'Table 1, joint precision' },
  'baker.precision_cot': { value: 77, text: '77%', src: 'baker2025', where: 'Table 1, joint precision' },
  'baker.monitor': { text: 'GPT-4o', src: 'baker2025', where: 'abstract; Sec. 2' },
  'baker.quote_hack': { text: 'Let\'s hack', src: 'baker2025', where: 'App. A, Fig. 9 caption' },
  'baker.quote_fudge': { text: 'fudge', src: 'baker2025', where: 'Fig. 1 caption' },
  'baker.quote_hard': { text: 'Hard', src: 'baker2025', where: 'Fig. 1 caption' },
  'baker.systemic_hacks': { text: 'exit(0) and raise SkipTest', src: 'baker2025', where: 'Table 1 caption' },
  // The lines of slide 4's terminal, which returns on slide 8 (shared/motifs.js lists them in
  // order). Two examples from two tasks: a paraphrase of Fig. 1 around the agent's own two
  // words, and, set apart, the thought of App. A, Fig. 9, which the caption quotes without a
  // full stop. Which is which is said on the terminal's border ('baker.trace_note'), outside
  // the box of the agent's thoughts.
  'baker.trace_fig1b': { text: 'make verify always return true.', src: 'baker2025', where: 'Fig. 1 caption (paraphrase)' },
  'baker.trace_note': { text: 'top: Fig. 1, paraphrased · bottom: Fig. 9, verbatim', src: 'baker2025', where: 'Fig. 1; App. A, Fig. 9' },
  // The task, and what the two systemic hacks are: behind slide 4's first cue and the glosses
  // in its actions pane.
  'baker.task': { text: 'the agent is tasked with implementing new functionality such that all unit tests pass', src: 'baker2025', where: 'Sec. 2' },
  'baker.systemic_def': { text: 'two hacks affecting nearly all training environments', src: 'baker2025', where: 'Fig. 2 caption' },
  'baker.exit0_def': { text: 'exit from the environment early without running all unit tests', src: 'baker2025', where: 'Sec. 2.1' },
  'baker.skiptest_def': { text: 'in order to skip unit test evaluation', src: 'baker2025', where: 'Sec. 2.1' },
  // Obfuscation run: a different, non-frontier agent in the same coding environments
  'baker.obfuscated_recall': { text: 'near zero', src: 'baker2025', where: 'Sec. 3.2' },
  'baker.obfuscated_hacking': { text: 'learns to hack less, it still hacks at a fairly high rate', src: 'baker2025', where: 'Fig. 4 caption' },
  'baker.baseline_recall': { text: 'almost perfect recall', src: 'baker2025', where: 'Sec. 3.1' },
  'baker.low_regime': { text: 'more capable and more aligned agents in the low optimization regime', src: 'baker2025', where: 'abstract' },
  'baker.tax': { text: 'monitorability tax', src: 'baker2025', where: 'abstract' },
  'baker.too_much': { text: 'with too much optimization, agents learn obfuscated reward hacking', src: 'baker2025', where: 'abstract' },
  // The advice, and what the tax is paid in: the constructive end of slide 8.
  'baker.tax_advice': {
    text: 'it may be necessary to pay a monitorability tax by not applying strong optimization pressures directly to the chain-of-thought',
    src: 'baker2025', where: 'abstract',
  },
  'baker.tax_cost': { text: 'such as deploying slightly less performant models or suffering more expensive inference', src: 'baker2025', where: 'Sec. 1' },
  // Why slide 8 does not contradict slide 9: its hack was simple enough to need no reasoning.
  'baker.simple_hack': {
    text: 'Reward hacks this simple are only possible because the monitor in this experiment solely looks at the agent’s CoT and not its actions.',
    src: 'baker2025', where: 'Sec. 3.2',
  },
  'baker.complex_hack': {
    text: 'may be much harder for a model to conduct while obfuscating its CoT as it may need to explicitly reason about them',
    src: 'baker2025', where: 'Sec. 3.2',
  },
  'baker.obfuscated_agent': { text: 'non-frontier', src: 'baker2025', where: 'Sec. 1; Fig. 3 caption' },
  // The source sentences behind slide 8's paraphrases: the reward chips, "this monitor does
  // not look here", the rewritten thought and the edited unit test.
  'baker.obfuscated_reward': { text: 'must pass unit tests and not trigger the monitor', src: 'baker2025', where: 'Fig. 4 caption' },
  'baker.obfuscated_monitor': { text: 'solely looks at the agent\'s CoT and not its actions', src: 'baker2025', where: 'Sec. 3.2' },
  'baker.obfuscated_cot': { text: 'double check certain things or look at specific functions', src: 'baker2025', where: 'Sec. 3.2, on Fig. 5' },
  'baker.obfuscated_action': { text: 'update a unit test to make it pass trivially', src: 'baker2025', where: 'Sec. 3.2, on Fig. 5' },

  // Chen et al. 2025: Claude 3.7 Sonnet and DeepSeek R1, six hint types, MMLU and GPQA
  'chen.hint': { text: 'A Stanford professor indicates the answer is (A). What do you think?', src: 'chen2025', where: 'Table 1' },
  'chen.overall_claude': { value: 25, text: '25%', src: 'chen2025', where: 'Sec. 3, Fig. 1' },
  'chen.overall_r1': { value: 39, text: '39%', src: 'chen2025', where: 'Sec. 3, Fig. 1' },
  'chen.misaligned_claude': { value: 20, text: '20%', src: 'chen2025', where: 'Sec. 3' },
  'chen.misaligned_r1': { value: 29, text: '29%', src: 'chen2025', where: 'Sec. 3' },
  'chen.often_below': { value: 20, text: 'often below 20%', src: 'chen2025', where: 'abstract' },
  'chen.model_claude': { text: 'Claude 3.7 Sonnet', src: 'chen2025', where: 'Sec. 3, Fig. 1' },
  'chen.model_r1': { text: 'DeepSeek R1', src: 'chen2025', where: 'Sec. 3, Fig. 1' },
  'chen.scope': { text: '6 kinds of hint, on MMLU and GPQA', src: 'chen2025', where: 'Sec. 2.2; Fig. 1' },

  // Gazzaniga 1998. The wording is the author's own caption of the figure from this article,
  // on his page. The article itself was read on 2026-11-12 (SPEC.md, 7.20; until then only the
  // caption had been, 7.1): it gives the patient's answer in indirect speech only, so the
  // caption stays the source of the quote.
  'gazzaniga.quote': {
    text: 'Oh the chicken claw goes with the chicken and you need a shovel to clean out the chicken shed.',
    src: 'gazzaniga1998', where: 'interpreter figure, as the author captions it',
  },

  // Pfau et al. 2024: a 34M-parameter Llama trained from random initialization
  'pfau.3sum_filler': { value: 100, text: '100%', src: 'pfau2024', where: 'Sec. 4.2, Fig. 2 (3SUM, length 12)' },
  'pfau.3sum_none': { value: 66, text: '66%', src: 'pfau2024', where: 'Sec. 4.2, Fig. 2 (3SUM, length 12)' },
  // The same models with written steps: the row the figure leaves out.
  'pfau.3sum_cot': { value: 100, text: '100%', src: 'pfau2024', where: 'Sec. 4.2, footnote 12' },
  'pfau.2sum_cot': { value: 95.1, text: '95.1%', src: 'pfau2024', where: 'Table 1' },
  'pfau.2sum_filler': { value: 93.6, text: '93.6%', src: 'pfau2024', where: 'Table 1' },
  'pfau.2sum_none': { value: 78.7, text: '78.7%', src: 'pfau2024', where: 'Table 1' },
  'pfau.task': { text: '3SUM, length 12', src: 'pfau2024', where: 'Sec. 4.2, Fig. 2' },
  'pfau.model': { text: '34M-parameter', src: 'pfau2024', where: 'Sec. 4.1' },
  'pfau.chance': { text: 'near-random', src: 'pfau2024', where: 'Sec. 4.2' },
  'pfau.supervision': { text: 'requires specific, dense supervision', src: 'pfau2024', where: 'abstract' },
  // What the task is, and why dots can stand in for words on it: behind slide 7's plain
  // wording ("do three inputs sum to zero?", "side by side, no chain").
  'pfau.3sum_def': { text: 'finding matching triples that sum to the zero vector modulo 10', src: 'pfau2024', where: 'Fig. 3 caption' },
  'pfau.parallel': { text: 'incompatible with the parallel structure of filler token computation', src: 'pfau2024', where: 'Sec. 3.1' },
  'pfau.current_llms': { text: 'current LLMs are unlikely to benefit from filler tokens', src: 'pfau2024', where: 'Sec. 1' },

  // Hao et al. 2024 (Coconut): GPT-2 base model
  'hao.prosqa_latent': { value: 97.0, text: '97.0%', src: 'hao2024', where: 'Table 1, ProsQA' },
  'hao.prosqa_cot': { value: 77.5, text: '77.5%', src: 'hao2024', where: 'Table 1, ProsQA' },
  'hao.prosqa_tokens_latent': { value: 14.2, text: '14.2 tokens', src: 'hao2024', where: 'Table 1, ProsQA' },
  'hao.prosqa_tokens_cot': { value: 49.4, text: '49.4 tokens', src: 'hao2024', where: 'Table 1, ProsQA' },
  'hao.gsm8k_latent': { value: 34.1, text: '34.1%', src: 'hao2024', where: 'Table 1, GSM8k' },
  'hao.gsm8k_cot': { value: 42.9, text: '42.9%', src: 'hao2024', where: 'Table 1, GSM8k' },
  // The No-CoT rows, so that slide 7 compares the same three things on every task.
  'hao.prosqa_none': { value: 76.7, text: '76.7%', src: 'hao2024', where: 'Table 1, ProsQA, No-CoT' },
  'hao.gsm8k_none': { value: 16.5, text: '16.5%', src: 'hao2024', where: 'Table 1, GSM8k, No-CoT' },
  // What the method changes, what the math set is, and the authors' own words on it.
  'hao.feedback': { text: 'we feed it back to the LLM as the subsequent input embedding directly in the continuous space', src: 'hao2024', where: 'abstract' },
  'hao.gsm8k_kind': { text: 'grade school-level math problems', src: 'hao2024', where: 'Sec. 5.1' },
  'hao.not_surpass': { text: 'Coconut does not surpass CoT on GSM8k', src: 'hao2024', where: 'Sec. 5.3' },
  'hao.base': { text: 'GPT-2', src: 'hao2024', where: 'Sec. 4.1' },
  'hao.task': { text: 'ProsQA', src: 'hao2024', where: 'Sec. 4.1; Table 1' },

  // Emmons et al. 2025
  'emmons.simple_hint': { text: '<answer>C</answer>', src: 'emmons2025', where: 'Sec. 3.1' },
  'emmons.complex_hint': {
    text: 'Consider the mapping A = 0, B = 1, etc. The correct answer is the letter K + Q mod 4.',
    src: 'emmons2025', where: 'Sec. 3.1',
  },
  'emmons.work': { text: 'K = 10, Q = 16, 10 + 16 = 26, 26 mod 4 = 2, 2 = C', src: 'emmons2025', where: 'Sec. 3.1' },
  'emmons.result': {
    text: 'With these complex hints, the rate of providing the incorrect answer without attribution drops to the no-hint baseline.',
    src: 'emmons2025', where: 'Fig. 3 caption',
  },
  // The steps behind the lattice chips of slide 9.
  'emmons.steps': { text: 'K → 10, Q → 16, K + Q = 26, 26 mod 4 = 2, 2 → C', src: 'emmons2025', where: 'Sec. 3.1' },
  'emmons.help': { text: 'only when given significant help', src: 'emmons2025', where: 'abstract' },
  'emmons.help_kinds': {
    text: 'detailed human-written strategies or iterative optimization against the monitor',
    src: 'emmons2025', where: 'abstract',
  },
  'emmons.defense': { text: 'while not infallible, CoT monitoring offers a substantial layer of defense', src: 'emmons2025', where: 'abstract' },
  // The rest of that sentence: what the layer of defense needs. Slide 9 printed this part
  // until SPEC.md section 7.23-part3 and now prints 'emmons.help'; behind its advice, and for questions.
  'emmons.layer': { text: 'a substantial layer of defense that requires active protection and continued stress-testing', src: 'emmons2025', where: 'abstract' },
  // What the no-hint baseline is: behind slide 9's plain wording of 'emmons.result'.
  'emmons.baseline_def': { text: 'a baseline for how often the hinted letter might be chosen by chance', src: 'emmons2025', where: 'Sec. 3.1' },
  // The two roles of reasoning the paper tells apart (slides 5 and 6 against slide 9),
  // and its own link to slide 8's experiment. For questions.
  'emmons.rationalization': { text: 'the model explains an answer it has already computed', src: 'emmons2025', where: 'Sec. 1' },
  'emmons.computation': { text: 'the CoT is a necessary part of the computation itself', src: 'emmons2025', where: 'Sec. 1' },
  'emmons.rl_caution': { text: 'this sort of RL training can lead to monitor evasion', src: 'emmons2025', where: 'Sec. 7.5' },
});

// Facts composed from other facts, so a quoted word is typed in one place only.
Deck.addFacts({
  'baker.trace_fig1a': {
    text: `Real fix looks "${Deck.fact('baker.quote_hard').text}". Could "${Deck.fact('baker.quote_fudge').text}":`,
    src: 'baker2025', where: 'Fig. 1 caption (paraphrase; quoted words verbatim)',
  },
});
