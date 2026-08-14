// Class 5 Question Banks and Interactive Data (20 Mini-Games)
// Age 10–11 Curriculum: Advanced multi-step word problems, PEMDAS, algebraic reasoning, data plots, geometry (area/volume), Greek/Latin roots, grammar master, scientific variables, Earth systems, and global geography.

import { CurriculumGameItem } from './class2GamesData';

// 1. READING MASTER (Class 5 Game #1)
export const CLASS5_READING_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c5_read_1',
    passage: 'Deep in the twilight zone of the ocean, where sunlight barely penetrates, bioluminescent creatures flourish. The anglerfish utilizes a modified dorsal fin that glows with the aid of symbiotic bioluminescent bacteria. In the pitch-black abyss, curious prey approach the flickering lure, only to be snapped up by the predator\'s needle-sharp teeth.',
    prompt: 'How does the anglerfish produce the glowing light at the tip of its dorsal lure?',
    options: [
      { id: 'a', text: 'Through symbiotic bioluminescent bacteria', isCorrect: true },
      { id: 'b', text: 'By absorbing electric currents from ocean vents', isCorrect: false },
      { id: 'c', text: 'By eating glowing jellyfish', isCorrect: false },
      { id: 'd', text: 'By reflecting sunlight from the surface', isCorrect: false },
    ],
    explanation: 'The passage explicitly explains that the anglerfish\'s lure glows due to symbiotic bioluminescent bacteria living within the lure tissue.',
  },
  {
    id: 'c5_read_2',
    passage: 'The Rosetta Stone, carved in 196 BCE and rediscovered by French soldiers in Egypt in 1799, proved to be the ultimate linguistic key. It featured the exact same royal decree written in three distinct scripts: Ancient Egyptian Hieroglyphics, Demotic script, and Ancient Greek.',
    prompt: 'Why were scholars able to decipher the hieroglyphics on the Rosetta Stone?',
    options: [
      { id: 'a', text: 'The decree was duplicated in known Ancient Greek script', isCorrect: true },
      { id: 'b', text: 'The stone contained a modern English dictionary', isCorrect: false },
      { id: 'c', text: 'It had pictures explaining every letter', isCorrect: false },
      { id: 'd', text: 'Computer algorithms translated the code', isCorrect: false },
    ],
    explanation: 'Because the same royal message was written in Ancient Greek alongside the hieroglyphs, linguists could map known Greek words to the unknown hieroglyphic symbols.',
  },
];

// 2. GRAMMAR MASTER (Class 5 Game #2)
export const CLASS5_GRAMMAR_ITEMS: CurriculumGameItem[] = [
  {
    id: 'c5_gram_1',
    prompt: 'Identify the PASSIVE VOICE sentence among the choices:',
    options: [
      { id: 'a', text: 'The intricate tapestry was woven by skilled artisans.', isCorrect: true },
      { id: 'b', text: 'Skilled artisans wove the intricate tapestry.', isCorrect: false },
      { id: 'c', text: 'The artisans are weaving a colorful pattern.', isCorrect: false },
      { id: 'd', text: 'The weavers displayed their beautiful art.', isCorrect: false },
    ],
    explanation: 'In passive voice, the subject receives the action ("The tapestry was woven by...").',
  },
  {
    id: 'c5_gram_2',
    prompt: 'Which modal auxiliary verb expresses strong NECESSITY or OBLIGATION?',
    options: [
      { id: 'a', text: 'must', isCorrect: true },
      { id: 'b', text: 'might', isCorrect: false },
      { id: 'c', text: 'could', isCorrect: false },
      { id: 'd', text: 'may', isCorrect: false },
    ],
    explanation: '"Must" indicates absolute obligation or essential requirement.',
  },
];

