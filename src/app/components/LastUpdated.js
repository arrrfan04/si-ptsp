'use client';

import { useEffect, useState } from 'react';

export default function LastUpdated({ dateString }) {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (!dateString) return;
    
    try {
      const date = new Date(dateString + ' UTC'); 
      const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Asia/Jayapura' // Eastern Indonesia Time (WIT)
      };
      
      setFormattedDate(date.toLocaleString('id-ID', options));
    } catch (e) {
      console.error('Error formatting date:', e);
      setFormattedDate(dateString);
    }
  }, [dateString]);

  if (!formattedDate) return <span style={{ opacity: 0.5 }}>-</span>;

  return (
    <div style={{ 
      fontSize: '0.85rem', 
      color: 'rgba(255,255,255,0.5)', 
      marginTop: '1rem',
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif'
    }}>
      Terakhir Diperbarui: {formattedDate}
    </div>
  );
}
