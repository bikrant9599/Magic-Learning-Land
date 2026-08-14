import {
  ReadingWordItem,
  MissingLetterItem,
  WordBuilderItem,
  ReadingSentenceStory,
  ListeningWordItem,
  BeforeAfterItem,
  MissingHundredItem,
  GreaterLessItem,
  TrainOrderItem,
  VisualMathProblem,
  TreasureChestProblem,
  MonsterFeedProblem,
  BridgeStepProblem,
  OddOneOutItem,
  MemoryPairItem,
  SequencePatternItem,
  SortingBinItem,
  ShadowMatchItem,
  CharacterCompanion,
  Badge,
  ParentProgressData,
} from '../types';

// ==========================================
// 1. 📖 READING FOREST DATA (Early Literacy)
// ==========================================

export const READING_WORDS: ReadingWordItem[] = [
  { id: 'w1', word: 'CAT', phonics: 'k - æ - t', emoji: '🐱', hint: 'A furry pet that purrs and says meow!', category: 'cvc', options: ['CAT', 'BAT', 'HAT'] },
  { id: 'w2', word: 'SUN', phonics: 's - ʌ - n', emoji: '☀️', hint: 'The bright yellow star in the sky!', category: 'cvc', options: ['SUN', 'RUN', 'FUN'] },
  { id: 'w3', word: 'DOG', phonics: 'd - ɒ - ɡ', emoji: '🐶', hint: 'A friendly pet that barks woof!', category: 'cvc', options: ['DOG', 'LOG', 'FOG'] },
  { id: 'w4', word: 'CUP', phonics: 'k - ʌ - p', emoji: '☕', hint: 'Something we drink warm cocoa from!', category: 'cvc', options: ['CUP', 'PUP', 'CAP'] },
  { id: 'w5', word: 'PEN', phonics: 'p - ɛ - n', emoji: '🖊️', hint: 'Used for drawing and writing letters!', category: 'cvc', options: ['PEN', 'HEN', 'TEN'] },
  { id: 'w6', word: 'CAR', phonics: 'k - ɑː', emoji: '🚗', hint: 'A vehicle with four wheels that goes vroom!', category: 'cvc', options: ['CAR', 'JAR', 'STAR'] },
  { id: 'w7', word: 'FOX', phonics: 'f - ɒ - k - s', emoji: '🦊', hint: 'A clever animal with a bushy orange tail!', category: 'animals', options: ['FOX', 'BOX', 'SIX'] },
  { id: 'w8', word: 'BAT', phonics: 'b - æ - t', emoji: '🦇', hint: 'A night creature or something used in cricket & baseball!', category: 'animals', options: ['BAT', 'RAT', 'MAT'] },
  { id: 'w9', word: 'BED', phonics: 'b - ɛ - d', emoji: '🛏️', hint: 'Where we sleep and have sweet dreams!', category: 'objects', options: ['BED', 'RED', 'FED'] },
  { id: 'w10', word: 'HAT', phonics: 'h - æ - t', emoji: '👒', hint: 'We wear it on our head in the sunshine!', category: 'objects', options: ['HAT', 'CAT', 'BAT'] },
  { id: 'w11', word: 'PIG', phonics: 'p - ɪ - ɡ', emoji: '🐷', hint: 'A cute pink animal that loves mud!', category: 'animals', options: ['PIG', 'BIG', 'DIG'] },
  { id: 'w12', word: 'BUS', phonics: 'b - ʌ - s', emoji: '🚌', hint: 'A big yellow vehicle taking kids to school!', category: 'objects', options: ['BUS', 'BUG', 'BUN'] },
  { id: 'w13', word: 'NET', phonics: 'n - ɛ - t', emoji: '🥅', hint: 'Catching balls or butterflies!', category: 'objects', options: ['NET', 'PET', 'WET'] },
  { id: 'w14', word: 'LOG', phonics: 'l - ɒ - ɡ', emoji: '🪵', hint: 'A piece of wood in the forest!', category: 'nature', options: ['LOG', 'DOG', 'FROG'] },
  { id: 'w15', word: 'BUG', phonics: 'b - ʌ - ɡ', emoji: '🐛', hint: 'A tiny crawling garden insect!', category: 'animals', options: ['BUG', 'HUG', 'MUG'] },
  { id: 'w16', word: 'APPLE', phonics: 'æ - p - l', emoji: '🍎', hint: 'A crunchy sweet red fruit!', category: 'food', options: ['APPLE', 'APRICOT', 'AVOCADO'] },
  { id: 'w17', word: 'TREE', phonics: 't - r - iː', emoji: '🌳', hint: 'Tall green plant with leafy branches!', category: 'nature', options: ['TREE', 'THREE', 'FREE'] },
  { id: 'w18', word: 'STAR', phonics: 's - t - ɑː', emoji: '⭐', hint: 'Twinkling lights high in the night sky!', category: 'nature', options: ['STAR', 'CAR', 'SCAR'] },
];

