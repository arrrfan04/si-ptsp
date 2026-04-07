'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseDate } from '@/lib/dateUtils';

export default function NewsPagination({ newsList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  if (!newsList || newsList.length === 0) {
    return (
      <div className="text-center" style={{ padding: '4rem 0', color: 'var(--text-muted)' }}>
        Belum ada berita yang dipublikasikan saat ini.
      </div>
    );
  }

  const totalPages = Math.ceil(newsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    // Slight delay to ensure content has rendered
    setTimeout(() => {
      const element = document.getElementById('warta-terkini');
      if (element) {
        const offset = 80; // Adjusted for a tighter fit with the header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div>
      <div className="news-grid">
        {currentItems.map(news => (
          <article key={news.id} className="news-card">
            <Link href={`/berita/${news.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="news-img">
                {news.image_url ? (
                  <div style={{ width: '100%', height: '100%', backgroundImage: 'url(' + news.image_url + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '2rem' }}>📰</div>
                )}
              </div>
              <div className="news-content">
                <div className="news-tag">Kegiatan Terbaru</div>
                <h3 className="news-title">{news.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{news.content}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <span style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.9rem' }}>Selengkapnya &rarr;</span>
                   <time style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{parseDate(news.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Jayapura' })}</time>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          {/* Previous Button */}
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid var(--gray-border)',
              backgroundColor: 'white',
              color: currentPage === 1 ? '#CBD5E1' : 'var(--navy-deep)',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            &larr; Prev
          </button>

          {/* Page Numbers */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: currentPage === number ? 'var(--primary-blue)' : 'var(--gray-border)',
                  backgroundColor: currentPage === number ? 'var(--primary-blue)' : 'white',
                  color: currentPage === number ? 'white' : 'var(--navy-deep)',
                  cursor: 'pointer',
                  fontWeight: 800,
                  transition: 'all 0.3s ease'
                }}
              >
                {number}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: '1px solid var(--gray-border)',
              backgroundColor: 'white',
              color: currentPage === totalPages ? '#CBD5E1' : 'var(--navy-deep)',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Next &rarr;
          </button>
        </div>
      )}
      <style jsx>{`
        button:hover:not(:disabled) {
          border-color: var(--primary-blue) !important;
          background-color: var(--primary-blue-light) !important;
          color: var(--primary-blue) !important;
          transform: translateY(-2px);
        }
        button:disabled {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
