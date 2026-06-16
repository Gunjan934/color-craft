import React, { useState } from 'react';
import './Pages.css';

const Tools = () => {
  const [activeTool, setActiveTool] = useState('analogous');
  const [baseColor, setBaseColor] = useState('#FF6B6B');
  const [generatedColors, setGeneratedColors] = useState([]);

  const tools = [
    {
      id: 'analogous',
      title: 'Analogous Colors',
      description: 'Colors next to each other on the color wheel, creating harmony',
      example: ['#FF6B6B', '#FF8E53', '#FFB947'],
      icon: '🌈'
    },
    {
      id: 'complementary',
      title: 'Complementary Colors',
      description: 'Colors opposite each other, creating contrast',
      example: ['#FF6B6B', '#4ECDC4'],
      icon: '⚡'
    },
    {
      id: 'triadic',
      title: 'Triadic Colors',
      description: 'Three evenly spaced colors, creating balance',
      example: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      icon: '🔺'
    },
    {
      id: 'monochromatic',
      title: 'Monochromatic Colors',
      description: 'Variations of the same hue with different saturation and brightness',
      example: ['#FF6B6B', '#FF9999', '#FFB3B3', '#FFCCCC'],
      icon: '🎨'
    },
    {
      id: 'tetradic',
      title: 'Tetradic Colors',
      description: 'Two complementary pairs, creating rich and complex palettes',
      example: ['#FF6B6B', '#4ECDC4', '#FFB947', '#8B5CF6'],
      icon: '💎'
    },
    {
      id: 'split-complementary',
      title: 'Split-Complementary Colors',
      description: 'A base color and two colors adjacent to its complement, offering high contrast with less tension',
      example: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      icon: '🔄'
    }
  ];

  const generatePalette = (toolId, baseColor) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [baseColor];

    switch (toolId) {
      case 'analogous':
        for (let i = 1; i < 5; i++) {
          const newHsl = { ...hsl };
          newHsl.h = (hsl.h + (i * 30)) % 360;
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
      case 'complementary':
        const compHsl = { ...hsl };
        compHsl.h = (hsl.h + 180) % 360;
        const compRgb = hslToRgb(compHsl.h, compHsl.s, compHsl.l);
        colors.push(rgbToHex(compRgb.r, compRgb.g, compRgb.b));
        break;
      case 'triadic':
        for (let i = 1; i < 3; i++) {
          const newHsl = { ...hsl };
          newHsl.h = (hsl.h + (i * 120)) % 360;
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
      case 'monochromatic':
        for (let i = 1; i < 5; i++) {
          const newHsl = { ...hsl };
          newHsl.l = Math.min(95, Math.max(5, hsl.l + (i - 2) * 20));
          const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
          colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        }
        break;
      case 'tetradic':
        const tetrad1 = { ...hsl };
        tetrad1.h = (hsl.h + 90) % 360;
        const tetrad2 = { ...hsl };
        tetrad2.h = (hsl.h + 180) % 360;
        const tetrad3 = { ...hsl };
        tetrad3.h = (hsl.h + 270) % 360;
        colors.push(
          rgbToHex(...Object.values(hslToRgb(tetrad1.h, tetrad1.s, tetrad1.l))),
          rgbToHex(...Object.values(hslToRgb(tetrad2.h, tetrad2.s, tetrad2.l))),
          rgbToHex(...Object.values(hslToRgb(tetrad3.h, tetrad3.s, tetrad3.l)))
        );
        break;
      case 'split-complementary':
        const split1 = { ...hsl };
        split1.h = (hsl.h + 150) % 360;
        const split2 = { ...hsl };
        split2.h = (hsl.h + 210) % 360;
        colors.push(
          rgbToHex(...Object.values(hslToRgb(split1.h, split1.s, split1.l))),
          rgbToHex(...Object.values(hslToRgb(split2.h, split2.s, split2.l)))
        );
        break;
    }
    return colors;
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

  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
    const colors = generatePalette(toolId, baseColor);
    setGeneratedColors(colors);
  };

  const handleColorChange = (color) => {
    setBaseColor(color);
    const colors = generatePalette(activeTool, color);
    setGeneratedColors(colors);
  };

  return (
    <div className="tools-page">
      <div className="container">
        <div className="page-header">
          <h1>Color Generation Tools</h1>
          <p>Interactive tools to explore and create beautiful color palettes</p>
        </div>

        <div className="tools-interactive">
          <div className="color-picker-section">
            <label>Base Color:</label>
            <div className="color-input-group">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="color-picker"
              />
              <input
                type="text"
                value={baseColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="color-text-input"
              />
            </div>
          </div>

          <div className="tools-selector">
            {tools.map((tool) => (
              <button
                key={tool.id}
                className={`tool-selector-btn ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => handleToolSelect(tool.id)}
              >
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-title">{tool.title}</span>
              </button>
            ))}
          </div>

          <div className="generated-palette-display">
            <h3>Generated Palette</h3>
            <div className="palette-colors">
              {generatedColors.map((color, i) => (
                <div key={i} className="palette-color" style={{ backgroundColor: color }}>
                  <span>{color}</span>
                </div>
              ))}
            </div>
            {generatedColors.length > 0 && (
              <div className="palette-actions">
                <button
                  className="save-palette-btn"
                  onClick={() => {
                    const palette = {
                      id: Date.now().toString(),
                      name: `${activeTool.charAt(0).toUpperCase() + activeTool.slice(1)} Palette`,
                      colors: generatedColors,
                      createdAt: new Date().toISOString(),
                      tags: [activeTool, 'tools-generated']
                    };
                    const existing = JSON.parse(localStorage.getItem('generatedPalettes') || '[]');
                    const updated = [palette, ...existing];
                    localStorage.setItem('generatedPalettes', JSON.stringify(updated));

                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('palettesUpdated'));

                    alert('Palette saved to your Palettes page!');
                  }}
                >
                  💾 Save to Palettes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="tools-grid">
          {tools.map((tool, i) => (
            <div key={i} className="tool-card">
              <div className="tool-header">
                <span className="tool-icon">{tool.icon}</span>
                <h3>{tool.title}</h3>
              </div>
              <p>{tool.description}</p>
              <div className="tool-colors">
                {tool.example.map((color, j) => (
                  <div key={j} className="tool-color" style={{ backgroundColor: color }}></div>
                ))}
              </div>
              <button className="try-tool-btn" onClick={() => handleToolSelect(tool.id)}>
                Try This Tool
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
