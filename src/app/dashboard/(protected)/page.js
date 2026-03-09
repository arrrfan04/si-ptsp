import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getDashboardStats } from '@/app/actions/dashboard';

export default async function DashboardHome() {
  const session = await getSession();
  if (!session) {
    redirect('/dashboard/login');
  }
  const role = session.user.role;
  const username = session.user.username;

  const statsRes = await getDashboardStats();
  const stats = statsRes.success ? statsRes.stats : { totalVisitors: 0, totalNews: 0, totalRemissions: 0 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Welcome Hero Card */}
      <div className="dashboard-hero-card" style={{ 
        padding: '3.5rem', 
        borderRadius: '2rem',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoration */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', background: 'rgba(59, 172, 247, 0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ 
            display: 'inline-block', 
            padding: '0.4rem 1rem', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px', 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            Panel Kendali Terintegrasi
          </span>
          <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: 'white' }}>
            Halo, {username}! 👋
          </h2>
          <p className="hero-text" style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.7)', maxWidth: '650px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Selamat datang di Sistem Informasi PTSP LPP Ternate. Anda masuk sebagai <strong>{role.toUpperCase()}</strong>. 
            Semua aktivitas harian dan manajemen konten dapat Anda monitoring dan eksekusi melalui panel ini.
          </p>
          
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
             <a href="/" target="_blank" style={{ 
               padding: '0.8rem 1.75rem', 
               backgroundColor: 'rgba(255,255,255,0.1)', 
               color: 'white', 
               borderRadius: '0.75rem', 
               fontWeight: 700,
               textDecoration: 'none',
               border: '1px solid rgba(255,255,255,0.2)',
               transition: 'all 0.3s'
             }} className="dashboard-hero-btn-outline">
                Pratinjau Website
             </a>
          </div>
        </div>
      </div>

      {/* Quick Stats / Info Cards */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <div className="stat-card" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#E1F2FE', color: '#3BACF7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>📊</div>
          <h3 style={{ fontSize: '1.1rem', color: '#64748B', fontWeight: 600, marginBottom: '0.5rem' }}>Total Pengunjung</h3>
          <p className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{stats.totalVisitors}</p>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Data pendaftaran masuk</span>
        </div>

        <div className="stat-card" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#F0F9FF', color: '#3BACF7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>📰</div>
          <h3 style={{ fontSize: '1.1rem', color: '#64748B', fontWeight: 600, marginBottom: '0.5rem' }}>Berita Aktif</h3>
          <p className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{stats.totalNews}</p>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Artikel terbit</span>
        </div>

        <div className="stat-card" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '1.5rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#FFF7ED', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>🌟</div>
          <h3 style={{ fontSize: '1.1rem', color: '#64748B', fontWeight: 600, marginBottom: '0.5rem' }}>Data Remisi</h3>
          <p className="stat-number" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit' }}>{stats.totalRemissions}</p>
          <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Rekapitulasi remisi</span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .dashboard-hero-card {
            padding: 2rem !important;
            border-radius: 1.5rem !important;
          }
          .hero-title {
            font-size: 1.75rem !important;
          }
          .hero-text {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .stat-card {
            padding: 1.5rem !important;
          }
          .stat-number {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
