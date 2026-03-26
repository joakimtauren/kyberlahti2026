import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { slides } from './slides';

// Establish a static 16:9 design canvas based on 4K/Retina layout sizing
const DESIGN_WIDTH = 2560;
const DESIGN_HEIGHT = 1440;

function useProportionalScale() {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const calculateScale = () => {
      // Find the mathematical ratio to perfectly fit the inner window without scrollbars
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      // Using Math.min ensures the canvas always fits entirely within the screen, locked at 16:9
      setScale(Math.min(scaleX, scaleY));
    };
    
    // Initial run
    calculateScale();
    
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);
  
  return scale;
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scale = useProportionalScale();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent standard scrolling for these keys
      if ((e.key === ' ' || e.key === 'PageDown' || e.key === 'PageUp') && e.target === document.body) {
        e.preventDefault();
      }

      // Universal "Next" mappings for all hardware presentation clickers (Logitech, Targus, etc.)
      const nextKeys = ['ArrowRight', ' ', 'PageDown', 'Enter', 'n', 'N'];
      // Universal "Previous" mappings
      const prevKeys = ['ArrowLeft', 'PageUp', 'Backspace', 'p', 'P'];

      if (nextKeys.includes(e.key)) {
        // Intercept if a CinematicHold is currently waiting to play
        if (document.body.getAttribute('data-cinematic-phase') === 'START') {
          window.dispatchEvent(new Event('advance-cinematic'));
          return;
        }
        nextSlide();
      } else if (prevKeys.includes(e.key)) {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      backgroundColor: 'var(--color-bg)'
    }}>
      <div style={{
        width: `${DESIGN_WIDTH}px`,
        height: `${DESIGN_HEIGHT}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        position: 'relative',
        flexShrink: 0
      }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {slides[currentSlide] && (
            <div key={currentSlide} style={{ position: 'relative', width: '100%', height: '100%' }}>
              {slides[currentSlide]}
            </div>
          )}
        </AnimatePresence>

        <div style={{ position: 'absolute', bottom: '2rem', right: '3rem', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '1.2rem', opacity: 0.4, zIndex: 100 }}>
          {String(currentSlide + 1).padStart(2, '0')} // {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

export default App;