export const MISSING_LETTERS: MissingLetterItem[] = [
  { id: 'ml1', fullWord: 'CAT', displayWord: 'C _ T', missingIndex: 1, correctLetter: 'A', emoji: '🐱', options: ['A', 'O', 'U'], hint: 'C + A + T makes CAT!' },
  { id: 'ml2', fullWord: 'SUN', displayWord: 'S _ N', missingIndex: 1, correctLetter: 'U', emoji: '☀️', options: ['U', 'E', 'I'], hint: 'S + U + N makes SUN!' },
  { id: 'ml3', fullWord: 'DOG', displayWord: 'D _ G', missingIndex: 1, correctLetter: 'O', emoji: '🐶', options: ['O', 'A', 'U'], hint: 'D + O + G makes DOG!' },
  { id: 'ml4', fullWord: 'PEN', displayWord: 'P _ N', missingIndex: 1, correctLetter: 'E', emoji: '🖊️', options: ['E', 'O', 'A'], hint: 'P + E + N makes PEN!' },
  { id: 'ml5', fullWord: 'FOX', displayWord: 'F _ X', missingIndex: 1, correctLetter: 'O', emoji: '🦊', options: ['O', 'I', 'E'], hint: 'F + O + X makes FOX!' },
  { id: 'ml6', fullWord: 'PIG', displayWord: 'P _ G', missingIndex: 1, correctLetter: 'I', emoji: '🐷', options: ['I', 'A', 'O'], hint: 'P + I + G makes PIG!' },
  { id: 'ml7', fullWord: 'BUS', displayWord: 'B _ S', missingIndex: 1, correctLetter: 'U', emoji: '🚌', options: ['U', 'E', 'A'], hint: 'B + U + S makes BUS!' },
  { id: 'ml8', fullWord: 'BED', displayWord: 'B _ D', missingIndex: 1, correctLetter: 'E', emoji: '🛏️', options: ['E', 'U', 'I'], hint: 'B + E + D makes BED!' },
  { id: 'ml9', fullWord: 'CUP', displayWord: 'C _ P', missingIndex: 1, correctLetter: 'U', emoji: '☕', options: ['U', 'A', 'O'], hint: 'C + U + P makes CUP!' },
  { id: 'ml10', fullWord: 'BAT', displayWord: '_ A T', missingIndex: 0, correctLetter: 'B', emoji: '🦇', options: ['B', 'P', 'T'], hint: 'Starts with the letter B!' },
  { id: 'ml11', fullWord: 'CAR', displayWord: 'C _ R', missingIndex: 1, correctLetter: 'A', emoji: '🚗', options: ['A', 'E', 'U'], hint: 'C + A + R makes CAR!' },
  { id: 'ml12', fullWord: 'BUG', displayWord: 'B U _', missingIndex: 2, correctLetter: 'G', emoji: '🐛', options: ['G', 'T', 'D'], hint: 'Ends with the letter G!' },
];

export const WORD_BUILDER_DATA: WordBuilderItem[] = [
  { id: 'wb1', word: 'CAT', emoji: '🐱', hint: 'Spell the animal that loves fish!', scrambledLetters: ['T', 'C', 'A'] },
  { id: 'wb2', word: 'DOG', emoji: '🐶', hint: 'Spell the puppy that barks!', scrambledLetters: ['G', 'D', 'O'] },
  { id: 'wb3', word: 'SUN', emoji: '☀️', hint: 'Spell the bright warm sunshine!', scrambledLetters: ['N', 'S', 'U'] },
  { id: 'wb4', word: 'FOX', emoji: '🦊', hint: 'Spell the clever orange fox!', scrambledLetters: ['X', 'F', 'O'] },
  { id: 'wb5', word: 'CUP', emoji: '☕', hint: 'Spell what you drink milk from!', scrambledLetters: ['P', 'C', 'U'] },
  { id: 'wb6', word: 'BED', emoji: '🛏️', hint: 'Spell the place for sleeping!', scrambledLetters: ['D', 'B', 'E'] },
  { id: 'wb7', word: 'PIG', emoji: '🐷', hint: 'Spell the cute pink piglet!', scrambledLetters: ['G', 'P', 'I'] },
  { id: 'wb8', word: 'BUS', emoji: '🚌', hint: 'Spell the big school bus!', scrambledLetters: ['S', 'B', 'U'] },
];

export const SENTENCE_STORIES: ReadingSentenceStory[] = [
  {
    id: 's1',
    sentence: 'Ravi has a red ball.',
    highlightWord: 'ball',
    emoji: '🔴⚽',
    question: 'What does Ravi have?',
    options: [
      { text: 'A Ball', emoji: '⚽' },
      { text: 'An Apple', emoji: '🍎' },
      { text: 'A Car', emoji: '🚗' },
    ],
    correctIndex: 0,
    hint: 'Read carefully: "Ravi has a red ball."',
  },
  {
    id: 's2',
    sentence: 'The fat cat sits on a soft mat.',
    highlightWord: 'cat',
    emoji: '🐱',
    question: 'Who sits on the mat?',
    options: [
      { text: 'The Dog', emoji: '🐶' },
      { text: 'The Cat', emoji: '🐱' },
      { text: 'The Duck', emoji: '🦆' },
    ],
    correctIndex: 1,
    hint: 'Look for the animal that purrs: "The fat cat..."',
  },
  {
    id: 's3',
    sentence: 'A little green frog can jump high!',
    highlightWord: 'jump',
    emoji: '🐸',
    question: 'What can the frog do?',
    options: [
      { text: 'Fly in the sky', emoji: '🦅' },
      { text: 'Jump high', emoji: '🦘' },
      { text: 'Drive a bus', emoji: '🚌' },
    ],
    correctIndex: 1,
    hint: 'The frog has springy legs: "can jump high!"',
  },
  {
    id: 's4',
    sentence: 'Maya sees a bright yellow sun in the sky.',
    highlightWord: 'yellow',
    emoji: '☀️',
    question: 'What color is the sun in the sky?',
    options: [
      { text: 'Yellow', emoji: '💛' },
      { text: 'Blue', emoji: '💙' },
      { text: 'Pink', emoji: '💖' },
    ],
    correctIndex: 0,
    hint: 'Read: "a bright yellow sun..."',
  },
  {
    id: 's5',
    sentence: 'The happy dog wags its tail.',
    highlightWord: 'dog',
    emoji: '🐶',
    question: 'Who is wagging its tail?',
    options: [
      { text: 'The Lion', emoji: '🦁' },
      { text: 'The Dog', emoji: '🐶' },
      { text: 'The Bird', emoji: '🐦' },
    ],
    correctIndex: 1,
    hint: 'Our puppy friend: "The happy dog..."',
  },
  {
    id: 's6',
    sentence: 'Leo drinks sweet cold milk from a blue cup.',
    highlightWord: 'milk',
    emoji: '🥛',
    question: 'What is Leo drinking?',
    options: [
      { text: 'Cold Milk', emoji: '🥛' },
      { text: 'Fruit Juice', emoji: '🧃' },
      { text: 'Soup', emoji: '🍲' },
    ],
    correctIndex: 0,
    hint: 'Read: "drinks sweet cold milk..."',
  },
  {
    id: 's7',
    sentence: 'The red bus stops at the big school.',
    highlightWord: 'school',
    emoji: '🚌🏫',
    question: 'Where does the bus stop?',
    options: [
      { text: 'At the Zoo', emoji: '🦁' },
      { text: 'At the School', emoji: '🏫' },
      { text: 'At the Beach', emoji: '🏖️' },
    ],
    correctIndex: 1,
    hint: 'Read: "stops at the big school."',
  },
  {
    id: 's8',
    sentence: 'Sam eats a crunchy red apple.',
    highlightWord: 'apple',
    emoji: '🍎',
    question: 'What fruit does Sam eat?',
    options: [
      { text: 'Banana', emoji: '🍌' },
      { text: 'Red Apple', emoji: '🍎' },
      { text: 'Grapes', emoji: '🍇' },
    ],
    correctIndex: 1,
    hint: 'Look for the red fruit: "a crunchy red apple."',
  },
];

