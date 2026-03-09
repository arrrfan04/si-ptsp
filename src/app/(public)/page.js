import { getSettings } from '../actions/settings';
import { getNews } from '../actions/news';
import Link from 'next/link';
import HeroCarousel from '../components/HeroCarousel';

export default async function Home() {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.settings : {};
  const marqueeText = settings.marquee_text || 'Selamat Datang di SI PTSP LPP TERNATE';

  const newsRes = await getNews();
  const newsList = newsRes.success ? newsRes.news : [];

  return (
    <>
      {/* Marquee Section */}
      <div style={{ backgroundColor: 'var(--accent-yellow)', color: 'var(--accent-yellow-text)', padding: '0.75rem 0', fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '0.9rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite', paddingLeft: '100%' }}>
          {marqueeText} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {marqueeText}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        .service-card {
          background: var(--surface-color);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: var(--shadow-premium);
          transition: var(--transition);
          border: 1px solid var(--gray-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--text-main);
          position: relative;
          overflow: hidden;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 40px -10px rgba(0, 0, 0, 0.1);
          border-color: var(--primary-blue-light);
        }

        .icon-box {
          width: 80px; height: 80px;
          background: var(--primary-blue-light);
          color: var(--primary-blue);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          transition: var(--transition);
        }
        
        .service-card:hover .icon-box {
          background: var(--primary-blue);
          color: white;
          transform: rotate(10deg);
        }

        .service-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .service-card p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
        
        .news-section { background-color: var(--surface-color); }
        
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }
        @media (max-width: 480px) {
          .news-grid { grid-template-columns: 1fr; }
        }
        
        .news-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid var(--gray-border);
          display: flex; flex-direction: column;
          height: 100%;
        }
        
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08);
          border-color: var(--primary-blue-light);
        }
        
        .news-img {
          height: 240px;
          background-color: var(--gray-light);
          position: relative;
          overflow: hidden;
        }
        .news-img div { transition: transform 0.6s ease; }
        .news-card:hover .news-img div { transform: scale(1.05); }
        
        .news-content {
          padding: 2rem;
          flex: 1;
          display: flex; flex-direction: column;
        }
        
        .news-tag {
          font-size: 0.75rem;
          color: var(--primary-blue);
          font-weight: 800;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .news-title {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
          color: var(--navy-deep);
          line-height: 1.4;
        }
      `}</style>

      <HeroCarousel settings={settings} />

      <section id="layanan" className="section-padding" style={{ paddingTop: '5rem' }}>
        <div className="container">
          <div className="section-header underline">
            <h2>Layanan Kami</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
              Akses berbagai layanan publik secara mandiri, transparan, dan terintegrasi dari Lembaga Pemasyarakatan Perempuan Kelas III Ternate.
            </p>
          </div>
          <div className="services-grid animate-up">
            <Link href="/layanan/kunjungan" className="service-card">
              <div className="icon-box">👥</div>
              <h3>Pendaftaran Kunjungan</h3>
              <p>Daftarkan kunjungan Anda secara online untuk proses yang lebih cepat dan teratur.</p>
            </Link>

            <Link href="/layanan/integrasi" className="service-card">
              <div className="icon-box">📄</div>
              <h3>Layanan Integrasi</h3>
              <p>Akses informasi dan pengajuan PB, CMB, CB, serta layanan bantuan hukum gratis.</p>
            </Link>

            <Link href="/layanan/pengaduan" className="service-card">
              <div className="icon-box">⚖️</div>
              <h3>Kanal Pengaduan</h3>
              <p>Laporkan segala bentuk penyimpangan melalui kanal resmi yang terintegrasi.</p>
            </Link>

            <Link href="/layanan/pemindahan" className="service-card">
              <div className="icon-box">🚌</div>
              <h3>Informasi Pemindahan</h3>
              <p>Cek status dan ajukan permohonan pemindahan WBP sesuai prosedur yang berlaku.</p>
            </Link>

            <Link href="/layanan/remisi" className="service-card">
              <div className="icon-box">🌟</div>
              <h3>Detail Remisi</h3>
              <p>Daftar lengkap Warga Binaan Pemasyarakatan yang mendapatkan remisi tahunan.</p>
            </Link>

            <Link href="/layanan/esurvey" className="service-card">
              <div className="icon-box">📊</div>
              <h3>E-Survey Kepuasan</h3>
              <p>Bantu kami meningkatkan kualitas pelayanan dengan mengisi survey kepuasan masyarakat.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="berita" className="news-section section-padding" style={{ borderTop: '1px solid var(--gray-border)' }}>
        <div className="container">
          <div className="section-header underline">
            <h2>Warta Terkini</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>Liputan kegiatan dan berita terbaru dari Lembaga Pemasyarakatan Perempuan Kelas III Ternate.</p>
          </div>
          
          {newsList.length === 0 ? (
            <div className="text-center" style={{ padding: '4rem 0', color: 'var(--text-muted)' }}>
              Belum ada berita yang dipublikasikan saat ini.
            </div>
          ) : (
            <div className="news-grid">
              {newsList.map(news => (
                <article key={news.id} className="news-card">
                  <Link href={`/berita/${news.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="news-img">
                      {news.image_url ? (
                        <div style={{ width: '100%', height: '100%', backgroundImage: 'url(' + news.image_url + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '2rem' }}>📰</div>
                      )}
                    </div>
                    <div className="news-content">
                      <div className="news-tag">Kegiatan Terbaru</div>
                      <h3 className="news-title">{news.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.content}</p>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.9rem' }}>Selengkapnya &rarr;</span>
                         <time style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{new Date((news.created_at || '').replace(' ', 'T') + 'Z').toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
