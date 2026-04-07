'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  getPembinaanItems, 
  createPembinaanItem, 
  updatePembinaanItem, 
  deletePembinaanItem,
  getPembinaanStats,
  updatePembinaanStat
} from '@/app/actions/pembinaan';
import { useNotification } from '@/app/components/NotificationProvider';

export default function PembinaanDashboard() {
  const { addNotification } = useNotification();
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingImages, setRemainingImages] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isModalOpen]);

  const fetchData = async () => {
    setLoading(true);
    const [itemsRes, statsRes] = await Promise.all([
      getPembinaanItems(),
      getPembinaanStats()
    ]);
    if (itemsRes.success) setItems(itemsRes.items);
    if (statsRes.success) setStats(statsRes.stats);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Add existing images to keep
    formData.append('existing_images', JSON.stringify(remainingImages));

    try {
      let res;
      if (editingItem) {
        res = await updatePembinaanItem(editingItem.id, formData);
      } else {
        res = await createPembinaanItem(formData);
      }

      if (res.success) {
        addNotification(editingItem ? 'Item pembinaan berhasil diperbarui' : 'Item pembinaan baru berhasil ditambahkan', 'success');
        setIsModalOpen(false);
        setEditingItem(null);
        setRemainingImages([]);
        fetchData();
        if (formRef.current) formRef.current.reset();
      } else {
        addNotification(res.message, 'error');
      }
    } catch (err) {
      addNotification('Gagal menyimpan data', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item ini?')) return;
    try {
      const res = await deletePembinaanItem(id);
      if (res.success) {
        addNotification('Item pembinaan berhasil dihapus', 'success');
        fetchData();
      } else {
        addNotification(res.message, 'error');
      }
    } catch (err) {
      addNotification('Gagal menghapus data', 'error');
    }
  };

  const handleUpdateStat = async (id, count) => {
    try {
      const res = await updatePembinaanStat(id, count);
      if (res.success) {
        addNotification('Statistik berhasil diperbarui', 'success');
        fetchData();
      } else {
        addNotification(res.message, 'error');
      }
    } catch (err) {
      addNotification('Gagal memperbarui statistik', 'error');
    }
  };

  if (loading) return <div className="text-center py-5">Memuat data...</div>;

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }} className="dashboard-page-header">
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Management Pembinaan</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Kelola informasi program pembinaan dan statistik partisipasi Warga Binaan.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="pembinaan-mgmt-container">
        {/* Statistics Management Card */}
        <div className="form-card" style={{ marginBottom: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem' }}>📊</div>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Statistik Partisipasi WBP</h3>
          </div>
          <div className="stats-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {stats.map(stat => (
              <div key={stat.id} style={{ flex: '1 1 300px', backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#64748B', marginBottom: '0.5rem' }}>
                  {stat.program_name}
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input 
                    type="number" 
                    defaultValue={stat.count}
                    className="form-input-premium"
                    style={{ flex: 1 }}
                  />
                  <button 
                    className="btn-primary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                    onClick={(e) => handleUpdateStat(stat.id, e.currentTarget.previousElementSibling.value)}
                  >
                    Update
                  </button>
                </div>
                <p style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                  Terakhir pembaruan: {new Date(stat.updated_at).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Items List Card */}
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Program & Kegiatan Pembinaan</h3>
            </div>
            <button 
              onClick={() => { 
                setEditingItem(null); 
                setRemainingImages([]);
                setIsModalOpen(true); 
              }}
              className="dashboard-hero-btn" 
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              + Tambah Item
            </button>
          </div>

          <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
            {items.length === 0 ? (
              <div className="text-center py-5" style={{ gridColumn: '1 / -1', color: '#94A3B8', border: '2px dashed #E2E8F0', borderRadius: '1rem' }}>
                Belum ada item pembinaan. Klik tombol di atas untuk menambahkan.
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="item-card" style={{ 
                  display: 'flex', gap: '1.25rem', padding: '1.25rem', 
                  backgroundColor: '#F8FAFC', borderRadius: '1rem', border: '1px solid #E2E8F0',
                  alignItems: 'flex-start'
                }}>
                  <div className="item-img-box" style={{ width: '100px', height: '100px', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: '#E2E8F0', flexShrink: 0, position: 'relative' }}>
                    {item.images && item.images.length > 0 ? (
                      <>
                        <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {item.images.length > 1 && (
                          <div style={{ position: 'absolute', bottom: '5px', right: '5px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>
                            {item.images.length} Foto
                          </div>
                        )}
                      </>
                    ) : item.image_url ? (
                      <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🎨</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                    <div className="item-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button 
                        onClick={() => { 
                          setEditingItem(item); 
                          setRemainingImages(item.images || []);
                          setIsModalOpen(true); 
                        }}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', backgroundColor: 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #FEE2E2', backgroundColor: '#FFF1F1', cursor: 'pointer', color: '#EF4444', fontSize: '0.8rem', fontWeight: 600 }}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Item */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          zIndex: 1000, padding: '2rem'
        }}>
          <div className="modal-content-premium animate-up" style={{ maxWidth: '750px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A', marginBottom: '2rem' }}>
              {editingItem ? 'Edit Item Pembinaan' : 'Tambah Item Pembinaan'}
            </h3>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="form-group-premium">
                <label className="form-label-premium">Judul Kegiatan / Item</label>
                <input type="text" name="title" className="form-input-premium" defaultValue={editingItem?.title} required />
              </div>
              <div className="form-group-premium">
                <label className="form-label-premium">Deskripsi</label>
                <textarea name="description" className="form-input-premium" style={{ minHeight: '120px' }} defaultValue={editingItem?.description} required></textarea>
              </div>
              
              <div className="form-group-premium">
                <label className="form-label-premium">Foto Kegiatan (Maks. 10 Slide)</label>
                
                {/* Existing Images Management */}
                {remainingImages.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', backgroundColor: '#F1F5F9', padding: '1rem', borderRadius: '0.75rem' }}>
                    {remainingImages.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', border: '2px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <img src={img} alt={`Slide ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button"
                          onClick={() => setRemainingImages(remainingImages.filter((_, i) => i !== idx))}
                          style={{ position: 'absolute', top: 2, right: 2, backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <input 
                  type="file" 
                  name="images" 
                  accept="image/*" 
                  multiple 
                  className="form-input-premium" 
                  onChange={(e) => {
                    if (e.target.files.length + remainingImages.length > 10) {
                      addNotification('Total foto tidak boleh melebih 10 slide', 'error');
                      e.target.value = '';
                    }
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem' }}>
                  Anda dapat memilih beberapa foto sekaligus untuk dijadikan slide.
                </p>
                
                {editingItem && remainingImages.length === 0 && (
                  <input type="hidden" name="remove_all_images" value="true" />
                )}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="dashboard-hero-btn" style={{ flex: 1 }}>Simpan</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ 
                  flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', 
                  backgroundColor: 'white', color: '#64748B', fontWeight: 700, cursor: 'pointer' 
                }}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .pembinaan-mgmt-container {
          padding-bottom: 2rem;
        }

        .form-card {
          background: #FFFFFF !important;
          padding: 2rem;
          margin-bottom: 2rem;
          opacity: 1 !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        .modal-content-premium {
          background: #FFFFFF !important;
          border-radius: 2rem;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.25);
          opacity: 1 !important;
          position: relative;
          padding: 3.5rem !important;
        }

        .form-group-premium {
          margin-bottom: 2rem !important;
        }

        @media (max-width: 1024px) {
          .pembinaan-mgmt-container {
            gap: 1.5rem !important;
          }
          .form-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .dashboard-page-header h2 {
            font-size: 1.5rem !important;
          }
          .dashboard-page-header p {
            font-size: 0.9rem !important;
          }
          .pembinaan-mgmt-container {
            gap: 1rem !important;
          }
          .stats-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .items-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .item-card {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 1rem !important;
          }
          .item-img-box {
            width: 100% !important;
            height: 180px !important;
            margin-bottom: 1rem;
          }
          .item-actions {
            flex-direction: column !important;
          }
          .item-actions button {
            width: 100%;
          }
          .modal-content-premium {
            padding: 1.5rem !important;
            width: 95% !important;
            margin: 10px !important;
          }
        }

        @media (max-width: 480px) {
          .dashboard-page-header {
            margin-bottom: 1.5rem !important;
          }
          .btn-primary, .dashboard-hero-btn {
            font-size: 0.85rem !important;
            padding: 0.75rem 1rem !important;
          }
        }
      ` }} />
    </div>
  );
}
