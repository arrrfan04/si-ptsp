'use client';

import { useState } from 'react';
import { submitVisitorForm } from '@/app/actions/visitors';
import Link from 'next/link';

export default function KunjunganPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPdfData(null);
    
    const formData = new FormData(e.target);
    const result = await submitVisitorForm(formData);
    
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      window.scrollTo(0, 0);
      if (result.pdfBase64) {
        setPdfData(result.pdfBase64);
      }
    } else {
      setError(result.message || 'Gagal mengirim form');
    }
  }

  const handleDownloadPDF = () => {
    if (!pdfData) return;
    const linkSource = `data:application/pdf;base64,${pdfData}`;
    const downloadLink = document.createElement('a');
    const fileName = `Bukti_Kunjungan_${Date.now()}.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  if (success) {
    return (
      <div className="container py-4">
        <div className="form-card text-center" style={{ 
          maxWidth: '600px', 
          margin: '2rem auto', 
          padding: '2.5rem 1.5rem' 
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem', color: '#10B981', animation: 'bounce 1s ease' }}>✅</div>
          <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>Pendaftaran Berhasil!</h2>
          <p style={{ color: '#64748B', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>Data kunjungan Anda telah terkirim dan tercatat dalam sistem pendaftaran LPP Ternate. Silakan unduh bukti pendaftaran di bawah ini.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {pdfData && (
              <button 
                onClick={handleDownloadPDF} 
                className="dashboard-hero-btn" 
                style={{ 
                  width: '100%', maxWidth: '300px', padding: '1rem', borderRadius: '0.75rem', 
                  backgroundColor: '#3BACF7', color: 'white', border: 'none', 
                  fontWeight: 800, cursor: 'pointer', fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}
              >
                <span>📄</span> Download Bukti (PDF)
              </button>
            )}
            <Link href="/" style={{ 
              width: '100%', maxWidth: '300px', padding: '1rem', borderRadius: '0.75rem', 
              backgroundColor: '#F8FAFC', color: '#0F172A', border: '1px solid #E2E8F0', 
              fontWeight: 700, textDecoration: 'none', textAlign: 'center', transition: 'all 0.3s'
            }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="form-card animate-up" id="kunjungan-form-card" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          #kunjungan-form-card {
            padding: 3.5rem;
          }
          @media (max-width: 768px) {
            #kunjungan-form-card {
              padding: 1.5rem !important;
            }
          }
        ` }} />
        {error && (
          <div style={{ padding: '1.25rem', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '0.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
             <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Data Pengunjung Utama */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem' }}>
              <div style={{ backgroundColor: '#E1F2FE', color: '#3BACF7', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', margin: 0 }}>Data Pengunjung Utama</h3>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Nama Lengkap Sesuai KTP <span style={{color: '#EF4444'}}>*</span></label>
                <input type="text" name="visitor_name" className="form-input-premium" placeholder="Contoh: Budi Santoso" required />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Nomor Induk Kependudukan (NIK) <span style={{color: '#EF4444'}}>*</span></label>
                <input type="text" name="visitor_nik" className="form-input-premium" placeholder="16 digit angka NIK" required pattern="[0-9]{16}" title="Masukkan 16 digit NIK yang valid" />
              </div>
            </div>
            
            <div className="form-group-premium">
              <label className="form-label-premium">Tujuan Kunjungan <span style={{color: '#EF4444'}}>*</span></label>
              <input type="text" name="visitor_purpose" className="form-input-premium" placeholder="Contoh: Membesuk keluarga" required />
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Alamat Email (Opsional)</label>
                <input type="email" name="visitor_email" className="form-input-premium" placeholder="nama@email.com" />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Nomor WhatsApp Aktif <span style={{color: '#EF4444'}}>*</span></label>
                <input type="tel" name="visitor_wa" className="form-input-premium" placeholder="08xxxxxxxxxx" required />
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Pilih Tanggal Kunjungan <span style={{color: '#EF4444'}}>*</span></label>
                <input type="date" name="visitor_date" className="form-input-premium" required />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Foto / Scan KTP <span style={{color: '#EF4444'}}>*</span></label>
                <div style={{ border: '2px dashed #E2E8F0', padding: '0.5rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC' }}>
                  <input type="file" accept="image/*" name="visitor_ktp" className="form-input-premium" style={{ border: 'none', background: 'transparent' }} required />
                </div>
              </div>
            </div>

            <div className="form-group-premium" style={{ marginBottom: 0 }}>
              <label className="form-label-premium">Alamat Lengkap (Sesuai KTP) <span style={{color: '#EF4444'}}>*</span></label>
              <textarea name="visitor_address" className="form-input-premium" rows="3" placeholder="Nama Jalan, RT/RW, Desa/Kelurahan..." required style={{ resize: 'vertical' }}></textarea>
            </div>
          </section>

          {/* Data Pengikut (Opsional) */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem' }}>
              <div style={{ backgroundColor: '#F1F5F9', color: '#64748B', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', margin: 0 }}>Data Pengikut (Opsional)</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>Silakan isi bagian ini apabila Anda membawa anggota keluarga atau rekan saat berkunjung.</p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Nama Pengikut</label>
                <input type="text" name="follower_name" className="form-input-premium" placeholder="Nama lengkap pengikut" />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">NIK Pengikut</label>
                <input type="text" name="follower_nik" className="form-input-premium" placeholder="16 digit angka NIK" pattern="[0-9]{16}" />
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Email Pengikut</label>
                <input type="email" name="follower_email" className="form-input-premium" placeholder="nama@email.com" />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">No. WA Pengikut</label>
                <input type="tel" name="follower_wa" className="form-input-premium" placeholder="08xxxxxxxxxx" />
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium">
                <label className="form-label-premium">Foto / Scan KTP Pengikut</label>
                <div style={{ border: '2px dashed #E2E8F0', padding: '0.5rem', borderRadius: '0.75rem', backgroundColor: '#F8FAFC' }}>
                  <input type="file" accept="image/*" name="follower_ktp" className="form-input-premium" style={{ border: 'none', background: 'transparent' }} />
                </div>
              </div>
            </div>

            <div className="form-group-premium" style={{ marginBottom: 0 }}>
              <label className="form-label-premium">Alamat Pengikut</label>
              <textarea name="follower_address" className="form-input-premium" rows="2" placeholder="Alamat lengkap sesuai KTP" style={{ resize: 'vertical' }}></textarea>
            </div>
          </section>

          {/* Data WBP */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem' }}>
              <div style={{ backgroundColor: '#FFF7ED', color: '#F97316', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', margin: 0 }}>Informasi Warga Binaan (WBP)</h3>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', 
              gap: '1.25rem' 
            }} className="md-grid-2">
              <div className="form-group-premium" style={{ marginBottom: 0 }}>
                <label className="form-label-premium">Nama Lengkap WBP <span style={{color: '#EF4444'}}>*</span></label>
                <input type="text" name="wbp_name" className="form-input-premium" placeholder="Nama lengkap warga binaan yang dituju" required />
              </div>
              <div className="form-group-premium" style={{ marginBottom: 0 }}>
                <label className="form-label-premium">Perkara / Jenis Kasus <span style={{color: '#EF4444'}}>*</span></label>
                <input type="text" name="wbp_case" className="form-input-premium" placeholder="Contoh: Pidana Umum, Narkotika" required />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '2px dashed #E2E8F0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>Pastikan semua data yang ditandai dengan bintang (<span style={{color: '#EF4444'}}>*</span>) telah terisi dengan benar.</p>
            <button type="submit" className="dashboard-hero-btn" style={{ 
              width: '100%', 
              padding: '1.25rem', 
              fontSize: '1.1rem', 
              fontWeight: 800,
              borderRadius: '1rem',
              backgroundColor: '#3BACF7',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(59, 172, 247, 0.4)'
            }} disabled={loading}>
              {loading ? 'Memproses Pendaftaran...' : 'Kirim Formulir Kunjungan 🚀'}
            </button>
          </div>
        </form>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .md-grid-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      ` }} />
    </div>
  );
}
