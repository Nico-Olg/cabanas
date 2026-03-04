import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../AdminLayout';

const DEFAULT = {
  phone: '543434516846',
  phone_display: '(343) 4516846',
  address: 'Gregoria Pérez s/n y Los Zorzales · La Paz, Entre Ríos, Argentina · CP 3190',
  instagram: 'cabanasdelvinedo',
  facebook: 'cabanasdelvinedo',
  whatsapp: '543434516846',
  email: '',
};

export default function ContactoAdmin() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async () => {
    setLoading(true);
    const snap = await getDoc(doc(db, 'config', 'contacto'));
    if (snap.exists()) setForm({ ...DEFAULT, ...snap.data() });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    await setDoc(doc(db, 'config', 'contacto'), form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (key, label, placeholder = '') => (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <input
        className="admin-input"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <AdminLayout title="Datos de Contacto" backPath="/admin">
      {loading ? (
        <p className="admin-loading-text">Cargando...</p>
      ) : (
        <>
          <div className="admin-contact-form">
            <h4 className="admin-group-title">📞 Teléfono y WhatsApp</h4>
            {field('phone', 'Número completo (con código de país, sin +)', '543434516846')}
            {field('phone_display', 'Número visible en la página', '(343) 4516846')}
            {field('whatsapp', 'WhatsApp (número con código de país)', '543434516846')}

            <h4 className="admin-group-title">📍 Dirección</h4>
            {field('address', 'Dirección completa', 'Calle s/n · La Paz, Entre Ríos')}

            <h4 className="admin-group-title">📱 Redes Sociales</h4>
            <div className="admin-field">
              <label className="admin-label">Instagram (solo el usuario, sin @)</label>
              <div className="admin-input-prefix">
                <span className="admin-prefix">instagram.com/</span>
                <input className="admin-input admin-input--no-left-radius" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
              </div>
            </div>
            <div className="admin-field">
              <label className="admin-label">Facebook (solo el usuario)</label>
              <div className="admin-input-prefix">
                <span className="admin-prefix">facebook.com/</span>
                <input className="admin-input admin-input--no-left-radius" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
              </div>
            </div>

            <h4 className="admin-group-title">✉️ Email (opcional)</h4>
            {field('email', 'Email de contacto', 'info@cabanasdelvinedo.com.ar')}
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
