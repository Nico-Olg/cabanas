import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../AdminLayout';

const EMPTY = { question_es: '', question_en: '', question_pt: '', answer_es: '', answer_en: '', answer_pt: '', order: 0 };

export default function FaqAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const q = query(collection(db, 'faq'), orderBy('order', 'asc'));
    const snap = await getDocs(q).catch(() => getDocs(collection(db, 'faq')));
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
      await addDoc(collection(db, 'faq'), form);
    } else {
      const { id, ...data } = form;
      await updateDoc(doc(db, 'faq', editing), data);
    }
    setSaving(false);
    cancel();
    load();
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar esta pregunta?')) return;
    await deleteDoc(doc(db, 'faq', id));
    load();
  };

  return (
    <AdminLayout title="Preguntas Frecuentes (FAQ)" backPath="/admin">
      {loading ? (
        <p className="admin-loading-text">Cargando...</p>
      ) : (
        <>
          <div className="admin-list">
            {items.map((item) => (
              <div key={item.id} className="admin-list-item">
                <div className="admin-list-item__content">
                  <p className="admin-list-item__main">{item.question_es}</p>
                  <p className="admin-list-item__sub">{item.answer_es?.substring(0, 80)}...</p>
                </div>
                <div className="admin-list-item__actions">
                  <button className="admin-btn admin-btn--sm" onClick={() => openEdit(item)}>Editar</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => remove(item.id)}>Eliminar</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="admin-empty">No hay preguntas cargadas.</p>}
          </div>

          <button className="admin-btn admin-btn--primary" onClick={openNew}>+ Agregar pregunta</button>

          {editing && (
            <div className="admin-modal-overlay" onClick={cancel}>
              <div className="admin-modal admin-modal--lg" onClick={(e) => e.stopPropagation()}>
                <h3 className="admin-modal__title">{editing === 'new' ? 'Nueva pregunta' : 'Editar pregunta'}</h3>

                {['es', 'en', 'pt'].map((lang) => (
                  <div key={lang} className="admin-lang-block">
                    <h4 className="admin-lang-label">{lang === 'es' ? '🇦🇷 Español' : lang === 'en' ? '🇺🇸 Inglés' : '🇧🇷 Portugués'}</h4>
                    <div className="admin-field">
                      <label className="admin-label">Pregunta</label>
                      <input className="admin-input" value={form[`question_${lang}`]} onChange={(e) => setForm({ ...form, [`question_${lang}`]: e.target.value })} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Respuesta</label>
                      <textarea className="admin-textarea" value={form[`answer_${lang}`]} onChange={(e) => setForm({ ...form, [`answer_${lang}`]: e.target.value })} rows={3} />
                    </div>
                  </div>
                ))}

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
