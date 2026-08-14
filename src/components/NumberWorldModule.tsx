import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NumberActivity, NumberItem } from '../types';
import { NUMBERS_1_20_DATA, PRAISE_MESSAGES } from '../data/lkgData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import {
  Hash,
  TrainTrack,
  ArrowUpDown,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface NumberWorldModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
  onIncrementDaily?: (world: 'abc' | 'numbers' | 'objects' | 'patterns') => void;
}

export const NumberWorldModule: React.FC<NumberWorldModuleProps> = ({
  onEarnStar,
  onNavigateHome,
  onIncrementDaily,
}) => {
  const [activity, setActivity] = useState<NumberActivity>('count_match');

  // Count & Match State
  const [countTarget, setCountTarget] = useState<NumberItem>(NUMBERS_1_20_DATA[4]); // e.g. 5
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [countOptions, setCountOptions] = useState<number[]>([]);
  const [selectedCountNum, setSelectedCountNum] = useState<number | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [roundScore, setRoundScore] = useState(0);

  // Missing Number Train State
  // Example: 6 | 7 | ? (with 8) or ? | 12 | 13 (with 11) or 14 | ? | 16 (with 15)
  const [sequenceItems, setSequenceItems] = useState<{ value: number | null; display: string }[]>([]);
  const [missingAnswer, setMissingAnswer] = useState<number>(8);
  const [missingOptions, setMissingOptions] = useState<number[]>([]);
  const [selectedMissingNum, setSelectedMissingNum] = useState<number | null>(null);

  // Number Wagon Ordering State
  const [orderTargetNumbers, setOrderTargetNumbers] = useState<number[]>([]);
  const [scrambledWagons, setScrambledWagons] = useState<number[]>([]);
  const [placedWagons, setPlacedWagons] = useState<number[]>([]);

  // Celebration modal
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  // Generate Count & Match Round
  const generateCountRound = () => {
    // Pick number between 1 and 20
    const randomIdx = Math.floor(Math.random() * NUMBERS_1_20_DATA.length);
    const target = NUMBERS_1_20_DATA[randomIdx];

    const choices = [target.num];
    while (choices.length < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      let cand = target.num + offset;
      if (cand < 1) cand = target.num + 2;
      if (cand > 20) cand = target.num - 2;
      if (!choices.includes(cand) && cand >= 1 && cand <= 20) {
        choices.push(cand);
      } else {
        const randomFallback = Math.floor(Math.random() * 20) + 1;
        if (!choices.includes(randomFallback)) choices.push(randomFallback);
      }
    }

    setCountTarget(target);
    setCountOptions(choices.sort(() => Math.random() - 0.5));
    setTappedIndices([]);
    setSelectedCountNum(null);
    setHintMessage(null);
  };

  // Generate Missing Number Round
  const generateMissingRound = () => {
    // Generate sequence of 3 consecutive numbers within 1 to 20
    const start = Math.floor(Math.random() * 18) + 1; // 1 to 18
    const fullSeq = [start, start + 1, start + 2];
    const missingSlot = Math.floor(Math.random() * 3); // 0, 1, or 2 (e.g. index 2: 6 | 7 | ?)
    const correctVal = fullSeq[missingSlot];

    const displaySeq = fullSeq.map((val, idx) =>
      idx === missingSlot ? { value: null, display: '?' } : { value: val, display: val.toString() }
    );

    const choices = [correctVal];
    while (choices.length < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      let cand = correctVal + delta;
      if (cand < 1) cand = correctVal + 3;
      if (cand > 20) cand = correctVal - 3;
      if (!choices.includes(cand) && cand >= 1 && cand <= 20) {
        choices.push(cand);
      } else {
        const fb = Math.floor(Math.random() * 20) + 1;
        if (!choices.includes(fb)) choices.push(fb);
      }
    }

    setSequenceItems(displaySeq);
    setMissingAnswer(correctVal);
    setMissingOptions(choices.sort(() => Math.random() - 0.5));
    setSelectedMissingNum(null);
    setHintMessage(null);
  };

  // Generate Order Wagon Round
  const generateOrderRound = () => {
    // 3 or 4 consecutive numbers
    const start = Math.floor(Math.random() * 17) + 1;
    const targets = [start, start + 1, start + 2, start + 3];
    const scrambled = [...targets].sort(() => Math.random() - 0.5);

    setOrderTargetNumbers(targets);
    setScrambledWagons(scrambled);
    setPlacedWagons([]);
    setHintMessage(null);
  };

  // Load initial games
  useEffect(() => {
    generateCountRound();
    generateMissingRound();
    generateOrderRound();
  }, []);

  // Voice narration on activity changes
  useEffect(() => {
    if (activity === 'count_match') {
      sound.speak(`Count the ${countTarget.groupName} and choose the number!`);
    } else if (activity === 'missing') {
      sound.speak(`Which number is missing in the train sequence?`);
    } else if (activity === 'ordering') {
      sound.speak(`Put the train wagons in the correct order from smallest to biggest!`);
    }
  }, [activity, countTarget, missingAnswer]);

  // Object count tap
  const handleTapObject = (idx: number) => {
    if (tappedIndices.includes(idx)) return;
    const nextCount = tappedIndices.length + 1;
    sound.playPop(420 + nextCount * 25);
    sound.speak(`${nextCount}!`);
    setTappedIndices((prev) => [...prev, idx]);
  };

  // Handle Count Selection
  const handleSelectCountAnswer = (num: number) => {
    setSelectedCountNum(num);

    if (num === countTarget.num) {
      sound.playSuccess();
      const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      setHintMessage(praise);
      sound.speak(`${praise}! There are ${countTarget.num} ${countTarget.groupName}!`);
      onEarnStar(10, 'numbers');
      if (onIncrementDaily) onIncrementDaily('numbers');

      const nextScore = roundScore + 1;
      setRoundScore(nextScore);

      setTimeout(() => {
        if (nextScore >= 5) {
          setCelebrationMsg({
            title: 'NUMBER NINJA! 🔢',
            message: 'You counted objects up to 20 like a superstar!',
          });
          setShowCelebration(true);
          setRoundScore(0);
        } else {
          generateCountRound();
        }
      }, 1400);
    } else {
      sound.playTryAgain();
      setHintMessage(`Let's count together! Tap each ${countTarget.emoji} 🌟`);
      sound.speak(`Almost! Let's count them one more time.`);
      setTimeout(() => {
        setSelectedCountNum(null);
      }, 1000);
    }
  };

  // Handle Missing Number selection
  const handleSelectMissing = (chosen: number) => {
    setSelectedMissingNum(chosen);

    if (chosen === missingAnswer) {
      sound.playSuccess();
      const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      setHintMessage(praise);
      sound.speak(`${praise}! Number ${missingAnswer} completes the train!`);
      onEarnStar(10, 'numbers');
      if (onIncrementDaily) onIncrementDaily('numbers');

      setTimeout(() => {
        generateMissingRound();
      }, 1400);
    } else {
      sound.playTryAgain();
      setHintMessage(`Think about the order! What number fits in the empty train car?`);
      sound.speak(`Almost! Look closely at the numbers in front and behind.`);
      setTimeout(() => {
        setSelectedMissingNum(null);
      }, 1000);
    }
  };

  // Handle Wagon Order Click
  const handleTapWagon = (wagonNum: number) => {
    const nextExpected = orderTargetNumbers[placedWagons.length];

    if (wagonNum === nextExpected) {
      sound.playCoin();
      sound.speak(`${wagonNum}!`);
      const newPlaced = [...placedWagons, wagonNum];
      setPlacedWagons(newPlaced);
      setScrambledWagons((prev) => prev.filter((n) => n !== wagonNum));

      if (newPlaced.length === orderTargetNumbers.length) {
        sound.playFanfare();
        const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
        setHintMessage(praise);
        sound.speak(`${praise}! Choo Choo! The number train is ready to roll!`);
        onEarnStar(10, 'numbers');
        if (onIncrementDaily) onIncrementDaily('numbers');

        setTimeout(() => {
          generateOrderRound();
        }, 1600);
      }
    } else {
      sound.playTryAgain();
      setHintMessage(`Find the smallest next number: ${nextExpected}!`);
      sound.speak(`Let's find number ${nextExpected} next!`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-blue-100 via-sky-50 to-indigo-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-3xl mx-auto w-full grid grid-cols-3 gap-2 mb-2">
        <button
          id="num-tab-count"
          onClick={() => {
            sound.playPop(520);
            setActivity('count_match');
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'count_match'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
              : 'bg-white/80 text-blue-800 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>COUNT 1–20</span>
        </button>

        <button
          id="num-tab-missing"
          onClick={() => {
            sound.playPop(520);
            setActivity('missing');
            generateMissingRound();
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'missing'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
              : 'bg-white/80 text-blue-800 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <TrainTrack className="w-4 h-4" />
          <span>MISSING NUMBER</span>
        </button>

        <button
          id="num-tab-order"
          onClick={() => {
            sound.playPop(520);
            setActivity('ordering');
            generateOrderRound();
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'ordering'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-102'
              : 'bg-white/80 text-blue-800 border-blue-200 hover:bg-blue-100'
          }`}
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>ORDER TRAIN</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'count_match' && (
        <Mascot
          message={`Tap the ${countTarget.groupName} to count them, then choose the matching number!`}
          voiceText={`Tap each object to count, then choose the number!`}
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}
      {activity === 'missing' && (
        <Mascot
          message="Look at the number train! Which number fits in the empty car?"
          voiceText="Which number is missing in the train?"
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}
      {activity === 'ordering' && (
        <Mascot
          message="Tap the wagons in order from smallest to biggest to make the train go Choo-Choo!"
          voiceText="Tap the wagons in order to build the train!"
          mood={placedWagons.length > 0 ? 'cheering' : 'happy'}
        />
      )}

      {/* 1. COUNT & MATCH (1–20) */}
      {activity === 'count_match' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Object Count Display Stage */}
          <div className="w-full bg-white/95 rounded-3xl p-5 shadow-lg border-4 border-blue-300 text-center mb-4">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase mb-2 block">
              TAP EACH OBJECT TO COUNT ({tappedIndices.length} / {countTarget.num})
            </span>

            {/* Grid of Objects */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-3 min-h-[140px] max-h-[220px] overflow-y-auto">
              {Array.from({ length: countTarget.num }).map((_, idx) => {
                const isTapped = tappedIndices.includes(idx);
                const orderNum = tappedIndices.indexOf(idx) + 1;

                return (
                  <motion.button
                    key={idx}
                    id={`count-target-obj-${idx}`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleTapObject(idx)}
                    className={`relative p-2 rounded-2xl transition-all cursor-pointer select-none ${
                      isTapped ? 'bg-blue-100 ring-2 ring-blue-400' : 'hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl drop-shadow-xs block">
                      {countTarget.emoji}
                    </span>
                    {isTapped && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-md"
                      >
                        {orderNum}
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>

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

          {/* 3 Chunky Number Option Cards */}
          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
            {countOptions.map((num) => {
              const isSelected = selectedCountNum === num;
              const isCorrect = num === countTarget.num;

              return (
                <motion.button
                  key={num}
                  id={`count-option-btn-${num}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectCountAnswer(num)}
                  className={`p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer ${
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
                  <span className="text-xs font-extrabold text-blue-700">
                    Number {num}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Score tracker */}
          <div className="flex items-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === roundScore
                    ? 'bg-blue-600 w-7'
                    : idx < roundScore
                    ? 'bg-emerald-400'
                    : 'bg-blue-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. MISSING NUMBER TRAIN */}
      {activity === 'missing' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Train Visual Stage */}
          <div className="w-full bg-white/95 rounded-3xl p-6 shadow-lg border-4 border-blue-300 text-center mb-4 sm:mb-6">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase mb-2 block">
              WHICH NUMBER FITS IN THE TRAIN?
            </span>

            {/* Train Engine + Sequence Cars */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 my-4 overflow-x-auto py-2">
              <div className="text-5xl select-none">🚂</div>

              {sequenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl border-4 flex flex-col items-center justify-center shadow-md relative ${
                    item.value === null
                      ? 'bg-amber-100 border-dashed border-amber-400 text-amber-600 animate-pulse'
                      : 'bg-gradient-to-tr from-blue-500 to-indigo-500 border-white text-white'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl font-black font-display">
                    {item.display}
                  </span>
                  <div className="absolute -bottom-2 w-4 h-4 rounded-full bg-gray-700 border-2 border-white" />
                </div>
              ))}
            </div>

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

          {/* 3 Number Choices */}
          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
            {missingOptions.map((num) => {
              const isSelected = selectedMissingNum === num;
              const isCorrect = num === missingAnswer;

              return (
                <motion.button
                  key={num}
                  id={`missing-choice-btn-${num}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectMissing(num)}
                  className={`p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-400'
                  }`}
                >
                  <span className="text-4xl sm:text-5xl font-black text-blue-950 font-display">
                    {num}
                  </span>
                  <span className="text-xs font-extrabold text-blue-700">
                    Number {num}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. NUMBER WAGON ORDERING */}
      {activity === 'ordering' && (
        <div className="max-w-2xl mx-auto w-full my-2 flex-1 flex flex-col items-center justify-between">
          {/* Assembled Train Track */}
          <div className="w-full bg-white/95 rounded-3xl p-5 shadow-lg border-4 border-blue-300 text-center mb-3">
            <span className="text-xs font-black tracking-widest text-blue-600 uppercase mb-2 block">
              YOUR TRAIN IN ORDER:
            </span>

            <div className="flex items-center justify-center gap-2 min-h-[90px] border-b-4 border-dashed border-blue-200 pb-3">
              <span className="text-4xl sm:text-5xl">🚂</span>

              {orderTargetNumbers.map((expectedNum, idx) => {
                const isPlaced = placedWagons.includes(expectedNum);

                return (
                  <div
                    key={idx}
                    className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl border-3 flex flex-col items-center justify-center shadow-xs transition-all ${
                      isPlaced
                        ? 'bg-emerald-500 border-white text-white font-black scale-105'
                        : 'bg-blue-50 border-dashed border-blue-300 text-blue-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl font-black font-display">
                      {isPlaced ? expectedNum : '?'}
                    </span>
                  </div>
                );
              })}
            </div>

            {hintMessage && (
              <div className="mt-2 text-sm font-extrabold text-amber-800">
                {hintMessage}
              </div>
            )}
          </div>

          {/* Scrambled Wagons Pool */}
          <div className="w-full bg-white/80 rounded-3xl p-4 border-2 border-blue-200 text-center">
            <span className="text-xs font-black uppercase text-blue-800 tracking-wider mb-2 block">
              TAP THE NEXT WAGON TO CONNECT:
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {scrambledWagons.map((wagonNum) => (
                <motion.button
                  key={wagonNum}
                  id={`scrambled-wagon-${wagonNum}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTapWagon(wagonNum)}
                  className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 border-3 border-white text-white font-black shadow-lg flex flex-col items-center justify-center cursor-pointer hover:from-amber-500 hover:to-orange-500"
                >
                  <span className="text-3xl sm:text-4xl font-display">{wagonNum}</span>
                  <span className="text-[10px] font-bold opacity-90">TAP ME</span>
                </motion.button>
              ))}
            </div>
          </div>

          <button
            onClick={generateOrderRound}
            className="mt-2 px-4 py-2 rounded-2xl bg-white border-2 border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-50 cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>NEW NUMBERS</span>
          </button>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title={celebrationMsg.title}
        message={celebrationMsg.message}
        earnedStars={10}
        badgeUnlocked="Number Ninja 1–20"
        badgeIcon="🔢"
        onPlayAgain={() => {
          setShowCelebration(false);
          generateCountRound();
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
