import { getSettings } from '@/app/actions/settings';

export default async function IntegrasiPage() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  const links = [
    { title: 'Blanko Pembebasan Bersyarat', url: settings.link_blanko_pembebasan },
    { title: 'Blanko Cuti Menjelang Bebas', url: settings.link_blanko_cuti_bebas },
    { title: 'Blanko Cuti Bersyarat', url: settings.link_blanko_cuti_bersyarat },
    { title: 'Blanko Cuti Mengunjungi Keluarga', url: settings.link_blanko_cuti_keluarga },
    { title: 'Form Permohonan Bantuan Hukum', url: settings.link_bantuan_hukum },
    { title: 'Layanan Izin Luar Biasa', url: settings.link_izin_luar_biasa },
  ];

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {links.map((link, i) => (
            <a key={i} href={link.url || '#'} target="_blank" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', fontSize: '1.05rem' }}>
              <span>📄 {link.title}</span>
              <span>Unduh &darr;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
