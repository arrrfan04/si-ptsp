'use client';

import { createUser } from '@/app/actions/users';
import { useNotification } from '@/app/components/NotificationProvider';
import { useRef } from 'react';

export default function UserForm() {
  const { addNotification } = useNotification();
  const formRef = useRef(null);

  const clientAction = async (formData) => {
    try {
      const res = await createUser(formData);
      if (res.success) {
        addNotification('User baru berhasil didaftarkan!', 'success');
        formRef.current?.reset();
      } else {
        addNotification(res.message || 'Gagal mendaftarkan user', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  return (
    <div className="form-card" style={{ flex: '1 1 320px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.5rem' }}>👤</div>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>User Baru</h3>
      </div>
      <form ref={formRef} action={clientAction}>
        <div className="form-group-premium">
          <label className="form-label-premium">Username</label>
          <input type="text" name="username" className="form-input-premium" placeholder="Masukkan username" required />
        </div>
        <div className="form-group-premium">
          <label className="form-label-premium">Password</label>
          <input type="password" name="password" className="form-input-premium" placeholder="••••••••" required />
        </div>
        <div className="form-group-premium">
          <label className="form-label-premium">Role / Hak Akses</label>
          <select name="role" className="form-input-premium" required>
            <option value="admin">Administrator</option>
            <option value="humas">Humas (Konten Berita)</option>
            <option value="ao">AO (Tautan Layanan)</option>
            <option value="pelayanan">Petugas Layanan (Kunjungan)</option>
          </select>
        </div>
        <button type="submit" className="dashboard-hero-btn" style={{ 
          width: '100%', padding: '1rem', borderRadius: '0.75rem', 
          backgroundColor: '#3BACF7', color: 'white', border: 'none', 
          fontWeight: 700, cursor: 'pointer', marginTop: '1rem' 
        }}>Daftarkan User</button>
      </form>
    </div>
  );
}
