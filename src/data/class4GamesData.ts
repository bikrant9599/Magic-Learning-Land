// Class 4 Question Banks and Interactive Data (20 Mini-Games)
// Age 9–10 Curriculum: Multi-digit multiplication, long division, decimals, fractions, angles & geometry, circuits, ecosystems, geography & logical reasoning.

import { CurriculumGameItem } from './class2GamesData';

// 1. READING COMPREHENSION (Class 4 Game #1)
export const CLASS4_READING_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_read_1',
    passage: 'The Great Barrier Reef, stretching over 2,300 kilometers off Australia, is the world\'s largest coral reef system. Coral reefs are built by billions of tiny organisms called coral polyps that secrete calcium carbonate to form hard exoskeletons. Although coral reefs cover less than 1% of the ocean floor, they shelter more than 25% of all known marine species.',
    prompt: 'What mineral do coral polyps produce to construct the reef structure?',
    options: [
      { id: 'a', text: 'Calcium carbonate exoskeletons', isCorrect: true },
      { id: 'b', text: 'Volcanic quartz glass', isCorrect: false },
      { id: 'c', text: 'Granite bedrock', isCorrect: false },
      { id: 'd', text: 'Pure iron ore', isCorrect: false },
    ],
    explanation: 'The passage explicitly states that tiny coral polyps secrete calcium carbonate to form hard protective exoskeletons.',
  },
  {
    id: 'c4_read_2',
    passage: 'In 1903 in Kitty Hawk, North Carolina, Orville and Wilbur Wright achieved the world\'s first controlled and powered airplane flight with the Wright Flyer. The initial historic flight lasted 12 seconds and covered 120 feet.',
    prompt: 'How long did the world\'s very first powered airplane flight last?',
    options: [
      { id: 'a', text: '12 seconds (covering 120 feet)', isCorrect: true },
      { id: 'b', text: '2 hours', isCorrect: false },
      { id: 'c', text: '10 minutes', isCorrect: false },
      { id: 'd', text: '45 seconds', isCorrect: false },
    ],
    explanation: 'The first historic powered flight by Orville Wright lasted exactly 12 seconds.',
  },
];

// 2. GRAMMAR DETECTIVE (Class 4 Game #2)
export const CLASS4_GRAMMAR_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_gram_1',
    prompt: 'Identify the PREPOSITION in this sentence: "The curious cat climbed cautiously onto the high wooden fence."',
    options: [
      { id: 'a', text: 'onto', isCorrect: true },
      { id: 'b', text: 'cautiously', isCorrect: false },
      { id: 'c', text: 'climbed', isCorrect: false },
      { id: 'd', text: 'fence', isCorrect: false },
    ],
    explanation: '"Onto" is a preposition showing the direction and position of where the cat climbed.',
  },
  {
    id: 'c4_gram_2',
    prompt: 'Which word is an ADVERB? "The eagle flew swiftly above the clouds."',
    options: [
      { id: 'a', text: 'swiftly', isCorrect: true },
      { id: 'b', text: 'eagle', isCorrect: false },
      { id: 'c', text: 'clouds', isCorrect: false },
      { id: 'd', text: 'above', isCorrect: false },
    ],
    explanation: '"Swiftly" ends in -ly and describes how the eagle flew (manner).',
  },
];

// 3. SENTENCE BUILDER PRO (Class 4 Game #3)
export const CLASS4_SENTENCE_BUILDER_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_sb_1',
    prompt: 'Choose the best conjunction: "We could not play soccer outside _____ it was raining heavily."',
    options: [
      { id: 'a', text: 'because', isCorrect: true },
      { id: 'b', text: 'although', isCorrect: false },
      { id: 'c', text: 'unless', isCorrect: false },
      { id: 'd', text: 'while', isCorrect: false },
    ],
    explanation: '"Because" establishes the cause-and-effect reason for why soccer was cancelled.',
  },
];

// 4. VOCABULARY VAULT (Class 4 Game #4)
export const CLASS4_VOCABULARY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_voc_1',
    prompt: 'What does the idiom "A piece of cake" mean?',
    options: [
      { id: 'a', text: 'Something very easy to do', isCorrect: true },
      { id: 'b', text: 'A delicious dessert', isCorrect: false },
      { id: 'c', text: 'A difficult task', isCorrect: false },
      { id: 'd', text: 'A birthday celebration', isCorrect: false },
    ],
    explanation: 'The idiom "a piece of cake" means something is extremely easy to accomplish.',
  },
  {
    id: 'c4_voc_2',
    prompt: 'What is the ANTONYM (opposite) of "ANCIENT"?',
    options: [
      { id: 'a', text: 'Modern', isCorrect: true },
      { id: 'b', text: 'Old', isCorrect: false },
      { id: 'c', text: 'Historic', isCorrect: false },
      { id: 'd', text: 'Antique', isCorrect: false },
    ],
    explanation: '"Ancient" refers to very old times, while "Modern" refers to contemporary times.',
  },
];

