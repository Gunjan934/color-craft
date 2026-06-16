import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import './Pages.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-content">
          <button className="back-arrow" onClick={handleBack} title="Go back">
            ←
          </button>

          <div className="login-toggle">
            <button
              className={isLogin ? 'active' : ''}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? 'active' : ''}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Login to Your Account' : 'Create New Account'}</h2>

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div className="google-signin">
            <button onClick={handleGoogleSignIn} className="google-btn" disabled={loading}>
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
              {isLogin ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
          </div>

          <div className="login-footer">
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
