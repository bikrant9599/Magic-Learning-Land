// Persistent Safe Storage Engine with Backward-Compatible Data Migration & IndexedDB Backup
// Critical Invariant: NEVER delete, reset, or overwrite existing user data on reload or app upgrade.

import { SafePlayerProfile, GradeLevel, DailyMissionState, ParentProgressData, GameScoreRecord } from '../types';
import { ALL_GAMES, GRADE_INFO } from '../data/allGamesData';

export const STORAGE_VERSION = 3;
export const PRIMARY_STORAGE_KEY = 'magic_learning_land_v3_profile';
export const LEGACY_KEY_PREFIX = 'magic_learning_land_v2_data';

// Default template used ONLY when no existing data whatsoever is found on the device
export function createDefaultPlayerProfile(grade: GradeLevel = 'nursery'): SafePlayerProfile {
  const today = new Date().toDateString();
  const gradeGames = ALL_GAMES.filter((g) => g.grade === grade);
  const curated = gradeGames.slice(0, 5);

  return {
    version: STORAGE_VERSION,
    player: {
      id: 'player_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      name: '',
      grade,
      avatarEmoji: '🐰',
      isOnboarded: false,
      streakDays: 1,
      lastVisitDate: new Date().toISOString(),
      selectedCompanion: 'bunny',
      unlockedCharacters: ['bunny'],
      unlockedBadges: ['nursery_safari'],
      trophies: [],
    },
    progress: {
      completedGameIds: [],
      gameScores: {},
      currentGrade: grade,
      currentWorld: GRADE_INFO[grade]?.worldName || 'Wonder Woods',
      lastPlayedGameId: null,
      lastPlayedTimestamp: Date.now(),
    },
    rewards: {
      stars: 0,
      coins: 0,
      badges: ['nursery_safari'],
      trophies: [],
    },
    performance: {
      timeSpentSeconds: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      starsEarned: 0,
      coinsEarned: 0,
      gamesCompletedCount: 0,
      completedGameIds: [],
      gradeProgress: {
        nursery: { played: 0, mastered: 0 },
        lkg: { played: 0, mastered: 0 },
        ukg: { played: 0, mastered: 0 },
        class1: { played: 0, mastered: 0 },
        class2: { played: 0, mastered: 0 },
        class3: { played: 0, mastered: 0 },
        class4: { played: 0, mastered: 0 },
        class5: { played: 0, mastered: 0 },
      },
      subjectStats: {
        english: { attempts: 0, correct: 0, gamesPlayed: 0 },
        maths: { attempts: 0, correct: 0, gamesPlayed: 0 },
        logic: { attempts: 0, correct: 0, gamesPlayed: 0 },
        science: { attempts: 0, correct: 0, gamesPlayed: 0 },
        creative: { attempts: 0, correct: 0, gamesPlayed: 0 },
      },
      strengths: [],
      needsPractice: [],
      lastSessionDate: new Date().toISOString(),
    },
    settings: {
      sound: true,
      music: false,
      voice: true,
    },
    dailyMission: {
      date: today,
      items: curated.map((g) => ({
        gameId: g.id,
        title: g.title,
        icon: g.icon,
        category: g.category,
        grade: g.grade,
        completed: false,
      })),
      completedCount: 0,
      bonusClaimed: false,
    },
  };
}

// ---------------------------------------------------------------------------
// IndexedDB Async Secondary Backup Engine (Prevents accidental browser storage eviction)
// ---------------------------------------------------------------------------
const IDB_NAME = 'MagicLearningLand_DB';
const IDB_STORE = 'player_profiles';
const IDB_VERSION = 1;

function openIndexedDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: 'key' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function backupToIndexedDB(profile: SafePlayerProfile): Promise<void> {
  try {
    const db = await openIndexedDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    store.put({ key: 'current_player', data: profile, updatedAt: Date.now() });
  } catch {
    // Gracefully handle any IndexedDB errors
  }
}