// 3. SENTENCE CORRECTION (Class 5 Game #3)
export const CLASS5_SENTENCE_CORRECTION: CurriculumGameItem[] = [
  {
    id: 'c5_sc_1',
    prompt: 'Correct the subject-verb agreement: "Each of the scientific instruments (are / is) calibrated carefully."',
    options: [
      { id: 'a', text: 'is (because "Each" is singular)', isCorrect: true },
      { id: 'b', text: 'are (because "instruments" is plural)', isCorrect: false },
      { id: 'c', text: 'were (always past tense)', isCorrect: false },
      { id: 'd', text: 'be', isCorrect: false },
    ],
    explanation: '"Each" is an indefinite singular pronoun, requiring the singular verb "is".',
  },
];

// 4. STORY BUILDER (Class 5 Game #4)
export const CLASS5_STORY_BUILDER: CurriculumGameItem[] = [
  {
    id: 'c5_sb_1',
    prompt: 'Which transition phrase best introduces a contrasting argument in persuasive writing?',
    options: [
      { id: 'a', text: 'On the other hand, / However,', isCorrect: true },
      { id: 'b', text: 'Furthermore, / In addition,', isCorrect: false },
      { id: 'c', text: 'For example,', isCorrect: false },
      { id: 'd', text: 'In conclusion,', isCorrect: false },
    ],
    explanation: '"On the other hand" and "However" signal a counterpoint or contrasting perspective.',
  },
];

// 5. VOCABULARY MASTER (Class 5 Game #5)
export const CLASS5_VOCABULARY: CurriculumGameItem[] = [
  {
    id: 'c5_voc_1',
    prompt: 'The Greek root "CHRONO" in words like "chronology", "chronometer", and "synchronize" means:',
    options: [
      { id: 'a', text: 'Time', isCorrect: true },
      { id: 'b', text: 'Light', isCorrect: false },
      { id: 'c', text: 'Earth', isCorrect: false },
      { id: 'd', text: 'Sound', isCorrect: false },
    ],
    explanation: 'The root "chrono-" comes from the Greek word for time.',
  },
  {
    id: 'c5_voc_2',
    prompt: 'What does the Latin root "TRACT" in "attract", "distract", and "traction" mean?',
    options: [
      { id: 'a', text: 'To pull or draw', isCorrect: true },
      { id: 'b', text: 'To push', isCorrect: false },
      { id: 'c', text: 'To speak', isCorrect: false },
      { id: 'd', text: 'To build', isCorrect: false },
    ],
    explanation: 'Tract comes from Latin "trahere" meaning to draw or pull.',
  },
];

// 6. MULTI-STEP MATHS (Class 5 Game #6)
export const CLASS5_MULTISTEP_MATHS: CurriculumGameItem[] = [
  {
    id: 'c5_ms_1',
    prompt: 'A bakery bakes 24 trays of muffins with 18 muffins per tray. They sell 350 muffins. How many muffins remain?',
    contextEmoji: '🧁',
    options: [
      { id: 'a', text: '82 muffins (432 - 350 = 82)', isCorrect: true },
      { id: 'b', text: '92 muffins', isCorrect: false },
      { id: 'c', text: '72 muffins', isCorrect: false },
      { id: 'd', text: '112 muffins', isCorrect: false },
    ],
    explanation: 'Total baked = 24 × 18 = 432. Remaining = 432 - 350 = 82 muffins.',
  },
];

