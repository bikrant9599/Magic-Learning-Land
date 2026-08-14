import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShapeActivity, ShapeInfo } from '../types';
import { SHAPES_DATA, ENCOURAGING_MESSAGES } from '../data/gameData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import { Sparkles, Shapes as ShapesIcon, Puzzle, CheckCircle2 } from 'lucide-react';

interface ShapesModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
}

// 4 simple friendly puzzle designs built from shapes
const SHAPE_PUZZLES = [
  {
    id: 'house',
    title: 'Happy House',
    pieces: [
      { id: 'roof', shape: 'triangle', name: 'Triangle Roof', color: '#EF4444', emoji: '🔺' },
      { id: 'walls', shape: 'square', name: 'Square House', color: '#3B82F6', emoji: '🟦' },
      { id: 'door', shape: 'rectangle', name: 'Rectangle Door', color: '#22C55E', emoji: '🟩' },
      { id: 'window', shape: 'circle', name: 'Circle Window', color: '#FACC15', emoji: '🟡' },
    ],
  },
  {
    id: 'rocket',
    title: 'Space Rocket',
    pieces: [
      { id: 'top-nose', shape: 'triangle', name: 'Triangle Nosecone', color: '#EF4444', emoji: '🔺' },
      { id: 'main-body', shape: 'rectangle', name: 'Rectangle Body', color: '#3B82F6', emoji: '🟦' },
      { id: 'window', shape: 'circle', name: 'Circle Porthole', color: '#FACC15', emoji: '🟡' },
      { id: 'base-fins', shape: 'square', name: 'Square Booster', color: '#FB923C', emoji: '🟧' },
    ],
  },
  {
    id: 'tree',
    title: 'Garden Tree & Sun',
    pieces: [
      { id: 'sun', shape: 'circle', name: 'Circle Sun', color: '#FACC15', emoji: '🟡' },
      { id: 'leaves', shape: 'triangle', name: 'Triangle Pine', color: '#22C55E', emoji: '🔺' },
      { id: 'trunk', shape: 'rectangle', name: 'Rectangle Trunk', color: '#B45309', emoji: '🟫' },
      { id: 'flower-box', shape: 'square', name: 'Square Planter', color: '#F472B6', emoji: '🌸' },
    ],
  },
];

