# Special Topic Talk: When Thoughts Stop Being Words

An animated HTML deck for the CS6120 special topic session: three speakers, four to six minutes
each, on chain-of-thought monitorability. The story, the slide list and the source audit are in
[`SPEC.md`](SPEC.md). This file covers running the deck, who owns which file, how a slide is
registered, and the tools.

The deck has no speaker notes. Each slide shows one conclusion sentence, at most three short
cues, and a picture that animates in steps; the speaker talks from what is on screen.

## Present

Double-click `index.html`. It runs from `file://` with no network: system fonts, plain
`<script>` tags, relative paths. It also works from any static host under any sub-path (it is
deployed under `/cot-talk/`), for example `python3 -m http.server 8765 --directory special-topic`.

| Key | Action |
|---|---|
| Right, Down, Space, Enter, PageDown, click on the right 3/4 | next step, then next slide |
| Left, Up, Backspace, PageUp, click on the left 1/4 | previous step (shown at its end state), then previous slide |
| R | replay the current slide from its first step |
| F | fullscreen |
| T | switch between the dark and the light theme (light is for a bright room) |
| digits then Enter | jump to that slide |
| Home / End | first / last slide |

| URL | Effect |
|---|---|
| `index.html#7` | open slide 7 (`#7.2` opens it at step 2) |
| `index.html?t=1200#7` | freeze slide 7 at 1200 ms of its timeline |
| `index.html?theme=light` | start in the light theme |
| `index.html?reduced` | force the reduced-motion behavior |
| `index.html?sample` | add the two reference slides (sample and kit sheet) before the sources slide |

The corner shows the current speaker, one dot per step of the slide, and the page number; the
bar at the bottom is divided by part. On the last step of a part's last slide a chip names the
next speaker. With `prefers-reduced-motion`, every step appears in its end state at once.

## The slides

Twelve slides; `SPEC.md` describes each one click by click. From the title slide, 33 presses
of a "next" key lead through every step to the sources slide: 22 clicks inside the slides
and 11 that move to the next slide.

| # | Id | Title, or what it is | Speaker | Clicks | Footer tags |
|---|---|---|---|---|---|
| 1 | `p1-title` | Title slide: When Thoughts Stop Being Words | Yizhang Cao | 0 | Illustrative |
| 2 | `p1-scratchpad` | Reasoning models write their thinking before they answer | Yizhang Cao | 2 | Illustrative, Reported numbers |
| 3 | `p1-memory` | Hard problems force the reasoning through the words | Yizhang Cao | 2 | Schematic, Illustrative |
| 4 | `p1-hack` | Sometimes the model just says it: "Let's hack" | Yizhang Cao | 3 | Schematic, Reported numbers |
| 5 | `p2-hint` | A hint can flip the answer, and the reasoning often does not mention it | Sicheng Xue | 3 | Illustrative, Reported numbers |
| 6 | `p2-splitbrain` | People do this too: the speaking half invents a reason | Sicheng Xue | 3 | Schematic, Illustrative, Reported numbers |
| 7 | `p2-dots` | In small models, thoughts already stop being words | Sicheng Xue | 2 | Schematic, Illustrative, Reported numbers |
| 8 | `p3-twist` | Punish the bad thoughts and they go into hiding | Yian Zhou | 2 | Illustrative, Schematic |
| 9 | `p3-necessity` | When the task needs the words, hiding gets hard | Yian Zhou | 2 | Schematic |
| 10 | `p3-window` | Part of the decision moves into the reasoning | Yian Zhou | 2 | Schematic, Reported numbers |
| 11 | `p3-close` | Closing slide: "Would you give up reading a model if that made it smarter?", then "And how would you know you can still read it?" | Yian Zhou | 1 | none |
| 12 | `sources` | Every reported number traces to one of these (generated) | none | 0 | none |

