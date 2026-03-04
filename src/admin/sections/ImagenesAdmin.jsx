import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from '../AdminLayout';

// ─── Cloudinary config ────────────────────────────────────────────────────────
const CLOUDINARY_CLOUD_NAME = 'dvn3v6492';
const CLOUDINARY_UPLOAD_PRESET = 'cabanas-vinedo';
// ─────────────────────────────────────────────────────────────────────────────

const FOLDERS = [
  { key: 'hero',         label: '🌅 Hero',         desc: 'Las 3 fotos del banner principal' },
  { key: 'galeria',      label: '🖼️ Galería',       desc: 'Fotos de la galería general' },
  { key: 'experiencias', label: '🌿 Experiencias',  desc: 'Fotos de actividades y experiencias' },
  { key: 'varietales',   label: '🍇 Varietales',    desc: 'Fotos de las variedades de uva' },
  { key: 'cabanas',      label: '🏡 Cabañas',       desc: 'Fotos de las cabañas' },
];

const VARIETY_OPTIONS = [
  { key: 'malbec',    label: 'Malbec' },
  { key: 'cabernet',  label: 'Cabernet Sauvignon' },
  { key: 'tannat',    label: 'Tannat' },
  { key: 'viognier',  label: 'Viognier' },
  { key: 'marselan',  label: 'Marselan' },
  { key: 'flame',     label: 'Flame Seedless' },
  { key: 'redglobe',  label: 'Red Globe' },
];

const uploadToCloudinary = (file, folder, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', `cabanas-vinedo/${folder}`);

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) onProgress(e.loaded / e.total);
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({ url: data.secure_url, publicId: data.public_id });
      } else {
        reject(new Error(`Upload fallido (${xhr.status}): ${xhr.responseText}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Error de red al subir')));
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    xhr.send(formData);
  });
};

export default function ImagenesAdmin() {
  const [activeFolder, setActiveFolder] = useState('galeria');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVarietyKey, setSelectedVarietyKey] = useState('malbec');

  const load = async (folder) => {
    setLoading(true);
    const q = query(collection(db, 'imagenes'), where('folder', '==', folder));
    const snap = await getDocs(q);
    setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { load(activeFolder); }, [activeFolder]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const { url, publicId } = await uploadToCloudinary(file, activeFolder, (p) => {
          setProgress(Math.round(((i + p) / files.length) * 100));
        });
        const firestoreDoc = {
          url,
          publicId,
          folder: activeFolder,
          name: file.name,
          createdAt: Date.now(),
        };
        if (activeFolder === 'varietales') {
          firestoreDoc.varietyKey = selectedVarietyKey;
        }
        await addDoc(collection(db, 'imagenes'), firestoreDoc);
      } catch (err) {
        alert(`Error subiendo ${file.name}: ${err.message}`);
      }
    }

    setUploading(false);
    setProgress(0);
    e.target.value = '';
    load(activeFolder);
  };

  const remove = async (img) => {
    if (!confirm(`¿Eliminar "${img.name}"?`)) return;
    await deleteDoc(doc(db, 'imagenes', img.id));
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  const currentFolder = FOLDERS.find((f) => f.key === activeFolder);

  return (
    <AdminLayout title="Gestión de Imágenes" backPath="/admin">
      {/* Tabs de carpetas */}
      <div className="admin-tabs">
        {FOLDERS.map((f) => (
          <button
            key={f.key}
            className={`admin-tab ${activeFolder === f.key ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveFolder(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="admin-desc">{currentFolder?.desc}</p>

      {/* Selector de varietal (solo para varietales) */}
      {activeFolder === 'varietales' && (
        <div className="admin-variety-selector">
          <label className="admin-field-label" htmlFor="variety-select">
            ¿Para qué varietal es esta foto?
          </label>
          <select
            id="variety-select"
            className="admin-select"
            value={selectedVarietyKey}
            onChange={(e) => setSelectedVarietyKey(e.target.value)}
          >
            {VARIETY_OPTIONS.map((v) => (
              <option key={v.key} value={v.key}>{v.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Upload */}
      <div className="admin-upload-zone">
        <label className="admin-upload-label" htmlFor="img-upload">
          <span className="admin-upload-icon">📁</span>
          <span>Elegir fotos para subir a <strong>{currentFolder?.label}</strong></span>
          <span className="admin-upload-hint">Podés seleccionar varias a la vez · JPG, PNG, WebP</span>
        </label>
        <input
          id="img-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
          disabled={uploading}
        />
      </div>

      {uploading && (
        <div className="admin-progress">
          <div className="admin-progress__bar" style={{ width: `${progress}%` }} />
          <span>{progress}% subiendo...</span>
        </div>
      )}

      {/* Grid de imágenes */}
      {loading ? (
        <p className="admin-loading-text">Cargando imágenes...</p>
      ) : (
        <>
          <div className="admin-photo-grid">
            {images.map((img) => (
              <div key={img.id} className="admin-photo-card">
                <img src={img.url} alt={img.name} className="admin-photo-img" />
                <div className="admin-photo-card__footer">
                  <span className="admin-photo-name">
                    {img.varietyKey
                      ? `${VARIETY_OPTIONS.find(v => v.key === img.varietyKey)?.label || img.varietyKey}`
                      : img.name}
                  </span>
                  <button
                    className="admin-btn admin-btn--sm admin-btn--danger"
                    onClick={() => remove(img)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          {images.length === 0 && (
            <div className="admin-empty-state">
              <span className="admin-empty-icon">📷</span>
              <p>No hay fotos en esta carpeta.</p>
              <p className="admin-empty-hint">Subí la primera usando el botón de arriba.</p>
            </div>
          )}
          {images.length > 0 && (
            <p className="admin-count">{images.length} foto{images.length !== 1 ? 's' : ''} en esta carpeta</p>
          )}
        </>
      )}
    </AdminLayout>
  );
}
