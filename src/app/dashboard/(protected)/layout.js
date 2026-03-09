import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from './DashboardLayoutClient';
import { getSettings } from '@/app/actions/settings';

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  
  if (!session) {
    redirect('/dashboard/login');
  }

  const settingsRes = await getSettings();
  const logo = settingsRes.success ? settingsRes.settings.app_logo : null;

  return (
    <DashboardLayoutClient session={session} logo={logo}>
      {children}
    </DashboardLayoutClient>
  );
}