Estimated speaking time at a middle pace is 5:16, 5:23 and 5:19 for the three parts, 15:58
in all; `SPEC.md`, section 2, has the other paces and how the estimate is made.

## Files and who edits them

| Path | Owner | Content |
|---|---|---|
| `parts/part1.js`, `parts/part1.css` | Part 1 (Yizhang Cao) | slides 1-4 |
| `parts/part2.js`, `parts/part2.css` | Part 2 (Sicheng Xue) | slides 5-7 |
| `parts/part3.js`, `parts/part3.css` | Part 3 (Yian Zhou) | slides 8-11 |
| `parts/sample.js`, `parts/kit-sheet.js`, `parts/sample.css` | shared, read-only | reference slide using the whole API; sheet of all kit blocks |
| `index.html` | shared | load order only |
| `core/timeline.js` | shared | seekable step timelines |
| `core/deck.js` | shared | registry, validation, slide frame |
| `core/nav.js` | shared | scaling, navigation, clock, seek, chrome |
| `core/kit.js`, `core/kit.css` | shared | terminal, the trace a monitor reads, meter, unit grid, verdict chip, lens, lattice, the line that decays into dots |
| `core/tokens.css`, `core/deck.css` | shared | design tokens; frame and chrome styles |
| `core/lint.js`, `core/outro.js` | shared | in-page lint; generated sources slide |
| `shared/meta.js` | shared | title, part names, speakers |
| `shared/sources.js`, `shared/facts.js` | shared | bibliography; verified numbers and quotes |
| `shared/motifs.js` | shared | strings and scenes that return in another part: the title slide's thought, slide 4's terminal |
| `tools/*.mjs` | shared | capture, lint, selftest, contrast |
| `SPEC.md`, `README.md` | shared | story and audit; this file |

The three parts were built in parallel, each in its own pair of files, and then integrated;
the shared files changed only at integration. The lint keeps the parts apart where it can: a
part's CSS selectors start with `.p1-`, `.p2-` or `.p3-` (keyframes with `p1-` and so on), and
a part's slide ids start with the same prefix. Whatever two parts show (a block, a string, a
scene) belongs in `core/kit.js` or `shared/motifs.js`, not copied from one part into another:
slide 8 opens on slide 4's terminal because both draw `kit.trace` from `Deck.motifs.hackTrace`,
and `tools/selftest.mjs` compares the two.

## Registering a slide

A part file calls `Deck.register` once per slide, in talk order. `parts/sample.js` is the
complete, commented example; open `index.html?sample#12` to see it.

```js
Deck.register({
  id: 'p2-hint',                 // p<part>-<name>
  part: 2,                       // decides the speaker shown in the corner
  title: 'A hint can flip the answer, and the reasoning often does not mention it',   // one sentence; <em> allowed
  cues: [                        // at most 3, at most 12 words each; step = the click that shows it
    'A professor’s opinion, slipped into the prompt',
    { text: 'The answer flips; the reasoning does not say why', step: 2 },
  ],
  cite: [{ src: 'chen2025', where: 'Table 1; Sec. 3, Fig. 1' }],   // keys of shared/sources.js; [] only if no fact
  figure: 'illustrative',        // 'data' | 'schematic' | 'illustrative': tag in the footer;
                                 // or a list for a picture that is two of these: ['schematic', 'illustrative']
  numbers: 'reported',           // optional, with a schematic or illustrative figure: its measured numbers are the source's
  layout: 'default',             // 'bare' = no title and cue rows (title and closing slides)
  html: `<div class="p2-hint">...</div>`,   // the stage; about 1728 x 700 px under a one-line title
  setup: (ctx) => {
    const enter = ctx.step({ label: 'no hint' });   // first call: plays when the slide arrives
    enter.show('.p2-hint__question', { at: 200 });
    const flip = ctx.step({ label: 'the hint' });   // each later call: one click
    flip.type('.p2-hint__trace', 'Let me work through each option...', { cps: 40 });
    flip.count('.p2-hint__rate', [0, ctx.fact('chen.overall_claude').value], { at: flip.end, format: (v) => `${Math.round(v)}%` });
  },
});
```

