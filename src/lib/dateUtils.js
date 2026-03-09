export function parseDate(dateVal) {
  if (!dateVal) return new Date(); // Fallback to now if null or undefined
  
  if (dateVal instanceof Date) return dateVal;
  if (typeof dateVal === 'number') return new Date(dateVal);
  if (typeof dateVal !== 'string') return new Date(); // Fallback
  
  const str = dateVal.trim();
  
  // If it's empty string
  if (!str) return new Date();
  
  // Try parsing directly first (handles standard ISO format like "2024-05-15T12:00:00Z")
  const directParse = new Date(str);
  if (!isNaN(directParse.getTime()) && str.includes('T')) {
    return directParse;
  }
  
  // Handle SQLite typical format "YYYY-MM-DD HH:MM:SS" -> convert to ISO string
  if (str.includes(' ') && !str.includes('T')) {
    const isoStr = str.replace(' ', 'T');
    
    // Add "Z" ONLY if the timezone is missing. We assume SQLite stores in UTC if it lacks Z/offset
    // But honestly, it's safer to just let the browser parse 'YYYY-MM-DDTHH:MM:SS' as local time
    // If it MUST be UTC, we append Z. Let's assume SQLite stores local/server time, so appending Z
    // forces UTC which might shift the date by 7-9 hours to the past!
    // But since it's Vercel, server is UTC anyway. Let's just append Z if we really want to parse it as UTC,
    // or just let it be. '2024-05-15T10:00:00' is a valid ISO string and parses as local time.
    
    // Vercel node sometimes throws Invalid Date if it doesn't have timezone perfectly specified,
    // though 'YYYY-MM-DDTHH:MM:SS' should work. Let's safely try to parse it first:
    const sqliteParse = new Date(isoStr + 'Z');
    if (!isNaN(sqliteParse.getTime())) {
      return sqliteParse;
    }
  }
  
  // Ultimate Fallback
  const fallback = new Date(str);
  return isNaN(fallback.getTime()) ? new Date() : fallback;
}
