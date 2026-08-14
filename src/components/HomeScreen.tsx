import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GameModule } from '../types';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { Trophy, Palette, Shapes, Music, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onSelectModule: (module: GameModule) => void;
  stars: number;
  unlockedBadgesCount: number;
  totalBadgesCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectModule,
  stars,
  unlockedBadgesCount,
  totalBadgesCount,
}) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [mascotMood, setMascotMood] = useState<'happy' | 'cheering' | 'waving'>('waving');

  const handlePopBalloon = (index: number) => {
    if (poppedBalloons.includes(index)) return;
    sound.playPop(600 + index * 60);
    setPoppedBalloons((prev) => [...prev, index]);
    setMascotMood('cheering');
    setTimeout(() => setMascotMood('happy'), 1200);
  };

  const gameWorlds = [
    {
      id: 'colors' as GameModule,
      title: '🎨 COLORS',
      subtitle: 'Red, Blue, Yellow & Coloring!',
      icon: '🎨',
      gradient: 'from-pink-400 via-rose-400 to-amber-300',
      border: 'border-pink-500',
      tag: '6 Colors & Coloring!',
      voicePrompt: 'Welcome to Colors Land! Let us explore colors and paint beautiful pictures!',
    },
    {
      id: 'shapes' as GameModule,
      title: '🔺 SHAPES',
      subtitle: 'Circle, Square, Triangle & Puzzles!',
      icon: '🔺',
      gradient: 'from-amber-400 via-orange-400 to-yellow-300',
      border: 'border-amber-500',
      tag: 'Shape Puzzles & Sorting!',
      voicePrompt: 'Welcome to Shapes Land! Find circles, squares, triangles and build puzzles!',
    },
    {
      id: 'sounds' as GameModule,
      title: '🐶 ANIMAL SOUNDS',
      subtitle: 'Woof, Meow, Moo & Guessing!',
      icon: '🐶',
      gradient: 'from-emerald-400 via-teal-400 to-sky-300',
      border: 'border-emerald-500',
      tag: 'Listen & Guess Animals!',
      voicePrompt: 'Welcome to Animal Sounds Land! Listen to cute animals and guess who is singing!',
    },
    {
      id: 'counting' as GameModule,
      title: '🔢 COUNTING',
      subtitle: 'Numbers 1 to 10 with Stars!',
      icon: '🔢',
      gradient: 'from-sky-400 via-blue-500 to-indigo-400',
      border: 'border-blue-500',
      tag: 'Count 1 to 10 & Pop Balloons!',
      voicePrompt: 'Welcome to Counting Adventure! Count apples, stars, and feed the bunny!',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 px-4 py-4 sm:py-6 relative overflow-hidden flex flex-col justify-between">
      {/* Floating Animated Clouds */}
      <motion.div
        animate={{ x: [-20, 30, -20] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute top-4 left-6 text-5xl sm:text-6xl opacity-80 pointer-events-none select-none"
      >
        ☁️
      </motion.div>
      <motion.div
        animate={{ x: [30, -20, 30] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
        className="absolute top-12 right-12 text-6xl opacity-75 pointer-events-none select-none"
      >
        ☁️
      </motion.div>

      {/* Smiling Interactive Sun */}
      <motion.button
        id="smiling-sun-button"
        whileHover={{ scale: 1.15, rotate: 20 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          sound.playStar();
          sound.speak('Good morning sunshine! You are shining bright!');
        }}
        className="absolute top-3 right-4 sm:right-10 z-10 cursor-pointer focus:outline-none"
        title="Tap the happy sun!"
        aria-label="Interactive smiling sun"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="text-5xl sm:text-6xl drop-shadow-md select-none"
        >
          ☀️
        </motion.div>
      </motion.button>

      {/* Floating Balloons that Kids Can Pop */}
      <div className="absolute top-14 left-1/4 sm:left-1/3 flex gap-4 z-10 pointer-events-auto">
        {[
          { emoji: '🎈', color: 'red' },
          { emoji: '🎈', color: 'blue' },
          { emoji: '🎈', color: 'yellow' },
        ].map((balloon, idx) => (
          <motion.button
            key={idx}
            id={`home-balloon-${idx}`}
            onClick={() => handlePopBalloon(idx)}
            animate={{
              y: [0, -12, 0],
              scale: poppedBalloons.includes(idx) ? 0 : 1,
            }}
            transition={{
              y: { repeat: Infinity, duration: 3 + idx, ease: 'easeInOut' },
              scale: { duration: 0.2 },
            }}
            className={`text-3xl sm:text-4xl cursor-pointer focus:outline-none transition-transform hover:scale-125 ${
              poppedBalloons.includes(idx) ? 'hidden' : 'block'
            }`}
            title="Pop me!"
          >
            {balloon.emoji}
          </motion.button>
        ))}
      </div>

      {/* Top Section: Mascot Greeting */}
      <div className="relative z-20 max-w-4xl mx-auto w-full text-center pt-2">
        <Mascot
          message="Pick a fun game world to play and earn shiny stars! ⭐"
          voiceText="Welcome to Magic Learning Land! Pick colors, shapes, sounds, or counting to play!"
          mood={mascotMood}
        />
      </div>

      {/* Main Grid: 4 Big Game World Cards */}
      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-4 relative z-20">
        {gameWorlds.map((world, idx) => (
          <motion.div
            key={world.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: 'spring', damping: 15 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="group"
          >
            <button
              id={`world-card-${world.id}`}
              onClick={() => {
                sound.playPop(550 + idx * 50);
                sound.speak(world.voicePrompt);
                onSelectModule(world.id);
              }}
              className={`w-full text-left rounded-3xl p-5 sm:p-6 bg-gradient-to-br ${world.gradient} border-4 ${world.border} shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[160px] sm:min-h-[180px]`}
            >
              {/* Decorative soft glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-white/20 rounded-full blur-xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 shadow-md flex items-center justify-center text-3xl sm:text-4xl border-2 border-white group-hover:scale-110 transition-transform">
                  {world.icon}
                </div>

                <span className="px-3 py-1 rounded-full bg-white/85 text-amber-950 font-black text-xs sm:text-sm border border-white/60 shadow-xs">
                  {world.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)] font-display tracking-wide">
                  {world.title}
                </h3>
                <p className="text-sm sm:text-base font-bold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] mt-0.5">
                  {world.subtitle}
                </p>
              </div>

              {/* Big Play Pill */}
              <div className="mt-3 self-end">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-amber-950 font-black text-sm shadow-md group-hover:bg-yellow-300 transition-colors">
                  LET'S PLAY! 🚀
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom Bar: Badges & Trophies Preview Banner */}
      <div className="max-w-4xl mx-auto w-full relative z-20 mt-2 mb-2">
        <motion.button
          id="home-badges-banner"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            sound.playPop(520);
            sound.speak('Let us check your shiny badges and trophies!');
            onSelectModule('badges');
          }}
          className="w-full rounded-2xl sm:rounded-3xl p-4 bg-white/90 backdrop-blur-xs border-3 border-amber-300 shadow-md flex flex-wrap items-center justify-between gap-3 hover:border-amber-400 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-xs">
              🏆
            </div>
            <div className="text-left">
              <h4 className="text-base sm:text-lg font-black text-amber-950">
                My Badges & Trophies
              </h4>
              <p className="text-xs sm:text-sm font-bold text-amber-800">
                {unlockedBadgesCount} of {totalBadgesCount} Badges Unlocked • {stars} Stars Earned!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 font-black text-xs sm:text-sm shadow-xs border border-yellow-300">
              VIEW REWARDS ⭐
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
