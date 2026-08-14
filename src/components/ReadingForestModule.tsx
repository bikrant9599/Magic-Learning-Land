import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReadingActivity } from '../types';
import {
  READING_WORDS,
  MISSING_LETTERS,
  WORD_BUILDER_DATA,
  SENTENCE_STORIES,
  LISTENING_WORDS,
} from '../data/ukgData';
import { sound } from '../utils/audio';
import {
  BookOpen,
  Volume2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Star,
  Home,
  HelpCircle,
  Puzzle,
  Headphones,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReadingForestModuleProps {
  onEarnStar: (stars: number, category?: string) => void;
  onEarnCoin: (coins: number) => void;
  onNavigateHome: () => void;
  onRecordAttempt?: (world: 'reading', isCorrect: boolean) => void;
}

export const ReadingForestModule: React.FC<ReadingForestModuleProps> = ({
  onEarnStar,
  onEarnCoin,
  onNavigateHome,
  onRecordAttempt,
}) => {
  const [activity, setActivity] = useState<ReadingActivity>('word_match');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [builtLetters, setBuiltLetters] = useState<string[]>([]);
  const [scoreCount, setScoreCount] = useState<number>(0);

  // Positive feedback prompts
  const praiseWords = ['Fantastic! 🎉', 'Great reading! 🌟', 'You got it! 🚀', 'Super reader! ⭐', 'Awesome job! 💖'];

  // Helper to trigger confetti celebration
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
    onEarnStar(10, 'reading');
    setScoreCount((prev) => prev + 1);
    if (onRecordAttempt) onRecordAttempt('reading', true);

    setTimeout(() => {
      handleNextQuestion();
    }, 1800);
  };

  const handleWrongAnswer = (hintText?: string) => {
    setIsCorrect(false);
    sound.playTryAgain();
    setShowHint(true);
    sound.speak('Good try! Let us try once more!');
    if (onRecordAttempt) onRecordAttempt('reading', false);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setBuiltLetters([]);

    if (activity === 'word_match') {
      if (currentIndex + 1 >= READING_WORDS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        sound.speak('Hurray! You completed Word Match and earned 5 gold coins!');
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'missing_letter') {
      if (currentIndex + 1 >= MISSING_LETTERS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'word_builder') {
      if (currentIndex + 1 >= WORD_BUILDER_DATA.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'sentence_story') {
      if (currentIndex + 1 >= SENTENCE_STORIES.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (activity === 'listen_choose') {
      if (currentIndex + 1 >= LISTENING_WORDS.length) {
        onEarnCoin(5);
        sound.playFanfare();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  const switchActivity = (act: ReadingActivity) => {
    sound.playPop(500);
    setActivity(act);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setBuiltLetters([]);
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-gradient-to-b from-emerald-100 via-teal-50 to-amber-50 px-3 sm:px-6 py-4 flex flex-col justify-between">
      {/* Top Bar: Navigation Tabs for 5 Reading Activities */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            id="rf-back-home"
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border-2 border-emerald-300 text-emerald-850 font-black text-sm shadow-xs hover:bg-emerald-50 cursor-pointer"
          >
            <Home className="w-4 h-4 text-emerald-600" />
            <span>MAP</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-emerald-950 flex items-center gap-1.5">
              🌲 Reading Forest
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border-2 border-emerald-300 shadow-xs">
            <span className="text-xs font-black text-emerald-900">Solved: {scoreCount}</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          </div>
        </div>

        {/* Activity Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
          {[
            { id: 'word_match' as ReadingActivity, label: '🖼️ Word Match' },
            { id: 'missing_letter' as ReadingActivity, label: '❓ Missing Letter' },
            { id: 'word_builder' as ReadingActivity, label: '🧩 Word Builder' },
            { id: 'sentence_story' as ReadingActivity, label: '📖 Story Reader' },
            { id: 'listen_choose' as ReadingActivity, label: '🎧 Phonics Ear' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`rf-tab-${tab.id}`}
              onClick={() => switchActivity(tab.id)}
              className={`py-2 px-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer truncate text-center ${
                activity === tab.id
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102'
                  : 'bg-white/90 text-emerald-950 border-emerald-200 hover:bg-emerald-100/70'
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
        {/* 1. WORD TO PICTURE MATCH */}
        {/* ========================================================= */}
        {activity === 'word_match' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Question {currentIndex + 1} of {READING_WORDS.length}
              </span>
              <button
                id="voice-read-word"
                onClick={() => {
                  const curr = READING_WORDS[currentIndex];
                  sound.playPop(520);
                  sound.speak(`The word is ${curr.word}. ${curr.hint}`);
                }}
                className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Hear Word 🔊</span>
              </button>
            </div>

            {/* Giant Illustrated Target Word */}
            <div className="my-3">
              <span className="text-6xl sm:text-7xl block mb-2 animate-bounce">
                {READING_WORDS[currentIndex].emoji}
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-700">
                Phonics: <span className="text-emerald-950 font-black">{READING_WORDS[currentIndex].phonics}</span>
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 font-display tracking-wider mt-1">
                {READING_WORDS[currentIndex].word}
              </h2>
            </div>

            {/* Instruction Banner */}
            <p className="text-base sm:text-lg font-black text-emerald-900 mb-6">
              Which picture or word matches the word above? Tap the right one! 👇
            </p>

            {/* Multiple Choice Option Buttons */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
              {(READING_WORDS[currentIndex].options || ['CAT', 'BAT', 'HAT']).map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === READING_WORDS[currentIndex].word;

                return (
                  <motion.button
                    key={i}
                    id={`rf-opt-${i}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer(READING_WORDS[currentIndex].hint);
                      }
                    }}
                    className={`py-4 sm:py-5 px-3 rounded-2xl font-display font-black text-xl sm:text-2xl border-3 shadow-md cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Gentle Hint Helper */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-950 text-sm font-extrabold flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>💡 Hint: {READING_WORDS[currentIndex].hint}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. MISSING LETTER MYSTERY */}
        {/* ========================================================= */}
        {activity === 'missing_letter' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Word {currentIndex + 1} of {MISSING_LETTERS.length}
              </span>
              <button
                onClick={() => {
                  const curr = MISSING_LETTERS[currentIndex];
                  sound.speak(`Fill in the missing letter for ${curr.fullWord}.`);
                }}
                className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Hear Word 🔊</span>
              </button>
            </div>

            {/* Big Word with Missing Slot */}
            <div className="my-4">
              <span className="text-6xl sm:text-7xl block mb-2">{MISSING_LETTERS[currentIndex].emoji}</span>
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-emerald-100/70 px-6 py-3 rounded-3xl border-3 border-emerald-300">
                {MISSING_LETTERS[currentIndex].displayWord.split(' ').map((chunk, idx) => (
                  <span
                    key={idx}
                    className={`font-display font-black text-4xl sm:text-5xl ${
                      chunk === '_'
                        ? 'w-12 h-14 border-b-4 border-emerald-600 text-emerald-600 inline-block bg-white rounded-lg'
                        : 'text-emerald-950'
                    }`}
                  >
                    {chunk === '_' && selectedAnswer ? selectedAnswer : chunk}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-base sm:text-lg font-black text-emerald-900 mb-6">
              Which letter completes the word <span className="text-emerald-600 font-extrabold">{MISSING_LETTERS[currentIndex].fullWord}</span>?
            </p>

            {/* Letter Choices */}
            <div className="flex justify-center gap-3 sm:gap-5 max-w-sm mx-auto">
              {MISSING_LETTERS[currentIndex].options.map((letter, i) => {
                const isSelected = selectedAnswer === letter;
                const isTarget = letter === MISSING_LETTERS[currentIndex].correctLetter;

                return (
                  <motion.button
                    key={i}
                    id={`rf-letter-${i}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setSelectedAnswer(letter);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer(MISSING_LETTERS[currentIndex].hint);
                      }
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl font-display font-black text-3xl sm:text-4xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-emerald-100 text-emerald-950 border-emerald-300 hover:bg-emerald-200'
                    }`}
                  >
                    {letter}
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
                💡 Hint: {MISSING_LETTERS[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. WORD BUILDER (ARRANGE SCRAMBLED LETTERS) */}
        {/* ========================================================= */}
        {activity === 'word_builder' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Puzzle {currentIndex + 1} of {WORD_BUILDER_DATA.length}
              </span>
              <button
                onClick={() => {
                  sound.speak(`Spell the word ${WORD_BUILDER_DATA[currentIndex].word}`);
                }}
                className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Hear Word 🔊</span>
              </button>
            </div>

            <div className="my-2">
              <span className="text-6xl sm:text-7xl block mb-2">{WORD_BUILDER_DATA[currentIndex].emoji}</span>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950 font-display">
                Tap letters in order to spell: <span className="text-emerald-600 underline">{WORD_BUILDER_DATA[currentIndex].word}</span>
              </h3>
            </div>

            {/* Target Letter Slot Boxes */}
            <div className="flex justify-center gap-3 my-6">
              {WORD_BUILDER_DATA[currentIndex].word.split('').map((_, idx) => (
                <div
                  key={idx}
                  className="w-14 h-16 sm:w-18 sm:h-20 rounded-2xl border-4 border-dashed border-emerald-400 bg-emerald-50 flex items-center justify-center font-display font-black text-3xl sm:text-4xl text-emerald-950 shadow-inner"
                >
                  {builtLetters[idx] || ''}
                </div>
              ))}
            </div>

            {/* Available Scrambled Letter Tiles */}
            <div className="flex justify-center gap-3 sm:gap-4 mb-4">
              {WORD_BUILDER_DATA[currentIndex].scrambledLetters.map((letter, idx) => {
                const isUsed = builtLetters.filter((l) => l === letter).length >
                  WORD_BUILDER_DATA[currentIndex].scrambledLetters.slice(0, idx).filter((l) => l === letter).length;

                return (
                  <motion.button
                    key={idx}
                    id={`rf-scramble-${idx}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isUsed}
                    onClick={() => {
                      sound.playLetterChime(500 + idx * 80);
                      const newBuilt = [...builtLetters, letter];
                      setBuiltLetters(newBuilt);

                      if (newBuilt.length === WORD_BUILDER_DATA[currentIndex].word.length) {
                        const assembled = newBuilt.join('');
                        if (assembled === WORD_BUILDER_DATA[currentIndex].word) {
                          handleCorrectAnswer();
                        } else {
                          handleWrongAnswer();
                          setTimeout(() => setBuiltLetters([]), 1000);
                        }
                      }
                    }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-display font-black text-2xl sm:text-3xl border-3 shadow-md flex items-center justify-center cursor-pointer transition-all ${
                      isUsed
                        ? 'opacity-40 bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-400 text-white border-emerald-500 hover:bg-emerald-500'
                    }`}
                  >
                    {letter}
                  </motion.button>
                );
              })}
            </div>

            {/* Reset Built Letters Button */}
            <button
              onClick={() => {
                sound.playPop(420);
                setBuiltLetters([]);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 text-amber-950 font-black text-xs border border-amber-300 hover:bg-amber-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tiles</span>
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. SENTENCE STORY READER */}
        {/* ========================================================= */}
        {activity === 'sentence_story' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Story {currentIndex + 1} of {SENTENCE_STORIES.length}
              </span>
              <button
                onClick={() => {
                  const curr = SENTENCE_STORIES[currentIndex];
                  sound.speak(`${curr.sentence} ... Question: ${curr.question}`);
                }}
                className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Read Story 🔊</span>
              </button>
            </div>

            {/* Illustrated Story Sentence */}
            <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50 border-3 border-emerald-200 mb-6">
              <span className="text-5xl sm:text-6xl block mb-2">{SENTENCE_STORIES[currentIndex].emoji}</span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-display tracking-wide">
                “{SENTENCE_STORIES[currentIndex].sentence}”
              </p>
            </div>

            {/* Comprehension Question */}
            <h3 className="text-lg sm:text-xl font-black text-emerald-900 mb-4">
              ❓ {SENTENCE_STORIES[currentIndex].question}
            </h3>

            {/* 3 Story Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {SENTENCE_STORIES[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isTarget = i === SENTENCE_STORIES[currentIndex].correctIndex;

                return (
                  <motion.button
                    key={i}
                    id={`rf-story-opt-${i}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAnswer(i);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer(SENTENCE_STORIES[currentIndex].hint);
                      }
                    }}
                    className={`py-3.5 px-4 rounded-2xl font-black text-base sm:text-lg border-3 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-emerald-100/70 text-emerald-950 border-emerald-300 hover:bg-emerald-200/70'
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span>{opt.text}</span>
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
                💡 {SENTENCE_STORIES[currentIndex].hint}
              </motion.div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. PHONICS EAR (LISTEN & SELECT) */}
        {/* ========================================================= */}
        {activity === 'listen_choose' && (
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-xl text-center relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Ear Challenge {currentIndex + 1} of {LISTENING_WORDS.length}
              </span>
            </div>

            {/* Giant Listen Button */}
            <div className="my-4">
              <motion.button
                id="rf-listen-big-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sound.playPop(550);
                  sound.speak(`Listen carefully: ${LISTENING_WORDS[currentIndex].spokenAudio}`);
                }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex flex-col items-center justify-center mx-auto shadow-xl border-4 border-white cursor-pointer hover:shadow-2xl transition-all"
              >
                <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider mt-1">TAP TO LISTEN</span>
              </motion.button>
            </div>

            <p className="text-base sm:text-lg font-black text-emerald-950 mb-6">
              Listen to the word spoken above. Which word did you hear?
            </p>

            {/* 3 Word Choices */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
              {LISTENING_WORDS[currentIndex].options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isTarget = opt === LISTENING_WORDS[currentIndex].correctWord;

                return (
                  <motion.button
                    key={i}
                    id={`rf-listen-opt-${i}`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setSelectedAnswer(opt);
                      if (isTarget) {
                        handleCorrectAnswer();
                      } else {
                        handleWrongAnswer();
                      }
                    }}
                    className={`py-4 sm:py-5 px-3 rounded-2xl font-display font-black text-2xl border-3 shadow-md cursor-pointer transition-all ${
                      isSelected
                        ? isTarget
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-rose-400 text-white border-rose-500'
                        : 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100'
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

      {/* Bottom Bar Controls */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pt-2">
        <button
          onClick={() => {
            sound.playPop(480);
            if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
          }}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-2xl bg-white border-2 border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm disabled:opacity-40 cursor-pointer shadow-xs"
        >
          ⬅️ PREVIOUS
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-5 py-2 rounded-2xl bg-emerald-600 border-2 border-emerald-700 text-white font-black text-xs sm:text-sm cursor-pointer shadow-md hover:bg-emerald-500"
        >
          NEXT QUESTION ➡️
        </button>
      </div>
    </div>
  );
};
