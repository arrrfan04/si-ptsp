'use client';

import { useState } from 'react';
import { authenticate } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.target);
    const result = await authenticate(formData.get('username'), formData.get('password'));
    
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
      router.refresh();
    } else {
      setError(result.message || 'Login gagal.');
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0F172A', 
      padding: '1.5rem',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 172, 247, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 172, 247, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div className="card animate-up" style={{ 
        width: '100%', 
        maxWidth: '460px', 
        padding: '3.5rem 3rem', 
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 1.5rem auto', display: 'flex', justifyContent: 'center' }}>
            <Image 
              src="/logo-kemen.png" 
              alt="Logo Kementerian" 
              width={110}
              height={110}
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <h1 style={{ color: '#0F172A', fontSize: '1.85rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
            Portal Admin SI PTSP
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Silakan masuk untuk mengelola sistem</p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#FEF2F2', 
            color: '#BD1C1C', 
            borderRadius: '1rem', 
            marginBottom: '2rem', 
            fontSize: '0.9rem', 
            textAlign: 'center',
            border: '1px solid #FEE2E2',
            fontWeight: 600,
            animation: 'shake 0.5s ease-in-out'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem', color: '#334155' }}>Username</label>
            <input 
              type="text" 
              name="username" 
              required 
              placeholder="Username anda" 
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: '1.5px solid #E2E8F0',
                fontSize: '1rem',
                transition: 'all 0.3s',
                outline: 'none',
                backgroundColor: '#F8FAFC'
              }}
              className="login-input"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem', color: '#334155' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••" 
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: '1.5px solid #E2E8F0',
                fontSize: '1rem',
                transition: 'all 0.3s',
                outline: 'none',
                backgroundColor: '#F8FAFC'
              }}
              className="login-input"
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '1.1rem', 
              fontSize: '1.1rem', 
              fontWeight: 700,
              borderRadius: '0.75rem',
              backgroundColor: '#3BACF7',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              marginTop: '1rem',
              boxShadow: '0 10px 20px -5px rgba(59, 172, 247, 0.4)'
            }} 
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Dashboard'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <Link href="/" style={{ 
             color: '#64748B', 
             fontSize: '0.95rem', 
             fontWeight: 600, 
             textDecoration: 'none',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             gap: '0.5rem',
             transition: 'color 0.3s'
           }} className="back-link">
            <span>&larr;</span> Kembali ke Website Publik
           </Link>
        </div>
      </div>

      <style jsx>{`
        .login-input:focus {
          border-color: #3BACF7 !important;
          background-color: white !important;
          box-shadow: 0 0 0 4px rgba(59, 172, 247, 0.1) !important;
        }
        .login-btn:hover {
          background-color: #2691D9 !important;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(59, 172, 247, 0.5) !important;
        }
        .login-btn:active {
          transform: translateY(0);
        }
        .back-link:hover {
          color: #3BACF7 !important;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
