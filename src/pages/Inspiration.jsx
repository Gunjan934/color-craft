import React, { useState } from 'react';
import './Pages.css';

const Inspiration = () => {
  const trendingPalettes = [
    { id: 1, name: 'Ocean Wave', colors: ['#2193B0', '#6DD5ED', '#ABE9CD', '#F0F9A0'] },
    { id: 2, name: 'Sunset Dream', colors: ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1'] },
    { id: 3, name: 'Forest Serenity', colors: ['#2D5016', '#7CB342', '#AED581', '#E8F5E9'] },
    { id: 4, name: 'Purple Haze', colors: ['#6A4C93', '#9D4EDD', '#C77DFF', '#E9D5FF'] },
    { id: 5, name: 'Golden Sands', colors: ['#F4A261', '#E76F51', '#2A9D8F', '#264653'] },
    { id: 6, name: 'Arctic Aurora', colors: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D'] }
  ];

  const [selectedPalette, setSelectedPalette] = useState(null);
  const [generatedPalette, setGeneratedPalette] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState([]);

  const generateSimilarPalette = (baseColors) => {
    // Simple algorithm to generate similar palette by adjusting hues
    const newColors = baseColors.map(color => {
      const rgb = hexToRgb(color);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      hsl.h = (hsl.h + Math.random() * 60 - 30) % 360; // Random hue shift
      const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
      return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    });
    setGeneratedPalette(newColors);

    // Save the generated palette to localStorage
    const palette = {
      id: Date.now().toString(),
      name: 'Generated Palette',
      colors: newColors,
      createdAt: new Date().toISOString(),
      tags: ['generated', 'inspiration']
    };
    const existing = JSON.parse(localStorage.getItem('generatedPalettes') || '[]');
    const updated = [palette, ...existing];
    localStorage.setItem('generatedPalettes', JSON.stringify(updated));
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) r = g = b = l;
    else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return (
    <div className="inspiration-page">
      <div className="container">
        <div className="page-header">
          <h1>Color Inspiration</h1>
          <p>Trending color palettes from the community</p>
        </div>

        <div className="palettes-grid">
          {trendingPalettes.map(palette => (
            <div key={palette.id} className="palette-card" onClick={() => setSelectedPalette(palette)}>
              <h3>{palette.name}</h3>
              <div className="palette-colors">
                {palette.colors.map((color, i) => (
                  <div key={i} className="palette-color" style={{ backgroundColor: color }}></div>
                ))}
              </div>
              <button className="generate-similar-btn" onClick={(e) => { e.stopPropagation(); generateSimilarPalette(palette.colors); }}>
                Generate Similar
              </button>
            </div>
          ))}
        </div>

        {generatedPalette && (
          <div className="generated-palette-section">
            <h2>Generated Similar Palette</h2>
            <div className="palette-colors">
              {generatedPalette.map((color, i) => (
                <div key={i} className="palette-color" style={{ backgroundColor: color }}></div>
              ))}
            </div>
            <button className="save-palette-btn">Save Palette</button>
          </div>
        )}

        {selectedPalette && (
          <div className="palette-detail-modal">
            <div className="modal-content">
              <h2>{selectedPalette.name}</h2>
              <div className="palette-colors large">
                {selectedPalette.colors.map((color, i) => (
                  <div key={i} className="palette-color large" style={{ backgroundColor: color }}>
                    <span>{color}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setSelectedPalette(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspiration;
