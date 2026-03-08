'use server';

import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getRemissions() {
  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM remissions ORDER BY created_at DESC');
    const plainRemissions = JSON.parse(JSON.stringify(result.rows));
    return { success: true, remissions: plainRemissions };
  } catch (error) {
    return { success: false, message: 'Error fetching remissions' };
  }
}

export async function createRemission(data) {
  const session = await getSession();
  if (!session || session.user.role !== 'ao') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'INSERT INTO remissions (wbp_name, case_type, remission_details, sentence_reduction) VALUES (?, ?, ?, ?)',
      args: [
        data.get('wbp_name'), 
        data.get('case_type'), 
        data.get('remission_details'),
        data.get('sentence_reduction') || '-'
      ]
    });
    
    revalidatePath('/dashboard/remisi');
    revalidatePath('/layanan/remisi'); 
    return { success: true };
  } catch (error) {
    console.error('Create remission error:', error);
    return { success: false, message: 'Error creating remission' };
  }
}

export async function updateRemission(id, data) {
  const session = await getSession();
  if (!session || session.user.role !== 'ao') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'UPDATE remissions SET wbp_name = ?, case_type = ?, remission_details = ?, sentence_reduction = ? WHERE id = ?',
      args: [
        data.get('wbp_name'), 
        data.get('case_type'), 
        data.get('remission_details'),
        data.get('sentence_reduction') || '-',
        id
      ]
    });
    
    revalidatePath('/dashboard/remisi');
    revalidatePath('/layanan/remisi');
    return { success: true };
  } catch (error) {
    console.error('Update remission error:', error);
    return { success: false, message: 'Error updating remission' };
  }
}

export async function deleteRemission(id) {
  const session = await getSession();
  if (!session || session.user.role !== 'ao') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'DELETE FROM remissions WHERE id = ?',
      args: [id]
    });
    
    revalidatePath('/dashboard/remisi');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error deleting remission' };
  }
}
