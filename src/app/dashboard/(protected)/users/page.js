import { getUsers } from '@/app/actions/users';
import UserList from './UserList';
import UserForm from './UserForm';

export default async function UsersPage() {
  const res = await getUsers();
  const users = res.success ? res.users : [];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }} className="dashboard-page-header">
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Management User</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Kelola hak akses dan peran personil untuk operasional sistem SI PTSP.</p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }} className="user-management-grid">
        {/* Form Tambah User */}
        <UserForm />

        {/* Daftar User */}
        <div style={{ flex: '2 1 600px', minWidth: 0 }} className="user-list-container">
          <UserList users={users} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .user-management-grid {
            gap: 1.5rem !important;
          }
          .user-list-container {
            flex: 1 1 100% !important;
          }
          .dashboard-page-header {
            margin-bottom: 2rem !important;
          }
          .dashboard-page-header h2 {
            font-size: 1.5rem !important;
          }
        }
      `}} />
    </div>
  );
}
