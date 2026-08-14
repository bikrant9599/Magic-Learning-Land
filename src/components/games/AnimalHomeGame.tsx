import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, Home, Volume2 } from 'lucide-react';
import { MASTER_ANIMALS, MasterAnimal } from '../../data/verifiedData';
import { soundEngine } from '../../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { DifficultyLevel } from '../../types';

interface AnimalHomeGameProps {
  difficulty: DifficultyLevel;
  onGameComplete: (starsEarned: number, correctCount: number, totalCount: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export const AnimalHomeGame: React.FC<AnimalHomeGameProps> = ({
  difficulty,
  onGameComplete,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const roundsTotal = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedHomeId, setSelectedHomeId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const targetAnimal: MasterAnimal = MASTER_ANIMALS[currentRound % MASTER_ANIMALS.length];
  const optionCount = difficulty === 'easy' ? 3 : 4;

  const options = React.useMemo(() => {
    const distractors = MASTER_ANIMALS.filter((a) => a.home !== targetAnimal.home)
      .map((a) => ({ home: a.home, homeEmoji: a.homeEmoji, homeName: a.homeName, resident: a.name }))
      .filter((v, i, arr) => arr.findIndex((x) => x.home === v.home) === i)
      .sort(() => 0.5 - Math.random())
      .slice(0, optionCount - 1);

    const correct = {
      home: targetAnimal.home,
      homeEmoji: targetAnimal.homeEmoji,
      homeName: targetAnimal.homeName,
      resident: targetAnimal.name,
    };

    return [correct, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentRound, targetAnimal, optionCount]);

  const handleSelectHome = (homeObj: { home: string; homeEmoji: string; homeName: string }) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedHomeId(homeObj.home);

    const isCorrect = homeObj.home === targetAnimal.home;
    if (isCorrect) {
      soundEngine.playCelebration();
      setScore((s) => s + 1);
      setStars((s) => s + 1);
      onCorrectAnswer();
      setFeedback({
        isCorrect: true,
        text: `Wonderful! A ${targetAnimal.name} lives in a ${targetAnimal.homeName}! ${targetAnimal.fact}`,
      });
    } else {
      soundEngine.playWrong();
      onWrongAnswer();
      setFeedback({
        isCorrect: false,
        text: `Not quite! A ${targetAnimal.name} belongs in a ${targetAnimal.homeName} (${targetAnimal.homeEmoji}).`,
      });
    }

    setTimeout(() => {
      if (currentRound + 1 >= roundsTotal) {
        onGameComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0), roundsTotal);
      } else {
        setCurrentRound((r) => r + 1);
        setIsAnswered(false);
        setSelectedHomeId(null);
        setFeedback(null);
      }
    }, 2800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Progress header */}
      <div className="w-full flex items-center justify-between mb-4 bg-emerald-100/80 px-4 py-2 rounded-2xl border border-emerald-200">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-emerald-700" />
          <span className="font-bold text-emerald-900 text-sm md:text-base">
            Round {currentRound + 1} of {roundsTotal}
          </span>
        </div>
        <div className="flex items-center gap-1 font-black text-emerald-700">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{stars} Stars</span>
        </div>
      </div>

      {/* Target Animal Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl shadow-xl text-center w-full max-w-lg mb-6 border-4 border-white/80">
        <span className="text-7xl block mb-2 animate-bounce">{targetAnimal.emoji}</span>
        <h2 className="text-2xl font-black">{targetAnimal.name}</h2>
        <p className="text-emerald-100 text-sm mt-1">
          Where does the friendly {targetAnimal.name} live? Help them find their cozy home!
        </p>
        <button
          onClick={() => soundEngine.playAnimalSound(targetAnimal.soundId)}
          className="mt-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full font-bold transition-all"
        >
          <Volume2 className="w-4 h-4" />
          <span>Hear "{targetAnimal.onomatopoeia}"</span>
        </button>
      </div>

      {/* Home Options Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-4">
        {options.map((item) => {
          const isSelected = selectedHomeId === item.home;
          const isCorrect = item.home === targetAnimal.home;

          let btnStyle = 'bg-white border-4 border-emerald-200 hover:border-emerald-400 hover:shadow-lg';
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
              key={item.home}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.04, y: -4 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              onClick={() => handleSelectHome(item)}
              className={`p-5 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-5xl">{item.homeEmoji}</span>
              <span className="font-extrabold text-stone-800 text-base text-center">{item.homeName}</span>
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
