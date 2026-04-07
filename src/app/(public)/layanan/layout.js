'use client';

import { usePathname } from 'next/navigation';

export default function LayananLayout({ children }) {
  const pathname = usePathname();
  
  const getHeaderInfo = () => {
    if (pathname.includes('/kunjungan')) return { title: 'Pendaftaran Kunjungan', desc: 'Jadwalkan kunjungan Anda secara online untuk proses yang lebih cepat tanpa antrean panjang.', icon: '👥' };
    if (pathname.includes('/integrasi')) return { title: 'Layanan Integrasi', desc: 'Unduh blanko permohonan Pembebasan Bersyarat, Cuti Menjelang Bebas, dan Bantuan Hukum.', icon: '📄' };
    if (pathname.includes('/pengaduan')) return { title: 'Kanal Pengaduan', desc: 'Sampaikan laporan atau keluhan Anda terkait pelayanan kami secara aman dan rahasia.', icon: '⚖️' };
    if (pathname.includes('/pembinaan')) return { title: 'Layanan Pembinaan', desc: 'Informasi program pembinaan kepribadian dan kemandirian bagi Warga Binaan Pemasyarakatan LPP Ternate.', icon: '🎨' };
    if (pathname.includes('/remisi')) return { title: 'Detail Remisi', desc: 'Daftar transparan Warga Binaan Pemasyarakatan yang berhak mendapatkan remisi.', icon: '🌟' };
    if (pathname.includes('/esurvey')) return { title: 'E-Survey Kepuasan', desc: 'Partisipasi Anda membantu kami terus meningkatkan kualitas pelayanan LPP Ternate.', icon: '📊' };
    return { title: 'Layanan Publik', desc: 'Pusat layanan digital terpadu Lembaga Pemasyarakatan Perempuan Kelas III Ternate.', icon: '🏛️' };
  };

  const headerInfo = getHeaderInfo();

  return (
    <>
      <div style={{ backgroundColor: 'var(--primary-blue-light)', padding: '5rem 0 3rem 0', borderBottom: '1px solid var(--gray-border)' }}>
        <div className="container text-center animate-up">
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{headerInfo.icon}</div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '1rem' }}>{headerInfo.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>{headerInfo.desc}</p>
        </div>
      </div>
      <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '50vh', padding: '3rem 0' }}>
        {children}
      </div>
    </>
  );
}
