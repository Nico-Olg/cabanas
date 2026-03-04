import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function AdminLayout({ title, backPath, children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header__brand">
          <button className="admin-btn admin-btn--ghost admin-back-btn" onClick={() => navigate(backPath)}>
            ← Volver
          </button>
          <span className="admin-header__title">{title}</span>
        </div>
        <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
