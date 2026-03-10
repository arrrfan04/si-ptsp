'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ logo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header style={{ 
      backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : '#0F172A',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      padding: scrolled ? '0.6rem 0' : '1rem 0', 
      boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none', 
      position: 'fixed', 
      width: '100%',
      top: 0, 
      left: 0,
      zIndex: 2000, // Ensure it's above everything
      transition: 'background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container flex justify-between items-center" style={{ padding: '0 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <Link href="/" className="flex items-center" style={{ zIndex: 1001, gap: '1rem', textDecoration: 'none' }}>
          {logo && (
            <img 
              src={logo} 
              alt="Logo Kementerian" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
            />
          )}
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.1, fontFamily: "'Outfit', sans-serif" }}>
            SI PTSP<br/>
            <small style={{fontSize:'0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px'}}>LPP TERNATE</small>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link-header">Beranda</Link>
          <Link href="/#layanan" className="nav-link-header">Layanan</Link>
          <Link href="/#berita" className="nav-link-header">Berita</Link>
          <Link href="/dashboard" className="btn-login-portal">Login Portal</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '1.8rem', 
            cursor: 'pointer',
            zIndex: 3001 
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        backdropFilter: 'blur(15px)',
        display: isMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        zIndex: 3000,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '2rem'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {logo && (
            <img 
              src={logo} 
              alt="Logo" 
              style={{ height: '60px', width: 'auto', marginBottom: '1rem' }} 
            />
          )}
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>SI PTSP</h2>
        </div>

        <Link href="/" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Beranda</Link>
        <Link href="/#layanan" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Layanan</Link>
        <Link href="/#berita" onClick={() => setIsMenuOpen(false)} className="mobile-nav-link">Berita</Link>
        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} style={{ 
          padding: '1rem 2.5rem', 
          backgroundColor: '#3BACF7', 
          color: 'white',
          borderRadius: '12px',
          fontWeight: 700,
          fontSize: '1.1rem',
          marginTop: '1.5rem',
          textDecoration: 'none',
          boxShadow: '0 10px 20px rgba(59, 172, 247, 0.3)'
        }}>Login Portal</Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link-header {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s;
          opacity: 0.9;
        }
        .nav-link-header:hover {
          color: #3BACF7;
          opacity: 1;
        }
        .btn-login-portal {
          padding: 0.6rem 1.5rem;
          background-color: #3BACF7;
          color: white;
          border-radius: 10px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(59, 172, 247, 0.2);
        }
        .btn-login-portal:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 172, 247, 0.3);
          background-color: #2b9ce6;
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .mobile-nav-link {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          transition: all 0.3s;
        }
        .mobile-nav-link:hover {
          color: #3BACF7;
          transform: scale(1.05);
        }
      ` }} />
    </header>
  );
}
