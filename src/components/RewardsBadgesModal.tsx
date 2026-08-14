import React from 'react';
import { Sparkles, Trophy, X, Star, Lock, CheckCircle2, Shield } from 'lucide-react';
import { Badge, CharacterCompanion } from '../types';
import { soundEngine } from '../utils/audio';
import { motion } from 'motion/react';

interface RewardsBadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStars: number;
  userCoins: number;
  selectedCompanion: string;
  onSelectCompanion: (charId: string) => void;
}

export const CHARACTER_COMPANIONS: CharacterCompanion[] = [
  {
    id: 'bunny',
    name: 'Barnaby Bunny',
    title: 'Nursery Explorer',
    avatar: '🐰',
    greeting: 'Hop hop! Let us have magical fun learning today!',
    color: 'from-pink-400 to-rose-400',
    requiredStars: 0,
  },
  {
    id: 'bear',
    name: 'Barnaby Bear',
    title: 'LKG Adventurer',
    avatar: '🐻',
    greeting: 'Hello friend! I love numbers, letters, and sweet honey!',
    color: 'from-amber-400 to-orange-400',
    requiredStars: 10,
  },
  {
    id: 'fox',
    name: 'Felix Fox',
    title: 'UKG Word Wizard',
    avatar: '🦊',
    greeting: 'Clever thinking leads to great discoveries!',
    color: 'from-orange-400 to-red-500',
    requiredStars: 25,
  },
  {
    id: 'panda',
    name: 'Pip Panda',
    title: 'Class 1 Scholar',
    avatar: '🐼',
    greeting: 'Keep studying hard and unlocking new wisdom!',
    color: 'from-emerald-400 to-teal-500',
    requiredStars: 50,
  },
  {
    id: 'dragon',
    name: 'Draco Dragon',
    title: 'Grand Math Master',
    avatar: '🐲',
    greeting: 'Soar high with the fire of knowledge!',
    color: 'from-purple-500 to-indigo-600',
    requiredStars: 100,
  },
];

export const MASTER_BADGES: Badge[] = [
  {
    id: 'nursery_safari',
    name: 'Safari Detective',
    category: 'Science',
    icon: '🦁',
    description: 'Mastered all animal sounds and natural habitats',
    color: 'bg-amber-100 border-amber-400 text-amber-900',
    unlocked: true,
    requiredStars: 5,
  },
  {
    id: 'color_artist',
    name: 'Master Artist',
    category: 'Creative',
    icon: '🎨',
    description: 'Discovered all colors and mixed secondary shades',
    color: 'bg-pink-100 border-pink-400 text-pink-900',
    unlocked: false,
    requiredStars: 15,
  },
  {
    id: 'phonics_hero',
    name: 'Phonics Hero',
    category: 'English',
    icon: '🔤',
    description: 'Spelled CVC words and matched all beginning letter sounds',
    color: 'bg-sky-100 border-sky-400 text-sky-900',
    unlocked: false,
    requiredStars: 30,
  },
  {
    id: 'math_wizard',
    name: 'Math Champion',
    category: 'Maths',
    icon: '🏆',
    description: 'Solved addition equations and counting past 50',
    color: 'bg-emerald-100 border-emerald-400 text-emerald-900',
    unlocked: false,
    requiredStars: 60,
  },
  {
    id: 'grand_scholar',
    name: 'Grand Scholar',
    category: 'All',
    icon: '👑',
    description: 'Completed 20+ adventures across Nursery to Class 1',
    color: 'bg-purple-100 border-purple-400 text-purple-900',
    unlocked: false,
    requiredStars: 100,
  },
];

export const RewardsBadgesModal: React.FC<RewardsBadgesModalProps> = ({
  isOpen,
  onClose,
  userStars,
  userCoins,
  selectedCompanion,
  onSelectCompanion,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-amber-400 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Character Companions & Badges</h2>
              <p className="text-amber-100 text-xs md:text-sm">
                Unlock friendly cartoon buddies and collect shiny achievement badges!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-stone-800">
          {/* Character Companions Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-lg text-stone-900 flex items-center gap-2">
                <span>🐾</span>
                <span>Choose Your Learning Buddy</span>
              </h3>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                ⭐ {userStars} Total Stars
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CHARACTER_COMPANIONS.map((char) => {
                const isUnlocked = userStars >= (char.requiredStars || 0);
                const isSelected = selectedCompanion === char.id;

                return (
                  <motion.button
                    key={char.id}
                    disabled={!isUnlocked}
                    whileHover={isUnlocked ? { scale: 1.04 } : {}}
                    whileTap={isUnlocked ? { scale: 0.96 } : {}}
                    onClick={() => {
                      if (isUnlocked) {
                        soundEngine.playCelebration();
                        onSelectCompanion(char.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400'
                        : isUnlocked
                        ? 'bg-stone-50 border-stone-200 hover:border-amber-300 cursor-pointer'
                        : 'bg-stone-100 border-stone-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-5xl">{char.avatar}</span>
                    <h4 className="font-extrabold text-sm text-stone-900 mt-1">{char.name}</h4>
                    <span className="text-xs font-semibold text-stone-500">{char.title}</span>

                    {isSelected ? (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full mt-1">
                        Active Buddy ✨
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-xs font-bold text-amber-700">Unlocked</span>
                    ) : (
                      <span className="text-xs font-bold text-stone-500 flex items-center gap-1 mt-1">
                        <Lock className="w-3 h-3" />
                        <span>{char.requiredStars} Stars</span>
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Achievement Badges Section */}
          <div>
            <h3 className="font-black text-lg text-stone-900 flex items-center gap-2 mb-3">
              <span>🎖️</span>
              <span>Curriculum Achievement Badges</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MASTER_BADGES.map((badge) => {
                const isEarned = userStars >= badge.requiredStars;

                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
                      isEarned ? badge.color : 'bg-stone-50 border-stone-200 opacity-50'
                    }`}
                  >
                    <div className="text-4xl p-2 bg-white/80 rounded-2xl shadow-sm">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-sm">{badge.name}</h4>
                        <span className="text-xs font-bold">{badge.category}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">{badge.description}</p>
                      <div className="mt-1 text-xs font-black">
                        {isEarned ? (
                          <span className="text-emerald-700">Unlocked & Earned! 🌟</span>
                        ) : (
                          <span className="text-stone-500">Unlocks at {badge.requiredStars} Stars</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
