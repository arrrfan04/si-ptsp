'use server';

import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';

async function saveFile(file) {
  if (!file || file.size === 0) return null;
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress using sharp
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const base64 = compressedBuffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (err) {
    console.error('Error processing image:', err);
    return null;
  }
}

export async function submitVisitorForm(formData) {
  try {
    const db = getDb();
    
    // Convert to Base64
    const visitorKtpUrl = await saveFile(formData.get('visitor_ktp'));
    const followerKtpUrl = await saveFile(formData.get('follower_ktp'));

    const data = {
      wbp_name: formData.get('wbp_name') || '-',
      wbp_case: formData.get('wbp_case') || '-',
      visitor_name: formData.get('visitor_name') || '-',
      visitor_nik: formData.get('visitor_nik') || '-',
      visitor_purpose: formData.get('visitor_purpose') || '-',
      visitor_email: formData.get('visitor_email') || '-',
      visitor_address: formData.get('visitor_address') || '-',
      visitor_date: formData.get('visitor_date') || '-',
      visitor_wa: formData.get('visitor_wa') || '-',
      visitor_ktp_url: visitorKtpUrl || '',
      follower_name: formData.get('follower_name') || '-',
      follower_nik: formData.get('follower_nik') || '-',
      follower_purpose: formData.get('follower_purpose') || '-',
      follower_email: formData.get('follower_email') || '-',
      follower_address: formData.get('follower_address') || '-',
      follower_date: formData.get('follower_date') || '-',
      follower_wa: formData.get('follower_wa') || '-',
      follower_ktp_url: followerKtpUrl || ''
    };

    const args = [
      data.wbp_name, data.wbp_case, data.visitor_name, data.visitor_nik, 
      data.visitor_purpose, data.visitor_email, data.visitor_address, data.visitor_date, 
      data.visitor_wa, data.visitor_ktp_url, data.follower_name, data.follower_nik, 
      data.follower_purpose, data.follower_email, data.follower_address, data.follower_date, 
      data.follower_wa, data.follower_ktp_url
    ];

    await db.execute({
      sql: `INSERT INTO visitors (
        wbp_name, wbp_case, visitor_name, visitor_nik, visitor_purpose, 
        visitor_email, visitor_address, visitor_date, visitor_wa, visitor_ktp_url,
        follower_name, follower_nik, follower_purpose, follower_email, 
        follower_address, follower_date, follower_wa, follower_ktp_url, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      args
    });

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const drawText = (text, x, y, size = 12, font = timesRomanFont, color = rgb(0,0,0)) => {
      page.drawText(String(text), { x, y, size, font, color });
    };

    // Header
    drawText('BUKTI PENDAFTARAN KUNJUNGAN', width / 2 - 120, height - 50, 16, timesRomanBoldFont);
    drawText('LEMBAGA PEMASYARAKATAN PEREMPUAN KELAS III TERNATE', width / 2 - 180, height - 70, 12, timesRomanBoldFont);
    
    // Separator line
    page.drawLine({ start: { x: 50, y: height - 90 }, end: { x: width - 50, y: height - 90 }, thickness: 1, color: rgb(0,0,0) });

    let currentY = height - 130;
    
    // Draw Section
    const drawSection = (title, items) => {
      drawText(title, 50, currentY, 14, timesRomanBoldFont);
      currentY -= 20;
      items.forEach(item => {
        drawText(`${item.label}`, 50, currentY, 12, timesRomanBoldFont);
        drawText(':', 160, currentY, 12, timesRomanBoldFont);
        drawText(`${item.value}`, 175, currentY, 12, timesRomanFont);
        currentY -= 20;
      });
      currentY -= 10;
    };

    drawSection('Data Pengunjung Utama', [
      { label: 'Nama Lengkap', value: data.visitor_name },
      { label: 'NIK', value: data.visitor_nik },
      { label: 'Tujuan', value: data.visitor_purpose },
      { label: 'No. WA', value: data.visitor_wa },
      { label: 'Tanggal Kunjungan', value: data.visitor_date },
    ]);

    if (data.follower_name !== '-') {
      drawSection('Data Pengikut', [
        { label: 'Nama Pengikut', value: data.follower_name },
        { label: 'NIK Pengikut', value: data.follower_nik },
        { label: 'Email', value: data.follower_email },
        { label: 'No. WA', value: data.follower_wa },
        { label: 'Alamat Lengkap', value: data.follower_address }
      ]);
    }

    drawSection('Data WBP yang Dikunjungi', [
      { label: 'Nama WBP', value: data.wbp_name },
      { label: 'Kasus', value: data.wbp_case },
    ]);

    // Footer
    currentY -= 30;
    drawText('Catatan:', 50, currentY, 12, timesRomanBoldFont);
    currentY -= 15;
    drawText('1. Harap membawa dokumen asli (KTP) saat berkunjung.', 50, currentY, 10, timesRomanFont);
    currentY -= 15;
    drawText('2. Patuhi tata tertib berpakaian dan aturan kunjungan lapas.', 50, currentY, 10, timesRomanFont);
    currentY -= 15;
    drawText('3. Tunjukkan bukti pendaftaran ini kepada petugas.', 50, currentY, 10, timesRomanFont);
    currentY -= 30;
    drawText(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 50, currentY, 10, timesRomanFont);

    // Optional: Embed KTP if possible (similar to route.js)
    try {
      if (data.visitor_ktp_url && data.visitor_ktp_url.startsWith('data:image')) {
        const base64Data = data.visitor_ktp_url.split(',')[1];
        if (base64Data) {
          const ktpBytes = Buffer.from(base64Data, 'base64');
          const ktpImage = await pdfDoc.embedJpg(ktpBytes);
          if (ktpImage) {
            const page2 = pdfDoc.addPage([595.28, 841.89]);
            page2.drawText('Lampiran Foto KTP Utama', { x: 50, y: 800, size: 14, font: timesRomanBoldFont });
            const dims = ktpImage.scale(0.5);
            page2.drawImage(ktpImage, {
              x: 50,
              y: 780 - dims.height,
              width: dims.width,
              height: dims.height,
            });
          }
        }
      }
    } catch (e) {
      console.error('Embed KTP error in action:', e);
    }

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { 
      success: true, 
      pdfBase64: pdfBase64 
    };
  } catch (error) {
    console.error('Submit Visitor error:', error);
    return { success: false, message: 'Failed to submit form' };
  }
}
export async function getVisitors() {
  const session = await getSession();
  if (!session || !['ao', 'pelayanan'].includes(session.user.role)) return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    const result = await db.execute('SELECT * FROM visitors ORDER BY created_at DESC');
    const plainVisitors = JSON.parse(JSON.stringify(result.rows)).map(v => ({
      ...v,
      status: v.status || 'pending'
    }));
    return { success: true, visitors: plainVisitors };
  } catch (error) {
    return { success: false, message: 'Error fetching visitors' };
  }
}

export async function updateVisitorStatus(id, status) {
  const session = await getSession();
  if (!session || !['ao', 'pelayanan'].includes(session.user.role)) return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'UPDATE visitors SET status = ? WHERE id = ?',
      args: [status, id]
    });
    revalidatePath('/dashboard/kunjungan');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error updating status' };
  }
}

// Stub for generatePDF, to be expanded later or called directly in an API route since we need to return a file
export async function updateVisitorPdfUrl(id, pdfUrl) {
  const session = await getSession();
  if (!session || !['ao', 'pelayanan'].includes(session.user.role)) return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    await db.execute({
      sql: 'UPDATE visitors SET pdf_url = ? WHERE id = ?',
      args: [pdfUrl, id]
    });
    revalidatePath('/dashboard/kunjungan');
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Error updating status' };
  }
}

export async function deleteVisitor(id) {
  const session = await getSession();
  if (!session || !['ao', 'pelayanan'].includes(session.user.role)) return { success: false, message: 'Unauthorized' };

  try {
    const db = getDb();
    
    // Content is stored as Base64 in DB, no files to delete from disk
    const visitor = (await db.execute({
      sql: 'SELECT id FROM visitors WHERE id = ?',
      args: [id]
    })).rows[0];
    
    if (!visitor) return { success: false, message: 'Visitor not found' };

    // 3. Delete from database
    await db.execute({
      sql: 'DELETE FROM visitors WHERE id = ?',
      args: [id]
    });

    revalidatePath('/dashboard/kunjungan');
    return { success: true };
  } catch (error) {
    console.error('Delete visitor error:', error);
    return { success: false, message: 'Error deleting visitor' };
  }
}
