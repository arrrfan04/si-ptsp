'use client';

import { createNews } from '@/app/actions/news';
import { useNotification } from '@/app/components/NotificationProvider';
import { useRef } from 'react';

export default function NewsForm() {
  const { addNotification } = useNotification();
  const formRef = useRef(null);

  const clientAction = async (formData) => {
    try {
      const res = await createNews(formData);
      if (res.success) {
        addNotification('Berita baru berhasil diterbitkan!', 'success');
        formRef.current?.reset();
      } else {
        addNotification(res.message || 'Gagal menerbitkan berita', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  return (
    <div className="form-card">
      <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', marginBottom: '2rem' }}>Buat Artikel Baru</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-group-premium">
          <label className="form-label-premium">Judul Berita</label>
          <input type="text" name="title" className="form-input-premium" placeholder="Masukkan judul yang menarik..." required />
        </div>
        
        <div className="form-group-premium">
          <label className="form-label-premium">Gambar Pendukung</label>
          <div style={{ 
            border: '2px dashed #E2E8F0', 
            padding: '1.5rem', 
            borderRadius: '1rem', 
            textAlign: 'center',
            backgroundColor: '#F8FAFC'
          }}>
            <input type="file" name="image" accept="image/*" className="form-input-premium" style={{ border: 'none', background: 'transparent', padding: '0' }} />
            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.5rem' }}>Format: JPG, PNG (Max 2MB)</p>
          </div>
        </div>
        
        <div className="form-group-premium">
          <label className="form-label-premium">Konten / Isi Berita</label>
          <textarea name="content" className="form-input-premium" rows="10" placeholder="Tuliskan berita lengkap di sini..." required style={{ resize: 'vertical' }}></textarea>
        </div>
        
        <button type="submit" style={{ 
          width: '100%', 
          padding: '1rem', 
          fontSize: '1rem', 
          fontWeight: 700, 
          borderRadius: '0.75rem',
          backgroundColor: '#3BACF7',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s',
          marginTop: '1rem',
          boxShadow: '0 10px 20px -5px rgba(59, 172, 247, 0.4)'
        }} className="dashboard-hero-btn">
          Terbitkan Sekarang 🚀
        </button>
      </form>
    </div>
  );
}