export const LISTENING_WORDS: ListeningWordItem[] = [
  { id: 'lw1', word: 'SUN', emoji: '☀️', spokenAudio: 'Sun', options: ['SUN', 'RUN', 'FUN'], correctWord: 'SUN' },
  { id: 'lw2', word: 'CAT', emoji: '🐱', spokenAudio: 'Cat', options: ['CAT', 'BAT', 'HAT'], correctWord: 'CAT' },
  { id: 'lw3', word: 'DOG', emoji: '🐶', spokenAudio: 'Dog', options: ['LOG', 'DOG', 'FOG'], correctWord: 'DOG' },
  { id: 'lw4', word: 'PEN', emoji: '🖊️', spokenAudio: 'Pen', options: ['TEN', 'HEN', 'PEN'], correctWord: 'PEN' },
  { id: 'lw5', word: 'BUS', emoji: '🚌', spokenAudio: 'Bus', options: ['BUS', 'BUG', 'BUN'], correctWord: 'BUS' },
  { id: 'lw6', word: 'BED', emoji: '🛏️', spokenAudio: 'Bed', options: ['BED', 'RED', 'FED'], correctWord: 'BED' },
  { id: 'lw7', word: 'PIG', emoji: '🐷', spokenAudio: 'Pig', options: ['PIG', 'BIG', 'DIG'], correctWord: 'PIG' },
  { id: 'lw8', word: 'FOX', emoji: '🦊', spokenAudio: 'Fox', options: ['BOX', 'FOX', 'SIX'], correctWord: 'FOX' },
];

// ==========================================
// 2. 🔢 NUMBER KINGDOM DATA (Numbers 1–100)
// ==========================================

export const BEFORE_AFTER_QUESTIONS: BeforeAfterItem[] = [
  { id: 'ba1', type: 'after', targetNumber: 39, promptText: 'What number comes AFTER 39?', options: [38, 39, 40], correctAnswer: 40 },
  { id: 'ba2', type: 'after', targetNumber: 19, promptText: 'What number comes AFTER 19?', options: [18, 20, 21], correctAnswer: 20 },
  { id: 'ba3', type: 'before', targetNumber: 50, promptText: 'What number comes BEFORE 50?', options: [48, 49, 51], correctAnswer: 49 },
  { id: 'ba4', type: 'after', targetNumber: 74, promptText: 'What number comes AFTER 74?', options: [73, 75, 76], correctAnswer: 75 },
  { id: 'ba5', type: 'before', targetNumber: 30, promptText: 'What number comes BEFORE 30?', options: [28, 29, 31], correctAnswer: 29 },
  { id: 'ba6', type: 'between', targetNumber: 68, secondNumber: 70, promptText: 'What number comes BETWEEN 68 and 70?', options: [67, 69, 71], correctAnswer: 69 },
  { id: 'ba7', type: 'after', targetNumber: 99, promptText: 'What number comes AFTER 99?', options: [98, 100, 101], correctAnswer: 100 },
  { id: 'ba8', type: 'before', targetNumber: 85, promptText: 'What number comes BEFORE 85?', options: [83, 84, 86], correctAnswer: 84 },
  { id: 'ba9', type: 'between', targetNumber: 44, secondNumber: 46, promptText: 'What number comes BETWEEN 44 and 46?', options: [43, 45, 47], correctAnswer: 45 },
  { id: 'ba10', type: 'after', targetNumber: 59, promptText: 'What number comes AFTER 59?', options: [58, 60, 61], correctAnswer: 60 },
  { id: 'ba11', type: 'before', targetNumber: 15, promptText: 'What number comes BEFORE 15?', options: [14, 16, 17], correctAnswer: 14 },
  { id: 'ba12', type: 'between', targetNumber: 91, secondNumber: 93, promptText: 'What number comes BETWEEN 91 and 93?', options: [90, 92, 94], correctAnswer: 92 },
];

