import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Home from './pages/Users/Home';
import Feature from './pages/Users/Feature';
import Download from './pages/Users/Download';
import About from './pages/Users/About';
import Contact from './pages/Users/Contact';
import Feedback from './pages/Users/Feedback'; 
import Login from './auth/login';
import SignUp from './auth/signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', '/feedback');
    return <Navigate to="/login" state={{ from: '/feedback' }} />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Feature />} />
      <Route path="/download" element={<Download />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/feedback" element={
        <ProtectedRoute>
          <Feedback />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TopBar />
        <div className="pt-20">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;