// 5. PARTS OF SPEECH (Class 4 Game #5)
export const CLASS4_PARTS_OF_SPEECH_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_pos_1',
    prompt: 'Identify the part of speech of the capitalized word: "They walked SLOWLY across the bridge."',
    options: [
      { id: 'a', text: 'Adverb', isCorrect: true },
      { id: 'b', text: 'Adjective', isCorrect: false },
      { id: 'c', text: 'Noun', isCorrect: false },
      { id: 'd', text: 'Preposition', isCorrect: false },
    ],
    explanation: '"Slowly" modifies the verb "walked", making it an adverb of manner.',
  },
];

// 6. MULTIPLICATION MASTER (Class 4 Game #6)
export const CLASS4_MULTIPLICATION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_mm_1',
    prompt: 'Solve: 45 × 12 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '540', isCorrect: true },
      { id: 'b', text: '450', isCorrect: false },
      { id: 'c', text: '520', isCorrect: false },
      { id: 'd', text: '580', isCorrect: false },
    ],
    explanation: '45 × 10 = 450; 45 × 2 = 90; 450 + 90 = 540.',
  },
  {
    id: 'c4_mm_2',
    prompt: 'Solve: 36 × 25 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '900', isCorrect: true },
      { id: 'b', text: '850', isCorrect: false },
      { id: 'c', text: '920', isCorrect: false },
      { id: 'd', text: '960', isCorrect: false },
    ],
    explanation: '36 × 25 = 900 (since 36 × 100 / 4 = 3600 / 4 = 900).',
  },
];

// 7. DIVISION MASTER (Class 4 Game #7)
export const CLASS4_DIVISION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_div_1',
    prompt: 'Solve: 144 ÷ 12 = ?',
    contextEmoji: '➗',
    options: [
      { id: 'a', text: '12', isCorrect: true },
      { id: 'b', text: '11', isCorrect: false },
      { id: 'c', text: '14', isCorrect: false },
      { id: 'd', text: '13', isCorrect: false },
    ],
    explanation: '144 ÷ 12 = 12 (12 × 12 = 144).',
  },
  {
    id: 'c4_div_2',
    prompt: 'Find quotient and remainder: 58 ÷ 7 = ?',
    contextEmoji: '➗',
    options: [
      { id: 'a', text: 'Quotient 8, Remainder 2 (8 R2)', isCorrect: true },
      { id: 'b', text: 'Quotient 7, Remainder 9', isCorrect: false },
      { id: 'c', text: 'Quotient 8, Remainder 3', isCorrect: false },
      { id: 'd', text: 'Quotient 9, Remainder 1', isCorrect: false },
    ],
    explanation: '7 × 8 = 56. 58 - 56 = remainder 2.',
  },
];

// 8. FRACTION FACTORY (Class 4 Game #8)
export const CLASS4_FRACTION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_ff_1',
    prompt: 'Simplify the fraction 6/18 to its lowest terms:',
    contextEmoji: '⚙️',
    options: [
      { id: 'a', text: '1/3', isCorrect: true },
      { id: 'b', text: '2/9', isCorrect: false },
      { id: 'c', text: '3/6', isCorrect: false },
      { id: 'd', text: '1/6', isCorrect: false },
    ],
    explanation: 'Divide numerator and denominator by 6: 6÷6 / 18÷6 = 1/3.',
  },
  {
    id: 'c4_ff_2',
    prompt: 'Convert the improper fraction 7/3 into a mixed number:',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '2 1/3 (Two and one third)', isCorrect: true },
      { id: 'b', text: '1 4/3', isCorrect: false },
      { id: 'c', text: '3 1/2', isCorrect: false },
      { id: 'd', text: '2 2/3', isCorrect: false },
    ],
    explanation: '7 divided by 3 gives 2 with remainder 1, which equals 2 1/3.',
  },
];

