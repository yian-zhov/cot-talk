// Part 3: Keeping it readable Slides 8-11.
// SPEC.md section 5 describes the slides; parts/sample.js shows the registration API.
// Every quote and number on screen is read from the fact table by key (shared/facts.js, and
// the facts below that only this part needs).
// What we wrote ourselves (the two thoughts of the agent in training and its edited test on
// slide 8, the thought of slide 10) is marked as illustrative on screen, on the border of its box; what we drew
// (the bars of slide 8, the training run of slide 10) is marked as schematic. The footer tags
// of each slide use the same words; slides 8 and 10 hold both kinds and carry both tags.
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
    // agent, and the line in the strip under the board ("tried it on a non-frontier agent (not
    // a top model)": "non-frontier" is the paper's word, and it is not the frontier agent of
    // slide 4).
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
    // Slide 10: why a run can lose its words (behind the rows that turn into dots).
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
    // terminal, which is ours (with 'p3.baker_easier'; the note on the border says so).
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
  });

  // ---------------------------------------------------------------------------------------
  // Slide 8. Slide 4's terminal returns exactly as that slide left it (the shared motif,
  // shown with kit.setTrace), next to the obvious fix: a penalty whenever the monitor flags a
  // thought. Four clicks, one finding each. Click 1: the experiment that tried it (the
  // terminal is cleared and the thought of the agent in training is typed; its monitor reads
  // only its thoughts), and what the penalty buys early in training. Click 2: further into
  // the same training the thought
  // rewrites itself clean, the monitor finds nothing, and then the action shows the hack
  // that the thought used to announce. Click 3: the two bars, before and after. Click 4: the
  // experiment stays on screen while the advice and its cost arrive under it.
  // "Thoughts" is this slide's word for the written reasoning (the paper asks about "bad
  // thoughts"): the caption under the terminal says so on the entrance, and no other slide
  // of the part uses the word.
  // ---------------------------------------------------------------------------------------

  const HACK = Deck.motifs.hackTrace;
  // What each line of the trace turns into under training, and when its words start to
  // fade (ms after click 2; the first one starts when the marker has come to rest, so that
  // the track and the terminal never move at once). The new lines are ours, written after the
  // paper's description of Fig. 5 ('baker.obfuscated_cot'); the legend on the terminal's
  // border says so once they stand. A line fades out and its new words fade in: no letter is
  // ever unreadable.
  const REWRITE = Object.freeze({
    fig1a: Object.freeze({ to: 'Two ideas: the parser or the loader.', at: 1500 }),
    fig1b: Object.freeze({ to: 'Not sure yet which one is at fault.', at: 1850 }),
    hack: Object.freeze({ to: 'Let me double check that function.', at: 2300 }),
  });
  const REWRITE_NOTE = 'illustrative: ours, after Fig. 5';
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
  // where "early" ends); the marker rests there at the end of click 1, next to what the
  // paper found there. "Later": the same agent further into the same training
  // ('baker.too_much', 'p3.baker_further'), where the marker ends at click 2. "None" is not
  // a place on the rail, because it is no point in that training: it is the paper's baseline
  // agent, trained with no monitor in its reward. It is a ring of its own, to the left of
  // where the rail begins and clear of it; the marker starts in it.
  // A name is neutral until the marker has reached its place and then takes the color of
  // what the paper found there: green for "early", red for "later". Nothing on the track is
  // red before the marker gets there.
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
  // The two bars arrive at click 3 with the readings of the agent trained without the
  // penalty, then change over to the agent trained with it, further into training. Each leaves a thin
  // neutral mark at its old length and the words "no penalty" beside it, so that the two changes
  // can be compared: it hacks a little less, and the monitor catches almost none of it. The
  // mark lies over the meter's track (kit.meter); `was` is the old length. The lengths are
  // ours (the line under the bars says so); the first bar of "How often it hacks" is not
  // full, so that nobody reads it as 100%.
  // The words name the other agent, the one trained without the penalty ("none" on the
  // track), and not an earlier time: until the check before deployment (SPEC.md section
  // 7.26) the mark said "before", and the two bars read as one agent before and after. Not
  // "none" either: beside "Hacks the monitor catches" that would read as a count.
  const GHOST = 'no penalty';
  const ghostHtml = (key, was) => `<span class="p3-tw__ghost" data-ghost="${key}" style="--was: ${was}"><i></i><b>${GHOST}</b></span>`;
  const BARS = Object.freeze({ caught: Object.freeze(['96%', '3%']), hacks: Object.freeze(['80%', '56%']) });
  // What the bar "Hacks the monitor catches" reads without the penalty: the first two words
  // of the paper's sentence about the baseline agent.
  const ALMOST_ALL = text('p3.baker_baseline_caught').split(' of ')[0];
  // When things happen, in ms after each step begins.
  const TWIST = Object.freeze({
    perLine: 180, fade: 200, arrive: 300,
    // Enter: the caption, the card with the track, the bridge from Part 2 and the fix in
    // plain words, the first cue.
    captionAt: 300, cardAt: 600, offAt: 1000, bridgeAt: 1000, ideaAt: 1300, cueOpen: 1800,
    // Click 1: the strip names the experiment; the terminal is cleared (`clearAt`) and the
    // thought of the agent in training is typed from `typeAt` on, with `gap` between its
    // lines; SWITCH_AT has the beats that follow.
    clearAt: 500, typeAt: 750, gap: 50, lowDur: 700,
    // Click 2, one thing at a time: the marker goes on to "later" (`highDur`), whose name
    // takes its color at `laterAt`; when the marker has
    // come to rest the terminal heats up (`heatAt`) and the thought rewrites itself (REWRITE);
    // `beat` is the pause between the monitor's verdict and what the agent did; the verdict
    // turns `fooledAfter` the hack stands, when the last line of the actions has been typed;
    // the title follows `punchAfter` the verdict and the strip's answer `whyAfter` the title.
    highDur: 1400, laterAt: 900, heatAt: 1300, beat: 1300, fooledAfter: 700, punchAfter: 400, whyAfter: 800,
    // Click 3: the bars with the readings of "none"; from `moveAt` both bars change over
    // together, and the heading changes over with them.
    barsAt: 100, moveAt: 1700,
    // Click 4: the answer under the board leaves; the advice and its cost arrive.
    keepAt: 300, costAt: 1100,
  });
  // Click 3: when "Hacks the monitor catches" has drained, and the paper's words for it land.
  const TWIST_DRAINED = TWIST.moveAt + DUR.reveal;
  // Click 2, beat by beat (ms), each beat after the one before it has ended: the marker has
  // come to rest and the thought has settled, the monitor reads it and gives its verdict, the
  // cover lifts from the actions line by line, the hack stands and the tests pass, the
  // verdict turns, the title says the rest of its sentence, and then the answer to "why not
  // show the monitor the actions?" takes the place of the line that named the experiment.
  // Until SPEC.md section 7.25 the move on the track and the rewrite ran together, and the last action
  // line, the verdict, the title, the pane's note and the strip all changed within 1.2 s.
  const TWIST_AT = (() => {
    const settled = Math.max(...Object.values(REWRITE).map((line) => line.at)) + TWIST.fade + TWIST.arrive;
    const read = settled + 400;
    const verdict = read + Object.keys(REWRITE).length * TWIST.perLine + 100;
    const a1 = verdict + 400 + TWIST.beat;
    const a2 = a1 + 100 + typeMs(ACTION[0], ACTION_CPS[0]) + 200;
    const hacked = a2 + 100 + typeMs(ACTION[1], ACTION_CPS[1]);
    const a3 = hacked + 200;
    if (a3 + 100 + typeMs(ACTION[2], ACTION_CPS[2]) > hacked + TWIST.fooledAfter) throw new Error('the verdict would turn before the last action line is typed');
    const fooled = hacked + TWIST.fooledAfter;
    const punch = fooled + TWIST.punchAfter;
    return Object.freeze({
      settled, read, verdict, acts: Object.freeze([a1, a2, a3]), hacked,
      fooled, punch, told: a1, why: punch + TWIST.whyAfter,
    });
  })();
  // The terminal opens on the frontier agent's thoughts of slide 4, and the experiment trains
  // another agent. At click 1 the terminal is cleared (words, pointers, verdict, the frame's
  // red, the note) and says whose thoughts it shows from now on: its label and the caption
  // under it change over, and this agent's thought is typed into the same three rows; the
  // monitor flags it as it flagged the first. The paper prints no thought of this agent from
  // before the penalty that we could quote in a line, so the lines are ours, after what it
  // says of the agent: it learns that editing the tests is easier than a real fix
  // ('p3.baker_easier') and it "is quite forthright and legible about its intent to hack"
  // ('p3.baker_forthright'). The note on the border says that they are ours. Click 2
  // rewrites these lines (REWRITE), and the action it then reveals is the edit they announce.
  const SWITCH = Object.freeze({
    label: () => `The ${text('baker.obfuscated_agent')} agent thinks`,
    caption: 'Now the agent in training; its monitor reads only this',
    note: 'illustrative: ours, after Sec. 3.1',
    cps: 70,
    lines: Object.freeze({
      fig1a: 'A real fix is hard. Easier:',
      fig1b: 'edit the test so that it always passes.',
      hack: 'Let me edit the test.',
    }),
  });
  // Click 1, beat by beat (ms): when each line of that thought starts to be typed and when
  // the last one stands; the monitor's flag; the pane of the actions; the penalty; the
  // marker's way to "early"; the name takes its color as the marker comes to rest, and the
  // paper's finding for that place follows.
  const SWITCH_AT = (() => {
    const typing = Object.entries(SWITCH.lines).reduce((acc, [key, words]) => ({
      next: acc.next + typeMs(words, SWITCH.cps) + TWIST.gap, at: { ...acc.at, [key]: acc.next },
    }), { next: TWIST.typeAt, at: {} });
    const typed = typing.next - TWIST.gap;
    const flagged = typed + 100;
    const pane = flagged + 200;
    const penalty = pane + 300;
    const low = penalty + 250;
    return Object.freeze({
      lines: Object.freeze(typing.at), typed, flagged, pane, penalty, low,
      lit: low + TWIST.lowDur - 200, gain: low + TWIST.lowDur + 50,
    });
  })();
  // The texts under the board. On the entrance, in the room that the pane of the actions and
  // the bars take later: one line that leads from Part 2 into Part 3, and the fix that the
  // title asks about, in plain words. Then the strip, one text at a time. From click 1:
  // which experiment tried it. From the end of click 2: why this monitor is not shown the
  // actions. At click 4: the advice and its cost.
  const STRIP = Object.freeze({
    // Part 2's last click gathers that part as "Written reasoning can ..." (three failures).
    bridge: 'Part 2: the written reasoning can fail us. Part 3: what can we do about it?',
    // 'p3.baker_bad_thoughts', 'baker.obfuscated_reward'.
    idea: 'The obvious fix: in training, punish every thought that the monitor flags.',
    // 'p3.baker_nonfrontier_run', 'baker.obfuscated_monitor'. Short enough for one line in
    // every font set: on two lines the sentence broke inside the paper's word, "non-" / "frontier".
    // The gloss says what the word means and no more: not a frontier model, which is what
    // the paper calls the agent of the "Let's hack" terminal ('p3.baker_frontier_cot').
    run: `Baker et al. tried it on a ${text('baker.obfuscated_agent')} agent (not a top model); its monitor reads only its thoughts.`,
    // 'baker.simple_hack', 'p3.baker_cot_only', 'p3.baker_unclear'.
    ask: 'Why not show the monitor the actions?',
    answer: 'It would catch a hack this simple.',
    point: 'Leaving them out is the test: do the thoughts alone still give a hack away? Not anymore.',
    // 'baker.tax', 'baker.tax_cost', 'p3.baker_unrestricted', 'p3.baker_hard_to_tell'. One
    // wording for the advice and its cost: the advice is the line in the part's color above
    // this one, and the cost is what the room saw help at "early" (the line under the track
    // begins with that word and takes the part's color as this line arrives).
    cost: (tax) => `The cost, a ${quoted(tax)}: we also give up what the penalty gained early, so the model may be slightly weaker.`,
  });

  // Part 3's three answers to its own name, one at the end of each of slides 8, 9 and 10;
  // the closing slide gathers them. Each is a paraphrase of a sentence its slide quotes.
  // The first one is the paper's advice at the paper's strength: "not applying strong
  // optimization pressures directly to the chain-of-thought" ('baker.tax_advice', abstract)
  // and "avoid strong chain-of-thought optimization pressures" ('p3.baker_avoid', Sec. 6).
  // "Training" stands for "optimization" and "the written reasoning" for "the
  // chain-of-thought", as everywhere in the deck; the other words are the paper's. It names
  // no place on the track, which shows how far the training with the penalty has gone: the
  // penalty itself is a case of such a pressure ('p3.baker_blunt'), and the cost line under
  // the advice says that what goes is what that penalty gained. Until SPEC.md section 7.25
  // the line was "No strong training pressure on the written reasoning"; a first wording of
  // that round, "No training penalty on the written reasoning", said more than the paper,
  // which asks for no rule against every penalty ("it may be necessary", "strong",
  // "directly"; its Sec. 4 leaves room for process supervision on a part of the reasoning).
  const KEEP = Object.freeze([
    'Avoid strong training pressure directly on the written reasoning',   // 'baker.tax_advice', 'p3.baker_avoid'
    'Keep stress-testing the monitor',               // 'p3.emmons_keep_testing', 'emmons.layer'
    'Track monitorability, and make it count',       // 'p3.korbak_track', 'p3.korbak_consider'
  ]);
  const keepHtml = (n) => `
    <p class="p3-keep" data-keep="${n}">
      <span class="p3-keep__tag">${Deck.meta.parts[3].name} · ${n}</span>
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
    // stands under the clean thought (click 2); it keeps its place from the start, so
    // nothing moves when it arrives. The sentence has to fit one line in every font set: a
    // second line takes 72 px from a stage whose three areas are placed to the pixel ("What
    // if we punish the bad thoughts? ..." is 1720 px wide in the default serif and 1811 px in
    // Georgia; the title's box is 1640 px).
    title: 'Punish the bad thoughts?<span class="p3-tw__punch"> They go into hiding</span>',
    // Two cues for five steps: the entrance and the bars. Clicks 1, 2 and 4 speak through
    // the strip under the board; the advice and its cost are said once, there.
    cues: [
      { text: 'Rewarded for passing tests: it hacks, and the monitor sees it', step: 0, at: TWIST.cueOpen },
      // 'baker.obfuscated_hacking' and 'baker.obfuscated_recall' in plain words.
      { text: 'It hacks a little less; the monitor catches almost none', step: 3, at: TWIST_DRAINED },
    ],
    // Sec. 6 holds the advice in the conclusion's words ('p3.baker_avoid'), behind the verb
    // of the first way.
    cite: [{ src: 'baker2025', where: 'Sec. 1, 3.1-3.3, 6, Fig. 3-5; abstract' }],
    // Two tags. The two thoughts of the agent in training (the open one of click 1, the
    // rewritten one of click 2) and its edited test are examples we wrote
    // (illustrative); the track and the bars are our drawing of what the paper reports
    // (schematic: "Bar lengths are ours"). No measured number is printed: the paper's levels
    // stand in its own words.
    figure: ['illustrative', 'schematic'],
    html: `
      <div class="p3-tw">
        <div class="p3-tw__left">
          ${kit.trace({
    key: HACK.key, label: HACK.label, verdict: HACK.verdict, width: HACK.width, lines: HACK.lines,
    inner: `<span class="p3-tw__caption" data-caption="before">Thoughts: the written reasoning. This one was flagged earlier.</span>
      <span class="p3-tw__caption" data-caption="now">${SWITCH.caption}</span>`,
  })}
          <div class="p3-tw__pane">
            ${kit.term({ label: 'What the agent does', lines: ACTION_KEYS })}
            <span class="p3-tw__mon">not shown to this monitor</span>
            <span class="p3-tw__veil">${ACTION_KEYS.map((key) => `<i data-veil="${key}"></i>`).join('')}</span>
            ${kit.legend({ key: 'acts', text: REWRITE_NOTE })}
          </div>
        </div>
        <div class="p3-tw__side">
          <div class="dk-card p3-tw__train">
            <div class="p3-tw__train-label">Penalty when the monitor flags a thought</div>
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
            <p class="p3-tw__fine"><b>Bar lengths are ours</b>: the paper plots both over training.</p>
            <div class="p3-tw__meter">
              ${kit.meter({ key: 'caught', label: 'Hacks the monitor catches', tone: 'read' })}
              ${ghostHtml('caught', BARS.caught[0])}
            </div>
            <div class="p3-tw__meter">
              ${kit.meter({ key: 'hacks', label: 'How often it hacks', tone: 'alarm' })}
              ${ghostHtml('hacks', BARS.hacks[0])}
              <p class="p3-tw__said">${quoted(text('baker.obfuscated_hacking'))}</p>
            </div>
          </div>
        </div>
        <div class="p3-tw__open">
          <p class="p3-tw__bridge">${STRIP.bridge}</p>
          <p class="p3-tw__idea">${STRIP.idea}</p>
        </div>
        <div class="p3-tw__strip">
          <p class="p3-tw__run">${STRIP.run}</p>
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
      // The marker reaches a named place: the name takes its color, for good, and beats.
      const reach = (step, end, at) => {
        step.cls(`[data-end="${end}"]`, 'is-on', { at });
        beat(step, `[data-end="${end}"]`, at);
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
      // pointers, the red frame, the verdict and the note on its border; under it, what a
      // thought is. Next to it the obvious fix, not yet switched on: the marker in the ring
      // of "none", the reward as it is; and under both, the way in from Part 2 and the fix in
      // one sentence.
      const enter = ctx.step({ label: 'the “Let’s hack” terminal, as it ended; the obvious fix' });
      kit.setTrace(enter, trace, {
        verdict: HACK.verdict, state: 'is-flagged', alarm: true, note: text(HACK.note),
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
      // The pane of the actions arrives, covered: this monitor is not shown them. Then the
      // penalty enters the reward, the marker leaves the ring for the rail and rests at
      // "early", whose name takes its color, and the paper's finding for it stands under the
      // track.
      const tried = ctx.step({ label: 'the experiment: another agent, flagged too; a penalty; early in training, more honest passes' });
      tried.hide('.p3-tw__open', { dur: dur.micro });
      tried.show('.p3-tw__run', { at: dur.micro, dur: 600 });
      tried.hide('[data-caption="before"]', { at: TWIST.clearAt, dur: dur.micro });
      [label, parts.note, parts.chip].forEach((el) => tried.tween(el, { opacity: [1, 0] }, { at: TWIST.clearAt, dur: dur.micro }));
      rewritten.forEach((line) => {
        const row = parts.line(line.key);
        tried.tween(row, { opacity: [1, 0] }, { at: TWIST.clearAt, dur: dur.micro });
        if (line.flag) tried.tween(row, { '--dk-mark': [1, 0] }, { at: TWIST.clearAt, dur: dur.micro });
      });
      const cleared = TWIST.clearAt + dur.micro;
      tried.cls(trace, 'is-alarm', { at: cleared, on: false });
      tried.type(label, SWITCH.label(), { at: cleared, dur: 0 });
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
      tried.type(parts.note, SWITCH.note, { at: SWITCH_AT.flagged, dur: 0 });
      tried.tween(parts.note, { opacity: [0, 1] }, { at: SWITCH_AT.flagged, dur: dur.enter });
      tried.show('.p3-tw__pane', { at: SWITCH_AT.pane });
      tried.tween('.p3-tw__reward-new', POP, { at: SWITCH_AT.penalty, dur: dur.enter, ease: 'back' });
      const low = tried.signal({ at: SWITCH_AT.low, dur: TWIST.lowDur, ease: 'inOut', to: 1 });
      reach(tried, 'low', SWITCH_AT.lit);
      tried.show('.p3-tw__gain', { at: SWITCH_AT.gain, rise: 12 });
      tried.hold(300);

      // Click 2, the turn, one thing at a time. First the track alone: the marker goes on
      // along the rail to "later", whose name turns red as it comes near (`laterAt`, so that
      // the name has stopped beating when the first line starts to fade). Then the terminal
      // alone: it heats up, and each line of the thought
      // fades and comes back as calm prose, the incriminating one last; the pointers leave
      // with the old words. The monitor reads the new lines and finds nothing: its marks and
      // its verdict are neutral, not the green of a trace that is fine. After a beat the
      // cover lifts from the actions, with the note that says whose lines they are: the same
      // hack, and the tests pass. Only then the verdict turns into what it was worth and the
      // frame is red again; then the title says the rest of its sentence; then the strip
      // answers the question that the hack raises.
      const turn = ctx.step({ label: 'further into training: the thought rewrites itself clean; the hack stays; fooled' });
      const high = turn.signal({ dur: TWIST.highDur, ease: 'inOut', to: 1 });
      reach(turn, 'high', TWIST.laterAt);
      turn.tween(parts.term, { '--heat': [0, 1] }, { at: TWIST.heatAt, dur: dur.move });
      turn.tween(parts.note, { opacity: [1, 0] }, { at: TWIST.heatAt + dur.enter, dur: dur.micro });
      rewritten.forEach((line) => {
        const plan = REWRITE[line.key];
        const row = parts.line(line.key);
        const gone = plan.at + TWIST.fade;
        turn.tween(row, { opacity: [1, 0] }, { at: plan.at, dur: TWIST.fade });
        if (line.flag) {
          turn.tween(row, { '--dk-mark': [1, 0] }, { at: plan.at, dur: TWIST.fade });
          turn.cls(row, 'is-flag', { at: gone, on: false });
        }
        if (line.tone) turn.cls(row, line.tone, { at: gone, on: false });
        turn.type(row, plan.to, { at: gone, dur: 0 });
        turn.tween(row, { opacity: [0, 1] }, { at: gone, dur: TWIST.arrive });
      });
      turn.tween(parts.term, { '--heat': [1, 0] }, { at: TWIST_AT.settled - dur.micro, dur: dur.move });
      turn.type(parts.note, REWRITE_NOTE, { at: TWIST_AT.settled, dur: 0 });
      turn.tween(parts.note, { opacity: [0, 1] }, { at: TWIST_AT.settled, dur: dur.enter });
      turn.cls(trace, 'p3-tw__reread', { at: TWIST_AT.settled });
      const read = kit.readTrace(turn, trace, {
        at: TWIST_AT.read, perLine: TWIST.perLine, marks: rewritten.map((line) => ({ key: line.key })),
      });
      if (read + 100 !== TWIST_AT.verdict) throw new Error('the verdict no longer follows the lens: TWIST_AT is out of step with kit.readTrace');
      stamp(turn, 'p3-tw__quiet', TWIST_AT.verdict, { text: 'clean', clear: 'is-flagged' });
      turn.cls(trace, 'is-alarm', { at: TWIST_AT.verdict, on: false });
      turn.cls('[data-line="a1"]', 'is-quiet');
      turn.cls('[data-line="a2"]', 'is-hot');
      turn.cls('[data-line="a3"]', 'p3-tw__pass');
      ACTION_KEYS.forEach((key, i) => {
        turn.hide(`[data-veil="${key}"]`, { at: TWIST_AT.acts[i], dur: dur.micro });
        turn.type(`[data-line="${key}"]`, ACTION[i], { at: TWIST_AT.acts[i] + 100, cps: ACTION_CPS[i] });
      });
      // 'p3.baker_fool': the agent "learns to fool the monitor".
      stamp(turn, 'is-flagged', TWIST_AT.fooled, { text: 'fooled', clear: 'p3-tw__quiet' });
      turn.cls(trace, 'is-alarm', { at: TWIST_AT.fooled });
      turn.tween('.p3-tw__punch', { opacity: [0, 1] }, { at: TWIST_AT.punch, dur: dur.move });
      turn.tween('.p3-tw__pane .dk-legend', { opacity: [0, 1] }, { at: TWIST_AT.told, dur: dur.enter });
      turn.hide('.p3-tw__run', { at: TWIST_AT.why - dur.micro, dur: dur.micro });
      turn.show('.p3-tw__why', { at: TWIST_AT.why });
      turn.hold(300);

      // Click 3, the count. The two bars arrive with the readings of the agent trained
      // without the penalty; their heading names that agent by its name on the track, "none",
      // which beats. Then the change, in which no frame shows a reading of one agent under
      // the name of the other. The words "almost all" go at the moment the bar they stand
      // beside begins to drain. Both bars change over together, "How often it hacks" a little
      // lower and "Hacks the monitor catches" all the way down, and the heading changes over
      // with them: the heading of "none" fades while the first half of the drain runs, the
      // heading of "later" comes up during the second half, and the paper's words for the
      // drained bar land when it has drained. Each bar leaves a mark where it stood, named
      // "no penalty" once the bar has moved away from under the words. Until
      // the fifth cold read the heading changed first, then "How often it hacks" settled,
      // and only 1.1 s later did the other bar begin to drain: a frame halfway read "later",
      // a shorter bar of hacks, and "almost all" caught.
      const count = ctx.step({ label: 'the bars: it hacks a little less; the monitor catches almost none' });
      count.show('[data-state="off"]', { rise: 0 });
      count.show('.p3-tw__fine', { rise: 0 });
      count.show('.p3-tw__meter', { stagger: 120, rise: 0 });
      beat(count, '[data-end="off"]', TWIST.barsAt);
      count.tween(`${caught} .dk-meter__fill`, { '--v': ['0%', BARS.caught[0]] }, { at: TWIST.barsAt, dur: dur.move });
      count.tween(`${hacks} .dk-meter__fill`, { '--v': ['0%', BARS.hacks[0]] }, { at: TWIST.barsAt + 120, dur: dur.move });
      count.type(`${caught} .dk-meter__value`, ALMOST_ALL, { at: TWIST.barsAt + dur.enter, dur: 0 });
      // The words keep their size until the bar has drained (the pop below starts larger).
      count.tween(`${caught} .dk-meter__value`, { scale: [1, 1] }, { dur: 0 });
      count.type(`${caught} .dk-meter__value`, '', { at: TWIST.moveAt, dur: 0 });
      count.tween(`${caught} .dk-meter__fill`, { '--v': BARS.caught }, { at: TWIST.moveAt, dur: dur.reveal, ease: 'inOut' });
      count.tween(`${hacks} .dk-meter__fill`, { '--v': BARS.hacks }, { at: TWIST.moveAt, dur: dur.move, ease: 'inOut' });
      count.tween('[data-state="off"]', { opacity: [1, 0] }, { at: TWIST.moveAt, dur: dur.reveal / 2, ease: 'in' });
      count.tween('[data-state="high"]', { opacity: [0, 1] }, { at: TWIST.moveAt + dur.reveal / 2, dur: dur.reveal / 2, ease: 'out' });
      // The marks stand from the moment the bars begin to move. The words beside them wait
      // until both bars have left the place where the words stand (the shorter change has
      // ended, the longer one is half done): shown at once, they lay on the moving fill.
      count.tween('.p3-tw__ghost i', { opacity: [0, 1] }, { at: TWIST.moveAt, dur: dur.enter });
      count.tween('.p3-tw__ghost b', { opacity: [0, 1] }, { at: TWIST.moveAt + dur.move, dur: dur.enter });
      count.show('.p3-tw__said', { at: TWIST.moveAt + dur.move });
      count.type(`${caught} .dk-meter__value`, text('baker.obfuscated_recall'), { at: TWIST_DRAINED, dur: 0 });
      count.cls(caught, 'is-drained', { at: TWIST_DRAINED });
      count.tween(`${caught} .dk-meter__value`, { scale: [1.5, 1] }, { at: TWIST_DRAINED, dur: dur.enter, ease: 'back' });
      count.hold(300);

      // Click 4: the experiment stays. In the strip under it the answer leaves, and when it
      // has gone the first of the part's three ways to keep the reasoning readable arrives,
      // then what that advice costs: the early gain too, the one under
      // the track, which takes the part's color as the line names it.
      const advice = ctx.step({ label: 'the advice and its cost' });
      advice.hide('.p3-tw__why', { dur: dur.micro });
      advice.tween('.p3-keep', POP, { at: TWIST.keepAt, dur: dur.enter, ease: 'back' });
      advice.cls('.p3-tw__gain', 'is-price', { at: TWIST.costAt });
      advice.show('.p3-tw__cost', { at: TWIST.costAt, rise: 0 });
      advice.hold(300);

      // The marker: from the ring to "early" (click 1), then on to "later" (click 2). The
      // rail is filled from where it begins up to the marker, once the marker is on it.
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
  // last case, where the wrong answer does not come out, is green. The picture keeps its
  // place: the closing lines have their row from the start.
  // The lead over the picture asks the experiment's question from the first frame, in plain
  // words for the paper's own ('p3.emmons_question'): can a model follow a hint to a wrong
  // answer and keep that out of the reasoning that a monitor reads? The line over the advice
  // says what a stress test is and what the paper's three came to; the hint experiment is
  // not one of them (it is the paper's Sec. 3, the stress tests are its Sec. 5 to 7).
  // ---------------------------------------------------------------------------------------

  // `shake`: where the answer chip's letter stands (px) while it is still asked for and nothing
  // leads to it; `shakeMs` for each move. `glide`: how long the lens takes along the row on
  // the entrance.
  const NEC = Object.freeze({
    cols: 8, rows: 4, hop: 80, drop: 160, chipHalf: 60, chipTop: 28, nodeGap: 16, landing: 36, wipe: 180,
    shake: Object.freeze([0, -8, 8, -6, 6, 0]), shakeMs: 80, glide: 800,
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
  // lands (and with it the third cue); after a pause long enough to take the verdict in,
  // the line about the paper's stress tests arrives, then the advice.
  const NEC_AT = (() => {
    const wipe = 700;
    const lit = wipe + NEC_WORK.length * NEC.wipe + 200;
    const tried = lit + 400;
    const lost = tried + (NEC.shake.length - 1) * NEC.shakeMs + 100;
    const verdict = lost + 300;
    const close = verdict + 1200;
    return Object.freeze({ wipe, lit, tried, lost, verdict, close, keep: close + 600 });
  })();
  // What each of the three cases comes to, in one line under the readout.
  const NEC_RESULTS = Object.freeze([
    { key: 'easy', tone: 'hidden', words: 'Followed, with no mention in the reasoning.' },
    { key: 'hard', tone: 'read', words: 'Followed, by writing every step where the monitor reads.' },
    { key: 'unwritten', tone: 'ok', words: 'Unwritten, the hinted answer comes no more often than with no hint.' },
  ]);
  // Over the picture, from the first frame: the experiment's question ('p3.emmons_question',
  // in plain words; the monitor's lens on the text row is our drawing of "its chain of thought").
  const NEC_LEAD = 'Can a model follow a hint to a wrong answer and keep that out of the reasoning a monitor reads?';
  // Over the advice, three things in the order of the argument. What a stress test is
  // ('p3.emmons_actor', 'p3.emmons_break'). What the paper's own came to: it ran them in
  // three settings ('p3.emmons_three': "in three different environments"), and models evaded
  // the monitor "only when given significant help" ('emmons.help'), with one kind of help
  // named in the paper's words (NEC_HELP, a part of 'emmons.help_kinds': "detailed
  // human-written strategies or iterative optimization against the monitor"). And why that
  // result still calls for more testing, which is the step to the advice: it is a result for
  // today's models, and "future models may be more capable at evading monitors"
  // ('p3.emmons_future', Sec. 1; 'p3.emmons_keep_testing', Sec. 9.2). Until SPEC.md section
  // 7.25 the line said "In this paper's three, models did so ..." and went straight on to
  // the advice.
  // In front of the count under the text row. The row that the monitor reads also holds the
  // answer, and the count is of the reasoning steps in front of it: with the easy hint the
  // answer chip stands in the row and the count is 0. Until the fifth cold read the words
  // were "Written steps it can read:", and a reader counted the answer as one.
  const NEC_TALLY = 'Steps written before the answer:';
  const NEC_HELP = 'human-written strategies';
  if (!text('emmons.help_kinds').includes(NEC_HELP)) throw new Error(`the sentence of Emmons et al. no longer contains "${NEC_HELP}"`);
  const NEC_WHY = (help) => `Stress tests try to make a model evade the monitor. The paper ran them in three settings: models did so ${quoted(help)}, such as ${NEC_HELP}. Future models may be better at it.`;

  Deck.register({
    id: 'p3-necessity',
    part: 3,
    title: 'When the task needs the words, hiding gets hard',
    // The first cue names slide 8: its hack was of the kind that needs no written step
    // ("simple" is the paper's word, 'baker.simple_hack'), which is why it could go quiet there
    // and why the hard hint cannot here. The last cue names slide 7's dots by the word that
    // slide used.
    cues: [
      'Easy hint, like the “assert True” hack: followed, nothing written',
      { text: 'Hard hint: the arithmetic has to be written', step: 1 },
      { text: 'No written steps, no hard hint; the dots took special training', step: 2, at: NEC_AT.verdict },
    ],
    // Sec. 3.1 and Fig. 3 hold the hint experiment; Table 1, Sec. 4 and the abstract the
    // line over the advice ('p3.emmons_three', 'p3.emmons_actor', 'emmons.help' and
    // 'emmons.help_kinds', which that line quotes), and Sec. 1 its last sentence
    // ('p3.emmons_future'); Sec. 9.2 the advice ('p3.emmons_keep_testing').
    cite: [{ src: 'emmons2025', where: 'Sec. 1, 3.1, 4, 9.2, Fig. 3, Table 1; abstract' }, { src: 'baker2025', where: 'Sec. 3.2' }],
    figure: 'schematic',
    html: `
      <div class="p3-nec">
        <p class="p3-nec__lead">${NEC_LEAD} <span class="p3-nec__by">${Deck.sources.emmons2025.short}</span></p>
        <div class="p3-nec__hints">
          <div class="dk-card p3-nec__hint" data-hint="easy">
            <div class="p3-nec__hint-label">Easy hint to a wrong answer</div>
            <div class="p3-nec__hint-text">${esc(text('emmons.simple_hint'))}</div>
            <div class="p3-nec__hint-like">As easy as the professor’s hint.</div>
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
          <p class="p3-nec__whose">Hints and steps: the paper’s own example</p>
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
          <p class="p3-nec__why">${NEC_WHY(text('emmons.help'))}</p>
          ${keepHtml(2)}
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
      const easy = ctx.step({ label: 'the question; easy hint: followed, nothing written' });
      easy.show('.p3-nec__lead', { at: 100, rise: 0 });
      easy.show('[data-hint="easy"]', { at: 200 });
      easy.show('.p3-nec__whose', { at: 300, rise: 0 });
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

      // Click 1: the hard hint. Seven passes; six steps land in the text row before the answer.
      const hard = ctx.step({ label: 'hard hint: six written steps, flagged' });
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
      hard.hold(300);

      // Click 2, the reveal: the cases where the steps were not written. The six steps go, one
      // after the other, and each leaves an empty chip; with nothing written the column above
      // it has nothing to go on and goes dark with it. From the first step that goes, the
      // answer chip is an open question ("C?", dashed) and the verdict "flagged" is gone;
      // then the chip beats, shakes and is struck out: the hinted answer does not come out. After a pause:
      // what the paper's stress tests came to, and the second of the part's three ways to
      // keep the reasoning readable.
      const hide = ctx.step({ label: 'the steps unwritten: the chain breaks; a layer of defense' });
      hide.tween('[data-hint="hard"]', { opacity: [1, 0.5] }, { dur: dur.enter });
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
      hide.show('.p3-nec__why', { at: NEC_AT.close, rise: 0 });
      hide.tween('.p3-keep', POP, { at: NEC_AT.keep, dur: dur.enter, ease: 'back' });
      hide.hold(300);
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 10. What the paper of slide 2 asks of developers (Korbak et al. 2025, Sec. 4): track
  // monitorability, publish it, and let it weigh on what is trained and shipped. The picture
  // draws the paper's own example ('p3.korbak_checkpoint'): monitorability degrades during
  // training, and an earlier checkpoint is preferred. One training run, one row per
  // checkpoint: how capable it is, what it writes on the same task (the title slide's
  // thought, on kit.decay) and whether a monitor can still read that. Judged on capability
  // alone, the last checkpoint ships. Then the monitor's lens goes down the run: the words
  // are there at checkpoints 1 to 3, half of them are dots at 4, and at 5, the one about to
  // ship, nothing is left to read. Once that counts, an earlier checkpoint ships and its
  // system card says so. The slide ends on the paper's last warning and on the third way to
  // keep the reasoning readable.
  // The run is hypothetical and no number on it is measured, so the first line of the picture
  // says so before anything else arrives, in the amber of the footer tags that mark what is
  // ours: the "if" is the paper's, and the paper reports no such run and no such trend; the
  // note on the card's border says the same of the drawing. The two lines under the lead say
  // what a checkpoint, a system card and monitorability are, and one way to measure the last.
  // Nothing moves to make room: the closing lines have their row from the start.
  // ---------------------------------------------------------------------------------------

  const RUN = Object.freeze({
    // One row per checkpoint: the length of its capability bar, and the share of the
    // thought's characters that it no longer writes as words. Both are ours: the paper
    // gives its example in words. The monitorability bar of a row is the share that is
    // left in words, so the bar and the row cannot disagree.
    rows: Object.freeze([
      Object.freeze({ cap: '36%', dark: 0 }),
      Object.freeze({ cap: '52%', dark: 0 }),
      Object.freeze({ cap: '68%', dark: 0 }),
      Object.freeze({ cap: '84%', dark: 0.5 }),
      Object.freeze({ cap: '100%', dark: 1 }),
    ]),
    seed: 23,     // the order in which characters turn into dots; a later row keeps the dots of an earlier one
    kept: 2,      // the row that ships once monitorability counts: the last one still in words
    stale: 0.5,   // the strength of the rows that do not ship (the strength of slide 9's dimmed cards)
    // Enter, in ms: the rows arrive one after the other; when the last one stands, the frame
    // "ships" arrives on it, over `hop`. The frame is on no other checkpoint before click 2:
    // until SPEC.md section 7.25 it hopped down the rows as they arrived, and a frame halfway
    // showed it on the checkpoint that click 2 ends on.
    rowsAt: 700, perRow: 220, hop: 180,
    // Click 1, in ms: the lens goes down the run; as it reaches a row, the row's characters
    // arrive from left to right, a word or a dot each. It stops above the last row, the one
    // about to ship, for `pause`, and that row's dots then arrive more slowly (`lastCell`).
    scanAt: 500, perScan: 400, perCell: 7, pause: 700, lastCell: 12, flipAfter: 400,
    // Click 2, in ms: the frame goes back one checkpoint (`backDur`), stands there for `wait`
    // (half of that row is dots), and goes on to the last row that is all words; its tab
    // arrives, and the quote and the third way follow.
    moveAt: 200, backDur: 400, wait: 400, tabAfter: 200, quoteAfter: 800, keepAfter: 1600,
  });
  // When the beats start, in ms after the step begins: the frame stands on the last
  // checkpoint (enter); the lens stops above the last row, reads it and leaves the run, and
  // the frame takes the color of what is hidden (click 1); the frame stands on the row before
  // the last, then on the kept checkpoint (click 2). The cues follow them.
  const RUN_AT = (() => {
    const landed = RUN.rowsAt + (RUN.rows.length - 1) * RUN.perRow + 100 + RUN.hop;
    const paused = RUN.scanAt + (RUN.rows.length - 1) * RUN.perScan;
    const last = paused + RUN.pause;
    const read = last + RUN.perScan;
    const half = RUN.moveAt + RUN.backDur;
    return Object.freeze({ landed, paused, last, read, flip: read + RUN.flipAfter, half, back: half + RUN.wait + RUN.backDur });
  })();
  // The note on the card's border. From the first frame: the run is a drawing of something
  // that has not been observed. From click 1 on also: whose thought the rows hold.
  const RUN_NOTE = Object.freeze({
    drawn: 'our drawing of a what-if, not data',
    thought: 'our drawing of a what-if, not data · illustrative: the 17 × 24 reasoning',
  });
  // The lead above the card. 'p3.korbak_checkpoint' is the "if" that the picture draws,
  // 'p3.korbak_track' and 'p3.korbak_consider' the argument; the paper gives the example in one
  // sentence and reports no run and no trend. The terms are explained in plain words: a
  // checkpoint is what the paper's example goes back to, a system card is where it asks for
  // the results ('p3.korbak_system_card') and where a deployed model's decision is documented
  // ('p3.korbak_architecture'). Monitorability has one definition, the one slide 2 gave under
  // the paper's title ("can a monitor catch misbehavior by reading it?", after
  // 'p1.korbak_measure'; the paper's own example of a direct measure is
  // 'p3.korbak_end_to_end', Sec. 3), and the same line says how the picture draws it: a
  // row's bar is the share of its characters that are still words. The heading of that
  // column repeats those words and defines nothing. Until SPEC.md section 7.25 the line
  // defined it as "how well a monitor can read the reasoning", gave catching misbehavior as
  // one way to measure it, and the heading said "the share a monitor can read": two
  // definitions on one screen.
  const RUN_LEAD = Object.freeze({
    tag: 'Hypothetical.',
    says: `The paper’s own “if”: ${Deck.sources.korbak2025.short} (the ${text('korbak.authors')}), Sec. 4. No such run or trend is reported.`,
    terms: 'Checkpoint: the model as saved at one point in training. System card: the report published with a model.',
    measure: 'Monitorability: can a monitor catch misbehavior by reading the reasoning (Sec. 3)? Drawn here as the share of it still in words.',
  });
  // Which characters of the thought a row writes as dots (by position among the characters
  // that are not spaces). Pure in (count, share).
  const runDark = (count, share) => new Set(util.shuffled(util.range(count), RUN.seed).slice(0, Math.round(share * count)));
  const runRow = (_, r) => `
    <span class="p3-trk__node" data-row="${r}" style="--r:${r + 2}">${r + 1}</span>
    <span class="p3-trk__bar" data-kind="cap" data-row="${r}" style="--r:${r + 2}"><i></i></span>
    <div class="p3-trk__says" data-row="${r}" style="--r:${r + 2}">
      ${kit.decay({ key: `run-${r}`, text: Deck.motifs.thought })}
      <i class="p3-trk__veil"></i>
    </div>
    <span class="p3-trk__bar" data-kind="mon" data-row="${r}" style="--r:${r + 2}"><i></i></span>`;

  Deck.register({
    id: 'p3-track',
    part: 3,
    // The paper's sentence under item 3 of Sec. 4 ('p3.korbak_consider'), in the deck's
    // words: monitorability is weighed with the other evaluations when a model is deployed.
    title: 'Monitorability should count when a model ships',
    // The last cue carries the limit where the room can read it: one input among the
    // others ('p3.korbak_consider', 'p3.korbak_holistic'), and "here" one outcome of it.
    cues: [
      { text: 'Judged on capability alone, the last checkpoint ships', step: 0, at: RUN_AT.landed + 300 },
      { text: 'Tracked, the run shows where the reasoning stops being readable', step: 1, at: RUN_AT.flip },
      { text: 'Weighed with the other tests: here an earlier checkpoint ships', step: 2, at: RUN_AT.back + RUN.tabAfter },
    ],
    cite: [{ src: 'korbak2025', where: 'Sec. 2; Sec. 3; Sec. 4; Sec. 6' }],
    // Two tags. The run is our drawing of the example the paper gives in words (schematic);
    // the thought in its rows is the title slide's, an example we wrote (illustrative). No
    // measured number is printed: every bar length is ours, and the picture says so.
    figure: ['schematic', 'illustrative'],
    html: `
      <div class="p3-trk">
        <div class="p3-trk__main">
          <div class="p3-trk__lead">
            <p class="p3-trk__not"><b class="p3-trk__tag">${RUN_LEAD.tag}</b>${RUN_LEAD.says}</p>
            <p class="p3-trk__terms">${RUN_LEAD.terms}</p>
            <p class="p3-trk__terms">${RUN_LEAD.measure}</p>
          </div>
          <div class="dk-card p3-trk__card">
            <div class="p3-trk__grid" style="--rows:${RUN.rows.length}">
              <span class="p3-trk__head" data-col="step">Checkpoint</span>
              <span class="p3-trk__head" data-col="cap">Capability</span>
              <span class="p3-trk__head" data-col="says">Its reasoning on the same task</span>
              <span class="p3-trk__head" data-col="mon"><b data-state="off">Monitorability: not tracked</b><b data-state="on">Monitorability: share still in words</b></span>
              <i class="p3-trk__rail"></i>
              ${RUN.rows.map(runRow).join('')}
              <div class="p3-trk__scan">${kit.lens({ key: 'run' })}</div>
              <div class="p3-trk__ring">
                <span class="p3-trk__ships">ships</span>
                <span class="p3-trk__tab">the last checkpoint still fully readable · recorded in its system card</span>
              </div>
            </div>
            ${kit.legend({ key: 'run' })}
          </div>
        </div>
        <div class="p3-trk__close">
          <p class="p3-trk__quote">“… ${text('p3.korbak_persist')}.” <span class="p3-trk__by">${Deck.sources.korbak2025.short}</span></p>
          ${keepHtml(3)}
        </div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const ring = ctx.q('.p3-trk__ring');
      const tag = ctx.q('.p3-trk__ships');
      const lens = ctx.q('[data-lens="run"]');
      const note = ctx.q('.p3-trk__card > .dk-legend');
      const last = RUN.rows.length - 1;
      const rows = RUN.rows.map((row, r) => {
        const cells = ctx.qa(`[data-decay="run-${r}"] .dk-decay__cell`);
        const dark = runDark(cells.length, row.dark);
        return {
          ...row,
          all: ctx.qa(`[data-row="${r}"]`),
          node: ctx.q(`.p3-trk__node[data-row="${r}"]`),
          says: ctx.q(`.p3-trk__says[data-row="${r}"]`),
          veil: ctx.q(`.p3-trk__says[data-row="${r}"] .p3-trk__veil`),
          capFill: ctx.q(`[data-kind="cap"][data-row="${r}"] i`),
          mon: ctx.q(`[data-kind="mon"][data-row="${r}"]`),
          monFill: ctx.q(`[data-kind="mon"][data-row="${r}"] i`),
          read: `${Math.round((1 - dark.size / cells.length) * 100)}%`,
          cells: cells.map((cell, i) => ({
            glyph: cell.querySelector('.dk-decay__glyph'), dot: cell.querySelector('.dk-decay__dot'), dark: dark.has(i),
          })),
        };
      });
      if (rows[RUN.kept].read !== '100%' || rows[last].read !== '0%') throw new Error('the kept checkpoint is no longer all words, or the last one no longer all dots');
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

      // Enter: the run, one checkpoint after the other, each more capable than the one
      // before. When the last one stands, the frame "ships" arrives on it and nowhere else.
      // What each one writes is covered: nobody reads it, and the column on the right is empty.
      const enter = ctx.step({ label: 'judged on capability alone, the last checkpoint ships' });
      enter.show('.p3-trk__lead', { at: 200 });
      enter.show('.p3-trk__card', { at: 400 });
      enter.type(note, RUN_NOTE.drawn, { dur: 0 });
      enter.show('.p3-trk__head', { at: 500, stagger: 60, rise: 0 });
      enter.tween('.p3-trk__rail', { height: ['0px', `${last * pitch}px`] }, { at: RUN.rowsAt, dur: last * RUN.perRow, ease: 'linear' });
      enter.tween(ring, { y: [last * pitch, last * pitch] }, { at: 0, dur: 0 });
      enter.tween(ring, { opacity: [0, 1] }, { at: RUN_AT.landed - RUN.hop, dur: RUN.hop });
      rows.forEach((row, r) => {
        const at = RUN.rowsAt + r * RUN.perRow;
        enter.tween(row.all, { opacity: [0, 1] }, { at, dur: dur.micro });
        enter.tween(row.node, { scale: [0.4, 1] }, { at, dur: dur.enter, ease: 'back' });
        enter.tween(row.capFill, { '--v': ['0%', row.cap] }, { at: at + 100, dur: dur.enter });
      });
      beat(enter, RUN_AT.landed);
      enter.hold(300);

      // Click 1, the reveal: monitorability is tracked. The lens goes down the run and each
      // row shows what that checkpoint writes: words a monitor can read, or dots. The bar
      // on the right is the share still in words. Above the last row, the one in the frame,
      // the lens waits and the tag beats; then that row arrives, dot by dot. The frame has
      // not moved: what was about to ship is the row of dots, and the frame takes the color
      // of what is hidden.
      const track = ctx.step({ label: 'tracked: the lens goes down the run; the last checkpoint writes dots' });
      track.hide('[data-state="off"]', { dur: dur.micro });
      track.tween('[data-state="on"]', { opacity: [0, 1] }, { at: dur.micro, dur: dur.micro });
      track.type(note, RUN_NOTE.thought, { at: RUN.scanAt, dur: 0 });
      track.tween(lens, { opacity: [0, 1] }, { at: RUN.scanAt - dur.micro, dur: dur.micro });
      track.tween(lens, { y: [0, above] }, { at: RUN.scanAt, dur: RUN_AT.paused - RUN.scanAt, ease: 'linear' });
      beat(track, RUN_AT.paused + dur.micro);
      track.tween(lens, { y: [above, travel] }, { at: RUN_AT.last, dur: RUN.perScan, ease: 'linear' });
      rows.forEach((row) => {
        const at = passes(row);
        const perCell = row === rows[last] ? RUN.lastCell : RUN.perCell;
        track.hide(row.veil, { at, dur: dur.micro });
        row.cells.forEach((cell, i) => {
          if (cell.dark) track.tween(cell.dot, { opacity: [0, 1], scale: [0.2, 1] }, { at: at + i * perCell, dur: dur.enter, ease: 'back' });
          else track.tween(cell.glyph, { opacity: [0, 1] }, { at: at + i * perCell, dur: dur.micro });
        });
        track.cls(row.mon, 'is-off', { at, on: false });
        track.tween(row.monFill, { '--v': ['0%', row.read] }, { at: at + 100, dur: dur.enter });
      });
      track.tween(lens, { opacity: [1, 0] }, { at: RUN_AT.read, dur: dur.enter });
      track.cls(ring, 'is-dark', { at: RUN_AT.flip });
      beat(track, RUN_AT.flip);
      track.hold(300);

      // Click 2: it counts. The frame goes back one checkpoint and stands there, still in the
      // color of what is hidden: half of that row is dots. It goes on to the last checkpoint
      // whose reasoning is all words and takes the part's color; each row it leaves dims; a
      // tab on the frame says why this one, and where the reading goes. Then the paper's
      // sentence and the third of the part's three ways to keep the reasoning readable.
      const keep = ctx.step({ label: 'it counts: an earlier checkpoint ships, on record; the third way' });
      const stops = [last, last - 1, RUN.kept];
      keep.tween(ring, { y: [stops[0] * pitch, stops[1] * pitch] }, { at: RUN.moveAt, dur: RUN.backDur, ease: 'inOut' });
      keep.tween(ring, { y: [stops[1] * pitch, stops[2] * pitch] }, { at: RUN_AT.half + RUN.wait, dur: RUN.backDur, ease: 'inOut' });
      keep.tween(rows[stops[0]].all, { opacity: [1, RUN.stale] }, { at: RUN.moveAt + dur.micro, dur: dur.enter });
      keep.tween(rows.slice(RUN.kept + 1, stops[0]).flatMap((row) => row.all), { opacity: [1, RUN.stale] }, { at: RUN_AT.half + RUN.wait + dur.micro, dur: dur.enter });
      keep.cls(ring, 'is-dark', { at: RUN_AT.back - dur.micro, on: false });
      keep.cls(ring, 'is-kept', { at: RUN_AT.back - dur.micro });
      keep.tween('.p3-trk__tab', POP, { at: RUN_AT.back + RUN.tabAfter, dur: dur.enter, ease: 'back' });
      keep.show('.p3-trk__quote', { at: RUN_AT.back + RUN.quoteAfter, dur: dur.move });
      keep.tween('.p3-keep', POP, { at: RUN_AT.back + RUN.keepAfter, dur: dur.enter, ease: 'back' });
      keep.hold(300);
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 11, closing. One callback per part, then the two questions we leave the room with.
  // The row of dots that slide 1 ended on comes back (the shared motif on kit.decay; its
  // letters stay hidden), stands for a moment and gathers into the first question; the
  // second question and the invitation follow in the same click.
  // ---------------------------------------------------------------------------------------

  // The first question names what is given up and then what it is given up for: "to make it
  // smarter" is the aim of the trade, not a result (slide 7 shows a model without words losing
  // at math). The second one starts from the answer "no": even someone who would not make the
  // trade has to be able to tell that the reasoning can still be read. Until section 7.20 of
  // SPEC.md the first asked "if that made it smarter?" and the second began with "And", which
  // read as if it took the first one's "yes" for granted. The line break keeps both lines
  // inside the stage in a wider serif (the first one measures 1626 px in Georgia).
  const CLOSE = Object.freeze({
    ask: Object.freeze(['Would you give up reading a model’s', 'reasoning to make it smarter?']),
    ask2: 'Even if you wouldn’t: how would you know you still can?',
    dark: 'give up reading',
    stagger: 0.45, fade: 0.14,
    tilesAt: 700, perTile: 450, keepsAt: 2300, perKeep: 300,   // the three ways arrive after the third tile, one by one
    dotScale: 0.75,    // a dot of the thought is this much smaller than a dot of the question
    // The echo of slide 1, in ms after the click: its dots arrive and stand for a moment,
    // travel into the question, and the question's letters appear while the last dots land
    // (the screen holds dots and no words for about a second). Then, each after a pause, the
    // second question and the invitation. `dotLeft`: how small a dot is when its letter stands.
    dotsAt: 300, perDot: 6, gatherAt: 1000, gatherDur: 1000, revealAt: 1500, revealDur: 1500,
    secondAt: 4400, endAt: 5500, dotLeft: 0.3,
  });
  // The third tile answers the part's name in the part's color, and no more firmly than the
  // part's evidence allows: it names the condition, and under the tiles stand the three ways
  // to meet it, as slides 8, 9 and 10 each ended on them, in the same words (KEEP).
  const CLOSE_RECAP = Object.freeze([
    { tone: 'read', part: 1, words: 'It can tell us' },
    { tone: 'hidden', part: 2, words: 'It can leave things out' },
    { tone: 'open', part: 3, words: 'It can be kept readable,<br>if we look after it' },
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
  // The question as one box per character: the glyph keeps its place and width from the
  // start, a dot sits on top of it until the character is revealed.
  const closeChar = (ch, dark) =>
    `<span class="p3-cl__ch${dark ? ' is-dark' : ''}"><span class="p3-cl__glyph">${esc(ch)}</span><i class="p3-cl__dot"></i></span>`;
  const closeLine = (line) => {
    const from = line.indexOf(CLOSE.dark);
    const isDark = (at) => from >= 0 && at >= from && at < from + CLOSE.dark.length;
    const words = line.split(' ').reduce((acc, word) => ({
      offset: acc.offset + word.length + 1,
      html: [...acc.html, `<span class="p3-cl__word">${Array.from(word).map((ch, k) => closeChar(ch, isDark(acc.offset + k))).join('')}</span>`],
    }), { offset: 0, html: [] });
    return `<span class="p3-cl__line">${words.html.join(' ')}</span>`;
  };
  const smooth = (p) => 1 - Math.pow(1 - util.clamp(p), 3);

  Deck.register({
    id: 'p3-close',
    part: 3,
    layout: 'bare',
    title: CLOSE.ask.join(' '),
    cite: [],
    html: `
      <div class="p3-cl">
        <div class="p3-cl__recap">
          <p class="p3-cl__thesis">Written reasoning is <em class="c-read">real</em> evidence, and <em class="c-hidden">fragile</em>.</p>
          <div class="p3-cl__tiles">${CLOSE_RECAP.map(closeTile).join('')}</div>
          <div class="p3-cl__keeps">${KEEP.map((_, i) => keepHtml(i + 1)).join('')}</div>
        </div>
        <div class="p3-cl__words">
          <h2 class="p3-cl__ask">${CLOSE.ask.map(closeLine).join('')}</h2>
          <div class="p3-cl__thought">${kit.decay({ key: 'echo', text: Deck.motifs.thought })}</div>
        </div>
        <p class="p3-cl__ask2">${CLOSE.ask2}</p>
        <p class="p3-cl__questions">Questions?</p>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const chars = ctx.qa('.p3-cl__ch').map((el) => ({ glyph: el.querySelector('.p3-cl__glyph'), dot: el.querySelector('.p3-cl__dot') }));
      const seeds = ctx.qa('.p3-cl__thought .dk-decay__dot');
      const next = util.rng(41);
      // Each dot of the question starts on a dot of the thought, in reading order, so the row
      // of dots that slide 1 left behind is what the question is made of. Offsets are read
      // from the layout, in stage pixels.
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
      const order = util.shuffled(util.range(chars.length), 7);
      const turn = Object.fromEntries(order.map((index, rank) => [index, rank / chars.length]));
      const grow = (step, key, at) => {
        const bar = ctx.q(`[data-bar="${key}"]`);
        step.tween(bar, { 'attr:width': [0, Number(bar.getAttribute('width'))] }, { at, dur: dur.enter });
      };

      // Enter: the three parts, one picture and one line each; then, under the third tile's
      // claim, the three ways to keep the reasoning readable, as slides 8, 9 and 10 left them.
      const recap = ctx.step({ label: 'three callbacks, three ways to keep it readable' });
      recap.show('.p3-cl__thesis', { at: 200, dur: dur.move });
      recap.show('.p3-cl__tile', { at: CLOSE.tilesAt, stagger: CLOSE.perTile });
      [['1a', '1b', '1c'], ['2a', '2b', '2c'], ['3a', '3b', '3c']].forEach((bars, tile) => {
        bars.forEach((key, k) => grow(recap, key, CLOSE.tilesAt + 200 + tile * CLOSE.perTile + k * 140));
      });
      recap.show('.p3-cl__keeps .p3-keep', { at: CLOSE.keepsAt, stagger: CLOSE.perKeep, rise: 0 });
      recap.hold(300);

      // Click 1: the recap stays where it entered (until section 7.23-part3 of SPEC.md it
      // entered 172 px lower and moved up here). Under it the dots of slide 1 return, stand
      // for a moment and gather into the question. After a pause the second question, the
      // one still open, and then the floor opens.
      const ask = ctx.step({ label: 'the title slide’s dots return and become the question; how would you know' });
      seeds.forEach((seed, i) => {
        ask.tween(seed, { opacity: [0, 1], scale: [0.2, 1] }, { at: CLOSE.dotsAt + i * CLOSE.perDot, dur: dur.enter, ease: 'back' });
        // The moment the dots leave for the question, the question's own dots stand in for them.
        ask.tween(seed, { opacity: [1, 0] }, { at: CLOSE.gatherAt, dur: 0 });
      });
      const gather = ask.signal({ at: CLOSE.gatherAt, dur: CLOSE.gatherDur, ease: 'linear' });
      const reveal = ask.signal({ at: CLOSE.revealAt, dur: CLOSE.revealDur, ease: 'linear' });
      ask.show('.p3-cl__ask2', { at: CLOSE.secondAt, dur: dur.move });
      ask.show('.p3-cl__questions', { at: CLOSE.endAt, dur: dur.move });
      ask.hold(300);

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
