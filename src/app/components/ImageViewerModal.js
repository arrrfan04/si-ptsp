'use client';

import { useState } from 'react';

export default function ImageViewerModal({ imageUrl, title, triggerText, triggerIcon }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!imageUrl) return '-';

  return (
    <>
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        style={{ 
          background: 'none', border: 'none',
          color: '#3BACF7', textDecoration: 'none', 
          fontSize: '0.85rem', fontWeight: 600, 
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          cursor: 'pointer', padding: 0
        }}
      >
        <span>{triggerIcon}</span> {triggerText}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1rem',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0F172A' }}>{title}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748B'
                }}
              >✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: '#F1F5F9', borderRadius: '0.5rem' }}>
              <img 
                src={imageUrl} 
                alt={title}
                style={{ maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