export const MISSING_HUNDRED_QUESTIONS: MissingHundredItem[] = [
  { id: 'mh1', sequence: [21, 22, null, 24], missingIndex: 2, correctAnswer: 23, options: [20, 23, 25], hint: 'Count: 21, 22, 23, 24!' },
  { id: 'mh2', sequence: [42, 43, null, 45], missingIndex: 2, correctAnswer: 44, options: [40, 44, 46], hint: 'Count: 42, 43, 44, 45!' },
  { id: 'mh3', sequence: [88, 89, 90, null], missingIndex: 3, correctAnswer: 91, options: [91, 92, 95], hint: 'What comes right after 90?' },
  { id: 'mh4', sequence: [10, 20, 30, null], missingIndex: 3, correctAnswer: 40, options: [35, 40, 50], hint: 'Skip counting by 10s: 10, 20, 30, 40!' },
  { id: 'mh5', sequence: [null, 66, 67, 68], missingIndex: 0, correctAnswer: 65, options: [63, 64, 65], hint: 'What number comes before 66?' },
  { id: 'mh6', sequence: [75, 76, null, 78], missingIndex: 2, correctAnswer: 77, options: [77, 79, 80], hint: '75, 76, 77, 78!' },
  { id: 'mh7', sequence: [50, 60, null, 80], missingIndex: 2, correctAnswer: 70, options: [65, 70, 75], hint: 'Counting in tens: 50, 60, 70, 80!' },
  { id: 'mh8', sequence: [96, 97, 98, null], missingIndex: 3, correctAnswer: 99, options: [95, 99, 100], hint: '96, 97, 98, 99!' },
];

export const GREATER_LESS_QUESTIONS: GreaterLessItem[] = [
  { id: 'gl1', num1: 7, num2: 4, emoji: '🍎', prompt: 'Which number is GREATER (bigger)?', relation: '>', hint: '7 apples is more than 4 apples!' },
  { id: 'gl2', num1: 15, num2: 28, emoji: '⭐', prompt: 'Which number is GREATER?', relation: '<', hint: '28 is bigger than 15!' },
  { id: 'gl3', num1: 45, num2: 32, emoji: '💎', prompt: 'Which number is GREATER?', relation: '>', hint: '45 has 4 tens, 32 only has 3 tens!' },
  { id: 'gl4', num1: 18, num2: 18, emoji: '🎈', prompt: 'Are these numbers EQUAL or DIFFERENT?', relation: '=', hint: 'Both sides have 18! They are equal (=)!' },
  { id: 'gl5', num1: 60, num2: 85, emoji: '🍪', prompt: 'Which number is SMALLER (less)?', relation: '<', hint: '60 is smaller than 85!' },
  { id: 'gl6', num1: 90, num2: 70, emoji: '🚗', prompt: 'Which number is GREATER?', relation: '>', hint: '90 is 9 tens, 70 is 7 tens!' },
  { id: 'gl7', num1: 52, num2: 25, emoji: '🦋', prompt: 'Which number is GREATER?', relation: '>', hint: '52 is greater than 25!' },
  { id: 'gl8', num1: 33, num2: 33, emoji: '🍭', prompt: 'Compare 33 and 33:', relation: '=', hint: 'They are exactly the same (=)!' },
];

export const TRAIN_ORDER_QUESTIONS: TrainOrderItem[] = [
  { id: 'to1', numbers: [34, 12, 67, 23], sortedOrder: [12, 23, 34, 67], hint: 'Start with 12, then 23, 34, and 67!' },
  { id: 'to2', numbers: [85, 42, 19, 60], sortedOrder: [19, 42, 60, 85], hint: 'Start with 19, then 42, 60, and 85!' },
  { id: 'to3', numbers: [71, 15, 93, 48], sortedOrder: [15, 48, 71, 93], hint: 'Order from smallest to largest!' },
  { id: 'to4', numbers: [50, 20, 80, 30], sortedOrder: [20, 30, 50, 80], hint: '20, 30, 50, then 80!' },
  { id: 'to5', numbers: [9, 99, 45, 27], sortedOrder: [9, 27, 45, 99], hint: 'Single digit 9 is the smallest!' },
];

// ==========================================
// 3. ➕ MATH MOUNTAIN DATA (Addition & Subtraction)
// ==========================================

export const VISUAL_MATH_PROBLEMS: VisualMathProblem[] = [
  // Visual Additions
  { id: 'vm1', type: 'addition', num1: 2, num2: 1, operator: '+', emoji: '🍎', answer: 3, options: [2, 3, 4], hint: '2 apples plus 1 apple equals 3 apples!' },
  { id: 'vm2', type: 'addition', num1: 3, num2: 2, operator: '+', emoji: '🌟', answer: 5, options: [4, 5, 6], hint: 'Count all the stars: 1, 2, 3, 4, 5!' },
  { id: 'vm3', type: 'addition', num1: 4, num2: 3, operator: '+', emoji: '🍓', answer: 7, options: [6, 7, 8], hint: '4 strawberries + 3 strawberries = 7!' },
  { id: 'vm4', type: 'addition', num1: 5, num2: 2, operator: '+', emoji: '🥕', answer: 7, options: [5, 7, 8], hint: '5 carrots + 2 carrots = 7 carrots!' },
  { id: 'vm5', type: 'addition', num1: 6, num2: 4, operator: '+', emoji: '🎈', answer: 10, options: [9, 10, 11], hint: '6 + 4 makes a full group of 10!' },
  { id: 'vm6', type: 'addition', num1: 1, num2: 4, operator: '+', emoji: '🌸', answer: 5, options: [3, 5, 6], hint: '1 flower + 4 flowers = 5 flowers!' },
  // Visual Subtractions (Removal)
  { id: 'vm7', type: 'subtraction', num1: 4, num2: 2, operator: '-', emoji: '🍎', answer: 2, options: [1, 2, 3], hint: 'Start with 4 apples, take away 2, you have 2 left!' },
  { id: 'vm8', type: 'subtraction', num1: 5, num2: 1, operator: '-', emoji: '🌟', answer: 4, options: [3, 4, 5], hint: '5 stars minus 1 star leaves 4 stars!' },
  { id: 'vm9', type: 'subtraction', num1: 6, num2: 3, operator: '-', emoji: '🍪', answer: 3, options: [2, 3, 4], hint: '6 cookies, eat 3 cookies, 3 cookies remain!' },
  { id: 'vm10', type: 'subtraction', num1: 7, num2: 4, operator: '-', emoji: '🎈', answer: 3, options: [2, 3, 5], hint: '7 balloons, pop 4 balloons, 3 remain!' },
  { id: 'vm11', type: 'subtraction', num1: 8, num2: 2, operator: '-', emoji: '💎', answer: 6, options: [5, 6, 7], hint: '8 gems take away 2 gems = 6 gems!' },
  { id: 'vm12', type: 'subtraction', num1: 10, num2: 5, operator: '-', emoji: '🍓', answer: 5, options: [4, 5, 6], hint: '10 strawberries take away 5 = 5!' },
];

