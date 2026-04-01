import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../layout/TopBar';
import Footer from '../../layout/Footer';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Send, Star, Navigation, Heart, ThumbsUp, Users, TrendingUp, Shield, Lock, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../util/axios';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({ feedback: '' });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingFeedbackId, setPendingFeedbackId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5); // Show first 5 feedbacks
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all feedbacks - always visible to everyone
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if user is logged in before submitting
  const handleSubmitClick = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!formData.feedback.trim()) {
      setError('Please enter your feedback');
      return;
    }
    
    if (!user) {
      setPendingAction('submit');
      setShowLoginModal(true);
      return;
    }
    
    submitFeedback();
  };

  const submitFeedback = async () => {
    setSubmitting(true);
    setError('');
    
    try {
      await api.post('/feedbacks', {
        rating: rating,
        comment: formData.feedback,
        userLocation: user?.location || 'Commuter'
      });
      
      setSuccessMessage('Thank you for your feedback! 🎉');
      setFormData({ feedback: '' });
      setRating(0);
      await fetchFeedbacks();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (feedbackId) => {
    if (!user) {
      setPendingAction('like');
      setPendingFeedbackId(feedbackId);
      setShowLoginModal(true);
      return;
    }
    
    try {
      await api.post(`/feedbacks/${feedbackId}/like`);
      await fetchFeedbacks();
    } catch (err) {
      console.error('Error liking feedback:', err);
      setError('Failed to like feedback. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    sessionStorage.setItem('redirectAfterLogin', '/feedback');
    navigate('/login');
  };

  // Load more feedbacks
  const loadMore = () => {
    const newVisibleCount = visibleCount + 5;
    setVisibleCount(newVisibleCount);
    setIsExpanded(newVisibleCount >= feedbacks.length);
  };

  // Show less feedbacks
  const showLess = () => {
    setVisibleCount(5);
    setIsExpanded(false);
  };

  // Get visible feedbacks
  const visibleFeedbacks = feedbacks.slice(0, visibleCount);
  const hasMore = visibleCount < feedbacks.length;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  const totalFeedbacks = feedbacks.length;
  const averageRating = totalFeedbacks > 0 
    ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbacks).toFixed(1)
    : 0;
  const satisfiedPercentage = totalFeedbacks > 0
    ? Math.round((feedbacks.filter(f => f.rating >= 4).length / totalFeedbacks) * 100)
    : 0;

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  };

  const formatDate = (date) => {
    const now = new Date();
    const feedbackDate = new Date(date);
    const diffMs = now - feedbackDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return feedbackDate.toLocaleDateString();
  };

  const LoginModal = () => {
    if (!showLoginModal) return null;
    
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-grab-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-grab-green" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-600 mb-6">
              {pendingAction === 'submit' 
                ? 'Please login to share your feedback.' 
                : 'Please login to like this feedback.'}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowLoginModal(false);
                  setPendingAction(null);
                  setPendingFeedbackId(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleLoginRedirect}
                className="flex-1 bg-grab-green hover:bg-grab-dark"
              >
                Login Now
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      <TopBar />
      
      <LoginModal />

      <section className="relative overflow-hidden bg-gradient-to-br from-grab-green/5 via-white to-blue-500/5">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Share Your{' '}
              <span className="bg-gradient-to-r from-grab-green to-grab-dark bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your feedback helps us create a better commuting experience for every Filipino.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={scaleIn}>
              <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-grab-green" />
                  </div>
                  <div className="text-3xl font-bold text-grab-green mb-2">{totalFeedbacks}+</div>
                  <div className="text-sm text-gray-600">Community Feedback</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-grab-green" />
                  </div>
                  <div className="text-3xl font-bold text-grab-green mb-2">{averageRating}★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={scaleIn}>
              <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-grab-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-grab-green" />
                  </div>
                  <div className="text-3xl font-bold text-grab-green mb-2">{satisfiedPercentage}%</div>
                  <div className="text-sm text-gray-600">Satisfied Users</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* LEFT SIDE: Feedback Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="lg:col-span-2"
            >
              <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden sticky top-24">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-grab-green to-grab-dark" />
                <CardHeader className="space-y-2 text-center pt-8 pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-grab-green to-grab-dark rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <MessageSquare className="text-white w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Tell Us Your Story
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Share your experience with SAKAY
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-700">{successMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmitClick} className="space-y-5">
                    {/* Star Rating */}
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Your Rating
                      </span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="transition-all active:scale-90 focus:outline-none"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            <Star
                              size={32}
                              strokeWidth={1.5}
                              className={`${
                                (hover || rating) >= star 
                                ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" 
                                : "text-gray-300 fill-gray-100"
                              } transition-all duration-200 hover:scale-110`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <div className="text-sm font-medium text-grab-green mt-1">
                          {rating === 5 && "🌟 Excellent! You're amazing!"}
                          {rating === 4 && "👍 Very Good! Glad you liked it"}
                          {rating === 3 && "😊 Good! Thanks for sharing"}
                          {rating === 2 && "🤔 Fair - We'll do better"}
                          {rating === 1 && "💪 Thanks - We'll improve"}
                        </div>
                      )}
                    </div>

                    {/* Feedback Textarea */}
                    <div className="space-y-1">
                      <Textarea
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        placeholder="Share your experience with SAKAY..."
                        className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-grab-green resize-none"
                        required
                        disabled={submitting}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 bg-gradient-to-r from-grab-green to-grab-dark hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                      {submitting ? 'Submitting...' : 'Share Feedback'}
                      {!submitting && <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    </Button>

                    {/* Login reminder note */}
                    {!user && (
                      <p className="text-center text-xs text-gray-400 mt-2">
                        You need to login to submit feedback
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* RIGHT SIDE: Community Feed */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="lg:col-span-3"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-gradient-to-b from-grab-green to-grab-dark rounded-full" />
                  <h2 className="text-2xl font-bold text-gray-900">Voices of SAKAY</h2>
                </div>
                <Badge className="bg-grab-green/10 text-grab-green border-grab-green/20">
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {totalFeedbacks} stories
                </Badge>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
                </div>
              ) : feedbacks.length === 0 ? (
                <Card className="border border-gray-200">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No feedback yet. Be the first to share!</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="grid gap-5 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                    {visibleFeedbacks.map((fb, index) => (
                      <motion.div
                        key={fb._id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={scaleIn}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={`${i < fb.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-100"}`}
                                />
                              ))}
                              <span className="text-xs text-gray-400 ml-2">• {formatDate(fb.createdAt)}</span>
                            </div>
                            
                            <p className="text-gray-700 text-base leading-relaxed mb-4">
                              "{fb.comment}"
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-grab-green to-grab-dark flex items-center justify-center font-bold text-white shadow-md">
                                  {getInitials(fb.userName)}
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900 text-sm">{fb.userName}</div>
                                  <div className="text-xs text-gray-400 flex items-center gap-1">
                                    <Navigation className="w-3 h-3" />
                                    {fb.userLocation}
                                  </div>
                                </div>
                              </div>
                              <div 
                                className={`flex items-center gap-1 transition-colors cursor-pointer ${user ? 'hover:text-grab-green' : 'hover:text-gray-500'}`}
                                onClick={() => handleLike(fb._id)}
                              >
                                <ThumbsUp className={`w-4 h-4 ${user ? 'text-gray-400' : 'text-gray-300'}`} />
                                <span className={`text-xs font-medium ${user ? 'text-gray-600' : 'text-gray-400'}`}>{fb.likes || 0}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More / Show Less Buttons */}
                  {(hasMore || isExpanded) && (
                    <div className="mt-6 flex justify-center">
                      {hasMore && (
                        <Button
                          onClick={loadMore}
                          variant="outline"
                          className="gap-2 bg-white hover:bg-grab-green hover:text-white transition-all duration-300 border-grab-green text-grab-green"
                        >
                          <ChevronDown className="w-4 h-4" />
                          Load More ({feedbacks.length - visibleCount} remaining)
                        </Button>
                      )}
                      
                      {isExpanded && visibleCount > 5 && (
                        <Button
                          onClick={showLess}
                          variant="outline"
                          className="gap-2 bg-white hover:bg-gray-100 transition-all duration-300 ml-3"
                        >
                          <ChevronUp className="w-4 h-4" />
                          Show Less
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Show total count */}
                  {feedbacks.length > 5 && (
                    <p className="text-center text-xs text-gray-400 mt-4">
                      Showing {visibleFeedbacks.length} of {feedbacks.length} feedbacks
                    </p>
                  )}
                </>
              )}

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mt-8"
              >
                <Card className="bg-gradient-to-br from-grab-green/5 to-grab-dark/5 border-grab-green/20">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-grab-green" />
                      <span className="text-sm font-semibold text-gray-700">Your voice matters</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Every feedback is read by our team and helps shape the future of SAKAY.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Feedback;