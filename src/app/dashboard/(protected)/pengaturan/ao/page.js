import { getSettings } from '@/app/actions/settings';
import SettingForm from './SettingForm';

export default async function AOSettingsDashboard() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};
  
  // ... rest of the file ...


  const serviceLinks = [
    { key: 'link_blanko_pembebasan', label: 'Blanko Pembebasan Bersyarat', icon: '📄' },
    { key: 'link_blanko_cuti_bebas', label: 'Blanko Cuti Menjelang Bebas', icon: '🕊️' },
    { key: 'link_blanko_cuti_bersyarat', label: 'Blanko Cuti Bersyarat', icon: '📑' },
    { key: 'link_blanko_cuti_keluarga', label: 'Blanko Cuti Mengunjungi Keluarga', icon: '🫂' },
    { key: 'link_bantuan_hukum', label: 'Form Permohonan Bantuan Hukum', icon: '⚖️' },
    { key: 'link_izin_luar_biasa', label: 'Layanan Izin Luar Biasa', icon: '🚨' },
  ];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }} className="dashboard-page-header">
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Pengaturan Layanan (AO)</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Kelola tautan formulir, blanko integrasi, dan portal survey eksternal.</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }} className="settings-container">
        
        {/* Integrasi Card */}
        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2rem' }}>📂</div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Layanan Integrasi (Blanko & Form)</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Tautan berkas yang dapat diunduh oleh masyarakat umum</p>
            </div>
          </div>
          
          <div className="settings-grid-integrasi">
            {serviceLinks.map(item => (
              <SettingForm 
                key={item.key} 
                settingKey={item.key} 
                label={item.label} 
                initialValue={settings[item.key]} 
                icon={item.icon} 
              />
            ))}
          </div>
        </div>

        {/* E-Survey Card */}
        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2rem' }}>📊</div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Layanan E-Survey</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Hubungkan portal survei kepuasan masyarakat (IKM/IPK)</p>
            </div>
          </div>
          
          <div className="settings-grid-esurvey">
            {[1, 2, 3].map(num => (
              <SettingForm 
                key={num} 
                settingKey={'link_esurvey_' + num} 
                label={'Link Portal E-Survey ' + num} 
                initialValue={settings['link_esurvey_' + num]} 
                type="url"
              />
            ))}
          </div>
        </div>

        {/* Pemindahan Card */}
        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2rem' }}>🚚</div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Layanan Pemindahan</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Tautan form permohonan pemindahan WBP</p>
            </div>
          </div>
          <SettingForm 
            settingKey="link_pemindahan" 
            label="Link Form Pemindahan" 
            initialValue={settings.link_pemindahan} 
            type="url" 
            placeholder="https://..."
          />
        </div>

        {/* Pengaduan Card */}
        <div className="form-card">
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2rem' }}>⚖️</div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', fontWeight: 800, color: '#0F172A' }}>Layanan Pengaduan & Integritas</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Kelola tautan portal pengaduan resmi pihak ketiga</p>
            </div>
          </div>
          
          <div className="settings-grid-pengaduan">
            <SettingForm 
              settingKey="link_pengaduan_gratifikasi" 
              label="E-Lapor (Gratifikasi)" 
              initialValue={settings.link_pengaduan_gratifikasi} 
              type="url"
            />
            <SettingForm 
              settingKey="link_pengaduan_calo" 
              label="KPK (Anti Calo)" 
              initialValue={settings.link_pengaduan_calo} 
              type="url"
            />
            <SettingForm 
              settingKey="link_pengaduan_pungli" 
              label="Ombudsman (Saber Pungli)" 
              initialValue={settings.link_pengaduan_pungli} 
              type="url"
            />
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .settings-grid-integrasi {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .settings-grid-esurvey {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .settings-grid-pengaduan {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .settings-container {
            gap: 1.5rem !important;
          }
          .settings-grid-integrasi, .settings-grid-esurvey, .settings-grid-pengaduan {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .dashboard-page-header {
            margin-bottom: 2rem !important;
          }
          .dashboard-page-header h2 {
            font-size: 1.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
