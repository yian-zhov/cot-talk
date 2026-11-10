// Seekable step timelines. Every visual state is a pure function of (step, t), so the
// deck can replay, step back, honor reduced motion and be captured frame by frame.
// Shared file: part authors use this API through ctx.step() and do not edit it.
(() => {
  'use strict';

  const EASE = Object.freeze({
    linear: (p) => p,
    in: (p) => p * p * p,
    out: (p) => 1 - Math.pow(1 - p, 3),
    inOut: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    back: (p) => 1 + 2.70158 * Math.pow(p - 1, 3) + 1.70158 * Math.pow(p - 1, 2),
  });
  // Motion durations in ms; mirrored as --dur-* in tokens.css.
  const DUR = Object.freeze({ micro: 200, enter: 400, move: 800, reveal: 1600 });
  const MIN_STEP_MS = 100;
  const TRANSFORM_DEFAULTS = Object.freeze({ x: 0, y: 0, scale: 1, rotate: 0 });

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const round3 = (n) => Math.round(n * 1000) / 1000;

  const parseValue = (v) => {
    if (typeof v === 'number') return { n: v, unit: '' };
    const m = /^(-?\d*\.?\d+)([a-z%]*)$/i.exec(String(v).trim());
    if (!m) throw new Error(`timeline: cannot interpolate "${v}" (use a number or "12px", "40%")`);
    return { n: parseFloat(m[1]), unit: m[2] };
  };

  const interpolator = (pair) => {
    if (!Array.isArray(pair) || pair.length !== 2) throw new Error('timeline: a tween value must be [from, to]');
    const a = parseValue(pair[0]);
    const b = parseValue(pair[1]);
    const unit = b.unit || a.unit;
    return (p) => {
      const n = round3(a.n + (b.n - a.n) * p);
      return unit ? `${n}${unit}` : n;
    };
  };

  const easeOf = (name) => {
    const fn = EASE[name];
    if (!fn) throw new Error(`timeline: unknown ease "${name}" (use ${Object.keys(EASE).join(', ')})`);
    return fn;
  };

  const resolveTargets = (root, target) => {
    if (typeof target === 'string') {
      const found = Array.from(root.querySelectorAll(target));
      if (!found.length) throw new Error(`timeline: no element matches "${target}"`);
      return found;
    }
    if (target instanceof Element) return [target];
    return Array.from(target);
  };

  // Where a segment stands when the slide is at (step, t): 0 before it starts, 1 once done.
  const progressOf = (item, step, t) => {
    if (item.step < step) return { started: true, p: 1 };
    if (item.step > step) return { started: false, p: 0 };
    const started = t >= item.at;
    if (item.dur <= 0) return { started, p: started ? 1 : 0 };
    return { started, p: clamp01((t - item.at) / item.dur) };
  };

  const writeProp = (el, prop, value) => {
    if (prop === 'text') { if (el.textContent !== value) el.textContent = value; return; }
    if (prop.startsWith('class:')) { el.classList.toggle(prop.slice(6), Boolean(value)); return; }
    if (prop.startsWith('attr:')) { el.setAttribute(prop.slice(5), String(value)); return; }
    el.style.setProperty(prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`), String(value));
  };

  const writeTransform = (el, values) => {
    const v = { ...TRANSFORM_DEFAULTS, ...values };
    el.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.scale}) rotate(${v.rotate}deg)`;
  };

  const createTimeline = (root) => {
    const steps = [];
    const segments = [];
    const tracks = [];
    const painters = [];
    let channels = null;

    const touch = (index, end) => { steps[index].end = Math.max(steps[index].end, end); };

    const addSegment = (index, el, prop, timing, value) => {
      if (channels) throw new Error('timeline: sealed; add tracks inside setup() only');
      segments.push({ el, prop, step: index, at: timing.at, dur: timing.dur, ease: timing.ease, value, order: segments.length });
      touch(index, timing.at + timing.dur);
    };

    const timingOf = (opts, fallbackEase, fallbackDur) => ({
      at: opts.at ?? 0,
      dur: opts.dur ?? fallbackDur,
      ease: easeOf(opts.ease ?? fallbackEase),
      stagger: opts.stagger ?? 0,
    });

    const stepHandle = (index) => {
      const each = (target, opts, fallbackEase, fallbackDur, add) => {
        const timing = timingOf(opts, fallbackEase, fallbackDur);
        resolveTargets(root, target).forEach((el, i) => add(el, { ...timing, at: timing.at + i * timing.stagger }));
        return handle;
      };
      const handle = {
        index,
        get end() { return steps[index].end; },
        tween: (target, props, opts = {}) => each(target, opts, 'out', DUR.enter, (el, timing) => {
          Object.entries(props).forEach(([prop, pair]) => addSegment(index, el, prop, timing, interpolator(pair)));
        }),
        show: (target, opts = {}) => handle.tween(target, { opacity: [0, 1], y: [opts.rise ?? 16, 0] }, opts),
        hide: (target, opts = {}) => handle.tween(target, { opacity: [1, 0] }, opts),
        type: (target, text, opts = {}) => {
          const dur = opts.dur ?? Math.round((text.length / (opts.cps ?? 45)) * 1000);
          return each(target, { ...opts, dur }, 'linear', dur, (el, timing) => {
            addSegment(index, el, 'text', timing, (p) => text.slice(0, Math.round(p * text.length)));
          });
        },
        count: (target, pair, opts = {}) => {
          const [from, to] = pair;
          const format = opts.format ?? ((v) => String(Math.round(v)));
          return each(target, opts, 'out', DUR.move, (el, timing) => {
            addSegment(index, el, 'text', timing, (p) => format(from + (to - from) * p));
          });
        },
        cls: (target, name, opts = {}) => {
          const on = opts.on ?? true;
          return each(target, { ...opts, dur: 0 }, 'linear', 0, (el, timing) => {
            addSegment(index, el, `class:${name}`, timing, (p) => (p >= 1 ? on : !on));
          });
        },
        signal: (opts = {}) => {
          const timing = timingOf(opts, 'out', DUR.move);
          const cell = { step: index, ...timing, from: opts.from ?? 0, to: opts.to ?? 1, value: opts.from ?? 0 };
          tracks.push({ ...cell, run: (p) => { cell.value = cell.from + (cell.to - cell.from) * p; } });
          touch(index, timing.at + timing.dur);
          return () => cell.value;
        },
        fn: (cb, opts = {}) => {
          const timing = timingOf(opts, 'out', DUR.move);
          tracks.push({ step: index, ...timing, run: cb });
          touch(index, timing.at + timing.dur);
          return handle;
        },
        hold: (ms) => { steps[index].hold += ms; return handle; },
        rename: (label) => { steps[index].label = label; return handle; },
      };
      return handle;
    };

    const step = (opts = {}) => {
      if (channels) throw new Error('timeline: sealed; add steps inside setup() only');
      steps.push({ label: opts.label ?? `step ${steps.length}`, end: 0, hold: 0 });
      return stepHandle(steps.length - 1);
    };

    const seal = () => {
      const ordered = [...segments].sort((a, b) => a.step - b.step || a.at - b.at || a.order - b.order);
      channels = new Map();
      ordered.forEach((seg) => {
        const props = channels.get(seg.el) ?? new Map();
        props.set(seg.prop, [...(props.get(seg.prop) ?? []), seg]);
        channels.set(seg.el, props);
      });
      let start = 0;
      return Object.freeze(steps.map((s) => {
        const dur = Math.max(MIN_STEP_MS, s.end + s.hold);
        const info = Object.freeze({ label: s.label, start, dur });
        start += dur;
        return info;
      }));
    };

    const render = (stepIndex, t, idle = 0) => {
      channels.forEach((props, el) => {
        const transform = {};
        props.forEach((list, prop) => {
          const active = list.reduce((best, seg) => (progressOf(seg, stepIndex, t).started ? seg : best), list[0]);
          const value = active.value(active.ease(progressOf(active, stepIndex, t).p));
          if (prop in TRANSFORM_DEFAULTS) transform[prop] = value;
          else writeProp(el, prop, value);
        });
        if (Object.keys(transform).length) writeTransform(el, transform);
      });
      tracks.forEach((track) => {
        const state = progressOf(track, stepIndex, t);
        track.run(track.ease(state.p), state);
      });
      painters.forEach((paint) => paint({ step: stepIndex, t, idle }));
    };

    return { step, stepHandle, paint: (fn) => { painters.push(fn); }, seal, render, stepCount: () => steps.length };
  };

  // Maps an absolute time on a slide to (step, t). A boundary belongs to the earlier step.
  const locate = (stepInfos, absolute) => {
    const last = stepInfos.length - 1;
    const index = stepInfos.findIndex((s, i) => absolute <= s.start + s.dur || i === last);
    const info = stepInfos[index];
    return { step: index, t: Math.max(0, Math.min(info.dur, absolute - info.start)) };
  };

  window.Deck = window.Deck || {};
  window.Deck.timeline = Object.freeze({ create: createTimeline, locate, EASE, DUR });
})();
