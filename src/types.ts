export type GradeLevel = 'nursery' | 'lkg' | 'ukg' | 'class1' | 'class2' | 'class3' | 'class4' | 'class5';

export interface UserProfile {
  name: string;
  grade: GradeLevel;
  avatarEmoji: string;
  isOnboarded: boolean;
  streakDays: number;
  lastVisitDate: string;
}

export interface GameScoreRecord {
  bestScore: number;
  stars: number;
  coins: number;
  plays: number;
  accuracy: number;
  lastPlayedDate: string;
}

export interface SafePlayerProfile {
  version: number;
  player: {
    id: string;
    name: string;
    grade: GradeLevel;
    avatarEmoji: string;
    isOnboarded: boolean;
    streakDays: number;
    lastVisitDate: string;
    selectedCompanion: string;
    unlockedCharacters: string[];
    unlockedBadges: string[];
    trophies: string[];
  };
  progress: {
    completedGameIds: string[];
    gameScores: Record<string, GameScoreRecord>;
    currentGrade: GradeLevel;
    currentWorld: string;
    lastPlayedGameId: string | null;
    lastPlayedTimestamp?: number;
  };
  rewards: {
    stars: number;
    coins: number;
    badges: string[];
    trophies: string[];
  };
  performance: ParentProgressData;
  settings: {
    sound: boolean;
    music: boolean;
    voice: boolean;
  };
  dailyMission: DailyMissionState;
}

export type GameCategory = 'all' | 'english' | 'maths' | 'logic' | 'science' | 'creative';

export type DifficultyLevel = 'easy' | 'medium' | 'challenge';

export interface GameMetadata {
  id: string;
  grade: GradeLevel;
  number: number;
  title: string;
  icon: string;
  category: 'english' | 'maths' | 'logic' | 'science' | 'creative';
  objective: string;
  skill: string;
  instructions: string;
  voicePrompt: string;
  difficulty: DifficultyLevel;
  badgeRewardId?: string;
  componentKey: string;
}

export type GameModule =
  | 'home'
  | 'game_player'
  | 'badges'
  | 'parent'
  | 'daily_mission'
  | 'reading'
  | 'number_kingdom'
  | 'math_mountain'
  | 'puzzle_planet'
  | 'colors'
  | 'shapes'
  | 'sounds'
  | 'counting'
  | 'abc'
  | 'numbers'
  | 'objects'
  | 'patterns';

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
  grade?: GradeLevel | 'all';
}

// Badge
export interface Badge {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  color: string;
  unlocked: boolean;
  requiredStars: number;
  grade?: GradeLevel | 'all';
}

// Daily Mission Item
export interface DailyMissionItem {
  gameId: string;
  title: string;
  icon: string;
  category: 'english' | 'maths' | 'logic' | 'science' | 'creative';
  grade: GradeLevel;
  completed: boolean;
}

export interface DailyMissionState {
  date: string;
  items: DailyMissionItem[];
  completedCount: number;
  bonusClaimed: boolean;
}

// Subject Mastery for Parent Analytics
export interface SubjectMastery {
  subject: string;
  icon: string;
  stars: number; // out of 5
  accuracy: number; // %
  gamesPlayed: number;
  status: 'Mastered' | 'Proficient' | 'Learning' | 'Needs Practice';
}

// Parent Learning Analytics
export interface ParentProgressData {
  timeSpentSeconds: number;
  totalAttempts: number;
  correctAttempts: number;
  starsEarned: number;
  coinsEarned: number;
  gamesCompletedCount?: number;
  gamesCompleted?: number | Record<string, number>;
  accuracy?: number | Record<string, number>;
  completedGameIds?: string[];
  gradeProgress?: Record<GradeLevel, { played: number; mastered: number }>;
  subjectStats?: {
    english: { attempts: number; correct: number; gamesPlayed: number };
    maths: { attempts: number; correct: number; gamesPlayed: number };
    logic: { attempts: number; correct: number; gamesPlayed: number };
    science: { attempts: number; correct: number; gamesPlayed: number };
    creative: { attempts: number; correct: number; gamesPlayed: number };
  };
  strengths?: string[];
  needsPractice?: string[];
  lastSessionDate?: string;
}

