'use client';

import { deleteNews } from '@/app/actions/news';
import { useNotification } from '@/app/components/NotificationProvider';
import { parseDate } from '@/lib/dateUtils';

export default function NewsList({ newsList }) {
  const { addNotification } = useNotification();

  const handleDelete = async (id, title) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;
    
    try {
      const res = await deleteNews(id);
      if (res.success) {
        addNotification(`Artikel "${title}" telah dihapus`, 'success');
      } else {
        addNotification(res.message || 'Gagal menghapus artikel', 'error');
      }
    } catch (err) {
      addNotification('Kesalahan saat menghapus artikel', 'error');
    }
  };

  return (
    <div className="card" style={{ padding: '2.5rem', borderRadius: '2rem', border: '1px solid #E2E8F0', backgroundColor: 'white' }}>
      <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A', marginBottom: '2rem' }}>Riwayat Publikasi</h3>
      {newsList.length === 0 ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#94A3B8', background: '#F8FAFC', borderRadius: '1.5rem' }}>
           <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📰</div>
           <p style={{ fontWeight: 600 }}>Belum ada berita yang dipublikasikan.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {newsList.map(news => (
            <div key={news.id} style={{ display: 'flex', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ 
                width: '150px', 
                height: '110px', 
                backgroundColor: '#F1F5F9', 
                flexShrink: 0, 
                borderRadius: '1rem', 
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #E2E8F0'
              }}>
                {news.image_url ? (
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${news.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center', padding: '1rem' }}>Tanpa Gambar</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                 <div style={{ fontSize: '0.8rem', color: '#3BACF7', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>📅</span> {parseDate(news.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jayapura' })}
                 </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', color: '#0F172A', lineHeight: 1.4 }}>{news.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                  {news.content}
                </p>
                <div style={{ marginTop: '1.25rem' }}>
                   <button 
                     type="button" 
                     onClick={() => handleDelete(news.id, news.title)}
                     style={{ 
                       padding: '0.5rem 1rem', 
                       background: 'rgba(239, 68, 68, 0.05)', 
                       color: '#EF4444', 
                       border: '1px solid rgba(239, 68, 68, 0.1)',
                       borderRadius: '8px',
                       fontSize: '0.8rem',
                       fontWeight: 700,
                       cursor: 'pointer',
                       transition: 'all 0.3s'
                     }} className="btn-delete-action">🗑️ Hapus Artikel</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
