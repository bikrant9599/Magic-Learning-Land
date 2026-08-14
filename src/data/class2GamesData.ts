// Class 2 Question Banks and Interactive Data (20 Mini-Games)
// Age 7–8 Curriculum: Two-digit math, multiplication/division foundations, grammar, botany, animal classification & logic.

export interface CurriculumGameItem {
  id: string;
  prompt: string;
  passage?: string;
  contextEmoji?: string;
  imageVisual?: string;
  options: {
    id: string;
    text: string;
    emoji?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  extraData?: any;
}

// 1. STORY DETECTIVE (Class 2 Game #1)
export const CLASS2_STORY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_story_1',
    passage: 'Milo the puppy found a shiny red ball under the porch. He rolled it across the soft green lawn. A friendly bluebird swooped down from the oak tree to watch. Milo wagged his tail and pushed the ball toward the bird to share the game.',
    prompt: 'Where did Milo find the shiny red ball?',
    options: [
      { id: 'a', text: 'Under the porch', isCorrect: true },
      { id: 'b', text: 'In the kitchen', isCorrect: false },
      { id: 'c', text: 'High in the oak tree', isCorrect: false },
      { id: 'd', text: 'Inside a cardboard box', isCorrect: false },
    ],
    explanation: 'The story states that Milo found the shiny red ball under the porch before rolling it on the lawn.',
  },
  {
    id: 'c2_story_2',
    passage: 'Tara planted three sunflower seeds in a terracotta pot on her sunny windowsill. Every morning before school, she watered them gently with a small blue cup. After seven days, tiny green sprouts poked through the dark soil.',
    prompt: 'How many days did it take for the tiny green sprouts to appear?',
    options: [
      { id: 'a', text: 'Seven days', isCorrect: true },
      { id: 'b', text: 'Three days', isCorrect: false },
      { id: 'c', text: 'Two weeks', isCorrect: false },
      { id: 'd', text: 'One month', isCorrect: false },
    ],
    explanation: 'The passage explicitly says: "After seven days, tiny green sprouts poked through the dark soil."',
  },
  {
    id: 'c2_story_3',
    passage: 'Leo folded a sheet of bright yellow paper into a supersonic airplane. He launched it in the backyard. A gentle gust of wind carried it gracefully over the wooden fence and landed softly into Mrs. Gable\'s flower garden.',
    prompt: 'What color was Leo\'s paper airplane?',
    options: [
      { id: 'a', text: 'Bright yellow', isCorrect: true },
      { id: 'b', text: 'Deep blue', isCorrect: false },
      { id: 'c', text: 'Emerald green', isCorrect: false },
      { id: 'd', text: 'Ruby red', isCorrect: false },
    ],
    explanation: 'Leo used a sheet of "bright yellow paper" to create his supersonic airplane.',
  },
];

// 2. WORD BUILDER PRO (Class 2 Game #2)
export const CLASS2_WORD_BUILDER_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_wb_1',
    prompt: 'Which word correctly unscrambles: D-A-R-G-E-N (Hint: A place where flowers and vegetables grow 🌱)?',
    contextEmoji: '🌻',
    options: [
      { id: 'a', text: 'GARDEN', isCorrect: true },
      { id: 'b', text: 'DANGER', isCorrect: false },
      { id: 'c', text: 'GARNER', isCorrect: false },
      { id: 'd', text: 'DRAGON', isCorrect: false },
    ],
    explanation: 'G-A-R-D-E-N is a place where flowers and plants grow.',
  },
  {
    id: 'c2_wb_2',
    prompt: 'Which word correctly unscrambles: T-E-L-P-A-N (Hint: Earth is one in our solar system 🪐)?',
    contextEmoji: '🌍',
    options: [
      { id: 'a', text: 'PLANET', isCorrect: true },
      { id: 'b', text: 'PLANTS', isCorrect: false },
      { id: 'c', text: 'PLATES', isCorrect: false },
      { id: 'd', text: 'PETALS', isCorrect: false },
    ],
    explanation: 'P-L-A-N-E-T is a celestial body orbiting a star.',
  },
  {
    id: 'c2_wb_3',
    prompt: 'Which word correctly unscrambles: E-T-L-C-A-S (Hint: A royal stone fortress 👑)?',
    contextEmoji: '🏰',
    options: [
      { id: 'a', text: 'CASTLE', isCorrect: true },
      { id: 'b', text: 'CATTLE', isCorrect: false },
      { id: 'c', text: 'LATEST', isCorrect: false },
      { id: 'd', text: 'SCALE', isCorrect: false },
    ],
    explanation: 'C-A-S-T-L-E is a grand stone fortress where kings and queens lived.',
  },
];

