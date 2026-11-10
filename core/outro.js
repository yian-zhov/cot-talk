// The last slide: every source cited by any slide, in order of first use, with the slides
// that cite it, and what the tags in the footers mean.
// Generated from the registry, so parts never edit a shared reference list.
(() => {
  'use strict';

  const D = window.Deck;
  const keys = D.slides
    .flatMap((slide) => slide.cite.map((c) => c.src))
    .filter((key, i, all) => all.indexOf(key) === i);

  // Where each source is used: the slide numbers that cite it.
  const usedOn = (key) => D.slides
    .map((slide, i) => (slide.cite.some((c) => c.src === key) ? i + 1 : 0))
    .filter(Boolean);

  const rows = keys.map((key) => {
    const s = D.sources[key];
    const who = (s.authors ?? s.short).replace(/\.$/, '');
    const on = usedOn(key);
    return `<li><b>${who}.</b> ${s.title}. <span class="dk-ref">${s.full ?? s.ref}</span> <span class="dk-used">slide${on.length > 1 ? 's' : ''} ${on.join(', ')}</span></li>`;
  }).join('');

  // What the tags in the footers mean: those that a footer of this deck carries
  // (Deck.tagsInUse, core/deck.js). A definition without a slide to look at would only
  // raise the question of where that tag is.
  const tags = D.tagsInUse(D.slides)
    .map((t) => `<li><span class="${t.className}">${t.tag}</span><span class="dk-tags__means">${t.means}</span></li>`)
    .join('');

  D.register({
    id: 'sources',
    part: 0,
    kicker: 'Sources',
    title: 'Every reported number traces to one of these',
    cues: [],
    cite: [],
    html: `
      <ol class="dk-sources">${rows}</ol>
      <div class="dk-tags">
        <div class="dk-tags__head">The tags in the footers</div>
        <ul class="dk-tags__list">${tags}</ul>
      </div>`,
    setup: (ctx) => {
      const enter = ctx.step();
      enter.show('.dk-sources li', { stagger: 40 });
      enter.show('.dk-tags', { at: 400 });
    },
  });
})();