`figure` is one of the three kinds or a list of them, in the order in which the footer is
to show the tags (the first for what most of the picture is). A list may not be empty or
name a kind twice. `numbers: 'reported'` needs at least one kind of ours (schematic or
illustrative) among them. Leave `figure` out for a slide without a tag.

The first `ctx.step()` does not create a step: it returns the entrance step, which the engine
has already made so that the title and the first cues can play in it. A `label` passed there
names that step (an earlier version dropped it and every first step was called `enter`). Labels
show up in the capture manifest and in the selftest's messages.

`ctx` gives: `el` (the slide), `stage`, `q(selector)`, `qa(selector)`, `step(opts)`,
`paint(fn)`, `fact(key)`, `color(role)`, `util` (`rng`, `shuffled`, `range`, `clamp`, `lerp`,
`svg`), `kit`, `dur` (`micro` 200, `enter` 400, `move` 800, `reveal` 1600 ms), `reduced`.

A step handle offers, each with `{ at, dur, ease, stagger }` in ms (`ease`: `out`, `in`,
`inOut`, `linear`, `back`):

| Call | Effect |
|---|---|
| `tween(target, { opacity: [0, 1], x: [40, 0], '--v': ['0%', '95%'], 'attr:r': [0, 12] })` | interpolate numbers; `x`, `y`, `scale`, `rotate` compose a transform |
| `show(target)`, `hide(target)` | fade in with a 16px rise; fade out |
| `type(target, text, { cps })` | type text |
| `count(target, [from, to], { format })` | count a number |
| `cls(target, name, { on })` | switch a class on (or off) at `at` |
| `signal({ from, to })` | returns a function giving a number that moves with the clock |
| `fn((p) => { ... })` | call with progress 0 to 1 on every frame |
| `hold(ms)` | keep the step open longer |
| `rename(label)` | name the step (what `ctx.step({ label })` does for the entrance step) |
| `end` | when the step's last track ends: `{ at: step.end }` chains |

`ctx.paint(fn)` runs after every frame; draw canvases there from signals. A target is a
selector inside the slide, an element, or a list; a selector that matches nothing is an error.

A track's first value also holds before the track starts, in earlier steps too: an element
that only a later step fades in with `opacity: [0, 1]` is hidden until then, and a class that
a later step switches off with `cls(target, name, { on: false })` is on until then.

### Kit blocks

`ctx.kit` (`core/kit.js`) returns markup for a slide's `html`; open `index.html?sample#13` for
the sheet. `term`, `meter`, `grid`, `flag`, `lens`, `legend`, `lattice` (with `latticePoint`
and `latticeSize`) are plain blocks. `kit.legend({ key, text })` is a provenance note that
sits on the bottom border of a positioned box: which part of the box is a source's and which
is ours (slides 4, 5, 6, 8 and 10; on slide 7, which model a card's numbers are from;
`kit.trace` draws its own `note` the same way; on slide 2 that note says what a check
means). Two blocks carry moves of their own:

| Call | Effect |
|---|---|
| `kit.trace({ key, label, lines, verdict, width, note, inner })` | a terminal with the monitor's verdict chip and lens, and a note on its border (slides 2, 4, 8); a line is a key or `{ key, apart }` |
| `kit.traceParts(el)` | its elements: `term`, `lines`, `line(key)`, `who`, `chip`, `lens`, `note` |
| `kit.readTrace(step, el, { at, perLine, marks })` | the lens sweeps down; each marked line gets a check, or a pointer if `flag`; returns the end time |
| `kit.stamp(step, chip, state, at, { text, clear })` | the verdict lands (`is-flagged`, `is-clean`); `text` rewrites the chip |
| `kit.setTrace(step, el, { lines, verdict, state, alarm, note })` | shows a trace as it was left, from the first frame of a step |
| `kit.decay({ key, text })` | a line whose letters (`.dk-decay__glyph`) can turn into dots (`.dk-decay__dot`) and back (slide 1; slide 11 shows the dots only) |

