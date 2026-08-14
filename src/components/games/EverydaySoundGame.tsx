import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { COMMON_SOUNDS, CommonSoundItem } from '../../data/verifiedData';
import { soundEngine } from '../../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { DifficultyLevel } from '../../types';

interface EverydaySoundGameProps {
  difficulty: DifficultyLevel;
  onGameComplete: (starsEarned: number, correctCount: number, totalCount: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export const EverydaySoundGame: React.FC<EverydaySoundGameProps> = ({
  difficulty,
  onGameComplete,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const roundsTotal = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const targetSound: CommonSoundItem = COMMON_SOUNDS[currentRound % COMMON_SOUNDS.length];
  const optionCount = difficulty === 'easy' ? 3 : 4;

  const options = React.useMemo(() => {
    const distractors = COMMON_SOUNDS.filter((s) => s.id !== targetSound.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, optionCount - 1);
    return [targetSound, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentRound, targetSound, optionCount]);

  const playCurrentSound = () => {
    setIsPlayingSound(true);
    soundEngine.playCommonSound(targetSound.soundEffect);
    setTimeout(() => setIsPlayingSound(false), 1200);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      playCurrentSound();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentRound]);

  const handleSelectOption = (item: CommonSoundItem) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedId(item.id);

    const isCorrect = item.id === targetSound.id;
    if (isCorrect) {
      soundEngine.playCelebration();
      setScore((s) => s + 1);
      setStars((s) => s + 1);
      onCorrectAnswer();
      setFeedback({
        isCorrect: true,
        text: `Brilliant detective! That was the sound of a ${targetSound.name}! ${targetSound.description}`,
      });
    } else {
      soundEngine.playWrong();
      onWrongAnswer();
      setFeedback({
        isCorrect: false,
        text: `Nice try! The sound was made by a ${targetSound.name} (${targetSound.emoji}).`,
      });
    }

    setTimeout(() => {
      if (currentRound + 1 >= roundsTotal) {
        onGameComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0), roundsTotal);
      } else {
        setCurrentRound((r) => r + 1);
        setIsAnswered(false);
        setSelectedId(null);
        setFeedback(null);
      }
    }, 2800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Progress header */}
      <div className="w-full flex items-center justify-between mb-4 bg-purple-100/80 px-4 py-2 rounded-2xl border border-purple-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕵️‍♂️</span>
          <span className="font-bold text-purple-900 text-sm md:text-base">
            Sound Detective • Round {currentRound + 1} of {roundsTotal}
          </span>
        </div>
        <div className="flex items-center gap-1 font-black text-purple-700">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>{stars} Stars</span>
        </div>
      </div>

      {/* Target Audio Box */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6 rounded-3xl shadow-xl text-center w-full max-w-lg mb-6 text-white border-4 border-white/80">
        <h2 className="text-xl md:text-2xl font-black mb-1">Everyday Sound Detective!</h2>
        <p className="text-purple-100 text-xs md:text-sm font-medium mb-4">
          Listen closely to the real-world sound and identify what is making it!
        </p>

        <motion.button
          id="btn_play_everyday_sound"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playCurrentSound}
          className={`px-8 py-5 rounded-full font-black text-xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-all ${
            isPlayingSound
              ? 'bg-purple-200 text-purple-900 ring-8 ring-purple-300/60 scale-105'
              : 'bg-white text-purple-700 hover:bg-purple-50'
          }`}
        >
          <Volume2 className={`w-8 h-8 ${isPlayingSound ? 'animate-bounce text-purple-700' : ''}`} />
          <span>{isPlayingSound ? 'Playing Sound...' : 'Play Sound 🔊'}</span>
        </motion.button>
      </div>

      {/* Options Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-4">
        {options.map((item) => {
          const isSelected = selectedId === item.id;
          const isCorrect = item.id === targetSound.id;

          let btnStyle = 'bg-white border-4 border-purple-200 hover:border-purple-400 hover:shadow-lg';
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
              key={item.id}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.04, y: -4 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              onClick={() => handleSelectOption(item)}
              className={`p-5 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-5xl">{item.emoji}</span>
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
