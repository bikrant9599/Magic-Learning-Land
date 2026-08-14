import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, Sparkles, RefreshCw, Trophy } from 'lucide-react';
import { MASTER_ANIMALS, MasterAnimal } from '../../data/verifiedData';
import { soundEngine } from '../../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import { DifficultyLevel } from '../../types';

interface AnimalSoundGameProps {
  difficulty: DifficultyLevel;
  onGameComplete: (starsEarned: number, correctCount: number, totalCount: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export const AnimalSoundGame: React.FC<AnimalSoundGameProps> = ({
  difficulty,
  onGameComplete,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const roundsTotal = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Pick target animal and options
  const targetAnimal: MasterAnimal = MASTER_ANIMALS[currentRound % MASTER_ANIMALS.length];
  
  // Option count based on difficulty
  const optionCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  
  const options = React.useMemo(() => {
    const distractors = MASTER_ANIMALS.filter((a) => a.id !== targetAnimal.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, optionCount - 1);
    return [targetAnimal, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentRound, targetAnimal, optionCount]);

  const playTargetSound = () => {
    setIsPlayingSound(true);
    soundEngine.playAnimalSound(targetAnimal.soundId);
    setTimeout(() => setIsPlayingSound(false), 1200);
  };

  React.useEffect(() => {
    // Play sound automatically at start of round
    const timer = setTimeout(() => {
      playTargetSound();
    }, 400);
    return () => clearTimeout(timer);
  }, [currentRound]);

  const handleSelectOption = (animal: MasterAnimal) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnimalId(animal.id);

    const isCorrect = animal.id === targetAnimal.id;
    if (isCorrect) {
      soundEngine.playCelebration();
      setScore((s) => s + 1);
      setStars((s) => s + 1);
      onCorrectAnswer();
      setFeedback({
        isCorrect: true,
        text: `Super! That is a ${animal.name}! ${animal.name} makes the sound "${animal.onomatopoeia}". ${animal.fact}`,
      });
    } else {
      soundEngine.playWrong();
      onWrongAnswer();
      setFeedback({
        isCorrect: false,
        text: `Oops! That was a ${animal.name} (${animal.onomatopoeia}). The sound was a ${targetAnimal.name} (${targetAnimal.onomatopoeia})!`,
      });
    }

    setTimeout(() => {
      if (currentRound + 1 >= roundsTotal) {
        onGameComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0), roundsTotal);
      } else {
        setCurrentRound((r) => r + 1);
        setIsAnswered(false);
        setSelectedAnimalId(null);
        setFeedback(null);
      }
    }, 2800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
      {/* Progress header */}
      <div className="w-full flex items-center justify-between mb-4 bg-amber-100/80 px-4 py-2 rounded-2xl border border-amber-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐾</span>
          <span className="font-bold text-amber-900 text-sm md:text-base">
            Round {currentRound + 1} of {roundsTotal}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: roundsTotal }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentRound ? 'bg-emerald-500' : i === currentRound ? 'bg-amber-500 ring-2 ring-amber-300' : 'bg-stone-300'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 font-black text-amber-700">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{stars} Stars</span>
        </div>
      </div>

      {/* Target Audio Player Box */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-6 rounded-3xl shadow-xl text-center w-full max-w-lg mb-6 text-white border-4 border-white/80">
        <h2 className="text-lg md:text-2xl font-black mb-1 drop-shadow">Listen to the Animal!</h2>
        <p className="text-amber-100 text-xs md:text-sm font-medium mb-4">
          Tap the big sound button to hear the mystery animal!
        </p>

        <motion.button
          id="btn_play_animal_sound"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playTargetSound}
          className={`px-8 py-5 rounded-full font-black text-xl md:text-2xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-all ${
            isPlayingSound
              ? 'bg-amber-200 text-amber-900 ring-8 ring-amber-300/60 scale-105'
              : 'bg-white text-orange-600 hover:bg-amber-50'
          }`}
        >
          <Volume2 className={`w-8 h-8 ${isPlayingSound ? 'animate-bounce text-orange-600' : ''}`} />
          <span>{isPlayingSound ? 'Playing Sound...' : 'Play Animal Sound 🔊'}</span>
        </motion.button>
      </div>

      {/* Options Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-4">
        {options.map((animal) => {
          const isSelected = selectedAnimalId === animal.id;
          const isCorrect = animal.id === targetAnimal.id;

          let btnStyle = 'bg-white border-4 border-amber-200 hover:border-amber-400 hover:shadow-lg';
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
              key={animal.id}
              id={`option_${animal.id}`}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.04, y: -4 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              onClick={() => handleSelectOption(animal)}
              className={`p-4 md:p-6 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-5xl md:text-6xl drop-shadow">{animal.emoji}</span>
              <span className="font-extrabold text-stone-800 text-base md:text-lg">{animal.name}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                "{animal.onomatopoeia}"
              </span>
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
