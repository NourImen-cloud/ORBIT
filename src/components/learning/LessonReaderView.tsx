import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  CheckCircle2, 
  Brain, 
  PenTool, 
  Share2, 
  Sparkles,
  Info,
  Lightbulb,
  HelpCircle,
  X,
  Plus,
  Trash2,
  Check
} from 'lucide-react';
import { Lesson, UserProgress, UserNote } from '../../types';
import { addOrUpdateNote } from '../../services/storage';

interface LessonReaderViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onBack: () => void;
  onStartQuiz: (lesson: Lesson) => void;
  onToggleBookmark: (lessonId: string) => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const LessonReaderView: React.FC<LessonReaderViewProps> = ({
  lesson,
  progress,
  onBack,
  onStartQuiz,
  onToggleBookmark,
  onUpdateProgress,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [notesDrawerOpen, setNotesDrawerOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [checkpointSelected, setCheckpointSelected] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Lesson specific notes
  const lessonNotes = progress.notes.filter(n => n.lessonId === lesson.id);
  const isBookmarked = progress.bookmarkedLessonIds.includes(lesson.id);
  const isCompleted = progress.completedLessonIds.includes(lesson.id);

  // Track scroll position for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(100);
        return;
      }
      const current = window.scrollY;
      setScrollProgress(Math.min(100, Math.round((current / totalHeight) * 100)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveNote = () => {
    if (!newNoteText.trim()) return;

    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      levelId: lesson.levelId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: newNoteText.trim(),
      tags: lesson.tags
    };

    const updated = addOrUpdateNote(newNote, progress);
    onUpdateProgress(updated);
    setNewNoteText('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="relative pb-24 animate-fadeIn">
      {/* Top sticky scroll progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-900/50 z-30">
        <div 
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Reader Header & Navigation bar */}
      <div className="max-w-4xl mx-auto pt-4 pb-6 flex items-center justify-between border-b border-slate-800/80 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Learning Path</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotesDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-xs font-mono text-slate-200 transition-all cursor-pointer"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-400" />
            <span>Notes ({lessonNotes.length})</span>
          </button>

          <button
            onClick={() => onToggleBookmark(lesson.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
            className="p-2 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-slate-300 transition-all cursor-pointer"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => onStartQuiz(lesson)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Take Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-3xl mx-auto">
        
        {/* Lesson Metadata Banner */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-3">
            <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              LEVEL {lesson.levelId}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {lesson.readTime}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono">
              {lesson.difficulty}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-emerald-400 font-mono ml-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight mb-4">
            {lesson.title}
          </h1>

          <p className="text-lg text-slate-300 font-sans leading-relaxed border-l-2 border-sky-500 pl-4 py-1 italic">
            {lesson.summary}
          </p>
        </div>

        {/* Hero banner image if present */}
        {lesson.bannerImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative max-h-96">
            <img 
              src={lesson.bannerImage} 
              alt={lesson.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent opacity-60"></div>
          </div>
        )}

        {/* Lesson Content Sections */}
        <div className="space-y-10 text-slate-200 text-base sm:text-lg leading-relaxed font-sans">
          {lesson.content.map((sec, sidx) => (
            <section key={sidx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight pt-2">
                {sec.sectionTitle}
              </h2>

              {sec.paragraphs.map((p, pidx) => (
                <p key={pidx} className="text-slate-300 font-light leading-relaxed">
                  {p}
                </p>
              ))}

              {/* Special Callouts */}
              {sec.callout && (
                <div className={`my-6 rounded-2xl p-5 border ${
                  sec.callout.type === 'formula'
                    ? 'border-indigo-500/40 bg-indigo-950/25'
                    : sec.callout.type === 'tip'
                    ? 'border-emerald-500/40 bg-emerald-950/25'
                    : 'border-sky-500/40 bg-sky-950/25'
                }`}>
                  <div className="flex items-center gap-2 mb-2 font-heading font-semibold text-white text-base">
                    {sec.callout.type === 'formula' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                    {sec.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-400" />}
                    {sec.callout.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
                    <span>{sec.callout.title}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sec.callout.body}
                  </p>

                  {sec.callout.formula && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 font-mono text-cyan-300 text-center text-sm sm:text-base overflow-x-auto">
                      {sec.callout.formula}
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Interactive Mid-Lesson Checkpoint if present */}
        {lesson.checkpoint && (
          <div className="my-12 rounded-3xl border border-sky-500/30 bg-gradient-to-br from-[#0c1836]/90 to-[#081024]/90 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                <HelpCircle className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                Concept Checkpoint
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-4">
              {lesson.checkpoint.question}
            </h3>

            <div className="space-y-2.5 mb-5">
              {lesson.checkpoint.options.map((opt, oidx) => {
                const isSelected = checkpointSelected === oidx;
                const isCorrect = oidx === lesson.checkpoint?.correctIndex;
                let optionStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700';

                if (checkpointSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-sky-500 bg-sky-950/40 text-white';
                }

                return (
                  <div
                    key={oidx}
                    onClick={() => !checkpointSubmitted && setCheckpointSelected(oidx)}
                    className={`p-3.5 rounded-xl border text-sm cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono ${
                        isSelected ? 'border-sky-400 bg-sky-500 text-white' : 'border-slate-600'
                      }`}>
                        {String.fromCharCode(65 + oidx)}
                      </div>
                      <span>{opt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {!checkpointSubmitted ? (
              <button
                disabled={checkpointSelected === null}
                onClick={() => setCheckpointSubmitted(true)}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-all cursor-pointer"
              >
                Verify Understanding
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm">
                {checkpointSelected === lesson.checkpoint.correctIndex ? (
                  <div className="text-emerald-400 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Spot on! You have grasped the principle accurately.</span>
                  </div>
                ) : (
                  <div className="text-amber-300 font-medium">
                    <span>Not quite. Hint: {lesson.checkpoint.hint}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Completion & Next Step Action Card */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-900/40 p-6 sm:p-8 rounded-3xl border">
          <div>
            <h3 className="text-xl font-bold text-white font-heading mb-1">
              Finished Reading?
            </h3>
            <p className="text-slate-400 text-sm">
              Validate your mastery with the end-of-lesson challenge quiz to earn Knowledge XP.
            </p>
          </div>

          <button
            onClick={() => onStartQuiz(lesson)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-cyan-500 hover:opacity-90 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/25 cursor-pointer flex-shrink-0"
          >
            <Brain className="w-4 h-4" />
            <span>Launch Quiz Challenge</span>
          </button>
        </div>

      </article>

      {/* Slide-out Personal Notes Drawer */}
      {notesDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#0a1020] border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-amber-400" />
                  <h3 className="text-lg font-bold text-white font-heading">Personal Study Notes</h3>
                </div>
                <button
                  onClick={() => setNotesDrawerOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Add Note Input */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-mono text-slate-400">Add note for "{lesson.title}"</label>
                <textarea
                  rows={4}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record key formulas, personal thoughts, or exam notes..."
                  className="w-full rounded-xl bg-slate-900 border border-slate-700/80 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-500 resize-none font-sans"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={!newNoteText.trim()}
                  className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Save Note to Notebook</span>
                </button>
                {savedSuccess && (
                  <div className="text-xs text-emerald-400 font-mono text-center flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Note saved into local storage!</span>
                  </div>
                )}
              </div>

              {/* Existing Notes for this lesson */}
              <div className="space-y-3 overflow-y-auto max-h-[45vh] pr-1">
                <div className="text-xs font-mono text-slate-400">Notes for this lesson ({lessonNotes.length})</div>
                {lessonNotes.length === 0 ? (
                  <div className="text-xs text-slate-500 italic p-4 text-center rounded-xl bg-slate-900/40 border border-slate-800/80">
                    No notes recorded for this lesson yet. Write your thoughts above!
                  </div>
                ) : (
                  lessonNotes.map((n) => (
                    <div key={n.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                      <div className="text-[10px] font-mono text-slate-500">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{n.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setNotesDrawerOpen(false)}
              className="w-full py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-mono hover:bg-slate-800 transition-colors"
            >
              Close Notes Drawer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
