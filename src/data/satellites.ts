import { SatellitePreset, SatelliteSubsystem } from '../types';

export const satellitePresets: SatellitePreset[] = [
  {
    id: 'iss',
    name: 'International Space Station (ISS)',
    type: 'LEO',
    altitudeKm: 420,
    speedKmh: 27580,
    periodMinutes: 92.9,
    description: 'A 450-tonne multinational microgravity laboratory continuously inhabited since November 2000.',
    typicalUses: ['Human Spaceflight', 'Microgravity Research', 'Earth Observation'],
    color: '#38bdf8'
  },
  {
    id: 'hubble',
    name: 'Hubble Space Telescope',
    type: 'LEO',
    altitudeKm: 540,
    speedKmh: 27300,
    periodMinutes: 95.4,
    description: 'Orbiting above atmospheric distortion to capture iconic ultra-deep optical and ultraviolet images.',
    typicalUses: ['Deep-sky Astronomy', 'Cosmology', 'Stellar Evolution'],
    color: '#818cf8'
  },
  {
    id: 'starlink',
    name: 'Starlink V2 Constellation',
    type: 'LEO',
    altitudeKm: 550,
    speedKmh: 27300,
    periodMinutes: 95.6,
    description: 'Massive low-latency broadband internet mega-constellation with inter-satellite optical laser links.',
    typicalUses: ['Global High-Speed Internet', 'Mobile Direct-to-Cell'],
    color: '#34d399'
  },
  {
    id: 'gps',
    name: 'GPS Block III (Navstar)',
    type: 'MEO',
    altitudeKm: 20200,
    speedKmh: 13900,
    periodMinutes: 718.0,
    description: 'Operates in semi-synchronous orbit, completing two revolutions per sidereal day for global PNT services.',
    typicalUses: ['Global Positioning', 'Precision Timing', 'Aviation Navigation'],
    color: '#fbbf24'
  },
  {
    id: 'galileo',
    name: 'Galileo Constellation (ESA)',
    type: 'MEO',
    altitudeKm: 23222,
    speedKmh: 13200,
    periodMinutes: 844.0,
    description: 'European civilian global navigation satellite system providing sub-meter horizontal positioning accuracy.',
    typicalUses: ['Civilian Navigation', 'Search & Rescue (COSPAS-SARSAT)'],
    color: '#f59e0b'
  },
  {
    id: 'goes',
    name: 'GOES-16 Weather Satellite',
    type: 'GEO',
    altitudeKm: 35786,
    speedKmh: 11068,
    periodMinutes: 1436.1,
    description: 'Stationary over the equator at 75.2° W longitude, providing continuous real-time hurricane and storm tracking.',
    typicalUses: ['Meteorological Imaging', 'Severe Storm Forecasting', 'Solar Flare Monitoring'],
    color: '#ec4899'
  }
];

