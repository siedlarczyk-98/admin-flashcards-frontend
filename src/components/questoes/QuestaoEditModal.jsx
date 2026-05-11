import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal.jsx';
import { RichEditor } from '../ui/RichEditor.jsx';
import { TagsInput } from '../ui/TagsInput.jsx';
import { Icon } from '../ui/Icon.jsx';

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function QuestaoEditModal({ open, onClose, questao, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (questao) {
      setForm({
        ...questao,
        alternativas: questao.alternativas.map((a) => ({ ...a })),
        tags: [...questao.tags],
      });
    }
  }, [questao]);

  if (!form) return null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const setAlt = (i, texto) => {
    const alts = [...form.alternativas];
    alts[i] = { ...alts[i], texto };
    set('alternativas', alts);
  };

  const addAlt = () => {
    const used = form.alternativas.map((a) => a.letra);
    const next = LETRAS.find((l) => !used.includes(l));
    if (!next) return;
    set('alternativas', [...form.alternativas, { letra: next, texto: '' }]);
  };

  const removeAlt = (i) => {
    const alts = form.alternativas
      .filter((_, idx) => idx !== i)
      .map((alt, idx) => ({ ...alt, letra: LETRAS[idx] }));
    const gab = alts.find((x) => x.letra === form.gabarito) ? form.gabarito : alts[0]?.letra || '';
    setForm((f) => ({ ...f, alternativas: alts, gabarito: gab }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="wide"
      title={`Editar Questão #${form.id}`}
      subtitle="Ajuste o enunciado, alternativas e metadados desta questão."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>Salvar alterações</button>
        </>
      }
    >
      <div className="form-grid">
        <div className="full">
          <label className="field-label">Enunciado</label>
          <RichEditor
            value={form.enunciado}
            onChange={(v) => set('enunciado', v)}
            placeholder="Descreva o caso clínico ou pergunta…"
            minHeight={100}
          />
        </div>
        <div className="full field">
          <label>URL da imagem (opcional)</label>
          <input
            value={form.imagem || ''}
            onChange={(e) => set('imagem', e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div className="full">
          <label className="field-label">Alternativas</label>
          <div className="alt-list">
            {form.alternativas.map((a, i) => (
              <div key={i} className={`alt-row ${a.letra === form.gabarito ? 'correct' : ''}`}>
                <span className="letter">{a.letra}</span>
                <input
                  value={a.texto}
                  onChange={(e) => setAlt(i, e.target.value)}
                  placeholder={`Texto da alternativa ${a.letra}…`}
                />
                <button
                  className="btn-icon danger"
                  onClick={() => removeAlt(i)}
                  title="Remover"
                  disabled={form.alternativas.length <= 2}
                >
                  <Icon.close />
                </button>
              </div>
            ))}
            <button type="button" className="alt-add" onClick={addAlt}>
              <Icon.plus /> Adicionar alternativa
            </button>
          </div>
        </div>

        <div className="field">
          <label>Gabarito</label>
          <select value={form.gabarito} onChange={(e) => set('gabarito', e.target.value)}>
            {form.alternativas.map((a) => (
              <option key={a.letra} value={a.letra}>{a.letra}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Ano</label>
          <input value={form.ano} onChange={(e) => set('ano', e.target.value)} placeholder="2024" />
        </div>
        <div className="field">
          <label>Dificuldade</label>
          <select value={form.dificuldade} onChange={(e) => set('dificuldade', e.target.value)}>
            <option>Fácil</option><option>Médio</option><option>Difícil</option>
          </select>
        </div>
        <div className="field">
          <label>Instituição</label>
          <input
            value={form.instituicao}
            onChange={(e) => set('instituicao', e.target.value)}
            placeholder="USP, ENARE…"
          />
        </div>
        <div className="field">
          <label>Essencial</label>
          <select
            value={form.essencial ? 'Sim' : 'Não'}
            onChange={(e) => set('essencial', e.target.value === 'Sim')}
          >
            <option>Sim</option><option>Não</option>
          </select>
        </div>
        <div className="full">
          <label className="field-label">Tags</label>
          <TagsInput value={form.tags} onChange={(v) => set('tags', v)} placeholder="Digite uma tag e pressione Enter" />
        </div>
        <div className="full field">
          <label>Feedback do professor (opcional)</label>
          <textarea
            value={form.feedback || ''}
            onChange={(e) => set('feedback', e.target.value)}
            placeholder="Comentário pedagógico sobre a questão…"
            style={{
              width: '100%', minHeight: 80, resize: 'vertical',
              padding: '10px 12px', border: '1px solid var(--border)',
              borderRadius: 8, fontSize: 13.5, outline: 'none',
              fontFamily: 'var(--font-sans)', background: 'var(--surface)',
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
