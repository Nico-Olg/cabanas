import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { seedFirebase } from './SeedData';

const sections = [
  {
    path: 'testimonios',
    icon: '💬',
    title: 'Testimonios',
    desc: 'Agregar, editar o eliminar opiniones de huéspedes',
  },
  {
    path: 'faq',
    icon: '❓',
    title: 'Preguntas Frecuentes',
    desc: 'Gestionar las preguntas y respuestas del FAQ',
  },
  {
    path: 'stats',
    icon: '📊',
    title: 'Estadísticas',
    desc: 'Actualizar los números destacados (cabañas, hectáreas, etc.)',
  },
  {
    path: 'contacto',
    icon: '📞',
    title: 'Datos de Contacto',
    desc: 'Editar teléfono, dirección y redes sociales',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSeed = async () => {
    if (!confirm('¿Inicializar Firebase con los datos actuales de la página? Esto solo agrega datos donde no hay nada cargado aún.')) return;
    setSeeding(true);
    try {
      const res = await seedFirebase();
      setSeedDone(true);
      alert(`✅ Datos inicializados:\n- Testimonios: ${res.testimonios} (solo si estaba vacío)\n- FAQ: ${res.faq} (solo si estaba vacío)\n- Stats: actualizado\n- Contacto: actualizado`);
    } catch (err) {
      alert('Error al inicializar: ' + err.message);
    }
    setSeeding(false);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header__brand">
          <img src="/images/Cabañas-del-vieñdo-blanco2.png" alt="Cabañas del Viñedo" className="admin-header__logo" />
          <span className="admin-header__title">Panel de Administración</span>
        </div>
        <button className="admin-btn admin-btn--ghost" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main className="admin-main">
        <h2 className="admin-section-title">¿Qué querés editar?</h2>

        <div className="admin-seed-bar">
          <button className="admin-btn admin-btn--seed" onClick={handleSeed} disabled={seeding}>
            {seeding ? '⏳ Inicializando...' : '🚀 Inicializar datos en Firebase'}
          </button>
          <p className="admin-seed-hint">Solo la primera vez. Carga los datos actuales de la página en Firebase.</p>
        </div>

        <div className="admin-grid">
          {sections.map((s) => (
            <button
              key={s.path}
              className="admin-card"
              onClick={() => navigate(`/admin/${s.path}`)}
            >
              <span className="admin-card__icon">{s.icon}</span>
              <h3 className="admin-card__title">{s.title}</h3>
              <p className="admin-card__desc">{s.desc}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