// 3. GRAMMAR FIXER (Class 2 Game #3)
export const CLASS2_GRAMMAR_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_gram_1',
    prompt: 'Choose the correct word: "The three playful puppies ___ across the park."',
    contextEmoji: '🐶',
    options: [
      { id: 'a', text: 'run', isCorrect: true },
      { id: 'b', text: 'runs', isCorrect: false },
      { id: 'c', text: 'running', isCorrect: false },
      { id: 'd', text: 'is run', isCorrect: false },
    ],
    explanation: 'Plural subjects ("puppies") take the base plural verb "run" (The puppies run).',
  },
  {
    id: 'c2_gram_2',
    prompt: 'Choose the correct past tense: "Yesterday, Maya ___ a colorful picture."',
    contextEmoji: '🎨',
    options: [
      { id: 'a', text: 'painted', isCorrect: true },
      { id: 'b', text: 'paint', isCorrect: false },
      { id: 'c', text: 'paints', isCorrect: false },
      { id: 'd', text: 'will paint', isCorrect: false },
    ],
    explanation: '"Yesterday" indicates past tense, so we use "painted".',
  },
  {
    id: 'c2_gram_3',
    prompt: 'What is the correct plural spelling of "box"?',
    contextEmoji: '📦',
    options: [
      { id: 'a', text: 'boxes', isCorrect: true },
      { id: 'b', text: 'boxs', isCorrect: false },
      { id: 'c', text: 'boxies', isCorrect: false },
      { id: 'd', text: 'boxen', isCorrect: false },
    ],
    explanation: 'Nouns ending in "x" add "-es" for their plural form: boxes.',
  },
];

// 4. SYNONYM HUNTER (Class 2 Game #4)
export const CLASS2_SYNONYM_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_syn_1',
    prompt: 'Find the synonym (word with similar meaning) for: "HUGE"',
    contextEmoji: '🐘',
    options: [
      { id: 'a', text: 'Gigantic', isCorrect: true },
      { id: 'b', text: 'Tiny', isCorrect: false },
      { id: 'c', text: 'Weak', isCorrect: false },
      { id: 'd', text: 'Cold', isCorrect: false },
    ],
    explanation: '"Huge" and "Gigantic" both mean very large in size.',
  },
  {
    id: 'c2_syn_2',
    prompt: 'Find the synonym for: "QUICK"',
    contextEmoji: '🐆',
    options: [
      { id: 'a', text: 'Fast', isCorrect: true },
      { id: 'b', text: 'Slow', isCorrect: false },
      { id: 'c', text: 'Heavy', isCorrect: false },
      { id: 'd', text: 'Quiet', isCorrect: false },
    ],
    explanation: '"Quick" means moving with high speed, just like "Fast".',
  },
  {
    id: 'c2_syn_3',
    prompt: 'Find the synonym for: "TIDY"',
    contextEmoji: '🧹',
    options: [
      { id: 'a', text: 'Clean', isCorrect: true },
      { id: 'b', text: 'Messy', isCorrect: false },
      { id: 'c', text: 'Loud', isCorrect: false },
      { id: 'd', text: 'Dark', isCorrect: false },
    ],
    explanation: '"Tidy" means neat and orderly, which is the same as "Clean".',
  },
];

