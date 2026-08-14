import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Star, Volume2, Heart, Award } from 'lucide-react';
import { GradeLevel, UserProfile } from '../types';
import { GRADE_INFO } from '../data/allGamesData';
import { soundEngine } from '../utils/audio';

interface OnboardingJourneyProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile?: Partial<UserProfile>;
}

const AVATAR_OPTIONS = [
  { id: 'bunny', emoji: '🐰', name: 'Sunny Bunny', color: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'lion', emoji: '🦁', name: 'Leo Lion', color: 'bg-orange-100 text-orange-900 border-orange-300' },
  { id: 'panda', emoji: '🐼', name: 'Pip Panda', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { id: 'unicorn', emoji: '🦄', name: 'Starla Unicorn', color: 'bg-purple-100 text-purple-900 border-purple-300' },
  { id: 'fox', emoji: '🦊', name: 'Felix Fox', color: 'bg-rose-100 text-rose-900 border-rose-300' },
  { id: 'rocket', emoji: '🚀', name: 'Cosmo Astro', color: 'bg-sky-100 text-sky-900 border-sky-300' },
  { id: 'puppy', emoji: '🐶', name: 'Barnaby Pup', color: 'bg-yellow-100 text-yellow-900 border-yellow-300' },
  { id: 'tiger', emoji: '🐯', name: 'Toby Tiger', color: 'bg-amber-100 text-amber-900 border-amber-300' },
];

export const OnboardingJourney: React.FC<OnboardingJourneyProps> = ({
  onComplete,
  initialProfile,
}) => {
  // Screen Step: 1 = Welcome, 2 = Select Class, 3 = Name Input, 4 = Personalized Celebration
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    initialProfile?.grade || 'nursery'
  );
  const [childName, setChildName] = useState<string>(initialProfile?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    initialProfile?.avatarEmoji || '🐰'
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [showAdvancedGrades, setShowAdvancedGrades] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when reaching Step 3
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      soundEngine.speak("Hi! I'd love to know your name.");
    } else if (step === 1) {
      soundEngine.speak("Welcome to Magic Learning Land! Let's start your learning adventure!");
    } else if (step === 2) {
      soundEngine.speak('What is your class? Choose your grade!');
    } else if (step === 4) {
      soundEngine.playVictoryFanfare();
      const gradeName = GRADE_INFO[selectedGrade].name;
      soundEngine.speak(`Welcome, ${childName || 'friend'}! You are going on a ${gradeName} learning adventure!`);
    }
  }, [step]);

  // Handle Select Class
  const handleSelectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    soundEngine.playSuccess();
    const info = GRADE_INFO[grade];
    soundEngine.speak(`${info.name}! ${info.onboardingDesc}`);
  };

  // Handle Name Submission
  const handleNameContinue = () => {
    const trimmed = childName.trim();
    if (!trimmed) {
      soundEngine.playTryAgain();
      setNameError('Please tell me your name 😊');
      soundEngine.speak('Please tell me your name!');
      inputRef.current?.focus();
      return;
    }
    setNameError(null);
    soundEngine.playSuccess();
    setStep(4);
  };

  // Final Completion
  const handleStartAdventure = () => {
    soundEngine.playCelebration();
    const finalProfile: UserProfile = {
      name: childName.trim() || 'Explorer',
      grade: selectedGrade,
      avatarEmoji: selectedAvatar,
      isOnboarded: true,
      streakDays: 1,
      lastVisitDate: new Date().toISOString(),
    };
    onComplete(finalProfile);
  };

  const selectedGradeInfo = GRADE_INFO[selectedGrade];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-sky-50 to-pink-50 overflow-hidden select-none">
      {/* Animated Floating Background Elements (clouds, stars, balloons) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Glowing Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-sky-300/30 blur-3xl" />

        {/* Floating Clouds */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 text-5xl opacity-40"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-24 right-16 text-6xl opacity-35"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-16 text-4xl opacity-50"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-10 text-4xl opacity-45"
        >
          🦋
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-10 right-24 text-3xl opacity-40"
        >
          ✨
        </motion.div>
      </div>

      {/* Main Centered Onboarding Modal Box */}
      <div className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border-4 border-white ring-8 ring-amber-300/40">
        {/* Progress Indicator dots at top */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌈</span>
            <span className="font-black text-sm text-stone-800 tracking-tight">Magic Learning Land</span>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  step === s
                    ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-500'
                    : step > s
                    ? 'w-3 bg-emerald-500'
                    : 'w-2.5 bg-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ============================================================ */}
          {/* SCREEN 1: WELCOME */}
          {/* ============================================================ */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center flex flex-col items-center gap-6"
            >
              {/* Animated Cute Mascot with speech bubble */}
              <div className="relative group cursor-pointer" onClick={() => soundEngine.playLetterChime()}>
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-pink-400 p-2 shadow-xl flex items-center justify-center border-4 border-white"
                >
                  <span className="text-6xl sm:text-7xl drop-shadow-md">🐰</span>
                </motion.div>

                {/* Mascot Floating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-md flex items-center gap-1 border-2 border-white"
                >
                  <span>👋 Tap Me!</span>
                </motion.div>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2 max-w-md">
                <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight flex items-center justify-center gap-2">
                  <span>🌈</span>
                  <span>Magic Learning Land</span>
                </h1>
                <p className="text-base sm:text-lg text-stone-600 font-bold leading-relaxed">
                  “Let's start your learning adventure! 🚀”
                </p>
                <p className="text-xs text-stone-400 font-medium">
                  Fun games, cheerful sounds, phonics, numbers & joyful discovery!
                </p>
              </div>

              {/* Primary Action Button */}
              <motion.button
                id="btn_onboarding_lets_play"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundEngine.playSuccess();
                  setStep(2);
                }}
                className="w-full sm:w-auto min-w-64 py-4 px-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer border-2 border-white/50"
              >
                <span>LET'S PLAY!</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </motion.button>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SCREEN 2: SELECT YOUR CLASS */}
          {/* ============================================================ */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Question Header */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-black">
                  <span>🎓 Step 1 of 2</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  “What is your class?”
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 font-medium">
                  Tap your grade to open your magical world of games!
                </p>
              </div>

              {/* Main 8 Class Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[52vh] sm:max-h-[58vh] overflow-y-auto pr-1 py-1">
                {(['nursery', 'lkg', 'ukg', 'class1', 'class2', 'class3', 'class4', 'class5'] as GradeLevel[]).map((gradeKey) => {
                  const info = GRADE_INFO[gradeKey];
                  const isSelected = selectedGrade === gradeKey;

                  return (
                    <motion.button
                      key={gradeKey}
                      id={`card_select_${gradeKey}`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectGrade(gradeKey)}
                      className={`relative p-3.5 sm:p-4 rounded-3xl text-left border-3 transition-all flex items-center gap-3.5 cursor-pointer shadow-sm ${
                        isSelected
                          ? `bg-gradient-to-r ${info.themeGradient} text-white border-white ring-4 ring-amber-400 shadow-lg`
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-inner border-2 ${
                          isSelected ? 'bg-white/20 border-white/40' : 'bg-white border-stone-200'
                        }`}
                      >
                        {info.icon}
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-base sm:text-lg tracking-tight truncate">{info.name}</h3>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {info.ageRange}
                          </span>
                        </div>
                        <p
                          className={`text-xs font-semibold mt-0.5 leading-snug line-clamp-1 ${
                            isSelected ? 'text-white/95' : 'text-stone-600'
                          }`}
                        >
                          {info.worldEmoji} {info.worldName}: {info.onboardingDesc}
                        </p>
                      </div>

                      {/* Selected Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3.5 right-3.5 bg-white text-amber-600 w-6 h-6 rounded-full flex items-center justify-center font-black shadow-md"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <button
                  onClick={() => {
                    soundEngine.playGentlePop();
                    setStep(1);
                  }}
                  className="px-4 py-2.5 rounded-2xl text-xs font-black text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  ← Back
                </button>

                <motion.button
                  id="btn_onboarding_step2_next"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    soundEngine.playSuccess();
                    setStep(3);
                  }}
                  className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/50"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SCREEN 3: WHAT'S YOUR NAME? */}
          {/* ============================================================ */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Question Header & Mascot speech */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-900 px-3.5 py-1 rounded-full text-xs font-black">
                  <span>👦 Step 2 of 2</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  “What is your name?”
                </h2>

                {/* Friendly Character Speech Bubble */}
                <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-200 px-4 py-2 rounded-2xl text-amber-950 font-bold text-xs sm:text-sm shadow-xs">
                  <span className="text-2xl animate-bounce">🐰</span>
                  <span>“Hi! I'd love to know your name 😊”</span>
                  <button
                    type="button"
                    onClick={() => soundEngine.speak("Hi! I'd love to know your name.")}
                    className="p-1 text-amber-700 hover:text-amber-900 cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Large Child-Friendly Name Input */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <input
                    ref={inputRef}
                    id="input_child_name"
                    type="text"
                    value={childName}
                    onChange={(e) => {
                      setChildName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleNameContinue();
                    }}
                    maxLength={20}
                    placeholder="Type your name here"
                    className="w-full text-center text-xl sm:text-2xl font-black py-4 px-6 rounded-3xl bg-stone-50 border-3 border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-300/50 shadow-inner transition-all"
                  />
                </div>

                {/* Soft Error Speech Bubble if empty */}
                {nameError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 text-rose-800 border border-rose-200 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <span>🌟</span>
                    <span>{nameError}</span>
                  </motion.div>
                )}
              </div>

              {/* Fun Avatar Buddy Selector */}
              <div className="space-y-2">
                <p className="text-xs font-black text-stone-600 text-center uppercase tracking-wider">
                  Pick your adventure avatar:
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => {
                        soundEngine.playPop(550);
                        setSelectedAvatar(av.emoji);
                      }}
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer border-2 ${
                        selectedAvatar === av.emoji
                          ? 'bg-amber-400 border-amber-600 scale-110 shadow-md ring-2 ring-amber-300'
                          : 'bg-stone-100 hover:bg-stone-200 border-stone-200'
                      }`}
                      title={av.name}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <button
                  onClick={() => {
                    soundEngine.playGentlePop();
                    setStep(2);
                  }}
                  className="px-4 py-2.5 rounded-2xl text-xs font-black text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  ← Back
                </button>

                <motion.button
                  id="btn_onboarding_name_continue"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNameContinue}
                  className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/50"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ============================================================ */}
          {/* SCREEN 4: PERSONALIZED CELEBRATION */}
          {/* ============================================================ */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center flex flex-col items-center gap-6"
            >
              {/* Confetti & Sparkles celebration mascot */}
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -14, 0], scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-500 p-2 shadow-2xl flex items-center justify-center border-4 border-white"
                >
                  <span className="text-6xl sm:text-7xl drop-shadow-md">{selectedAvatar}</span>
                </motion.div>

                {/* Animated Stars radiating around */}
                {['⭐', '✨', '🎉', '🌟', '💫'].map((emoji, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0.8],
                      scale: [0, 1.2, 1],
                      x: [0, (idx % 2 === 0 ? 1 : -1) * (40 + idx * 15)],
                      y: [0, -30 - idx * 10],
                    }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    className="absolute top-1/2 left-1/2 text-2xl sm:text-3xl pointer-events-none"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>

              {/* Personalized Welcome Messaging */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  “Welcome, <span className="text-amber-600">{childName || 'Explorer'}</span>! 🎉”
                </h2>
                <div className="inline-block bg-gradient-to-r from-amber-100 via-orange-100 to-pink-100 border-2 border-amber-300 px-5 py-2.5 rounded-3xl shadow-sm">
                  <p className="text-sm sm:text-base font-extrabold text-amber-950">
                    You're going on a {selectedGradeInfo.icon} <span className="font-black underline decoration-amber-400">{selectedGradeInfo.name}</span> learning adventure!
                  </p>
                </div>
                <p className="text-xs text-stone-500 font-semibold mt-1">
                  World: <span className="font-black text-stone-800">{selectedGradeInfo.worldEmoji} {selectedGradeInfo.worldName}</span> • 20 Verified Games Ready
                </p>
              </div>

              {/* Start Adventure Button */}
              <motion.button
                id="btn_onboarding_start_adventure"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleStartAdventure}
                className="w-full sm:w-auto min-w-72 py-4 px-8 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 text-white font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer border-2 border-white animate-pulse"
              >
                <span>START MY ADVENTURE 🚀</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
