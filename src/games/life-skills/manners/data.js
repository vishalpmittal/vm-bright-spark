// Good Manners — everyday etiquette for kids. Each item is a situation (`q`),
// the polite thing to do (`a`), and a matching emoji shown above the question.
//
// The shared quiz engine builds the wrong choices from OTHER items' answers, so
// each `a` is written as a distinct action — no other answer should also fit the
// situation, otherwise a distractor could accidentally be "right" too.

export const MANNERS = [
  { q: 'What should you do when you sneeze?', a: 'Cover it with your elbow', emoji: '🤧' },
  { q: 'Someone next to you sneezes. What do you say?', a: 'Bless you!', emoji: '😇' },
  { q: 'How do you greet an elderly person?', a: 'Smile and say a polite hello', emoji: '🧓' },
  { q: 'Someone gives you a present. What do you say?', a: 'Thank you!', emoji: '🎁' },
  { q: 'What should you do right before you eat?', a: 'Wash your hands', emoji: '🧼' },
  { q: 'Grown-ups are talking and you need to speak. What do you do?', a: 'Say "excuse me" and wait', emoji: '🙋' },
  { q: 'You bump into someone by accident. What do you say?', a: "I'm sorry", emoji: '🙇' },
  { q: 'You want food that is far away on the table. What do you say?', a: 'Please pass it', emoji: '🍽️' },
  { q: 'A friend is telling you a story. What should you do?', a: 'Look at them and listen', emoji: '👂' },
  { q: 'You are meeting someone new. What do you say?', a: 'Nice to meet you', emoji: '🤝' },
  { q: 'What do you do before opening a closed door?', a: 'Knock first', emoji: '🚪' },
  { q: 'A friend wants a turn with your toy. What do you do?', a: 'Share and take turns', emoji: '🧸' },
  { q: 'You are offered a food you do not like. What do you say?', a: 'No, thank you', emoji: '🥦' },
  { q: 'Lots of kids are waiting for the slide. What do you do?', a: 'Wait your turn in line', emoji: '🧍' },
  { q: 'You are inside a quiet library. How should you talk?', a: 'Use a soft, quiet voice', emoji: '🤫' },
  { q: 'What should you do while you are chewing food?', a: 'Keep your mouth closed', emoji: '😋' },
  { q: 'You are leaving a friend’s house. What do you say?', a: 'Thank you for having me!', emoji: '👋' },
  { q: 'You have finished eating at the table. What do you ask?', a: 'May I please be excused?', emoji: '🪑' },
  { q: 'A friend drops their books. What do you do?', a: 'Help them pick it up', emoji: '🤗' },
  { q: 'Someone says "thank you" to you. What do you say?', a: "You're welcome", emoji: '😊' },
  { q: 'You need to cough and people are near. What do you do?', a: 'Turn away and cover your mouth', emoji: '😷' },
  { q: 'You want to borrow a friend’s crayon. What do you say?', a: 'May I please borrow it?', emoji: '🖍️' },

  // --- Table manners ---
  { q: 'Your mouth is messy while eating. What do you use?', a: 'Wipe it gently with a napkin', emoji: '🧻' },
  { q: 'How should you sit while you eat?', a: 'Sit up straight in your chair', emoji: '🪑' },
  { q: 'What are forks and spoons for?', a: 'Only for eating food', emoji: '🍴' },
  { q: 'You finished your meal. How do you help?', a: 'Carry your plate to the sink', emoji: '🧽' },
  { q: 'Your plate is ready but others are not served yet. What do you do?', a: 'Wait until everyone is served', emoji: '⏳' },

  // --- Classroom & school ---
  { q: 'You know the answer in class. What do you do?', a: 'Raise your hand and wait', emoji: '✋' },
  { q: 'How do you move down the school hallway?', a: 'Walk quietly in a line', emoji: '🚶' },
  { q: 'A classmate lends you a marker. What do you do?', a: 'Return it when you are done', emoji: '✏️' },
  { q: 'The teacher is teaching the class. What do you do?', a: 'Sit still and pay attention', emoji: '👀' },
  { q: 'How do you treat a library book?', a: 'Turn the pages gently', emoji: '📚' },
  { q: 'How do you keep your desk?', a: 'Put trash in the bin and tidy up', emoji: '🧹' },

  // --- Social play & sharing ---
  { q: 'Another child has a toy you want. What do you do?', a: 'Ask if you can play next', emoji: '🚂' },
  { q: 'Your friend won the game. What do you say?', a: 'Good game!', emoji: '🎲' },
  { q: 'You won the game. What do you say?', a: 'Thanks for playing with me!', emoji: '🏆' },
  { q: 'A child is playing all alone. What do you do?', a: 'Ask them to play with you', emoji: '🧑‍🤝‍🧑' },
  { q: 'You are visiting a friend’s house. What do you do?', a: 'Follow their house rules', emoji: '🏠' },
  { q: 'Playtime is over. What do you do?', a: 'Help put the toys away', emoji: '🧸' },
  { q: 'You have a treat and your friend has none. What do you do?', a: 'Share it with your friend', emoji: '🍪' },

  // --- Home, family & respect ---
  { q: 'You just woke up. What do you say to your family?', a: 'Good morning!', emoji: '🌅' },
  { q: 'A grown-up asks you to do a chore. What do you do?', a: 'Do it right away', emoji: '🧺' },
  { q: 'It is bedtime. What do you do?', a: 'Brush your teeth and go to bed', emoji: '🛏️' },
  { q: 'Someone at home is taking a nap. What do you do?', a: 'Play quietly so you do not wake them', emoji: '😴' },
  { q: 'You spill your drink at home. What do you do?', a: 'Wipe it up with a towel', emoji: '🥛' },

  // --- More coverage (reworded to keep answers distinct) ---
  { q: 'Your class is lining up for recess. What do you do?', a: 'Go to the end of the line', emoji: '🧑‍🎓' },
  { q: 'Lots of kids want the swings at recess. What do you do?', a: 'Take turns on the slide and swings', emoji: '🛝' },
  { q: 'A visitor walks into your classroom. What do you do?', a: 'Say hello and keep working', emoji: '🏫' },
  { q: 'You bump a friend while playing tag. What do you do?', a: 'Stop and ask if they are OK', emoji: '🏃' },
  { q: 'A friend tells a funny story. What do you do?', a: 'Laugh along kindly', emoji: '😄' },
  { q: 'Playtime with your friend is over. What do you say?', a: 'Wave and say goodbye', emoji: '👋' },
  { q: 'A grown-up is on a phone call and you need them. What do you do?', a: 'Wait quietly until they finish', emoji: '📞' },
  { q: 'You want to use something that is not yours. What do you do?', a: 'Ask before you touch it', emoji: '🙏' },
  { q: 'Your grandparents come to visit. What do you do?', a: 'Give them a big hug hello', emoji: '👵' },
];
