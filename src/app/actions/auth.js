'use server';

import { getDb } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { login, logout } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function authenticate(username, password) {
  try {
    const db = getDb();
    const cleanUsername = username?.trim();
    const cleanPassword = password?.trim();

    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE username = ?',
      args: [cleanUsername]
    });
    
    const user = result.rows[0];
    
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    
    if (passwordsMatch) {
      await login({ id: user.id, username: user.username, role: user.role });
      return { success: true, role: user.role };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Internal server error' };
  }
}

export async function logOutAction() {
  await logout();
  revalidatePath('/');
}
