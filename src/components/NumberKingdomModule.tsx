import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NumberKingdomActivity } from '../types';
import {
  BEFORE_AFTER_QUESTIONS,
  MISSING_HUNDRED_QUESTIONS,
  GREATER_LESS_QUESTIONS,
  TRAIN_ORDER_QUESTIONS,
} from '../data/ukgData';
import { sound } from '../utils/audio';
import {
  Home,
  Star,
  Sparkles,
  Volume2,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  Grid,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NumberKingdomModuleProps {
  onEarnStar: (stars: number, category?: string) => void;
  onEarnCoin: (coins: number) => void;
  onNavigateHome: () => void;
  onRecordAttempt?: (world: 'number_kingdom', isCorrect: boolean) => void;
}

export const NumberKingdomModule: React.FC<NumberKingdomModuleProps> = ({
  onEarnStar,
  onEarnCoin,
  onNavigateHome,
  onRecordAttempt,
}) => {
  const [activity, setActivity] = useState<NumberKingdomActivity>('explore_100');
  const [selected100Num, setSelected100Num] = useState<number>(34);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [placedWagons, setPlacedWagons] = useState<number[]>([]);
  const [scoreCount, setScoreCount] = useState<number>(0);

  const praiseWords = ['Super Number King! 👑', 'Brilliant counting! 🌟', 'You did it! 🚀', 'Spot on! ⭐', 'Awesome math brain! 💖'];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    sound.playSuccess();
    triggerConfetti();
    const praise = praiseWords[Math.floor(Math.random() * praiseWords.length)];
    sound.speak(praise);
    onEarnStar(10, 'number_kingdom');
    setScoreCount((prev) => prev + 1);
    if (onRecordAttempt) onRecordAttempt('number_kingdom', true);

    setTimeout(() => {
      handleNextQuestion();
    }, 1800);
  };

  const handleWrongAnswer = () => {
    setIsCorrect(false);
    sound.playTryAgain();
    setShowHint(true);
    sound.speak('Good try! Take another look and tap again!');
    if (onRecordAttempt) onRecordAttempt('number_kingdom', false);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setPlacedWagons([]);

    if (activity === 'before_after') {
      if (currentIndex + 1 >= BEFORE_AFTER_QUESTIONS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        sound.speak('Royal celebration! You mastered Before & After and earned 5 gold coins!');
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'missing_100') {
      if (currentIndex + 1 >= MISSING_HUNDRED_QUESTIONS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'greater_less') {
      if (currentIndex + 1 >= GREATER_LESS_QUESTIONS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'train_order') {
      if (currentIndex + 1 >= TRAIN_ORDER_QUESTIONS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const switchActivity = (act: NumberKingdomActivity) => {
    sound.playPop(500);
    setActivity(act);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setPlacedWagons([]);
  };

  // Tens and Units breakdown for visualizer
  const tens = Math.floor(selected100Num / 10);
  const units = selected100Num % 10;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-amber-100 via-yellow-50 to-orange-50 px-3 sm:px-6 py-4 flex flex-col justify-between">
      {/* Top Header Row & Navigation Tabs */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            id="nk-back-home"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-amber-300 text-amber-950 font-black text-sm shadow-xs hover:bg-amber-50 cursor-pointer"
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>MAP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-amber-950 flex items-center gap-1.5">
              🏰 Number Kingdom (1–100)
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border-2 border-amber-300 shadow-xs">
            <span className="text-xs font-black text-amber-900">Solved: {scoreCount}</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          </div>
        </div>

        {/* 5 Number Activity Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
          {[
            { id: 'explore_100' as NumberKingdomActivity, label: '👑 1-100 Matrix' },
            { id: 'before_after' as NumberKingdomActivity, label: '⏩ Before / After' },
            { id: 'missing_100' as NumberKingdomActivity, label: '🔍 Missing 100' },
            { id: 'greater_less' as NumberKingdomActivity, label: '🐊 Alligator Croc' },
            { id: 'train_order' as NumberKingdomActivity, label: '🚂 Train Order' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`nk-tab-${tab.id}`}
              onClick={() => switchActivity(tab.id)}
              className={`py-2 px-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer truncate text-center ${
                activity === tab.id
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                  : 'bg-white/90 text-amber-950 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col items-center justify-center my-2">
        {/* ========================================================= */}
        {/* 1. 100 ROYAL MATRIX & TENS/UNITS VISUALIZER */}
        {/* ========================================================= */}
        {activity === 'explore_100' && (
          <div className="w-full bg-white/95 rounded-3xl p-4 sm:p-6 border-4 border-amber-400 shadow-xl text-center">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-black text-amber-950">
                Tap any number from 1 to 100 to see its Tens & Units blocks!
              </h3>
              <button
                onClick={() => {
                  sound.playPop(520);
                  sound.speak(`Number ${selected100Num} has ${tens} tens and ${units} units!`);
                }}
                className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Hear Number 🔊</span>
              </button>
            </div>

            {/* Visualizer Header for Selected Number */}
            <div className="bg-amber-50 rounded-2xl p-3 border-2 border-amber-300 mb-4 flex flex-wrap items-center justify-around gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl sm:text-5xl font-display font-black text-amber-600 bg-white px-4 py-1.5 rounded-2xl border-2 border-amber-400 shadow-sm">
                  {selected100Num}
                </span>
                <div className="text-left">
                  <span className="text-xs font-bold text-amber-800 block">TENS & UNITS BREAKDOWN</span>
                  <span className="text-base sm:text-lg font-black text-amber-950">
                    {tens} Tens (Bundle of 10s 🥕) + {units} Units (Carrots 🥕)
                  </span>
                </div>
              </div>

              {/* Graphical representation of 10s & 1s */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1 bg-amber-100 px-2.5 py-1.5 rounded-xl border border-amber-300">
                  {Array.from({ length: Math.min(tens, 10) }).map((_, i) => (
                    <span key={i} className="text-lg" title="Bundle of 10">
                      📦
                    </span>
                  ))}
                  {tens === 0 && <span className="text-xs font-bold text-amber-700">0 tens</span>}
                </div>
                <span className="font-black text-amber-800">+</span>
                <div className="flex gap-1 bg-amber-100 px-2.5 py-1.5 rounded-xl border border-amber-300">
                  {Array.from({ length: units }).map((_, i) => (
                    <span key={i} className="text-lg" title="1 Unit">
                      🥕
                    </span>
                  ))}
                  {units === 0 && <span className="text-xs font-bold text-amber-700">0 units</span>}
                </div>
              </div>
            </div>

            {/* 100 Grid Matrix (10x10) */}
            <div className="grid grid-cols-10 gap-1 sm:gap-1.5 max-h-[300px] overflow-y-auto p-1 bg-amber-50/60 rounded-2xl border-2 border-amber-200">
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => {
                const isSelected = selected100Num === num;
                return (
                  <motion.button
                    key={num}
                    id={`grid-num-${num}`}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sound.playPop(300 + num * 8);
                      setSelected100Num(num);
                    }}
                    className={`h-7 sm:h-9 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-md scale-110 border-2 border-amber-700 z-10'
                        : num % 10 === 0
                        ? 'bg-amber-200 text-amber-950 font-extrabold border border-amber-300'
                        : 'bg-white text-amber-950 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {num}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. BEFORE & AFTER NUMBERS */}
        {/* ========================================================= */}
        {activity === 'before_after' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Challenge {currentIndex + 1} of {BEFORE_AFTER_QUESTIONS.length}
              </span>
              <button
                onClick={() => {
                  sound.speak(BEFORE_AFTER_QUESTIONS[currentIndex].promptText);
                }}
                className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Read Question 🔊</span>
              </button>
            </div>

            {/* Target Number Display */}
            <div className="my-4">
              <span className="text-5xl sm:text-6xl block mb-2">👑</span>
              <div className="inline-flex items-center gap-3 bg-amber-100 px-8 py-4 rounded-3xl border-3 border-amber-300 shadow-inner">
                {BEFORE_AFTER_QUESTIONS[currentIndex].type === 'before' && (
                  <span className="font-display font-black text-4xl sm:text-5xl text-amber-600 border-b-4 border-amber-600 w-16 text-center">
                    ?
                  </span>
                )}

                <span className="font-display font-black text-5xl sm:text-6xl text-amber-950">
                  {BEFORE_AFTER_QUESTIONS[currentIndex].targetNumber}
                </span>

                {BEFORE_AFTER_QUESTIONS[currentIndex].type === 'between' && (
                  <>
                    <span className="font-display font-black text-4xl sm:text-5xl text-amber-600 border-b-4 border-amber-600 w-16 text-center">
                      ?
                    </span>
                    <span className="font-display font-black text-5xl sm:text-6xl text-amber-950">
                      {BEFORE_AFTER_QUESTIONS[currentIndex].secondNumber}
                    </span>
                  </>
                )}

                {BEFORE_AFTER_QUESTIONS[currentIndex].type === 'after' && (
                  <span className="font-display font-black text-4xl sm:text-5xl text-amber-600 border-b-4 border-amber-600 w-16 text-center">
                    ?
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-display mb-6">
              {BEFORE_AFTER_QUESTIONS[currentIndex].promptText}
            </h3>

            {/* 3 Number Choices */}
            <div className="flex justify-center gap-4 sm:gap-6 max-w-sm mx-auto">
              {BEFORE_AFTER_QUESTIONS[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === BEFORE_AFTER_QUESTIONS[currentIndex].correctAnswer;

                return (
                  <motion.button
                    key={i}
                    id={`nk-ba-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl font-display font-black text-3xl sm:text-4xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. MISSING IN 100 SERIES */}
        {/* ========================================================= */}
        {activity === 'missing_100' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Sequence {currentIndex + 1} of {MISSING_HUNDRED_QUESTIONS.length}
              </span>
              <button
                onClick={() => sound.speak('What number is missing from the train line?')}
                className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Hear Prompt 🔊</span>
              </button>
            </div>

            {/* Train / Stepping Number Row */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 my-6">
              {MISSING_HUNDRED_QUESTIONS[currentIndex].sequence.map((num, idx) => (
                <div
                  key={idx}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center font-display font-black text-2xl sm:text-3xl border-3 shadow-md ${
                    num === null
                      ? 'border-dashed border-amber-500 bg-amber-100 text-amber-700 animate-pulse'
                      : 'border-amber-300 bg-amber-50 text-amber-950'
                  }`}
                >
                  <span className="text-xs font-bold text-amber-600">#{idx + 1}</span>
                  <span>{num === null ? '?' : num}</span>
                </div>
              ))}
            </div>

            <p className="text-base sm:text-lg font-black text-amber-950 mb-6">
              What number goes in the mystery box?
            </p>

            {/* Options */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {MISSING_HUNDRED_QUESTIONS[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === MISSING_HUNDRED_QUESTIONS[currentIndex].correctAnswer;

                return (
                  <motion.button
                    key={i}
                    id={`nk-missing-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl font-display font-black text-2xl sm:text-3xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-950 text-sm font-extrabold"
              >
                💡 {MISSING_HUNDRED_QUESTIONS[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. ALLIGATOR GREATER / LESS THAN (>, <, =) */}
        {/* ========================================================= */}
        {activity === 'greater_less' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Alligator Challenge {currentIndex + 1} of {GREATER_LESS_QUESTIONS.length}
              </span>
              <button
                onClick={() => sound.speak('The hungry alligator always opens its mouth to eat the BIGGER number!')}
                className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Alligator Rule 🔊</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-6 my-6">
              {/* Left Number Card */}
              <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-3xl bg-amber-100 border-4 border-amber-400 shadow-md flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl">{GREATER_LESS_QUESTIONS[currentIndex].emoji}</span>
                <span className="font-display font-black text-3xl sm:text-5xl text-amber-950 mt-1">
                  {GREATER_LESS_QUESTIONS[currentIndex].num1}
                </span>
              </div>

              {/* Alligator Center Mouth Symbol */}
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-lime-400 border-4 border-lime-600 flex items-center justify-center text-3xl sm:text-4xl shadow-md text-lime-950 font-black"
              >
                {selectedAnswer || '🐊'}
              </motion.div>

              {/* Right Number Card */}
              <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-3xl bg-amber-100 border-4 border-amber-400 shadow-md flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl">{GREATER_LESS_QUESTIONS[currentIndex].emoji}</span>
                <span className="font-display font-black text-3xl sm:text-5xl text-amber-950 mt-1">
                  {GREATER_LESS_QUESTIONS[currentIndex].num2}
                </span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-amber-950 mb-6">
              Which alligator mouth or symbol is correct?
            </h3>

            {/* 3 Operator Buttons: >, =, < */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {[
                { symbol: '>', label: 'Greater (>)' },
                { symbol: '=', label: 'Equal (=)' },
                { symbol: '<', label: 'Less (<)' },
              ].map((item, i) => {
                const isSelected = selectedAnswer === item.symbol;
                const isTarget = item.symbol === GREATER_LESS_QUESTIONS[currentIndex].relation;

                return (
                  <motion.button
                    key={i}
                    id={`nk-croc-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sound.playAlligatorSnap();
                      setSelectedAnswer(item.symbol);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl font-display font-black text-3xl sm:text-4xl border-3 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-lime-500 text-white border-lime-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-lime-100 text-lime-950 border-lime-400 hover:bg-lime-200'
                    }`}
                  >
                    <span>{item.symbol}</span>
                    <span className="text-[10px] font-bold">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-950 text-sm font-extrabold"
              >
                💡 {GREATER_LESS_QUESTIONS[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. TRAIN WAGON NUMBER ORDERING */}
        {/* ========================================================= */}
        {activity === 'train_order' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                Train #{currentIndex + 1} of {TRAIN_ORDER_QUESTIONS.length}
              </span>
              <button
                onClick={() => sound.speak('Tap wagons in order from smallest to biggest number!')}
                className="flex items-center gap-1 text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Hear Instructions 🔊</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-display mb-4">
              🚂 Put the train carriages in order from <span className="text-amber-600">Smallest to Biggest</span>!
            </h3>

            {/* Placed Train Carriages Slot Line */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 my-6 bg-amber-50 p-4 rounded-3xl border-2 border-amber-300 overflow-x-auto">
              <span className="text-4xl sm:text-5xl">🚂</span>
              {TRAIN_ORDER_QUESTIONS[currentIndex].numbers.map((_, idx) => (
                <div
                  key={idx}
                  className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl border-3 border-dashed border-amber-400 bg-white flex flex-col items-center justify-center font-display font-black text-2xl sm:text-3xl text-amber-950 shadow-inner"
                >
                  <span className="text-[10px] font-bold text-amber-600">Wagon {idx + 1}</span>
                  <span>{placedWagons[idx] !== undefined ? placedWagons[idx] : ''}</span>
                </div>
              ))}
            </div>

            {/* Available Carriage Buttons to Tap */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-4">
              {TRAIN_ORDER_QUESTIONS[currentIndex].numbers.map((num, i) => {
                const isPlaced = placedWagons.includes(num);

                return (
                  <motion.button
                    key={i}
                    id={`nk-train-num-${num}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isPlaced}
                    onClick={() => {
                      sound.playLetterChime(450 + i * 80);
                      const newPlaced = [...placedWagons, num];
                      setPlacedWagons(newPlaced);

                      if (newPlaced.length === TRAIN_ORDER_QUESTIONS[currentIndex].numbers.length) {
                        const targetSorted = [...TRAIN_ORDER_QUESTIONS[currentIndex].sortedOrder];
                        const isAllCorrect = newPlaced.every((val, idx) => val === targetSorted[idx]);

                        if (isAllCorrect) {
                          handleCorrectAnswer();
                        } else {
                          handleWrongAnswer();
                          setTimeout(() => setPlacedWagons([]), 1200);
                        }
                      }
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl font-display font-black text-2xl sm:text-3xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isPlaced
                        ? 'opacity-30 bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-400 text-white border-amber-500 hover:bg-amber-500'
                    }`}
                  >
                    {num}
                  </motion.button>
                );
              })}
            </div>

            <button
              onClick={() => {
                sound.playPop(420);
                setPlacedWagons([]);
              }}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 hover:bg-amber-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Wagons</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <button
          onClick={() => {
            sound.playPop(480);
            if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-2xl bg-white border-2 border-amber-300 text-amber-950 font-black text-xs sm:text-sm disabled:opacity-40 cursor-pointer shadow-xs"
        >
          ⬅️ PREVIOUS
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-5 py-2 rounded-2xl bg-amber-500 border-2 border-amber-600 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md hover:bg-amber-400"
        >
          NEXT QUESTION ➡️
        </button>
      </div>
    </div>
  );
};