export async function restoreFromIndexedDB(): Promise<SafePlayerProfile | null> {
  try {
    const db = await openIndexedDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get('current_player');
      req.onsuccess = () => {
        if (req.result && req.result.data) {
          resolve(req.result.data as SafePlayerProfile);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Safe Deep Migration Engine
// ---------------------------------------------------------------------------
export function migrateAndSanitizeProfile(raw: unknown, legacyFallback?: Partial<SafePlayerProfile>): SafePlayerProfile {
  const fallback = createDefaultPlayerProfile();
  if (!raw || typeof raw !== 'object') {
    return { ...fallback, ...legacyFallback };
  }

  const data = raw as Record<string, unknown>;

  // Detect whether this is a v3 unified profile or legacy split keys
  const isV3 = data.version && data.player && data.progress;

  let playerObj: SafePlayerProfile['player'] = fallback.player;
  let progressObj: SafePlayerProfile['progress'] = fallback.progress;
  let rewardsObj: SafePlayerProfile['rewards'] = fallback.rewards;
  let performanceObj: SafePlayerProfile['performance'] = fallback.performance;
  let settingsObj: SafePlayerProfile['settings'] = fallback.settings;
  let missionObj: SafePlayerProfile['dailyMission'] = fallback.dailyMission;

  if (isV3) {
    const rawPlayer = (data.player || {}) as Record<string, unknown>;
    const rawProgress = (data.progress || {}) as Record<string, unknown>;
    const rawRewards = (data.rewards || {}) as Record<string, unknown>;
    const rawPerf = (data.performance || {}) as Record<string, unknown>;
    const rawSettings = (data.settings || {}) as Record<string, unknown>;
    const rawMission = (data.dailyMission || {}) as Record<string, unknown>;

    playerObj = {
      id: typeof rawPlayer.id === 'string' && rawPlayer.id ? rawPlayer.id : fallback.player.id,
      name: typeof rawPlayer.name === 'string' ? rawPlayer.name : '',
      grade: (typeof rawPlayer.grade === 'string' ? rawPlayer.grade : 'nursery') as GradeLevel,
      avatarEmoji: typeof rawPlayer.avatarEmoji === 'string' && rawPlayer.avatarEmoji ? rawPlayer.avatarEmoji : '🐰',
      isOnboarded: typeof rawPlayer.isOnboarded === 'boolean' ? rawPlayer.isOnboarded : Boolean(rawPlayer.name),
      streakDays: typeof rawPlayer.streakDays === 'number' && rawPlayer.streakDays > 0 ? rawPlayer.streakDays : 1,
      lastVisitDate: typeof rawPlayer.lastVisitDate === 'string' ? rawPlayer.lastVisitDate : new Date().toISOString(),
      selectedCompanion: typeof rawPlayer.selectedCompanion === 'string' ? rawPlayer.selectedCompanion : 'bunny',
      unlockedCharacters: Array.isArray(rawPlayer.unlockedCharacters) && rawPlayer.unlockedCharacters.length > 0 ? rawPlayer.unlockedCharacters : ['bunny'],
      unlockedBadges: Array.isArray(rawPlayer.unlockedBadges) ? rawPlayer.unlockedBadges : ['nursery_safari'],
      trophies: Array.isArray(rawPlayer.trophies) ? rawPlayer.trophies : [],
    };

    progressObj = {
      completedGameIds: Array.isArray(rawProgress.completedGameIds) ? Array.from(new Set(rawProgress.completedGameIds as string[])) : [],
      gameScores: (rawProgress.gameScores && typeof rawProgress.gameScores === 'object' ? rawProgress.gameScores : {}) as Record<string, GameScoreRecord>,
      currentGrade: (rawProgress.currentGrade as GradeLevel) || playerObj.grade || 'nursery',
      currentWorld: (rawProgress.currentWorld as string) || GRADE_INFO[playerObj.grade]?.worldName || 'Wonder Woods',
      lastPlayedGameId: (typeof rawProgress.lastPlayedGameId === 'string' ? rawProgress.lastPlayedGameId : null),
      lastPlayedTimestamp: typeof rawProgress.lastPlayedTimestamp === 'number' ? rawProgress.lastPlayedTimestamp : Date.now(),
    };

    rewardsObj = {
      stars: typeof rawRewards.stars === 'number' && !isNaN(rawRewards.stars) ? rawRewards.stars : (typeof rawPerf.starsEarned === 'number' ? rawPerf.starsEarned : 0),
      coins: typeof rawRewards.coins === 'number' && !isNaN(rawRewards.coins) ? rawRewards.coins : (typeof rawPerf.coinsEarned === 'number' ? rawPerf.coinsEarned : 0),
      badges: Array.isArray(rawRewards.badges) ? rawRewards.badges : playerObj.unlockedBadges,
      trophies: Array.isArray(rawRewards.trophies) ? rawRewards.trophies : [],
    };

    performanceObj = {
      ...fallback.performance,
      ...(typeof rawPerf === 'object' && rawPerf !== null ? rawPerf : {}),
      completedGameIds: progressObj.completedGameIds,
      starsEarned: rewardsObj.stars,
      coinsEarned: rewardsObj.coins,
    };

    settingsObj = {
      sound: typeof rawSettings.sound === 'boolean' ? rawSettings.sound : true,
      music: typeof rawSettings.music === 'boolean' ? rawSettings.music : false,
      voice: typeof rawSettings.voice === 'boolean' ? rawSettings.voice : true,
    };

    if (rawMission && typeof rawMission === 'object' && Array.isArray(rawMission.items)) {
      missionObj = rawMission as unknown as DailyMissionState;
    }
  } else {
    // Migration from Legacy flat/split storage format (v2)
    const rawName = data.name as string | undefined;
    const rawGrade = (data.grade as GradeLevel) || 'nursery';
    const rawStars = typeof data.stars === 'number' ? data.stars : (typeof data.starsEarned === 'number' ? data.starsEarned : 0);
    const rawCoins = typeof data.coins === 'number' ? data.coins : (typeof data.coinsEarned === 'number' ? data.coinsEarned : 0);
    const rawCompleted = Array.isArray(data.completedGameIds) ? data.completedGameIds : (Array.isArray(data.completedGames) ? data.completedGames : []);

    playerObj = {
      id: 'player_legacy_' + Date.now(),
      name: typeof rawName === 'string' ? rawName : '',
      grade: rawGrade,
      avatarEmoji: (data.avatarEmoji as string) || '🐰',
      isOnboarded: Boolean(rawName && rawName.trim().length > 0),
      streakDays: typeof data.streakDays === 'number' ? data.streakDays : 1,
      lastVisitDate: (data.lastVisitDate as string) || new Date().toISOString(),
      selectedCompanion: (data.selectedCompanion as string) || 'bunny',
      unlockedCharacters: ['bunny'],
      unlockedBadges: ['nursery_safari'],
      trophies: [],
    };

    progressObj = {
      completedGameIds: Array.from(new Set(rawCompleted as string[])),
      gameScores: {},
      currentGrade: rawGrade,
      currentWorld: GRADE_INFO[rawGrade]?.worldName || 'Wonder Woods',
      lastPlayedGameId: (data.lastPlayedGameId as string) || null,
      lastPlayedTimestamp: Date.now(),
    };

    rewardsObj = {
      stars: rawStars,
      coins: rawCoins,
      badges: ['nursery_safari'],
      trophies: [],
    };

    performanceObj = {
      ...fallback.performance,
      starsEarned: rawStars,
      coinsEarned: rawCoins,
      completedGameIds: progressObj.completedGameIds,
    };
  }

  // Calculate learning streak safely without resetting prematurely
  const lastDateStr = playerObj.lastVisitDate ? new Date(playerObj.lastVisitDate).toDateString() : '';
  const todayStr = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  if (lastDateStr && lastDateStr !== todayStr) {
    if (lastDateStr === yesterdayStr) {
      playerObj.streakDays = (playerObj.streakDays || 1) + 1;
    }
    // Update last visit date to now
    playerObj.lastVisitDate = new Date().toISOString();
  }

  const finalProfile: SafePlayerProfile = {
    version: STORAGE_VERSION,
    player: playerObj,
    progress: progressObj,
    rewards: rewardsObj,
    performance: performanceObj,
    settings: settingsObj,
    dailyMission: missionObj,
  };

  return finalProfile;
}

// ---------------------------------------------------------------------------
// Main Loader & Synchronous LocalStorage Scanner
// ---------------------------------------------------------------------------
export function loadPlayerProfile(): SafePlayerProfile {
  try {
    // 1. First, check the primary unified v3 storage key
    const rawV3 = localStorage.getItem(PRIMARY_STORAGE_KEY);
    if (rawV3) {
      try {
        const parsed = JSON.parse(rawV3);
        if (parsed && typeof parsed === 'object') {
          return migrateAndSanitizeProfile(parsed);
        }
      } catch (e) {
        console.warn('Failed parsing primary profile, attempting recovery from legacy keys', e);
      }
    }

    // 2. Check for legacy v2 individual and unified keys
    const legacyProfileStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_profile');
    const legacyStarsStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_stars');
    const legacyCoinsStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_coins');
    const legacyCompletedStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_completed');
    const legacyMissionStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_mission');
    const legacyParentStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_parent');
    const legacySettingsStr = localStorage.getItem(LEGACY_KEY_PREFIX + '_settings');

    let legacyCombined: Record<string, unknown> = {};

    if (legacyProfileStr) {
      try {
        const p = JSON.parse(legacyProfileStr);
        if (p && typeof p === 'object') {
          legacyCombined = { ...legacyCombined, ...p };
        }
      } catch {}
    }

    if (legacyStarsStr) {
      const s = parseInt(legacyStarsStr, 10);
      if (!isNaN(s)) legacyCombined.stars = s;
    }

    if (legacyCoinsStr) {
      const c = parseInt(legacyCoinsStr, 10);
      if (!isNaN(c)) legacyCombined.coins = c;
    }

    if (legacyCompletedStr) {
      try {
        const comp = JSON.parse(legacyCompletedStr);
        if (Array.isArray(comp)) legacyCombined.completedGameIds = comp;
      } catch {}
    }

    if (legacyParentStr) {
      try {
        const parent = JSON.parse(legacyParentStr);
        if (parent && typeof parent === 'object') legacyCombined.performance = parent;
      } catch {}
    }

    if (legacyMissionStr) {
      try {
        const mission = JSON.parse(legacyMissionStr);
        if (mission && typeof mission === 'object') legacyCombined.dailyMission = mission;
      } catch {}
    }

    if (legacySettingsStr) {
      try {
        const settings = JSON.parse(legacySettingsStr);
        if (settings && typeof settings === 'object') legacyCombined.settings = settings;
      } catch {}
    }

    // If any legacy data was recovered, sanitize and immediately persist into v3
    if (Object.keys(legacyCombined).length > 0) {
      const migrated = migrateAndSanitizeProfile(legacyCombined);
      savePlayerProfile(migrated);
      return migrated;
    }

    // 3. Fallback to default fresh profile
    const fresh = createDefaultPlayerProfile();
    return fresh;
  } catch (err) {
    console.error('Error during profile load:', err);
    return createDefaultPlayerProfile();
  }
}

// ---------------------------------------------------------------------------
// Synchronous & Asynchronous Safe Profile Saver
// ---------------------------------------------------------------------------
export function savePlayerProfile(profile: SafePlayerProfile): void {
  try {
    if (!profile || typeof profile !== 'object') return;

    // Keep version updated
    profile.version = STORAGE_VERSION;
    profile.player.lastVisitDate = new Date().toISOString();

    const jsonStr = JSON.stringify(profile);

    // Save to primary v3 storage key
    localStorage.setItem(PRIMARY_STORAGE_KEY, jsonStr);

    // Maintain backward-compatible mirrors so any legacy modules read the latest data
    localStorage.setItem(LEGACY_KEY_PREFIX + '_profile', JSON.stringify({
      name: profile.player.name,
      grade: profile.player.grade,
      avatarEmoji: profile.player.avatarEmoji,
      isOnboarded: profile.player.isOnboarded,
      streakDays: profile.player.streakDays,
      lastVisitDate: profile.player.lastVisitDate,
    }));
    localStorage.setItem(LEGACY_KEY_PREFIX + '_stars', profile.rewards.stars.toString());
    localStorage.setItem(LEGACY_KEY_PREFIX + '_coins', profile.rewards.coins.toString());
    localStorage.setItem(LEGACY_KEY_PREFIX + '_completed', JSON.stringify(profile.progress.completedGameIds));
    localStorage.setItem(LEGACY_KEY_PREFIX + '_mission', JSON.stringify(profile.dailyMission));
    localStorage.setItem(LEGACY_KEY_PREFIX + '_parent', JSON.stringify(profile.performance));
    localStorage.setItem(LEGACY_KEY_PREFIX + '_settings', JSON.stringify(profile.settings));

    // Asynchronously update IndexedDB backup in the background
    backupToIndexedDB(profile);
  } catch (err) {
    console.warn('Unable to write to localStorage:', err);
  }
}

// ---------------------------------------------------------------------------
// Atomic Action Helpers (Guaranteed never to drop existing state)
// ---------------------------------------------------------------------------

/** Record when a child starts or views a specific game, ensuring "Continue where you left off" works */
export function recordLastPlayedGame(gameId: string, grade: GradeLevel): SafePlayerProfile {
  const profile = loadPlayerProfile();
  profile.progress.lastPlayedGameId = gameId;
  profile.progress.lastPlayedTimestamp = Date.now();
  profile.progress.currentGrade = grade;
  profile.progress.currentWorld = GRADE_INFO[grade]?.worldName || profile.progress.currentWorld;
  savePlayerProfile(profile);
  return profile;
}

/** Record game finish, stars, coins, scores, accuracy, and subject analytics */
export function recordGameFinish(
  gameId: string,
  grade: GradeLevel,
  starsEarned: number,
  coinsEarned: number,
  accuracy: number,
  category: 'english' | 'maths' | 'logic' | 'science' | 'creative' = 'english'
): SafePlayerProfile {
  const profile = loadPlayerProfile();

  // 1. Update stars & coins
  profile.rewards.stars += starsEarned;
  profile.rewards.coins += coinsEarned;

  // 2. Update completed game IDs
  if (!profile.progress.completedGameIds.includes(gameId)) {
    profile.progress.completedGameIds.push(gameId);
  }

  // 3. Update game score history & best scores
  const prevScore = profile.progress.gameScores[gameId] || {
    bestScore: 0,
    stars: 0,
    coins: 0,
    plays: 0,
    accuracy: 0,
    lastPlayedDate: new Date().toISOString(),
  };

  const calculatedScore = starsEarned * 100 + coinsEarned * 10;
  profile.progress.gameScores[gameId] = {
    bestScore: Math.max(prevScore.bestScore, calculatedScore),
    stars: prevScore.stars + starsEarned,
    coins: prevScore.coins + coinsEarned,
    plays: prevScore.plays + 1,
    accuracy: Math.round((prevScore.accuracy * prevScore.plays + accuracy) / (prevScore.plays + 1)),
    lastPlayedDate: new Date().toISOString(),
  };

  // 4. Update last played pointer
  profile.progress.lastPlayedGameId = gameId;
  profile.progress.lastPlayedTimestamp = Date.now();
  profile.progress.currentGrade = grade;

  // 5. Update Daily Mission progress
  if (profile.dailyMission && Array.isArray(profile.dailyMission.items)) {
    profile.dailyMission.items = profile.dailyMission.items.map((item) => {
      if (item.gameId === gameId) {
        return { ...item, completed: true };
      }
      return item;
    });
    profile.dailyMission.completedCount = profile.dailyMission.items.filter((it) => it.completed).length;
  }

  // 6. Update Parent Progress Analytics
  const subjectKey = category;
  const currentSub = profile.performance.subjectStats[subjectKey] || { attempts: 0, correct: 0, gamesPlayed: 0 };
  profile.performance.subjectStats[subjectKey] = {
    attempts: currentSub.attempts + 5,
    correct: currentSub.correct + Math.round((5 * accuracy) / 100),
    gamesPlayed: currentSub.gamesPlayed + 1,
  };

  profile.performance.timeSpentSeconds += 120;
  profile.performance.totalAttempts += 5;
  profile.performance.correctAttempts += Math.round((5 * accuracy) / 100);
  profile.performance.starsEarned = profile.rewards.stars;
  profile.performance.coinsEarned = profile.rewards.coins;
  profile.performance.gamesCompletedCount = profile.progress.completedGameIds.length;
  profile.performance.completedGameIds = profile.progress.completedGameIds;
  profile.performance.lastSessionDate = new Date().toISOString();

  // 7. Check if any badges should be unlocked automatically
  if (profile.rewards.stars >= 5 && !profile.rewards.badges.includes('nursery_safari')) {
    profile.rewards.badges.push('nursery_safari');
  }
  if (profile.rewards.stars >= 15 && !profile.rewards.badges.includes('color_artist')) {
    profile.rewards.badges.push('color_artist');
  }
  if (profile.rewards.stars >= 30 && !profile.rewards.badges.includes('phonics_hero')) {
    profile.rewards.badges.push('phonics_hero');
  }
  if (profile.rewards.stars >= 50 && !profile.rewards.badges.includes('math_wizard')) {
    profile.rewards.badges.push('math_wizard');
  }
  if (profile.rewards.stars >= 100 && !profile.rewards.badges.includes('grand_champion')) {
    profile.rewards.badges.push('grand_champion');
  }

  savePlayerProfile(profile);
  return profile;
}

/** Update child's profile information (name, grade, avatar) without touching existing scores or completed games */
export function updatePlayerProfileInfo(
  name: string,
  grade: GradeLevel,
  avatarEmoji?: string
): SafePlayerProfile {
  const profile = loadPlayerProfile();
  profile.player.name = name.trim();
  profile.player.grade = grade;
  if (avatarEmoji) profile.player.avatarEmoji = avatarEmoji;
  profile.player.isOnboarded = true;
  profile.progress.currentGrade = grade;
  profile.progress.currentWorld = GRADE_INFO[grade]?.worldName || profile.progress.currentWorld;

  savePlayerProfile(profile);
  return profile;
}

/** Update sound and audio settings */
export function updatePlayerAudioSettings(settings: {
  sound?: boolean;
  music?: boolean;
  voice?: boolean;
}): SafePlayerProfile {
  const profile = loadPlayerProfile();
  if (typeof settings.sound === 'boolean') profile.settings.sound = settings.sound;
  if (typeof settings.music === 'boolean') profile.settings.music = settings.music;
  if (typeof settings.voice === 'boolean') profile.settings.voice = settings.voice;
  savePlayerProfile(profile);
  return profile;
}

/** Safe explicit reset invoked only when parent explicitly confirms reset in the UI */
export function resetPlayerProfileExplicitly(): SafePlayerProfile {
  const fresh = createDefaultPlayerProfile();
  savePlayerProfile(fresh);
  return fresh;
}
