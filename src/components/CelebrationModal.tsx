import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { sound } from '../utils/audio';

interface CelebrationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  earnedStars?: number;
  badgeUnlocked?: string;
  badgeIcon?: string;
  onPlayAgain?: () => void;
  onNext?: () => void;
  onGoHome?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  title = 'AMAZING JOB! 🌟',
  message = 'You completed this activity like a superstar!',
  earnedStars = 1,
  badgeUnlocked,
  badgeIcon = '🏆',
  onPlayAgain,
  onNext,
  onGoHome,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      sound.speak(title + ' ' + message);

      // Trigger colorful kid confetti fireworks
      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
        };

        const fire = (particleRatio: number, opts: confetti.Options) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } catch {}
    }
  }, [isOpen, title, message]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-400 text-center relative overflow-hidden"
        >
          {/* Fun Background Accents */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-200 rounded-full blur-xl opacity-60" />

          {/* Star Explosion Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl"
          >
            {badgeUnlocked ? badgeIcon : '⭐'}
          </motion.div>

          {/* Badge Alert if earned */}
          {badgeUnlocked && (
            <motion.div
              initial={{ scale: 0.8, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-4 py-1 mb-3 rounded-full bg-purple-100 border-2 border-purple-300 text-purple-900 font-extrabold text-sm"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              NEW BADGE UNLOCKED!
            </motion.div>
          )}

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-display mb-2">
            {title}
          </h2>

          <p className="text-base sm:text-lg font-bold text-amber-800/90 mb-5">
            {message}
          </p>

          {/* Earned Stars Ribbon */}
          {earnedStars > 0 && (
            <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-amber-50 rounded-2xl border-2 border-amber-200 w-fit mx-auto">
              <span className="text-2xl">⭐</span>
              <span className="text-lg font-black text-amber-900">
                +{earnedStars} Star{earnedStars > 1 ? 's' : ''} Added!
              </span>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
          )}

          {/* Big Chunky Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {onPlayAgain && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playPop(520);
                  onPlayAgain();
                }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-base border-3 border-amber-300 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                PLAY AGAIN
              </motion.button>
            )}

            {onNext && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playPop(620);
                  onNext();
                }}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-black text-base border-3 border-green-600 shadow-md cursor-pointer"
              >
                <span>NEXT GAME</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            )}

            {onGoHome && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playPop(520);
                  onGoHome();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-base border-3 border-sky-300 shadow-md cursor-pointer"
              >
                <Home className="w-5 h-5" />
                HOME
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