export const satelliteSubsystems: SatelliteSubsystem[] = [
  {
    id: 'solar-arrays',
    name: 'Photovoltaic Solar Arrays',
    shortRole: 'Electrical Power Generation',
    description: 'Deployable carbon-composite wings covered in triple-junction Gallium Arsenide (GaAs) solar cells converting solar radiant flux into high-voltage direct current.',
    specs: [
      { label: 'Cell Type', value: 'Triple-junction InGaP/InGaAs/Ge' },
      { label: 'Conversion Efficiency', value: '31.5% in vacuum' },
      { label: 'Peak Power Output', value: '5.2 kW (End of Life)' },
      { label: 'Drive Mechanism', value: 'Solar Array Drive Assembly (SADA)' }
    ],
    engineeringNotes: 'The SADA continuously rotates the solar wings 360° per orbit to maintain a perpendicular incidence angle to the Sun vector, optimizing cosine power generation efficiency.',
    coords: { x: 14, y: 50 }
  },
  {
    id: 'star-tracker',
    name: 'Autonomous Star Tracker (STR)',
    shortRole: 'Attitude Determination (AOCS)',
    description: 'High-precision optical camera with internal microprocessor that matches star patterns in its field of view against an onboard celestial catalog of 50,000+ stars.',
    specs: [
      { label: 'Pointing Accuracy', value: '< 2.0 arcseconds (3-sigma)' },
      { label: 'Update Rate', value: '10 Hz' },
      { label: 'Field of View', value: '20° × 20° baffle-protected' },
      { label: 'Mass', value: '1.45 kg' }
    ],
    engineeringNotes: 'Features an elongated sunshade baffle to prevent stray sunlight and Earth-limb albedo from blinding the sensor during normal orbital passes.',
    coords: { x: 48, y: 22 }
  },
  {
    id: 'reaction-wheels',
    name: 'Reaction Wheel Assembly (RWA)',
    shortRole: 'Attitude Control & Pointing',
    description: 'Flywheels suspended on magnetic bearings, driven by brushless DC motors. Accelerating or decelerating the wheels imparts counter-torque to orient the spacecraft with zero fuel consumption.',
    specs: [
      { label: 'Configuration', value: 'Pyramid of 4 wheels (redundant)' },
      { label: 'Angular Momentum', value: '20 N·m·s capacity per wheel' },
      { label: 'Max Speed', value: '6,000 RPM' },
      { label: 'Desaturation Method', value: 'Magnetic Torquers & Hydrazine RCS' }
    ],
    engineeringNotes: 'Over time, external disturbance torques (solar radiation pressure, gravity gradient) cause wheels to reach their maximum RPM ("saturation"). Saturation is dumped using magnetorquers interacting with Earth\'s magnetic field.',
    coords: { x: 42, y: 62 }
  },
  {
    id: 'transponder-antenna',
    name: 'High-Gain Communications Dish',
    shortRole: 'Telemetry, Tracking & Command (TT&C)',
    description: 'Dual-axis steerable parabolic carbon-reflector antenna transmitting high-bandwidth payload scientific data down to ground stations and receiving telecommands.',
    specs: [
      { label: 'Frequency Band', value: 'X-band & Ka-band (26.5–40 GHz)' },
      { label: 'Downlink Data Rate', value: 'Up to 1.2 Gbps' },
      { label: 'Reflector Diameter', value: '1.2 meters' },
      { label: 'RF Power Output', value: '45 Watts via TWTA' }
    ],
    engineeringNotes: 'Features an automated auto-track monopulse feed to remain locked onto terrestrial deep space ground dishes (like NASA DSN and ESA ESTRACK) during rapid passes.',
    coords: { x: 78, y: 32 }
  },
  {
    id: 'hydrazine-thrusters',
    name: 'Reaction Control Thrusters (RCS)',
    shortRole: 'Orbit Insertion & De-orbiting',
    description: 'Monopropellant or bipropellant chemical thrusters decomposing hydrazine (N2H4) over a heated iridium-coated catalyst bed to deliver precise impulse bits for orbital station-keeping.',
    specs: [
      { label: 'Propellant', value: 'Anhydrous Hydrazine (N2H4)' },
      { label: 'Specific Impulse (Isp)', value: '235 seconds' },
      { label: 'Thrust per Pod', value: '1.0 N to 22.0 N' },
      { label: 'Total Delta-V Budget', value: '280 m/s' }
    ],
    engineeringNotes: 'Vital for performing conjunction avoidance maneuvers to dodge orbital debris, as well as final de-orbiting into the South Pacific Oceanic Uninhabited Area (Point Nemo) at end of life.',
    coords: { x: 86, y: 72 }
  },
  {
    id: 'optical-payload',
    name: 'High-Resolution Multispectral Imager',
    shortRole: 'Scientific / Mission Payload',
    description: 'Ritchey-Chrétien Cassegrain optical telescope feeding a cryogenic focal plane array with 16 spectral channels spanning visible to short-wave infrared (SWIR).',
    specs: [
      { label: 'Ground Sample Distance (GSD)', value: '30 cm / pixel at 500 km' },
      { label: 'Aperture', value: '75 cm primary mirror' },
      { label: 'Spectral Bands', value: 'Coastal, RGB, RedEdge, NIR, SWIR' },
      { label: 'Focal Length', value: '13.5 meters (folded)' }
    ],
    engineeringNotes: 'Equipped with active thermal refocusing heaters to maintain sub-nanometer optical alignment as the telescope expands and contracts between eclipse and sunlit phases.',
    coords: { x: 55, y: 44 }
  },
  {
    id: 'flight-computer',
    name: 'Onboard Computer Bus (OBDH)',
    shortRole: 'Command & Data Handling / Autonomy',
    description: 'Radiation-hardened multi-core flight computer executing real-time operating system (RTOS) software to manage autonomy, power distribution, thermal loops, and fault detection.',
    specs: [
      { label: 'CPU Architecture', value: 'Radiation-Hardened BAE RAD750' },
      { label: 'Total Ionizing Dose (TID)', value: '> 100 krad(Si)' },
      { label: 'System Bus', value: 'SpaceWire & MIL-STD-1553B' },
      { label: 'Fault Tolerance', value: 'Triple Modular Redundancy (TMR)' }
    ],
    engineeringNotes: 'Equipped with hardware watchdog timers that automatically reboot the spacecraft into "Safe Mode" and point solar arrays toward the Sun if the operating system ever becomes unresponsive.',
    coords: { x: 38, y: 38 }
  },
  {
    id: 'thermal-insulation',
    name: 'Multi-Layer Insulation (MLI)',
    shortRole: 'Passive Thermal Control (TCS)',
    description: 'Golden and aluminized blankets of alternating embossed Mylar and Dacron mesh that reflect thermal radiation, preventing catastrophic freezing in eclipse or overheating in direct sunlight.',
    specs: [
      { label: 'Layers', value: '25 layers of aluminized Kapton' },
      { label: 'Emissivity (ε)', value: '< 0.03' },
      { label: 'Operational Range', value: '-200°C to +300°C' },
      { label: 'Weight', value: 'Approx. 450 g/m²' }
    ],
    engineeringNotes: 'Gaps and vent holes are laser-perforated throughout every layer to prevent air pockets from popping or ballooning the blankets during rapid depressurization in launch ascent.',
    coords: { x: 65, y: 58 }
  }
];
