import React from 'react';
import { motion } from 'motion/react';
import { CharacterCompanion } from '../types';
import { UKG_COMPANIONS } from '../data/ukgData';
import { sound } from '../utils/audio';
import { X, Check, Lock, Star, Sparkles, Volume2 } from 'lucide-react';

interface CharacterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompanion: CharacterCompanion;
  onSelectCompanion: (companion: CharacterCompanion) => void;
  stars: number;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  isOpen,
  onClose,
  selectedCompanion,
  onSelectCompanion,
  stars,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl max-w-xl w-full border-4 border-amber-400 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-amber-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🐾</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-wide">
                Choose Your Companion
              </h2>
              <p className="text-xs text-amber-900 font-bold">
                Pick a cute buddy to join your UKG adventures!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop(450);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/40 hover:bg-white/60 text-amber-950 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Companion Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {UKG_COMPANIONS.map((buddy) => {
            const isSelected = selectedCompanion.id === buddy.id;
            const threshold = buddy.unlockedAtStars ?? buddy.requiredStars ?? 0;
            const isUnlocked = stars >= threshold;

            return (
              <motion.div
                key={buddy.id}
                whileHover={{ scale: isUnlocked ? 1.03 : 1 }}
                whileTap={{ scale: isUnlocked ? 0.97 : 1 }}
                className={`p-4 rounded-3xl border-3 transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-100/90 border-amber-500 shadow-md ring-3 ring-amber-300'
                    : isUnlocked
                    ? 'bg-white border-amber-200 hover:border-amber-400 shadow-xs'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-5xl">{buddy.avatar}</span>
                    <button
                      onClick={() => {
                        sound.playPop(520);
                        sound.speak(buddy.greeting);
                      }}
                      className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 cursor-pointer"
                      title="Hear voice"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-black text-amber-950 font-display">
                    {buddy.name}
                  </h3>
                  <span className="text-xs font-extrabold text-amber-700 block">
                    {buddy.role}
                  </span>
                  <p className="text-xs text-gray-700 italic mt-1.5 font-medium">
                    “{buddy.greeting}”
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-amber-200 flex items-center justify-between">
                  {!isUnlocked ? (
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock at {buddy.unlockedAtStars} ⭐</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playPop(580);
                        sound.speak(`Yay! ${buddy.name} is now your adventure buddy!`);
                        onSelectCompanion(buddy);
                        onClose();
                      }}
                      className={`w-full py-2 rounded-xl font-black text-xs cursor-pointer shadow-xs transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                      }`}
                    >
                      {isSelected ? '✓ ACTIVE BUDDY' : 'CHOOSE BUDDY'}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
