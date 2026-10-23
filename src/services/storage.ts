import { UserProgress, UserNote, QuizResult, RPGQuest, RPGHabit, RewardShopItem } from '../types';

const STORAGE_KEY = 'orbit_user_progress_rpg_v2';

export const defaultShopItems: RewardShopItem[] = [
  {
    id: 'title-astronavigator',
    title: 'Title: Grand Astronavigator',
    cost: 150,
    icon: '👑',
    desc: 'Display the legendary badge of an explorer who charted uncharted planetary orbits.',
    category: 'title'
  },
  {
    id: 'title-lagrange',
    title: 'Title: Lagrange Pathfinder',
    cost: 180,
    icon: '🌌',
    desc: 'Honors mastery of gravitational equilibrium points and space observatories.',
    category: 'title'
  },
  {
    id: 'badge-singularity',
    title: 'Relic: Singularity Golden Core',
    cost: 250,
    icon: '🪐',
    desc: 'A shimmering relic forged inside a virtual event horizon calculation.',
    category: 'badge'
  },
  {
    id: 'badge-orbital-ace',
    title: 'Medal: 1st Class Orbit Engineer',
    cost: 220,
    icon: '🛰️',
    desc: 'Awarded for precision orbital insertion in the Satellite Laboratory.',
    category: 'badge'
  },
  {
    id: 'lore-deep-space',
    title: 'Archive: Classified Voyager Logs',
    cost: 200,
    icon: '📜',
    desc: 'Decoded transmission telemetry and historical scientific diaries from the interstellar void.',
    category: 'lore'
  }
];

const defaultQuests: RPGQuest[] = [
  {
    id: 'q-orbit-lesson',
    title: 'Study Newton\'s Orbital Cannon (Lesson 1.4)',
    rewardXp: 60,
    rewardGold: 35,
    icon: '⭐',
    category: 'lesson',
    completed: true,
    targetTab: 'learning-path'
  },
  {
    id: 'q-sat-sim',
    title: 'Run Satellite Orbit Simulator at 35,786 km GEO',
    rewardXp: 40,
    rewardGold: 25,
    icon: '🛰️',
    category: 'satellite-lab',
    completed: false,
    targetTab: 'satellite-lab'
  },
  {
    id: 'q-jwst-disc',
    title: 'Read Today\'s JWST First Deep Field Discovery',
    rewardXp: 50,
    rewardGold: 30,
    icon: '🔭',
    category: 'discovery',
    completed: false,
    targetTab: 'discover'
  },
  {
    id: 'q-quiz-ace',
    title: 'Pass a Space Physics Challenge Quiz with 100%',
    rewardXp: 80,
    rewardGold: 50,
    icon: '💎',
    category: 'quiz',
    completed: false,
    targetTab: 'learning-path'
  },
  {
    id: 'q-log-note',
    title: 'Record a key orbital formula in My Universe Notebook',
    rewardXp: 30,
    rewardGold: 20,
    icon: '📜',
    category: 'habit',
    completed: true,
    targetTab: 'my-universe'
  }
];

const defaultHabits: RPGHabit[] = [
  {
    id: 'h-study',
    name: 'Space Science Lesson',
    weekStatus: [true, true, true, true, true, false, false]
  },
  {
    id: 'h-lab',
    name: 'Satellite Lab Simulation',
    weekStatus: [true, true, false, true, true, true, false]
  },
  {
    id: 'h-quiz',
    name: 'Quiz & Knowledge Recall',
    weekStatus: [true, false, true, true, false, true, false]
  },
  {
    id: 'h-notes',
    name: 'Study Notes & Formulas',
    weekStatus: [true, true, true, true, true, true, false]
  },
  {
    id: 'h-news',
    name: 'Observatory News Briefing',
    weekStatus: [true, true, false, false, true, false, false]
  }
];

