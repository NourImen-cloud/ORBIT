import React, { useState } from 'react';
import { 
  Radio, 
  Satellite, 
  Rocket, 
  Clock, 
  Calendar, 
  Compass, 
  ExternalLink, 
  Sparkles,
  ChevronRight,
  Target
} from 'lucide-react';
import { SpaceMission, SpaceNewsItem } from '../../types';
import { spaceMissions, spaceNews } from '../../data/missions';

export const SpaceNewsView: React.FC = () => {
  const [selectedMission, setSelectedMission] = useState<SpaceMission>(spaceMissions[0]);

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
          <Radio className="w-3.5 h-3.5" />
          <span>REAL-TIME ASTRONOMY & ACTIVE MISSION DISPATCHES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
          Space News & Flagship Missions
        </h1>
        <p className="text-slate-300 text-base max-w-3xl leading-relaxed">
          Stay connected to living space science. Follow deep-space telemetry from humanity's fleet of robotic explorers and follow recent peer-reviewed discoveries from global observatories.
        </p>
      </div>

      {/* Flagship Missions Spotlight Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            <span>Active Deep-Space Flagships</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{spaceMissions.length} Tracked Craft</span>
        </div>

        {/* Mission Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
          {spaceMissions.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMission(m)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                selectedMission.id === m.id
                  ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                m.status === 'Active' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}></span>
              <span>{m.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Mission Detailed Showcase Card */}
        <div className="rounded-3xl border border-slate-800 bg-[#091024]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                {selectedMission.status}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800">
                Agency: {selectedMission.agency}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Target: {selectedMission.target}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              {selectedMission.name}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedMission.summary}
            </p>

            {/* Key Discoveries */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                Historic Mission Milestones & Discoveries:
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                {selectedMission.keyDiscoveries.map((disc, didx) => (
                  <li key={didx} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{disc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Metrics & Image */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 relative">
              <img 
                src={selectedMission.image} 
                alt={selectedMission.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091024] via-transparent to-transparent opacity-70"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedMission.metrics.map((met, midx) => (
                <div key={midx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">{met.label}</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white mt-0.5">{met.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Space News Feed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span>Recent Observatory Bulletins</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Curated Scientific Papers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaceNews.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-800 bg-[#091024]/80 p-6 flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {item.category}
                  </span>
                  <span>{item.source}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-heading mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 mb-4">
                  <span className="text-sky-300 font-semibold font-mono">Scientific Significance: </span>
                  {item.impact}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {item.readTime}
                </span>
                <span className="text-slate-400">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
