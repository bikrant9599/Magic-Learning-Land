import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GameModule, CharacterCompanion } from '../types';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Award,
  Users,
  Compass,
  Star,
  Coins,
  ChevronRight,
  Smile,
} from 'lucide-react';

interface UkgAdventureMapProps {
  onSelectModule: (module: GameModule) => void;
  stars: number;
  coins: number;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
  activeCompanion: CharacterCompanion;
  onOpenCharacterSelect: () => void;
  onOpenParentProgress: () => void;
  completedWorlds: string[];
}

export const UkgAdventureMap: React.FC<UkgAdventureMapProps> = ({
  onSelectModule,
  stars,
  coins,
  unlockedBadgesCount,
  totalBadgesCount,
  activeCompanion,
  onOpenCharacterSelect,
  onOpenParentProgress,
  completedWorlds,
}) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheering' | 'waving'>('waving');

  const handlePopBalloon = (index: number) => {
    if (poppedBalloons.includes(index)) return;
    sound.playPop(550 + index * 70);
    setPoppedBalloons((prev) => [...prev, index]);
    setMascotMood('cheering');
    setTimeout(() => setMascotMood('happy'), 1200);
  };

  const UKG_WORLDS = [
    {
      id: 'reading' as GameModule,
      title: '📖 READING FOREST',
      subtitle: 'CVC Words, Missing Letters & Story Sentences!',
      icon: '🌲',
      badgeTag: 'Phonics & Stories',
      gradient: 'from-emerald-400 via-teal-500 to-green-600',
      border: 'border-emerald-400',
      bgGlow: 'bg-emerald-300/30',
      description: 'Match pictures, build 3-letter words, read simple stories!',
      voicePrompt: 'Welcome to Reading Forest! Let us read friendly words and magical stories!',
      activitiesCount: 5,
    },
    {
      id: 'number_kingdom' as GameModule,
      title: '🔢 NUMBER KINGDOM',
      subtitle: 'Numbers 1 to 100, Before/After & Alligator Croc!',
      icon: '🏰',
      badgeTag: '1 to 100 & Comparing',
      gradient: 'from-amber-400 via-orange-500 to-yellow-500',
      border: 'border-amber-400',
      bgGlow: 'bg-amber-300/30',
      description: 'Explore numbers up to 100, before & after, and order wagons!',
      voicePrompt: 'Welcome to Number Kingdom! Let us count to 100 and meet the hungry alligator!',
      activitiesCount: 5,
    },
    {
      id: 'math_mountain' as GameModule,
      title: '➕ MATH MOUNTAIN',
      subtitle: 'Addition, Subtraction & Treasure Chests!',
      icon: '🏔️',
      badgeTag: 'Sum & Difference',
      gradient: 'from-sky-400 via-blue-500 to-indigo-600',
      border: 'border-sky-400',
      bgGlow: 'bg-blue-300/30',
      description: 'Visual addition, cookie feeding monster & river stepping stones!',
      voicePrompt: 'Welcome to Math Mountain! Climb high by adding and subtracting fun items!',
      activitiesCount: 5,
    },
    {
      id: 'puzzle_planet' as GameModule,
      title: '🧠 PUZZLE PLANET',
      subtitle: 'Odd One Out, Memory Cards & Sorting Bins!',
      icon: '🪐',
      badgeTag: 'Logic & Patterns',
      gradient: 'from-purple-400 via-pink-500 to-rose-500',
      border: 'border-purple-400',
      bgGlow: 'bg-purple-300/30',
      description: 'Smart logic puzzles, card matching and pattern completions!',
      voicePrompt: 'Welcome to Puzzle Planet! Test your clever thinking with cute brain games!',
      activitiesCount: 5,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-200 via-indigo-50 to-emerald-100 px-3 sm:px-6 py-4 sm:py-6 relative overflow-hidden flex flex-col justify-between">
      {/* Floating Animated Clouds */}
      <motion.div
        animate={{ x: [-30, 40, -30] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        className="absolute top-3 left-4 text-5xl sm:text-6xl opacity-70 pointer-events-none select-none"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [40, -30, 40] }}
        transition={{ repeat: Infinity, duration: 24, ease: 'easeInOut' }}
        className="absolute top-10 right-8 text-6xl opacity-60 pointer-events-none select-none"
      >
        ☁️
      </motion.div>

      {/* Floating Rainbow */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl opacity-40 pointer-events-none select-none">
        🌈
      </div>

      {/* Smiling Sunshine Mascot Button */}
      <motion.button
        id="sunshine-interactive"
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          sound.playStar();
          sound.speak('Hello superstar! You are going to do amazing today!');
        }}
        className="absolute top-2 right-3 sm:right-8 z-10 cursor-pointer focus:outline-none"
        title="Tap the happy sun!"
        aria-label="Tap smiling sunshine"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="text-5xl sm:text-6xl drop-shadow-md select-none"
        >
          ☀️
        </motion.div>
      </motion.button>

      {/* Poppable floating star balloons */}
      <div className="absolute top-12 left-6 sm:left-20 flex gap-3 z-10">
        {[
          { emoji: '🎈', color: 'red' },
          { emoji: '🌟', color: 'gold' },
          { emoji: '🎈', color: 'purple' },
        ].map((item, idx) => (
          <motion.button
            key={idx}
            id={`map-balloon-${idx}`}
            onClick={() => handlePopBalloon(idx)}
            animate={{
              y: [0, -10, 0],
              scale: poppedBalloons.includes(idx) ? 0 : 1,
            }}
            transition={{
              y: { repeat: Infinity, duration: 3 + idx * 0.8, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
            className={`text-3xl sm:text-4xl cursor-pointer focus:outline-none hover:scale-125 transition-transform ${
              poppedBalloons.includes(idx) ? 'hidden' : 'block'
            }`}
            title="Pop me!"
          >
            {item.emoji}
          </motion.button>
        ))}
      </div>

      {/* Top Section: Active Mascot Companion Greeting & World Title */}
      <div className="relative z-20 max-w-5xl mx-auto w-full text-center pt-1 sm:pt-2">
        {/* Companion Interactive Header Card */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 rounded-full border-3 border-amber-300 shadow-md mb-2">
          <motion.button
            id="change-companion-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCharacterSelect}
            className="text-2xl sm:text-3xl cursor-pointer hover:rotate-12 transition-transform"
            title="Change companion buddy!"
          >
            {activeCompanion.avatar}
          </motion.button>
          <div className="text-left">
            <span className="text-xs font-black text-purple-700 uppercase tracking-wider block">
              Companion: {activeCompanion.name}
            </span>
            <span className="text-xs sm:text-sm font-bold text-amber-950">
              {activeCompanion.greeting}
            </span>
          </div>
          <button
            onClick={onOpenCharacterSelect}
            className="text-xs font-black text-purple-600 bg-purple-100 hover:bg-purple-200 px-2.5 py-1 rounded-full border border-purple-300 cursor-pointer ml-1"
          >
            CHANGE 🐾
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-950 font-display tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
          <span>🦋</span> Magic Learning Land UKG Map <span>🗺️</span>
        </h1>
        <p className="text-base sm:text-lg font-bold text-amber-900 mt-1 max-w-2xl mx-auto">
          Pick an adventure realm below to play games, collect shiny stars ⭐ and gold coins 🪙!
        </p>
      </div>

      {/* Main Adventure Realm Cards Grid */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4 relative z-20">
        {UKG_WORLDS.map((world, idx) => {
          const isCompleted = completedWorlds.includes(world.id);

          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', damping: 15 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group"
            >
              <button
                id={`ukg-world-btn-${world.id}`}
                onClick={() => {
                  sound.playPop(520 + idx * 60);
                  sound.speak(world.voicePrompt);
                  onSelectModule(world.id);
                }}
                className={`w-full text-left rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${world.gradient} border-4 ${world.border} shadow-xl hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[170px] sm:min-h-[190px]`}
              >
                {/* Floating Glow Orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/25 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/95 shadow-md flex items-center justify-center text-3xl sm:text-4xl border-3 border-white group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {world.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-amber-950 font-black text-xs sm:text-sm border border-white shadow-xs">
                      {world.badgeTag}
                    </span>
                    {isCompleted && (
                      <span className="px-2.5 py-0.5 rounded-full bg-yellow-300 text-amber-950 font-extrabold text-xs shadow-xs flex items-center gap-1 border border-yellow-400">
                        ⭐ WORLD COMPLETE!
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Title & Content Info */}
                <div className="mt-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-display tracking-wide flex items-center gap-2">
                    {world.title}
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] mt-0.5 line-clamp-1">
                    {world.subtitle}
                  </p>
                </div>

                {/* Card Action Row */}
                <div className="mt-4 flex items-center justify-between pt-1 border-t border-white/30">
                  <span className="text-xs sm:text-sm font-black text-white/90 flex items-center gap-1">
                    ✨ {world.activitiesCount} Mini Games Inside
                  </span>
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white text-amber-950 font-black text-sm shadow-md group-hover:bg-yellow-300 group-hover:text-amber-900 transition-colors">
                    EXPLORE NOW 🚀
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Hub Bar: Rewards Room, Parent Zone & Stats */}
      <div className="max-w-5xl mx-auto w-full relative z-20 mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Badges & Rewards Button */}
        <motion.button
          id="ukg-rewards-banner"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playPop(520);
            sound.speak('Let us check your shiny badges and trophies!');
            onSelectModule('badges');
          }}
          className="rounded-2xl p-3.5 sm:p-4 bg-white/90 backdrop-blur-md border-3 border-amber-300 shadow-md flex items-center justify-between gap-3 hover:border-amber-400 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-xs">
              🏆
            </div>
            <div>
              <h4 className="text-base font-black text-amber-950">Trophy Room & Badges</h4>
              <p className="text-xs font-bold text-amber-800">
                {unlockedBadgesCount} / {totalBadgesCount} Badges • {stars} Stars • {coins} Coins
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-black text-xs shadow-xs">
            VIEW 🌟
          </span>
        </motion.button>

        {/* Parent Learning Zone Button */}
        <motion.button
          id="ukg-parent-progress-banner"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playPop(480);
            onOpenParentProgress();
          }}
          className="rounded-2xl p-3.5 sm:p-4 bg-white/90 backdrop-blur-md border-3 border-purple-300 shadow-md flex items-center justify-between gap-3 hover:border-purple-400 transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-2xl shadow-xs">
              👨‍👩‍👧
            </div>
            <div>
              <h4 className="text-base font-black text-purple-950">Parent Progress Area</h4>
              <p className="text-xs font-bold text-purple-800">
                Learning time, accuracy & home activity tips
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-purple-500 text-white font-black text-xs shadow-xs">
            REPORTS 📊
          </span>
        </motion.button>
      </div>
    </div>
  );
};