// 7. PEMDAS & ORDER OF OPERATIONS (Class 5 Game #7)
export const CLASS5_PEMDAS: CurriculumGameItem[] = [
  {
    id: 'c5_ord_1',
    prompt: 'Evaluate: 12 + 4 × (8 - 3)² ÷ 10 = ?',
    contextEmoji: '🧮',
    options: [
      { id: 'a', text: '22', isCorrect: true },
      { id: 'b', text: '32', isCorrect: false },
      { id: 'c', text: '18', isCorrect: false },
      { id: 'd', text: '40', isCorrect: false },
    ],
    explanation: 'Parentheses: (8 - 3) = 5. Exponent: 5² = 25. Multiply/Divide left to right: 4 × 25 = 100, 100 ÷ 10 = 10. Add: 12 + 10 = 22.',
  },
  {
    id: 'c5_ord_2',
    prompt: 'Solve: 50 - 3 × 6 + 8 ÷ 2 = ?',
    contextEmoji: '🧮',
    options: [
      { id: 'a', text: '36', isCorrect: true },
      { id: 'b', text: '42', isCorrect: false },
      { id: 'c', text: '30', isCorrect: false },
      { id: 'd', text: '44', isCorrect: false },
    ],
    explanation: 'Multiplication/division first: 3 × 6 = 18; 8 ÷ 2 = 4. Then addition/subtraction: 50 - 18 + 4 = 36.',
  },
];

// 8. LONG DIVISION (Class 5 Game #8)
export const CLASS5_DIVISION: CurriculumGameItem[] = [
  {
    id: 'c5_div_1',
    prompt: 'Solve: 1,872 ÷ 24 = ?',
    contextEmoji: '➗',
    options: [
      { id: 'a', text: '78', isCorrect: true },
      { id: 'b', text: '76', isCorrect: false },
      { id: 'c', text: '82', isCorrect: false },
      { id: 'd', text: '74', isCorrect: false },
    ],
    explanation: '24 × 70 = 1,680; 1,872 - 1,680 = 192; 24 × 8 = 192; Quotient is 78.',
  },
];

// 9. FRACTION OPERATIONS (Class 5 Game #9)
export const CLASS5_FRACTIONS: CurriculumGameItem[] = [
  {
    id: 'c5_fr_1',
    prompt: 'Solve: 2/3 + 3/4 = ? (Find common denominator)',
    contextEmoji: '🍰',
    options: [
      { id: 'a', text: '17/12 (or 1 5/12)', isCorrect: true },
      { id: 'b', text: '5/7', isCorrect: false },
      { id: 'c', text: '1 1/4', isCorrect: false },
      { id: 'd', text: '13/12', isCorrect: false },
    ],
    explanation: 'LCD of 3 and 4 is 12: 8/12 + 9/12 = 17/12 = 1 5/12.',
  },
  {
    id: 'c5_fr_2',
    prompt: 'Multiply: (3/5) × (2/7) = ?',
    contextEmoji: '✖️',
    options: [
      { id: 'a', text: '6/35', isCorrect: true },
      { id: 'b', text: '5/12', isCorrect: false },
      { id: 'c', text: '21/10', isCorrect: false },
      { id: 'd', text: '6/12', isCorrect: false },
    ],
    explanation: 'Multiply numerators and denominators: (3 × 2) / (5 × 7) = 6/35.',
  },
];

// 10. DECIMALS & PERCENTAGES (Class 5 Game #10)
export const CLASS5_DECIMALS: CurriculumGameItem[] = [
  {
    id: 'c5_dec_1',
    prompt: 'Convert 0.65 into a percentage and a simplified fraction:',
    contextEmoji: '💯',
    options: [
      { id: 'a', text: '65% and 13/20', isCorrect: true },
      { id: 'b', text: '6.5% and 65/10', isCorrect: false },
      { id: 'c', text: '65% and 3/4', isCorrect: false },
      { id: 'd', text: '56% and 13/20', isCorrect: false },
    ],
    explanation: '0.65 × 100 = 65%. In fraction form: 65/100 = 13/20.',
  },
];

// 11. DATA DETECTIVE (Class 5 Game #11)
export const CLASS5_DATA: CurriculumGameItem[] = [
  {
    id: 'c5_data_1',
    prompt: 'Find the MEAN (average) of this data set: 12, 18, 15, 25, 30',
    contextEmoji: '📊',
    options: [
      { id: 'a', text: '20 (Sum 100 ÷ 5)', isCorrect: true },
      { id: 'b', text: '18', isCorrect: false },
      { id: 'c', text: '22', isCorrect: false },
      { id: 'd', text: '25', isCorrect: false },
    ],
    explanation: 'Sum = 12 + 18 + 15 + 25 + 30 = 100. Mean = 100 / 5 = 20.',
  },
];

