// Class 3 Question Banks and Interactive Data (20 Mini-Games)
// Age 8–9 Curriculum: Multiplication tables, division facts, fraction pizzas, multi-step math, grammar, ecosystems, geography, space.

import { CurriculumGameItem } from './class2GamesData';

// 1. READING DETECTIVE (Class 3 Game #1)
export const CLASS3_READING_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_read_1',
    passage: 'Honeybees are essential pollinators. When a worker bee visits a bright flower to drink nectar, pollen grains stick to its fuzzy body. As it flies to the next blossom, it transfers pollen, helping flowers develop fruits and seeds. Inside the hive, bees turn nectar into sweet golden honey.',
    prompt: 'According to the passage, how do honeybees help plants produce fruits and seeds?',
    options: [
      { id: 'a', text: 'By transferring pollen between blossoms', isCorrect: true },
      { id: 'b', text: 'By eating all the leaves', isCorrect: false },
      { id: 'c', text: 'By building wax hives on branches', isCorrect: false },
      { id: 'd', text: 'By buzzing loudly near the roots', isCorrect: false },
    ],
    explanation: 'The text explains that as the bee flies from flower to flower, it transfers pollen stuck to its fuzzy body, which pollinates the plants.',
  },
  {
    id: 'c3_read_2',
    passage: 'In 1879, Thomas Edison and his team of researchers tested thousands of different materials before discovering that a carbonized bamboo filament could burn continuously for over 1,200 hours in an electric light bulb, illuminating homes safely.',
    prompt: 'What special material burned for over 1,200 hours in Edison\'s light bulb?',
    options: [
      { id: 'a', text: 'Carbonized bamboo filament', isCorrect: true },
      { id: 'b', text: 'Copper wire string', isCorrect: false },
      { id: 'c', text: 'Cotton thread', isCorrect: false },
      { id: 'd', text: 'Silver metal strip', isCorrect: false },
    ],
    explanation: 'The passage explicitly names "a carbonized bamboo filament" as the material that burned for over 1,200 hours.',
  },
];

// 2. GRAMMAR BUILDER (Class 3 Game #2)
export const CLASS3_GRAMMAR_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_gram_1',
    prompt: 'Identify the ADJECTIVE (describing word) in this sentence: "The courageous knight defended the castle."',
    options: [
      { id: 'a', text: 'courageous', isCorrect: true },
      { id: 'b', text: 'knight', isCorrect: false },
      { id: 'c', text: 'defended', isCorrect: false },
      { id: 'd', text: 'castle', isCorrect: false },
    ],
    explanation: '"Courageous" is an adjective because it describes the noun "knight".',
  },
  {
    id: 'c3_gram_2',
    prompt: 'Identify the VERB (action word) in this sentence: "Dolphins leap gracefully over the ocean waves."',
    options: [
      { id: 'a', text: 'leap', isCorrect: true },
      { id: 'b', text: 'dolphins', isCorrect: false },
      { id: 'c', text: 'gracefully', isCorrect: false },
      { id: 'd', text: 'waves', isCorrect: false },
    ],
    explanation: '"Leap" is the action that the dolphins perform.',
  },
  {
    id: 'c3_gram_3',
    prompt: 'Which word is a PROPER NOUN (specific name needing a capital letter)?',
    options: [
      { id: 'a', text: 'Pacific Ocean', isCorrect: true },
      { id: 'b', text: 'ocean', isCorrect: false },
      { id: 'c', text: 'water', isCorrect: false },
      { id: 'd', text: 'swimmer', isCorrect: false },
    ],
    explanation: '"Pacific Ocean" is a proper noun naming a specific ocean on Earth.',
  },
];

// 3. SENTENCE FIXER (Class 3 Game #3)
export const CLASS3_SENTENCE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_sfix_1',
    prompt: 'Which sentence has the correct punctuation and capitalization?',
    options: [
      { id: 'a', text: 'Are we going to the museum on Saturday?', isCorrect: true },
      { id: 'b', text: 'are we going to the museum on saturday', isCorrect: false },
      { id: 'c', text: 'Are we going to the museum on saturday!', isCorrect: false },
      { id: 'd', text: 'are We going to the Museum on Saturday.', isCorrect: false },
    ],
    explanation: 'A question starts with a capital letter, capitalizes proper nouns like "Saturday", and ends with a question mark (?).',
  },
  {
    id: 'c3_sfix_2',
    prompt: 'Choose the sentence with correct comma placement in a list:',
    options: [
      { id: 'a', text: 'She bought apples, bananas, and oranges.', isCorrect: true },
      { id: 'b', text: 'She bought apples bananas and, oranges.', isCorrect: false },
      { id: 'c', text: 'She bought, apples bananas, and oranges.', isCorrect: false },
      { id: 'd', text: 'She, bought apples, bananas and oranges.', isCorrect: false },
    ],
    explanation: 'Commas separate items in a series of three or more elements.',
  },
];

