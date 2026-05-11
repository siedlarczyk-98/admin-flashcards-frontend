import React, { useState } from 'react';
import { Icon } from '../ui/Icon.jsx';
import { ConfirmDelete } from '../ui/ConfirmDelete.jsx';
import { FlashcardEditModal } from './FlashcardEditModal.jsx';
import { Pagination, usePagination } from '../ui/Pagination.jsx';

export function FlashcardsDetail({ course, flashcards, loading, onBack, onSave, onDelete, onCreate }) {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { page, setPage, totalPages, paginated, total } = usePagination(flashcards);

  return (
    <>
      <button className="detail-back" onClick={onBack}>
        <Icon.arrowLeft /> Voltar para listagem
      </button>

      <div className="course-card">
        <div>
          <div className="id-chip">Curso · <span className="num">#{course.id}</span></div>
          <h2>{course.nome}</h2>
          <p className="subtitle">
            {course.tipo}<span className="dot" />{course.especialidade}<span className="dot" />{course.diagnostico}
          </p>
          <div className="tag-list">
            {(course.tags || []).map((t) => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
        <div className="counter-block">
          <span className="num">{flashcards.length}</span>
          <span className="lbl">Flashcards cadastrados</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-head">
          <h3>Flashcards do curso #{course.id}</h3>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span className="meta">{total} flashcards</span>
            <button className="btn btn-primary btn-sm" onClick={onCreate}>
              <Icon.plus /> Novo flashcard
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 60 }}>ID</th>
              <th>Frente</th>
              <th>Verso</th>
              <th>
                <span className="tip">
                  Exemplo{' '}
                  <i className="tip-trigger" tabIndex={0} aria-label="O que é Exemplo?">i</i>
                  <span className="tip-bubble" role="tooltip">
                    O <strong>Exemplo</strong> funciona como um <em>feedback</em> do flashcard — uma aplicação prática, caso clínico ou mnemônico que reforça o que foi aprendido no verso.
                  </span>
                </span>
              </th>
              <th>Tags</th>
              <th style={{ width: 90, textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6}><div className="loading-row"><span className="spinner" />Carregando flashcards…</div></td></tr>
            )}
            {!loading && paginated.map((f) => (
              <tr key={f.id}>
                <td className="cell-id">#{f.id}</td>
                <td className="cell-truncate" style={{ maxWidth: 240, color: 'var(--fg)' }}>
                  <span dangerouslySetInnerHTML={{ __html: f.frente }} />
                </td>
                <td className="cell-truncate" style={{ maxWidth: 260 }}>
                  <span dangerouslySetInnerHTML={{ __html: f.verso }} />
                </td>
                <td className="cell-truncate" style={{ maxWidth: 200, fontStyle: f.exemplo ? 'italic' : 'normal', color: f.exemplo ? 'var(--fg-soft)' : 'var(--fg-faint)' }}>
                  {f.exemplo ? <span dangerouslySetInnerHTML={{ __html: f.exemplo }} /> : '—'}
                </td>
                <td>
                  <div className="tag-list">
                    {(f.tags || []).slice(0, 3).map((t) => <span key={t} className="badge badge-soft-accent">{t}</span>)}
                  </div>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={() => setEditing(f)}><Icon.edit /></button>
                    <button className="btn-icon danger" title="Excluir" onClick={() => setDeleting(f)}><Icon.trash /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && total === 0 && (
              <tr><td colSpan={6}><div className="empty"><h4>Nenhum flashcard cadastrado</h4><p>Crie um novo flashcard ou importe via XLSX.</p></div></td></tr>
            )}
          </tbody>
        </table>
        <Pagination page={page} totalPages={totalPages} total={total} setPage={setPage} />
      </div>

      <FlashcardEditModal
        open={!!editing}
        onClose={() => setEditing(null)}
        flashcard={editing}
        onSave={(f) => { onSave(f); setEditing(null); }}
      />

      <ConfirmDelete
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => { onDelete(deleting.id); setDeleting(null); }}
        title="Excluir flashcard"
        message={deleting ? (<>Tem certeza que deseja excluir o <strong>Flashcard #{deleting.id}</strong>? Essa ação não pode ser desfeita.</>) : ''}
      />
    </>
  );
}