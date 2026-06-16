import React from 'react';
import data from '../data.json';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">🎨</div>
              <div>
                <h3>{data.footer.brand.name}</h3>
                <p>{data.footer.brand.tagline}</p>
              </div>
            </div>
            <p>{data.footer.brand.description}</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>{data.footer.links.features.title}</h4>
              {data.footer.links.features.items.map(item => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
            <div className="link-group">
              <h4>{data.footer.links.support.title}</h4>
              {data.footer.links.support.items.map(item => (
                <a key={item} href="#">{item}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{data.footer.bottom.copyright}</p>
          <p>{data.footer.bottom.tagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