// 5. ALPHABETICAL RACE (Class 2 Game #5)
export const CLASS2_ALPHABETICAL_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_alpha_1',
    prompt: 'Which list shows the words in correct alphabetical (A to Z) order?',
    contextEmoji: '🔤',
    options: [
      { id: 'a', text: 'Apple, Duck, Monkey, Zebra', isCorrect: true },
      { id: 'b', text: 'Zebra, Monkey, Duck, Apple', isCorrect: false },
      { id: 'c', text: 'Duck, Apple, Zebra, Monkey', isCorrect: false },
      { id: 'd', text: 'Apple, Monkey, Duck, Zebra', isCorrect: false },
    ],
    explanation: 'A (Apple) comes before D (Duck), then M (Monkey), then Z (Zebra).',
  },
  {
    id: 'c2_alpha_2',
    prompt: 'Which animals are arranged in alphabetical order?',
    contextEmoji: '🦁',
    options: [
      { id: 'a', text: 'Bear, Elephant, Giraffe, Tiger', isCorrect: true },
      { id: 'b', text: 'Elephant, Bear, Tiger, Giraffe', isCorrect: false },
      { id: 'c', text: 'Tiger, Giraffe, Elephant, Bear', isCorrect: false },
      { id: 'd', text: 'Giraffe, Bear, Elephant, Tiger', isCorrect: false },
    ],
    explanation: 'B (Bear) -> E (Elephant) -> G (Giraffe) -> T (Tiger).',
  },
];

// 6. ADDITION MASTER (Class 2 Game #6)
export const CLASS2_ADDITION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_add_1',
    prompt: 'Solve: 27 + 36 = ?',
    contextEmoji: '➕',
    options: [
      { id: 'a', text: '63', isCorrect: true },
      { id: 'b', text: '53', isCorrect: false },
      { id: 'c', text: '64', isCorrect: false },
      { id: 'd', text: '57', isCorrect: false },
    ],
    explanation: 'Add ones: 7 + 6 = 13 (3 in ones, carry 1 to tens). Add tens: 1 + 2 + 3 = 6. Result is 63.',
  },
  {
    id: 'c2_add_2',
    prompt: 'Solve: 45 + 28 = ?',
    contextEmoji: '➕',
    options: [
      { id: 'a', text: '73', isCorrect: true },
      { id: 'b', text: '63', isCorrect: false },
      { id: 'c', text: '72', isCorrect: false },
      { id: 'd', text: '83', isCorrect: false },
    ],
    explanation: '5 + 8 = 13 (carry 1). 1 + 4 + 2 = 7. Total = 73.',
  },
  {
    id: 'c2_add_3',
    prompt: 'Solve: 54 + 39 = ?',
    contextEmoji: '➕',
    options: [
      { id: 'a', text: '93', isCorrect: true },
      { id: 'b', text: '83', isCorrect: false },
      { id: 'c', text: '94', isCorrect: false },
      { id: 'd', text: '91', isCorrect: false },
    ],
    explanation: '4 + 9 = 13 (carry 1). 1 + 5 + 3 = 9. Total = 93.',
  },
];

// 7. SUBTRACTION MASTER (Class 2 Game #7)
export const CLASS2_SUBTRACTION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_sub_1',
    prompt: 'Solve: 64 - 27 = ?',
    contextEmoji: '➖',
    options: [
      { id: 'a', text: '37', isCorrect: true },
      { id: 'b', text: '47', isCorrect: false },
      { id: 'c', text: '33', isCorrect: false },
      { id: 'd', text: '41', isCorrect: false },
    ],
    explanation: 'Regroup 1 ten: 14 - 7 = 7. Tens: 5 - 2 = 3. Result is 37.',
  },
  {
    id: 'c2_sub_2',
    prompt: 'Solve: 82 - 45 = ?',
    contextEmoji: '➖',
    options: [
      { id: 'a', text: '37', isCorrect: true },
      { id: 'b', text: '47', isCorrect: false },
      { id: 'c', text: '35', isCorrect: false },
      { id: 'd', text: '43', isCorrect: false },
    ],
    explanation: 'Regroup 1 ten: 12 - 5 = 7. Tens: 7 - 4 = 3. Total = 37.',
  },
  {
    id: 'c2_sub_3',
    prompt: 'Solve: 50 - 23 = ?',
    contextEmoji: '➖',
    options: [
      { id: 'a', text: '27', isCorrect: true },
      { id: 'b', text: '37', isCorrect: false },
      { id: 'c', text: '23', isCorrect: false },
      { id: 'd', text: '33', isCorrect: false },
    ],
    explanation: 'Borrow 1 ten: 10 - 3 = 7. Tens: 4 - 2 = 2. Total = 27.',
  },
];

