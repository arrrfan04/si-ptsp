'use client';

import { createRemission } from '@/app/actions/remissions';
import { useNotification } from '@/app/components/NotificationProvider';
import { useRef } from 'react';

export default function RemissionForm() {
  const { addNotification } = useNotification();
  const formRef = useRef(null);

  const clientAction = async (formData) => {
    try {
      const res = await createRemission(formData);
      if (res.success) {
        addNotification('Data remisi baru berhasil disimpan!', 'success');
        formRef.current?.reset();
      } else {
        addNotification(res.message || 'Gagal menyimpan data remisi', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  return (
    <div className="form-card" style={{ flex: '1 1 350px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.5rem' }}>✨</div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Tambah Data</h3>
      </div>
      <form ref={formRef} action={clientAction}>
        <div className="form-group-premium">
          <label className="form-label-premium">Nama WBP</label>
          <input type="text" name="wbp_name" className="form-input-premium" placeholder="Nama lengkap warga binaan" required />
        </div>
        <div className="form-group-premium">
          <label className="form-label-premium">Jenis Kasus</label>
          <input type="text" name="case_type" className="form-input-premium" placeholder="Contoh: Narkotika, Tipikor" required />
        </div>
        <div className="form-group-premium">
          <label className="form-label-premium">Detail Remisi</label>
          <textarea name="remission_details" className="form-input-premium" rows="3" placeholder="Contoh: Remisi Umum I Tahun 2024" required style={{ resize: 'none' }}></textarea>
        </div>
        <div className="form-group-premium">
          <label className="form-label-premium">Pengurangan Hukuman (Pidana)</label>
          <input type="text" name="sentence_reduction" className="form-input-premium" placeholder="Contoh: 1 Bulan 15 Hari" required />
        </div>
        <button type="submit" className="dashboard-hero-btn" style={{ 
          width: '100%', padding: '1rem', borderRadius: '0.75rem', 
          backgroundColor: '#3BACF7', color: 'white', border: 'none', 
          fontWeight: 700, cursor: 'pointer', marginTop: '1rem' 
        }}>Simpan Data Remisi</button>
      </form>
    </div>
  );
}
