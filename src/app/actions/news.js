'use server';

import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function saveFile(file) {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const mimeType = file.type || 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

export async function getNews() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM news ORDER BY created_at DESC');
    const plainNews = JSON.parse(JSON.stringify(result.rows));
    return { success: true, news: plainNews };
  } catch (error) {
    return { success: false, message: 'Error fetching news' };
  }
}

export async function createNews(formData) {
  const session = await getSession();
  if (!session || session.user.role !== 'humas') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    const title = formData.get('title');
    const content = formData.get('content');
    const imageFile = formData.get('image');
    
    let imageUrl = '';
    if (imageFile) {
      imageUrl = await saveFile(imageFile);
    }

    await db.execute({
      sql: 'INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)',
      args: [title, content, imageUrl]
    });
    
    revalidatePath('/dashboard/berita');
    revalidatePath('/'); // update home page news section
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error creating news' };
  }
}

export async function deleteNews(id) {
  const session = await getSession();
  if (!session || session.user.role !== 'humas') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'DELETE FROM news WHERE id = ?',
      args: [id]
    });
    
    revalidatePath('/dashboard/berita');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error deleting news' };
  }
}

export async function getNewsById(id) {
  try {
    const db = getDb();
    const resId = Number(id);
    if (isNaN(resId)) return { success: false, message: 'Invalid ID' };

    const result = await db.execute({
      sql: 'SELECT * FROM news WHERE id = ?',
      args: [resId]
    });
    
    if (result.rows.length === 0) {
      return { success: false, message: 'News not found' };
    }
    
    const plainNewsItem = JSON.parse(JSON.stringify(result.rows[0]));
    return { success: true, news: plainNewsItem };
  } catch (error) {
    return { success: false, message: 'Error fetching news item' };
  }
}
