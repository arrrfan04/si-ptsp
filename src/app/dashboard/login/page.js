import { getSettings } from '@/app/actions/settings';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const res = await getSettings();
  const logo = res.success ? res.settings.app_logo : null;

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0F172A', 
      padding: '1.5rem',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 172, 247, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 172, 247, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>

      <LoginForm logo={logo} />
    </div>
  );
}
