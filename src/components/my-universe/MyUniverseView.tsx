import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  Bookmark, 
  PenTool, 
  Brain, 
  Award, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  Download, 
  Search,
  CheckCircle2,
  Clock,
  BookOpen,
  ShoppingBag,
  Coins,
  Shield,
  Crown
} from 'lucide-react';
import { UserProgress, Lesson, DailyDiscovery, RewardShopItem } from '../../types';
import { courseLevels } from '../../data/courses';
import { dailyDiscoveries } from '../../data/discoveries';
import { deleteNote, purchaseReward, defaultShopItems } from '../../services/storage';

interface MyUniverseViewProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectDiscovery: (discovery: DailyDiscovery) => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const MyUniverseView: React.FC<MyUniverseViewProps> = ({
  progress,
  onSelectLesson,
  onSelectDiscovery,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes' | 'quizzes' | 'badges' | 'shop'>('shop');
  const [noteSearch, setNoteSearch] = useState('');

  const allLessons = courseLevels.flatMap(lvl => lvl.lessons);
  const bookmarkedLessons = allLessons.filter(l => progress.bookmarkedLessonIds.includes(l.id));
  const bookmarkedDiscoveries = dailyDiscoveries.filter(d => progress.bookmarkedDiscoveryIds.includes(d.id));

  const filteredNotes = progress.notes.filter(n => 
    n.content.toLowerCase().includes(noteSearch.toLowerCase()) ||
    n.lessonTitle.toLowerCase().includes(noteSearch.toLowerCase())
  );

  const handleDeleteNote = (noteId: string) => {
    const updated = deleteNote(noteId, progress);
    onUpdateProgress(updated);
  };

  const handleBuyItem = (item: RewardShopItem) => {
    if (progress.cosmicGold < item.cost || progress.unlockedRewardIds.includes(item.id)) return;
    const updated = purchaseReward(item, progress);
    onUpdateProgress(updated);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const exportNotes = () => {
    const content = progress.notes.map(n => 
      `# ${n.lessonTitle} (Level ${n.levelId})\nDate: ${new Date(n.createdAt).toLocaleDateString()}\n\n${n.content}\n\n---\n`
    ).join('\n');

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ORBIT_Study_Notes_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const badges = [
    {
      id: 'pioneer',
      name: 'Cosmic Pioneer',
      desc: 'Completed Level 1: Foundations of Space',
      unlocked: courseLevels[0].lessons.every(l => progress.completedLessonIds.includes(l.id)),
      icon: '🌌'
    },
    {
      id: 'engineer',
      name: 'Orbital Engineer',
      desc: 'Completed Level 2: Satellites and Orbits',
      unlocked: courseLevels[1].lessons.every(l => progress.completedLessonIds.includes(l.id)),
      icon: '🛰️'
    },
    {
      id: 'quiz-ace',
      name: 'Quiz Ace',
      desc: 'Passed at least 2 orbital physics quizzes',
      unlocked: Object.values(progress.quizResults).filter(q => q.passed).length >= 2,
      icon: '🧠'
    },
    {
      id: 'scholar',
      name: 'Cosmic Chronicler',
      desc: 'Recorded 2 or more detailed study notes',
      unlocked: progress.notes.length >= 2,
      icon: '📜'
    }
  ];

  return (
    <div className="space-y-10 pb-20 animate-fadeIn">
      
      {/* Header */}
      <div className="border-b border-purple-900/60 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-600/40 text-purple-300 text-xs font-pixel mb-3">
          <span>✦</span>
          <span>CHARACTER INVENTORY & REWARDS BAZAAR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-pixel text-white uppercase tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(168,85,247,0.5)]">
          My Universe
        </h1>
        <p className="text-purple-300/80 text-sm max-w-3xl leading-relaxed font-sans">
          Your RPG command hub. Spend your hard-earned cosmic gold in the Bazaar, manage study notes, and track your achievements.
        </p>
      </div>

      {/* Top Learning Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#140e28] border border-purple-900/60 shadow-lg">
          <div className="text-[10px] font-silkscreen text-purple-400 uppercase">Knowledge XP</div>
          <div className="text-2xl font-bold font-pixel text-purple-200 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>{progress.xpPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140e28] border border-purple-900/60 shadow-lg">
          <div className="text-[10px] font-silkscreen text-purple-400 uppercase">Cosmic Gold</div>
          <div className="text-2xl font-bold font-pixel text-amber-300 mt-1 flex items-center gap-1.5">
            <span className="text-xl">🪙</span>
            <span>{progress.cosmicGold}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140e28] border border-purple-900/60 shadow-lg">
          <div className="text-[10px] font-silkscreen text-purple-400 uppercase">Cosmic Streak</div>
          <div className="text-2xl font-bold font-pixel text-rose-400 mt-1 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-rose-400" />
            <span>{progress.learningStreakDays}d</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140e28] border border-purple-900/60 shadow-lg">
          <div className="text-[10px] font-silkscreen text-purple-400 uppercase">Current Title</div>
          <div className="text-sm font-bold font-pixel text-amber-300 mt-1.5 truncate">
            {progress.playerTitle}
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-900/60 pb-2 overflow-x-auto">
        {[
          { id: 'shop', label: 'Rewards Shop', icon: ShoppingBag },
          { id: 'bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
          { id: 'notes', label: 'Study Grimoire', icon: PenTool },
          { id: 'quizzes', label: 'Quiz Scorecard', icon: Brain },
          { id: 'badges', label: 'Achievements', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-silkscreen transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-purple-300/80 hover:text-white hover:bg-purple-900/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: REWARDS SHOP */}
      {activeTab === 'shop' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-pixel text-white uppercase">
                COSMIC REWARDS BAZAAR
              </h3>
              <p className="text-xs text-purple-300 font-sans mt-0.5">
                Spend your quest gold to unlock exclusive cosmic titles, relics, and lore archives.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 font-pixel text-xs">
              <span>🪙</span>
              <span>{progress.cosmicGold} Gold Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultShopItems.map((item) => {
              const isUnlocked = progress.unlockedRewardIds.includes(item.id);
              const canAfford = progress.cosmicGold >= item.cost;

              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                    isUnlocked
                      ? 'border-emerald-500/40 bg-[#0f1d18]'
                      : 'border-[#3b2a60] bg-[#140e28] hover:border-purple-500/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-[10px] font-pixel px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        {item.category.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-sm font-pixel text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-purple-300/80 font-sans leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-purple-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1 font-mono font-bold text-amber-300 text-xs">
                      <span>🪙</span>
                      <span>{item.cost} Gold</span>
                    </div>

                    {isUnlocked ? (
                      <span className="text-xs font-pixel text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>OWNED</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBuyItem(item)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-xl text-xs font-pixel tracking-wider transition-all cursor-pointer ${
                          canAfford 
                            ? 'rpg-button text-white' 
                            : 'bg-purple-950/40 border border-purple-900 text-purple-500 cursor-not-allowed opacity-50'
                        }`}
                      >
                        UNLOCK
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Saved Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-8 animate-fadeIn">
          <div>
            <h3 className="text-sm font-pixel text-white uppercase mb-4">
              BOOKMARKED LESSONS ({bookmarkedLessons.length})
            </h3>
            {bookmarkedLessons.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-purple-950/30 border border-purple-900/60 text-purple-300 text-xs font-silkscreen">
                NO LESSONS BOOKMARKED YET.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedLessons.map((les) => (
                  <div
                    key={les.id}
                    onClick={() => onSelectLesson(les)}
                    className="p-5 rounded-2xl border border-[#3b2a60] bg-[#140e28] hover:border-purple-500 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-pixel text-purple-400 mb-1">LEVEL {les.levelId} • {les.readTime}</div>
                      <h4 className="text-sm font-bold text-white font-sans">{les.title}</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-pixel text-white uppercase mb-4">
              BOOKMARKED DISCOVERIES ({bookmarkedDiscoveries.length})
            </h3>
            {bookmarkedDiscoveries.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-purple-950/30 border border-purple-900/60 text-purple-300 text-xs font-silkscreen">
                NO DISCOVERIES BOOKMARKED YET.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarkedDiscoveries.map((disc) => (
                  <div
                    key={disc.id}
                    onClick={() => onSelectDiscovery(disc)}
                    className="p-5 rounded-2xl border border-[#3b2a60] bg-[#140e28] hover:border-purple-500 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-pixel text-indigo-400 mb-1">{disc.category} • {disc.readTime}</div>
                      <h4 className="text-sm font-bold text-white font-sans">{disc.title}</h4>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Study Grimoire / Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#140e28] border border-purple-900 text-xs text-purple-100 placeholder:text-purple-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {progress.notes.length > 0 && (
              <button
                onClick={exportNotes}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950 border border-purple-800 text-purple-200 text-xs font-silkscreen hover:bg-purple-900 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Grimoire (.md)</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="p-6 rounded-2xl bg-[#140e28] border border-[#3b2a60] flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                    <span className="text-amber-300 font-bold">{note.lessonTitle}</span>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-purple-200 leading-relaxed whitespace-pre-wrap font-sans mb-4">
                    {note.content}
                  </p>
                </div>
                <div className="pt-3 border-t border-purple-900/60 flex justify-end">
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-purple-500 hover:text-rose-400 transition-colors p-1"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Quiz Scorecard */}
      {activeTab === 'quizzes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {Object.values(progress.quizResults).map((qr, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#140e28] border border-[#3b2a60] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{qr.lessonTitle}</h4>
                <div className="text-xs font-mono text-purple-400 mt-1">
                  Passed: {new Date(qr.date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-pixel font-bold ${qr.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {qr.score} / {qr.total}
                </div>
                <span className="text-[10px] font-silkscreen px-2 py-0.5 rounded bg-purple-950 text-purple-300">
                  {qr.passed ? 'PASSED' : 'NEEDS PRACTICE'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Achievements */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-6 rounded-2xl border text-center transition-all ${
                b.unlocked
                  ? 'border-amber-500/50 bg-[#1c1238] shadow-lg shadow-purple-950'
                  : 'border-purple-950/60 bg-purple-950/20 opacity-50'
              }`}
            >
              <div className="text-4xl mb-3">{b.icon}</div>
              <h4 className="text-xs font-pixel text-white mb-1">{b.name}</h4>
              <p className="text-xs text-purple-300 leading-relaxed mb-3">{b.desc}</p>
              <span className={`text-[9px] font-pixel px-2 py-0.5 rounded-full ${
                b.unlocked ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-purple-950 text-purple-500'
              }`}>
                {b.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
