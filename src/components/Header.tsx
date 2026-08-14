import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, Volume2, VolumeX, Sparkles, Award, Music, ShieldCheck, Users } from 'lucide-react';
import { GameModule, GradeLevel } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentModule: GameModule;
  onNavigate: (module: GameModule) => void;
  stars: number;
  coins: number;
  unlockedBadgesCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onOpenParentProgress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onNavigate,
  stars,
  coins,
  unlockedBadgesCount,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
  musicEnabled,
  onToggleMusic,
  selectedGrade,
  onSelectGrade,
  onOpenParentProgress,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-sm px-2 sm:px-5 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        {/* Left: Home / Navigation */}
        <div className="flex items-center gap-2">
          {currentModule !== 'home' ? (
            <motion.button
              id="back-home-button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playPop(520);
                sound.speak('Going back to adventure map!');
                onNavigate('home');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-xs sm:text-sm shadow-md border-2 border-amber-500 hover:brightness-105 cursor-pointer"
              aria-label="Go back to Home Adventure Map"
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-extrabold tracking-wide">MAP</span>
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                sound.playPop(600);
                sound.speak('Welcome to Magic Learning Land UKG Adventure!');
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-amber-400 to-purple-400 flex items-center justify-center text-xl shadow-md border-2 border-white">
                🦋
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block leading-none">
                  UKG Adventure (Ages 5–6)
                </span>
                <span className="text-sm sm:text-base font-black text-amber-950 leading-tight">
                  Magic Learning Land
                </span>
              </div>
            </motion.div>
          )}

          {/* Grade Selector Pills */}
          <div className="hidden md:flex items-center gap-1 bg-amber-100/80 p-1 rounded-2xl border border-amber-300">
            <button
              onClick={() => {
                sound.playPop(480);
                onSelectGrade('nursery');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGrade === 'nursery'
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              Nursery
            </button>
            <button
              onClick={() => {
                sound.playPop(500);
                onSelectGrade('lkg');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGrade === 'lkg'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              LKG
            </button>
            <button
              onClick={() => {
                sound.playPop(520);
                onSelectGrade('ukg');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedGrade === 'ukg'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-white/60'
              }`}
            >
              UKG ⭐
            </button>
          </div>
        </div>

        {/* Center: Stars & Coins Counter */}
        <div className="flex items-center gap-2">
          {/* Star Counter */}
          <motion.div
            key={stars}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 border-2 border-yellow-400 shadow-xs"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-lg sm:text-xl"
            >
              ⭐
            </motion.span>
            <span className="font-black text-amber-900 text-sm sm:text-base tabular-nums">
              {stars}
            </span>
          </motion.div>

          {/* Coin Counter */}
          <motion.div
            key={coins}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border-2 border-amber-400 shadow-xs"
          >
            <span className="text-lg sm:text-xl">🪙</span>
            <span className="font-black text-amber-900 text-sm sm:text-base tabular-nums">
              {coins}
            </span>
          </motion.div>

          {/* Badges Quick Button */}
          <motion.button
            id="header-badges-button"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              sound.playPop(580);
              onNavigate('badges');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 transition-all cursor-pointer ${
              currentModule === 'badges'
                ? 'bg-purple-600 text-white border-purple-700 shadow-inner'
                : 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
            }`}
            title="Trophy Room & Badges"
          >
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="font-extrabold text-xs sm:text-sm">
              {unlockedBadgesCount}
            </span>
          </motion.button>
        </div>

        {/* Right: BGM, Voice, Sound, Parent Zone */}
        <div className="flex items-center gap-1.5">
          {/* Music Toggle */}
          <button
            id="toggle-music-button"
            type="button"
            onClick={() => {
              sound.playPop(440);
              onToggleMusic();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer ${
              musicEnabled
                ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                : 'bg-gray-100 text-gray-400 border-gray-300'
            }`}
            title={musicEnabled ? 'Music: ON' : 'Music: OFF'}
            aria-label="Toggle background music"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Voice Narration Button */}
          <button
            id="toggle-voice-button"
            type="button"
            onClick={() => {
              sound.playPop(440);
              onToggleVoice();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer ${
              voiceEnabled
                ? 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200'
                : 'bg-gray-100 text-gray-400 border-gray-300'
            }`}
            title={voiceEnabled ? 'Voice Reading: ON' : 'Voice Reading: OFF'}
            aria-label="Toggle spoken voice instructions"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* SFX Button */}
          <button
            id="toggle-sound-button"
            type="button"
            onClick={() => {
              sound.playPop(440);
              onToggleSound();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                : 'bg-gray-100 text-gray-400 border-gray-300'
            }`}
            title={soundEnabled ? 'Sound Effects: ON' : 'Sound Effects: OFF'}
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Parent Zone Quick Trigger */}
          {onOpenParentProgress && (
            <button
              id="header-parent-progress-btn"
              onClick={onOpenParentProgress}
              className="p-1.5 sm:p-2 rounded-xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-300 text-purple-900 font-bold text-xs cursor-pointer ml-0.5"
              title="Parent Progress Zone"
            >
              👨‍👩‍👧
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
