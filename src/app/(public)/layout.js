import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getSettings } from '@/app/actions/settings';

export default async function PublicLayout({ children }) {
  const settingsRes = await getSettings();
  const logo = settingsRes.success ? settingsRes.settings.app_logo : null;

  return (
    <div className="layout-wrapper">
      <Header logo={logo} />

      <main style={{ minHeight: 'calc(100vh - 400px)', paddingTop: '80px' }}>
        {children}
      </main>

      <Footer logo={logo} />
    </div>
  )
}
