import React from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Star, Trophy, BookOpen, Flame, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GameMetadata, GradeLevel } from '../types';
import { GRADE_INFO } from '../data/allGamesData';
import { soundEngine } from '../utils/audio';

interface ContinueAdventureBannerProps {
  childName: string;
  avatarEmoji: string;
  grade: GradeLevel;
  stars: number;
  badgesCount: number;
  completedGamesCount: number;
  streakDays: number;
  lastPlayedGame: GameMetadata | null;
  onContinueAdventure: () => void;
  onContinueLastPlayed: (game: GameMetadata) => void;
  onChangeClassOrName: () => void;
}

export const ContinueAdventureBanner: React.FC<ContinueAdventureBannerProps> = ({
  childName,
  avatarEmoji,
  grade,
  stars,
  badgesCount,
  completedGamesCount,
  streakDays,
  lastPlayedGame,
  onContinueAdventure,
  onContinueLastPlayed,
  onChangeClassOrName,
}) => {
  const gradeInfo = GRADE_INFO[grade] || GRADE_INFO.nursery;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl border-4 border-white/90 p-4 sm:p-7">
      {/* Background Decorative Accents */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-yellow-300/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Left Side: Welcome back greeting & Big Continue Button */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/40">
              {avatarEmoji || '🐰'}
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-sm px-3 py-0.5 rounded-full text-xs font-bold text-amber-100">
                <span>{gradeInfo.icon}</span>
                <span>{gradeInfo.name}</span>
                <span>•</span>
                <span>{gradeInfo.worldEmoji} {gradeInfo.worldName}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black drop-shadow-sm tracking-tight text-white mt-0.5">
                Welcome back, {childName || 'Explorer'}! 👋
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/90 font-medium max-w-xl">
            Your saved learning adventure is ready. Pick up right where you left off with full stars, rewards, and achievements preserved!
          </p>

          {/* Prominent Continue Adventure Action */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              id="btn_continue_adventure"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundEngine.playCelebration();
                onContinueAdventure();
              }}
              className="py-3 px-6 sm:px-8 rounded-2xl bg-white text-amber-700 hover:text-amber-800 font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer ring-4 ring-amber-300/40"
            >
              <Play className="w-5 h-5 fill-current text-amber-600" />
              <span>▶ CONTINUE ADVENTURE</span>
            </motion.button>

            <button
              onClick={onChangeClassOrName}
              className="py-2.5 px-4 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>⚙️ Change Class / Name</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-stone-900">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2">
              <span className="text-lg">{gradeInfo.icon}</span>
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-500 uppercase leading-none">Class</span>
                <span className="font-black text-xs sm:text-sm truncate text-stone-900">{gradeInfo.name}</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-500 uppercase leading-none">Stars</span>
                <span className="font-black text-xs sm:text-sm text-amber-800">{stars} ⭐</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-500 uppercase leading-none">Badges</span>
                <span className="font-black text-xs sm:text-sm text-yellow-900">{badgesCount} 🏆</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-500 uppercase leading-none">Completed</span>
                <span className="font-black text-xs sm:text-sm text-indigo-900">{completedGamesCount} / 20</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 col-span-2 sm:col-span-1">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400 shrink-0 animate-bounce" />
              <div className="min-w-0">
                <span className="block text-[10px] font-bold text-stone-500 uppercase leading-none">Streak</span>
                <span className="font-black text-xs sm:text-sm text-orange-700">{streakDays} Day 🔥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Remember Last Location ("Continue where you left off?") */}
        {lastPlayedGame && (
          <div className="w-full lg:w-80 bg-white/95 text-stone-900 rounded-2xl p-4 shadow-xl border-2 border-white flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  📍 Last Location
                </span>
                <span className="text-[10px] font-extrabold text-stone-500">
                  {GRADE_INFO[lastPlayedGame.grade]?.name || 'Current'}
                </span>
              </div>

              <h4 className="text-xs font-black text-stone-500 uppercase">
                Continue where you left off?
              </h4>

              <div className="flex items-center gap-3 my-2.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-3xl p-1 bg-white rounded-lg border border-stone-200 shadow-inner">
                  {lastPlayedGame.icon}
                </span>
                <div className="min-w-0">
                  <span className="font-black text-sm text-stone-900 block truncate">
                    {lastPlayedGame.title}
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 block truncate">
                    {lastPlayedGame.skill}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              id="btn_continue_last_played"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundEngine.playCelebration();
                onContinueLastPlayed(lastPlayedGame);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>CONTINUE THIS GAME</span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};
