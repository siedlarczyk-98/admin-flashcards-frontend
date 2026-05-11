import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal.jsx';
import { RichEditor } from '../ui/RichEditor.jsx';
import { TagsInput } from '../ui/TagsInput.jsx';

export function FlashcardEditModal({ open, onClose, flashcard, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (flashcard) {
      setForm({ ...flashcard, tags: [...(flashcard.tags || [])] });
    }
  }, [flashcard]);

  if (!form) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const isNew = !form.id || String(form.id).startsWith('new-');

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="wide"
      title={isNew ? 'Novo flashcard' : `Editar Flashcard #${form.id}`}
      subtitle="Frente, verso e exemplo opcional. Pressione Enter no campo de tags para adicionar."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>
            {isNew ? 'Criar flashcard' : 'Salvar alterações'}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label className="field-label">Frente</label>
          <RichEditor
            value={form.frente}
            onChange={(v) => set('frente', v)}
            placeholder="Pergunta ou conceito…"
            minHeight={80}
          />
        </div>
        <div>
          <label className="field-label">Verso</label>
          <RichEditor
            value={form.verso}
            onChange={(v) => set('verso', v)}
            placeholder="Resposta, definição ou explicação…"
            minHeight={100}
          />
        </div>
        <div>
          <label className="field-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="tip">
              Exemplo (opcional)
              {' '}
              <i className="tip-trigger" tabIndex={0} aria-label="O que é Exemplo?">i</i>
              <span className="tip-bubble" role="tooltip">
                O <strong>Exemplo</strong> funciona como um <em>feedback</em> do flashcard — aplicação prática, caso clínico ou mnemônico que reforça o aprendizado do verso.
              </span>
            </span>
          </label>
          <RichEditor
            value={form.exemplo || ''}
            onChange={(v) => set('exemplo', v)}
            placeholder="Aplicação prática, caso clínico, mnemônico…"
            minHeight={70}
          />
        </div>
        <div>
          <label className="field-label">Tags</label>
          <TagsInput
            value={form.tags}
            onChange={(v) => set('tags', v)}
            placeholder="Digite uma tag e pressione Enter"
          />
        </div>
      </div>
    </Modal>
  );
}
