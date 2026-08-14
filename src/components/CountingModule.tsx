import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountingActivity } from '../types';
import { ENCOURAGING_MESSAGES } from '../data/gameData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import { Hash, Sparkles, CheckCircle2, Carrot, HelpCircle } from 'lucide-react';

interface CountingModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
}

const COUNTING_OBJECTS = [
  { name: 'Apples', emoji: '🍎', singular: 'apple' },
  { name: 'Shiny Stars', emoji: '⭐', singular: 'star' },
  { name: 'Balloons', emoji: '🎈', singular: 'balloon' },
  { name: 'Ducklings', emoji: '🐥', singular: 'duckling' },
  { name: 'Cookies', emoji: '🍪', singular: 'cookie' },
  { name: 'Strawberries', emoji: '🍓', singular: 'strawberry' },
];

export const CountingModule: React.FC<CountingModuleProps> = ({
  onEarnStar,
  onNavigateHome,
}) => {
  const [activity, setActivity] = useState<CountingActivity>('count');

  // Count & Choose Activity State
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [targetNumber, setTargetNumber] = useState(3);
  const [currentObject, setCurrentObject] = useState(COUNTING_OBJECTS[0]);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);

  // Feed the Bunny Mini-Game State
  const [bunnyTarget, setBunnyTarget] = useState(4);
  const [bunnyFedCount, setBunnyFedCount] = useState(0);
  const [bunnyChewing, setBunnyChewing] = useState(false);

  // Celebration Modal State
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  // Generate randomized level for Count & Choose
  useEffect(() => {
    generateLevel(0);
  }, []);

  const generateLevel = (index: number) => {
    // Numbers 1 to 10 progression tailored for nursery (1 to 5 first, then up to 10)
    const numbersPool = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const target = numbersPool[index % numbersPool.length];
    const obj = COUNTING_OBJECTS[index % COUNTING_OBJECTS.length];

    // Generate 3 choices
    const choices = [target];
    while (choices.length < 3) {
      const delta = Math.random() > 0.5 ? 1 : -1;
      let candidate = target + delta;
      if (candidate < 1) candidate = target + 2;
      if (candidate > 10) candidate = target - 2;
      if (!choices.includes(candidate)) {
        choices.push(candidate);
      } else {
        const fallback = Math.floor(Math.random() * 10) + 1;
        if (!choices.includes(fallback)) choices.push(fallback);
      }
    }

    setTargetNumber(target);
    setCurrentObject(obj);
    setOptions(choices.sort(() => Math.random() - 0.5));
    setTappedIndices([]);
    setSelectedNumber(null);
    setHintMessage(null);
  };

  // Voice narration for Count & Choose
  useEffect(() => {
    if (activity === 'count') {
      sound.speak(`How many ${currentObject.name} can you count? Tap them to count!`);
    }
  }, [activity, currentLevelIndex, targetNumber, currentObject]);

  // Tap individual object to count aloud
  const handleTapObject = (idx: number) => {
    if (tappedIndices.includes(idx)) return;

    const nextCount = tappedIndices.length + 1;
    sound.playPop(400 + nextCount * 40);
    sound.speak(`${nextCount}!`);
    setTappedIndices((prev) => [...prev, idx]);
  };

  // Handle number choice selection
  const handleSelectNumber = (num: number) => {
    setSelectedNumber(num);

    if (num === targetNumber) {
      sound.playSuccess();
      const encouragement = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
      setHintMessage(encouragement);
      sound.speak(`${encouragement}! There are ${targetNumber} ${currentObject.name}!`);
      onEarnStar(1, 'counting');

      setTimeout(() => {
        if (currentLevelIndex + 1 < 5) {
          const nextIdx = currentLevelIndex + 1;
          setCurrentLevelIndex(nextIdx);
          generateLevel(nextIdx);
        } else {
          setCelebrationMsg({
            title: 'COUNTING STAR! 🔢',
            message: 'You counted all the objects like a math champion!',
          });
          setShowCelebration(true);
        }
      }, 1400);
    } else {
      sound.playTryAgain();
      setHintMessage(`Let's count together! Tap each ${currentObject.singular} 🌟`);
      sound.speak(`Almost! Let's tap and count them together.`);
      setTimeout(() => {
        setSelectedNumber(null);
      }, 1000);
    }
  };

  // Feed the Bunny Logic
  const handleFeedCarrot = () => {
    if (bunnyFedCount >= bunnyTarget) return;

    const nextCount = bunnyFedCount + 1;
    setBunnyFedCount(nextCount);
    sound.playCrunch();
    sound.speak(`${nextCount} carrot${nextCount > 1 ? 's' : ''}! Yum yum!`);
    setBunnyChewing(true);
    setTimeout(() => setBunnyChewing(false), 500);

    if (nextCount === bunnyTarget) {
      setTimeout(() => {
        sound.playSuccess();
        onEarnStar(2, 'counting');
        setCelebrationMsg({
          title: 'FULL BUNNY! 🐰🥕',
          message: `You fed the bunny exactly ${bunnyTarget} yummy carrots!`,
        });
        setShowCelebration(true);
      }, 700);
    }
  };

  const handleResetBunny = () => {
    sound.playPop(440);
    const newTarget = Math.floor(Math.random() * 5) + 3; // 3 to 7
    setBunnyTarget(newTarget);
    setBunnyFedCount(0);
    sound.speak(`Can you feed the bunny ${newTarget} tasty carrots?`);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-100 via-blue-50 to-indigo-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 mb-2">
        <button
          id="counting-tab-count"
          onClick={() => {
            sound.playPop(520);
            setActivity('count');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'count'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
              : 'bg-white/80 text-blue-800 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <Hash className="w-5 h-5" />
          <span>COUNT & CHOOSE</span>
        </button>

        <button
          id="counting-tab-feed"
          onClick={() => {
            sound.playPop(520);
            sound.speak(`Feed the bunny ${bunnyTarget} carrots!`);
            setActivity('feed');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'feed'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
              : 'bg-white/80 text-blue-800 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <Carrot className="w-5 h-5" />
          <span>FEED THE BUNNY</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'count' && (
        <Mascot
          message={`Tap the ${currentObject.name} to count them, then choose the number!`}
          voiceText={`Tap the ${currentObject.name} to count them, then choose the right number!`}
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}

      {activity === 'feed' && (
        <Mascot
          message={`Feed Pip the bunny exactly ${bunnyTarget} crunchy carrots!`}
          voiceText={`Tap the carrot basket to feed the bunny ${bunnyTarget} carrots!`}
          mood={bunnyChewing ? 'cheering' : 'happy'}
        />
      )}

      {/* COUNT & CHOOSE ACTIVITY */}
      {activity === 'count' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Object Stage Card */}
          <div className="w-full bg-white/95 rounded-3xl p-5 sm:p-6 shadow-lg border-4 border-blue-300 text-center mb-4 sm:mb-6">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase mb-2 block">
              TAP EACH OBJECT TO COUNT! ({tappedIndices.length} / {targetNumber})
            </span>

            {/* Objects Grid */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-4 sm:py-6 min-h-[140px]">
              {Array.from({ length: targetNumber }).map((_, idx) => {
                const isTapped = tappedIndices.includes(idx);
                const tapOrder = tappedIndices.indexOf(idx) + 1;

                return (
                  <motion.button
                    key={idx}
                    id={`count-object-${idx}`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTapObject(idx)}
                    className={`relative p-2 rounded-2xl transition-all cursor-pointer select-none ${
                      isTapped ? 'bg-blue-100 ring-2 ring-blue-400' : 'hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-5xl sm:text-6xl drop-shadow-sm block">
                      {currentObject.emoji}
                    </span>

                    {/* Number Badge when tapped */}
                    {isTapped && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-md"
                      >
                        {tapOrder}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Hint Message */}
            {hintMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 inline-block px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-sm sm:text-base"
              >
                {hintMessage}
              </motion.div>
            )}
          </div>

          {/* 3 Chunky Number Buttons */}
          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
            {options.map((num) => {
              const isSelected = selectedNumber === num;
              const isCorrect = num === targetNumber;

              return (
                <motion.button
                  key={num}
                  id={`number-choice-${num}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectNumber(num)}
                  className={`p-4 sm:p-6 rounded-3xl border-4 transition-all shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-400'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-black text-blue-950 font-display tabular-nums">
                    {num}
                  </span>
                  <span className="text-xs font-bold text-blue-700">
                    {num === 1 ? 'ONE' : num === 2 ? 'TWO' : num === 3 ? 'THREE' : num === 4 ? 'FOUR' : num === 5 ? 'FIVE' : num === 6 ? 'SIX' : num === 7 ? 'SEVEN' : num === 8 ? 'EIGHT' : num === 9 ? 'NINE' : 'TEN'}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentLevelIndex
                    ? 'bg-blue-600 w-7'
                    : idx < currentLevelIndex
                    ? 'bg-emerald-400'
                    : 'bg-blue-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* FEED THE BUNNY ACTIVITY */}
      {activity === 'feed' && (
        <div className="max-w-2xl mx-auto w-full my-2 flex-1 flex flex-col items-center justify-between">
          {/* Target Goal Header */}
          <div className="w-full bg-white/90 rounded-2xl p-3 border-2 border-blue-200 shadow-xs flex items-center justify-between">
            <span className="text-sm font-black text-blue-900">
              TARGET: <span className="text-blue-600 text-lg font-black">{bunnyTarget} CARROTS</span>
            </span>
            <span className="text-sm font-black text-amber-700">
              FED: {bunnyFedCount} / {bunnyTarget}
            </span>
          </div>

          {/* Bunny Character Eating Stage */}
          <div className="w-full max-w-sm aspect-square bg-white rounded-3xl p-6 shadow-lg border-4 border-blue-300 relative flex flex-col items-center justify-center my-2">
            {/* Bunny Graphic */}
            <motion.div
              animate={
                bunnyChewing
                  ? { scale: [1, 1.15, 1], y: [0, -10, 0] }
                  : { y: [0, -4, 0] }
              }
              transition={{ duration: 0.4 }}
              className="text-7xl sm:text-8xl select-none relative"
            >
              🐰
              {bunnyChewing && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-4 text-3xl"
                >
                  ✨ Yum!
                </motion.span>
              )}
            </motion.div>

            {/* Carrots Fed Plate */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1 min-h-[40px] px-4 py-2 bg-amber-50 rounded-2xl border-2 border-amber-200 w-full max-w-[240px]">
              {Array.from({ length: bunnyFedCount }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  🥕
                </motion.span>
              ))}
              {bunnyFedCount === 0 && (
                <span className="text-xs font-bold text-amber-800">
                  Tap the carrot button to feed!
                </span>
              )}
            </div>
          </div>

          {/* Big Chunky Carrot Feed Button */}
          <div className="w-full max-w-sm flex gap-3">
            <motion.button
              id="feed-carrot-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleFeedCarrot}
              disabled={bunnyFedCount >= bunnyTarget}
              className="flex-1 py-4 px-6 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-black text-xl border-4 border-orange-600 shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              <span className="text-3xl">🥕</span>
              <span>FEED CARROT!</span>
            </motion.button>

            <button
              id="reset-bunny-button"
              onClick={handleResetBunny}
              className="px-4 rounded-3xl bg-white border-3 border-blue-200 text-blue-800 font-bold text-sm hover:bg-blue-50 cursor-pointer"
            >
              NEW
            </button>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title={celebrationMsg.title}
        message={celebrationMsg.message}
        earnedStars={2}
        badgeUnlocked="Counting Star"
        badgeIcon="🔢"
        onPlayAgain={() => {
          setShowCelebration(false);
          if (activity === 'count') {
            setCurrentLevelIndex(0);
            generateLevel(0);
          } else {
            handleResetBunny();
          }
        }}
        onNext={() => {
          setShowCelebration(false);
          onNavigateHome();
        }}
        onGoHome={() => {
          setShowCelebration(false);
          onNavigateHome();
        }}
      />
    </div>
  );
};
