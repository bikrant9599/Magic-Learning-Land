import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathMountainActivity } from '../types';
import {
  VISUAL_MATH_PROBLEMS,
  TREASURE_CHEST_PROBLEMS,
  MONSTER_FEED_PROBLEMS,
  BRIDGE_STEP_PROBLEMS,
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
  Plus,
  Minus,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathMountainModuleProps {
  onEarnStar: (stars: number, category?: string) => void;
  onEarnCoin: (coins: number) => void;
  onNavigateHome: () => void;
  onRecordAttempt?: (world: 'math_mountain', isCorrect: boolean) => void;
}

export const MathMountainModule: React.FC<MathMountainModuleProps> = ({
  onEarnStar,
  onEarnCoin,
  onNavigateHome,
  onRecordAttempt,
}) => {
  const [activity, setActivity] = useState<MathMountainActivity>('visual_addition');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [fedCount, setFedCount] = useState<number>(0);
  const [bridgeStep, setBridgeStep] = useState<number>(0);
  const [scoreCount, setScoreCount] = useState<number>(0);

  const praiseWords = ['Peak Math Master! 🏔️', 'Fantastic thinking! 🌟', 'You solved it! 🚀', 'So clever! ⭐', 'Awesome math summit! 💖'];

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
    onEarnStar(10, 'math_mountain');
    setScoreCount((prev) => prev + 1);
    if (onRecordAttempt) onRecordAttempt('math_mountain', true);

    setTimeout(() => {
      handleNextQuestion();
    }, 1800);
  };

  const handleWrongAnswer = () => {
    setIsCorrect(false);
    sound.playTryAgain();
    setShowHint(true);
    sound.speak('Good try! Let us count carefully together!');
    if (onRecordAttempt) onRecordAttempt('math_mountain', false);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setFedCount(0);

    if (activity === 'visual_addition' || activity === 'removal_subtraction') {
      if (currentIndex + 1 >= VISUAL_MATH_PROBLEMS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        sound.speak('Super mountain climber! You earned 5 shiny gold coins!');
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'treasure_chest') {
      if (currentIndex + 1 >= TREASURE_CHEST_PROBLEMS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'feed_monster') {
      if (currentIndex + 1 >= MONSTER_FEED_PROBLEMS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'cross_bridge') {
      if (bridgeStep + 1 >= BRIDGE_STEP_PROBLEMS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        sound.speak('Hurray! You safely crossed the whole river bridge!');
        setBridgeStep(0);
      } else {
        setBridgeStep((prev) => prev + 1);
      }
    }
  };

  const switchActivity = (act: MathMountainActivity) => {
    sound.playPop(500);
    setActivity(act);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setFedCount(0);
    setBridgeStep(0);
  };

  const currentVisualProb = VISUAL_MATH_PROBLEMS[currentIndex] || VISUAL_MATH_PROBLEMS[0];

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-sky-100 via-blue-50 to-indigo-50 px-3 sm:px-6 py-4 flex flex-col justify-between">
      {/* Top Header & Tabs */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            id="mm-back-home"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-sky-300 text-sky-950 font-black text-sm shadow-xs hover:bg-sky-50 cursor-pointer"
          >
            <Home className="w-4 h-4 text-sky-600" />
            <span>MAP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-sky-950 flex items-center gap-1.5">
              🏔️ Math Mountain
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border-2 border-sky-300 shadow-xs">
            <span className="text-xs font-black text-sky-900">Solved: {scoreCount}</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          </div>
        </div>

        {/* 5 Math Activity Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
          {[
            { id: 'visual_addition' as MathMountainActivity, label: '➕ Visual Add' },
            { id: 'removal_subtraction' as MathMountainActivity, label: '➖ Remove Subtract' },
            { id: 'treasure_chest' as MathMountainActivity, label: '💎 Treasure Chest' },
            { id: 'feed_monster' as MathMountainActivity, label: '🍪 Feed Monster' },
            { id: 'cross_bridge' as MathMountainActivity, label: '🐸 River Bridge' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`mm-tab-${tab.id}`}
              onClick={() => switchActivity(tab.id)}
              className={`py-2 px-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer truncate text-center ${
                activity === tab.id
                  ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-102'
                  : 'bg-white/90 text-sky-950 border-sky-200 hover:bg-sky-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col items-center justify-center my-2">
        {/* ========================================================= */}
        {/* 1. VISUAL ADDITION PEAK */}
        {/* ========================================================= */}
        {activity === 'visual_addition' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Addition #{currentIndex + 1}
              </span>
              <button
                onClick={() => {
                  sound.speak(`${currentVisualProb.num1} plus ${currentVisualProb.num2} equals how many?`);
                }}
                className="flex items-center gap-1 text-xs font-black text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Read Equation 🔊</span>
              </button>
            </div>

            {/* Visual Object Groups Display */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 my-6 bg-sky-50 p-6 rounded-3xl border-2 border-sky-200">
              {/* Group 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1.5 bg-white p-3 rounded-2xl border-2 border-sky-300 shadow-sm">
                  {Array.from({ length: currentVisualProb.num1 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
                      className="text-3xl sm:text-4xl"
                    >
                      {currentVisualProb.emoji}
                    </motion.span>
                  ))}
                </div>
                <span className="font-display font-black text-3xl text-sky-950">
                  {currentVisualProb.num1}
                </span>
              </div>

              {/* Plus Sign */}
              <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center text-3xl font-black shadow-md">
                +
              </div>

              {/* Group 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1.5 bg-white p-3 rounded-2xl border-2 border-sky-300 shadow-sm">
                  {Array.from({ length: currentVisualProb.num2 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: i * 0.1, duration: 1.5, repeat: Infinity }}
                      className="text-3xl sm:text-4xl"
                    >
                      {currentVisualProb.emoji}
                    </motion.span>
                  ))}
                </div>
                <span className="font-display font-black text-3xl text-sky-950">
                  {currentVisualProb.num2}
                </span>
              </div>

              {/* Equals Sign */}
              <span className="font-display font-black text-4xl text-sky-800">=</span>

              {/* Mystery Question Box */}
              <div className="w-16 h-16 rounded-2xl bg-amber-300 border-3 border-amber-500 flex items-center justify-center font-display font-black text-3xl text-amber-950 shadow-md animate-pulse">
                {selectedAnswer !== null ? selectedAnswer : '?'}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-sky-950 font-display mb-6">
              Count all the {currentVisualProb.emoji} together! What is {currentVisualProb.num1} + {currentVisualProb.num2}?
            </h3>

            {/* Answer Choices */}
            <div className="flex justify-center gap-4 sm:gap-6 max-w-sm mx-auto">
              {currentVisualProb.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === currentVisualProb.answer;

                return (
                  <motion.button
                    key={i}
                    id={`mm-add-opt-${i}`}
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
                          ? 'bg-sky-500 text-white border-sky-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100'
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
                💡 {currentVisualProb.hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. REMOVAL SUBTRACTION SLOPE */}
        {/* ========================================================= */}
        {activity === 'removal_subtraction' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Subtraction #{currentIndex + 1}
              </span>
              <button
                onClick={() => {
                  sound.speak(`Start with 4 apples. Take away 2 apples. How many remain?`);
                }}
                className="flex items-center gap-1 text-xs font-black text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Read Equation 🔊</span>
              </button>
            </div>

            {/* Visual Subtraction with Removed / Crossed Items */}
            <div className="my-6 bg-sky-50 p-6 rounded-3xl border-2 border-sky-200">
              <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap mb-4">
                {/* Kept Items */}
                {Array.from({ length: 4 - 2 }).map((_, i) => (
                  <div
                    key={`keep-${i}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-sm"
                  >
                    🍎
                  </div>
                ))}

                {/* Removed / Crossed Items */}
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={`remove-${i}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-center justify-center text-4xl shadow-sm relative opacity-60"
                  >
                    🍎
                    <span className="absolute text-rose-600 text-5xl font-black">❌</span>
                  </div>
                ))}
              </div>

              <div className="font-display font-black text-3xl sm:text-4xl text-sky-950 flex items-center justify-center gap-3">
                <span>4 🍎</span>
                <span className="text-rose-600">− 2 🍎</span>
                <span>=</span>
                <span className="text-sky-600 bg-white px-4 py-1 rounded-2xl border-2 border-sky-300">
                  {selectedAnswer !== null ? selectedAnswer : '?'}
                </span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-sky-950 font-display mb-6">
              You had 4 apples and ate 2. How many apples are left?
            </h3>

            {/* Answer Choices */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {[1, 2, 3].map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === 2;

                return (
                  <motion.button
                    key={i}
                    id={`mm-sub-opt-${i}`}
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
                          ? 'bg-sky-500 text-white border-sky-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100'
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
        {/* 3. TREASURE CHEST MATH */}
        {/* ========================================================= */}
        {activity === 'treasure_chest' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Treasure Lock #{currentIndex + 1}
              </span>
              <button
                onClick={() => {
                  sound.speak(`Solve ${TREASURE_CHEST_PROBLEMS[currentIndex].problemText} to unlock the secret gold chest!`);
                }}
                className="flex items-center gap-1 text-xs font-black text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Read Secret 🔊</span>
              </button>
            </div>

            {/* Glowing Math Problem Lock */}
            <div className="my-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-6 rounded-3xl shadow-lg border-4 border-white inline-block">
              <span className="text-4xl sm:text-5xl block mb-1">🗝️</span>
              <h2 className="font-display font-black text-4xl sm:text-5xl tracking-wide">
                {TREASURE_CHEST_PROBLEMS[currentIndex].problemText}
              </h2>
            </div>

            <p className="text-lg sm:text-xl font-black text-sky-950 my-4">
              Which treasure chest has the right key number? Tap to unlock!
            </p>

            {/* 3 Treasure Chests */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto">
              {TREASURE_CHEST_PROBLEMS[currentIndex].chests.map((chest, i) => {
                const isSelected = selectedAnswer === chest.value;
                const isTarget = chest.value === TREASURE_CHEST_PROBLEMS[currentIndex].answer;

                return (
                  <motion.button
                    key={i}
                    id={`mm-chest-${i}`}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      sound.playChestOpen();
                      setSelectedAnswer(chest.value);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-3xl border-4 shadow-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-amber-400 border-amber-500 text-amber-950'
                          : 'bg-rose-400 border-rose-500 text-white'
                        : 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-300 text-amber-950 hover:border-amber-400'
                    }`}
                  >
                    <span className="text-5xl sm:text-6xl">
                      {isSelected && isTarget ? '💎' : '🎁'}
                    </span>
                    <span className="font-display font-black text-2xl sm:text-3xl">
                      {chest.value}
                    </span>
                    <span className="text-xs font-bold text-amber-900">OPEN CHEST</span>
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
                💡 {TREASURE_CHEST_PROBLEMS[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. FEED THE HUNGRY MONSTER */}
        {/* ========================================================= */}
        {activity === 'feed_monster' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Monster Feeding #{currentIndex + 1}
              </span>
              <button
                onClick={() => {
                  sound.speak(MONSTER_FEED_PROBLEMS[currentIndex].prompt);
                }}
                className="flex items-center gap-1 text-xs font-black text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Monster Request 🔊</span>
              </button>
            </div>

            {/* Monster Avatar & Belly Meter */}
            <div className="my-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl sm:text-8xl inline-block"
              >
                {MONSTER_FEED_PROBLEMS[currentIndex].monsterAvatar}
              </motion.div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-sky-950 mt-1">
                {MONSTER_FEED_PROBLEMS[currentIndex].monsterName}
              </h3>
              <p className="text-base sm:text-lg font-black text-sky-800 mt-1">
                “I need <span className="text-amber-600 underline font-black">{MONSTER_FEED_PROBLEMS[currentIndex].num1} + {MONSTER_FEED_PROBLEMS[currentIndex].num2} = {MONSTER_FEED_PROBLEMS[currentIndex].totalNeeded}</span> {MONSTER_FEED_PROBLEMS[currentIndex].foodName}!”
              </p>
            </div>

            {/* Feeding Progress Meter */}
            <div className="bg-sky-100 p-4 rounded-3xl border-2 border-sky-300 my-4 max-w-md mx-auto">
              <div className="flex justify-center gap-2 mb-2">
                {Array.from({ length: MONSTER_FEED_PROBLEMS[currentIndex].totalNeeded }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
                      i < fedCount
                        ? 'bg-amber-400 border-amber-600 scale-110 shadow-sm'
                        : 'bg-white border-dashed border-sky-300 opacity-40'
                    }`}
                  >
                    {MONSTER_FEED_PROBLEMS[currentIndex].foodEmoji}
                  </div>
                ))}
              </div>
              <span className="text-xs font-black text-sky-950">
                Fed: {fedCount} of {MONSTER_FEED_PROBLEMS[currentIndex].totalNeeded}
              </span>
            </div>

            {/* Tap to Feed Cookie Button */}
            <motion.button
              id="mm-feed-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                sound.playCrunch();
                const nextCount = fedCount + 1;
                setFedCount(nextCount);

                if (nextCount === MONSTER_FEED_PROBLEMS[currentIndex].totalNeeded) {
                  sound.playSuccess();
                  handleCorrectAnswer();
                }
              }}
              className="px-6 py-4 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 font-display font-black text-xl sm:text-2xl border-3 border-amber-300 shadow-xl cursor-pointer hover:brightness-105"
            >
              TAP TO FEED {MONSTER_FEED_PROBLEMS[currentIndex].foodEmoji} (Crunch!)
            </motion.button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. CROSS THE RIVER BRIDGE STEPPING STONES */}
        {/* ========================================================= */}
        {activity === 'cross_bridge' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Stepping Stone {bridgeStep + 1} of {BRIDGE_STEP_PROBLEMS.length}
              </span>
              <button
                onClick={() => {
                  sound.speak(`Solve the stepping stone equation: ${BRIDGE_STEP_PROBLEMS[bridgeStep].num1} ${BRIDGE_STEP_PROBLEMS[bridgeStep].operator} ${BRIDGE_STEP_PROBLEMS[bridgeStep].num2}`);
                }}
                className="flex items-center gap-1 text-xs font-black text-sky-800 bg-sky-100 hover:bg-sky-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Read Stone 🔊</span>
              </button>
            </div>

            {/* River & Stepping Stones Visual */}
            <div className="my-4 bg-cyan-100 p-5 rounded-3xl border-3 border-cyan-300 relative overflow-hidden">
              <div className="text-xs font-black text-cyan-900 mb-2">🌊 BLUE RIVER CROSSING 🌊</div>
              <div className="flex justify-around items-center gap-2">
                {BRIDGE_STEP_PROBLEMS.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    {idx === bridgeStep && (
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-3xl mb-1"
                      >
                        🐸
                      </motion.div>
                    )}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-base border-3 shadow-md ${
                        idx < bridgeStep
                          ? 'bg-emerald-400 border-emerald-600 text-white'
                          : idx === bridgeStep
                          ? 'bg-amber-300 border-amber-500 text-amber-950 scale-110'
                          : 'bg-white/80 border-cyan-300 text-cyan-900 opacity-60'
                      }`}
                    >
                      {idx < bridgeStep ? '✅' : `Stone ${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wide block">
                CURRENT STEPPING STONE EQUATION
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-sky-950 mt-1">
                {BRIDGE_STEP_PROBLEMS[bridgeStep].num1} {BRIDGE_STEP_PROBLEMS[bridgeStep].operator} {BRIDGE_STEP_PROBLEMS[bridgeStep].num2} = ?
              </h2>
            </div>

            {/* Step Choices */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {BRIDGE_STEP_PROBLEMS[bridgeStep].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === BRIDGE_STEP_PROBLEMS[bridgeStep].answer;

                return (
                  <motion.button
                    key={i}
                    id={`mm-bridge-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sound.playBridgeStep();
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
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-sky-50 text-sky-950 border-sky-300 hover:bg-sky-100'
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
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
          className="px-4 py-2 rounded-2xl bg-white border-2 border-sky-300 text-sky-950 font-black text-xs sm:text-sm disabled:opacity-40 cursor-pointer shadow-xs"
        >
          ⬅️ PREVIOUS
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-5 py-2 rounded-2xl bg-sky-600 border-2 border-sky-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md hover:bg-sky-500"
        >
          NEXT QUESTION ➡️
        </button>
      </div>
    </div>
  );
};
