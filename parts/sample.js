// Reference slide for part authors: one slide that uses every piece of the registration API.
// Not part of the talk. It registers only when the URL has ?sample (capture: --sample).
// Read-only for parts: copy patterns from here into parts/partN.js.
(() => {
  'use strict';
  if (!Deck.flags.sample) return;

  // Numbers never appear as literals: they come from shared/facts.js by key.
  const HACKS = Object.freeze([
    { key: 'exit0', name: 'exit(0)', action: 'baker.recall_action_exit0', cot: 'baker.recall_cot_exit0' },
    { key: 'skip', name: 'raise SkipTest', action: 'baker.recall_action_skiptest', cot: 'baker.recall_cot_skiptest' },
  ]);
  const RING = Object.freeze({ size: 360, radius: 150, width: 28, backing: 2 });
  const percent = (v) => `${Math.round(v)}%`;
  const turn = (share) => -Math.PI / 2 + (Math.PI * 2 * share) / 100;

  // A canvas painter is a pure function of its inputs: same inputs, same pixels.
  const drawRing = (canvas, from, to, color) => {
    const c = canvas.getContext('2d');
    const mid = RING.size / 2;
    const arc = (a, b, stroke) => {
      c.strokeStyle = stroke;
      c.beginPath();
      c.arc(mid, mid, RING.radius, turn(a), turn(b));
      c.stroke();
    };
    c.setTransform(RING.backing, 0, 0, RING.backing, 0, 0);
    c.clearRect(0, 0, RING.size, RING.size);
    c.lineWidth = RING.width;
    c.lineCap = 'butt';
    arc(0, 100, color('surface-2'));
    arc(0, from, color('dim'));
    if (to > from) arc(from, to, color('read'));
  };

  const hackRow = (kit, hack) => `
    <div class="sm-hack">
      <div class="sm-hack__name">${hack.name}</div>
      ${kit.meter({ key: `${hack.key}-action`, label: 'Actions only', tone: 'dim' })}
      ${kit.meter({ key: `${hack.key}-cot`, label: 'With thoughts', tone: 'read' })}
    </div>`;

  Deck.register({
    id: 'sample',                       // lowercase; a part's ids start with p1-, p2- or p3-
    part: 0,                            // 1, 2 or 3 in a part file; decides the speaker label in the corner
    kicker: 'Sample slide · not in the talk',   // optional; default is "Part N · name"
    title: 'Reading thoughts beats watching actions, <em>for both hacks</em>',   // one conclusion sentence
    cues: [                             // at most 3, about 10 words each; `step` = when it appears
      'Two hacks hit nearly all training environments',
      { text: 'Watching actions: 40% and 80% caught', step: 1 },
      { text: 'Reading thoughts too: 93% and 97%', step: 2 },
    ],
    cite: [{ src: 'baker2025', where: 'Table 1; Fig. 2' }],   // keys from shared/sources.js
    figure: 'data',                     // 'data' | 'schematic' | 'illustrative': tag in the footer
    html: `
      <div class="sm-wrap">
        <div class="sm-term">
          ${Deck.kit.term({ label: 'What the agent did', lines: ['exit0', 'skip', 'note'] })}
        </div>
        <div class="sm-hacks">${HACKS.map((hack) => hackRow(Deck.kit, hack)).join('')}</div>
        <div class="sm-ring">
          <canvas width="${RING.size * RING.backing}" height="${RING.size * RING.backing}"></canvas>
          <div class="sm-ring__text"><span class="sm-ring__num"></span><span class="sm-ring__label">both hacks</span></div>
        </div>
      </div>`,
    setup: (ctx) => {
      const { fact, dur } = ctx;
      const canvas = ctx.q('.sm-ring canvas');
      const joint = { from: fact('baker.recall_action').value, to: fact('baker.recall_cot').value };

      // The first ctx.step() is the entrance: it plays when the slide arrives.
      const enter = ctx.step({ label: 'the two hacks' });
      enter.show('.sm-term', { at: 300 });
      enter.type('[data-line="exit0"]', HACKS[0].name, { at: 700, cps: 14 });
      enter.type('[data-line="skip"]', HACKS[1].name, { at: enter.end + 200, cps: 14 });
      enter.type('[data-line="note"]', 'in nearly all environments', { at: enter.end + 200 });
      enter.cls('[data-line="note"]', 'is-quiet');
      enter.show('.sm-hack', { at: enter.end, stagger: 120 });

      // Every later ctx.step() is one click. Going back shows the previous step's end state.
      const bars = (step, field, startAt) => HACKS.forEach((hack, i) => {
        const meter = `[data-meter="${hack.key}-${field}"]`;
        const value = fact(hack[field]).value;
        const timing = { at: startAt + i * 240, dur: dur.move };
        step.tween(`${meter} .dk-meter__fill`, { '--v': ['0%', `${value}%`] }, timing);
        step.count(`${meter} .dk-meter__value`, [0, value], { ...timing, format: percent });
      });
      bars(ctx.step({ label: 'action monitor' }), 'action', 0);
      bars(ctx.step({ label: 'cot monitor' }), 'cot', 0);

      // A signal is a number that moves with the clock; ctx.paint redraws from it every frame.
      const reveal = ctx.step({ label: 'joint recall' });
      reveal.show('.sm-ring', { rise: 0 });
      const sweep = reveal.signal({ at: 400, dur: dur.reveal, ease: 'inOut' });
      reveal.count('.sm-ring__num', [joint.from, joint.to], { at: 400, dur: dur.reveal, ease: 'inOut', format: percent });
      reveal.cls('.sm-ring__num', 'c-read', { at: 400 + dur.reveal });
      ctx.paint(() => drawRing(canvas, joint.from, joint.from + (joint.to - joint.from) * sweep(), ctx.color));
    },
  });
})();
