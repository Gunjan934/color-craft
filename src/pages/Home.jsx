import React from 'react';
import Generator from '../components/Generator';
import '../App.css';

const Home = () => {
  const glassFusionBackground = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Glass gradient definitions -->
        <radialGradient id="glass1" cx="30%" cy="30%" r="60%">
          <stop offset="0%" style="stop-color:rgba(255,183,77,0.15);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,183,77,0.08);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,183,77,0.02);stop-opacity:1" />
        </radialGradient>
        <radialGradient id="glass2" cx="70%" cy="20%" r="50%">
          <stop offset="0%" style="stop-color:rgba(171,71,188,0.15);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(171,71,188,0.08);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(171,71,188,0.02);stop-opacity:1" />
        </radialGradient>
        <radialGradient id="glass3" cx="20%" cy="70%" r="55%">
          <stop offset="0%" style="stop-color:rgba(107,159,255,0.12);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(107,159,255,0.06);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(107,159,255,0.01);stop-opacity:1" />
        </radialGradient>
        <radialGradient id="glass4" cx="80%" cy="80%" r="45%">
          <stop offset="0%" style="stop-color:rgba(255,152,0,0.12);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,152,0,0.06);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,152,0,0.01);stop-opacity:1" />
        </radialGradient>
        <radialGradient id="glass5" cx="50%" cy="50%" r="40%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(255,255,255,0.05);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0.01);stop-opacity:1" />
        </radialGradient>

        <!-- Color palette fusion patterns -->
        <pattern id="paletteFusion" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <rect width="200" height="200" fill="url(#glass1)" opacity="0.3"/>
          <circle cx="50" cy="50" r="30" fill="url(#glass2)" opacity="0.4"/>
          <rect x="100" y="100" width="60" height="60" fill="url(#glass3)" opacity="0.3"/>
          <circle cx="150" cy="150" r="25" fill="url(#glass4)" opacity="0.4"/>
          <polygon points="25,75 75,25 125,75 75,125" fill="url(#glass5)" opacity="0.2"/>
        </pattern>

        <!-- Glass texture overlay -->
        <pattern id="glassTexture" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/>
          <circle cx="10" cy="30" r="0.5" fill="rgba(255,255,255,0.05)"/>
          <circle cx="30" cy="10" r="0.8" fill="rgba(255,255,255,0.08)"/>
        </pattern>
      </defs>

      <!-- Background layers -->
      <rect width="1200" height="800" fill="url(#paletteFusion)"/>
      <rect width="1200" height="800" fill="url(#glassTexture)"/>
      <rect width="1200" height="800" fill="url(#glass1)" opacity="0.6"/>
      <rect width="1200" height="800" fill="url(#glass2)" opacity="0.5"/>
      <rect width="1200" height="800" fill="url(#glass3)" opacity="0.4"/>
      <rect width="1200" height="800" fill="url(#glass4)" opacity="0.3"/>
      <rect width="1200" height="800" fill="url(#glass5)" opacity="0.7"/>
    </svg>
  `)}`;

  return (
    <div className="home-page" style={{
      backgroundImage: `url("${glassFusionBackground}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      position: 'relative',
      backdropFilter: 'blur(1px)',
      WebkitBackdropFilter: 'blur(1px)'
    }}>
      <Generator />
    </div>
  );
};

export default Home;
