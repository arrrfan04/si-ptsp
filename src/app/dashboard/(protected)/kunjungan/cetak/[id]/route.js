import { getDb } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { NextResponse } from 'next/server';
import { parseDate, formatToWIT } from '@/lib/dateUtils';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session || !['admin', 'ao', 'pelayanan'].includes(session.user.role)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM visitors WHERE id = ?',
      args: [Number(id)]
    });
    
    const v = result.rows[0];
    if (!v) {
      return new NextResponse('Not Found', { status: 404 });
    }
    v.status = v.status || 'pending';

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Draw Header
    page.drawText('FORM PERMOHONAN KUNJUNGAN WBP', {
      x: 130, y: 780, size: 16, font: fontBold, color: rgb(0, 0, 0)
    });
    page.drawText('SI PTSP LPP TERNATE', {
      x: 215, y: 760, size: 14, font: fontBold, color: rgb(0, 0, 0)
    });
    
    page.drawLine({
      start: { x: 50, y: 745 },
      end: { x: 545, y: 745 },
      thickness: 1,
      color: rgb(0, 0, 0)
    });

    let y = 700;
    const lineHeight = 20;

    const printLine = (label, value) => {
      page.drawText(label, { x: 50, y, size: 11, font: fontBold });
      page.drawText(':', { x: 170, y, size: 11, font: fontBold });
      page.drawText(String(value || '-'), { x: 185, y, size: 11, font });
      y -= lineHeight;
    };

    page.drawText('A. DATA PENGUNJUNG UTAMA', { x: 50, y, size: 12, font: fontBold });
    y -= 25;
    printLine('Nama Lengkap', v.visitor_name);
    printLine('NIK KTP', v.visitor_nik);
    printLine('Tujuan', v.visitor_purpose);
    printLine('Email', v.visitor_email);
    printLine('No. Telepon / WA', v.visitor_wa);
    printLine('Alamat Lengkap', v.visitor_address);
    printLine('Tanggal Kunjungan', v.visitor_date);

    if (v.follower_name && v.follower_name !== '-') {
      y -= 15;
      page.drawText('B. DATA PENGIKUT', { x: 50, y, size: 12, font: fontBold });
      y -= 25;
      printLine('Nama Lengkap', v.follower_name);
      printLine('NIK Pengikut', v.follower_nik);
      printLine('Email', v.follower_email);
      printLine('No. Telepon / WA', v.follower_wa);
      printLine('Alamat Lengkap', v.follower_address);
    }

    y -= 15;
    page.drawText('C. DATA WBP (WARGA BINAAN)', { x: 50, y, size: 12, font: fontBold });
    y -= 25;
    printLine('Nama WBP', v.wbp_name);
    printLine('Jenis Kasus', v.wbp_case);

    y -= 40;
    page.drawText('Dokumen ini digenerate secara otomatis oleh Sistem Informasi PTSP LPP Ternate', { x: 50, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });
    y -= 15;
    page.drawText('Status: ' + v.status.toUpperCase(), { x: 50, y, size: 9, font: fontBold, color: v.status === 'approved' ? rgb(0, 0.6, 0) : rgb(0.8, 0, 0) });
    y -= 15;
    y -= 15;
    page.drawText('Dicetak pada: ' + formatToWIT(new Date()), { x: 50, y, size: 9, font, color: rgb(0.3, 0.3, 0.3) });



    const pdfBytes = await pdfDoc.save();

    const safeFilename = (v.visitor_name || 'pengunjung').replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="Kunjungan-${safeFilename}.pdf"`
      }
    });

  } catch (err) {
    console.error(err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