// 4. VOCABULARY QUEST (Class 3 Game #4)
export const CLASS3_VOCABULARY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_voc_1',
    prompt: 'What does the prefix "UN-" mean in words like "unhappy", "unlock", and "untidy"?',
    options: [
      { id: 'a', text: 'Not / Opposite of', isCorrect: true },
      { id: 'b', text: 'Very much', isCorrect: false },
      { id: 'c', text: 'Before', isCorrect: false },
      { id: 'd', text: 'Again', isCorrect: false },
    ],
    explanation: 'The prefix "un-" means "not" or the reversal of an action (unhappy = not happy).',
  },
  {
    id: 'c3_voc_2',
    prompt: 'Choose the correct homophone: "The eagle soared high through the chilly winter ___."',
    options: [
      { id: 'a', text: 'air', isCorrect: true },
      { id: 'b', text: 'heir', isCorrect: false },
      { id: 'c', text: 'err', isCorrect: false },
      { id: 'd', text: 'are', isCorrect: false },
    ],
    explanation: '"Air" refers to the atmosphere that birds fly in.',
  },
];

// 5. STORY SEQUENCE (Class 3 Game #5)
export const CLASS3_STORY_SEQUENCE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_seq_1',
    prompt: 'What is the correct scientific order of butterfly metamorphosis?',
    contextEmoji: '🦋',
    options: [
      { id: 'a', text: 'Egg -> Caterpillar (Larva) -> Chrysalis (Pupa) -> Adult Butterfly', isCorrect: true },
      { id: 'b', text: 'Caterpillar -> Egg -> Butterfly -> Chrysalis', isCorrect: false },
      { id: 'c', text: 'Butterfly -> Chrysalis -> Egg -> Caterpillar', isCorrect: false },
      { id: 'd', text: 'Egg -> Chrysalis -> Caterpillar -> Butterfly', isCorrect: false },
    ],
    explanation: 'Life cycle: Egg -> Caterpillar (Larva) -> Chrysalis (Pupa) -> Adult Butterfly.',
  },
];

// 6. MULTIPLICATION RACE (Class 3 Game #6)
export const CLASS3_MULTIPLICATION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_mr_1',
    prompt: 'Solve: 8 × 7 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '56', isCorrect: true },
      { id: 'b', text: '54', isCorrect: false },
      { id: 'c', text: '64', isCorrect: false },
      { id: 'd', text: '48', isCorrect: false },
    ],
    explanation: '8 times 7 is 56.',
  },
  {
    id: 'c3_mr_2',
    prompt: 'Solve: 9 × 6 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '54', isCorrect: true },
      { id: 'b', text: '63', isCorrect: false },
      { id: 'c', text: '45', isCorrect: false },
      { id: 'd', text: '56', isCorrect: false },
    ],
    explanation: '9 times 6 is 54.',
  },
  {
    id: 'c3_mr_3',
    prompt: 'Solve: 12 × 4 = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '48', isCorrect: true },
      { id: 'b', text: '44', isCorrect: false },
      { id: 'c', text: '52', isCorrect: false },
      { id: 'd', text: '36', isCorrect: false },
    ],
    explanation: '12 multiplied by 4 equals 48.',
  },
];

// 7. DIVISION CHALLENGE (Class 3 Game #7)
export const CLASS3_DIVISION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_div_1',
    prompt: 'Solve: 42 ÷ 6 = ?',
    contextEmoji: '➗',
    options: [
      { id: 'a', text: '7', isCorrect: true },
      { id: 'b', text: '6', isCorrect: false },
      { id: 'c', text: '8', isCorrect: false },
      { id: 'd', text: '9', isCorrect: false },
    ],
    explanation: '42 divided by 6 is 7 because 6 × 7 = 42.',
  },
  {
    id: 'c3_div_2',
    prompt: 'Solve: 56 ÷ 8 = ?',
    contextEmoji: '➗',
    options: [
      { id: 'a', text: '7', isCorrect: true },
      { id: 'b', text: '8', isCorrect: false },
      { id: 'c', text: '6', isCorrect: false },
      { id: 'd', text: '9', isCorrect: false },
    ],
    explanation: '56 divided by 8 is 7 because 8 × 7 = 56.',
  },
  {
    id: 'c3_div_3',
    prompt: 'If 35 apples are packed into bags of 5, how many bags are filled?',
    contextEmoji: '🍎',
    options: [
      { id: 'a', text: '7 bags (35 ÷ 5 = 7)', isCorrect: true },
      { id: 'b', text: '6 bags', isCorrect: false },
      { id: 'c', text: '8 bags', isCorrect: false },
      { id: 'd', text: '5 bags', isCorrect: false },
    ],
    explanation: '35 ÷ 5 = 7 bags.',
  },
];

