import { getSettings } from '@/app/actions/settings';

export default async function ESurveyPage() {
  const res = await getSettings();
  const settings = res.success ? res.settings : {};

  return (
    <div className="container py-4">
      <div className="card-premium animate-up" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          <a href={settings.link_esurvey_1 || '#'} target="_blank" className="btn btn-primary" style={{ padding: '1rem' }}>Isi E-Survey 1</a>
          <a href={settings.link_esurvey_2 || '#'} target="_blank" className="btn btn-outline" style={{ padding: '1rem' }}>Isi E-Survey 2</a>
          <a href={settings.link_esurvey_3 || '#'} target="_blank" className="btn btn-outline" style={{ padding: '1rem' }}>Isi E-Survey 3</a>
        </div>
      </div>
    </div>
  );
}
