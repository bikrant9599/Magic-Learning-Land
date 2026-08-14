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
  SafePlayerProfile,
} from './types';
import { ALL_GAMES, GRADE_INFO } from './data/allGamesData';
import { soundEngine } from './utils/audio';
import {
  loadPlayerProfile,
  savePlayerProfile,
  recordLastPlayedGame,
  recordGameFinish,
  updatePlayerProfileInfo,
  updatePlayerAudioSettings,
  resetPlayerProfileExplicitly,
} from './utils/playerStorage';
import { OnboardingJourney } from './components/OnboardingJourney';
import { UniversalGamePlayer } from './components/UniversalGamePlayer';
import { DailyMissionModal } from './components/DailyMissionModal';
import { ParentTeacherDashboard } from './components/ParentTeacherDashboard';
import { RewardsBadgesModal, CHARACTER_COMPANIONS } from './components/RewardsBadgesModal';
import { ContinueAdventureBanner } from './components/ContinueAdventureBanner';
import { motion, AnimatePresence } from 'motion/react';

export const App: React.FC = () => {
  // Load persistent profile on mount using safe migration engine
  const [profileState, setProfileState] = useState<SafePlayerProfile>(() => {
    const loaded = loadPlayerProfile();
    // Initialize sound engine state
    soundEngine.setMuted(!loaded.settings.sound);
    soundEngine.setMusicEnabled(loaded.settings.music);
    return loaded;
  });

  // Onboarding state: If already onboarded, NEVER ask for class or name again
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    const loaded = loadPlayerProfile();
    return !(loaded.player.isOnboarded && loaded.player.name && loaded.player.name.trim().length > 0);
  });

  // Active Grade Level & Category
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(() => {
    return profileState.player.grade || profileState.progress.currentGrade || 'nursery';
  });

  const [activeCategory, setActiveCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);

  // Audio / Music UI states
  const [isMuted, setIsMuted] = useState(!profileState.settings.sound);
  const [isMusicOn, setIsMusicOn] = useState(profileState.settings.music);

  // Modal Visibilities
  const [isDailyMissionOpen, setIsDailyMissionOpen] = useState(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [showExplicitResetConfirm, setShowExplicitResetConfirm] = useState(false);

  // Sync Audio engine with state
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
    const updated = updatePlayerAudioSettings({ sound: !nextMuted });
    setProfileState(updated);
  };

  const handleToggleMusic = () => {
    const nextMusic = !isMusicOn;
    setIsMusicOn(nextMusic);
    soundEngine.setMusicEnabled(nextMusic);
    const updated = updatePlayerAudioSettings({ music: nextMusic });
    setProfileState(updated);
  };

  // Find remembered last played game
  const lastPlayedGame = useMemo<GameMetadata | null>(() => {
    if (!profileState.progress.lastPlayedGameId) return null;
    return ALL_GAMES.find((g) => g.id === profileState.progress.lastPlayedGameId) || null;
  }, [profileState.progress.lastPlayedGameId]);

  // Current Grade Details
  const currentGradeDetails = GRADE_INFO[currentGrade] || GRADE_INFO.nursery;

  // Active companion
  const activeCompanion = useMemo(() => {
    return (
      CHARACTER_COMPANIONS.find((c) => c.id === profileState.player.selectedCompanion) ||
      CHARACTER_COMPANIONS[0]
    );
  }, [profileState.player.selectedCompanion]);

  // Filtered games for current grade
  const gradeGames = useMemo(() => {
    return ALL_GAMES.filter((g) => g.grade === currentGrade);
  }, [currentGrade]);

  const filteredGames = useMemo(() => {
    return gradeGames.filter((g) => {
      const matchesCat = activeCategory === 'all' || g.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.objective.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [gradeGames, activeCategory, searchQuery]);

  // 5 Curated activities for Today's Adventure
  const todaysAdventureGames = useMemo(() => {
    return gradeGames.slice(0, 5);
  }, [gradeGames]);

  const completedTodayCount = useMemo(() => {
    return todaysAdventureGames.filter((g) => profileState.progress.completedGameIds.includes(g.id)).length;
  }, [todaysAdventureGames, profileState.progress.completedGameIds]);

  // Handle Game Selection / Launch
  const handleLaunchGame = (game: GameMetadata) => {
    soundEngine.playCelebration();
    // Record as last played game in storage
    const updated = recordLastPlayedGame(game.id, game.grade);
    setProfileState(updated);
    setActiveGame(game);
  };

  // Handle Onboarding Completion
  const handleCompleteOnboarding = (newProfile: UserProfile) => {
    const updated = updatePlayerProfileInfo(newProfile.name, newProfile.grade, newProfile.avatarEmoji);
    setProfileState(updated);
    setCurrentGrade(newProfile.grade);
    setIsOnboardingOpen(false);
    soundEngine.speak(`Welcome to ${GRADE_INFO[newProfile.grade].worldName}, ${newProfile.name}!`);
  };

  // Handle Game Finished
  const handleGameFinish = (gameId: string, starsEarned: number, coinsEarned: number, accuracy: number) => {
    const currentGame = ALL_GAMES.find((g) => g.id === gameId);
    const category = currentGame?.category || 'english';
    const updated = recordGameFinish(
      gameId,
      currentGrade,
      starsEarned,
      coinsEarned,
      accuracy,
      category
    );
    setProfileState(updated);
  };

  // Handle Daily Mission Bonus
  const handleClaimDailyBonus = () => {
    soundEngine.playVictoryFanfare();
    const updated = { ...profileState };
    updated.rewards.stars += 10;
    updated.rewards.coins += 50;
    if (updated.dailyMission) {
      updated.dailyMission.bonusClaimed = true;
    }
    savePlayerProfile(updated);
    setProfileState({ ...updated });
  };

  // Handle Companion Selection
  const handleSelectCompanion = (charId: string) => {
    const updated = { ...profileState };
    updated.player.selectedCompanion = charId;
    savePlayerProfile(updated);
    setProfileState({ ...updated });
  };

  // Handle Explicit Progress Reset (Protected by 2-step confirmation)
  const handleConfirmResetProgress = () => {
    const fresh = resetPlayerProfileExplicitly();
    setProfileState(fresh);
    setCurrentGrade(fresh.player.grade);
    setIsOnboardingOpen(true);
    setShowExplicitResetConfirm(false);
    setIsParentDashboardOpen(false);
    setIsEditProfileOpen(false);
    soundEngine.playSuccess();
  };

  // Handle Continue Adventure button click
  const handleContinueAdventure = () => {
    // Find first uncompleted game in today's adventure, or first game of current grade
    const nextGame = todaysAdventureGames.find(
      (g) => !profileState.progress.completedGameIds.includes(g.id)
    ) || todaysAdventureGames[0] || gradeGames[0];

    if (nextGame) {
      handleLaunchGame(nextGame);
    }
  };

  // If currently in a game, show Universal Game Player
  if (activeGame) {
    return (
      <UniversalGamePlayer
        game={activeGame}
        userStars={profileState.rewards.stars}
        userCoins={profileState.rewards.coins}
        onBack={() => {
          soundEngine.playGentlePop();
          setActiveGame(null);
        }}
        onGameFinish={handleGameFinish}
        onNextGame={() => {
          const currentIndex = gradeGames.findIndex((g) => g.id === activeGame.id);
          const nextGame = gradeGames[(currentIndex + 1) % gradeGames.length];
          handleLaunchGame(nextGame);
        }}
      />
    );
  }

  // If user is brand new or needs onboarding
  if (isOnboardingOpen) {
    return (
      <OnboardingJourney
        onComplete={handleCompleteOnboarding}
        initialProfile={{
          name: profileState.player.name,
          grade: profileState.player.grade,
          avatarEmoji: profileState.player.avatarEmoji,
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans select-none antialiased">
      {/* ============================================================ */}
      {/* TOP HEADER & CONTROLS BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-stone-200 shadow-xs px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* App Brand */}
          <div className="flex items-center gap-2 text-stone-800">
            <span className="text-2xl">✨</span>
            <div className="flex flex-col">
              <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                Magic Learning Land
              </span>
              <span className="text-[10px] font-bold text-stone-500 hidden sm:block">
                Curriculum Adventure • Nursery to Class 5
              </span>
            </div>
          </div>

          {/* Right Side: Daily Quest, Audio Controls & Parent Portal */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Daily Mission Button */}
            <button
              id="btn_daily_mission"
              onClick={() => {
                soundEngine.playGentlePop();
                setIsDailyMissionOpen(true);
              }}
              className="relative flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl font-black text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Flame className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="hidden sm:inline">Daily Quest</span>
              <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {completedTodayCount}/5
              </span>
            </button>

            {/* Mute Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-2xl border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-rose-100 border-rose-300 text-rose-700'
                  : 'bg-stone-100 border-stone-300 text-stone-700'
              }`}
              title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Background Music Toggle */}
            <button
              onClick={handleToggleMusic}
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
              className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-300 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl font-black text-xs sm:text-sm transition-colors cursor-pointer"
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
        {/* ============================================================ */}
        {/* 🌟 PERSISTENT HERO: CONTINUE ADVENTURE & WELCOME BACK */}
        {/* ============================================================ */}
        <ContinueAdventureBanner
          childName={profileState.player.name}
          avatarEmoji={profileState.player.avatarEmoji}
          grade={currentGrade}
          stars={profileState.rewards.stars}
          badgesCount={profileState.rewards.badges.length}
          completedGamesCount={profileState.progress.completedGameIds.length}
          streakDays={profileState.player.streakDays}
          lastPlayedGame={lastPlayedGame}
          onContinueAdventure={handleContinueAdventure}
          onContinueLastPlayed={(game) => handleLaunchGame(game)}
          onChangeClassOrName={() => setIsEditProfileOpen(true)}
        />

        {/* ============================================================ */}
        {/* GRADE SELECTOR TABS (NURSERY TO CLASS 5 - 8 WORLDS) */}
        {/* ============================================================ */}
        <section className="bg-white p-2.5 sm:p-4 rounded-3xl border-2 border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
              Explore All 8 Learning Worlds (Nursery – Class 5):
            </span>
            <span className="text-xs font-bold text-amber-700 hidden sm:inline">
              {currentGradeDetails.tagline}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
            {(['nursery', 'lkg', 'ukg', 'class1', 'class2', 'class3', 'class4', 'class5'] as GradeLevel[]).map((gradeKey) => {
              const info = GRADE_INFO[gradeKey];
              const isSelected = currentGrade === gradeKey;

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
                  className={`p-2.5 sm:p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-r ${info.themeGradient} text-white shadow-md ring-4 ring-amber-300/50`
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl shrink-0 drop-shadow">{info.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-black text-xs sm:text-sm truncate">{info.name}</h3>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md shrink-0 ${
                          isSelected ? 'bg-white/30 text-white' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {info.ageRange}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] sm:text-xs truncate font-bold ${
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
              const isDone = profileState.progress.completedGameIds.includes(game.id);

              return (
                <motion.div
                  key={game.id}
                  id={`today_game_${game.id}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`bg-white rounded-2xl p-3.5 border-2 shadow-xs flex flex-col justify-between transition-all ${
                    isDone ? 'border-emerald-300 bg-emerald-50/40' : 'border-amber-200 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        Activity #{idx + 1}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Done</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 my-2">
                      <span className="text-3xl p-1.5 bg-stone-50 rounded-xl border border-stone-200">
                        {game.icon}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-black text-xs text-stone-900 truncate">{game.title}</h4>
                        <span className="text-[10px] font-bold text-stone-500 truncate block">
                          {game.skill}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchGame(game)}
                    className={`mt-2 w-full py-1.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isDone ? 'Play Again' : 'Start Quest'}</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
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
              const isCompleted = profileState.progress.completedGameIds.includes(game.id);

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
                      onClick={() => handleLaunchGame(game)}
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
              100% Safe Early Learning • Ad-Free • Private On-Device Persistence
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-600 font-medium">
            <span>✨ 160 Accredited Curriculum Games</span>
            <span>⭐ Nursery to Class 5</span>
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
        missionState={profileState.dailyMission}
        onSelectGame={(gameId) => {
          const game = ALL_GAMES.find((g) => g.id === gameId);
          if (game) {
            handleLaunchGame(game);
          }
        }}
        onClaimBonus={handleClaimDailyBonus}
      />

      <ParentTeacherDashboard
        isOpen={isParentDashboardOpen}
        onClose={() => setIsParentDashboardOpen(false)}
        stats={profileState.performance}
        onResetProgress={() => setShowExplicitResetConfirm(true)}
      />

      <RewardsBadgesModal
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        userStars={profileState.rewards.stars}
        userCoins={profileState.rewards.coins}
        selectedCompanion={profileState.player.selectedCompanion}
        onSelectCompanion={handleSelectCompanion}
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
                  defaultValue={profileState.player.name}
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
                  <option value="nursery">🐣 Nursery (Ages 3–4) • Baby Farm</option>
                  <option value="lkg">🐥 LKG (Ages 4–5) • Rainbow Village</option>
                  <option value="ukg">🦋 UKG (Ages 5–6) • Learning Forest</option>
                  <option value="class1">🚀 Class 1 (Ages 6–7) • Space Academy</option>
                  <option value="class2">🌟 Class 2 (Ages 7–8) • Dinosaur Valley</option>
                  <option value="class3">🏆 Class 3 (Ages 8–9) • Discovery Island</option>
                  <option value="class4">🧠 Class 4 (Ages 9–10) • Science City</option>
                  <option value="class5">👑 Class 5 (Ages 10–11) • Knowledge Kingdom</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const nameInput = (document.getElementById('edit_input_child_name') as HTMLInputElement)?.value;
                    const gradeSelect = (document.getElementById('edit_select_grade') as HTMLSelectElement)?.value as GradeLevel;
                    if (nameInput?.trim()) {
                      const updated = updatePlayerProfileInfo(nameInput.trim(), gradeSelect);
                      setProfileState(updated);
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

                <button
                  onClick={() => {
                    setIsEditProfileOpen(false);
                    setShowExplicitResetConfirm(true);
                  }}
                  className="w-full py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer"
                >
                  Reset Records / Fresh Start...
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Explicit Reset Confirmation Dialog (Never accidental) */}
      {showExplicitResetConfirm && (
        <div className="fixed inset-0 z-60 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-4 border-rose-400 text-center space-y-4">
            <span className="text-4xl">⚠️</span>
            <h4 className="text-lg font-black text-stone-900">
              Are you sure you want to reset this player's progress?
            </h4>
            <p className="text-xs text-stone-600 font-medium">
              This will reset stars, coins, and completed games back to the beginning. This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="btn_cancel_reset"
                onClick={() => setShowExplicitResetConfirm(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn_confirm_reset_progress"
                onClick={handleConfirmResetProgress}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer shadow-md"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
