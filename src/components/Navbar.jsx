import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import data from '../data.json';
import '../App.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationLinks = [
    { path: '/', label: 'Generator', id: 'generator' },
    { path: '/palettes', label: 'Palettes', id: 'palettes' },
    { path: '/tools', label: 'Tools', id: 'tools' },
    { path: '/inspiration', label: 'Inspiration', id: 'inspiration' },
    { path: '/reviews', label: 'Reviews', id: 'reviews' },
    { path: '/contact', label: 'Contact', id: 'contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <div className="logo-icon">🎨</div>
            <div className="brand-text">
              <span className="brand-name">{data.app.name}</span>
              <span className="brand-tagline">{data.app.tagline}</span>
            </div>
          </Link>

          <div className={`nav-menu ${mobileMenuOpen ? 'nav-menu-open' : ''}`}>
            {navigationLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <div className="user-menu" ref={userMenuRef}>
                <span className="welcome-text">Welcome, Gunjan!</span>
                <button className="logout-icon-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {mobileMenuOpen && (
                  <div className="user-dropdown">
                    <button className="sign-out-btn" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-link navbar-login-btn" style={{ visibility: 'hidden' }}>
                Login/Signup
              </Link>
            )}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 