export const TREASURE_CHEST_PROBLEMS: TreasureChestProblem[] = [
  {
    id: 'tc1',
    problemText: '3 + 4 = ?',
    emoji: '💎',
    answer: 7,
    chests: [
      { label: 'Chest 6', value: 6 },
      { label: 'Chest 7', value: 7, isGold: true },
      { label: 'Chest 8', value: 8 },
    ],
    hint: '3 + 4 is 7! Pick Chest 7 to find golden gems!',
  },
  {
    id: 'tc2',
    problemText: '5 + 3 = ?',
    emoji: '👑',
    answer: 8,
    chests: [
      { label: 'Chest 7', value: 7 },
      { label: 'Chest 8', value: 8, isGold: true },
      { label: 'Chest 9', value: 9 },
    ],
    hint: '5 + 3 = 8! Open Chest 8!',
  },
  {
    id: 'tc3',
    problemText: '9 - 4 = ?',
    emoji: '⭐',
    answer: 5,
    chests: [
      { label: 'Chest 4', value: 4 },
      { label: 'Chest 5', value: 5, isGold: true },
      { label: 'Chest 6', value: 6 },
    ],
    hint: '9 take away 4 leaves 5!',
  },
  {
    id: 'tc4',
    problemText: '7 - 2 = ?',
    emoji: '🪙',
    answer: 5,
    chests: [
      { label: 'Chest 5', value: 5, isGold: true },
      { label: 'Chest 6', value: 6 },
      { label: 'Chest 7', value: 7 },
    ],
    hint: '7 take away 2 = 5!',
  },
  {
    id: 'tc5',
    problemText: '6 + 2 = ?',
    emoji: '💍',
    answer: 8,
    chests: [
      { label: 'Chest 8', value: 8, isGold: true },
      { label: 'Chest 7', value: 7 },
      { label: 'Chest 9', value: 9 },
    ],
    hint: '6 + 2 is 8!',
  },
];

export const MONSTER_FEED_PROBLEMS: MonsterFeedProblem[] = [
  {
    id: 'mf1',
    monsterName: 'Nom-Nom',
    monsterAvatar: '👾',
    num1: 3,
    num2: 2,
    totalNeeded: 5,
    foodEmoji: '🍪',
    foodName: 'Cookies',
    prompt: 'Nom-Nom is hungry! Feed him 3 + 2 = 5 cookies!',
  },
  {
    id: 'mf2',
    monsterName: 'Giggles',
    monsterAvatar: '🦄',
    num1: 4,
    num2: 2,
    totalNeeded: 6,
    foodEmoji: '🥕',
    foodName: 'Carrots',
    prompt: 'Giggles wants 4 + 2 = 6 crunchy carrots!',
  },
  {
    id: 'mf3',
    monsterName: 'Sparky',
    monsterAvatar: '🐲',
    num1: 2,
    num2: 2,
    totalNeeded: 4,
    foodEmoji: '🍓',
    foodName: 'Strawberries',
    prompt: 'Sparky the dragon loves strawberries! Feed 2 + 2 = 4 berries!',
  },
  {
    id: 'mf4',
    monsterName: 'Barnaby',
    monsterAvatar: '🐻',
    num1: 5,
    num2: 2,
    totalNeeded: 7,
    foodEmoji: '🍯',
    foodName: 'Honey Pots',
    prompt: 'Barnaby bear wants 5 + 2 = 7 honey pots!',
  },
];

export const BRIDGE_STEP_PROBLEMS: BridgeStepProblem[] = [
  { id: 'bp1', stepNumber: 1, num1: 2, num2: 2, operator: '+', answer: 4, options: [3, 4, 5], hint: '2 + 2 = 4' },
  { id: 'bp2', stepNumber: 2, num1: 5, num2: 1, operator: '-', answer: 4, options: [4, 5, 6], hint: '5 - 1 = 4' },
  { id: 'bp3', stepNumber: 3, num1: 3, num2: 3, operator: '+', answer: 6, options: [5, 6, 7], hint: '3 + 3 = 6' },
  { id: 'bp4', stepNumber: 4, num1: 8, num2: 3, operator: '-', answer: 5, options: [4, 5, 6], hint: '8 - 3 = 5' },
  { id: 'bp5', stepNumber: 5, num1: 4, num2: 4, operator: '+', answer: 8, options: [7, 8, 9], hint: '4 + 4 = 8' },
];

// ==========================================
// 4. 🧠 PUZZLE PLANET DATA (Logic & Problem Solving)
// ==========================================

