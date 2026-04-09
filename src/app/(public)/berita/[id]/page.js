import { getNewsById } from '@/app/actions/news';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseDate } from '@/lib/dateUtils';
import { getSettings } from '@/app/actions/settings';
import SocialLinks from '@/app/components/SocialLinks';

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }) {
  const { id } = await params;
  const res = await getNewsById(id);
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.settings : {};

  if (!res.success) {
    notFound();
  }

  const news = res.news;

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '900px' }}>
      <Link href="/#berita" style={{ color: 'var(--primary-blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '2.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
        <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>&larr;</span> Kembali ke Berita
      </Link>

      <article>
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ color: 'var(--primary-blue)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', letterSpacing: '1px' }}>
            {parseDate(news.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jayapura' })}
          </div>
          <h1 className="news-detail-title" style={{ fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.2, marginBottom: '2rem' }}>
            {news.title}
          </h1>
          
          {news.image_url && (
            <div style={{ 
              width: '100%', 
              borderRadius: 'var(--radius-xl)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '3rem'
            }}>
              <img 
                src={news.image_url} 
                alt={news.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
        </header>

        <div className="news-body" style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.8', 
          color: 'var(--text-main)', 
          textAlign: 'justify'
        }}>
          {news.content.split('\n').map((paragraph, index) => (
            paragraph.trim() !== '' ? (
              <p key={index} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ) : <br key={index} />
          ))}
        </div>
      </article>

      <div style={{ marginTop: '5rem', padding: '3rem', background: 'var(--gray-light)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem' }}>Sistem Informasi PTSP LPP Ternate</h3>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Terima kasih telah membaca informasi terbaru kami. Ikuti terus perkembangan kegiatan dan layanan kami melalui website resmi ini.
        </p>

        <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SocialLinks 
            socialLinks={settings} 
            title="Ikuti Media Sosial Kami:" 
            titleStyle={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1.2rem' }}
            iconColor="var(--primary-blue)"
          />
        </div>

        <Link href="/" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '50px' }}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
