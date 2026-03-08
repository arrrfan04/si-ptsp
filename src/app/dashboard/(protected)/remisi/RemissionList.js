'use client';

import { useState } from 'react';
import { useNotification } from '@/app/components/NotificationProvider';
import { updateRemission, deleteRemission } from '@/app/actions/remissions';

export default function RemissionList({ remissions }) {
  const { addNotification } = useNotification();
  const [editingRemission, setEditingRemission] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (remission) => {
    setEditingRemission({ ...remission });
  };

  const handleCancelEdit = () => {
    setEditingRemission(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.target);
    try {
      const res = await updateRemission(editingRemission.id, formData);
      if (res.success) {
        addNotification('Data remisi berhasil diperbarui!', 'success');
        setEditingRemission(null);
      } else {
        addNotification(res.message || 'Gagal memperbarui data', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus data remisi untuk "${name}"?`)) return;
    
    try {
      const res = await deleteRemission(id);
      if (res.success) {
        addNotification(`Data remisi ${name} berhasil dihapus`, 'success');
      } else {
        addNotification(res.message || 'Gagal menghapus data', 'error');
      }
    } catch (err) {
      addNotification('Kesalahan saat menghapus data', 'error');
    }
  };

  return (
    <div className="card" style={{ padding: '2.5rem', borderRadius: '2rem', border: '1px solid #E2E8F0', backgroundColor: 'white' }}>
      <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', marginBottom: '2rem' }}>Daftar Penerima Remisi</h3>
      
      {remissions.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94A3B8', background: '#F8FAFC', borderRadius: '1.5rem' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
           <p style={{ fontWeight: 600 }}>Belum ada data remisi yang tercatat.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Penerima / WBP</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Detail & Pengurangan</th>
                <th style={{ padding: '1rem 1.5rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {remissions.map(r => (
                <tr key={r.id} style={{ backgroundColor: '#F8FAFC' }} className="dashboard-table-row">
                  <td style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem 0 0 1rem' }}>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{r.wbp_name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#3BACF7', fontWeight: 600 }}>Kasus: {r.case_type}</div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5 }}>
                    <div style={{ color: '#0F172A', fontWeight: 600 }}>{r.remission_details}</div>
                    <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700, marginTop: '0.25rem' }}>
                       📉 {r.sentence_reduction || '-'}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', borderRadius: '0 1rem 1rem 0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleEditClick(r)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          background: 'rgba(59, 172, 247, 0.05)', 
                          color: '#3BACF7', 
                          border: '1px solid rgba(59, 172, 247, 0.1)',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >Edit</button>
                      
                      <button type="button" onClick={() => handleDelete(r.id, r.wbp_name)} style={{ 
                        padding: '0.5rem 1rem', 
                        background: 'rgba(239, 68, 68, 0.05)', 
                        color: '#EF4444', 
                        border: '1px solid rgba(239, 68, 68, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }} className="btn-delete-action">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingRemission && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 
        }}>
          <div className="card animate-up" style={{ 
            backgroundColor: 'white', padding: '2.5rem', borderRadius: '1.5rem', 
            width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
          }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>Edit Data Remisi</h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '2rem' }}>Perbarui informasi remisi untuk WBP.</p>

            <form onSubmit={handleUpdate}>
              <div className="form-group-premium">
                <label className="form-label-premium">Nama WBP</label>
                <input type="text" name="wbp_name" defaultValue={editingRemission.wbp_name} className="form-input-premium" required />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Jenis Kasus</label>
                <input type="text" name="case_type" defaultValue={editingRemission.case_type} className="form-input-premium" required />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Detail Remisi</label>
                <textarea name="remission_details" defaultValue={editingRemission.remission_details} className="form-input-premium" rows="3" required style={{ resize: 'none' }}></textarea>
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Pengurangan Hukuman (Pidana)</label>
                <input type="text" name="sentence_reduction" defaultValue={editingRemission.sentence_reduction} className="form-input-premium" required />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                <button type="submit" disabled={isSaving} style={{ 
                  flex: 1, padding: '0.85rem', background: '#3BACF7', color: 'white', 
                  border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer',
                  opacity: isSaving ? 0.7 : 1, transition: 'all 0.3s'
                }}>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
                <button type="button" onClick={handleCancelEdit} disabled={isSaving} style={{ 
                  flex: 1, padding: '0.85rem', background: '#F1F5F9', color: '#64748B', 
                  border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
