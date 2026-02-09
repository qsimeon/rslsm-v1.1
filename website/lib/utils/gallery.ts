/**
 * Gallery data utilities for CAD renders
 */

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  angle?: string;
  resolution?: string;
  components?: string[];
  category: 'orthographic' | 'perspective' | 'closeup' | 'assembly' | 'subsystem';
}

export interface SubsystemInfo {
  id: string;
  title: string;
  description: string;
  image: string;
  components: string[];
}

/**
 * Create gallery data for CAD renders
 * When real renders are available, update the src paths
 */
export function createImageGalleryData(): GalleryImage[] {
  return [
    {
      id: 'isometric-main',
      src: '/cad/renders/isometric-main.png',
      thumbnail: '/cad/renders/thumbs/isometric-main.png',
      title: 'Main Isometric View',
      description: 'Complete system overview showing all major subsystems and optical paths',
      angle: '45° isometric',
      resolution: '2000 x 1500 px',
      components: ['Illumination path', 'Imaging path', 'Electronics rack', 'Optical table'],
      category: 'perspective',
    },
    {
      id: 'front',
      src: '/cad/renders/front.png',
      thumbnail: '/cad/renders/thumbs/front.png',
      title: 'Front View',
      description: 'Orthographic front view showing the illumination and detection paths',
      angle: '0° (Front)',
      resolution: '2000 x 1500 px',
      components: ['Detection optics', 'Sample chamber', 'Illumination optics'],
      category: 'orthographic',
    },
    {
      id: 'right',
      src: '/cad/renders/right.png',
      thumbnail: '/cad/renders/thumbs/right.png',
      title: 'Right Side View',
      description: 'Orthographic side view showing the optical table layout and depth',
      angle: '90° (Right)',
      resolution: '2000 x 1500 px',
      components: ['Optical table', 'Mounting posts', 'Cable routing'],
      category: 'orthographic',
    },
    {
      id: 'back',
      src: '/cad/renders/back.png',
      thumbnail: '/cad/renders/thumbs/back.png',
      title: 'Back View',
      description: 'Rear view showing cable management and electronics access',
      angle: '180° (Back)',
      resolution: '2000 x 1500 px',
      components: ['Electronics rack', 'Power distribution', 'Control systems'],
      category: 'orthographic',
    },
    {
      id: 'left',
      src: '/cad/renders/left.png',
      thumbnail: '/cad/renders/thumbs/left.png',
      title: 'Left Side View',
      description: 'Orthographic left side view showing laser and optics positioning',
      angle: '270° (Left)',
      resolution: '2000 x 1500 px',
      components: ['Laser modules', 'Beam expansion optics', 'Safety enclosures'],
      category: 'orthographic',
    },
    {
      id: 'top',
      src: '/cad/renders/top.png',
      thumbnail: '/cad/renders/thumbs/top.png',
      title: 'Top View',
      description: 'Orthographic top view showing the complete system footprint',
      angle: 'Top',
      resolution: '2000 x 1500 px',
      components: ['Complete layout', 'Footprint', 'Component spacing'],
      category: 'orthographic',
    },
    {
      id: 'illumination-closeup',
      src: '/cad/renders/illumination-closeup.png',
      thumbnail: '/cad/renders/thumbs/illumination-closeup.png',
      title: 'Illumination Path Detail',
      description: 'Close-up view of laser source, beam optics, and light sheet generation',
      angle: 'Detail view',
      resolution: '2000 x 1500 px',
      components: ['405nm laser', '488nm laser', '561nm laser', 'Beam expander', 'Dichroic mirrors', 'Galvo scanner'],
      category: 'closeup',
    },
    {
      id: 'imaging-closeup',
      src: '/cad/renders/imaging-closeup.png',
      thumbnail: '/cad/renders/thumbs/imaging-closeup.png',
      title: 'Imaging Path Detail',
      description: 'Close-up of detection optics and camera system',
      angle: 'Detail view',
      resolution: '2000 x 1500 px',
      components: ['Detection objective', 'Tube lens', 'Emission filters', 'sCMOS camera', 'Filter wheel'],
      category: 'closeup',
    },
    {
      id: 'electronics-closeup',
      src: '/cad/renders/electronics-closeup.png',
      thumbnail: '/cad/renders/thumbs/electronics-closeup.png',
      title: 'Electronics & Mounting Detail',
      description: 'Close-up of control electronics and mounting structure',
      angle: 'Detail view',
      resolution: '2000 x 1500 px',
      components: ['Motor controllers', 'DAQ system', 'Power supplies', 'Mounting brackets', 'Cable management'],
      category: 'closeup',
    },
    {
      id: 'exploded-view',
      src: '/cad/renders/exploded-view.png',
      thumbnail: '/cad/renders/thumbs/exploded-view.png',
      title: 'Exploded Assembly',
      description: 'Exploded view showing all major component groups and assembly sequence',
      angle: 'Exploded',
      resolution: '2000 x 1500 px',
      components: ['All subsystems separated', 'Assembly order visible'],
      category: 'assembly',
    },
    {
      id: 'subsystem-illumination',
      src: '/cad/renders/subsystem-illumination.png',
      thumbnail: '/cad/renders/thumbs/subsystem-illumination.png',
      title: 'Illumination Subsystem',
      description: 'Isolated view of complete illumination subsystem',
      angle: 'Subsystem',
      resolution: '2000 x 1500 px',
      components: ['Laser modules', 'Beam delivery optics', 'Light sheet generation', 'Remote scanning system'],
      category: 'subsystem',
    },
    {
      id: 'subsystem-imaging',
      src: '/cad/renders/subsystem-imaging.png',
      thumbnail: '/cad/renders/thumbs/subsystem-imaging.png',
      title: 'Imaging Subsystem',
      description: 'Isolated view of complete detection subsystem',
      angle: 'Subsystem',
      resolution: '2000 x 1500 px',
      components: ['Detection optics', 'Camera system', 'Emission filters', 'Mounting hardware'],
      category: 'subsystem',
    },
    {
      id: 'subsystem-electronics',
      src: '/cad/renders/subsystem-electronics.png',
      thumbnail: '/cad/renders/thumbs/subsystem-electronics.png',
      title: 'Electronics Subsystem',
      description: 'Isolated view of control electronics and power distribution',
      angle: 'Subsystem',
      resolution: '2000 x 1500 px',
      components: ['Motor controllers', 'DAQ hardware', 'Power distribution', 'Control computer'],
      category: 'subsystem',
    },
  ];
}

