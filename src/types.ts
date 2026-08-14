export type GradeLevel = 'ukg' | 'lkg' | 'nursery';

export type GameModule =
  | 'ukg_home'
  | 'reading'
  | 'number_kingdom'
  | 'math_mountain'
  | 'puzzle_planet'
  | 'badges'
  | 'parent'
  | 'characters'
  | 'home'
  | 'abc'
  | 'numbers'
  | 'objects'
  | 'patterns'
  | 'colors'
  | 'shapes'
  | 'sounds'
  | 'counting';

// UKG Activity Types
export type ReadingActivity = 'word_match' | 'missing_letter' | 'word_builder' | 'sentence_story' | 'listen_choose';
export type NumberKingdomActivity = 'explore_100' | 'before_after' | 'missing_100' | 'greater_less' | 'train_order';
export type MathMountainActivity = 'visual_addition' | 'removal_subtraction' | 'treasure_chest' | 'feed_monster' | 'cross_bridge';
export type PuzzlePlanetActivity = 'odd_one_out' | 'memory_match' | 'pattern_complete' | 'category_sorter' | 'shadow_match';

// LKG & Nursery Activity Types
export type AbcActivity = 'explore' | 'quiz' | 'beginning_sound' | 'tracing';
export type NumberActivity = 'count_match' | 'missing' | 'ordering';
export type ObjectActivity = 'explore' | 'find_object' | 'category_match';
export type PatternActivity = 'train_puzzle' | 'create';
export type ColorActivity = 'quiz' | 'coloring' | 'mixing';
export type ShapeActivity = 'identify' | 'sorter' | 'builder';
export type SoundActivity = 'soundboard' | 'guess' | 'band';
export type CountingActivity = 'count' | 'pop' | 'feed';

// Character Companion
export interface CharacterCompanion {
  id: string;
  name: string;
  title?: string;
  role?: string;
  avatar: string;
  greeting: string;
  color: string;
  unlocked?: boolean;
  requiredStars?: number;
  unlockedAtStars?: number;
  grade?: 'ukg' | 'lkg' | 'nursery' | 'all';
}

// Badge
export interface Badge {
  id: string;
  name: string;
  category: 'reading' | 'number_kingdom' | 'math_mountain' | 'puzzle_planet' | 'abc' | 'numbers' | 'objects' | 'patterns' | 'colors' | 'shapes' | 'sounds' | 'counting' | 'special';
  icon: string;
  description: string;
  color: string;
  unlocked: boolean;
  requiredStars: number;
  grade?: 'ukg' | 'lkg' | 'nursery' | 'all';
}

// Parent Learning Analytics
export interface ParentProgressData {
  timeSpentSeconds: number;
  gamesCompleted: {
    reading: number;
    number_kingdom: number;
    math_mountain: number;
    puzzle_planet: number;
  };
  accuracy: {
    reading: number;
    number_kingdom: number;
    math_mountain: number;
    puzzle_planet: number;
  };
  totalAttempts: number;
  correctAttempts: number;
  starsEarned: number;
  coinsEarned: number;
  strengths: string[];
  needsPractice: string[];
  lastSessionDate: string;
}

// ----------------- UKG Reading Forest Data Types -----------------
export interface ReadingWordItem {
  id: string;
  word: string;
  phonics: string;
  emoji: string;
  hint: string;
  category: 'cvc' | 'animals' | 'nature' | 'food' | 'objects';
  options?: string[];
}

export interface MissingLetterItem {
  id: string;
  fullWord: string;
  displayWord: string; // e.g. "C _ T"
  missingIndex: number;
  correctLetter: string;
  emoji: string;
  options: string[];
  hint: string;
}

export interface WordBuilderItem {
  id: string;
  word: string;
  emoji: string;
  hint: string;
  scrambledLetters: string[];
}

export interface ReadingSentenceStory {
  id: string;
  sentence: string;
  highlightWord: string;
  emoji: string;
  question: string;
  options: { text: string; emoji: string }[];
  correctIndex: number;
  hint: string;
}

export interface ListeningWordItem {
  id: string;
  word: string;
  emoji: string;
  spokenAudio: string;
  options: string[];
  correctWord: string;
}

// ----------------- UKG Number Kingdom Data Types -----------------
export interface NumberHundredItem {
  number: number;
  tens: number;
  units: number;
  word: string;
  emoji: string;
}

