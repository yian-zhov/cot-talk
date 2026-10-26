# Special Topic Talk: When Thoughts Stop Being Words

A 15-20 minute talk for the CS6120 special topic session, given as an animated
HTML deck. It is a story, not a literature review: reasoning models think out
loud, which lets us catch them cheating (surprise 1); but the written reasoning
is often not the real reason (surprise 2), just as split-brain patients invent
explanations; the words may not even carry the computation (surprise 3); and
training against bad thoughts only hides them (the twist). It closes on what
keeps the window open, one slide on our final project, and two open questions.

## Present

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8765
```

| Key | Action |
|---|---|
| Right arrow, Space, Enter, click on the right 3/4 | next step or slide |
| Left arrow, Backspace, click on the left 1/4 | previous step or slide |
| N | speaker notes (about 100 words per slide, roughly 1.5-2 minutes each) |
| F | fullscreen |
| R | replay the current slide's animation |
| Home / End | first / last slide |

`#N` in the URL opens slide N. Slides 3, 5 and 10 have one click-through step.
Fonts load from Google Fonts; without a network the deck falls back to system
fonts. Animations are disabled under `prefers-reduced-motion`.

## Files

- `index.html`: slide content and speaker notes
- `styles.css`: tokens, layout, typography, entrance transitions
- `viz.css`: per-slide visuals
- `deck.js`: scaling, navigation, steps, notes
- `anims.js`: scripted animations (title decay, trace typing, hack typing, dot grid, filler canvas)

## Sources

Each claim comes from the source named at the bottom of its slide (papers
checked against arXiv on 2026-10-25). Visuals marked "schematic" or
"illustrative" show a reported pattern, not the paper's data. Slide 9 describes
our own pilot (R1-Distill-Qwen-7B, preliminary).

| Slide | Claim | Source |
|---|---|---|
| 2 | CoT monitoring is a new and fragile opportunity | Korbak et al. 2025, arXiv:2507.11473 |
| 3, 7 | "Let's hack"; CoT monitor recall 95% vs action monitor 60%; training against the monitor yields obfuscated hacking, recall near zero | Baker et al. 2025, arXiv:2503.11926 |
| 4 | Hint reveal rate often below 20% (Claude 3.7 Sonnet, DeepSeek-R1) | Chen et al. 2025, arXiv:2505.05410 |
| 5 | Split-brain patient explains the shovel with the chicken shed | Gazzaniga 1998, "The Split Brain Revisited", Scientific American |
| 6 | Filler tokens replace CoT on algorithmic tasks; Coconut reasons in latent space (ProsQA 97.0 vs 77.5 with 14.2 vs 49.4 tokens) | Pfau et al. 2024, arXiv:2404.15758; Hao et al. 2024, arXiv:2412.06769 |
| 7 | "When a measure becomes a target..." | Goodhart's law, Strathern's phrasing |
| 8 | Necessary CoT is hard to hide | Emmons et al. 2025, arXiv:2507.05246 |