export const ODD_ONE_OUT_DATA: OddOneOutItem[] = [
  {
    id: 'ooo1',
    items: [
      { label: 'Apple', emoji: '🍎', category: 'fruit' },
      { label: 'Banana', emoji: '🍌', category: 'fruit' },
      { label: 'Orange', emoji: '🍊', category: 'fruit' },
      { label: 'Truck', emoji: '🚚', category: 'vehicle' },
    ],
    correctIndex: 3,
    explanation: 'Truck is a vehicle that drives, but the others are sweet fruits to eat!',
    hint: 'Find the one you cannot eat!',
  },
  {
    id: 'ooo2',
    items: [
      { label: 'Dog', emoji: '🐶', category: 'animal' },
      { label: 'Cat', emoji: '🐱', category: 'animal' },
      { label: 'Airplane', emoji: '✈️', category: 'vehicle' },
      { label: 'Lion', emoji: '🦁', category: 'animal' },
    ],
    correctIndex: 2,
    explanation: 'Airplane is a machine that flies in the clouds, while others are living animals!',
    hint: 'One of these is a machine with wings!',
  },
  {
    id: 'ooo3',
    items: [
      { label: 'Circle', emoji: '🔴', category: 'shape' },
      { label: 'Square', emoji: '🟦', category: 'shape' },
      { label: 'Triangle', emoji: '🔺', category: 'shape' },
      { label: 'Ice Cream', emoji: '🍦', category: 'food' },
    ],
    correctIndex: 3,
    explanation: 'Ice cream is a cold treat, while the others are geometric shapes!',
    hint: 'One of these is yummy to eat on a hot day!',
  },
  {
    id: 'ooo4',
    items: [
      { label: 'Fish', emoji: '🐟', category: 'water' },
      { label: 'Whale', emoji: '🐳', category: 'water' },
      { label: 'Octopus', emoji: '🐙', category: 'water' },
      { label: 'Lion', emoji: '🦁', category: 'land' },
    ],
    correctIndex: 3,
    explanation: 'Lion lives on the grassy savannah, while the others swim in water!',
    hint: 'Which animal does NOT swim in the ocean?',
  },
  {
    id: 'ooo5',
    items: [
      { label: 'Shirt', emoji: '👕', category: 'clothes' },
      { label: 'Pants', emoji: '👖', category: 'clothes' },
      { label: 'Dress', emoji: '👗', category: 'clothes' },
      { label: 'Soccer Ball', emoji: '⚽', category: 'toy' },
    ],
    correctIndex: 3,
    explanation: 'Soccer ball is a sports toy, but others are clothes we wear!',
    hint: 'Find the object you play with instead of wear!',
  },
];

export const MEMORY_CARDS_DATA: MemoryPairItem[] = [
  { id: 'mc1', name: 'Cat', emoji: '🐱', color: 'from-amber-400 to-orange-400' },
  { id: 'mc2', name: 'Puppy', emoji: '🐶', color: 'from-blue-400 to-indigo-400' },
  { id: 'mc3', name: 'Frog', emoji: '🐸', color: 'from-emerald-400 to-teal-400' },
  { id: 'mc4', name: 'Lion', emoji: '🦁', color: 'from-yellow-400 to-amber-500' },
  { id: 'mc5', name: 'Star', emoji: '⭐', color: 'from-yellow-300 to-orange-400' },
  { id: 'mc6', name: 'Unicorn', emoji: '🦄', color: 'from-pink-400 to-purple-400' },
];

export const SEQUENCE_PATTERNS: SequencePatternItem[] = [
  {
    id: 'sp1',
    patternType: 'AB',
    sequence: [
      { label: 'Red', emoji: '🔴' },
      { label: 'Blue', emoji: '🔵' },
      { label: 'Red', emoji: '🔴' },
      { label: 'Blue', emoji: '🔵' },
    ],
    options: [
      { label: 'Red', emoji: '🔴' },
      { label: 'Blue', emoji: '🔵' },
      { label: 'Green', emoji: '🟢' },
    ],
    correctIndex: 0,
    hint: 'Red, Blue, Red, Blue... next is RED 🔴!',
  },
  {
    id: 'sp2',
    patternType: 'ABB',
    sequence: [
      { label: 'Apple', emoji: '🍎' },
      { label: 'Banana', emoji: '🍌' },
      { label: 'Banana', emoji: '🍌' },
      { label: 'Apple', emoji: '🍎' },
      { label: 'Banana', emoji: '🍌' },
    ],
    options: [
      { label: 'Apple', emoji: '🍎' },
      { label: 'Banana', emoji: '🍌' },
      { label: 'Orange', emoji: '🍊' },
    ],
    correctIndex: 1,
    hint: 'Apple, Banana, Banana, Apple, Banana... next is BANANA 🍌!',
  },
  {
    id: 'sp3',
    patternType: 'AAB',
    sequence: [
      { label: 'Star', emoji: '⭐' },
      { label: 'Star', emoji: '⭐' },
      { label: 'Moon', emoji: '🌙' },
      { label: 'Star', emoji: '⭐' },
      { label: 'Star', emoji: '⭐' },
    ],
    options: [
      { label: 'Moon', emoji: '🌙' },
      { label: 'Sun', emoji: '☀️' },
      { label: 'Star', emoji: '⭐' },
    ],
    correctIndex: 0,
    hint: 'Two stars, one moon! Next is MOON 🌙!',
  },
  {
    id: 'sp4',
    patternType: 'ABC',
    sequence: [
      { label: 'Triangle', emoji: '🔺' },
      { label: 'Circle', emoji: '🟡' },
      { label: 'Square', emoji: '🟦' },
      { label: 'Triangle', emoji: '🔺' },
      { label: 'Circle', emoji: '🟡' },
    ],
    options: [
      { label: 'Square', emoji: '🟦' },
      { label: 'Circle', emoji: '🟡' },
      { label: 'Triangle', emoji: '🔺' },
    ],
    correctIndex: 0,
    hint: 'Triangle, Circle, Square... next is SQUARE 🟦!',
  },
  {
    id: 'sp5',
    patternType: 'COUNT',
    sequence: [
      { label: '2' },
      { label: '4' },
      { label: '6' },
      { label: '8' },
    ],
    options: [
      { label: '9' },
      { label: '10' },
      { label: '12' },
    ],
    correctIndex: 1,
    hint: 'Counting by 2s: 2, 4, 6, 8, 10!',
  },
];

