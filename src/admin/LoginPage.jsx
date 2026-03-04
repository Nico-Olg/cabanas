import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Email o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <img src="/images/Cabañas-del-vieñdo-blanco2.png" alt="Cabañas del Viñedo" />
        </div>
        <h1 className="admin-login__title">Panel de Administración</h1>
        <p className="admin-login__subtitle">Cabañas del Viñedo</p>

        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-field">
            <label className="admin-label">Email</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cabanasdelvinedo.com.ar"
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Contraseña</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="admin-error">{error}</p>}

          <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
