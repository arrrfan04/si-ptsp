'use client';

import { updateVisitorStatus, deleteVisitor } from '@/app/actions/visitors';
import Link from 'next/link';
import { useNotification } from '@/app/components/NotificationProvider';

export default function VisitorList({ visitors }) {
  const { addNotification } = useNotification();

  const handleUpdateStatus = async (id, status, name) => {
    try {
      const res = await updateVisitorStatus(id, status);
      if (res.success) {
        const statusText = status === 'approved' ? 'disetujui' : 'ditolak';
        addNotification(`Pendaftaran ${name} berhasil ${statusText}`, 'success');
      } else {
        addNotification(res.message || 'Gagal memperbarui status', 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan sistem', 'error');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Hapus data pendaftaran ${name} secara permanen?`)) return;
    
    try {
      const res = await deleteVisitor(id);
      if (res.success) {
        addNotification(`Data pendaftaran ${name} berhasil dihapus`, 'success');
      } else {
        addNotification(res.message || 'Gagal menghapus data', 'error');
      }
    } catch (err) {
      addNotification('Kesalahan saat menghapus data', 'error');
    }
  };
  return (
    <div className="card" style={{ 
      padding: '2rem', 
      backgroundColor: 'white', 
      borderRadius: '2rem', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      border: '1px solid #E2E8F0',
      overflowX: 'auto' 
    }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 1rem', textAlign: 'left', minWidth: '1000px' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.75rem 1.25rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Waktu & WBP</th>
            <th style={{ padding: '0.75rem 1.25rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Pengunjung Utama</th>
            <th style={{ padding: '0.75rem 1.25rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Dokumen</th>
            <th style={{ padding: '0.75rem 1.25rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Status</th>
            <th style={{ padding: '0.75rem 1.25rem', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, textAlign: 'center' }}>Aksi Kelola</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map(v => (
            <tr key={v.id} style={{ backgroundColor: '#F8FAFC', transition: 'all 0.3s' }} className="table-row-hover">
              <td style={{ padding: '1.25rem', borderRadius: '1rem 0 0 1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                   <span>🕒</span> {new Date(v.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>{v.wbp_name}</div>
                <div style={{ fontSize: '0.8rem', color: '#3BACF7', fontWeight: 600 }}>Kasus: {v.wbp_case}</div>
              </td>
              <td style={{ padding: '1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>{v.visitor_name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>NIK: {v.visitor_nik}</div>
                <div style={{ fontSize: '0.8rem', color: '#3BACF7' }}>WA: {v.visitor_wa}</div>
              </td>
              <td style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {v.visitor_ktp_url ? (
                    <a href={v.visitor_ktp_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3BACF7', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                       <span>🪪</span> KTP Utama
                    </a>
                  ) : '-'}
                  {v.follower_ktp_url && (
                    <a href={v.follower_ktp_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3BACF7', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                       <span>📎</span> KTP Pengikut
                    </a>
                  )}
                </div>
              </td>
              <td style={{ padding: '1.25rem' }}>
                <span style={{ 
                  padding: '0.4rem 1rem', 
                  borderRadius: '10px', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: v.status === 'pending' ? '#FEF3C7' : v.status === 'approved' ? '#DCFCE7' : '#FEE2E2',
                  color: v.status === 'pending' ? '#D97706' : v.status === 'approved' ? '#15803D' : '#B91C1C',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  {v.status}
                </span>
              </td>
              <td style={{ padding: '1.25rem', borderRadius: '0 1rem 1rem 0', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {v.status === 'pending' && (
                    <>
                      <button 
                        type="button" 
                        onClick={() => handleUpdateStatus(v.id, 'approved', v.visitor_name)} 
                        style={{ background: '#10B981', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                      >Setuju</button>
                      
                      <button 
                        type="button" 
                        onClick={() => handleUpdateStatus(v.id, 'rejected', v.visitor_name)} 
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '0.5rem 1rem', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                      >Tolak</button>
                    </>
                  )}
                  {v.status === 'approved' && (
                    <Link href={"/dashboard/kunjungan/cetak/" + v.id} target="_blank" style={{ 
                      padding: '0.5rem 1.25rem', 
                      backgroundColor: '#0F172A', 
                      color: 'white', 
                      borderRadius: '8px', 
                      fontWeight: 700, 
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>🖨️ Cetak PDF</Link>
                  )}
                  
                  <button 
                    type="button" 
                    onClick={() => handleDelete(v.id, v.visitor_name)} 
                    style={{ 
                      padding: '0.5rem 1rem', 
                      backgroundColor: 'rgba(239, 68, 68, 0.05)', 
                      color: '#EF4444', 
                      border: '1px solid rgba(239, 68, 68, 0.1)',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
