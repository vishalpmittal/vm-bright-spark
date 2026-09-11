// Swimming — water safety and swim skills for kids. Each item is a question
// (`q`), the best answer (`a`), and a matching emoji shown above the question.
//
// The shared quiz engine builds the wrong choices from OTHER items' answers, so
// each `a` is written as a distinct answer — no other item's answer should also
// fit the question, otherwise a distractor could accidentally be "right" too.
//
// Questions are drawn from the "Ultimate Wholesome Swimming Quiz for Kids" and
// condensed into short, child-friendly answers, grouped by skill.

export const SWIMMING = [
  // --- Pool deck safety & rules ---
  { q: 'Who should be watching you before you get in the water?', a: 'A grown-up or lifeguard', emoji: '🛟' },
  { q: 'How should you move across a slippery pool deck?', a: 'Walk slowly like a penguin', emoji: '🐧' },
  { q: 'Why do we take a quick shower before swimming?', a: 'To wash off dirt and stay clean', emoji: '🚿' },
  { q: 'A lifeguard blows a loud whistle. What do you do?', a: 'Stop and listen to the lifeguard', emoji: '📣' },
  { q: 'Where is it safe to dive in head-first?', a: 'Only where a sign says diving is allowed', emoji: '🤿' },
  { q: 'Why should you not eat or chew gum while swimming?', a: 'You could choke', emoji: '🍬' },
  { q: 'What shoes are best on a wet pool deck?', a: 'Sandals with good grip', emoji: '🩴' },
  { q: 'You see lightning in the sky while swimming. What do you do?', a: 'Get out of the water right away', emoji: '⛈️' },
  { q: 'Why do we look before we jump into the water?', a: "So we don't land on another swimmer", emoji: '👀' },
  { q: 'When is it okay to swim all by yourself?', a: 'Never — always swim with a buddy', emoji: '👭' },

  // --- Water comfort & bubbles ---
  { q: 'How do you blow bubbles underwater?', a: 'Breathe out slowly and gently', emoji: '🫧' },
  { q: 'What helps you see clearly underwater?', a: 'Swim goggles', emoji: '🥽' },
  { q: 'A little water splashes into your eyes. What do you do?', a: 'Blink and wipe it away', emoji: '💧' },
  { q: 'How do you do a "bob" in the shallow end?', a: 'Duck down, blow bubbles, come back up', emoji: '🦆' },
  { q: 'What do we call the way water lifts you up?', a: 'Buoyancy', emoji: '🎈' },
  { q: 'You feel nervous putting your face in the water. What is true?', a: "It's okay to take your time", emoji: '😌' },
  { q: 'How can you keep water out of your ears?', a: 'Wear a swim cap or earplugs', emoji: '👂' },

  // --- Floating ---
  { q: 'In a starfish back float, where do your eyes look?', a: 'Straight up at the sky', emoji: '☁️' },
  { q: 'How do your arms and legs look in a starfish float?', a: 'Spread out wide like a star', emoji: '⭐' },
  { q: 'What is a jellyfish float?', a: 'Floating face down with arms and legs loose', emoji: '🪼' },
  { q: 'In a tuck float, what do you hold?', a: 'Hug your knees to your chest', emoji: '🫂' },
  { q: 'What is floating on your tummy called?', a: 'A front float, like Superman', emoji: '🦸' },
  { q: 'Why is the back float such an important safety skill?', a: 'You can rest and breathe when tired', emoji: '🛌' },

  // --- Glides & kicking ---
  { q: 'How should your arms look when you push off the wall?', a: 'Stretched tight like a rocket', emoji: '🚀' },
  { q: 'What kind of feet make a good flutter kick?', a: 'Long, floppy, relaxed feet', emoji: '🦶' },
  { q: 'Where does your kicking power come from?', a: 'From your hips', emoji: '🦵' },
  { q: 'What splashes does a good flutter kick make?', a: 'Small, steady splashes', emoji: '💦' },
  { q: 'What is the frog-style kick called?', a: 'The whip kick', emoji: '🐸' },
  { q: 'Both legs move together like a mermaid tail. What kick is it?', a: 'The dolphin kick', emoji: '🐬' },
  { q: 'In a soldier kick, where are your arms?', a: 'Held down at your sides', emoji: '💂' },

  // --- Freestyle (front crawl) ---
  { q: 'What shape should your hand make when you pull the water?', a: 'Fingers together like a paddle', emoji: '🤲' },
  { q: 'How do you take a breath during freestyle?', a: 'Turn your head to the side', emoji: '🗣️' },
  { q: 'What is bilateral breathing?', a: 'Breathing to both sides', emoji: '↔️' },
  { q: 'Your hands slap the water loudly. What should you fix?', a: 'Slice your hands in quietly', emoji: '🤫' },
  { q: 'What line on the pool floor helps you swim straight?', a: 'The lane line', emoji: '➖' },
  { q: 'Your stroke feels clumsy at first. What should you do?', a: 'Keep practicing', emoji: '💪' },

  // --- Backstroke ---
  { q: 'How do your arms move in the backstroke?', a: 'Straight and long past your ears', emoji: '🕛' },
  { q: 'In backstroke, which part of your hand comes out first?', a: 'Your thumb', emoji: '👍' },
  { q: 'In backstroke, which finger goes into the water first?', a: 'Your pinky', emoji: '🤙' },
  { q: 'What are the flags hanging above the pool for?', a: 'Counting strokes before the wall', emoji: '🚩' },
  { q: 'Where should the water sit on your face during backstroke?', a: 'Around your ears, face in the air', emoji: '👂' },
  { q: 'How do you finish a backstroke lap?', a: 'Reach back and touch the wall', emoji: '🧱' },

  // --- Advanced strokes & turns ---
  { q: 'What is the breaststroke rhythm we say?', a: 'Pull, breathe, kick, glide', emoji: '🎵' },
  { q: 'What shape do your hands draw in the breaststroke pull?', a: 'A little heart shape', emoji: '❤️' },
  { q: 'In butterfly, your arms sweep out like what?', a: "A butterfly's wings", emoji: '🦋' },
  { q: 'How many dolphin kicks are in one butterfly stroke?', a: 'Two kicks', emoji: '2️⃣' },
  { q: 'What is a turn where you touch the wall with both hands?', a: 'A two-hand touch', emoji: '🙌' },
  { q: 'What is an Individual Medley (IM)?', a: 'Swimming all four strokes', emoji: '🏊' },
  { q: 'What is the underwater flip used to turn around?', a: 'A flip turn', emoji: '🤸' },
  { q: 'What should you do after a hard swim practice?', a: 'Dry off and celebrate your work', emoji: '🎉' },
  { q: 'What is the real secret to becoming a great swimmer?', a: 'Practice and never give up', emoji: '🌟' },

  // --- More coverage (reworded to keep answers distinct) ---
  // Safety
  { q: 'You see a toy floating in the deep end and no adult is near. What do you do?', a: 'Leave it and get a grown-up', emoji: '🧸' },
  { q: 'A friend dares you to do something unsafe. What do you say?', a: 'Say no to unsafe dares', emoji: '🙅' },
  { q: 'You get cold and start to shiver in the water. What do you do?', a: 'Wrap up warm in a towel', emoji: '🧣' },
  { q: 'You see the pool gate left wide open. What do you do?', a: 'Close the pool gate', emoji: '🚧' },
  { q: 'Why should you never push a friend into the pool?', a: 'It could scare or hurt them', emoji: '✋' },
  // Water comfort & bubbles
  { q: 'What fun sound can you hum with your chin in the water?', a: 'Hum a motorboat sound', emoji: '🚤' },
  { q: 'How do you help your body get used to the water first?', a: 'Splash water on your body first', emoji: '🌊' },
  { q: 'With goggles on, what fun thing can you do underwater?', a: 'Look for toys on the bottom', emoji: '🔍' },
  // Floating
  { q: 'Why does your teacher hold their hands under your back?', a: 'To keep you safe while you learn', emoji: '👐' },
  { q: 'How do you stand up after a back float?', a: 'Bring your feet down and stand', emoji: '🧍' },
  // Glides & kicking
  { q: 'How do you hold a kickboard for a steady ride?', a: 'Hold the kickboard out in front', emoji: '🛶' },
  { q: 'While gliding on your front, where should you look?', a: 'Down at the pool floor', emoji: '🔽' },
  { q: 'Why do we glide without kicking after pushing off?', a: 'To feel how fast you go', emoji: '💨' },
  { q: 'Your legs feel tired from kicking. What do you do?', a: 'Slow down and rest a little', emoji: '🛑' },
  { q: 'In a side kick, what does your bottom arm do?', a: 'Rest your ear on your bottom arm', emoji: '💤' },
  // Freestyle
  { q: 'How far back should your hand pull in freestyle?', a: 'All the way to your thigh', emoji: '👖' },
  { q: 'How should your elbow look as your arm comes back over?', a: 'Bring your elbow up high', emoji: '🙋' },
  { q: 'Where should your hand enter the water in freestyle?', a: 'In line with your shoulder', emoji: '🎯' },
  { q: 'Why does your body roll side to side in freestyle?', a: 'To reach farther and breathe easier', emoji: '🔄' },
  { q: 'When you breathe to the side, how much stays underwater?', a: 'Keep one eye in the water', emoji: '👁️' },
  // Advanced strokes & turns
  { q: 'After the breaststroke pull, what do your hands do?', a: 'Shoot forward like an arrow', emoji: '🏹' },
  { q: 'Where does the butterfly dolphin kick begin?', a: 'Start the wave from your tummy', emoji: '〰️' },
  { q: 'In a flip turn, what pushes you off the wall?', a: 'Both of your feet', emoji: '👣' },
];
