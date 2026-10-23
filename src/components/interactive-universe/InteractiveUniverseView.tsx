import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe2, 
  RotateCw, 
  Play, 
  Pause, 
  Sliders, 
  Sparkles, 
  Info, 
  Rocket, 
  Compass, 
  Crosshair,
  RotateCcw
} from 'lucide-react';
import { CelestialBody } from '../../types';
import { celestialBodies } from '../../data/celestial';

export const InteractiveUniverseView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'orrery' | 'sandbox'>('orrery');
  
  // Orrery state
  const [selectedBody, setSelectedBody] = useState<CelestialBody>(celestialBodies[3]); // Earth default
  const [orrerySpeed, setOrrerySpeed] = useState<number>(1);
  const [isOrreryPaused, setIsOrreryPaused] = useState<boolean>(false);
  const orreryCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const anglesRef = useRef<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // Sandbox state
  const [launchSpeed, setLaunchSpeed] = useState<number>(7.9); // km/s
  const [launchAngleDeg, setLaunchAngleDeg] = useState<number>(0); // 0 = horizontal
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [flightStatus, setFlightStatus] = useState<string>('Ready for ignition');
  const [telemetry, setTelemetry] = useState<{ altitude: number; speed: number; orbitType: string }>({
    altitude: 400,
    speed: 7.9,
    orbitType: 'Circular LEO'
  });
  const sandboxCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Orrery Canvas Animation
  useEffect(() => {
    if (activeSubTab !== 'orrery') return;
    const canvas = orreryCanvasRef.current;
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

      // Draw Central Sun
      const sunGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22);
      sunGrad.addColorStop(0, '#fef08a');
      sunGrad.addColorStop(0.5, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();

      // Planets configuration (excluding Sun at idx 0)
      const planets = celestialBodies.slice(1);
      const baseRadii = [34, 55, 80, 110, 150, 195, 235, 275];

      planets.forEach((p, idx) => {
        const orbitR = baseRadii[idx];

        // Draw Orbit Path
        ctx.strokeStyle = selectedBody.id === p.id ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = selectedBody.id === p.id ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.stroke();

        // Advance Angle
        if (!isOrreryPaused) {
          const speed = (365.25 / p.orbitalPeriodDays) * 0.006 * orrerySpeed;
          anglesRef.current[idx] = (anglesRef.current[idx] || 0) + speed;
        }

        const planetX = cx + orbitR * Math.cos(anglesRef.current[idx]);
        const planetY = cy + orbitR * Math.sin(anglesRef.current[idx]);

        // Draw Planet Body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const pSize = Math.max(3, p.sizeRatio * 3.8);
        ctx.arc(planetX, planetY, pSize, 0, Math.PI * 2);
        ctx.fill();

        // Highlight ring if selected
        if (selectedBody.id === p.id) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(planetX, planetY, pSize + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeSubTab, selectedBody, orrerySpeed, isOrreryPaused]);

  // Gravity Sandbox Trajectory Animation
  useEffect(() => {
    if (activeSubTab !== 'sandbox') return;
    const canvas = sandboxCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const points: { x: number; y: number }[] = [];

    // Numerical 2-body orbit simulator
    const GM = 398600; // km^3 / s^2
    const R_EARTH = 6371; // km
    const startAlt = 400; // km
    let rX = 0;
    let rY = -(R_EARTH + startAlt);
    
    // Velocity vectors
    const launchRad = (launchAngleDeg * Math.PI) / 180;
    let vX = launchSpeed * Math.cos(launchRad);
    let vY = -launchSpeed * Math.sin(launchRad);

    const dt = 8; // seconds per step

    // Determine orbit classification
    let classification = 'Suborbital Ballistic';
    if (launchSpeed >= 11.2) {
      classification = 'Escape Trajectory (Hyperbolic)';
    } else if (launchSpeed >= 7.8 && launchSpeed <= 8.2 && Math.abs(launchAngleDeg) < 5) {
      classification = 'Circular LEO Insertion';
    } else if (launchSpeed > 8.2) {
      classification = 'High-Apogee Elliptical Transfer';
    }

    setTelemetry({
      altitude: startAlt,
      speed: launchSpeed,
      orbitType: classification
    });

    const stepSimulation = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);
      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / (R_EARTH * 3.8);

      ctx.clearRect(0, 0, w, h);

      // Draw Earth
      ctx.fillStyle = '#0f2452';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R_EARTH * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Atmospheric haze
      ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.beginPath();
      ctx.arc(cx, cy, (R_EARTH + 120) * scale, 0, Math.PI * 2);
      ctx.fill();

      // Advance physics integration
      if (t < 2500) {
        for (let s = 0; s < 4; s++) {
          const dist = Math.sqrt(rX * rX + rY * rY);
          if (dist <= R_EARTH) {
            setFlightStatus('Trajectory impacted planetary surface.');
            break;
          }
          if (dist > R_EARTH * 4) {
            setFlightStatus('Spacecraft reached escape velocity.');
            break;
          }

          const acc = -GM / (dist * dist * dist);
          const aX = acc * rX;
          const aY = acc * rY;

          vX += aX * dt;
          vY += aY * dt;
          rX += vX * dt;
          rY += vY * dt;

          points.push({ x: cx + rX * scale, y: cy + rY * scale });
          t++;
        }
      }

      // Draw Trajectory Trail
      if (points.length > 1) {
        ctx.strokeStyle = launchSpeed >= 11.2 ? '#f43f5e' : launchSpeed >= 7.8 ? '#38bdf8' : '#fbbf24';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Draw probe head
        const currentP = points[points.length - 1];
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(currentP.x, currentP.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(stepSimulation);
    };

    stepSimulation();
    return () => cancelAnimationFrame(animId);
  }, [activeSubTab, launchSpeed, launchAngleDeg]);

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>HELIOCENTRIC ORRERY & GRAVITATIONAL EXPERIMENTATION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-2">
            Interactive Universe
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            Observe planetary periods in a real-time scaled orrery, or configure launch delta-v to master orbital insertion and escape velocities.
          </p>
        </div>

        {/* Sub-tab toggle */}
        <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveSubTab('orrery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'orrery'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Solar System Orrery</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sandbox')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeSubTab === 'sandbox'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Gravity & Trajectory Sandbox</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'orrery' ? (
        /* SOLAR SYSTEM ORRERY VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Orrery Canvas Viewport */}
          <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-[#050914] relative overflow-hidden h-[460px] sm:h-[540px] shadow-2xl flex flex-col justify-between p-4">
            
            {/* Top Toolbar */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                <span>HELIOCENTRIC SCALE: 1 AU = 149.6M km</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60">
                <button
                  onClick={() => setIsOrreryPaused(!isOrreryPaused)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {isOrreryPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1">Sim Speed:</span>
                {[0.5, 1, 3, 10].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setOrrerySpeed(spd)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                      orrerySpeed === spd ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <canvas ref={orreryCanvasRef} className="absolute inset-0 w-full h-full" />

            {/* Bottom Planet Selection Pills */}
            <div className="relative z-10 flex items-center gap-2 overflow-x-auto p-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800">
              {celestialBodies.map((body) => (
                <button
                  key={body.id}
                  onClick={() => setSelectedBody(body)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedBody.id === body.id
                      ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: body.color }}></span>
                  <span>{body.name}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Planetary Datasheet Inspector */}
          <div className="lg:col-span-4 rounded-3xl border border-slate-800/90 bg-[#091024]/90 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium">
                  {selectedBody.type}
                </span>
                <span className="text-xs font-mono text-slate-400">{selectedBody.distanceFromSunAU} AU</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-3 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedBody.color }}></span>
                <span>{selectedBody.name}</span>
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                {selectedBody.overview}
              </p>

              {/* Physical Metrics Grid */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Planetary Characteristics:
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">Mean Diameter:</span>
                  <span className="font-mono font-bold text-white">{selectedBody.diameterKm.toLocaleString()} km</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">Orbital Period:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {selectedBody.orbitalPeriodDays > 0 ? `${selectedBody.orbitalPeriodDays} Earth Days` : 'N/A (Primary)'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">Confirmed Moons:</span>
                  <span className="font-mono font-bold text-white">{selectedBody.moonsCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between text-xs">
                  <span className="text-slate-400">Surface Temperature:</span>
                  <span className="font-mono font-bold text-white">{selectedBody.surfaceTempC}</span>
                </div>
              </div>

              {/* Key Features */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
                <span className="text-cyan-300 font-bold font-mono uppercase tracking-wide block">
                  Scientific Highlights:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {selectedBody.keyFeatures.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              ORBIT CELESTIAL ENCYCLOPEDIA • DATA ARCHIVE
            </div>
          </div>

        </div>
      ) : (
        /* GRAVITY & TRAJECTORY SANDBOX VIEW */
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Simulation Canvas */}
            <div className="lg:col-span-8 rounded-3xl border border-slate-800 bg-[#060a16] relative overflow-hidden h-[460px] sm:h-[500px] shadow-2xl flex flex-col justify-between p-4">
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-white">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TRAJECTORY INJECTION SOLVER</span>
                </div>

                <div className="text-xs font-mono text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                  {flightStatus}
                </div>
              </div>

              <canvas ref={sandboxCanvasRef} className="absolute inset-0 w-full h-full" />

              <div className="relative z-10 flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>Earth (R = 6,371 km)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                    <span>Probe Trajectory</span>
                  </span>
                </div>
                <div className="text-white font-bold">
                  {telemetry.orbitType}
                </div>
              </div>
            </div>

            {/* Sandbox Controls Column */}
            <div className="lg:col-span-4 rounded-3xl border border-slate-800/90 bg-[#091024]/90 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold font-mono uppercase text-white tracking-wider flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                    <span>Propulsion Controls</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Adjust injection velocity and observe orbital result</p>
                </div>

                {/* Velocity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Launch Velocity (v):</span>
                    <span className="font-bold text-cyan-400">{launchSpeed.toFixed(1)} km/s</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={13.5}
                    step={0.1}
                    value={launchSpeed}
                    onChange={(e) => setLaunchSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Suborbital (&lt;7.8)</span>
                    <span>Orbit (~7.9)</span>
                    <span>Escape (&gt;11.2)</span>
                  </div>
                </div>

                {/* Angle Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Launch Pitch Angle (θ):</span>
                    <span className="font-bold text-indigo-400">{launchAngleDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={60}
                    step={1}
                    value={launchAngleDeg}
                    onChange={(e) => setLaunchAngleDeg(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Horizontal (0°)</span>
                    <span>30° Steep</span>
                    <span>60° Vertical</span>
                  </div>
                </div>

                {/* Orbital Physics Quick Reference */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 font-mono">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Critical Velocity Thresholds:</div>
                  <div className="flex justify-between text-slate-300">
                    <span>Circular Orbit (v₁):</span>
                    <span className="text-cyan-400">7.90 km/s</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Escape Velocity (v₂ = √2·v₁):</span>
                    <span className="text-rose-400">11.19 km/s</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setLaunchSpeed(7.9);
                  setLaunchAngleDeg(0);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-mono text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Standard Orbit (7.9 km/s, 0°)</span>
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
