'use client';

import { updateSetting } from '@/app/actions/settings';
import { useNotification } from '@/app/components/NotificationProvider';

export default function MarqueeForm({ initialValue }) {
  const { addNotification } = useNotification();

  const clientAction = async (formData) => {
    try {
      const text = formData.get('marquee_text');
      const res = await updateSetting('marquee_text', text);
      if (res.success) {
        addNotification('Teks pengumuman berhasil diperbarui!', 'success');
      } else {
        addNotification(res.message || 'Gagal memperbarui pengumuman', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  return (
    <div className="form-card" style={{ height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '2rem' }}>📢</div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Pengumuman Banner</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Teks yang berjalan di halaman utama (Marquee)</p>
        </div>
      </div>
      <form action={clientAction}>
        <div className="form-group-premium">
          <label className="form-label-premium">Teks Pengumuman</label>
          <textarea name="marquee_text" defaultValue={initialValue} className="form-input-premium" rows="3" required style={{ resize: 'none' }}></textarea>
        </div>
        <button type="submit" className="dashboard-hero-btn" style={{ 
          width: '100%', padding: '0.9rem', borderRadius: '0.75rem', 
          backgroundColor: '#3BACF7', color: 'white', border: 'none', 
          fontWeight: 700, cursor: 'pointer' 
        }}>Perbarui Banner</button>
      </form>
    </div>
  );
}
