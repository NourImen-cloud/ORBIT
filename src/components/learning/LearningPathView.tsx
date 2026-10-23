import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight, 
  Award, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Brain,
  Layers
} from 'lucide-react';
import { CourseLevel, Lesson, UserProgress } from '../../types';
import { courseLevels } from '../../data/courses';

interface LearningPathViewProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleBookmark: (lessonId: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  progress,
  onSelectLesson,
  onToggleBookmark,
}) => {
  // Keep track of collapsed levels; by default open all or first
  const [collapsedLevels, setCollapsedLevels] = useState<Record<number, boolean>>({});

  const toggleLevelCollapse = (levelId: number) => {
    setCollapsedLevels(prev => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>STRUCTURED CURRICULUM • 5 TIERS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
          Your Space-Science Learning Path
        </h1>
        <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
          Follow a carefully sequenced journey designed to take you from the fundamental laws of gravity and light up to orbital mechanics, satellite telemetry, and frontier astrophysics.
        </p>
      </div>

      {/* Levels list */}
      <div className="space-y-8">
        {courseLevels.map((lvl: CourseLevel) => {
          const isCollapsed = collapsedLevels[lvl.id] ?? false;
          const completedInLevel = lvl.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
          const totalInLevel = lvl.lessons.length;
          const levelCompleted = completedInLevel === totalInLevel;

          return (
            <div 
              key={lvl.id}
              className={`rounded-3xl border transition-all duration-300 ${
                levelCompleted 
                  ? 'border-emerald-500/30 bg-[#08171d]/60' 
                  : 'border-slate-800/90 bg-[#080e1c]/80'
              } backdrop-blur-md overflow-hidden shadow-xl`}
            >
              {/* Level Header Banner */}
              <div 
                onClick={() => toggleLevelCollapse(lvl.id)}
                className="p-6 sm:p-8 cursor-pointer border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-xl flex-shrink-0 shadow-lg ${
                    levelCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30'
                  }`}>
                    {lvl.id}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        LEVEL {lvl.id}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        Badge: {lvl.badge}
                      </span>
                      {levelCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-medium">
                          Completed
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      {lvl.title}
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                      <span className="text-sky-300 font-medium">Goal:</span> {lvl.goal}
                    </p>
                  </div>
                </div>

                {/* Right Progress indicator & Collapse toggle */}
                <div className="flex items-center gap-6 self-end md:self-center">
                  <div className="text-right">
                    <div className="text-xs font-mono text-slate-400">Lessons Completed</div>
                    <div className="text-lg font-mono font-bold text-white">
                      {completedInLevel} <span className="text-xs text-slate-500">/ {totalInLevel}</span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Lessons Grid within Level */}
              {!isCollapsed && (
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {lvl.lessons.map((lesson: Lesson, idx: number) => {
                    const isCompleted = progress.completedLessonIds.includes(lesson.id);
                    const isBookmarked = progress.bookmarkedLessonIds.includes(lesson.id);
                    const hasPassedQuiz = !!progress.quizResults[lesson.id]?.passed;

                    return (
                      <div
                        key={lesson.id}
                        className={`group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                          isCompleted
                            ? 'border-slate-800 bg-slate-900/40 hover:border-sky-500/40 hover:bg-slate-900/80'
                            : 'border-slate-800/80 bg-[#091122]/70 hover:border-sky-500/50 hover:bg-[#0c162e]'
                        } hover:-translate-y-1 shadow-md`}
                      >
                        <div>
                          {/* Top Meta */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-mono text-slate-400">
                              {lvl.id}.{idx + 1}
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                              {isCompleted && (
                                <span title="Lesson Completed" className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Done</span>
                                </span>
                              )}
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleBookmark(lesson.id);
                                }}
                                title={isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                                className="p-1 rounded text-slate-400 hover:text-sky-300 transition-colors"
                              >
                                {isBookmarked ? (
                                  <BookmarkCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>

                          <h3 
                            onClick={() => onSelectLesson(lesson)}
                            className="text-base font-bold text-white font-heading group-hover:text-sky-300 transition-colors cursor-pointer mb-2 line-clamp-2"
                          >
                            {lesson.title}
                          </h3>

                          <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                            {lesson.shortDesc}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {lesson.tags.slice(0, 2).map((t, tidx) => (
                              <span key={tidx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {lesson.readTime}
                          </span>

                          <button
                            onClick={() => onSelectLesson(lesson)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-sky-400 group-hover:text-sky-300 transition-colors cursor-pointer"
                          >
                            <span>{isCompleted ? 'Review' : 'Start'}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
