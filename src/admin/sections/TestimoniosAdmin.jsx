import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../AdminLayout';

const EMPTY = { text_es: '', text_en: '', text_pt: '', author: '', origin: '', stars: 5 };

export default function TestimoniosAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | docId
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const q = query(collection(db, 'testimonios'), orderBy('order', 'asc'));
    const snap = await getDocs(q).catch(() => getDocs(collection(db, 'testimonios')));
    setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm({ ...EMPTY, order: items.length }); setEditing('new'); };
  const openEdit = (item) => { setForm(item); setEditing(item.id); };
  const cancel = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      await addDoc(collection(db, 'testimonios'), form);
    } else {
      const { id, ...data } = form;
      await updateDoc(doc(db, 'testimonios', editing), data);
    }
    setSaving(false);
    cancel();
    load();
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar este testimonio?')) return;
    await deleteDoc(doc(db, 'testimonios', id));
    load();
  };

  return (
    <AdminLayout title="Testimonios" backPath="/admin">
      {loading ? (
        <p className="admin-loading-text">Cargando...</p>
      ) : (
        <>
          <div className="admin-list">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <div className="admin-list-item__content">
                  <p className="admin-list-item__main">"{item.text_es}"</p>
                  <p className="admin-list-item__sub">{item.author} · {item.origin} · {'⭐'.repeat(item.stars)}</p>
                </div>
                <div className="admin-list-item__actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => openEdit(item)}>Editar</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => remove(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="admin-empty">No hay testimonios cargados.</p>}
          </div>

          <button className="admin-btn admin-btn--primary" onClick={openNew}>+ Agregar testimonio</button>

          {editing && (
            <div className="admin-modal-overlay" onClick={cancel}>
              <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="admin-modal__title">{editing === 'new' ? 'Nuevo testimonio' : 'Editar testimonio'}</h3>

                <div className="admin-field">
                  <label className="admin-label">Texto (Español)</label>
                  <textarea className="admin-textarea" value={form.text_es} onChange={(e) => setForm({ ...form, text_es: e.target.value })} rows={3} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Texto (Inglés)</label>
                  <textarea className="admin-textarea" value={form.text_en} onChange={(e) => setForm({ ...form, text_en: e.target.value })} rows={3} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Texto (Portugués)</label>
                  <textarea className="admin-textarea" value={form.text_pt} onChange={(e) => setForm({ ...form, text_pt: e.target.value })} rows={3} />
                </div>
                <div className="admin-row">
                  <div className="admin-field">
                    <label className="admin-label">Nombre del huésped</label>
                    <input className="admin-input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                  </div>
                  <div className="admin-field">
                    <label className="admin-label">Procedencia</label>
                    <input className="admin-input" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} placeholder="Buenos Aires, Argentina" />
                  </div>
                  <div className="admin-field admin-field--sm">
                    <label className="admin-label">Estrellas</label>
                    <select className="admin-input" value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}>
                      {[5, 4, 3].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-modal__actions">
                  <button className="admin-btn admin-btn--ghost" onClick={cancel}>Cancelar</button>
                  <button className="admin-btn admin-btn--primary" onClick={save} disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
