import React, { useState, useEffect } from 'react';
import data from '../data.json';
import './Pages.css';

const Reviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  useEffect(() => {
    // Load user reviews from localStorage
    const saved = JSON.parse(localStorage.getItem('userReviews') || '[]');
    setUserReviews(saved);
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.text.trim()) return;

    const review = {
      id: Date.now().toString(),
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toLocaleDateString(),
      isUserReview: true
    };

    const updatedReviews = [review, ...userReviews];
    setUserReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));

    // Reset form
    setNewReview({ name: '', rating: 5, text: '' });
    setShowReviewForm(false);
  };

  const handleInputChange = (field, value) => {
    setNewReview(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Combine default reviews with user reviews and show only 6
  const allReviews = [...userReviews, ...data.reviews.items].slice(0, 6);

  return (
    <div className="reviews-page">
      <div className="container">
        <div className="page-header">
          <h1>{data.reviews.title}</h1>
          <p>{data.reviews.subtitle}</p>
        </div>

        <div className="reviews-grid">
          {allReviews.map((review) => (
            <div key={review.id} className={`review-card ${review.isUserReview ? 'user-review' : ''}`}>
              <div className="review-header">
                <div className="review-avatar">
                  {review.isUserReview ? review.name.charAt(0).toUpperCase() : review.avatar}
                </div>
                <div className="review-info">
                  <h3>{review.name}</h3>
                  <p>
                    {review.isUserReview ? 'User Review' : `${review.role} • ${review.company}`}
                  </p>
                </div>
                {review.isUserReview && (
                  <div className="user-badge">👤</div>
                )}
              </div>
              <div className="review-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>⭐</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-date">{review.date}</div>
            </div>
          ))}
        </div>

        {/* Write Review Section */}
        <div className="write-review-section">
          <button
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            ✍️ Write a Review
          </button>

          {showReviewForm && (
            <div className="review-form-container">
              <form className="review-form" onSubmit={handleSubmitReview}>
                <h3>Share Your Experience</h3>

                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                        onClick={() => handleInputChange('rating', star)}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="rating-text">{newReview.rating} star{newReview.rating !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea
                    value={newReview.text}
                    onChange={(e) => handleInputChange('text', e.target.value)}
                    placeholder="Tell us about your experience with our color palette generator..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {allReviews.length >= 6 && (
          <div className="reviews-footer">
            <p>Showing the 6 most recent reviews</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
