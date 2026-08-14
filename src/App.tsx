import React, { useState, useEffect } from 'react';
import { GameModule, Badge, GradeLevel, CharacterCompanion, ParentProgressData } from './types';
import { INITIAL_BADGES } from './data/gameData';
import { UKG_BADGES, UKG_COMPANIONS } from './data/ukgData';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { ColorsModule } from './components/ColorsModule';
import { ShapesModule } from './components/ShapesModule';
import { SoundsModule } from './components/SoundsModule';
import { CountingModule } from './components/CountingModule';
import { BadgesRoom } from './components/BadgesRoom';
import { UkgAdventureMap } from './components/UkgAdventureMap';
import { ReadingForestModule } from './components/ReadingForestModule';
import { NumberKingdomModule } from './components/NumberKingdomModule';
import { MathMountainModule } from './components/MathMountainModule';
import { PuzzlePlanetModule } from './components/PuzzlePlanetModule';
import { ParentProgressModal } from './components/ParentProgressModal';
import { CharacterSelectModal } from './components/CharacterSelectModal';

const STORAGE_KEY = 'magic_learning_land_ukg_v2';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('ukg');
  const [currentModule, setCurrentModule] = useState<GameModule>('home');
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.stars === 'number' ? parsed.stars : 20;
      }
    } catch {}
    return 20;
  });

  const [coins, setCoins] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.coins === 'number' ? parsed.coins : 15;
      }
    } catch {}
    return 15;
  });

  const [activeCompanion, setActiveCompanion] = useState<CharacterCompanion>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.companionId) {
          const found = UKG_COMPANIONS.find((c) => c.id === parsed.companionId);
          if (found) return found;
        }
      }
    } catch {}
    return UKG_COMPANIONS[0];
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.unlockedBadges)) {
          return INITIAL_BADGES.map((b) => ({
            ...b,
            unlocked: parsed.unlockedBadges.includes(b.id),
          }));
        }
      }
    } catch {}
    return INITIAL_BADGES;
  });

  const [completedWorlds, setCompletedWorlds] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);

  // Modals
  const [isParentModalOpen, setIsParentModalOpen] = useState<boolean>(false);
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState<boolean>(false);

  // Parent Analytics Tracking State
  const [parentProgress, setParentProgress] = useState<ParentProgressData>(() => ({
    totalAttempts: 12,
    correctAttempts: 11,
    timeSpentSeconds: 180,
    worldsMastered: ['reading', 'math_mountain'],
    topicStats: {
      cvc_words: { name: 'CVC Reading', correct: 5, total: 5 },
      addition: { name: 'Visual Addition', correct: 4, total: 4 },
      number_100: { name: 'Numbers 1-100', correct: 2, total: 3 },
    },
  }));

  // Learning Time Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setParentProgress((prev) => ({
        ...prev,
        timeSpentSeconds: prev.timeSpentSeconds + 1,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state to local storage
  useEffect(() => {
    try {
      const unlockedIds = badges.filter((b) => b.unlocked).map((b) => b.id);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stars,
          coins,
          companionId: activeCompanion.id,
          unlockedBadges: unlockedIds,
          completedWorlds,
        })
      );
    } catch {}
  }, [stars, coins, activeCompanion, badges, completedWorlds]);

  // Handle Earning Stars and evaluating badges
  const handleEarnStar = (count = 10, category?: string) => {
    sound.playStar();
    const newStarCount = stars + count;
    setStars(newStarCount);

    setBadges((prevBadges) =>
      prevBadges.map((badge) => {
        if (badge.unlocked) return badge;
        if (newStarCount >= badge.requiredStars) {
          if (!category || badge.category === category || badge.category === 'special') {
            return { ...badge, unlocked: true };
          }
        }
        return badge;
      })
    );
  };

  const handleEarnCoin = (count = 5) => {
    setCoins((prev) => prev + count);
  };

  const handleRecordAttempt = (world: string, isCorrect: boolean) => {
    setParentProgress((prev) => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
      correctAttempts: prev.correctAttempts + (isCorrect ? 1 : 0),
    }));
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setSoundEnabled(nextState);
  };

  const handleToggleVoice = () => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);
    sound.setVoiceEnabled(nextState);
    if (nextState) {
      sound.speak('Voice helper is active!');
    }
  };

  const handleToggleMusic = () => {
    const nextState = !musicEnabled;
    setMusicEnabled(nextState);
    sound.setMusicEnabled(nextState);
    if (nextState) {
      sound.speak('Cheerful adventure music playing!');
    }
  };

  const handleResetProgress = () => {
    setStars(0);
    setCoins(0);
    setCompletedWorlds([]);
    setBadges(INITIAL_BADGES.map((b) => ({ ...b, unlocked: false })));
    setParentProgress({
      totalAttempts: 0,
      correctAttempts: 0,
      timeSpentSeconds: 0,
      worldsMastered: [],
      topicStats: {},
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  const unlockedBadgesCount =
    badges.filter((b) => b.unlocked).length +
    UKG_BADGES.filter((b) => stars >= b.requiredStars).length;
  const totalBadgesCount = badges.length + UKG_BADGES.length;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col selection:bg-amber-200">
      {/* Universal Header with Grade Selector, Audio Controls & Parent Zone */}
      <Header
        currentModule={currentModule}
        onNavigate={setCurrentModule}
        stars={stars}
        coins={coins}
        unlockedBadgesCount={unlockedBadgesCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
        musicEnabled={musicEnabled}
        onToggleMusic={handleToggleMusic}
        selectedGrade={selectedGrade}
        onSelectGrade={(g) => {
          setSelectedGrade(g);
          setCurrentModule('home');
        }}
        onOpenParentProgress={() => setIsParentModalOpen(true)}
      />

      {/* Main Game Screen Routing */}
      <main className="flex-1">
        {/* HOME MAP */}
        {currentModule === 'home' && (
          <>
            {selectedGrade === 'ukg' ? (
              <UkgAdventureMap
                onSelectModule={setCurrentModule}
                stars={stars}
                coins={coins}
                unlockedBadgesCount={unlockedBadgesCount}
                totalBadgesCount={totalBadgesCount}
                activeCompanion={activeCompanion}
                onOpenCharacterSelect={() => setIsCharacterModalOpen(true)}
                onOpenParentProgress={() => setIsParentModalOpen(true)}
                completedWorlds={completedWorlds}
              />
            ) : (
              <HomeScreen
                onSelectModule={setCurrentModule}
                stars={stars}
                unlockedBadgesCount={unlockedBadgesCount}
                totalBadgesCount={totalBadgesCount}
              />
            )}
          </>
        )}

        {/* UKG 1. READING FOREST */}
        {currentModule === 'reading' && (
          <ReadingForestModule
            onEarnStar={handleEarnStar}
            onEarnCoin={handleEarnCoin}
            onNavigateHome={() => setCurrentModule('home')}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {/* UKG 2. NUMBER KINGDOM (1-100) */}
        {currentModule === 'number_kingdom' && (
          <NumberKingdomModule
            onEarnStar={handleEarnStar}
            onEarnCoin={handleEarnCoin}
            onNavigateHome={() => setCurrentModule('home')}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {/* UKG 3. MATH MOUNTAIN (+ & -) */}
        {currentModule === 'math_mountain' && (
          <MathMountainModule
            onEarnStar={handleEarnStar}
            onEarnCoin={handleEarnCoin}
            onNavigateHome={() => setCurrentModule('home')}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {/* UKG 4. PUZZLE PLANET (Logic, Memory, Patterns) */}
        {currentModule === 'puzzle_planet' && (
          <PuzzlePlanetModule
            onEarnStar={handleEarnStar}
            onEarnCoin={handleEarnCoin}
            onNavigateHome={() => setCurrentModule('home')}
            onRecordAttempt={handleRecordAttempt}
          />
        )}

        {/* NURSERY / LKG MODULES */}
        {currentModule === 'colors' && (
          <ColorsModule
            onEarnStar={handleEarnStar}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}

        {currentModule === 'shapes' && (
          <ShapesModule
            onEarnStar={handleEarnStar}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}

        {currentModule === 'sounds' && (
          <SoundsModule
            onEarnStar={handleEarnStar}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}

        {currentModule === 'counting' && (
          <CountingModule
            onEarnStar={handleEarnStar}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}

        {/* BADGES & TROPHY ROOM */}
        {currentModule === 'badges' && (
          <BadgesRoom
            badges={badges}
            stars={stars}
            coins={coins}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}
      </main>

      {/* Parent Progress Modal */}
      <ParentProgressModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        progressData={parentProgress}
        stars={stars}
        coins={coins}
        onResetProgress={handleResetProgress}
      />

      {/* Companion Character Select Modal */}
      <CharacterSelectModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        selectedCompanion={activeCompanion}
        onSelectCompanion={setActiveCompanion}
        stars={stars}
      />
    </div>
  );
}