// 12. GEOMETRY MASTER (Class 5 Game #12)
export const CLASS5_GEOMETRY: CurriculumGameItem[] = [
  {
    id: 'c5_geo_1',
    prompt: 'What is the volume of a rectangular prism with length 6 cm, width 4 cm, and height 5 cm?',
    contextEmoji: '📦',
    options: [
      { id: 'a', text: '120 cm³ (6 × 4 × 5)', isCorrect: true },
      { id: 'b', text: '74 cm²', isCorrect: false },
      { id: 'c', text: '60 cm³', isCorrect: false },
      { id: 'd', text: '150 cm³', isCorrect: false },
    ],
    explanation: 'Volume = Length × Width × Height = 6 × 4 × 5 = 120 cm³.',
  },
];

// 13. MONEY CHALLENGE (Class 5 Game #13)
export const CLASS5_MONEY: CurriculumGameItem[] = [
  {
    id: 'c5_mon_1',
    prompt: 'A jacket originally costing $80 is on a 25% discount sale. What is the final sale price?',
    contextEmoji: '🏷️',
    options: [
      { id: 'a', text: '$60 ($80 - $20)', isCorrect: true },
      { id: 'b', text: '$55', isCorrect: false },
      { id: 'c', text: '$65', isCorrect: false },
      { id: 'd', text: '$70', isCorrect: false },
    ],
    explanation: '25% of $80 is $20 discount. Final price = $80 - $20 = $60.',
  },
];

// 14. SCIENCE DETECTIVE (Class 5 Game #14)
export const CLASS5_SCIENCE_DETECTIVE: CurriculumGameItem[] = [
  {
    id: 'c5_sd_1',
    prompt: 'In a controlled science experiment, what do we call the one factor that the scientist deliberately changes?',
    contextEmoji: '🔬',
    options: [
      { id: 'a', text: 'Independent Variable', isCorrect: true },
      { id: 'b', text: 'Dependent Variable', isCorrect: false },
      { id: 'c', text: 'Controlled Constant', isCorrect: false },
      { id: 'd', text: 'Hypothesis', isCorrect: false },
    ],
    explanation: 'The independent variable is intentionally altered to observe its effect on the dependent variable.',
  },
];

// 15. EARTH & ENVIRONMENT (Class 5 Game #15)
export const CLASS5_EARTH_ENV: CurriculumGameItem[] = [
  {
    id: 'c5_ee_1',
    prompt: 'Which atmospheric layer contains the ozone layer that protects Earth from harmful solar ultraviolet (UV) radiation?',
    contextEmoji: '🛡️',
    options: [
      { id: 'a', text: 'Stratosphere', isCorrect: true },
      { id: 'b', text: 'Troposphere', isCorrect: false },
      { id: 'c', text: 'Mesosphere', isCorrect: false },
      { id: 'd', text: 'Thermosphere', isCorrect: false },
    ],
    explanation: 'The ozone layer sits in the stratosphere, absorbing high-energy UV radiation from the sun.',
  },
];

// 16. HUMAN BODY CHALLENGE (Class 5 Game #16)
export const CLASS5_HUMAN_BODY: CurriculumGameItem[] = [
  {
    id: 'c5_hb_1',
    prompt: 'Which body system produces chemical messenger hormones (like insulin and adrenaline) that regulate growth and metabolism?',
    contextEmoji: '🩸',
    options: [
      { id: 'a', text: 'Endocrine System', isCorrect: true },
      { id: 'b', text: 'Nervous System', isCorrect: false },
      { id: 'c', text: 'Immune System', isCorrect: false },
      { id: 'd', text: 'Skeletal System', isCorrect: false },
    ],
    explanation: 'The endocrine system comprises hormone-secreting glands (like thyroid, pancreas, and adrenal glands).',
  },
];

