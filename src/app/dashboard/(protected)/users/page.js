import { getUsers } from '@/app/actions/users';
import UserList from './UserList';
import UserForm from './UserForm';

export default async function UsersPage() {
  const res = await getUsers();
  const users = res.success ? res.users : [];

  return (
    <div className="animate-up">
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0F172A' }}>Management User</h2>
        <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.5rem' }}>Kelola hak akses dan peran personil untuk operasional sistem SI PTSP.</p>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start' }}>
        {/* Form Tambah User */}
        <UserForm />

        {/* Daftar User */}
        <div style={{ flex: '2 1 600px', minWidth: 0, paddingRight: '2.5rem' }}>
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
}
