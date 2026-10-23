import React, { useState, useEffect, useRef } from 'react';
import { 
  Satellite, 
  Layers, 
  RotateCw, 
  Sliders, 
  Zap, 
  Info, 
  Radio, 
  Compass, 
  Cpu, 
  ShieldAlert, 
  Maximize2,
  Play,
  Pause,
  Clock,
  Gauge
} from 'lucide-react';
import { SatellitePreset, SatelliteSubsystem } from '../../types';
import { satellitePresets, satelliteSubsystems } from '../../data/satellites';

export const SatelliteLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orbital-sim' | 'anatomy'>('orbital-sim');

  // Orbital simulator state
  const [altitudeKm, setAltitudeKm] = useState<number>(420); // default to ISS altitude
  const [eccentricity, setEccentricity] = useState<number>(0.0);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('iss');

  // Anatomy state
  const [selectedSubsystem, setSelectedSubsystem] = useState<SatelliteSubsystem>(satelliteSubsystems[0]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const orbitAngleRef = useRef<number>(0);

  // Constants
  const R_EARTH = 6371; // km
  const GM_EARTH = 398600.4418; // km^3 / s^2
  const C_LIGHT = 299792.458; // km/s

  // Derived orbital mechanics
  const semiMajorAxis = R_EARTH + altitudeKm;
  // Circular speed: v = sqrt(GM / r)
  const orbitalVelocityKmS = Math.sqrt(GM_EARTH / semiMajorAxis);
  const orbitalVelocityKmH = orbitalVelocityKmS * 3600;
  // Orbital period: T = 2 * pi * sqrt(a^3 / GM)
  const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(semiMajorAxis, 3) / GM_EARTH);
  const periodMinutes = periodSeconds / 60;
  const periodHours = periodMinutes / 60;

  // Signal delay (one-way speed of light)
  const latencyMs = (altitudeKm / C_LIGHT) * 1000;

  // Ground footprint coverage angle: theta = acos(R / (R + h))
  const footprintAngleRad = Math.acos(R_EARTH / semiMajorAxis);
  const footprintRadiusKm = R_EARTH * footprintAngleRad;
  const coveragePercent = (0.5 * (1 - Math.cos(footprintAngleRad)) * 100).toFixed(1);

  // Atmospheric drag assessment
  const getDragLevel = (alt: number) => {
    if (alt < 300) return { label: 'Severe (Rapid Decay)', color: 'text-rose-400', bg: 'bg-rose-500/10' };
    if (alt < 600) return { label: 'Moderate (Requires Reboost)', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    if (alt < 1500) return { label: 'Very Low', color: 'text-sky-400', bg: 'bg-sky-500/10' };
    return { label: 'Negligible Vacuum', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  };

  const dragInfo = getDragLevel(altitudeKm);

  // Apply preset
  const handleSelectPreset = (preset: SatellitePreset) => {
    setActivePreset(preset.id);
    setAltitudeKm(preset.altitudeKm);
    setEccentricity(0);
  };

  // Canvas animation for Orbit Simulator
  useEffect(() => {
    if (activeTab !== 'orbital-sim') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Scale factors: Earth fits well, orbits scale relative to it
      // Earth radius on canvas:
      const earthCanvasR = Math.min(w, h) * 0.18;
      // Orbit canvas radius based on log or scaled altitude
      const maxAltitude = 36000;
      // Logarithmic scaling so LEO (400km) is clearly visible while GEO (36000km) still fits
      const normAlt = Math.log10(1 + altitudeKm) / Math.log10(1 + maxAltitude);
      const orbitCanvasR = earthCanvasR + normAlt * (Math.min(w, h) * 0.28);

      // Draw Atmospheric Glow around Earth
      const atmoGrad = ctx.createRadialGradient(cx, cy, earthCanvasR * 0.9, cx, cy, earthCanvasR * 1.25);
      atmoGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      atmoGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.12)');
      atmoGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, earthCanvasR * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw Earth Sphere
      const earthGrad = ctx.createRadialGradient(cx - earthCanvasR * 0.3, cy - earthCanvasR * 0.3, 5, cx, cy, earthCanvasR);
      earthGrad.addColorStop(0, '#1e3a8a');
      earthGrad.addColorStop(0.5, '#0f2452');
      earthGrad.addColorStop(0.85, '#091536');
      earthGrad.addColorStop(1, '#050b1d');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, earthCanvasR, 0, Math.PI * 2);
      ctx.fill();

      // Earth Continent silhouetted curves (artistic stylization)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, earthCanvasR * 0.8, earthCanvasR * 0.35, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, earthCanvasR * 0.9, earthCanvasR * 0.5, -Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Orbit Ellipse Path
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      const a = orbitCanvasR;
      const b = orbitCanvasR * Math.sqrt(1 - Math.min(0.8, eccentricity) * Math.min(0.8, eccentricity));
      ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Reference Altitude Rings (LEO boundary, GEO boundary)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, earthCanvasR + 0.15 * (Math.min(w, h) * 0.28), 0, Math.PI * 2);
      ctx.stroke(); // LEO mark

      // Advance satellite angle
      if (!isPaused) {
        // Higher altitude orbits move visibly slower: omega = 2pi / T
        const speedScale = (1000 / periodSeconds) * 0.015 * simSpeed;
        orbitAngleRef.current += speedScale;
      }

      // Compute satellite coordinates
      const satX = cx + a * Math.cos(orbitAngleRef.current);
      const satY = cy + b * Math.sin(orbitAngleRef.current);

      // Draw Ground Track / Footprint Cone to Earth
      const coneGrad = ctx.createRadialGradient(satX, satY, 10, cx, cy, earthCanvasR);
      coneGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      coneGrad.addColorStop(1, 'rgba(56, 189, 248, 0.02)');
      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      const leftAngle = Math.atan2(cy - satY, cx - satX) - footprintAngleRad * 0.35;
      const rightAngle = Math.atan2(cy - satY, cx - satX) + footprintAngleRad * 0.35;
      ctx.lineTo(cx + Math.cos(leftAngle) * earthCanvasR, cy + Math.sin(leftAngle) * earthCanvasR);
      ctx.lineTo(cx + Math.cos(rightAngle) * earthCanvasR, cy + Math.sin(rightAngle) * earthCanvasR);
      ctx.closePath();
      ctx.fill();

      // Draw Satellite Body & Solar Panels
      ctx.save();
      ctx.translate(satX, satY);
      ctx.rotate(orbitAngleRef.current + Math.PI / 2);

      // Glowing point
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillRect(-3, -3, 6, 6);

      // Solar arrays wings
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(-14, -1.5, 9, 3);
      ctx.fillRect(5, -1.5, 9, 3);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, altitudeKm, eccentricity, simSpeed, isPaused, periodSeconds, footprintAngleRad]);

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-medium mb-3">
            <Satellite className="w-3.5 h-3.5" />
            <span>ORBITAL TECHNOLOGY & SPACECRAFT SYSTEMS LAB</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Satellite Laboratory
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            Experiment with orbital altitudes and observe period adjustments in real time, or dissect spacecraft anatomy subsystem-by-subsystem.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('orbital-sim')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'orbital-sim'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Orbital Mechanics Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('anatomy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Satellite Anatomy Breakdown</span>
          </button>
        </div>
      </div>

      {activeTab === 'orbital-sim' ? (
        /* ORBITAL SIMULATOR VIEW */
        <div className="space-y-8">
          
          {/* Main Visualizer + HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Canvas Viewport */}
            <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-[#060a16] relative overflow-hidden h-[460px] sm:h-[520px] shadow-2xl flex flex-col justify-between p-4">
              
              {/* Overlay Top Controls */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>CENTRAL BODY: EARTH (M = 5.972 × 10²⁴ kg)</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    title={isPaused ? 'Resume' : 'Pause'}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] font-mono text-slate-400 px-1">Speed:</span>
                  {[0.5, 1, 5, 20].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSimSpeed(s)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                        simSpeed === s ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair"
              />

              {/* Overlay Bottom Legend */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    <span>Satellite</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-700"></span>
                    <span>Earth Radius (6,371 km)</span>
                  </span>
                  <span className="flex items-center gap-1.5 hidden sm:inline-flex">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500/20 border border-sky-400"></span>
                    <span>Ground Footprint Cone</span>
                  </span>
                </div>

                <div className="text-slate-300 font-bold">
                  Altitude: {altitudeKm.toLocaleString()} km
                </div>
              </div>

            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Telemetry Card */}
              <div className="rounded-3xl border border-slate-800/90 bg-[#091024]/90 p-6 backdrop-blur-md space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-sky-400" />
                    <h3 className="text-sm font-bold font-mono uppercase text-white tracking-wider">
                      Orbital Telemetry HUD
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">REAL-TIME CALC</span>
                </div>

                {/* Metric: Velocity */}
                <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">ORBITAL VELOCITY (v = √(GM/r))</div>
                  <div className="text-2xl font-mono font-bold text-sky-400 mt-0.5">
                    {orbitalVelocityKmS.toFixed(2)} <span className="text-xs text-slate-300">km/s</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    ≈ {Math.round(orbitalVelocityKmH).toLocaleString()} km/h
                  </div>
                </div>

                {/* Metric: Period */}
                <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400">ORBITAL PERIOD (T)</div>
                  <div className="text-2xl font-mono font-bold text-indigo-400 mt-0.5">
                    {periodMinutes < 120 
                      ? `${periodMinutes.toFixed(1)} mins`
                      : `${periodHours.toFixed(2)} hours`
                    }
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {periodMinutes < 120 
                      ? `(${(24 / (periodMinutes / 60)).toFixed(1)} revolutions per day)`
                      : `(${periodMinutes.toFixed(0)} total minutes)`}
                  </div>
                </div>

                {/* Metric: Signal Delay & Footprint */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">ONE-WAY LATENCY</div>
                    <div className="text-base font-mono font-bold text-white mt-0.5">
                      {latencyMs.toFixed(1)} ms
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">EARTH COVERAGE</div>
                    <div className="text-base font-mono font-bold text-white mt-0.5">
                      {coveragePercent}%
                    </div>
                  </div>
                </div>

                {/* Metric: Atmospheric Drag Warning */}
                <div className={`p-3 rounded-2xl border ${dragInfo.bg} border-slate-800`}>
                  <div className="text-[10px] font-mono text-slate-400">ATMOSPHERIC DRAG LEVEL</div>
                  <div className={`text-xs font-mono font-bold mt-0.5 ${dragInfo.color}`}>
                    {dragInfo.label}
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Controls & Presets Section */}
          <div className="rounded-3xl border border-slate-800/90 bg-[#091024]/80 p-6 sm:p-8 backdrop-blur-md space-y-6">
            
            {/* Presets Bar */}
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Select Spacecraft Mission Preset:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {satellitePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      activePreset === preset.id
                        ? 'border-sky-500 bg-sky-950/40 shadow-md shadow-sky-500/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-sky-400">
                        {preset.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{preset.altitudeKm} km</span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
              
              {/* Altitude Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300">
                    Orbital Altitude (h): <span className="font-bold text-sky-400">{altitudeKm.toLocaleString()} km</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">160 km – 36,000 km</span>
                </div>
                <input
                  type="range"
                  min={160}
                  max={36000}
                  step={50}
                  value={altitudeKm}
                  onChange={(e) => {
                    setAltitudeKm(Number(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>LEO (ISS ~420km)</span>
                  <span>MEO (GPS ~20,200km)</span>
                  <span>GEO (~35,786km)</span>
                </div>
              </div>

              {/* Eccentricity Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300">
                    Orbital Eccentricity (e): <span className="font-bold text-indigo-400">{eccentricity.toFixed(2)}</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">0.00 (Circular) – 0.70 (Elliptical)</span>
                </div>
                <input
                  type="range"
                  min={0.0}
                  max={0.7}
                  step={0.02}
                  value={eccentricity}
                  onChange={(e) => setEccentricity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Circular (e=0)</span>
                  <span>Moderate Ellipse</span>
                  <span>Molniya HEO (e=0.7)</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /* SATELLITE ANATOMY BREAKDOWN VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Interactive Schematic Diagram */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-[#060a16] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                Interactive Spacecraft Exploded Schematic
              </span>
              <span className="text-[11px] font-mono text-slate-400">Click any hotspot to inspect</span>
            </div>

            {/* Schematic Illustration Canvas / Container */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#081022] border border-slate-800 flex items-center justify-center overflow-hidden my-4">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {/* Stylized Vector Satellite Drawing */}
              <svg viewBox="0 0 500 350" className="w-full h-full max-h-[340px] drop-shadow-2xl">
                {/* Central Satellite Body Bus */}
                <rect x="200" y="120" width="100" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <rect x="210" y="130" width="80" height="90" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                
                {/* Gold Multi-layer insulation pattern */}
                <rect x="220" y="140" width="60" height="70" fill="#eab308" opacity="0.3" />

                {/* Left Solar Array Wing */}
                <line x1="200" y1="175" x2="60" y2="175" stroke="#94a3b8" strokeWidth="4" />
                <rect x="60" y="110" width="110" height="130" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <line x1="97" y1="110" x2="97" y2="240" stroke="#38bdf8" strokeWidth="1" />
                <line x1="134" y1="110" x2="134" y2="240" stroke="#38bdf8" strokeWidth="1" />
                <line x1="60" y1="175" x2="170" y2="175" stroke="#38bdf8" strokeWidth="1" />

                {/* Right Solar Array Wing */}
                <line x1="300" y1="175" x2="440" y2="175" stroke="#94a3b8" strokeWidth="4" />
                <rect x="330" y="110" width="110" height="130" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                <line x1="367" y1="110" x2="367" y2="240" stroke="#38bdf8" strokeWidth="1" />
                <line x1="404" y1="110" x2="404" y2="240" stroke="#38bdf8" strokeWidth="1" />
                <line x1="330" y1="175" x2="440" y2="175" stroke="#38bdf8" strokeWidth="1" />

                {/* High Gain Dish Antenna (Top Right) */}
                <path d="M 330 60 A 40 40 0 0 1 380 110" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <line x1="290" y1="125" x2="350" y2="85" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="360" cy="78" r="4" fill="#38bdf8" />

                {/* Optical Telescope Barrel / Imager (Bottom) */}
                <path d="M 230 230 L 230 280 L 270 280 L 270 230 Z" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                <ellipse cx="250" cy="280" rx="20" ry="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />

                {/* Hydrazine Thruster Nozzle (Bottom Right) */}
                <polygon points="285,230 295,245 275,245" fill="#f97316" opacity="0.8" />
              </svg>

              {/* Clickable Hotspots overlay */}
              {satelliteSubsystems.map((sub, idx) => {
                const isSelected = selectedSubsystem.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubsystem(sub)}
                    style={{ left: `${sub.coords.x}%`, top: `${sub.coords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all cursor-pointer z-20 ${
                      isSelected
                        ? 'bg-sky-400 text-slate-950 scale-125 shadow-lg shadow-sky-400/50 ring-4 ring-sky-400/30'
                        : 'bg-slate-900/90 text-sky-400 border border-sky-400/50 hover:bg-sky-500 hover:text-white hover:scale-110'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Hotspot buttons ribbon */}
            <div className="flex flex-wrap gap-2 pt-2">
              {satelliteSubsystems.map((sub, idx) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubsystem(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    selectedSubsystem.id === sub.id
                      ? 'bg-sky-500 text-white font-medium'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}. {sub.name.split(' (')[0]}
                </button>
              ))}
            </div>

          </div>

          {/* Subsystem Telemetry Inspector */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800/90 bg-[#091024]/90 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl flex flex-col justify-between">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-mono font-medium">
                  {selectedSubsystem.shortRole}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3">
                {selectedSubsystem.name}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {selectedSubsystem.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Engineering Specifications:
                </div>
                <div className="space-y-2">
                  {selectedSubsystem.specs.map((spec, sidx) => (
                    <div key={sidx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{spec.label}</span>
                      <span className="font-mono font-bold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Insights Callout */}
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30 text-xs text-slate-300 space-y-1">
                <span className="text-sky-300 font-bold font-mono uppercase tracking-wide block">
                  Flight Engineering Note:
                </span>
                <p className="leading-relaxed">{selectedSubsystem.engineeringNotes}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              ORBIT SATELLITE SUBSYSTEM ARCHIVE • MODULE 2
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
