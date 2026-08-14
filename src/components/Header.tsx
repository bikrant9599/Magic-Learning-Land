import React from 'react';
import { motion } from 'motion/react';
import { Home, Trophy, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';
import { GameModule } from '../types';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentModule: GameModule;
  onNavigate: (module: GameModule) => void;
  stars: number;
  unlockedBadgesCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onNavigate,
  stars,
  unlockedBadgesCount,
  soundEnabled,
  onToggleSound,
  voiceEnabled,
  onToggleVoice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-4 border-amber-300 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Home / Navigation */}
        <div className="flex items-center gap-2">
          {currentModule !== 'home' ? (
            <motion.button
              id="back-home-button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playPop(520);
                sound.speak('Going home!');
                onNavigate('home');
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-sm sm:text-base shadow-md border-2 border-amber-500 hover:brightness-105 active:shadow-inner cursor-pointer"
              aria-label="Go back to Home Screen"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-xs" />
              <span className="hidden xs:inline font-extrabold tracking-wide">HOME</span>
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                sound.playPop(600);
                sound.speak('Magic Learning Land!');
              }}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 via-purple-400 to-amber-300 flex items-center justify-center text-xl shadow-md border-2 border-white">
                🏰
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 block leading-none">
                  Nursery Adventure
                </span>
                <span className="text-lg font-black text-amber-900 leading-tight">
                  Magic Learning Land
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Center: Stars & Trophy Counter */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter */}
          <motion.div
            key={stars}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-yellow-100 border-2 border-yellow-400 shadow-sm"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-xl sm:text-2xl"
            >
              ⭐
            </motion.span>
            <span className="font-black text-amber-900 text-base sm:text-lg tabular-nums">
              {stars}
            </span>
            <span className="hidden md:inline text-xs font-bold text-amber-700">STARS</span>
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
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
              currentModule === 'badges'
                ? 'bg-purple-600 text-white border-purple-700 shadow-inner'
                : 'bg-purple-100 text-purple-900 border-purple-300 hover:bg-purple-200'
            }`}
            title="My Badges & Trophy Room"
            aria-label="View Trophies and Badges"
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400" />
            <span className="font-extrabold text-sm sm:text-base">
              {unlockedBadgesCount}
            </span>
            <span className="hidden lg:inline text-xs font-bold">BADGES</span>
          </motion.button>
        </div>

        {/* Right: Sound & Voice Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Voice Narration Button */}
          <button
            id="toggle-voice-button"
            type="button"
            onClick={() => {
              sound.playPop(440);
              onToggleVoice();
            }}
            className={`p-2 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer ${
              voiceEnabled
                ? 'bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200'
                : 'bg-gray-100 text-gray-400 border-gray-300'
            }`}
            title={voiceEnabled ? 'Voice Reading: ON' : 'Voice Reading: OFF'}
            aria-label="Toggle spoken voice instructions"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* SFX Button */}
          <button
            id="toggle-sound-button"
            type="button"
            onClick={() => {
              sound.playPop(440);
              onToggleSound();
            }}
            className={`p-2 rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                : 'bg-gray-100 text-gray-400 border-gray-300'
            }`}
            title={soundEnabled ? 'Sound Effects: ON' : 'Sound Effects: OFF'}
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
