'use client';

import { uploadHeroImage } from '@/app/actions/settings';
import { useNotification } from '@/app/components/NotificationProvider';

export default function HeroUploadForm({ slot, currentImage, hasCustom }) {
  const { addNotification } = useNotification();

  const clientAction = async (formData) => {
    try {
      const res = await uploadHeroImage(formData, slot);
      if (res.success) {
        addNotification(`Gambar Slide ${slot} berhasil diperbarui!`, 'success');
        // Note: The page will revalidate due to the server action, but for file uploads 
        // sometimes a manual refresh is needed if the browser caches the image URL.
        // However, Next.js revalidatePath should handle the UI state.
      } else {
        addNotification(res.message || `Gagal mengunggah gambar Slide ${slot}`, 'error');
      }
    } catch (err) {
      addNotification('Terjadi kesalahan saat mengunggah', 'error');
    }
  };

  return (
    <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ fontWeight: 700, color: '#0F172A' }}>Slide {slot}</h4>
        {hasCustom && <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '10px', fontWeight: 700 }}>Custom</span>}
      </div>
      
      <div style={{ 
        width: '100%', height: '150px', 
        backgroundImage: `url('${currentImage}')`, 
        backgroundSize: 'cover', backgroundPosition: 'center',
        borderRadius: '0.75rem', marginBottom: '1rem',
        border: '1px solid #CBD5E1'
      }}></div>

      <form action={clientAction} style={{ marginTop: 'auto' }}>
        <label className="form-label-premium" style={{ fontSize: '0.85rem' }}>Ganti Gambar Baru</label>
        <input type="file" name="image" accept="image/*" className="form-input-premium" style={{ marginBottom: '1rem', padding: '0.5rem' }} required />
        <button type="submit" className="btn-secondary-premium" style={{ width: '100%', padding: '0.75rem' }}>Upload & Gunakan</button>
      </form>
    </div>
  );
}
