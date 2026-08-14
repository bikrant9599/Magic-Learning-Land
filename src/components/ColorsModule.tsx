import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ColorActivity, ColorItem } from '../types';
import { COLORS_DATA, ENCOURAGING_MESSAGES } from '../data/gameData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import { Sparkles, Paintbrush, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';

interface ColorsModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
}

// 4 simple friendly coloring templates for 3-4 year olds
const COLORING_TEMPLATES = [
  {
    id: 'balloon',
    title: 'Happy Balloon',
    parts: [
      { id: 'balloon-body', name: 'Balloon', path: 'M50 15 C25 15 20 50 35 75 C45 88 50 90 50 90 C50 90 55 88 65 75 C80 50 75 15 50 15 Z', defaultColor: '#FFFFFF' },
      { id: 'balloon-knot', name: 'Knot', path: 'M46 90 L54 90 L50 96 Z', defaultColor: '#FFFFFF' },
      { id: 'balloon-star', name: 'Star Decoration', path: 'M50 35 L53 42 L60 43 L55 48 L56 55 L50 51 L44 55 L45 48 L40 43 L47 42 Z', defaultColor: '#FFFFFF' },
    ],
  },
  {
    id: 'butterfly',
    title: 'Flutter Butterfly',
    parts: [
      { id: 'left-wing-top', name: 'Top Left Wing', path: 'M46 45 C35 25 10 20 15 50 C18 65 38 60 46 55 Z', defaultColor: '#FFFFFF' },
      { id: 'right-wing-top', name: 'Top Right Wing', path: 'M54 45 C65 25 90 20 85 50 C82 65 62 60 54 55 Z', defaultColor: '#FFFFFF' },
      { id: 'left-wing-bottom', name: 'Bottom Left Wing', path: 'M46 56 C30 60 20 85 35 88 C45 90 48 70 46 56 Z', defaultColor: '#FFFFFF' },
      { id: 'right-wing-bottom', name: 'Bottom Right Wing', path: 'M54 56 C70 60 80 85 65 88 C55 90 52 70 54 56 Z', defaultColor: '#FFFFFF' },
      { id: 'body', name: 'Butterfly Body', path: 'M47 35 Q50 30 53 35 L53 75 Q50 80 47 75 Z', defaultColor: '#FFFFFF' },
    ],
  },
  {
    id: 'icecream',
    title: 'Yummy Ice Cream',
    parts: [
      { id: 'top-scoop', name: 'Top Scoop', path: 'M30 45 C25 20 75 20 70 45 C75 52 25 52 30 45 Z', defaultColor: '#FFFFFF' },
      { id: 'cherry', name: 'Sweet Cherry', path: 'M45 20 A 7 7 0 1 0 55 20 A 7 7 0 1 0 45 20 Z', defaultColor: '#FFFFFF' },
      { id: 'waffle-cone', name: 'Crunchy Cone', path: 'M30 54 L50 94 L70 54 Z', defaultColor: '#FFFFFF' },
    ],
  },
  {
    id: 'flower',
    title: 'Sunshine Flower',
    parts: [
      { id: 'petal-top', name: 'Top Petal', path: 'M42 38 C42 22 58 22 58 38 Z', defaultColor: '#FFFFFF' },
      { id: 'petal-bottom', name: 'Bottom Petal', path: 'M42 62 C42 78 58 78 58 62 Z', defaultColor: '#FFFFFF' },
      { id: 'petal-left', name: 'Left Petal', path: 'M38 42 C22 42 22 58 38 58 Z', defaultColor: '#FFFFFF' },
      { id: 'petal-right', name: 'Right Petal', path: 'M62 42 C78 42 78 58 62 58 Z', defaultColor: '#FFFFFF' },
      { id: 'center', name: 'Flower Center', path: 'M38 50 A 12 12 0 1 0 62 50 A 12 12 0 1 0 38 50 Z', defaultColor: '#FFFFFF' },
    ],
  },
];

