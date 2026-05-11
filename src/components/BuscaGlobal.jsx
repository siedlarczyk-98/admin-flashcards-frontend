import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from './ui/Icon.jsx';
import { DifficultyBadge } from './ui/DifficultyBadge.jsx';
import { QuestaoEditModal } from './questoes/QuestaoEditModal.jsx';
import { FlashcardEditModal } from './flashcards/FlashcardEditModal.jsx';
import { ConfirmDelete } from './ui/ConfirmDelete.jsx';
import { questoesAPI, flashcardsAPI } from '../services/api.js';
import { useToast } from './ui/Toast.jsx';
import { usePagination, Pagination } from './ui/Pagination.jsx';

// ─── Filtros ──────────────────────────────────────────────────────────────────

function BuscaFiltros({ kind, onSearch }) {
  const [q, setQ]       = useState('');
  const [inst, setInst] = useState('');
  const [ano, setAno]   = useState('');
  const [dif, setDif]   = useState('');
  const [open, setOpen] = useState(false);

  const submit = (e) => {
    e?.preventDefault();
    onSearch({ q, inst, ano, dif });
  };

  return (
    <form className="filter-bar" onSubmit={submit}>
      <div className="filter-row">
        <div className="search">
          <Icon.search />
          <input
            placeholder={kind === 'questoes' ? 'Buscar por enunciado…' : 'Buscar por frente ou verso…'}
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
      </div>
      {open && (
        <div className="adv-panel">
          {kind === 'questoes' && (
            <>
              <div className="field">
                <label>Instituição</label>
                <input
                  value={inst}
                  onChange={(e) => setInst(e.target.value)}
                  placeholder="USP, ENARE, Revalida…"
                />
              </div>
              <div className="field">
                <label>Ano</label>
                <input
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  placeholder="2024"
                  type="number"
                  min="1990"
                  max="2099"
                />
              </div>
              <div className="field">
                <label>Dificuldade</label>
                <select value={dif} onChange={(e) => setDif(e.target.value)}>
                  <option value="">Todas</option>
                  <option>Fácil</option>
                  <option>Médio</option>
                  <option>Difícil</option>
                </select>
              </div>
            </>
          )}
          {kind === 'flashcards' && (
            <div className="field">
              <label>Tags</label>
              <input
                value={inst}
                onChange={(e) => setInst(e.target.value)}
                placeholder="vasculite, ANCA…"
              />
            </div>
          )}
        </div>
      )}
    </form>
  );
}

// ─── Tabela de Questões ───────────────────────────────────────────────────────