// 8. MULTIPLICATION GARDEN (Class 2 Game #8)
export const CLASS2_MULTIPLICATION_GARDEN_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_mult_1',
    prompt: 'There are 4 flower pots. Each pot has 3 blooming daisies. How many daisies in total?',
    contextEmoji: '🌸',
    options: [
      { id: 'a', text: '12 daisies (4 × 3 = 12)', isCorrect: true },
      { id: 'b', text: '7 daisies (4 + 3 = 7)', isCorrect: false },
      { id: 'c', text: '15 daisies', isCorrect: false },
      { id: 'd', text: '9 daisies', isCorrect: false },
    ],
    explanation: '4 groups of 3 is 3 + 3 + 3 + 3 = 12 (or 4 × 3 = 12).',
  },
  {
    id: 'c2_mult_2',
    prompt: 'There are 5 bird nests. Each nest holds 2 blue eggs. How many eggs altogether?',
    contextEmoji: '🪺',
    options: [
      { id: 'a', text: '10 eggs (5 × 2 = 10)', isCorrect: true },
      { id: 'b', text: '7 eggs', isCorrect: false },
      { id: 'c', text: '12 eggs', isCorrect: false },
      { id: 'd', text: '8 eggs', isCorrect: false },
    ],
    explanation: '5 nests with 2 eggs each: 2 + 2 + 2 + 2 + 2 = 10 (or 5 × 2 = 10).',
  },
  {
    id: 'c2_mult_3',
    prompt: 'There are 3 ladybugs. Each has 6 spots. How many spots in total?',
    contextEmoji: '🐞',
    options: [
      { id: 'a', text: '18 spots (3 × 6 = 18)', isCorrect: true },
      { id: 'b', text: '9 spots', isCorrect: false },
      { id: 'c', text: '15 spots', isCorrect: false },
      { id: 'd', text: '21 spots', isCorrect: false },
    ],
    explanation: '3 groups of 6 spots = 6 + 6 + 6 = 18 (or 3 × 6 = 18).',
  },
];

// 9. SHARING GAME (Class 2 Game #9)
export const CLASS2_SHARING_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_div_1',
    prompt: '12 cookies are shared equally among 3 children. How many cookies does each child get?',
    contextEmoji: '🍪',
    options: [
      { id: 'a', text: '4 cookies each (12 ÷ 3 = 4)', isCorrect: true },
      { id: 'b', text: '3 cookies each', isCorrect: false },
      { id: 'c', text: '6 cookies each', isCorrect: false },
      { id: 'd', text: '5 cookies each', isCorrect: false },
    ],
    explanation: '12 divided into 3 equal groups gives 4 cookies per child (3 × 4 = 12).',
  },
  {
    id: 'c2_div_2',
    prompt: '15 carrots are distributed equally into 5 bunny baskets. How many in each basket?',
    contextEmoji: '🥕',
    options: [
      { id: 'a', text: '3 carrots each (15 ÷ 5 = 3)', isCorrect: true },
      { id: 'b', text: '5 carrots each', isCorrect: false },
      { id: 'c', text: '2 carrots each', isCorrect: false },
      { id: 'd', text: '4 carrots each', isCorrect: false },
    ],
    explanation: '15 split equally among 5 baskets = 3 carrots per basket (5 × 3 = 15).',
  },
  {
    id: 'c2_div_3',
    prompt: '20 colorful pencils are shared equally between 4 pencil cases. How many in each case?',
    contextEmoji: '✏️',
    options: [
      { id: 'a', text: '5 pencils (20 ÷ 4 = 5)', isCorrect: true },
      { id: 'b', text: '4 pencils', isCorrect: false },
      { id: 'c', text: '6 pencils', isCorrect: false },
      { id: 'd', text: '10 pencils', isCorrect: false },
    ],
    explanation: '20 divided by 4 equals 5 pencils per case.',
  },
];

