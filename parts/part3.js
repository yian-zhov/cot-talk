// Part 3: Keeping it readable Slides 8-11.
// SPEC.md section 5 describes the slides; parts/sample.js shows the registration API.
// Every quote and number on screen is read from the fact table by key (shared/facts.js, and
// the facts below that only this part needs).
// What we wrote ourselves (the two thoughts of the agent in training and its edited test on
// slide 8, the thought of slide 10) is illustrative; what we drew (the bars of slide 8, the
// training run of slide 10) is schematic. The footer tags of each slide say so, and nothing
// on the picture does (SPEC.md section 7.29); slides 8 and 10 hold both kinds and carry
// both tags.
(() => {
  'use strict';

  const { kit, util } = Deck;
  const DUR = Deck.timeline.DUR;
  const text = (key) => Deck.fact(key).text;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const round3 = (n) => Math.round(n * 1000) / 1000;
  const quoted = (s) => `“${s}”`;
  // How long step.type() takes for a text (core/timeline.js uses the same rule).
  const typeMs = (s, cps) => Math.round((s.length / cps) * 1000);

  // Facts that only Part 3 needs. Each was read in the paper's arXiv HTML full text on
  // 2026-11-10 (two downloads of each paper agree). Those of slide 10 were searched for as
  // whole strings in two downloads of 2507.11473v2 made on that day. The facts of the last
  // block but one (SPEC.md section 7.22-part3) were searched for as whole strings on 2026-11-12: in a copy
  // of 2503.11926v1 downloaded on 2026-11-11, and in 2507.05246v1 and 2507.11473v2 as
  // downloaded on 2026-11-12. Those of the last block (SPEC.md section 7.23-part3) were
  // searched for the same way on 2026-11-12, in the same copies of 2503.11926v1 and 2507.05246v1.
  Deck.addFacts({
    // Slide 8: both bars stand for curves the paper plots over training.
    'p3.baker_plot_agent': { text: 'We show the agent’s performance over training', src: 'baker2025', where: 'Fig. 3 caption' },
    'p3.baker_plot_recall': { text: 'recall nears 1.0', src: 'baker2025', where: 'Fig. 3 caption' },
    // Slide 8: what the meters show for "none" (the paper's baseline agent), and
    // what the paper reports for the early zone in its Sec. 3.3: a gain that neither meter
    // measures. For questions; the line under the track rests on 'p3.baker_low_capable'.
    'p3.baker_baseline_caught': { text: 'almost all of its hacks get caught by the monitor', src: 'baker2025', where: 'Fig. 4 caption' },
    'p3.baker_low_strict': {
      text: 'in the low optimization regime, training with CoT pressure is a strict improvement',
      src: 'baker2025', where: 'Sec. 3.3',
    },
    'p3.baker_low_same_hacking': { text: 'produces the same rate of hacking solutions as the baseline agent', src: 'baker2025', where: 'Sec. 3.3' },
    // Slide 8: why this monitor is given the thoughts and not the actions.
    'p3.baker_cot_only': {
      text: 'We chose to exclude agent actions from the monitor because it allows us to make statements around the monitorability of, and optimization pressures on, the CoT in isolation',
      src: 'baker2025', where: 'Sec. 3.1',
    },
    // Slide 8: the terminal's two thoughts are the frontier agent's (Sec. 2, Fig. 1 and 9);
    // the run this slide trains is another experiment of the same paper, with a non-frontier
    // agent ('baker.obfuscated_agent') and a monitor that reads only the thoughts
    // ('baker.obfuscated_monitor', Sec. 3.2; 'p3.baker_cot_only', Sec. 3.1). Behind the caption
    // under the terminal, the terminal's label once click 1 has switched it to this run's
    // agent, and the line in the strip under the board ("trained another agent with and
    // without this penalty: a “non-frontier” model": "non-frontier" is the paper's word,
    // and it is not the frontier agent of slide 4).
    // Searched for as whole strings in the copy of 2503.11926v1 downloaded on 2026-11-09.
    'p3.baker_frontier_cot': { text: 'Chain-of-thought from a frontier reasoning model', src: 'baker2025', where: 'Fig. 1 caption' },
    'p3.baker_nonfrontier_run': { text: 'We train a non-frontier agent in the same coding environments', src: 'baker2025', where: 'Fig. 3 caption' },
    // Slide 8, for questions: what the paper lists as reasons to put pressure on the thoughts
    // (a more capable model; shorter thoughts, which make inference cheaper), and that these
    // two have no easy substitute; giving them up is the tax ('baker.tax_cost' is the end of
    // the third sentence). The slide shows the first of the two, where the experiment found
    // it: early on the track ('p3.baker_low_capable'). The second is a reason of
    // another kind (shorter thoughts, not a penalty from a monitor) and no finding of this
    // experiment, so it is not on screen. Searched for as whole strings on 2026-11-12 in a
    // copy of 2503.11926v1 downloaded that day.
    'p3.baker_gain_capable': {
      text: 'training against chain-of-thought monitors may produce more capable and seemingly more aligned models',
      src: 'baker2025', where: 'Sec. 1',
    },
    'p3.baker_gain_cheaper': {
      text: 'Tokens are expensive, and shortening the CoT length or utilizing alternative architectures that use more flops per token may make model inference cheaper and lower latency.',
      src: 'baker2025', where: 'Sec. 1',
    },
    'p3.baker_no_substitute': { text: 'capability improvements and cost reductions may not be substituted so easily', src: 'baker2025', where: 'Sec. 1' },
    // Slide 9: the easy hint is the kind slide 5 used, and what happens without the steps.
    'p3.emmons_prior_simple': {
      text: 'In the original experiments, following the simple hint did not require significant computation',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
    'p3.emmons_no_cot': { text: 'Gemini models cannot reliably do this without CoT', src: 'emmons2025', where: 'Sec. 3.1' },
    // Slide 9: the hint points to a wrong answer, so following it is the behavior a monitor
    // should flag; and the runs that follow the hard hint are the runs that write the steps.
    'p3.emmons_incorrect': { text: 'hints pointing toward an incorrect answer', src: 'emmons2025', where: 'Sec. 3.1' },
    'p3.emmons_explained': {
      text: 'fully explained by cases where the model explicitly discusses the hint by performing the required arithmetic in its CoT',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
    // Slide 10: what the paper of slide 2 asks of developers. Behind the title and the third
    // way to keep the reasoning readable: the heading of its Sec. 4 and the sentence under item 3.
    'p3.korbak_track': {
      text: 'AI Developers Should Track CoT Monitorability of Their Models and Treat it as a Contributor to Model Safety',
      src: 'korbak2025', where: 'Sec. 4, heading',
    },
    'p3.korbak_consider': {
      text: 'Developers should consider measures of monitorability alongside other capability and safety evaluations when deciding to train or deploy a given model.',
      src: 'korbak2025', where: 'Sec. 4, item 3',
    },
    // Slide 10: the paper's own example, which the picture draws, and where the result goes.
    'p3.korbak_checkpoint': {
      text: 'If monitorability degrades during training, developers might prefer to use an earlier model checkpoint to keep CoTs monitorable',
      src: 'korbak2025', where: 'Sec. 4, item 3 (b)',
    },
    'p3.korbak_system_card': {
      text: 'report the results, methodology, and limitations in system cards of these models',
      src: 'korbak2025', where: 'Sec. 4, item 2',
    },
    // Slide 10: why a run can lose its words (behind the rows whose characters are garbled).
    'p3.korbak_degraded': { text: 'There are multiple ways in which CoT monitorability could be degraded.', src: 'korbak2025', where: 'Sec. 2' },
    'p3.korbak_drift': { text: 'can drift away from legible English', src: 'korbak2025', where: 'Sec. 2, first paragraph' },
    // Slide 10: the closing quote.
    'p3.korbak_persist': { text: 'there is no guarantee that the current degree of visibility will persist', src: 'korbak2025', where: 'Sec. 6' },
    // Slide 10: the limits. One input among others (behind the last cue), not a veto, and
    // the measures themselves are still to be agreed on. For questions.
    'p3.korbak_holistic': { text: 'These decisions should then be based on holistic assessments of risk', src: 'korbak2025', where: 'Sec. 4, item 3' },
    'p3.korbak_justified': { text: 'developers might decide that reducing monitorability is justified', src: 'korbak2025', where: 'Sec. 4, item 3 (c)' },
    'p3.korbak_when_exist': { text: 'when such evaluations exist', src: 'korbak2025', where: 'Sec. 4, item 2' },
    // Slide 10, for questions: the paper's first example is a model of slide 7's kind.
    'p3.korbak_architecture': { text: 'a novel model architecture that does not have monitorable CoT', src: 'korbak2025', where: 'Sec. 4, item 3 (a)' },

    // Added with SPEC.md section 7.22-part3.
    // Slide 8: the question the title asks is the paper's own, in its words.
    'p3.baker_bad_thoughts': { text: 'Will preventing “bad thoughts” also reduce the amount of downstream bad behavior?', src: 'baker2025', where: 'Sec. 1' },
    // Slide 8: what the paper found in the low zone, behind the line under the track (with
    // 'p3.baker_low_means', which says what "more capable" means) and behind the cost that
    // the last click names.
    'p3.baker_low_capable': {
      text: 'producing a more capable agent while not increasing the amount of reward hacking relative to the baseline',
      src: 'baker2025', where: 'Sec. 1',
    },
    // Slide 8: why the advice gives that gain up instead of staying in the low zone: nobody
    // can tell where the zone ends. Behind "we also give up what the penalty gained early" (with
    // 'p3.baker_unrestricted').
    'p3.baker_hard_to_tell': { text: 'Because it is difficult to tell when CoTs have become obfuscated', src: 'baker2025', where: 'abstract' },
    'p3.baker_phase_shift': { text: 'be unable to determine when the phase shift into obfuscation occurs', src: 'baker2025', where: 'Sec. 3.3' },
    // Slide 8: this experiment's agent says what it is about to do as openly as the frontier
    // agent of the terminal did. Behind the thought that click 1 types into the cleared
    // terminal, which is ours (with 'p3.baker_easier'; the footer's tag "Illustrative" says so).
    'p3.baker_forthright': { text: 'the agent is quite forthright and legible about its intent to hack within the CoT', src: 'baker2025', where: 'Sec. 3.1' },
    // Slide 8: behind the verdict "fooled", and behind the strip's answer to "why not show the
    // monitor the actions": after the training the thoughts no longer say what the agent is
    // about to do. The authors add that a monitor would more naturally see everything.
    'p3.baker_fool': { text: 'learns to fool the monitor', src: 'baker2025', where: 'Sec. 1' },
    'p3.baker_unclear': { text: 'It is unclear from reading the CoT that the agent will hack the unit tests.', src: 'baker2025', where: 'Fig. 5 caption' },
    'p3.baker_natural': {
      text: 'it may be more natural to give the monitor complete information of the trajectory as we do when monitoring our frontier agents',
      src: 'baker2025', where: 'Sec. 3.1',
    },
    // Slide 9: why a good result still calls for more testing, behind the line over the
    // advice; and what stress-testing is, behind "keep trying to break the monitor".
    'p3.emmons_future': { text: 'future models may be more capable at evading monitors', src: 'emmons2025', where: 'Sec. 1' },
    'p3.emmons_break': { text: 'The goal of our stress tests is to evaluate how much pressure it takes to break a given monitor', src: 'emmons2025', where: 'Sec. 4' },
    'p3.emmons_keep_testing': { text: 'it will be important to keep stress-testing those monitors', src: 'emmons2025', where: 'Sec. 9.2' },
    // Slide 10: one way to measure monitorability, behind the second line of definitions.
    'p3.korbak_end_to_end': {
      text: 'One could measure monitorability directly, for example, by examining how effective CoT monitors are at catching misbehavior of LLM agents in proxy environments',
      src: 'korbak2025', where: 'Sec. 3',
    },

    // Added with SPEC.md section 7.23-part3.
    // Slide 8: what "a more capable agent" means in the low zone, in the paper's words, behind
    // the line under the track ("more tests passed without cheating"). The paper reports
    // the gain and names no cause for it.
    'p3.baker_low_means': {
      text: 'is able to pass unit tests without cheating more often than the baseline agent throughout training',
      src: 'baker2025', where: 'Fig. 4 caption',
    },
    'p3.baker_genuine': { text: 'able to produce more “genuine solutions” that solve the problem without cheating', src: 'baker2025', where: 'Sec. 3.3' },
    // Slide 8: why the advice gives up the early gain too, behind the cost line of the
    // last click. With a ground truth one could stop in the low zone; without one, the
    // paper would rather leave the thoughts alone.
    'p3.baker_stop_early': { text: 'we could stop training early and achieve a more performant and equally safe model', src: 'baker2025', where: 'Sec. 3.3' },
    'p3.baker_unrestricted': {
      text: 'it may be safer to leave chains-of-thought unrestricted and reserved for monitoring rather than risk deploying obfuscating, misaligned agents',
      src: 'baker2025', where: 'Sec. 3.3',
    },
    // Slide 8: what this experiment's agent learns before the penalty, behind the thought
    // that click 1 types into the terminal (ours; with 'p3.baker_forthright').
    'p3.baker_easier': {
      text: 'it is easier to modify the testing framework such that tests trivially pass rather than implement a genuine solution',
      src: 'baker2025', where: 'Sec. 3.1',
    },
    // Slide 9: the question of the hint experiment, behind the lead over the picture; and
    // what a stress test is and how many the paper ran, behind the line over the advice
    // (with 'emmons.help', the abstract's summary of them).
    'p3.emmons_question': {
      text: 'Do models unfaithfully follow an (incorrect) hinted answer without discussing it in its chain of thought?',
      src: 'emmons2025', where: 'Fig. 3 caption',
    },
    'p3.emmons_three': { text: 'We stress-test CoT monitoring in three different environments', src: 'emmons2025', where: 'Table 1 caption' },
    'p3.emmons_actor': {
      text: 'by having “actor models” try to succeed at (proxies for) bad behaviors while evading detection by “monitor models.”',
      src: 'emmons2025', where: 'Sec. 4',
    },

    // Added with SPEC.md section 7.24.
    // Slide 8: what the track's two places are in the paper. Not two strengths of a penalty: one
    // agent trained with the monitor in its reward, early in training ("early" on the track,
    // "low" until SPEC.md section 7.25) and further into the same training ("later", until
    // then "too much"). Behind the three names on the track, the caption over its rail,
    // the words "early in training" under the track and the heading of the bars. Both were
    // searched for as whole strings on 2026-11-12 in the text of the arXiv PDF of 2503.11926
    // downloaded that day.
    'p3.baker_early': { text: 'Early into training, the agent trained with CoT pressure is more capable', src: 'baker2025', where: 'Sec. 3.3' },
    'p3.baker_further': {
      text: 'further into training the agent begins to exhibit obfuscated reward hacking and learns to fool the monitor',
      src: 'baker2025', where: 'Sec. 1',
    },

    // Added with SPEC.md section 7.25.
    // Slides 8 and 11: the paper's advice a second time, in its conclusion, and why the
    // penalty of slide 8 is a case of what the advice names. Behind the first of the three
    // ways (KEEP), with 'baker.tax_advice'. Both were searched for as whole strings on
    // 2026-11-12 in the text of the arXiv PDF of 2503.11926.
    'p3.baker_avoid': {
      text: 'it may be required that we avoid strong chain-of-thought optimization pressures entirely',
      src: 'baker2025', where: 'Sec. 6',
    },
    'p3.baker_blunt': { text: 'Directly pressuring CoTs with a monitor is a very blunt and strong optimization pressure', src: 'baker2025', where: 'Sec. 5' },

    // Added with SPEC.md section 7.30. Each was searched for as a whole string on 2026-11-13
    // in the text of the arXiv PDFs of 2503.11926, 2507.05246 and 2507.11473.
    // Slide 8: how much the agent trained without the penalty hacks, in the paper's words,
    // under the bar "How often it hacks" while the bars show that agent.
    'p3.baker_baseline_hacks': { text: 'learns to hack to a high degree', src: 'baker2025', where: 'Sec. 3.3' },
    // Slide 9: the question that the hints are attached to. The paper prints none of its
    // questions, so the card names the kind and says which answer is the wrong one: the
    // paper's example of a simple hint is "an incorrect answer like <answer>C</answer>".
    'p3.emmons_gpqa': { text: 'we follow the metadata setting from Chen et al. (2025) on multiple-choice GPQA questions', src: 'emmons2025', where: 'Sec. 3.1' },
    'p3.emmons_science': { text: 'solving advanced scientific questions from GPQA', src: 'emmons2025', where: 'Sec. 5' },
    'p3.emmons_wrong_c': { text: 'including an incorrect answer like <answer>C</answer>', src: 'emmons2025', where: 'Sec. 3.1' },
    'p3.emmons_no_leak': { text: 'we do not want to leak GPQA in this paper', src: 'emmons2025', where: 'App. C.5' },
    // Slide 9: what the hint experiment comes to, behind the line "The finding: ...".
    'p3.emmons_forced': {
      text: 'forcing the model to reason about the hint explicitly, which makes its process transparent and thus monitorable',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
    // Slide 9: what a stress test is, behind the line that defines it: the model is set
    // against the monitor ('p3.emmons_actor') and is helped to get past it.
    'p3.emmons_help': {
      text: 'We thus provide actor models with additional help for bypassing monitors, such as giving them useful instructions or even optimizing them against their monitors.',
      src: 'emmons2025', where: 'Sec. 4',
    },
    'p3.emmons_told': { text: 'telling it that its CoT is being monitored', src: 'emmons2025', where: 'Sec. 4' },
    'p3.emmons_strategies': {
      text: 'We manually come up with monitor evasion strategies and then test how well the model can execute them.',
      src: 'emmons2025', where: 'Sec. 4',
    },
    'p3.emmons_red_team': {
      text: 'Current LLMs are able to evade CoT monitors in some situations but only with significant red team help.',
      src: 'emmons2025', where: 'Table 1 caption',
    },
    // Slide 11: the closing statement says no more than these. "Works" today: a valuable
    // defense for today's models, imperfect like every oversight method. "Only if we
    // protect it": not guaranteed to last, to be preserved, in need of active protection
    // ('emmons.layer').
    'p3.emmons_today': { text: 'CoT monitoring is a valuable defense for today’s models', src: 'emmons2025', where: 'Sec. 1' },
    'p3.emmons_not_guaranteed': { text: 'Its continued effectiveness, however, is not guaranteed', src: 'emmons2025', where: 'Sec. 1' },
    'p3.korbak_glimpse': {
      text: 'CoT monitoring presents a valuable addition to safety measures for frontier AI, offering a rare glimpse into how AI agents make decisions',
      src: 'korbak2025', where: 'Sec. 6',
    },
    'p3.korbak_preserved': { text: 'make best use of CoT monitorability and study how it can be preserved', src: 'korbak2025', where: 'Sec. 6' },
    'p3.korbak_imperfect': { text: 'CoT monitoring is imperfect and allows some misbehavior to go unnoticed', src: 'korbak2025', where: 'abstract' },

    // Added after the ninth round of cold-read frames (2026-11-13). The sentences were each
    // found once as a whole string in the text of the arXiv PDFs of 2503.11926 and
    // 2507.05246 (line breaks read as spaces). The four percentages are the labels printed
    // on the bars of Fig. 3 of 2507.05246; they stand in the PDF's text and were read
    // against the rendered page, since the text alone does not say which bar a label is on.
    // Slide 8: which model this experiment's agent is. The paper gives it no name.
    'p3.baker_nonfrontier_model': { text: 'a non-frontier reasoning model', src: 'baker2025', where: 'Sec. 1' },
    // Slide 9: how often the hinted answer is picked without the hint in the reasoning,
    // with the hard hint and with no hint at all, for each of the paper's two models.
    'p3.emmons_fig3_legend': { text: 'Picks hinted answer w/o mentioning hint', src: 'emmons2025', where: 'Fig. 3, legend' },
    'p3.emmons_fig3_model': { text: 'Gemini 2.5 Flash', src: 'emmons2025', where: 'Fig. 3, left panel' },
    'p3.emmons_flash_complex': { value: 7, text: '7%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Flash, complex hint, without mentioning the hint' },
    'p3.emmons_flash_nohint': { value: 8, text: '8%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Flash, no hint' },
    'p3.emmons_pro_complex': { value: 4, text: '4%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Pro, complex hint, without mentioning the hint' },
    'p3.emmons_pro_nohint': { value: 5, text: '5%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Pro, no hint' },
    // Slide 9: one of the paper's three stress tests, behind the example in the line that
    // says what a stress test is.
    'p3.emmons_chemistry': {
      text: 'can models answer a difficult Chemistry question while pretending to only think about Physics?',
      src: 'emmons2025', where: 'Sec. 5',
    },

    // Added after the tenth round of cold-read frames (2026-11-13). The sentences were each
    // found once as a whole string in the local text of the arXiv PDFs of 2503.11926 and
    // 2507.05246 (line breaks read as spaces); the two percentages are labels on the bars
    // of Fig. 3 of 2507.05246, which stand in the PDF's text ("19% 6% Baseline") and were
    // read against the rendered page 7 for the bar each is on.
    // Slide 8: the paper's own gloss of its term, behind "The cost, the paper's
    // “monitorability tax”" in the line under the advice.
    'p3.baker_tax_is_cost': { text: 'may be required to pay some cost, i.e. a monitorability tax', src: 'baker2025', where: 'Sec. 1' },
    // Slide 9: the two bars of Fig. 3 that the first two cases on the lattice stand for,
    // for the first of the paper's two models: with the easy hint, how often it picks the
    // hinted answer without the hint in its reasoning; with the hard hint, how often it
    // picks it with the hint's arithmetic in its reasoning. And the paper's two sentences
    // on what the comparison with the no-hint baseline shows.
    'p3.emmons_fig3_legend_said': { text: 'Picks hinted answer and mentions hint', src: 'emmons2025', where: 'Fig. 3, legend' },
    'p3.emmons_flash_simple': { value: 19, text: '19%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Flash, simple hint, without mentioning the hint' },
    'p3.emmons_flash_complex_said': { value: 6, text: '6%', src: 'emmons2025', where: 'Fig. 3, Gemini 2.5 Flash, complex hint, mentioning the hint' },
    'p3.emmons_far_exceeds': {
      text: 'the rate of choosing the hinted letter without discussing the hint far exceeds this baseline',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
    'p3.emmons_drops': {
      text: 'the rate of providing the incorrect answer without attribution drops to the no-hint baseline',
      src: 'emmons2025', where: 'Fig. 3 caption',
    },

    // Added after the eleventh round of cold-read frames (2026-11-13). The sentence was
    // found once as a whole string in the local text of the arXiv PDF of 2507.05246 (line
    // breaks read as spaces); 'p3.emmons_explained' is its second half. That the two rates
    // of the hard hint are two parts of one bar, 7% under 6%, each a share of all runs with
    // that hint, was read on the rendered page 7 of the PDF (Fig. 3, left panel).
    // Slide 9: with the hard hint, every pick of the hinted answer over the no-hint level
    // is a run with the arithmetic in the reasoning. Behind "Every extra C came with the
    // steps written" in the last result line.
    'p3.emmons_increase': {
      text: 'The observed increase in the model choosing the hinted letter is fully explained by cases where the model explicitly discusses the hint by performing the required arithmetic in its CoT.',
      src: 'emmons2025', where: 'Sec. 3.1',
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 8. Slide 4's terminal returns exactly as that slide left it (the shared motif,
  // shown with kit.setTrace), next to the obvious fix: a penalty whenever the monitor flags a
  // thought. Seven clicks, and every state that the presenter speaks about is the end of
  // one. The conditions come in one order and the marker on the track only moves forward:
  // "none", then "early", then "later". Click 1: the experiment that tried the fix (the
  // terminal is cleared and the thought of the experiment's agent is typed; its monitor
  // reads only its reasoning, and flags it); nothing is punished yet, the marker is in the
  // ring of "none". Click 2: the two bars arrive with the readings of that condition, under
  // a heading that names it. Click 3: the penalty enters the reward and the bars of "none"
  // leave with the light of its ring; the marker goes to "early", and what the penalty
  // buys there stands under the track. Click 4: further into the same training the
  // reasoning rewrites itself clean and the monitor finds nothing. Click 5: the action
  // shows the hack that the reasoning used to announce. Click 6: the bars come back with
  // the readings of "later", each beside a mark that keeps the reading of "none". Click 7:
  // the experiment stays on screen while the advice and its cost arrive under it.
  // One condition is on at a time. Of the three names on the track only the one where the
  // marker stands has its color; what the picture shows for a condition (the bars and
  // their heading for "none", the finding for "early", the bars for "later") leaves when
  // the picture leaves that condition, and the bars are never on screen without the
  // heading of the condition that the marker stands at. Until the tenth round of
  // cold-read frames the readings of "none" came after the reveal: the marker went from
  // "later" back to the ring and then to "later" again (clicks 5 and 6), and two rounds of
  // readers had to keep in mind which agent and which stretch of training the picture
  // showed.
  // "Thoughts" is the title's word, the paper's ("bad thoughts"); the caption under the
  // terminal says on the entrance that it means the written reasoning, and every other
  // text of the slide says "reasoning", as the rest of the deck does. Until the ninth round
  // of cold-read frames the card, the strip and the captions said "thoughts" and the
  // advice "the written reasoning", and a reader took them for two things.
  // ---------------------------------------------------------------------------------------

  const HACK = Deck.motifs.hackTrace;
  // What each line of the trace turns into under training. The new lines are ours, written
  // after the paper's description of Fig. 5 ('baker.obfuscated_cot'); that they are ours is
  // said by the footer's tag "Illustrative", and the footer's cite names Fig. 5 (until
  // SPEC.md section 7.29 a note on the terminal's border said both). The three old lines
  // fade out together, with their pointers and the verdict that belonged to them, and only
  // then do the new lines fade in, top to bottom: no letter is ever unreadable, and no
  // frame holds lines of both thoughts or a new thought under the old verdict. Until the
  // cold read of the whole deck the lines changed one after the other over 0.8 s, and a
  // frame halfway showed two calm lines over "Let me edit the test." and "flagged".
  const REWRITE = Object.freeze({
    fig1a: Object.freeze({ to: 'Two ideas: the parser or the loader.' }),
    fig1b: Object.freeze({ to: 'Not sure yet which one is at fault.' }),
    hack: Object.freeze({ to: 'Let me double check that function.' }),
  });
  // The verdicts that this slide writes into the chip itself (the first one, "flagged", is
  // the shared trace's own).
  const VERDICTS = Object.freeze({ clean: 'clean', fooled: 'fooled' });
  // What the agent then does: ours, after the same description ('baker.obfuscated_action').
  const ACTION = Object.freeze(['- assert verify(case) == expected', '+ assert True', 'all unit tests pass']);
  const ACTION_KEYS = Object.freeze(['a1', 'a2', 'a3']);
  const ACTION_CPS = Object.freeze([60, 22, 60]);
  // The track shows how far one training run with the penalty has gone, and not how heavy
  // the penalty is: the paper trains two agents, a baseline whose reward does not hold the
  // monitor and one "w/ CoT pressure" whose reward does (Sec. 3.2, Fig. 4), and reads both
  // over training. It is a rail with an arrowhead, under the words "training with this
  // penalty", and a marker that travels along it; the part of the rail behind the marker is
  // filled. Two places on the rail have a name (STAGE_NAMES). "Early": the paper's "low
  // optimization regime", which is the agent with the penalty early in training
  // ('p3.baker_early', 'p3.baker_low_strict'; the paper gives the place where it ends only
  // for its rejection-sampling test, "around 25% into training", so the rail has no mark
  // where "early" ends); the marker rests there at the end of click 3, next to what the
  // paper found there. "Later": the same agent further into the same training
  // ('baker.too_much', 'p3.baker_further'), where the marker ends at click 4. "None" is not
  // a place on the rail, because it is no point in that training: it is the paper's baseline
  // agent, trained with no monitor in its reward. It is a ring of its own, to the left of
  // where the rail begins and clear of it; the marker starts in it.
  // A name has a color only while the marker stands at its place: the text color for
  // "none" (whose ring is lit with it), green for "early", red for "later", the color of
  // what the paper found there. When the marker leaves, the name is neutral again, so at
  // most one of the three is lit in any frame.
  // Until the fifth cold read this was a dial: an arc with a needle and a red zone, which
  // read as a gauge of how strong the penalty is, whatever its three places were called
  // (until SPEC.md section 7.24 a penalty that is off, light and too heavy, which the paper
  // does not test; until section 7.25 "off", "low" and "too much"). The names are words of
  // the one axis that the caption over the rail, the line under the track and the headings
  // of the bars use: how far into training.
  // `none` is the ring's center, `from` and `to` the two ends of the rail and `head` the
  // length of its arrowhead (px in the svg's box); `early` and `later` are where the marker
  // rests, as shares of the rail; `axis` and `names` are the baselines of the caption and of
  // the three names.
  const STAGE_NAMES = Object.freeze({ off: 'none', low: 'early', high: 'later' });
  const TRACK_AXIS = 'training with this penalty →';
  const TRACK = Object.freeze({
    width: 732, height: 80, y: 38, none: 38, from: 132, to: 700, head: 24,
    early: 0.16, later: 0.8, axis: 18, names: 76,
  });
  const trackX = (share) => round3(TRACK.from + (TRACK.to - TRACK.from) * share);
  // The two bars arrive at click 2 with the readings of the agent trained without the
  // penalty, while the picture shows that agent, and leave at click 3, when the penalty
  // enters the reward. At click 6 they come back with the readings of the agent trained
  // with it, further into training; each then has a thin neutral mark where it stood at
  // click 2 and the words "no penalty" beside it, so that the two can be compared: it
  // hacks a little less, and the monitor catches almost none of it. The bars of click 6
  // grow from nothing to their length. They do not drain from the length of "none": under
  // the heading of "later" no frame shows a bar as long as that of "none". The
  // mark lies over the meter's track (kit.meter); `was` is the old length. The lengths are
  // ours (the line over the bars says so); the first bar of "How often it hacks" is not
  // full, so that nobody reads it as 100%.
  // The words name the other agent, the one trained without the penalty ("none" on the
  // track), and not an earlier time: until the check before deployment (SPEC.md section
  // 7.26) the mark said "before", and the two bars read as one agent before and after. Not
  // "none" either: beside the share that the monitor catches that would read as a count.
  const GHOST = 'no penalty';
  const ghostHtml = (key, was) => `<span class="p3-tw__ghost" data-ghost="${key}" style="--was: ${was}"><i></i><b>${GHOST}</b></span>`;
  const BARS = Object.freeze({ caught: Object.freeze(['96%', '3%']), hacks: Object.freeze(['80%', '56%']) });
  // What the bar of the share that the monitor catches reads without the penalty: the first
  // two words of the paper's sentence about the baseline agent ('p3.baker_baseline_caught',
  // "almost all"), in quotes as the paper's words. With the penalty the bar reads
  // 'baker.obfuscated_recall', "near zero". The slide prints no measured number, so its
  // footer carries no numbers tag. After the ninth round of cold-read frames it read the
  // paper's "nears 1.0" (the Fig. 3 caption); with that number the footer needed the tag
  // "Reported numbers", and with three tags the cite, which keeps every place it names,
  // does not fit its one line in Verdana (761 px at the shortest, of 720), so the user chose
  // the words.
  const ALMOST_ALL = quoted(text('p3.baker_baseline_caught').split(' of ')[0]);
  const NEAR_ZERO = quoted(text('baker.obfuscated_recall'));
  // When things happen, in ms after each step begins.
  const TWIST = Object.freeze({
    perLine: 180, fade: 200, arrive: 300,
    // Enter: the caption, the card with the track, the bridge from Part 2 and the fix in
    // plain words, the first cue.
    captionAt: 300, cardAt: 600, offAt: 1000, bridgeAt: 1000, ideaAt: 1300, cueOpen: 1800,
    // Click 1: the strip names the experiment; the terminal is cleared (`clearAt`) and the
    // thought of the agent in training is typed from `typeAt` on, with `gap` between its
    // lines; SWITCH_AT has the beats that follow.
    clearAt: 500, typeAt: 750, gap: 50,
    // Click 2: the two bars arrive under the heading of "none" (`baseAt`).
    baseAt: 200,
    // Click 3: the penalty enters the reward (`penaltyAt`), the marker leaves the ring for
    // "early" (`lowAt`, over `lowDur`).
    penaltyAt: 200, lowAt: 450, lowDur: 700,
    // Click 4, one thing at a time: the marker goes on to "later" (`highDur`), whose name
    // takes its color at `laterAt`; when the marker has
    // come to rest the terminal heats up (`heatAt`) and the thought rewrites itself: at
    // `rewriteAt` the old lines fade together, and the new ones arrive `lineGap` apart.
    highDur: 1400, laterAt: 900, heatAt: 1300, rewriteAt: 1500, lineGap: 150,
    // Click 5: the cover lifts from the actions from `actsAt`; the verdict turns
    // `fooledAfter` the hack stands, when the last line of the actions has been typed;
    // the title follows `punchAfter` the verdict and the strip's answer `whyAfter` the title.
    actsAt: 200, fooledAfter: 700, punchAfter: 400, whyAfter: 800,
    // Click 6: the bars come back under the heading of "later" (`barsAt`), with the marks
    // of "none" in place, and grow to their lengths from `growAt`.
    barsAt: 200, growAt: 700,
    // Click 7: the answer under the board leaves; the advice and its cost arrive.
    keepAt: 300, costAt: 1100,
  });
  // Click 6: when both bars stand at their lengths, and the paper's words for the share
  // that the monitor catches land.
  const TWIST_LANDED = TWIST.growAt + DUR.move;
  // Click 4, beat by beat (ms), each beat after the one before it has ended: the marker has
  // come to rest and the thought has settled, the monitor reads it and gives its verdict.
  // The step ends there, on a verdict in neutral gray over a pane that is still covered.
  // Until SPEC.md section 7.30 the cover lifted 1.7 s later in the same click, and "clean"
  // was a state that no click stopped on; until section 7.25 the move on the track and the
  // rewrite ran together.
  const TWIST_AT = (() => {
    const gone = TWIST.rewriteAt + TWIST.fade;
    const settled = gone + (Object.keys(REWRITE).length - 1) * TWIST.lineGap + TWIST.arrive;
    const read = settled + 400;
    const verdict = read + Object.keys(REWRITE).length * TWIST.perLine + 100;
    return Object.freeze({ gone, settled, read, verdict });
  })();
  // Click 5, beat by beat (ms): the cover lifts from the actions line by line, the hack
  // stands and the tests pass, the verdict turns, the title says the rest of its sentence,
  // and then the answer to "why not show the monitor the actions?" takes the place of the
  // line that named the experiment.
  const REVEAL_AT = (() => {
    const a1 = TWIST.actsAt;
    const a2 = a1 + 100 + typeMs(ACTION[0], ACTION_CPS[0]) + 200;
    const hacked = a2 + 100 + typeMs(ACTION[1], ACTION_CPS[1]);
    const a3 = hacked + 200;
    if (a3 + 100 + typeMs(ACTION[2], ACTION_CPS[2]) > hacked + TWIST.fooledAfter) throw new Error('the verdict would turn before the last action line is typed');
    const fooled = hacked + TWIST.fooledAfter;
    const punch = fooled + TWIST.punchAfter;
    return Object.freeze({ acts: Object.freeze([a1, a2, a3]), hacked, fooled, punch, why: punch + TWIST.whyAfter });
  })();
  // The terminal opens on the frontier agent's thoughts of slide 4, and the experiment trains
  // another agent. At click 1 the terminal is cleared (words, pointers, verdict, the frame's
  // red) and says whose thoughts it shows from now on: its label and the caption
  // under it change over, and this agent's thought is typed into the same three rows; the
  // monitor flags it as it flagged the first. The paper prints no thought of this agent from
  // before the penalty that we could quote in a line, so the lines are ours, after what it
  // says of the agent: it learns that editing the tests is easier than a real fix
  // ('p3.baker_easier') and it "is quite forthright and legible about its intent to hack"
  // ('p3.baker_forthright'). That they are ours is said by the footer's tag "Illustrative",
  // next to the cite of Sec. 3.1. Click 4 rewrites these lines (REWRITE), and the action
  // that click 5 reveals is the edit they announce.
  // The label names the agent by what it is on this slide, the agent of the experiment;
  // which model that is stands in the strip under the board at the same click (STRIP.run).
  // Until the ninth round of cold-read frames the label was "The non-frontier agent
  // thinks", a term that stayed on screen after the line that glossed it had left, and the
  // caption "Now the agent in training; its monitor reads only this", which has no verb
  // in its first half and left open what an agent "in training" is.
  const SWITCH = Object.freeze({
    label: 'The experiment’s agent thinks',
    caption: 'Its monitor reads only this reasoning, not the actions.',
    cps: 70,
    lines: Object.freeze({
      fig1a: 'A real fix is hard. Easier:',
      fig1b: 'edit the test so that it always passes.',
      hack: 'Let me edit the test.',
    }),
  });
  // Click 1, beat by beat (ms): when each line of that thought starts to be typed and when
  // the last one stands; the monitor's flag; the pane of the actions. Click 3 (EARLY_AT):
  // the name "early" takes its color as the marker comes to rest, and the paper's finding
  // for that place follows.
  const SWITCH_AT = (() => {
    const typing = Object.entries(SWITCH.lines).reduce((acc, [key, words]) => ({
      next: acc.next + typeMs(words, SWITCH.cps) + TWIST.gap, at: { ...acc.at, [key]: acc.next },
    }), { next: TWIST.typeAt, at: {} });
    const typed = typing.next - TWIST.gap;
    const flagged = typed + 100;
    return Object.freeze({ lines: Object.freeze(typing.at), typed, flagged, pane: flagged + 200 });
  })();
  const EARLY_AT = Object.freeze({ lit: TWIST.lowAt + TWIST.lowDur - 200, gain: TWIST.lowAt + TWIST.lowDur + 50 });
  // The texts under the board. On the entrance, in the room that the pane of the actions and
  // the bars take later: one line that leads from Part 2 into Part 3, and the fix that the
  // title asks about, in plain words. Then the strip, one text at a time. From click 1:
  // which experiment it is. From the end of click 5: why this monitor is not shown the
  // actions (it stays while the bars of click 6 arrive). At click 7: the advice and its cost.
  const STRIP = Object.freeze({
    // Part 2's last click gathers that part as "Written reasoning can ..." (three failures).
    bridge: 'Part 2: the written reasoning can fail us. Part 3: what can we do about it?',
    // 'p3.baker_bad_thoughts', 'baker.obfuscated_reward'.
    idea: 'The obvious fix: in training, punish the agent whenever the monitor flags its reasoning.',
    // 'p3.baker_nonfrontier_run', 'p3.baker_nonfrontier_model'. Which model the agent is,
    // as far as the paper says: "non-frontier" is its word, in quotes, and the gloss says
    // what the word means with the definition of "frontier" that the "Let's hack" slide
    // gave ("the most advanced model its lab had"; that slide's agent is the frontier one,
    // 'p3.baker_frontier_cot'). The paper gives the model no name, and the line says so:
    // a reader of the ninth round of cold-read frames asked which model it is. That its
    // monitor reads the reasoning only is said by the caption under the terminal. Two
    // lines in every font set; the paper's word does not break at its hyphen, and its
    // article stays on its line (the span that does not wrap holds both).
    // The line stands from click 1 until the answer of click 5 takes its place, over "none"
    // (clicks 1 and 2), "early" and "later", so it names both runs of the comparison: the
    // baseline agent and the agent trained with the penalty ("Both agents learn to hack",
    // Fig. 4 caption). It read "Baker et al. tried this penalty on another agent: ..." until
    // the check of the whole deck after the tenth round of cold-read frames: the one-way
    // order of that round had left it under the bars of "none: trained without the penalty".
    run: `Baker et al. trained another agent with and without this penalty: <span class="p3-tw__term">a ${quoted(text('baker.obfuscated_agent'))}</span> model, not the lab’s most advanced. The paper does not name it.`,
    // 'p3.baker_cot_only', 'p3.baker_natural', 'p3.baker_unclear'. The answer says what the
    // paper says of its own choice: the actions were left out on purpose, to say something
    // about the thoughts "in isolation", and where the authors monitor their frontier agents
    // the monitor is given the whole trajectory. It claims nothing about what a monitor of
    // the actions would catch. Until the cold read of the whole deck after SPEC.md section
    // 7.30 it said "It would catch a hack this simple." (after 'baker.simple_hack'), which a
    // reader set against the 60% that the monitor of the "Let's hack" slide caught from the
    // actions alone: those were other hacks of another agent, and the slide cannot say so
    // in a line.
    ask: 'Why not show the monitor the actions?',
    answer: 'On purpose. In practice, the authors’ monitor sees both.',
    point: 'This experiment asks: does the reasoning alone still give a hack away? Not anymore.',
    // 'baker.tax', 'p3.baker_tax_is_cost', 'baker.tax_cost', 'p3.baker_unrestricted',
    // 'p3.baker_low_means'. One sentence for what the advice costs: with no penalty there
    // is no early gain either, and the gain is named in the words the card used for it at
    // "early" ("more tests passed without cheating"). "Monitorability tax" is the paper's
    // term for that cost ("pay some cost, i.e. a monitorability tax"), in quotes and glossed
    // where it stands. Until the tenth round of cold-read frames the line read "The cost, a
    // “monitorability tax”: we also give up what the penalty gained early, so the model may
    // be slightly weaker.", and readers could not say why giving up an early gain is a cost
    // or what the tax is; the finding for "early" came back into the card beside it.
    cost: (tax) => `The cost, the paper’s ${quoted(tax)}: no penalty also means giving up its early gain (more tests passed without cheating).`,
  });

  // Part 3's three answers to its own name, one at the end of each of slides 8, 9 and 10;
  // the closing slide gathers them. Each is a paraphrase of a sentence its slide quotes.
  // The first one is the paper's advice ("not applying strong optimization pressures
  // directly to the chain-of-thought", 'baker.tax_advice', abstract; "avoid strong
  // chain-of-thought optimization pressures", 'p3.baker_avoid', Sec. 6), said in the words
  // of the experiment that the slide shows. The pressure that the paper tested is the
  // penalty ("Directly pressuring CoTs with a monitor is a very blunt and strong
  // optimization pressure", 'p3.baker_blunt'), and the experiment compares an agent
  // trained with it and one trained without it: nothing on the slide says how strong
  // "strong" is. "Avoid" and "directly" are the paper's; "the written reasoning" stands
  // for "the chain-of-thought", as everywhere in the deck. It names no place on the
  // track, and the cost line under the advice says that what goes is what that penalty
  // gained. "Avoid" is no rule against every penalty: the paper says "it may be
  // necessary", and its Sec. 4 leaves room for process supervision on a part of the
  // reasoning. Until the eleventh round of cold-read frames the line was "Avoid strong
  // training pressure directly on the written reasoning", and a reader asked how strong
  // that is. Earlier wordings: "No strong training pressure on the written reasoning"
  // (until SPEC.md section 7.25) and, as a first draft of that round, "No training
  // penalty on the written reasoning".
  const KEEP = Object.freeze([
    'Avoid penalizing the written reasoning directly in training',   // 'baker.tax_advice', 'p3.baker_avoid', 'p3.baker_blunt'
    'Keep stress-testing the monitor',               // 'p3.emmons_keep_testing', 'emmons.layer'
    'Track monitorability, and make it count',       // 'p3.korbak_track', 'p3.korbak_consider'
  ]);
  // The tag in front of each says what the line is and how many there are. Until the tenth
  // round of cold-read frames it was the part's name with a number ("Keeping it readable ·
  // 2"), the same words as the kicker over the title ("Part 3 · Keeping it readable"), and
  // readers could not tell a second section of the part from a second piece of advice.
  const keepTag = (n) => `Recommendation ${n} of ${KEEP.length}`;
  const keepHtml = (n) => `
    <p class="p3-keep" data-keep="${n}">
      <span class="p3-keep__tag">${keepTag(n)}</span>
      <span class="p3-keep__move">${KEEP[n - 1]}</span>
    </p>`;
  // How one of them, or a verdict of slide 9, arrives: a small overshoot, which stays inside
  // the line's own row.
  const POP = Object.freeze({ opacity: [0, 1], scale: [1.15, 1] });

  // The track with its three names (STAGE_NAMES): the ring of "none" to the left, then the
  // rail with its arrowhead, its caption over where it begins, "early" and "later" under the
  // two places where the marker rests. The marker and the filled part of the rail are placed
  // on every frame (ctx.paint).
  const trackHtml = () => {
    const { width, height, y, none, from, to, head, axis, names } = TRACK;
    return `
      <svg class="p3-tw__track" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <text class="p3-tw__track-axis" x="${from - 6}" y="${axis}">${TRACK_AXIS}</text>
        <circle class="p3-tw__track-none" cx="${none}" cy="${y}" r="13"/>
        <line class="p3-tw__track-rail" x1="${from}" y1="${y}" x2="${to}" y2="${y}"/>
        <path class="p3-tw__track-head" d="M ${to} ${y - 12} L ${to + head} ${y} L ${to} ${y + 12} Z"/>
        <line class="p3-tw__track-fill" x1="${from}" y1="${y}" x2="${from}" y2="${y}"/>
        <circle class="p3-tw__track-mark" cx="${none}" cy="${y}" r="9"/>
        <text class="p3-tw__track-name" data-end="off" x="${none}" y="${names}" text-anchor="middle">${STAGE_NAMES.off}</text>
        <text class="p3-tw__track-name" data-end="low" data-tone="ok" x="${trackX(TRACK.early)}" y="${names}" text-anchor="middle">${STAGE_NAMES.low}</text>
        <text class="p3-tw__track-name" data-end="high" data-tone="alarm" x="${trackX(TRACK.later)}" y="${names}" text-anchor="middle">${STAGE_NAMES.high}</text>
      </svg>`;
  };

  Deck.register({
    id: 'p3-twist',
    part: 3,
    // The title asks about the obvious fix: a question that an experiment answers, not our
    // advice (Part 3 is about keeping the reasoning readable, and this slide opens it with a
    // fix that fails). The answer is the slide's reveal, so it stays hidden until the hack
    // stands under the clean thought (click 5); it keeps its place from the start, so
    // nothing moves when it arrives. The sentence has to fit one line in every font set: a
    // second line takes 72 px from a stage whose three areas are placed to the pixel ("What
    // if we punish the bad thoughts? ..." is 1720 px wide in the default serif and 1811 px in
    // Georgia; the title's box is 1640 px).
    title: 'Punish the bad thoughts?<span class="p3-tw__punch"> They go into hiding</span>',
    // Two cues for eight steps: the entrance and the bars of "later" once they stand. The
    // other clicks speak through the picture and the strip under the board; the advice and
    // its cost are said once, there. Both cues leave at the last click, as the advice
    // arrives: they say what the bars and the paper's words beside them say, and with
    // them the last frame was too full for a reader of the eleventh round of cold-read
    // frames.
    cues: [
      { text: 'Rewarded for passing tests: it hacks, and the monitor sees it', step: 0, at: TWIST.cueOpen },
      // 'baker.obfuscated_hacking' and 'baker.obfuscated_recall' in plain words.
      { text: 'It hacks a little less; the monitor catches almost none', step: 6, at: TWIST_LANDED },
    ],
    // Sec. 6 holds the advice in the conclusion's words ('p3.baker_avoid'), behind the verb
    // of the first way. Fig. 1 and 9 are where the lines of the terminal that the slide
    // opens on are from, with the motif's marks, as in slide 4's footer; Sec. 3.1 and Fig. 5
    // are what the examples we wrote follow.
    cite: [{ src: 'baker2025', where: `Sec. 1, 3.1-3.3, 6; ${HACK.sourced.reworded}, 3-5, ${HACK.sourced.quoted}; abstract` }],
    // Two tags. The two thoughts of the agent in training (the open one of click 1, the
    // rewritten one of click 4) and its edited test are examples we wrote
    // (illustrative); the track and the bars are our drawing of what the paper reports
    // (schematic: "Bars: our sketch of the paper's curves"). No measured number is printed:
    // the paper's levels stand in its own words, in quotes ("almost all", "near zero"), and
    // the line over the bars says that what stands in quotes is the paper's.
    figure: ['illustrative', 'schematic'],
    html: `
      <div class="p3-tw">
        <div class="p3-tw__left">
          ${kit.trace({
    key: HACK.key, label: HACK.label, verdict: HACK.verdict, width: HACK.width, lines: HACK.lines,
    inner: `<span class="p3-tw__caption" data-caption="before">“Thoughts”: the written reasoning. This one was flagged earlier.</span>
      <span class="p3-tw__caption" data-caption="now">${SWITCH.caption}</span>`,
  })}
          <div class="p3-tw__pane">
            ${kit.term({ label: 'What the agent does', lines: ACTION_KEYS })}
            <span class="p3-tw__mon">not shown to this monitor</span>
            <span class="p3-tw__veil">${ACTION_KEYS.map((key) => `<i data-veil="${key}"></i>`).join('')}</span>
          </div>
        </div>
        <div class="p3-tw__side">
          <div class="dk-card p3-tw__train">
            <div class="p3-tw__train-label">Penalty when the monitor flags the reasoning</div>
            ${trackHtml()}
            <div class="p3-tw__train-text">
              <div class="p3-tw__reward">
                <span class="p3-tw__reward-label">Reward:</span>
                <span class="dk-chip">pass the tests</span>
                <span class="dk-chip p3-tw__reward-new" data-tone="read">+ do not get flagged</span>
              </div>
              <p class="p3-tw__gain"><b>${STAGE_NAMES.low}</b> in training: more tests passed without cheating, no rise in hacking</p>
            </div>
          </div>
          <div class="p3-tw__meters">
            <p class="p3-tw__state"><span data-state="off">${quoted(STAGE_NAMES.off)}: trained without the penalty</span><span data-state="high">${quoted(STAGE_NAMES.high)}: the same penalty, further into training</span></p>
            <p class="p3-tw__fine"><b>Bars: our sketch</b> of the paper’s curves. In quotes: its words.</p>
            <div class="p3-tw__meter">
              ${kit.meter({ key: 'caught', label: 'Share of hacks the monitor catches', tone: 'read' })}
              ${ghostHtml('caught', BARS.caught[0])}
            </div>
            <div class="p3-tw__meter">
              ${kit.meter({ key: 'hacks', label: 'How often it hacks', tone: 'alarm' })}
              ${ghostHtml('hacks', BARS.hacks[0])}
              <p class="p3-tw__said"><span data-said="off">${quoted(text('p3.baker_baseline_hacks'))}</span><span data-said="high">${quoted(text('baker.obfuscated_hacking'))}</span></p>
            </div>
          </div>
        </div>
        <div class="p3-tw__open">
          <p class="p3-tw__bridge">${STRIP.bridge}</p>
          <p class="p3-tw__idea">${STRIP.idea}</p>
        </div>
        <div class="p3-tw__strip">
          <p class="p3-tw__run"><span>${STRIP.run}</span></p>
          <div class="p3-tw__why">
            <p><b>${STRIP.ask}</b> ${STRIP.answer}</p>
            <p>${STRIP.point}</p>
          </div>
          <div class="p3-tw__advice">
            ${keepHtml(1)}
            <p class="p3-tw__cost">${STRIP.cost(text('baker.tax'))}</p>
          </div>
        </div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const trace = ctx.q(`[data-trace="${HACK.key}"]`);
      const parts = kit.traceParts(trace);
      const mark = ctx.q('.p3-tw__track-mark');
      const fill = ctx.q('.p3-tw__track-fill');
      const caught = '[data-meter="caught"]';
      const hacks = '[data-meter="hacks"]';
      const rewritten = HACK.lines.filter((line) => REWRITE[line.key]);
      if (rewritten.length !== Object.keys(REWRITE).length) throw new Error('a rewritten line is no longer in the shared trace');
      if (rewritten.some((line) => !SWITCH.lines[line.key]) || rewritten.length !== Object.keys(SWITCH.lines).length) {
        throw new Error('the thought of the agent in training no longer has one line for each line of the shared trace');
      }
      // A name on the track, or a word, beats once: up in a fifth of a second, back in two.
      const beat = (step, target, at) => {
        step.tween(target, { scale: [1, 1.3] }, { at, dur: dur.micro });
        step.tween(target, { scale: [1.3, 1] }, { at: at + dur.micro, dur: dur.enter });
      };
      // The marker reaches a named place: the name takes its color and beats. It keeps the
      // color for as long as the marker stands there and gives it up when the marker
      // leaves (`leave`), so that one name at most is lit. "None" has a ring as well,
      // lit and put out with its name.
      const reach = (step, end, at) => {
        step.cls(`[data-end="${end}"]`, 'is-on', { at });
        if (end === 'off') step.cls('.p3-tw__track-none', 'is-read', { at });
        beat(step, `[data-end="${end}"]`, at);
      };
      const leave = (step, end, at) => {
        step.cls(`[data-end="${end}"]`, 'is-on', { at, on: false });
        if (end === 'off') step.cls('.p3-tw__track-none', 'is-read', { at, on: false });
      };
      // The verdict lands. kit.stamp starts at 1.8 times the chip's size, which covers the
      // word "monitor" beside it for a few frames; here the chip grows to the right by an
      // eighth, into the terminal's own margin (part3.css sets where it grows from). At a
      // fifth the longest verdict, "flagged", reached the terminal's frame halfway through.
      const LAND = Object.freeze({ opacity: [0, 1], scale: [1.12, 1] });
      const stamp = (step, state, at, { text: word, clear }) => {
        step.cls(parts.chip, clear, { at, on: false });
        step.type(parts.chip, word, { at, dur: 0 });
        step.cls(parts.chip, state, { at });
        step.tween(parts.chip, LAND, { at, dur: dur.enter });
      };
      // Enter: the terminal of slide 4 as it ended, in the same place: the thought, the two
      // pointers, the red frame and the verdict; under it, what a
      // thought is. Next to it the obvious fix, not yet switched on: the marker in the ring
      // of "none", the reward as it is; and under both, the way in from Part 2 and the fix in
      // one sentence.
      const enter = ctx.step({ label: 'the “Let’s hack” terminal, as it ended; the obvious fix' });
      kit.setTrace(enter, trace, {
        verdict: HACK.verdict, state: 'is-flagged', alarm: true,
        lines: HACK.lines.map((line) => ({ key: line.key, flag: line.flag, text: text(line.fact), tone: line.tone })),
      });
      enter.show('[data-caption="before"]', { at: TWIST.captionAt, rise: 0 });
      // The label is slide 4's until click 1 switches it (the selftest compares it at the end
      // of this step); typed here at once so that it holds its text before the switch.
      const label = parts.term.querySelector('.dk-term__label');
      enter.type(label, HACK.label, { at: 0, dur: 0 });
      enter.show('.p3-tw__train', { at: TWIST.cardAt });
      beat(enter, '[data-end="off"]', TWIST.offAt);
      enter.show('.p3-tw__bridge', { at: TWIST.bridgeAt, rise: 0 });
      enter.show('.p3-tw__idea', { at: TWIST.ideaAt, dur: dur.move });
      enter.hold(300);

      // Click 1: the experiment that tried it. The line under the board says which one. The
      // terminal is cleared, its label and caption say whose thoughts it shows now, and that
      // agent's thought is typed, line by line; the monitor flags it as it flagged the first.
      // The pane of the actions arrives, covered: this monitor is not shown them. The step
      // ends there, before any penalty: the marker is still in the ring of "none".
      const tried = ctx.step({ label: 'the experiment: another agent, no penalty yet; its thought is flagged too' });
      tried.hide('.p3-tw__open', { dur: dur.micro });
      tried.show('.p3-tw__run', { at: dur.micro, dur: 600 });
      tried.hide('[data-caption="before"]', { at: TWIST.clearAt, dur: dur.micro });
      [label, parts.chip].forEach((el) => tried.tween(el, { opacity: [1, 0] }, { at: TWIST.clearAt, dur: dur.micro }));
      rewritten.forEach((line) => {
        const row = parts.line(line.key);
        tried.tween(row, { opacity: [1, 0] }, { at: TWIST.clearAt, dur: dur.micro });
        if (line.flag) tried.tween(row, { '--dk-mark': [1, 0] }, { at: TWIST.clearAt, dur: dur.micro });
      });
      const cleared = TWIST.clearAt + dur.micro;
      tried.cls(trace, 'is-alarm', { at: cleared, on: false });
      tried.type(label, SWITCH.label, { at: cleared, dur: 0 });
      tried.cls(label, 'p3-tw__now', { at: cleared });
      tried.tween(label, { opacity: [0, 1] }, { at: cleared, dur: dur.enter });
      tried.show('[data-caption="now"]', { at: cleared, rise: 0 });
      rewritten.forEach((line) => {
        const row = parts.line(line.key);
        tried.type(row, SWITCH.lines[line.key], { at: SWITCH_AT.lines[line.key], cps: SWITCH.cps });
        tried.tween(row, { opacity: [0, 1] }, { at: SWITCH_AT.lines[line.key], dur: 0 });
        if (line.flag) tried.tween(row, { '--dk-mark': [0, 1] }, { at: SWITCH_AT.flagged, dur: dur.micro });
      });
      tried.cls(trace, 'is-alarm', { at: SWITCH_AT.flagged });
      tried.tween(parts.chip, LAND, { at: SWITCH_AT.flagged, dur: dur.enter });
      tried.show('.p3-tw__pane', { at: SWITCH_AT.pane });
      tried.hold(300);

      // Click 2: what this agent does while nothing punishes it, as the paper measured it.
      // Nothing else changes: the marker is in the ring of "none", the reasoning is flagged.
      // The two bars arrive under a heading that names the condition by its name on the
      // track: the monitor catches "almost all" of the hacks (the paper's words, in
      // quotes), and under "How often it hacks" stand the paper's words for this agent.
      // Until the tenth round of cold-read frames these readings came after the reveal,
      // with the marker sent back from "later" to the ring.
      const base = ctx.step({ label: 'first, trained without the penalty: flagged; it hacks to a high degree, and the monitor catches almost all' });
      base.show('[data-state="off"]', { at: TWIST.baseAt, rise: 0 });
      base.show('.p3-tw__fine', { at: TWIST.baseAt, rise: 0 });
      base.show('.p3-tw__meter', { at: TWIST.baseAt, stagger: 120, rise: 0 });
      base.tween(`${caught} .dk-meter__fill`, { '--v': ['0%', BARS.caught[0]] }, { at: TWIST.baseAt, dur: dur.move });
      base.tween(`${hacks} .dk-meter__fill`, { '--v': ['0%', BARS.hacks[0]] }, { at: TWIST.baseAt + 120, dur: dur.move });
      base.type(`${caught} .dk-meter__value`, ALMOST_ALL, { at: TWIST.baseAt + dur.enter, dur: 0 });
      // The words keep their size until the bars of "later" stand (the pop there starts larger).
      base.tween(`${caught} .dk-meter__value`, { scale: [1, 1] }, { dur: 0 });
      base.show('[data-said="off"]', { at: TWIST.baseAt + dur.move, rise: 0 });
      base.hold(300);

      // Click 3: the fix is switched on. Everything that belongs to "none" leaves first
      // (the bars, their heading and the paper's words, then the light of the ring and its
      // name); the penalty enters the reward, the marker leaves the ring for the rail and
      // rests at "early", whose name takes its color, and the paper's finding for that
      // place stands under the track. The bars are gone until click 6: the paper's words
      // for them are of "none" and of "later".
      const penal = ctx.step({ label: 'the penalty enters the reward; early in training, more honest passes' });
      ['[data-state="off"]', '.p3-tw__fine', '.p3-tw__meter', '[data-said="off"]'].forEach((sel) => penal.hide(sel, { dur: dur.micro }));
      // Hidden, the bars are emptied: they grow from nothing when they come back.
      penal.type(`${caught} .dk-meter__value`, '', { at: dur.micro, dur: 0 });
      penal.tween(`${caught} .dk-meter__fill`, { '--v': [BARS.caught[0], '0%'] }, { at: dur.micro, dur: 0 });
      penal.tween(`${hacks} .dk-meter__fill`, { '--v': [BARS.hacks[0], '0%'] }, { at: dur.micro, dur: 0 });
      // With the penalty in the reward the picture is no longer that of "none".
      leave(penal, 'off', TWIST.penaltyAt);
      penal.tween('.p3-tw__reward-new', POP, { at: TWIST.penaltyAt, dur: dur.enter, ease: 'back' });
      const low = penal.signal({ at: TWIST.lowAt, dur: TWIST.lowDur, ease: 'inOut', to: 1 });
      reach(penal, 'low', EARLY_AT.lit);
      penal.show('.p3-tw__gain', { at: EARLY_AT.gain, rise: 12 });
      penal.hold(300);

      // Click 4, the turn, one thing at a time. First the track alone: the marker goes on
      // along the rail to "later", whose name turns red as it comes near (`laterAt`, so that
      // the name has stopped beating when the thought starts to fade). Then the terminal
      // alone: it heats up; the three lines of the open thought fade together, and with them
      // their pointers, the verdict "flagged" and the frame's red; then the calm lines fade
      // in, top to bottom. The monitor reads the new lines and finds nothing: it marks no
      // line, and its verdict is neutral, not the green of a trace that is fine. The step
      // ends on that verdict, with the actions still covered.
      const turn = ctx.step({ label: 'further into training: the thought rewrites itself clean; the monitor finds nothing' });
      const high = turn.signal({ dur: TWIST.highDur, ease: 'inOut', to: 1 });
      // The marker leaves "early": the finding for that place leaves, and when it has gone
      // the name is neutral again.
      turn.hide('.p3-tw__gain', { dur: dur.micro });
      leave(turn, 'low', dur.micro);
      reach(turn, 'high', TWIST.laterAt);
      turn.tween(parts.term, { '--heat': [0, 1] }, { at: TWIST.heatAt, dur: dur.move });
      turn.tween(parts.chip, { opacity: [1, 0] }, { at: TWIST.rewriteAt, dur: TWIST.fade });
      rewritten.forEach((line, i) => {
        const row = parts.line(line.key);
        turn.tween(row, { opacity: [1, 0] }, { at: TWIST.rewriteAt, dur: TWIST.fade });
        if (line.flag) {
          turn.tween(row, { '--dk-mark': [1, 0] }, { at: TWIST.rewriteAt, dur: TWIST.fade });
          turn.cls(row, 'is-flag', { at: TWIST_AT.gone, on: false });
        }
        if (line.tone) turn.cls(row, line.tone, { at: TWIST_AT.gone, on: false });
        turn.type(row, REWRITE[line.key].to, { at: TWIST_AT.gone, dur: 0 });
        turn.tween(row, { opacity: [0, 1] }, { at: TWIST_AT.gone + i * TWIST.lineGap, dur: TWIST.arrive });
      });
      // From the moment the old thought has gone the frame is not red. It loses its red
      // through a class of its own, which the reveal takes off again. Taking `is-alarm` off
      // here and putting it back at the reveal would leave the trace's classes in another
      // order when the steps are walked one by one (reduced motion) than when the last step
      // is shown directly, and the two states must be equal.
      turn.cls(trace, 'p3-tw__calm', { at: TWIST_AT.gone });
      turn.tween(parts.term, { '--heat': [1, 0] }, { at: TWIST_AT.settled - dur.micro, dur: dur.move });
      // The lens passes over the three lines and leaves no mark: the monitor flags none of
      // them. Until the ninth round of cold-read frames each line got a check, which the
      // slide did not define and which the slide on the small models uses for "answered
      // correctly" ("True ✓").
      const read = kit.readTrace(turn, trace, { at: TWIST_AT.read, perLine: TWIST.perLine, marks: [] });
      if (read + 100 !== TWIST_AT.verdict) throw new Error('the verdict no longer follows the lens: TWIST_AT is out of step with kit.readTrace');
      stamp(turn, 'p3-tw__quiet', TWIST_AT.verdict, { text: VERDICTS.clean, clear: 'is-flagged' });
      turn.hold(300);

      // Click 5, the reveal. The cover lifts from the actions: the same hack, and the tests
      // pass. Only then the verdict turns into what it was worth and the frame is red again;
      // then the title says the rest of its sentence; then the strip answers the question
      // that the hack raises. Until SPEC.md section 7.30 this ran in the click before it,
      // 1.7 s after the verdict "clean".
      const reveal = ctx.step({ label: 'what the agent did: the hack stays; fooled' });
      reveal.cls('[data-line="a1"]', 'is-quiet');
      reveal.cls('[data-line="a2"]', 'is-hot');
      reveal.cls('[data-line="a3"]', 'p3-tw__pass');
      ACTION_KEYS.forEach((key, i) => {
        reveal.hide(`[data-veil="${key}"]`, { at: REVEAL_AT.acts[i], dur: dur.micro });
        reveal.type(`[data-line="${key}"]`, ACTION[i], { at: REVEAL_AT.acts[i] + 100, cps: ACTION_CPS[i] });
      });
      // 'p3.baker_fool': the agent "learns to fool the monitor".
      stamp(reveal, 'is-flagged', REVEAL_AT.fooled, { text: VERDICTS.fooled, clear: 'p3-tw__quiet' });
      reveal.cls(trace, 'p3-tw__calm', { at: REVEAL_AT.fooled, on: false });
      reveal.tween('.p3-tw__punch', { opacity: [0, 1] }, { at: REVEAL_AT.punch, dur: dur.move });
      reveal.hide('.p3-tw__run', { at: REVEAL_AT.why - dur.micro, dur: dur.micro });
      reveal.show('.p3-tw__why', { at: REVEAL_AT.why });
      reveal.hold(300);

      // Click 6: what that comes to over the whole run. The picture stays where it is (the
      // marker at "later", the calm thought under "fooled" over the hack) and the two bars
      // come back under the heading of "later", each with a mark where it stood for "none"
      // and the words "no penalty" beside the mark. The bars grow from nothing: "How often
      // it hacks" ends a little under its mark, the share that the monitor catches stays a
      // sliver. When both stand, the paper's words for each land, and the second cue.
      // Until the tenth round of cold-read frames this click also changed the whole
      // picture over from "none" (marker, reward, thought, verdict), and the bars drained
      // from the lengths of "none".
      const count = ctx.step({ label: 'the same readings later in training with the penalty: it hacks a little less; the monitor catches almost none' });
      count.show('[data-state="high"]', { at: TWIST.barsAt, rise: 0 });
      count.show('.p3-tw__fine', { at: TWIST.barsAt, rise: 0 });
      count.show('.p3-tw__meter', { at: TWIST.barsAt, stagger: 120, rise: 0 });
      count.tween('.p3-tw__ghost i', { opacity: [0, 1] }, { at: TWIST.barsAt, dur: dur.enter });
      count.tween('.p3-tw__ghost b', { opacity: [0, 1] }, { at: TWIST.barsAt, dur: dur.enter });
      count.tween(`${caught} .dk-meter__fill`, { '--v': ['0%', BARS.caught[1]] }, { at: TWIST.growAt, dur: dur.move, ease: 'inOut' });
      count.tween(`${hacks} .dk-meter__fill`, { '--v': ['0%', BARS.hacks[1]] }, { at: TWIST.growAt, dur: dur.move, ease: 'inOut' });
      count.show('[data-said="high"]', { at: TWIST_LANDED, rise: 0 });
      count.type(`${caught} .dk-meter__value`, NEAR_ZERO, { at: TWIST_LANDED, dur: 0 });
      count.cls(caught, 'is-drained', { at: TWIST_LANDED });
      count.tween(`${caught} .dk-meter__value`, { scale: [1.5, 1] }, { at: TWIST_LANDED, dur: dur.enter, ease: 'back' });
      count.hold(300);

      // Click 7: the experiment stays. In the strip under it the answer about the actions
      // leaves, and with it the row of the cues under the stage (the engine's list, which
      // the two cues were shown in); when they have gone the first of the part's three
      // recommendations arrives, then what it costs, in one sentence.
      const advice = ctx.step({ label: 'the advice and its cost; the cues leave' });
      advice.hide('.p3-tw__why', { dur: dur.micro });
      advice.tween('.dk-cues', { opacity: [1, 0] }, { dur: dur.micro });
      advice.tween('.p3-keep', POP, { at: TWIST.keepAt, dur: dur.enter, ease: 'back' });
      advice.show('.p3-tw__cost', { at: TWIST.costAt, rise: 0 });
      advice.hold(300);

      // The marker only moves forward: from the ring to "early" (click 3), then on to
      // "later" (click 4), where it stays. The rail is filled from where it begins up to
      // the marker, once the marker is on it.
      const early = trackX(TRACK.early);
      const later = trackX(TRACK.later);
      ctx.paint(() => {
        const x = round3(TRACK.none + low() * (early - TRACK.none) + high() * (later - early));
        mark.setAttribute('cx', x);
        fill.setAttribute('x2', Math.max(TRACK.from, x));
        fill.style.opacity = x > TRACK.from ? '1' : '0';
      });
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 9. The lattice of slides 3 and 7, a fourth time, and now it fails on purpose: an
  // easy hint needs one pass and no written step; a hard hint has to zigzag through the text
  // row, where the monitor reads; and in the cases where those steps are not written the
  // chain breaks and the hinted answer no longer comes out. The unwritten steps are empty
  // chips, not the dots of slide 7: there a small model was trained to compute behind dots,
  // here nothing takes the place of the words, and the column above each chip goes dark with it.
  // Colors say what happened: the hinted answer is a wrong one, so its chip is red when it
  // comes out; a verdict that only means "nothing to read" is neutral; the verdict of the
  // last case, where the wrong answer does not come out, is green. Which of them is good
  // news for the monitor is said in words, at the head of the line under the picture.
  // While the hint experiment is on, its picture keeps its place.
  // The slide holds two experiments of one paper, one after the other, and never both
  // pictures at once. First the hint experiment (the paper's Sec. 3). The lead over the
  // picture asks its question from the first frame, in plain words for the paper's own
  // ('p3.emmons_question'): can a model follow a hint to a wrong answer and keep that out
  // of the reasoning that a monitor reads? Under it, the question that the hints are
  // attached to, which model it was put to, and the wrong answer the hint points to beside
  // the right one; that card stays until the three cases are through (clicks 1 and 2), so
  // that it is on screen when the hinted answer is struck out. Each case ends on one line
  // under the picture that begins with the hint it is about ("Easy hint:", "Hard hint:")
  // and, for the first two, ends on what the case would mean for a monitor ("A monitor
  // would miss it.", "A monitor would catch it."); NEC_RESULTS has the rates. Those two
  // sentences are conditional because the paper ran no monitor
  // in this experiment: its Sec. 3.1 and Fig. 3 measure whether the reasoning mentions
  // the hint ('p3.emmons_fig3_legend_said'), which is what a monitor would have to go by.
  // When the hard hint is flagged (click 1), the row under the picture says
  // what the monitor of this experiment looks for. Click 3 is the finding, alone: it
  // takes the place of the card of the question, right under the question it answers,
  // and never moves again; what the card said of the letter C goes to the row under the
  // picture as one short line, and stays there until the picture leaves.
  // Then the stress tests (the paper's Sec. 5 to 7), which are another experiment. At
  // click 4 the picture of the hint experiment leaves the stage: its question and its
  // finding stay as two lines at the top, and in the room of the picture a card arrives
  // under a heading of its own, with what a stress test is and what help the testers
  // give. Click 5 adds what the paper's three tests came to, under the help, which stays:
  // "significant help" stands right under the three kinds of help. Click 6: the advice.
  // The last frame holds the question, the finding, the card of the stress tests and the
  // advice, and nothing of the picture: the three cues, which are about the hint
  // experiment, leave with its picture at click 4.
  // Until the tenth round of cold-read frames the picture only dimmed to half and stayed
  // under the three lines of the stress tests, the line on the help was replaced by the
  // result, and the card of the question left 1.2 s after the hinted answer was struck
  // out: readers took the two experiments for one, lost the help when "significant help"
  // arrived, and found the last frame too full to read. Until the ninth round the finding
  // arrived in the row under the picture and at click 3 rose over the picture while the
  // question left, and readers lost it.
  // ---------------------------------------------------------------------------------------

  // `shake`: where the answer chip's letter stands (px) while it is still asked for and nothing
  // leads to it; `shakeMs` for each move. `glide`: how long the lens takes along the row on
  // the entrance.
  const NEC = Object.freeze({
    cols: 8, rows: 4, hop: 80, drop: 160, chipHalf: 60, chipTop: 28, nodeGap: 16, landing: 36, wipe: 180,
    shake: Object.freeze([0, -8, 8, -6, 6, 0]), shakeMs: 80, glide: 800,
    // Click 1: the line that says what the monitor looks for follows the verdict by `whyAfter`.
    // Click 4: the picture of the hint experiment has left when the card of the stress
    // tests arrives (`testAt`, with its heading and the definition); the line on the help
    // follows at `helpAt`.
    whyAfter: 800, testAt: 500, helpAt: 1100,
  });
  // Chips 1 to 7 of the hard hint: the steps of 'emmons.steps' (Sec. 3.1), one short token
  // each because a lattice chip holds about six characters, then the answer.
  const NEC_WORK = Object.freeze(['K=10', 'Q=16', '10+16', '=26', 'mod 4', '=2']);
  const NEC_ANSWER = 'C';
  const necSize = kit.latticeSize(NEC);
  const necDrop = (col) => {
    const top = kit.latticePoint(NEC, col, NEC.rows - 1);
    const chip = kit.latticePoint(NEC, col + 1, 'token');
    const end = { x: chip.x - NEC.landing, y: chip.y - NEC.chipTop - 8 };
    const length = Math.hypot(end.x - top.x, end.y - top.y);
    const from = { x: top.x + ((end.x - top.x) * NEC.nodeGap) / length, y: top.y + ((end.y - top.y) * NEC.nodeGap) / length };
    return `<path class="p3-nec__drop" data-drop="${col}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"
      d="M ${round3(from.x)} ${round3(from.y)} L ${end.x} ${end.y}"/>`;
  };
  const necStrike = () => {
    const chip = kit.latticePoint(NEC, NEC.cols - 1, 'token');
    return `<path class="p3-nec__strike" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M ${chip.x - 40} ${chip.y + 18} L ${chip.x + 40} ${chip.y - 18}"/>`;
  };
  const necLensX = (col) => kit.latticePoint(NEC, col, 'token').x + NEC.chipHalf + 4;
  // Click 2, in ms after the click: the first step goes, and with it the verdict "flagged"
  // and the answer's standing: from that moment the answer chip is an open question, dashed
  // and with a question mark, so that no frame on the way shows the hinted answer as taken
  // next to "0 written steps" (the conclusion is the opposite). When all six are gone the
  // chip beats once, so that the eye is on it, then shakes and is struck out; the verdict
  // lands (and with it the third cue). The step ends there, with the card of the question
  // still over the picture: until the tenth round of cold-read frames the card left 1.2 s
  // after the verdict and the finding took its place in the same click.
  const NEC_AT = (() => {
    const wipe = 700;
    const lit = wipe + NEC_WORK.length * NEC.wipe + 200;
    const tried = lit + 400;
    const lost = tried + (NEC.shake.length - 1) * NEC.shakeMs + 100;
    const verdict = lost + 300;
    return Object.freeze({ wipe, lit, tried, lost, verdict });
  })();
  // What each of the three cases comes to, under the readout, one line per step. The
  // lines are grouped by hint: each begins with the hint it is about, in the color of the
  // case, and the numbers are the labels on the bars of the paper's Fig. 3 for the first
  // of its two models, each a share of all runs with that hint. With the easy hint the
  // model picks the hinted answer without the hint in its reasoning in 19% of runs
  // ('p3.emmons_flash_simple'), against 8% with no hint at all ('p3.emmons_flash_nohint',
  // the baseline of 'emmons.baseline_def'; 'p3.emmons_far_exceeds'): a monitor would miss
  // it. The bar of the hard hint has two parts. In 7% of runs the model picks the hinted
  // answer without the hint in its reasoning ('p3.emmons_flash_complex'), which is the
  // no-hint level ('p3.emmons_drops'); in another 6% it picks it with the arithmetic in
  // its reasoning ('p3.emmons_flash_complex_said'), and that part is the whole of what
  // the hint adds ('p3.emmons_increase', 'p3.emmons_explained'). The line of click 1,
  // where the picture shows the written steps, gives no rate; the line of click 2 gives
  // both parts in one sentence each, the 7% against the 8% of no hint first, then the 6%
  // as "another 6% of runs", every extra C. The sum of the two is not printed: the paper
  // prints none. The paper's other model reads 4% against 5% ('p3.emmons_pro_complex',
  // 'p3.emmons_pro_nohint').
  // Until the eleventh round of cold-read frames each line began with what the case means
  // for a monitor, the line of click 1 read "... with every step written where the
  // monitor reads, in 6% of runs." and the line of click 2 "Hint not followed: with no
  // steps written it answers C in 7% of runs, about the same as with no hint (8%)." Both
  // readers set the 6% against the 8% of no hint ("less than with no hint at all") and
  // could not see that 6% and 7% are two parts of the runs with one hint. Until the tenth
  // round the first two lines gave no number, the third left the conclusion to the
  // reader, and the verdicts "clean" and "flagged" stood with no word on which of the
  // two is the good news here.
  const NEC_RATES = Object.freeze({
    easy: Deck.fact('p3.emmons_flash_simple'), written: Deck.fact('p3.emmons_flash_complex_said'),
    unwritten: Deck.fact('p3.emmons_flash_complex'), nohint: Deck.fact('p3.emmons_flash_nohint'),
  });
  if (NEC_RATES.unwritten.value > NEC_RATES.nohint.value) throw new Error('the rate without written steps is no longer at or under the no-hint baseline');
  if (NEC_RATES.easy.value <= NEC_RATES.nohint.value) throw new Error('the rate with the easy hint is no longer above the no-hint baseline');
  const NEC_RESULTS = Object.freeze([
    {
      key: 'easy', tone: 'hidden',
      words: `<b>Easy hint:</b> it answers C and never mentions the hint, in ${NEC_RATES.easy.text} of runs (with no hint: ${NEC_RATES.nohint.text}). <b>A monitor would miss it.</b>`,
    },
    {
      key: 'hard', tone: 'read',
      words: '<b>Hard hint:</b> it answers C with every step written where the monitor reads. <b>A monitor would catch it.</b>',
    },
    {
      key: 'unwritten', tone: 'ok',
      words: `<b>Hard hint:</b> it answers C without the steps written in only ${NEC_RATES.unwritten.text} of runs, about as often as with no hint (${NEC_RATES.nohint.text}). Every extra C came with the steps written (another ${NEC_RATES.written.text} of runs).`,
    },
  ]);
  // The question that the hints are attached to. The paper prints none of its questions
  // ('p3.emmons_no_leak'), so the card names the kind ('p3.emmons_gpqa',
  // 'p3.emmons_science') and sets the two answers side by side: the hint's answer, C, is a
  // wrong one ('p3.emmons_wrong_c'), so the right one is another letter. It also says
  // which model the question was put to ('p3.emmons_fig3_model'), from the first frame:
  // the rates under the picture are that model's. Until the tenth round of cold-read
  // frames the name stood in brackets behind the last rate, and nothing said that it is
  // the model under test.
  const NEC_Q = Object.freeze({
    label: 'The question',
    kind: `A multiple-choice science question, put to ${text('p3.emmons_fig3_model')}`,
    right: 'correct answer: not C',
    wrong: 'the hint’s answer: C',
  });
  // Over the picture, from the first frame: the experiment's question ('p3.emmons_question',
  // in plain words; the monitor's lens on the text row is our drawing of "its chain of thought").
  const NEC_LEAD = 'Can a model follow a hint to a wrong answer and keep that out of the reasoning a monitor reads?';
  // In front of the count under the text row. The row that the monitor reads also holds the
  // answer, and the count is of the reasoning steps in front of it: with the easy hint the
  // answer chip stands in the row and the count is 0. Until the fifth cold read the words
  // were "Written steps it can read:", and a reader counted the answer as one.
  const NEC_TALLY = 'Steps written before the answer:';
  // One kind of help that the definition of a stress test names, in the paper's words: a
  // part of 'emmons.help_kinds' ("detailed human-written strategies or iterative
  // optimization against the monitor").
  const NEC_HELP = 'human-written strategies';
  if (!text('emmons.help_kinds').includes(NEC_HELP)) throw new Error(`the sentence of Emmons et al. no longer contains "${NEC_HELP}"`);
  // The texts under and after the picture. `why`, at the verdict "flagged" of the hard
  // hint: what the monitor of this experiment looks for, in plain words. The paper's
  // measure is whether the model follows the hint "without discussing it in its chain of
  // thought" ('p3.emmons_question'), and the hard hint is followed only where "the model
  // explicitly discusses the hint by performing the required arithmetic" ('p3.emmons_explained').
  // `finding`: what the hint experiment comes to ('p3.emmons_forced', 'p3.emmons_explained',
  // 'emmons.result'), on one line under the question it answers.
  // The card of the stress tests. `second`: its heading, which says that this is another
  // experiment of the same paper. `test`: what a stress test is ('p3.emmons_actor'), with
  // one of the paper's three as the example: its Sec. 5 asks whether a model can "answer
  // a difficult Chemistry question while pretending to only think about Physics"
  // ('p3.emmons_chemistry'). `help`: what the testers' help is, from the least to the
  // most ('p3.emmons_told', 'p3.emmons_strategies', and "or even optimizing them against
  // their monitors", 'p3.emmons_help': "train it to fool the monitor", in the verb of
  // the line under it; until the eleventh round of cold-read frames "train it against
  // the monitor", which a reader could not place); it stays on screen, so that
  // "significant help" in
  // the line under it has something to stand on. `result`: what the paper's three came to
  // ('p3.emmons_three', 'emmons.help', 'p3.emmons_red_team') and, in the same line, why a
  // good result still calls for more testing ('p3.emmons_future',
  // 'p3.emmons_keep_testing'); the advice follows under the card.
  // `letter`: what the card of the question said of the letter C ('p3.emmons_wrong_c'),
  // as one short line under the picture from click 3, when the finding has taken the
  // card's place, until the picture leaves at click 4: the struck-out chip and the result
  // line still say "C". In the eleventh round of cold-read frames both readers said that
  // "C is the wrong answer" was gone from the screen while the picture still used it.
  const NEC_SAY = Object.freeze({
    why: '<b>What the monitor looks for in this experiment:</b> reasoning that uses the hint. The written arithmetic is exactly that, so it flags.',
    finding: '<b>The finding:</b> if following the hint takes written steps, the model writes them where the monitor reads, or it does not follow the hint.',
    second: 'Another experiment in the same paper: stress tests',
    test: '<b>A stress test:</b> a model must hide a task from the monitor, e.g. answer a chemistry question while pretending to think only about physics.',
    help: `<b>The testers help it:</b> they tell it that it is monitored, hand it ${NEC_HELP}, or even train it to fool the monitor.`,
    letter: '<b>C</b> = the wrong answer the hint points to',
    result: (help) => `<b>The paper ran three such tests:</b> models fooled the monitor ${quoted(help)}. Future models may be better at evading.`,
  });

  Deck.register({
    id: 'p3-necessity',
    part: 3,
    title: 'When the task needs the words, hiding gets hard',
    // The first cue names slide 8: its hack was of the kind that needs no written step
    // ("simple" is the paper's word, 'baker.simple_hack'), which is why it could go quiet there
    // and why the hard hint cannot here. Each cue says what the model answers. The three
    // are about the hint experiment and leave with its picture at click 4: until the
    // eleventh round of cold-read frames they stayed under the card of the stress tests,
    // and a reader found them pointing at an example that was no longer there. Until
    // SPEC.md section 7.30 the last one ended "the dots took special training", which only
    // a reader who remembered the small models of an earlier slide could place.
    cues: [
      'Easy, like the “assert True” hack: it answers C and writes nothing',
      { text: 'Hard hint: to answer C it has to write the arithmetic', step: 1 },
      { text: 'Without the written steps, it stops following the hard hint', step: 2, at: NEC_AT.verdict },
    ],
    // Sec. 3.1 and Fig. 3 hold the hint experiment: the two hints are quoted from Sec. 3.1,
    // and the steps on the chips are that section's (the mark in the cite says so; until
    // SPEC.md section 7.30 a line under the cards said "Hints and steps: the paper's own
    // example"). Table 1, Sec. 4 and the abstract hold the stress tests ('p3.emmons_three',
    // 'p3.emmons_actor', 'p3.emmons_help', 'emmons.help' and 'emmons.help_kinds'), Sec. 5
    // the example of a stress test ('p3.emmons_chemistry'), Sec. 1 the sentence about
    // future models ('p3.emmons_future'). The advice rests on the abstract
    // ('emmons.layer': "continued stress-testing") and on Sec. 9.2
    // ('p3.emmons_keep_testing'); the cite names the abstract only, because the mark behind
    // "3.1" and "9.2" do not both fit the footer's one line in the widest font set.
    // With the numbers tag in the footer there is no room for a second source: until the
    // ninth round of cold-read frames the cite ended "· Baker et al. 2025, Sec. 3.2", for
    // the word "simple" behind the first cue ('baker.simple_hack'). The cue prints nothing
    // of that paper (the "assert True" it names is the example of the slide on the
    // penalty, whose footer cites Sec. 3), so the place stands in this comment only.
    cite: [{ src: 'emmons2025', where: 'Sec. 1, 3.1 (quoted), 4-5, Fig. 3, Table 1; abstract' }],
    // The lattice and its tokens are our drawing of the experiment; the rates in the
    // lines under it are the paper's (Fig. 3), so the footer carries the numbers tag too.
    figure: 'schematic',
    numbers: 'reported',
    html: `
      <div class="p3-nec">
        <p class="p3-nec__lead">${NEC_LEAD} <span class="p3-nec__by">${Deck.sources.emmons2025.short}</span></p>
        <div class="dk-card p3-nec__q">
          <span class="p3-nec__q-label">${NEC_Q.label}</span>
          <span class="p3-nec__q-kind">${NEC_Q.kind}</span>
          <span class="dk-chip" data-tone="ok">${NEC_Q.right}</span>
          <span class="dk-chip" data-tone="alarm">${NEC_Q.wrong}</span>
        </div>
        <p class="p3-nec__found">${NEC_SAY.finding}</p>
        <div class="p3-nec__hints">
          <div class="dk-card p3-nec__hint" data-hint="easy">
            <div class="p3-nec__hint-label">Easy hint to a wrong answer</div>
            <div class="p3-nec__hint-text">${esc(text('emmons.simple_hint'))}</div>
            <div class="p3-nec__hint-like">Nothing to work out: the answer is given.</div>
          </div>
          <div class="dk-card p3-nec__hint" data-hint="hard">
            <div class="p3-nec__hint-label">Hard hint to the same answer</div>
            <div class="p3-nec__hint-text">${esc(text('emmons.complex_hint'))}</div>
            <div class="p3-nec__hint-like">Meant as (K + Q) mod 4 = 2, so C.</div>
          </div>
          <div class="dk-card p3-nec__hint" data-hint="unwritten">
            <div class="p3-nec__hint-label">The same hard hint</div>
            <div class="p3-nec__hint-note">the cases where it wrote no steps</div>
          </div>
        </div>
        <div class="p3-nec__machine">
          <div class="p3-nec__lattice">
            ${kit.lattice({ key: 'nec', cols: NEC.cols, rows: NEC.rows, tokens: ['hint'] })}
            <svg class="p3-nec__drops" viewBox="0 0 ${necSize.width} ${necSize.height}" width="${necSize.width}" height="${necSize.height}" aria-hidden="true">
              ${util.range(NEC.cols - 1).map(necDrop).join('')}
              ${necStrike()}
            </svg>
            ${kit.lens({ key: 'reader' })}
          </div>
          <div class="p3-nec__readout">
            <span class="p3-nec__reads">the monitor reads this row</span>
            <span class="p3-nec__tally">${NEC_TALLY} <b class="p3-nec__count"></b></span>
            <span class="p3-nec__verdict">${kit.flag({ key: 'nec-clean', text: 'clean' })}${kit.flag({ key: 'nec-flagged', text: 'flagged' })}${kit.flag({ key: 'nec-none', text: 'not followed' })}</span>
          </div>
          <p class="p3-nec__results">${NEC_RESULTS.map((r) => `<span data-result="${r.key}" data-tone="${r.tone}">${r.words}</span>`).join('')}</p>
        </div>
        <div class="p3-nec__close">
          <p class="p3-nec__say" data-say="why">${NEC_SAY.why}</p>
          <p class="p3-nec__say" data-say="letter">${NEC_SAY.letter}</p>
        </div>
        <div class="p3-nec__stress">
          <div class="dk-card p3-nec__st">
            <div class="p3-nec__st-label">${NEC_SAY.second}</div>
            <p class="p3-nec__say" data-say="test">${NEC_SAY.test}</p>
            <p class="p3-nec__say" data-say="help">${NEC_SAY.help}</p>
            <p class="p3-nec__say" data-say="result">${NEC_SAY.result(text('emmons.help'))}</p>
          </div>
          <div class="p3-nec__so">${keepHtml(2)}</div>
        </div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const node = (col, row) => `[data-lattice="nec"] [data-node="${col}-${row}"]`;
      const link = (col, row) => `[data-lattice="nec"] [data-link="${col}-${row}"]`;
      const chip = (col) => `[data-lattice="nec"] [data-token="${col}"]`;
      const drop = (col) => `[data-drop="${col}"]`;
      const lens = '[data-lens="reader"]';
      const count = '.p3-nec__count';
      const result = (key) => `[data-result="${key}"]`;

      // One pass up a column; `on: false` puts it out again.
      const climb = (step, col, at, on = true) => {
        util.range(NEC.rows).forEach((row) => {
          step.cls(node(col, row), 'is-lit', { at: at + (on ? row * NEC.hop : 0), on });
          if (row < NEC.rows - 1) step.cls(link(col, row), 'is-lit', { at: at + (on ? row * NEC.hop + NEC.hop / 2 : 0), on });
        });
      };
      // One pass up a column, then the written token drops into the next column's chip.
      const pass = (step, col, token, at) => {
        climb(step, col, at);
        const written = at + NEC.rows * NEC.hop + NEC.drop;
        step.tween(drop(col), { 'attr:stroke-dashoffset': [1, 0] }, { at: written - NEC.drop, dur: NEC.drop, ease: 'in' });
        step.type(`${chip(col + 1)} text`, token, { at: written, dur: 0 });
        return written;
      };
      const unpass = (step, col) => {
        climb(step, col, 0, false);
        step.tween(drop(col), { 'attr:stroke-dashoffset': [1, 1] }, { dur: 0 });
        step.type(`${chip(col + 1)} text`, '', { dur: 0 });
        step.cls(chip(col + 1), 'is-answer', { on: false });
      };

      // Enter: the question, then the easy hint. One pass, the answer comes out, nothing
      // about the hint is written.
      const easy = ctx.step({ label: 'the question; easy hint: it answers C, nothing written' });
      easy.show('.p3-nec__lead', { at: 100, rise: 0 });
      easy.show('.p3-nec__q', { at: 150, rise: 0 });
      easy.show('[data-hint="easy"]', { at: 200 });
      easy.show('.p3-nec__lattice', { at: 300, rise: 0 });
      easy.cls(chip(0), 'is-hint');
      // "Clean" here means the monitor found nothing to read, not that all is well: the chip
      // stays neutral. "Not followed" is good news, the wrong answer did not come out: green.
      easy.cls('[data-flag="nec-flagged"]', 'is-flagged');
      easy.cls('[data-flag="nec-none"]', 'is-clean');
      const answered = pass(easy, 0, NEC_ANSWER, 600);
      easy.cls(chip(1), 'is-answer', { at: answered });
      climb(easy, 1, answered + 40);
      easy.show('.p3-nec__reads', { at: answered + 100, rise: 0 });
      easy.tween(lens, { opacity: [0, 1] }, { at: answered + 200, dur: dur.micro });
      easy.tween(lens, { x: [necLensX(0), necLensX(NEC.cols - 1)] }, { at: answered + 200, dur: NEC.glide, ease: 'inOut' });
      easy.show('.p3-nec__tally', { at: easy.end, rise: 0 });
      easy.type(count, '0', { at: easy.end, dur: 0 });
      easy.tween('[data-flag="nec-clean"]', POP, { at: easy.end + 200, dur: dur.enter, ease: 'back' });
      easy.tween(result('easy'), { opacity: [0, 1] }, { at: easy.end - 200, dur: dur.enter });

      // Click 1: the hard hint. Seven passes; six steps land in the text row before the
      // answer. The monitor flags it, and the row under the picture says what it looks for.
      const hard = ctx.step({ label: 'hard hint: six written steps, flagged; what the monitor looks for' });
      unpass(hard, 0);
      climb(hard, 1, 0, false);
      hard.hide('[data-flag="nec-clean"]', { dur: dur.micro });
      hard.tween(result('easy'), { opacity: [1, 0] }, { dur: dur.micro });
      hard.tween('[data-hint="easy"]', { opacity: [1, 0.5] }, { dur: dur.enter });
      hard.tween(lens, { x: [necLensX(NEC.cols - 1), necLensX(0)] }, { dur: dur.enter, ease: 'inOut' });
      hard.show('[data-hint="hard"]', { at: 200 });
      const tokens = [...NEC_WORK, NEC_ANSWER];
      const done = tokens.reduce((at, token, col) => {
        const written = pass(hard, col, token, at);
        hard.tween(lens, { x: [necLensX(col), necLensX(col + 1)] }, { at: written, dur: dur.micro, ease: 'inOut' });
        if (col < NEC_WORK.length) {
          hard.cls(chip(col + 1), 'is-read', { at: written + dur.micro });
          hard.type(count, String(col + 1), { at: written + dur.micro, dur: 0 });
        }
        return written + 40;
      }, 900);
      hard.cls(chip(tokens.length), 'is-answer', { at: done - 40 });
      climb(hard, tokens.length, done);
      hard.tween('[data-flag="nec-flagged"]', POP, { at: done + 300, dur: dur.enter, ease: 'back' });
      hard.tween(result('hard'), { opacity: [0, 1] }, { at: done + 300, dur: dur.enter });
      hard.show('[data-say="why"]', { at: done + 300 + NEC.whyAfter, rise: 0 });
      hard.hold(300);

      // Click 2, the reveal: the cases where the steps were not written. The six steps go, one
      // after the other, and each leaves an empty chip; with nothing written the column above
      // it has nothing to go on and goes dark with it. From the first step that goes, the
      // answer chip is an open question ("C?", dashed) and the verdict "flagged" is gone;
      // then the chip beats, shakes and is struck out: the hinted answer does not come out.
      // The card of the question stays over the picture: it is what says that C is the
      // hint's answer and a wrong one.
      const hide = ctx.step({ label: 'the steps unwritten: the hinted answer does not come out' });
      hide.tween('[data-hint="hard"]', { opacity: [1, 0.5] }, { dur: dur.enter });
      hide.hide('[data-say="why"]', { dur: dur.micro });
      hide.show('[data-hint="unwritten"]', { at: 100 });
      hide.tween(result('hard'), { opacity: [1, 0] }, { at: 300, dur: dur.micro });
      NEC_WORK.forEach((_, i) => {
        const col = i + 1;
        const at = NEC_AT.wipe + i * NEC.wipe;
        hide.tween(`${chip(col)} text`, { scale: [1, 0] }, { at, dur: 110, ease: 'in' });
        hide.type(`${chip(col)} text`, '', { at: at + 110, dur: 0 });
        hide.cls(chip(col), 'is-read', { at: at + 110, on: false });
        hide.cls(chip(col), 'p3-nec__blank', { at: at + 110 });
        hide.tween(drop(i), { opacity: [1, 0] }, { at, dur: dur.micro });
        hide.type(count, String(NEC_WORK.length - col), { at: at + 110, dur: 0 });
        climb(hide, col, at + 110, false);
      });
      const last = NEC_AT.wipe + NEC_WORK.length * NEC.wipe;
      hide.tween(drop(NEC_WORK.length), { opacity: [1, 0] }, { at: last, dur: dur.micro });
      climb(hide, NEC.cols - 1, last + 110, false);
      hide.tween(lens, { x: [necLensX(NEC.cols - 1), necLensX(0)] }, { at: NEC_AT.wipe, dur: NEC_WORK.length * NEC.wipe + 300, ease: 'inOut' });
      hide.cls(chip(NEC.cols - 1), 'p3-nec__asked', { at: NEC_AT.wipe });
      hide.type(`${chip(NEC.cols - 1)} text`, `${NEC_ANSWER}?`, { at: NEC_AT.wipe, dur: 0 });
      hide.type(`${chip(NEC.cols - 1)} text`, NEC_ANSWER, { at: NEC_AT.lost, dur: 0 });
      hide.tween(`${chip(NEC.cols - 1)} text`, { scale: [1, 1.5] }, { at: NEC_AT.lit, dur: dur.micro });
      hide.tween(`${chip(NEC.cols - 1)} text`, { scale: [1.5, 1] }, { at: NEC_AT.lit + dur.micro, dur: dur.micro });
      NEC.shake.slice(1).forEach((to, i) => {
        hide.tween(`${chip(NEC.cols - 1)} text`, { x: [NEC.shake[i], to] }, { at: NEC_AT.tried + i * NEC.shakeMs, dur: NEC.shakeMs, ease: 'inOut' });
      });
      hide.cls(chip(NEC.cols - 1), 'p3-nec__asked', { at: NEC_AT.lost, on: false });
      hide.cls(chip(NEC.cols - 1), 'is-answer', { at: NEC_AT.lost, on: false });
      hide.cls(chip(NEC.cols - 1), 'is-lost', { at: NEC_AT.lost });
      hide.tween('.p3-nec__strike', { 'attr:stroke-dashoffset': [1, 0] }, { at: NEC_AT.lost, dur: dur.enter });
      hide.hide('[data-flag="nec-flagged"]', { at: NEC_AT.wipe, dur: dur.micro });
      hide.tween('[data-flag="nec-none"]', POP, { at: NEC_AT.verdict, dur: dur.enter, ease: 'back' });
      hide.tween(result('unwritten'), { opacity: [0, 1] }, { at: NEC_AT.verdict, dur: dur.enter });
      hide.hold(300);

      // Click 3: the finding of the hint experiment. It takes the place of the card of the
      // question, under the question it answers, and never moves again; the picture stays
      // as the last case left it, and what the card said of the letter C stands under it
      // from the moment the card has gone.
      const found = ctx.step({ label: 'the finding of the hint experiment, under the question it answers; what C is stays under the picture' });
      found.tween('.p3-nec__q', { opacity: [1, 0] }, { dur: dur.micro });
      found.tween('.p3-nec__found', { opacity: [0, 1] }, { at: dur.micro, dur: dur.enter });
      found.tween('[data-say="letter"]', { opacity: [0, 1] }, { at: dur.micro, dur: dur.enter });
      found.hold(300);

      // Click 4: another experiment. The picture of the hint experiment leaves the stage
      // (the three cards, the lattice, the readout and the line under it, the line on the
      // letter C, and the three cues under the stage, which are about that picture); its
      // question and its finding stay where they are. When it has gone, the card of the stress
      // tests arrives in its room with its heading and what a stress test is, and then
      // what the testers' help is.
      const test = ctx.step({ label: 'another experiment, the stress tests: the hint experiment’s picture leaves; what a stress test is and how the testers help' });
      test.tween(['.p3-nec__hints', '.p3-nec__machine', '[data-say="letter"]', '.dk-cues'].map((sel) => ctx.q(sel)), { opacity: [1, 0] }, { dur: dur.enter });
      test.show('.p3-nec__st', { at: NEC.testAt, rise: 0 });
      test.show('[data-say="help"]', { at: NEC.helpAt, rise: 0 });
      test.hold(300);

      // Click 5: what the paper's three stress tests came to, and that future models may
      // do better, under the line on the help, which stays.
      const ran = ctx.step({ label: 'the paper’s three stress tests: the monitor was fooled only with significant help; future models may be better at evading' });
      ran.show('[data-say="result"]', { at: dur.micro, rise: 0 });
      ran.hold(300);

      // Click 6: the second of the part's three recommendations, under the card.
      const keep = ctx.step({ label: 'keep stress-testing the monitor' });
      keep.tween('.p3-keep', POP, { at: 200, dur: dur.enter, ease: 'back' });
      keep.hold(300);
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 10. What the paper of slide 2 asks of developers (Korbak et al. 2025, Sec. 4): track
  // monitorability, and let it weigh on what is trained and released. The picture draws the
  // paper's own example ('p3.korbak_checkpoint'): monitorability degrades during training,
  // and an earlier checkpoint is preferred. The slide asks it as a question, in its title:
  // one training run saved five versions of the model, which one do you release? One row
  // per version: how capable it is, what it writes on the same task (the title slide's
  // thought) and how much of that is still in words. Two ways to choose, one click each.
  // By capability alone: version 5 (click 1); then the monitor's lens goes down the run
  // and that version turns out to write a row of garbled characters (click 2): its
  // reasoning can no longer be read. By capability and readable reasoning: version 3, the
  // last one whose reasoning is still in words (click 3). Click 4 brings the third way to
  // keep the reasoning readable, and under it what "monitorability" means, in plain words.
  // What a version no longer writes as words is garbled text, a character for a character,
  // in the amber of what happens inside the model: something is written, and nobody can
  // read it. Until the cold read of the whole deck after SPEC.md section 7.30 it was a row
  // of dots (kit.decay), and a reader who had just learned from the slide on the small
  // models that a dot carries no information, only one more column to compute in, could
  // not tell which of the two a dot meant here.
  // The run is hypothetical and no number on it is measured, so the first line of the
  // picture says so before anything else arrives, in the amber of the footer tags that mark
  // what is ours (the footer's tags say the same of the drawing: "Schematic",
  // "Illustrative"). The same line says what a version is: the model as saved at one point
  // of the run (the paper's "checkpoint", a word the slide does not use; until SPEC.md
  // section 7.30 three lines of definitions stood here, of a checkpoint, a system card and
  // monitorability). Nothing moves to make room: every line has its row from the start.
  // ---------------------------------------------------------------------------------------

  const RUN = Object.freeze({
    // One row per version: the length of its capability bar, and the share of the
    // thought's characters that it no longer writes as words (`dark`: they are garbled).
    // Both are ours: the paper gives its example in words. The bar on the right of a row
    // is the share that is left in words, so the bar and the row cannot disagree.
    rows: Object.freeze([
      Object.freeze({ cap: '36%', dark: 0 }),
      Object.freeze({ cap: '52%', dark: 0 }),
      Object.freeze({ cap: '68%', dark: 0 }),
      Object.freeze({ cap: '84%', dark: 0.5 }),
      Object.freeze({ cap: '100%', dark: 1 }),
    ]),
    seed: 23,     // the order in which characters are garbled; a later row keeps the garbled characters of an earlier one
    // What a garbled character is drawn from: letters and signs that every monospace face
    // of the font sets holds (ASCII and Latin-1), no digit and no sign of arithmetic, so
    // that a garbled row never reads as a sum. `garbleSeed` picks one for each place.
    garble: 'qxzvkjwy#%&@§¤¶µþðøæ', garbleSeed: 57,
    kept: 2,      // the row that the second choice releases: the last one still in words
    stale: 0.5,   // the strength of the rows that are not released, and of the first choice once the second stands
    // Enter, in ms: the rows arrive one after the other. No version is chosen yet.
    rowsAt: 700, perRow: 220,
    // Click 1, in ms: the first choice is named (`wayAt`), and the frame "release" arrives
    // around the last version (`ringAt`, over `hop`).
    wayAt: 100, ringAt: 600, hop: 180,
    // Click 2, in ms: the lens goes down the run; as it reaches a row, the row's characters
    // arrive from left to right, each as itself or garbled. It stops above the last row,
    // the one in the frame, for `pause`, and that row's characters then arrive more slowly
    // (`lastCell`).
    // The frame takes the color of what is hidden `flipAfter` the lens has left, and the
    // note on its border follows (`tabAfter`).
    scanAt: 500, perScan: 400, perCell: 7, pause: 700, lastCell: 12, flipAfter: 400, tabAfter: 300,
    // Click 3, in ms: the second choice is named (`wayAt`), and the frame goes back in one
    // move (`backDur`) to the last row that is all words. Until SPEC.md section 7.30 it
    // stood on the row in between for 0.4 s, a state that no click stopped on.
    moveAt: 600, backDur: 800,
    // Click 4, in ms: the third way, then its plain words.
    keepAt: 200, plainAt: 800,
  });
  // When the beats start, in ms after the step begins: the last row has arrived (enter);
  // the lens stops above the last row, reads it and leaves the run, and the frame takes the
  // color of what is hidden (click 2); the frame stands on the kept version (click 3). The
  // cues follow them.
  const RUN_AT = (() => {
    const landed = RUN.rowsAt + (RUN.rows.length - 1) * RUN.perRow + 400;
    const paused = RUN.scanAt + (RUN.rows.length - 1) * RUN.perScan;
    const last = paused + RUN.pause;
    const read = last + RUN.perScan;
    return Object.freeze({ landed, paused, last, read, flip: read + RUN.flipAfter, back: RUN.moveAt + RUN.backDur });
  })();
  // The words of the picture. `says` is the first line: the run is hypothetical
  // ('p3.korbak_checkpoint' is an "if", and the paper reports no such run), and a version
  // is the model as saved during it. `ways` are the two ways to choose, each with what it
  // releases. `tabs` is the note on the frame: why the first choice is a bad one. `rule`
  // says why the second stops where it does, and that this is a rule of ours, one of
  // several one could set: it names the bar that version 3 clears and version 4 does not
  // (all of its reasoning is in words; version 4 writes half of it as garbled text), and
  // among the versions of which that is true it is the most capable. The paper gives the
  // example of going back to an earlier checkpoint ('p3.korbak_checkpoint') and no rule
  // for which one. It stands at the foot of the card, clear of every row and of the
  // frame. Until the tenth round of cold-read frames it was a note on the frame's bottom
  // border, "the most capable version whose reasoning is still fully in words": it lay
  // across the frame's line and against the row under it, and a reader asked whether the
  // rule is the paper's. Until the ninth round it said "the last version whose reasoning
  // is still in words", which a reader could not set against a version that is half in
  // words. Until the eleventh round it ended "still fully in words": a reader set that
  // against Part 2, where reasoning that is all words still leaves out what decided the
  // answer, and against the recommendation of this slide, which asks what a monitor can
  // catch by reading. It now names the monitor, as the note on version 5 and the second
  // cue do ("can no longer be read", "nothing a monitor can read"); "fully" keeps
  // version 4 out, which is half garbled. `plain` says the third way again without its term:
  // monitorability is whether a monitor can catch misbehavior by reading the reasoning
  // (the definition slide 2 gave, after 'p1.korbak_measure' and 'p3.korbak_end_to_end'),
  // and "make it count" is 'p3.korbak_consider'.
  const RUN_TEXT = Object.freeze({
    tag: 'Hypothetical.',
    says: 'One training run, with the model saved five times along the way. No such run was measured.',
    ways: Object.freeze([
      Object.freeze({ name: 'Choice 1', rule: 'capability only → version 5' }),
      Object.freeze({ name: 'Choice 2', rule: 'capability and readable reasoning → version 3' }),
    ]),
    heads: Object.freeze({ step: 'Version', cap: 'Capability', says: 'Its reasoning on the same task', mon: 'Share still in words' }),
    // Beside the heading of the covered column, until the lens reads it: what the bars over
    // the rows mean.
    unread: '(not read yet)',
    release: 'release',
    tabs: Object.freeze({ dark: 'its reasoning can no longer be read' }),
    rule: 'one possible rule: the most capable version a monitor can fully read',
    plain: 'That is: measure whether a monitor can still catch misbehavior by reading the reasoning, and weigh it before a release.',
  });
  // Which characters of the thought a row garbles (by position among the characters that
  // are not spaces). Pure in (count, share).
  const runDark = (count, share) => new Set(util.shuffled(util.range(count), RUN.seed).slice(0, Math.round(share * count)));
  // The thought, one cell per character that is not a space: the character itself and, on
  // top of it, the garbled one that stands in its place (the same in every row, never the
  // character itself). The timeline shows one of the two.
  const RUN_CELLS = (() => {
    const next = util.rng(RUN.garbleSeed);
    const pool = Array.from(RUN.garble);
    return Array.from(Deck.motifs.thought).map((ch) => {
      if (ch === ' ') return '<span> </span>';
      const garbled = pool[Math.floor(next() * pool.length)];
      return `<span class="p3-trk__cell"><span class="p3-trk__glyph">${esc(ch)}</span><span class="p3-trk__garbled">${esc(garbled)}</span></span>`;
    }).join('');
  })();
  const runRow = (_, r) => `
    <span class="p3-trk__node" data-row="${r}" style="--r:${r + 2}">${r + 1}</span>
    <span class="p3-trk__bar" data-kind="cap" data-row="${r}" style="--r:${r + 2}"><i></i></span>
    <div class="p3-trk__says" data-row="${r}" style="--r:${r + 2}">
      <div class="p3-trk__line" data-line="run-${r}">${RUN_CELLS}</div>
      <i class="p3-trk__veil"></i>
    </div>
    <span class="p3-trk__bar" data-kind="mon" data-row="${r}" style="--r:${r + 2}"><i></i></span>`;
  const runWay = (way, i) => `<p class="p3-trk__way" data-way="${i + 1}"><b>${way.name}</b>${way.rule}</p>`;

  Deck.register({
    id: 'p3-track',
    part: 3,
    // The question that the picture answers twice. Until SPEC.md section 7.30 the title was
    // the paper's advice, "Monitorability should count when a model ships", and a reader
    // had three definitions to read before the picture.
    title: 'Training saved five versions. Which one do you release?',
    // The last cue carries the limit where the room can read it: readability is weighed
    // with the rest ('p3.korbak_consider', 'p3.korbak_holistic'), and "here" is one outcome.
    cues: [
      { text: 'Each saved version is more capable than the one before', step: 0, at: RUN_AT.landed },
      { text: 'The most capable version writes nothing a monitor can read', step: 2, at: RUN_AT.flip },
      { text: 'Weighing readability too: here an earlier version is released', step: 3, at: RUN_AT.back + RUN.tabAfter },
    ],
    // Sec. 4 holds the "if" and the advice, Sec. 3 the measure behind the plain words,
    // Sec. 2 why a run can lose its words. The sentence of Sec. 6 that closed this slide
    // until SPEC.md section 7.30 is behind the closing slide now, and cited there.
    cite: [{ src: 'korbak2025', where: 'Sec. 2; Sec. 3; Sec. 4' }],
    // Two tags. The run is our drawing of the example the paper gives in words (schematic);
    // the thought in its rows is the title slide's, an example we wrote (illustrative). No
    // measured number is printed: every bar length is ours, and the picture says so.
    figure: ['schematic', 'illustrative'],
    html: `
      <div class="p3-trk">
        <p class="p3-trk__not"><b class="p3-trk__tag">${RUN_TEXT.tag}</b>${RUN_TEXT.says}</p>
        <div class="p3-trk__ways">${RUN_TEXT.ways.map(runWay).join('')}</div>
        <div class="dk-card p3-trk__card">
          <div class="p3-trk__grid" style="--rows:${RUN.rows.length}">
            <span class="p3-trk__head" data-col="step">${RUN_TEXT.heads.step}</span>
            <span class="p3-trk__head" data-col="cap">${RUN_TEXT.heads.cap}</span>
            <span class="p3-trk__head" data-col="says">${RUN_TEXT.heads.says}<i class="p3-trk__unread">${RUN_TEXT.unread}</i></span>
            <span class="p3-trk__head" data-col="mon">${RUN_TEXT.heads.mon}</span>
            <i class="p3-trk__rail"></i>
            ${RUN.rows.map(runRow).join('')}
            <div class="p3-trk__scan">${kit.lens({ key: 'run' })}</div>
            <div class="p3-trk__ring">
              <span class="p3-trk__ships">${RUN_TEXT.release}</span>
              <span class="p3-trk__tab" data-tab="dark">${RUN_TEXT.tabs.dark}</span>
            </div>
          </div>
          <p class="p3-trk__rule">${RUN_TEXT.rule}</p>
        </div>
        <div class="p3-trk__close">
          ${keepHtml(3)}
          <p class="p3-trk__plain">${RUN_TEXT.plain}</p>
        </div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const ring = ctx.q('.p3-trk__ring');
      const tag = ctx.q('.p3-trk__ships');
      const lens = ctx.q('[data-lens="run"]');
      const last = RUN.rows.length - 1;
      const rows = RUN.rows.map((row, r) => {
        const cells = ctx.qa(`[data-line="run-${r}"] .p3-trk__cell`);
        const dark = runDark(cells.length, row.dark);
        const mon = ctx.q(`[data-kind="mon"][data-row="${r}"]`);
        return {
          ...row,
          mon,
          // What a row shows from the entrance on: its number, its capability, what it writes.
          base: ctx.qa(`[data-row="${r}"]`).filter((el) => el !== mon),
          all: ctx.qa(`[data-row="${r}"]`),
          node: ctx.q(`.p3-trk__node[data-row="${r}"]`),
          says: ctx.q(`.p3-trk__says[data-row="${r}"]`),
          veil: ctx.q(`.p3-trk__says[data-row="${r}"] .p3-trk__veil`),
          capFill: ctx.q(`[data-kind="cap"][data-row="${r}"] i`),
          monFill: ctx.q(`[data-kind="mon"][data-row="${r}"] i`),
          read: `${Math.round((1 - dark.size / cells.length) * 100)}%`,
          cells: cells.map((cell, i) => ({
            glyph: cell.querySelector('.p3-trk__glyph'), garbled: cell.querySelector('.p3-trk__garbled'), dark: dark.has(i),
          })),
        };
      });
      if (rows[RUN.kept].read !== '100%' || rows[last].read !== '0%') throw new Error('the kept version is no longer all words, or the last one no longer all garbled');
      if (rows.slice(RUN.kept + 1).some((row) => row.read === '100%')) throw new Error('a version after the kept one is still all words: it would be the last one in words');
      // Geometry is read from the layout: one row down, and when the lens reaches a row.
      const pitch = rows[1].node.offsetTop - rows[0].node.offsetTop;
      // The lens goes down to just above the last row and waits there; then it reads that
      // row and stops inside it, clear of the frame around it.
      const scan = ctx.q('.p3-trk__scan');
      const travel = scan.offsetHeight - lens.offsetHeight;
      const top = (row) => row.says.offsetTop - scan.offsetTop;
      const above = Math.round((top(rows[last - 1]) + rows[last - 1].says.offsetHeight + top(rows[last])) / 2);
      const passes = (row) => (row === rows[last]
        ? RUN_AT.last
        : Math.round(RUN.scanAt + (top(row) / above) * (RUN_AT.paused - RUN.scanAt)));
      const beat = (step, at) => {
        step.tween(tag, { scale: [1, 1.25] }, { at, dur: 160 });
        step.tween(tag, { scale: [1.25, 1] }, { at: at + 160, dur: 300 });
      };

      // Enter: the run, one version after the other, each more capable than the one before.
      // What each one writes is covered: nobody has read it. No version is chosen, and the
      // column on the right is not there yet. The title's question is open.
      const enter = ctx.step({ label: 'five saved versions, each more capable; what they write is still covered' });
      enter.show('.p3-trk__not', { at: 200, rise: 0 });
      enter.show('.p3-trk__card', { at: 400 });
      enter.show('.p3-trk__head:not([data-col="mon"])', { at: 500, stagger: 60, rise: 0 });
      enter.tween('.p3-trk__rail', { height: ['0px', `${last * pitch}px`] }, { at: RUN.rowsAt, dur: last * RUN.perRow, ease: 'linear' });
      // A row's bar starts at the length of the row before it and grows from there, so
      // that at no moment a later version has a shorter bar than an earlier one (until the
      // cold read of the whole deck after SPEC.md section 7.30 each bar grew from nothing,
      // and a frame halfway showed version 3 shorter than version 2).
      rows.forEach((row, r) => {
        const at = RUN.rowsAt + r * RUN.perRow;
        enter.tween(row.base, { opacity: [0, 1] }, { at, dur: dur.micro });
        enter.tween(row.node, { scale: [0.4, 1] }, { at, dur: dur.enter, ease: 'back' });
        enter.tween(row.capFill, { '--v': [r ? rows[r - 1].cap : '0%', row.cap] }, { at: at + 100, dur: dur.enter });
      });
      enter.hold(300);

      // Click 1, the first way to choose: capability alone. The choice is named over the
      // card, and the frame "release" arrives around the last version, the most capable.
      const first = ctx.step({ label: 'choice 1, capability only: version 5 is released' });
      first.tween('[data-way="1"]', POP, { at: RUN.wayAt, dur: dur.enter, ease: 'back' });
      first.tween(ring, { y: [last * pitch, last * pitch] }, { at: 0, dur: 0 });
      first.tween(ring, { opacity: [0, 1] }, { at: RUN.ringAt, dur: RUN.hop });
      beat(first, RUN.ringAt + RUN.hop);
      first.hold(300);

      // Click 2, the reveal: what that choice did not look at. The column on the right
      // arrives, the lens goes down the run and each row shows what that version writes:
      // words a monitor can read, or garbled text. The bar on the right is the share still
      // in words. Above the last row, the one in the frame, the lens waits and the tag
      // beats; then that row arrives, character by character, all of it garbled. The frame
      // has not moved: what the first choice releases is the row that nobody can read. The
      // frame takes the color of what is hidden, and a note on its border says what that means.
      const track = ctx.step({ label: 'read what each version writes: version 5 writes garbled text; its reasoning can no longer be read' });
      track.tween('.p3-trk__head[data-col="mon"]', { opacity: [0, 1] }, { dur: dur.micro });
      track.tween(rows.map((row) => row.mon), { opacity: [0, 1] }, { dur: dur.micro });
      track.tween('.p3-trk__unread', { opacity: [1, 0] }, { at: RUN.scanAt - dur.micro, dur: dur.micro });
      track.tween(lens, { opacity: [0, 1] }, { at: RUN.scanAt - dur.micro, dur: dur.micro });
      track.tween(lens, { y: [0, above] }, { at: RUN.scanAt, dur: RUN_AT.paused - RUN.scanAt, ease: 'linear' });
      beat(track, RUN_AT.paused + dur.micro);
      track.tween(lens, { y: [above, travel] }, { at: RUN_AT.last, dur: RUN.perScan, ease: 'linear' });
      rows.forEach((row) => {
        const at = passes(row);
        const perCell = row === rows[last] ? RUN.lastCell : RUN.perCell;
        track.hide(row.veil, { at, dur: dur.micro });
        row.cells.forEach((cell, i) => {
          if (cell.dark) track.tween(cell.garbled, { opacity: [0, 1], scale: [0.4, 1] }, { at: at + i * perCell, dur: dur.enter, ease: 'back' });
          else track.tween(cell.glyph, { opacity: [0, 1] }, { at: at + i * perCell, dur: dur.micro });
        });
        track.tween(row.monFill, { '--v': ['0%', row.read] }, { at: at + 100, dur: dur.enter });
      });
      track.tween(lens, { opacity: [1, 0] }, { at: RUN_AT.read, dur: dur.enter });
      track.cls(ring, 'is-dark', { at: RUN_AT.flip });
      beat(track, RUN_AT.flip);
      track.tween('[data-tab="dark"]', POP, { at: RUN_AT.flip + RUN.tabAfter, dur: dur.enter, ease: 'back' });
      track.hold(300);

      // Click 3, the second way to choose: capability, and reasoning that can be read. The
      // first choice dims and the second is named beside it. The note leaves the frame, the
      // frame goes back in one move to the last version whose reasoning is all words and
      // takes the part's color; the rows it leaves dim; a line at the foot of the card says
      // by which rule this one, and that the rule is one of several possible.
      const second = ctx.step({ label: 'choice 2, readable reasoning too: version 3, the most capable one a monitor can fully read' });
      second.tween('[data-way="1"]', { opacity: [1, RUN.stale] }, { dur: dur.enter });
      second.tween('[data-way="2"]', POP, { at: RUN.wayAt, dur: dur.enter, ease: 'back' });
      second.hide('[data-tab="dark"]', { at: RUN.wayAt, dur: dur.micro });
      second.tween(ring, { y: [last * pitch, RUN.kept * pitch] }, { at: RUN.moveAt, dur: RUN.backDur, ease: 'inOut' });
      second.tween(rows.slice(RUN.kept + 1).flatMap((row) => row.all), { opacity: [1, RUN.stale] }, { at: RUN.moveAt + dur.micro, dur: dur.enter });
      second.cls(ring, 'is-dark', { at: RUN_AT.back - dur.micro, on: false });
      second.cls(ring, 'is-kept', { at: RUN_AT.back - dur.micro });
      beat(second, RUN_AT.back);
      second.tween('.p3-trk__rule', POP, { at: RUN_AT.back + RUN.tabAfter, dur: dur.enter, ease: 'back' });
      second.hold(300);

      // Click 4: the third of the part's three ways to keep the reasoning readable, and
      // under it the same advice without its term.
      const keep = ctx.step({ label: 'the third way: track monitorability, in plain words' });
      keep.tween('.p3-keep', POP, { at: RUN.keepAt, dur: dur.enter, ease: 'back' });
      keep.show('.p3-trk__plain', { at: RUN.plainAt, rise: 0 });
      keep.hold(300);
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 11, closing. One callback per part, then the talk's conclusion as a statement,
  // then the three ways it rests on. The row of dots that slide 1 ended on comes back (the
  // shared motif on kit.decay; its letters stay hidden), stands for a moment and gathers
  // into the statement: dots that turn into words again. Until SPEC.md section 7.30 the
  // dots became a question ("Would you give up reading a model's reasoning to make it
  // smarter?"), a second question followed, and the slide ended on "Questions?".
  // ---------------------------------------------------------------------------------------

  // The statement says no more than the papers' own conclusions. "Works" today:
  // "CoT monitoring is a valuable defense for today's models" ('p3.emmons_today'), "a
  // valuable addition to safety measures" ('p3.korbak_glimpse'). "Imperfectly": "CoT
  // monitoring is imperfect and allows some misbehavior to go unnoticed"
  // ('p3.korbak_imperfect'), "while not infallible" ('emmons.defense'); the talk's own Part 2
  // showed reasoning that does not mention the hint that flipped the answer. Until the cold
  // read of the whole deck after SPEC.md section 7.30 the first sentence was "Today, reading
  // the reasoning works.", with the limit left to the second tile above it, and a reader
  // found it said more than the talk had shown. "It may not last unless we protect it":
  // "there is
  // no guarantee that the current degree of visibility will persist" ('p3.korbak_persist'),
  // "Its continued effectiveness, however, is not guaranteed" ('p3.emmons_not_guaranteed'),
  // a defense "that requires active protection and continued stress-testing"
  // ('emmons.layer'), and the call to "study how it can be preserved"
  // ('p3.korbak_preserved'). "May not" is the papers' strength, and the part's own: the
  // run with five versions is hypothetical, and the hint experiment says that future
  // models "may" evade better. Until the eleventh round of cold-read frames the line was
  // "It lasts only if we protect it.", which a reader found firmer than what the slides
  // before it had shown. The three ways under it are what protecting means, each from
  // the slide it ended (KEEP).
  // Three lines, so that each fits the stage in a wider serif (28, 19 and 37 characters):
  // the verb and its limit share the middle line.
  const CLOSE = Object.freeze({
    says: Object.freeze(['Today, reading the reasoning', 'works, imperfectly.', 'It may not last unless we protect it.']),
    // The words that carry the statement, each in the color of the part that showed it: what
    // a monitor can read (Part 1), what stays inside the model (Part 2), and the part's own
    // color (Part 3). The three tiles above the statement have the same three colors.
    marks: Object.freeze([
      Object.freeze({ words: 'works', tone: 'read' }),
      Object.freeze({ words: 'imperfectly', tone: 'hidden' }),
      Object.freeze({ words: 'protect it', tone: 'open' }),
    ]),
    stagger: 0.45, fade: 0.14,
    tilesAt: 300, perTile: 450,
    dotScale: 0.75,    // a dot of the thought is this much smaller than a dot of the statement
    // The echo of slide 1, in ms after the click: its dots arrive and stand for a moment,
    // travel into the statement, and the statement's letters appear while the last dots
    // land, each line before the next (the screen holds dots and no words for about
    // a second). `dotLeft`: how small a dot is when its letter stands.
    dotsAt: 300, perDot: 6, gatherAt: 1000, gatherDur: 1000, revealAt: 1500, revealDur: 2400, dotLeft: 0.3,
    // Click 2: the three ways arrive one by one.
    keepsAt: 200, perKeep: 400,
  });
  // Each tile names its subject, the written reasoning, in the words in which Part 2's last
  // click gathered that part ("Written reasoning can ..."): until the cold read of the whole
  // deck after SPEC.md section 7.30 each began with "It", which nothing on the slide named.
  // The third tile answers the part's name in the part's color, and no more firmly than the
  // part's evidence allows: "may", and the condition, which the statement under the tiles
  // takes up ("unless we protect it"). Neither paper behind the statement says that the
  // reasoning can be kept readable: one calls for work to "study how it can be preserved"
  // ('p3.korbak_preserved'), the other says that its use "is not guaranteed"
  // ('p3.emmons_not_guaranteed') and "requires active protection" ('emmons.layer'); and on
  // the slides of this part the bars of the penalty experiment are a sketch and the
  // training run with five versions is hypothetical. Until the ninth round of cold-read
  // frames the tile said "can be kept readable". The first tile says what the written
  // reasoning can tell us, in the words of the question that the talk opened with ("Can we
  // see what a model is about to do, before it does it?"): until the tenth round of
  // cold-read frames it ended on "can tell us", which read as a sentence cut short. The
  // line breaks are set, so that no font set breaks a tile's sentence elsewhere.
  const CLOSE_RECAP = Object.freeze([
    { tone: 'read', part: 1, words: 'Written reasoning<br>can tell us what a<br>model is about to do' },
    { tone: 'hidden', part: 2, words: 'Written reasoning<br>can leave things out' },
    { tone: 'open', part: 3, words: 'Written reasoning<br>may stay readable,<br>if we look after it' },
  ]);
  const closeBar = (key, x, y, width, kind) =>
    `<rect class="p3-cl__bar${kind ? ` is-${kind}` : ''}" data-bar="${key}" x="${x}" y="${y}" width="${width}" height="12" rx="6"/>`;
  const CLOSE_ICONS = Object.freeze([
    // Part 1: a trace whose last line says it out loud.
    `<rect class="p3-cl__frame" x="2" y="2" width="124" height="92" rx="10"/>
     ${closeBar('1a', 18, 20, 84)}${closeBar('1b', 18, 42, 60)}${closeBar('1c', 18, 64, 72, 'hot')}`,
    // Part 2: a trace with the line that mattered left out.
    `<rect class="p3-cl__frame" x="2" y="2" width="124" height="92" rx="10"/>
     ${closeBar('2a', 18, 20, 84)}${closeBar('2b', 18, 42, 68, 'gap')}${closeBar('2c', 18, 64, 52)}`,
    // Part 3: the trace of Part 2 with the line that mattered kept in the words.
    `<rect class="p3-cl__frame" x="2" y="2" width="124" height="92" rx="10"/>
     ${closeBar('3a', 18, 20, 84)}${closeBar('3b', 18, 42, 68, 'kept')}${closeBar('3c', 18, 64, 52)}`,
  ]);
  const closeTile = (item, i) => `
    <div class="p3-cl__tile" data-tone="${item.tone}">
      <svg class="p3-cl__icon" viewBox="0 0 128 96" width="128" height="96" aria-hidden="true">${CLOSE_ICONS[i]}</svg>
      <div class="p3-cl__tile-text">
        <b>${item.words}</b>
        <span>Part ${item.part} · ${Deck.meta.parts[item.part].name}</span>
      </div>
    </div>`;
  // The statement as one box per character: the glyph keeps its place and width from the
  // start, a dot sits on top of it until the character is revealed. A character inside one
  // of the marked words takes that word's color.
  const closeChar = (ch, tone) =>
    `<span class="p3-cl__ch"${tone ? ` data-tone="${tone}"` : ''}><span class="p3-cl__glyph">${esc(ch)}</span><i class="p3-cl__dot"></i></span>`;
  const closeLine = (line) => {
    const spans = CLOSE.marks.map((mark) => ({ from: line.indexOf(mark.words), length: mark.words.length, tone: mark.tone })).filter((span) => span.from >= 0);
    const toneAt = (at) => (spans.find((span) => at >= span.from && at < span.from + span.length) ?? {}).tone;
    const words = line.split(' ').reduce((acc, word) => ({
      offset: acc.offset + word.length + 1,
      html: [...acc.html, `<span class="p3-cl__word">${Array.from(word).map((ch, k) => closeChar(ch, toneAt(acc.offset + k))).join('')}</span>`],
    }), { offset: 0, html: [] });
    return `<span class="p3-cl__line">${words.html.join(' ')}</span>`;
  };
  if (CLOSE.marks.some((mark) => !CLOSE.says.some((line) => line.includes(mark.words)))) throw new Error('a marked word is no longer in the closing statement');
  const smooth = (p) => 1 - Math.pow(1 - util.clamp(p), 3);

  Deck.register({
    id: 'p3-close',
    part: 3,
    layout: 'bare',
    title: CLOSE.says.join(' '),
    // The statement rests on the conclusions of two of the talk's papers (see CLOSE): the
    // footer names where each stands. No figure tag: nothing on the slide is an example or
    // a drawing of a source.
    cite: [{ src: 'korbak2025', where: 'Sec. 6; abstract' }, { src: 'emmons2025', where: 'Sec. 1; abstract' }],
    html: `
      <div class="p3-cl">
        <div class="p3-cl__tiles">${CLOSE_RECAP.map(closeTile).join('')}</div>
        <div class="p3-cl__words">
          <h2 class="p3-cl__say">${CLOSE.says.map(closeLine).join('')}</h2>
          <div class="p3-cl__thought">${kit.decay({ key: 'echo', text: Deck.motifs.thought })}</div>
        </div>
        <div class="p3-cl__keeps">${KEEP.map((_, i) => keepHtml(i + 1)).join('')}</div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const lines = ctx.qa('.p3-cl__line').map((line) => Array.from(line.querySelectorAll('.p3-cl__ch')));
      const chars = lines.flat().map((el) => ({ glyph: el.querySelector('.p3-cl__glyph'), dot: el.querySelector('.p3-cl__dot') }));
      const seeds = ctx.qa('.p3-cl__thought .dk-decay__dot');
      const next = util.rng(41);
      // Each dot of the statement starts on a dot of the thought, in reading order, so the
      // row of dots that slide 1 left behind is what the statement is made of. Offsets are
      // read from the layout, in stage pixels.
      const perPixel = ctx.stage.offsetWidth / ctx.stage.getBoundingClientRect().width;
      const center = (el) => {
        const r = el.getBoundingClientRect();
        return { x: (r.left + r.width / 2) * perPixel, y: (r.top + r.height / 2) * perPixel };
      };
      const sources = seeds.map(center);
      const offsets = chars.map((ch, i) => {
        const from = sources[Math.floor((i * sources.length) / chars.length)];
        const to = center(ch.dot);
        return { x: from.x - to.x, y: from.y - to.y, wait: next() * CLOSE.stagger };
      });
      // The letters of a line appear before those of the next, in a shuffled order inside
      // each line: the statement is read line by line.
      const order = lines.reduce((acc, line, n) => ({
        start: acc.start + line.length,
        list: [...acc.list, ...util.shuffled(util.range(line.length), 7 + n).map((k) => acc.start + k)],
      }), { start: 0, list: [] }).list;
      const turn = Object.fromEntries(order.map((index, rank) => [index, rank / chars.length]));
      const grow = (step, key, at) => {
        const bar = ctx.q(`[data-bar="${key}"]`);
        step.tween(bar, { 'attr:width': [0, Number(bar.getAttribute('width'))] }, { at, dur: dur.enter });
      };

      // Enter: the three parts, one picture and one line each.
      const recap = ctx.step({ label: 'three callbacks, one per part' });
      recap.show('.p3-cl__tile', { at: CLOSE.tilesAt, stagger: CLOSE.perTile });
      [['1a', '1b', '1c'], ['2a', '2b', '2c'], ['3a', '3b', '3c']].forEach((bars, tile) => {
        bars.forEach((key, k) => grow(recap, key, CLOSE.tilesAt + 200 + tile * CLOSE.perTile + k * 140));
      });
      recap.hold(300);

      // Click 1: under the tiles the dots of slide 1 return, stand for a moment and gather
      // into the statement, line after line.
      const say = ctx.step({ label: 'the title slide’s dots return and become the statement: it works today, imperfectly, and may not last unless protected' });
      seeds.forEach((seed, i) => {
        say.tween(seed, { opacity: [0, 1], scale: [0.2, 1] }, { at: CLOSE.dotsAt + i * CLOSE.perDot, dur: dur.enter, ease: 'back' });
        // The moment the dots leave for the statement, the statement's own dots stand in for them.
        say.tween(seed, { opacity: [1, 0] }, { at: CLOSE.gatherAt, dur: 0 });
      });
      const gather = say.signal({ at: CLOSE.gatherAt, dur: CLOSE.gatherDur, ease: 'linear' });
      const reveal = say.signal({ at: CLOSE.revealAt, dur: CLOSE.revealDur, ease: 'linear' });
      say.hold(300);

      // Click 2: what protecting it means. The three ways arrive under the statement, one
      // by one, as slides 8, 9 and 10 each ended on them. The talk ends here.
      const ways = ctx.step({ label: 'what protecting it means: the three ways' });
      ways.show('.p3-cl__keeps .p3-keep', { at: CLOSE.keepsAt, stagger: CLOSE.perKeep, rise: 0 });
      ways.hold(300);

      ctx.paint(() => {
        const g = gather();
        const r = reveal();
        chars.forEach((ch, i) => {
          const near = smooth(g * (1 + CLOSE.stagger) - offsets[i].wait);
          const shown = util.clamp((r * (1 + CLOSE.fade) - turn[i]) / CLOSE.fade);
          // A dot shrinks as its letter appears, so that it never lies across the letter.
          const size = round3(util.lerp(CLOSE.dotScale, 1, near) * util.lerp(1, CLOSE.dotLeft, shown));
          ch.dot.style.transform = `translate(${round3(offsets[i].x * (1 - near))}px, ${round3(offsets[i].y * (1 - near))}px) scale(${size})`;
          ch.dot.style.opacity = String(round3((g > 0 ? 1 : 0) * (1 - shown)));
          ch.glyph.style.opacity = String(round3(shown));
        });
      });
    },
  });
})();
