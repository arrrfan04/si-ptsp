'use client';

import { useState, useEffect } from 'react';

const getSlides = (settings) => {
  const slides = [];
  const defaults = [
    {
      id: 1,
      title: 'Sistem Informasi PTSP',
      subtitle: 'Lembaga Pemasyarakatan Perempuan Kelas III Ternate',
      description: 'Memberikan pelayanan terbaik, transparan, dan akuntabel untuk seluruh masyarakat dan keluarga Warga Binaan.'
    },
    {
      id: 2,
      title: 'Pelayanan Prima & Humanis',
      subtitle: 'Komitmen Kami Untuk Melayani',
      description: 'Petugas kami siap membantu Anda dengan ramah dan profesional dalam setiap proses administrasi dan kunjungan.'
    },
    {
      id: 3,
      title: 'Modern & Terintegrasi',
      subtitle: 'Transformasi Digital Layanan Pemasyarakatan',
      description: 'Nikmati kemudahan akses layanan informasi dan pengajuan dokumen melalui satu pintu yang terdigitalisasi.'
    }
  ];

  for (let i = 1; i <= 10; i++) {
    const customImage = settings[`hero_image_${i}`];
    // Cycle through the first 3 sets of text for all 10 slides
    const defaultData = defaults[(i - 1) % 3];

    // Only add slide if it has a custom image OR it's one of the first 3 default slides
    if (customImage || i <= 3) {
      slides.push({
        ...defaultData,
        id: i,
        image: customImage || `/hero${((i - 1) % 3) + 1}.png`
      });
    }
  }
  
  return slides;
};

export default function HeroCarousel({ settings }) {
  const slides = getSlides(settings);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        let next = prev + direction;
        
        if (next >= slides.length) {
          setDirection(-1);
          return slides.length - 2;
        }
        
        if (next < 0) {
          setDirection(1);
          return 1;
        }
        
        return next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, direction]);

  return (
    <section 
      className="hero-carousel" 
      style={{ position: 'relative', height: '650px', overflow: 'hidden', backgroundColor: '#0F172A' }}
    >
      <div 
        style={{ 
          display: 'flex', 
          width: '100%', 
          height: '100%', 
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentIndex * 100}%)` 
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              flex: '0 0 100%',
              height: '100%',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Background Image with Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            
            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
              <div 
                style={{ 
                  maxWidth: '800px', 
                  color: 'white',
                  opacity: index === currentIndex ? 1 : 0.3,
                  transform: index === currentIndex ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.8s ease-out'
                }}
              >
                <h1 className="hero-title">{slide.title}</h1>
                <h2 className="hero-subtitle">{slide.subtitle}</h2>
                <p className="hero-description">{slide.description}</p>
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <a href="#layanan" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>Jelajahi Layanan</a>
                  <a href="#berita" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '1rem 2.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>Berita Terkini</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '40px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: index === currentIndex ? 'var(--primary-blue)' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 0.75rem;
          line-height: 1.1;
          background: linear-gradient(to bottom right, #fff 50%, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.75rem;
          font-weight: 500;
          margin-bottom: 2rem;
          color: var(--primary-blue);
          letter-spacing: 1px;
        }
        .hero-description {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          opacity: 0.8;
          line-height: 1.7;
          max-width: 650px;
        }
        .carousel-indicators {
          position: absolute;
          bottom: 3rem;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 1rem;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .hero-title { font-size: 3rem; }
          .hero-subtitle { font-size: 1.5rem; }
          .hero-description { font-size: 1.1rem; }
        }
        @media (max-width: 768px) {
          .hero-carousel { height: 600px !important; }
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.2rem; margin-bottom: 1.5rem; }
          .hero-description { font-size: 1rem; margin-bottom: 2.5rem; }
          .carousel-indicators { bottom: 2rem; }
        }
        @media (max-width: 480px) {
           .hero-carousel { height: 550px !important; }
           .hero-title { font-size: 2rem; }
        }
      ` }} />
    </section>
  );
}