// 10. PLACE VALUE BUILDER (Class 2 Game #10)
export const CLASS2_PLACE_VALUE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_pv_1',
    prompt: 'Which number is formed by 4 Tens and 7 Ones?',
    contextEmoji: '🧱',
    options: [
      { id: 'a', text: '47', isCorrect: true },
      { id: 'b', text: '74', isCorrect: false },
      { id: 'c', text: '407', isCorrect: false },
      { id: 'd', text: '11', isCorrect: false },
    ],
    explanation: '4 Tens = 40. 7 Ones = 7. 40 + 7 = 47.',
  },
  {
    id: 'c2_pv_2',
    prompt: 'In the number 83, what is the place value of the digit 8?',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '80 (8 Tens)', isCorrect: true },
      { id: 'b', text: '8 (8 Ones)', isCorrect: false },
      { id: 'c', text: '800 (8 Hundreds)', isCorrect: false },
      { id: 'd', text: '30 (3 Tens)', isCorrect: false },
    ],
    explanation: 'In 83, 8 is in the tens column, so its value is 8 × 10 = 80.',
  },
  {
    id: 'c2_pv_3',
    prompt: 'What is the expanded form of 95?',
    contextEmoji: '📜',
    options: [
      { id: 'a', text: '90 + 5', isCorrect: true },
      { id: 'b', text: '9 + 5', isCorrect: false },
      { id: 'c', text: '900 + 5', isCorrect: false },
      { id: 'd', text: '50 + 9', isCorrect: false },
    ],
    explanation: '95 consists of 9 tens (90) and 5 ones (5), written as 90 + 5.',
  },
];

// 11. TIME DETECTIVE (Class 2 Game #11)
export const CLASS2_TIME_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_time_1',
    prompt: 'If the short hour hand points past 4 and the long minute hand points to 6, what time is it?',
    contextEmoji: '⏰',
    options: [
      { id: 'a', text: '4:30 (Half past 4)', isCorrect: true },
      { id: 'b', text: '4:00 (4 o\'clock)', isCorrect: false },
      { id: 'c', text: '6:20', isCorrect: false },
      { id: 'd', text: '5:30', isCorrect: false },
    ],
    explanation: 'When the minute hand points to 6, 30 minutes have passed (half past). So it is 4:30.',
  },
  {
    id: 'c2_time_2',
    prompt: 'If the minute hand points to 3 (quarter past) and hour hand is just past 8, what time is it?',
    contextEmoji: '🕒',
    options: [
      { id: 'a', text: '8:15 (Quarter past 8)', isCorrect: true },
      { id: 'b', text: '8:45 (Quarter to 9)', isCorrect: false },
      { id: 'c', text: '3:40', isCorrect: false },
      { id: 'd', text: '8:30', isCorrect: false },
    ],
    explanation: 'Each number on the clock is 5 minutes. 3 × 5 = 15 minutes. It is 8:15.',
  },
];

// 12. MONEY SHOP (Class 2 Game #12)
export const CLASS2_MONEY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_mon_1',
    prompt: 'You buy a toy robot for $14. You pay with a $20 bill. How much change do you receive?',
    contextEmoji: '🤖',
    options: [
      { id: 'a', text: '$6 change ($20 - $14 = $6)', isCorrect: true },
      { id: 'b', text: '$4 change', isCorrect: false },
      { id: 'c', text: '$7 change', isCorrect: false },
      { id: 'd', text: '$5 change', isCorrect: false },
    ],
    explanation: 'Subtract the cost from the payment: $20 - $14 = $6 change.',
  },
  {
    id: 'c2_mon_2',
    prompt: 'Alex buys a storybook for $8 and a pencil box for $5. What is the total cost?',
    contextEmoji: '📚',
    options: [
      { id: 'a', text: '$13 total ($8 + $5 = $13)', isCorrect: true },
      { id: 'b', text: '$15 total', isCorrect: false },
      { id: 'c', text: '$12 total', isCorrect: false },
      { id: 'd', text: '$14 total', isCorrect: false },
    ],
    explanation: 'Add both items: $8 + $5 = $13.',
  },
];

// 13. PLANT PARTS (Class 2 Game #13)
export const CLASS2_PLANT_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_pl_1',
    prompt: 'Which part of the plant grows underground and absorbs water and minerals from the soil?',
    contextEmoji: '🌱',
    options: [
      { id: 'a', text: 'Roots', isCorrect: true },
      { id: 'b', text: 'Leaves', isCorrect: false },
      { id: 'c', text: 'Flower', isCorrect: false },
      { id: 'd', text: 'Fruit', isCorrect: false },
    ],
    explanation: 'The roots anchor the plant in the soil and absorb water and nutrients.',
  },
  {
    id: 'c2_pl_2',
    prompt: 'Which green part of the plant makes food using sunlight?',
    contextEmoji: '🍃',
    options: [
      { id: 'a', text: 'Leaves', isCorrect: true },
      { id: 'b', text: 'Stem', isCorrect: false },
      { id: 'c', text: 'Roots', isCorrect: false },
      { id: 'd', text: 'Petals', isCorrect: false },
    ],
    explanation: 'Leaves contain chlorophyll and use sunlight to make food for the plant.',
  },
];

