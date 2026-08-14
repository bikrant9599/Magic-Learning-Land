import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PuzzlePlanetActivity } from '../types';
import {
  ODD_ONE_OUT_DATA,
  MEMORY_CARDS_DATA,
  SEQUENCE_PATTERNS,
  SORTING_BINS_DATA,
  SHADOW_MATCH_DATA,
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
  Brain,
  Layers,
  Sparkle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PuzzlePlanetModuleProps {
  onEarnStar: (stars: number, category?: string) => void;
  onEarnCoin: (coins: number) => void;
  onNavigateHome: () => void;
  onRecordAttempt?: (world: 'puzzle_planet', isCorrect: boolean) => void;
}

interface MemoryCardState {
  uniqueId: number;
  id: string;
  name: string;
  emoji: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const PuzzlePlanetModule: React.FC<PuzzlePlanetModuleProps> = ({
  onEarnStar,
  onEarnCoin,
  onNavigateHome,
  onRecordAttempt,
}) => {
  const [activity, setActivity] = useState<PuzzlePlanetActivity>('odd_one_out');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);

  // Memory Game Cards State
  const [cards, setCards] = useState<MemoryCardState[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);

  // Category Sorter State
  const [sortedItems, setSortedItems] = useState<{ [itemId: string]: string }>({});

  const praiseWords = ['Puzzle Genius! 🧠', 'Super clever thinking! 🌟', 'You found the pattern! 🚀', 'Spot on logic! ⭐', 'Awesome problem solver! 💖'];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  // Initialize Memory Game Cards
  const initMemoryCards = () => {
    const selectedPairs = MEMORY_CARDS_DATA.slice(0, 4); // 4 pairs = 8 cards
    const deck = [...selectedPairs, ...selectedPairs].map((item, index) => ({
      ...item,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));
    // Shuffle
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlippedCardIds([]);
    setMatchedPairsCount(0);
  };

  useEffect(() => {
    if (activity === 'memory_match') {
      initMemoryCards();
    }
  }, [activity]);

  const handleCorrectAnswer = () => {
    setIsCorrect(true);
    sound.playSuccess();
    triggerConfetti();
    const praise = praiseWords[Math.floor(Math.random() * praiseWords.length)];
    sound.speak(praise);
    onEarnStar(10, 'puzzle_planet');
    setScoreCount((prev) => prev + 1);
    if (onRecordAttempt) onRecordAttempt('puzzle_planet', true);

    setTimeout(() => {
      handleNextQuestion();
    }, 1800);
  };

  const handleWrongAnswer = () => {
    setIsCorrect(false);
    sound.playTryAgain();
    setShowHint(true);
    sound.speak('Good try! Look closely and try again!');
    if (onRecordAttempt) onRecordAttempt('puzzle_planet', false);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setSortedItems({});

    if (activity === 'odd_one_out') {
      if (currentIndex + 1 >= ODD_ONE_OUT_DATA.length) {
        onEarnCoin(5);
        sound.playFanfare();
        sound.speak('Awesome puzzle master! You earned 5 shiny gold coins!');
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'pattern_complete') {
      if (currentIndex + 1 >= SEQUENCE_PATTERNS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'category_sorter') {
      if (currentIndex + 1 >= SORTING_BINS_DATA.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'shadow_match') {
      if (currentIndex + 1 >= SHADOW_MATCH_DATA.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const switchActivity = (act: PuzzlePlanetActivity) => {
    sound.playPop(500);
    setActivity(act);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setSortedItems({});
  };

  // Card Flip Handler for Memory Match
  const handleCardClick = (uniqueId: number) => {
    if (flippedCardIds.length === 2) return;
    const card = cards.find((c) => c.uniqueId === uniqueId);
    if (!card || card.isFlipped || card.isMatched) return;

    sound.playCardFlip();
    const newFlipped = [...flippedCardIds, uniqueId];
    setFlippedCardIds(newFlipped);

    setCards((prev) =>
      prev.map((c) => (c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c))
    );

    if (newFlipped.length === 2) {
      const card1 = cards.find((c) => c.uniqueId === newFlipped[0]);
      const card2 = cards.find((c) => c.uniqueId === uniqueId);

      if (card1 && card2 && card1.id === card2.id) {
        sound.playSuccess();
        const nextPairs = matchedPairsCount + 1;
        setMatchedPairsCount(nextPairs);

        setCards((prev) =>
          prev.map((c) =>
            c.id === card1.id ? { ...c, isMatched: true, isFlipped: true } : c
          )
        );
        setFlippedCardIds([]);
        onEarnStar(10, 'puzzle_planet');

        if (nextPairs === 4) {
          triggerConfetti();
          sound.playFanfare();
          sound.speak('Super memory champion! All pairs matched!');
          onEarnCoin(5);
          setTimeout(() => initMemoryCards(), 2000);
        }
      } else {
        sound.playTryAgain();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.uniqueId) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCardIds([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-purple-100 via-pink-50 to-rose-50 px-3 sm:px-6 py-4 flex flex-col justify-between">
      {/* Top Header & Tabs */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            id="pp-back-home"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-purple-300 text-purple-950 font-black text-sm shadow-xs hover:bg-purple-50 cursor-pointer"
          >
            <Home className="w-4 h-4 text-purple-600" />
            <span>MAP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-purple-950 flex items-center gap-1.5">
              🪐 Puzzle Planet
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border-2 border-purple-300 shadow-xs">
            <span className="text-xs font-black text-purple-900">Solved: {scoreCount}</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          </div>
        </div>

        {/* 5 Puzzle Activity Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
          {[
            { id: 'odd_one_out' as PuzzlePlanetActivity, label: '🔍 Odd One Out' },
            { id: 'memory_match' as PuzzlePlanetActivity, label: '🃏 Memory Cards' },
            { id: 'pattern_complete' as PuzzlePlanetActivity, label: '🔮 Pattern Master' },
            { id: 'category_sorter' as PuzzlePlanetActivity, label: '📦 Sort Bins' },
            { id: 'shadow_match' as PuzzlePlanetActivity, label: '👤 Shadow Match' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`pp-tab-${tab.id}`}
              onClick={() => switchActivity(tab.id)}
              className={`py-2 px-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer truncate text-center ${
                activity === tab.id
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102'
                  : 'bg-white/90 text-purple-950 border-purple-200 hover:bg-purple-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Activity Area */}
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col items-center justify-center my-2">
        {/* ========================================================= */}
        {/* 1. ODD ONE OUT */}
        {/* ========================================================= */}
        {activity === 'odd_one_out' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Challenge {currentIndex + 1} of {ODD_ONE_OUT_DATA.length}
              </span>
              <button
                onClick={() => {
                  sound.speak(`Find the odd one out that does not belong in this group! ${ODD_ONE_OUT_DATA[currentIndex].hint}`);
                }}
                className="flex items-center gap-1 text-xs font-black text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Hear Hint 🔊</span>
              </button>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-purple-950 font-display mb-6">
              Which one does <span className="text-purple-600 underline">NOT</span> belong?
            </h3>

            {/* 4 Item Choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto mb-4">
              {ODD_ONE_OUT_DATA[currentIndex].items.map((item, i) => {
                const isSelected = selectedAnswer === i;
                const isTarget = i === ODD_ONE_OUT_DATA[currentIndex].correctIndex;

                return (
                  <motion.button
                    key={i}
                    id={`pp-odd-opt-${i}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      setSelectedAnswer(i);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-3xl border-3 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-purple-500 text-white border-purple-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-purple-50 text-purple-950 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <span className="text-5xl sm:text-6xl">{item.emoji}</span>
                    <span className="font-display font-black text-lg sm:text-xl">{item.label}</span>
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
                💡 {ODD_ONE_OUT_DATA[currentIndex].explanation}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. MEMORY MATCHING CARDS */}
        {/* ========================================================= */}
        {activity === 'memory_match' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Matched: {matchedPairsCount} of 4 Pairs
              </span>
              <button
                onClick={initMemoryCards}
                className="flex items-center gap-1 text-xs font-black text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-purple-600" />
                <span>Shuffle Cards</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-purple-950 font-display mb-4">
              Flip cards to match the cute animal pairs!
            </h3>

            {/* 8 Memory Cards Grid */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto my-4">
              {cards.map((card) => (
                <motion.button
                  key={card.uniqueId}
                  id={`mem-card-${card.uniqueId}`}
                  whileHover={{ scale: card.isFlipped ? 1 : 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCardClick(card.uniqueId)}
                  className={`h-24 sm:h-28 rounded-2xl border-3 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all ${
                    card.isFlipped || card.isMatched
                      ? `bg-gradient-to-br ${card.color} text-white border-white scale-102`
                      : 'bg-purple-600 border-purple-800 text-white hover:bg-purple-500'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <>
                      <span className="text-4xl sm:text-5xl">{card.emoji}</span>
                      <span className="text-xs font-black mt-1">{card.name}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-black opacity-80">❓</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. COMPLETE THE PATTERN */}
        {/* ========================================================= */}
        {activity === 'pattern_complete' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Pattern #{currentIndex + 1} of {SEQUENCE_PATTERNS.length}
              </span>
              <button
                onClick={() => sound.speak(SEQUENCE_PATTERNS[currentIndex].hint)}
                className="flex items-center gap-1 text-xs font-black text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Hear Pattern 🔊</span>
              </button>
            </div>

            {/* Pattern Sequence Strip */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 my-6 bg-purple-50 p-4 sm:p-6 rounded-3xl border-2 border-purple-200 overflow-x-auto">
              {SEQUENCE_PATTERNS[currentIndex].sequence.map((item, idx) => (
                <div
                  key={idx}
                  className="w-14 h-16 sm:w-18 sm:h-20 rounded-2xl bg-white border-2 border-purple-300 flex flex-col items-center justify-center shadow-sm"
                >
                  <span className="text-3xl sm:text-4xl">{item.emoji || item.label}</span>
                </div>
              ))}

              <span className="text-3xl font-black text-purple-800">➔</span>

              {/* Mystery Box */}
              <div className="w-16 h-18 sm:w-20 sm:h-22 rounded-2xl border-3 border-dashed border-purple-500 bg-purple-100 flex items-center justify-center text-3xl font-black text-purple-800 shadow-inner animate-pulse">
                {selectedAnswer !== null ? selectedAnswer : '?'}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-purple-950 font-display mb-6">
              What comes next in this pattern?
            </h3>

            {/* 3 Pattern Choice Options */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {SEQUENCE_PATTERNS[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt.label;
                const isTarget = i === SEQUENCE_PATTERNS[currentIndex].correctIndex;

                return (
                  <motion.button
                    key={i}
                    id={`pp-pat-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedAnswer(opt.label);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl font-display font-black text-3xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-purple-500 text-white border-purple-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100'
                    }`}
                  >
                    {opt.emoji || opt.label}
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
                💡 {SEQUENCE_PATTERNS[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. CATEGORY SORTING BINS */}
        {/* ========================================================= */}
        {activity === 'category_sorter' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Sorting Challenge #{currentIndex + 1}
              </span>
              <button
                onClick={() => sound.speak('Tap items into their correct category bins!')}
                className="flex items-center gap-1 text-xs font-black text-purple-800 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-purple-600" />
                <span>Instructions 🔊</span>
              </button>
            </div>

            {/* 2 Thematic Target Bins */}
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Bin 1 */}
              <div className={`p-4 rounded-3xl border-3 ${SORTING_BINS_DATA[currentIndex].bin1.color} shadow-sm`}>
                <span className="text-4xl sm:text-5xl block mb-1">{SORTING_BINS_DATA[currentIndex].bin1.icon}</span>
                <h4 className="font-display font-black text-lg sm:text-xl">
                  {SORTING_BINS_DATA[currentIndex].bin1.name}
                </h4>
              </div>

              {/* Bin 2 */}
              <div className={`p-4 rounded-3xl border-3 ${SORTING_BINS_DATA[currentIndex].bin2.color} shadow-sm`}>
                <span className="text-4xl sm:text-5xl block mb-1">{SORTING_BINS_DATA[currentIndex].bin2.icon}</span>
                <h4 className="font-display font-black text-lg sm:text-xl">
                  {SORTING_BINS_DATA[currentIndex].bin2.name}
                </h4>
              </div>
            </div>

            {/* Items to Tap and Sort */}
            <h3 className="text-base sm:text-lg font-black text-purple-950 mb-3">
              Tap each item below to sort it into the left or right bin:
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 max-w-xl mx-auto">
              {SORTING_BINS_DATA[currentIndex].items.map((item) => {
                const currentBin = sortedItems[item.id];

                return (
                  <motion.button
                    key={item.id}
                    id={`pp-sort-item-${item.id}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sound.playPop(520);
                      const targetBin =
                        item.category === SORTING_BINS_DATA[currentIndex].bin1.acceptCategory
                          ? 'bin1'
                          : 'bin2';

                      const newSorted = { ...sortedItems, [item.id]: targetBin };
                      setSortedItems(newSorted);

                      if (Object.keys(newSorted).length === SORTING_BINS_DATA[currentIndex].items.length) {
                        handleCorrectAnswer();
                      }
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      currentBin
                        ? 'bg-emerald-100 border-emerald-400 opacity-60 scale-95'
                        : 'bg-white border-purple-200 hover:border-purple-400 shadow-sm'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl">{item.emoji}</span>
                    <span className="text-[11px] font-black text-purple-950 mt-1">{item.name}</span>
                    {currentBin && <span className="text-[10px] text-emerald-700 font-bold">✓ Sorted</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. SHADOW SILHOUETTE MATCH */}
        {/* ========================================================= */}
        {activity === 'shadow_match' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-purple-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Silhouette #{currentIndex + 1}
              </span>
            </div>

            <div className="my-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-900 border-4 border-slate-700 text-white flex items-center justify-center text-6xl sm:text-7xl mx-auto shadow-xl">
                {SHADOW_MATCH_DATA[currentIndex].silhouette}
              </div>
              <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wide mt-2 block">
                MYSTERY SHADOW SHAPE
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-purple-950 font-display mb-6">
              Which friend matches this shadow?
            </h3>

            {/* Choices */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              {SHADOW_MATCH_DATA[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt.name;
                const isTarget = i === SHADOW_MATCH_DATA[currentIndex].correctIndex;

                return (
                  <motion.button
                    key={i}
                    id={`pp-shadow-opt-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedAnswer(opt.name);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`w-20 h-24 sm:w-24 sm:h-28 rounded-3xl border-3 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-purple-500 text-white border-purple-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl">{opt.emoji}</span>
                    <span className="text-xs font-black mt-1">{opt.name}</span>
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
          className="px-4 py-2 rounded-2xl bg-white border-2 border-purple-300 text-purple-950 font-black text-xs sm:text-sm disabled:opacity-40 cursor-pointer shadow-xs"
        >
          ⬅️ PREVIOUS
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-5 py-2 rounded-2xl bg-purple-600 border-2 border-purple-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md hover:bg-purple-500"
        >
          NEXT QUESTION ➡️
        </button>
      </div>
    </div>
  );
};
