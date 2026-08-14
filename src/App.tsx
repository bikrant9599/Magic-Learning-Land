import React, { useState, useEffect } from 'react';
import { GameModule, Badge } from './types';
import { INITIAL_BADGES } from './data/gameData';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { ColorsModule } from './components/ColorsModule';
import { ShapesModule } from './components/ShapesModule';
import { SoundsModule } from './components/SoundsModule';
import { CountingModule } from './components/CountingModule';
import { BadgesRoom } from './components/BadgesRoom';

const STORAGE_KEY = 'magic_learning_land_v1';

export default function App() {
  const [currentModule, setCurrentModule] = useState<GameModule>('home');
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return typeof parsed.stars === 'number' ? parsed.stars : 0;
      }
    } catch {}
    return 0;
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

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  // Sync state to local storage
  useEffect(() => {
    try {
      const unlockedIds = badges.filter((b) => b.unlocked).map((b) => b.id);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          stars,
          unlockedBadges: unlockedIds,
        })
      );
    } catch {}
  }, [stars, badges]);

  // Handle Earning Stars and evaluating badges
  const handleEarnStar = (count = 1, category?: string) => {
    sound.playStar();
    const newStarCount = stars + count;
    setStars(newStarCount);

    // Evaluate badges to unlock
    setBadges((prevBadges) =>
      prevBadges.map((badge) => {
        if (badge.unlocked) return badge;

        // Auto unlock based on star milestones or specific categories
        if (newStarCount >= badge.requiredStars) {
          if (!category || badge.category === category || badge.category === 'special') {
            return { ...badge, unlocked: true };
          }
        }
        return badge;
      })
    );
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
      sound.speak('Voice helper is on!');
    }
  };

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col selection:bg-amber-200">
      {/* Universal Kid-Friendly Header */}
      <Header
        currentModule={currentModule}
        onNavigate={setCurrentModule}
        stars={stars}
        unlockedBadgesCount={unlockedBadgesCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        voiceEnabled={voiceEnabled}
        onToggleVoice={handleToggleVoice}
      />

      {/* Main Game Screen Routing */}
      <main className="flex-1">
        {currentModule === 'home' && (
          <HomeScreen
            onSelectModule={setCurrentModule}
            stars={stars}
            unlockedBadgesCount={unlockedBadgesCount}
            totalBadgesCount={badges.length}
          />
        )}

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

        {currentModule === 'badges' && (
          <BadgesRoom
            badges={badges}
            stars={stars}
            onNavigateHome={() => setCurrentModule('home')}
          />
        )}
      </main>
    </div>
  );
}