// 9. DECIMAL DETECTIVE (Class 4 Game #9)
export const CLASS4_DECIMAL_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_dec_1',
    prompt: 'Which decimal is equal to the fraction 3/4?',
    contextEmoji: '🔍',
    options: [
      { id: 'a', text: '0.75', isCorrect: true },
      { id: 'b', text: '0.34', isCorrect: false },
      { id: 'c', text: '0.50', isCorrect: false },
      { id: 'd', text: '0.70', isCorrect: false },
    ],
    explanation: '3 ÷ 4 = 0.75 (seventy-five hundredths).',
  },
  {
    id: 'c4_dec_2',
    prompt: 'Solve: 4.6 + 3.25 = ?',
    contextEmoji: '➕',
    options: [
      { id: 'a', text: '7.85', isCorrect: true },
      { id: 'b', text: '7.31', isCorrect: false },
      { id: 'c', text: '8.10', isCorrect: false },
      { id: 'd', text: '7.65', isCorrect: false },
    ],
    explanation: 'Line up decimals: 4.60 + 3.25 = 7.85.',
  },
];

// 10. GEOMETRY QUEST (Class 4 Game #10)
export const CLASS4_GEOMETRY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_geo_1',
    prompt: 'An angle measuring exactly 90 degrees is called a(n):',
    contextEmoji: '📐',
    options: [
      { id: 'a', text: 'Right Angle (90°)', isCorrect: true },
      { id: 'b', text: 'Acute Angle (<90°)', isCorrect: false },
      { id: 'c', text: 'Obtuse Angle (>90°)', isCorrect: false },
      { id: 'd', text: 'Straight Angle (180°)', isCorrect: false },
    ],
    explanation: 'A 90-degree corner angle is defined as a right angle.',
  },
  {
    id: 'c4_geo_2',
    prompt: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
    contextEmoji: '📏',
    options: [
      { id: 'a', text: '26 cm (2 × (8 + 5))', isCorrect: true },
      { id: 'b', text: '40 cm²', isCorrect: false },
      { id: 'c', text: '13 cm', isCorrect: false },
      { id: 'd', text: '24 cm', isCorrect: false },
    ],
    explanation: 'Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm.',
  },
];

// 11. MEASUREMENT LAB (Class 4 Game #11)
export const CLASS4_MEASUREMENT_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_ml_1',
    prompt: 'How many milliliters (mL) are in 2.5 Liters (L)?',
    contextEmoji: '🧪',
    options: [
      { id: 'a', text: '2,500 mL', isCorrect: true },
      { id: 'b', text: '250 mL', isCorrect: false },
      { id: 'c', text: '25 mL', isCorrect: false },
      { id: 'd', text: '25,000 mL', isCorrect: false },
    ],
    explanation: '1 Liter = 1,000 mL, so 2.5 L = 2.5 × 1,000 = 2,500 mL.',
  },
];

// 12. SMART SHOP (Class 4 Game #12)
export const CLASS4_SMART_SHOP_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_ss_1',
    prompt: 'You buy 3 notebooks at $4.50 each and pay with a $20 bill. How much change do you receive?',
    contextEmoji: '🛒',
    options: [
      { id: 'a', text: '$6.50 change ($20 - $13.50)', isCorrect: true },
      { id: 'b', text: '$7.50 change', isCorrect: false },
      { id: 'c', text: '$5.50 change', isCorrect: false },
      { id: 'd', text: '$6.00 change', isCorrect: false },
    ],
    explanation: 'Cost = 3 × $4.50 = $13.50. Change = $20 - $13.50 = $6.50.',
  },
];

// 13. SCIENCE LAB (Class 4 Game #13)
export const CLASS4_SCIENCE_LAB_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_sl_1',
    prompt: 'What material allows electrical current to flow freely through it?',
    contextEmoji: '⚡',
    options: [
      { id: 'a', text: 'Electrical Conductor (e.g., Copper wire)', isCorrect: true },
      { id: 'b', text: 'Insulator (e.g., Rubber)', isCorrect: false },
      { id: 'c', text: 'Dry wood', isCorrect: false },
      { id: 'd', text: 'Plastic wrap', isCorrect: false },
    ],
    explanation: 'Conductors like copper let electrons flow easily in an electrical circuit.',
  },
];

// 14. HUMAN BODY LAB (Class 4 Game #14)
export const CLASS4_HUMAN_BODY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_hbl_1',
    prompt: 'How many bones make up the adult human skeleton?',
    contextEmoji: '🦴',
    options: [
      { id: 'a', text: '206 bones', isCorrect: true },
      { id: 'b', text: '300 bones', isCorrect: false },
      { id: 'c', text: '150 bones', isCorrect: false },
      { id: 'd', text: '500 bones', isCorrect: false },
    ],
    explanation: 'An adult human skeleton has exactly 206 distinct bones.',
  },
];

