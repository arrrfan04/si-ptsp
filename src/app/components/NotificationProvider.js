'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      
      {/* Notification Portal */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        pointerEvents: 'none'
      }}>
        {notifications.map((n) => (
          <div 
            key={n.id}
            style={{
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              backgroundColor: n.type === 'success' ? '#10B981' : '#EF4444',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              minWidth: '280px',
              maxWidth: '400px',
              pointerEvents: 'auto',
              animation: 'slideIn 0.3s ease-out forwards',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <span>{n.type === 'success' ? '✅' : '⚠️'}</span>
            <span style={{ flex: 1 }}>{n.message}</span>
            <button 
              onClick={() => removeNotification(n.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem',
                opacity: 0.7,
                padding: '0 0.25rem'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      ` }} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