// 14. ANIMAL GROUPS (Class 2 Game #14)
export const CLASS2_ANIMAL_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_anim_1',
    prompt: 'Animals with fur or hair that feed milk to their babies belong to which group?',
    contextEmoji: '🦁',
    options: [
      { id: 'a', text: 'Mammals', isCorrect: true },
      { id: 'b', text: 'Birds', isCorrect: false },
      { id: 'c', text: 'Fish', isCorrect: false },
      { id: 'd', text: 'Reptiles', isCorrect: false },
    ],
    explanation: 'Mammals are warm-blooded vertebrates with fur/hair that nurse their young with milk.',
  },
  {
    id: 'c2_anim_2',
    prompt: 'Frogs start life in water with gills and later live on land breathing with lungs. They are:',
    contextEmoji: '🐸',
    options: [
      { id: 'a', text: 'Amphibians', isCorrect: true },
      { id: 'b', text: 'Mammals', isCorrect: false },
      { id: 'c', text: 'Reptiles', isCorrect: false },
      { id: 'd', text: 'Insects', isCorrect: false },
    ],
    explanation: 'Amphibians live both in water and on land during their life cycle.',
  },
];

// 15. WEATHER STATION (Class 2 Game #15)
export const CLASS2_WEATHER_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_w_1',
    prompt: 'What scientific instrument is used to measure temperature?',
    contextEmoji: '🌡️',
    options: [
      { id: 'a', text: 'Thermometer', isCorrect: true },
      { id: 'b', text: 'Barometer', isCorrect: false },
      { id: 'c', text: 'Rain Gauge', isCorrect: false },
      { id: 'd', text: 'Wind Vane', isCorrect: false },
    ],
    explanation: 'A thermometer measures how hot or cold the air is in degrees Celsius or Fahrenheit.',
  },
  {
    id: 'c2_w_2',
    prompt: 'During which season do leaves change color and fall from trees?',
    contextEmoji: '🍂',
    options: [
      { id: 'a', text: 'Autumn (Fall)', isCorrect: true },
      { id: 'b', text: 'Spring', isCorrect: false },
      { id: 'c', text: 'Summer', isCorrect: false },
      { id: 'd', text: 'Winter', isCorrect: false },
    ],
    explanation: 'In Autumn (Fall), days get shorter and cooler, causing leaves to turn vibrant colors and drop.',
  },
];

// 16. NUMBER PATTERNS (Class 2 Game #16)
export const CLASS2_NUMBER_PATTERNS_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_np_1',
    prompt: 'Find the missing number in this sequence: 12, 16, 20, 24, __, 32',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '28 (Adding 4 each time)', isCorrect: true },
      { id: 'b', text: '26', isCorrect: false },
      { id: 'c', text: '30', isCorrect: false },
      { id: 'd', text: '27', isCorrect: false },
    ],
    explanation: 'The rule is skip counting by 4: 24 + 4 = 28.',
  },
  {
    id: 'c2_np_2',
    prompt: 'Find the missing number: 45, 40, 35, __, 25, 20',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '30 (Subtracting 5 each time)', isCorrect: true },
      { id: 'b', text: '32', isCorrect: false },
      { id: 'c', text: '28', isCorrect: false },
      { id: 'd', text: '31', isCorrect: false },
    ],
    explanation: 'The pattern is counting backward by 5s: 35 - 5 = 30.',
  },
];

