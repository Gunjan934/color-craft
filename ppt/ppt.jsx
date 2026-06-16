import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Palette, Code, Target, BookOpen, Lightbulb, CheckCircle, AlertCircle, TrendingUp, Users, Zap, Download, Maximize, Minimize } from 'lucide-react';

const ColorCraftPPT = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const slides = [
    // Slide 1: Title
    {
      type: 'title',
      title: 'ColorCraft',
      subtitle: 'Intelligent Color Palette Generator',
      tagline: 'Automating Design Harmony Through Color Theory & React.js',
      details: 'Gunjan | Roll No: 2331206 | B.Tech CSE/IT/AIML (2023-2027)',
      institution: 'Global Group of Institutes, Amritsar',
      period: 'June-July 2025 | Mentor: Er. Gurmeet Singh'
    },
    // Slide 2: Problem Statement
    {
      type: 'problem',
      title: 'Introduction & Problem Statement',
      intro: [
        'Colors shape visual appeal, mood, and usability of digital products',
        'Selecting harmonious combinations is challenging and time-consuming',
        'Traditional tools lack real-time visualization and theoretical guidance'
      ],
      problems: [
        'No real-time preview in actual UI contexts',
        'Random generation without proper harmony principles',
        'No role-based organization (primary, accent, background)',
        'Limited export options for developers',
        'Trial-and-error leads to inconsistent design systems',
        'Lack of educational value for beginners'
      ]
    },
    // Slide 3: Objectives
    {
      type: 'objectives',
      title: 'Project Objectives & Significance',
      objectives: [
        { icon: '🎯', text: 'Automate color generation using 4 harmony models' },
        { icon: '🖥️', text: 'User-friendly interface with real-time updates' },
        { icon: '👁️', text: 'Live preview on mockup templates' },
        { icon: '🏷️', text: 'Color role assignment system' },
        { icon: '💾', text: 'JSON export for workflow integration' },
        { icon: '📱', text: 'Responsive across all devices' }
      ],
      significance: [
        { label: 'Time Saved', value: '70%' },
        { label: 'Accuracy', value: '98%' },
        { label: 'Response Time', value: '<50ms' }
      ]
    },
    // Slide 4: Color Theory
    {
      type: 'theory',
      title: 'Color Theory Foundation',
      models: [
        { name: 'Analogous', angle: '±30°', desc: 'Adjacent colors, calm palettes', color: '#4CAF50' },
        { name: 'Complementary', angle: '+180°', desc: 'High contrast, vibrant', color: '#2196F3' },
        { name: 'Triadic', angle: '+120°, +240°', desc: 'Balanced variety', color: '#FF9800' },
        { name: 'Monochromatic', angle: '0°', desc: 'Single hue variations', color: '#9C27B0' }
      ],
      comparison: [
        { tool: 'Adobe Color', harmony: true, preview: false, export: 'Partial', roles: false },
        { tool: 'Coolors', harmony: false, preview: false, export: true, roles: false },
        { tool: 'ColorCraft', harmony: true, preview: true, export: true, roles: true }
      ]
    },
    // Slide 5: Methodology
    {
      type: 'methodology',
      title: 'System Workflow & Methodology',
      workflow: [
        { step: 1, name: 'User Input', desc: 'Base color selection via picker or HEX entry' },
        { step: 2, name: 'Harmony Selection', desc: 'Choose from 4 harmony models' },
        { step: 3, name: 'Computation', desc: 'HEX → RGB → HSL conversion & hue adjustment' },
        { step: 4, name: 'Palette Formation', desc: 'HSL → RGB → HEX & role assignment' },
        { step: 5, name: 'Visualization', desc: 'Real-time display + Live preview' },
        { step: 6, name: 'Export', desc: 'JSON file generation with all data' }
      ]
    },
    // Slide 6: Architecture
    {
      type: 'architecture',
      title: 'System Architecture & Tech Stack',
      layers: [
        { 
          name: 'Presentation Layer', 
          tech: 'React.js v18+',
          details: 'UI components, Hooks (useState, useEffect, useMemo), React Router',
          color: '#61DAFB'
        },
        { 
          name: 'Processing Layer', 
          tech: 'JavaScript Algorithms',
          details: 'Color conversions, Harmony computations, HSL transformations',
          color: '#9C27B0'
        },
        { 
          name: 'Data Layer', 
          tech: 'JSON Format',
          details: 'State management, Export functionality, Client-side handling',
          color: '#FF9800'
        }
      ],
      stack: ['React.js', 'Vite', 'Node.js', 'Chroma.js', 'CSS3', 'Git/GitHub']
    },
    // Slide 7: Implementation
    {
      type: 'implementation',
      title: 'Implementation & Core Modules',
      modules: [
        { name: 'Input & Validation', key: 'HEX format validation, React color picker', icon: '✓' },
        { name: 'Harmony Computation', key: 'HEX↔RGB↔HSL pipeline, Hue adjustments', icon: '⚙️' },
        { name: 'Palette Rendering', key: 'CSS Grid, Copy-to-clipboard, Hover effects', icon: '🎨' },
        { name: 'Live Preview', key: '3 templates: Website, Dashboard, Mobile', icon: '👁️' },
        { name: 'Data Export', key: 'JSON generation via Blob API', icon: '💾' }
      ]
    },
    // Slide 8: UI/UX
    {
      type: 'ui',
      title: 'User Interface Design & Features',
      features: [
        'Clean, minimalist aesthetic with pastel gradients',
        'Two-panel layout: Control section & Results section',
        'Interactive color wheel visualization',
        'Real-time preview updates (<50ms)',
        'One-click copy-to-clipboard for all colors',
        'Export to JSON with single click',
        'Fully responsive across all devices'
      ],
      pages: ['Home', 'Generator', 'Palettes', 'Tools', 'Inspiration']
    },
    // Slide 9: Algorithm
    {
      type: 'algorithm',
      title: 'Mathematical Implementation',
      conversions: [
        { from: 'HEX', to: 'RGB', formula: 'parseInt(hex, 16) / 255' },
        { from: 'RGB', to: 'HSL', formula: 'H = f(max channel), S = Δ/(sum), L = (max+min)/2' },
        { from: 'HSL', to: 'HEX', formula: 'c = (1-|2L-1|)×S, convert to RGB×255' }
      ],
      harmonies: [
        { type: 'Analogous', offset: '±30°', colors: 3 },
        { type: 'Complementary', offset: '+180°', colors: 2 },
        { type: 'Triadic', offset: '+120°, +240°', colors: 3 },
        { type: 'Monochromatic', offset: 'Vary L', colors: 4 }
      ],
      optimization: 'useMemo(), CSS transitions, Debouncing, <5ms calculation'
    },
    // Slide 10: Testing & Results
    {
      type: 'results',
      title: 'Testing & Performance Analysis',
      metrics: [
        { device: 'Laptop', browser: 'Chrome', load: '0.8s', response: '45ms', cpu: 'Low' },
        { device: 'Desktop', browser: 'Firefox', load: '0.6s', response: '30ms', cpu: 'Minimal' },
        { device: 'Mobile', browser: 'Chrome', load: '1.2s', response: '70ms', cpu: 'Moderate' }
      ],
      accuracy: [
        { metric: 'Input Validation', value: '100%' },
        { metric: 'Color Conversion', value: '<1% error' },
        { metric: 'Harmony Generation', value: '98%' },
        { metric: 'UI Reactivity', value: '<50ms' }
      ],
      feedback: ['95% found intuitive', '100% generated without training', '90% preferred live preview', '85% would use professionally']
    },
    // Slide 11: Challenges
    {
      type: 'challenges',
      title: 'Challenges & Solutions',
      items: [
        { 
          challenge: 'Color Conversion Accuracy',
          solution: 'Precise formulas with Chroma.js validation',
          result: '<1% deviation'
        },
        { 
          challenge: 'UI Responsiveness',
          solution: 'CSS Flexbox/Grid with media queries',
          result: 'Seamless across devices'
        },
        { 
          challenge: 'Real-Time Performance',
          solution: 'React useMemo() & useCallback()',
          result: '60% faster rendering'
        },
        { 
          challenge: 'Browser Compatibility',
          solution: 'Standardized CSS, cross-browser testing',
          result: 'Consistent display'
        }
      ],
      lessons: ['Deep color model understanding', 'React optimization mastery', 'User-centered design', 'Agile methodology', 'Cross-domain knowledge']
    },
    // Slide 12: Future & Conclusion
    {
      type: 'conclusion',
      title: 'Future Scope & Conclusion',
      future: [
        { phase: 'Q3 2025', feature: 'AI-powered suggestions & trend analysis' },
        { phase: 'Q4 2025', feature: 'Image extraction & WCAG validator' },
        { phase: 'Q1 2026', feature: 'Cloud storage & team collaboration' },
        { phase: 'Q2 2026', feature: 'Figma/VS Code plugins & API' }
      ],
      achievements: [
        '98% accuracy in palette generation',
        '<50ms real-time response',
        'Live preview across 3 templates',
        'JSON export for developers',
        'Educational platform for learning'
      ],
      impact: 'ColorCraft bridges color theory and practical application, reducing design time by 70% while maintaining scientific accuracy.'
    }
  ];

  const nextSlide = useCallback(() => {
    if (isAnimating || currentSlide === slides.length - 1) return;
    setSlideDirection('forward');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [currentSlide, slides.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating || currentSlide === 0) return;
    setSlideDirection('backward');
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [currentSlide, slides.length, isAnimating]);

  // Fullscreen toggle function
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, []);

  // Monitor fullscreen changes (e.g., ESC key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Arrow key navigation + F for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        if (!isAnimating) {
          setSlideDirection('backward');
          setIsAnimating(true);
          setCurrentSlide(0);
          setTimeout(() => setIsAnimating(false), 400);
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        if (!isAnimating) {
          setSlideDirection('forward');
          setIsAnimating(true);
          setCurrentSlide(slides.length - 1);
          setTimeout(() => setIsAnimating(false), 400);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        // ESC is handled by browser, but we track it
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, slides.length, isAnimating, toggleFullscreen, isFullscreen]);

  const renderSlide = () => {
    const slide = slides[currentSlide];

    if (slide.type === 'title') {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 md:p-4 lg:p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-5 left-5 w-24 h-24 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-5 right-5 w-24 h-24 md:w-40 md:h-40 lg:w-56 lg:h-56 bg-purple-400 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 text-center animate-fade-in px-2">
            <div className="inline-block mb-1 md:mb-2 px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[0.6rem] md:text-xs lg:text-sm rounded-full">
              ✨ Professional Color Generation
            </div>
            <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold mb-1 md:mb-2 lg:mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-up">
              {slide.title}
            </h1>
            <h2 className="text-sm md:text-lg lg:text-2xl font-semibold text-gray-700 mb-1 md:mb-1.5 lg:mb-2">{slide.subtitle}</h2>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3 lg:mb-4">{slide.tagline}</p>
            <div className="space-y-0.5 md:space-y-1 text-gray-600">
              <p className="text-[0.6rem] md:text-xs lg:text-sm">{slide.details}</p>
              <p className="font-semibold text-blue-600 text-[0.6rem] md:text-xs lg:text-sm">{slide.institution}</p>
              <p className="text-[0.6rem] md:text-xs lg:text-sm">{slide.period}</p>
            </div>
            <Palette className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-500 mx-auto mt-2 md:mt-3 lg:mt-4 animate-bounce" />
          </div>
        </div>
      );
    }

    if (slide.type === 'problem') {
      return (
        <div className="h-full bg-gradient-to-br from-white to-blue-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3">
            <div className="md:col-span-2 space-y-1 md:space-y-2">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-blue-600 mb-1 md:mb-2">Introduction</h3>
              {slide.intro.map((item, i) => (
                <div key={i} className="flex items-start gap-1 md:gap-2 animate-slide-right" style={{animationDelay: `${i * 0.1}s`}}>
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-[0.6rem] md:text-xs lg:text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="md:col-span-3 bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-3">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-red-600 mb-1 md:mb-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 md:w-4 md:h-4" /> Key Problems
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2">
                {slide.problems.map((problem, i) => (
                  <div key={i} className="flex items-start gap-1 md:gap-2 p-1 md:p-2 bg-red-50 rounded animate-fade-in" style={{animationDelay: `${i * 0.15}s`}}>
                    <span className="text-red-500 text-xs md:text-sm">❌</span>
                    <p className="text-[0.6rem] md:text-xs text-gray-700">{problem}</p>
                  </div>
                ))}
              </div>
              <div className="mt-1 md:mt-2 p-1.5 md:p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded border-l-2 border-orange-500">
                <p className="text-[0.6rem] md:text-xs font-semibold text-gray-800">📊 Designers spend 30% of project time on color selection</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'objectives') {
      return (
        <div className="h-full bg-gradient-to-br from-cyan-50 to-blue-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 md:gap-2">
            {slide.objectives.map((obj, i) => (
              <div key={i} className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="text-lg md:text-xl mb-1">{obj.icon}</div>
                <p className="text-[0.6rem] md:text-xs text-gray-700 font-medium">{obj.text}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl p-2 md:p-3 text-white mt-2 md:mt-3">
            <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1 md:mb-2">Project Significance</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {slide.significance.map((sig, i) => (
                <div key={i} className="text-center animate-fade-in" style={{animationDelay: `${i * 0.2}s`}}>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 md:mb-1">{sig.value}</div>
                  <div className="text-[0.6rem] md:text-xs text-blue-100">{sig.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'theory') {
      return (
        <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-2 md:p-3 lg:p-6 text-white overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div>
              <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
                {slide.models.map((model, i) => (
                  <div key={i} className="bg-gray-800 rounded-md md:rounded-lg p-2 md:p-3 border border-gray-700 hover:border-blue-500 transition-all animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="w-full h-1.5 md:h-2 rounded-full mb-1 md:mb-2" style={{backgroundColor: model.color}}></div>
                    <h4 className="font-bold text-xs md:text-sm mb-0.5">{model.name}</h4>
                    <p className="text-blue-400 text-[0.6rem] md:text-xs mb-0.5">{model.angle}</p>
                    <p className="text-gray-400 text-[0.6rem] md:text-xs">{model.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-md md:rounded-lg p-2 md:p-3">
              <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Comparison with Existing Tools</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.6rem] md:text-xs">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-1">Tool</th>
                      <th className="text-center py-1">Harmony</th>
                      <th className="text-center py-1">Preview</th>
                      <th className="text-center py-1">Export</th>
                      <th className="text-center py-1">Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.comparison.map((item, i) => (
                      <tr key={i} className="border-b border-gray-700 animate-fade-in" style={{animationDelay: `${i * 0.15}s`}}>
                        <td className="py-1 font-semibold">{item.tool}</td>
                        <td className="text-center">{item.harmony ? '✅' : '❌'}</td>
                        <td className="text-center">{item.preview ? '✅' : '❌'}</td>
                        <td className="text-center text-[0.6rem]">{typeof item.export === 'boolean' ? (item.export ? '✅' : '❌') : item.export}</td>
                        <td className="text-center">{item.roles ? '✅' : '❌'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'methodology') {
      return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {slide.workflow.map((step, i) => (
              <div key={i} className="flex items-center animate-slide-up" style={{animationDelay: `${i * 0.15}s`}}>
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md md:rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform">
                    <div className="text-center">
                      <div className="text-sm md:text-base lg:text-lg font-bold mb-0.5">{step.step}</div>
                      <div className="text-[0.5rem] md:text-[0.6rem] lg:text-xs font-semibold">{step.name}</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-16 md:w-20 lg:w-24 text-center">
                    <p className="text-[0.5rem] md:text-[0.6rem] text-gray-600">{step.desc}</p>
                  </div>
                </div>
                {i < slide.workflow.length - 1 && (
                  <div className="hidden md:block w-2 md:w-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-1"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-16 bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md">
            <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-1 md:mb-2">Key Algorithms</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 text-[0.6rem] md:text-xs">
              <div className="bg-blue-50 p-1 md:p-2 rounded">
                <code className="text-blue-700 font-mono">Analogous: H±30°</code>
              </div>
              <div className="bg-purple-50 p-1 md:p-2 rounded">
                <code className="text-purple-700 font-mono">Complementary: H+180°</code>
              </div>
              <div className="bg-green-50 p-1 md:p-2 rounded">
                <code className="text-green-700 font-mono">Triadic: H+120°, H+240°</code>
              </div>
              <div className="bg-orange-50 p-1 md:p-2 rounded">
                <code className="text-orange-700 font-mono">Monochromatic: vary L</code>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'architecture') {
      return (
        <div className="h-full bg-gradient-to-br from-white to-cyan-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div className="space-y-1.5 md:space-y-2">
              {slide.layers.map((layer, i) => (
                <div key={i} className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md border-l-2 animate-slide-right" style={{borderColor: layer.color, animationDelay: `${i * 0.2}s`}}>
                  <h3 className="text-xs md:text-sm font-bold mb-0.5 md:mb-1" style={{color: layer.color}}>{layer.name}</h3>
                  <p className="text-[0.6rem] md:text-xs font-semibold text-gray-700 mb-0.5">{layer.tech}</p>
                  <p className="text-[0.5rem] md:text-[0.6rem] text-gray-600">{layer.details}</p>
                </div>
              ))}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-1 md:py-1.5 rounded font-bold text-[0.6rem] md:text-xs">
                ⚡ 100% Client-Side | Lightweight | No Backend Required
              </div>
            </div>
            <div className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md">
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 md:mb-3">Technology Stack</h3>
              <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                {slide.stack.map((tech, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded text-center hover:scale-105 transition-transform animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                    <Code className="w-4 h-4 md:w-6 md:h-6 text-blue-600 mx-auto mb-0.5 md:mb-1" />
                    <p className="text-[0.6rem] md:text-xs font-semibold text-gray-700">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'implementation') {
      return (
        <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2">
            {slide.modules.map((module, i) => (
              <div key={i} className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="text-lg md:text-2xl mb-1">{module.icon}</div>
                <h3 className="font-bold text-xs md:text-sm text-gray-800 mb-0.5 md:mb-1">{module.name}</h3>
                <p className="text-[0.5rem] md:text-[0.6rem] text-gray-600">{module.key}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 md:mt-3 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
            {['hexToHSL()', 'hslToHex()', 'generateHarmony()', 'exportPalette()'].map((func, i) => (
              <div key={i} className="bg-gray-900 text-green-400 p-1 md:p-2 rounded font-mono text-[0.5rem] md:text-[0.6rem] animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                <code>{func}</code>
              </div>
            ))}
          </div>
          <div className="mt-2 md:mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-1 md:py-1.5 rounded font-bold text-[0.6rem] md:text-xs">
            🔧 Component-Based | Modular | Scalable Architecture
          </div>
        </div>
      );
    }

    if (slide.type === 'ui') {
      return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            <div className="md:col-span-2 bg-white rounded-lg md:rounded-xl shadow-md p-2 md:p-4 animate-slide-up">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-t p-1 md:p-2 -mx-2 -mt-2 mb-2 md:-mx-4 md:-mt-4 md:mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500"></div>
                  <div className="flex-1 bg-gray-700 rounded ml-1 md:ml-2 px-1 py-0.5 md:px-2 text-[0.5rem] md:text-[0.6rem] text-gray-400">colorcraft.app</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="border border-dashed border-gray-300 rounded p-2">
                  <h4 className="font-bold text-[0.6rem] md:text-xs text-gray-700 mb-1 md:mb-2">Control Panel</h4>
                  <div className="space-y-1">
                    <div className="bg-blue-100 p-1 rounded text-[0.5rem] md:text-[0.6rem]">🎨 Color Picker</div>
                    <div className="bg-purple-100 p-1 rounded text-[0.5rem] md:text-[0.6rem]">⚙️ Harmony Selector</div>
                    <div className="bg-green-500 text-white p-1 rounded text-[0.5rem] md:text-[0.6rem] font-bold text-center">Generate</div>
                  </div>
                </div>
                <div className="border border-gray-300 rounded p-2">
                  <h4 className="font-bold text-[0.6rem] md:text-xs text-gray-700 mb-1 md:mb-2">Results Panel</h4>
                  <div className="grid grid-cols-4 gap-0.5">
                    {['#6B9FFF', '#9F6BFF', '#FF9F6B', '#6BFF9F'].map((color, i) => (
                      <div key={i} className="aspect-square rounded" style={{backgroundColor: color}}></div>
                    ))}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {['Primary', 'Accent', 'Highlight', 'Background'].map((role, i) => (
                      <div key={i} className="bg-gray-100 p-0.5 rounded text-[0.5rem] md:text-[0.6rem]">{role}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md">
                <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-xs md:text-sm">Key Features</h3>
                <div className="space-y-1 text-[0.6rem] md:text-xs">
                  {slide.features.slice(0, 7).map((feature, i) => (
                    <div key={i} className="flex items-start gap-1 animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                      <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-[0.6rem] md:text-xs">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-md md:rounded-lg p-2 md:p-3 text-white">
                <h4 className="font-bold mb-1 text-xs md:text-sm">Navigation</h4>
                <div className="flex flex-wrap gap-1">
                  {slide.pages.map((page, i) => (
                    <span key={i} className="bg-white/20 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[0.5rem] md:text-[0.6rem]">{page}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'algorithm') {
      return (
        <div className="h-full bg-gray-900 p-2 md:p-3 lg:p-6 text-white overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            <div className="md:col-span-2 space-y-2">
              <div className="bg-gray-800 rounded-md md:rounded-lg p-2 md:p-3 border border-gray-700">
                <h3 className="text-sm md:text-base font-bold text-blue-400 mb-1 md:mb-2">Color Conversions</h3>
                {slide.conversions.map((conv, i) => (
                  <div key={i} className="mb-1 md:mb-2 animate-slide-right" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="text-[0.6rem] md:text-xs text-gray-400 mb-0.5">{conv.from} → {conv.to}</div>
                    <code className="text-green-400 text-[0.5rem] md:text-[0.6rem] font-mono">{conv.formula}</code>
                  </div>
                ))}
              </div>
              <div className="bg-gray-800 rounded-md md:rounded-lg p-2 md:p-3 border border-gray-700">
                <h3 className="text-sm md:text-base font-bold text-purple-400 mb-1 md:mb-2">Harmony Transformations</h3>
                <div className="grid grid-cols-2 gap-1 md:gap-2">
                  {slide.harmonies.map((harm, i) => (
                    <div key={i} className="bg-gray-700 p-1 md:p-2 rounded animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                      <div className="font-bold text-[0.6rem] md:text-xs mb-0.5">{harm.type}</div>
                      <div className="text-[0.5rem] md:text-[0.6rem] text-blue-300">{harm.offset}</div>
                      <div className="text-[0.5rem] md:text-[0.6rem] text-gray-400">{harm.colors} colors</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-md md:rounded-lg p-2 md:p-3 border border-gray-700">
              <h3 className="text-sm md:text-base font-bold text-orange-400 mb-1 md:mb-2">Optimization</h3>
              <div className="space-y-1 md:space-y-2">
                {slide.optimization.split(', ').map((opt, i) => (
                  <div key={i} className="bg-gray-700 p-1 md:p-2 rounded text-[0.6rem] md:text-xs animate-fade-in" style={{animationDelay: `${i * 0.15}s`}}>
                    <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 inline mr-1" />
                    {opt}
                  </div>
                ))}
              </div>
              <div className="mt-2 md:mt-3 p-2 md:p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded text-center">
                <div className="text-base md:text-lg font-bold">&lt;5ms</div>
                <div className="text-[0.6rem] md:text-xs">Calculation Time</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'results') {
      return (
        <div className="h-full bg-gradient-to-br from-white to-green-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            <div className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md">
              <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-1 md:mb-2">Performance Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[0.6rem] md:text-xs">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-1">Device</th>
                      <th className="text-center py-1">Browser</th>
                      <th className="text-center py-1">Load</th>
                      <th className="text-center py-1">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.metrics.map((metric, i) => (
                      <tr key={i} className="border-b border-gray-100 animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                        <td className="py-1 font-semibold">{metric.device}</td>
                        <td className="text-center">{metric.browser}</td>
                        <td className="text-center text-green-600 font-bold">{metric.load}</td>
                        <td className="text-center text-blue-600 font-bold">{metric.response}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md">
              <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-1 md:mb-2">Accuracy Results</h3>
              <div className="space-y-1 md:space-y-2">
                {slide.accuracy.map((acc, i) => (
                  <div key={i} className="animate-slide-right" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[0.6rem] md:text-xs font-semibold text-gray-700">{acc.metric}</span>
                      <span className="text-[0.6rem] md:text-xs font-bold text-green-600">{acc.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 md:h-1.5">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-1 md:h-1.5 rounded-full" style={{width: acc.value === '100%' ? '100%' : '98%'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 md:gap-2 mt-2 md:mt-3">
            {slide.feedback.map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-2 md:p-3 rounded-md text-center shadow-md animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}>
                <Users className="w-4 h-4 md:w-6 md:h-6 mx-auto mb-0.5 md:mb-1" />
                <p className="text-[0.5rem] md:text-[0.6rem] font-semibold">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 md:mt-3 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-1 md:py-1.5 rounded font-bold text-[0.6rem] md:text-xs">
            ✅ Validated | Tested | Production-Ready
          </div>
        </div>
      );
    }

    if (slide.type === 'challenges') {
      return (
        <div className="h-full bg-gradient-to-br from-gray-50 to-yellow-50 p-2 md:p-3 lg:p-6 overflow-y-auto">
          <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
            {slide.items.map((item, i) => (
              <div key={i} className="bg-white rounded-md md:rounded-lg p-2 md:p-3 shadow-md animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-[0.6rem] md:text-xs">{i + 1}</div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 md:mb-2">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-red-500 inline mr-1" />
                      <span className="font-bold text-gray-800 text-[0.6rem] md:text-xs">{item.challenge}</span>
                    </div>
                    <div className="bg-green-50 p-1 md:p-2 rounded mb-1">
                      <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600 inline mr-1" />
                      <span className="text-[0.5rem] md:text-[0.6rem] text-gray-700">{item.solution}</span>
                    </div>
                    <div className="text-[0.5rem] md:text-[0.6rem] text-blue-600 font-semibold">✓ {item.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-md md:rounded-lg p-2 md:p-3 text-white">
            <h3 className="text-xs md:text-sm font-bold mb-1 md:mb-2 flex items-center gap-1">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> Lessons Learned
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 md:gap-2">
              {slide.lessons.map((lesson, i) => (
                <div key={i} className="bg-white/20 p-1 md:p-2 rounded text-center text-[0.5rem] md:text-[0.6rem] animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                  {lesson}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (slide.type === 'conclusion') {
      return (
        <div className="h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2 md:p-3 lg:p-6 text-white relative overflow-y-auto">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-5 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-5 right-5 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-base md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 lg:mb-4 animate-fade-in">{slide.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-2 mb-2 md:mb-3">
              {slide.future.map((phase, i) => (
                <div key={i} className="bg-white/10 backdrop-blur rounded-md md:rounded-lg p-2 md:p-3 border border-white/20 animate-slide-up" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="text-xs md:text-base font-bold mb-0.5 md:mb-1">{phase.phase}</div>
                  <div className="text-[0.5rem] md:text-[0.6rem]">{phase.feature}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur rounded-md md:rounded-lg p-2 md:p-3 border border-white/20 mb-2 md:mb-3">
              <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2">Key Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
                {slide.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-start gap-1 animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-[0.6rem] md:text-xs">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-md md:rounded-lg p-2 md:p-3 border border-white/30 mb-2 md:mb-3">
              <p className="text-[0.6rem] md:text-xs italic">{slide.impact}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 animate-bounce">THANK YOU</h3>
              <p className="text-xs md:text-sm mb-2 md:mb-3">Questions & Feedback Welcome</p>
              <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2 text-[0.6rem] md:text-xs">
                <span>Mentor: Er. Gurmeet Singh</span>
                <span className="hidden md:block">•</span>
                <span>Global Group of Institutes, Amritsar</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col overflow-hidden relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl animate-float" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.85) rotate(-3deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100%) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100%) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotate-in {
          from { opacity: 0; transform: rotate(-180deg) scale(0); }
          to { opacity: 1; transform: rotate(0deg) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-slide-right {
          animation: slide-right 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-slide-down {
          animation: slide-down 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-rotate-in {
          animation: rotate-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .slide-transition-forward {
          animation: slide-in-right 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .slide-transition-backward {
          animation: slide-in-left 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .btn-hover-effect {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hover-effect::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .btn-hover-effect:hover::before {
          width: 300px;
          height: 300px;
        }
        .btn-hover-effect:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .btn-hover-effect:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }
        .btn-hover-effect:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .indicator-pulse {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #667eea, #764ba2);
          border-radius: 10px;
          transition: all 0.3s;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #764ba2, #667eea);
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      
      {/* Header */}
      <div className="glass-effect shadow-lg px-2 md:px-3 lg:px-4 py-2 md:py-3 flex items-center justify-between flex-shrink-0 relative z-10 animate-slide-down">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <Palette className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-600 animate-rotate-in" />
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-md opacity-30 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xs md:text-sm lg:text-base font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ColorCraft Presentation
            </h1>
            <p className="text-[0.5rem] md:text-[0.6rem] text-gray-500">Professional Slide Deck</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></div>
            <span className="text-[0.6rem] text-purple-700 font-medium">Live</span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white/50 hover:bg-white/80 rounded-lg transition-all btn-hover-effect group"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="w-3 h-3 md:w-4 md:h-4 text-gray-700 group-hover:text-purple-600 transition-colors" />
            ) : (
              <Maximize className="w-3 h-3 md:w-4 md:h-4 text-gray-700 group-hover:text-purple-600 transition-colors" />
            )}
            <span className="hidden lg:inline text-[0.6rem] text-gray-700 font-medium">F</span>
          </button>
          <div className="px-2 md:px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-md">
            <span className="text-[0.6rem] md:text-xs font-semibold">
              {currentSlide + 1}/{slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 mx-2 md:mx-3 lg:mx-6 my-2 md:my-3 rounded-xl md:rounded-2xl overflow-hidden min-h-0 relative z-10">
        <div className="h-full glass-effect shadow-2xl rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20 glow-effect">
          <div className={`h-full ${slideDirection === 'forward' ? 'slide-transition-forward' : 'slide-transition-backward'}`} key={currentSlide}>
            {renderSlide()}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="glass-effect shadow-lg px-3 md:px-4 lg:px-6 py-2 md:py-3 flex items-center justify-between flex-shrink-0 relative z-10">
        <button
          onClick={prevSlide}
          className="group px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg md:rounded-xl flex items-center gap-1 md:gap-2 text-[0.65rem] md:text-xs font-semibold text-gray-700 btn-hover-effect shadow-md border border-gray-300"
          disabled={currentSlide === 0 || isAnimating}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        {/* Slide Indicators */}
        <div className="flex gap-1.5 md:gap-2 items-center px-3 md:px-4 py-2 bg-white/50 rounded-full shadow-inner backdrop-blur-sm">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating && index !== currentSlide) {
                  setSlideDirection(index > currentSlide ? 'forward' : 'backward');
                  setIsAnimating(true);
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 400);
                }
              }}
              className={`rounded-full transition-all duration-500 relative ${
                index === currentSlide 
                  ? 'w-6 md:w-8 h-2 md:h-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 indicator-pulse shadow-md' 
                  : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-400 hover:bg-purple-400 hover:scale-150'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating}
            >
              {index === currentSlide && (
                <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="group px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-lg md:rounded-xl flex items-center gap-1 md:gap-2 text-[0.65rem] md:text-xs font-semibold btn-hover-effect shadow-lg hover:shadow-2xl border border-purple-500/50"
          disabled={currentSlide === slides.length - 1 || isAnimating}
          aria-label="Next slide"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 rounded-lg md:rounded-xl shimmer opacity-0 group-hover:opacity-100"></div>
        </button>
      </div>
    </div>
  );
};

export default ColorCraftPPT;