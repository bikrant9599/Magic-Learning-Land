import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  ShieldCheck,
  Volume2,
  VolumeX,
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
} from 'lucide-react';
import {
  GradeLevel,
  GameCategory,
  GameMetadata,
  DailyMissionState,
  ParentProgressData,
} from './types';
import { ALL_GAMES, GRADE_INFO } from './data/allGamesData';
import { soundEngine } from './utils/audio';
import { UniversalGamePlayer } from './components/UniversalGamePlayer';
import { DailyMissionModal } from './components/DailyMissionModal';
import { ParentTeacherDashboard } from './components/ParentTeacherDashboard';
import { RewardsBadgesModal, CHARACTER_COMPANIONS } from './components/RewardsBadgesModal';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY = 'magic_learning_land_v2_data';

export const App: React.FC = () => {
  // Navigation & Game State
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>('nursery');
  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);

  // User Stats & Persistence
  const [userStars, setUserStars] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_stars');
    return saved ? parseInt(saved, 10) : 12;
  });

  const [userCoins, setUserCoins] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_coins');
    return saved ? parseInt(saved, 10) : 60;
  });

  const [completedGameIds, setCompletedGameIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_completed');
    return saved ? JSON.parse(saved) : ['nursery_color_hunt', 'nursery_animal_sound'];
  });

  const [selectedCompanion, setSelectedCompanion] = useState<string>('bunny');
  const [isMuted, setIsMuted] = useState(soundEngine.isMutedState());

  // Modal Visibility
  const [isDailyMissionOpen, setIsDailyMissionOpen] = useState(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);

  // Parent Progress Analytics State
  const [parentStats, setParentStats] = useState<ParentProgressData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_parent');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      timeSpentSeconds: 420,
      totalAttempts: 18,
      correctAttempts: 16,
      starsEarned: 12,
      coinsEarned: 60,
      gamesCompletedCount: 2,
      completedGameIds: ['nursery_color_hunt', 'nursery_animal_sound'],
      gradeProgress: {
        nursery: { played: 2, mastered: 2 },
        lkg: { played: 0, mastered: 0 },
        ukg: { played: 0, mastered: 0 },
        class1: { played: 0, mastered: 0 },
      },
      subjectStats: {
        english: { attempts: 4, correct: 4, gamesPlayed: 1 },
        maths: { attempts: 5, correct: 4, gamesPlayed: 1 },
        logic: { attempts: 3, correct: 3, gamesPlayed: 0 },
        science: { attempts: 4, correct: 4, gamesPlayed: 1 },
        creative: { attempts: 2, correct: 1, gamesPlayed: 1 },
      },
      strengths: ['Auditory Animal Recognition', 'Color Discriminations'],
      needsPractice: ['CVC Word Blending'],
      lastSessionDate: new Date().toISOString(),
    };
  });

  // Daily Mission State (5 curated activities)
  const [dailyMission, setDailyMission] = useState<DailyMissionState>(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_mission');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) return parsed;
      } catch (e) {}
    }

    const curatedGames = [
      ALL_GAMES.find((g) => g.id === 'nursery_animal_sound')!,
      ALL_GAMES.find((g) => g.id === 'nursery_color_hunt')!,
      ALL_GAMES.find((g) => g.id === 'lkg_beginning_sound')!,
      ALL_GAMES.find((g) => g.id === 'ukg_word_builder')!,
      ALL_GAMES.find((g) => g.id === 'class1_shopping_math')!,
    ].filter(Boolean);

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

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY + '_stars', userStars.toString());
    localStorage.setItem(LOCAL_STORAGE_KEY + '_coins', userCoins.toString());
    localStorage.setItem(LOCAL_STORAGE_KEY + '_completed', JSON.stringify(completedGameIds));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_mission', JSON.stringify(dailyMission));
    localStorage.setItem(LOCAL_STORAGE_KEY + '_parent', JSON.stringify(parentStats));
  }, [userStars, userCoins, completedGameIds, dailyMission, parentStats]);

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

  // Current Companion details
  const activeCompanion =
    CHARACTER_COMPANIONS.find((c) => c.id === selectedCompanion) || CHARACTER_COMPANIONS[0];

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

  const currentGradeDetails = GRADE_INFO[currentGrade];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-300">
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => soundEngine.playLetterSound('Magic Learning Land')}
              className="w-11 h-11 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-md border-2 border-white cursor-pointer hover:rotate-6 transition-transform"
            >
              🌈
            </button>
            <div>
              <h1 className="font-black text-lg md:text-xl text-stone-800 tracking-tight flex items-center gap-1.5">
                <span>Magic Learning Land</span>
                <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-black border border-amber-300 hidden sm:inline">
                  80 Games
                </span>
              </h1>
              <p className="text-xs text-stone-500 font-semibold hidden md:block">
                Nursery • LKG • UKG • Class 1 Early Childhood Education
              </p>
            </div>
          </div>

          {/* Action Tools & Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Mission Button */}
            <motion.button
              id="btn_daily_mission"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundEngine.playGentlePop();
                setIsDailyMissionOpen(true);
              }}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3.5 py-2 rounded-2xl font-black text-xs md:text-sm shadow-md cursor-pointer hover:shadow-lg transition-all"
            >
              <Flame className="w-4 h-4 fill-current text-yellow-300 animate-pulse" />
              <span>Daily Mission</span>
              <span className="bg-white/30 text-white px-1.5 py-0.2 rounded-full text-xs ml-0.5">
                {dailyMission.completedCount}/5
              </span>
            </motion.button>

            {/* Rewards & Badges */}
            <button
              id="btn_rewards"
              onClick={() => {
                soundEngine.playGentlePop();
                setIsRewardsModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-2 rounded-2xl font-black text-xs md:text-sm transition-colors cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Rewards</span>
              <span className="text-amber-700">⭐ {userStars}</span>
            </button>

            {/* Parent / Teacher Dashboard */}
            <button
              id="btn_parent_dashboard"
              onClick={() => {
                soundEngine.playGentlePop();
                setIsParentDashboardOpen(true);
              }}
              className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 px-3 py-2 rounded-2xl font-black text-xs md:text-sm transition-colors cursor-pointer"
              title="Parent & Teacher Progress Analytics"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="hidden md:inline">Parent Portal</span>
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => {
                const next = !isMuted;
                setIsMuted(next);
                soundEngine.setMuted(next);
              }}
              className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 flex flex-col gap-6">
        {/* Grade Level Selector Tabs (4 Levels) */}
        <section className="bg-white p-2 rounded-3xl border-2 border-stone-200 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                  className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-r ${info.themeGradient} text-white shadow-md ring-4 ring-amber-300/50`
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span className="text-3xl md:text-4xl shrink-0 drop-shadow">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-sm md:text-base truncate">{info.name}</h3>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {info.ageRange}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate font-medium ${
                        isSelected ? 'text-white/90' : 'text-stone-500'
                      }`}
                    >
                      {completedInGrade}/{countInGrade} Completed
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Hero Grade Banner & Companion Speech Bubble */}
        <section
          className={`bg-gradient-to-r ${currentGradeDetails.themeGradient} text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/80`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <span>{currentGradeDetails.icon}</span>
              <span>
                {currentGradeDetails.name} Adventure Zone • 20 Verified Games
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black drop-shadow tracking-tight">
              {currentGradeDetails.tagline}
            </h2>
            <p className="text-white/90 text-xs md:text-sm mt-2 font-medium">
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
            }}
            className="bg-white/20 backdrop-blur-md p-4 rounded-3xl border-2 border-white/40 flex items-center gap-4 text-left shadow-lg shrink-0 cursor-pointer hover:bg-white/30 transition-all max-w-sm"
          >
            <span className="text-5xl md:text-6xl animate-bounce">{activeCompanion.avatar}</span>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-white text-sm">{activeCompanion.name}</span>
                <span className="text-xs text-amber-200 font-bold">({activeCompanion.title})</span>
              </div>
              <p className="text-xs text-white/90 italic mt-0.5">"{activeCompanion.greeting}"</p>
            </div>
          </motion.button>
        </section>

        {/* Filter Controls & Search */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-stone-200 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All (20)', icon: '🌟' },
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
                    ? 'bg-amber-500 text-white shadow-sm'
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

        {/* 20-Game Grid for Active Grade */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-stone-800 flex items-center gap-2">
              <span>{currentGradeDetails.icon}</span>
              <span>
                {currentGradeDetails.name} Adventures ({filteredGames.length} Activities)
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
                  whileHover={{ y: -4 }}
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
                      className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow-sm transition-transform hover:scale-105 cursor-pointer"
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
      <footer className="bg-white border-t-2 border-stone-200 py-6 px-4 text-center text-xs text-stone-500 mt-auto">
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

      {/* Modals */}
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
    </div>
  );
};

export default App;
