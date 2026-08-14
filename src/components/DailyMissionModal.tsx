import React from 'react';
import { Sparkles, CheckCircle2, Circle, Flame, Trophy, X, Play } from 'lucide-react';
import { DailyMissionState, GameMetadata } from '../types';
import { soundEngine } from '../utils/audio';
import { motion, AnimatePresence } from 'motion/react';

interface DailyMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  missionState: DailyMissionState;
  onSelectGame: (gameId: string) => void;
  onClaimBonus: () => void;
}

export const DailyMissionModal: React.FC<DailyMissionModalProps> = ({
  isOpen,
  onClose,
  missionState,
  onSelectGame,
  onClaimBonus,
}) => {
  if (!isOpen) return null;

  const completedAll = missionState.items.every((it) => it.completed);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-4 border-amber-400 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-md">
            <Flame className="w-4 h-4 fill-current text-yellow-300" />
            <span>Daily Learning Mission</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-stone-800">Today’s 5 Adventures</h2>
          <p className="text-stone-600 text-xs md:text-sm mt-1">
            Complete all 5 activities today to earn <span className="font-bold text-amber-600">+50 Bonus Stars</span>!
          </p>
        </div>

        {/* Mission List */}
        <div className="space-y-3 mb-6">
          {missionState.items.map((item, idx) => (
            <div
              key={item.gameId}
              className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                item.completed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-extrabold text-sm">{item.title}</h4>
                  <span className="text-xs font-bold text-stone-500 capitalize">
                    {item.grade} • {item.category}
                  </span>
                </div>
              </div>

              {item.completed ? (
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-100 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Done</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onSelectGame(item.gameId);
                  }}
                  className="flex items-center gap-1 text-xs bg-amber-500 hover:bg-amber-600 text-white font-black px-4 py-2 rounded-xl shadow-sm transition-transform hover:scale-105 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Reward Bonus Footer */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 p-4 rounded-2xl border-2 border-amber-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            <div>
              <div className="font-black text-amber-900 text-sm">
                Progress: {missionState.completedCount} / 5 Finished
              </div>
              <span className="text-xs text-amber-700 font-bold">Reward: +50 Stars & 100 Gold Coins</span>
            </div>
          </div>

          {completedAll && !missionState.bonusClaimed ? (
            <button
              onClick={() => {
                soundEngine.playVictoryFanfare();
                onClaimBonus();
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg animate-bounce transition-transform cursor-pointer"
            >
              Claim Bonus! 🎉
            </button>
          ) : missionState.bonusClaimed ? (
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
              Claimed! ✨
            </span>
          ) : (
            <span className="text-xs font-bold text-stone-500">{5 - missionState.completedCount} more to go</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