export const ShapesModule: React.FC<ShapesModuleProps> = ({
  onEarnStar,
  onNavigateHome,
}) => {
  const [activity, setActivity] = useState<ShapeActivity>('identify');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  // Puzzle activity state
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);

  // Generate randomized match & identify questions
  const [quizQuestions, setQuizQuestions] = useState<
    Array<{
      type: 'shape' | 'object';
      targetShape: ShapeInfo;
      example?: { name: string; emoji: string };
      options: ShapeInfo[];
    }>
  >([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  const generateQuestions = () => {
    const list: Array<{
      type: 'shape' | 'object';
      targetShape: ShapeInfo;
      example?: { name: string; emoji: string };
      options: ShapeInfo[];
    }> = [];

    // Add identify shape questions + match object to shape questions
    SHAPES_DATA.forEach((shape, i) => {
      const otherShapes = SHAPES_DATA.filter((s) => s.id !== shape.id);
      const shuffledOthers = [...otherShapes].sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [shape, ...shuffledOthers].sort(() => Math.random() - 0.5);

      list.push({
        type: i % 2 === 0 ? 'shape' : 'object',
        targetShape: shape,
        example: shape.realWorldExamples[Math.floor(Math.random() * shape.realWorldExamples.length)],
        options,
      });
    });

    setQuizQuestions(list.sort(() => Math.random() - 0.5));
    setQuizIndex(0);
    setSelectedAnswer(null);
    setHintMessage(null);
  };

  const currentQ = quizQuestions[quizIndex];

  // Voice narration
  useEffect(() => {
    if (activity === 'identify' && currentQ) {
      const prompt =
        currentQ.type === 'shape'
          ? `Where is the ${currentQ.targetShape.name}?`
          : `What shape is the ${currentQ.example?.name}?`;
      sound.speak(prompt);
    }
  }, [activity, quizIndex, currentQ]);

  // Handle Quiz Answer Selection
  const handleSelectOption = (chosenShape: ShapeInfo) => {
    if (!currentQ) return;
    setSelectedAnswer(chosenShape.id);

    if (chosenShape.id === currentQ.targetShape.id) {
      sound.playSuccess();
      const encouragement = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
      setHintMessage(encouragement);
      sound.speak(`${encouragement}! That is a ${currentQ.targetShape.name}!`);
      onEarnStar(1, 'shapes');

      setTimeout(() => {
        if (quizIndex + 1 < quizQuestions.length) {
          setQuizIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setHintMessage(null);
        } else {
          setCelebrationMsg({
            title: 'SHAPE EXPLORER! 🔺',
            message: 'You know all the circles, squares, triangles and rectangles!',
          });
          setShowCelebration(true);
        }
      }, 1300);
    } else {
      sound.playTryAgain();
      setHintMessage(`Look closely! Find the ${currentQ.targetShape.name} 🌟`);
      sound.speak(`Almost! Can you find the ${currentQ.targetShape.name}?`);
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  // Shape Puzzle Handlers
  const currentPuzzle = SHAPE_PUZZLES[puzzleIndex];

  const handlePlacePiece = (pieceId: string) => {
    if (placedPieces.includes(pieceId)) return;

    sound.playPop(560);
    const updated = [...placedPieces, pieceId];
    setPlacedPieces(updated);

    const piece = currentPuzzle.pieces.find((p) => p.id === pieceId);
    if (piece) {
      sound.speak(`Added the ${piece.name}!`);
    }

    // Check if entire puzzle is built
    if (updated.length === currentPuzzle.pieces.length) {
      setTimeout(() => {
        sound.playSuccess();
        onEarnStar(2, 'shapes');
        setCelebrationMsg({
          title: 'PUZZLE COMPLETE! 🧩',
          message: `You built the whole ${currentPuzzle.title}!`,
        });
        setShowCelebration(true);
      }, 600);
    }
  };

  const renderShapeGraphic = (shapeId: string, size = 'w-14 h-14', color = '#3B82F6') => {
    switch (shapeId) {
      case 'circle':
        return (
          <div
            className={`${size} rounded-full border-3 border-white shadow-md transition-transform`}
            style={{ backgroundColor: color }}
          />
        );
      case 'square':
        return (
          <div
            className={`${size} rounded-xl border-3 border-white shadow-md transition-transform`}
            style={{ backgroundColor: color }}
          />
        );
      case 'triangle':
        return (
          <div
            className={`${size} flex items-center justify-center`}
          >
            <div
              className="w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[48px] drop-shadow-md"
              style={{ borderBottomColor: color }}
            />
          </div>
        );
      case 'rectangle':
        return (
          <div
            className="w-20 h-12 rounded-xl border-3 border-white shadow-md transition-transform"
            style={{ backgroundColor: color }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-amber-100 via-orange-50 to-yellow-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 mb-2">
        <button
          id="shapes-tab-quiz"
          onClick={() => {
            sound.playPop(520);
            setActivity('identify');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'identify'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
              : 'bg-white/80 text-amber-800 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <ShapesIcon className="w-5 h-5" />
          <span>SHAPE MATCH</span>
        </button>

        <button
          id="shapes-tab-puzzle"
          onClick={() => {
            sound.playPop(520);
            sound.speak('Tap each shape piece to build the fun puzzle!');
            setActivity('sorter');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'sorter'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
              : 'bg-white/80 text-amber-800 border-amber-200 hover:bg-amber-100'
          }`}
        >
          <Puzzle className="w-5 h-5" />
          <span>SHAPE PUZZLE</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'identify' && currentQ && (
        <Mascot
          message={
            currentQ.type === 'shape'
              ? `Can you tap the ${currentQ.targetShape.name}?`
              : `What shape is the ${currentQ.example?.name}?`
          }
          voiceText={
            currentQ.type === 'shape'
              ? `Can you find and tap the ${currentQ.targetShape.name}?`
              : `What shape is the ${currentQ.example?.name}?`
          }
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}

      {activity === 'sorter' && (
        <Mascot
          message={`Tap the shape pieces below to build the ${currentPuzzle.title}!`}
          voiceText={`Tap each shape below to build the ${currentPuzzle.title}!`}
          mood="happy"
        />
      )}

      {/* SHAPE MATCH & IDENTIFY QUIZ */}
      {activity === 'identify' && currentQ && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Question Display Card */}
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-lg border-4 border-amber-300 text-center mb-4 sm:mb-6">
            {currentQ.type === 'shape' ? (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase mb-1">
                  FIND THIS SHAPE
                </span>
                <div className="my-2 p-4 flex items-center justify-center">
                  {renderShapeGraphic(currentQ.targetShape.id, 'w-20 h-20 sm:w-24 sm:h-24', currentQ.targetShape.color)}
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-amber-950 font-display mt-1">
                  {currentQ.targetShape.name}
                </h3>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xs font-black tracking-widest text-amber-500 uppercase mb-1">
                  WHAT SHAPE IS THIS?
                </span>
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-7xl sm:text-8xl my-2 drop-shadow-md select-none"
                >
                  {currentQ.example?.emoji}
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
                  {currentQ.example?.name}
                </h3>
              </div>
            )}

            {/* Encouragement Hint Toast */}
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

          {/* 3 Chunky Shape Buttons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQ.targetShape.id;

              return (
                <motion.button
                  key={option.id}
                  id={`shape-choice-${option.id}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectOption(option)}
                  className={`relative p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex sm:flex-col items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-amber-100 border-amber-400'
                      : 'bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-400'
                  }`}
                >
                  {/* Shape Graphic */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                    {renderShapeGraphic(option.id, 'w-12 h-12', option.color)}
                  </div>

                  <span className="text-xl sm:text-2xl font-black text-amber-950 font-display">
                    {option.name}
                  </span>

                  <span className="sm:hidden text-2xl">
                    {option.realWorldExamples[0].emoji}
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
                    ? 'bg-amber-500 w-7'
                    : idx < quizIndex
                    ? 'bg-emerald-400'
                    : 'bg-amber-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* SHAPE PUZZLE BUILDER ACTIVITY */}
      {activity === 'sorter' && (
        <div className="max-w-2xl mx-auto w-full my-2 flex-1 flex flex-col items-center justify-between">
          {/* Puzzle Select Header */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 px-2">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {SHAPE_PUZZLES.map((pz, idx) => (
                <button
                  key={pz.id}
                  id={`puzzle-tab-${pz.id}`}
                  onClick={() => {
                    sound.playPop(500);
                    setPuzzleIndex(idx);
                    setPlacedPieces([]);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer whitespace-nowrap ${
                    puzzleIndex === idx
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  {pz.title}
                </button>
              ))}
            </div>

            <button
              id="reset-puzzle-button"
              onClick={() => {
                sound.playPop(440);
                setPlacedPieces([]);
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-amber-700 font-bold text-xs border-2 border-amber-200 hover:bg-amber-100 flex items-center gap-1 cursor-pointer shrink-0"
            >
              RESET
            </button>
          </div>

          {/* Puzzle Stage Board */}
          <div className="w-full max-w-sm aspect-square bg-white rounded-3xl p-6 shadow-lg border-4 border-amber-300 relative flex flex-col items-center justify-center my-1 overflow-hidden">
            <h4 className="absolute top-3 left-4 text-xs font-black text-amber-500 uppercase tracking-wider">
              {currentPuzzle.title}
            </h4>

            {/* Custom Visual Representation of Constructed Scene */}
            {currentPuzzle.id === 'house' && (
              <div className="flex flex-col items-center justify-center relative w-full h-full pt-4">
                {/* Roof */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: placedPieces.includes('roof') ? 1 : 0.2,
                    scale: placedPieces.includes('roof') ? 1 : 0.95,
                  }}
                  className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[60px] border-b-rose-500 transition-opacity"
                />
                {/* House Base */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: placedPieces.includes('walls') ? 1 : 0.2,
                  }}
                  className="w-32 h-28 bg-blue-500 rounded-xl relative flex items-center justify-center -mt-1 border-2 border-white"
                >
                  {/* Window inside house */}
                  <motion.div
                    animate={{
                      opacity: placedPieces.includes('window') ? 1 : 0.2,
                      scale: placedPieces.includes('window') ? 1 : 0.8,
                    }}
                    className="absolute top-2 w-8 h-8 rounded-full bg-yellow-300 border-2 border-white shadow-inner flex items-center justify-center text-xs"
                  >
                    ☀️
                  </motion.div>

                  {/* Door */}
                  <motion.div
                    animate={{
                      opacity: placedPieces.includes('door') ? 1 : 0.2,
                    }}
                    className="absolute bottom-0 w-8 h-14 bg-emerald-500 rounded-t-md border-t-2 border-x-2 border-white"
                  />
                </motion.div>
              </div>
            )}

            {currentPuzzle.id === 'rocket' && (
              <div className="flex flex-col items-center justify-center relative w-full h-full pt-2">
                {/* Nosecone */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('top-nose') ? 1 : 0.2,
                  }}
                  className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[50px] border-b-rose-500"
                />
                {/* Main Fuselage */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('main-body') ? 1 : 0.2,
                  }}
                  className="w-20 h-28 bg-blue-500 rounded-lg relative flex items-center justify-center border-2 border-white my-0.5"
                >
                  {/* Porthole */}
                  <motion.div
                    animate={{
                      opacity: placedPieces.includes('window') ? 1 : 0.2,
                    }}
                    className="w-10 h-10 rounded-full bg-yellow-300 border-3 border-white flex items-center justify-center text-sm shadow-inner"
                  >
                    ⭐
                  </motion.div>
                </motion.div>
                {/* Booster Base */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('base-fins') ? 1 : 0.2,
                  }}
                  className="w-24 h-8 bg-orange-500 rounded-md border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                >
                  🚀
                </motion.div>
              </div>
            )}

            {currentPuzzle.id === 'tree' && (
              <div className="flex flex-col items-center justify-center relative w-full h-full pt-2">
                {/* Sun */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('sun') ? 1 : 0.2,
                  }}
                  className="absolute top-4 right-6 w-12 h-12 rounded-full bg-yellow-400 border-2 border-white shadow-md flex items-center justify-center text-xl"
                >
                  ☀️
                </motion.div>

                {/* Tree Foliage */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('leaves') ? 1 : 0.2,
                  }}
                  className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[70px] border-b-green-500 mt-6"
                />
                {/* Trunk */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('trunk') ? 1 : 0.2,
                  }}
                  className="w-8 h-16 bg-amber-800 rounded-t-sm"
                />
                {/* Flower box */}
                <motion.div
                  animate={{
                    opacity: placedPieces.includes('flower-box') ? 1 : 0.2,
                  }}
                  className="w-24 h-8 bg-pink-400 rounded-md border-2 border-white flex items-center justify-center text-xs"
                >
                  🌸 🌺 🌸
                </motion.div>
              </div>
            )}
          </div>

          {/* Piece Tap Tray */}
          <div className="w-full bg-white/90 rounded-3xl p-3 sm:p-4 shadow-md border-3 border-amber-300 mt-2">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wide block text-center mb-2">
              TAP PIECES TO PUT THEM IN THE PUZZLE:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentPuzzle.pieces.map((piece) => {
                const isPlaced = placedPieces.includes(piece.id);

                return (
                  <motion.button
                    key={piece.id}
                    id={`puzzle-piece-${piece.id}`}
                    whileHover={!isPlaced ? { scale: 1.06, y: -2 } : {}}
                    whileTap={!isPlaced ? { scale: 0.94 } : {}}
                    onClick={() => handlePlacePiece(piece.id)}
                    disabled={isPlaced}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border-3 transition-all cursor-pointer ${
                      isPlaced
                        ? 'bg-emerald-50 border-emerald-300 opacity-60 cursor-not-allowed'
                        : 'bg-white hover:bg-amber-50 border-amber-300 shadow-sm'
                    }`}
                  >
                    <span className="text-2xl">{piece.emoji}</span>
                    <span className="text-xs font-black text-amber-950 truncate">
                      {piece.name}
                    </span>
                    {isPlaced && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-auto" />}
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
        badgeUnlocked={activity === 'identify' ? 'Shape Explorer' : undefined}
        badgeIcon="🔺"
        onPlayAgain={() => {
          setShowCelebration(false);
          if (activity === 'identify') {
            generateQuestions();
          } else {
            setPlacedPieces([]);
          }
        }}
        onNext={() => {
          setShowCelebration(false);
          if (activity === 'identify') {
            setActivity('sorter');
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
