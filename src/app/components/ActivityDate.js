'use client';

import { useEffect, useState } from 'react';

export default function ActivityDate({ dateString }) {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (!dateString) return;
    
    try {
      // Handle SQLite format (YYYY-MM-DD HH:MM:SS) by appending UTC if it doesn't have an indicator
      const isoDate = dateString.includes('Z') || dateString.includes('+') 
        ? dateString 
        : dateString.replace(' ', 'T') + 'Z';
        
      const date = new Date(isoDate);
      const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        timeZone: 'Asia/Jayapura' // WIT
      };
      
      setFormattedDate(date.toLocaleDateString('id-ID', options));
    } catch (e) {
      console.error('Error formatting activity date:', e);
      setFormattedDate(dateString.split(' ')[0]);
    }
  }, [dateString]);

  if (!formattedDate) return null;

  return (
    <div style={{ 
      fontSize: '0.75rem', 
      fontWeight: 700, 
      color: '#3BACF7', 
      textTransform: 'uppercase', 
      letterSpacing: '1px',
      marginBottom: '0.75rem',
      fontFamily: 'Outfit, sans-serif'
    }}>
      🗓️ {formattedDate}
    </div>
  );
}
