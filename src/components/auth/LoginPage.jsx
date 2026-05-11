import React, { useState } from 'react';
import { authAPI, token } from '../../services/api.js';

export function LoginPage({ onLogin }) {
  const [step, setStep]       = useState('email'); // 'email' | 'codigo'
  const [email, setEmail]     = useState('');
  const [codigo, setCodigo]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const solicitarCodigo = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.solicitarCodigo(email);
      setStep('codigo');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validarCodigo = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.validarCodigo(email, codigo);
      token.set(res.token);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        padding: '40px 44px',
        width: '100%',
        maxWidth: 420,
        boxShadow: 'var(--shadow)',
      }}>
        {/* Brand */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
            Chackara <span style={{ color: 'var(--accent)' }}>3.0</span>
          </div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--fg-soft)' }}>
            Admin · Acesso restrito
          </div>
        </div>

        {step === 'email' ? (
          <form onSubmit={solicitarCodigo}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>
                Entrar
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-muted)' }}>
                Digite seu email de administrador para receber o código de acesso.
              </p>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoFocus
              />
            </div>

            {error && (
              <div style={{ fontSize: 13, color: 'var(--danger)', marginBottom: 14, padding: '8px 12px', background: 'var(--danger-soft)', borderRadius: 'var(--r)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px 14px' }}
              disabled={loading}
            >
              {loading ? 'Enviando…' : 'Enviar código'}
            </button>
          </form>
        ) : (
          <form onSubmit={validarCodigo}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>
                Código enviado
              </h2>
              <p style={{ margin: 0, fontSize: 13.5, color: 'var(--fg-muted)' }}>
                Verifique o email <strong>{email}</strong> e cole o código abaixo. Válido por 10 minutos.
              </p>
            </div>

            <div className="field" style={{ marginBottom: 16 }}>
              <label>Código OTP</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="000000"
                required
                autoFocus
                style={{ letterSpacing: '0.2em', fontSize: 18, textAlign: 'center' }}
              />
            </div>

            {error && (
              <div style={{ fontSize: 13, color: 'var(--danger)', marginBottom: 14, padding: '8px 12px', background: 'var(--danger-soft)', borderRadius: 'var(--r)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '11px 14px', marginBottom: 10 }}
              disabled={loading}
            >
              {loading ? 'Verificando…' : 'Entrar'}
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
              onClick={() => { setStep('email'); setError(''); setCodigo(''); }}
            >
              Usar outro email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
