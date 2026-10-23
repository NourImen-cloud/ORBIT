import { DailyDiscovery } from '../types';

export const dailyDiscoveries: DailyDiscovery[] = [
  {
    id: 'disc-jwst-deep-field',
    date: 'Today\'s Discovery',
    title: 'JWST First Deep Field: Piercing the Cosmic Dawn',
    subtitle: 'Gravitational lensing turns galaxy cluster SMACS 0723 into a 4.6-billion-year-old natural magnifying glass.',
    category: 'Observatories',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Galaxy cluster SMACS 0723 captured in near-infrared by NIRCam. Arcs of light are ancient galaxies magnified by Einstein\'s general relativity.',
    leadParagraph: 'Covering a patch of sky approximately the size of a single grain of sand held at arm\'s length by someone on the ground, the James Webb Space Telescope revealed thousands of galaxies in vivid infrared detail, capturing light emitted over 13.1 billion years ago—just a few hundred million years after the Big Bang.',
    keyFacts: [
      { label: 'Primary Mirror Diameter', value: '6.5 meters (Gold-coated Beryllium)' },
      { label: 'Target Light Travel Time', value: '13.1+ Billion Years' },
      { label: 'Instrument Used', value: 'NIRCam (Near-Infrared Camera)' },
      { label: 'Magnification Mechanism', value: 'Gravitational Lensing (SMACS 0723)' }
    ],
    deepDive: [
      'The prominent curved streaks and arcs visible throughout the image are not defects in the optics: they are ancient background galaxies whose light has been bent and magnified as it traversed the warped spacetime created by the colossal mass of galaxy cluster SMACS 0723.',
      'Because the universe is continuously expanding, photons emitted in ultraviolet and visible wavelengths by the earliest stars and galaxies have been stretched over billions of years into longer, redder infrared wavelengths (cosmological redshift). JWST was engineered specifically to detect these faint infrared signals that were invisible to Hubble.',
      'Spectroscopic analysis by the NIRSpec instrument revealed the precise chemical composition of these infant galaxies, showing early starburst activity and stellar nucleosynthesis of oxygen and carbon remarkably earlier than standard cosmological models initially predicted.'
    ],
    takeaways: [
      'Gravitational lensing allows astronomers to use massive galaxy clusters as natural cosmological telephoto lenses.',
      'Infrared astronomy pierces cosmic dust clouds and captures redshifted light from the earliest epoch of star formation.',
      'JWST\'s 18 hexagonal beryllium-gold mirror segments work as a singular optical surface with nanometer alignment precision.'
    ],
    relatedLessonId: 'l4-2'
  },
  {
    id: 'disc-enceladus-ocean',
    date: 'Discovery Archive',
    title: 'The Cryovolcanic Geysers of Enceladus',
    subtitle: 'Cassini\'s direct flight through hydrothermal plumes erupting from Saturn\'s ice moon.',
    category: 'Planetary',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Plumes of water ice and organic molecules spray into space from the "tiger stripe" fractures at Enceladus\' south pole.',
    leadParagraph: 'Beneath a global ice shell 20 to 30 kilometers thick, Saturn\'s tiny moon Enceladus harbors a global subsurface liquid ocean heated by tidal friction and alkaline hydrothermal vents, presenting one of the most promising habitats for extraterrestrial microbial life in the Solar System.',
    keyFacts: [
      { label: 'Moon Diameter', value: '504 km (roughly size of the UK)' },
      { label: 'Ocean Depth', value: '30–40 km under ice shell' },
      { label: 'Detected Organics', value: 'Methane, Carbon dioxide, Complex Macromolecules' },
      { label: 'Plume Velocity', value: 'Approx. 400 m/s (1,440 km/h)' }
    ],
    deepDive: [
      'In 2005, NASA\'s Cassini spacecraft discovered immense geysers venting hundreds of kilograms of water vapor, ice grains, molecular hydrogen, and complex organic molecules per second from fractures named the "tiger stripes" near the south pole.',
      'The discovery of molecular hydrogen (H2) and native phosphates in the plumes strongly indicates active hydrothermal circulation at the ocean floor, similar to Earth\'s alkaline deep-sea hydrothermal vents (like the Lost City field) which host chemosynthetic ecosystems independent of sunlight.'
    ],
    takeaways: [
      'Tidal heating from orbital resonances can maintain liquid oceans even in the frigid outer Solar System.',
      'Enceladus\' plumes allow orbiters to sample a subsurface alien ocean without needing to drill through kilometers of ice.'
    ],
    relatedLessonId: 'l1-3'
  },
  {
    id: 'disc-m87-blackhole',
    date: 'Discovery Archive',
    title: 'Imaging the Unseeable: M87* Shadow and Photon Ring',
    subtitle: 'The Event Horizon Telescope synchronizes radio dishes across planet Earth to create an Earth-sized telescope.',
    category: 'Astrophysics',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'The glowing ring of synchrotron emission around the 6.5-billion-solar-mass supermassive black hole at the center of galaxy Messier 87.',
    leadParagraph: 'In April 2019, the Event Horizon Telescope (EHT) collaboration presented the first-ever direct image of a black hole: the shadow cast by the event horizon of M87*, a gravitational titan located 55 million light-years away.',
    keyFacts: [
      { label: 'Black Hole Mass', value: '6.5 Billion Solar Masses' },
      { label: 'Distance from Earth', value: '55 Million Light-Years' },
      { label: 'Angular Resolution', value: '20 Microarcseconds' },
      { label: 'Technique', value: 'Very Long Baseline Interferometry (VLBI)' }
    ],
    deepDive: [
      'To resolve an object with an angular size comparable to a donut on the surface of the Moon, the EHT linked atomic-clock-synchronized millimeter radio telescopes across Hawaii, Chile, Spain, Arizona, and the South Pole, synthesizing a virtual aperture telescope with the effective diameter of the entire Earth.',
      'The bright asymmetric ring reveals plasma orbiting near the speed of light in the accretion disk. Relativistic Doppler beaming makes the plasma moving toward our line of sight appear dramatically brighter than the receding side.'
    ],
    takeaways: [
      'Einstein\'s General Relativity passed its most extreme field-strength test to date.',
      'Very Long Baseline Interferometry allows distributed arrays to simulate planetary-scale apertures.'
    ],
    relatedLessonId: 'l5-1'
  },
  {
    id: 'disc-trappist-1',
    date: 'Discovery Archive',
    title: 'The Seven Earth-Sized Worlds of TRAPPIST-1',
    subtitle: 'A compact red dwarf system where three rocky worlds reside in the circumstellar habitable zone.',
    category: 'Planetary',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Artist impression of the TRAPPIST-1 system: seven terrestrial planets tightly packed around an ultra-cool red dwarf star.',
    leadParagraph: 'Located 39 light-years away in the constellation Aquarius, the TRAPPIST-1 system features seven terrestrial planets orbiting a cool M-dwarf star. All seven worlds have sizes and masses comparable to Earth and Venus, with three orbiting within the zone where liquid water could persist.',
    keyFacts: [
      { label: 'Host Star Type', value: 'Ultra-cool red dwarf (M8V)' },
      { label: 'Habitable Zone Planets', value: 'TRAPPIST-1e, 1f, and 1g' },
      { label: 'Orbital Periods', value: '1.5 to 20 Earth days' },
      { label: 'Orbital Architecture', value: 'Near-resonant resonant Laplace chain' }
    ],
    deepDive: [
      'The entire TRAPPIST-1 system is so compact that all seven planets orbit closer to their host star than Mercury does to our Sun. Standing on the surface of TRAPPIST-1e, neighboring sister planets would appear in the sky larger than our full Moon.',
      'Because M-dwarf stars are prone to powerful stellar flares and coronal mass ejections during their youth, atmospheric retention remains the paramount question currently being investigated by JWST transmission spectroscopy.'
    ],
    takeaways: [
      'M-dwarf systems present the most numerous terrestrial planetary environments in our galaxy.',
      'Planetary orbital resonances provide crucial clues regarding past planetary migration.'
    ],
    relatedLessonId: 'l5-2'
  }
];