### Rules that keep the deck seekable

Every visual state must be a function of (step, time) only, so that replay, going back,
reduced motion and frame capture all show the right thing.

- Animate through `ctx.step()` only. No `setTimeout`, `setInterval`, `requestAnimationFrame`,
  wall-clock time, `Math.random` (use `ctx.util.rng(seed)`), CSS transitions or keyframes on
  slide content.
- A tween needs both ends: `[from, to]`. Before it starts the element shows `from`.
- Read numbers and quotes with `ctx.fact(key)`. A new fact is verified at its source and
  registered in `shared/facts.js` (`{ text, value, src, where }`), a new source in
  `shared/sources.js`. `Deck.addFacts` and `Deck.addSources` also work from a part file, for a
  fact that only one slide can ever need.
- Colors, sizes and fonts come from `core/tokens.css`; in a canvas use `ctx.color('read')`.
  No text under 24px (`--fs-0`), canvas text included.
- A slide that keeps moving after its step ends sets `ambient: true` and reads
  `state.idle` in `ctx.paint((state) => ...)`; `idle` is 0 during capture.
- An element that leaves the stage on purpose carries `data-bleed`.

Registration errors (a fourth cue, a 13-word cue, an unknown source, an unknown or repeated
figure kind, a selector that matches nothing) appear as a red bar on the page and fail the
tools.

## Tools

Node 22 and an installed Playwright (a global install is found; nothing is downloaded). If the
Chromium build that Playwright expects is missing, the tools use the closest cached headless
shell and print which one; `--browser PATH` or `DECK_CHROMIUM` chooses another.

```
cd special-topic

# every slide at the end of every step, into DIR/steps, plus DIR/manifest.json
node tools/capture.mjs --out DIR

# only some slides (numbers, ranges or ids), with the lint on
node tools/capture.mjs --out DIR --slides 4,8-10 --lint

# frames of one slide every 200 ms across its timeline, into DIR/frames/<slide>/t000200.png
node tools/capture.mjs --out DIR --frames 8 --interval 200 --no-steps

# other switches: --sample (reference slides)  --theme light  --reduced  --width 1280
#                 --url http://host/sub/path/index.html
#                 --fonts arial | verdana | dejavu   (other font stacks, see below)

node tools/selftest.mjs      # offline, deterministic seek, back and replay states, reduced motion, sub-path hosting,
                             # slide 8 opening on the terminal slide 4 ends on, and the footer tags:
                             # the forms of `figure` and `numbers`, footers as registered, the legend
node tools/contrast.mjs      # token contrast (4.5:1), the 24px floor, the 4px grid
```

The tokens name macOS faces first, so on another machine the fallbacks decide every line
break. `--fonts` forces the three stacks to other faces before the slides mount: `arial`
(Arial, Georgia, Courier New: about what Windows falls back to), `verdana` (Verdana, the
widest common sans and close to DejaVu Sans, with Georgia and Courier New) and `dejavu` (a
Linux desktop). A set whose faces are not installed stops with an error. Run a changed slide
with `--fonts verdana --lint` and look at the shots: the lint sees content that leaves the
stage, not two blocks that run into each other inside it.

`--lint` fails on: text under 24px, text off the stage, a title over two lines, content
spilling out of the stage or the cue row, a truncated cite, a default slide without a cite, an
unprefixed selector or a hard-coded color in a part's CSS, and a part script with its own
clock, randomness or network access. In the page, `window.__deck` offers `info()`,
`seek(slide, ms)`, `seekStep(slide, step)`, `go(slide)`, `next()`, `prev()`, `finish()`,
`fingerprint()` and `lint()` (slides are zero-based there). `info()` gives each slide's
footer tags, so `manifest.json` has them (`slides[].tags`) and the table under "The
slides" can be read off it.

