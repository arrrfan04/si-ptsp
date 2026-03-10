'use server';

import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    const result = await db.execute('SELECT id, username, role FROM users');
    const plainUsers = JSON.parse(JSON.stringify(result.rows));
    return { success: true, users: plainUsers };
  } catch (error) {
    return { success: false, message: 'Error fetching users' };
  }
}

export async function createUser(data) {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.get('password'), salt);
    
    await db.execute({
      sql: 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      args: [data.get('username'), hash, data.get('role')]
    });
    
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Username may already exist' };
  }
}

export async function deleteUser(id) {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    const numericId = Number(id);

    // Safety 1: Don't delete self
    if (numericId === Number(session.user.id)) {
      return { success: false, message: 'Anda tidak dapat menghapus akun sendiri yang sedang aktif' };
    }

    // Safety 2: Check if target is 'admin' username
    const checkRes = await db.execute({
      sql: 'SELECT username FROM users WHERE id = ?',
      args: [numericId]
    });
    const target = checkRes.rows[0];
    if (target?.username === 'admin') {
      return { success: false, message: 'Akun administrator utama tidak dapat dihapus' };
    }

    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [numericId]
    });
    
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error deleting user' };
  }
}

export async function updateUserPassword(id, newPassword) {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') return { success: false, message: 'Unauthorized' };

  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'Password harus minimal 6 karakter' };
  }

  try {
    const db = getDb();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    
    await db.execute({
      sql: 'UPDATE users SET password = ? WHERE id = ?',
      args: [hash, Number(id)]
    });
    
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error updating password' };
  }
}
