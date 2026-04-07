'use server';

import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getPembinaanItems() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM pembinaan_items ORDER BY created_at DESC');
    const items = result.rows.map(row => {
      const item = JSON.parse(JSON.stringify(row));
      try {
        item.images = item.images ? JSON.parse(item.images) : [];
      } catch (e) {
        item.images = item.image_url ? [item.image_url] : [];
      }
      return item;
    });
    return { success: true, items };
  } catch (error) {
    console.error('Error fetching pembinaan items:', error);
    return { success: false, items: [] };
  }
}

export async function createPembinaanItem(formData) {
  const session = await getSession();
  if (!session || session.user.role !== 'pembinaan') {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const imageFiles = formData.getAll('images');
    
    let imageUrls = [];
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const mimeType = file.type || 'image/jpeg';
        imageUrls.push(`data:${mimeType};base64,${base64}`);
      }
    }

    const firstImage = imageUrls.length > 0 ? imageUrls[0] : '';
    const imagesJson = JSON.stringify(imageUrls);

    const db = getDb();
    await db.execute({
      sql: 'INSERT INTO pembinaan_items (title, description, image_url, images) VALUES (?, ?, ?, ?)',
      args: [title, description, firstImage, imagesJson]
    });

    revalidatePath('/layanan/pembinaan');
    revalidatePath('/dashboard/pembinaan');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error creating pembinaan item:', error);
    return { success: false, message: 'Gagal menambahkan item pembinaan' };
  }
}

export async function updatePembinaanItem(id, formData) {
  const session = await getSession();
  if (!session || session.user.role !== 'pembinaan') {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const title = formData.get('title');
    const description = formData.get('description');
    const newImageFiles = formData.getAll('images');
    const existingImagesJson = formData.get('existing_images') || '[]';
    const removeAllImages = formData.get('remove_all_images') === 'true';
    
    let imageUrls = removeAllImages ? [] : JSON.parse(existingImagesJson);
    
    for (const file of newImageFiles) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const mimeType = file.type || 'image/jpeg';
        imageUrls.push(`data:${mimeType};base64,${base64}`);
      }
    }

    // Limit to 10 images
    imageUrls = imageUrls.slice(0, 10);

    const firstImage = imageUrls.length > 0 ? imageUrls[0] : null;
    const imagesJson = JSON.stringify(imageUrls);

    const db = getDb();
    await db.execute({
      sql: 'UPDATE pembinaan_items SET title = ?, description = ?, image_url = ?, images = ? WHERE id = ?',
      args: [title, description, firstImage, imagesJson, id]
    });

    revalidatePath('/layanan/pembinaan');
    revalidatePath('/dashboard/pembinaan');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating pembinaan item:', error);
    return { success: false, message: 'Gagal memperbarui item pembinaan' };
  }
}

export async function deletePembinaanItem(id) {
  const session = await getSession();
  if (!session || session.user.role !== 'pembinaan') {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const db = getDb();
    await db.execute({
      sql: 'DELETE FROM pembinaan_items WHERE id = ?',
      args: [id]
    });

    revalidatePath('/layanan/pembinaan');
    revalidatePath('/dashboard/pembinaan');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting pembinaan item:', error);
    return { success: false, message: 'Gagal menghapus item pembinaan' };
  }
}

export async function getPembinaanStats() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM pembinaan_stats');
    const stats = JSON.parse(JSON.stringify(result.rows));
    return { success: true, stats };
  } catch (error) {
    console.error('Error fetching pembinaan stats:', error);
    return { success: false, stats: [] };
  }
}

export async function updatePembinaanStat(id, count) {
  const session = await getSession();
  if (!session || session.user.role !== 'pembinaan') {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const db = getDb();
    await db.execute({
      sql: 'UPDATE pembinaan_stats SET count = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      args: [Number(count), id]
    });

    revalidatePath('/layanan/pembinaan');
    revalidatePath('/dashboard/pembinaan');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating pembinaan stat:', error);
    return { success: false, message: 'Gagal memperbarui statistik' };
  }
}
