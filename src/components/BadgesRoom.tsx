import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Badge } from '../types';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { UKG_BADGES, UNLOCKABLE_REWARD_LOCATIONS } from '../data/ukgData';
import { Trophy, Lock, Sparkles, Star, ArrowLeft, Coins, MapPin, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BadgesRoomProps {
  badges: Badge[];
  stars: number;
  coins?: number;
  onNavigateHome: () => void;
}

export const BadgesRoom: React.FC<BadgesRoomProps> = ({
  badges,
  stars,
  coins = 25,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'all_badges' | 'ukg_badges' | 'secret_realms'>('ukg_badges');

  const unlockedCount = badges.filter((b) => b.unlocked).length + UKG_BADGES.filter((b) => stars >= b.requiredStars).length;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-purple-100 via-amber-50 to-pink-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Header / Mascot */}
      <div className="max-w-4xl mx-auto w-full">
        <Mascot
          message={`You have earned ${stars} shiny stars ⭐, ${coins} gold coins 🪙 and unlocked ${unlockedCount} adventure trophies!`}
          voiceText={`Welcome to your treasure room! You have earned ${stars} stars and ${coins} gold coins!`}
          mood="cheering"
        />

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 my-3">
          <button
            onClick={() => {
              sound.playPop(480);
              setActiveTab('ukg_badges');
            }}
            className={`py-2 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 cursor-pointer transition-all ${
              activeTab === 'ukg_badges'
                ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                : 'bg-white text-amber-950 border-amber-200 hover:bg-amber-100'
            }`}
          >
            🏆 UKG Adventure Badges
          </button>

          <button
            onClick={() => {
              sound.playPop(480);
              setActiveTab('secret_realms');
            }}
            className={`py-2 px-4 rounded-2xl font-black text-xs sm:text-sm border-2 cursor-pointer transition-all ${
              activeTab === 'secret_realms'
                ? 'bg-purple-600 text-white border-purple-700 shadow-md'
                : 'bg-white text-purple-950 border-purple-200 hover:bg-purple-100'
            }`}
          >
            🏰 Unlockable Secret Realms
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto w-full my-2 flex-1">
        {activeTab === 'ukg_badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {UKG_BADGES.map((badge) => {
              const isUnlocked = stars >= badge.requiredStars;

              return (
                <motion.div
                  key={badge.id}
                  id={`ukg-badge-card-${badge.id}`}
                  whileHover={{ scale: 1.03 }}
                  className={`p-4 rounded-3xl border-4 transition-all shadow-md flex items-center gap-3.5 relative overflow-hidden ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-amber-100'
                      : 'bg-white/60 border-gray-200 opacity-75'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 shrink-0 ${
                      isUnlocked
                        ? `bg-gradient-to-br ${badge.color} border-white text-white`
                        : 'bg-gray-200 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="text-base font-black text-amber-950 font-display truncate">
                        {badge.name}
                      </h3>
                      {isUnlocked && <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    </div>

                    <p className="text-[11px] font-bold text-amber-900/80 mt-0.5 line-clamp-2">
                      {badge.description}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1">
                      {isUnlocked ? (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          UNLOCKED ⭐
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          Need {badge.requiredStars} Stars
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'secret_realms' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {UNLOCKABLE_REWARD_LOCATIONS.map((loc) => {
              const isUnlocked = stars >= loc.requiredStars;

              return (
                <motion.div
                  key={loc.id}
                  whileHover={{ scale: isUnlocked ? 1.04 : 1 }}
                  className={`p-5 rounded-3xl border-4 text-center flex flex-col justify-between shadow-md ${
                    isUnlocked
                      ? 'bg-white border-purple-400 shadow-purple-100'
                      : 'bg-white/60 border-gray-200 opacity-70'
                  }`}
                >
                  <div>
                    <span className="text-6xl block mb-2">{loc.icon}</span>
                    <h3 className="text-lg font-black text-purple-950 font-display">
                      {loc.name}
                    </h3>
                    <p className="text-xs font-bold text-purple-800 mt-1">
                      {loc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-purple-100">
                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          triggerConfetti();
                          sound.playFanfare();
                          sound.speak(`Welcome to ${loc.name}! You are a true learning explorer!`);
                        }}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs shadow-xs cursor-pointer hover:brightness-105"
                      >
                        VISIT REALM 🚀
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-gray-500 flex items-center justify-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock at {loc.requiredStars} ⭐</span>
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
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
          className="w-full py-3.5 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black text-base border-4 border-amber-500 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>BACK TO ADVENTURE MAP 🗺️</span>
        </motion.button>
      </div>
    </div>
  );
};
