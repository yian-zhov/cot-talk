// Deck registry: configuration, sources, facts, slide registration and the slide frame.
// Shared file: part authors call Deck.register() from their own parts/partN.js.
(() => {
  'use strict';

  const D = window.Deck;
  const STAGE = Object.freeze({ width: 1920, height: 1080 });
  const LIMITS = Object.freeze({ cues: 3, cueWords: 12 });
  // What a slide's picture is (`figure`) and whether the numbers printed on it are a source's
  // (`numbers`). The footer shows the tags; the sources slide prints what each one in use means.
  // `figure` is one key of FIGURES, or a list of them for a picture that is more than one
  // thing (a drawing of ours that holds an example of ours): not empty, no key twice. The
  // footer shows them in the order given, so the first says what most of the picture is.
  // `ours` marks the tags that say "this part is our own work" (they share one look).
  const FIGURES = Object.freeze({
    data: Object.freeze({ tag: 'Reported data', ours: false, means: 'a chart of the source’s own numbers' }),
    schematic: Object.freeze({ tag: 'Schematic', ours: true, means: 'our drawing of what a source reports, not its data' }),
    illustrative: Object.freeze({ tag: 'Illustrative', ours: true, means: 'an example we wrote, not from a source' }),
  });
  const NUMBERS = Object.freeze({
    reported: Object.freeze({ tag: 'Reported numbers', ours: false, means: 'the measured numbers on the slide are the source’s' }),
  });
  const TAG_KINDS = Object.freeze({ figure: FIGURES, numbers: NUMBERS });
  // The order in which the sources slide lists the tags.
  const TAG_ORDER = Object.freeze([['figure', 'data'], ['numbers', 'reported'], ['figure', 'schematic'], ['figure', 'illustrative']]);
  const LAYOUTS = Object.freeze(['default', 'bare']);

  const params = new URLSearchParams(window.location.search);
  const flags = Object.freeze({
    sample: params.has('sample'),
    capture: params.has('capture'),
    reduced: params.has('reduced') || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    theme: params.get('theme') === 'light' ? 'light' : 'dark',
    seekTo: params.has('t') ? Number(params.get('t')) : null,
  });

  let meta = null;
  let sources = Object.freeze({});
  let facts = Object.freeze({});
  let slides = Object.freeze([]);
  let errors = Object.freeze([]);

  // Errors are loud: console, a visible overlay, and Deck.errors for the capture tool.
  const fail = (message) => {
    errors = Object.freeze([...errors, message]);
    console.error(`[deck] ${message}`);
    const box = document.getElementById('dk-errors');
    if (box) { box.hidden = false; box.textContent = errors.join('\n'); }
    return new Error(message);
  };

  const words = (html) => String(html).replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean);

  // What every part gives: `name` for the kicker, `speaker` (the real name) for the title
  // slide, `label` for the corner and the hand-off chip, which show it in place of the name.
  const PART_FIELDS = Object.freeze(['name', 'speaker', 'label']);

  const configure = (config) => {
    if (!config || !config.title || !config.parts) throw fail('Deck.configure needs { title, parts }');
    Object.entries(config.parts).forEach(([n, part]) => {
      const missing = PART_FIELDS.filter((field) => !part || typeof part[field] !== 'string' || !part[field].trim());
      if (missing.length) throw fail(`Deck.configure: part ${n} has ${missing.map((field) => `no ${field}`).join(', ')}`);
    });
    meta = Object.freeze({ ...config, parts: Object.freeze({ ...config.parts }) });
  };

  const addSources = (entries) => {
    Object.entries(entries).forEach(([key, s]) => {
      if (sources[key]) throw fail(`source "${key}" is registered twice`);
      if (!s.short || !s.title || !s.ref) throw fail(`source "${key}" needs { short, title, ref }`);
    });
    sources = Object.freeze({ ...sources, ...entries });
  };

  const addFacts = (entries) => {
    Object.entries(entries).forEach(([key, f]) => {
      if (facts[key]) throw fail(`fact "${key}" is registered twice`);
      if (f.text === undefined || !f.src || !f.where) throw fail(`fact "${key}" needs { text, src, where }`);
      if (!sources[f.src]) throw fail(`fact "${key}" cites unknown source "${f.src}"`);
    });
    facts = Object.freeze({ ...facts, ...entries });
  };

  const fact = (key) => {
    if (!facts[key]) throw fail(`unknown fact "${key}"; register it with Deck.addFacts and its source`);
    return facts[key];
  };

  const normalizeCue = (cue) => (typeof cue === 'string' ? { text: cue, step: 0 } : { step: 0, ...cue });

  // A slide's figure kinds as a list: none, the one key, or the keys in the order given.
  const figureKeys = (figure) => {
    if (figure === null || figure === undefined) return [];
    return Array.isArray(figure) ? figure : [figure];
  };

  const validateTags = (def, where) => {
    const known = Object.keys(FIGURES).join(', ');
    const kinds = figureKeys(def.figure);
    if (Array.isArray(def.figure) && !kinds.length) throw fail(`${where}: figure is an empty list; leave figure out for a slide without a figure tag`);
    kinds.forEach((key) => {
      if (typeof key !== 'string' || !Object.hasOwn(FIGURES, key)) throw fail(`${where}: figure must be one of ${known}, or a list of them (got ${JSON.stringify(key)})`);
    });
    const twice = kinds.find((key, i) => kinds.indexOf(key) !== i);
    if (twice) throw fail(`${where}: figure lists "${twice}" twice`);
    if (def.numbers === null || def.numbers === undefined) return;
    if (typeof def.numbers !== 'string' || !Object.hasOwn(NUMBERS, def.numbers)) throw fail(`${where}: numbers must be one of ${Object.keys(NUMBERS).join(', ')}`);
    if (!kinds.some((key) => FIGURES[key].ours)) throw fail(`${where}: numbers goes with a schematic or illustrative figure (a data figure already says its numbers are reported)`);
  };

  const validate = (def) => {
    const where = `slide "${def.id}"`;
    if (!def.id || !/^[a-z0-9-]+$/.test(def.id)) throw fail(`slide id "${def.id}" must be lowercase letters, digits, dashes`);
    if (slides.some((s) => s.id === def.id)) throw fail(`${where} is registered twice`);
    if (!meta) throw fail('Deck.configure must run before Deck.register');
    if (def.part !== 0 && !meta.parts[def.part]) throw fail(`${where}: unknown part ${def.part}`);
    if (def.part !== 0 && !def.id.startsWith(`p${def.part}-`)) throw fail(`${where}: id must start with "p${def.part}-"`);
    if (!def.title || !words(def.title).length) throw fail(`${where}: title is required (one conclusion sentence)`);
    if (!LAYOUTS.includes(def.layout)) throw fail(`${where}: layout must be one of ${LAYOUTS.join(', ')}`);
    if (!Array.isArray(def.cues) || def.cues.length > LIMITS.cues) throw fail(`${where}: cues must be an array of at most ${LIMITS.cues}`);
    if (def.layout === 'bare' && def.cues.length) throw fail(`${where}: the bare layout has no cue row; put the text in html`);
    def.cues.forEach((cue) => {
      const count = words(cue.text).length;
      if (!count || count > LIMITS.cueWords) throw fail(`${where}: cue "${cue.text}" has ${count} words (1 to ${LIMITS.cueWords})`);
    });
    if (!Array.isArray(def.cite)) throw fail(`${where}: cite must be an array of { src, where } (empty only if the slide states no fact)`);
    def.cite.forEach((c) => { if (!sources[c.src]) throw fail(`${where}: cite uses unknown source "${c.src}"`); });
    validateTags(def, where);
    if (def.setup && typeof def.setup !== 'function') throw fail(`${where}: setup must be a function`);
  };

  const register = (input) => {
    const def = Object.freeze({
      layout: 'default', cite: undefined, html: '', kicker: null, figure: null, numbers: null, ambient: false,
      ...input,
      // A list of figure kinds is copied, so the caller's array is not the registry's.
      ...(Array.isArray(input.figure) ? { figure: Object.freeze([...input.figure]) } : {}),
      cues: Object.freeze((input.cues ?? []).map(normalizeCue)),
    });
    validate(def);
    slides = Object.freeze([...slides, def]);
  };

  // A placeholder keeps the SPEC title, cues and sources on screen until the part replaces it.
  const placeholder = (input) => register({
    ...input,
    html: `<div class="dk-placeholder"><b>Placeholder · ${input.id}</b>${input.layout === 'bare' ? `<span class="dk-lead">${input.title}</span>` : ''}<span>${input.spec ?? 'See SPEC.md'}</span></div>`,
    setup: (ctx) => { ctx.step().show('.dk-placeholder', { at: 200 }); },
  });

  const figureTagClass = (kind) => `dk-figure-tag${kind.ours ? '' : ' is-reported'}`;
  // The footer tags and what they mean, in the order the sources slide lists them. `field`
  // and `value` say how a slide asks for the tag (figure: 'schematic', numbers: 'reported').
  const figureTags = Object.freeze(TAG_ORDER.map(([field, value]) => {
    const kind = TAG_KINDS[field][value];
    return Object.freeze({ field, value, tag: kind.tag, means: kind.means, className: figureTagClass(kind) });
  }));
  const tagFor = (field, value) => figureTags.find((t) => t.field === field && t.value === value);
  // A kind that a slide may ask for has a place in that order, or the sources slide could
  // not say what it means.
  Object.entries(TAG_KINDS).forEach(([field, kinds]) => Object.keys(kinds).forEach((value) => {
    if (!tagFor(field, value)) throw fail(`tag ${field}: '${value}' has no place in TAG_ORDER (core/deck.js)`);
  }));
  // The tags a slide's footer carries, in the order it shows them: its figure kinds as
  // given, then the numbers tag. Each is one of Deck.figureTags.
  const tagsOf = (def) => [
    ...figureKeys(def.figure).map((value) => tagFor('figure', value)),
    ...(def.numbers ? [tagFor('numbers', def.numbers)] : []),
  ];
  // The tags that at least one of these slides carries, in the order of Deck.figureTags:
  // what the sources slide has to explain.
  const tagsInUse = (defs) => {
    const carried = new Set(defs.flatMap(tagsOf));
    return figureTags.filter((t) => carried.has(t));
  };

  // A footer names the source and the place in it; the full reference (arXiv id, journal)
  // is on the generated sources slide, so a footer stays one line in any font.
  const citeText = (cite) => cite.map((c) => [sources[c.src].short, c.where].filter(Boolean).join(', ')).join(' · ');

  const kickerText = (def) => {
    if (def.kicker) return def.kicker;
    const part = meta.parts[def.part];
    return part ? `Part ${def.part} · ${part.name}` : '';
  };

  const element = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };

  // Builds one slide: head (kicker + title), stage (the part's html), cues, footer (tags + cite).
  const buildSlide = (def) => {
    const section = element('section', 'dk-slide');
    section.dataset.slide = def.id;
    section.dataset.part = String(def.part);
    section.dataset.layout = def.layout;
    const stage = element('div', 'dk-stage', def.html);
    const foot = element('footer', 'dk-foot');
    tagsOf(def).forEach((t) => foot.append(element('span', t.className, t.tag)));
    if (def.cite.length) foot.append(element('span', 'dk-cite', citeText(def.cite)));
    if (def.layout === 'bare') {
      section.setAttribute('aria-label', words(def.title).join(' '));
      section.append(stage, foot);
      return { section, stage, cueNodes: [], headNodes: [] };
    }
    const head = element('header', 'dk-head');
    const kicker = element('div', 'dk-kicker', kickerText(def));
    const title = element('h2', 'dk-title', def.title);
    head.append(kicker, title);
    const cueList = element('ul', 'dk-cues');
    const cueNodes = def.cues.map((cue) => {
      const li = element('li', 'dk-cue', cue.text);
      cueList.append(li);
      return li;
    });
    section.append(head, stage, cueList, foot);
    return { section, stage, cueNodes, headNodes: [kicker, title] };
  };

  // Mounts a slide: frame, the part's setup(ctx), then the engine's own head and cue tracks.
  const mount = (def, host) => {
    const built = buildSlide(def);
    host.append(built.section);
    const timeline = D.timeline.create(built.section);
    const entrance = timeline.step({ label: 'enter' });
    let stepCalls = 0;
    const ctx = Object.freeze({
      el: built.section,
      stage: built.stage,
      part: def.part,
      reduced: flags.reduced,
      q: (selector) => {
        const node = built.section.querySelector(selector);
        if (!node) throw new Error(`no element matches "${selector}"`);
        return node;
      },
      qa: (selector) => Array.from(built.section.querySelectorAll(selector)),
      // The first call returns the entrance step, which already exists (the head and the
      // first cues play in it); a label given there names it.
      step: (opts) => {
        stepCalls += 1;
        if (stepCalls > 1) return timeline.step(opts);
        return opts && opts.label ? entrance.rename(opts.label) : entrance;
      },
      paint: timeline.paint,
      fact,
      color: D.color,
      util: D.util,
      kit: D.kit,
      dur: D.timeline.DUR,
    });
    try {
      if (def.setup) def.setup(ctx);
      if (built.headNodes.length) entrance.show(built.headNodes, { stagger: 80 });
      def.cues.forEach((cue, i) => {
        if (cue.step >= timeline.stepCount()) throw new Error(`cue "${cue.text}" wants step ${cue.step}, slide has ${timeline.stepCount()}`);
        timeline.stepHandle(cue.step).show(built.cueNodes[i], { at: cue.at ?? 200 + i * 80, rise: 0 });
      });
      const steps = timeline.seal();
      timeline.render(0, 0);
      return Object.freeze({ def, section: built.section, timeline, steps, total: steps[steps.length - 1].start + steps[steps.length - 1].dur });
    } catch (error) {
      built.section.remove();
      throw fail(`slide "${def.id}" setup failed: ${error.message}`);
    }
  };

  const color = (name) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(`--c-${name}`).trim();
    if (!value) throw fail(`unknown color role "${name}" (see core/tokens.css)`);
    return value;
  };

  // Seeded helpers so that "random" layouts are identical on every run and every capture.
  const rng = (seed) => {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const shuffled = (items, seed) => {
    const next = rng(seed);
    return items.map((item) => [next(), item]).sort((a, b) => a[0] - b[0]).map((pair) => pair[1]);
  };
  const util = Object.freeze({
    rng, range, shuffled,
    clamp: (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v)),
    lerp: (a, b, p) => a + (b - a) * p,
    svg: (tag, attrs = {}) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
      return node;
    },
  });

  Object.assign(D, {
    STAGE, LIMITS, flags, util, color, figureTags, tagsOf, tagsInUse,
    configure, addSources, addFacts, fact, register, placeholder, mount, fail, citeText,
  });
  // Live read-only views of the registries (Object.assign would copy a snapshot).
  const expose = (name, get) => Object.defineProperty(D, name, { get, enumerable: true });
  expose('meta', () => meta);
  expose('sources', () => sources);
  expose('facts', () => facts);
  expose('slides', () => slides);
  expose('errors', () => errors);
})();
