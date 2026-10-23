import { SpaceMission, SpaceNewsItem } from '../types';

export const spaceMissions: SpaceMission[] = [
  {
    id: 'jwst',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    status: 'Active',
    target: 'Sun-Earth L2 Lagrange Point',
    launchDate: 'Dec 25, 2021',
    summary: 'The premier cosmic observatory peering into cosmic dawn, resolving early protogalaxies, stellar nurseries, and exoplanetary atmospheres.',
    keyDiscoveries: [
      'Discovered candidate galaxies existing merely 300 million years after the Big Bang',
      'Detected carbon dioxide, water vapor, and sulfur dioxide in exoplanet atmospheres',
      'Photographed stellar birth in unprecedented infrared detail in the Pillars of Creation'
    ],
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Distance from Earth', value: '1.5 Million km' },
      { label: 'Primary Aperture', value: '6.5 m diameter' },
      { label: 'Instruments Operating', value: 'NIRCam, NIRSpec, MIRI, FGS/NIRISS' },
      { label: 'Cold Side Temp', value: '-233°C (40 K)' }
    ]
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA',
    status: 'En Route',
    target: 'Jupiter Moon Europa',
    launchDate: 'Oct 14, 2024',
    summary: 'The largest planetary spacecraft ever built by NASA, journeying to investigate whether Jupiter\'s ice-covered moon Europa has conditions suitable for life.',
    keyDiscoveries: [
      'Will perform 49 close flybys dipping to 25 km altitude above Europa',
      'Ice-penetrating radar (REASON) will map ice shell thickness and detect subsurface lakes',
      'Mass spectrometer (MASPEX) will directly sniff plumes and exospheric volatiles'
    ],
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Arrival Date', value: 'April 2030' },
      { label: 'Wingspan', value: '30.5 meters (solar arrays)' },
      { label: 'Launch Vehicle', value: 'Falcon Heavy' },
      { label: 'Primary Target', value: 'Subsurface Ocean Habitability' }
    ]
  },
  {
    id: 'artemis',
    name: 'Artemis Program',
    agency: 'NASA / International Partners',
    status: 'Active',
    target: 'The Moon (Lunar South Pole)',
    launchDate: 'Nov 16, 2022 (Artemis I)',
    summary: 'Humanity\'s return to the Moon to establish a sustainable long-term presence, test deep-space technologies, and prepare for human voyages to Mars.',
    keyDiscoveries: [
      'Orion spacecraft completed flawless distant retrograde lunar orbit during Artemis I',
      'Targeting Shackleton Crater and permanently shadowed regions rich in water ice',
      'Building the Lunar Gateway space station in a Near-Rectilinear Halo Orbit (NRHO)'
    ],
    image: 'https://images.unsplash.com/photo-1517976487585-487bc5e24b7a?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Next Crewed Mission', value: 'Artemis II (Lunar Flyby)' },
      { label: 'Heavy Lifter', value: 'Space Launch System (SLS)' },
      { label: 'Lander', value: 'Starship Human Landing System (HLS)' },
      { label: 'Target Destination', value: 'Lunar South Pole 85°S' }
    ]
  },
  {
    id: 'perseverance',
    name: 'Perseverance Rover & Ingenuity',
    agency: 'NASA JPL',
    status: 'Active',
    target: 'Mars (Jezero Crater)',
    launchDate: 'July 30, 2020',
    summary: 'Seeking signs of ancient microbial life in a 3.7-billion-year-old river delta and caching sealed rock cores for future Mars Sample Return.',
    keyDiscoveries: [
      'Collected over 24 hermetically sealed sedimentary rock cores from ancient delta mudstones',
      'Demonstrated first powered atmospheric flight on another world (Ingenuity flew 72 missions)',
      'Extracted breathable oxygen from Mars atmospheric CO2 using MOXIE instrument'
    ],
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Distance Driven', value: '31.2 km' },
      { label: 'Sample Tubes Cached', value: '25 / 38' },
      { label: 'Power Source', value: 'MMRTG (Plutonium-238)' },
      { label: 'Active Days on Mars', value: '1,300+ Sols' }
    ]
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA',
    status: 'Active',
    target: 'Interstellar Space',
    launchDate: 'Sept 5, 1977',
    summary: 'Humanity\'s most distant robotic emissary, now traveling through the interstellar medium beyond the Sun\'s heliopause.',
    keyDiscoveries: [
      'Crossed the Heliopause into interstellar space on August 25, 2012',
      'First direct measurement of interstellar plasma density and galactic cosmic rays',
      'Carries the Golden Record with sounds, music, and greetings from planet Earth'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Distance from Earth', value: '24.6+ Billion km (~164 AU)' },
      { label: 'One-Way Light Time', value: '22 hours 48 minutes' },
      { label: 'Heliocentric Velocity', value: '17 km/s (61,200 km/h)' },
      { label: 'Mission Duration', value: '47+ Years' }
    ]
  }
];

export const spaceNews: SpaceNewsItem[] = [
  {
    id: 'news-1',
    title: 'JWST Detects Methane and Carbon Dioxide in Atmosphere of Exoplanet K2-18b',
    source: 'Astrophysical Journal Letters',
    date: 'Recent Observatory Brief',
    category: 'Exoplanets',
    summary: 'Spectroscopic observations have revealed an atmosphere rich in carbon-bearing molecules on sub-Neptune K2-18b, suggesting it may be a candidate Hycean world with a water ocean underneath a hydrogen-rich envelope.',
    readTime: '3 min read',
    impact: 'Strengthens the hypothesis that oceans may exist on worlds between the size of Earth and Neptune.',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-2',
    title: 'Magellan Radar Re-analysis Reveals Active Volcanism on Venus',
    source: 'Science Magazine',
    date: 'Planetary Science Report',
    category: 'Planetary Science',
    summary: 'Comparative analysis of archival radar images from NASA\'s Magellan mission has detected a volcanic vent on Maat Mons expanding and changing shape, providing clear direct evidence of ongoing active volcanism on Venus.',
    readTime: '4 min read',
    impact: 'Transforms our view of Venus from a geologically stagnant world to an actively venting planet.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-3',
    title: 'LIGO-Virgo-KAGRA Detects Gravitational Wave Signal from Rare "Mass Gap" Object',
    source: 'Gravitational Wave Observatory',
    date: 'Astrophysics Alert',
    category: 'Cosmology',
    summary: 'Gravitational wave detectors have recorded a merger involving a compact object between 2.5 and 4.5 solar masses—a region previously thought to be devoid of either neutron stars or black holes.',
    readTime: '5 min read',
    impact: 'Challenges existing supernova collapse theories and nuclear equation of state models.',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-4',
    title: 'Vera C. Rubin Observatory Begins Final Commissioning of 3,200-Megapixel Camera',
    source: 'Observatory Commissioning Team',
    date: 'Observatory Update',
    category: 'Observatories',
    summary: 'The largest digital camera ever constructed for astrophysics has been installed atop Cerro Pachón in Chile, preparing to survey the entire southern sky every 3 nights for the Legacy Survey of Space and Time (LSST).',
    readTime: '4 min read',
    impact: 'Will catalog over 20 billion galaxies and detect millions of transient supernovae and asteroids.',
    imageUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=800&q=80'
  }
];