export const SORTING_BINS_DATA: SortingBinItem[] = [
  {
    id: 'sb1',
    bin1: { name: 'Sweet Fruits', icon: '🍓', color: 'border-rose-400 bg-rose-50 text-rose-800', acceptCategory: 'fruit' },
    bin2: { name: 'Speedy Vehicles', icon: '🚗', color: 'border-blue-400 bg-blue-50 text-blue-800', acceptCategory: 'vehicle' },
    items: [
      { id: 'i1', name: 'Apple', emoji: '🍎', category: 'fruit' },
      { id: 'i2', name: 'Car', emoji: '🚗', category: 'vehicle' },
      { id: 'i3', name: 'Banana', emoji: '🍌', category: 'fruit' },
      { id: 'i4', name: 'Airplane', emoji: '✈️', category: 'vehicle' },
      { id: 'i5', name: 'Grapes', emoji: '🍇', category: 'fruit' },
      { id: 'i6', name: 'Bus', emoji: '🚌', category: 'vehicle' },
    ],
  },
  {
    id: 'sb2',
    bin1: { name: 'Land Animals', icon: '🦁', color: 'border-amber-400 bg-amber-50 text-amber-800', acceptCategory: 'land' },
    bin2: { name: 'Ocean Creatures', icon: '🐬', color: 'border-cyan-400 bg-cyan-50 text-cyan-800', acceptCategory: 'ocean' },
    items: [
      { id: 'i7', name: 'Elephant', emoji: '🐘', category: 'land' },
      { id: 'i8', name: 'Dolphin', emoji: '🐬', category: 'ocean' },
      { id: 'i9', name: 'Puppy', emoji: '🐶', category: 'land' },
      { id: 'i10', name: 'Whale', emoji: '🐳', category: 'ocean' },
      { id: 'i11', name: 'Tiger', emoji: '🐯', category: 'land' },
      { id: 'i12', name: 'Octopus', emoji: '🐙', category: 'ocean' },
    ],
  },
];

export const SHADOW_MATCH_DATA: ShadowMatchItem[] = [
  {
    id: 'sm1',
    name: 'Butterfly',
    emoji: '🦋',
    silhouette: '🦋',
    options: [
      { name: 'Butterfly', emoji: '🦋' },
      { name: 'Frog', emoji: '🐸' },
      { name: 'Cat', emoji: '🐱' },
    ],
    correctIndex: 0,
  },
  {
    id: 'sm2',
    name: 'Elephant',
    emoji: '🐘',
    silhouette: '🐘',
    options: [
      { name: 'Lion', emoji: '🦁' },
      { name: 'Elephant', emoji: '🐘' },
      { name: 'Bird', emoji: '🐦' },
    ],
    correctIndex: 1,
  },
  {
    id: 'sm3',
    name: 'Rocket',
    emoji: '🚀',
    silhouette: '🚀',
    options: [
      { name: 'Car', emoji: '🚗' },
      { name: 'Sailboat', emoji: '⛵' },
      { name: 'Rocket', emoji: '🚀' },
    ],
    correctIndex: 2,
  },
];

// ==========================================
// 5. 👑 UKG CHARACTERS & COMPANIONS
// ==========================================

export const UKG_CHARACTERS: CharacterCompanion[] = [
  {
    id: 'ollie_owl',
    name: 'Professor Ollie',
    title: 'The Wise Reading Owl',
    avatar: '🦉',
    greeting: 'Hoot hoot! Welcome, brilliant learner! Let us read and discover magic!',
    color: 'from-amber-400 to-amber-600',
    unlocked: true,
    requiredStars: 0,
    grade: 'ukg',
  },
  {
    id: 'pip_bunny',
    name: 'Pip the Bunny',
    title: 'The Joyful Counter',
    avatar: '🐰',
    greeting: 'Hop hop! I love numbers and crunchy carrots! Let us count to 100!',
    color: 'from-pink-400 to-rose-500',
    unlocked: true,
    requiredStars: 0,
    grade: 'ukg',
  },
  {
    id: 'cosmo_unicorn',
    name: 'Cosmo the Unicorn',
    title: 'Starry Math Magician',
    avatar: '🦄',
    greeting: 'Sparkle on! Together we will climb Math Mountain and solve sweet puzzles!',
    color: 'from-purple-400 to-indigo-500',
    unlocked: false,
    requiredStars: 50,
    grade: 'ukg',
  },
  {
    id: 'sparky_dragon',
    name: 'Sparky the Dragon',
    title: 'Puzzle Planet Champion',
    avatar: '🐲',
    greeting: 'Roar! I am super friendly and love solving tricky brain teasers!',
    color: 'from-emerald-400 to-teal-600',
    unlocked: false,
    requiredStars: 100,
    grade: 'ukg',
  },
];

// ==========================================
// 6. 🏅 UKG BADGES & REWARDS
// ==========================================

