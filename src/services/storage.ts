import { UserProgress, UserNote, QuizResult, RPGQuest, RPGHabit, RewardShopItem } from '../types';

// Storage key updated to fresh version so any existing browser session begins on Day 1 from scratch
const STORAGE_KEY = 'orbit_user_progress_clean_v3';

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

export const freshStarterQuests: RPGQuest[] = [
  {
    id: 'q-first-lesson',
    title: 'Begin Journey: Read Lesson 1 — What is the Universe?',
    rewardXp: 50,
    rewardGold: 25,
    icon: '⭐',
    category: 'lesson',
    completed: false,
    targetTab: 'learning-path'
  },
  {
    id: 'q-sat-sim',
    title: 'Visit Satellite Lab: Test Orbital Velocity at 400 km LEO',
    rewardXp: 40,
    rewardGold: 20,
    icon: '🛰️',
    category: 'satellite-lab',
    completed: false,
    targetTab: 'satellite-lab'
  },
  {
    id: 'q-jwst-disc',
    title: 'Read Today\'s Discovery: JWST First Deep Field',
    rewardXp: 40,
    rewardGold: 20,
    icon: '🔭',
    category: 'discovery',
    completed: false,
    targetTab: 'discover'
  },
  {
    id: 'q-first-quiz',
    title: 'Test Your Mind: Pass your first lesson quiz challenge',
    rewardXp: 70,
    rewardGold: 40,
    icon: '💎',
    category: 'quiz',
    completed: false,
    targetTab: 'learning-path'
  },
  {
    id: 'q-first-note',
    title: 'Log your first scientific finding in My Universe Notebook',
    rewardXp: 30,
    rewardGold: 15,
    icon: '📜',
    category: 'habit',
    completed: false,
    targetTab: 'my-universe'
  }
];

export const freshStarterHabits: RPGHabit[] = [
  {
    id: 'h-study',
    name: 'Space Science Lesson',
    weekStatus: [false, false, false, false, false, false, false]
  },
  {
    id: 'h-lab',
    name: 'Satellite Lab Simulation',
    weekStatus: [false, false, false, false, false, false, false]
  },
  {
    id: 'h-quiz',
    name: 'Quiz & Concept Recall',
    weekStatus: [false, false, false, false, false, false, false]
  },
  {
    id: 'h-notes',
    name: 'Study Notes & Formulas',
    weekStatus: [false, false, false, false, false, false, false]
  },
  {
    id: 'h-news',
    name: 'Observatory Dispatch Briefing',
    weekStatus: [false, false, false, false, false, false, false]
  }
];

// Completely fresh starter profile for a new user on Day 1
export const freshStarterProgress: UserProgress = {
  completedLessonIds: [],
  inProgressLessonId: 'l1-1',
  bookmarkedLessonIds: [],
  bookmarkedDiscoveryIds: [],
  notes: [],
  quizResults: {},
  learningStreakDays: 1, // Day 1: Starting out
  lastActiveDate: new Date().toISOString().split('T')[0],
  xpPoints: 0,
  playerLevel: 1,
  cosmicGold: 25, // Starting welcome bonus
  hp: 100,
  mp: 100,
  int: 10,
  sta: 50,
  lck: 50,
  playerTitle: 'Space Cadet',
  quests: freshStarterQuests,
  habits: freshStarterHabits,
  unlockedRewardIds: []
};

export function loadProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveProgress(freshStarterProgress);
      return freshStarterProgress;
    }
    const parsed: UserProgress = JSON.parse(data);
    return {
      ...freshStarterProgress,
      ...parsed,
      quests: parsed.quests?.length ? parsed.quests : freshStarterQuests,
      habits: parsed.habits?.length ? parsed.habits : freshStarterHabits,
      unlockedRewardIds: parsed.unlockedRewardIds || []
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return freshStarterProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function resetProgress(): UserProgress {
  const fresh: UserProgress = {
    ...freshStarterProgress,
    quests: freshStarterQuests.map(q => ({ ...q, completed: false })),
    habits: freshStarterHabits.map(h => ({ ...h, weekStatus: [false, false, false, false, false, false, false] }))
  };
  saveProgress(fresh);
  return fresh;
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
    playerLevel: Math.floor((current.xpPoints + xpDelta) / 150) + 1,
    int: Math.min(100, current.int + (nextStatus ? 3 : -3))
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
    habits: updatedHabits,
    sta: Math.min(100, current.sta + 2)
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
  const isFirstTime = !current.completedLessonIds.includes(lessonId);
  const completed = isFirstTime
    ? [...current.completedLessonIds, lessonId]
    : current.completedLessonIds;
    
  const newXp = current.xpPoints + (isFirstTime ? xpEarned : 15);
  const newGold = current.cosmicGold + (isFirstTime ? 35 : 5);

  // Automatically mark the first lesson quest as completed if it's the first lesson
  const updatedQuests = current.quests.map(q => {
    if (q.id === 'q-first-lesson') return { ...q, completed: true };
    return q;
  });

  const updated: UserProgress = {
    ...current,
    completedLessonIds: completed,
    quests: updatedQuests,
    xpPoints: newXp,
    cosmicGold: newGold,
    playerLevel: Math.floor(newXp / 150) + 1,
    int: Math.min(100, current.int + 8)
  };
  saveProgress(updated);
  return updated;
}

export function saveQuizResult(result: QuizResult, current: UserProgress): UserProgress {
  const newXp = current.xpPoints + (result.passed ? 80 : 25);
  const newGold = current.cosmicGold + (result.passed ? 40 : 10);

  // Automatically mark quiz quest as done if passed
  const updatedQuests = current.quests.map(q => {
    if (q.id === 'q-first-quiz' && result.passed) return { ...q, completed: true };
    return q;
  });

  const updated: UserProgress = {
    ...current,
    quizResults: {
      ...current.quizResults,
      [result.lessonId]: result
    },
    quests: updatedQuests,
    xpPoints: newXp,
    cosmicGold: newGold,
    playerLevel: Math.floor(newXp / 150) + 1,
    int: Math.min(100, current.int + (result.passed ? 10 : 2))
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

  // Mark first note quest as done if first note
  const updatedQuests = current.quests.map(q => {
    if (q.id === 'q-first-note') return { ...q, completed: true };
    return q;
  });

  const updated: UserProgress = {
    ...current,
    notes: updatedNotes,
    quests: updatedQuests,
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
