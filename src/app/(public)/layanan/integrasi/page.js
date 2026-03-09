import { getSettings } from '@/app/actions/settings';

export default async function IntegrasiPage() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  const links = [
    { title: 'Blanko Pembebasan', url: settings.link_blanko_pembebasan },
    { title: 'Blanko Cuti Bebas', url: settings.link_blanko_cuti_bebas },
    { title: 'Blanko Cuti Bersyarat', url: settings.link_blanko_cuti_bersyarat },
    { title: 'Blanko Cuti Keluarga', url: settings.link_blanko_cuti_keluarga },
    { title: 'Bantuan Hukum', url: settings.link_bantuan_hukum },
    { title: 'Izin Luar Biasa', url: settings.link_izin_luar_biasa },
  ];

  return (
    <div className="container py-4">
      <div className="card-premium animate-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {links.map((link, i) => (
            <a key={i} href={link.url || '#'} target="_blank" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', fontSize: '0.95rem', width: '100%', textAlign: 'left' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📄 {link.title}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7, flexShrink: 0 }}>Unduh &darr;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
