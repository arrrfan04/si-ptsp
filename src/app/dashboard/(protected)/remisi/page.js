import { getRemissions } from '@/app/actions/remissions';
import RemissionList from './RemissionList';
import RemissionForm from './RemissionForm';

export default async function RemisiDashboard() {
  const res = await getRemissions();
  const remissions = res.success ? res.remissions : [];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Data Remisi WBP</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Informasi pemberian remisi bagi Warga Binaan Pemasyarakatan LPP Ternate.</p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
        {/* Form Tambah Remisi */}
        <RemissionForm />

        {/* Daftar Remisi */}
        <div style={{ flex: '2 1 600px', minWidth: 0 }}>
          <RemissionList remissions={remissions} />
        </div>
      </div>
    </div>
  );
}
