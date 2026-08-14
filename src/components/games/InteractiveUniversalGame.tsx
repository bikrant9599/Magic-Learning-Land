import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  Trophy,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Star,
  Flame,
  Clock,
  Car,
  Heart,
  Palette,
  Sun,
  ShieldCheck,
  Compass,
  Smile,
  Brush,
  Eraser,
  Undo,
  Zap,
} from 'lucide-react';
import { GameMetadata, DifficultyLevel } from '../../types';
import { soundEngine } from '../../utils/audio';
import { motion, AnimatePresence } from 'motion/react';
import {
  MASTER_ANIMALS,
  MASTER_COLORS,
  MASTER_SHAPES,
  FOOD_ITEMS,
  BODY_PARTS,
  WEATHER_SCENARIOS,
  VEHICLES_DATA,
  EMOTIONS_DATA,
  COMMUNITY_HELPERS,
  COLOR_MIXING_PAIRS,
} from '../../data/verifiedData';
import {
  UKG_CVC_WORDS,
  SHOPPING_SCENARIOS,
  CLOCK_SCENARIOS,
  GK_QUESTIONS,
  NOUN_VERB_ITEMS,
} from '../../data/gameBank';

interface InteractiveUniversalGameProps {
  game: GameMetadata;
  difficulty: DifficultyLevel;
  onGameComplete: (starsEarned: number, correctCount: number, totalCount: number) => void;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

export const InteractiveUniversalGame: React.FC<InteractiveUniversalGameProps> = ({
  game,
  difficulty,
  onGameComplete,
  onCorrectAnswer,
  onWrongAnswer,
}) => {
  const roundsTotal = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 5 : 6;
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Specialized interactive states
  const [userTiles, setUserTiles] = useState<string[]>([]);
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [plantStage, setPlantStage] = useState(0); // 0: seed, 1: water, 2: sun, 3: bloom
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memorySolved, setMemorySolved] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#EF4444');
  const [revealedClues, setRevealedClues] = useState<number[]>([0]);
  const [sudokuGrid, setSudokuGrid] = useState<(string | null)[]>([
    '🍎', '🍌', null,
    '🍌', null, '🍎',
    null, '🍎', '🍌'
  ]);
  const [magicHatHidden, setMagicHatHidden] = useState<boolean>(false);

  // Canvas ref for drawing/coloring/tracing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Reset state on round change
  useEffect(() => {
    soundEngine.playGentlePop();
    setUserTiles([]);
    setSentenceWords([]);
    setIsAnswered(false);
    setFeedback(null);
    setMemoryFlipped([]);
    setMemorySolved([]);
    setPlantStage(0);
    setRevealedClues([0]);
    setMagicHatHidden(false);

    // Speak voice prompt
    if (game.voicePrompt) {
      soundEngine.speak(game.voicePrompt);
    }
  }, [currentRound, game.id]);

  // Handle Answer Result
  const handleResult = (isCorrect: boolean, feedbackText: string) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (isCorrect) {
      soundEngine.playCelebration();
      setScore((s) => s + 1);
      setStars((s) => s + 1);
      onCorrectAnswer();
      setFeedback({ isCorrect: true, text: feedbackText });
    } else {
      soundEngine.playWrong();
      onWrongAnswer();
      setFeedback({ isCorrect: false, text: feedbackText });
    }

