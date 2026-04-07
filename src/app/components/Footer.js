'use client';

import Link from 'next/link';

export default function Footer({ logo }) {
  return (
    <footer style={{ backgroundColor: '#0F172A', color: 'white', padding: '5rem 0 2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', padding: '0 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div>
          <div className="flex items-center mb-6" style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
             {logo && (
               <img 
                src={logo} 
                alt="Logo Kementerian" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
               />
             )}
             <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', fontFamily: "'Outfit', sans-serif" }}>SI PTSP</span>
          </div>
          <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: '1.5rem' }}>Lembaga Pemasyarakatan Perempuan Kelas III Ternate melayani dengan hati, mengedepankan integritas dan transparansi.</p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>Hubungi Kami</h3>
          <ul style={{ listStyle: 'none', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
            <li>📍 Jl. Batu Angus, Kel Kastela, Kec. Pulau Ternate - Kota Ternate</li>
            <li>📧 lpp.ternate@kemenimpas.go.id</li>
            <li>📞 (0921) 312-XXXX</li>
            <li>📱 0812-XXXX-XXXX (WhatsApp)</li>
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>Jadwal Kunjungan</h3>
          <ul style={{ listStyle: 'none', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
            <li>Selasa, Rabu, Kamis, Sabtu: 09:00 - 11:30 WIT</li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2.5rem', padding: '0 1.5rem', maxWidth: '1280px', margin: '5rem auto 0 auto' }}>
        <div className="flex justify-between items-center flex-wrap gap-4" style={{ fontSize: '0.9rem', color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>&copy; {new Date().getFullYear()} SI PTSP LPP TERNATE. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" style={{ color: '#64748B', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