const defaultProgress: UserProgress = {
  completedLessonIds: ['l1-1'],
  inProgressLessonId: 'l1-2',
  bookmarkedLessonIds: ['l2-3', 'l1-4'],
  bookmarkedDiscoveryIds: ['disc-jwst-deep-field'],
  notes: [
    {
      id: 'note-1',
      lessonId: 'l1-4',
      lessonTitle: 'Gravity and Orbital Motion',
      levelId: 1,
      createdAt: '2026-10-20T14:32:00Z',
      updatedAt: '2026-10-20T14:32:00Z',
      content: 'Remember Newton\'s thought experiment: an orbit is perpetual free-fall forward where the planetary surface curves away at the exact same rate! Orbital speed formula: v = sqrt(GM/r).',
      tags: ['gravity', 'key-formula', 'orbital-mechanics']
    },
    {
      id: 'note-2',
      lessonId: 'l2-4',
      lessonTitle: 'LEO, MEO, and Geostationary Orbit',
      levelId: 2,
      createdAt: '2026-10-22T09:15:00Z',
      updatedAt: '2026-10-22T09:15:00Z',
      content: 'GEO altitude is exactly 35,786 km above Earth equator. Period matches Earth sidereal rotation: 23h 56m 04s. Ground track is a single fixed point.',
      tags: ['telecom', 'GEO', 'altitude']
    }
  ],
  quizResults: {
    'l1-1': {
      lessonId: 'l1-1',
      lessonTitle: 'What is the Universe? Scale and Cosmological Horizons',
      score: 3,
      total: 3,
      passed: true,
      date: '2026-10-19T10:00:00Z'
    }
  },
  learningStreakDays: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xpPoints: 2450,
  // RPG Stats
  playerLevel: 14,
  cosmicGold: 380,
  hp: 85,
  mp: 90,
  int: 82,
  sta: 75,
  lck: 60,
  playerTitle: 'Cadet Astronavigator',
  quests: defaultQuests,
  habits: defaultHabits,
  unlockedRewardIds: ['title-astronavigator']
};

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveProgress(defaultProgress);
      return defaultProgress;
    }
    const parsed: UserProgress = JSON.parse(data);
    return {
      ...defaultProgress,
      ...parsed,
      quests: parsed.quests?.length ? parsed.quests : defaultProgress.quests,
      habits: parsed.habits?.length ? parsed.habits : defaultProgress.habits,
      unlockedRewardIds: parsed.unlockedRewardIds || defaultProgress.unlockedRewardIds
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function toggleQuest(questId: string, current: UserProgress): UserProgress {
  const quest = current.quests.find(q => q.id === questId);
  if (!quest) return current;

  const nextStatus = !quest.completed;
  const xpDelta = nextStatus ? quest.rewardXp : -quest.rewardXp;
  const goldDelta = nextStatus ? quest.rewardGold : -quest.rewardGold;

  const updatedQuests = current.quests.map(q => 
    q.id === questId ? { ...q, completed: nextStatus } : q
  );

  const updated: UserProgress = {
    ...current,
    quests: updatedQuests,
    xpPoints: Math.max(0, current.xpPoints + xpDelta),
    cosmicGold: Math.max(0, current.cosmicGold + goldDelta),
    playerLevel: Math.floor((current.xpPoints + xpDelta) / 200) + 1
  };

  saveProgress(updated);
  return updated;
}

export function toggleHabitDay(habitId: string, dayIdx: number, current: UserProgress): UserProgress {
  const updatedHabits = current.habits.map(h => {
    if (h.id === habitId) {
      const nextStatus = [...h.weekStatus];
      nextStatus[dayIdx] = !nextStatus[dayIdx];
      return { ...h, weekStatus: nextStatus };
    }
    return h;
  });

  const updated: UserProgress = {
    ...current,
    habits: updatedHabits
  };
  saveProgress(updated);
  return updated;
}

export function purchaseReward(item: RewardShopItem, current: UserProgress): UserProgress {
  if (current.cosmicGold < item.cost || current.unlockedRewardIds.includes(item.id)) {
    return current;
  }

  const updated: UserProgress = {
    ...current,
    cosmicGold: current.cosmicGold - item.cost,
    unlockedRewardIds: [...current.unlockedRewardIds, item.id],
    playerTitle: item.category === 'title' ? item.title.replace('Title: ', '') : current.playerTitle
  };

  saveProgress(updated);
  return updated;
}

export function toggleBookmarkLesson(lessonId: string, current: UserProgress): UserProgress {
  const isBookmarked = current.bookmarkedLessonIds.includes(lessonId);
  const updated: UserProgress = {
    ...current,
    bookmarkedLessonIds: isBookmarked
      ? current.bookmarkedLessonIds.filter(id => id !== lessonId)
      : [...current.bookmarkedLessonIds, lessonId]
  };
  saveProgress(updated);
  return updated;
}

export function toggleBookmarkDiscovery(discoveryId: string, current: UserProgress): UserProgress {
  const isBookmarked = current.bookmarkedDiscoveryIds.includes(discoveryId);
  const updated: UserProgress = {
    ...current,
    bookmarkedDiscoveryIds: isBookmarked
      ? current.bookmarkedDiscoveryIds.filter(id => id !== discoveryId)
      : [...current.bookmarkedDiscoveryIds, discoveryId]
  };
  saveProgress(updated);
  return updated;
}

export function markLessonComplete(lessonId: string, current: UserProgress, xpEarned = 100): UserProgress {
  const completed = current.completedLessonIds.includes(lessonId)
    ? current.completedLessonIds
    : [...current.completedLessonIds, lessonId];
    
  const newXp = current.xpPoints + (current.completedLessonIds.includes(lessonId) ? 15 : xpEarned);
  const newGold = current.cosmicGold + 40;

  const updated: UserProgress = {
    ...current,
    completedLessonIds: completed,
    xpPoints: newXp,
    cosmicGold: newGold,
    playerLevel: Math.floor(newXp / 200) + 1,
    int: Math.min(100, current.int + 3)
  };
  saveProgress(updated);
  return updated;
}

export function saveQuizResult(result: QuizResult, current: UserProgress): UserProgress {
  const newXp = current.xpPoints + (result.passed ? 80 : 25);
  const newGold = current.cosmicGold + (result.passed ? 50 : 15);

  const updated: UserProgress = {
    ...current,
    quizResults: {
      ...current.quizResults,
      [result.lessonId]: result
    },
    xpPoints: newXp,
    cosmicGold: newGold,
    playerLevel: Math.floor(newXp / 200) + 1,
    int: Math.min(100, current.int + (result.passed ? 5 : 1))
  };
  saveProgress(updated);
  return updated;
}

export function addOrUpdateNote(note: UserNote, current: UserProgress): UserProgress {
  const existingIdx = current.notes.findIndex(n => n.id === note.id);
  let updatedNotes: UserNote[];
  if (existingIdx >= 0) {
    updatedNotes = [...current.notes];
    updatedNotes[existingIdx] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    updatedNotes = [note, ...current.notes];
  }
  const updated: UserProgress = {
    ...current,
    notes: updatedNotes,
    xpPoints: current.xpPoints + 20,
    cosmicGold: current.cosmicGold + 10
  };
  saveProgress(updated);
  return updated;
}

export function deleteNote(noteId: string, current: UserProgress): UserProgress {
  const updated: UserProgress = {
    ...current,
    notes: current.notes.filter(n => n.id !== noteId)
  };
  saveProgress(updated);
  return updated;
}
