import React, { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon.jsx';
import { ConfirmDelete } from '../ui/ConfirmDelete.jsx';

function QuestoesFilters({ onSearch, onImport }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [adv, setAdv] = useState({ id: '', inst: '', ano: '', dif: '' });

  const submit = (e) => {
    e?.preventDefault();
    onSearch({ q, ...adv });
  };

  return (
    <form className="filter-bar" onSubmit={submit}>
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
            <label>Instituição</label>
            <input value={adv.inst} onChange={(e) => setAdv({ ...adv, inst: e.target.value })} placeholder="USP, ENARE…" />
          </div>
          <div className="field">
            <label>Ano</label>
            <input value={adv.ano} onChange={(e) => setAdv({ ...adv, ano: e.target.value })} placeholder="2024" />
          </div>
          <div className="field">
            <label>Dificuldade</label>
            <select value={adv.dif} onChange={(e) => setAdv({ ...adv, dif: e.target.value })}>
              <option value="">Todas</option>
              <option>Fácil</option><option>Médio</option><option>Difícil</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
}

export function QuestoesList({ courses, loading, onOpen, onDeleteAll, onImport }) {
  const [filter, setFilter] = useState({ q: '', id: '', inst: '', ano: '', dif: '' });
  const [confirm, setConfirm] = useState(null);

  const filtered = useMemo(() => courses.filter((c) => {
    if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
    if (filter.id && String(c.id) !== filter.id) return false;
    return true;
  }), [filter, courses]);

  return (
    <>
      <QuestoesFilters onSearch={setFilter} onImport={onImport} />
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com questões</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Curso</th>
              <th>Tipo</th>
              <th>Especialidade</th>
              <th style={{ textAlign: 'right' }}>Questões</th>
              <th style={{ width: 120, textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6}>
                  <div className="loading-row">
                    <span className="spinner" />
                    Carregando questões…
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
                    <span className="num">{c.questoes_count ?? c.questoes ?? 0}</span>
                    <span className="lbl">questões</span>
                  </span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver questões" onClick={() => onOpen(c.id)}>
                      <Icon.view />
                    </button>
                    <button className="btn-icon danger" title="Excluir todas" onClick={() => setConfirm(c)}>
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
        title="Excluir todas as questões"
        message={confirm ? (
          <>Isso vai excluir todas as <strong>{confirm.questoes_count ?? confirm.questoes} questões</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</>
        ) : ''}
        confirmLabel="Excluir todas"
      />
    </>
  );
}