// 17. LOGIC PUZZLE (Class 2 Game #17)
export const CLASS2_LOGIC_PUZZLE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_log_1',
    prompt: 'Clues: Maya is taller than Kai. Kai is taller than Toby. Who is the tallest?',
    contextEmoji: '🧠',
    options: [
      { id: 'a', text: 'Maya', isCorrect: true },
      { id: 'b', text: 'Kai', isCorrect: false },
      { id: 'c', text: 'Toby', isCorrect: false },
      { id: 'd', text: 'They are all equal', isCorrect: false },
    ],
    explanation: 'Since Maya > Kai and Kai > Toby, Maya is the tallest.',
  },
  {
    id: 'c2_log_2',
    prompt: 'I am an animal with four legs. I say "Neigh", eat hay, and wear horseshoes. What am I?',
    contextEmoji: '🐎',
    options: [
      { id: 'a', text: 'Horse', isCorrect: true },
      { id: 'b', text: 'Cow', isCorrect: false },
      { id: 'c', text: 'Sheep', isCorrect: false },
      { id: 'd', text: 'Dog', isCorrect: false },
    ],
    explanation: 'A horse neighs, eats hay, and wears metal horseshoes.',
  },
];

// 18. FIND THE DIFFERENCE (Class 2 Game #18)
export const CLASS2_FIND_DIFFERENCE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_diff_1',
    prompt: 'Scene A has a castle with 3 red flags. Scene B has a castle with 2 flags. What is the difference?',
    contextEmoji: '🕵️',
    options: [
      { id: 'a', text: 'Scene B has 1 less flag than Scene A', isCorrect: true },
      { id: 'b', text: 'The sun turned green', isCorrect: false },
      { id: 'c', text: 'The bridge disappeared', isCorrect: false },
      { id: 'd', text: 'There are no castles', isCorrect: false },
    ],
    explanation: 'In Scene A there are 3 flags, while Scene B has 2 flags (1 less).',
  },
];

// 19. WORLD EXPLORER (Class 2 Game #19)
export const CLASS2_WORLD_EXPLORER_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_gk_1',
    prompt: 'Which famous statue holding a torch welcomes visitors to New York Harbor, USA?',
    contextEmoji: '🗽',
    options: [
      { id: 'a', text: 'Statue of Liberty', isCorrect: true },
      { id: 'b', text: 'Eiffel Tower', isCorrect: false },
      { id: 'c', text: 'Great Pyramid', isCorrect: false },
      { id: 'd', text: 'Big Ben', isCorrect: false },
    ],
    explanation: 'The Statue of Liberty is a symbol of freedom located in New York Harbor.',
  },
  {
    id: 'c2_gk_2',
    prompt: 'How many continents are there on planet Earth?',
    contextEmoji: '🗺️',
    options: [
      { id: 'a', text: '7 Continents', isCorrect: true },
      { id: 'b', text: '5 Continents', isCorrect: false },
      { id: 'c', text: '4 Continents', isCorrect: false },
      { id: 'd', text: '10 Continents', isCorrect: false },
    ],
    explanation: 'Earth has 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.',
  },
];

// 20. KNOWLEDGE CHALLENGE (Class 2 Game #20)
export const CLASS2_KNOWLEDGE_CHALLENGE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c2_champ_1',
    prompt: 'English: Which word in this sentence is a NOUN? "The shiny rocket zoomed to Mars."',
    contextEmoji: '🚀',
    options: [
      { id: 'a', text: 'rocket (and Mars)', isCorrect: true },
      { id: 'b', text: 'shiny', isCorrect: false },
      { id: 'c', text: 'zoomed', isCorrect: false },
      { id: 'd', text: 'to', isCorrect: false },
    ],
    explanation: 'A noun is a person, place, or thing. "Rocket" and "Mars" are nouns.',
  },
  {
    id: 'c2_champ_2',
    prompt: 'Maths: What is 7 × 4 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '28', isCorrect: true },
      { id: 'b', text: '24', isCorrect: false },
      { id: 'c', text: '32', isCorrect: false },
      { id: 'd', text: '21', isCorrect: false },
    ],
    explanation: '7 multiplied by 4 equals 28 (7 + 7 + 7 + 7 = 28).',
  },
  {
    id: 'c2_champ_3',
    prompt: 'Science: What gas do green plants release that humans need to breathe?',
    contextEmoji: '💨',
    options: [
      { id: 'a', text: 'Oxygen', isCorrect: true },
      { id: 'b', text: 'Carbon dioxide', isCorrect: false },
      { id: 'c', text: 'Helium', isCorrect: false },
      { id: 'd', text: 'Steam', isCorrect: false },
    ],
    explanation: 'Plants produce oxygen during photosynthesis, which humans and animals breathe.',
  },
];
