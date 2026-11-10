// Player: mounts every slide, scales the stage, runs the step clock, navigates and seeks.
// Loaded last. Exposes window.__deck for tools/capture.mjs and tools/selftest.mjs.
(() => {
  'use strict';

  const D = window.Deck;
  const byId = (id) => document.getElementById(id);
  const root = byId('dk-root');
  const host = byId('dk-slides');
  const ui = Object.freeze({
    speaker: byId('dk-speaker'), page: byId('dk-page'), dots: byId('dk-dots'),
    handoff: byId('dk-handoff'), progress: byId('dk-progress'),
  });
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const plain = (html) => String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  let mounted = [];
  let pos = Object.freeze({ index: 0, step: 0 });
  let raf = 0;
  let still = false;   // true while seeking: states are shown, the clock does not run
  let jump = '';

  // A slide whose setup failed still occupies its place, showing the error.
  const mountOne = (def) => {
    try {
      return D.mount(def, host);
    } catch (error) {
      const html = `<div class="dk-placeholder dk-placeholder--error"><b>Slide failed to build</b><span>${error.message}</span></div>`;
      return D.mount(Object.freeze({ ...def, html, setup: null, cues: Object.freeze([]) }), host);
    }
  };

  const fit = () => {
    const scale = Math.min(window.innerWidth / D.STAGE.width, window.innerHeight / D.STAGE.height);
    root.style.setProperty('--dk-scale', String(scale));
  };

  const buildProgress = () => {
    ui.progress.innerHTML = mounted.map((m, i) => {
      const gap = i > 0 && mounted[i - 1].def.part !== m.def.part ? '<i class="is-gap"></i>' : '';
      return `${gap}<i data-index="${i}"></i>`;
    }).join('');
  };

  const updateChrome = () => {
    const slide = mounted[pos.index];
    const part = D.meta.parts[slide.def.part];
    const next = mounted[pos.index + 1];
    const nextPart = next ? D.meta.parts[next.def.part] : null;
    const lastStep = pos.step === slide.steps.length - 1;
    const handsOver = Boolean(part && nextPart && lastStep && next.def.part !== slide.def.part);
    // The chrome shows a part's label; the real name stands on the title slide alone.
    ui.speaker.textContent = part ? part.label : '';
    ui.page.textContent = `${pos.index + 1} / ${mounted.length}`;
    ui.dots.innerHTML = slide.steps.length > 1
      ? slide.steps.map((_, i) => `<i class="${i <= pos.step ? 'is-done' : ''}"></i>`).join('')
      : '';
    ui.handoff.hidden = !handsOver;
    ui.handoff.textContent = handsOver ? `Next: ${nextPart.label}` : '';
    ui.progress.querySelectorAll('[data-index]').forEach((cell) => {
      const i = Number(cell.dataset.index);
      cell.classList.toggle('is-done', i < pos.index);
      cell.classList.toggle('is-current', i === pos.index);
    });
  };

  const activate = (index, step) => {
    cancelAnimationFrame(raf);
    const i = clamp(index, 0, mounted.length - 1);
    const s = clamp(step, 0, mounted[i].steps.length - 1);
    mounted.forEach((m, k) => m.section.classList.toggle('is-active', k === i));
    pos = Object.freeze({ index: i, step: s });
    updateChrome();
    if (window.location.hash !== `#${i + 1}`) window.location.replace(`#${i + 1}`);
    return mounted[i];
  };

  const setStill = (value) => {
    still = value;
    root.classList.toggle('is-still', still || D.flags.capture || D.flags.reduced);
  };

  // Runs the clock of the current step. From the end, only an ambient slide keeps ticking.
  const play = (slide, step, fromEnd) => {
    const dur = slide.steps[step].dur;
    const ambient = slide.def.ambient && !D.flags.capture;
    if (still || D.flags.reduced || (fromEnd && !ambient)) { slide.timeline.render(step, dur); return; }
    const t0 = performance.now() - (fromEnd ? dur : 0);
    const tick = (now) => {
      const t = now - t0;
      if (t < dur) { slide.timeline.render(step, t); raf = requestAnimationFrame(tick); return; }
      slide.timeline.render(step, dur, ambient ? t - dur : 0);
      if (ambient) raf = requestAnimationFrame(tick);
    };
    slide.timeline.render(step, fromEnd ? dur : 0);
    raf = requestAnimationFrame(tick);
  };

  const show = (index, step, fromEnd) => { setStill(false); play(activate(index, step), pos.step, fromEnd); };
  const next = () => {
    const slide = mounted[pos.index];
    if (pos.step < slide.steps.length - 1) show(pos.index, pos.step + 1, false);
    else if (pos.index < mounted.length - 1) show(pos.index + 1, 0, false);
  };
  const prev = () => {
    if (pos.step > 0) show(pos.index, pos.step - 1, true);
    else if (pos.index > 0) show(pos.index - 1, mounted[pos.index - 1].steps.length - 1, true);
  };
  const replay = () => show(pos.index, 0, false);
  const finish = () => {
    cancelAnimationFrame(raf);
    const slide = mounted[pos.index];
    slide.timeline.render(pos.step, slide.steps[pos.step].dur);
  };

  const settled = () => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve(true)));
  });
  const seekStep = (index, step, t = Infinity) => {
    setStill(true);
    const slide = activate(index, step);
    slide.timeline.render(pos.step, clamp(t, 0, slide.steps[pos.step].dur));
    return settled();
  };
  const seek = (index, absolute) => {
    const slide = mounted[clamp(index, 0, mounted.length - 1)];
    const at = D.timeline.locate(slide.steps, absolute);
    return seekStep(index, at.step, at.t);
  };

  // Everything that decides what the audience sees: the slide's DOM (inline styles included),
  // the chrome, and the pixels of any canvas. Two equal fingerprints are the same picture.
  const fingerprint = () => {
    const section = mounted[pos.index].section;
    const canvases = Array.from(section.querySelectorAll('canvas')).map((c) => c.toDataURL());
    const html = [section, ui.page.parentElement, ui.handoff, ui.progress].map((node) => node.outerHTML.replace(/ class=""/g, ''));
    return [...html, ...canvases].join('\n');
  };

  const fromHash = () => {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(window.location.hash);
    return m ? { index: Number(m[1]) - 1, step: m[2] === undefined ? null : Number(m[2]) } : null;
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
    finish();
  };

  const onKey = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const key = e.key;
    if (/^\d$/.test(key)) { jump += key; return; }
    if (key === 'Enter' && jump) { show(Number(jump) - 1, 0, false); jump = ''; return; }
    jump = '';
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(key)) { e.preventDefault(); prev(); }
    else if (key === 'Home') show(0, 0, false);
    else if (key === 'End') show(mounted.length - 1, 0, false);
    else if (key === 'r' || key === 'R') replay();
    else if (key === 't' || key === 'T') toggleTheme();
    else if (key === 'f' || key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen();
    }
  };

  const onClick = (e) => {
    if (e.target.closest('a, button, input, select, textarea, [data-no-nav]')) return;
    if (e.clientX < window.innerWidth * 0.25) prev(); else next();
  };

  // `tags` is what the registration asks the footer to carry, in order (Deck.tagsOf).
  const info = () => mounted.map((m, i) => ({
    index: i, id: m.def.id, part: m.def.part, title: plain(m.def.title), total: m.total,
    tags: D.tagsOf(m.def).map((t) => t.tag),
    steps: m.steps.map((s) => ({ label: s.label, start: s.start, dur: s.dur })),
  }));

  const start = () => {
    document.documentElement.dataset.theme = D.flags.theme;
    document.title = D.meta ? D.meta.title : document.title;
    if (!D.slides.length) throw D.fail('no slides registered: check the script tags in index.html');
    mounted = D.slides.map(mountOne);
    buildProgress();
    fit();
    window.addEventListener('resize', fit);
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    window.addEventListener('hashchange', () => {
      const h = fromHash();
      if (h && (h.index !== pos.index || (h.step !== null && h.step !== pos.step))) show(h.index, h.step ?? 0, false);
    });
    const h = fromHash() ?? { index: 0, step: 0 };
    if (D.flags.seekTo !== null) seek(h.index, D.flags.seekTo);
    else show(h.index, h.step ?? 0, false);
    window.__deck = Object.freeze({
      ready: true, info, seek, seekStep, finish, next, prev, replay, settled, fingerprint,
      go: (index, step = 0) => show(index, step, false),
      position: () => pos,
      errors: () => D.errors,
      lint: () => D.lint(mounted[pos.index]),
    });
  };

  start();
})();
