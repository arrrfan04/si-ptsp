'use client';

import { useState } from 'react';
import { useNotification } from '@/app/components/NotificationProvider';
import { updateUserPassword, deleteUser } from '@/app/actions/users';

export default function UserList({ users }) {
  const { addNotification } = useNotification();
  const [editingUserId, setEditingUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (id) => {
    setEditingUserId(id);
    setNewPassword('');
    setShowPassword(false);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewPassword('');
  };

  const handleSavePassword = async (id) => {
    if (newPassword.length < 6) {
      addNotification('Sandi minimal 6 karakter', 'error');
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await updateUserPassword(id, newPassword);
      if (res.success) {
        addNotification('Berhasil memperbarui kata sandi!', 'success');
        setEditingUserId(null);
        setNewPassword('');
      } else {
        addNotification(res.message || 'Gagal mengubah password', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (id, username) => {
    if (!confirm(`Hapus user "${username}"?`)) return;
    
    try {
      const res = await deleteUser(id);
      if (res.success) {
        addNotification(`User ${username} berhasil dihapus`, 'success');
      } else {
        addNotification(res.message || 'Gagal menghapus user', 'error');
      }
    } catch (err) {
      addNotification('Kesalahan saat menghapus user', 'error');
    }
  };

  return (
    <div className="card animate-up" style={{ 
      padding: '2.5rem', 
      backgroundColor: 'white', 
      borderRadius: '2rem', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      border: '1px solid #E2E8F0'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Daftar Pengguna</h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.25rem' }}>Kelola akses dan peran pengguna sistem SI PTSP.</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>ID</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Username</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Role / Hak Akses</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Password</th>
              <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, textAlign: 'center', position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 10, boxShadow: '-4px 0 10px rgba(0,0,0,0.02)' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ backgroundColor: '#F8FAFC', transition: 'all 0.3s' }} className="table-row">
                <td style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem 0 0 1rem', fontSize: '0.9rem', color: '#64748B' }}>#{user.id}</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#0F172A' }}>{user.username}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    background: user.role === 'admin' ? '#E1F2FE' : '#F1F5F9', 
                    color: user.role === 'admin' ? '#3BACF7' : '#64748B', 
                    borderRadius: '10px', 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ color: '#94A3B8', letterSpacing: '2px', fontWeight: 800 }}>••••••••</span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', borderRadius: '0 1rem 1rem 0', textAlign: 'center', position: 'sticky', right: 0, backgroundColor: '#F8FAFC', zIndex: 5, boxShadow: '-4px 0 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="button" onClick={() => handleEditClick(user.id)} style={{ 
                      padding: '0.5rem 1rem', background: 'rgba(59, 172, 247, 0.05)', color: '#3BACF7', 
                      border: '1px solid rgba(59, 172, 247, 0.1)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
                    }} title="Atur ulang password">✏️ Edit</button>
                    
                    <button type="button" onClick={() => handleDeleteUser(user.id, user.username)} style={{ 
                      padding: '0.5rem 1rem', 
                      background: 'rgba(239, 68, 68, 0.05)', 
                      color: '#EF4444', 
                      border: '1px solid rgba(239, 68, 68, 0.1)',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }} className="btn-delete-action" title="Hapus pengguna">🗑️ Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUserId && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 
        }}>
          <div className="card animate-up" style={{ 
            backgroundColor: 'white', padding: '2.5rem', borderRadius: '1.5rem', 
            width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
          }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Edit Password</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Masukkan sandi baru untuk pengguna #{editingUserId}.
            </p>

            <div className="form-group-premium">
              <label className="form-label-premium">Password Baru</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ketik sandi baru..."
                  disabled={isSaving}
                  autoFocus
                  className="form-input-premium"
                  style={{ fontFamily: 'monospace', paddingRight: '3rem' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', 
                    background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#64748B' 
                  }}
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button type="button" onClick={() => handleSavePassword(editingUserId)} disabled={isSaving} style={{ 
                flex: 1, padding: '0.85rem', background: '#3BACF7', color: 'white', 
                border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer',
                opacity: isSaving ? 0.7 : 1, transition: 'all 0.3s'
              }}>Simpan</button>
              <button type="button" onClick={handleCancelEdit} disabled={isSaving} style={{ 
                flex: 1, padding: '0.85rem', background: '#F1F5F9', color: '#64748B', 
                border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.3s'
              }}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
