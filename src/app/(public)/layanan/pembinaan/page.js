import { getPembinaanItems, getPembinaanStats } from '@/app/actions/pembinaan';
import PembinaanCarousel from '@/app/components/PembinaanCarousel';
import LastUpdated from '@/app/components/LastUpdated';
import ActivityDate from '@/app/components/ActivityDate';

export default async function PembinaanPage() {
  const [itemsRes, statsRes] = await Promise.all([
    getPembinaanItems(),
    getPembinaanStats()
  ]);

  const items = itemsRes.success ? itemsRes.items : [];
  const stats = statsRes.success ? statsRes.stats : [];
  
  const kemandirianData = stats.find(s => s.program_name === 'Program Kemandirian');
  const kemandirianStat = kemandirianData?.count || 0;
  const lastUpdated = kemandirianData?.updated_at;

  return (
    <div className="container py-4">
      <div className="pembinaan-unified-container animate-up">
        {/* Statistics Section (Top) */}
        <section className="pembinaan-stats-section">
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📊</div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'Outfit', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Statistik Pembinaan</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Monitoring partisipasi Warga Binaan Pemasyarakatan dalam program peningkatan keahlian dan kemandirian.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem' }}>
            <div className="stat-glow-box">
              <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#3BACF7', fontFamily: 'Outfit', lineHeight: 1 }}>
                {kemandirianStat}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1rem', color: 'white', textTransform: 'uppercase', letterSpacing: '2px' }}>
                WBP Mengikuti Program Kemandirian
              </div>
            </div>
            {lastUpdated && <LastUpdated dateString={lastUpdated} />}
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Items Section (Bottom) */}
        <section className="pembinaan-items-section">
          <div className="section-header underline mb-5" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white' }}>Program & Kegiatan Pembinaan</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '750px', margin: '1.5rem auto 0' }}>
              Berbagai kegiatan pembinaan kepribadian dan kemandirian yang diselenggarakan di Lapas Perempuan Kelas III Ternate untuk meningkatkan kualitas hidup warga binaan.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center" style={{ padding: '4rem 0', color: 'rgba(255,255,255,0.4)' }}>
              Belum ada informasi pembinaan yang dibagikan saat ini.
            </div>
          ) : (
            <div className="pembinaan-list">
              {items.map((item) => (
                <div key={item.id} className="pembinaan-card-horizontal animate-up">
                  <div className="pembinaan-content-left">
                    <div className="pembinaan-meta-wrapper">
                      <ActivityDate dateString={item.created_at} />
                      <h3 className="pembinaan-title-light">{item.title}</h3>
                    </div>
                  </div>
                  <div className="pembinaan-content-middle">
                    <p className="pembinaan-desc-light">{item.description}</p>
                  </div>
                  <div className="pembinaan-content-right">
                    <div className="pembinaan-img-wrapper-small">
                      <PembinaanCarousel images={item.images} title={item.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pembinaan-unified-container {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          border-radius: 3rem;
          padding: 5rem 4rem;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }

        .stat-glow-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 5rem;
          border-radius: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 5rem 0;
        }

        .pembinaan-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          text-align: left;
        }
        
        .pembinaan-card-horizontal {
          background: white;
          border-radius: 2rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          align-items: stretch;
          width: 100%;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        
        @media (min-width: 1025px) {
          .pembinaan-card-horizontal:hover {
            transform: translateY(-5px) scale(1.01);
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
            border-color: #3BACF7;
          }
        }

        .pembinaan-content-left {
          flex: 0 0 20%;
          padding: 3rem 1.5rem;
          border-right: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background: #F8FAFC;
        }

        .pembinaan-content-middle {
          flex: 1;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          overflow: hidden;
          background: white;
        }

        .pembinaan-content-right {
          flex: 0 0 38%;
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          flex-shrink: 0;
          background: white;
        }
        
        .pembinaan-img-wrapper-small {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 1.5rem;
          overflow: hidden;
          background: #F8FAFC;
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .pembinaan-meta-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        
        .pembinaan-title-light {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0F172A;
          font-family: 'Outfit';
          margin: 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        
        .pembinaan-desc-light {
          font-size: 1rem;
          color: #475569;
          line-height: 1.8;
          white-space: pre-wrap;
          margin: 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        @media (max-width: 1024px) {
          .pembinaan-unified-container {
            padding: 4rem 2rem;
            border-radius: 2rem;
          }
          .pembinaan-card-horizontal {
            flex-direction: column;
            align-items: stretch;
          }
          .pembinaan-content-left, .pembinaan-content-middle, .pembinaan-content-right {
            flex: none;
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #F1F5F9;
            padding: 2.5rem 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .pembinaan-meta-wrapper {
            align-items: center;
            text-align: center;
          }
          .pembinaan-content-right {
            border-bottom: none;
          }
          .pembinaan-img-wrapper-small {
            height: auto;
            aspect-ratio: 16/9;
          }
          .stat-glow-box {
            padding: 2.5rem;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .pembinaan-unified-container {
            padding: 3rem 1.25rem;
            border-radius: 1.5rem;
          }
          .pembinaan-stats-section h2 {
            font-size: 1.75rem !important;
          }
          .stat-glow-box {
            padding: 2rem 1rem;
          }
          .stat-glow-box div:first-child {
            font-size: 3.5rem !important;
          }
          .stat-glow-box div:last-child {
            font-size: 0.9rem !important;
            letter-spacing: 1px !important;
          }
          .section-divider {
            margin: 3rem 0;
          }
          .pembinaan-list {
            gap: 1.5rem;
          }
          .pembinaan-card-horizontal {
            border-radius: 1.5rem;
          }
          .pembinaan-content-left {
            padding: 1.5rem;
          }
          .pembinaan-title-light {
            font-size: 1.2rem;
          }
          .pembinaan-content-middle {
            padding: 1.5rem;
          }
          .pembinaan-desc-light {
            font-size: 0.9rem;
            line-height: 1.6;
          }
          .pembinaan-content-right {
            padding: 1rem;
          }
        }
      ` }} />
    </div>
  );
}