// Legacy Activity Types
export type ColorActivity = 'learn' | 'identify' | 'coloring';
export type ShapeActivity = 'learn' | 'match' | 'puzzle';
export type SoundActivity = 'explore' | 'identify';
export type CountingActivity = 'learn' | 'count' | 'match';

export type AbcActivity = 'explore' | 'match' | 'phonics' | 'tracing';
export type NumberActivity = 'explore' | 'count' | 'missing' | 'order';
export type ObjectActivity = 'fruits_veggies' | 'vehicles' | 'body_parts' | 'animals';
export type PatternActivity = 'color_patterns' | 'shape_patterns' | 'size_sort';

export type ReadingActivity = 'explore' | 'match' | 'missing' | 'arrange' | 'sentences' | 'listening';
export type NumberKingdomActivity = 'explore' | 'before_after' | 'missing_hundred' | 'greater_less' | 'train_order';
export type MathMountainActivity = 'explore' | 'addition' | 'subtraction' | 'treasure_chest' | 'monster_feed' | 'bridge';
export type PuzzlePlanetActivity = 'explore' | 'odd_one_out' | 'memory' | 'patterns' | 'sorting' | 'shadow_match';

// Legacy Item Interfaces
export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  tailwindBg: string;
  tailwindText: string;
  tailwindBorder: string;
  examples?: { name: string; emoji: string }[];
}

