export type GameModule = 'home' | 'colors' | 'shapes' | 'sounds' | 'counting' | 'badges';

export type ColorActivity = 'quiz' | 'coloring' | 'mixing';
export type ShapeActivity = 'identify' | 'sorter' | 'builder';
export type SoundActivity = 'soundboard' | 'guess' | 'band';
export type CountingActivity = 'count' | 'pop' | 'feed';

export interface Badge {
  id: string;
  name: string;
  category: 'colors' | 'shapes' | 'sounds' | 'counting' | 'special';
  icon: string;
  description: string;
  color: string;
  unlocked: boolean;
  requiredStars: number;
}

export interface GameProgress {
  stars: number;
  unlockedBadges: string[];
  colorsCompleted: number;
  shapesCompleted: number;
  soundsCompleted: number;
  countingCompleted: number;
  soundEnabled: boolean;
  voiceEnabled: boolean;
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
