'use server';

import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

export async function getDashboardStats() {
  const session = await getSession();
  
  if (!session) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const db = getDb();
    
    // Total Pengunjung
    const visitorsResult = await db.execute(`SELECT COUNT(*) as count FROM visitors`);
    const totalVisitors = Number(visitorsResult.rows[0].count);
    
    // Berita Aktif
    const newsResult = await db.execute(`SELECT COUNT(*) as count FROM news`);
    const totalNews = Number(newsResult.rows[0].count);
    
    // Data Remisi
    const remissionsResult = await db.execute(`SELECT COUNT(*) as count FROM remissions`);
    const totalRemissions = Number(remissionsResult.rows[0].count);

    return {
      success: true,
      stats: {
        totalVisitors,
        totalNews,
        totalRemissions
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { success: false, message: 'Gagal mengambil statistik dashboard' };
  }
}
