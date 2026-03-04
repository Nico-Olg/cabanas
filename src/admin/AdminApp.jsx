import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import TestimoniosAdmin from './sections/TestimoniosAdmin';
import FaqAdmin from './sections/FaqAdmin';
import StatsAdmin from './sections/StatsAdmin';
import ContactoAdmin from './sections/ContactoAdmin';
import ImagenesAdmin from './sections/ImagenesAdmin';
import './admin.css';

function ProtectedRoute({ user, children }) {
  if (user === null) return <Navigate to="/admin/login" replace />;
  if (user === undefined) return <div className="admin-loading">Cargando...</div>;
  return children;
}

export default function AdminApp() {
  const [user, setUser] = useState(undefined); // undefined = cargando, null = no autenticado

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return unsub;
  }, []);

  return (
    <div className="admin-root">
      <Routes>
        <Route path="login" element={user ? <Navigate to="/admin" replace /> : <LoginPage />} />
        <Route path="" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
        <Route path="testimonios" element={<ProtectedRoute user={user}><TestimoniosAdmin /></ProtectedRoute>} />
        <Route path="faq" element={<ProtectedRoute user={user}><FaqAdmin /></ProtectedRoute>} />
        <Route path="stats" element={<ProtectedRoute user={user}><StatsAdmin /></ProtectedRoute>} />
        <Route path="contacto" element={<ProtectedRoute user={user}><ContactoAdmin /></ProtectedRoute>} />
        <Route path="imagenes" element={<ProtectedRoute user={user}><ImagenesAdmin /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
