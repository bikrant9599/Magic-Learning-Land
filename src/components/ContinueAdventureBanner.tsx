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
    <section className="relative overflow-hidden rounded-2xl xs:rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl border-2 xs:border-4 border-white/90 p-3.5 xs:p-5 md:p-6 lg:p-7 2xl:p-8">
      {/* Background Decorative Accents */}
      <div className="absolute -right-12 -bottom-12 w-48 xs:w-64 2xl:w-80 h-48 xs:h-64 2xl:h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-24 xs:w-32 2xl:w-48 h-24 xs:h-32 2xl:h-48 rounded-full bg-yellow-300/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 xs:gap-5 lg:gap-6 2xl:gap-8">
        {/* Left Side: Welcome back greeting & Big Continue Button */}
        <div className="flex-1 space-y-2.5 xs:space-y-3 lg:space-y-4">
          <div className="flex items-center gap-2.5 xs:gap-3 2xl:gap-4">
            <span className="w-11 h-11 xs:w-13 xs:h-13 md:w-14 md:h-14 2xl:w-16 2xl:h-16 rounded-xl xs:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl xs:text-3xl md:text-4xl 2xl:text-5xl shadow-inner border border-white/40 shrink-0">
              {avatarEmoji || '🐰'}
            </span>
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1 xs:gap-1.5 bg-black/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] xs:text-xs font-bold text-amber-100 max-w-full truncate">
                <span>{gradeInfo.icon}</span>
                <span>{gradeInfo.name}</span>
                <span>•</span>
                <span className="truncate">{gradeInfo.worldEmoji} {gradeInfo.worldName}</span>
              </div>
              <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-3xl 2xl:text-4xl font-black drop-shadow-sm tracking-tight text-white mt-0.5 truncate">
                Welcome back, {childName || 'Explorer'}! 👋
              </h2>
            </div>
          </div>

          <p className="text-xs xs:text-sm 2xl:text-base text-white/90 font-medium max-w-xl 2xl:max-w-2xl leading-relaxed">
            Your saved learning adventure is ready. Pick up right where you left off with full stars, rewards, and achievements preserved!
          </p>

          {/* Prominent Continue Adventure Action */}
          <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 pt-1">
            <motion.button
              id="btn_continue_adventure"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                soundEngine.playCelebration();
                onContinueAdventure();
              }}
              className="w-full xs:w-auto min-h-[48px] py-3 px-5 xs:px-6 md:px-7 2xl:px-8 rounded-xl xs:rounded-2xl bg-white text-amber-700 hover:text-amber-800 font-black text-xs xs:text-sm md:text-base 2xl:text-lg flex items-center justify-center gap-2 xs:gap-2.5 shadow-lg hover:shadow-xl transition-all cursor-pointer ring-4 ring-amber-300/40 shrink-0"
            >
              <Play className="w-4 h-4 xs:w-5 xs:h-5 fill-current text-amber-600 shrink-0" />
              <span>▶ CONTINUE ADVENTURE</span>
            </motion.button>

            <button
              onClick={onChangeClassOrName}
              className="min-h-[44px] py-2.5 px-3.5 xs:px-4 rounded-xl bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white font-bold text-xs xs:text-xs md:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>⚙️ Change Class / Name</span>
            </button>
          </div>

          {/* Quick Metrics Bar (Fluid across 5 tiers) */}
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-2 xs:gap-2.5 2xl:gap-3 pt-2 text-stone-900">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 xs:px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 min-h-[44px]">
              <span className="text-base xs:text-lg shrink-0">{gradeInfo.icon}</span>
              <div className="min-w-0">
                <span className="block text-[9px] xs:text-[10px] font-bold text-stone-500 uppercase leading-none">Class</span>
                <span className="font-black text-xs xs:text-sm 2xl:text-base truncate text-stone-900 block">{gradeInfo.name}</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 xs:px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 min-h-[44px]">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[9px] xs:text-[10px] font-bold text-stone-500 uppercase leading-none">Stars</span>
                <span className="font-black text-xs xs:text-sm 2xl:text-base text-amber-800 truncate block">{stars} ⭐</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 xs:px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 min-h-[44px]">
              <Trophy className="w-4 h-4 text-yellow-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[9px] xs:text-[10px] font-bold text-stone-500 uppercase leading-none">Badges</span>
                <span className="font-black text-xs xs:text-sm 2xl:text-base text-yellow-900 truncate block">{badgesCount} 🏆</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 xs:px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 min-h-[44px]">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <div className="min-w-0">
                <span className="block text-[9px] xs:text-[10px] font-bold text-stone-500 uppercase leading-none">Completed</span>
                <span className="font-black text-xs xs:text-sm 2xl:text-base text-indigo-900 truncate block">{completedGamesCount} / 20</span>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2.5 xs:px-3 py-2 border border-white/60 shadow-xs flex items-center gap-2 col-span-2 xs:col-span-1 min-h-[44px]">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400 shrink-0 animate-bounce" />
              <div className="min-w-0">
                <span className="block text-[9px] xs:text-[10px] font-bold text-stone-500 uppercase leading-none">Streak</span>
                <span className="font-black text-xs xs:text-sm 2xl:text-base text-orange-700 truncate block">{streakDays} Day 🔥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Remember Last Location ("Continue where you left off?") */}
        {lastPlayedGame && (
          <div className="w-full lg:w-72 xl:w-80 2xl:w-96 bg-white/95 text-stone-900 rounded-xl xs:rounded-2xl p-3.5 xs:p-4 2xl:p-5 shadow-xl border-2 border-white flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] xs:text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  📍 Last Location
                </span>
                <span className="text-[9px] xs:text-[10px] font-extrabold text-stone-500">
                  {GRADE_INFO[lastPlayedGame.grade]?.name || 'Current'}
                </span>
              </div>

              <h4 className="text-[11px] xs:text-xs font-black text-stone-500 uppercase">
                Continue where you left off?
              </h4>

              <div className="flex items-center gap-2.5 xs:gap-3 my-2 xs:my-2.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-2xl xs:text-3xl p-1 bg-white rounded-lg border border-stone-200 shadow-inner shrink-0">
                  {lastPlayedGame.icon}
                </span>
                <div className="min-w-0">
                  <span className="font-black text-xs xs:text-sm text-stone-900 block truncate">
                    {lastPlayedGame.title}
                  </span>
                  <span className="text-[10px] xs:text-[11px] font-bold text-amber-700 block truncate">
                    {lastPlayedGame.skill}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              id="btn_continue_last_played"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundEngine.playCelebration();
                onContinueLastPlayed(lastPlayedGame);
              }}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs xs:text-sm flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-transform"
            >
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>CONTINUE THIS GAME</span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};
