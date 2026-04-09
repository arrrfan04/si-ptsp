import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getSettings } from '@/app/actions/settings';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }) {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.settings : {};
  const logo = settings.app_logo || null;
  
  // Extract social links
  const socialLinks = {
    social_instagram: settings.social_instagram,
    social_facebook: settings.social_facebook,
    social_x: settings.social_x,
    social_tiktok: settings.social_tiktok
  };

  return (
    <div className="layout-wrapper">
      <Header logo={logo} />

      <main style={{ minHeight: 'calc(100vh - 400px)', paddingTop: '80px' }}>
        {children}
      </main>

      <Footer logo={logo} socialLinks={socialLinks} />
    </div>
  )
}