export interface BeforeAfterItem {
  id: string;
  type: 'after' | 'before' | 'between';
  targetNumber: number;
  secondNumber?: number; // for 'between'
  promptText: string;
  options: number[];
  correctAnswer: number;
  visualItems?: { emoji: string; count: number };
}

export interface MissingHundredItem {
  id: string;
  sequence: (number | null)[];
  missingIndex: number;
  correctAnswer: number;
  options: number[];
  hint: string;
}

export interface GreaterLessItem {
  id: string;
  num1: number;
  num2: number;
  emoji: string;
  prompt: string;
  relation: '>' | '<' | '=';
  hint: string;
}

export interface TrainOrderItem {
  id: string;
  numbers: number[];
  sortedOrder: number[];
  hint: string;
}

// ----------------- UKG Math Mountain Data Types -----------------
export interface VisualMathProblem {
  id: string;
  type: 'addition' | 'subtraction';
  num1: number;
  num2: number;
  operator: '+' | '-';
  emoji: string;
  answer: number;
  options: number[];
  hint: string;
}

export interface TreasureChestProblem {
  id: string;
  problemText: string;
  emoji: string;
  answer: number;
  chests: { label: string; value: number; isGold?: boolean }[];
  hint: string;
}

export interface MonsterFeedProblem {
  id: string;
  monsterName: string;
  monsterAvatar: string;
  num1: number;
  num2: number;
  totalNeeded: number;
  foodEmoji: string;
  foodName: string;
  prompt: string;
}

export interface BridgeStepProblem {
  id: string;
  stepNumber: number;
  num1: number;
  num2: number;
  operator: '+' | '-';
  answer: number;
  options: number[];
  hint: string;
}

// ----------------- UKG Puzzle Planet Data Types -----------------
export interface OddOneOutItem {
  id: string;
  items: { label: string; emoji: string; category: string }[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface MemoryPairItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface SequencePatternItem {
  id: string;
  patternType: 'AB' | 'AAB' | 'ABB' | 'ABC' | 'COUNT';
  sequence: { label: string; emoji?: string; color?: string }[];
  options: { label: string; emoji?: string; color?: string }[];
  correctIndex: number;
  hint: string;
}

export interface SortingBinItem {
  id: string;
  bin1: { name: string; icon: string; color: string; acceptCategory: string };
  bin2: { name: string; icon: string; color: string; acceptCategory: string };
  items: { id: string; name: string; emoji: string; category: string }[];
}

export interface ShadowMatchItem {
  id: string;
  name: string;
  emoji: string;
  silhouette: string;
  options: { name: string; emoji: string }[];
  correctIndex: number;
}

// ----------------- LKG & Nursery Legacy Types -----------------
export interface DailyChallengeTask {
  id: string;
  title: string;
  world: 'abc' | 'numbers' | 'objects' | 'patterns' | 'reading' | 'number_kingdom' | 'math_mountain' | 'puzzle_planet';
  icon: string;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  rewardStars: number;
}

export interface AbcLetter {
  letter: string;
  lowercase: string;
  word: string;
  emoji: string;
  phonics: string;
  soundHint: string;
  otherWords: { word: string; emoji: string }[];
  color: string;
  tracingGuide: {
    strokes: { x: number; y: number }[][];
  };
}

export interface NumberItem {
  num: number;
  word: string;
  emoji: string;
  groupName: string;
  color: string;
}

export type ObjectCategoryType = 'animals' | 'fruits' | 'vehicles' | 'toys' | 'body_parts' | 'household';

export interface ObjectItem {
  id: string;
  name: string;
  emoji: string;
  category: ObjectCategoryType;
  hint: string;
  funFact: string;
}

export interface PatternQuestion {
  id: string;
  type: 'AB' | 'AAB' | 'ABB' | 'ABC' | 'NUM';
  title: string;
  sequence: { label: string; emoji?: string; color?: string }[];
  options: { label: string; emoji?: string; color?: string }[];
  correctIndex: number;
  hint: string;
}

export interface AnimalInfo {
  id: string;
  name: string;
  soundName: string;
  emoji: string;
  color: string;
  soundEffect: string;
  fact: string;
  promptVoice: string;
}

export interface ShapeInfo {
  id: string;
  name: string;
  color: string;
  sides: number;
  realWorldExamples: {
    name: string;
    emoji: string;
  }[];
}

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindBorder: string;
  examples: {
    name: string;
    emoji: string;
  }[];
}