// 8. FRACTION PIZZA (Class 3 Game #8)
export const CLASS3_FRACTION_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_frac_1',
    prompt: 'A pizza is cut into 8 equal slices. Leo eats 3 slices. What fraction did Leo eat?',
    contextEmoji: '🍕',
    options: [
      { id: 'a', text: '3/8 (Three eighths)', isCorrect: true },
      { id: 'b', text: '3/5', isCorrect: false },
      { id: 'c', text: '5/8', isCorrect: false },
      { id: 'd', text: '1/3', isCorrect: false },
    ],
    explanation: 'The numerator is the 3 eaten slices and the denominator is the 8 total slices = 3/8.',
  },
  {
    id: 'c3_frac_2',
    prompt: 'Which fraction is EQUAL to one whole (1)?',
    contextEmoji: '🥧',
    options: [
      { id: 'a', text: '4/4', isCorrect: true },
      { id: 'b', text: '3/4', isCorrect: false },
      { id: 'c', text: '1/2', isCorrect: false },
      { id: 'd', text: '2/4', isCorrect: false },
    ],
    explanation: 'When the numerator equals the denominator (like 4/4), it equals one whole.',
  },
  {
    id: 'c3_frac_3',
    prompt: 'Solve: 1/4 + 2/4 = ?',
    contextEmoji: '🍰',
    options: [
      { id: 'a', text: '3/4 (Three quarters)', isCorrect: true },
      { id: 'b', text: '3/8', isCorrect: false },
      { id: 'c', text: '2/4', isCorrect: false },
      { id: 'd', text: '1', isCorrect: false },
    ],
    explanation: 'Add numerators: 1 + 2 = 3. Keep denominator: 4. Result is 3/4.',
  },
];

// 9. PLACE VALUE MASTER (Class 3 Game #9)
export const CLASS3_PLACE_VALUE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_pv_1',
    prompt: 'In the 3-digit number 749, what is the place value of the digit 7?',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '700 (7 Hundreds)', isCorrect: true },
      { id: 'b', text: '70 (7 Tens)', isCorrect: false },
      { id: 'c', text: '7 (7 Ones)', isCorrect: false },
      { id: 'd', text: '7,000 (7 Thousands)', isCorrect: false },
    ],
    explanation: 'The digit 7 is in the hundreds column, representing 700.',
  },
  {
    id: 'c3_pv_2',
    prompt: 'What is 3 Hundreds + 5 Tens + 8 Ones in standard number form?',
    contextEmoji: '🧱',
    options: [
      { id: 'a', text: '358', isCorrect: true },
      { id: 'b', text: '3580', isCorrect: false },
      { id: 'c', text: '853', isCorrect: false },
      { id: 'd', text: '30058', isCorrect: false },
    ],
    explanation: '300 + 50 + 8 = 358.',
  },
];

// 10. MULTI-STEP MATHS (Class 3 Game #10)
export const CLASS3_MULTISTEP_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_ms_1',
    prompt: 'Maya bought 3 packs of stickers with 6 stickers in each pack. She gave 4 stickers to her brother. How many does she have left?',
    contextEmoji: '⭐',
    options: [
      { id: 'a', text: '14 stickers (18 - 4 = 14)', isCorrect: true },
      { id: 'b', text: '18 stickers', isCorrect: false },
      { id: 'c', text: '12 stickers', isCorrect: false },
      { id: 'd', text: '15 stickers', isCorrect: false },
    ],
    explanation: 'First calculate total stickers: 3 × 6 = 18. Then subtract given stickers: 18 - 4 = 14 stickers remaining.',
  },
];

