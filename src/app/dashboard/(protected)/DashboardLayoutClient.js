'use client';

import { logOutAction } from '@/app/actions/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function DashboardLayoutClient({ children, session }) {
  const pathname = usePathname();
  
  const role = session?.user?.role || 'admin';
  const username = session?.user?.username || 'User';

  const menuItems = [
    { label: 'Beranda Dashboard', href: '/dashboard', icon: '🏠', roles: ['admin', 'humas', 'ao', 'pelayanan'] },
    { label: 'Management User', href: '/dashboard/users', icon: '👥', roles: ['admin'] },
    { label: 'Data Pengunjung', href: '/dashboard/kunjungan', icon: '📋', roles: ['ao', 'pelayanan'] },
    { label: 'Data Remisi', href: '/dashboard/remisi', icon: '🌟', roles: ['ao'] },
    { label: 'Management Berita', href: '/dashboard/berita', icon: '📰', roles: ['humas'] },
    { label: 'Pengaturan Humas', href: '/dashboard/pengaturan/humas', icon: '🎨', roles: ['humas'] },
    { label: 'Update Link Layanan', href: '/dashboard/pengaturan/ao', icon: '🔗', roles: ['ao'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: '#0F172A', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        zIndex: 100,
        position: 'fixed',
        height: '100vh'
      }}>
        {/* Sidebar Header/Logo */}
        <div style={{ 
          padding: '2.5rem 1.5rem', 
          borderBottom: '1px solid rgba(255,255,255,0.05)', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '1.25rem' 
        }}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
              src="/logo-kemen.png" 
              alt="Logo Kemen" 
              width={65} 
              height={65} 
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <div>
            <h2 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', letterSpacing: '0.5px' }}>SI PTSP Dashboard</h2>
            <div style={{ 
              display: 'inline-block', 
              marginTop: '0.5rem', 
              padding: '0.2rem 0.75rem', 
              backgroundColor: 'var(--primary-blue)', 
              color: 'white', 
              borderRadius: '20px', 
              fontSize: '0.65rem', 
              fontWeight: 800, 
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Portal {role}
            </div>
          </div>
        </div>
        
        {/* Sidebar Nav */}
        <nav style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: '0.75rem',
                color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                backgroundColor: isActive ? 'rgba(59, 172, 247, 0.15)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                borderLeft: isActive ? '4px solid #3BACF7' : '4px solid transparent',
              }} className="dashboard-nav-item">
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
          
          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
             <form action={logOutAction}>
               <button type="submit" style={{ 
                 width: '100%', 
                 padding: '1rem',
                 borderRadius: '0.75rem',
                 color: '#FDA4AF', 
                 backgroundColor: 'rgba(225, 29, 72, 0.05)', 
                 border: '1px solid rgba(225, 29, 72, 0.1)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 gap: '0.75rem',
                 fontWeight: 700,
                 cursor: 'pointer',
                 transition: 'all 0.3s'
               }} className="dashboard-logout-btn">
                 <span>🚪</span> Keluar Sesi
               </button>
             </form>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '280px', display: 'flex', flexDirection: 'column' }}>
        {/* Main Content Header */}
        <header style={{ 
          height: '100px',
          backgroundColor: 'white', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 3rem',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
           <div style={{ flex: 1 }}>
             <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                Selamat Datang, <span style={{ color: '#3BACF7' }}>{username}</span>
             </h1>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <Link href="/" target="_blank" style={{ 
               padding: '0.6rem 1.25rem', 
               borderRadius: '0.5rem', 
               border: '1.5px solid #E2E8F0',
               color: '#64748B',
               fontWeight: 600,
               fontSize: '0.9rem',
               display: 'flex',
               alignItems: 'center',
               gap: '0.5rem',
               transition: 'all 0.3s',
               textDecoration: 'none'
             }} className="dashboard-header-btn">
               <span>&#8599;</span> Lihat Website
             </Link>
             
             <div style={{ 
               width: '45px', height: '45px', 
               borderRadius: '12px', 
               backgroundColor: '#E1F2FE', 
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               fontSize: '1.2rem',
               border: '2px solid white',
               boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
             }}>👤</div>
           </div>
        </header>

        {/* Main Viewport */}
        <main style={{ padding: '3rem', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
