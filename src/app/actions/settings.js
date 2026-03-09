'use server';

import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT key, value FROM settings');
    // Convert to object
    const settingsObj = {};
    result.rows.forEach(row => {
      settingsObj[row.key] = row.value;
    });
    return { success: true, settings: settingsObj };
  } catch (error) {
    return { success: false, settings: {} };
  }
}

export async function updateSetting(key, value) {
  const session = await getSession();
  // Admin, AO, and Humas can update settings (depending on the setting)
  if (!session || !['admin', 'ao', 'humas'].includes(session.user.role)) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const db = getDb();
    await db.execute({
      sql: 'UPDATE settings SET value = ? WHERE key = ?',
      args: [value, key]
    });
    
    revalidatePath('/', 'layout'); // revalidate all routes to reflect new links
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error updating setting' };
  }
}

export async function uploadHeroImage(formData, slotIndex) {
  const session = await getSession();
  if (!session || session.user.role !== 'humas') {
    return { success: false, message: 'Unauthorized. Only Humas can upload slide images.' };
  }

  try {
    const file = formData.get('image');
    if (!file || file.size === 0) return { success: false, message: 'No file provided' };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const imageUrl = `data:${mimeType};base64,${base64}`;

    // Update settings table
    const db = getDb();
    const key = `hero_image_${slotIndex}`;
    
    // Try update first, if 0 rows changed, then insert
    const result = await db.execute({
      sql: 'UPDATE settings SET value = ? WHERE key = ?',
      args: [imageUrl, key]
    });

    if (result.rowsAffected === 0) {
      await db.execute({
        sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
        args: [key, imageUrl]
      });
    }

    revalidatePath('/', 'layout');
    return { success: true, url: imageUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, message: 'Failed to upload image' };
  }
}

export async function uploadLogo(formData) {
  const session = await getSession();
  if (!session || session.user.role !== 'humas') {
    return { success: false, message: 'Unauthorized. Only Humas can update the logo.' };
  }

  try {
    const file = formData.get('logo');
    if (!file || file.size === 0) return { success: false, message: 'No file provided' };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const imageUrl = `data:${mimeType};base64,${base64}`;

    const db = getDb();
    const key = 'app_logo';
    
    const result = await db.execute({
      sql: 'UPDATE settings SET value = ? WHERE key = ?',
      args: [imageUrl, key]
    });

    if (result.rowsAffected === 0) {
      await db.execute({
        sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
        args: [key, imageUrl]
      });
    }

    revalidatePath('/', 'layout');
    return { success: true, url: imageUrl };
  } catch (error) {
    console.error('Upload logo error:', error);
    return { success: false, message: 'Failed to upload logo' };
  }
}