// 11. SHAPE EXPLORER (Class 3 Game #11)
export const CLASS3_SHAPE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_sh_1',
    prompt: 'A polygon with exactly 5 sides and 5 angles is called a:',
    contextEmoji: '📐',
    options: [
      { id: 'a', text: 'Pentagon', isCorrect: true },
      { id: 'b', text: 'Hexagon', isCorrect: false },
      { id: 'c', text: 'Octagon', isCorrect: false },
      { id: 'd', text: 'Quadrilateral', isCorrect: false },
    ],
    explanation: 'Penta- means five. A 5-sided 2D polygon is a pentagon.',
  },
  {
    id: 'c3_sh_2',
    prompt: 'How many sides and angles does a Hexagon have?',
    contextEmoji: '🛑',
    options: [
      { id: 'a', text: '6 sides and 6 angles', isCorrect: true },
      { id: 'b', text: '8 sides and 8 angles', isCorrect: false },
      { id: 'c', text: '5 sides and 5 angles', isCorrect: false },
      { id: 'd', text: '4 sides and 4 angles', isCorrect: false },
    ],
    explanation: 'Hexa- means six. Hexagons have 6 equal sides and 6 angles.',
  },
];

// 12. MEASUREMENT MASTER (Class 3 Game #12)
export const CLASS3_MEASUREMENT_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_meas_1',
    prompt: 'How many centimeters (cm) are in 1 meter (m)?',
    contextEmoji: '📏',
    options: [
      { id: 'a', text: '100 cm', isCorrect: true },
      { id: 'b', text: '10 cm', isCorrect: false },
      { id: 'c', text: '1,000 cm', isCorrect: false },
      { id: 'd', text: '50 cm', isCorrect: false },
    ],
    explanation: 'Centi- means one hundredth; there are exactly 100 centimeters in 1 meter.',
  },
  {
    id: 'c3_meas_2',
    prompt: 'How many grams (g) are equal to 1 kilogram (kg)?',
    contextEmoji: '⚖️',
    options: [
      { id: 'a', text: '1,000 grams', isCorrect: true },
      { id: 'b', text: '100 grams', isCorrect: false },
      { id: 'c', text: '500 grams', isCorrect: false },
      { id: 'd', text: '10 grams', isCorrect: false },
    ],
    explanation: 'Kilo- means one thousand; 1 kg = 1,000 g.',
  },
];

// 13. PLANT SCIENCE (Class 3 Game #13)
export const CLASS3_PLANT_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_ps_1',
    prompt: 'What is the biological process by which green plants make food using water, carbon dioxide, and sunlight?',
    contextEmoji: '🌱',
    options: [
      { id: 'a', text: 'Photosynthesis', isCorrect: true },
      { id: 'b', text: 'Germination', isCorrect: false },
      { id: 'c', text: 'Pollination', isCorrect: false },
      { id: 'd', text: 'Evaporation', isCorrect: false },
    ],
    explanation: 'Photosynthesis uses light energy (photo-) to synthesize sugars for plant growth.',
  },
];

// 14. HUMAN BODY EXPLORER (Class 3 Game #14)
export const CLASS3_HUMAN_BODY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_hb_1',
    prompt: 'Which organ pumps oxygen-rich blood throughout your entire body 24 hours a day?',
    contextEmoji: '🫀',
    options: [
      { id: 'a', text: 'Heart', isCorrect: true },
      { id: 'b', text: 'Stomach', isCorrect: false },
      { id: 'c', text: 'Lungs', isCorrect: false },
      { id: 'd', text: 'Brain', isCorrect: false },
    ],
    explanation: 'The heart is a muscular organ that pumps blood through blood vessels to all body tissues.',
  },
  {
    id: 'c3_hb_2',
    prompt: 'Which organs fill with air and absorb oxygen into your bloodstream when you inhale?',
    contextEmoji: '🫁',
    options: [
      { id: 'a', text: 'Lungs', isCorrect: true },
      { id: 'b', text: 'Kidneys', isCorrect: false },
      { id: 'c', text: 'Liver', isCorrect: false },
      { id: 'd', text: 'Stomach', isCorrect: false },
    ],
    explanation: 'The lungs are the respiratory organs responsible for gas exchange (breathing).',
  },
];

// 15. EARTH EXPLORER (Class 3 Game #15)
export const CLASS3_EARTH_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_ee_1',
    prompt: 'What happens when liquid water in oceans heats up and turns into invisible water vapor gas?',
    contextEmoji: '💧',
    options: [
      { id: 'a', text: 'Evaporation', isCorrect: true },
      { id: 'b', text: 'Condensation', isCorrect: false },
      { id: 'c', text: 'Precipitation', isCorrect: false },
      { id: 'd', text: 'Freezing', isCorrect: false },
    ],
    explanation: 'Evaporation is the phase change where liquid water heats up into water vapor gas and rises.',
  },
];

