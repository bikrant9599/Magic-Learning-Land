import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Beaker } from 'lucide-react';
import { COLOR_MIXING_PAIRS } from '../../data/verifiedData';
import { soundEngine } from '../../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { DifficultyLevel } from '../../types';

interface ColorMixingGameProps {
  difficulty: DifficultyLevel;
  onGameComplete: (starsEarned: number, correctCount: number, totalCount: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export const ColorMixingGame: React.FC<ColorMixingGameProps> = ({
  difficulty,
  onGameComplete,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const roundsTotal = difficulty === 'easy' ? 3 : 4;
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isMixing, setIsMixing] = useState(false);

  const formula = COLOR_MIXING_PAIRS[currentRound % COLOR_MIXING_PAIRS.length];

  const options = React.useMemo(() => {
    const allResults = ['Orange', 'Green', 'Purple', 'Pink', 'Brown', 'Teal'];
    const distractors = allResults
      .filter((c) => c !== formula.result && c !== formula.color1 && c !== formula.color2)
      .slice(0, 3);
    return [{ name: formula.result, emoji: formula.resultEmoji, hex: formula.hex, isCorrect: true }, ...distractors.map((d) => ({ name: d, emoji: '🎨', hex: '#666', isCorrect: false }))].sort(
      () => 0.5 - Math.random()
    );
  }, [currentRound, formula]);

  const handleSelectColor = (item: { name: string; isCorrect: boolean }) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedColor(item.name);
    setIsMixing(true);

    const isCorrect = item.isCorrect;
    setTimeout(() => {
      setIsMixing(false);
      if (isCorrect) {
        soundEngine.playCelebration();
        setScore((s) => s + 1);
        setStars((s) => s + 1);
        onCorrectAnswer();
        setFeedback({
          isCorrect: true,
          text: `Magical! ${formula.color1} + ${formula.color2} mixes into ${formula.result}!`,
        });
      } else {
        soundEngine.playWrong();
        onWrongAnswer();
        setFeedback({
          isCorrect: false,
          text: `Almost! ${formula.color1} + ${formula.color2} makes ${formula.result} (${formula.resultEmoji}).`,
        });
      }

      setTimeout(() => {
        if (currentRound + 1 >= roundsTotal) {
          onGameComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0), roundsTotal);
        } else {
          setCurrentRound((r) => r + 1);
          setIsAnswered(false);
          setSelectedColor(null);
          setFeedback(null);
        }
      }, 2600);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Progress header */}
      <div className="w-full flex items-center justify-between mb-4 bg-amber-100/80 px-4 py-2 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2">
          <Beaker className="w-5 h-5 text-amber-700" />
          <span className="font-bold text-amber-900 text-sm md:text-base">
            Color Mixing Lab • Experiment {currentRound + 1} of {roundsTotal}
          </span>
        </div>
        <div className="flex items-center gap-1 font-black text-amber-700">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{stars} Stars</span>
        </div>
      </div>

      {/* Test Tubes Mixing Experiment Stage */}
      <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white p-6 rounded-3xl shadow-xl text-center w-full max-w-lg mb-6 border-4 border-white/80">
        <h2 className="text-xl md:text-2xl font-black mb-4">What color will they make?</h2>

        <div className="flex items-center justify-center gap-4 my-2">
          <div className="flex flex-col items-center bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <span className="text-4xl">{formula.emoji1}</span>
            <span className="font-bold text-sm mt-1">{formula.color1}</span>
          </div>

          <span className="text-3xl font-black text-amber-200">+</span>

          <div className="flex flex-col items-center bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
            <span className="text-4xl">{formula.emoji2}</span>
            <span className="font-bold text-sm mt-1">{formula.color2}</span>
          </div>

          <span className="text-3xl font-black text-amber-200">=</span>

          <div
            className={`flex flex-col items-center p-4 rounded-2xl border-2 border-white/60 min-w-24 transition-all ${
              isMixing
                ? 'animate-spin bg-white/40'
                : isAnswered
                ? 'bg-white text-stone-900'
                : 'bg-white/20 text-white'
            }`}
          >
            <span className="text-4xl">{isAnswered ? formula.resultEmoji : '❓'}</span>
            <span className="font-bold text-xs mt-1">{isAnswered ? formula.result : 'Secret!'}</span>
          </div>
        </div>
      </div>

      {/* Options Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-4">
        {options.map((item) => {
          const isSelected = selectedColor === item.name;
          const isCorrect = item.name === formula.result;

          let btnStyle = 'bg-white border-4 border-stone-200 hover:border-amber-400 hover:shadow-lg';
          if (isAnswered) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-100 border-4 border-emerald-500 shadow-emerald-200 ring-4 ring-emerald-300';
            } else if (isSelected) {
              btnStyle = 'bg-rose-100 border-4 border-rose-400 opacity-60';
            } else {
              btnStyle = 'bg-white/50 border-2 border-stone-200 opacity-40';
            }
          }

          return (
            <motion.button
              key={item.name}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.04, y: -4 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              onClick={() => handleSelectColor(item)}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="font-extrabold text-stone-800 text-base text-center">{item.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl border-2 flex items-center gap-3 w-full max-w-xl text-sm md:text-base font-bold shadow-md ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                : 'bg-rose-50 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
            )}
            <div>
              <p>{feedback.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
