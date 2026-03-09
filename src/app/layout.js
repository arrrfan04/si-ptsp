import { Suspense } from 'react';
import './globals.css'
import Link from 'next/link';

import ScrollToTop from './components/ScrollToTop';
import { NotificationProvider } from './components/NotificationProvider';

export const metadata = {
  title: 'SI PTSP LPP TERNATE',
  description: 'Pelayanan Terpadu Satu Pintu LPP Ternate',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NotificationProvider>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          {children}
        </NotificationProvider>
      </body>
    </html>
  )
}
