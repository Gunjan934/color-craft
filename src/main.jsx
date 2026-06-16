import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Palettes from './pages/Palettes.jsx';
import Inspiration from './pages/Inspiration.jsx';
import Tools from './pages/Tools.jsx';
import Reviews from './pages/Reviews.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/palettes" element={<Layout><Palettes /></Layout>} />
        <Route path="/inspiration" element={<Layout><Inspiration /></Layout>} />
        <Route path="/tools" element={<Layout><Tools /></Layout>} />
        <Route path="/reviews" element={<Layout><Reviews /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);