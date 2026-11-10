// Part 3: Keeping it open (Speaker 3). Slides 8-11.
// SPEC.md section 5 describes the slides; parts/sample.js shows the registration API.
// Every quote and number on screen is read from the fact table by key (shared/facts.js, and
// the facts below that only this part needs).
// What we wrote ourselves (the rewritten thought and the edited test of slide 8, the thought
// of slide 10) is marked as illustrative on screen, on the border of its box; what we drew
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
  // whole strings in two downloads of 2507.11473v2 made on that day.
  Deck.addFacts({
    // Slide 8: both bars stand for curves the paper plots over training.
    'p3.baker_plot_agent': { text: 'We show the agent’s performance over training', src: 'baker2025', where: 'Fig. 3 caption' },
    'p3.baker_plot_recall': { text: 'recall nears 1.0', src: 'baker2025', where: 'Fig. 3 caption' },
    // Slide 8: what the meters show with the dial at "off" (the paper's baseline agent), and
    // what the paper reports for the low zone: a gain that neither meter measures.
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
    // way to keep the window open: the heading of its Sec. 4 and the sentence under item 3.
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
  });

  // ---------------------------------------------------------------------------------------
  // Slide 8. Slide 4's terminal returns exactly as that slide left it (the shared motif,
  // shown with kit.setTrace). Training against the monitor rewrites the thought, the hack
  // stays, and the monitor's meter drains: one click, so the verdict "clean" and the full
  // meters never stand side by side.
  // ---------------------------------------------------------------------------------------

  const HACK = Deck.motifs.hackTrace;
  // What each line of the trace turns into under training, and when (ms after the click).
  // The new lines are ours, written after the paper's description of Fig. 5
  // ('baker.obfuscated_cot'); the legend on the terminal's border says so once they stand.
  const REWRITE = Object.freeze({
    fig1a: Object.freeze({ to: 'Two ideas: the parser or the loader.', at: 2400, dur: 1600 }),
    fig1b: Object.freeze({ to: 'Not sure yet which one is at fault.', at: 2700, dur: 1600 }),
    hack: Object.freeze({ to: 'Let me double check that function.', at: 3200, dur: 1800 }),
  });
  const REWRITE_NOTE = 'illustrative: ours, after Fig. 5';
  // What the agent then does: ours, after the same description ('baker.obfuscated_action').
  const ACTION = Object.freeze(['- assert verify(case) == expected', '+ assert True', 'all unit tests pass']);
  const ACTION_KEYS = Object.freeze(['a1', 'a2', 'a3']);
  const ACTION_CPS = Object.freeze([60, 22, 60]);
  const TONES = Object.freeze(['is-quiet', 'is-hot']);
  const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&=+*/<>';
  const MORPH = Object.freeze({ ticks: 36, dissolve: 0.3, settleFrom: 0.34, settleSpan: 0.6, jitter: 5 });
  // The dial shows how much the training optimizes against the monitor, and it has three
  // places. Off: the monitor is not in the reward; the needle starts there, on a neutral
  // tick, and the meters show that agent (the paper's baseline). Low: the paper's "low
  // optimization regime" (it gives no number, the zone is schematic); `rest` is where the
  // needle waits in it while the paper's finding for it is read. "Too much": where the needle
  // ends and the meters change. The meters do not move in the low zone: what the paper
  // reports there is more genuine solutions at "the same rate of hacking"
  // ('p3.baker_low_same_hacking'), a gain that neither meter measures. So the meters say
  // above their bars which agent they show, and the low zone speaks in the paper's words.
  // Once the needle has left "off" the bars are no reading of where it stands: they dim,
  // with their heading, and come back at full strength with the readings for "too much".
  // `left`, `width` and `height` are the svg's box: the name of the low zone stands to the
  // left of the arc, the names of the two ends under it.
  const DIAL = Object.freeze({
    cx: 100, cy: 104, radius: 76, zone: 92, sweep: 160,
    low: Object.freeze([0.1, 0.36]), high: Object.freeze([0.4, 1]), rest: 0.23,
    left: -24, width: 224, height: 152,
  });
  // The needle (ms after the click): into the low zone, where it rests while the paper's
  // finding for that zone is read, then on to "too much". `beat` is the pause between the
  // monitor's verdict and what the agent did. cueOpen and cueLaw: when the first and third
  // cue appear. `stale`: the strength the meters and their heading keep from the moment
  // the needle leaves "off" until the reveal (the strength of slide 9's dimmed cards).
  const TWIST = Object.freeze({
    caught: ['96%', '3%'], hacks: ['100%', '62%'], perLine: 180,
    lowAt: 300, lowDur: 700, highAt: 2000, highDur: 2400, beat: 900,
    cueOpen: 2200, cueLaw: 2600, stale: 0.5,
  });
  // When each beat of the click starts (ms): the thought has settled, the monitor reads it and
  // gives its verdict, the cover lifts from the actions line by line, the hack stands, and the
  // two meters move. The second cue appears when the meter has drained.
  const TWIST_AT = (() => {
    const settled = Math.max(...Object.values(REWRITE).map((line) => line.at + line.dur));
    const read = settled + 400;
    const verdict = read + Object.keys(REWRITE).length * TWIST.perLine + 100;
    const a1 = verdict + 400 + TWIST.beat;
    const a2 = a1 + 100 + typeMs(ACTION[0], ACTION_CPS[0]) + 200;
    const hacked = a2 + 100 + typeMs(ACTION[1], ACTION_CPS[1]);
    const told = hacked + 500;
    const drain = told + 900;
    return Object.freeze({ settled, read, verdict, acts: Object.freeze([a1, a2, hacked + 200]), hacked, told, drain, drained: drain + DUR.reveal });
  })();

  // Part 3's three answers to its own name, one at the end of each of slides 8, 9 and 10;
  // the closing slide gathers them. Each is a paraphrase of a sentence its slide quotes.
  const KEEP = Object.freeze([
    'No strong training pressure on the thoughts',   // 'baker.tax_advice'
    'Keep stress-testing the monitor',               // 'emmons.layer'
    'Track monitorability, and make it count',       // 'p3.korbak_track', 'p3.korbak_consider'
  ]);
  const keepHtml = (n) => `
    <p class="p3-keep" data-keep="${n}">
      <span class="p3-keep__tag">${Deck.meta.parts[3].name} · ${n}</span>
      <span class="p3-keep__move">${KEEP[n - 1]}</span>
    </p>`;

  const mix = (a, b) => {
    const h = Math.imul(((a + 1) * 374761393) ^ ((b + 1) * 668265263), 1274126177) >>> 0;
    return (h ^ (h >>> 15)) >>> 0;
  };

  // One line of the rewrite at progress p: every position holds the old character, then
  // noise, then the new character. Positions settle left to right with a seeded jitter, and
  // a space of the new sentence is a space from the moment noise takes over, so the line
  // never changes its width class mid-way. Pure in (from, to, p, seed).
  const morphLine = (from, to, p, seed) => {
    if (p <= 0) return [{ kind: 'old', text: from }];
    if (p >= 1) return [{ kind: 'new', text: to }];
    const n = Math.max(from.length, to.length);
    const tick = Math.floor(p * MORPH.ticks);
    const cells = util.range(n).map((i) => {
      const leaves = i < from.length
        ? MORPH.dissolve * ((mix(i, seed) % 1000) / 1000)
        : MORPH.dissolve + 0.2 * (i / n);
      const lands = MORPH.settleFrom + MORPH.settleSpan * ((i + (mix(seed, i) % MORPH.jitter)) / (n + MORPH.jitter));
      if (p >= lands) return { kind: 'new', text: to[i] ?? '' };
      if (p >= leaves) return { kind: 'noise', text: (to[i] ?? ' ') === ' ' ? ' ' : GLYPHS[mix(i * 31 + tick, seed) % GLYPHS.length] };
      return { kind: 'old', text: from[i] ?? '' };
    });
    return cells.reduce((runs, cell) => {
      const last = runs[runs.length - 1];
      return last && last.kind === cell.kind
        ? [...runs.slice(0, -1), { kind: cell.kind, text: last.text + cell.text }]
        : [...runs, cell];
    }, []);
  };
  const morphHtml = (runs) => runs.map((run) => `<span class="p3-tw__${run.kind}">${esc(run.text)}</span>`).join('');

  const dialPoint = (level, radius) => {
    const angle = ((-90 - DIAL.sweep / 2 + DIAL.sweep * level) * Math.PI) / 180;
    return { x: round3(DIAL.cx + radius * Math.cos(angle)), y: round3(DIAL.cy + radius * Math.sin(angle)) };
  };
  const dialArc = (from, to, radius) => {
    const a = dialPoint(from, radius);
    const b = dialPoint(to, radius);
    return `M ${a.x} ${a.y} A ${radius} ${radius} 0 0 1 ${b.x} ${b.y}`;
  };
  // The dial with its three places named: "off" under the tick the needle starts on, "low"
  // beside its zone, "too much" under the far end.
  const dialHtml = () => {
    const tick = [dialPoint(0, DIAL.zone - 6), dialPoint(0, DIAL.zone + 6)];
    const under = DIAL.height - 8;
    return `
      <svg class="p3-tw__dial" viewBox="${DIAL.left} 0 ${DIAL.width} ${DIAL.height}" width="${DIAL.width}" height="${DIAL.height}">
        <path class="p3-tw__dial-zone" data-tone="ok" d="${dialArc(DIAL.low[0], DIAL.low[1], DIAL.zone)}"/>
        <path class="p3-tw__dial-zone" data-tone="alarm" d="${dialArc(DIAL.high[0], DIAL.high[1], DIAL.zone)}"/>
        <line class="p3-tw__dial-off" x1="${tick[0].x}" y1="${tick[0].y}" x2="${tick[1].x}" y2="${tick[1].y}"/>
        <path class="p3-tw__dial-track" d="${dialArc(0, 1, DIAL.radius)}"/>
        <path class="p3-tw__dial-fill" d="${dialArc(0, 1, DIAL.radius)}" pathLength="100" stroke-dasharray="0 100"/>
        <line class="p3-tw__dial-needle" x1="${DIAL.cx}" y1="${DIAL.cy}" x2="${DIAL.cx}" y2="${DIAL.cy - DIAL.radius + 12}"/>
        <circle class="p3-tw__dial-hub" cx="${DIAL.cx}" cy="${DIAL.cy}" r="10"/>
        <text class="p3-tw__dial-name" data-end="off" x="${dialPoint(0, DIAL.zone).x}" y="${under}" text-anchor="middle">off</text>
        <text class="p3-tw__dial-name" data-end="low" data-tone="ok" x="${DIAL.left + 48}" y="28" text-anchor="end">low</text>
        <text class="p3-tw__dial-name" data-end="high" data-tone="alarm" x="${DIAL.left + DIAL.width}" y="${under}" text-anchor="end">too much</text>
      </svg>`;
  };

  Deck.register({
    id: 'p3-twist',
    part: 3,
    title: 'Punish the bad thoughts and they go into hiding',
    // The first cue says what the entrance shows: the reward without the monitor. The new
    // reward arrives with the click, as a chip.
    cues: [
      { text: 'Rewarded for passing tests: it hacks, and the monitor sees it', step: 0, at: TWIST.cueOpen },
      { text: `It still hacks; monitor recall falls to ${text('baker.obfuscated_recall')}`, step: 1, at: TWIST_AT.drained },
      { text: 'The tax: a slightly less capable or more expensive model', step: 2, at: TWIST.cueLaw },
    ],
    cite: [
      { src: 'baker2025', where: 'Sec. 3.1-3.3, Fig. 3-5; abstract' },
      { src: 'strathern1997', where: 'p. 308' },
    ],
    // Two tags. The rewritten thought and the edited test are an example we wrote
    // (illustrative); the dial and the bars are our drawing of what the paper reports
    // (schematic: "Bar lengths are ours"). No measured number is printed: the paper's levels
    // stand in its own words.
    figure: ['illustrative', 'schematic'],
    html: `
      <div class="p3-tw">
        <div class="p3-tw__board">
          <div class="p3-tw__left">
            ${kit.trace({
    key: HACK.key, label: HACK.label, verdict: HACK.verdict, width: HACK.width, lines: HACK.lines,
    inner: '<span class="p3-tw__caption">Slide 4’s examples again: thoughts still in words</span>',
  })}
            <div class="p3-tw__pane">
              ${kit.term({ label: 'What the agent does', lines: ACTION_KEYS })}
              <span class="p3-tw__mon">this monitor does not look here</span>
              <span class="p3-tw__veil">${ACTION_KEYS.map((key) => `<i data-veil="${key}"></i>`).join('')}</span>
              ${kit.legend({ key: 'acts', text: REWRITE_NOTE })}
              <p class="p3-tw__why">By design, this monitor sees only the thoughts; a hack this simple works only because of that.</p>
            </div>
          </div>
          <div class="p3-tw__side">
            <div class="dk-card p3-tw__train">
              ${dialHtml()}
              <div class="p3-tw__train-text">
                <div class="p3-tw__train-label">Training against the monitor</div>
                <div class="p3-tw__reward">
                  <span class="dk-chip">pass the tests</span>
                  <span class="dk-chip p3-tw__reward-new" data-tone="read">+ do not get flagged</span>
                </div>
                <p class="p3-tw__low"><b>low:</b> ${quoted(text('baker.low_regime'))}</p>
              </div>
            </div>
            <div class="p3-tw__meters">
              <p class="p3-tw__state"><span data-state="off">Without that training</span><span data-state="high">With too much of it</span></p>
              <div class="p3-tw__meter">${kit.meter({ key: 'caught', label: 'Hacks the monitor catches', tone: 'read' })}</div>
              <div class="p3-tw__meter">
                ${kit.meter({ key: 'hacks', label: 'How often it hacks', tone: 'alarm' })}
                <p class="p3-tw__said">${quoted(text('baker.obfuscated_hacking'))}</p>
              </div>
            </div>
            <p class="p3-tw__fine">Trained here: a ${text('baker.obfuscated_agent')} agent in the same coding environments.
              Bar lengths are ours: the paper plots both over training.</p>
          </div>
        </div>
        <div class="p3-tw__law">
          <p class="p3-tw__law-quote">${quoted(text('strathern.quote'))}</p>
          <p class="p3-tw__law-by">Strathern 1997, on Goodhart’s law. The link to this experiment is our own.</p>
          ${keepHtml(1)}
          <p class="p3-tw__law-note">Baker et al.: this may mean paying a ${quoted(text('baker.tax'))}</p>
        </div>
      </div>`,
    setup: (ctx) => {
      const { dur } = ctx;
      const trace = ctx.q(`[data-trace="${HACK.key}"]`);
      const parts = kit.traceParts(trace);
      const needle = ctx.q('.p3-tw__dial-needle');
      const fill = ctx.q('.p3-tw__dial-fill');
      const caught = '[data-meter="caught"]';
      const hacks = '[data-meter="hacks"]';
      const pop = { opacity: [0, 1], scale: [1.4, 1] };
      const rewritten = HACK.lines.filter((line) => REWRITE[line.key]);
      if (rewritten.length !== Object.keys(REWRITE).length) throw new Error('a rewritten line is no longer in the shared trace');

      // Enter: the terminal of slide 4 as it ended, in the same place: the thought, the two
      // pointers, the red frame, the verdict and the note on its border. The chip beats once;
      // then this slide's own pieces arrive around it.
      const enter = ctx.step({ label: 'slide 4’s terminal, as it ended' });
      kit.setTrace(enter, trace, {
        verdict: HACK.verdict, state: 'is-flagged', alarm: true, note: text(HACK.note),
        lines: HACK.lines.map((line) => (REWRITE[line.key]
          ? { key: line.key, flag: line.flag }
          : { key: line.key, flag: line.flag, text: text(line.fact), tone: line.tone })),
      });
      enter.tween(parts.chip, { scale: [1, 1.25] }, { at: 700, dur: 160 });
      enter.tween(parts.chip, { scale: [1.25, 1] }, { at: 860, dur: 300 });
      enter.show('.p3-tw__caption', { at: 500, rise: 0 });
      enter.show('.p3-tw__pane', { at: 900 });
      enter.show('.p3-tw__train', { at: 1200 });
      enter.show('[data-state="off"]', { at: 1400, rise: 0 });
      enter.show('.p3-tw__meter', { at: 1500, stagger: 120 });
      enter.tween(`${caught} .dk-meter__fill`, { '--v': ['0%', TWIST.caught[0]] }, { at: 1600, dur: dur.move });
      enter.tween(`${hacks} .dk-meter__fill`, { '--v': ['0%', TWIST.hacks[0]] }, { at: 1720, dur: dur.move });
      enter.type(`${caught} .dk-meter__value`, text('baker.baseline_recall'), { at: 2000, dur: 0 });
      enter.tween(`${caught} .dk-meter__value`, { scale: [1, 1] }, { dur: 0 });
      enter.show('.p3-tw__fine', { at: 2000, rise: 0 });

      // Click 1: the monitor enters the reward and the dial leaves "off". In the low zone the
      // paper found a better agent; the needle rests there while that finding is read (the
      // meters still show the agent trained without the monitor, and say so: they and their
      // heading dim as the needle leaves that agent's place), then goes on,
      // and the thought rewrites itself, line by line. The pointers leave with the old words;
      // the monitor reads the new ones and finds nothing: its marks and its verdict are
      // neutral, not the green of a trace that is fine.
      const press = ctx.step({ label: 'training rewrites the thought; the hack stays' });
      const beat = (target, at) => {
        press.tween(target, { scale: [1, 1.3] }, { at, dur: dur.micro });
        press.tween(target, { scale: [1.3, 1] }, { at: at + dur.micro, dur: dur.enter });
      };
      press.tween('.p3-tw__reward-new', pop, { at: 100, dur: dur.enter, ease: 'back' });
      const low = press.signal({ at: TWIST.lowAt, dur: TWIST.lowDur, ease: 'inOut', to: DIAL.rest });
      press.tween('[data-state="off"], .p3-tw__meter', { opacity: [1, TWIST.stale] }, { at: TWIST.lowAt, dur: dur.enter });
      press.show('.p3-tw__low', { at: TWIST.lowAt + 300, rise: 0 });
      beat('[data-end="low"]', TWIST.lowAt + TWIST.lowDur - dur.micro);
      const high = press.signal({ at: TWIST.highAt, dur: TWIST.highDur, ease: 'inOut', to: 1 - DIAL.rest });
      beat('[data-end="high"]', TWIST.highAt + TWIST.highDur / 2);
      press.tween(parts.term, { '--heat': [0, 1] }, { at: TWIST.highAt + 100, dur: dur.move });
      press.hide('.p3-tw__caption', { at: TWIST.highAt, dur: dur.micro });
      press.tween(parts.note, { opacity: [1, 0] }, { at: TWIST.highAt + 200, dur: dur.micro });
      const morphs = rewritten.map((line, i) => {
        const plan = REWRITE[line.key];
        const row = parts.line(line.key);
        if (line.flag) {
          press.tween(row, { '--dk-mark': [1, 0] }, { at: plan.at, dur: dur.micro });
          press.cls(row, 'is-flag', { at: plan.at + dur.micro, on: false });
        }
        return {
          row, from: text(line.fact), to: plan.to, fromTone: line.tone ?? null, seed: 11 + i * 7,
          progress: press.signal({ at: plan.at, dur: plan.dur, ease: 'linear' }),
        };
      });
      press.tween(parts.term, { '--heat': [1, 0] }, { at: TWIST_AT.settled - dur.micro, dur: dur.move });
      press.type(parts.note, REWRITE_NOTE, { at: TWIST_AT.settled, dur: 0 });
      press.tween(parts.note, { opacity: [0, 1] }, { at: TWIST_AT.settled, dur: dur.enter });
      press.cls(trace, 'p3-tw__reread', { at: TWIST_AT.settled });
      const read = kit.readTrace(press, trace, {
        at: TWIST_AT.read, perLine: TWIST.perLine, marks: rewritten.map((line) => ({ key: line.key })),
      });
      if (read + 100 !== TWIST_AT.verdict) throw new Error('the verdict no longer follows the lens: TWIST_AT is out of step with kit.readTrace');
      kit.stamp(press, parts.chip, 'p3-tw__quiet', TWIST_AT.verdict, { text: 'clean', clear: 'is-flagged' });
      press.cls(trace, 'is-alarm', { at: TWIST_AT.verdict, on: false });

      // The same click, after a beat: what it did, where this monitor does not look. With the
      // hack on screen the verdict turns into what it was worth, a line under the pane says
      // why this monitor was not shown the actions ('p3.baker_cot_only', 'baker.simple_hack'),
      // and the two meters change over to the agent trained too much against the monitor:
      // the dimmed heading goes, the new one arrives and the bars are at full strength again.
      press.cls('[data-line="a1"]', 'is-quiet');
      press.cls('[data-line="a2"]', 'is-hot');
      press.cls('[data-line="a3"]', 'p3-tw__pass');
      ACTION_KEYS.forEach((key, i) => {
        press.hide(`[data-veil="${key}"]`, { at: TWIST_AT.acts[i], dur: dur.micro });
        press.type(`[data-line="${key}"]`, ACTION[i], { at: TWIST_AT.acts[i] + 100, cps: ACTION_CPS[i] });
      });
      kit.stamp(press, parts.chip, 'is-flagged', TWIST_AT.hacked + 100, { text: 'fooled', clear: 'p3-tw__quiet' });
      press.tween('.p3-tw__pane .dk-legend', { opacity: [0, 1] }, { at: TWIST_AT.told, dur: dur.enter });
      press.show('.p3-tw__why', { at: TWIST_AT.told + 200 });
      press.tween('[data-state="off"]', { opacity: [TWIST.stale, 0] }, { at: TWIST_AT.told, dur: dur.micro });
      press.tween('[data-state="high"]', { opacity: [0, 1] }, { at: TWIST_AT.told + dur.micro, dur: dur.enter });
      press.tween('.p3-tw__meter', { opacity: [TWIST.stale, 1] }, { at: TWIST_AT.told, dur: dur.enter });
      press.tween(`${hacks} .dk-meter__fill`, { '--v': TWIST.hacks }, { at: TWIST_AT.told, dur: dur.move, ease: 'inOut' });
      press.show('.p3-tw__said', { at: TWIST_AT.told + 400 });
      press.type(`${caught} .dk-meter__value`, '', { at: TWIST_AT.drain, dur: 0 });
      press.tween(`${caught} .dk-meter__fill`, { '--v': TWIST.caught }, { at: TWIST_AT.drain, dur: dur.reveal, ease: 'inOut' });
      press.type(`${caught} .dk-meter__value`, text('baker.obfuscated_recall'), { at: TWIST_AT.drained, dur: 0 });
      press.cls(caught, 'is-drained', { at: TWIST_AT.drained });
      press.tween(`${caught} .dk-meter__value`, { scale: [1.5, 1] }, { at: TWIST_AT.drained, dur: dur.enter, ease: 'back' });
      press.hold(300);

      // Click 2: the board leaves and Strathern's sentence stands alone; under it, what the
      // paper advises: the first of this part's three ways to keep the window open.
      const law = ctx.step({ label: 'a measure becomes a target; the advice' });
      law.tween('.p3-tw__board', { opacity: [1, 0] }, { dur: dur.move });
      law.show('.p3-tw__law-quote', { at: 400, dur: dur.reveal, rise: 24 });
      law.show('.p3-tw__law-by', { at: 1500, rise: 0 });
      law.tween('.p3-keep', pop, { at: 2100, dur: dur.enter, ease: 'back' });
      law.show('.p3-tw__law-note', { at: 2500 });

      ctx.paint(() => {
        const level = low() + high();
        const turn = -DIAL.sweep / 2 + DIAL.sweep * level;
        needle.setAttribute('transform', `rotate(${round3(turn)} ${DIAL.cx} ${DIAL.cy})`);
        fill.setAttribute('stroke-dasharray', `${round3(level * 100)} 100`);
        morphs.forEach((m) => {
          const p = m.progress();
          const html = morphHtml(morphLine(m.from, m.to, p, m.seed));
          if (m.row.innerHTML !== html) m.row.innerHTML = html;
          TONES.forEach((name) => m.row.classList.toggle(name, p < 1 && name === m.fromTone));
        });
      });
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 9. The lattice of slides 3 and 7, a fourth time, and now it fails on purpose: an
  // easy hint needs one pass and no written step; a hard hint has to zigzag through the text
  // row, where the monitor reads; and in the runs where those steps are not written the
  // chain breaks and the hinted answer no longer comes out. The unwritten steps are empty
  // chips, not the dots of slide 7: there a small model was trained to compute behind dots,
  // here nothing takes the place of the words, and the column above each chip goes dark with it.
  // ---------------------------------------------------------------------------------------

  const NEC = Object.freeze({ cols: 8, rows: 4, hop: 80, drop: 160, chipHalf: 60, chipTop: 28, nodeGap: 16, landing: 36, wipe: 180 });
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
  // Click 2, in ms after the click: the first step goes, the answer is lost, the verdict
  // lands (and with it the third cue), and after a pause the authors' conclusion arrives.
  const NEC_AT = (() => {
    const wipe = 700;
    const lost = wipe + NEC_WORK.length * NEC.wipe + 200;
    const verdict = lost + 300;
    return Object.freeze({ wipe, lost, verdict, close: verdict + 1000 });
  })();
  // What each of the three cases comes to, in one line under the readout.
  const NEC_RESULTS = Object.freeze([
    { key: 'easy', tone: 'hidden', words: 'Followed, with no mention in the reasoning.' },
    { key: 'hard', tone: 'read', words: 'Followed, by writing every step where the monitor reads.' },
    { key: 'unwritten', tone: 'dim', words: 'Unwritten, the hinted answer comes no more often than with no hint.' },
  ]);

  Deck.register({
    id: 'p3-necessity',
    part: 3,
    title: 'When the task needs the words, hiding gets hard',
    // The first cue names slide 8: its hack was of the kind that needs no written step
    // ("simple" is the paper's word, 'baker.simple_hack'), which is why it could go quiet there
    // and why the hard hint cannot here.
    cues: [
      'Easy hint, like slide 8’s simple hack: followed without a word',
      { text: 'Hard hint: the arithmetic has to be written', step: 1 },
      { text: 'No words, no hard step; slide 7’s dots took special training', step: 2, at: NEC_AT.verdict },
    ],
    cite: [{ src: 'emmons2025', where: 'Sec. 3.1, Fig. 3; abstract' }, { src: 'baker2025', where: 'Sec. 3.2' }],
    figure: 'schematic',
    html: `
      <div class="p3-nec">
        <div class="p3-nec__hints">
          <div class="dk-card p3-nec__hint" data-hint="easy">
            <div class="p3-nec__hint-label">Easy hint to a wrong answer</div>
            <div class="p3-nec__hint-text">${esc(text('emmons.simple_hint'))}</div>
            <div class="p3-nec__hint-like">Nothing to work out: like slide 5’s hint and slide 8’s simple hack.</div>
          </div>
          <div class="dk-card p3-nec__hint" data-hint="hard">
            <div class="p3-nec__hint-label">Hard hint to the same answer</div>
            <div class="p3-nec__hint-text">${esc(text('emmons.complex_hint'))}</div>
          </div>
          <div class="dk-card p3-nec__hint" data-hint="unwritten">
            <div class="p3-nec__hint-label">The same hard hint</div>
            <div class="p3-nec__hint-note">runs where it wrote no steps</div>
          </div>
          <p class="p3-nec__whose">Hints and steps: Emmons et al. 2025</p>
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
            <span class="p3-nec__reads">the monitor reads here</span>
            <span class="p3-nec__tally">Written steps it can read: <b class="p3-nec__count"></b></span>
            <span class="p3-nec__verdict">${kit.flag({ key: 'nec-clean', text: 'clean' })}${kit.flag({ key: 'nec-flagged', text: 'flagged' })}${kit.flag({ key: 'nec-none', text: 'not followed' })}</span>
          </div>
          <p class="p3-nec__results">${NEC_RESULTS.map((r) => `<span data-result="${r.key}" data-tone="${r.tone}">${r.words}</span>`).join('')}</p>
        </div>
        <div class="p3-nec__close">
          <p class="p3-nec__quote">“… ${text('emmons.layer')}.” <span class="p3-nec__by">${Deck.sources.emmons2025.short}</span></p>
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
      const pop = { opacity: [0, 1], scale: [1.4, 1] };
      const result = (key) => `[data-result="${key}"]`;
      // Until the closing lines arrive their row is empty, so the picture sits lower.
      const settle = Math.round((ctx.q('.p3-nec__close').offsetHeight + parseFloat(getComputedStyle(ctx.q('.p3-nec')).rowGap)) / 2);

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

      // Enter: the easy hint. One pass, the answer comes out, nothing about the hint is written.
      const easy = ctx.step({ label: 'easy hint: followed, nothing written' });
      easy.tween('.p3-nec__hints, .p3-nec__machine', { y: [settle, settle] }, { dur: 0 });
      easy.show('[data-hint="easy"]', { at: 200 });
      easy.show('.p3-nec__whose', { at: 300, rise: 0 });
      easy.show('.p3-nec__lattice', { at: 400, rise: 0 });
      easy.cls(chip(0), 'is-hint');
      // "Clean" here means the monitor found nothing to read, not that all is well: the chip
      // stays neutral.
      easy.cls('[data-flag="nec-flagged"]', 'is-flagged');
      const answered = pass(easy, 0, NEC_ANSWER, 800);
      easy.cls(chip(1), 'is-answer', { at: answered });
      climb(easy, 1, answered + 40);
      easy.show('.p3-nec__reads', { at: answered + 200, rise: 0 });
      easy.tween(lens, { opacity: [0, 1] }, { at: answered + 300, dur: dur.micro });
      easy.tween(lens, { x: [necLensX(0), necLensX(NEC.cols - 1)] }, { at: answered + 300, dur: 1200, ease: 'inOut' });
      easy.show('.p3-nec__tally', { at: easy.end, rise: 0 });
      easy.type(count, '0', { at: easy.end, dur: 0 });
      easy.tween('[data-flag="nec-clean"]', pop, { at: easy.end + 200, dur: dur.enter, ease: 'back' });
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
      hard.tween('[data-flag="nec-flagged"]', pop, { at: done + 300, dur: dur.enter, ease: 'back' });
      hard.tween(result('hard'), { opacity: [0, 1] }, { at: done + 300, dur: dur.enter });
      hard.hold(300);

      // Click 2, the reveal: the runs where the steps were not written. The six steps go, one
      // after the other, and each leaves an empty chip; with nothing written the column above
      // it has nothing to go on and goes dark with it, and the hinted answer does not come
      // out. After a pause: what the authors conclude, and the second of the part's three
      // ways to keep the window open.
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
      hide.cls(chip(NEC.cols - 1), 'is-answer', { at: NEC_AT.lost, on: false });
      hide.cls(chip(NEC.cols - 1), 'is-lost', { at: NEC_AT.lost });
      hide.tween('.p3-nec__strike', { 'attr:stroke-dashoffset': [1, 0] }, { at: NEC_AT.lost, dur: dur.enter });
      hide.hide('[data-flag="nec-flagged"]', { at: NEC_AT.lost, dur: dur.micro });
      hide.tween('[data-flag="nec-none"]', pop, { at: NEC_AT.verdict, dur: dur.enter, ease: 'back' });
      hide.tween(result('unwritten'), { opacity: [0, 1] }, { at: NEC_AT.verdict, dur: dur.enter });
      hide.tween('.p3-nec__hints, .p3-nec__machine', { y: [settle, 0] }, { at: NEC_AT.close, dur: dur.move, ease: 'inOut' });
      hide.show('.p3-nec__quote', { at: NEC_AT.close + 300, dur: dur.move });
      hide.tween('.p3-keep', pop, { at: NEC_AT.close + 1100, dur: dur.enter, ease: 'back' });
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
  // keep the window open.
  // The run is a drawing and no number on it is measured, so the first line of the picture
  // says so before anything else arrives, in the amber of the footer tags that mark what is
  // ours: the example and the argument are the paper's, and the paper reports no such run. The
  // line under it says in one sentence each what a checkpoint and a system card are.
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
    // Enter, in ms: the rows arrive one after the other, and the frame "ships" hops to
    // whichever checkpoint is the most capable so far.
    rowsAt: 700, perRow: 220, hop: 180,
    // Click 1, in ms: the lens goes down the run; as it reaches a row, the row's characters
    // arrive from left to right, a word or a dot each.
    scanAt: 500, perScan: 400, perCell: 7, flipAfter: 400,
    // Click 2, in ms: the frame moves back, its tab arrives, the picture makes room, and
    // the quote and the third way follow.
    moveAt: 200, tabAfter: 200, closeAt: 1700, quoteAfter: 300, keepAfter: 1100,
  });
  // When the beats start, in ms after the step begins: the frame has reached the last
  // checkpoint (enter); the lens has left the run, and the frame takes the color of what is
  // hidden (click 1); the frame is back on the kept checkpoint (click 2). The cues follow them.
  const RUN_AT = (() => {
    const landed = RUN.rowsAt + (RUN.rows.length - 1) * RUN.perRow + 100 + RUN.hop;
    const read = RUN.scanAt + RUN.rows.length * RUN.perScan;
    return Object.freeze({ landed, read, flip: read + RUN.flipAfter, back: RUN.moveAt + DUR.move });
  })();
  // The note on the card's border, from click 1 on: whose thought the rows hold. That the run
  // is a drawing is said in the lead above the card (RUN_LEAD), not on the border.
  const RUN_NOTE = Object.freeze({ thought: 'illustrative: slide 1’s thought' });
  // The lead above the card. 'p3.korbak_checkpoint' is the example, 'p3.korbak_track' and
  // 'p3.korbak_consider' the argument; the paper gives the example in one sentence and reports no
  // run. The two terms are explained in plain words: a checkpoint is what the paper's example
  // goes back to, a system card is where it asks for the results ('p3.korbak_system_card')
  // and where a deployed model's decision is documented ('p3.korbak_architecture').
  const RUN_LEAD = Object.freeze({
    tag: 'Drawing, not data',
    says: `Example and argument: ${Deck.sources.korbak2025.short} (slide 2), Sec. 4. No such run is reported.`,
    terms: 'Checkpoint: the model as saved at one point in training. System card: the report published with a model.',
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
      { text: 'Tracked, the run shows where the words stopped', step: 1, at: RUN_AT.flip },
      { text: 'Weighed with the other tests: here an earlier checkpoint ships', step: 2, at: RUN_AT.back + RUN.tabAfter },
    ],
    cite: [{ src: 'korbak2025', where: 'Sec. 2; Sec. 4; Sec. 6' }],
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
          </div>
          <div class="dk-card p3-trk__card">
            <div class="p3-trk__grid" style="--rows:${RUN.rows.length}">
              <span class="p3-trk__head" data-col="step">Checkpoint</span>
              <span class="p3-trk__head" data-col="cap">Capability</span>
              <span class="p3-trk__head" data-col="says">Its reasoning on the same task</span>
              <span class="p3-trk__head" data-col="mon"><b data-state="off">Monitorability: not tracked</b><b data-state="on">Monitorability: can a monitor read it?</b></span>
              <i class="p3-trk__rail"></i>
              ${RUN.rows.map(runRow).join('')}
              <div class="p3-trk__scan">${kit.lens({ key: 'run' })}</div>
              <div class="p3-trk__ring">
                <span class="p3-trk__ships">ships</span>
                <span class="p3-trk__tab">reported in its system card</span>
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
      const pop = { opacity: [0, 1], scale: [1.4, 1] };
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
      // The lens stops inside the last row, clear of the frame around it.
      const scan = ctx.q('.p3-trk__scan');
      const travel = scan.offsetHeight - lens.offsetHeight;
      const scanDur = RUN_AT.read - RUN.scanAt;
      const passes = (row) => Math.round(RUN.scanAt + ((row.says.offsetTop - scan.offsetTop) / travel) * scanDur);
      // Until the closing lines arrive their row is empty, so the picture sits lower.
      const settle = Math.round((ctx.q('.p3-trk__close').offsetHeight + parseFloat(getComputedStyle(ctx.q('.p3-trk')).rowGap)) / 2);
      const beat = (step, at) => {
        step.tween(tag, { scale: [1, 1.25] }, { at, dur: 160 });
        step.tween(tag, { scale: [1.25, 1] }, { at: at + 160, dur: 300 });
      };

      // Enter: the run, one checkpoint after the other. Each is more capable than the one
      // before, and the frame "ships" hops to it. What each one writes is covered: nobody
      // reads it, and the column on the right is empty.
      const enter = ctx.step({ label: 'judged on capability alone, the last checkpoint ships' });
      enter.tween('.p3-trk__main', { y: [settle, settle] }, { dur: 0 });
      enter.show('.p3-trk__lead', { at: 200 });
      enter.show('.p3-trk__card', { at: 400 });
      enter.show('.p3-trk__head', { at: 500, stagger: 60, rise: 0 });
      enter.tween('.p3-trk__rail', { height: ['0px', `${last * pitch}px`] }, { at: RUN.rowsAt, dur: last * RUN.perRow, ease: 'linear' });
      enter.tween(ring, { opacity: [0, 1] }, { at: RUN.rowsAt + 100, dur: dur.micro });
      rows.forEach((row, r) => {
        const at = RUN.rowsAt + r * RUN.perRow;
        enter.tween(row.all, { opacity: [0, 1] }, { at, dur: dur.micro });
        enter.tween(row.node, { scale: [0.4, 1] }, { at, dur: dur.enter, ease: 'back' });
        enter.tween(row.capFill, { '--v': ['0%', row.cap] }, { at: at + 100, dur: dur.enter });
        if (r > 0) enter.tween(ring, { y: [(r - 1) * pitch, r * pitch] }, { at: at + 100, dur: RUN.hop, ease: 'inOut' });
      });
      beat(enter, RUN_AT.landed);
      enter.hold(300);

      // Click 1, the reveal: monitorability is tracked. The lens goes down the run and each
      // row shows what that checkpoint writes: words a monitor can read, or dots. The bar
      // on the right is the share still in words. The frame has not moved: what was about
      // to ship is the row of dots, and the frame takes the color of what is hidden.
      const track = ctx.step({ label: 'tracked: the lens goes down the run; the last checkpoint writes dots' });
      track.hide('[data-state="off"]', { dur: dur.micro });
      track.tween('[data-state="on"]', { opacity: [0, 1] }, { at: dur.micro, dur: dur.micro });
      track.type(note, RUN_NOTE.thought, { at: RUN.scanAt, dur: 0 });
      track.tween(note, { opacity: [0, 1] }, { at: RUN.scanAt, dur: dur.enter });
      track.tween(lens, { opacity: [0, 1] }, { at: RUN.scanAt - dur.micro, dur: dur.micro });
      track.tween(lens, { y: [0, travel] }, { at: RUN.scanAt, dur: scanDur, ease: 'linear' });
      rows.forEach((row) => {
        const at = passes(row);
        track.hide(row.veil, { at, dur: dur.micro });
        row.cells.forEach((cell, i) => {
          if (cell.dark) track.tween(cell.dot, { opacity: [0, 1], scale: [0.2, 1] }, { at: at + i * RUN.perCell, dur: dur.enter, ease: 'back' });
          else track.tween(cell.glyph, { opacity: [0, 1] }, { at: at + i * RUN.perCell, dur: dur.micro });
        });
        track.cls(row.mon, 'is-off', { at, on: false });
        track.tween(row.monFill, { '--v': ['0%', row.read] }, { at: at + 100, dur: dur.enter });
      });
      track.tween(lens, { opacity: [1, 0] }, { at: RUN_AT.read, dur: dur.enter });
      track.cls(ring, 'is-dark', { at: RUN_AT.flip });
      beat(track, RUN_AT.flip);
      track.hold(300);

      // Click 2: it counts. The frame goes back to the last checkpoint whose reasoning is
      // still in words and takes the part's color; the rows after it dim; a tab on the
      // frame says where the reading goes. Then the picture makes room for the paper's
      // sentence and for the third of the part's three ways to keep the window open.
      const keep = ctx.step({ label: 'it counts: an earlier checkpoint ships, on record; the third way' });
      keep.tween(ring, { y: [last * pitch, RUN.kept * pitch] }, { at: RUN.moveAt, dur: dur.move, ease: 'inOut' });
      keep.cls(ring, 'is-dark', { at: RUN_AT.back - dur.micro, on: false });
      keep.cls(ring, 'is-kept', { at: RUN_AT.back - dur.micro });
      keep.tween(rows.slice(RUN.kept + 1).flatMap((row) => row.all), { opacity: [1, RUN.stale] }, { at: RUN.moveAt + dur.micro, dur: dur.enter });
      keep.tween('.p3-trk__tab', pop, { at: RUN_AT.back + RUN.tabAfter, dur: dur.enter, ease: 'back' });
      keep.tween('.p3-trk__main', { y: [settle, 0] }, { at: RUN.closeAt, dur: dur.move, ease: 'inOut' });
      keep.show('.p3-trk__quote', { at: RUN.closeAt + RUN.quoteAfter, dur: dur.move });
      keep.tween('.p3-keep', pop, { at: RUN.closeAt + RUN.keepAfter, dur: dur.enter, ease: 'back' });
      keep.hold(300);
    },
  });

  // ---------------------------------------------------------------------------------------
  // Slide 11, closing. One callback per part, then the two questions we leave the room with.
  // The row of dots that slide 1 ended on comes back (the shared motif on kit.decay; its
  // letters stay hidden), stands for a moment and gathers into the first question; the
  // second question and the invitation follow in the same click.
  // ---------------------------------------------------------------------------------------

  // The question names what is given up first and what it would buy second, and it asks
  // "if": slide 7 shows a model without words losing at math, so nothing here may assume that
  // such a model is the smarter one.
  const CLOSE = Object.freeze({
    ask: Object.freeze(['Would you give up reading a model', 'if that made it smarter?']),
    dark: 'give up reading',
    stagger: 0.45, fade: 0.14, lift: 172,
    tilesAt: 700, perTile: 450, keepsAt: 2300, perKeep: 300,   // the three ways arrive after the third tile, one by one
    dotScale: 0.75,    // a dot of the thought is this much smaller than a dot of the question
    // The echo of slide 1, in ms after the click: its dots arrive and stand, travel into the
    // question, and the question's letters appear. Then, each after a pause, the second
    // question and the invitation.
    dotsAt: 400, perDot: 8, gatherAt: 1900, gatherDur: 1400, revealAt: 3200, revealDur: 1700,
    secondAt: 6200, endAt: 7300,
  });
  // The third tile answers the part's name in the part's color; under the tiles stand the
  // three ways slides 8, 9 and 10 each ended on, in the same words (KEEP).
  const CLOSE_RECAP = Object.freeze([
    { tone: 'read', part: 1, words: 'It can tell us' },
    { tone: 'hidden', part: 2, words: 'It can leave things out' },
    { tone: 'open', part: 3, words: 'It can be kept open' },
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
          <p class="p3-cl__thesis">Written reasoning is a window: <em class="c-read">real</em>, and <em class="c-hidden">fragile</em>.</p>
          <div class="p3-cl__tiles">${CLOSE_RECAP.map(closeTile).join('')}</div>
          <div class="p3-cl__keeps">${KEEP.map((_, i) => keepHtml(i + 1)).join('')}</div>
        </div>
        <div class="p3-cl__words">
          <h2 class="p3-cl__ask">${CLOSE.ask.map(closeLine).join('')}</h2>
          <div class="p3-cl__thought">${kit.decay({ key: 'echo', text: Deck.motifs.thought })}</div>
        </div>
        <p class="p3-cl__ask2">And how would you know you can still read it?</p>
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
      // claim, the three ways to keep the window open, as slides 8, 9 and 10 left them.
      const recap = ctx.step({ label: 'three callbacks, three ways to keep it open' });
      recap.show('.p3-cl__thesis', { at: 200, dur: dur.move });
      recap.show('.p3-cl__tile', { at: CLOSE.tilesAt, stagger: CLOSE.perTile });
      [['1a', '1b', '1c'], ['2a', '2b', '2c'], ['3a', '3b', '3c']].forEach((bars, tile) => {
        bars.forEach((key, k) => grow(recap, key, CLOSE.tilesAt + 200 + tile * CLOSE.perTile + k * 140));
      });
      recap.show('.p3-cl__keeps .p3-keep', { at: CLOSE.keepsAt, stagger: CLOSE.perKeep, rise: 0 });
      recap.hold(300);

      // Click 1: the recap moves up. The dots of slide 1 return, stand for a moment and
      // gather into the question. After a pause the second question, the one still open,
      // and then the floor opens.
      const ask = ctx.step({ label: 'slide 1’s dots return and become the question; how would you know' });
      ask.tween('.p3-cl__recap', { y: [CLOSE.lift, 0] }, { dur: dur.move, ease: 'inOut' });
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
          const size = round3(util.lerp(CLOSE.dotScale, 1, near));
          ch.dot.style.transform = `translate(${round3(offsets[i].x * (1 - near))}px, ${round3(offsets[i].y * (1 - near))}px) scale(${size})`;
          ch.dot.style.opacity = String(round3((g > 0 ? 1 : 0) * (1 - shown)));
          ch.glyph.style.opacity = String(round3(shown));
        });
      });
    },
  });
})();
