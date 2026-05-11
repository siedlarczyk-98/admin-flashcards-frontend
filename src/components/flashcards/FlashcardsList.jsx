import React, { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon.jsx';
import { ConfirmDelete } from '../ui/ConfirmDelete.jsx';

function FlashcardsFilters({ onSearch, onImport }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [adv, setAdv] = useState({ id: '', tags: '' });

  return (
    <form
      className="filter-bar"
      onSubmit={(e) => { e.preventDefault(); onSearch({ q, ...adv }); }}
    >
      <div className="filter-row">
        <div className="search">
          <Icon.search />
          <input
            placeholder="Buscar por nome do curso…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={`advanced-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
        >
          Filtro avançado <span className="chev"><Icon.chev /></span>
        </button>
        <button type="submit" className="btn btn-primary">
          <Icon.search /> Pesquisar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onImport}>
          <Icon.upload /> Importar XLSX
        </button>
      </div>
      {open && (
        <div className="adv-panel">
          <div className="field">
            <label>ID do curso</label>
            <input value={adv.id} onChange={(e) => setAdv({ ...adv, id: e.target.value })} placeholder="ex. 2572" />
          </div>
          <div className="field">
            <label>Tags</label>
            <input value={adv.tags} onChange={(e) => setAdv({ ...adv, tags: e.target.value })} placeholder="vasculite, ANCA…" />
          </div>
        </div>
      )}
    </form>
  );
}

export function FlashcardsList({ courses, loading, onOpen, onDeleteAll, onImport }) {
  const [filter, setFilter] = useState({ q: '', id: '' });
  const [confirm, setConfirm] = useState(null);

  const filtered = useMemo(() => courses.filter((c) => {
    if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
    if (filter.id && String(c.id) !== filter.id) return false;
    return true;
  }), [filter, courses]);

  return (
    <>
      <FlashcardsFilters onSearch={setFilter} onImport={onImport} />
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com flashcards</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Curso</th>
              <th>Tipo</th>
              <th>Especialidade</th>
              <th style={{ textAlign: 'right' }}>Flashcards</th>
              <th style={{ width: 120, textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6}>
                  <div className="loading-row">
                    <span className="spinner" />
                    Carregando flashcards…
                  </div>
                </td>
              </tr>
            )}
            {!loading && filtered.map((c) => (
              <tr key={c.id}>
                <td className="cell-id">#{c.id}</td>
                <td className="cell-name">
                  {c.nome}
                  <span className="sub">{c.diagnostico}</span>
                </td>
                <td><span className="badge">{c.tipo}</span></td>
                <td style={{ color: 'var(--fg-muted)' }}>{c.especialidade}</td>
                <td style={{ textAlign: 'right' }}>
                  <span className="cell-count">
                    <span className="num">{c.flashcards_count ?? c.flashcards ?? 0}</span>
                    <span className="lbl">flashcards</span>
                  </span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver flashcards" onClick={() => onOpen(c.id)}>
                      <Icon.view />
                    </button>
                    <button className="btn-icon danger" title="Excluir todos" onClick={() => setConfirm(c)}>
                      <Icon.trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <div className="empty">
                    <h4>Nenhum curso encontrado</h4>
                    <p>Ajuste os filtros ou importe um arquivo XLSX.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDelete
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => { onDeleteAll(confirm.id); setConfirm(null); }}
        title="Excluir todos os flashcards"
        message={confirm ? (
          <>Isso vai excluir todos os <strong>{confirm.flashcards_count ?? confirm.flashcards} flashcards</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</>
        ) : ''}
        confirmLabel="Excluir todos"
      />
    </>
  );
}
