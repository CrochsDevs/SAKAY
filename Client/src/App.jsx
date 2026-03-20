import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from '../src/layout/TopBar';
import Home from './pages/Home';
import Feature from './pages/Feature';
import Download from './pages/Download';
import Preview from './pages/Preview';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <TopBar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/download" element={<Download />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;