/**
 * Get subsystem information for the subsystem focus section
 */
export function getSubsystemData(): SubsystemInfo[] {
  return [
    {
      id: 'illumination',
      title: 'Illumination Path',
      description: 'Multi-wavelength laser system with remote scanning for light sheet generation and excitation',
      image: '/cad/renders/subsystem-illumination.png',
      components: [
        '405nm Laser (Coherent OBIS)',
        '488nm Laser (Coherent OBIS)',
        '561nm Laser (Coherent Genesis)',
        'Beam Expansion Optics',
        'Dichroic Beam Combiners',
        'Galvo Scanner System',
        'Remote Scanning Optics',
        'Illumination Objective',
      ],
    },
    {
      id: 'imaging',
      title: 'Imaging Path',
      description: 'High-NA detection optics and scientific camera for voltage imaging at cellular resolution',
      image: '/cad/renders/subsystem-imaging.png',
      components: [
        'Detection Objective (NA 1.0)',
        'Tube Lens (200mm FL)',
        'Emission Filter Wheel',
        'Bandpass Filters',
        'sCMOS Camera (Hamamatsu)',
        'Camera Cooling System',
        'Mounting Hardware',
      ],
    },
    {
      id: 'electronics',
      title: 'Electronics & Mechanical',
      description: 'Precision motion control, data acquisition, and mounting structure for stable operation',
      image: '/cad/renders/subsystem-electronics.png',
      components: [
        'Motorized XY Stage',
        'Z-Piezo Stage',
        'National Instruments DAQ',
        'Galvo Controllers',
        'Power Distribution Unit',
        'Optical Table (4ft x 8ft)',
        'Vibration Isolation',
        'Cable Management System',
      ],
    },
  ];
}

/**
 * System specifications for the technical specs table
 */
export interface SystemSpec {
  parameter: string;
  value: string;
}

export function getSystemSpecs(): SystemSpec[] {
  return [
    { parameter: 'Total Components', value: '547 parts' },
    { parameter: 'Optical Wavelengths', value: '405, 488, 561, 639 nm' },
    { parameter: 'Detection Objective NA', value: '1.0' },
    { parameter: 'Illumination Objective NA', value: '0.8' },
    { parameter: 'Working Distance', value: '2.0 mm' },
    { parameter: 'Field of View', value: '800 x 800 µm' },
    { parameter: 'Axial Resolution', value: '~1.0 µm' },
    { parameter: 'Lateral Resolution', value: '~0.4 µm' },
    { parameter: 'Scanning Speed', value: 'Up to 200 Hz volumetric' },
    { parameter: 'Sample Type', value: 'Zebrafish larvae (whole brain)' },
    { parameter: 'Operating Temperature', value: '23-25°C' },
    { parameter: 'System Footprint', value: '4ft x 8ft optical table' },
  ];
}
