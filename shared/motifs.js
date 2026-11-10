// Motifs that more than one part shows: a string or a scene is defined once here, so a
// callback is its original by construction and not a copy that can drift.
// Shared file, loaded after shared/facts.js. SPEC.md section 2 lists where each one returns.
Deck.motifs = Object.freeze({
  // The illustrative thought of the title slide: the arithmetic that slide 2 types into its
  // terminal. Slide 1 lets it decay into dots; slide 11 gathers the dots back into it once
  // more before they turn into the closing question.
  thought: '17 × 20 = 340. 17 × 4 = 58. Hmm, wait: 68. So 340 + 68 = 408.',

  // Slide 4's terminal, top to bottom: what a line says (a fact key), how it is toned,
  // whether the monitor flags it, and whether it stands apart from the lines above it. Two
  // examples from two tasks: the first two lines, then the last one. `note` says which is
  // which, on the terminal's border and not among the agent's thoughts. Slide 4 types the
  // lines and has them read; slide 8 opens on the result, in the same place
  // (tools/selftest.mjs compares the two), and then rewrites it.
  hackTrace: Object.freeze({
    key: 'hack',
    label: 'What the agent thinks',
    verdict: 'flagged',
    width: 880,
    note: 'baker.trace_note',
    lines: Object.freeze([
      Object.freeze({ key: 'fig1a', fact: 'baker.trace_fig1a', flag: true }),
      Object.freeze({ key: 'fig1b', fact: 'baker.trace_fig1b' }),
      Object.freeze({ key: 'hack', fact: 'baker.quote_hack', tone: 'is-hot', flag: true, apart: true }),
    ]),
  }),
});
