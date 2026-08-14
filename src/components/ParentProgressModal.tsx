import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParentProgressData } from '../types';
import { PARENT_HOME_ACTIVITIES } from '../data/ukgData';
import { sound } from '../utils/audio';
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  TrendingUp,
  AlertCircle,
  RotateCcw,
  Printer,
  Heart,
} from 'lucide-react';

interface ParentProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progressData: ParentProgressData;
  stars: number;
  coins: number;
  onResetProgress: () => void;
}

export const ParentProgressModal: React.FC<ParentProgressModalProps> = ({
  isOpen,
  onClose,
  progressData,
  stars,
  coins,
  onResetProgress,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [gateAnswer, setGateAnswer] = useState<string>('');
  const [gateError, setGateError] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Simple parental gate question: 5 + 4 = 9
  const gateQuestion = { prompt: '5 + 4', answer: '9' };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateAnswer.trim() === gateQuestion.answer) {
      sound.playSuccess();
      setIsUnlocked(true);
      setGateError(false);
    } else {
      sound.playTryAgain();
      setGateError(true);
    }
  };

  if (!isOpen) return null;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins} min ${secs} sec`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl max-w-2xl w-full border-4 border-purple-400 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">👨‍👩‍👧</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-wide">
                Parent Progress Dashboard
              </h2>
              <p className="text-xs text-purple-200 font-medium">
                Magic Learning Land • UKG Learning Analytics
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop(450);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isUnlocked ? (
            /* Parental Security Gate */
            <div className="text-center py-6 max-w-sm mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 border-2 border-purple-300 text-purple-700 flex items-center justify-center mx-auto text-3xl">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-black text-purple-950">Grown-Ups Gate</h3>
                <p className="text-xs text-purple-800 font-semibold mt-1">
                  Please solve this quick problem to verify you are a parent or teacher:
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-3">
                <div className="text-2xl font-black text-purple-950 bg-purple-50 py-2 rounded-2xl border-2 border-purple-200">
                  What is {gateQuestion.prompt} = ?
                </div>
                <input
                  type="text"
                  value={gateAnswer}
                  onChange={(e) => setGateAnswer(e.target.value)}
                  placeholder="Enter answer"
                  className="w-full text-center text-xl font-bold py-2.5 px-4 rounded-xl border-2 border-purple-300 focus:border-purple-600 focus:outline-none"
                  autoFocus
                />
                {gateError && (
                  <p className="text-xs font-bold text-rose-600">
                    Incorrect. Please try again (Hint: 5 + 4 = 9).
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base shadow-md cursor-pointer transition-colors"
                >
                  UNLOCK PROGRESS REPORT 🔓
                </button>
              </form>
            </div>
          ) : showCertificate ? (
            /* Certificate of Achievement */
            <div className="bg-amber-50 rounded-3xl p-6 border-4 border-amber-400 text-center space-y-4 relative">
              <span className="text-5xl block">🏆</span>
              <h3 className="text-2xl font-display font-black text-amber-950">
                UKG ADVENTURE LEARNER DIPLOMA
              </h3>
              <p className="text-sm font-bold text-amber-900">
                Awarded for outstanding progress across Reading Forest, Number Kingdom, Math Mountain & Puzzle Planet!
              </p>
              <div className="flex justify-center gap-4 py-2">
                <div className="bg-white px-4 py-2 rounded-2xl border border-amber-300 font-black text-amber-950 text-sm">
                  ⭐ {stars} Stars Earned
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-amber-300 font-black text-amber-950 text-sm">
                  🪙 {coins} Gold Coins
                </div>
              </div>
              <p className="text-xs text-amber-800 italic">
                “Every big journey begins with curious questions and joyful play!”
              </p>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-700 cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            /* Full Parent Dashboard */
            <>
              {/* Top Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-emerald-50 rounded-2xl p-3 border-2 border-emerald-200 text-center">
                  <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                    Learning Time
                  </span>
                  <span className="text-base font-black text-emerald-950">
                    {formatTime(progressData.timeSpentSeconds)}
                  </span>
                </div>

                <div className="bg-amber-50 rounded-2xl p-3 border-2 border-amber-200 text-center">
                  <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">
                    Stars & Coins
                  </span>
                  <span className="text-base font-black text-amber-950">
                    {stars} ⭐ • {coins} 🪙
                  </span>
                </div>

                <div className="bg-sky-50 rounded-2xl p-3 border-2 border-sky-200 text-center">
                  <TrendingUp className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 block">
                    Accuracy Rate
                  </span>
                  <span className="text-base font-black text-sky-950">
                    {progressData.totalAttempts > 0
                      ? Math.round((progressData.correctAttempts / progressData.totalAttempts) * 100)
                      : 100}
                    %
                  </span>
                </div>

                <div className="bg-purple-50 rounded-2xl p-3 border-2 border-purple-200 text-center">
                  <BookOpen className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block">
                    Grade Level
                  </span>
                  <span className="text-base font-black text-purple-950">UKG (5–6 Yrs)</span>
                </div>
              </div>

              {/* World Activity Breakdown */}
              <div className="bg-purple-50/50 rounded-2xl p-4 border-2 border-purple-200 space-y-3">
                <h4 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  <span>UKG Learning Realms Mastery</span>
                </h4>

                <div className="space-y-2 text-xs font-bold text-purple-950">
                  <div className="flex items-center justify-between">
                    <span>📖 Reading Forest (CVC, Missing Letters, Sentences)</span>
                    <span className="text-emerald-700 font-extrabold">Practiced & Active ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🔢 Number Kingdom (1–100, Before/After, Alligator Croc)</span>
                    <span className="text-emerald-700 font-extrabold">Practiced & Active ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>➕ Math Mountain (Visual Addition, Subtraction, Chests)</span>
                    <span className="text-emerald-700 font-extrabold">Practiced & Active ✓</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🧠 Puzzle Planet (Odd One Out, Memory, Patterns)</span>
                    <span className="text-emerald-700 font-extrabold">Practiced & Active ✓</span>
                  </div>
                </div>
              </div>

              {/* Parent Home Activity Tips */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
                  <span>Fun Learning Games To Try At Home Together</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PARENT_HOME_ACTIVITIES.map((act, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white border-2 border-purple-100 shadow-xs space-y-1"
                    >
                      <h5 className="text-xs font-black text-purple-900">{act.title}</h5>
                      <span className="text-[10px] font-bold text-purple-600 block">{act.topic}</span>
                      <p className="text-[11px] text-gray-700 leading-relaxed font-medium">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions: Certificate & Reset */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-purple-100">
                <button
                  onClick={() => setShowCertificate(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>VIEW CERTIFICATE 🏆</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all star and coin progress?')) {
                      onResetProgress();
                      sound.playPop(350);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Progress</span>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
