import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  ShieldCheck,
  Volume2,
  VolumeX,
  Music,
  Search,
  CheckCircle2,
  Play,
  Star,
  Award,
  BookOpen,
  Filter,
  Heart,
  ChevronRight,
  Smile,
  Compass,
  User,
  RotateCcw,
  Settings,
  HelpCircle,
} from 'lucide-react';
import {
  GradeLevel,
  GameCategory,
  GameMetadata,
  DailyMissionState,
  ParentProgressData,
  UserProfile,
} from './types';
import { ALL_GAMES, GRADE_INFO } from './data/allGamesData';
import { soundEngine } from './utils/audio';
import { OnboardingJourney } from './components/OnboardingJourney';
import { UniversalGamePlayer } from './components/UniversalGamePlayer';
import { DailyMissionModal } from './components/DailyMissionModal';
import { ParentTeacherDashboard } from './components/ParentTeacherDashboard';
import { RewardsBadgesModal, CHARACTER_COMPANIONS } from './components/RewardsBadgesModal';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY = 'magic_learning_land_v2_data';

export const App: React.FC = () => {
  // User Profile & Onboarding State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.isOnboarded) {
          return parsed;
        }
      } catch (e) {}
    }
    return null;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name && parsed.isOnboarded) {
          return false;
        }
      } catch (e) {}
    }
    return true;
  });

  // Navigation & Active Game State
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(() => {
    if (userProfile?.grade) return userProfile.grade;
    return 'nursery';
  });

  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);

  // User Stats & Persistence
  const [userStars, setUserStars] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_stars');
    return saved ? parseInt(saved, 10) : 15;
  });

  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_coins');
    return saved ? parseInt(saved, 10) : 75;
  });

  const [completedGameIds, setCompletedGameIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_completed');
    return saved ? JSON.parse(saved) : ['nursery_color_hunt', 'nursery_animal_sound'];
  });

  const [selectedCompanion, setSelectedCompanion] = useState<string>('bunny');
  const [isMuted, setIsMuted] = useState(soundEngine.isMutedState());
  const [isMusicOn, setIsMusicOn] = useState(soundEngine.isMusicEnabled());

  // Modals Visibility
  const [isDailyMissionOpen, setIsDailyMissionOpen] = useState(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Parent Progress Analytics State
  const [parentStats, setParentStats] = useState<ParentProgressData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_parent');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      timeSpentSeconds: 480,
      totalAttempts: 22,
      correctAttempts: 20,
      starsEarned: 15,
      coinsEarned: 75,
      gamesCompletedCount: 2,
      completedGameIds: ['nursery_color_hunt', 'nursery_animal_sound'],
      gradeProgress: {
        nursery: { played: 2, mastered: 2 },
        lkg: { played: 0, mastered: 0 },
        ukg: { played: 0, mastered: 0 },
        class1: { played: 0, mastered: 0 },
      },
      subjectStats: {
        english: { attempts: 5, correct: 5, gamesPlayed: 1 },
        maths: { attempts: 6, correct: 5, gamesPlayed: 1 },
        logic: { attempts: 4, correct: 4, gamesPlayed: 0 },
        science: { attempts: 5, correct: 5, gamesPlayed: 1 },
        creative: { attempts: 2, correct: 1, gamesPlayed: 1 },
      },
      strengths: ['Auditory Animal Recognition', 'Color Discriminations', 'Shape Matching'],
      needsPractice: ['CVC Word Blending'],
      lastSessionDate: new Date().toISOString(),
    };
  });

  // Daily Mission State (Curated 5 activities from current grade)
  const [dailyMission, setDailyMission] = useState<DailyMissionState>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_mission');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) return parsed;
      } catch (e) {}
    }

    const gradeGames = ALL_GAMES.filter((g) => g.grade === currentGrade);
    const curatedGames = gradeGames.slice(0, 5);

    return {
      date: today,
      items: curatedGames.map((g) => ({
        gameId: g.id,
        title: g.title,
        icon: g.icon,
        category: g.category,
        grade: g.grade,
        completed: false,
      })),
      completedCount: 0,
      bonusClaimed: false,
    };
  });

  // Update curated daily mission whenever grade changes
  useEffect(() => {
    const today = new Date().toDateString();
    const gradeGames = ALL_GAMES.filter((g) => g.grade === currentGrade);
    const curated = (gradeGames.length >= 5 ? gradeGames.slice(0, 5) : ALL_GAMES.slice(0, 5));

    setDailyMission((prev) => {
      // Keep existing completion status if same game
      const updatedItems = curated.map((g) => ({
        gameId: g.id,
        title: g.title,
        icon: g.icon,
        category: g.category,
        grade: g.grade,
        completed: completedGameIds.includes(g.id),
      }));
      const completedCount = updatedItems.filter((it) => it.completed).length;
      return {
        date: today,
        items: updatedItems,
        completedCount,
        bonusClaimed: prev.bonusClaimed,
      };
    });
  }, [currentGrade, completedGameIds]);

  // Save changes to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_profile', JSON.stringify(userProfile));
    }
    localStorage.setItem(LOCAL_STORAGE_KEY + '_stars', userStars.toString());
    localStorage.setItem(LOCAL_STORAGE_KEY + '_coins', userCoins.toString());
    localStorage.setItem(LOCAL_STORAGE_KEY + '_completed', JSON.stringify(completedGameIds));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_mission', JSON.stringify(dailyMission));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_parent', JSON.stringify(parentStats));
  }, [userProfile, userStars, userCoins, completedGameIds, dailyMission, parentStats]);

  // Handle Onboarding Completion
  const handleCompleteOnboarding = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    setCurrentGrade(newProfile.grade);
    setIsOnboardingOpen(false);
    localStorage.setItem(LOCAL_STORAGE_KEY + '_profile', JSON.stringify(newProfile));
    soundEngine.speak(`Welcome to ${GRADE_INFO[newProfile.grade].worldName}, ${newProfile.name}!`);
  };

  // Handle game finish
  const handleGameFinish = (gameId: string, starsEarned: number, coinsEarned: number, accuracy: number) => {
    setUserStars((s) => s + starsEarned);
    setUserCoins((c) => c + coinsEarned);

    if (!completedGameIds.includes(gameId)) {
      setCompletedGameIds((prev) => [...prev, gameId]);
    }

    // Update Daily Mission if applicable
    setDailyMission((prev) => {
      let updated = false;
      const newItems = prev.items.map((it) => {
        if (it.gameId === gameId && !it.completed) {
          updated = true;
          return { ...it, completed: true };
        }
        return it;
      });

      const completedCount = newItems.filter((it) => it.completed).length;
      return { ...prev, items: newItems, completedCount };
    });

    // Update Parent Progress Analytics
    setParentStats((prev) => {
      const currentGame = ALL_GAMES.find((g) => g.id === gameId);
      const catKey = (currentGame?.category || 'english') as 'english' | 'maths' | 'logic' | 'science' | 'creative';

      const prevCat = prev.subjectStats?.[catKey] || {
        attempts: 0,
        correct: 0,
        gamesPlayed: 0,
      };

      const updatedSubjectStats = {
        ...(prev.subjectStats || {
          english: { attempts: 0, correct: 0, gamesPlayed: 0 },
          maths: { attempts: 0, correct: 0, gamesPlayed: 0 },
          logic: { attempts: 0, correct: 0, gamesPlayed: 0 },
          science: { attempts: 0, correct: 0, gamesPlayed: 0 },
          creative: { attempts: 0, correct: 0, gamesPlayed: 0 },
        }),
        [catKey]: {
          attempts: prevCat.attempts + 5,
          correct: prevCat.correct + Math.round((5 * accuracy) / 100),
          gamesPlayed: prevCat.gamesPlayed + 1,
        },
      };

      return {
        ...prev,
        timeSpentSeconds: prev.timeSpentSeconds + 120,
        totalAttempts: prev.totalAttempts + 5,
        correctAttempts: prev.correctAttempts + Math.round((5 * accuracy) / 100),
        starsEarned: prev.starsEarned + starsEarned,
        coinsEarned: prev.coinsEarned + coinsEarned,
        gamesCompletedCount: prev.gamesCompletedCount + 1,
        completedGameIds: Array.from(new Set([...prev.completedGameIds, gameId])),
        subjectStats: updatedSubjectStats,
        lastSessionDate: new Date().toISOString(),
      };
    });
  };

  // Claim Daily Mission Bonus
  const handleClaimDailyBonus = () => {
    setUserStars((s) => s + 50);
    setUserCoins((c) => c + 100);
    setDailyMission((prev) => ({ ...prev, bonusClaimed: true }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    setUserStars(0);
    setUserCoins(0);
    setCompletedGameIds([]);
    localStorage.clear();
    setUserProfile(null);
    setIsOnboardingOpen(true);
  };

  // Filter games based on Grade, Category, Search
  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter((game) => {
      const matchesGrade = game.grade === currentGrade;
      const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.objective.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGrade && matchesCategory && matchesSearch;
    });
  }, [currentGrade, activeCategory, searchQuery]);

  // 5 Curated Games for "Today's Adventure"
  const todaysAdventureGames = useMemo(() => {
    const matchingGradeGames = ALL_GAMES.filter((g) => g.grade === currentGrade);
    return matchingGradeGames.slice(0, 5);
  }, [currentGrade]);

  const completedTodayCount = todaysAdventureGames.filter((g) =>
    completedGameIds.includes(g.id)
  ).length;

  // Current Companion details
  const activeCompanion =
    CHARACTER_COMPANIONS.find((c) => c.id === selectedCompanion) || CHARACTER_COMPANIONS[0];

  const currentGradeDetails = GRADE_INFO[currentGrade] || GRADE_INFO.nursery;

  // If onboarding is active and user is not onboarded, show the Onboarding Journey
  if (isOnboardingOpen || !userProfile?.isOnboarded) {
    return (
      <OnboardingJourney
        onComplete={handleCompleteOnboarding}
        initialProfile={userProfile || undefined}
      />
    );
  }

  // If a game is active, render the UniversalGamePlayer
  if (activeGame) {
    const nextGameIndex = ALL_GAMES.findIndex((g) => g.id === activeGame.id) + 1;
    const nextGame = nextGameIndex < ALL_GAMES.length ? ALL_GAMES[nextGameIndex] : undefined;

    return (
      <UniversalGamePlayer
        game={activeGame}
        userStars={userStars}
        userCoins={userCoins}
        onBack={() => {
          soundEngine.playGentlePop();
          setActiveGame(null);
        }}
        onGameFinish={handleGameFinish}
        onNextGame={
          nextGame
            ? () => {
                soundEngine.playCelebration();
                setActiveGame(nextGame);
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className={`min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-300 relative overflow-x-hidden`}>
      {/* Gentle Floating Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-10 text-4xl opacity-20"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-48 right-12 text-5xl opacity-15"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 left-8 text-3xl opacity-25"
        >
          🎈
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-6 text-3xl opacity-25"
        >
          🦋
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* TOP MAIN PERSONALIZED HEADER */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 shadow-sm px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Left: Personalized Greeting & Child Avatar Badge */}
          <div className="flex items-center gap-3">
            {/* Child Profile Button */}
            <motion.button
              id="btn_child_profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundEngine.playGentlePop();
                setIsEditProfileOpen(true);
              }}
              className="flex items-center gap-2.5 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-200 border-2 border-amber-300 hover:border-amber-400 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl shadow-xs cursor-pointer transition-all text-left"
              title="Click to edit child name or change class"
            >
              <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-2xl shadow-sm border border-amber-200">
                {userProfile?.avatarEmoji || '🐰'}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs sm:text-sm text-stone-900 truncate">
                    Hi, {userProfile?.name || 'Explorer'}! 👋
                  </span>
                  <span className="text-[10px] bg-amber-500 text-white font-extrabold px-1.5 py-0.2 rounded-md hidden sm:inline">
                    {currentGradeDetails.icon} {currentGradeDetails.name}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-stone-600 font-semibold truncate hidden xs:block">
                  Ready for today's adventure?
                </p>
              </div>
            </motion.button>
          </div>

          {/* Right: Stats (Stars, Coins, Badges, Sound/Music, Parent Portal) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Daily Mission Pill */}
            <motion.button
              id="btn_daily_mission"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundEngine.playGentlePop();
                setIsDailyMissionOpen(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl font-black text-xs sm:text-sm shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <Flame className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
              <span className="hidden sm:inline">Daily Mission</span>
              <span className="bg-white/30 text-white px-1.5 py-0.2 rounded-full text-xs">
                {dailyMission.completedCount}/5
              </span>
            </motion.button>

            {/* Stars & Coins Counter */}
            <button
              id="btn_rewards"
              onClick={() => {
                soundEngine.playGentlePop();
                setIsRewardsModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl font-black text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{userStars}</span>
              <span className="text-stone-300 hidden sm:inline">|</span>
              <span className="text-amber-800 hidden sm:inline">🪙 {userCoins}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !isMuted;
                setIsMuted(next);
                soundEngine.setMuted(next);
              }}
              className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
              title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            {/* Music Toggle */}
            <button
              onClick={() => {
                const next = !isMusicOn;
                setIsMusicOn(next);
                soundEngine.setMusicEnabled(next);
              }}
              className={`p-2 rounded-2xl border transition-colors cursor-pointer ${
                isMusicOn
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'bg-stone-100 border-stone-300 text-stone-400'
              }`}
              title={isMusicOn ? 'Turn Music OFF' : 'Turn Music ON'}
            >
              <Music className="w-4 h-4" />
            </button>

            {/* Parent / Teacher Dashboard */}
            <button
              id="btn_parent_dashboard"
              onClick={() => {
                soundEngine.playGentlePop();
                setIsParentDashboardOpen(true);
              }}
              className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl font-black text-xs sm:text-sm transition-colors cursor-pointer"
              title="Parent & Teacher Learning Analytics"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline">Parent Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN CONTAINER */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-6 flex-1 flex flex-col gap-6 relative z-10">
        {/* Welcome Back Banner for Returning Child */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <span className="font-extrabold text-xs sm:text-sm text-stone-800">
              Welcome to <span className="text-amber-700 font-black">{currentGradeDetails.worldEmoji} {currentGradeDetails.worldName}</span> ({currentGradeDetails.name})!
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="text-xs font-black text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Change Class / Name</span>
            </button>
          </div>
        </div>

        {/* Grade Level Selector Tabs (Nursery, LKG, UKG, Class 1 & other grades) */}
        <section className="bg-white p-2 sm:p-3 rounded-3xl border-2 border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
              Selected Adventure World:
            </span>
            <span className="text-xs font-bold text-amber-700">
              {currentGradeDetails.tagline}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['nursery', 'lkg', 'ukg', 'class1'] as GradeLevel[]).map((gradeKey) => {
              const info = GRADE_INFO[gradeKey];
              const isSelected = currentGrade === gradeKey;
              const countInGrade = ALL_GAMES.filter((g) => g.grade === gradeKey).length;
              const completedInGrade = ALL_GAMES.filter(
                (g) => g.grade === gradeKey && completedGameIds.includes(g.id)
              ).length;

              return (
                <motion.button
                  key={gradeKey}
                  id={`tab_grade_${gradeKey}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    soundEngine.playGentlePop();
                    setCurrentGrade(gradeKey);
                  }}
                  className={`p-3 rounded-2xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-r ${info.themeGradient} text-white shadow-md ring-4 ring-amber-300/50`
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span className="text-3xl sm:text-4xl shrink-0 drop-shadow">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm sm:text-base truncate">{info.name}</h3>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {info.ageRange}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate font-bold ${
                        isSelected ? 'text-white/95' : 'text-stone-500'
                      }`}
                    >
                      {info.worldEmoji} {info.worldName}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* ⭐ TODAY'S ADVENTURE SECTION (5 Curated Games from Child's Class) */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 rounded-3xl border-3 border-amber-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-200/80 text-amber-950 px-3 py-0.5 rounded-full text-xs font-black mb-1">
                <span>⭐ Daily Quest</span>
                <span>•</span>
                <span>{currentGradeDetails.icon} {currentGradeDetails.name}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                <span>⭐ Today's Adventure</span>
              </h2>
            </div>

            {/* Progress Bar & Counter */}
            <div className="w-full sm:w-64 space-y-1">
              <div className="flex items-center justify-between text-xs font-black text-stone-700">
                <span>Progress:</span>
                <span className="text-amber-800">
                  {completedTodayCount} / 5 completed
                </span>
              </div>
              <div className="w-full h-3.5 bg-stone-200 rounded-full overflow-hidden p-0.5 border border-stone-300">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedTodayCount / 5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* 5 Curated Game Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {todaysAdventureGames.map((game, idx) => {
              const isDone = completedGameIds.includes(game.id);

              return (
                <motion.div
                  key={game.id}
                  id={`today_game_${game.id}`}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white rounded-2xl p-3.5 border-2 flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer ${
                    isDone ? 'border-emerald-300 bg-emerald-50/40' : 'border-amber-200 hover:border-amber-400'
                  }`}
                  onClick={() => {
                    soundEngine.playCelebration();
                    setActiveGame(game);
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Step {idx + 1}
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Done</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-stone-500 uppercase">
                          {game.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 my-2">
                      <span className="text-3xl p-1.5 bg-amber-50 rounded-xl border border-amber-100 shadow-inner">
                        {game.icon}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-black text-xs sm:text-sm text-stone-900 leading-snug line-clamp-1">
                          {game.title}
                        </h4>
                        <span className="text-[10px] font-bold text-amber-700 block truncate">
                          {game.skill}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`mt-2 w-full py-1.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isDone ? 'Play Again' : 'Play'}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Hero Grade Banner & Companion Speech Bubble */}
        <section
          className={`bg-gradient-to-r ${currentGradeDetails.themeGradient} text-white p-5 sm:p-7 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/80`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <span>{currentGradeDetails.icon}</span>
              <span>
                {currentGradeDetails.worldEmoji} {currentGradeDetails.worldName} • 20 Verified Games
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black drop-shadow tracking-tight">
              {currentGradeDetails.tagline}
            </h2>
            <p className="text-white/90 text-xs sm:text-sm mt-2 font-medium">
              Explore interactive games crafted for {currentGradeDetails.ageRange}. Learn phonics, math,
              animals, shapes, colors and science!
            </p>
          </div>

          {/* Interactive Mascot Companion */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundEngine.playCelebration();
              soundEngine.speak(activeCompanion.greeting);
            }}
            className="bg-white/20 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border-2 border-white/40 flex items-center gap-3 text-left shadow-lg shrink-0 cursor-pointer hover:bg-white/30 transition-all max-w-sm"
          >
            <span className="text-4xl sm:text-5xl animate-bounce">{userProfile?.avatarEmoji || activeCompanion.avatar}</span>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-white text-sm">{userProfile?.name || activeCompanion.name}</span>
                <span className="text-xs text-amber-200 font-bold">({currentGradeDetails.name} Explorer)</span>
              </div>
              <p className="text-xs text-white/90 italic mt-0.5">"{activeCompanion.greeting}"</p>
            </div>
          </motion.button>
        </section>

        {/* Filter Controls & Search */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-stone-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All (${filteredGames.length})`, icon: '🌟' },
              { id: 'english', label: 'English & ABC', icon: '🔤' },
              { id: 'maths', label: 'Maths & Numbers', icon: '🔢' },
              { id: 'logic', label: 'Logic & Puzzles', icon: '🧠' },
              { id: 'science', label: 'Science & World', icon: '🌱' },
              { id: 'creative', label: 'Creative & Colors', icon: '🎨' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playGentlePop();
                  setActiveCategory(cat.id as GameCategory);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-48">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games, skills..."
              className="w-full bg-stone-100 text-stone-800 text-xs font-semibold pl-9 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </section>

        {/* 20-Game Grid for Child's Active Grade */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-stone-800 flex items-center gap-2">
              <span>{currentGradeDetails.icon}</span>
              <span>
                {currentGradeDetails.name} Adventure Zone ({filteredGames.length} Activities)
              </span>
            </h3>
            <span className="text-xs font-bold text-stone-500">
              Showing {filteredGames.length} of 20 Games
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGames.map((game) => {
              const isCompleted = completedGameIds.includes(game.id);

              return (
                <motion.div
                  key={game.id}
                  id={`card_game_${game.id}`}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-white rounded-3xl p-5 border-3 transition-all flex flex-col justify-between shadow-sm hover:shadow-md ${
                    isCompleted ? 'border-emerald-300' : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    {/* Card Top: Number, Category & Done Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        #{game.number}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        {game.category}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Done</span>
                        </span>
                      )}
                    </div>

                    {/* Big Icon & Title */}
                    <div className="flex items-center gap-3 my-2">
                      <span className="text-4xl p-2 bg-stone-50 rounded-2xl border border-stone-100 shadow-inner">
                        {game.icon}
                      </span>
                      <div>
                        <h4 className="font-black text-base text-stone-900 leading-tight">
                          {game.title}
                        </h4>
                        <span className="text-[11px] font-bold text-amber-700">
                          {game.difficulty.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Skill & Learning Objective */}
                    <p className="text-xs text-stone-600 mt-2 font-medium line-clamp-2">
                      {game.objective}
                    </p>
                  </div>

                  {/* Play Action Button */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400 truncate max-w-28">
                      {game.skill}
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playCelebration();
                        setActiveGame(game);
                      }}
                      className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Child Safety Footer */}
      <footer className="bg-white border-t-2 border-stone-200 py-6 px-4 text-center text-xs text-stone-500 mt-auto relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-stone-700">
              100% Safe Early Learning • Ad-Free • No Personal Data Collected
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-600 font-medium">
            <span>✨ 80 Accredited Foundation Games</span>
            <span>⭐ Nursery to Class 1</span>
            <span>🎧 Web Audio Procedural Synthesis</span>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MODALS */}
      {/* ============================================================ */}
      <DailyMissionModal
        isOpen={isDailyMissionOpen}
        onClose={() => setIsDailyMissionOpen(false)}
        missionState={dailyMission}
        onSelectGame={(gameId) => {
          const game = ALL_GAMES.find((g) => g.id === gameId);
          if (game) {
            soundEngine.playCelebration();
            setActiveGame(game);
          }
        }}
        onClaimBonus={handleClaimDailyBonus}
      />

      <ParentTeacherDashboard
        isOpen={isParentDashboardOpen}
        onClose={() => setIsParentDashboardOpen(false)}
        stats={parentStats}
        onResetProgress={handleResetProgress}
      />

      <RewardsBadgesModal
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        userStars={userStars}
        userCoins={userCoins}
        selectedCompanion={selectedCompanion}
        onSelectCompanion={(charId) => setSelectedCompanion(charId)}
      />

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-amber-300 text-stone-900 space-y-5"
          >
            <div className="flex items-center justify-between border-b pb-3 border-stone-100">
              <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
                <span>👦</span>
                <span>Edit Child Profile</span>
              </h3>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-stone-600 uppercase mb-1">
                  Child's Name:
                </label>
                <input
                  type="text"
                  defaultValue={userProfile?.name}
                  id="edit_input_child_name"
                  className="w-full text-lg font-black p-3 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-stone-600 uppercase mb-1">
                  Class / Grade:
                </label>
                <select
                  id="edit_select_grade"
                  defaultValue={currentGrade}
                  className="w-full text-base font-black p-3 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-amber-500 focus:outline-none"
                >
                  <option value="nursery">🐣 Nursery (Ages 3–4)</option>
                  <option value="lkg">🐥 LKG (Ages 4–5)</option>
                  <option value="ukg">🦋 UKG (Ages 5–6)</option>
                  <option value="class1">🚀 Class 1 (Ages 6–7)</option>
                  <option value="class2">🏰 Class 2 (Ages 7–8)</option>
                  <option value="class3">🌊 Class 3 (Ages 8–9)</option>
                  <option value="class4">🌋 Class 4 (Ages 9–10)</option>
                  <option value="class5">🌌 Class 5 (Ages 10–11)</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const nameInput = (document.getElementById('edit_input_child_name') as HTMLInputElement)?.value;
                    const gradeSelect = (document.getElementById('edit_select_grade') as HTMLSelectElement)?.value as GradeLevel;
                    if (nameInput?.trim()) {
                      const updated: UserProfile = {
                        name: nameInput.trim(),
                        grade: gradeSelect,
                        avatarEmoji: userProfile?.avatarEmoji || '🐰',
                        isOnboarded: true,
                        streakDays: userProfile?.streakDays || 1,
                        lastVisitDate: new Date().toISOString(),
                      };
                      setUserProfile(updated);
                      setCurrentGrade(gradeSelect);
                      setIsEditProfileOpen(false);
                      soundEngine.playSuccess();
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-base shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Profile
                </button>

                <button
                  onClick={() => {
                    setIsEditProfileOpen(false);
                    setIsOnboardingOpen(true);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Onboarding Tour</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;