export const ColorsModule: React.FC<ColorsModuleProps> = ({
  onEarnStar,
  onNavigateHome,
}) => {
  const [activity, setActivity] = useState<ColorActivity>('quiz');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  // Coloring Activity State
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const [selectedPaletteColor, setSelectedPaletteColor] = useState<ColorItem>(COLORS_DATA[0]);
  const [templateColors, setTemplateColors] = useState<Record<string, string>>({});

  // Generate 8 randomized nursery quiz questions
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      questionType: 'identify' | 'object';
      targetColor: ColorItem;
      objectExample?: { name: string; emoji: string };
      options: ColorItem[];
    }>
  >([]);

  // Initialize Quiz
  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const questions: Array<{
      questionType: 'identify' | 'object';
      targetColor: ColorItem;
      objectExample?: { name: string; emoji: string };
      options: ColorItem[];
    }> = [];

    COLORS_DATA.forEach((color, idx) => {
      // 1. Identify Color Question
      const otherColors = COLORS_DATA.filter((c) => c.id !== color.id);
      const shuffledOthers = [...otherColors].sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [color, ...shuffledOthers].sort(() => Math.random() - 0.5);

      questions.push({
        questionType: idx % 2 === 0 ? 'identify' : 'object',
        targetColor: color,
        objectExample: color.examples[Math.floor(Math.random() * color.examples.length)],
        options,
      });
    });

    setQuizQuestions(questions.sort(() => Math.random() - 0.5));
    setQuizIndex(0);
    setSelectedAnswer(null);
    setHintMessage(null);
  };

  const currentQ = quizQuestions[quizIndex];

  // Voice narration when question changes
  useEffect(() => {
    if (activity === 'quiz' && currentQ) {
      const text =
        currentQ.questionType === 'identify'
          ? `Where is the color ${currentQ.targetColor.name}?`
          : `What color is the ${currentQ.objectExample?.name}?`;
      sound.speak(text);
    }
  }, [activity, quizIndex, currentQ]);

  // Handle Quiz Selection
  const handleSelectOption = (chosenColor: ColorItem) => {
    if (!currentQ) return;
    setSelectedAnswer(chosenColor.id);

    if (chosenColor.id === currentQ.targetColor.id) {
      // Correct!
      sound.playSuccess();
      const encouragement = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
      setHintMessage(encouragement);
      sound.speak(`${encouragement}! That is ${currentQ.targetColor.name}!`);
      onEarnStar(1, 'colors');

      setTimeout(() => {
        if (quizIndex + 1 < quizQuestions.length) {
          setQuizIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHintMessage(null);
        } else {
          setCelebrationMsg({
            title: 'COLOR MASTER! 🎨',
            message: 'You identified all the bright and beautiful colors!',
          });
          setShowCelebration(true);
        }
      }, 1300);
    } else {
      // Gentle hint, no punishment
      sound.playTryAgain();
      setHintMessage(`Let's try again! Look for ${currentQ.targetColor.name} 🌟`);
      sound.speak(`Almost! Can you find the bright ${currentQ.targetColor.name}?`);
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  // Handle Coloring Part Tap
  const handleColorPart = (partId: string) => {
    sound.playPop(520);
    setTemplateColors((prev) => {
      const updated = {
        ...prev,
        [partId]: selectedPaletteColor.hex,
      };

      // Check if all parts in template are colored
      const currentTemplate = COLORING_TEMPLATES[activeTemplateIdx];
      const allColored = currentTemplate.parts.every((p) => updated[p.id] && updated[p.id] !== '#FFFFFF');
      if (allColored) {
        setTimeout(() => {
          sound.playSuccess();
          onEarnStar(2, 'colors');
          setCelebrationMsg({
            title: 'BEAUTIFUL ART! 🖌️',
            message: `You painted the ${currentTemplate.title} with wonderful colors!`,
          });
          setShowCelebration(true);
        }, 500);
      }
      return updated;
    });
  };

  const handleClearColoring = () => {
    sound.playPop(440);
    setTemplateColors({});
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-pink-100 via-rose-50 to-amber-50 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 mb-2">
        <button
          id="colors-tab-quiz"
          onClick={() => {
            sound.playPop(520);
            setActivity('quiz');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'quiz'
              ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>COLOR QUIZ</span>
        </button>

        <button
          id="colors-tab-coloring"
          onClick={() => {
            sound.playPop(520);
            sound.speak('Pick a crayon and tap on the picture to color!');
            setActivity('coloring');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'coloring'
              ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-102'
              : 'bg-white/80 text-rose-800 border-rose-200 hover:bg-rose-100'
          }`}
        >
          <Paintbrush className="w-5 h-5" />
          <span>MAGIC COLORING</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'quiz' && currentQ && (
        <Mascot
          message={
            currentQ.questionType === 'identify'
              ? `Can you tap the color ${currentQ.targetColor.name}?`
              : `What color is the ${currentQ.objectExample?.name}?`
          }
          voiceText={
            currentQ.questionType === 'identify'
              ? `Can you find and tap the color ${currentQ.targetColor.name}?`
              : `What color is the ${currentQ.objectExample?.name}?`
          }
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}

      {activity === 'coloring' && (
        <Mascot
          message="Pick a crayon below and tap the picture to paint!"
          voiceText="Pick any color you like and tap the shape to color it in!"
          mood="happy"
        />
      )}

      {/* QUIZ ACTIVITY */}
      {activity === 'quiz' && currentQ && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Question Display Card */}
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-lg border-4 border-rose-300 text-center mb-4 sm:mb-6">
            {currentQ.questionType === 'identify' ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black tracking-widest text-rose-400 uppercase mb-1">
                  FIND THIS COLOR
                </span>
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-inner border-4 border-white flex items-center justify-center my-2 transition-transform hover:scale-105"
                  style={{ backgroundColor: currentQ.targetColor.hex }}
                >
                  <Sparkles className="w-10 h-10 text-white/80" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-rose-950 font-display mt-2">
                  {currentQ.targetColor.name}
                </h3>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black tracking-widest text-rose-400 uppercase mb-1">
                  WHAT COLOR IS THIS?
                </span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="text-7xl sm:text-8xl my-2 drop-shadow-md select-none"
                >
                  {currentQ.objectExample?.emoji}
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-black text-rose-950 font-display">
                  {currentQ.objectExample?.name}
                </h3>
              </div>
            )}

            {/* Hint / Encouragement Toast */}
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

          {/* 3 Big Chunky Color Choice Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQ.targetColor.id;

              return (
                <motion.button
                  key={option.id}
                  id={`color-choice-${option.id}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectOption(option)}
                  className={`relative p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex sm:flex-col items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-rose-50 border-rose-200 hover:border-rose-400'
                  }`}
                >
                  {/* Color Swatch Dot */}
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && isCorrect && (
                      <CheckCircle2 className="w-7 h-7 text-white drop-shadow" />
                    )}
                  </div>

                  <span className="text-xl sm:text-2xl font-black text-amber-950 font-display">
                    {option.name}
                  </span>

                  <span className="sm:hidden text-2xl">
                    {option.examples[0].emoji}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mt-4">
            {quizQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === quizIndex
                    ? 'bg-rose-500 w-7'
                    : idx < quizIndex
                    ? 'bg-emerald-400'
                    : 'bg-rose-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* COLORING ACTIVITY */}
      {activity === 'coloring' && (
        <div className="max-w-2xl mx-auto w-full my-2 flex-1 flex flex-col items-center justify-between">
          {/* Template Selector Bar */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 px-2">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {COLORING_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={tmpl.id}
                  id={`template-select-${tmpl.id}`}
                  onClick={() => {
                    sound.playPop(500);
                    setActiveTemplateIdx(idx);
                    setTemplateColors({});
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTemplateIdx === idx
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-rose-800 border-rose-200 hover:bg-rose-50'
                  }`}
                >
                  {tmpl.title}
                </button>
              ))}
            </div>

            <button
              id="clear-coloring-button"
              onClick={handleClearColoring}
              className="px-3 py-1.5 rounded-xl bg-white text-rose-700 font-bold text-xs border-2 border-rose-200 hover:bg-rose-100 flex items-center gap-1 cursor-pointer shrink-0"
              title="Start over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ERASE</span>
            </button>
          </div>

          {/* Canvas SVG Area */}
          <div className="w-full max-w-sm aspect-square bg-white rounded-3xl p-4 shadow-lg border-4 border-rose-300 relative flex items-center justify-center my-1">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm select-none">
              {COLORING_TEMPLATES[activeTemplateIdx].parts.map((part) => {
                const fillColor = templateColors[part.id] || part.defaultColor;
                return (
                  <path
                    key={part.id}
                    id={`paint-part-${part.id}`}
                    d={part.path}
                    fill={fillColor}
                    stroke="#1F2937"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={() => handleColorPart(part.id)}
                    className="cursor-pointer transition-colors duration-200 hover:opacity-90 active:scale-98"
                  />
                );
              })}
            </svg>
          </div>

          {/* Color Palette (Crayons) */}
          <div className="w-full bg-white/90 rounded-3xl p-3 sm:p-4 shadow-md border-3 border-rose-300 mt-2">
            <span className="text-xs font-extrabold text-rose-500 uppercase tracking-wide block text-center mb-2">
              SELECT YOUR CRAYON:
            </span>
            <div className="grid grid-cols-6 gap-2">
              {COLORS_DATA.map((c) => {
                const isSelected = selectedPaletteColor.id === c.id;
                return (
                  <motion.button
                    key={c.id}
                    id={`crayon-${c.id}`}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      sound.playPop(580);
                      sound.speak(c.name);
                      setSelectedPaletteColor(c);
                    }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-2xl border-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-950 bg-amber-100 scale-105 shadow-md -translate-y-1'
                        : 'border-transparent hover:bg-rose-50'
                    }`}
                  >
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-inner flex items-center justify-center text-xs"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && '✨'}
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-rose-950 truncate max-w-full">
                      {c.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title={celebrationMsg.title}
        message={celebrationMsg.message}
        earnedStars={2}
        badgeUnlocked={activity === 'quiz' ? 'Color Master' : undefined}
        badgeIcon="🎨"
        onPlayAgain={() => {
          setShowCelebration(false);
          if (activity === 'quiz') {
            generateQuestions();
          } else {
            setTemplateColors({});
          }
        }}
        onNext={() => {
          setShowCelebration(false);
          if (activity === 'quiz') {
            setActivity('coloring');
          } else {
            onNavigateHome();
          }
        }}
        onGoHome={() => {
          setShowCelebration(false);
          onNavigateHome();
        }}
      />
    </div>
  );
};
