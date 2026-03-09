import { getSettings } from '@/app/actions/settings';

export default async function PemindahanPage() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  return (
    <div className="container py-4">
      <div className="card-premium animate-up" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <a href={settings.link_pemindahan || '#'} target="_blank" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          📄 Unduh Form Permohonan Pemindahan
        </a>
      </div>
    </div>
  );
}
