// Bibliography registry. A slide cites by key: cite: [{ src: 'baker2025', where: 'Table 1' }].
// The footer prints `short, where`; the final Sources slide prints `authors. title. full ?? ref`.
// Shared file. Every entry was checked against the original on 2026-11-09 (SPEC.md, section 7).
// A part that needs another source registers it in its own file with Deck.addSources.
Deck.addSources({
  korbak2025: {
    short: 'Korbak et al. 2025',
    authors: 'Korbak, Balesni, Barnes, Bengio, et al. (41 authors)',
    title: 'Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety',
    ref: 'arXiv:2507.11473',
  },
  baker2025: {
    short: 'Baker et al. 2025',
    authors: 'Baker, Huizinga, Gao, Dou, Guan, Madry, Zaremba, Pachocki, Farhi',
    title: 'Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation',
    ref: 'arXiv:2503.11926',
  },
  chen2025: {
    short: 'Chen et al. 2025',
    authors: 'Chen, Benton, Radhakrishnan, Uesato, Denison, et al.',
    title: 'Reasoning Models Don\'t Always Say What They Think',
    ref: 'arXiv:2505.05410',
  },
  pfau2024: {
    short: 'Pfau et al. 2024',
    authors: 'Pfau, Merrill, Bowman',
    title: 'Let\'s Think Dot by Dot: Hidden Computation in Transformer Language Models',
    ref: 'arXiv:2404.15758',
  },
  hao2024: {
    short: 'Hao et al. 2024',
    authors: 'Hao, Sukhbaatar, Su, Li, Hu, Weston, Tian',
    title: 'Training Large Language Models to Reason in a Continuous Latent Space',
    ref: 'arXiv:2412.06769',
  },
  emmons2025: {
    short: 'Emmons et al. 2025',
    authors: 'Emmons, Jenner, Elson, Saurous, Rajamanoharan, Chen, Shafkat, Shah',
    title: 'When Chain of Thought is Necessary, Language Models Struggle to Evade Monitors',
    ref: 'arXiv:2507.05246',
  },
});
