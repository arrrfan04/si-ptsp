import { getNews } from '@/app/actions/news';
import NewsForm from './NewsForm';
import NewsList from './NewsList';

export default async function BeritaDashboard() {
  const res = await getNews();
  const newsList = res.success ? res.news : [];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Management Berita</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Publikasikan informasi terbaru mengenai kegiatan dan layanan LPP Ternate.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(450px, 2fr)', gap: '3rem', alignItems: 'start' }}>
        {/* Form Tambah Berita */}
        <NewsForm />

        {/* Daftar Berita */}
        <NewsList newsList={newsList} />
      </div>
    </div>
  );
}