## Sources

The table that used to be here moved:

- `SPEC.md`, section 7: the audit of every number against its original (2026-11-09), with
  what changed from the first version of the deck, the check of the facts added after
  the two cold reads (7.5), what the second cold reads changed on 2026-11-10 (7.6 for
  slides 1 to 7, 7.7 for slides 8 to 11), what the third changed: on slides 1 to 7 and
  in the engine (7.8), and on slides 8 to 10 (7.9), and the three fixes on slides 7 and 8
  after the fourth (7.10).
- `shared/sources.js`: the bibliography, by key.
- `shared/facts.js`: every number and quote a slide may print, with source and locator.
  Facts that only one part needs are registered at the top of that part's file, under the
  keys `p1.*`, `p2.*` and `p3.*`.
- On screen: each slide's footer names its sources and the place in each (author, year,
  section or figure); the last slide lists them all with arXiv id or journal.

The footer tags, in the order and the words in which the sources slide defines them
(`core/deck.js` holds them). The sources slide lists the tags that a footer of the deck
carries and no other, so at present it shows the last three:

| Tag | Set with | Means |
|---|---|---|
| Reported data | `figure: 'data'` | a chart of the source's own numbers |
| Reported numbers | `numbers: 'reported'` | the measured numbers on the slide are the source's |
| Schematic | `figure: 'schematic'` | our drawing of what a source reports, not its data |
| Illustrative | `figure: 'illustrative'` | an example we wrote, not from a source |

"Reported numbers" is one more tag, for a slide whose picture is ours in part and that
also prints measured numbers; the engine rejects it where no figure kind of ours is given.
The two tags that say "ours" (Schematic, Illustrative) are amber, the two that say "the
source's" are plain. The table under "The slides" says which slide carries which.

How the slides choose: a footer carries every figure kind that describes a part of the
picture. A drawing of ours that holds an example of ours is `figure: ['schematic',
'illustrative']` (slides 3, 6 and 7: the tokens on the lattice, the three reasoning lines
at slide 6's reveal). Slide 8 names the two in the other order, `['illustrative',
'schematic']`: the rewritten thought and the edited test are our example, the dial and
the bars our drawing. A picture that is ours in part adds "Reported numbers" if it also
shows a source's numbers, charted (slides 2, 4, 5 and 7) or printed (slides 6 and 10).
Slides 11 and 12 carry no tag. "Reported data" is for a slide that is nothing but the
chart; no slide of this deck is, so that tag is in no footer and not in the legend.
`SPEC.md`, section 2, has the table of all twelve slides and the reason for each of
slides 1 to 8.

## Design tokens

`core/tokens.css` holds them; `node tools/contrast.mjs` checks them.

- Stage: 1920 x 1080, scaled to the window.
- Color roles, in a dark and a light theme: `bg`, `surface`, `surface-2`, `line`; text `text`,
  `dim`, `faint`; meaning `read` (what the text shows), `hidden` (what happens inside),
  `alarm` (misbehavior), `ok` (clean), `open` (still open: an outcome not yet decided, a
  question not yet answered; also Part 3's color, and so the color of its three ways to
  keep the window open). Every text color is at least 4.5:1 on every surface.
- Type on a 4px grid: 24, 28, 32, 40, 48, 64, 88, 120 px. 24px at 1920 wide is the floor.
- Spacing on a 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Motion: 200 ms (a state flips), 400 ms (an element arrives), 800 ms (something travels or
  counts), 1600 ms (a headline reveal); easings `out` and `inOut`.

The first version of the deck (one HTML file with speaker notes and Google Fonts) is in git
history at `39d06b7`; its animations in `anims.js` there can be ported.