export const UKG_BADGES: Badge[] = [
  {
    id: 'reading_ranger',
    name: 'Reading Forest Ranger',
    category: 'reading',
    icon: '📖',
    description: 'Mastered CVC words, missing letters & sentence reading in the forest!',
    color: 'from-emerald-400 to-teal-600',
    unlocked: false,
    requiredStars: 30,
    grade: 'ukg',
  },
  {
    id: 'number_monarch',
    name: 'Number Kingdom Monarch',
    category: 'number_kingdom',
    icon: '👑',
    description: 'Explored numbers all the way to 100, master of Before & After!',
    color: 'from-amber-400 to-orange-500',
    unlocked: false,
    requiredStars: 40,
    grade: 'ukg',
  },
  {
    id: 'croc_champion',
    name: 'Alligator Math Ace',
    category: 'number_kingdom',
    icon: '🐊',
    description: 'Master of Greater Than, Less Than and Equal comparisons!',
    color: 'from-lime-400 to-emerald-500',
    unlocked: false,
    requiredStars: 50,
    grade: 'ukg',
  },
  {
    id: 'mountain_climber',
    name: 'Math Mountain Climber',
    category: 'math_mountain',
    icon: '🏔️',
    description: 'Conquered addition and subtraction at the highest summit!',
    color: 'from-sky-400 to-blue-600',
    unlocked: false,
    requiredStars: 60,
    grade: 'ukg',
  },
  {
    id: 'treasure_hunter',
    name: 'Gold Chest Opener',
    category: 'math_mountain',
    icon: '💎',
    description: 'Unlocked sparkling treasure chests by solving math secrets!',
    color: 'from-yellow-400 to-amber-600',
    unlocked: false,
    requiredStars: 70,
    grade: 'ukg',
  },
  {
    id: 'bridge_builder',
    name: 'River Bridge Master',
    category: 'math_mountain',
    icon: '🌉',
    description: 'Helped our animal friends cross the river stepping stones safely!',
    color: 'from-indigo-400 to-purple-600',
    unlocked: false,
    requiredStars: 80,
    grade: 'ukg',
  },
  {
    id: 'puzzle_genius',
    name: 'Puzzle Planet Genius',
    category: 'puzzle_planet',
    icon: '🧠',
    description: 'Solved odd-one-out puzzles, memory pairs and sequence patterns!',
    color: 'from-pink-400 to-rose-600',
    unlocked: false,
    requiredStars: 90,
    grade: 'ukg',
  },
  {
    id: 'grand_ukg_champion',
    name: 'Grand UKG Legend',
    category: 'special',
    icon: '🏆',
    description: 'Mastered all 4 worlds in Magic Learning Land UKG Adventure!',
    color: 'from-yellow-300 via-amber-400 to-yellow-600',
    unlocked: false,
    requiredStars: 120,
    grade: 'ukg',
  },
];

// ==========================================
// 7. 👨‍👩‍👧 PARENT PROGRESS RECOMMENDATIONS & DEFAULTS
// ==========================================

export const INITIAL_PARENT_PROGRESS: ParentProgressData = {
  timeSpentSeconds: 180,
  gamesCompleted: {
    reading: 0,
    number_kingdom: 0,
    math_mountain: 0,
    puzzle_planet: 0,
  },
  accuracy: {
    reading: 100,
    number_kingdom: 100,
    math_mountain: 100,
    puzzle_planet: 100,
  },
  totalAttempts: 0,
  correctAttempts: 0,
  starsEarned: 0,
  coinsEarned: 0,
  strengths: ['Early CVC Word Recognition', 'Visual Counting & Shapes', 'Pattern Recognition'],
  needsPractice: [],
  lastSessionDate: new Date().toLocaleDateString(),
};

export const PARENT_HOME_ACTIVITIES = [
  {
    title: '🔤 Rhyming Word Treasure Hunt',
    topic: 'Reading & Phonics',
    description: 'Point to everyday items at home (Hat, Cat, Mat, Cup, Pen) and ask your child to say words that rhyme with them!',
  },
  {
    title: '🔢 Snack-Time Counting to 100',
    topic: 'Numbers & Bundling',
    description: 'Count grapes, raisins, or pasta shells in groups of 10 to help your child visualize 10s and units naturally.',
  },
  {
    title: '➕ Story Problem Fun',
    topic: 'Addition & Subtraction',
    description: 'Say: "You have 3 apple slices, and Mom gives you 2 more. How many slices in all?" Let them physically combine the slices.',
  },
  {
    title: '🧠 Household Sorter Game',
    topic: 'Logic & Classification',
    description: 'Have your child sort laundry into colored vs white clothes, or toys into soft stuffed animals vs wheeled vehicles.',
  },
];

export const UKG_COMPANIONS: CharacterCompanion[] = [
  {
    id: 'ollie_owl',
    name: 'Professor Ollie',
    role: 'Wise Guide',
    avatar: '🦉',
    greeting: 'Hoo-hoo! Let us read words and solve math puzzles together!',
    color: 'from-amber-400 to-orange-500',
    unlocked: true,
    unlockedAtStars: 0,
    grade: 'ukg',
  },
  {
    id: 'pip_bunny',
    name: 'Pip the Bunny',
    role: 'Energetic Hopper',
    avatar: '🐰',
    greeting: 'Hop hop! I love counting to 100 and eating crunchy carrots!',
    color: 'from-pink-400 to-rose-500',
    unlocked: true,
    unlockedAtStars: 0,
    grade: 'ukg',
  },
  {
    id: 'cosmo_unicorn',
    name: 'Cosmo Unicorn',
    role: 'Magic Wonder',
    avatar: '🦄',
    greeting: 'Neigh! Sparkle power is ready to unlock secret treasure chests!',
    color: 'from-purple-400 to-indigo-500',
    unlocked: false,
    unlockedAtStars: 40,
    grade: 'ukg',
  },
  {
    id: 'sparky_dragon',
    name: 'Sparky Dragon',
    role: 'Peak Climber',
    avatar: '🐲',
    greeting: 'Roar-some! Ready to conquer the tallest peaks of Math Mountain!',
    color: 'from-emerald-400 to-teal-600',
    unlocked: false,
    unlockedAtStars: 80,
    grade: 'ukg',
  },
];

export const UNLOCKABLE_REWARD_LOCATIONS = [
  {
    id: 'rainbow_castle',
    name: '🌈 Rainbow Cloud Castle',
    icon: '🏰',
    description: 'A magical sky palace filled with golden bells and rainbow fountains!',
    requiredStars: 30,
  },
  {
    id: 'crystal_peak',
    name: '🔮 Crystal Mountain Peak',
    icon: '🏔️',
    description: 'Glowing amethyst caves with friendly dragon echoes!',
    requiredStars: 60,
  },
  {
    id: 'starry_galaxy',
    name: '🌌 Starry Dream Galaxy',
    icon: '🪐',
    description: 'Float between friendly planets and catch shooting stardust!',
    requiredStars: 100,
  },
];

