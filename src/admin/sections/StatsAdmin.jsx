import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../AdminLayout';

const DEFAULT_STATS = [
  { key: 'cabanas', label: 'Cabañas', value: '7', suffix: '' },
  { key: 'hectareas', label: 'Hectáreas de viñedo', value: '11', suffix: 'ha' },
  { key: 'variedades', label: 'Variedades de uva', value: '7', suffix: '' },
  { key: 'naturaleza', label: 'Naturaleza', value: '100', suffix: '%' },
];

export default function StatsAdmin() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    const snap = await getDoc(doc(db, 'config', 'stats'));
    if (snap.exists()) setStats(snap.data().items || DEFAULT_STATS);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = (key, field, val) => {
    setStats((prev) => prev.map((s) => s.key === key ? { ...s, [field]: val } : s));
  };

  const save = async () => {
    setSaving(true);
    await setDoc(doc(db, 'config', 'stats'), { items: stats });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout title="Estadísticas" backPath="/admin">
      <p className="admin-desc">Estos números aparecen destacados en la sección de estadísticas de la landing.</p>

      {loading ? (
        <p className="admin-loading-text">Cargando...</p>
      ) : (
        <>
          <div className="admin-stats-grid">
            {stats.map((stat) => (
              <div key={stat.key} className="admin-stat-card">
                <div className="admin-stat-preview">
                  <span className="admin-stat-num">{stat.value}{stat.suffix}</span>
                  <span className="admin-stat-label">{stat.label}</span>
                </div>
                <div className="admin-field">
                  <label className="admin-label">Número</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={stat.value}
                    onChange={(e) => update(stat.key, 'value', e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Sufijo (ej: ha, %)</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => update(stat.key, 'suffix', e.target.value)}
                    placeholder="Dejar vacío si no tiene"
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Etiqueta</label>
                  <input
                    className="admin-input"
                    type="text"
                    value={stat.label}
                    onChange={(e) => update(stat.key, 'label', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-save-bar">
            <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
              {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}
