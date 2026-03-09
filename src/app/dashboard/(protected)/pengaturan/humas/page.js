import { getSettings } from '@/app/actions/settings';
import MarqueeForm from './MarqueeForm';
import HeroUploadForm from './HeroUploadForm';
import LogoUploadForm from './LogoUploadForm';

export default async function HumasSettingsDashboard() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Pengaturan Publikasi & Kehumasan</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Kelola logo instansi, teks berjalan (Marquee) dan gambar slide halaman utama.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2.5rem' }}>
        
        {/* Logo settings - Full Width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <LogoUploadForm currentLogo={settings.app_logo} />
        </div>

        {/* Banner/Marquee Card */}
        <MarqueeForm initialValue={settings.marquee_text} />

        {/* Hero Carousel Images Card */}
        <div className="form-card" style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem' }}>🖼️</div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Gambar Carousel Depan</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Perbarui gambar latar belakang untuk 3 slide utama di Beranda</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3].map((slot) => {
               const currentImage = settings[`hero_image_${slot}`] || `/hero${slot}.png`;
               return (
                 <HeroUploadForm 
                   key={slot} 
                   slot={slot} 
                   currentImage={currentImage} 
                   hasCustom={!!settings[`hero_image_${slot}`]} 
                 />
               );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
