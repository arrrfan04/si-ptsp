import { getVisitors } from '@/app/actions/visitors';
import VisitorList from './VisitorList';

export default async function KunjunganDashboard() {
  const res = await getVisitors();
  const visitors = res.success ? res.visitors : [];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Data Pengunjung</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Pantau dan kelola seluruh antrian kunjungan yang masuk melalui sistem publik.</p>
      </div>
      
      {visitors.length === 0 ? (
        <div className="card text-center" style={{ 
          padding: '5rem 2rem', 
          backgroundColor: 'white', 
          borderRadius: '2rem',
          border: '1px solid #E2E8F0',
          color: '#94A3B8' 
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📭</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Belum ada data kunjungan yang masuk saat ini.</p>
        </div>
      ) : (
        <VisitorList visitors={visitors} />
      )}
    </div>
  );
}
