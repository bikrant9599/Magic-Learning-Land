import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimalInfo, SoundActivity } from '../types';
import { ANIMALS_DATA, ENCOURAGING_MESSAGES } from '../data/gameData';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';
import { CelebrationModal } from './CelebrationModal';
import { Music, Volume2, HelpCircle, Sparkles, CheckCircle2, Play } from 'lucide-react';

interface SoundsModuleProps {
  onEarnStar: (count?: number, category?: string) => void;
  onNavigateHome: () => void;
}

export const SoundsModule: React.FC<SoundsModuleProps> = ({
  onEarnStar,
  onNavigateHome,
}) => {
  const [activity, setActivity] = useState<SoundActivity>('guess');
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);

  // Guess the Animal State
  const [roundIndex, setRoundIndex] = useState(0);
  const [targetAnimal, setTargetAnimal] = useState<AnimalInfo>(ANIMALS_DATA[0]);
  const [options, setOptions] = useState<AnimalInfo[]>([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [isPlayingMysterySound, setIsPlayingMysterySound] = useState(false);

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState({ title: '', message: '' });

  // Initialize Guess Game
  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = (index = 0) => {
    const animal = ANIMALS_DATA[index % ANIMALS_DATA.length];
    const otherAnimals = ANIMALS_DATA.filter((a) => a.id !== animal.id);
    const shuffledOthers = [...otherAnimals].sort(() => Math.random() - 0.5).slice(0, 2);
    const choiceOptions = [animal, ...shuffledOthers].sort(() => Math.random() - 0.5);

    setTargetAnimal(animal);
    setOptions(choiceOptions);
    setSelectedAnimalId(null);
    setHintMessage(null);
  };

  // Play mystery animal sound automatically when round starts in Guess mode
  useEffect(() => {
    if (activity === 'guess' && targetAnimal) {
      playMysteryAnimalSound();
    }
  }, [activity, targetAnimal]);

  const playMysteryAnimalSound = () => {
    if (!targetAnimal) return;
    setIsPlayingMysterySound(true);
    sound.speak('Listen carefully! Who is making this sound?');
    setTimeout(() => {
      sound.playAnimalSound(targetAnimal.id);
      setIsPlayingMysterySound(false);
    }, 1400);
  };

  // Handle Animal Soundboard Tap
  const handleSoundboardTap = (animal: AnimalInfo) => {
    sound.playPop(520);
    setActiveAnimalId(animal.id);

    // Play synthesized sound followed by voice
    sound.playAnimalSound(animal.id);
    setTimeout(() => {
      sound.speak(`${animal.name}! ${animal.soundName}`);
    }, 500);

    onEarnStar(1, 'sounds');
  };

  // Handle Guess Answer Selection
  const handleSelectGuess = (chosen: AnimalInfo) => {
    setSelectedAnimalId(chosen.id);

    if (chosen.id === targetAnimal.id) {
      sound.playSuccess();
      const encouragement = ENCOURAGING_MESSAGES[Math.floor(Math.random() * ENCOURAGING_MESSAGES.length)];
      setHintMessage(encouragement);
      sound.speak(`${encouragement}! That's the ${targetAnimal.name}! ${targetAnimal.soundName}`);
      onEarnStar(1, 'sounds');

      setTimeout(() => {
        if (roundIndex + 1 < 5) {
          const nextIdx = roundIndex + 1;
          setRoundIndex(nextIdx);
          generateNewRound(nextIdx);
        } else {
          setCelebrationMsg({
            title: 'ANIMAL WHISPERER! 🐶',
            message: 'You guessed all the cheerful animal friends!',
          });
          setShowCelebration(true);
        }
      }, 1500);
    } else {
      sound.playTryAgain();
      setHintMessage(`Listen again! Which friendly animal says ${targetAnimal.soundName}? 🐾`);
      sound.speak(`Almost! Let's listen to the sound one more time.`);
      setTimeout(() => {
        sound.playAnimalSound(targetAnimal.id);
        setSelectedAnimalId(null);
      }, 1200);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-emerald-100 via-teal-50 to-sky-100 px-3 sm:px-6 py-4 relative overflow-hidden flex flex-col justify-between">
      {/* Activity Mode Switcher Tabs */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-center gap-2 sm:gap-4 mb-2">
        <button
          id="sounds-tab-guess"
          onClick={() => {
            sound.playPop(520);
            setActivity('guess');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'guess'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102'
              : 'bg-white/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span>GUESS THE SOUND</span>
        </button>

        <button
          id="sounds-tab-soundboard"
          onClick={() => {
            sound.playPop(520);
            sound.speak('Tap any animal to hear their joyful voice!');
            setActivity('soundboard');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl font-black text-sm sm:text-base border-3 transition-all cursor-pointer ${
            activity === 'soundboard'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-102'
              : 'bg-white/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <Music className="w-5 h-5" />
          <span>ANIMAL BAND</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      {activity === 'guess' && (
        <Mascot
          message="Listen to the mystery animal and tap who is singing!"
          voiceText="Listen to the sound and choose which animal made it!"
          mood={hintMessage ? 'cheering' : 'happy'}
        />
      )}

      {activity === 'soundboard' && (
        <Mascot
          message="Tap any friendly animal to hear their cheerful sound!"
          voiceText="Tap any animal friend to hear their sound!"
          mood="happy"
        />
      )}

      {/* GUESS THE SOUND GAME */}
      {activity === 'guess' && (
        <div className="max-w-2xl mx-auto w-full my-2 sm:my-4 flex-1 flex flex-col items-center justify-center">
          {/* Mystery Sound Speaker Card */}
          <div className="w-full bg-white/95 rounded-3xl p-6 sm:p-8 shadow-lg border-4 border-emerald-300 text-center mb-4 sm:mb-6">
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase mb-1 block">
              MYSTERY ANIMAL SOUND
            </span>

            {/* Big Interactive Speaker Button */}
            <motion.button
              id="replay-mystery-sound-button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                sound.playPop(500);
                sound.playAnimalSound(targetAnimal.id);
              }}
              className="my-3 mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-400 border-4 border-white shadow-xl flex flex-col items-center justify-center text-white cursor-pointer group"
              title="Tap to hear animal sound again!"
            >
              <motion.div
                animate={isPlayingMysterySound ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Volume2 className="w-12 h-12 drop-shadow-md group-hover:scale-110 transition-transform" />
              </motion.div>
              <span className="text-[11px] font-black tracking-wider uppercase mt-1">
                TAP TO HEAR
              </span>
            </motion.button>

            <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 font-display">
              Who made this sound?
            </h3>

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

          {/* 3 Animal Choice Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {options.map((animal) => {
              const isSelected = selectedAnimalId === animal.id;
              const isCorrect = animal.id === targetAnimal.id;

              return (
                <motion.button
                  key={animal.id}
                  id={`guess-animal-${animal.id}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSelectGuess(animal)}
                  className={`relative p-4 sm:p-5 rounded-3xl border-4 transition-all shadow-md flex sm:flex-col items-center justify-between sm:justify-center gap-3 cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                        : 'bg-rose-100 border-rose-400'
                      : 'bg-white hover:bg-emerald-50 border-emerald-200 hover:border-emerald-400'
                  }`}
                >
                  <motion.span
                    animate={isSelected && isCorrect ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] } : {}}
                    className="text-6xl sm:text-7xl select-none drop-shadow-xs"
                  >
                    {animal.emoji}
                  </motion.span>

                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-black text-emerald-950 font-display block">
                      {animal.name}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700">
                      {animal.soundName}
                    </span>
                  </div>

                  {isSelected && isCorrect && (
                    <div className="sm:hidden">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    </div>
                  )}
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
                  idx === roundIndex
                    ? 'bg-emerald-600 w-7'
                    : idx < roundIndex
                    ? 'bg-emerald-400'
                    : 'bg-emerald-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ANIMAL SOUNDBOARD / BAND */}
      {activity === 'soundboard' && (
        <div className="max-w-3xl mx-auto w-full my-2 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {ANIMALS_DATA.map((animal) => {
              const isPlaying = activeAnimalId === animal.id;

              return (
                <motion.button
                  key={animal.id}
                  id={`soundboard-animal-${animal.id}`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSoundboardTap(animal)}
                  className={`p-4 rounded-3xl border-4 transition-all shadow-md flex flex-col items-center justify-between text-center cursor-pointer relative overflow-hidden bg-white border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/50 min-h-[140px]`}
                >
                  <motion.div
                    animate={
                      isPlaying
                        ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                    className="text-5xl sm:text-6xl my-1 select-none drop-shadow-sm"
                  >
                    {animal.emoji}
                  </motion.div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-emerald-950 font-display leading-tight">
                      {animal.name}
                    </h4>
                    <span className="text-xs font-bold text-emerald-700 block">
                      "{animal.soundName}"
                    </span>
                  </div>

                  {isPlaying && (
                    <span className="absolute top-2 right-2 text-sm">✨</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        title={celebrationMsg.title}
        message={celebrationMsg.message}
        earnedStars={2}
        badgeUnlocked="Animal Whisperer"
        badgeIcon="🐶"
        onPlayAgain={() => {
          setShowCelebration(false);
          setRoundIndex(0);
          generateNewRound(0);
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