// 16. PATTERN MASTER (Class 3 Game #16)
export const CLASS3_PATTERN_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_pat_1',
    prompt: 'Find the next number in this multiplying sequence: 3, 6, 12, 24, __',
    contextEmoji: '🔢',
    options: [
      { id: 'a', text: '48 (Doubling each time)', isCorrect: true },
      { id: 'b', text: '36', isCorrect: false },
      { id: 'c', text: '30', isCorrect: false },
      { id: 'd', text: '42', isCorrect: false },
    ],
    explanation: 'Each term is multiplied by 2 (doubled): 24 × 2 = 48.',
  },
];

// 17. LOGIC LAB (Class 3 Game #17)
export const CLASS3_LOGIC_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_log_1',
    prompt: 'If ALL robins are birds, and ALL birds have feathers, what can we logically conclude about robins?',
    contextEmoji: '🦅',
    options: [
      { id: 'a', text: 'All robins have feathers', isCorrect: true },
      { id: 'b', text: 'Robins cannot fly', isCorrect: false },
      { id: 'c', text: 'Only some robins have feathers', isCorrect: false },
      { id: 'd', text: 'Robins are mammals', isCorrect: false },
    ],
    explanation: 'By deductive logic: Robin -> Bird -> Feathers, therefore every robin has feathers.',
  },
];

// 18. GEOGRAPHY QUEST (Class 3 Game #18)
export const CLASS3_GEOGRAPHY_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_geo_1',
    prompt: 'What is the name of the largest and deepest ocean on planet Earth?',
    contextEmoji: '🌊',
    options: [
      { id: 'a', text: 'Pacific Ocean', isCorrect: true },
      { id: 'b', text: 'Atlantic Ocean', isCorrect: false },
      { id: 'c', text: 'Indian Ocean', isCorrect: false },
      { id: 'd', text: 'Arctic Ocean', isCorrect: false },
    ],
    explanation: 'The Pacific Ocean covers more than 30% of Earth\'s surface and is the largest ocean.',
  },
];

// 19. SPACE EXPLORER (Class 3 Game #19)
export const CLASS3_SPACE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_sp_1',
    prompt: 'Which planet is known as the "Red Planet" because of iron oxide dust on its surface?',
    contextEmoji: '🪐',
    options: [
      { id: 'a', text: 'Mars', isCorrect: true },
      { id: 'b', text: 'Venus', isCorrect: false },
      { id: 'c', text: 'Jupiter', isCorrect: false },
      { id: 'd', text: 'Mercury', isCorrect: false },
    ],
    explanation: 'Mars appears reddish-orange due to iron-rich rust dust across its landscapes.',
  },
  {
    id: 'c3_sp_2',
    prompt: 'What is the glowing center of our solar system, around which all planets revolve?',
    contextEmoji: '☀️',
    options: [
      { id: 'a', text: 'The Sun (a star)', isCorrect: true },
      { id: 'b', text: 'The Moon', isCorrect: false },
      { id: 'c', text: 'Jupiter', isCorrect: false },
      { id: 'd', text: 'Polaris', isCorrect: false },
    ],
    explanation: 'The Sun is a giant yellow dwarf star whose gravity holds our solar system together.',
  },
];

// 20. KNOWLEDGE BATTLE (Class 3 Game #20)
export const CLASS3_KNOWLEDGE_BATTLE_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c3_champ_1',
    prompt: 'Maths: What is 250 + 750 = ?',
    contextEmoji: '➕',
    options: [
      { id: 'a', text: '1,000', isCorrect: true },
      { id: 'b', text: '900', isCorrect: false },
      { id: 'c', text: '1,050', isCorrect: false },
      { id: 'd', text: '950', isCorrect: false },
    ],
    explanation: '250 + 750 = 1,000.',
  },
  {
    id: 'c3_champ_2',
    prompt: 'Science: What do we call an animal that eats ONLY plants (like a deer or rabbit)?',
    contextEmoji: '🦌',
    options: [
      { id: 'a', text: 'Herbivore', isCorrect: true },
      { id: 'b', text: 'Carnivore', isCorrect: false },
      { id: 'c', text: 'Omnivore', isCorrect: false },
      { id: 'd', text: 'Decomposer', isCorrect: false },
    ],
    explanation: 'Herbivores eat vegetation/plants. Carnivores eat meat, and omnivores eat both.',
  },
];
