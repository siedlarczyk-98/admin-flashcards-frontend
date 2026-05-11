import React from 'react';

export const PAGE_SIZE = 15;

export function usePagination(items) {
  const [page, setPage] = React.useState(1);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [total]);

  return { page: safePage, setPage, totalPages, paginated, total };
}

export function Pagination({ page, totalPages, total, setPage }) {
  if (totalPages <= 1) return null;

  // Mostra até 10 páginas ao redor da atual
  const pages = [];
  const delta = 4;
  const left = Math.max(1, page - delta);
  const right = Math.min(totalPages, page + delta);

  for (let i = left; i <= right; i++) pages.push(i);

  return (
    <div className="pagination">
      <div className="pagination-controls">
        {/* Primeira */}
        <button className="btn-icon" disabled={page === 1} onClick={() => setPage(1)} title="Primeira">
          «
        </button>
        {/* Anterior */}
        <button className="btn-icon" disabled={page === 1} onClick={() => setPage(page - 1)} title="Anterior">
          ‹
        </button>

        {left > 1 && (
          <>
            <button className="pagination-page" onClick={() => setPage(1)}>1</button>
            {left > 2 && <span className="pagination-ellipsis">…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            className={`pagination-page${p === page ? ' active' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        {right < totalPages && (
          <>
            {right < totalPages - 1 && <span className="pagination-ellipsis">…</span>}
            <button className="pagination-page" onClick={() => setPage(totalPages)}>{totalPages}</button>
          </>
        )}

        {/* Próxima */}
        <button className="btn-icon" disabled={page === totalPages} onClick={() => setPage(page + 1)} title="Próxima">
          ›
        </button>
        {/* Última */}
        <button className="btn-icon" disabled={page === totalPages} onClick={() => setPage(totalPages)} title="Última">
          »
        </button>
      </div>

      <span className="pagination-info">
        Registros na página: {PAGE_SIZE} / {total}
      </span>
    </div>
  );
}