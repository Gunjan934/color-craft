import React, { useState } from 'react';
import './App.css';
import data from './data.json';

// Color utility functions
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
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
  h /= 360;
  s /= 100;
  l /= 100;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
};

const generatePalette = (baseColor, type = 'analogous') => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return [baseColor];
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [baseColor];
  
  switch (type) {
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
  }
  return colors;
};

const isLightColor = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128;
};

function App() {
  const [baseColor, setBaseColor] = useState('#6B9FFF');
  const [harmonyType, setHarmonyType] = useState('analogous');
  const [currentColors, setCurrentColors] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [colorRoles, setColorRoles] = useState({});
  const [previewType, setPreviewType] = useState('website');

  const isGeneratorEnabled = data.app.enableColorPaletteGenerator;

  const handleGeneratePalette = () => {
    if (!isGeneratorEnabled) return;
    const newPalette = generatePalette(baseColor, harmonyType);
    setCurrentColors(newPalette);
    setColorRoles({});
  };

  const handleRandomColor = () => {
    if (!isGeneratorEnabled) return;
    const randomColor = generateRandomColor();
    setBaseColor(randomColor);
    const newPalette = generatePalette(randomColor, harmonyType);
    setCurrentColors(newPalette);
    setColorRoles({});
    // Scroll to palette section after generating
    setTimeout(() => {
      const paletteSection = document.getElementById('palette-section');
      if (paletteSection) {
        paletteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const copyToClipboard = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const assignColorRole = (colorIndex, role) => {
    setColorRoles(prev => ({
      ...prev,
      [colorIndex]: role
    }));
  };

  const getAssignedColors = () => {
    const assigned = {};
    Object.entries(colorRoles).forEach(([colorIndex, role]) => {
      assigned[role] = currentColors[parseInt(colorIndex)];
    });
    return assigned;
  };

  const downloadPalette = () => {
    const assignedColors = getAssignedColors();
    const paletteData = {
      colors: currentColors.map((color, index) => ({
        hex: color,
        rgb: `rgb(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b})`,
        role: colorRoles[index] || null
      })),
      assignedColors,
      harmonyType,
      baseColor
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const assignedColors = getAssignedColors();

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              {data.hero.badge}
            </div>
            <h1 className="hero-title">
              {data.hero.title}
              <span className="gradient-text">{data.hero.titleGradient}</span>
            </h1>
            <p className="hero-description">
              {data.hero.description}
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={handleRandomColor} disabled={!isGeneratorEnabled}>
                {data.hero.buttons.primary}
              </button>
              <button className="secondary-btn" onClick={downloadPalette}>
                {data.hero.buttons.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main" id="generator">
        <div className="container">
          <div className="main-grid">
            {/* Color Generator Panel */}
            <div className="generator-panel">
              <div className="panel-header">
                <h3>{data.generator.title}</h3>
                <button 
                  className="random-btn" 
                  onClick={handleRandomColor}
                  disabled={!isGeneratorEnabled}
                >
                  <span>🔄</span>
                  {data.generator.randomButton}
                </button>
              </div>

              {!isGeneratorEnabled ? (
                <div className="disabled-generator">
                  <div className="disabled-message">
                    <div className="disabled-icon">🚧</div>
                    <h4>{data.generator.disabledMessage}</h4>
                    <p>The color palette generator is currently under development. Please check back soon!</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label>{data.generator.baseColorLabel}</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="color-picker"
                      />
                      <input
                        type="text"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        className="color-text-input"
                        placeholder="#6B9FFF"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{data.generator.harmonyLabel}</label>
                    <select
                      value={harmonyType}
                      onChange={(e) => setHarmonyType(e.target.value)}
                      className="harmony-select"
                    >
                      {data.harmonyTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <button className="generate-btn" onClick={handleGeneratePalette}>
                    <span>👁️</span>
                    {data.generator.generateButton}
                  </button>

                  {currentColors.length > 0 && (
                    <div className="color-roles-section">
                      <h4>{data.generator.rolesSection.title}</h4>
                      <p className="roles-description">
                        {data.generator.rolesSection.description}
                      </p>
                      
                      <div className="color-role-assignments">
                        {currentColors.map((color, index) => (
                          <div key={index} className="color-role-item">
                            <div className="color-role-preview">
                              <div
                                className="role-color-swatch"
                                style={{ backgroundColor: color }}
                              />
                              <span className="role-color-code">{color}</span>
                            </div>
                            <select
                              value={colorRoles[index] || ''}
                              onChange={(e) => assignColorRole(index, e.target.value)}
                              className="role-select"
                            >
                              <option value="">Select role...</option>
                              {data.colorRoles.map(role => (
                                <option key={role.id} value={role.id}>
                                  {role.label} - {role.description}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>

                      {Object.keys(colorRoles).length > 0 && (
                        <div className="assigned-roles-summary">
                          <h5>{data.generator.rolesSection.summaryTitle}</h5>
                          <div className="roles-grid">
                            {Object.entries(assignedColors).map(([role, color]) => (
                              <div key={role} className="role-summary-item">
                                <div
                                  className="role-summary-color"
                                  style={{ backgroundColor: color }}
                                />
                                <div className="role-summary-info">
                                  <span className="role-name">
                                    {data.colorRoles.find(r => r.id === role)?.label}
                                  </span>
                                  <span className="role-color">{color}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Palette Display */}
            <div className="palette-section" id="palette-section">
              {currentColors.length > 0 ? (
                <div className="palette-display">
                  <div className="palette-header">
                    <h3>{data.palette.title}</h3>
                    <div className="palette-actions">
                      <button className="action-btn" onClick={downloadPalette}>
                        <span>📥</span>
                      </button>
                      <button className="action-btn">
                        <span>🔗</span>
                      </button>
                    </div>
                  </div>
                  <div className="palette-colors">
                    {currentColors.map((color, index) => (
                      <div
                        key={index}
                        className="palette-color"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color, index)}
                      >
                        <div className={`color-info ${isLightColor(color) ? 'dark-text' : 'light-text'}`}>
                          <span className="color-number">
                            {colorRoles[index] ? 
                              data.colorRoles.find(r => r.id === colorRoles[index])?.label : 
                              `Color ${index + 1}`
                            }
                          </span>
                          <span className="color-value">{color}</span>
                          <div className="copy-indicator">
                            {copiedIndex === index ? '✅ Copied!' : '📋 Click to copy'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">{data.palette.emptyState.icon}</div>
                  <h3>{data.palette.emptyState.title}</h3>
                  <p>{data.palette.emptyState.description}</p>
                </div>
              )}

              {/* Enhanced Live Preview */}
              {currentColors.length > 0 && (
                <div className="live-preview">
                  <div className="preview-header">
                    <h3>{data.preview.title}</h3>
                    <div className="preview-tabs">
                      {data.preview.tabs.map(tab => (
                        <button 
                          key={tab.id}
                          className={`preview-tab ${previewType === tab.id ? 'active' : ''}`}
                          onClick={() => setPreviewType(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="preview-container">
                    {previewType === 'website' && (
                      <div className="website-preview">
                        <div className="preview-browser">
                          <div className="browser-header">
                            <div className="browser-controls">
                              <span className="control red"></span>
                              <span className="control yellow"></span>
                              <span className="control green"></span>
                            </div>
                            <div className="browser-url">{data.preview.website.url}</div>
                          </div>
                          
                          <div className="browser-content">
                            <header className="site-header" style={{ backgroundColor: assignedColors.primary || currentColors[0] }}>
                              <div className="site-nav">
                                <div className="site-logo" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                  {data.preview.website.logo}
                                </div>
                                <nav className="site-menu">
                                  {data.preview.website.navigation.map((item, i) => (
                                    <span key={item} style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                                      {item}
                                    </span>
                                  ))}
                                </nav>
                              </div>
                            </header>
                            
                            <main className="site-main" style={{ backgroundColor: assignedColors.background || '#ffffff' }}>
                              <section className="hero-section" style={{ backgroundColor: assignedColors.surface || currentColors[1] || currentColors[0] }}>
                                <div className="hero-text">
                                  <h1 className="preview-title">{data.preview.website.hero.title}</h1>
                                  <h2 className="preview-subtitle">{data.preview.website.hero.subtitle}</h2>
                                  <p className="preview-description">{data.preview.website.hero.description}</p>
                                  <button 
                                    className="preview-button"
                                    style={{ backgroundColor: assignedColors.accent || currentColors[2] || currentColors[0] }}
                                  >
                                    {data.preview.website.hero.button}
                                  </button>
                                </div>
                              </section>
                              
                              <section className="content-section">
                                <div className="features-showcase">
                                  <h2 className="section-title">Key Features</h2>
                                  <div className="content-grid">
                                    {data.preview.website.features.map((feature, i) => (
                                      <div 
                                        key={i} 
                                        className="content-card" 
                                        style={{ backgroundColor: assignedColors.surface || currentColors[(i + 1) % currentColors.length] }}
                                      >
                                        <div className="card-header">
                                          <div className="feature-icon">{feature.icon}</div>
                                        </div>
                                        <div className="card-content">
                                          <h3 className="card-title-text">{feature.title}</h3>
                                          <p className="card-description">{feature.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="testimonials-section">
                                  <h2 className="section-title">What Our Users Say</h2>
                                  <div className="testimonials-grid">
                                    {data.preview.website.testimonials.map((testimonial, i) => (
                                      <div 
                                        key={i} 
                                        className="testimonial-card"
                                        style={{ backgroundColor: assignedColors.surface || '#ffffff' }}
                                      >
                                        <div className="testimonial-content">
                                          <div className="rating">
                                            {'★'.repeat(testimonial.rating)}
                                          </div>
                                          <p className="testimonial-text">"{testimonial.text}"</p>
                                          <div className="testimonial-author">
                                            <div className="author-avatar" style={{ backgroundColor: currentColors[i % currentColors.length] }}>
                                              {testimonial.name.charAt(0)}
                                            </div>
                                            <div className="author-info">
                                              <div className="author-name">{testimonial.name}</div>
                                              <div className="author-role">{testimonial.role} at {testimonial.company}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </section>
                            </main>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewType === 'mobile' && (
                      <div className="mobile-preview">
                        <div className="phone-frame">
                          <div className="phone-screen">
                            <div className="status-bar">
                              <span>{data.preview.mobile.statusBar.time}</span>
                              <span>{data.preview.mobile.statusBar.signal}</span>
                              <span>{data.preview.mobile.statusBar.battery}</span>
                            </div>
                            
                            <div className="app-header" style={{ backgroundColor: assignedColors.primary || currentColors[0] }}>
                              <span className="back-btn">←</span>
                              <span className="app-title">{data.preview.mobile.appName}</span>
                              <span className="menu-btn">⋮</span>
                            </div>
                            
                            <div className="app-content" style={{ backgroundColor: assignedColors.background || '#f8f9fa' }}>
                              {data.preview.mobile.cards.map((card, i) => (
                                <div 
                                  key={i} 
                                  className="app-card" 
                                  style={{ backgroundColor: assignedColors.surface || '#ffffff' }}
                                >
                                  <div 
                                    className="card-image" 
                                    style={{ backgroundColor: currentColors[i % currentColors.length] }}
                                  >
                                    <div className="card-category">{card.category}</div>
                                  </div>
                                  <div className="card-body">
                                    <h3 className="card-title-text">{card.title}</h3>
                                    <p className="card-subtitle-text">{card.subtitle}</p>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="app-buttons">
                                {data.preview.mobile.buttons.map((button, i) => (
                                  <button 
                                    key={i}
                                    style={{ backgroundColor: currentColors[i % currentColors.length] }}
                                  >
                                    {button}
                                  </button>
                                ))}
                              </div>
                              
                              <div className="app-list">
                                <h3 className="list-title">Recent Activity</h3>
                                {data.preview.mobile.listItems.map((item, i) => (
                                  <div key={i} className="list-item" style={{ backgroundColor: assignedColors.surface || '#ffffff' }}>
                                    <div className="list-avatar" style={{ backgroundColor: currentColors[i % currentColors.length] }}>
                                      {item.title.charAt(0)}
                                    </div>
                                    <div className="list-content">
                                      <div className="list-title-text">{item.title}</div>
                                      <div className="list-subtitle-text">{item.subtitle}</div>
                                      <div className="list-time">{item.time}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {previewType === 'dashboard' && (
                      <div className="dashboard-preview">
                        <div className="dashboard-container">
                          <div className="dashboard-sidebar" style={{ backgroundColor: assignedColors.surface || currentColors[0] }}>
                            <div className="sidebar-header" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                              {data.preview.dashboard.sidebar.title}
                            </div>
                            <nav className="sidebar-nav">
                              {data.preview.dashboard.sidebar.navigation.map((item, i) => (
                                <div 
                                  key={item.label} 
                                  className="nav-item" 
                                  style={{ 
                                    backgroundColor: item.active ? (assignedColors.accent || currentColors[2] || 'rgba(255,255,255,0.2)') : 'transparent' 
                                  }}
                                >
                                  {item.label}
                                </div>
                              ))}
                            </nav>
                          </div>
                          
                          <div className="dashboard-main" style={{ backgroundColor: assignedColors.background || '#f8f9fa' }}>
                            <div className="dashboard-header" style={{ backgroundColor: assignedColors.surface || '#ffffff' }}>
                              <h2 className="dashboard-title">{data.preview.dashboard.title}</h2>
                              <div className="header-actions">
                                <button style={{ backgroundColor: assignedColors.accent || currentColors[2] || currentColors[0] }}>
                                  Export Data
                                </button>
                              </div>
                            </div>
                            
                            <div className="dashboard-content">
                              <div className="stats-grid">
                                {data.preview.dashboard.stats.map((stat, i) => (
                                  <div key={i} className="stat-card" style={{ backgroundColor: assignedColors.surface || '#ffffff' }}>
                                    <div className="stat-icon" style={{ backgroundColor: currentColors[i % currentColors.length] }}>
                                      {stat.icon}
                                    </div>
                                    <div className="stat-content">
                                      <div className="stat-number-text">{stat.value}</div>
                                      <div className="stat-label-text">{stat.label}</div>
                                      <div className="stat-change" style={{ color: assignedColors.success || '#10b981' }}>
                                        {stat.change}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="chart-section" style={{ backgroundColor: assignedColors.surface || '#ffffff' }}>
                                <div className="chart-header-content">
                                  <h3>{data.preview.dashboard.chart.title}</h3>
                                  <p>{data.preview.dashboard.chart.subtitle}</p>
                                </div>
                                <div className="chart-area">
                                  <div className="chart-bars">
                                    {currentColors.slice(0, 8).map((color, i) => (
                                      <div 
                                        key={i} 
                                        className="chart-bar" 
                                        style={{ 
                                          backgroundColor: color,
                                          height: `${30 + (i * 8)}%`
                                        }}
                                      ></div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="activity-section" style={{ backgroundColor: assignedColors.surface || '#ffffff' }}>
                                <h3>Recent Activity</h3>
                                <div className="activity-list">
                                  {data.preview.dashboard.recentActivity.map((activity, i) => (
                                    <div key={i} className="activity-item">
                                      <div 
                                        className="activity-icon"
                                        style={{ backgroundColor: currentColors[i % currentColors.length] }}
                                      >
                                        {activity.type === 'create' ? '✨' : activity.type === 'download' ? '📥' : '🔗'}
                                      </div>
                                      <div className="activity-content">
                                        <div className="activity-text">{activity.action}</div>
                                        <div className="activity-meta">by {activity.user} • {activity.time}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="features" id="tools">
        <div className="container">
          <div className="features-header">
            <h2>{data.features.title}</h2>
            <p>{data.features.subtitle}</p>
          </div>
          <div className="features-grid">
            {data.features.items.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.iconColor}`}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;