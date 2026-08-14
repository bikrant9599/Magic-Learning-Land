export type GradeLevel = 'lkg' | 'nursery';

export type GameModule =
  | 'home'
  | 'abc'
  | 'numbers'
  | 'objects'
  | 'patterns'
  | 'colors'
  | 'shapes'
  | 'sounds'
  | 'counting'
  | 'badges'
  | 'characters';

export type AbcActivity = 'explore' | 'quiz' | 'beginning_sound' | 'tracing';
export type NumberActivity = 'count_match' | 'missing' | 'ordering';
export type ObjectActivity = 'explore' | 'find_object' | 'category_match';
export type PatternActivity = 'train_puzzle' | 'create';

export type ColorActivity = 'quiz' | 'coloring' | 'mixing';
export type ShapeActivity = 'identify' | 'sorter' | 'builder';
export type SoundActivity = 'soundboard' | 'guess' | 'band';
export type CountingActivity = 'count' | 'pop' | 'feed';

export interface CharacterCompanion {
  id: string;
  name: string;
  title: string;
  avatar: string;
  greeting: string;
  color: string;
  unlocked: boolean;
  requiredStars: number;
}

export interface Badge {
  id: string;
  name: string;
  category: 'abc' | 'numbers' | 'objects' | 'patterns' | 'colors' | 'shapes' | 'sounds' | 'counting' | 'special';
  icon: string;
  description: string;
  color: string;
  unlocked: boolean;
  requiredStars: number;
}

export interface DailyChallengeTask {
  id: string;
  title: string;
  world: 'abc' | 'numbers' | 'objects' | 'patterns';
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
