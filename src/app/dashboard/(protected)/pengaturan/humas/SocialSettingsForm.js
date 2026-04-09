'use client';

import { updateSetting } from '@/app/actions/settings';
import { useNotification } from '@/app/components/NotificationProvider';
import { useState } from 'react';

export default function SocialSettingsForm({ settings }) {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const clientAction = async (formData) => {
    setLoading(true);
    try {
      const keys = ['social_tiktok', 'social_x', 'social_facebook', 'social_instagram'];
      let allSuccess = true;

      for (const key of keys) {
        const value = formData.get(key);
        const res = await updateSetting(key, value);
        if (!res.success) allSuccess = false;
      }

      if (allSuccess) {
        addNotification('Link media sosial berhasil diperbarui!', 'success');
      } else {
        addNotification('Beberapa link gagal diperbarui', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card" style={{ gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2rem' }}>🌐</div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Media Sosial</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Perbarui link media sosial instansi yang muncul di Footer dan Detail Berita</p>
        </div>
      </div>

      <form action={clientAction}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="form-group-premium">
            <label className="form-label-premium">Instagram</label>
            <input 
              type="text" 
              name="social_instagram" 
              defaultValue={settings.social_instagram || ''} 
              className="form-input-premium" 
              placeholder="https://instagram.com/..." 
            />
          </div>
          <div className="form-group-premium">
            <label className="form-label-premium">Facebook</label>
            <input 
              type="text" 
              name="social_facebook" 
              defaultValue={settings.social_facebook || ''} 
              className="form-input-premium" 
              placeholder="https://facebook.com/..." 
            />
          </div>
          <div className="form-group-premium">
            <label className="form-label-premium">X (Twitter)</label>
            <input 
              type="text" 
              name="social_x" 
              defaultValue={settings.social_x || ''} 
              className="form-input-premium" 
              placeholder="https://x.com/..." 
            />
          </div>
          <div className="form-group-premium">
            <label className="form-label-premium">Tiktok</label>
            <input 
              type="text" 
              name="social_tiktok" 
              defaultValue={settings.social_tiktok || ''} 
              className="form-input-premium" 
              placeholder="https://tiktok.com/@..." 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="dashboard-hero-btn" 
          style={{ 
            width: '100%', padding: '0.9rem', borderRadius: '0.75rem', 
            backgroundColor: loading ? '#94A3B8' : '#3BACF7', color: 'white', border: 'none', 
            fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? 'Menyimpan...' : 'Perbarui Media Sosial'}
        </button>
      </form>
    </div>
  );
}