// 15. ECOSYSTEM EXPLORER (Class 4 Game #15)
export const CLASS4_ECOSYSTEM_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_eco_1',
    prompt: 'In a food web, organisms like fungi and bacteria that break down dead matter are called:',
    contextEmoji: '🍄',
    options: [
      { id: 'a', text: 'Decomposers', isCorrect: true },
      { id: 'b', text: 'Primary Consumers', isCorrect: false },
      { id: 'c', text: 'Producers', isCorrect: false },
      { id: 'd', text: 'Apex Predators', isCorrect: false },
    ],
    explanation: 'Decomposers recycle organic matter back into essential soil nutrients.',
  },
];

// 16. MAP MASTER (Class 4 Game #16)
export const CLASS4_MAP_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_map_1',
    prompt: 'What imaginary line divides Earth into the Northern and Southern Hemispheres?',
    contextEmoji: '🌐',
    options: [
      { id: 'a', text: 'The Equator (0° Latitude)', isCorrect: true },
      { id: 'b', text: 'The Prime Meridian', isCorrect: false },
      { id: 'c', text: 'Tropic of Cancer', isCorrect: false },
      { id: 'd', text: 'Arctic Circle', isCorrect: false },
    ],
    explanation: 'The Equator sits at 0° latitude, dividing Northern and Southern Hemispheres.',
  },
];

// 17. REASONING CHALLENGE (Class 4 Game #17)
export const CLASS4_REASONING_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_rc_1',
    prompt: 'If day before yesterday was Thursday, what day will tomorrow be?',
    contextEmoji: '🧠',
    options: [
      { id: 'a', text: 'Sunday (Today is Saturday)', isCorrect: true },
      { id: 'b', text: 'Friday', isCorrect: false },
      { id: 'c', text: 'Saturday', isCorrect: false },
      { id: 'd', text: 'Monday', isCorrect: false },
    ],
    explanation: 'Day before yesterday = Thursday -> Yesterday = Friday -> Today = Saturday -> Tomorrow = Sunday.',
  },
];

// 18. SEQUENCE MASTER (Class 4 Game #18)
export const CLASS4_SEQUENCE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_sm_1',
    prompt: 'Find the next number in this square sequence: 1, 4, 9, 16, 25, __',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '36 (6 × 6 = 36)', isCorrect: true },
      { id: 'b', text: '35', isCorrect: false },
      { id: 'c', text: '30', isCorrect: false },
      { id: 'd', text: '49', isCorrect: false },
    ],
    explanation: 'These are perfect squares: 1², 2², 3², 4², 5², and next is 6² = 36.',
  },
];

// 19. GEOGRAPHY EXPLORER (Class 4 Game #19)
export const CLASS4_GEOGRAPHY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_ge_1',
    prompt: 'What is the highest mountain peak above sea level on Earth?',
    contextEmoji: '🏔️',
    options: [
      { id: 'a', text: 'Mount Everest (8,848 m)', isCorrect: true },
      { id: 'b', text: 'K2', isCorrect: false },
      { id: 'c', text: 'Mount Kilimanjaro', isCorrect: false },
      { id: 'd', text: 'Mount Fuji', isCorrect: false },
    ],
    explanation: 'Mount Everest in the Himalayas is Earth\'s highest mountain peak at 8,848.86 meters.',
  },
];

// 20. BRAIN CHALLENGE (Class 4 Game #20)
export const CLASS4_BRAIN_CHALLENGE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c4_bc_1',
    prompt: 'Maths: Solve (15 × 4) + (36 ÷ 6) = ?',
    contextEmoji: '🏆',
    options: [
      { id: 'a', text: '66 (60 + 6 = 66)', isCorrect: true },
      { id: 'b', text: '60', isCorrect: false },
      { id: 'c', text: '72', isCorrect: false },
      { id: 'd', text: '54', isCorrect: false },
    ],
    explanation: '15 × 4 = 60; 36 ÷ 6 = 6; 60 + 6 = 66.',
  },
  {
    id: 'c4_bc_2',
    prompt: 'Science: Which state of matter has a definite volume but takes the shape of its container?',
    contextEmoji: '🧪',
    options: [
      { id: 'a', text: 'Liquid', isCorrect: true },
      { id: 'b', text: 'Solid', isCorrect: false },
      { id: 'c', text: 'Gas', isCorrect: false },
      { id: 'd', text: 'Plasma', isCorrect: false },
    ],
    explanation: 'Liquids have fixed volume but flow to take the container\'s shape.',
  },
];
