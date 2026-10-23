import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { DailyDiscovery, UserProgress, Lesson } from '../../types';
import { dailyDiscoveries } from '../../data/discoveries';
import { courseLevels } from '../../data/courses';

interface DiscoverViewProps {
  progress: UserProgress;
  onToggleBookmarkDiscovery: (id: string) => void;
  onSelectLesson: (lesson: Lesson) => void;
  selectedDiscoveryDetail?: DailyDiscovery | null;
  onCloseDetail?: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  progress,
  onToggleBookmarkDiscovery,
  onSelectLesson,
  selectedDiscoveryDetail: initialDetail,
  onCloseDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDetail, setActiveDetail] = useState<DailyDiscovery | null>(initialDetail || null);

  const categories = ['All', 'Observatories', 'Planetary', 'Astrophysics', 'Deep Space'];

  const filteredDiscoveries = dailyDiscoveries.filter((d) => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.leadParagraph.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (disc: DailyDiscovery) => {
    setActiveDetail(disc);
  };

  const handleCloseDetail = () => {
    setActiveDetail(null);
    onCloseDetail?.();
  };

  // Find related lesson if present
  const relatedLesson = activeDetail?.relatedLessonId
    ? courseLevels.flatMap(l => l.lessons).find(les => les.id === activeDetail.relatedLessonId)
    : null;

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>DAILY CELESTIAL DISCOVERIES & COSMIC ARCHIVE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
          Discover the Cosmos
        </h1>
        <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
          Learn something fascinating in 5–10 minutes. Deep-dive into frontier phenomena—from the cryovolcanoes of Enceladus to black hole event horizons and infrared deep fields.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-sans whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discoveries..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Discovery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDiscoveries.map((disc) => {
          const isBookmarked = progress.bookmarkedDiscoveryIds.includes(disc.id);

          return (
            <div
              key={disc.id}
              className="group rounded-3xl border border-slate-800/90 bg-[#0a1022]/80 hover:bg-[#0e162e] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 shadow-xl"
            >
              <div>
                {/* Image Banner */}
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-5 border border-slate-800 relative bg-slate-900">
                  <img
                    src={disc.imageUrl}
                    alt={disc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-indigo-300">
                    {disc.category}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmarkDiscovery(disc.id);
                    }}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark discovery'}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-indigo-400 transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span>{disc.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {disc.readTime}
                  </span>
                </div>

                <h3 
                  onClick={() => handleOpenDetail(disc)}
                  className="text-xl font-bold text-white font-heading group-hover:text-indigo-300 transition-colors cursor-pointer mb-2 leading-snug"
                >
                  {disc.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                  {disc.subtitle}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  {disc.keyFacts.length} Scientific Metrics
                </span>

                <button
                  onClick={() => handleOpenDetail(disc)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all cursor-pointer"
                >
                  <span>Explore Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discovery Deep Dive Modal */}
      {activeDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-3xl bg-[#091024] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono">
                  {activeDetail.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{activeDetail.readTime}</span>
              </div>
              <button
                onClick={handleCloseDetail}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3">
              {activeDetail.title}
            </h2>
            <p className="text-base text-slate-300 italic mb-6">
              {activeDetail.subtitle}
            </p>

            {/* Image & Caption */}
            <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <img 
                src={activeDetail.imageUrl} 
                alt={activeDetail.title} 
                className="w-full max-h-80 object-cover" 
              />
              <div className="p-3 text-xs text-slate-400 bg-slate-900/90 border-t border-slate-800 font-sans">
                {activeDetail.imageCaption}
              </div>
            </div>

            {/* Key Facts Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              {activeDetail.keyFacts.map((fact, fidx) => (
                <div key={fidx}>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">{fact.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">{fact.value}</div>
                </div>
              ))}
            </div>

            {/* Lead & Deep Dive Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              <p className="text-white font-medium">{activeDetail.leadParagraph}</p>
              {activeDetail.deepDive.map((para, pidx) => (
                <p key={pidx}>{para}</p>
              ))}
            </div>

            {/* Takeaways */}
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 mb-8">
              <div className="text-xs font-mono font-semibold uppercase text-indigo-300 tracking-wider mb-2">
                Key Scientific Takeaways:
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                {activeDetail.takeaways.map((takeaway, tidx) => (
                  <li key={tidx} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Curriculum Lesson Link */}
            {relatedLesson && (
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono text-sky-400">CONNECT TO CURRICULUM</div>
                  <div className="text-sm font-bold text-white">{relatedLesson.title}</div>
                </div>
                <button
                  onClick={() => {
                    handleCloseDetail();
                    onSelectLesson(relatedLesson);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs transition-colors cursor-pointer flex-shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Related Lesson</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
