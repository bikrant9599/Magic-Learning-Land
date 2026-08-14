import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AbcActivity, AbcLetter } from '../types';
import { ABC_DATA, PRAISE_MESSAGES } from '../data/lkgData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import {
  Sparkles,
  Volume2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  PenTool,
  RotateCcw,
  Star,
  Layers,
} from 'lucide-react';

interface AbcWorldModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
  onIncrementDaily?: (world: 'abc' | 'numbers' | 'objects' | 'patterns') => void;
}

export const AbcWorldModule: React.FC<AbcWorldModuleProps> = ({
  onEarnStar,
  onNavigateHome,
  onIncrementDaily,
}) => {
  const [activity, setActivity] = useState<AbcActivity>('explore');
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);

  // Match / Quiz State
  const [quizTarget, setQuizTarget] = useState<AbcLetter>(ABC_DATA[0]);
  const [quizOptions, setQuizOptions] = useState<AbcLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Beginning Sound State
  const [soundTarget, setSoundTarget] = useState<AbcLetter>(ABC_DATA[0]);
  const [soundOptions, setSoundOptions] = useState<{ word: string; emoji: string; correct: boolean }[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  // Tracing State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tracedPointsCount, setTracedPointsCount] = useState(0);
  const [traceSuccess, setTraceSuccess] = useState(false);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  const currentLetter = ABC_DATA[currentLetterIdx];

  // Initialize Quiz / Match round
  const generateQuizRound = () => {
    const randomIdx = Math.floor(Math.random() * ABC_DATA.length);
    const target = ABC_DATA[randomIdx];
    const others = ABC_DATA.filter((l) => l.letter !== target.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const choices = [target, ...others].sort(() => Math.random() - 0.5);

    setQuizTarget(target);
    setQuizOptions(choices);
    setSelectedLetter(null);
    setHintMessage(null);
  };

  // Initialize Beginning Sound round
  const generateSoundRound = () => {
    const randomIdx = Math.floor(Math.random() * ABC_DATA.length);
    const target = ABC_DATA[randomIdx];

    const correctItem = { word: target.word, emoji: target.emoji, correct: true };
    const distractors = ABC_DATA.filter((l) => l.letter !== target.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d) => ({ word: d.word, emoji: d.emoji, correct: false }));

    const choices = [correctItem, ...distractors].sort(() => Math.random() - 0.5);

    setSoundTarget(target);
    setSoundOptions(choices);
    setSelectedWord(null);
    setHintMessage(null);
  };

  // Initial load
  useEffect(() => {
    generateQuizRound();
    generateSoundRound();
  }, []);

  // Voice narration on explorer change
  useEffect(() => {
    if (activity === 'explore') {
      sound.speak(
        `${currentLetter.letter} for ${currentLetter.word}! ${currentLetter.soundHint}`
      );
    } else if (activity === 'quiz') {
      sound.speak(`Which letter stands for ${quizTarget.word}?`);
    } else if (activity === 'beginning_sound') {
      sound.speak(`Which friend starts with the letter ${soundTarget.letter}?`);
    } else if (activity === 'tracing') {
      sound.speak(`Trace the magic letter ${currentLetter.letter}!`);
      clearCanvas();
    }
  }, [activity, currentLetterIdx, quizTarget, soundTarget]);

  // Handle Letter Matching Quiz Answer
  const handleSelectQuiz = (chosen: AbcLetter) => {
    setSelectedLetter(chosen.letter);

    if (chosen.letter === quizTarget.letter) {
      sound.playSuccess();
      const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      setHintMessage(praise);
      sound.speak(`${praise}! ${chosen.letter} is for ${chosen.word}!`);
      onEarnStar(10, 'abc');
      if (onIncrementDaily) onIncrementDaily('abc');

      const nextScore = quizScore + 1;
      setQuizScore(nextScore);

      setTimeout(() => {
        if (nextScore >= 5) {
          setCelebrationMsg({
            title: 'ABC MASTER! 🔤',
            message: 'You matched 5 letters and pictures perfectly!',
          });
          setShowCelebration(true);
          setQuizScore(0);
        } else {
          generateQuizRound();
        }
      }, 1400);
    } else {
      sound.playTryAgain();
      setHintMessage(`Listen closely! ${quizTarget.soundHint} 🌟`);
      sound.speak(`Almost! Let's find ${quizTarget.letter} for ${quizTarget.word}.`);
      setTimeout(() => {
        setSelectedLetter(null);
      }, 1200);
    }
  };

  // Handle Beginning Sound Answer
  const handleSelectSoundWord = (option: { word: string; emoji: string; correct: boolean }) => {
    setSelectedWord(option.word);

    if (option.correct) {
      sound.playSuccess();
      const praise = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];
      setHintMessage(praise);
      sound.speak(`${praise}! ${option.word} starts with ${soundTarget.letter}!`);
      onEarnStar(10, 'abc');
      if (onIncrementDaily) onIncrementDaily('abc');

      setTimeout(() => {
        generateSoundRound();
      }, 1500);
    } else {
      sound.playTryAgain();
      setHintMessage(`Think about letter ${soundTarget.letter}: ${soundTarget.soundHint}`);
      sound.speak(`Try again! Which one starts with ${soundTarget.letter}?`);
      setTimeout(() => {
        setSelectedWord(null);
      }, 1200);
    }
  };

  // Tracing Canvas Helpers
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTracedPointsCount(0);
    setTraceSuccess(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();

    if (tracedPointsCount > 15 && !traceSuccess) {
      setTraceSuccess(true);
      sound.playSuccess();
      sound.speak(`Wonderful tracing! You wrote the letter ${currentLetter.letter}!`);
      onEarnStar(10, 'abc');
      if (onIncrementDaily) onIncrementDaily('abc');
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#F59E0B'; // Bright golden magical stroke

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    setTracedPointsCount((prev) => prev + 1);
    if (Math.random() > 0.6) {
      sound.playPop(500 + Math.random() * 200);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-rose-100 via-pink-50 to-purple-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-3xl mx-auto w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
        <button
          id="abc-tab-explore"
          onClick={() => {
            sound.playPop(520);
            setActivity('explore');
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'explore'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>A–Z EXPLORER</span>
        </button>

        <button
          id="abc-tab-quiz"
          onClick={() => {
            sound.playPop(520);
            setActivity('quiz');
            generateQuizRound();
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'quiz'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>LETTER MATCH</span>
        </button>

        <button
          id="abc-tab-sounds"
          onClick={() => {
            sound.playPop(520);
            setActivity('beginning_sound');
            generateSoundRound();
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'beginning_sound'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>BEGINNING SOUNDS</span>
        </button>

        <button
          id="abc-tab-tracing"
          onClick={() => {
            sound.playPop(520);
            setActivity('tracing');
          }}
          className={`py-2 px-3 rounded-2xl font-black text-xs sm:text-sm border-3 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activity === 'tracing'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>MAGIC TRACING</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'explore' && (
        <Mascot
          message={`Explore the letter ${currentLetter.letter}! Tap the speaker to hear its sound!`}
          voiceText={`${currentLetter.letter} for ${currentLetter.word}!`}
          mood="happy"
        />
      )}
      {activity === 'quiz' && (
        <Mascot
          message={`Which letter stands for ${quizTarget.word}?`}
          voiceText={`Which letter stands for ${quizTarget.word}?`}
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}
      {activity === 'beginning_sound' && (
        <Mascot
          message={`Which picture starts with the letter ${soundTarget.letter}?`}
          voiceText={`Which picture starts with the letter ${soundTarget.letter}?`}
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}
      {activity === 'tracing' && (
        <Mascot
          message={`Use your finger or mouse to trace the letter ${currentLetter.letter}!`}
          voiceText={`Trace letter ${currentLetter.letter}!`}
          mood={traceSuccess ? 'cheering' : 'happy'}
        />
      )}

      {/* 1. A-Z EXPLORER VIEW */}
      {activity === 'explore' && (
        <div className="max-w-3xl mx-auto w-full my-2 flex-1 flex flex-col justify-between items-center">
          {/* Main Giant Letter Card */}
          <div className="w-full bg-white/95 rounded-3xl p-5 sm:p-6 shadow-xl border-4 border-rose-300 relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Big Letter & Phonics */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl sm:text-9xl font-black text-rose-600 font-display drop-shadow-sm">
                  {currentLetter.letter}
                </span>
                <span className="text-5xl sm:text-7xl font-extrabold text-rose-400 font-display">
                  {currentLetter.lowercase}
                </span>
              </div>

              <div className="mt-1 px-3 py-1 bg-rose-100 rounded-full border border-rose-200 text-rose-800 font-black text-xs sm:text-sm">
                Phonics: {currentLetter.phonics}
              </div>

              <button
                id="listen-phonics-btn"
                onClick={() => {
                  sound.playLetterChime(650);
                  sound.speak(`${currentLetter.letter} says ${currentLetter.soundHint}`);
                }}
                className="mt-3 flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>HEAR SOUND</span>
              </button>
            </div>

            {/* Primary Word & Large Emoji Illustration */}
            <div className="flex-1 flex flex-col items-center justify-center text-center bg-rose-50/70 p-4 rounded-3xl border-2 border-rose-200 w-full">
              <motion.span
                key={currentLetter.letter}
                initial={{ scale: 0.7, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-7xl sm:text-8xl select-none drop-shadow-md my-1"
              >
                {currentLetter.emoji}
              </motion.span>
              <h3 className="text-2xl sm:text-4xl font-black text-rose-950 font-display">
                {currentLetter.word}
              </h3>
              <p className="text-xs sm:text-sm font-extrabold text-rose-700 mt-1">
                "{currentLetter.soundHint}"
              </p>
            </div>
          </div>

          {/* Secondary Words Explorer Row */}
          <div className="w-full mt-3 bg-white/80 rounded-2xl p-3 border-2 border-rose-200 shadow-xs">
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 block text-center mb-1">
              More Words Starting with {currentLetter.letter}:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {currentLetter.otherWords.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playPop(520);
                    sound.speak(`${item.word}!`);
                  }}
                  className="p-2 rounded-xl bg-white border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 flex flex-col items-center justify-center cursor-pointer transition-all"
                >
                  <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                  <span className="text-[11px] sm:text-xs font-black text-rose-950 truncate mt-0.5">
                    {item.word}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* A–Z Letter Carousel / Navigation Bar */}
          <div className="w-full flex items-center justify-between gap-2 mt-3">
            <button
              id="prev-letter-btn"
              onClick={() => {
                sound.playPop(440);
                setCurrentLetterIdx((prev) => (prev > 0 ? prev - 1 : ABC_DATA.length - 1));
              }}
              className="p-3 rounded-2xl bg-white border-3 border-rose-300 text-rose-800 font-bold hover:bg-rose-50 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Quick Letter Strip */}
            <div className="flex-1 overflow-x-auto py-1 flex items-center gap-1.5 scrollbar-none px-1">
              {ABC_DATA.map((item, idx) => (
                <button
                  key={item.letter}
                  id={`letter-chip-${item.letter}`}
                  onClick={() => {
                    sound.playPop(480);
                    setCurrentLetterIdx(idx);
                  }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-sm shrink-0 border-2 transition-all cursor-pointer flex items-center justify-center ${
                    idx === currentLetterIdx
                      ? 'bg-rose-600 text-white border-rose-700 shadow-md scale-110'
                      : 'bg-white text-rose-900 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {item.letter}
                </button>
              ))}
            </div>

            <button
              id="next-letter-btn"
              onClick={() => {
                sound.playPop(520);
                setCurrentLetterIdx((prev) => (prev + 1) % ABC_DATA.length);
              }}
              className="p-3 rounded-2xl bg-white border-3 border-rose-300 text-rose-800 font-bold hover:bg-rose-50 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* 2. LETTER & PICTURE MATCH GAME */}
      {activity === 'quiz' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Target Picture Card */}
          <div className="w-full bg-white/95 rounded-3xl p-6 shadow-lg border-4 border-rose-300 text-center mb-4 sm:mb-6">
            <span className="text-xs font-black tracking-widest text-rose-600 uppercase mb-1 block">
              WHICH LETTER STANDS FOR THIS PICTURE?
            </span>

            <motion.div
              key={quizTarget.word}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-8xl select-none my-2 drop-shadow-sm"
            >
              {quizTarget.emoji}
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-black text-rose-950 font-display">
              {quizTarget.word}
            </h3>

            {hintMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-block px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-sm sm:text-base"
              >
                {hintMessage}
              </motion.div>
            )}
          </div>

          {/* 3 Letter Option Buttons */}
          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4">
            {quizOptions.map((item) => {
              const isSelected = selectedLetter === item.letter;
              const isCorrect = item.letter === quizTarget.letter;

              return (
                <motion.button
                  key={item.letter}
                  id={`match-option-${item.letter}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSelectQuiz(item)}
                  className={`p-4 sm:p-6 rounded-3xl border-4 transition-all shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-rose-50 border-rose-200 hover:border-rose-400'
                  }`}
                >
                  <span className="text-5xl sm:text-6xl font-black text-rose-950 font-display">
                    {item.letter}
                  </span>
                  <span className="text-xs font-extrabold text-rose-700">
                    Letter {item.letter}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Round Indicator */}
          <div className="flex items-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === quizScore
                    ? 'bg-rose-600 w-7'
                    : idx < quizScore
                    ? 'bg-emerald-400'
                    : 'bg-rose-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. BEGINNING SOUNDS GAME */}
      {activity === 'beginning_sound' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Target Sound Letter Box */}
          <div className="w-full bg-white/95 rounded-3xl p-6 shadow-lg border-4 border-rose-300 text-center mb-4 sm:mb-6">
            <span className="text-xs font-black tracking-widest text-rose-600 uppercase mb-1 block">
              WHICH FRIEND STARTS WITH THIS LETTER?
            </span>

            <div className="flex items-center justify-center gap-3 my-2">
              <span className="text-7xl sm:text-8xl font-black text-rose-600 font-display">
                {soundTarget.letter}
              </span>
              <button
                onClick={() => {
                  sound.playLetterChime(600);
                  sound.speak(soundTarget.soundHint);
                }}
                className="p-3 rounded-2xl bg-rose-100 border-2 border-rose-300 text-rose-800 hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm font-extrabold text-rose-800">
              "{soundTarget.soundHint}"
            </p>

            {hintMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-block px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 font-extrabold text-sm sm:text-base"
              >
                {hintMessage}
              </motion.div>
            )}
          </div>

          {/* 3 Picture Options */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {soundOptions.map((opt, idx) => {
              const isSelected = selectedWord === opt.word;

              return (
                <motion.button
                  key={idx}
                  id={`sound-opt-${opt.word}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectSoundWord(opt)}
                  className={`p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex sm:flex-col items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                    isSelected
                      ? opt.correct
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-rose-50 border-rose-200 hover:border-rose-400'
                  }`}
                >
                  <span className="text-6xl sm:text-7xl select-none">{opt.emoji}</span>
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-black text-rose-950 font-display block">
                      {opt.word}
                    </span>
                  </div>
                  {isSelected && opt.correct && (
                    <div className="sm:hidden">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. MAGIC LETTER TRACING */}
      {activity === 'tracing' && (
        <div className="max-w-xl mx-auto w-full my-2 flex-1 flex flex-col items-center justify-between">
          <div className="w-full bg-white/95 rounded-3xl p-4 shadow-lg border-4 border-rose-300 flex flex-col items-center justify-center relative">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-black uppercase text-rose-600 tracking-wider">
                TRACE LETTER {currentLetter.letter}
              </span>
              <button
                id="clear-trace-btn"
                onClick={clearCanvas}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 font-bold text-xs hover:bg-rose-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR</span>
              </button>
            </div>

            {/* Tracing Stage with Background Outline Guide */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-amber-50 border-3 border-dashed border-rose-300 flex items-center justify-center overflow-hidden touch-none">
              {/* Giant Watermark Letter */}
              <span className="absolute inset-0 flex items-center justify-center text-[160px] sm:text-[190px] font-black text-rose-200/80 font-display select-none pointer-events-none">
                {currentLetter.letter}
              </span>

              {/* Drawing Canvas */}
              <canvas
                ref={canvasRef}
                width={280}
                height={280}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10"
              />

              {traceSuccess && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 bg-emerald-500/20 backdrop-blur-xs flex flex-col items-center justify-center z-20 pointer-events-none"
                >
                  <Sparkles className="w-16 h-16 text-amber-500 animate-bounce" />
                  <span className="text-2xl font-black text-emerald-800 bg-white/90 px-4 py-1 rounded-full border-2 border-emerald-400 mt-2">
                    MAGICAL! ⭐
                  </span>
                </motion.div>
              )}
            </div>

            {/* Letter selector navigation */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => {
                  sound.playPop(440);
                  setCurrentLetterIdx((prev) => (prev > 0 ? prev - 1 : ABC_DATA.length - 1));
                  clearCanvas();
                }}
                className="px-3 py-1.5 rounded-xl bg-white border-2 border-rose-300 text-rose-800 font-bold text-xs"
              >
                PREV
              </button>
              <span className="text-base font-black text-rose-900">
                Letter {currentLetter.letter}
              </span>
              <button
                onClick={() => {
                  sound.playPop(520);
                  setCurrentLetterIdx((prev) => (prev + 1) % ABC_DATA.length);
                  clearCanvas();
                }}
                className="px-3 py-1.5 rounded-xl bg-white border-2 border-rose-300 text-rose-800 font-bold text-xs"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title={celebrationMsg.title}
        message={celebrationMsg.message}
        earnedStars={10}
        badgeUnlocked="ABC World Champion"
        badgeIcon="🔤"
        onPlayAgain={() => {
          setShowCelebration(false);
          generateQuizRound();
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