// 17. ENERGY LAB (Class 5 Game #17)
export const CLASS5_ENERGY: CurriculumGameItem[] = [
  {
    id: 'c5_en_1',
    prompt: 'A roller coaster car at the very peak of a tall track before descending possesses high:',
    contextEmoji: '🎢',
    options: [
      { id: 'a', text: 'Gravitational Potential Energy', isCorrect: true },
      { id: 'b', text: 'Kinetic Energy', isCorrect: false },
      { id: 'c', text: 'Thermal Energy', isCorrect: false },
      { id: 'd', text: 'Nuclear Energy', isCorrect: false },
    ],
    explanation: 'At maximum height, gravitational potential energy is highest; as it drops, it converts to kinetic energy (motion).',
  },
];

// 18. WORLD MAP CHALLENGE (Class 5 Game #18)
export const CLASS5_WORLD_MAP: CurriculumGameItem[] = [
  {
    id: 'c5_wm_1',
    prompt: 'Which is the longest river in the world, flowing through northeastern Africa?',
    contextEmoji: '🌊',
    options: [
      { id: 'a', text: 'Nile River', isCorrect: true },
      { id: 'b', text: 'Amazon River', isCorrect: false },
      { id: 'c', text: 'Yangtze River', isCorrect: false },
      { id: 'd', text: 'Mississippi River', isCorrect: false },
    ],
    explanation: 'The Nile River is approximately 6,650 km long, making it widely recognized as Earth\'s longest river.',
  },
];

// 19. ULTIMATE LOGIC CHALLENGE (Class 5 Game #19)
export const CLASS5_ULTIMATE_LOGIC: CurriculumGameItem[] = [
  {
    id: 'c5_log_1',
    prompt: 'If 3 cats can catch 3 mice in 3 minutes, how many minutes does it take 100 cats to catch 100 mice?',
    contextEmoji: '🐱',
    options: [
      { id: 'a', text: '3 minutes (1 cat catches 1 mouse in 3 min)', isCorrect: true },
      { id: 'b', text: '100 minutes', isCorrect: false },
      { id: 'c', text: '300 minutes', isCorrect: false },
      { id: 'd', text: '1 minute', isCorrect: false },
    ],
    explanation: 'Each cat takes 3 minutes to catch 1 mouse. Working simultaneously, 100 cats will catch 100 mice in 3 minutes.',
  },
];

// 20. CLASS 5 CHAMPIONSHIP (Class 5 Game #20)
export const CLASS5_CHAMPIONSHIP: CurriculumGameItem[] = [
  {
    id: 'c5_champ_1',
    prompt: 'Solve: If 2x + 7 = 25, what is the value of x?',
    contextEmoji: '👑',
    options: [
      { id: 'a', text: 'x = 9 (2x = 18 -> x = 9)', isCorrect: true },
      { id: 'b', text: 'x = 16', isCorrect: false },
      { id: 'c', text: 'x = 8', isCorrect: false },
      { id: 'd', text: 'x = 12', isCorrect: false },
    ],
    explanation: 'Subtract 7 from both sides: 2x = 18. Divide by 2: x = 9.',
  },
  {
    id: 'c5_champ_2',
    prompt: 'Science: What organelle is known as the "powerhouse of the eukaryotic cell" because it generates ATP energy?',
    contextEmoji: '⚡',
    options: [
      { id: 'a', text: 'Mitochondria', isCorrect: true },
      { id: 'b', text: 'Nucleus', isCorrect: false },
      { id: 'c', text: 'Ribosome', isCorrect: false },
      { id: 'd', text: 'Chloroplast', isCorrect: false },
    ],
    explanation: 'Mitochondria perform cellular respiration to produce adenosine triphosphate (ATP) chemical energy.',
  },
];
