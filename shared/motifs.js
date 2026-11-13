// Motifs that more than one part shows: a string or a scene is defined once here, so a
// callback is its original by construction and not a copy that can drift.
// Shared file, loaded after shared/facts.js. SPEC.md section 2 lists where each one returns.
Deck.motifs = Object.freeze({
  // The illustrative thought of the title slide: the arithmetic that slide 2 types into its
  // terminal. Slide 1 lets it decay into dots; slide 10 shows it once per checkpoint of a
  // training run, in words and then in dots; slide 11 gathers the dots back into it once
  // more before they turn into the closing question.
  thought: '17 × 20 = 340. 17 × 4 = 58. Hmm, wait: 68. So 340 + 68 = 408.',

  // The question that this thought answers. Slide 2 asks it. Slide 6 asked it again, of the
  // run whose answer needs the written steps, until the cold read of slides 5 to 7 (SPEC.md,
  // the end of section 7.28); that row now has a product of its own.
  ask: 'What is 17 × 24?',

  // Slide 4's terminal, top to bottom: what a line says (a fact key), how it is toned,
  // whether the monitor flags it, and whether it stands apart from the lines above it. Two
  // examples from two tasks: the first two lines, then the last one. `sourced` says which is
  // which and where each is from: the first reworded (Fig. 1), the last quoted (Fig. 9).
  // Both marks stand in the footer's cite on the two slides that show the terminal, and
  // nowhere on the picture (until SPEC.md section 7.29 a note on the terminal's border said
  // it). Slide 4 types the lines and has them read; slide 8 opens on the result, in the
  // same place (tools/selftest.mjs compares the two, and reads both marks in both
  // footers), and then rewrites it.
  hackTrace: Object.freeze({
    key: 'hack',
    label: 'What the agent thinks',
    verdict: 'flagged',
    width: 880,
    sourced: Object.freeze({ reworded: 'Fig. 1 (reworded)', quoted: '9 (quoted)' }),
    lines: Object.freeze([
      Object.freeze({ key: 'fig1a', fact: 'baker.trace_fig1a', flag: true }),
      Object.freeze({ key: 'fig1b', fact: 'baker.trace_fig1b' }),
      Object.freeze({ key: 'hack', fact: 'baker.quote_hack', tone: 'is-hot', flag: true, apart: true }),
    ]),
  }),
});
