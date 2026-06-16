import React, { useState, useEffect } from 'react';
import './Pages.css';

const Palettes = () => {
  const [generatedPalettes, setGeneratedPalettes] = useState([]);
  const [savedPalettes, setSavedPalettes] = useState([]);

  useEffect(() => {
    // Load saved palettes from localStorage
    const saved = JSON.parse(localStorage.getItem('savedPalettes') || '[]');
    setSavedPalettes(saved);

    // Load generated palettes from localStorage
    const generated = JSON.parse(localStorage.getItem('generatedPalettes') || '[]');
    setGeneratedPalettes(generated);

    // Listen for palette updates from other components
    const handlePalettesUpdate = () => {
      const updatedGenerated = JSON.parse(localStorage.getItem('generatedPalettes') || '[]');
      setGeneratedPalettes(updatedGenerated);
    };

    window.addEventListener('palettesUpdated', handlePalettesUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener('palettesUpdated', handlePalettesUpdate);
    };
  }, []);

  const savePalette = (palette) => {
    const newPalette = {
      ...palette,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tags: palette.tags || []
    };
    const updatedSaved = [newPalette, ...savedPalettes];
    setSavedPalettes(updatedSaved);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedSaved));
  };

  const deletePalette = (id) => {
    const updatedSaved = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(updatedSaved);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedSaved));
  };

  const exportPalette = (palette) => {
    const dataStr = JSON.stringify(palette, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${palette.name.replace(/\s+/g, '_')}_palette.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const copyColorToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  };

  const allPalettes = [...generatedPalettes, ...savedPalettes];

  return (
    <div className="palettes-page">
      <div className="container">
        <div className="page-header">
          <h1>Color Palettes</h1>
          <p>Your generated and saved color palettes</p>
        </div>

        {allPalettes.length === 0 ? (
          <div className="empty-state">
            <h3>No palettes yet</h3>
            <p>Generate some palettes from the home page to see them here!</p>
          </div>
        ) : (
          <div className="palettes-grid">
            {allPalettes.map(palette => (
              <div key={palette.id} className="palette-card">
                <div className="palette-header">
                  <h3>{palette.name}</h3>
                  <div className="palette-actions">
                    <button className="action-btn export-btn" onClick={() => exportPalette(palette)}>📤</button>
                    <button className="action-btn delete-btn" onClick={() => deletePalette(palette.id)}>🗑️</button>
                  </div>
                </div>
                <div className="palette-colors">
                  {palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className="palette-color"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                      title={`Click to copy ${color}`}
                    >
                      <span className="color-code">{color}</span>
                    </div>
                  ))}
                </div>
                {palette.tags && palette.tags.length > 0 && (
                  <div className="palette-tags">
                    {palette.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="palette-meta">
                  <span>Created {new Date(palette.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PaletteForm = ({ palette, onSave, onCancel, title }) => {
  const [name, setName] = useState(palette?.name || '');
  const [colors, setColors] = useState(palette?.colors || ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1']);
  const [tags, setTags] = useState(palette?.tags?.join(', ') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const paletteData = {
      ...palette,
      name,
      colors,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSave(paletteData);
  };

  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, '#FFFFFF']);
    }
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  return (
    <div className="palette-form-modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Palette Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Colors</label>
            <div className="color-inputs">
              {colors.map((color, i) => (
                <div key={i} className="color-input-group">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(i, e.target.value)}
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => updateColor(i, e.target.value)}
                  />
                  {colors.length > 2 && (
                    <button type="button" onClick={() => removeColor(i)} className="remove-color-btn">×</button>
                  )}
                </div>
              ))}
              {colors.length < 6 && (
                <button type="button" onClick={addColor} className="add-color-btn">+ Add Color</button>
              )}
            </div>
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., warm, sunset, nature"
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save Palette</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Palettes;
