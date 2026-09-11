// Suffix Choice — the disambiguation "engines" from the guideline:
//   -tion (default) vs -sion (after d/de/s roots) vs -cian (people/jobs), and
//   -able (whole base word) vs -ible (bound root).
// The child is given the base/stem and picks the ending the rule predicts.
// Answers are the five endings, which are mutually exclusive per word.

export const SUFFIX_CHOICE = [
  // -tion: the default noun ending, usually after t-type stems.
  { q: "From 'act': which ending makes the noun?  ac___", a: '-tion' },
  { q: "From 'invent': which ending makes the noun?  inven___", a: '-tion' },
  { q: "From 'educate': which ending makes the noun?  educa___", a: '-tion' },
  { q: "From 'celebrate': which ending makes the noun?  celebra___", a: '-tion' },
  { q: "From 'protect': which ending makes the noun?  protec___", a: '-tion' },

  // -sion: used when the base ends in d, de, or s (decide -> decision).
  { q: "From 'decide': which ending makes the noun?  deci___", a: '-sion' },
  { q: "From 'divide': which ending makes the noun?  divi___", a: '-sion' },
  { q: "From 'explode': which ending makes the noun?  explo___", a: '-sion' },
  { q: "From 'confuse': which ending makes the noun?  confu___", a: '-sion' },
  { q: "From 'expand': which ending makes the noun?  expan___", a: '-sion' },

  // -cian: a person who does something (usually a job).
  { q: "A person who does magic:  magi___", a: '-cian' },
  { q: "A person who plays music:  musi___", a: '-cian' },
  { q: "A person who fixes electrics:  electri___", a: '-cian' },
  { q: "A person who works in politics:  politi___", a: '-cian' },

  // -able: attaches to a complete, standalone base word.
  { q: "Able to be read (base word 'read'):  read___", a: '-able' },
  { q: "Able to be washed (base word 'wash'):  wash___", a: '-able' },
  { q: "Able to be enjoyed (base word 'enjoy'):  enjoy___", a: '-able' },
  { q: "Able to be broken (base word 'break'):  break___", a: '-able' },
  { q: "Able to be adored (base word 'adore'):  ador___", a: '-able' },

  // -ible: attaches to an incomplete root that is not a full word on its own.
  { q: "Able to be seen (Latin root 'vis-'):  vis___", a: '-ible' },
  { q: "Root 'poss-' (not a full word):  poss___", a: '-ible' },
  { q: "Root 'terr-' (not a full word):  terr___", a: '-ible' },
  { q: "Root 'sens-' (not a full word):  sens___", a: '-ible' },
  { q: "Able to be eaten (Latin root 'ed-'):  ed___", a: '-ible' },

  // -ous (adjective, "full of") vs -us (Latin noun ending).
  { q: "Full of fame (adjective, from 'fame'):  fam___", a: '-ous' },
  { q: "Full of danger (adjective):  danger___", a: '-ous' },
  { q: "Full of poison (adjective):  poison___", a: '-ous' },
  { q: "A prickly desert plant (a noun):  cact___", a: '-us' },
  { q: "A mushroom-like living thing (a noun):  fung___", a: '-us' },
  { q: "A big tusked sea animal (a noun):  walr___", a: '-us' },

  // -ceed / -cede / -sede: three -ceed words, one -sede word, the rest -cede.
  { q: "To go beyond a limit:  ex___", a: '-ceed' },
  { q: "To move forward:  pro___", a: '-ceed' },
  { q: "To do very well:  suc___", a: '-ceed' },
  { q: "To move back or withdraw:  re___", a: '-cede' },
  { q: "To come before:  pre___", a: '-cede' },
  { q: "To give in or admit:  con___", a: '-cede' },
  { q: "To replace and set aside (the ONLY word with this ending):  super___", a: '-sede' },
];
