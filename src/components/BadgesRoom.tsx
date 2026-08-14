import React from 'react';
import { motion } from 'motion/react';
import { Badge } from '../types';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { Trophy, Lock, Sparkles, Star, ArrowLeft } from 'lucide-react';

interface BadgesRoomProps {
  badges: Badge[];
  stars: number;
  onNavigateHome: () => void;
}

export const BadgesRoom: React.FC<BadgesRoomProps> = ({
  badges,
  stars,
  onNavigateHome,
}) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-purple-100 via-amber-50 to-pink-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Header / Mascot */}
      <div className="max-w-3xl mx-auto w-full">
        <Mascot
          message={`You have earned ${stars} shiny stars and unlocked ${unlockedCount} badges! 🏆`}
          voiceText={`Look at all your shiny badges and trophies! You have ${stars} stars!`}
          mood="cheering"
        />
      </div>

      {/* Badges Grid */}
      <div className="max-w-4xl mx-auto w-full my-4 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {badges.map((badge) => {
            return (
              <motion.div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                whileHover={{ scale: 1.03 }}
                className={`p-5 rounded-3xl border-4 transition-all shadow-md flex items-center gap-4 relative overflow-hidden ${
                  badge.unlocked
                    ? 'bg-white border-amber-300 shadow-amber-100'
                    : 'bg-white/60 border-gray-200 opacity-75'
                }`}
              >
                {/* Badge Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 shrink-0 ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${badge.color} border-white text-white`
                      : 'bg-gray-200 border-gray-300 text-gray-400'
                  }`}
                >
                  {badge.unlocked ? badge.icon : <Lock className="w-7 h-7 text-gray-400" />}
                </div>

                {/* Badge Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-black text-amber-950 font-display truncate">
                      {badge.name}
                    </h3>
                    {badge.unlocked && <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />}
                  </div>

                  <p className="text-xs font-bold text-amber-800/80 mt-0.5 line-clamp-2">
                    {badge.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1">
                    {badge.unlocked ? (
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        UNLOCKED ⭐
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        Need {badge.requiredStars} Stars
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Back to Land button */}
      <div className="max-w-md mx-auto w-full mb-2">
        <motion.button
          id="badges-back-home-button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            sound.playPop(520);
            onNavigateHome();
          }}
          className="w-full py-4 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black text-lg border-4 border-amber-500 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>PLAY MORE GAMES!</span>
        </motion.button>
      </div>
    </div>
  );
};
