import { getSettings } from '@/app/actions/settings';

export default async function PengaduanPage() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem', textAlign: 'center' }}>
        
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <a href={settings.link_pengaduan_gratifikasi || '#'} target="_blank" className="card" style={{ padding: '2rem 1rem', display: 'block' }}>
             <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛑</div>
             <h3 style={{ marginBottom: '0.5rem' }}>Gratifikasi</h3>
             <span className="btn btn-primary" style={{ width: '100%' }}>Lapor E-Lapor</span>
          </a>
          
          <a href={settings.link_pengaduan_calo || '#'} target="_blank" className="card" style={{ padding: '2rem 1rem', display: 'block' }}>
             <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🕵️</div>
             <h3 style={{ marginBottom: '0.5rem' }}>Calo</h3>
             <span className="btn btn-primary" style={{ width: '100%', backgroundColor: '#E11D48' }}>Lapor KPK</span>
          </a>

          <a href={settings.link_pengaduan_pungli || '#'} target="_blank" className="card" style={{ padding: '2rem 1rem', display: 'block' }}>
             <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💸</div>
             <h3 style={{ marginBottom: '0.5rem' }}>Pungli</h3>
             <span className="btn btn-primary" style={{ width: '100%', backgroundColor: '#059669' }}>Lapor Ombudsman</span>
          </a>
        </div>
      </div>
    </div>
  );
}