function QuestoesGlobalTable({ items, loading, onEdit, onDelete }) {
  const { page, setPage, totalPages, paginated } = usePagination(items);

  if (loading) {
    return (
      <div className="loading-row" style={{ padding: '40px 0' }}>
        <span className="spinner" /> Carregando questões…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="empty">
        <h4>Nenhuma questão encontrada</h4>
        <p>Ajuste os filtros para ver resultados.</p>
      </div>
    );
  }

  return (
    <>
    <table>
      <thead>
        <tr>
          <th style={{ width: 60 }}>ID</th>
          <th>Enunciado</th>
          <th style={{ width: 90 }}>Gabarito</th>
          <th>Instituição</th>
          <th style={{ width: 70 }}>Ano</th>
          <th style={{ width: 110 }}>Dificuldade</th>
          <th>Tags</th>
          <th style={{ width: 90, textAlign: 'right' }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {paginated.map((q) => (
          <tr key={q.id}>
            <td className="cell-id">#{q.id}</td>
            <td className="cell-truncate" title={q.enunciado?.replace(/<[^>]+>/g, '')}>
              <span dangerouslySetInnerHTML={{ __html: q.enunciado }} />
            </td>
            <td><span className="badge-circle">{q.gabarito}</span></td>
            <td style={{ color: 'var(--fg-muted)' }}>{q.instituicao || '—'}</td>
            <td className="cell-id">{q.ano || '—'}</td>
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
                <button className="btn-icon" title="Editar" onClick={() => onEdit(q)}>
                  <Icon.edit />
                </button>
                <button className="btn-icon danger" title="Excluir" onClick={() => onDelete(q)}>
                  <Icon.trash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination page={page} totalPages={totalPages} total={items.length} setPage={setPage} />
    </>
  );
}

// ─── Tabela de Flashcards ─────────────────────────────────────────────────────

function FlashcardsGlobalTable({ items, loading, onEdit, onDelete }) {
  const { page, setPage, totalPages, paginated } = usePagination(items);

  if (loading) {
    return (
      <div className="loading-row" style={{ padding: '40px 0' }}>
        <span className="spinner" /> Carregando flashcards…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="empty">
        <h4>Nenhum flashcard encontrado</h4>
        <p>Ajuste os filtros para ver resultados.</p>
      </div>
    );
  }

  return (
    <>
    <table>
      <thead>
        <tr>
          <th style={{ width: 60 }}>ID</th>
          <th>Frente</th>
          <th>Verso</th>
          <th>Tags</th>
          <th style={{ width: 90, textAlign: 'right' }}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {paginated.map((f) => (
          <tr key={f.id}>
            <td className="cell-id">#{f.id}</td>
            <td className="cell-truncate" style={{ maxWidth: 260, color: 'var(--fg)' }}>
              <span dangerouslySetInnerHTML={{ __html: f.frente }} />
            </td>
            <td className="cell-truncate" style={{ maxWidth: 280 }}>
              <span dangerouslySetInnerHTML={{ __html: f.verso }} />
            </td>
            <td>
              <div className="tag-list">
                {(f.tags || []).slice(0, 3).map((t) => (
                  <span key={t} className="badge badge-soft-accent">{t}</span>
                ))}
              </div>
            </td>
            <td>
              <div className="cell-actions">
                <button className="btn-icon" title="Editar" onClick={() => onEdit(f)}>
                  <Icon.edit />
                </button>
                <button className="btn-icon danger" title="Excluir" onClick={() => onDelete(f)}>
                  <Icon.trash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination page={page} totalPages={totalPages} total={items.length} setPage={setPage} />
    </>
  );
}

// ─── Página Principal ─────────────────────────────────────────────────────────

export function BuscaGlobal({ onSaveQ, onDeleteQ, onSaveF, onDeleteF }) {
  const toast = useToast();
  const [kind, setKind]       = useState('questoes');
  const [filter, setFilter]   = useState({ q: '', inst: '', ano: '', dif: '' });
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Carrega ao montar e quando kind muda
  useEffect(() => {
    setItems([]);
    setLoading(true);
    const fetch = kind === 'questoes'
      ? questoesAPI.listarTodas()
      : flashcardsAPI.listarTodos();

    fetch
      .then(setItems)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar: ${err.message}` }))
      .finally(() => setLoading(false));
  }, [kind]);

  // Filtragem local
  const filtered = useMemo(() => {
    return items.filter((item) => {
      const text = kind === 'questoes'
        ? (item.enunciado || '').replace(/<[^>]+>/g, '').toLowerCase()
        : `${item.frente || ''} ${item.verso || ''}`.replace(/<[^>]+>/g, '').toLowerCase();

      if (filter.q && !text.includes(filter.q.toLowerCase())) return false;

      if (kind === 'questoes') {
        if (filter.inst && !(item.instituicao || '').toLowerCase().includes(filter.inst.toLowerCase())) return false;
        if (filter.ano  && String(item.ano) !== filter.ano) return false;
        if (filter.dif  && item.dificuldade !== filter.dif) return false;
      } else {
        if (filter.inst) {
          const tags = (item.tags || []).join(' ').toLowerCase();
          if (!tags.includes(filter.inst.toLowerCase())) return false;
        }
      }

      return true;
    });
  }, [items, filter, kind]);

  const handleSaveQ = useCallback(async (q) => {
    try {
      const updated = await questoesAPI.atualizar(q.id, q);
      setItems((prev) => prev.map((x) => x.id === updated.id ? updated : x));
      if (onSaveQ) onSaveQ(updated);
      toast({ type: 'success', msg: `Questão #${q.id} atualizada` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar: ${err.message}` });
    }
  }, [onSaveQ]);

  const handleDeleteQ = useCallback(async (q) => {
    try {
      await questoesAPI.excluir(q.id);
      setItems((prev) => prev.filter((x) => x.id !== q.id));
      if (onDeleteQ) onDeleteQ(q.id);
      toast({ type: 'danger', msg: `Questão #${q.id} excluída` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir: ${err.message}` });
    } finally {
      setDeleting(null);
    }
  }, [onDeleteQ]);

  const handleSaveF = useCallback(async (f) => {
    try {
      const updated = await flashcardsAPI.atualizar(f.id, f);
      setItems((prev) => prev.map((x) => x.id === updated.id ? updated : x));
      if (onSaveF) onSaveF(updated);
      toast({ type: 'success', msg: `Flashcard #${f.id} atualizado` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar: ${err.message}` });
    }
  }, [onSaveF]);

  const handleDeleteF = useCallback(async (f) => {
    try {
      await flashcardsAPI.excluir(f.id);
      setItems((prev) => prev.filter((x) => x.id !== f.id));
      if (onDeleteF) onDeleteF(f.id);
      toast({ type: 'danger', msg: `Flashcard #${f.id} excluído` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir: ${err.message}` });
    } finally {
      setDeleting(null);
    }
  }, [onDeleteF]);

  return (
    <div>
      <div className="page-head">
        <h1>
          <span style={{ color: '#475569', fontWeight: 500 }}>Busca Global</span>{' '}
          <em>— Questões &amp; Flashcards</em>
        </h1>
        <p>Pesquise por instituição, ano, dificuldade ou tags em todo o banco de dados.</p>
      </div>

      {/* Sub-tabs questões / flashcards */}
      <div className="section-tabs" style={{ marginBottom: 0 }}>
        <button
          className={kind === 'questoes' ? 'active' : ''}
          onClick={() => { setKind('questoes'); setFilter({ q: '', inst: '', ano: '', dif: '' }); }}
        >
          Questões
          {kind === 'questoes' && !loading && (
            <span className="count">{filtered.length}</span>
          )}
        </button>
        <button
          className={kind === 'flashcards' ? 'active' : ''}
          onClick={() => { setKind('flashcards'); setFilter({ q: '', inst: '', ano: '', dif: '' }); }}
        >
          Flashcards
          {kind === 'flashcards' && !loading && (
            <span className="count">{filtered.length}</span>
          )}
        </button>
      </div>

      <BuscaFiltros key={kind} kind={kind} onSearch={setFilter} />

      <div className="table-card">
        <div className="table-head">
          <h3>
            {kind === 'questoes' ? 'Todas as questões' : 'Todos os flashcards'}
          </h3>
          <span className="meta">
            {loading ? 'Carregando…' : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>

        {kind === 'questoes' ? (
          <QuestoesGlobalTable
            items={filtered}
            loading={loading}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        ) : (
          <FlashcardsGlobalTable
            items={filtered}
            loading={loading}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        )}
      </div>

      {/* Modais */}
      {kind === 'questoes' && (
        <QuestaoEditModal
          open={!!editing}
          onClose={() => setEditing(null)}
          questao={editing}
          onSave={(q) => { handleSaveQ(q); setEditing(null); }}
        />
      )}

      {kind === 'flashcards' && (
        <FlashcardEditModal
          open={!!editing}
          onClose={() => setEditing(null)}
          flashcard={editing}
          onSave={(f) => { handleSaveF(f); setEditing(null); }}
        />
      )}

      <ConfirmDelete
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (kind === 'questoes') handleDeleteQ(deleting);
          else handleDeleteF(deleting);
        }}
        title={kind === 'questoes' ? 'Excluir questão' : 'Excluir flashcard'}
        message={deleting ? (
          <>Tem certeza que deseja excluir o <strong>item #{deleting.id}</strong>? Essa ação não pode ser desfeita.</>
        ) : ''}
      />
    </div>
  );
}