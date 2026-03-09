'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSettings } from '@/app/actions/settings';

export default function PublicLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logo, setLogo] = useState('/logo-kemen.png');
  const pathname = usePathname();

  useEffect(() => {
    const fetchLogo = async () => {
      const res = await getSettings();
      if (res.success && res.settings.app_logo) {
        setLogo(res.settings.app_logo);
      }
    };
    fetchLogo();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="layout-wrapper">
      <header style={{ 
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : '#0F172A',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        padding: scrolled ? '0.6rem 0' : '1rem 0', 
        boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
        transition: 'var(--transition)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center" style={{ zIndex: 1001, gap: '1rem' }}>
            <img 
              src={logo} 
              alt="Logo Kementerian" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain', marginRight: '0.5rem' }} 
            />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.1, fontFamily: 'Outfit' }}>
              SI PTSP<br/>
              <small style={{fontSize:'0.65rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px'}}>LPP TERNATE</small>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <Link href="/" className="nav-link" style={{ color: 'white' }}>Beranda</Link>
            <Link href="/#layanan" className="nav-link" style={{ color: 'white' }}>Layanan</Link>
            <Link href="/#berita" className="nav-link" style={{ color: 'white' }}>Berita</Link>
            <Link href="/dashboard" className="btn" style={{ 
              padding: '0.6rem 1.5rem', 
              backgroundColor: 'var(--primary-blue)', 
              color: 'white'
            }}>Login Portal</Link>
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
              zIndex: 1001 
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
          backgroundColor: '#0F172A',
          display: isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          zIndex: 1000,
          transition: 'var(--transition)'
        }}>
          <Link href="/" className="nav-link" style={{ color: 'white', fontSize: '1.5rem' }}>Beranda</Link>
          <Link href="/#layanan" className="nav-link" style={{ color: 'white', fontSize: '1.5rem' }}>Layanan</Link>
          <Link href="/#berita" className="nav-link" style={{ color: 'white', fontSize: '1.5rem' }}>Berita</Link>
          <Link href="/dashboard" className="btn" style={{ 
            padding: '1rem 2.5rem', 
            backgroundColor: 'var(--primary-blue)', 
            color: 'white',
            fontSize: '1.2rem'
          }}>Login Portal</Link>
        </div>
      </header>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>

      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>

      <footer style={{ backgroundColor: '#0F172A', color: 'white', padding: '5rem 0 2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
          <div>
            <div className="flex items-center mb-6" style={{ gap: '1rem' }}>
               <img 
                src={logo} 
                alt="Logo Kementerian" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain', marginRight: '0.5rem' }} 
               />
               <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit' }}>SI PTSP</span>
            </div>
            <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '1.5rem' }}>Lembaga Pemasyarakatan Perempuan Kelas III Ternate melayani dengan hati, mengedepankan integritas dan transparansi.</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Hubungi Kami</h3>
            <ul style={{ listStyle: 'none', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>📍 Jl. Raya Bastiong, Ternate</li>
              <li>📧 lpp.ternate@kemenkumham.go.id</li>
              <li>📞 (0921) 312-XXXX</li>
              <li>📱 0812-XXXX-XXXX (WhatsApp)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem' }}>Jam Operasional</h3>
            <ul style={{ listStyle: 'none', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li>Senin - Kamis: 08:30 - 15:00 WIT</li>
              <li>Jumat: 08:30 - 11:30 WIT</li>
              <li>Sabtu - Minggu: Libur Pelayanan</li>
            </ul>
          </div>
        </div>
        
        <div className="container" style={{ marginTop: '5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2.5rem' }}>
          <div className="flex justify-between items-center flex-wrap gap-4" style={{ fontSize: '0.9rem', color: '#64748B' }}>
            <p>&copy; {new Date().getFullYear()} SI PTSP LPP TERNATE. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" style={{ transition: 'var(--transition)' }}>Privacy Policy</Link>
              <Link href="#" style={{ transition: 'var(--transition)' }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
