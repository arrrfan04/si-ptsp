'use client';

import { useState, useRef, useEffect } from 'react';

export default function PembinaanCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = prev + direction;
        
        // If we reached the end, switch to backward
        if (next >= images.length) {
          setDirection(-1);
          return Math.max(0, images.length - 2);
        }
        
        // If we reached the start, switch to forward
        if (next < 0) {
          setDirection(1);
          return Math.min(images.length - 1, 1);
        }
        
        return next;
      });
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [images, isPaused, direction]);

  if (!images || images.length === 0) {
    return (
      <div style={{ 
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', fontSize: '3.5rem', color: 'rgba(0,0,0,0.05)',
        backgroundColor: 'rgba(0,0,0,0.02)'
      }}>🎨</div>
    );
  }

  if (images.length === 1) {
    return (
      <img 
        src={images[0]} 
        alt={title} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
      />
    );
  }

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        style={{ 
          display: 'flex', width: '100%', height: '100%', 
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentIndex * 100}%)` 
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} style={{ flex: '0 0 100%', height: '100%', width: '100%' }}>
            <img 
              src={img} 
              alt={`${title} - slide ${idx + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
