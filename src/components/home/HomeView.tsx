import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  BookOpen, 
  Compass, 
  Satellite, 
  Globe2, 
  Brain, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Radio, 
  ChevronRight,
  Heart,
  Award,
  Shield,
  Gift,
  Scroll,
  Plus,
  Check,
  Calendar as CalendarIcon,
  ShoppingBag,
  Edit2
} from 'lucide-react';
import { TabType, UserProgress, Lesson, DailyDiscovery, RPGQuest, RPGHabit } from '../../types';
import { courseLevels } from '../../data/courses';
import { dailyDiscoveries } from '../../data/discoveries';
import { toggleQuest, toggleHabitDay, saveProgress } from '../../services/storage';

interface HomeViewProps {
  progress: UserProgress;
  onNavigate: (tab: TabType) => void;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectDiscovery: (discovery: DailyDiscovery) => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onNavigate,
  onSelectLesson,
  onSelectDiscovery,
  onUpdateProgress,
}) => {
  const [questTab, setQuestTab] = useState<'today' | 'completed'>('today');
  const [isEditingName, setIsEditingName] = useState(false);
  const [travelerName, setTravelerName] = useState(progress.playerTitle || 'Space Cadet');

  // Next lesson & Today's discovery
  const allLessons = courseLevels.flatMap(lvl => lvl.lessons);
  const nextLesson = allLessons.find(l => !progress.completedLessonIds.includes(l.id)) || allLessons[0];
  const todaysDiscovery = dailyDiscoveries[0];

  // Quests filtering
  const filteredQuests = progress.quests.filter(q => {
    if (questTab === 'completed') return q.completed;
    return !q.completed;
  });

  const handleToggleQuest = (questId: string) => {
    const updated = toggleQuest(questId, progress);
    onUpdateProgress(updated);
    
    const q = updated.quests.find(item => item.id === questId);
    if (q?.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleQuestAction = (quest: RPGQuest) => {
    if (quest.targetTab === 'learning-path') {
      onSelectLesson(nextLesson);
    } else if (quest.targetTab === 'discover') {
      onSelectDiscovery(todaysDiscovery);
    } else if (quest.targetTab) {
      onNavigate(quest.targetTab);
    }
  };

  const handleToggleHabit = (habitId: string, dayIdx: number) => {
    const updated = toggleHabitDay(habitId, dayIdx, progress);
    onUpdateProgress(updated);
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    const updated: UserProgress = {
      ...progress,
      playerTitle: travelerName.trim() || 'Space Cadet'
    };
    saveProgress(updated);
    onUpdateProgress(updated);
  };

  // Calendar dates
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentDay = 15;
  const questDueDays = [4, 8, 15, 22, 29];
  const eventDays = [11, 18, 25];
  const rewardDays = [7, 14, 21, 28];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isBrandNewUser = progress.completedLessonIds.length === 0 && progress.xpPoints === 0;

  return (
    <div className="space-y-12 pb-20 animate-fadeIn">
      
      {/* ======================================================== */}
      {/* 1. TOP RPG HERO HEADER (Matching "GAMIFY YOUR LIFE") */}
      {/* ======================================================== */}
      <div className="text-center pt-2 pb-6 relative">
        
        {/* Subtle decorative stars */}
        <div className="flex items-center justify-center gap-3 text-purple-400 font-pixel text-xs tracking-widest mb-3">
          <span>✦</span>
          <span className="text-[11px] font-silkscreen uppercase tracking-[0.25em] text-purple-300">
            A CELESTIAL RPG PLATFORM
          </span>
          <span>✦</span>
        </div>

        {/* Chunky 3D Retro Pixel Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-pixel text-white tracking-wider font-extrabold uppercase leading-[1.25] drop-shadow-[0_4px_0_#4c1d95] mb-2">
          GAMIFY<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200">
            YOUR ODYSSEY
          </span>
        </h1>

        {/* Subtitle banner */}
        <div className="flex items-center justify-center gap-2 text-purple-300 font-silkscreen text-xs sm:text-sm tracking-wider mb-2">
          <span>✦</span>
          <span className="uppercase text-purple-200 font-bold">ORBIT SPACE LIFE DASHBOARD</span>
          <span>✦</span>
        </div>

        <p className="text-purple-300/80 font-silkscreen text-xs sm:text-sm tracking-wide max-w-xl mx-auto mb-8">
          TURN YOUR SPACE SCIENCE LEARNING INTO AN EPIC RPG QUEST
        </p>

        {/* 5 RPG Category Icons Row (Health, Quests, Rewards, Stats, Level Up) */}
        <div className="flex items-center justify-center gap-4 sm:gap-10 max-w-2xl mx-auto mb-8 overflow-x-auto py-2">
          
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => onNavigate('my-universe')}>
            <div className="w-11 h-11 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-center text-rose-400 text-lg group-hover:scale-110 group-hover:border-rose-400 transition-all shadow-lg shadow-rose-950/50">
              ❤️
            </div>
            <span className="text-[10px] font-pixel text-rose-300 tracking-wider">HEALTH</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => setQuestTab('today')}>
            <div className="w-11 h-11 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-amber-400 text-lg group-hover:scale-110 group-hover:border-amber-400 transition-all shadow-lg shadow-amber-950/50">
              ⭐
            </div>
            <span className="text-[10px] font-pixel text-amber-300 tracking-wider">QUESTS</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => onNavigate('my-universe')}>
            <div className="w-11 h-11 rounded-xl bg-yellow-950/60 border border-yellow-500/50 flex items-center justify-center text-yellow-400 text-lg group-hover:scale-110 group-hover:border-yellow-400 transition-all shadow-lg shadow-yellow-950/50">
              🪙
            </div>
            <span className="text-[10px] font-pixel text-yellow-300 tracking-wider">REWARDS</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => onNavigate('my-universe')}>
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-cyan-400 text-lg group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/50">
              💎
            </div>
            <span className="text-[10px] font-pixel text-cyan-300 tracking-wider">STATS</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 group cursor-pointer" onClick={() => onNavigate('learning-path')}>
            <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-center text-purple-400 text-lg group-hover:scale-110 group-hover:border-purple-400 transition-all shadow-lg shadow-purple-950/50">
              📖
            </div>
            <span className="text-[10px] font-pixel text-purple-300 tracking-wider">LEVEL UP</span>
          </div>

        </div>

        {/* Welcoming Badge */}
        <div className="inline-block rounded-2xl border border-purple-600/40 bg-purple-950/40 p-4 max-w-lg shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-pixel text-xs mb-1">
            <span>✦</span>
            <span>{isBrandNewUser ? 'WELCOME CADET • READY FOR LAUNCH' : 'LEVEL UP YOUR MIND'}</span>
            <span>✦</span>
          </div>
          <p className="text-purple-200 text-xs font-sans leading-relaxed">
            {isBrandNewUser 
              ? 'Your space odyssey starts from scratch on Day 1. Complete quests, master orbital physics, and unlock cosmic ranks!'
              : 'The ultimate cosmic learning dashboard to level up your space habits, missions, and astrophysics knowledge.'}
          </p>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. THE GAMIFIED RETRO DASHBOARD WINDOW */}
      {/* ======================================================== */}
      <div className="rounded-3xl border-2 border-[#4b357f] bg-[#120d24]/95 shadow-[0_20px_50px_rgba(11,8,19,0.95)] p-4 sm:p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden">
        
        {/* Window Top Bar Title */}
        <div className="text-center pb-6 border-b border-[#362758] mb-6">
          <div className="inline-flex items-center gap-2 text-purple-200 font-pixel text-xs sm:text-sm tracking-wider">
            <span>✦</span>
            <span className="text-white">GAMIFY</span>
            <span className="text-purple-400">YOUR ORBIT</span>
            <span>✦</span>
          </div>
          <p className="text-[10px] font-silkscreen text-purple-400 uppercase tracking-widest mt-0.5">
            — NOTION SPACE SCIENCE DASHBOARD —
          </p>
        </div>

        {/* Dashboard 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ---------------------------------------------------- */}
          {/* COLUMN 1: CHARACTER PROFILE CARD (Left) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Character Card Box */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-5 space-y-4 shadow-lg">
              
              {/* Avatar + Level */}
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden bg-purple-900 shadow-md shadow-purple-500/30 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80" 
                    alt="Traveler Avatar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-purple-600/10"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-pixel text-white uppercase truncate">TRAVELER</span>
                    <button 
                      onClick={() => setIsEditingName(!isEditingName)}
                      className="text-purple-400 hover:text-amber-300 p-0.5"
                      title="Edit cadet name"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>

                  {isEditingName ? (
                    <div className="flex items-center gap-1 mt-1">
                      <input
                        type="text"
                        value={travelerName}
                        onChange={(e) => setTravelerName(e.target.value)}
                        className="w-full text-[10px] font-silkscreen bg-purple-950 border border-purple-600 px-1 py-0.5 rounded text-white focus:outline-none"
                      />
                      <button onClick={handleSaveName} className="text-xs text-emerald-400 font-bold">✓</button>
                    </div>
                  ) : (
                    <div className="text-[10px] font-silkscreen text-purple-300 mt-0.5 truncate">
                      Level {progress.playerLevel} {progress.playerTitle}
                    </div>
                  )}
                </div>
              </div>

              {/* XP Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-pixel text-purple-300">
                  <span>XP</span>
                  <span>{progress.xpPoints % 150} / 150 XP</span>
                </div>
                <div className="w-full h-2 bg-purple-950 rounded-full border border-purple-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 transition-all duration-500"
                    style={{ width: `${Math.min(100, ((progress.xpPoints % 150) / 150) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* RPG Attributes Stat List */}
              <div className="space-y-2 pt-2 border-t border-purple-900/60 font-mono text-[11px]">
                
                {/* HP */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-rose-300">
                    <span>❤️</span>
                    <span className="font-pixel text-[9px]">HP</span>
                    <span className="text-[10px] text-purple-400">(Focus)</span>
                  </div>
                  <span className="text-white font-bold">{progress.hp} / 100</span>
                </div>
                <div className="w-full h-1 bg-purple-950 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${progress.hp}%` }}></div>
                </div>

                {/* MP */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-purple-300">
                    <span>🔮</span>
                    <span className="font-pixel text-[9px]">MP</span>
                    <span className="text-[10px] text-purple-400">(Curiosity)</span>
                  </div>
                  <span className="text-white font-bold">{progress.mp} / 100</span>
                </div>
                <div className="w-full h-1 bg-purple-950 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400" style={{ width: `${progress.mp}%` }}></div>
                </div>

                {/* INT */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-cyan-300">
                    <span>🧠</span>
                    <span className="font-pixel text-[9px]">INT</span>
                    <span className="text-[10px] text-purple-400">(Knowledge)</span>
                  </div>
                  <span className="text-white font-bold">{progress.int} / 100</span>
                </div>
                <div className="w-full h-1 bg-purple-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: `${progress.int}%` }}></div>
                </div>

                {/* STA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <span>⚡</span>
                    <span className="font-pixel text-[9px]">STA</span>
                    <span className="text-[10px] text-purple-400">(Streak)</span>
                  </div>
                  <span className="text-white font-bold">{progress.sta} / 100</span>
                </div>
                <div className="w-full h-1 bg-purple-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: `${progress.sta}%` }}></div>
                </div>

                {/* LCK */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <span>🍀</span>
                    <span className="font-pixel text-[9px]">LCK</span>
                    <span className="text-[10px] text-purple-400">(Luck)</span>
                  </div>
                  <span className="text-white font-bold">{progress.lck} / 100</span>
                </div>
                <div className="w-full h-1 bg-purple-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: `${progress.lck}%` }}></div>
                </div>

              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-4 space-y-2">
              <div className="text-[9px] font-pixel uppercase text-purple-400 tracking-wider mb-2">
                QUICK ACTIONS
              </div>

              <button 
                onClick={() => onSelectLesson(nextLesson)}
                className="w-full flex items-center gap-2 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs text-purple-200 transition-colors text-left cursor-pointer"
              >
                <span>🗡️</span>
                <span className="font-silkscreen text-[11px]">
                  {progress.completedLessonIds.length === 0 ? 'Start First Lesson' : 'Resume Quest'}
                </span>
              </button>

              <button 
                onClick={() => onNavigate('satellite-lab')}
                className="w-full flex items-center gap-2 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs text-purple-200 transition-colors text-left cursor-pointer"
              >
                <span>🛰️</span>
                <span className="font-silkscreen text-[11px]">Satellite Lab</span>
              </button>

              <button 
                onClick={() => onNavigate('my-universe')}
                className="w-full flex items-center gap-2 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs text-purple-200 transition-colors text-left cursor-pointer"
              >
                <span>📝</span>
                <span className="font-silkscreen text-[11px]">New Note</span>
              </button>

              <button 
                onClick={() => onNavigate('my-universe')}
                className="w-full flex items-center gap-2 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/60 text-xs text-purple-200 transition-colors text-left cursor-pointer"
              >
                <span>🎁</span>
                <span className="font-silkscreen text-[11px]">Rewards Shop</span>
              </button>
            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* COLUMN 2: TODAY'S QUESTS & HABIT TRACKER (Middle) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* ⚔️ TODAY'S QUESTS BOARD */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-5 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <span>⚔️</span>
                  <h3 className="text-xs font-pixel text-white uppercase tracking-wider">
                    TODAY'S QUESTS
                  </h3>
                </div>

                {/* Sub-tabs: Today / Completed */}
                <div className="flex items-center gap-1 bg-purple-950 p-0.5 rounded-lg border border-purple-800 text-[10px] font-silkscreen">
                  {(['today', 'completed'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setQuestTab(t)}
                      className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                        questTab === t ? 'bg-purple-600 text-white font-bold' : 'text-purple-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quests Checklist */}
              <div className="space-y-2.5">
                {filteredQuests.length === 0 ? (
                  <div className="p-4 text-center rounded-xl bg-purple-950/20 border border-purple-900/50 text-purple-400 text-xs font-silkscreen">
                    {questTab === 'completed' 
                      ? 'NO COMPLETED QUESTS YET. CHECK OFF A TASK TO EARN XP!' 
                      : 'ALL CURRENT QUESTS FINISHED! TAKE A NEW LESSON TO UNLOCK MORE.'}
                  </div>
                ) : (
                  filteredQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        quest.completed
                          ? 'border-purple-900/40 bg-purple-950/20 opacity-60'
                          : 'border-[#3d2a63] bg-[#1d143a]/70 hover:border-purple-500 hover:bg-[#231846]'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Checkbox */}
                        <button
                          onClick={() => handleToggleQuest(quest.id)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                            quest.completed ? 'bg-purple-500 border-purple-400 text-slate-950' : 'border-purple-600 hover:border-purple-400'
                          }`}
                        >
                          {quest.completed && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                        </button>

                        {/* Title - clickable to launch the feature */}
                        <span 
                          onClick={() => handleQuestAction(quest)}
                          className={`text-xs font-sans truncate cursor-pointer hover:underline ${
                            quest.completed ? 'line-through text-purple-400' : 'text-slate-100 font-medium'
                          }`}
                        >
                          {quest.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0 font-mono text-[11px]">
                        <span className="text-amber-300 font-bold">+{quest.rewardXp} XP</span>
                        <span 
                          onClick={() => handleQuestAction(quest)}
                          className="cursor-pointer hover:scale-125 transition-transform" 
                          title="Launch Quest"
                        >
                          {quest.icon}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Lesson recommendation bridge */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectLesson(nextLesson)}
                  className="w-full py-2.5 rounded-xl rpg-button text-white text-xs font-pixel tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>
                    {isBrandNewUser 
                      ? '⚔️ START FIRST LESSON: WHAT IS THE UNIVERSE?' 
                      : '+ RESUME SPACE SCIENCE QUEST'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* ⭐️ HABIT TRACKER MATRIX */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-5 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <span>⭐️</span>
                  <h3 className="text-xs font-pixel text-white uppercase tracking-wider">
                    HABIT TRACKER
                  </h3>
                </div>
                <span className="text-[10px] font-silkscreen text-purple-400">WEEKLY STREAK MATRIX</span>
              </div>

              {/* Table of habits with Mon-Sun */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono">
                  <thead>
                    <tr className="text-purple-400 text-[10px] border-b border-purple-900/40">
                      <th className="text-left py-2 font-normal">HABIT</th>
                      {weekDays.map(d => (
                        <th key={d} className="px-1.5 py-2 font-normal text-center">{d}</th>
                      ))}
                      <th className="text-right py-2 font-normal">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    {progress.habits.map((habit) => {
                      const completedCount = habit.weekStatus.filter(Boolean).length;
                      const pct = Math.round((completedCount / 7) * 100);

                      return (
                        <tr key={habit.id} className="hover:bg-purple-900/20 transition-colors">
                          <td className="py-2.5 text-xs text-purple-200 font-sans font-medium whitespace-nowrap pr-2">
                            {habit.name}
                          </td>
                          {habit.weekStatus.map((done, dayIdx) => (
                            <td key={dayIdx} className="px-1.5 py-2.5 text-center">
                              <button
                                onClick={() => handleToggleHabit(habit.id, dayIdx)}
                                className={`w-4 h-4 rounded-sm border transition-all cursor-pointer ${
                                  done 
                                    ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold' 
                                    : 'border-purple-800 bg-purple-950/40 hover:border-purple-600'
                                }`}
                              >
                                {done ? '✓' : ''}
                              </button>
                            </td>
                          ))}
                          <td className="py-2.5 text-right font-bold text-amber-300 text-[10px]">
                            {pct}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* ---------------------------------------------------- */}
          {/* COLUMN 3: CALENDAR & STATS OVERVIEW (Right) */}
          {/* ---------------------------------------------------- */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 📅 CALENDAR WIDGET */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-5 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <h3 className="text-xs font-pixel text-white uppercase tracking-wider">
                    CALENDAR
                  </h3>
                </div>
                <span className="text-[10px] font-silkscreen text-purple-300">MAY 2026</span>
              </div>

              {/* Mini Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-[10px] text-purple-400 py-1 font-bold">{d}</div>
                ))}

                {daysInMonth.map((d) => {
                  const isToday = d === currentDay;
                  const isQuest = questDueDays.includes(d);
                  const isEvent = eventDays.includes(d);
                  const isReward = rewardDays.includes(d);

                  return (
                    <div
                      key={d}
                      className={`h-7 rounded flex flex-col items-center justify-center relative cursor-pointer text-[11px] transition-colors ${
                        isToday 
                          ? 'bg-purple-600 text-white font-bold ring-1 ring-purple-300' 
                          : 'text-purple-300 hover:bg-purple-900/40'
                      }`}
                    >
                      <span>{d}</span>
                      <div className="flex gap-0.5 absolute bottom-0.5">
                        {isQuest && <span className="w-1 h-1 rounded-full bg-purple-400"></span>}
                        {isEvent && <span className="w-1 h-1 rounded-full bg-amber-400"></span>}
                        {isReward && <span className="w-1 h-1 rounded-full bg-emerald-400"></span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Calendar Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-purple-900/40 text-[9px] font-silkscreen text-purple-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>Quest Due</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>Event</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Reward</span>
                </span>
              </div>

            </div>

            {/* 📊 STATS OVERVIEW & CHARTS */}
            <div className="rounded-2xl border border-[#3b2a60] bg-[#17102e]/80 p-5 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <h3 className="text-xs font-pixel text-white uppercase tracking-wider">
                    STATS OVERVIEW
                  </h3>
                </div>
              </div>

              {/* Total XP & Curve Chart */}
              <div>
                <div className="text-[10px] font-silkscreen text-purple-400 uppercase">Total Knowledge XP</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-pixel text-white drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]">
                    {progress.xpPoints.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-pixel text-emerald-400">
                    {isBrandNewUser ? 'Ready to earn' : `Level ${progress.playerLevel}`}
                  </span>
                </div>

                {/* SVG Curve Chart */}
                <div className="h-14 w-full mt-3">
                  <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={progress.xpPoints === 0 ? "M 0 45 L 200 45 L 200 50 L 0 50 Z" : "M 0 45 Q 30 40, 60 30 T 120 20 T 160 12 T 200 4 L 200 50 L 0 50 Z"}
                      fill="url(#chartGrad)"
                    />
                    <path
                      d={progress.xpPoints === 0 ? "M 0 45 L 200 45" : "M 0 45 Q 30 40, 60 30 T 120 20 T 160 12 T 200 4"}
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                    />
                    <circle cx="200" cy={progress.xpPoints === 0 ? 45 : 4} r="3.5" fill="#fef08a" stroke="#a855f7" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Current Streak & Pixel Mascot Companion */}
              <div className="pt-3 border-t border-purple-900/60 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-silkscreen text-purple-400 uppercase flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span>CURRENT STREAK</span>
                  </div>
                  <div className="text-xl font-pixel text-amber-300 mt-1">
                    {progress.learningStreakDays} <span className="text-xs font-silkscreen text-purple-300">DAY</span>
                  </div>
                  <div className="text-[10px] font-silkscreen text-emerald-400 mt-0.5">
                    {isBrandNewUser ? 'Day 1: Journey Begins!' : 'Keep it up!'}
                  </div>
                </div>

                {/* Cute Pixel Space Mascot */}
                <div className="w-14 h-14 rounded-2xl bg-purple-950/80 border border-purple-700/60 p-2 flex flex-col items-center justify-center text-2xl shadow-inner group">
                  <span className="group-hover:scale-125 transition-transform">🦊</span>
                  <span className="text-[8px] font-pixel text-purple-300">NOVA</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. "WHAT'S INSIDE?" CORE MODULES SHOWCASE */}
      {/* ======================================================== */}
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-purple-400 font-pixel text-xs tracking-widest mb-1">
            <span>✦</span>
            <span>EXPLORE THE REALMS</span>
            <span>✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-pixel text-white uppercase drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]">
            WHAT'S INSIDE ORBIT?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Daily Quests & Learning Path */}
          <div 
            onClick={() => onNavigate('learning-path')}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-purple-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              ⚔️
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-purple-300 transition-colors">
              5-LEVEL QUESTLINE
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Progressive course from cosmic foundations up to satellite engineering, orbital mechanics, and black holes.
            </p>
            <div className="text-[10px] font-silkscreen text-purple-400 flex items-center gap-1 pt-1">
              <span>EXPLORE ALL 5 LEVELS</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 2: Satellite Lab */}
          <div 
            onClick={() => onNavigate('satellite-lab')}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-sky-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🛰️
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-sky-300 transition-colors">
              SATELLITE LAB
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Simulate orbital altitude changes (LEO, MEO, GEO) and inspect spacecraft subsystem schematics interactively.
            </p>
            <div className="text-[10px] font-silkscreen text-sky-400 flex items-center gap-1 pt-1">
              <span>OPEN SATELLITE SIMULATOR</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 3: Interactive Universe */}
          <div 
            onClick={() => onNavigate('interactive-universe')}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-cyan-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🌌
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-cyan-300 transition-colors">
              CELESTIAL ORRERY
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Watch planets orbit the Sun at relative Keplerian speeds, or test launch velocities in the gravity sandbox.
            </p>
            <div className="text-[10px] font-silkscreen text-cyan-400 flex items-center gap-1 pt-1">
              <span>INSPECT ORRERY & SANDBOX</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 4: Daily Discoveries */}
          <div 
            onClick={() => onSelectDiscovery(todaysDiscovery)}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-indigo-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🔭
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-indigo-300 transition-colors">
              TODAY'S DISCOVERY
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Learn something fascinating in 5–10 minutes: JWST infrared deep fields, Enceladus geysers, and M87* shadows.
            </p>
            <div className="text-[10px] font-silkscreen text-indigo-400 flex items-center gap-1 pt-1">
              <span>READ TODAY'S DISPATCH</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 5: Space News & Missions */}
          <div 
            onClick={() => onNavigate('space-news')}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-fuchsia-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-fuchsia-950/80 border border-fuchsia-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📡
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-fuchsia-300 transition-colors">
              MISSION TELEMETRY
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Track live telemetry from Europa Clipper, Artemis, Perseverance, and Voyager 1 heading into interstellar space.
            </p>
            <div className="text-[10px] font-silkscreen text-fuchsia-400 flex items-center gap-1 pt-1">
              <span>VIEW MISSION TELEMETRY</span>
              <span>→</span>
            </div>
          </div>

          {/* Card 6: Character & Notebook */}
          <div 
            onClick={() => onNavigate('my-universe')}
            className="rounded-2xl border border-[#3b2a60] bg-[#140e28]/90 hover:bg-[#1b1336] p-6 space-y-3 transition-all duration-300 hover:border-amber-500 hover:-translate-y-1 shadow-xl cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📜
            </div>
            <h3 className="text-sm font-pixel text-white uppercase group-hover:text-amber-300 transition-colors">
              PLAYER NOTEBOOK
            </h3>
            <p className="text-xs text-purple-300/80 leading-relaxed font-sans">
              Review personal study notes, bookmark archives, quiz history, and spend cosmic gold on custom titles.
            </p>
            <div className="text-[10px] font-silkscreen text-amber-400 flex items-center gap-1 pt-1">
              <span>OPEN CHARACTER SHEET</span>
              <span>→</span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. BOTTOM RPG ADVENTURE FOOTER (Matching the Image) */}
      {/* ======================================================== */}
      <div className="rounded-3xl border border-[#4b357f] bg-gradient-to-r from-[#170e2f] via-[#1f1240] to-[#170e2f] p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-center gap-3 text-amber-300 font-pixel text-xs mb-3">
          <span>✦</span>
          <span>DON'T MISS THE CELESTIAL DROP!</span>
          <span>✦</span>
        </div>

        <h3 className="text-xl sm:text-3xl font-pixel text-white uppercase drop-shadow-[0_2px_4px_rgba(168,85,247,0.6)] mb-3">
          YOUR COSMIC QUEST AWAITS
        </h3>

        <p className="text-xs sm:text-sm font-sans text-purple-300 max-w-lg mx-auto mb-6">
          Every lesson completed upgrades your stats, unlocks cosmic gold, and brings you closer to mastering the laws of the universe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onSelectLesson(nextLesson)}
            className="px-6 py-3 rounded-xl rpg-button text-white font-pixel text-xs tracking-wider cursor-pointer shadow-xl flex items-center gap-2"
          >
            <span>⚔️ EMBARK ON NEXT MISSION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
