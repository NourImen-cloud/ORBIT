export type TabType = 
  | 'home'
  | 'learning-path'
  | 'lesson'
  | 'discover'
  | 'satellite-lab'
  | 'interactive-universe'
  | 'space-news'
  | 'my-universe'
  | 'shop';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonCheckpoint {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

export interface Lesson {
  id: string;
  levelId: number;
  title: string;
  shortDesc: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  bannerImage: string;
  summary: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    callout?: {
      type: 'info' | 'tip' | 'formula' | 'did-you-know';
      title: string;
      body: string;
      formula?: string;
    };
    diagramKey?: string;
  }[];
  checkpoint?: LessonCheckpoint;
  quiz: QuizQuestion[];
  relatedTopicIds?: string[];
}

export interface CourseLevel {
  id: number;
  title: string;
  goal: string;
  description: string;
  badge: string;
  color: string;
  iconName: string;
  lessons: Lesson[];
}

export interface DailyDiscovery {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  category: 'Deep Space' | 'Observatories' | 'Planetary' | 'Astrophysics' | 'Spacecraft';
  readTime: string;
  imageUrl: string;
  imageCaption: string;
  leadParagraph: string;
  keyFacts: { label: string; value: string }[];
  deepDive: string[];
  takeaways: string[];
  relatedLessonId?: string;
}

export interface SatelliteSubsystem {
  id: string;
  name: string;
  shortRole: string;
  description: string;
  specs: { label: string; value: string }[];
  engineeringNotes: string;
  coords: { x: number; y: number };
}

export interface SatellitePreset {
  id: string;
  name: string;
  type: 'LEO' | 'MEO' | 'GEO' | 'HEO';
  altitudeKm: number;
  speedKmh: number;
  periodMinutes: number;
  description: string;
  typicalUses: string[];
  color: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  type: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Dwarf Planet';
  distanceFromSunAU: number;
  diameterKm: number;
  orbitalPeriodDays: number;
  moonsCount: number;
  surfaceTempC: string;
  overview: string;
  keyFeatures: string[];
  color: string;
  sizeRatio: number;
}

export interface SpaceMission {
  id: string;
  name: string;
  agency: string;
  status: 'Active' | 'En Route' | 'Completed' | 'Upcoming';
  target: string;
  launchDate: string;
  summary: string;
  keyDiscoveries: string[];
  image: string;
  metrics: { label: string; value: string }[];
}

export interface SpaceNewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
  impact: string;
  imageUrl: string;
}

export interface UserNote {
  id: string;
  lessonId: string;
  lessonTitle: string;
  levelId: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  tags?: string[];
}

export interface QuizResult {
  lessonId: string;
  lessonTitle: string;
  score: number;
  total: number;
  passed: boolean;
  date: string;
}

export interface RPGQuest {
  id: string;
  title: string;
  rewardXp: number;
  rewardGold: number;
  icon: string;
  category: 'lesson' | 'satellite-lab' | 'discovery' | 'quiz' | 'habit';
  completed: boolean;
  targetTab?: TabType;
}

export interface RPGHabit {
  id: string;
  name: string;
  weekStatus: boolean[]; // Mon to Sun [true, true, ...]
}

export interface RewardShopItem {
  id: string;
  title: string;
  cost: number;
  icon: string;
  desc: string;
  category: 'title' | 'badge' | 'lore';
}

export interface UserProgress {
  completedLessonIds: string[];
  inProgressLessonId: string | null;
  bookmarkedLessonIds: string[];
  bookmarkedDiscoveryIds: string[];
  notes: UserNote[];
  quizResults: Record<string, QuizResult>;
  learningStreakDays: number;
  lastActiveDate: string;
  xpPoints: number;
  // Gamified RPG Stats
  playerLevel: number;
  cosmicGold: number;
  hp: number; // Health / Focus (0-100)
  mp: number; // Mana / Cosmic Motivation (0-100)
  int: number; // Intelligence (0-100)
  sta: number; // Stamina (0-100)
  lck: number; // Cosmic Luck (0-100)
  playerTitle: string;
  quests: RPGQuest[];
  habits: RPGHabit[];
  unlockedRewardIds: string[];
}
