import React, { useState, useEffect } from 'react';
import { TabType, Lesson, DailyDiscovery, UserProgress } from './types';
import { loadProgress, toggleBookmarkLesson, toggleBookmarkDiscovery } from './services/storage';
import { cosmicAudio } from './services/audio';
import { StarfieldCanvas } from './components/common/StarfieldCanvas';
import { Navbar } from './components/common/Navbar';
import { HomeView } from './components/home/HomeView';
import { LearningPathView } from './components/learning/LearningPathView';
import { LessonReaderView } from './components/learning/LessonReaderView';
import { QuizView } from './components/learning/QuizView';
import { DiscoverView } from './components/discover/DiscoverView';
import { SatelliteLabView } from './components/satellite-lab/SatelliteLabView';
import { InteractiveUniverseView } from './components/interactive-universe/InteractiveUniverseView';
import { SpaceNewsView } from './components/news/SpaceNewsView';
import { MyUniverseView } from './components/my-universe/MyUniverseView';
import { courseLevels } from './data/courses';
import { dailyDiscoveries } from './data/discoveries';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseLevels[0].lessons[0]);
  const [quizLesson, setQuizLesson] = useState<Lesson | null>(null);
  const [selectedDiscoveryDetail, setSelectedDiscoveryDetail] = useState<DailyDiscovery | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  // Audio drone toggle
  const handleToggleAudio = () => {
    const playing = cosmicAudio.toggle();
    setIsAudioPlaying(playing);
  };

  // Switch to reading a lesson
  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to a daily discovery
  const handleSelectDiscovery = (discovery: DailyDiscovery) => {
    setSelectedDiscoveryDetail(discovery);
    setCurrentTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle bookmark lesson
  const handleToggleBookmarkLesson = (lessonId: string) => {
    const updated = toggleBookmarkLesson(lessonId, progress);
    setProgress(updated);
  };

  // Toggle bookmark discovery
  const handleToggleBookmarkDiscovery = (discoveryId: string) => {
    const updated = toggleBookmarkDiscovery(discoveryId, progress);
    setProgress(updated);
  };

  // Update progress helper
  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col relative selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Starfield Canvas with Twinkling and Meteors */}
      <StarfieldCanvas />

      {/* Primary Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {currentTab === 'home' && (
          <HomeView
            progress={progress}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectLesson={handleSelectLesson}
            onSelectDiscovery={handleSelectDiscovery}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentTab === 'learning-path' && (
          <LearningPathView
            progress={progress}
            onSelectLesson={handleSelectLesson}
            onToggleBookmark={handleToggleBookmarkLesson}
          />
        )}

        {currentTab === 'lesson' && (
          <LessonReaderView
            lesson={activeLesson}
            progress={progress}
            onBack={() => setCurrentTab('learning-path')}
            onStartQuiz={(lesson) => setQuizLesson(lesson)}
            onToggleBookmark={handleToggleBookmarkLesson}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverView
            progress={progress}
            onToggleBookmarkDiscovery={handleToggleBookmarkDiscovery}
            onSelectLesson={handleSelectLesson}
            selectedDiscoveryDetail={selectedDiscoveryDetail}
            onCloseDetail={() => setSelectedDiscoveryDetail(null)}
          />
        )}

        {currentTab === 'satellite-lab' && (
          <SatelliteLabView />
        )}

        {currentTab === 'interactive-universe' && (
          <InteractiveUniverseView />
        )}

        {currentTab === 'space-news' && (
          <SpaceNewsView />
        )}

        {currentTab === 'my-universe' && (
          <MyUniverseView
            progress={progress}
            onSelectLesson={handleSelectLesson}
            onSelectDiscovery={handleSelectDiscovery}
            onUpdateProgress={handleUpdateProgress}
          />
        )}
      </main>

      {/* Modal Quiz View */}
      {quizLesson && (
        <QuizView
          lesson={quizLesson}
          progress={progress}
          onClose={() => setQuizLesson(null)}
          onUpdateProgress={handleUpdateProgress}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060e]/80 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-300 text-sm">ORBIT</span>
            <span>•</span>
            <span>Explore. Understand. Discover.</span>
          </div>
          <div>
            Celestial Astrophysics & Satellite Systems Platform • Powered by Open Scientific Data
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
