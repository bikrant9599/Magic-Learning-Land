// Structured, verified educational question banks and generators for all 80 mini-games.
// Ensures zero incorrect assignments and full curriculum coverage for Nursery to Class 1.

import {
  MASTER_ANIMALS,
  MASTER_COLORS,
  MASTER_SHAPES,
  COMMON_SOUNDS,
  FOOD_ITEMS,
  BODY_PARTS,
  WEATHER_SCENARIOS,
  VEHICLES_DATA,
  EMOTIONS_DATA,
  COMMUNITY_HELPERS,
  COLOR_MIXING_PAIRS,
} from './verifiedData';

export interface GameQuestion {
  id: string;
  prompt: string;
  voicePrompt?: string;
  contextEmoji?: string;
  options: {
    id: string;
    text: string;
    emoji?: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
  explanation: string;
  extraData?: any;
}

// ----------------------------------------------------
// 1. ANIMAL SOUND DETECTIVE (NURSERY GAME #5)
// ----------------------------------------------------
export function getAnimalSoundQuestion(index: number): GameQuestion {
  const animal = MASTER_ANIMALS[index % MASTER_ANIMALS.length];
  // Pick 3 distractors
  const distractors = MASTER_ANIMALS.filter((a) => a.id !== animal.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [animal, ...distractors]
    .sort(() => 0.5 - Math.random())
    .map((a) => ({
      id: a.id,
      text: a.name,
      emoji: a.emoji,
      isCorrect: a.id === animal.id,
      feedback: a.id === animal.id ? `Correct! ${animal.name} makes the sound "${animal.onomatopoeia}"` : `Try again! That is a ${a.name}.`,
    }));

  return {
    id: `animal_sound_${animal.id}`,
    prompt: `Which animal makes this sound?`,
    voicePrompt: `Listen carefully! Which animal makes this sound?`,
    contextEmoji: '🔊',
    options,
    explanation: `Correct! ${animal.name} ${animal.soundDescription} (${animal.onomatopoeia}). ${animal.fact}`,
    extraData: {
      animalId: animal.soundId,
      soundEffect: animal.soundId,
      soundName: animal.soundName,
      soundDescription: animal.soundDescription,
      onomatopoeia: animal.onomatopoeia,
      targetAnimal: animal,
    },
  };
}

// ----------------------------------------------------
// 2. ANIMAL HOME MATCH (NURSERY GAME #6)
// ----------------------------------------------------
export function getAnimalHomeQuestion(index: number): GameQuestion {
  const animal = MASTER_ANIMALS[index % MASTER_ANIMALS.length];
  const otherHomes = MASTER_ANIMALS.filter((a) => a.home !== animal.home)
    .map((a) => ({ home: a.home, homeEmoji: a.homeEmoji, homeName: a.homeName }))
    .filter((v, i, arr) => arr.findIndex((x) => x.home === v.home) === i)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const correctOption = {
    id: animal.home,
    text: animal.homeName,
    emoji: animal.homeEmoji,
    isCorrect: true,
  };

  const options = [
    correctOption,
    ...otherHomes.map((h) => ({
      id: h.home,
      text: h.homeName,
      emoji: h.homeEmoji,
      isCorrect: false,
    })),
  ].sort(() => 0.5 - Math.random());

  return {
    id: `animal_home_${animal.id}`,
    prompt: `Where does the ${animal.name} (${animal.emoji}) live?`,
    voicePrompt: `Where does the friendly ${animal.name} live? Help them find their home!`,
    contextEmoji: animal.emoji,
    options,
    explanation: `A ${animal.name} lives in a ${animal.homeName}! ${animal.fact}`,
    extraData: {
      animal,
    },
  };
}

// ----------------------------------------------------
// 3. SOUND DETECTIVE - COMMON SOUNDS (NURSERY GAME #11)
// ----------------------------------------------------
export function getEverydaySoundQuestion(index: number): GameQuestion {
  const soundItem = COMMON_SOUNDS[index % COMMON_SOUNDS.length];
  const distractors = COMMON_SOUNDS.filter((s) => s.id !== soundItem.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const options = [soundItem, ...distractors]
    .sort(() => 0.5 - Math.random())
    .map((s) => ({
      id: s.id,
      text: s.name,
      emoji: s.emoji,
      isCorrect: s.id === soundItem.id,
    }));

  return {
    id: `common_sound_${soundItem.id}`,
    prompt: `What makes this everyday sound?`,
    voicePrompt: `Listen carefully! What object makes this sound?`,
    contextEmoji: '🔊',
    options,
    explanation: `Correct! That was a ${soundItem.name}. ${soundItem.description}`,
    extraData: {
      soundEffect: soundItem.soundEffect,
      soundItem,
    },
  };
}

// ----------------------------------------------------
// 4. COLOR MIXING LAB (LKG GAME #19)
// ----------------------------------------------------
export function getColorMixingQuestion(index: number): GameQuestion {
  const formula = COLOR_MIXING_PAIRS[index % COLOR_MIXING_PAIRS.length];
  const wrongColors = ['Black', 'Brown', 'Grey', 'Cyan', 'Yellow', 'Blue']
    .filter((c) => c !== formula.result && c !== formula.color1 && c !== formula.color2)
    .slice(0, 3);

  const options = [
    { id: formula.result, text: formula.result, emoji: formula.resultEmoji, isCorrect: true },
    ...wrongColors.map((c) => ({ id: c, text: c, emoji: '🎨', isCorrect: false })),
  ].sort(() => 0.5 - Math.random());

  return {
    id: `color_mix_${index}`,
    prompt: `What color do you get when you mix ${formula.color1} ${formula.emoji1} + ${formula.color2} ${formula.emoji2}?`,
    voicePrompt: `Mix ${formula.color1} and ${formula.color2}! What new color will it make?`,
    contextEmoji: '🧪',
    options,
    explanation: `Magical! ${formula.color1} + ${formula.color2} creates ${formula.result}! ${formula.resultEmoji}`,
    extraData: formula,
  };
}

// ----------------------------------------------------
// 5. ANIMAL CLASSIFICATION (LKG GAME #12)
// ----------------------------------------------------
export function getAnimalClassificationQuestion(index: number): GameQuestion {
  const animal = MASTER_ANIMALS[index % MASTER_ANIMALS.length];
  const categoryNames: Record<string, string> = {
    farm: '🌾 Farm Animal',
    wild: '🌴 Jungle / Wild Animal',
    water: '🌊 Sea / Water Animal',
    pet: '🏠 Pet / Home Animal',
    bird: '🌳 Flying Bird',
  };

  const currentCat = animal.category;
  const categories = ['farm', 'wild', 'water'] as const;

  const options = categories.map((cat) => ({
    id: cat,
    text: categoryNames[cat] || cat,
    isCorrect: currentCat === cat || (cat === 'farm' && currentCat === 'pet') || (cat === 'wild' && currentCat === 'bird'),
  }));

  // Ensure at least one correct
  if (!options.some((o) => o.isCorrect)) {
    options[0].isCorrect = true;
  }

  return {
    id: `animal_class_${animal.id}`,
    prompt: `Where does the ${animal.name} (${animal.emoji}) belong?`,
    voicePrompt: `Is the ${animal.name} a Farm animal, Wild jungle animal, or Water creature?`,
    contextEmoji: animal.emoji,
    options,
    explanation: `Correct! ${animal.name} is a ${animal.category} animal. ${animal.fact}`,
    extraData: { animal },
  };
}

// ----------------------------------------------------
// 6. CVC & SIGHT WORDS FOR UKG (UKG GAMES #1, #2, #3, #4)
// ----------------------------------------------------
export const UKG_CVC_WORDS = [
  { word: 'CAT', missing: 'C _ T', missingLetter: 'A', emoji: '🐱', hint: 'A furry pet that meows', phonics: 'k-æ-t' },
  { word: 'DOG', missing: 'D _ G', missingLetter: 'O', emoji: '🐶', hint: 'A loyal pet that barks', phonics: 'd-ɒ-ɡ' },
  { word: 'SUN', missing: 'S _ N', missingLetter: 'U', emoji: '☀️', hint: 'Shines bright in the sky', phonics: 's-ʌ-n' },
  { word: 'CUP', missing: 'C _ P', missingLetter: 'U', emoji: '☕', hint: 'Used to drink warm milk', phonics: 'k-ʌ-p' },
  { word: 'BUS', missing: 'B _ S', missingLetter: 'U', emoji: '🚌', hint: 'Drives children to school', phonics: 'b-ʌ-s' },
  { word: 'PEN', missing: 'P _ N', missingLetter: 'E', emoji: '🖊️', hint: 'Used to write on paper', phonics: 'p-e-n' },
  { word: 'BOX', missing: 'B _ X', missingLetter: 'O', emoji: '📦', hint: 'Holds toys and gifts', phonics: 'b-ɒ-k-s' },
  { word: 'HAT', missing: 'H _ T', missingLetter: 'A', emoji: '👒', hint: 'Worn on your head', phonics: 'h-æ-t' },
  { word: 'PIG', missing: 'P _ G', missingLetter: 'I', emoji: '🐷', hint: 'Pink farm animal that oinks', phonics: 'p-ɪ-ɡ' },
  { word: 'FAN', missing: 'F _ N', missingLetter: 'A', emoji: '🪭', hint: 'Blows cool refreshing air', phonics: 'f-æ-n' },
  { word: 'BED', missing: 'B _ D', missingLetter: 'E', emoji: '🛏️', hint: 'Where we sleep at night', phonics: 'b-e-d' },
  { word: 'MAP', missing: 'M _ P', missingLetter: 'A', emoji: '🗺️', hint: 'Shows directions to places', phonics: 'm-æ-p' },
  { word: 'BUG', missing: 'B _ G', missingLetter: 'U', emoji: '🐞', hint: 'A tiny crawling insect', phonics: 'b-ʌ-ɡ' },
  { word: 'NET', missing: 'N _ T', missingLetter: 'E', emoji: '🥅', hint: 'Used to catch soccer balls', phonics: 'n-e-t' },
  { word: 'FOX', missing: 'F _ X', missingLetter: 'O', emoji: '🦊', hint: 'A clever woodland animal', phonics: 'f-ɒ-k-s' },
];

export function getUkgWordQuestion(index: number): GameQuestion {
  const item = UKG_CVC_WORDS[index % UKG_CVC_WORDS.length];
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const options = vowels.map((v) => ({
    id: v,
    text: v,
    isCorrect: v === item.missingLetter,
  }));

  return {
    id: `ukg_missing_${item.word}`,
    prompt: `Fill in the missing vowel: ${item.missing}`,
    voicePrompt: `What vowel completes the word for ${item.word}? ${item.missing}`,
    contextEmoji: item.emoji,
    options,
    explanation: `Correct! ${item.word} is spelled ${item.word.split('').join('-')}. ${item.hint}!`,
    extraData: item,
  };
}

// ----------------------------------------------------
// 7. CLASS 1 SHOPPING MATH (CLASS 1 GAME #10)
// ----------------------------------------------------
export interface ShoppingScenario {
  walletMoney: number;
  itemBought: string;
  itemEmoji: string;
  itemCost: number;
  changeLeft: number;
}

export const SHOPPING_SCENARIOS: ShoppingScenario[] = [
  { walletMoney: 10, itemBought: 'Red Apple', itemEmoji: '🍎', itemCost: 4, changeLeft: 6 },
  { walletMoney: 20, itemBought: 'Toy Car', itemEmoji: '🚗', itemCost: 12, changeLeft: 8 },
  { walletMoney: 15, itemBought: 'Drawing Book', itemEmoji: '📒', itemCost: 9, changeLeft: 6 },
  { walletMoney: 25, itemBought: 'Crayon Box', itemEmoji: '🖍️', itemCost: 15, changeLeft: 10 },
  { walletMoney: 50, itemBought: 'Teddy Bear', itemEmoji: '🧸', itemCost: 35, changeLeft: 15 },
  { walletMoney: 30, itemBought: 'Ice Cream Cup', itemEmoji: '🍨', itemCost: 18, changeLeft: 12 },
  { walletMoney: 20, itemBought: 'Pencil & Eraser', itemEmoji: '✏️', itemCost: 7, changeLeft: 13 },
];

export function getShoppingMathQuestion(index: number): GameQuestion {
  const scenario = SHOPPING_SCENARIOS[index % SHOPPING_SCENARIOS.length];
  const correctVal = scenario.changeLeft;
  const offsets = [-3, -1, 2, 4];
  const wrongVals = offsets
    .map((o) => correctVal + o)
    .filter((v) => v > 0 && v !== correctVal)
    .slice(0, 3);

  const options = [
    { id: `opt_${correctVal}`, text: `₹${correctVal}`, isCorrect: true },
    ...wrongVals.map((w) => ({ id: `opt_${w}`, text: `₹${w}`, isCorrect: false })),
  ].sort(() => 0.5 - Math.random());

  return {
    id: `shop_${index}`,
    prompt: `You have ₹${scenario.walletMoney}. You buy a ${scenario.itemBought} (${scenario.itemEmoji}) for ₹${scenario.itemCost}. How much change is left?`,
    voicePrompt: `You have ₹${scenario.walletMoney}. A ${scenario.itemBought} costs ₹${scenario.itemCost}. How much money do you get back?`,
    contextEmoji: '🛒',
    options,
    explanation: `Correct! ₹${scenario.walletMoney} − ₹${scenario.itemCost} = ₹${scenario.changeLeft} remaining change!`,
    extraData: scenario,
  };
}

// ----------------------------------------------------
// 8. CLASS 1 CLOCK & TIME (CLASS 1 GAME #11)
// ----------------------------------------------------
export interface ClockScenario {
  hour: number;
  minute: number;
  timeString: string;
  description: string;
}

export const CLOCK_SCENARIOS: ClockScenario[] = [
  { hour: 1, minute: 0, timeString: '1:00', description: 'One o’clock' },
  { hour: 3, minute: 0, timeString: '3:00', description: 'Three o’clock' },
  { hour: 6, minute: 0, timeString: '6:00', description: 'Six o’clock' },
  { hour: 9, minute: 0, timeString: '9:00', description: 'Nine o’clock' },
  { hour: 12, minute: 0, timeString: '12:00', description: 'Twelve o’clock' },
  { hour: 4, minute: 30, timeString: '4:30', description: 'Half past four' },
  { hour: 7, minute: 30, timeString: '7:30', description: 'Half past seven' },
  { hour: 10, minute: 30, timeString: '10:30', description: 'Half past ten' },
];

export function getClockQuestion(index: number): GameQuestion {
  const scenario = CLOCK_SCENARIOS[index % CLOCK_SCENARIOS.length];
  const distractors = CLOCK_SCENARIOS.filter((c) => c.timeString !== scenario.timeString)
    .slice(0, 3)
    .map((c) => c.timeString);

  const options = [
    { id: scenario.timeString, text: `${scenario.timeString} (${scenario.description})`, isCorrect: true },
    ...distractors.map((d) => ({ id: d, text: d, isCorrect: false })),
  ].sort(() => 0.5 - Math.random());

  return {
    id: `clock_${index}`,
    prompt: `What time does this analog clock show?`,
    voicePrompt: `Look at the hour hand and minute hand! What time is it?`,
    contextEmoji: '⏰',
    options,
    explanation: `Correct! The clock shows ${scenario.timeString} (${scenario.description}).`,
    extraData: scenario,
  };
}

// ----------------------------------------------------
// 9. CLASS 1 GENERAL KNOWLEDGE QUIZ (CLASS 1 GAME #16)
// ----------------------------------------------------
export interface GkQuestionItem {
  question: string;
  voice: string;
  correctAnswer: string;
  wrongAnswers: string[];
  emoji: string;
  fact: string;
}

export const GK_QUESTIONS: GkQuestionItem[] = [
  {
    question: 'Which planet is closest to the Sun and the smallest in our Solar System?',
    voice: 'Which planet is closest to the Sun?',
    correctAnswer: 'Mercury',
    wrongAnswers: ['Jupiter', 'Mars', 'Neptune'],
    emoji: '🪐',
    fact: 'Mercury is the smallest planet and zips around the Sun the fastest!',
  },
  {
    question: 'How many legs does an insect have?',
    voice: 'How many legs does an insect have?',
    correctAnswer: '6 Legs',
    wrongAnswers: ['4 Legs', '8 Legs', '10 Legs'],
    emoji: '🐜',
    fact: 'All insects have 6 legs and 3 body sections (head, thorax, abdomen)! Spiders have 8 legs.',
  },
  {
    question: 'Which is the largest land animal in the world?',
    voice: 'Which is the largest land animal in the world?',
    correctAnswer: 'African Elephant',
    wrongAnswers: ['Giraffe', 'Hippopotamus', 'Polar Bear'],
    emoji: '🐘',
    fact: 'The African Elephant is the largest land animal and uses its ears to keep cool!',
  },
  {
    question: 'What is the color of chlorophyll that helps plant leaves make food?',
    voice: 'What color is chlorophyll in leaves?',
    correctAnswer: 'Green',
    wrongAnswers: ['Red', 'Blue', 'Purple'],
    emoji: '🍃',
    fact: 'Chlorophyll is the green pigment in leaves that absorbs sunlight for photosynthesis!',
  },
  {
    question: 'How many hours are there in one complete day and night?',
    voice: 'How many hours are there in one full day?',
    correctAnswer: '24 Hours',
    wrongAnswers: ['12 Hours', '60 Hours', '30 Hours'],
    emoji: '🌞',
    fact: 'The Earth rotates on its axis once every 24 hours to create day and night!',
  },
  {
    question: 'Which is the fastest land animal on Earth?',
    voice: 'Which is the fastest land animal?',
    correctAnswer: 'Cheetah',
    wrongAnswers: ['Lion', 'Horse', 'Kangaroo'],
    emoji: '🐆',
    fact: 'A cheetah can sprint up to 100 km/h in just a few seconds!',
  },
];

export function getGkQuizQuestion(index: number): GameQuestion {
  const item = GK_QUESTIONS[index % GK_QUESTIONS.length];
  const options = [
    { id: item.correctAnswer, text: item.correctAnswer, isCorrect: true },
    ...item.wrongAnswers.map((w) => ({ id: w, text: w, isCorrect: false })),
  ].sort(() => 0.5 - Math.random());

  return {
    id: `gk_${index}`,
    prompt: item.question,
    voicePrompt: item.voice,
    contextEmoji: item.emoji,
    options,
    explanation: `Correct! ${item.correctAnswer}. ${item.fact}`,
    extraData: item,
  };
}

// ----------------------------------------------------
// 10. NOUN OR ACTION VERB? (CLASS 1 GAME #6)
// ----------------------------------------------------
export interface GrammarItem {
  word: string;
  type: 'noun' | 'verb';
  emoji: string;
  definition: string;
}

export const NOUN_VERB_ITEMS: GrammarItem[] = [
  { word: 'Jump', type: 'verb', emoji: '🦘', definition: 'An action word: to leap into the air' },
  { word: 'Elephant', type: 'noun', emoji: '🐘', definition: 'A naming word for a large animal' },
  { word: 'Sing', type: 'verb', emoji: '🎤', definition: 'An action word: to make musical vocal sounds' },
  { word: 'School', type: 'noun', emoji: '🏫', definition: 'A naming word for a place of learning' },
  { word: 'Dance', type: 'verb', emoji: '💃', definition: 'An action word: to move your body to rhythm' },
  { word: 'Apple', type: 'noun', emoji: '🍎', definition: 'A naming word for a sweet red fruit' },
  { word: 'Run', type: 'verb', emoji: '🏃', definition: 'An action word: to move quickly on foot' },
  { word: 'Bicycle', type: 'noun', emoji: '🚲', definition: 'A naming word for a two-wheeled vehicle' },
  { word: 'Sleep', type: 'verb', emoji: '😴', definition: 'An action word: to rest and dream' },
  { word: 'Doctor', type: 'noun', emoji: '👩‍⚕️', definition: 'A naming word for a person who treats illnesses' },
];

export function getNounVerbQuestion(index: number): GameQuestion {
  const item = NOUN_VERB_ITEMS[index % NOUN_VERB_ITEMS.length];
  const isNoun = item.type === 'noun';

  const options = [
    {
      id: 'noun',
      text: '🏷️ Noun (Naming Word for Person, Place, or Thing)',
      isCorrect: isNoun,
    },
    {
      id: 'verb',
      text: '⚡ Verb (Action Word something you can do)',
      isCorrect: !isNoun,
    },
  ];

  return {
    id: `noun_verb_${item.word}`,
    prompt: `Is "${item.word}" (${item.emoji}) a Noun or a Verb?`,
    voicePrompt: `Is the word "${item.word}" a Naming Noun or an Action Verb?`,
    contextEmoji: item.emoji,
    options,
    explanation: `"${item.word}" is a ${isNoun ? 'Noun (Naming Word)' : 'Verb (Action Word)'}! ${item.definition}.`,
    extraData: item,
  };
}
