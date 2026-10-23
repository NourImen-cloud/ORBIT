import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Compass, 
  Satellite, 
  Globe2, 
  Radio, 
  User, 
  Flame, 
  Menu, 
  X,
  Volume2,
  VolumeX,
  Sparkles,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { TabType, UserProgress } from '../../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  progress: UserProgress;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  progress,
  isAudioPlaying,
  onToggleAudio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'learning-path', label: 'Quests', icon: BookOpen },
    { id: 'discover', label: 'Codex', icon: Compass },
    { id: 'satellite-lab', label: 'Sat Lab', icon: Satellite },
    { id: 'interactive-universe', label: 'Orrery', icon: Globe2 },
    { id: 'space-news', label: 'Dispatches', icon: Radio },
    { id: 'my-universe', label: 'Character', icon: User },
  ];

  const handleNavClick = (tabId: TabType) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#3b2b5f] bg-[#0d0919]/90 backdrop-blur-md shadow-xl shadow-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo & RPG Title */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Pixel Icon Container */}
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-amber-400 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-purple-500/30">
            <div className="w-full h-full bg-[#130e24] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <span className="font-pixel text-xs text-amber-400 group-hover:rotate-12 transition-transform">
                ✦
              </span>
              <div className="absolute inset-0 bg-purple-500/10 pointer-events-none"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-pixel tracking-wider text-white drop-shadow-[0_2px_4px_rgba(168,85,247,0.6)]">
                ORBIT
              </span>
              <span className="text-[9px] font-pixel px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/50">
                RPG v2.0
              </span>
            </div>
            <p className="text-[10px] font-silkscreen text-purple-300/80 tracking-wider hidden sm:block">
              ✦ SPACE QUEST DASHBOARD ✦
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'learning-path' && currentTab === 'lesson');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-400/60 shadow-[0_0_15px_-3px_rgba(168,85,247,0.4)]'
                    : 'text-purple-300/70 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-purple-400'}`} />
                <span className="font-silkscreen tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right RPG Status HUD & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Level Pill */}
          <div 
            title="Player Level"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-600/50 text-purple-200 text-xs font-pixel"
          >
            <span className="text-amber-400">LVL</span>
            <span className="text-white">{progress.playerLevel}</span>
          </div>

          {/* Cosmic Gold Coins */}
          <div 
            title="Cosmic Gold Coins"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold"
          >
            <span className="text-sm">🪙</span>
            <span>{progress.cosmicGold}</span>
          </div>

          {/* Current Streak */}
          <div 
            title={`${progress.learningStreakDays} Day Cosmic Streak`}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30 animate-pulse" />
            <span>{progress.learningStreakDays}d</span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Mute ambient cosmic synthesizer' : 'Play ambient cosmic synthesizer'}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              isAudioPlaying 
                ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-sm shadow-purple-500/30' 
                : 'bg-purple-950/40 border-purple-900/60 text-purple-400 hover:text-white hover:bg-purple-900/50'
            }`}
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse text-purple-300" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-purple-800 bg-purple-950/60 text-purple-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-900/80 bg-[#0d0919] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'learning-path' && currentTab === 'lesson');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium font-silkscreen transition-colors ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-400/50'
                    : 'text-purple-300/80 hover:bg-purple-900/40'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