export interface ShapeInfo {
  id: string;
  name: string;
  color: string;
  path?: string;
  corners?: number;
  sides?: number;
  examples?: { name: string; emoji: string }[];
  realWorldExamples?: { name: string; emoji: string }[];
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

export interface AbcLetter {
  letter: string;
  lowercase?: string;
  word: string;
  emoji: string;
  sound?: string;
  phonics: string;
  soundHint?: string;
  otherWords?: { word: string; emoji: string }[];
  category?: string;
  color?: string;
  strokePath?: string;
  tracingGuide?: string | { strokes: { x: number; y: number }[][] };
}

export interface NumberItem {
  number?: number;
  num?: number;
  word: string;
  emoji: string;
  countEmoji?: string;
  groupName?: string;
  color: string;
}

export type ObjectCategoryType = 'fruits_veggies' | 'vehicles' | 'body_parts' | 'animals' | 'household' | string;

export interface ObjectItem {
  id: string;
  name: string;
  category: ObjectCategoryType;
  emoji: string;
  color?: string;
  fact?: string;
  funFact?: string;
  hint?: string;
}

export interface PatternQuestion {
  id: string;
  title?: string;
  type: 'color' | 'shape' | 'size' | string;
  sequence: { label: string; emoji?: string; color?: string }[];
  options: { label: string; emoji?: string; color?: string }[];
  correctAnswer?: string;
  correctIndex?: number;
  hint: string;
}

export interface DailyChallengeTask {
  id: string;
  title: string;
  description?: string;
  icon: string;
  module?: GameModule;
  world?: string;
  targetCount?: number;
  currentCount?: number;
  completed: boolean;
  rewardStars: number;
}

export interface ReadingWordItem {
  id: string;
  word: string;
  emoji: string;
  category: string;
  audioPrompt?: string;
  phonics?: string;
  hint?: string;
  options?: string[];
}

export interface MissingLetterItem {
  id: string;
  fullWord: string;
  displayWord: string;
  missingLetter?: string;
  correctLetter?: string;
  missingIndex?: number;
  options: string[];
  emoji: string;
  hint?: string;
}

export interface WordBuilderItem {
  id: string;
  word: string;
  emoji: string;
  scrambled?: string[];
  scrambledLetters?: string[];
  hint?: string;
}

export interface ReadingSentenceStory {
  id: string;
  sentence: string;
  question: string;
  options: string[] | { text: string; emoji: string }[];
  correctAnswer?: string;
  correctIndex?: number;
  emoji: string;
  highlightWord?: string;
  hint?: string;
}

export interface ListeningWordItem {
  id: string;
  spokenWord?: string;
  spokenAudio?: string;
  word?: string;
  phonics?: string;
  options: string[];
  correctAnswer?: string;
  correctWord?: string;
  emoji: string;
  hint?: string;
}

export interface BeforeAfterItem {
  id: string;
  targetNumber: number;
  secondNumber?: number;
  type: 'before' | 'after' | 'between';
  promptText?: string;
  correctAnswer: number;
  options: number[];
  hint?: string;
}

export interface MissingHundredItem {
  id: string;
  sequence: (number | null)[];
  missingNumber?: number;
  missingIndex?: number;
  correctAnswer?: number;
  options: number[];
  hint?: string;
}

export interface GreaterLessItem {
  id: string;
  num1: number;
  num2: number;
  type?: 'greater' | 'less';
  prompt?: string;
  relation?: string;
  correctAnswer?: number;
  correctSymbol?: '>' | '<' | '=';
  emoji?: string;
  emoji1?: string;
  emoji2?: string;
  hint?: string;
}

export interface TrainOrderItem {
  id: string;
  numbers: number[];
  correctOrder?: number[];
  sortedOrder?: number[];
  hint?: string;
}

export interface VisualMathProblem {
  id: string;
  num1?: number;
  num2?: number;
  operator?: '+' | '-';
  result?: number;
  emoji?: string;
  options?: number[];
  type?: string;
  visualGroup1?: string[];
  visualGroup2?: string[];
  equation?: string;
  answer?: number;
  hint?: string;
}

export interface TreasureChestProblem {
  id: string;
  prompt?: string;
  problemText?: string;
  targetSum?: number;
  coins?: number[];
  requiredCoins?: number[];
  chestEmoji?: string;
  emoji?: string;
  answer?: number;
  chests?: { label?: string; value: number; isCorrect?: boolean; emoji?: string; isGold?: boolean }[];
  options?: { value: number; label: string; isCorrect: boolean }[];
  hint?: string;
}

export interface MonsterFeedProblem {
  id: string;
  monsterName?: string;
  monsterEmoji?: string;
  monsterAvatar?: string;
  hungerCount?: number;
  foodEmoji?: string;
  foodName?: string;
  targetNumber?: number;
  equation?: string;
  options?: number[];
  answer?: number;
  totalNeeded?: number;
  prompt?: string;
  num1?: number;
  num2?: number;
  operator?: string;
  hint?: string;
}

export interface BridgeStepProblem {
  id: string;
  start?: number;
  step?: number;
  steps?: number[];
  options?: number[];
  correctNext?: number;
  stepNumber?: number;
  equation?: string;
  answer?: number;
  num1?: number;
  num2?: number;
  operator?: string;
  hint?: string;
}

export interface OddOneOutItem {
  id: string;
  items?: { label: string; emoji: string; category?: string }[];
  oddIndex?: number;
  correctIndex?: number;
  reason?: string;
  explanation?: string;
  hint?: string;
}

export interface MemoryPairItem {
  id: string;
  label?: string;
  name?: string;
  emoji: string;
  pairId?: string;
  color?: string;
}

export interface SequencePatternItem {
  id: string;
  pattern?: { label: string; emoji?: string }[];
  sequence?: { label: string; emoji?: string }[];
  patternType?: string;
  missingIndex?: number;
  options?: { label: string; emoji?: string }[];
  correctAnswer?: string;
  correctIndex?: number;
  hint?: string;
}

export interface SortingBinItem {
  id: string;
  category?: 'Living' | 'Non-Living' | 'Fruits' | 'Vehicles' | string;
  items?: { label?: string; name?: string; emoji: string; isCorrect?: boolean; id?: string; category?: string }[];
  binName?: string;
  binEmoji?: string;
  bin1?: { name: string; icon: string; color: string; acceptCategory: string };
  bin2?: { name: string; icon: string; color: string; acceptCategory: string };
}

export interface ShadowMatchItem {
  id: string;
  name?: string;
  emoji?: string;
  silhouette?: string;
  silhouetteDesc?: string;
  options?: { name: string; emoji: string; isCorrect?: boolean }[];
  correctIndex?: number;
  hint?: string;
}
