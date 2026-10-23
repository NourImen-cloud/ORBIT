import { CourseLevel } from '../types';

export const courseLevels: CourseLevel[] = [
  {
    id: 1,
    title: 'Foundations of Space',
    goal: 'Understand the basic structure and physics of our cosmos.',
    description: 'Explore the cosmic scale, the life cycle of stellar bodies, planetary formation in our Solar System, the invisible hand of gravity, and how light travels across the cosmic void.',
    badge: 'Cosmic Pioneer',
    color: 'from-blue-500 to-cyan-400',
    iconName: 'Sparkles',
    lessons: [
      {
        id: 'l1-1',
        levelId: 1,
        title: 'What is the Universe? Scale and Cosmological Horizons',
        shortDesc: 'Embark from Earth and scale up through solar systems, nebulae, galaxies, and the observable edge.',
        readTime: '6 min',
        difficulty: 'Beginner',
        tags: ['Cosmology', 'Scales', 'Universe'],
        bannerImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
        summary: 'The observable universe spans over 93 billion light-years in diameter, containing at least two trillion galaxies, governed by the speed of light.',
        content: [
          {
            sectionTitle: 'The Expanding Horizon',
            paragraphs: [
              'When you look up at the night sky, you are not merely gazing into distant space—you are looking back in time. Because light travels at a finite speed of approximately 299,792 km/s, every photon hitting your eyes reveals an object as it existed when that light departed.',
              'The universe was born approximately 13.8 billion years ago in an event known as the Big Bang. However, because space itself has been continuously expanding ever since, the observable universe stretches across an incomprehensible diameter of roughly 93 billion light-years (28.5 gigaparsecs).'
            ],
            callout: {
              type: 'info',
              title: 'Cosmic Fact: The Cosmic Microwave Background',
              body: 'The oldest light in the cosmos is the Cosmic Microwave Background (CMB), relic radiation from roughly 380,000 years after the Big Bang when neutral hydrogen atoms first formed, freeing photons to travel unimpeded.'
            }
          },
          {
            sectionTitle: 'Cosmic Hierarchies: From Dust to Superclusters',
            paragraphs: [
              'Matter in the cosmos is organized in hierarchical structures bound by gravitation. Rocky bodies and gas giants form planetary systems around stellar furnaces. Stars cluster into star clusters, which populate majestic spiral, elliptical, and irregular galaxies.',
              'Our home galaxy, the Milky Way, contains between 100 to 400 billion stars and spans 100,000 light-years across. It resides within the Local Group alongside Andromeda (M31) and Triangulum (M33), which in turn forms part of the gargantuan Laniakea Supercluster spanning over 500 million light-years.'
            ],
            callout: {
              type: 'formula',
              title: 'Light Travel Distance Formula',
              body: 'Distance is the product of light velocity and travel duration. One light-year represents approximately 9.461 trillion kilometers.',
              formula: 'd = c \\times t \\approx 9.461 \\times 10^{12} \\text{ km}'
            }
          }
        ],
        checkpoint: {
          id: 'cp1-1',
          question: 'Why does looking at distant astronomical objects effectively mean looking into the past?',
          options: [
            'Because space bends backwards toward Earth.',
            'Because light travels at a finite speed, taking time to cross cosmic distances.',
            'Because stars spin counterclockwise relative to our line of sight.',
            'Because the cosmic expansion causes chronological reversal.'
          ],
          correctIndex: 1,
          hint: 'Consider the velocity of light (c = 300,000 km/s).'
        },
        quiz: [
          {
            id: 'q1-1-1',
            question: 'What is the estimated diameter of the observable universe today?',
            options: ['13.8 billion light-years', '93 billion light-years', '100,000 light-years', '1 trillion kilometers'],
            correctAnswer: 1,
            explanation: 'While the universe is 13.8 billion years old, the metric expansion of space has carried the most distant visible matter to a comoving distance of about 46.5 billion light-years in every direction, giving a total diameter of ~93 billion light-years.'
          },
          {
            id: 'q1-1-2',
            question: 'Which supercluster contains the Milky Way galaxy?',
            options: ['Laniakea Supercluster', 'Virgo Outer Cluster', 'Perseus-Pisces Supercluster', 'Centaurus Void'],
            correctAnswer: 0,
            explanation: 'The Milky Way belongs to the Laniakea Supercluster, Hawaiian for "immense heaven", defined by gravitational basin watersheds of 100,000 galaxies.'
          },
          {
            id: 'q1-1-3',
            question: 'What was the breakthrough event 380,000 years after the Big Bang that allowed photons to travel freely?',
            options: ['The formation of the first black holes', 'Recombination (formation of neutral hydrogen)', 'Supernova nucleosynthesis', 'Inflationary epoch end'],
            correctAnswer: 1,
            explanation: 'Recombination allowed electrons to bind to protons, dropping plasma opacity and enabling light to stream freely as the Cosmic Microwave Background.'
          }
        ]
      },
      {
        id: 'l1-2',
        levelId: 1,
        title: 'Stars, Planets, and Galaxies: The Building Blocks',
        shortDesc: 'Understand stellar nucleosynthesis, planetary formation accretion disks, and galaxy morphology.',
        readTime: '7 min',
        difficulty: 'Beginner',
        tags: ['Stars', 'Planets', 'Galaxies'],
        bannerImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
        summary: 'Stars are cosmic alchemical reactors fusing hydrogen into heavier elements; protoplanetary disks condense into planets.',
        content: [
          {
            sectionTitle: 'Stellar Furnaces and Nucleosynthesis',
            paragraphs: [
              'Every element heavier than helium in the universe—including the iron coursing through your blood, the calcium in your bones, and the silicon powering your electronics—was forged inside the crushing cores of ancient stars or synthesized in colossal supernova explosions.',
              'Stars begin inside dense molecular clouds of cold gas known as stellar nurseries. As gravitational instability causes localized regions to collapse, core pressure and temperature soar until nuclear fusion ignites: hydrogen nuclei overcome electrostatic repulsion to fuse into helium via the proton-proton chain.'
            ],
            callout: {
              type: 'tip',
              title: 'Hydrostatic Equilibrium',
              body: 'A stable star exists in a delicate tug-of-war: inward gravitational collapse is counteracted precisely by the outward radiation pressure generated by core nuclear fusion.'
            }
          },
          {
            sectionTitle: 'Planetary Formation in Protoplanetary Disks',
            paragraphs: [
              'When a protostar gathers mass, the surrounding nebula flattens into a rapidly rotating protoplanetary disk due to conservation of angular momentum.',
              'Within this disk, microscopic dust grains collide and stick together through electrostatic forces, gradually forming kilometer-sized planetesimals. Close to the star, where heat vaporizes volatile gases, rocky planets form; farther beyond the frost line, volatile ices survive to feed gas and ice giants.'
            ]
          }
        ],
        checkpoint: {
          id: 'cp1-2',
          question: 'What keeps a main-sequence star like our Sun stable against gravitational collapse?',
          options: [
            'Magnetic field repulsion from the galactic core.',
            'Outward radiation pressure generated by nuclear fusion in its core.',
            'The centripetal centrifugal force of its axial spin.',
            'Solar wind reflecting off surrounding interplanetary dust.'
          ],
          correctIndex: 1,
          hint: 'Look for hydrostatic equilibrium between inward pull and outward thermal energy.'
        },
        quiz: [
          {
            id: 'q1-2-1',
            question: 'What is the primary fusion process powering our Sun?',
            options: ['Carbon-Nitrogen-Oxygen cycle', 'Proton-Proton chain fusion', 'Triple-alpha helium burning', 'Uranium fission'],
            correctAnswer: 1,
            explanation: 'For stars with masses similar to or lower than the Sun, the proton-proton chain accounts for roughly 99% of energy production.'
          },
          {
            id: 'q1-2-2',
            question: 'What determines whether rocky planets or gas giants form in a protoplanetary disk?',
            options: ['The "Frost line" (snow line) distance from the star', 'The star\'s magnetic polarity', 'The presence of dark matter clumps', 'The speed of light in vacuum'],
            correctAnswer: 0,
            explanation: 'Beyond the frost line, volatile compounds like water, ammonia, and methane freeze into solid ice crystals, providing orders of magnitude more building material for massive giant cores.'
          }
        ]
      },
      {
        id: 'l1-3',
        levelId: 1,
        title: 'Our Solar System: The Celestial Neighborhood',
        shortDesc: 'A rigorous tour of the Sun, the terrestrial inner worlds, the Asteroid Belt, gas giants, and the Kuiper Belt.',
        readTime: '8 min',
        difficulty: 'Beginner',
        tags: ['Solar System', 'Planets', 'Orbits'],
        bannerImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
        summary: 'From scorching Mercury to icy Pluto and the Oort Cloud, our solar system holds 8 major planets, over 290 moons, and trillions of cometary bodies.',
        content: [
          {
            sectionTitle: 'The Architecture of the Solar System',
            paragraphs: [
              'The Solar System is dominated by a single G-type main-sequence star: the Sun, which accounts for 99.86% of the system\'s entire mass. The remaining 0.14% is split predominantly between Jupiter and Saturn.',
              'The architecture consists of four distinct zones: the terrestrial inner solar system (Mercury, Venus, Earth, Mars); the Main Asteroid Belt; the outer gas and ice giants (Jupiter, Saturn, Uranus, Neptune); and the trans-Neptunian region comprising the Kuiper Belt, Scattered Disk, and distant spherical Oort Cloud.'
            ],
            callout: {
              type: 'info',
              title: 'The Astronomical Unit (AU)',
              body: 'Distances within our solar system are measured in Astronomical Units (1 AU = 149,597,870.7 km), the average distance from the center of the Earth to the center of the Sun.'
            }
          }
        ],
        quiz: [
          {
            id: 'q1-3-1',
            question: 'What percentage of the Solar System\'s total mass is contained within the Sun?',
            options: ['75.2%', '91.4%', '99.86%', '99.999%'],
            correctAnswer: 2,
            explanation: 'The Sun accounts for 99.86% of all mass in the Solar System, with Jupiter holding more than twice the mass of all other planets combined.'
          }
        ]
      },
      {
        id: 'l1-4',
        levelId: 1,
        title: 'Gravity and Motion: Kepler\'s Laws and Newton\'s Insight',
        shortDesc: 'Discover why objects orbit, how planetary speed changes at perihelion, and the universal law of gravitation.',
        readTime: '9 min',
        difficulty: 'Intermediate',
        tags: ['Physics', 'Gravity', 'Kepler', 'Newton'],
        bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        summary: 'Newton united falling apples and orbiting moons through a single inverse-square law, refining Kepler\'s empirical orbital geometry.',
        content: [
          {
            sectionTitle: 'Newton\'s Cannon: An Orbit is Perpetual Free-Fall',
            paragraphs: [
              'To understand how anything stays in orbit, imagine Isaac Newton\'s famous thought experiment: placing a giant cannon on a high mountain above Earth\'s atmosphere. If you fire a cannonball horizontally, gravity pulls it down to Earth.',
              'If you increase the gunpowder, the projectile travels farther before hitting the ground. Eventually, at a horizontal velocity of roughly 7.9 km/s (28,000 km/h), the rate at which the cannonball falls matches the exact rate at which Earth\'s spherical surface curves away beneath it. The projectile never hits the ground: it has entered Low Earth Orbit.'
            ],
            callout: {
              type: 'formula',
              title: 'Orbital Velocity Formula',
              body: 'For a circular orbit of radius r around a body of mass M, the required velocity v is:',
              formula: 'v = \\sqrt{\\frac{G M}{r}}'
            }
          },
          {
            sectionTitle: 'Kepler\'s Three Laws of Planetary Motion',
            paragraphs: [
              '1. First Law (Ellipses): The orbit of a planet is an ellipse with the Sun at one of the two foci.',
              '2. Second Law (Equal Areas): A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time. Therefore, planets move fastest at perihelion (closest point) and slowest at aphelion (farthest point).',
              '3. Third Law (Harmonic Law): The square of the orbital period T is directly proportional to the cube of the semi-major axis a:'
            ],
            callout: {
              type: 'formula',
              title: 'Kepler\'s Third Law',
              body: 'Harmonic relationship between orbital period and distance from central mass:',
              formula: 'T^2 = \\frac{4\\pi^2}{G(M + m)} a^3 \\approx k \\cdot a^3'
            }
          }
        ],
        checkpoint: {
          id: 'cp1-4',
          question: 'According to Kepler\'s Second Law, when does an orbiting satellite travel fastest?',
          options: [
            'At its apogee (farthest distance from Earth)',
            'At its perigee (closest approach to Earth)',
            'When passing directly over the magnetic equator',
            'When aligned with the vernal equinox'
          ],
          correctIndex: 1,
          hint: 'A satellite converts gravitational potential energy into kinetic energy as it draws closer to the central mass.'
        },
        quiz: [
          {
            id: 'q1-4-1',
            question: 'What happens to the required orbital speed as you move to a higher altitude orbit?',
            options: [
              'Orbital speed increases because there is less friction.',
              'Orbital speed decreases because gravitational pull diminishes with distance.',
              'Orbital speed remains constant at 7.9 km/s everywhere.',
              'Orbital speed fluctuates randomly with solar radiation.'
            ],
            correctAnswer: 1,
            explanation: 'Because v = sqrt(GM/r), as the orbital radius r increases in the denominator, the required circular orbital velocity decreases.'
          },
          {
            id: 'q1-4-2',
            question: 'What is the shape of all closed unperturbed Keplerian orbits?',
            options: ['Perfect circles', 'Ellipses with the primary body at one focus', 'Parabolas', 'Hyperbolas'],
            correctAnswer: 1,
            explanation: 'Kepler\'s First Law proved that celestial orbits are ellipses with the central gravitating body at one of the two foci (a circle is merely an ellipse with zero eccentricity).'
          }
        ]
      },
      {
        id: 'l1-5',
        levelId: 1,
        title: 'Light and Astronomical Distances: Parallax to Redshift',
        shortDesc: 'How astronomers measure the cosmos using stellar parallax, standard candles, and cosmological redshift.',
        readTime: '7 min',
        difficulty: 'Intermediate',
        tags: ['Optics', 'Spectroscopy', 'Redshift', 'Distances'],
        bannerImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
        summary: 'Without measuring tape in space, astronomers build a cosmic distance ladder using trigonometric parallax, Cepheid variables, Type Ia supernovae, and Hubble redshift.',
        content: [
          {
            sectionTitle: 'The Cosmic Distance Ladder',
            paragraphs: [
              'Space is so immense that no single technique can gauge all distances. Instead, astrophysicists construct a calibrated sequence called the Cosmic Distance Ladder, where each rung calibrates the next.',
              'For nearby stars, stellar parallax observes the subtle angular shift of a star against background objects as Earth revolves across its 2 AU orbit. One parsec (3.26 light-years) is defined as the distance where an object has an annual parallax angle of exactly one arcsecond (1/3600th of a degree).'
            ]
          }
        ],
        quiz: [
          {
            id: 'q1-5-1',
            question: 'What does one parsec represent?',
            options: ['The distance light travels in 1 second', 'The distance where an astronomical parallax is 1 arcsecond (~3.26 light-years)', 'The radius of the Oort Cloud', 'The distance between the Sun and Sagittarius A*'],
            correctAnswer: 1,
            explanation: 'A parsec (parallax second) equals roughly 3.26 light-years or 3.086 × 10^13 kilometers.'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Satellites and Orbits',
    goal: 'Build a rigorous foundation for university satellite engineering modules.',
    description: 'Master the mechanics of artificial satellites, classify orbital regimes from LEO to GEO, inspect spacecraft subsystems, and understand thermal and power budgets in vacuum.',
    badge: 'Orbital Engineer',
    color: 'from-cyan-500 to-indigo-500',
    iconName: 'Satellite',
    lessons: [
      {
        id: 'l2-1',
        levelId: 2,
        title: 'What is a Satellite? Natural vs. Artificial Orbiters',
        shortDesc: 'Define orbital payloads, the history from Sputnik 1 to modern mega-constellations, and mission profiles.',
        readTime: '6 min',
        difficulty: 'Beginner',
        tags: ['Satellites', 'History', 'Engineering'],
        bannerImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
        summary: 'A satellite is any celestial or manufactured object that revolves around a larger primary body in a gravitationally bound closed trajectory.',
        content: [
          {
            sectionTitle: 'The Evolution of Artificial Spacecraft',
            paragraphs: [
              'On October 4, 1957, humanity entered the space age when the Soviet Union launched Sputnik 1: an 83.6-kg polished aluminum sphere with four whip antennas emitting simple radio beeps at 20.005 MHz.',
              'Today, over 10,000 active artificial satellites orbit Earth, ranging from 1U CubeSats the size of a tissue box (10×10×10 cm, ~1.3 kg) to the International Space Station, a 450-tonne laboratory the size of a football stadium.'
            ]
          }
        ],
        quiz: [
          {
            id: 'q2-1-1',
            question: 'What was the primary scientific payload of Sputnik 1?',
            options: ['A multispectral Earth-imaging camera', 'Two radio transmitters broadcasting frequencies at 20 and 40 MHz', 'A laser ranging retroreflector', 'A geiger counter detecting radiation belts'],
            correctAnswer: 1,
            explanation: 'Sputnik 1 was equipped with simple radio transmitters that allowed researchers on Earth to study radio wave propagation through the ionosphere.'
          }
        ]
      },
      {
        id: 'l2-2',
        levelId: 2,
        title: 'Orbital Motion and Orbital Velocity',
        shortDesc: 'Calculate circular velocities, understand orbital periods, and see how eccentricity changes trajectory.',
        readTime: '8 min',
        difficulty: 'Intermediate',
        tags: ['Orbital Mechanics', 'Velocity', 'Mathematics'],
        bannerImage: 'https://images.unsplash.com/photo-1517976487585-487bc5e24b7a?auto=format&fit=crop&w=1200&q=80',
        summary: 'Derive circular velocity from centripetal force and Newton\'s gravity, and calculate orbital periods using Keplerian mechanics.',
        content: [
          {
            sectionTitle: 'Deriving the Circular Velocity Equation',
            paragraphs: [
              'For a satellite of mass m orbiting a spherical Earth of mass M at a radius r (where r = R_earth + altitude h), the gravitational attraction must supply the exact centripetal force required to sustain circular motion:',
              'F_gravity = F_centripetal ==> G*(M*m)/r^2 = (m*v^2)/r'
            ],
            callout: {
              type: 'formula',
              title: 'Orbital Period Formula',
              body: 'The time required to complete one full revolution (360 degrees):',
              formula: 'T = 2\\pi \\sqrt{\\frac{r^3}{\\mu}}, \\quad \\text{where } \\mu = GM_{\\text{Earth}} \\approx 398,600.4418 \\text{ km}^3/\\text{s}^2'
            }
          },
          {
            sectionTitle: 'Orbital Velocity across Regimes',
            paragraphs: [
              'At Low Earth Orbit (altitude ~400 km, r = 6,778 km), orbital velocity is approximately 7.67 km/s (27,600 km/h), resulting in a period of only ~92 minutes.',
              'In contrast, out at Geostationary Orbit (r = 42,164 km), orbital velocity drops to 3.07 km/s (11,068 km/h), and the period stretches to match Earth\'s sidereal day: 23 hours, 56 minutes, 4.09 seconds.'
            ]
          }
        ],
        quiz: [
          {
            id: 'q2-2-1',
            question: 'What is the standard gravitational parameter (μ = GM) for Earth?',
            options: ['~398,600 km³/s²', '~9.81 m/s²', '~1.327 × 10¹¹ km³/s²', '~6.674 × 10⁻¹¹ N m²/kg²'],
            correctAnswer: 0,
            explanation: 'Earth\'s gravitational parameter μ = G*M_Earth is approximately 398,600.44 km³/s², an essential constant in orbital mechanics.'
          }
        ]
      },
      {
        id: 'l2-3',
        levelId: 2,
        title: 'LEO, MEO, and Geostationary Orbit (GEO)',
        shortDesc: 'Compare orbital regimes: altitudes, latency, coverage footprint, radiation belts, and orbital decay.',
        readTime: '9 min',
        difficulty: 'Intermediate',
        tags: ['LEO', 'MEO', 'GEO', 'Van Allen'],
        bannerImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
        summary: 'Explore Low Earth Orbit (160–2,000 km), Medium Earth Orbit (2,000–35,786 km), and Geostationary Orbit (35,786 km), balancing latency against coverage.',
        content: [
          {
            sectionTitle: 'The Three Primary Orbital Altitude Regimes',
            paragraphs: [
              '1. Low Earth Orbit (LEO, 160 – 2,000 km): Home to the ISS, Hubble, Earth observation satellites, and Starlink. Benefits include minimal signal latency (10–30 ms) and high imaging resolution. Drawbacks include atmospheric drag causing decay and limited ground pass windows (10–15 mins).',
              '2. Medium Earth Orbit (MEO, 2,000 – 35,786 km): Mostly occupied by Global Navigation Satellite Systems (GNSS) like GPS (20,200 km), Galileo (23,222 km), and GLONASS (19,100 km). Satellites avoid the peak intensity of the inner and outer Van Allen radiation belts.',
              '3. Geostationary Orbit (GEO, exactly 35,786 km above the equator): Orbit period precisely equals Earth\'s rotation (1 sidereal day). To an observer on the ground, a GEO satellite remains frozen at a fixed azimuth and elevation. Ideal for weather broadcasting and telecommunications.'
            ],
            callout: {
              type: 'tip',
              title: 'Latency Comparison',
              body: 'Speed of light round-trip latency to LEO is ~15-30 ms, while for GEO it is ~240-280 ms. This makes LEO essential for high-speed interactive internet and voice communications.'
            }
          }
        ],
        quiz: [
          {
            id: 'q2-3-1',
            question: 'What is the exact altitude of a Geostationary Orbit above Earth\'s equator?',
            options: ['400 km', '20,200 km', '35,786 km', '100,000 km'],
            correctAnswer: 2,
            explanation: 'GEO altitude is exactly 35,786 km above Earth\'s mean sea level (or semi-major axis of 42,164 km from Earth\'s center).'
          },
          {
            id: 'q2-3-2',
            question: 'Which navigation constellation operates at approximately 20,200 km altitude in MEO?',
            options: ['Starlink', 'United States GPS (Navstar)', 'Hubble Space Telescope', 'Iridium-NEXT'],
            correctAnswer: 1,
            explanation: 'The US GPS constellation orbits in MEO at ~20,200 km altitude with a period of roughly 11 hours and 58 minutes (two orbits per sidereal day).'
          }
        ]
      },
      {
        id: 'l2-4',
        levelId: 2,
        title: 'Satellite Anatomy: The Bus and The Payload',
        shortDesc: 'Dissect satellite subsystems: structure, AOCS, EPS, TTC, thermal control, and payload sensors.',
        readTime: '9 min',
        difficulty: 'Advanced',
        tags: ['Spacecraft Systems', 'Anatomy', 'Subsystems'],
        bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
        summary: 'A satellite comprises the Bus (infrastructure supporting life and flight) and the Payload (the revenue or scientific equipment).',
        content: [
          {
            sectionTitle: 'Subsystem Breakdown',
            paragraphs: [
              'Spacecraft engineers categorize satellite hardware into distinct, interconnected subsystems:',
              '• AOCS (Attitude and Orbit Control System): Determines orientation using star trackers, sun sensors, and IMUs; corrects orientation using reaction wheels, control moment gyros, and magnetorquers.',
              '• EPS (Electrical Power Subsystem): Photovoltaic solar panels, power distribution units (PDU), and Li-ion battery banks for eclipse periods.',
              '• TT&C (Telemetry, Tracking, and Command): S-band/X-band transponders communicating spacecraft health data and uplink commands.',
              '• TCS (Thermal Control System): Multilayer insulation (MLI) blankets, heat pipes, radiators, and heaters balancing temperatures between +120°C in direct sunlight and -150°C in shadow.'
            ]
          }
        ],
        quiz: [
          {
            id: 'q2-4-1',
            question: 'What mechanism do reaction wheels use to rotate a spacecraft in vacuum without expelling propellant?',
            options: [
              'Conservation of angular momentum (spinning an internal flywheel causes the spacecraft body to counter-rotate)',
              'Solar radiation photon pressure reflection',
              'Ion drag against the upper exosphere',
              'Gravitational gradient torque'
            ],
            correctAnswer: 0,
            explanation: 'Reaction wheels apply torque by accelerating or decelerating an internal flywheel, rotating the satellite in the opposite direction through conservation of angular momentum.'
          }
        ]
      },
      {
        id: 'l2-5',
        levelId: 2,
        title: 'Power Systems and Onboard Computers (OBDH)',
        shortDesc: 'Solar cell efficiency, radiation hardening against single-event upsets, and real-time flight software.',
        readTime: '8 min',
        difficulty: 'Advanced',
        tags: ['Power', 'Computers', 'Radiation Hardening'],
        bannerImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
        summary: 'Learn how triple-junction GaAs solar arrays produce kilowatts and how radiation-hardened processors survive cosmic rays.',
        content: [
          {
            sectionTitle: 'Surviving the Space Radiation Environment',
            paragraphs: [
              'In space, high-energy galactic cosmic rays and solar energetic particles can penetrate electronics, causing Single Event Upsets (SEU), bit flips, and destructive latch-ups.',
              'Spacecraft flight computers use radiation-hardened silicon (such as the BAE RAD750 or Vorago ARM cores) manufactured with silicon-on-insulator (SOI) processes, accompanied by Triple Modular Redundancy (TMR) where three processors execute identical code and vote on the valid result.'
            ]
          }
        ],
        quiz: [
          {
            id: 'q2-5-1',
            question: 'What is Triple Modular Redundancy (TMR) in spacecraft computing?',
            options: [
              'Running three independent software routines and taking a majority vote to protect against radiation bit-flips',
              'Using three batteries in series to triple voltage',
              'Transmitting radio signals on three frequencies simultaneously',
              'Having three solar panels oriented at 120-degree angles'
            ],
            correctAnswer: 0,
            explanation: 'TMR is an architectural fault-tolerant design where three identical hardware logic blocks compute concurrently and feed a majority voter circuit.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Satellite Applications',
    goal: 'Understand how orbital platforms transform daily life, science, and global infrastructure.',
    description: 'Explore satellite navigation trilateration, global telecommunication networks, meteorological forecasting, remote sensing radar, and optical spectral bands.',
    badge: 'Applied Astronavigator',
    color: 'from-emerald-500 to-teal-400',
    iconName: 'Globe',
    lessons: [
      {
        id: 'l3-1',
        levelId: 3,
        title: 'GPS and Satellite Navigation: Trilateration in 4D',
        shortDesc: 'How 31 atomic clocks in orbit pinpoint your position within centimeters using general relativity.',
        readTime: '8 min',
        difficulty: 'Intermediate',
        tags: ['GPS', 'Relativity', 'Navigation'],
        bannerImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
        summary: 'GPS calculates latitude, longitude, altitude, and clock bias using pseudorange timing from at least four simultaneous satellite signals.',
        content: [
          {
            sectionTitle: 'Why You Need Four Satellites',
            paragraphs: [
              'Each GPS satellite broadcasts a continuous signal containing precise orbital ephemeris data and the exact time the signal was transmitted by an onboard rubidium or cesium atomic clock.',
              'Your smartphone receiver measures the time delay Δt for the radio signal (traveling at the speed of light c) to arrive, calculating a spherical distance range: r = c × Δt.',
              'With one satellite, you are somewhere on a giant sphere. With two, you are on the circle where two spheres intersect. With three, two intersection points remain (one of which is deep in space). The fourth satellite resolves the spatial ambiguity AND solves for the clock bias in your phone\'s cheap quartz oscillator!'
            ],
            callout: {
              type: 'info',
              title: 'Einstein\'s Relativity in Action',
              body: 'Special relativity makes satellite clocks run ~7 microseconds slower per day (due to velocity), while General relativity makes them run ~45 microseconds faster per day (weaker gravity). Net result: satellite clocks tick 38 microseconds faster per day! Without relativistic correction, GPS errors would accumulate by over 10 km daily!'
            }
          }
        ],
        quiz: [
          {
            id: 'q3-1-1',
            question: 'What is the minimum number of GPS satellites needed to compute a 3D position and clock offset?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 3,
            explanation: 'Four satellites are mathematically required to solve for four unknowns: X, Y, Z spatial coordinates and receiver clock bias (Δt).'
          }
        ]
      },
      {
        id: 'l3-2',
        levelId: 3,
        title: 'Earth Observation and Remote Sensing',
        shortDesc: 'Multispectral and hyperspectral imaging, synthetic aperture radar (SAR), and climate tracking.',
        readTime: '8 min',
        difficulty: 'Intermediate',
        tags: ['Remote Sensing', 'Earth', 'SAR', 'Climate'],
        bannerImage: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
        summary: 'Satellites image Earth across visible, near-infrared, thermal, and microwave radar frequencies to monitor deforestation, ice sheets, and crop health.',
        content: [
          {
            sectionTitle: 'Seeing the Invisible: Normalized Difference Vegetation Index (NDVI)',
            paragraphs: [
              'Healthy vegetation absorbs visible red light for photosynthesis while vigorously reflecting Near-Infrared (NIR) light from plant mesophyll cell walls. Earth observation satellites like Landsat and Sentinel calculate NDVI:',
              'NDVI = (NIR - Red) / (NIR + Red)'
            ]
          }
        ],
        quiz: [
          {
            id: 'q3-2-1',
            question: 'What is an advantage of Synthetic Aperture Radar (SAR) over optical satellite imagery?',
            options: [
              'SAR can image through darkness and thick cloud cover.',
              'SAR requires no electrical power.',
              'SAR can capture true 4K color images.',
              'SAR operates only at geostationary altitudes.'
            ],
            correctAnswer: 0,
            explanation: 'Because radar operates in microwave bands (centimeter wavelengths), SAR signals penetrate clouds, atmospheric haze, and darkness.'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Space Exploration',
    goal: 'Discover how we propel spacecraft, land rovers, and peer into the deep past.',
    description: 'Master Tsiolkovsky\'s rocket equation, planetary entry, descent, and landing (EDL), lunar habitats, and flagship space observatories.',
    badge: 'Deep Space Explorer',
    color: 'from-amber-500 to-orange-500',
    iconName: 'Rocket',
    lessons: [
      {
        id: 'l4-1',
        levelId: 4,
        title: 'Rocket Propulsion: The Tyranny of the Rocket Equation',
        shortDesc: 'Understand delta-v, specific impulse (Isp), multi-stage rockets, and cryogenic propellants.',
        readTime: '9 min',
        difficulty: 'Intermediate',
        tags: ['Propulsion', 'Rockets', 'Delta-v'],
        bannerImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=80',
        summary: 'To reach orbit, a rocket must accelerate propellant rearward. Konstantin Tsiolkovsky showed why rocket mass grows exponentially with mission delta-v.',
        content: [
          {
            sectionTitle: 'Tsiolkovsky\'s Ideal Rocket Equation',
            paragraphs: [
              'Reaching Low Earth Orbit requires a total velocity change (delta-v, Δv) of approximately 9.4 km/s after accounting for atmospheric drag and gravitational losses. Because propellant has mass, the rocket must lift the fuel that will be burned minutes later.',
              'Tsiolkovsky derived the fundamental law of rocketry in 1903:'
            ],
            callout: {
              type: 'formula',
              title: 'The Tsiolkovsky Rocket Equation',
              body: 'Velocity change as a function of effective exhaust velocity and mass ratio:',
              formula: '\\Delta v = I_{sp} \\cdot g_0 \\cdot \\ln\\left(\\frac{m_0}{m_f}\\right)'
            }
          }
        ],
        quiz: [
          {
            id: 'q4-1-1',
            question: 'What does Specific Impulse (Isp) measure in a rocket engine?',
            options: [
              'Engine combustion efficiency (seconds of thrust produced per unit of propellant weight flow)',
              'Total height of the rocket in meters',
              'Maximum payload payload bay volume',
              'The ignition temperature inside the preburner'
            ],
            correctAnswer: 0,
            explanation: 'Specific impulse (measured in seconds) is the fuel efficiency metric of rocketry: how long 1 pound of propellant can deliver 1 pound of thrust.'
          }
        ]
      },
      {
        id: 'l4-2',
        levelId: 4,
        title: 'Space Telescopes: Peering into Cosmic Dawn',
        shortDesc: 'How placing observatories outside the atmosphere revolutionizes infrared and optical astrophysics.',
        readTime: '8 min',
        difficulty: 'Intermediate',
        tags: ['JWST', 'Hubble', 'Telescopes', 'Infrared'],
        bannerImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1200&q=80',
        summary: 'From Hubble\'s 2.4-meter mirror in LEO to JWST\'s 6.5-meter beryllium mirror at Sun-Earth Lagrange Point 2.',
        content: [
          {
            sectionTitle: 'Lagrange Point 2 (L2): The Ideal Cosmic Post',
            paragraphs: [
              'Ground telescopes must contend with atmospheric turbulence (seeing), weather, and absorption of infrared and ultraviolet light by water vapor and ozone.',
              'The James Webb Space Telescope (JWST) was sent 1.5 million kilometers away from Earth to the Sun-Earth L2 point. At L2, gravitational pull from the Sun and Earth combine to allow the spacecraft to stay synchronized with Earth\'s annual orbit, keeping a five-layer Kapton sunshield permanently facing both the Sun and Earth, cooling instruments below 40 Kelvin (-233°C).'
            ]
          }
        ],
        quiz: [
          {
            id: 'q4-2-1',
            question: 'Where is the James Webb Space Telescope located?',
            options: ['Low Earth Orbit (550 km)', 'Sun-Earth Lagrange Point 2 (1.5 million km from Earth)', 'Geostationary Orbit (35,786 km)', 'Lunar orbit'],
            correctAnswer: 1,
            explanation: 'JWST orbits the second Sun-Earth Lagrange point (L2), approximately 1.5 million kilometers on the night side of Earth.'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Astronomy and the Universe',
    goal: 'Explore the frontier of cosmological physics, black holes, and dark matter.',
    description: 'Investigate the dramatic demise of massive stars, event horizons and singularity physics, exoplanetary transit methods, and cosmological expansion.',
    badge: 'Master of the Cosmos',
    color: 'from-purple-500 to-pink-500',
    iconName: 'Flame',
    lessons: [
      {
        id: 'l5-1',
        levelId: 5,
        title: 'Black Holes: Event Horizons and Spacetime Curvature',
        shortDesc: 'General relativity, Schwarzschild radius, photon spheres, and accretion disk physics.',
        readTime: '10 min',
        difficulty: 'Advanced',
        tags: ['Black Holes', 'General Relativity', 'Astrophysics'],
        bannerImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
        summary: 'When mass collapses within its Schwarzschild radius, escape velocity exceeds light itself, producing a gravitational singularity enclosed by an event horizon.',
        content: [
          {
            sectionTitle: 'The Schwarzschild Radius',
            paragraphs: [
              'Karl Schwarzschild solved Einstein\'s field equations in 1916 for a non-rotating spherical mass. If any object of mass M is compressed into a radius smaller than r_s, nothing in the universe—not even photons—can escape its gravitational pull.',
              'If Earth were crushed into a black hole, its Schwarzschild radius would be roughly 9 millimeters (the size of a marble). For our Sun, it would be approximately 3 kilometers.'
            ],
            callout: {
              type: 'formula',
              title: 'Schwarzschild Radius Formula',
              body: 'Radius of the event horizon for a non-rotating black hole:',
              formula: 'r_s = \\frac{2 G M}{c^2}'
            }
          }
        ],
        quiz: [
          {
            id: 'q5-1-1',
            question: 'What happens at the event horizon of a black hole?',
            options: [
              'The escape velocity equals the speed of light in vacuum.',
              'Matter spontaneously converts into dark energy.',
              'Nuclear fusion transitions into antimatter production.',
              'Time stops flowing everywhere in the universe.'
            ],
            correctAnswer: 0,
            explanation: 'The event horizon marks the boundary where spacetime curvature is so extreme that the local escape velocity equals the speed of light.'
          }
        ]
      },
      {
        id: 'l5-2',
        levelId: 5,
        title: 'Exoplanets: Searching for Habitable Worlds',
        shortDesc: 'Transit photometry, radial velocity Doppler shifts, transit spectroscopy, and the Goldilocks zone.',
        readTime: '8 min',
        difficulty: 'Intermediate',
        tags: ['Exoplanets', 'Astrobiology', 'Habitable Zone'],
        bannerImage: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1200&q=80',
        summary: 'Over 5,500 planets orbiting distant stars have been discovered using the Kepler transit method and high-precision radial velocity spectroscopy.',
        content: [
          {
            sectionTitle: 'The Transit Method',
            paragraphs: [
              'When an exoplanet\'s orbit aligns with our line of sight, the planet transits in front of its host star, creating a periodic dip in the star\'s apparent brightness. The fractional depth of the light curve reveals the ratio of planet radius to stellar radius:'
            ],
            callout: {
              type: 'formula',
              title: 'Transit Depth Equation',
              body: 'Fractional dip in stellar luminosity:',
              formula: '\\Delta F = \\frac{F_{\\text{out}} - F_{\\text{in}}}{F_{\\text{out}}} = \\left(\\frac{R_{\\text{planet}}}{R_{\\text{star}}}\\right)^2'
            }
          }
        ],
        quiz: [
          {
            id: 'q5-2-1',
            question: 'What information does the transit method provide about an exoplanet?',
            options: [
              'The physical radius of the planet relative to its host star',
              'The exact atmospheric chemical composition without spectroscopy',
              'The magnetic field strength at the core',
              'The surface age in millions of years'
            ],
            correctAnswer: 0,
            explanation: 'The depth of the transit light curve directly measures (R_planet / R_star)², yielding the physical radius of the planet.'
          }
        ]
      }
    ]
  }
];