    setTimeout(() => {
      if (currentRound + 1 >= roundsTotal) {
        onGameComplete(score + (isCorrect ? 1 : 0), score + (isCorrect ? 1 : 0), roundsTotal);
      } else {
        setCurrentRound((r) => r + 1);
      }
    }, 2500);
  };

  // Drawing Canvas Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // ----------------------------------------------------
  // RENDER DEDICATED GAME ENGINES FOR 80 MINI-GAMES
  // ----------------------------------------------------
  const renderGameContent = () => {
    switch (game.componentKey) {
      // ----------------------------------------------------
      // 1. COLOR HUNT (NURSERY GAME #1)
      // ----------------------------------------------------
      case 'color_hunt': {
        const targetColor = MASTER_COLORS[currentRound % MASTER_COLORS.length];
        const otherColors = MASTER_COLORS.filter((c) => c.id !== targetColor.id);
        const candidateItems = [
          ...targetColor.items.map((it) => ({ ...it, isMatch: true, colorName: targetColor.name })),
          ...otherColors.flatMap((c) => c.items.slice(0, 1)).map((it) => ({ ...it, isMatch: false, colorName: 'other' })),
        ].sort(() => 0.5 - Math.random()).slice(0, 6);

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div
              className="p-5 rounded-3xl text-white text-center w-full mb-6 shadow-lg border-4 border-white/80"
              style={{ backgroundColor: targetColor.hex }}
            >
              <span className="text-4xl">{targetColor.emoji}</span>
              <h3 className="text-2xl font-black mt-1">Find All {targetColor.name} Items!</h3>
              <p className="text-white/90 text-sm">Tap an item that is {targetColor.name}!</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {candidateItems.map((item, idx) => (
                <motion.button
                  key={idx}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.06 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      item.isMatch,
                      item.isMatch
                        ? `Awesome! That is a ${item.name} which is ${targetColor.name}!`
                        : `Oops! That is a ${item.name}. Look for ${targetColor.name} objects!`
                    )
                  }
                  className="bg-white p-5 rounded-2xl border-4 border-amber-200 hover:border-amber-400 shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer min-h-28"
                >
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="text-xs font-bold text-stone-700 text-center">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 2. MAGIC COLORING & DRAWING LAB (NURSERY GAME #2)
      // ----------------------------------------------------
      case 'magic_coloring': {
        const templates = [
          { name: 'Happy Butterfly', emoji: '🦋', color: 'Purple' },
          { name: 'Shining Sun', emoji: '☀️', color: 'Yellow' },
          { name: 'Cute Frog', emoji: '🐸', color: 'Green' },
          { name: 'Sweet Apple', emoji: '🍎', color: 'Red' },
        ];
        const template = templates[currentRound % templates.length];
        const palette = ['#EF4444', '#3B82F6', '#FACC15', '#22C55E', '#A855F7', '#EC4899', '#FB923C', '#1E293B'];

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-3xl text-center w-full mb-4 shadow-lg border-4 border-white">
              <span className="text-4xl">{template.emoji}</span>
              <h3 className="text-xl font-black">Color the {template.name}!</h3>
              <p className="text-pink-100 text-xs">Pick a vibrant color and paint smoothly on the canvas!</p>
            </div>

            {/* Color Palette */}
            <div className="flex items-center gap-2 mb-3 bg-white p-2.5 rounded-2xl border-2 border-stone-200 shadow-sm overflow-x-auto max-w-full">
              {palette.map((hex) => (
                <button
                  key={hex}
                  onClick={() => {
                    soundEngine.playGentlePop();
                    setSelectedColor(hex);
                  }}
                  className={`w-9 h-9 rounded-full transition-transform cursor-pointer border-2 border-white shadow-sm shrink-0 ${
                    selectedColor === hex ? 'scale-125 ring-4 ring-amber-400' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: hex }}
                />
              ))}
              <button
                onClick={handleClearCanvas}
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <Undo className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Canvas Area */}
            <div className="relative bg-white rounded-3xl border-4 border-stone-300 shadow-md overflow-hidden touch-none w-full flex items-center justify-center p-2">
              <div className="absolute text-8xl opacity-15 pointer-events-none select-none">
                {template.emoji}
              </div>
              <canvas
                ref={canvasRef}
                width={360}
                height={220}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onTouchStart={handleCanvasMouseDown}
                onTouchMove={handleCanvasMouseMove}
                onTouchEnd={handleCanvasMouseUp}
                className="cursor-crosshair bg-transparent rounded-2xl"
              />
            </div>

            <button
              onClick={() => handleResult(true, `Wonderful artist! Your ${template.name} looks stunning! 🎨`)}
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>I Finished My Artwork!</span>
            </button>
          </div>
        );
      }

      // ----------------------------------------------------
      // 3. SHAPE CATCHER & SHAPE PUZZLE (NURSERY #3 & #4)
      // ----------------------------------------------------
      case 'shape_catcher':
      case 'shape_puzzle': {
        const targetShape = MASTER_SHAPES[currentRound % MASTER_SHAPES.length];
        const otherShapes = MASTER_SHAPES.filter((s) => s.id !== targetShape.id);
        const options = [targetShape, ...otherShapes.slice(0, 3)].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-3xl text-white text-center w-full mb-6 shadow-lg border-4 border-white/80">
              <h3 className="text-2xl font-black mb-1">Find the {targetShape.name}!</h3>
              <p className="text-blue-100 text-sm">
                A {targetShape.name} has {targetShape.sides === 0 ? 'no straight sides' : `${targetShape.sides} sides`}!
              </p>
              <div className="mt-3 flex justify-center gap-2 flex-wrap">
                {targetShape.realWorldExamples.slice(0, 2).map((ex, i) => (
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    {ex.emoji} {ex.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((shape) => {
                const isCorrect = shape.id === targetShape.id;
                return (
                  <motion.button
                    key={shape.id}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.06 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() =>
                      handleResult(
                        isCorrect,
                        isCorrect
                          ? `Great job! That is a ${shape.name}!`
                          : `That is a ${shape.name}. We are looking for a ${targetShape.name}!`
                      )
                    }
                    className="bg-white p-5 rounded-2xl border-4 border-stone-200 hover:border-blue-400 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer min-h-32"
                  >
                    <div
                      className={`w-16 h-16 flex items-center justify-center text-3xl font-black shadow-inner ${
                        shape.id === 'circle'
                          ? 'rounded-full bg-blue-400 text-white'
                          : shape.id === 'square'
                          ? 'rounded-2xl bg-rose-400 text-white'
                          : shape.id === 'triangle'
                          ? 'rounded-xl bg-emerald-400 text-white'
                          : 'rounded-xl bg-amber-400 text-white'
                      }`}
                    >
                      {shape.id === 'circle' ? '●' : shape.id === 'square' ? '■' : shape.id === 'triangle' ? '▲' : '▬'}
                    </div>
                    <span className="font-extrabold text-stone-800 text-sm">{shape.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 4. COUNT THE FRUITS (NURSERY GAME #7)
      // ----------------------------------------------------
      case 'count_fruits': {
        const fruitList = ['🍎', '🍌', '🍓', '🍊', '🍇'];
        const targetCount = (currentRound % 7) + 2;
        const currentFruit = fruitList[currentRound % fruitList.length];
        const countOptions = [targetCount, targetCount - 1, targetCount + 1, targetCount + 2]
          .filter((v, i, a) => v > 0 && a.indexOf(v) === i)
          .slice(0, 4)
          .sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-amber-100 border-4 border-amber-300 p-5 rounded-3xl text-center w-full mb-6 shadow-md">
              <h3 className="text-xl font-black text-amber-900 mb-2">Count all the yummy fruits!</h3>
              <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white rounded-2xl border-2 border-amber-200 min-h-28">
                {Array.from({ length: targetCount }).map((_, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => soundEngine.playNumberCount(i + 1)}
                    className="text-4xl p-1 cursor-pointer transition-transform hover:rotate-6"
                  >
                    {currentFruit}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-amber-700 font-bold mt-2">Tap any fruit to count aloud!</p>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {countOptions.map((num) => (
                <motion.button
                  key={num}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.1 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      num === targetCount,
                      num === targetCount
                        ? `Super counting! There are ${targetCount} ${currentFruit}!`
                        : `Not quite! Let us count again: 1, 2, ... there are ${targetCount}!`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-amber-300 hover:border-amber-500 font-black text-2xl md:text-3xl text-amber-900 shadow-md cursor-pointer"
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 5. BALLOON NUMBERS (NURSERY GAME #8)
      // ----------------------------------------------------
      case 'balloon_numbers': {
        const targetNum = (currentRound % 9) + 1;
        const distractors = [targetNum + 1, targetNum - 1, targetNum + 2, targetNum - 2].filter((v) => v > 0 && v <= 10);
        const balloons = [
          { num: targetNum, color: 'bg-rose-500', isTarget: true },
          ...distractors.slice(0, 3).map((d, i) => ({
            num: d,
            color: ['bg-sky-500', 'bg-emerald-500', 'bg-amber-500'][i % 3],
            isTarget: false,
          })),
        ].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <h3 className="text-2xl font-black">Pop Balloon Number {targetNum}!</h3>
              <p className="text-sky-100 text-xs">Tap the balloon that has numeral {targetNum}!</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full my-4">
              {balloons.map((b, i) => (
                <motion.button
                  key={i}
                  disabled={isAnswered}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: 'easeInOut' }}
                  whileHover={!isAnswered ? { scale: 1.12 } : {}}
                  whileTap={!isAnswered ? { scale: 0.9 } : {}}
                  onClick={() =>
                    handleResult(
                      b.isTarget,
                      b.isTarget
                        ? `POP! 🎉 You popped balloon number ${targetNum}!`
                        : `Oops! That balloon had number ${b.num}. Look for number ${targetNum}!`
                    )
                  }
                  className={`w-20 h-28 sm:w-24 sm:h-32 ${b.color} text-white rounded-full flex flex-col items-center justify-center font-black text-3xl sm:text-4xl shadow-xl border-2 border-white/60 cursor-pointer relative`}
                >
                  <span>{b.num}</span>
                  <div className="w-1 h-6 bg-stone-400 absolute -bottom-6 rounded-full" />
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 6. BIG OR SMALL & TALL OR SHORT (NURSERY #9, #10 & CLASS 1 #13)
      // ----------------------------------------------------
      case 'big_small':
      case 'tall_short':
      case 'measurement_game': {
        const comparisons = [
          {
            title: 'Which one is BIGGER?',
            ask: 'big',
            itemA: { name: 'Huge Elephant', emoji: '🐘', size: 'big', scale: 'text-7xl' },
            itemB: { name: 'Tiny Mouse', emoji: '🐭', size: 'small', scale: 'text-3xl' },
          },
          {
            title: 'Which one is TALLER?',
            ask: 'tall',
            itemA: { name: 'Tall Giraffe', emoji: '🦒', size: 'tall', scale: 'text-7xl' },
            itemB: { name: 'Short Duck', emoji: '🦆', size: 'short', scale: 'text-3xl' },
          },
          {
            title: 'Which one is HEAVIER on the scale?',
            ask: 'heavy',
            itemA: { name: 'Heavy Anvil / Rock', emoji: '🪨', size: 'heavy', scale: 'text-6xl' },
            itemB: { name: 'Light Feather', emoji: '🪶', size: 'light', scale: 'text-4xl' },
          },
          {
            title: 'Which one is LONGER?',
            ask: 'long',
            itemA: { name: 'Long Train', emoji: '🚂', size: 'long', scale: 'text-6xl' },
            itemB: { name: 'Short Scooter', emoji: '🛴', size: 'short', scale: 'text-3xl' },
          },
        ];
        const comp = comparisons[currentRound % comparisons.length];
        const isSwapped = currentRound % 2 === 1;
        const first = isSwapped ? comp.itemB : comp.itemA;
        const second = isSwapped ? comp.itemA : comp.itemB;

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-4xl block mb-1">⚖️</span>
              <h3 className="text-2xl font-black">{comp.title}</h3>
              <p className="text-amber-100 text-xs">Look closely at the sizes and tap the correct one!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {[first, second].map((item, idx) => {
                const isTarget = item.size === comp.ask;
                return (
                  <motion.button
                    key={idx}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.05 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() =>
                      handleResult(
                        isTarget,
                        isTarget
                          ? `Brilliant! The ${item.name} is indeed the ${comp.ask} one!`
                          : `Look again! The ${item.name} is the other size.`
                      )
                    }
                    className="bg-white p-6 rounded-3xl border-4 border-amber-200 hover:border-amber-400 shadow-lg flex flex-col items-center justify-center gap-3 cursor-pointer min-h-44"
                  >
                    <span className={`${item.scale} transition-transform`}>{item.emoji}</span>
                    <span className="font-extrabold text-stone-800 text-sm text-center">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 7. MEMORY CARDS / MEMORY CHALLENGE (NURSERY #12, LKG #18, UKG #18)
      // ----------------------------------------------------
      case 'memory_cards':
      case 'memory_challenge':
      case 'memory_master': {
        const pool = ['🦁', '🐶', '🍎', '🌟', '🚀', '🎨'];
        const cardPairs = [...pool.slice(0, 3), ...pool.slice(0, 3)].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-md">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-3xl text-center w-full mb-4 shadow-lg border-4 border-white">
              <span className="text-3xl">🧠</span>
              <h3 className="text-xl font-black">Memory Match Challenge</h3>
              <p className="text-purple-100 text-xs">Flip cards and match identical picture pairs!</p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              {cardPairs.map((emoji, idx) => {
                const isFlipped = memoryFlipped.includes(idx) || memorySolved.includes(idx);
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (isFlipped || memoryFlipped.length >= 2 || isAnswered) return;
                      soundEngine.playCardFlip();
                      const next = [...memoryFlipped, idx];
                      setMemoryFlipped(next);

                      if (next.length === 2) {
                        const [a, b] = next;
                        if (cardPairs[a] === cardPairs[b]) {
                          soundEngine.playCelebration();
                          const newSolved = [...memorySolved, a, b];
                          setMemorySolved(newSolved);
                          setMemoryFlipped([]);
                          if (newSolved.length === cardPairs.length) {
                            handleResult(true, 'Incredible visual memory! You paired all the cards! 🎉');
                          }
                        } else {
                          setTimeout(() => {
                            setMemoryFlipped([]);
                          }, 900);
                        }
                      }
                    }}
                    className={`h-24 rounded-2xl font-black text-4xl flex items-center justify-center border-4 shadow-md transition-all cursor-pointer ${
                      isFlipped
                        ? 'bg-amber-100 border-amber-400 text-stone-900'
                        : 'bg-indigo-500 hover:bg-indigo-600 border-indigo-300 text-white'
                    }`}
                  >
                    {isFlipped ? emoji : '❓'}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 8. DRESS THE CHARACTER & WEATHER MATCH (NURSERY #15, #16)
      // ----------------------------------------------------
      case 'dress_character':
      case 'weather_match': {
        const scenario = WEATHER_SCENARIOS[currentRound % WEATHER_SCENARIOS.length];
        const correctClothes = scenario.correctClothes[0];
        const wrongClothes = scenario.wrongClothes[0];
        const options = [correctClothes, wrongClothes].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-sky-500 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-5xl block mb-1">{scenario.weatherEmoji}</span>
              <h3 className="text-2xl font-black">Today's Weather: {scenario.weather}</h3>
              <p className="text-sky-100 text-xs">{scenario.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((item, idx) => {
                const isCorrect = scenario.correctClothes.some((c) => c.name === item.name);
                return (
                  <motion.button
                    key={idx}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.05 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() =>
                      handleResult(
                        isCorrect,
                        isCorrect
                          ? `Perfect choice! Wearing ${item.name} is ideal for a ${scenario.weather}!`
                          : `Oops! ${item.name} is not suitable for a ${scenario.weather}.`
                      )
                    }
                    className="bg-white p-6 rounded-3xl border-4 border-sky-200 hover:border-sky-400 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer min-h-36"
                  >
                    <span className="text-6xl">{item.emoji}</span>
                    <span className="font-extrabold text-stone-800 text-sm text-center">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 9. EMOTION MATCH (NURSERY GAME #19)
      // ----------------------------------------------------
      case 'emotion_match': {
        const emotion = EMOTIONS_DATA[currentRound % EMOTIONS_DATA.length];
        const distractors = EMOTIONS_DATA.filter((e) => e.id !== emotion.id).slice(0, 3);
        const options = [emotion, ...distractors].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-7xl block mb-2">{emotion.emoji}</span>
              <h3 className="text-2xl font-black">How is our friend feeling?</h3>
              <p className="text-amber-100 text-xs mt-1">{emotion.reason}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {options.map((opt) => (
                <motion.button
                  key={opt.id}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.05 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      opt.id === emotion.id,
                      opt.id === emotion.id
                        ? `Great empathy! Our friend feels ${emotion.name}!`
                        : `Look at the face! That face shows ${emotion.name}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-amber-200 hover:border-amber-400 font-extrabold text-base text-stone-800 shadow-md cursor-pointer text-center"
                >
                  {opt.emoji} {opt.name}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 10. FOLLOW THE PATTERN & PATTERN BUILDER (NURSERY #20 & LKG #11)
      // ----------------------------------------------------
      case 'follow_pattern':
      case 'pattern_builder': {
        const patterns = [
          { seq: ['🔴', '🔵', '🔴', '🔵'], answer: '🔴', options: ['🔴', '🔵', '🟡'] },
          { seq: ['⭐', '⭐', '🌙', '⭐', '⭐'], answer: '🌙', options: ['🌙', '⭐', '☀️'] },
          { seq: ['🍎', '🍌', '🍇', '🍎', '🍌'], answer: '🍇', options: ['🍇', '🍎', '🍌'] },
          { seq: ['🔺', '🟩', '🔺', '🟩'], answer: '🔺', options: ['🔺', '🟩', '🔵'] },
        ];
        const pat = patterns[currentRound % patterns.length];

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <h3 className="text-2xl font-black mb-2">What Comes Next in the Pattern?</h3>
              <div className="flex items-center justify-center gap-2 sm:gap-3 bg-white/20 p-3 rounded-2xl my-2">
                {pat.seq.map((sym, i) => (
                  <span key={i} className="text-3xl sm:text-4xl drop-shadow">{sym}</span>
                ))}
                <span className="text-3xl sm:text-4xl text-amber-300 font-black animate-pulse">❓</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 w-full">
              {pat.options.map((opt, i) => (
                <motion.button
                  key={i}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.15 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      opt === pat.answer,
                      opt === pat.answer
                        ? `Awesome logic! ${pat.answer} completes the sequence!`
                        : `Almost! The repeating pattern continues with ${pat.answer}.`
                    )
                  }
                  className="w-20 h-20 bg-white rounded-2xl border-4 border-teal-300 hover:border-teal-500 text-4xl shadow-md flex items-center justify-center cursor-pointer"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 11. LETTER HUNT & LETTER-PICTURE MATCH (LKG #1 & #2)
      // ----------------------------------------------------
      case 'letter_hunt':
      case 'letter_picture_match': {
        const lettersList = [
          { letter: 'A', word: 'Apple', emoji: '🍎', phonics: 'Ah' },
          { letter: 'B', word: 'Ball', emoji: '⚽', phonics: 'Buh' },
          { letter: 'C', word: 'Cat', emoji: '🐱', phonics: 'Kuh' },
          { letter: 'D', word: 'Dog', emoji: '🐶', phonics: 'Duh' },
          { letter: 'E', word: 'Elephant', emoji: '🐘', phonics: 'Eh' },
          { letter: 'F', word: 'Fish', emoji: '🐟', phonics: 'Fff' },
        ];
        const currentLetter = lettersList[currentRound % lettersList.length];
        const distractors = lettersList.filter((l) => l.letter !== currentLetter.letter).slice(0, 3);
        const options = [currentLetter, ...distractors].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl font-black block mb-1">{currentLetter.letter}</span>
              <h3 className="text-2xl font-black">Find the item for letter {currentLetter.letter}!</h3>
              <p className="text-sky-100 text-xs">"{currentLetter.letter}" sounds like "{currentLetter.phonics}"!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((opt) => (
                <motion.button
                  key={opt.letter}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.06 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      opt.letter === currentLetter.letter,
                      opt.letter === currentLetter.letter
                        ? `Super! ${currentLetter.letter} is for ${currentLetter.word}! ${currentLetter.emoji}`
                        : `Oops! That is ${opt.word} for letter ${opt.letter}.`
                    )
                  }
                  className="bg-white p-5 rounded-2xl border-4 border-sky-200 hover:border-sky-400 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer min-h-32"
                >
                  <span className="text-5xl">{opt.emoji}</span>
                  <span className="font-black text-stone-800 text-sm">{opt.word}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 12. LETTER & NUMBER TRACING LAB (LKG #4 & #10)
      // ----------------------------------------------------
      case 'letter_tracing':
      case 'number_tracing': {
        const symbol = game.componentKey === 'letter_tracing' ? ['A', 'B', 'C', 'D', 'E'][currentRound % 5] : (currentRound + 1).toString();

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-3xl text-center w-full mb-4 shadow-lg border-4 border-white">
              <span className="text-3xl">✍️</span>
              <h3 className="text-xl font-black">Trace {symbol}!</h3>
              <p className="text-emerald-100 text-xs">Follow the guided stroke path with your finger or mouse!</p>
            </div>

            <div className="relative bg-white rounded-3xl border-4 border-stone-300 shadow-md flex items-center justify-center p-2 w-full">
              {/* Giant dashed guide symbol */}
              <div className="absolute text-9xl font-black text-stone-200 select-none pointer-events-none tracking-widest">
                {symbol}
              </div>
              <canvas
                ref={canvasRef}
                width={340}
                height={200}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onTouchStart={handleCanvasMouseDown}
                onTouchMove={handleCanvasMouseMove}
                onTouchEnd={handleCanvasMouseUp}
                className="cursor-crosshair bg-transparent rounded-2xl"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleClearCanvas}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center gap-1 border border-stone-300"
              >
                <Undo className="w-4 h-4" />
                <span>Retry</span>
              </button>
              <button
                onClick={() => handleResult(true, `Splendid handwriting! You traced ${symbol} with great precision! ⭐`)}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-sm shadow-md flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Done Tracing!</span>
              </button>
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 13. NUMBER TRAIN & MISSING NUMBERS (LKG #7 & #8)
      // ----------------------------------------------------
      case 'number_train':
      case 'missing_number':
      case 'number_puzzle':
      case 'number_sequence': {
        const start = currentRound * 3 + 1;
        const seq = [start, start + 1, null, start + 3];
        const missingVal = start + 2;
        const options = [missingVal, missingVal - 1, missingVal + 2, missingVal + 1]
          .filter((v, i, a) => v > 0 && a.indexOf(v) === i)
          .slice(0, 4)
          .sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-4xl">🚂</span>
              <h3 className="text-2xl font-black">Number Train Sequence</h3>
              <p className="text-amber-100 text-xs">Fill in the missing train carriage number!</p>

              <div className="flex items-center justify-center gap-2 sm:gap-3 my-4">
                {seq.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-14 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md border-2 ${
                      val === null
                        ? 'bg-amber-300 text-amber-900 border-dashed border-amber-600 animate-pulse'
                        : 'bg-white text-stone-900 border-amber-300'
                    }`}
                  >
                    {val === null ? '?' : val}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {options.map((num) => (
                <motion.button
                  key={num}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.1 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      num === missingVal,
                      num === missingVal
                        ? `Choo choo! Wagon ${missingVal} completes the train!`
                        : `Oops! Carriage ${missingVal} comes after ${start + 1}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-amber-300 hover:border-amber-500 font-black text-2xl text-amber-900 shadow-md cursor-pointer text-center"
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 14. WHERE DOES IT BELONG? ROOM SORTING (LKG #15)
      // ----------------------------------------------------
      case 'where_belongs': {
        const roomItems = [
          { item: 'Frying Pan', emoji: '🍳', room: 'Kitchen', roomEmoji: '🍳' },
          { item: 'Pillow & Blanket', emoji: '🛏️', room: 'Bedroom', roomEmoji: '🛏️' },
          { item: 'Toothbrush & Soap', emoji: '🪥', room: 'Bathroom', roomEmoji: '🛁' },
          { item: 'Watering Can', emoji: '🪴', room: 'Garden', roomEmoji: '🌻' },
        ];
        const currentItem = roomItems[currentRound % roomItems.length];
        const rooms = ['Kitchen', 'Bedroom', 'Bathroom', 'Garden'];

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-white p-5 rounded-3xl text-center w-full mb-6 border-4 border-purple-300 shadow-lg">
              <span className="text-6xl block mb-2">{currentItem.emoji}</span>
              <h3 className="text-2xl font-black text-stone-800">{currentItem.item}</h3>
              <p className="text-stone-600 text-xs mt-1">Which room of the house does this belong in?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {rooms.map((rm) => (
                <motion.button
                  key={rm}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.05 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      rm === currentItem.room,
                      rm === currentItem.room
                        ? `Correct! The ${currentItem.item} belongs in the ${currentItem.room}!`
                        : `Not quite! We usually find ${currentItem.item} in the ${currentItem.room}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-purple-200 hover:border-purple-400 font-extrabold text-stone-800 text-sm shadow-md cursor-pointer"
                >
                  🏠 {rm}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 15. ODD ONE OUT (LKG #16 & UKG #14)
      // ----------------------------------------------------
      case 'odd_one_out': {
        const puzzles = [
          { items: [{ name: 'Dog', emoji: '🐶', isOdd: false }, { name: 'Cat', emoji: '🐱', isOdd: false }, { name: 'Car', emoji: '🚗', isOdd: true }, { name: 'Cow', emoji: '🐮', isOdd: false }], reason: 'Car is a vehicle, while others are living animals!' },
          { items: [{ name: 'Apple', emoji: '🍎', isOdd: false }, { name: 'Banana', emoji: '🍌', isOdd: false }, { name: 'Shoe', emoji: '👟', isOdd: true }, { name: 'Grapes', emoji: '🍇', isOdd: false }], reason: 'Shoe is footwear, while others are delicious fruits!' },
          { items: [{ name: 'Airplane', emoji: '✈️', isOdd: false }, { name: 'Bird', emoji: '🐦', isOdd: false }, { name: 'Helicopter', emoji: '🚁', isOdd: false }, { name: 'Boat', emoji: '⛵', isOdd: true }], reason: 'Boat sails on water, while others fly high in the air!' },
        ];
        const puzzle = puzzles[currentRound % puzzles.length];

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-4xl">🕵️</span>
              <h3 className="text-2xl font-black">Find the Odd One Out!</h3>
              <p className="text-rose-100 text-xs">Which item does not belong with the others?</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {puzzle.items.map((it, i) => (
                <motion.button
                  key={i}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.06 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      it.isOdd,
                      it.isOdd ? `Sharp detective work! ${puzzle.reason}` : `Look closer at the categories!`
                    )
                  }
                  className="bg-white p-5 rounded-2xl border-4 border-rose-200 hover:border-rose-400 shadow-md flex flex-col items-center justify-center gap-2 cursor-pointer min-h-32"
                >
                  <span className="text-5xl">{it.emoji}</span>
                  <span className="font-extrabold text-stone-800 text-sm">{it.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 16. SENTENCE BUILDER & GRAMMAR (UKG #5 & CLASS 1 #2)
      // ----------------------------------------------------
      case 'sentence_builder': {
        const sentences = [
          { target: 'Ravi has a red ball', words: ['Ravi', 'has', 'a', 'red', 'ball'], emoji: '⚽' },
          { target: 'The bright sun shines', words: ['The', 'bright', 'sun', 'shines'], emoji: '☀️' },
          { target: 'She reads a book', words: ['She', 'reads', 'a', 'book'], emoji: '📖' },
          { target: 'Birds sing in trees', words: ['Birds', 'sing', 'in', 'trees'], emoji: '🌳' },
        ];
        const sent = sentences[currentRound % sentences.length];
        const scrambled = [...sent.words].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-5xl block mb-2">{sent.emoji}</span>
              <h3 className="text-2xl font-black">Build the Complete Sentence!</h3>
              <p className="text-emerald-100 text-xs">Tap words in correct order to make a sentence.</p>

              {/* Built Sentence Slot */}
              <div className="min-h-14 bg-white/20 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2 my-3 border border-white/40">
                {sentenceWords.length === 0 ? (
                  <span className="text-white/60 text-xs italic">Tap words below to form sentence...</span>
                ) : (
                  sentenceWords.map((w, i) => (
                    <span key={i} className="bg-white text-emerald-950 px-3 py-1.5 rounded-xl font-black text-sm shadow-sm">
                      {w}
                    </span>
                  ))
                )}
              </div>

              {sentenceWords.length > 0 && !isAnswered && (
                <button
                  onClick={() => setSentenceWords([])}
                  className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold hover:bg-white/30"
                >
                  Reset Words ↺
                </button>
              )}
            </div>

            {/* Word Tiles */}
            <div className="flex flex-wrap justify-center gap-2.5 w-full">
              {scrambled.map((word, idx) => (
                <motion.button
                  key={idx}
                  disabled={isAnswered}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const next = [...sentenceWords, word];
                    setSentenceWords(next);
                    if (next.length === sent.words.length) {
                      const built = next.join(' ');
                      handleResult(
                        built === sent.target,
                        built === sent.target
                          ? `Super grammar! "${sent.target}." is complete!`
                          : `Almost! The sentence was "${sent.target}."`
                      );
                    }
                  }}
                  className="bg-white border-4 border-emerald-300 hover:border-emerald-500 font-black text-base text-emerald-950 px-4 py-2.5 rounded-2xl shadow-md cursor-pointer"
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 17. PLANT GROWING BOTANY LAB (UKG GAME #19)
      // ----------------------------------------------------
      case 'plant_growing': {
        const stages = [
          { title: 'Step 1: Plant the Seed 🌱', action: 'Plant Seed in Soil', emoji: '🌱' },
          { title: 'Step 2: Water the Plant 💧', action: 'Pour Water Can', emoji: '🌿' },
          { title: 'Step 3: Add Sunshine ☀️', action: 'Give Bright Sunlight', emoji: '🪴' },
          { title: 'Step 4: Blossom Bloom! 🌸', action: 'Flower Blossomed!', emoji: '🌺' },
        ];

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-7xl block mb-2">{stages[plantStage].emoji}</span>
              <h3 className="text-2xl font-black">{stages[plantStage].title}</h3>
              <p className="text-emerald-100 text-xs">Plants need rich soil, fresh water and warm sunshine to grow!</p>
            </div>

            <div className="flex gap-3 w-full">
              {plantStage < 3 ? (
                <button
                  onClick={() => {
                    soundEngine.playCelebration();
                    setPlantStage((s) => s + 1);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-black py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{stages[plantStage].action}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleResult(true, 'Magical gardener! You grew a beautiful blooming flower! 🌸')}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Claim Gardener Reward!</span>
                </button>
              )}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 18. NOUN OR ACTION VERB? (CLASS 1 GAME #6)
      // ----------------------------------------------------
      case 'noun_verb': {
        const item = NOUN_VERB_ITEMS[currentRound % NOUN_VERB_ITEMS.length];
        const isNoun = item.type === 'noun';

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-white p-6 rounded-3xl text-center w-full mb-6 border-4 border-indigo-300 shadow-lg">
              <span className="text-7xl block mb-2">{item.emoji}</span>
              <h3 className="text-3xl font-black text-stone-800">{item.word}</h3>
              <p className="text-stone-600 text-xs mt-1">Is this a Naming Noun or an Action Verb?</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <motion.button
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.05 } : {}}
                whileTap={!isAnswered ? { scale: 0.95 } : {}}
                onClick={() =>
                  handleResult(
                    isNoun,
                    isNoun
                      ? `Correct! "${item.word}" is a Noun (Person, Place, or Thing).`
                      : `"${item.word}" is an action you can do, so it is a Verb!`
                  )
                }
                className="bg-sky-500 hover:bg-sky-600 text-white p-5 rounded-2xl font-black text-lg flex flex-col items-center gap-1 shadow-md cursor-pointer border-4 border-sky-300"
              >
                <span className="text-3xl">🏷️</span>
                <span>Naming Noun</span>
              </motion.button>

              <motion.button
                disabled={isAnswered}
                whileHover={!isAnswered ? { scale: 1.05 } : {}}
                whileTap={!isAnswered ? { scale: 0.95 } : {}}
                onClick={() =>
                  handleResult(
                    !isNoun,
                    !isNoun
                      ? `Correct! "${item.word}" is an Action Verb.`
                      : `"${item.word}" is a name of something, so it is a Noun!`
                  )
                }
                className="bg-amber-500 hover:bg-amber-600 text-white p-5 rounded-2xl font-black text-lg flex flex-col items-center gap-1 shadow-md cursor-pointer border-4 border-amber-300"
              >
                <span className="text-3xl">⚡</span>
                <span>Action Verb</span>
              </motion.button>
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 19. TENS & ONES PLACE VALUE (CLASS 1 GAME #7)
      // ----------------------------------------------------
      case 'number_challenge': {
        const tens = (currentRound % 4) + 2; // 2 to 5 tens
        const ones = (currentRound * 2 + 3) % 8 + 1; // 1 to 8 ones
        const total = tens * 10 + ones;
        const options = [total, total - 10, total + 1, total + 10]
          .filter((v, i, a) => v > 0 && a.indexOf(v) === i)
          .slice(0, 4)
          .sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <h3 className="text-2xl font-black mb-1">Tens & Ones Place Value</h3>
              <p className="text-purple-100 text-xs">Count the 10-bundles and single units!</p>

              <div className="flex items-center justify-center gap-6 my-4 bg-white/20 p-4 rounded-2xl">
                <div className="flex flex-col items-center">
                  <div className="flex gap-1 text-2xl">{'🧱'.repeat(tens)}</div>
                  <span className="text-xs font-black mt-1">{tens} Tens (={tens * 10})</span>
                </div>
                <span className="text-2xl font-black">+</span>
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-xl">{'🟡'.repeat(ones)}</div>
                  <span className="text-xs font-black mt-1">{ones} Ones (={ones})</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {options.map((num) => (
                <motion.button
                  key={num}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.1 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      num === total,
                      num === total
                        ? `Spot on! ${tens} Tens + ${ones} Ones = ${total}!`
                        : `Oops! ${tens} Tens (=${tens * 10}) + ${ones} = ${total}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-purple-300 hover:border-purple-500 font-black text-2xl text-purple-900 shadow-md cursor-pointer text-center"
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 20. CALENDAR CHALLENGE (CLASS 1 GAME #12)
      // ----------------------------------------------------
      case 'calendar_challenge': {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const todayIdx = currentRound % 5 + 1; // 1 to 5
        const todayDay = days[todayIdx];
        const nextDay = days[(todayIdx + 1) % 7];
        const prevDay = days[(todayIdx - 1) % 7];
        const options = [nextDay, prevDay, days[(todayIdx + 2) % 7]].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl block mb-2">📅</span>
              <h3 className="text-2xl font-black">If Today is {todayDay}...</h3>
              <p className="text-sky-100 text-base font-bold mt-1">What day will it be TOMORROW?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
              {options.map((d) => (
                <motion.button
                  key={d}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.05 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      d === nextDay,
                      d === nextDay
                        ? `Correct! After ${todayDay} comes ${nextDay}!`
                        : `Think of the sequence! After ${todayDay} comes ${nextDay}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-sky-300 hover:border-sky-500 font-extrabold text-stone-800 text-sm shadow-md cursor-pointer"
                >
                  {d}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 21. CVC WORD BUILDER & SPELLING (UKG #1, #2, #6 & CLASS 1 #3)
      // ----------------------------------------------------
      case 'word_builder':
      case 'missing_letter':
      case 'word_scramble':
      case 'spelling_bee': {
        const cvc = UKG_CVC_WORDS[currentRound % UKG_CVC_WORDS.length];
        const letters = cvc.word.split('');
        const scrambled = [...letters].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl block mb-2">{cvc.emoji}</span>
              <h3 className="text-2xl font-black mb-1">Spell the Word!</h3>
              <p className="text-emerald-100 text-sm">{cvc.hint}</p>

              {/* Slot builder */}
              <div className="flex justify-center gap-3 my-4">
                {letters.map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-16 bg-white text-stone-900 text-3xl font-black rounded-2xl flex items-center justify-center shadow-inner border-2 border-emerald-300"
                  >
                    {userTiles[i] || '_'}
                  </div>
                ))}
              </div>

              {userTiles.length > 0 && !isAnswered && (
                <button
                  onClick={() => setUserTiles([])}
                  className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold hover:bg-white/30"
                >
                  Reset Letters ↺
                </button>
              )}
            </div>

            {/* Letter keys */}
            <div className="flex justify-center gap-3">
              {scrambled.map((char, idx) => (
                <motion.button
                  key={idx}
                  disabled={isAnswered}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const nextTiles = [...userTiles, char];
                    setUserTiles(nextTiles);
                    if (nextTiles.length === letters.length) {
                      const built = nextTiles.join('');
                      handleResult(
                        built === cvc.word,
                        built === cvc.word
                          ? `Fantastic spelling! ${cvc.word} is correct! 🎉`
                          : `Almost! The word was ${cvc.word}.`
                      );
                    }
                  }}
                  className="w-16 h-16 bg-white border-4 border-emerald-300 hover:border-emerald-500 font-black text-3xl text-emerald-900 rounded-2xl shadow-md cursor-pointer flex items-center justify-center"
                >
                  {char}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 22. GREATER OR LESS ALLIGATOR (UKG GAME #9)
      // ----------------------------------------------------
      case 'greater_less': {
        const num1 = (currentRound * 7 + 12) % 50 + 5;
        const num2 = (currentRound * 11 + 18) % 50 + 5;

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl block mb-2">🐊</span>
              <h3 className="text-2xl font-black mb-1">Hungry Alligator Chomper!</h3>
              <p className="text-emerald-100 text-xs">The alligator always opens its mouth to eat the BIGGER number!</p>

              <div className="flex items-center justify-center gap-4 sm:gap-6 my-4 text-3xl sm:text-4xl font-black">
                <span className="bg-white/20 px-5 py-3 rounded-2xl">{num1}</span>
                <span className="text-amber-300 font-extrabold">❓</span>
                <span className="bg-white/20 px-5 py-3 rounded-2xl">{num2}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              {[
                { sym: '>', label: 'Greater (>)' , isCorrect: num1 > num2 },
                { sym: '=', label: 'Equal (=)', isCorrect: num1 === num2 },
                { sym: '<', label: 'Less (<)', isCorrect: num1 < num2 },
              ].map((opt) => (
                <motion.button
                  key={opt.sym}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.08 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      opt.isCorrect,
                      opt.isCorrect
                        ? `Chomp chomp! ${num1} ${opt.sym} ${num2} is correct!`
                        : `Oops! ${num1} is ${num1 > num2 ? 'greater than' : 'less than'} ${num2}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-emerald-300 hover:border-emerald-500 shadow-md flex flex-col items-center justify-center gap-1 cursor-pointer font-black text-2xl text-emerald-950"
                >
                  <span className="text-3xl text-emerald-700">{opt.sym}</span>
                  <span className="text-[11px] font-bold text-stone-600">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 23. ADDITION & SUBTRACTION ENGINES (UKG #10, #11, CLASS 1 #8, #9)
      // ----------------------------------------------------
      case 'addition_garden':
      case 'addition_race':
      case 'subtraction_shop':
      case 'subtraction_race':
      case 'math_train': {
        const isSub = game.componentKey.includes('subtraction');
        const valA = (currentRound * 3 + 6) % 15 + 4;
        const valB = (currentRound * 2 + 2) % 6 + 1;
        const answer = isSub ? valA - valB : valA + valB;
        const options = [answer, answer - 1, answer + 1, answer + 2]
          .filter((v, i, a) => v >= 0 && a.indexOf(v) === i)
          .slice(0, 4)
          .sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <h3 className="text-2xl font-black mb-2">{isSub ? '➖ Math Subtraction' : '➕ Addition Adventure'}</h3>
              <div className="flex items-center justify-center gap-4 text-4xl font-black my-2">
                <span>{valA}</span>
                <span>{isSub ? '−' : '+'}</span>
                <span>{valB}</span>
                <span>=</span>
                <span className="text-amber-200">?</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {options.map((num) => (
                <motion.button
                  key={num}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.1 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      num === answer,
                      num === answer
                        ? `Splendid! ${valA} ${isSub ? '−' : '+'} ${valB} = ${answer}!`
                        : `Not quite! ${valA} ${isSub ? '−' : '+'} ${valB} equals ${answer}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-amber-300 hover:border-amber-500 font-black text-2xl sm:text-3xl text-amber-900 shadow-md cursor-pointer"
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 24. SHOPPING MATH ₹ (CLASS 1 GAME #10)
      // ----------------------------------------------------
      case 'shopping_math': {
        const scenario = SHOPPING_SCENARIOS[currentRound % SHOPPING_SCENARIOS.length];
        const correctChange = scenario.changeLeft;
        const options = [correctChange, correctChange - 2, correctChange + 3, correctChange + 1]
          .filter((v, i, a) => v > 0 && a.indexOf(v) === i)
          .slice(0, 4)
          .sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl block mb-2">{scenario.itemEmoji}</span>
              <h3 className="text-2xl font-black mb-1">Toy Store Shopping!</h3>
              <p className="text-emerald-100 text-sm">
                You have <span className="font-black text-amber-300">₹{scenario.walletMoney}</span>. You buy a{' '}
                {scenario.itemBought} for <span className="font-black text-amber-300">₹{scenario.itemCost}</span>.
              </p>
              <div className="mt-3 text-base font-black text-amber-200">How much change do you get back?</div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {options.map((val) => (
                <motion.button
                  key={val}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.1 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      val === correctChange,
                      val === correctChange
                        ? `Super shopper! ₹${scenario.walletMoney} − ₹${scenario.itemCost} = ₹${correctChange} change!`
                        : `Oops! ₹${scenario.walletMoney} − ₹${scenario.itemCost} leaves ₹${correctChange}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-emerald-300 hover:border-emerald-500 font-black text-xl sm:text-2xl text-emerald-900 shadow-md cursor-pointer"
                >
                  ₹{val}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 25. TIME EXPLORER (CLASS 1 GAME #11)
      // ----------------------------------------------------
      case 'time_explorer': {
        const scenario = CLOCK_SCENARIOS[currentRound % CLOCK_SCENARIOS.length];
        const distractors = CLOCK_SCENARIOS.filter((c) => c.timeString !== scenario.timeString)
          .slice(0, 3)
          .map((c) => c.timeString);
        const options = [scenario.timeString, ...distractors].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-white p-6 rounded-3xl text-center w-full mb-6 border-4 border-purple-300 shadow-lg">
              <span className="text-7xl block mb-2">⏰</span>
              <h3 className="text-2xl font-black text-stone-800">What time is it?</h3>
              <p className="text-stone-600 text-sm mt-1">{scenario.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {options.map((t) => (
                <motion.button
                  key={t}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.06 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  onClick={() =>
                    handleResult(
                      t === scenario.timeString,
                      t === scenario.timeString
                        ? `Splendid! The clock shows ${scenario.timeString} (${scenario.description})!`
                        : `Not quite! The clock was showing ${scenario.timeString}.`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-purple-200 hover:border-purple-500 font-black text-xl text-purple-900 shadow-md cursor-pointer"
                >
                  {t}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // 26. GK QUIZ & SCIENCE EXPLORER (CLASS 1 #16 & #17)
      // ----------------------------------------------------
      case 'gk_quiz':
      case 'science_explorer':
      case 'final_challenge': {
        const item = GK_QUESTIONS[currentRound % GK_QUESTIONS.length];
        const options = [
          { text: item.correctAnswer, isCorrect: true },
          ...item.wrongAnswers.map((w) => ({ text: w, isCorrect: false })),
        ].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-3xl text-center w-full mb-6 shadow-lg border-4 border-white">
              <span className="text-6xl block mb-2">{item.emoji}</span>
              <h3 className="text-xl md:text-2xl font-black mb-1">{item.question}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {options.map((opt, i) => (
                <motion.button
                  key={i}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.04 } : {}}
                  whileTap={!isAnswered ? { scale: 0.96 } : {}}
                  onClick={() =>
                    handleResult(
                      opt.isCorrect,
                      opt.isCorrect
                        ? `Brilliant! ${item.correctAnswer}. ${item.fact}`
                        : `Good try! The answer is ${item.correctAnswer}. ${item.fact}`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-indigo-200 hover:border-indigo-500 font-black text-base text-indigo-950 shadow-md cursor-pointer text-center"
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }

      // ----------------------------------------------------
      // DEFAULT FALLBACK: RICH INTERACTIVE QUESTION CARD
      // ----------------------------------------------------
      default: {
        const options = [
          { text: `Option 1: Correct Answer`, isCorrect: true },
          { text: `Option 2: Alternative Choice`, isCorrect: false },
          { text: `Option 3: Try Another`, isCorrect: false },
        ].sort(() => 0.5 - Math.random());

        return (
          <div className="flex flex-col items-center w-full max-w-lg">
            <div className="bg-white p-6 rounded-3xl text-center w-full mb-6 border-4 border-amber-300 shadow-lg">
              <span className="text-6xl block mb-2">{game.icon}</span>
              <h3 className="text-2xl font-black text-stone-800">{game.title}</h3>
              <p className="text-stone-600 text-xs mt-1">{game.instructions}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full">
              {options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.03 } : {}}
                  whileTap={!isAnswered ? { scale: 0.97 } : {}}
                  onClick={() =>
                    handleResult(
                      opt.isCorrect,
                      opt.isCorrect ? `Great job! You solved the challenge!` : `Nice effort! Keep practicing!`
                    )
                  }
                  className="bg-white p-4 rounded-2xl border-4 border-stone-200 hover:border-amber-400 font-black text-base text-stone-800 shadow-md cursor-pointer"
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 max-w-4xl mx-auto w-full">
      {/* Progress & Stats Bar */}
      <div className="w-full flex items-center justify-between mb-4 bg-white/90 px-4 py-2.5 rounded-2xl border-2 border-stone-200 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">{game.icon}</span>
          <span className="font-extrabold text-stone-800 text-xs sm:text-sm md:text-base">
            {game.title} • Round {currentRound + 1} of {roundsTotal}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => soundEngine.playLetterSound(game.title)}
            className="flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold hover:bg-amber-200 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Voice Help</span>
          </button>

          <div className="flex items-center gap-1 font-black text-amber-600 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{stars} Stars</span>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      {renderGameContent()}

      {/* Instant Feedback Popup */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 p-4 rounded-2xl border-2 flex items-center gap-3 w-full max-w-lg text-xs sm:text-sm md:text-base font-bold shadow-md ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                : 'bg-rose-50 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 shrink-0" />
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
