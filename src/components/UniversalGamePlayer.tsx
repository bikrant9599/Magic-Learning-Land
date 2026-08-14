import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Volume2,
  VolumeX,
  Trophy,
  RotateCcw,
  Play,
  CheckCircle,
  Star,
  Zap,
  Info,
  Medal,
} from 'lucide-react';
import { GameMetadata, DifficultyLevel, GradeLevel } from '../types';
import { soundEngine } from '../utils/audio';
import { AnimalSoundGame } from './games/AnimalSoundGame';
import { AnimalHomeGame } from './games/AnimalHomeGame';
import { EverydaySoundGame } from './games/EverydaySoundGame';
import { ColorMixingGame } from './games/ColorMixingGame';
import { InteractiveUniversalGame } from './games/InteractiveUniversalGame';
import { motion, AnimatePresence } from 'motion/react';

interface UniversalGamePlayerProps {
  game: GameMetadata;
  userStars: number;
  userCoins: number;
  onBack: () => void;
  onGameFinish: (gameId: string, starsEarned: number, coinsEarned: number, accuracy: number) => void;
  onNextGame?: () => void;
}

export const UniversalGamePlayer: React.FC<UniversalGamePlayerProps> = ({
  game,
  userStars,
  userCoins,
  onBack,
  onGameFinish,
  onNextGame,
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(game.difficulty || 'medium');
  const [isMuted, setIsMuted] = useState(soundEngine.isMutedState());
  const [showInfo, setShowInfo] = useState(false);
  const [gameResult, setGameResult] = useState<{
    stars: number;
    coins: number;
    accuracy: number;
    correct: number;
    total: number;
  } | null>(null);

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const handleGameComplete = (starsEarned: number, correctCount: number, totalCount: number) => {
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;
    const coinsEarned = starsEarned * 5 + 10;
    soundEngine.playVictoryFanfare();

    setGameResult({
      stars: starsEarned,
      coins: coinsEarned,
      accuracy,
      correct: correctCount,
      total: totalCount,
    });

    onGameFinish(game.id, starsEarned, coinsEarned, accuracy);
  };

  const handleRestart = () => {
    setGameResult(null);
  };

  // Select appropriate sub-component
  const renderGameEngine = () => {
    switch (game.componentKey) {
      case 'animal_sound':
        return (
          <AnimalSoundGame
            difficulty={difficulty}
            onGameComplete={handleGameComplete}
            onCorrectAnswer={() => {}}
            onWrongAnswer={() => {}}
          />
        );
      case 'animal_home':
        return (
          <AnimalHomeGame
            difficulty={difficulty}
            onGameComplete={handleGameComplete}
            onCorrectAnswer={() => {}}
            onWrongAnswer={() => {}}
          />
        );
      case 'sound_detective':
        return (
          <EverydaySoundGame
            difficulty={difficulty}
            onGameComplete={handleGameComplete}
            onCorrectAnswer={() => {}}
            onWrongAnswer={() => {}}
          />
        );
      case 'color_mixing':
        return (
          <ColorMixingGame
            difficulty={difficulty}
            onGameComplete={handleGameComplete}
            onCorrectAnswer={() => {}}
            onWrongAnswer={() => {}}
          />
        );
      default:
        return (
          <InteractiveUniversalGame
            game={game}
            difficulty={difficulty}
            onGameComplete={handleGameComplete}
            onCorrectAnswer={() => {}}
            onWrongAnswer={() => {}}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 text-stone-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Back Button */}
          <button
            id="btn_back_to_map"
            onClick={onBack}
            className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-4 py-2 rounded-2xl font-bold text-sm transition-all border border-stone-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to World Map</span>
          </button>

          {/* Game Title & Grade */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-2xl">{game.icon}</span>
            <div>
              <h1 className="font-black text-stone-800 text-base md:text-lg leading-tight">{game.title}</h1>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                {game.grade} • Game #{game.number}
              </span>
            </div>
          </div>

          {/* Controls: Difficulty, Info & Audio */}
          <div className="flex items-center gap-2">
            {/* Difficulty selector */}
            <div className="hidden md:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-300 text-xs font-bold">
              {(['easy', 'medium', 'challenge'] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setDifficulty(lvl);
                    soundEngine.playGentlePop();
                  }}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                    difficulty === lvl ? 'bg-amber-500 text-white shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Info toggle */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-xl border transition-colors ${
                showInfo ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-stone-100 text-stone-700 border-stone-300'
              }`}
              title="Learning Objective & Instructions"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Mute button */}
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* Collapsible Info Drawer */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden max-w-4xl mx-auto mt-2 bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-xs md:text-sm text-stone-800 shadow-inner"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <span className="font-extrabold text-amber-900 block mb-0.5">🎯 Learning Objective</span>
                  <p>{game.objective}</p>
                </div>
                <div>
                  <span className="font-extrabold text-amber-900 block mb-0.5">🧠 Skill Practiced</span>
                  <p>{game.skill}</p>
                </div>
                <div>
                  <span className="font-extrabold text-amber-900 block mb-0.5">📖 Child Instructions</span>
                  <p>{game.instructions}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Play Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {renderGameEngine()}
      </main>

      {/* Victory / Reward Modal */}
      <AnimatePresence>
        {gameResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden"
            >
              {/* Confetti & Trophy Glow */}
              <div className="text-6xl mb-3 animate-bounce">🏆</div>
              <h2 className="text-3xl font-black text-amber-900">Activity Complete!</h2>
              <p className="text-stone-600 font-medium text-sm mt-1">
                You did wonderful learning with <span className="font-bold">{game.title}</span>!
              </p>

              {/* Reward Highlights */}
              <div className="grid grid-cols-3 gap-3 my-6">
                <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl">
                  <span className="text-2xl block">⭐</span>
                  <span className="font-black text-xl text-amber-900">+{gameResult.stars}</span>
                  <span className="text-xs text-amber-700 font-bold block">Stars</span>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-300 p-3 rounded-2xl">
                  <span className="text-2xl block">🪙</span>
                  <span className="font-black text-xl text-yellow-900">+{gameResult.coins}</span>
                  <span className="text-xs text-yellow-700 font-bold block">Coins</span>
                </div>
                <div className="bg-emerald-50 border-2 border-emerald-300 p-3 rounded-2xl">
                  <span className="text-2xl block">🎯</span>
                  <span className="font-black text-xl text-emerald-900">{gameResult.accuracy}%</span>
                  <span className="text-xs text-emerald-700 font-bold block">Accuracy</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="btn_replay_game"
                  onClick={handleRestart}
                  className="flex-1 py-3 px-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center gap-2 border border-stone-300 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Play Again</span>
                </button>

                {onNextGame ? (
                  <button
                    id="btn_next_game"
                    onClick={onNextGame}
                    className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-transform hover:scale-105"
                  >
                    <span>Next Game</span>
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                ) : (
                  <button
                    id="btn_finish_to_map"
                    onClick={onBack}
                    className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-200 transition-transform hover:scale-105"
                  >
                    <span>World Map</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
