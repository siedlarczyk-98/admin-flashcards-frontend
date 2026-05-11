import React, { useState } from 'react';
import { Icon } from '../ui/Icon.jsx';
import { DifficultyBadge } from '../ui/DifficultyBadge.jsx';
import { ConfirmDelete } from '../ui/ConfirmDelete.jsx';
import { QuestaoEditModal } from './QuestaoEditModal.jsx';

export function QuestoesDetail({ course, questoes, loading, onBack, onSave, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  return (
    <>
      <button className="detail-back" onClick={onBack}>
        <Icon.arrowLeft /> Voltar para listagem
      </button>

      <div className="course-card">
        <div>
          <div className="id-chip">
            Curso · <span className="num">#{course.id}</span>
          </div>
          <h2>{course.nome}</h2>
          <p className="subtitle">
            {course.tipo}
            <span className="dot" />
            {course.especialidade}
            <span className="dot" />
            {course.diagnostico}
          </p>
          <div className="tag-list">
            {(course.tags || []).map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
        <div className="counter-block">
          <span className="num">{questoes.length}</span>
          <span className="lbl">Questões cadastradas</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-head">
          <h3>Questões do curso #{course.id}</h3>
          <span className="meta">{questoes.length} questões encontradas</span>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Enunciado</th>
              <th style={{ width: 90 }}>Gabarito</th>
              <th>Instituição</th>
              <th style={{ width: 80 }}>Ano</th>
              <th style={{ width: 120 }}>Dificuldade</th>
              <th>Tags</th>
              <th style={{ width: 90, textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8}>
                  <div className="loading-row">
                    <span className="spinner" />
                    Carregando questões…
                  </div>
                </td>
              </tr>
            )}
            {!loading && questoes.map((q) => (
              <tr key={q.id}>
                <td className="cell-id">#{q.id}</td>
                <td className="cell-truncate" title={q.enunciado?.replace(/<[^>]+>/g, '')}>
                  <span dangerouslySetInnerHTML={{ __html: q.enunciado }} />
                </td>
                <td><span className="badge-circle">{q.gabarito}</span></td>
                <td style={{ color: 'var(--fg-muted)' }}>{q.instituicao}</td>
                <td className="cell-id">{q.ano}</td>
                <td><DifficultyBadge value={q.dificuldade} /></td>
                <td>
                  <div className="tag-list">
                    {(q.tags || []).slice(0, 3).map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={() => setEditing(q)}>
                      <Icon.edit />
                    </button>
                    <button className="btn-icon danger" title="Excluir" onClick={() => setDeleting(q)}>
                      <Icon.trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && questoes.length === 0 && (
              <tr>
                <td colSpan={8}>
                  <div className="empty">
                    <h4>Nenhuma questão cadastrada</h4>
                    <p>Importe via XLSX para começar.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <QuestaoEditModal
        open={!!editing}
        onClose={() => setEditing(null)}
        questao={editing}
        onSave={(q) => { onSave(q); setEditing(null); }}
      />

      <ConfirmDelete
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => { onDelete(deleting.id); setDeleting(null); }}
        title="Excluir questão"
        message={deleting ? (
          <>Tem certeza que deseja excluir a <strong>Questão #{deleting.id}</strong>? Essa ação não pode ser desfeita.</>
        ) : ''}
      />
    </>
  );
}
