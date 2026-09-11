// Chameleon Prefixes — Latin assimilation: a prefix changes its last letter to
// match the root it joins, which is why we write impossible (not inpossible) and
// account (not adcount). The child picks what the prefix turns into.
// Answers are the assimilated prefix forms, each correct for exactly one join.

export const CHAMELEON = [
  // in- (meaning "not") -> im / il / ir / stays in
  { q: "The prefix 'in-' (not) joins 'possible'. What does it become?", a: 'im-' },
  { q: "The prefix 'in-' (not) joins 'legal'. What does it become?", a: 'il-' },
  { q: "The prefix 'in-' (not) joins 'regular'. What does it become?", a: 'ir-' },
  { q: "The prefix 'in-' (not) joins 'active'. What does it become?", a: 'in-' },
  { q: "The prefix 'in-' (not) joins 'mature'. What does it become?", a: 'im-' },

  // ad- (meaning "to/toward") -> ac / ap / ar / as
  { q: "The prefix 'ad-' joins 'count'. What does it become? (account)", a: 'ac-' },
  { q: "The prefix 'ad-' joins 'prove'. What does it become? (approve)", a: 'ap-' },
  { q: "The prefix 'ad-' joins 'rive'. What does it become? (arrive)", a: 'ar-' },
  { q: "The prefix 'ad-' joins 'sist'. What does it become? (assist)", a: 'as-' },

  // con- (meaning "with/together") -> com / col / cor
  { q: "The prefix 'con-' joins 'rect'. What does it become? (correct)", a: 'cor-' },
  { q: "The prefix 'con-' joins 'lect'. What does it become? (collect)", a: 'col-' },
  { q: "The prefix 'con-' joins 'municate'. What does it become? (communicate)", a: 'com-' },

  // sub- (meaning "under") -> sup / sug / suf
  { q: "The prefix 'sub-' joins 'port'. What does it become? (support)", a: 'sup-' },
  { q: "The prefix 'sub-' joins 'gest'. What does it become? (suggest)", a: 'sug-' },
  { q: "The prefix 'sub-' joins 'fer'. What does it become? (suffer)", a: 'suf-' },
];
