'use client';

import React from 'react';

const SocialLinks = ({ socialLinks, title, titleStyle = {}, containerStyle = {}, iconSize = 24, iconColor = 'currentColor' }) => {
  const { social_instagram, social_facebook, social_x, social_tiktok } = socialLinks || {};


  const platforms = [
    {
      name: 'Instagram',
      url: social_instagram,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: social_facebook,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'X',
      url: social_x,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
      )
    },
    {
      name: 'Tiktok',
      url: social_tiktok,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    }
  ];

  const activePlatforms = platforms.filter(p => p.url && p.url.trim() !== '');

  if (activePlatforms.length === 0) return null;

  return (
    <div style={containerStyle}>
      {title && <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 700, ...titleStyle }}>{title}</h3>}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {activePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url.startsWith('http') ? platform.url : `https://${platform.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              color: iconColor,
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
