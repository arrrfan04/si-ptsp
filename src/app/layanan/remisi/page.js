import { getRemissions } from '@/app/actions/remissions';

export default async function RemisiPage() {
  const res = await getRemissions();
  const remissions = res.success ? res.remissions : [];

  return (
    <div className="container">
      <div className="card" style={{ padding: '2.5rem', margin: '0 auto', maxWidth: '1000px' }}>
        
        {remissions.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem', color: 'var(--text-muted)', background: 'var(--gray-light)', borderRadius: 'var(--radius-md)' }}>
            Belum ada data remisi yang dipublikasikan.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--primary-blue-light)', color: 'var(--primary-blue)' }}>
                  <th style={{ padding: '1rem', borderBottom: '2px solid var(--primary-blue)' }}>Nama WBP</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid var(--primary-blue)' }}>Jenis Kasus</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid var(--primary-blue)' }}>Detail Remisi</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid var(--primary-blue)' }}>Pengurangan</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid var(--primary-blue)' }}>Tanggal Update</th>
                </tr>
              </thead>
              <tbody>
                {remissions.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--gray-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{r.wbp_name}</td>
                    <td style={{ padding: '1rem' }}>{r.case_type}</td>
                    <td style={{ padding: '1rem' }}>{r.remission_details}</td>
                    <td style={{ padding: '1rem', color: '#10B981', fontWeight: 700 }}>{r.sentence_reduction || '-'}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {new Date(r.created_at).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
