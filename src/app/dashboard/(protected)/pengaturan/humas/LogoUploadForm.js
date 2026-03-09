'use client';

import { uploadLogo } from '@/app/actions/settings';
import { useNotification } from '@/app/components/NotificationProvider';

export default function LogoUploadForm({ currentLogo }) {
  const { addNotification } = useNotification();

  const clientAction = async (formData) => {
    try {
      const res = await uploadLogo(formData);
      if (res.success) {
        addNotification('Logo aplikasi berhasil diperbarui!', 'success');
      } else {
        addNotification(res.message || 'Gagal memperbarui logo', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan saat mengunggah logo', 'error');
    }
  };

  return (
    <div className="form-card" style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2rem' }}>🎨</div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Logo Aplikasi</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Perbarui logo yang muncul di Header, Footer, Login, dan Dashboard</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#0F172A', 
          borderRadius: '1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minWidth: '150px'
        }}>
          {currentLogo ? (
            <img 
              src={currentLogo} 
              alt="Current Logo" 
              style={{ height: '80px', width: 'auto', objectFit: 'contain' }} 
            />
          ) : (
            <div style={{ color: 'white', fontSize: '0.8rem', textAlign: 'center' }}>Logo Belum Diatur</div>
          )}
        </div>

        <form action={clientAction} style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label-premium">Pilih Logo Baru</label>
            <input 
              type="file" 
              name="logo" 
              accept="image/*" 
              className="form-input-premium" 
              style={{ padding: '0.6rem' }} 
              required 
            />
            <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem' }}>Format yang disarankan: PNG transparan atau SVG. Maks 2MB.</p>
          </div>
          <button type="submit" className="btn-primary-premium" style={{ padding: '0.75rem 2rem' }}>
            Simpan Perubahan Logo
          </button>
        </form>
      </div>
    </div>
  );
}
